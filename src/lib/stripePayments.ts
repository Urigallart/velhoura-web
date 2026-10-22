import Stripe from "stripe";
import {
  CODE_KEY,
  computeState,
  parseMonths,
  parseOptions,
  type PayState,
  type Project,
  type Subscription,
} from "./payments";

/**
 * The Stripe side of client payments: find a project by its code and read
 * back what has been paid. Server-only — it holds the secret key.
 *
 * Requires `STRIPE_SECRET_KEY` (Vercel → Project Settings → Environment
 * Variables). A test key (sk_test_…) runs everything against Stripe's test
 * mode with test cards; switching to the live key is the only change needed
 * to take real payments. Without a key the payment routes answer
 * "not configured" and the page says so.
 *
 * Product search is eventually consistent: a product created in the
 * Dashboard can take up to about a minute to be found by its code.
 */

let client: Stripe | null = null;

export function stripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!client) client = new Stripe(key);
  return client;
}

/** Search values are quoted; codes are already restricted to [A-Z0-9-]. */
const q = (v: string) => `'${v.replace(/'/g, "")}'`;

export async function findProject(s: Stripe, code: string): Promise<Project | null> {
  const res = await s.products.search({
    query: `active:'true' AND metadata['code']:${q(code)}`,
    expand: ["data.default_price"],
    limit: 1,
  });
  const product = res.data[0];
  if (!product) return null;
  const price = product.default_price as Stripe.Price | null;
  if (!price || typeof price !== "object" || price.unit_amount == null) return null;
  return {
    productId: product.id,
    code,
    name: product.name,
    description: product.description,
    total: price.unit_amount,
    currency: price.currency,
    options: parseOptions(product.metadata.options),
    months: parseMonths(product.metadata.months),
  };
}

/** Sum of the successful one-off payments made with this code, in cents. */
async function paidSoFar(s: Stripe, code: string): Promise<number> {
  let paid = 0;
  let page: string | undefined;
  do {
    const res = await s.paymentIntents.search({
      query: `status:'succeeded' AND metadata['${CODE_KEY}']:${q(code)}`,
      limit: 100,
      ...(page ? { page } : {}),
    });
    for (const pi of res.data) paid += pi.amount_received;
    page = res.has_more && res.next_page ? res.next_page : undefined;
  } while (page);
  return paid;
}

/** The live monthly subscription for this code, if there is one. */
async function activeSubscription(s: Stripe, code: string): Promise<Subscription | null> {
  const res = await s.subscriptions.search({
    query: `metadata['${CODE_KEY}']:${q(code)}`,
    limit: 10,
  });
  const live = res.data.find((x) => ["active", "trialing", "past_due", "unpaid"].includes(x.status));
  return live ? { start: live.start_date, status: live.status } : null;
}

export async function projectState(s: Stripe, project: Project): Promise<PayState> {
  const [paid, sub] = await Promise.all([paidSoFar(s, project.code), activeSubscription(s, project.code)]);
  return computeState(project, paid, sub);
}
