"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PricingCard } from "@/components/ui/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonAction } from "@/components/ui/Button";
import type { Plan } from "@/data/plans";
import { detailCopy, getPlanDetail } from "@/data/planDetails";
import { useLocale } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/locale";
import { priceLabel, requestPlan } from "./request";

/**
 * The four plan cards plus the detail dialog they open. The cards are kept
 * short — name, pitch, price, call to action — so the whole section fits on
 * one screen; the full breakdown lives one click away.
 */
export function PricingGrid({ plans }: { plans: Plan[] }) {
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = (id: string) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpenId(id);
  };

  const close = useCallback(() => {
    setOpenId(null);
    opener.current?.focus();
  }, []);

  const plan = plans.find((p) => p.id === openId);

  return (
    <>
      <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <Reveal key={p.id} delay={i * 100} variant="lift" y={34} className="h-full">
            <PricingCard plan={p} onDetails={() => open(p.id)} />
          </Reveal>
        ))}
      </div>

      <PlanDialog plan={plan} locale={locale} onClose={close} />
    </>
  );
}

function PlanDialog({
  plan,
  locale,
  onClose,
}: {
  plan: Plan | undefined;
  locale: Locale;
  onClose: () => void;
}) {
  const t = detailCopy[locale];
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const detail = plan ? getPlanDetail(plan.id, locale) : undefined;

  useEffect(() => {
    if (!plan) return;
    dialogRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [plan, onClose]);

  return (
    <AnimatePresence>
      {plan && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label={t.close}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-night/45 backdrop-blur-[3px]"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-dialog-title"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90svh] w-full max-w-[640px] overflow-y-auto rounded-3xl border border-line bg-paper-raise p-7 shadow-[0_70px_130px_-46px_rgba(8,9,10,0.5)] outline-none sm:p-10"
          >
            <button
              type="button"
              aria-label={t.close}
              onClick={onClose}
              className="absolute right-6 top-6 flex size-9 items-center justify-center rounded-full text-ink-mute transition-colors duration-300 hover:bg-paper-sunk hover:text-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <p className="t-label t-num">Plan {plan.index}</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pr-10">
              <h2 id="plan-dialog-title" className="t-h2">
                {plan.name}
              </h2>
              <p className="t-num pb-1 text-[1.125rem] font-medium text-ink">{priceLabel(plan)}</p>
            </div>
            <p className="t-body mt-4 max-w-[52ch]">{plan.pitch}</p>

            {detail && (
              <>
                <h3 className="t-label mt-9">{t.idealFor}</h3>
                <ul className="mt-3 space-y-2">
                  {detail.idealFor.map((line) => (
                    <li key={line} className="flex gap-3 text-[0.9375rem] text-ink-soft">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ember" />
                      {line}
                    </li>
                  ))}
                </ul>

                <h3 className="t-label mt-9">{t.includes}</h3>
                <dl className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                  {detail.includes.map((item) => (
                    <div key={item.title} className="bg-paper-raise px-4 py-3.5">
                      <dt className="text-[0.9375rem] font-medium text-ink">{item.title}</dt>
                      <dd className="mt-1 text-[0.8125rem] leading-relaxed text-ink-mute">{item.body}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-mute">{t.notIncluded}</p>
              </>
            )}

            <ButtonAction
              arrow
              size="lg"
              className="mt-8 w-full"
              onClick={() => {
                onClose();
                requestPlan(plan, locale);
              }}
            >
              {t.cta}
            </ButtonAction>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
