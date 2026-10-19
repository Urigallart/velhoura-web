"use client";

import { ButtonAction } from "@/components/ui/Button";
import type { Plan } from "@/data/plans";
import { detailCopy } from "@/data/planDetails";
import { useLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/utils";

/**
 * One colour per plan, loud on purpose: the price section is where the page
 * stops being quiet. Text stays ink on all four so every card reads cleanly.
 */
const tones: Record<string, string> = {
  landing: "bg-[#dcf56a]",
  business: "bg-[#ff7d5c]",
  ecommerce: "bg-[#9ccfff]",
  custom: "bg-[#c7a8ff]",
};

/**
 * A plan as a summary card: what it is, what it costs, and the way in. The
 * full list of what's included opens in a dialog (`PricingGrid`) — clicking
 * anywhere on the card, or its "see what's included" link, opens it — so all
 * four plans fit on one screen.
 */
export function PricingCard({
  plan,
  onDetails,
  onRequest,
}: {
  plan: Plan;
  onDetails: () => void;
  /** The call to action: opens this plan's own short form. */
  onRequest: () => void;
}) {
  const featured = Boolean(plan.featured);
  const locale = useLocale();
  const t = detailCopy[locale];

  return (
    // The whole card opens the details for pointer users; keyboard and
    // screen-reader users get the explicit button below, so nothing depends
    // on a click handler on a non-interactive element.
    <div
      onClick={onDetails}
      data-plan-card
      className={cn(
        "group relative flex h-full cursor-pointer flex-col rounded-3xl p-6 text-ink sm:p-7",
        "transition-[transform,box-shadow] duration-500 ease-[var(--e-out)]",
        "hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(8,9,10,0.4)]",
        tones[plan.id] ?? "bg-paper-sunk",
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-ink px-3.5 py-1 text-[0.8125rem] font-semibold text-paper-raise sm:left-7">
          {locale === "en" ? "Recommended" : "Recomendado"}
        </span>
      )}

      <h3 className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">{plan.name}</h3>

      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink/75">{plan.pitch}</p>

      <div className="mt-7">
        <p className="flex items-baseline gap-2">
          {plan.pricePrefix && <span className="text-[0.9375rem] font-medium text-ink/70">{plan.pricePrefix}</span>}
          <span className="t-num text-[clamp(2.25rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.05em]">
            {plan.price}
          </span>
        </p>
        {plan.priceNote && <p className="mt-2 text-[0.8125rem] text-ink/60">{plan.priceNote}</p>}
      </div>

      <ButtonAction
        onClick={(e) => {
          e.stopPropagation();
          onRequest();
        }}
        arrow
        size="lg"
        variant="solid"
        className="mt-6 w-full"
      >
        {plan.cta}
      </ButtonAction>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDetails();
        }}
        className="mt-3 inline-flex items-center justify-center gap-1.5 self-center text-[0.875rem] font-medium underline decoration-ink/30 underline-offset-4 transition-colors duration-300 hover:decoration-ink"
      >
        {t.seeMore}
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
