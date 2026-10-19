"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StoryGlobeLoader } from "@/components/3d/StoryGlobeLoader";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/i18n/useLocale";
import { openContactModal } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

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
    lead: "Un estudio de Barcelona que diseña, programa y lanza. Pulsa el pin y te contamos cómo llegamos hasta aquí.",
    pinLabel: "Barcelona · España",
    pinAria: "Barcelona, España: abrir nuestra historia",
    hint: "Pulsa el pin de Barcelona",
    read: "Nuestra historia",
    close: "Cerrar",
    chapter: (n: number) => `Capítulo ${n}`,
    prev: "Anterior",
    next: "Siguiente",
    cardAria: "Nuestra historia",
    drag: "Arrastra para girar el globo",
    cta: "Cuéntanos tu negocio",
    chapters: [
      {
        title: "Barcelona, España",
        body: "Aquí está nuestra base. Somos dos socios, Oriol Gallart e Ian Monfil, y trabajamos con pymes de Barcelona y alrededores.",
      },
      {
        title: "Dos perfiles, un mismo equipo",
        body: "Oriol viene del desarrollo full stack y del diseño de interfaces; Ian, de los sistemas y las redes, y del desarrollo con React y Next.js. Quien diseña y quien programa son las mismas personas que te atienden.",
      },
      {
        title: "También construimos lo nuestro",
        body: "Además de trabajar para clientes, lanzamos y mantenemos productos propios: la marca de gafas Velhoura, Roady, Gym Tracker y Zhestar. Lo que aprendemos con ellos lo aplicamos a tu proyecto.",
      },
      {
        title: "Y ahora, lo tuyo",
        body: "Marca, web y captación de clientes en un solo equipo. Cuéntanos tu negocio y vemos cómo ayudarte.",
      },
    ],
  },
  en: {
    label: "From Spain",
    lines: ["Velhoura,", "*from Spain.*"],
    lead: "A Barcelona studio that designs, builds and launches. Press the pin and we'll tell you how we got here.",
    pinLabel: "Barcelona · Spain",
    pinAria: "Barcelona, Spain: open our story",
    hint: "Press the Barcelona pin",
    read: "Our story",
    close: "Close",
    chapter: (n: number) => `Chapter ${n}`,
    prev: "Previous",
    next: "Next",
    cardAria: "Our story",
    drag: "Drag to turn the globe",
    cta: "Tell us about your business",
    chapters: [
      {
        title: "Barcelona, Spain",
        body: "This is our home base. We are two partners, Oriol Gallart and Ian Monfil, and we work with businesses in Barcelona and the surrounding area.",
      },
      {
        title: "Two backgrounds, one team",
        body: "Oriol comes from full stack development and interface design; Ian from systems and networks, and from building with React and Next.js. The people who design and the people who code are the same people who answer you.",
      },
      {
        title: "We build our own, too",
        body: "Besides client work, we launch and run products of our own: the Velhoura sunglasses brand, Roady, Gym Tracker and Zhestar. What we learn from them goes into your project.",
      },
      {
        title: "And now, yours",
        body: "Brand, web and customer growth in one team. Tell us about your business and we'll see how we can help.",
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
            <p className="t-label flex items-center justify-center gap-3">
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
          {/* The globe, on its stage of hairline rings. */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[760px]">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-[spin_120s_linear_infinite] rounded-full border border-dashed border-line-strong/70"
              />
              <span
                aria-hidden="true"
                className="absolute inset-[7%] rounded-full border border-line"
              />
              <StoryGlobeLoader
                open={open}
                onPin={toggle}
                pinLabel={t.pinLabel}
                pinAria={t.pinAria}
                controls={CARD_ID}
              />
              <p
                aria-hidden="true"
                className="t-label pointer-events-none absolute inset-x-0 bottom-[1%] text-center !text-ink-faint"
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
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-3xl border border-line bg-paper-raise p-7 shadow-[0_30px_70px_-40px_rgba(8,9,10,0.35)] sm:p-9"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t.close}
                    className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-line-strong hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
                      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>

                  <p className="t-label t-num !text-ember">
                    {String(step + 1).padStart(2, "0")} / {String(t.chapters.length).padStart(2, "0")}
                  </p>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step}
                      aria-live="polite"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="min-h-[13.5rem] sm:min-h-[12rem]"
                    >
                      <h3 className="t-h2 mt-4 text-balance">{chapter.title}</h3>
                      <p className="t-body mt-4 text-[0.9375rem]">{chapter.body}</p>
                      {step === last && (
                        <button
                          type="button"
                          onClick={openContactModal}
                          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-paper-raise transition-colors duration-300 hover:bg-ember"
                        >
                          {t.cta}
                          <span aria-hidden="true">→</span>
                        </button>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                    <div className="flex items-center gap-2">
                      {t.chapters.map((c, i) => (
                        <button
                          key={c.title}
                          type="button"
                          onClick={() => setStep(i)}
                          aria-label={t.chapter(i + 1)}
                          aria-current={i === step ? "step" : undefined}
                          className={cn(
                            "h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--e-out)]",
                            i === step ? "w-7 bg-ember" : "w-2 bg-line-strong hover:bg-ink-mute",
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        aria-label={t.prev}
                        className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink disabled:opacity-35 disabled:hover:border-line"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.min(last, s + 1))}
                        disabled={step === last}
                        aria-label={t.next}
                        className="grid size-10 place-items-center rounded-full bg-ink text-paper-raise transition-colors duration-300 hover:bg-ember disabled:opacity-35 disabled:hover:bg-ink"
                      >
                        →
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
                  className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left"
                >
                  <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-ink-mute uppercase">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-ember" />
                    </span>
                    {t.hint}
                  </p>
                  <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={CARD_ID}
                    className="inline-flex h-12 items-center gap-3 rounded-full border border-line-strong px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper-raise"
                  >
                    {t.read}
                    <span aria-hidden="true">→</span>
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
