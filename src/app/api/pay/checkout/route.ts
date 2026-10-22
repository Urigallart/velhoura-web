import { NextResponse } from "next/server";
import { CODE_KEY, normalizeCode, offerFor } from "@/lib/payments";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";
import { findProject, projectState, stripe } from "@/lib/stripePayments";
import { site } from "@/data/site";

/**
 * Creates the Stripe Checkout session for the option the client picked.
 *
 * The amount is never taken from the browser: the project is looked up again
 * by its code, its current state recomputed, and the charge taken from the
 * offer that state allows. Every payment and subscription carries the code
 * in its metadata, which is how the next lookup knows what has been paid.
 *
 *   full     one payment of the total
 *   half     50% now; the other 50% is offered by the same code afterwards
 *   rest     whatever is left (the second half)
 *   monthly  total ÷ months every month, with a commitment of `months`;
 *            after that the subscription carries on until the client asks
 *            to stop (see the terms)
 */
const limited = createRateLimiter(10, 10 * 60 * 1000);

const copy = {
  es: {
    half: "Primer pago (50 %)",
    rest: "Pago restante",
    full: "Pago completo",
    monthly: (months: number) =>
      `Cuota mensual con permanencia de ${months} meses. Pasado ese plazo, la suscripción continúa hasta que nos pidas cancelarla.`,
  },
  en: {
    half: "First payment (50%)",
    rest: "Remaining payment",
    full: "Full payment",
    monthly: (months: number) =>
      `Monthly fee with a ${months}-month commitment. After that, the subscription continues until you ask us to cancel it.`,
  },
};

export async function POST(request: Request) {
  const s = stripe();
  if (!s) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (limited(clientIp(request))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await request.json().catch(() => null);
  const code = normalizeCode(body?.code);
  const option = typeof body?.option === "string" ? body.option : "";
  const locale = body?.locale === "en" ? "en" : "es";
  const t = copy[locale];
  if (!code) return NextResponse.json({ error: "invalid_code" }, { status: 400 });

  try {
    const project = await findProject(s, code);
    if (!project) return NextResponse.json({ error: "not_found" }, { status: 404 });
    const state = await projectState(s, project);
    const offer = offerFor(state, option);
    if (!offer) return NextResponse.json({ error: "option_unavailable" }, { status: 409 });
    // The monthly plan binds the client for months; the page asks them to
    // accept that, and so does this route.
    if (offer.option === "monthly" && body?.acceptCommitment !== true) {
      return NextResponse.json({ error: "commitment_required" }, { status: 400 });
    }

    // Where Stripe sends the client back. Only our own site (or a local dev
    // server) — never whatever Origin a request claims, or a forged request
    // could make our checkout return visitors to someone else's page.
    const claimed = request.headers.get("origin") ?? "";
    const origin = /^http:\/\/localhost:\d+$/.test(claimed) ? claimed : site.url;
    const base = `${origin}${locale === "en" ? "/en/payments" : "/gestiones"}?codigo=${encodeURIComponent(code)}`;
    const meta = { [CODE_KEY]: code, option: offer.option };

    const session =
      offer.option === "monthly"
        ? await s.checkout.sessions.create({
            mode: "subscription",
            locale,
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: project.currency,
                  unit_amount: offer.now,
                  recurring: { interval: "month" },
                  product: project.productId,
                },
              },
            ],
            subscription_data: {
              description: t.monthly(project.months),
              metadata: { ...meta, commitment_months: String(project.months) },
            },
            custom_text: { submit: { message: t.monthly(project.months) } },
            metadata: meta,
            success_url: `${base}&estado=ok`,
            cancel_url: `${base}&estado=cancelado`,
          })
        : await s.checkout.sessions.create({
            mode: "payment",
            locale,
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: project.currency,
                  unit_amount: offer.now,
                  product: project.productId,
                },
              },
            ],
            payment_intent_data: {
              description: `${project.name} — ${t[offer.option]}`,
              metadata: meta,
            },
            metadata: meta,
            success_url: `${base}&estado=ok`,
            cancel_url: `${base}&estado=cancelado`,
          });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
