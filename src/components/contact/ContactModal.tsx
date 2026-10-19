"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonAction } from "@/components/ui/Button";
import { onOpenContactModal, type ContactPrefill } from "@/lib/contactModal";
import { sendContact } from "@/lib/sendContact";
import { useLocale } from "@/i18n/useLocale";
import { ProjectQuiz, type QuizSubmission } from "./ProjectQuiz";
import { PrivacyConsent } from "./PrivacyConsent";

type Status = "idle" | "submitting" | "sent" | "error";

/** The questionnaire is the default; the free-text form stays available. */
type Mode = "quiz" | "message";

const copy = {
  es: {
    types: [
      "Web o tienda online",
      "Marca e identidad",
      "SEO y Google Ads",
      "Varias cosas",
      "Otro",
    ],
    sendError: "No se pudo enviar el mensaje.",
    close: "Cerrar",
    sentLabel: "Enviado",
    sentTitle: "Mensaje recibido.",
    sentBody: "Gracias por escribirnos. Te respondemos al correo que nos has dejado — normalmente el mismo día.",
    sentTitleQuiz: "Respuestas recibidas.",
    sentBodyQuiz: "Gracias. Con lo que nos has contado preparamos una primera propuesta y te la enviamos al correo que nos has dejado — normalmente en uno o dos días.",
    eyebrow: "Nuevo proyecto",
    title: "Cuéntanos tu negocio.",
    intro: "A qué te dedicas y qué te gustaría conseguir. Lo leemos y lo contestamos nosotros mismos.",
    backToQuiz: "¿Prefieres responder unas preguntas rápidas?",
    backToQuizCta: "Volver al cuestionario",
    name: "Nombre",
    email: "Email",
    type: "Tipo de proyecto",
    message: "Mensaje",
    company: "Empresa",
    sending: "Enviando…",
    send: "Enviar mensaje",
  },
  en: {
    types: [
      "Website or online store",
      "Brand and identity",
      "SEO and Google Ads",
      "Several things",
      "Other",
    ],
    sendError: "The message could not be sent.",
    close: "Close",
    sentLabel: "Sent",
    sentTitle: "Message received.",
    sentBody: "Thanks for writing to us. We'll reply to the email you left — usually the same day.",
    sentTitleQuiz: "Answers received.",
    sentBodyQuiz: "Thank you. We'll put together a first proposal from what you've told us and send it to the email you left — usually within a day or two.",
    eyebrow: "New project",
    title: "Tell us about your business.",
    intro: "What you do and what you'd like to achieve. We read it and reply ourselves.",
    backToQuiz: "Would you rather answer a few quick questions?",
    backToQuizCta: "Back to the questionnaire",
    name: "Name",
    email: "Email",
    type: "Project type",
    message: "Message",
    company: "Company",
    sending: "Sending…",
    send: "Send message",
  },
};

/**
 * The site's single contact surface, mounted once in the root layout. Anything
 * that wants to open it calls `openContactModal()` — see `lib/contactModal.ts`
 * — rather than holding its own open/closed state.
 *
 * Two anti-spam measures ride along with the submission and cost a human
 * nothing: a honeypot field that is invisible and unfocusable but irresistible
 * to a form-filling bot, and the time between opening the form and submitting
 * it. Anything that arrives with the honeypot filled, or filled out faster
 * than a person can read the first label, is dropped by the API route. Neither
 * requires a captcha, a third party, or a single request to anyone else.
 */
export function ContactModal() {
  const locale = useLocale();
  const t = copy[locale];
  const PROJECT_TYPES = t.types;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("quiz");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const openedAt = useRef(0);

  // What the opener already knew (a plan picked in the intro, say), and a
  // counter that remounts the form so each opening starts from those values.
  const [prefill, setPrefill] = useState<ContactPrefill | undefined>();
  const [formKey, setFormKey] = useState(0);

  useEffect(
    () =>
      onOpenContactModal((p) => {
        setPrefill(p);
        setMode("quiz");
        setFormKey((k) => k + 1);
        setOpen(true);
      }),
    [],
  );

  const close = useCallback(() => {
    setOpen(false);
    // Reset for next time, once the exit animation has run.
    window.setTimeout(() => {
      setStatus("idle");
      setErrorMessage(null);
    }, 320);
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    openedAt.current = Date.now();
    lastFocused.current = document.activeElement as HTMLElement | null;
    firstFieldRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      // Focus trap: keep Tab cycling inside the dialog. Disabled controls are
      // excluded — the submit button disables itself while sending, and
      // tabbing onto a dead control is a dead end.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    void send({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      projectType: String(form.get("projectType") ?? ""),
      message: String(form.get("message") ?? ""),
      company: String(form.get("company") ?? ""),
      consent: form.get("consent") === "on",
    });
  }

  function onQuizSubmit(submission: QuizSubmission) {
    void send({ ...submission, kind: "quiz" });
  }

  async function send(fields: Record<string, unknown>) {
    setStatus("submitting");
    setErrorMessage(null);

    // `company` (honeypot) and the elapsed time are the anti-spam pair, see above.
    try {
      await sendContact(fields, openedAt.current, t.sendError);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : t.sendError,
      );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label={t.close}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-night/45 backdrop-blur-[3px]"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90svh] w-full max-w-[560px] overflow-y-auto rounded-3xl border border-line bg-paper-raise p-7 shadow-[0_70px_130px_-46px_rgba(8,9,10,0.5)] sm:p-10"
          >
            <button
              type="button"
              aria-label={t.close}
              onClick={close}
              className="absolute right-6 top-6 flex size-9 items-center justify-center rounded-full text-ink-mute transition-colors duration-300 hover:bg-paper-sunk hover:text-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {status === "sent" ? (
              <div className="py-6">
                <p className="t-label !text-ember">{t.sentLabel}</p>
                <h2 className="t-h2 mt-3">
                  {mode === "quiz" ? t.sentTitleQuiz : t.sentTitle}
                </h2>
                <p className="t-body mt-4 max-w-[40ch]">
                  {mode === "quiz" ? t.sentBodyQuiz : t.sentBody}
                </p>
                <ButtonAction onClick={close} className="mt-8">
                  {t.close}
                </ButtonAction>
              </div>
            ) : mode === "quiz" ? (
              <ProjectQuiz
                key={formKey}
                locale={locale}
                prefillMessage={prefill?.message}
                submitting={status === "submitting"}
                errorMessage={status === "error" ? errorMessage : null}
                onSubmit={onQuizSubmit}
                onWriteInstead={() => {
                  setStatus("idle");
                  setErrorMessage(null);
                  setMode("message");
                }}
              />
            ) : (
              <>
                <p className="t-label !text-ember">{t.eyebrow}</p>
                <h2 id="contact-modal-title" className="t-h2 mt-3">
                  {t.title}
                </h2>
                <p className="t-body mt-4 max-w-[42ch] text-[0.9375rem]">
                  {t.intro}
                </p>

                <form key={formKey} onSubmit={onSubmit} className="mt-8 space-y-4">
                  <Field label={t.name}>
                    <input
                      ref={firstFieldRef}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="field"
                    />
                  </Field>

                  <Field label={t.email}>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="field"
                    />
                  </Field>

                  <Field label={t.type}>
                    <select
                      name="projectType"
                      defaultValue={prefill?.projectType ?? PROJECT_TYPES[0]}
                      className="field"
                    >
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label={t.message}>
                    <textarea
                      name="message"
                      required
                      defaultValue={prefill?.message}
                      rows={4}
                      className="field resize-none"
                    />
                  </Field>

                  {/*
                    Honeypot. Hidden from sight, removed from the tab order and
                    from the accessibility tree, and named like a field a bot
                    wants to fill. A human can neither see nor reach it, so any
                    submission carrying a value here is not one.
                  */}
                  <div aria-hidden="true" className="absolute left-[-9999px] top-0">
                    <label>
                      {t.company}
                      <input
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <PrivacyConsent locale={locale} />

                  {status === "error" && (
                    <p role="alert" className="text-sm text-ember-deep">
                      {errorMessage}
                    </p>
                  )}

                  <ButtonAction
                    type="submit"
                    arrow
                    disabled={status === "submitting"}
                    className="mt-2 w-full disabled:opacity-60"
                  >
                    {status === "submitting" ? t.sending : t.send}
                  </ButtonAction>
                </form>

                <p className="mt-8 border-t border-line pt-5 text-center text-[0.8125rem] text-ink-mute">
                  {t.backToQuiz}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage(null);
                      setMode("quiz");
                    }}
                    className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
                  >
                    {t.backToQuizCta}
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="t-label">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
