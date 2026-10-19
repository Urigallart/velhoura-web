"use client";

import { useRef, useState } from "react";
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

  // Two faces: the price, and what the plan includes. A mouse pointer over
  // the card shows the features and leaving brings the price back; on a touch
  // screen a sideways swipe flips it. The dots do the same for the keyboard.
  const [face, setFace] = useState<0 | 1>(0);
  const touch = useRef<{ x: number; y: number } | null>(null);

  return (
    // The whole card opens the details for pointer users; keyboard and
    // screen-reader users get the explicit button below, so nothing depends
    // on a click handler on a non-interactive element.
    <div
      onClick={onDetails}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFace(1)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFace(0)}
      onTouchStart={(e) => {
        const t0 = e.touches[0];
        touch.current = { x: t0.clientX, y: t0.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const t1 = e.changedTouches[0];
        const dx = t1.clientX - start.x;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(t1.clientY - start.y)) {
          setFace((f) => (f === 0 ? 1 : 0));
        }
      }}
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

      {/* Both faces share one cell, so the card never changes height. */}
      <div className="mt-3 grid flex-1">
        <div
          className={cn(
            "col-start-1 row-start-1 flex flex-col transition-opacity duration-700",
            face === 0 ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={face !== 0}
        >
          <p className="flex-1 text-[0.9375rem] leading-relaxed text-ink/75">{plan.pitch}</p>
          <div className="mt-7">
            <p className="flex items-baseline gap-2">
              {plan.pricePrefix && <span className="text-[0.9375rem] font-medium text-ink/70">{plan.pricePrefix}</span>}
              <span className="t-num text-[clamp(2.25rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.05em]">
                {plan.price}
              </span>
            </p>
            {plan.priceNote && <p className="mt-2 text-[0.8125rem] text-ink/60">{plan.priceNote}</p>}
          </div>
        </div>

        <ul
          className={cn(
            "col-start-1 row-start-1 space-y-2 transition-opacity duration-700",
            face === 1 ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={face !== 1}
        >
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink/85">
              <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-ink" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-center gap-2" role="group">
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={i === 0 ? t.priceFace : t.featuresFace}
            aria-pressed={face === i}
            onClick={(e) => {
              e.stopPropagation();
              setFace(i as 0 | 1);
            }}
            className={cn(
              "h-2 rounded-full bg-ink transition-[width,opacity] duration-500",
              face === i ? "w-6 opacity-90" : "w-2 opacity-30 hover:opacity-60",
            )}
          />
        ))}
      </div>

      <ButtonAction
        onClick={(e) => {
          e.stopPropagation();
          onRequest();
        }}
        arrow
        size="lg"
        variant="solid"
        className="mt-5 w-full hover:!bg-paper-raise hover:!text-ink"
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
