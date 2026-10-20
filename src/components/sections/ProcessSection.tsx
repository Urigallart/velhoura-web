import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { getProcess } from "@/data/localized";
import type { Locale } from "@/i18n/locale";
import { cn } from "@/lib/utils";

const copy = {
  es: {
    lines: ["Cuatro pasos,", "sin sorpresas."],
    subtitle: "El mismo recorrido para una web, una marca o una campaña. Siempre sabes en qué punto está tu proyecto.",
  },
  en: {
    lines: ["Four steps,", "no surprises."],
    subtitle: "The same path for a website, a brand or a campaign. You always know where your project stands.",
  },
};

/** One loud colour per step, as in the pricing cards; ink text on all four. */
const looks = [
  { bg: "bg-gradient-to-br from-[#bcd9ff] to-[#4d9bff]", glow: "bg-[#ffffff]/40", dark: false },
  { bg: "bg-gradient-to-br from-[#c2f6ee] to-[#4fd8c4]", glow: "bg-[#ffffff]/40", dark: false },
  { bg: "bg-gradient-to-br from-[#f0fd96] to-[#b8e83c]", glow: "bg-[#ffffff]/45", dark: false },
  { bg: "bg-gradient-to-br from-[#2d313c] to-[#0e1015]", glow: "bg-[#4d9bff]/30", dark: true },
];

/** One glyph per step, drawn in ink on the card's own colour. */
const glyphs: ReactNode[] = [
  // Listen: speech bubbles
  <>
    <path d="M10 14h30a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H26l-9 8v-8h-7a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" />
    <path d="M16 23h18M16 29h11" />
  </>,
  // Propose: document with a check
  <>
    <path d="M14 6h20l10 10v34H14z" />
    <path d="M34 6v10h10" />
    <path d="M21 32l5 5 9-10" />
  </>,
  // Build: layers
  <>
    <path d="M28 8l22 11-22 11L6 19z" />
    <path d="M6 30l22 11 22-11" />
    <path d="M6 41l22 11 22-11" />
  </>,
  // Launch and improve: rising line
  <>
    <path d="M6 46l14-16 10 8 20-26" />
    <path d="M38 12h12v12" />
  </>,
];

/**
 * How a project runs, as four tall colour cards: a big numeral, a glyph, the
 * step's name and one line about it. Four across on a wide screen, two by two
 * on a tablet, and a swipeable row on a phone.
 */
export function ProcessSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const steps = getProcess(locale);

  return (
    <section id="process" className="band overflow-hidden">
      <div className="shell">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal y={12}>
            <h2 className="text-balance text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              {t.lines[0]}
              <br />
              <span className="bg-gradient-to-r from-[#7db6ff] via-[#b894ff] to-[#ff7a8c] bg-clip-text text-transparent">
                {t.lines[1]}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="t-lead mx-auto mt-7 max-w-[52ch] text-pretty">{t.subtitle}</p>
          </Reveal>
        </div>
      </div>

      <div className="shell mt-14 md:mt-20">
        {/* Phone: a row you swipe, bleeding off both edges of the screen. */}
        <ol
          className={cn(
            "no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4",
            "md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4",
          )}
        >
          {steps.map((step, i) => {
            const look = looks[i % looks.length];
            return (
              <li key={step.index} className="w-[78vw] max-w-[22rem] shrink-0 snap-center md:w-auto md:max-w-none">
                <Reveal delay={i * 90} variant="lift" y={30} className="h-full">
                  <div
                    className={cn(
                      "group relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[2rem] p-7 sm:p-8 md:min-h-[30rem]",
                      look.dark ? "text-white" : "text-ink",
                      "transition-transform duration-500 ease-[var(--e-out)] hover:-translate-y-1.5",
                      look.bg,
                    )}
                  >
                    {/* A soft highlight in the corner, like light on glass. */}
                    <span
                      aria-hidden="true"
                      className={cn("absolute -right-16 -top-16 size-56 rounded-full blur-3xl", look.glow)}
                    />

                    <span className="relative text-[clamp(4.5rem,8vw,6.5rem)] font-semibold leading-[0.8] tracking-[-0.06em] opacity-90">
                      {i + 1}
                    </span>

                    <svg
                      viewBox="0 0 56 56"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="relative mt-8 size-14 transition-transform duration-500 ease-[var(--e-out)] group-hover:scale-110"
                    >
                      {glyphs[i % glyphs.length]}
                    </svg>

                    <div className="relative mt-auto pt-10">
                      <h3 className="text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.04em]">{step.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed opacity-75">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
