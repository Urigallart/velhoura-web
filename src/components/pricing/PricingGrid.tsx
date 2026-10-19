"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectQuiz, type QuizSubmission } from "@/components/contact/ProjectQuiz";
import { PricingCard } from "@/components/ui/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonAction } from "@/components/ui/Button";
import type { Plan } from "@/data/plans";
import { detailCopy, getPlanDetail } from "@/data/planDetails";
import { getPlanQuiz } from "@/data/planQuiz";
import { useLocale } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/locale";
import { sendContact } from "@/lib/sendContact";
import { priceLabel } from "./request";

/** What the plan dialog is showing: the breakdown, the plan's form, or the thank-you. */
type View = "details" | "form" | "sent";

/**
 * The four plan cards plus the dialog they open. The cards are kept short —
 * name, pitch, price, call to action — so the whole section fits on one
 * screen; the full breakdown lives one click away.
 *
 * Each plan has its own short form (`data/planQuiz.ts`) inside the same
 * dialog: the visitor already picked what they want, so the full project
 * questionnaire — reserved for the navbar's "Empezar un proyecto" — would ask
 * them things they've just answered.
 */
export function PricingGrid({ plans }: { plans: Plan[] }) {
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const [view, setView] = useState<View>("details");
  const opener = useRef<HTMLElement | null>(null);

  const open = (id: string, start: View) => {
    opener.current = document.activeElement as HTMLElement | null;
    setView(start);
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
            <PricingCard
              plan={p}
              onDetails={() => open(p.id, "details")}
              onRequest={() => open(p.id, "form")}
            />
          </Reveal>
        ))}
      </div>

      <PlanDialog plan={plan} view={view} setView={setView} locale={locale} onClose={close} />
    </>
  );
}

function PlanDialog({
  plan,
  view,
  setView,
  locale,
  onClose,
}: {
  plan: Plan | undefined;
  view: View;
  setView: (v: View) => void;
  locale: Locale;
  onClose: () => void;
}) {
  const t = detailCopy[locale];
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const detail = plan ? getPlanDetail(plan.id, locale) : undefined;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // When the form was shown, for the API route's minimum-time check.
  const formShownAt = useRef(0);

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

  useEffect(() => {
    if (view !== "form") return;
    formShownAt.current = Date.now();
    dialogRef.current?.scrollTo({ top: 0 });
  }, [view, plan]);

  async function submit(s: QuizSubmission) {
    if (!plan) return;
    setSubmitting(true);
    setError(null);
    try {
      await sendContact(
        {
          ...s,
          kind: "quiz",
          // The plan heads the answers so the email says what was asked for.
          answers: [{ question: t.chosen, answer: `${plan.name} — ${priceLabel(plan)}` }, ...s.answers],
        },
        formShownAt.current,
        t.sendError,
      );
      setView("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.sendError);
    } finally {
      setSubmitting(false);
    }
  }

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
            aria-labelledby={view === "form" ? "contact-modal-title" : "plan-dialog-title"}
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
              className="absolute right-6 top-6 z-10 flex size-9 items-center justify-center rounded-full text-ink-mute transition-colors duration-300 hover:bg-paper-sunk hover:text-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {view === "form" ? (
              <ProjectQuiz
                key={plan.id}
                locale={locale}
                questions={getPlanQuiz(plan.id)}
                projectType={t.formIntro(plan.name)}
                eyebrow={`${t.formIntro(plan.name)} · ${priceLabel(plan)}`}
                submitting={submitting}
                errorMessage={error}
                onSubmit={submit}
                onBack={() => {
                  setError(null);
                  setView("details");
                }}
              />
            ) : view === "sent" ? (
              <div className="py-6">
                <p className="t-label !text-ember">{t.sentLabel}</p>
                <h2 id="plan-dialog-title" className="t-h2 mt-3">
                  {t.sentTitle}
                </h2>
                <p className="t-body mt-4 max-w-[42ch]">{t.sentBody(plan.name)}</p>
                <ButtonAction onClick={onClose} className="mt-8">
                  {t.close}
                </ButtonAction>
              </div>
            ) : (
              <>
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

                <ButtonAction arrow size="lg" className="mt-8 w-full" onClick={() => setView("form")}>
                  {t.cta}
                </ButtonAction>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
