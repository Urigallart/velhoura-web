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
  },
  en: {
    label: "Pricing",
    lines: ["Clear prices,", "*before we start.*"],
    intro: "Four starting points for your website. Tap any of them to see everything it includes; you know what you'll pay before we start working.",
    note: "All prices are indicative. Every project is quoted on scope and timing.",
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
          <p className="mt-8 text-center text-xs text-ink-mute">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
