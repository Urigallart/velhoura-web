import { PricingCard } from "@/components/ui/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPlans } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Precios",
    lines: ["Precios claros,", "*antes de empezar.*"],
    intro: "Cuatro puntos de partida para tu web. Cada proyecto se ajusta a lo que necesitas de verdad, y sabes lo que vas a pagar antes de que empecemos a trabajar.",
    note: "Todos los precios son orientativos. Cada proyecto se presupuesta según alcance y plazos.",
  },
  en: {
    label: "Pricing",
    lines: ["Clear prices,", "*before we start.*"],
    intro: "Four starting points for your website. Every project is fitted to what you really need, and you know what you'll pay before we start working.",
    note: "All prices are indicative. Every project is quoted on scope and timing.",
  },
};

/**
 * Web prices, published. Most agencies hide them; showing a starting figure
 * saves both sides a call that was never going to work out.
 */
export function PricingSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const plans = getPlans(locale);
  return (
    <section id="pricing" className="band border-t border-line">
      <div className="shell">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <SectionHeading
              index="04"
              label={t.label}
              lines={t.lines}
            />
          </div>

          <div className="flex items-end md:col-span-5">
            <Reveal delay={180}>
              <p className="t-body max-w-[44ch]">
                {t.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid items-stretch gap-5 sm:grid-cols-2 md:mt-24 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 100} variant="lift" y={34} className="h-full">
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-xs text-ink-mute">
            {t.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
