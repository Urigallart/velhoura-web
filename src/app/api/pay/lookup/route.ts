import { NextResponse } from "next/server";
import { normalizeCode } from "@/lib/payments";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";
import { findProject, projectState, stripe } from "@/lib/stripePayments";

/**
 * Looks up a payment code: the project it belongs to and what the client can
 * pay now. Answers with error codes the page translates, never with Stripe's
 * own messages or ids beyond what the page needs to show.
 *
 * Rate limited, so codes can't be found by guessing: 15 lookups per IP every
 * 10 minutes.
 */
const limited = createRateLimiter(15, 10 * 60 * 1000);

export async function POST(request: Request) {
  const s = stripe();
  if (!s) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (limited(clientIp(request))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await request.json().catch(() => null);
  const code = normalizeCode(body?.code);
  if (!code) return NextResponse.json({ error: "invalid_code" }, { status: 400 });

  try {
    const project = await findProject(s, code);
    if (!project) return NextResponse.json({ error: "not_found" }, { status: 404 });
    const state = await projectState(s, project);
    return NextResponse.json({
      project: {
        code: project.code,
        name: project.name,
        description: project.description,
        total: project.total,
        currency: project.currency,
      },
      state,
    });
  } catch {
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
