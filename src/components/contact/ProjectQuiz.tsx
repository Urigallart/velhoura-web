"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonAction } from "@/components/ui/Button";
import {
  activeQuestions,
  pruneAnswers,
  summarize,
  type QuizAnswers,
  type QuizQuestion,
} from "@/data/quiz";
import type { Locale } from "@/i18n/locale";
import { cn } from "@/lib/utils";
import { PrivacyConsent } from "./PrivacyConsent";

const copy = {
  es: {
    back: "Volver",
    step: (n: number, total: number) => `Paso ${n} de ${total}`,
    next: "Siguiente",
    pickOne: "Elige una opción para continuar.",
    contactTitle: "¿Dónde te enviamos la propuesta?",
    contactHelp:
      "Con lo que nos has contado preparamos una primera propuesta y te la enviamos nosotros mismos, sin compromiso.",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono",
    optional: "opcional",
    comment: "¿Algo más que debamos saber?",
    commentPlaceholder: "Referencias que te gusten, plazos, dudas…",
    send: "Enviar respuestas",
    sending: "Enviando…",
    writeInstead: "¿Prefieres contárnoslo con tus palabras?",
    writeInsteadCta: "Escríbenos un mensaje",
  },
  en: {
    back: "Back",
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    next: "Next",
    pickOne: "Pick an option to continue.",
    contactTitle: "Where should we send the proposal?",
    contactHelp:
      "We'll put together a first proposal from your answers and send it to you ourselves, no strings attached.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    comment: "Anything else we should know?",
    commentPlaceholder: "References you like, deadlines, questions…",
    send: "Send answers",
    sending: "Sending…",
    writeInstead: "Would you rather tell us in your own words?",
    writeInsteadCta: "Write us a message",
  },
};

export type QuizSubmission = {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot — see `ContactModal`. */
  company: string;
  /** The privacy checkbox; the form can't submit without it. */
  consent: boolean;
  answers: { question: string; answer: string }[];
  /** First answer to "what would you like to build", for the email subject. */
  projectType: string;
};

/**
 * One question per screen, one click per answer. The list of questions is
 * recomputed from the answers on every render (`activeQuestions`), so going
 * back and changing the sector swaps the sector questions that follow.
 * Single-choice questions advance on their own; multi-choice ones wait for
 * "Next". The last step is the only one that asks the visitor to type.
 */
export function ProjectQuiz({
  locale,
  prefillMessage,
  submitting,
  errorMessage,
  onSubmit,
  onWriteInstead,
}: {
  locale: Locale;
  prefillMessage?: string;
  submitting: boolean;
  errorMessage: string | null;
  onSubmit: (submission: QuizSubmission) => void;
  onWriteInstead: () => void;
}) {
  const t = copy[locale];
  const reduced = useReducedMotion();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [missing, setMissing] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);

  const questions = useMemo(() => activeQuestions(answers), [answers]);
  // The contact form is the step after the last question.
  const total = questions.length + 1;
  const onContact = index >= questions.length;
  const question: QuizQuestion | undefined = questions[index];
  const progress = Math.round(((index + 1) / total) * 100);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  // Move focus to each new step's heading so keyboard and screen-reader
  // users land on the question rather than on a button that just vanished.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [index]);

  function go(to: number) {
    window.clearTimeout(advanceTimer.current);
    setDirection(to > index ? 1 : -1);
    setMissing(false);
    setIndex(to);
  }

  function choose(q: QuizQuestion, optionId: string) {
    const current = answers[q.id] ?? [];
    let next: string[];

    if (!q.multi) {
      next = [optionId];
    } else {
      const option = q.options.find((opt) => opt.id === optionId);
      if (current.includes(optionId)) {
        next = current.filter((v) => v !== optionId);
      } else if (option?.exclusive) {
        next = [optionId];
      } else {
        const exclusive = new Set(
          q.options.filter((opt) => opt.exclusive).map((opt) => opt.id),
        );
        next = [...current.filter((v) => !exclusive.has(v)), optionId];
      }
    }

    setAnswers((prev) => ({ ...prev, [q.id]: next }));
    setMissing(false);

    // A single choice is the whole answer: move on after a beat, so the
    // selected state registers before the screen changes.
    if (!q.multi) {
      advanceTimer.current = window.setTimeout(() => go(index + 1), reduced ? 0 : 260);
    }
  }

  function next() {
    if (question && (answers[question.id] ?? []).length === 0) {
      setMissing(true);
      return;
    }
    go(index + 1);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const clean = pruneAnswers(answers);
    const summary = summarize(clean, locale);
    const needs = summary.find((s) => s.question === questions[0]?.title[locale]);

    onSubmit({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      company: String(form.get("company") ?? ""),
      consent: form.get("consent") === "on",
      answers: summary,
      projectType: needs?.answer ?? "",
    });
  }

  const slide = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 28 * direction },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -28 * direction },
      };

  return (
    <div>
      {/* Top bar: back + progress. Leaves room for the dialog's close button. */}
      <div className="flex h-9 items-center pr-12">
        {index > 0 && (
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[0.8125rem] text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            {t.back}
          </button>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between font-mono text-[0.6875rem] tracking-[0.08em] text-ink-mute uppercase">
          <span>{t.step(index + 1, total)}</span>
          <span className="t-num">{progress}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label={t.step(index + 1, total)}
          className="mt-2.5 h-1 overflow-hidden rounded-full bg-paper-sunk"
        >
          <div
            className="h-full rounded-full bg-ember transition-[width] duration-500 ease-[var(--e-out)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={onContact ? "contact" : question?.id}
          {...slide}
          transition={{ duration: reduced ? 0.15 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          {onContact ? (
            <form onSubmit={submit} className="space-y-4">
              <h2
                ref={headingRef}
                tabIndex={-1}
                id="contact-modal-title"
                className="t-h3 text-[1.625rem] leading-tight outline-none"
              >
                {t.contactTitle}
              </h2>
              <p className="t-body !mt-3 max-w-[44ch] text-[0.9375rem]">{t.contactHelp}</p>

              <div className="!mt-7 grid gap-4 sm:grid-cols-2">
                <Field label={t.name}>
                  <input name="name" type="text" required autoComplete="name" className="field" />
                </Field>
                <Field label={t.email}>
                  <input name="email" type="email" required autoComplete="email" className="field" />
                </Field>
              </div>

              <Field label={t.phone} hint={t.optional}>
                <input name="phone" type="tel" autoComplete="tel" className="field" />
              </Field>

              <Field label={t.comment} hint={t.optional}>
                <textarea
                  name="message"
                  rows={3}
                  defaultValue={prefillMessage}
                  placeholder={t.commentPlaceholder}
                  className="field resize-none"
                />
              </Field>

              {/* Honeypot — see `ContactModal`. */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-0">
                <label>
                  Company
                  <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <PrivacyConsent locale={locale} />

              {errorMessage && (
                <p role="alert" className="text-sm text-ember-deep">
                  {errorMessage}
                </p>
              )}

              <ButtonAction
                type="submit"
                arrow
                size="lg"
                disabled={submitting}
                className="!mt-6 w-full disabled:opacity-60"
              >
                {submitting ? t.sending : t.send}
              </ButtonAction>
            </form>
          ) : question ? (
            <div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                id="contact-modal-title"
                className="t-h3 text-[1.625rem] leading-tight outline-none"
              >
                {question.title[locale]}
              </h2>
              <p className="t-body mt-3 max-w-[46ch] text-[0.9375rem]">
                {question.help[locale]}
              </p>

              <div
                role="group"
                aria-labelledby="contact-modal-title"
                className="mt-7 space-y-2.5"
              >
                {question.options.map((opt) => {
                  const selected = (answers[question.id] ?? []).includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(question, opt.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-2xl border px-5 py-3.5 text-left",
                        "transition-[border-color,background-color] duration-200",
                        selected
                          ? "border-ink bg-paper-sunk"
                          : "border-line bg-paper-raise hover:border-line-strong hover:bg-paper-sunk/60",
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.9375rem] font-medium text-ink">
                          {opt.label[locale]}
                        </span>
                        {opt.hint && (
                          <span className="mt-0.5 block text-[0.8125rem] text-ink-mute">
                            {opt.hint[locale]}
                          </span>
                        )}
                      </span>
                      <Mark selected={selected} multi={Boolean(question.multi)} />
                    </button>
                  );
                })}
              </div>

              {question.note && (
                <p className="mt-4 text-[0.8125rem] text-ink-mute">{question.note[locale]}</p>
              )}

              {question.multi && (
                <div className="mt-7 flex flex-col items-center gap-3">
                  <ButtonAction onClick={next} arrow size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
                    {t.next}
                  </ButtonAction>
                </div>
              )}

              {missing && (
                <p role="alert" className="mt-3 text-center text-sm text-ember-deep">
                  {t.pickOne}
                </p>
              )}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* The free-text route stays one click away for anyone it doesn't fit. */}
      {(index === 0 || onContact) && (
        <p className="mt-8 border-t border-line pt-5 text-center text-[0.8125rem] text-ink-mute">
          {t.writeInstead}{" "}
          <button
            type="button"
            onClick={onWriteInstead}
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
          >
            {t.writeInsteadCta}
          </button>
        </p>
      )}
    </div>
  );
}

/** Radio dot for single-choice questions, checkbox for multi-choice ones. */
function Mark({ selected, multi }: { selected: boolean; multi: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center border transition-colors duration-200",
        multi ? "rounded-md" : "rounded-full",
        selected ? "border-ink bg-ink text-paper-raise" : "border-line-strong",
      )}
    >
      {selected &&
        (multi ? (
          <svg viewBox="0 0 16 16" fill="none" className="size-3">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <span className="size-2 rounded-full bg-paper-raise" />
        ))}
    </span>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="t-label">
        {label}
        {hint && <span className="ml-1.5 normal-case tracking-normal text-ink-faint">({hint})</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
