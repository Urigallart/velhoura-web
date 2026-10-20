import { PricingGrid } from "@/components/pricing/PricingGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPlans } from "@/data/localized";
import { nfcCopy, nfcOffer, nfcPath } from "@/data/nfc";
import { maintenance, maintenancePrice } from "@/data/plans";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Precios",
    lines: ["Precios claros,", "*antes de empezar.*"],
    intro: "Cuatro puntos de partida para tu web. Pulsa en cualquiera para ver todo lo que incluye; sabes lo que vas a pagar antes de que empecemos a trabajar.",
    note: "Todos los precios son orientativos. Cada proyecto se presupuesta según alcance y plazos.",
    careTitle: "Mantenimiento web",
    careOptional: "Opcional",
    care: "Una web necesita cuidados después de publicarse: actualizaciones, copias de seguridad, vigilar que siga funcionando y algún cambio de vez en cuando. Si quieres, nos encargamos nosotros cada mes y tú te olvidas. Se paga aparte del proyecto; si prefieres llevarla tú, te la entregamos lista y explicada.",
    from: "Desde",
    fromNote: "Según el tamaño de la web",
  },
  en: {
    label: "Pricing",
    lines: ["Clear prices,", "*before we start.*"],
    intro: "Four starting points for your website. Tap any of them to see everything it includes; you know what you'll pay before we start working.",
    note: "All prices are indicative. Every project is quoted on scope and timing.",
    careTitle: "Website maintenance",
    careOptional: "Optional",
    care: "A website needs looking after once it's live: updates, backups, making sure it keeps working and the odd change now and then. If you like, we take care of it every month and you can forget about it. It's billed separately from the project; if you'd rather run it yourself, we hand it over ready and explained.",
    from: "From",
    fromNote: "Depending on the size of the site",
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
      className="pt-[clamp(56px,6vw,96px)] pb-[clamp(92px,13vw,184px)]"
    >
      <div className="shell">
        <SectionHeading align="center" tone="coral" lines={t.lines} subtitle={t.intro} />

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
          {/* Maintenance gets its own strip, not a footnote: it's the one
              cost that carries on after the project is delivered. */}
          <div className="mt-6 rounded-2xl border border-line bg-paper-raise px-6 py-6 sm:px-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
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
                <p className="flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">
                  {t.careTitle}
                  <span className="rounded-full border border-line px-2 py-0.5 font-sans text-[0.8125rem] font-normal text-ink-mute">
                    {t.careOptional}
                  </span>
                </p>
                <p className="mt-1.5 max-w-[68ch] text-[0.875rem] leading-relaxed text-ink-soft">{t.care}</p>

                <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {maintenance.includes[locale].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.8125rem] text-ink">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[3px] size-3.5 shrink-0 text-ember">
                        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0 md:border-l md:border-line md:pl-8 md:text-right">
                <p className="t-label">{t.from}</p>
                <p className="t-num mt-1 text-[2rem] font-semibold leading-none tracking-[-0.02em] text-ink">
                  {maintenancePrice(locale)}
                </p>
                <p className="mt-2 text-xs text-ink-mute">{t.fromNote}</p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-ink-mute">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
