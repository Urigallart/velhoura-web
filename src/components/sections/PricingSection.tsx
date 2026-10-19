import { PricingGrid } from "@/components/pricing/PricingGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPlans } from "@/data/localized";
import { nfcCopy, nfcOffer, nfcPath } from "@/data/nfc";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Precios",
    lines: ["Precios claros,", "*antes de empezar.*"],
    intro: "Cuatro puntos de partida para tu web. Pulsa en cualquiera para ver todo lo que incluye; sabes lo que vas a pagar antes de que empecemos a trabajar.",
    note: "Todos los precios son orientativos. Cada proyecto se presupuesta según alcance y plazos.",
    careTitle: "Mantenimiento opcional",
    care: "Una vez publicada, podemos encargarnos de las actualizaciones, copias de seguridad, seguridad y pequeños cambios por una cuota mensual aparte. Si prefieres llevarla tú, te la entregamos lista y explicada.",
  },
  en: {
    label: "Pricing",
    lines: ["Clear prices,", "*before we start.*"],
    intro: "Four starting points for your website. Tap any of them to see everything it includes; you know what you'll pay before we start working.",
    note: "All prices are indicative. Every project is quoted on scope and timing.",
    careTitle: "Optional maintenance",
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

        <Reveal delay={160}>
          <a
            href={nfcPath(locale)}
            className="group mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-ember-wash px-6 py-5 transition-colors duration-300 hover:border-ember sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
              <span className="w-fit rounded-full bg-ember px-3 py-1 text-[0.75rem] font-semibold text-paper-raise">
                {nfcCopy.badge[locale]}
              </span>
              <span>
                <span className="block text-[1.0625rem] font-semibold tracking-[-0.01em]">
                  {nfcCopy.bannerTitle[locale]}
                </span>
                <span className="block text-sm text-ink-soft">{nfcCopy.bannerText[locale]}</span>
              </span>
            </span>
            <span className="flex items-center gap-4 text-[0.9375rem] font-medium">
              {nfcOffer.price && <span className="text-[1.25rem] font-semibold">{nfcCopy.pricePrefix[locale]} {nfcOffer.price}</span>}
              <span className="transition-transform duration-300 group-hover:translate-x-1">{nfcCopy.bannerLink[locale]} →</span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-[78ch] text-center text-[0.8125rem] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">{t.careTitle}.</span> {t.care}
          </p>
          <p className="mt-2 text-center text-xs text-ink-mute">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
