import type { Plan } from "@/data/plans";
import { detailCopy } from "@/data/planDetails";
import type { Locale } from "@/i18n/locale";
import { openContactModalWith } from "@/lib/contactModal";

/** "Desde 199 €" / "Hablemos" — how a plan's price reads in a sentence. */
export function priceLabel(plan: Plan) {
  return plan.pricePrefix ? `${plan.pricePrefix} ${plan.price}` : plan.price;
}

/** Opens the questionnaire with the chosen plan already noted in its comment box. */
export function requestPlan(plan: Plan, locale: Locale) {
  openContactModalWith({ message: detailCopy[locale].message(plan.name, priceLabel(plan)) });
}
