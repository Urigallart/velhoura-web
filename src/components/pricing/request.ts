import type { Plan } from "@/data/plans";

/** "Desde 199 €" / "Hablemos" — how a plan's price reads in a sentence. */
export function priceLabel(plan: Plan) {
  return plan.pricePrefix ? `${plan.pricePrefix} ${plan.price}` : plan.price;
}
