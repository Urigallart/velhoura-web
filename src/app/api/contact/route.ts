import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contact, site } from "@/data/site";

/**
 * Sends the contact modal's submission to `contact.email` via Resend.
 *
 * Requires `RESEND_API_KEY` — get one free at resend.com, add it in Vercel
 * under Project Settings → Environment Variables (and in `.env.local` for
 * local dev). Without it this route returns a clear 500 rather than failing
 * silently.
 *
 * Sends from Resend's shared `onboarding@resend.dev` address, which works with
 * no setup. Once the domain is verified in Resend, switch `from` below to
 * something like `Velhoura <hola@velhoura.com>` for a branded sender.
 *
 * ── What this route defends against ──────────────────────────────────────
 * A public endpoint that turns an HTTP request into an email is an open relay
 * pointed at your own inbox. Before it will send, a submission has to clear
 * four gates that cost a real visitor nothing:
 *
 *   1. a honeypot field no human can see or focus;
 *   2. a minimum time on the form — nobody reads and answers four fields in
 *      under three seconds;
 *   3. length caps, so a single request cannot paste a novel into your inbox;
 *   4. a per-IP rate limit.
 *
 * The rate limiter is in-process on purpose: it is one Map, it needs no Redis
 * and no vendor, and on a serverless deployment its worst case — a cold
 * instance starting with an empty window — is exactly the behaviour you would
 * get with no limiter at all. If this ever needs to be strict rather than
 * merely effective, swap the two helpers below for a shared store.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  projectType: 200,
  message: 4000,
  /** Questionnaire: max question/answer pairs, and length of each side. */
  answers: 30,
  answerText: 300,
  /** Milliseconds a genuine visitor needs to fill the form. */
  minElapsed: 3000,
  /** Requests allowed per IP per window. */
  perWindow: 4,
  windowMs: 10 * 60 * 1000,
};

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMITS.windowMs);

  if (recent.length >= LIMITS.perWindow) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic sweep so the Map cannot grow without bound on a long-lived
  // instance. Cheap: it only runs on the requests that get through.
  if (hits.size > 500) {
    for (const [key, stamps] of hits) {
      if (stamps.every((t) => now - t >= LIMITS.windowMs)) hits.delete(key);
    }
  }

  return false;
}

/** Behind a proxy the socket address is the proxy's, so trust the forwarded
 *  chain's first entry, which is the one the edge itself appended. */
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function field(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** The questionnaire's question/answer pairs, capped and stripped of junk. */
function answerPairs(value: unknown): { question: string; answer: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, LIMITS.answers)
    .map((pair) => ({
      question: field(pair?.question, LIMITS.answerText),
      answer: field(pair?.answer, LIMITS.answerText),
    }))
    .filter((pair) => pair.question && pair.answer);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "El envío de correo no está configurado todavía." },
      { status: 500 },
    );
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Demasiados mensajes seguidos. Inténtalo en unos minutos." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);

  // Silent drops: a bot is told the same thing a success looks like, so it has
  // nothing to tune against. A human can never reach either branch.
  if (field(body?.company, 200)) return NextResponse.json({ ok: true });
  if (
    typeof body?.elapsed === "number" &&
    body.elapsed >= 0 &&
    body.elapsed < LIMITS.minElapsed
  ) {
    return NextResponse.json({ ok: true });
  }

  const name = field(body?.name, LIMITS.name);
  const email = field(body?.email, LIMITS.email);
  const phone = field(body?.phone, LIMITS.phone);
  const projectType = field(body?.projectType, LIMITS.projectType);
  const message = field(body?.message, LIMITS.message);
  const answers = answerPairs(body?.answers);
  const isQuiz = body?.kind === "quiz";

  // The free-text form needs a message; the questionnaire carries its content
  // in the answers, so there the comment box is optional.
  const hasContent = isQuiz ? answers.length > 0 : Boolean(message);

  if (!name || !email || !hasContent || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios o el email no es válido." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  // Empty optional fields are dropped from the header; the body keeps its
  // blank lines on purpose, as spacing.
  const header = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    phone && `Teléfono: ${phone}`,
    !isQuiz && projectType && `Tipo de proyecto: ${projectType}`,
  ].filter((line): line is string => Boolean(line));

  const content = isQuiz
    ? [
        "",
        "── Respuestas del cuestionario ──",
        ...answers.flatMap((a) => ["", a.question, `→ ${a.answer}`]),
        ...(message ? ["", "── Comentario ──", "", message] : []),
      ]
    : ["", message];

  const { error } = await resend.emails.send({
    from: `${site.name} <onboarding@resend.dev>`,
    to: contact.email,
    replyTo: email,
    subject: isQuiz
      ? `Nuevo proyecto — ${name}${projectType ? ` (${projectType})` : ""}`
      : `Nuevo mensaje — ${name}${projectType ? ` (${projectType})` : ""}`,
    text: [...header, ...content].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
