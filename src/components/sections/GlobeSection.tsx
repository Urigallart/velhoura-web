"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StoryGlobeLoader } from "@/components/3d/StoryGlobeLoader";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/i18n/useLocale";
import { openContactModal } from "@/lib/contactModal";

/**
 * "Velhoura, desde España." — the studio's globe, large, turned to Spain with
 * a pin on Barcelona. The pin (or the button beside it) opens a card that
 * tells the studio's story in four short chapters.
 *
 * Every statement in the chapters comes from facts already published on the
 * site — the two partners, their backgrounds, the products they have built,
 * who they work for. There is no founding date and no origin anecdote here
 * because none has been supplied; add them to `chapters` when they are.
 */

const copy = {
  es: {
    label: "Desde España",
    lines: ["Velhoura,", "*desde España.*"],
    lead: "Un estudio de Barcelona que diseña, programa y lanza. Toca el pin y te contamos cómo llegamos hasta aquí.",
    pinLabel: "Barcelona · España",
    pinAria: "Barcelona, España: abrir nuestra historia",
    hint: "Empieza por Barcelona",
    read: "Leer las postales",
    close: "Cerrar",
    chapter: (n: number) => `Postal ${n}`,
    prev: "Anterior",
    next: "Siguiente",
    cardAria: "Nuestra historia, en postales",
    postal: "Postal",
    sign: "Oriol e Ian",
    stamp: "Barcelona",
    drag: "Arrastra para girar el globo",
    cta: "Cuéntanos tu negocio",
    chapters: [
      {
        title: "Aquí empezamos.",
        body: "Barcelona. Somos Oriol e Ian, y trabajamos con negocios de la ciudad y de alrededor.",
      },
      {
        title: "Con quien hablas es quien lo hace.",
        body: "Oriol viene del desarrollo y del diseño de interfaces. Ian, de los sistemas, las redes y React. No hay nadie entre tú y quien te hace la web.",
      },
      {
        title: "Probamos primero en casa.",
        body: "Tenemos productos propios: las gafas Velhoura, Roady, Gym Tracker y Zhestar. Lo que aprendemos ahí lo usamos en tu proyecto.",
      },
      {
        title: "Ahora te toca a ti.",
        body: "Marca, web y clientes, en el mismo equipo. Cuéntanos qué haces y lo vemos.",
      },
    ],
  },
  en: {
    label: "From Spain",
    lines: ["Velhoura,", "*from Spain.*"],
    lead: "A Barcelona studio that designs, builds and launches. Tap the pin and we'll tell you how we got here.",
    pinLabel: "Barcelona · Spain",
    pinAria: "Barcelona, Spain: open our story",
    hint: "Start with Barcelona",
    read: "Read the postcards",
    close: "Close",
    chapter: (n: number) => `Postcard ${n}`,
    prev: "Previous",
    next: "Next",
    cardAria: "Our story, in postcards",
    postal: "Postcard",
    sign: "Oriol & Ian",
    stamp: "Barcelona",
    drag: "Drag to turn the globe",
    cta: "Tell us about your business",
    chapters: [
      {
        title: "This is where we start.",
        body: "Barcelona. We're Oriol and Ian, and we work with businesses in the city and around it.",
      },
      {
        title: "Who you talk to is who builds it.",
        body: "Oriol comes from development and interface design. Ian from systems, networks and React. There's nobody between you and the person building your site.",
      },
      {
        title: "We try it at home first.",
        body: "We have products of our own: the Velhoura sunglasses, Roady, Gym Tracker and Zhestar. What we learn there goes into your project.",
      },
      {
        title: "Now it's your turn.",
        body: "Brand, web and customers, in one team. Tell us what you do and we'll take it from there.",
      },
    ],
  },
};

const CARD_ID = "story-card";

export function GlobeSection() {
  const locale = useLocale();
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const last = t.chapters.length - 1;
  const chapter = t.chapters[step];

  const toggle = () => {
    setOpen((v) => {
      if (!v) setStep(0);
      return !v;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="story" className="band relative overflow-hidden border-t border-line">
      <div className="shell">
        <div className="text-center">
          <Reveal y={10}>
            <p className="t-label !font-sans !normal-case !tracking-normal !text-[0.875rem] flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-line-strong" />
              {t.label}
              <span aria-hidden="true" className="h-px w-7 bg-line-strong" />
            </p>
          </Reveal>
          <MaskedTitle
            as="h2"
            split="word"
            lines={t.lines}
            className="mx-auto mt-7 text-balance font-semibold leading-[0.95] tracking-[-0.045em] text-[clamp(2.5rem,9vw,7.25rem)]"
            stagger={90}
          />
          <Reveal delay={240}>
            <p className="t-lead mx-auto mt-7 max-w-[52ch] text-pretty">{t.lead}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid items-center gap-x-10 gap-y-8 lg:mt-14 lg:grid-cols-12">
          {/* The globe, on its own — nothing around it. */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[760px]">
              <StoryGlobeLoader
                open={open}
                onPin={toggle}
                pinLabel={t.pinLabel}
                pinAria={t.pinAria}
                controls={CARD_ID}
              />
              <p
                aria-hidden="true"
                className="t-label !font-sans !normal-case !tracking-normal !text-[0.8125rem] pointer-events-none absolute inset-x-0 bottom-[1%] text-center !text-ink-faint"
              >
                {t.drag}
              </p>
            </div>
          </Reveal>

          {/* The story. */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="card"
                  id={CARD_ID}
                  role="region"
                  aria-label={t.cardAria}
                  initial={{ opacity: 0, y: 18, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: -1.2 }}
                  exit={{ opacity: 0, y: 8, rotate: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-md border border-line bg-paper-raise p-7 pb-6 shadow-[0_26px_60px_-34px_rgba(8,9,10,0.4)] sm:p-9 sm:pb-7"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t.close}
                    className="absolute -left-3 -top-3 grid size-8 place-items-center rounded-full border border-line bg-paper-raise text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3">
                      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* Postage stamp: the mark inside a perforated edge, with a
                      postmark ring over its corner. */}
                  <div aria-hidden="true" className="absolute right-6 top-6 sm:right-8 sm:top-8">
                    <div
                      className="relative grid size-[4.5rem] place-items-center bg-ember-wash p-2"
                      style={{
                        WebkitMask:
                          "radial-gradient(circle 3px at 3px 3px, transparent 98%, #000) -3px -3px / 9px 9px",
                        mask: "radial-gradient(circle 3px at 3px 3px, transparent 98%, #000) -3px -3px / 9px 9px",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/brand/logo-mark.png" alt="" width={305} height={256} className="h-9 w-auto opacity-80" />
                    </div>
                    <svg viewBox="0 0 80 80" className="absolute -bottom-3 -left-7 size-[4.75rem] -rotate-12 text-ink-mute/70">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="40" cy="40" r="26" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      <path id="pm" d="M40 40 m-30 0 a30 30 0 1 1 60 0 a30 30 0 1 1 -60 0" fill="none" />
                      <text fontSize="8.5" fontWeight="600" letterSpacing="1.6" fill="currentColor">
                        <textPath href="#pm" startOffset="2">{`${t.stamp.toUpperCase()} · ES · ${String(step + 1).padStart(2, "0")}`}</textPath>
                      </text>
                    </svg>
                  </div>

                  <p className="text-[0.8125rem] font-medium text-ember">
                    {t.postal} {step + 1}/{t.chapters.length}
                  </p>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step}
                      aria-live="polite"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="min-h-[14rem] pr-20 sm:min-h-[13rem] sm:pr-24"
                    >
                      <h3 className="t-h2 mt-3 text-balance">{chapter.title}</h3>
                      <p className="t-body mt-4 text-[0.9375rem]">{chapter.body}</p>
                      {step === last && (
                        <button
                          type="button"
                          onClick={openContactModal}
                          className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-paper-raise transition-colors duration-300 hover:bg-ember"
                        >
                          {t.cta}
                          <span aria-hidden="true">→</span>
                        </button>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-dashed border-line-strong pt-4">
                    <p className="text-[1.375rem] italic leading-none text-ink-soft">{t.sign}</p>
                    <div className="flex items-center gap-4 text-[0.9375rem] font-medium">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        aria-label={t.prev}
                        className="text-ink transition-colors duration-300 hover:text-ember disabled:opacity-30 disabled:hover:text-ink"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.min(last, s + 1))}
                        disabled={step === last}
                        aria-label={t.next}
                        className="text-ink transition-colors duration-300 hover:text-ember disabled:opacity-30 disabled:hover:text-ink"
                      >
                        {t.next} →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left"
                >
                  <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={CARD_ID}
                    className="group flex items-center gap-4 text-left"
                  >
                    {/* A hand-drawn arrow pointing back at the pin. */}
                    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" className="hidden h-10 w-16 shrink-0 text-ink-mute transition-colors duration-300 group-hover:text-ember lg:block">
                      <path d="M62 30C46 36 26 32 12 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M4 6l1 14 11-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="block">
                      <span className="block text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                        {t.hint}
                      </span>
                      <span className="mt-2 inline-block border-b border-line-strong pb-0.5 text-[0.9375rem] text-ink-soft transition-colors duration-300 group-hover:border-ember group-hover:text-ember">
                        {t.read} →
                      </span>
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
