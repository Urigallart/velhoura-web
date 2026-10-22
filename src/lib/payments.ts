/**
 * Client payments — the rules, with no Stripe calls in them (see
 * `stripePayments.ts` for those), so they can be reasoned about and tested
 * on their own.
 *
 * ── How a payment is set up ─────────────────────────────────────────────
 * For each client the studio creates a Product in the Stripe Dashboard:
 *   · name         what the client sees, e.g. "Web Business — Panadería López"
 *   · description  optional, one line about the project
 *   · price        a one-time price with the project's total (VAT as agreed)
 *   · metadata     code     = the code given to the client, e.g. VH-7K3P-Q9
 *                  options  = which ways to pay are offered (optional;
 *                             default "full,half,monthly")
 *                  months   = commitment for the monthly option (optional;
 *                             default 12)
 * `npm run payment-code` prints a fresh, hard-to-guess code.
 *
 * The client types the code at /gestiones, picks how to pay, and is sent to
 * Stripe Checkout. Nothing is stored here: what has been paid is read back
 * from Stripe each time, through the code saved on every payment.
 */

export type PayOption = "full" | "half" | "monthly";
export const ALL_OPTIONS: PayOption[] = ["full", "half", "monthly"];
export const DEFAULT_MONTHS = 12;

/** Metadata key that ties every payment and subscription back to its code. */
export const CODE_KEY = "velhoura_code";

export type Project = {
  productId: string;
  code: string;
  name: string;
  description: string | null;
  /** In cents. */
  total: number;
  currency: string;
  options: PayOption[];
  months: number;
};

export type Subscription = {
  /** Unix seconds. */
  start: number;
  status: string;
};

/** What the client can do next with this code. */
export type PayState =
  | { kind: "open"; offers: Offer[] }
  | { kind: "partial"; paid: number; remaining: number; offers: Offer[] }
  | { kind: "paid"; paid: number }
  | { kind: "subscribed"; monthly: number; months: number; start: number; commitmentEnds: number };

export type Offer = {
  option: PayOption | "rest";
  /** Charged now, in cents (per month for "monthly"). */
  now: number;
  /** For "half": the second payment, at delivery. */
  later?: number;
  /** For "monthly": the commitment, in months. */
  months?: number;
};

/** Codes are short, uppercase, letters, digits and dashes. */
export function normalizeCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toUpperCase().replace(/\s+/g, "");
  return /^[A-Z0-9-]{4,24}$/.test(code) ? code : null;
}

export function parseOptions(raw: string | undefined): PayOption[] {
  if (!raw) return ALL_OPTIONS;
  const picked = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is PayOption => (ALL_OPTIONS as string[]).includes(s));
  return picked.length ? picked : ALL_OPTIONS;
}

export function parseMonths(raw: string | undefined): number {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 2 && n <= 36 ? n : DEFAULT_MONTHS;
}

export const halfOf = (total: number) => Math.ceil(total / 2);
export const monthlyOf = (total: number, months: number) => Math.ceil(total / months);

/** Adds whole months to a Unix-seconds date, in UTC. */
export function addMonths(unix: number, months: number): number {
  const d = new Date(unix * 1000);
  d.setUTCMonth(d.getUTCMonth() + months);
  return Math.floor(d.getTime() / 1000);
}

export function computeState(project: Project, paid: number, sub: Subscription | null): PayState {
  if (sub) {
    return {
      kind: "subscribed",
      monthly: monthlyOf(project.total, project.months),
      months: project.months,
      start: sub.start,
      commitmentEnds: addMonths(sub.start, project.months),
    };
  }
  if (paid >= project.total) return { kind: "paid", paid };
  if (paid > 0) {
    const remaining = project.total - paid;
    return { kind: "partial", paid, remaining, offers: [{ option: "rest", now: remaining }] };
  }
  const offers: Offer[] = project.options.map((option) => {
    if (option === "full") return { option, now: project.total };
    if (option === "half") {
      const first = halfOf(project.total);
      return { option, now: first, later: project.total - first };
    }
    return { option, now: monthlyOf(project.total, project.months), months: project.months };
  });
  return { kind: "open", offers };
}

/** The offer for a requested option, only if the current state allows it. */
export function offerFor(state: PayState, option: string): Offer | null {
  if (state.kind !== "open" && state.kind !== "partial") return null;
  return state.offers.find((o) => o.option === option) ?? null;
}
