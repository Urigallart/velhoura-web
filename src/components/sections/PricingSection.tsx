import { PricingGrid } from "@/components/pricing/PricingGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPlans } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Precios",
    lines: ["Precios claros,", "*antes de empezar.*"],
    intro: "Cuatro puntos de partida para tu web. Pulsa en cualquiera para ver todo lo que incluye; sabes lo que vas a pagar antes de que empecemos a trabajar.",
    note: "Todos los precios son orientativos. Cada proyecto se presupuesta según alcance y plazos.",
    careTitle: "Mantenimiento opcional",
    careBadge: "Cuota mensual aparte",
    care: "Una vez publicada, podemos encargarnos de las actualizaciones, copias de seguridad, seguridad y pequeños cambios por una cuota mensual aparte. Si prefieres llevarla tú, te la entregamos lista y explicada.",
  },
  en: {
    label: "Pricing",
    lines: ["Clear prices,", "*before we start.*"],
    intro: "Four starting points for your website. Tap any of them to see everything it includes; you know what you'll pay before we start working.",
    note: "All prices are indicative. Every project is quoted on scope and timing.",
    careTitle: "Optional maintenance",
    careBadge: "Separate monthly fee",
    care: "Once it's live, we can take care of updates, backups, security and small changes for a separate monthly fee. If you'd rather run it yourself, we hand it over ready and explained.",
  },
};

/**
 * Web prices, published. Most agencies hide them; showing a starting figure
 * saves both sides a call that was never going to work out.
 *
 * Tighter at the top than the standard `.band`, so that arriving from the
 * "Precios" link the heading and all four cards fit on one screen below the
 * floating navbar.
 */
export function PricingSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const plans = getPlans(locale);
  return (
    <section
      id="pricing"
      className="border-t border-line pt-[clamp(56px,6vw,96px)] pb-[clamp(92px,13vw,184px)]"
    >
      <div className="shell">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <SectionHeading index="04" label={t.label} lines={t.lines} />
          </div>

          <div className="flex items-end md:col-span-5">
            <Reveal delay={180}>
              <p className="t-body max-w-[44ch]">{t.intro}</p>
            </Reveal>
          </div>
        </div>

        <div data-pricing-grid className="mt-12 md:mt-14">
          <PricingGrid plans={plans} />
        </div>

        <Reveal delay={200}>
          {/* Maintenance gets its own strip, not a footnote: it's the one
              cost that carries on after the project is delivered. */}
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-paper-raise px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-paper-sunk text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5">
                <path
                  d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.6 5.6a1.4 1.4 0 0 0 2 2l5.6-5.6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1 2.5-2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] font-medium text-ink">{t.careTitle}</p>
              <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">{t.care}</p>
            </div>
            <span className="self-start whitespace-nowrap rounded-full bg-ember px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.1em] text-paper-raise uppercase sm:self-center">
              {t.careBadge}
            </span>
          </div>
          <p className="mt-5 text-center text-xs text-ink-mute">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
