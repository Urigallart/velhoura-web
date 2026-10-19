"use client";

import { ButtonAction } from "@/components/ui/Button";
import type { Plan } from "@/data/plans";
import { openContactModal } from "@/lib/contactModal";
import { useLocale } from "@/i18n/useLocale";
import { cn } from "@/lib/utils";

/**
 * A plan, presented as a spec sheet rather than as a pricing table.
 *
 * Two decisions carry it. The figure is set at headline scale with the
 * qualifier demoted to mono above it, so the number is the thing the eye
 * lands on. And the featured plan inverts to ink instead of shouting in
 * colour — on a page with one accent, the loudest thing available is not more
 * colour, it is the absence of the page's ground.
 *
 * The call to action opens the contact modal directly instead of scrolling to
 * `#contact` and asking the visitor to find the button again: the plan they
 * pressed is the context, and sending them somewhere to repeat the decision
 * loses it.
 */
export function PricingCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.featured);
  const locale = useLocale();

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border p-7 sm:p-8",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--e-out)]",
        "hover:-translate-y-2",
        featured
          ? "border-night bg-night text-paper-raise shadow-[0_34px_74px_-34px_rgba(8,9,10,0.55)]"
          : "border-line bg-paper-raise hover:border-line-strong hover:shadow-[0_26px_58px_-32px_rgba(8,9,10,0.26)]",
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-ember px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-paper-raise uppercase">
          {locale === "en" ? "Recommended" : "Recomendado"}
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <p className={cn("t-label t-num", featured && "!text-paper-raise/45")}>
          Plan {plan.index}
        </p>
      </div>

      <h3
        className={cn(
          "t-h3 mt-3 text-[1.375rem]",
          featured ? "text-paper-raise" : "text-ink",
        )}
      >
        {plan.name}
      </h3>

      <p
        className={cn(
          "mt-3 text-[0.9375rem] leading-relaxed",
          featured ? "text-paper-raise/65" : "text-ink-soft",
        )}
      >
        {plan.pitch}
      </p>

      <div className={cn("my-7 h-px", featured ? "bg-night-line" : "bg-line")} />

      <ul className="flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3.5">
            {/* A rule, not a tick. Ticks are a promise; a spec line is a fact. */}
            <span
              aria-hidden="true"
              className={cn(
                "mt-[0.6em] h-px w-3 shrink-0",
                featured ? "bg-paper-raise/35" : "bg-ember",
              )}
            />
            <span
              className={cn(
                "text-[0.9375rem] leading-snug",
                featured ? "text-paper-raise/80" : "text-ink-soft",
              )}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-9">
        {plan.pricePrefix && (
          <p className={cn("t-label", featured && "!text-paper-raise/45")}>
            {plan.pricePrefix}
          </p>
        )}
        <p
          className={cn(
            "t-h2 t-num mt-1.5",
            featured ? "text-paper-raise" : "text-ink",
          )}
        >
          {plan.price}
        </p>
        {plan.priceNote && (
          <p
            className={cn(
              "mt-2 text-xs",
              featured ? "text-paper-raise/45" : "text-ink-mute",
            )}
          >
            {plan.priceNote}
          </p>
        )}

        <ButtonAction
          onClick={openContactModal}
          arrow
          size="lg"
          variant={featured ? "outline" : "solid"}
          className={cn(
            "mt-6 w-full",
            featured &&
              "border-paper-raise/25 text-paper-raise hover:text-night [&>span:first-child]:bg-paper-raise",
          )}
        >
          {plan.cta}
        </ButtonAction>
      </div>
    </div>
  );
}
