"use client";

import { ButtonAction } from "@/components/ui/Button";
import type { Plan } from "@/data/plans";
import { detailCopy } from "@/data/planDetails";
import { useLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/utils";

/**
 * A plan as a summary card: what it is, what it costs, and the way in. The
 * full list of what's included opens in a dialog (`PricingGrid`) — clicking
 * anywhere on the card, or its "see what's included" link, opens it — so all
 * four plans fit on one screen.
 *
 * The featured plan inverts to ink instead of shouting in colour: on a page
 * with one accent, the loudest thing available is the absence of the ground.
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
        "group relative flex h-full cursor-pointer flex-col rounded-2xl border p-6 sm:p-7",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--e-out)]",
        "hover:-translate-y-1.5",
        featured
          ? "border-night bg-night text-paper-raise shadow-[0_34px_74px_-34px_rgba(8,9,10,0.55)]"
          : "border-line bg-paper-raise hover:border-line-strong hover:shadow-[0_26px_58px_-32px_rgba(8,9,10,0.26)]",
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-ember px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-paper-raise uppercase sm:left-7">
          {locale === "en" ? "Recommended" : "Recomendado"}
        </span>
      )}

      <p className={cn("t-label t-num", featured && "!text-paper-raise/45")}>Plan {plan.index}</p>

      <h3 className={cn("t-h3 mt-2.5 text-[1.375rem]", featured ? "text-paper-raise" : "text-ink")}>
        {plan.name}
      </h3>

      <p
        className={cn(
          "mt-2.5 flex-1 text-[0.9375rem] leading-relaxed",
          featured ? "text-paper-raise/65" : "text-ink-soft",
        )}
      >
        {plan.pitch}
      </p>

      <div className={cn("my-6 h-px", featured ? "bg-night-line" : "bg-line")} />

      <div>
        <p className={cn("t-label", featured && "!text-paper-raise/45", !plan.pricePrefix && "invisible")}>
          {plan.pricePrefix ?? "·"}
        </p>
        <p className={cn("t-h2 t-num mt-1", featured ? "text-paper-raise" : "text-ink")}>{plan.price}</p>
        {plan.priceNote && (
          <p className={cn("mt-1.5 text-xs", featured ? "text-paper-raise/45" : "text-ink-mute")}>
            {plan.priceNote}
          </p>
        )}
      </div>

      <ButtonAction
        onClick={(e) => {
          e.stopPropagation();
          onRequest();
        }}
        arrow
        size="lg"
        variant={featured ? "outline-inverse" : "solid"}
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
        className={cn(
          "mt-3 inline-flex items-center justify-center gap-1.5 self-center text-[0.8125rem] font-medium underline underline-offset-4 transition-colors duration-300",
          featured
            ? "text-paper-raise/75 decoration-paper-raise/30 hover:text-paper-raise"
            : "text-ink-soft decoration-line-strong hover:text-ink hover:decoration-ink",
        )}
      >
        {t.seeMore}
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
