import { NfcCta } from "@/components/sections/NfcCta";
import { Reveal } from "@/components/ui/Reveal";
import { nfcCopy, nfcOffer } from "@/data/nfc";
import type { Locale } from "@/i18n/locale";

/**
 * The NFC Google-review card, as an offer for physical businesses. Two photos
 * of the product (flat plate and tabletop stand) beside what it is and what it
 * costs. No price is invented: see `data/nfc.ts`.
 */
export function NfcSection({ locale = "es" }: { locale?: Locale }) {
  const c = nfcCopy;
  return (
    <section id="resenas" className="band border-t border-line">
      <div className="shell">
        <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="relative mx-auto grid max-w-[560px] grid-cols-12 items-end gap-3">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/nfc/plate.webp"
                alt={locale === "es" ? "Placa NFC para dejar reseñas en Google" : "NFC plate for leaving Google reviews"}
                width={900}
                height={1350}
                loading="lazy"
                className="col-span-5 w-full rounded-2xl"
              />
              <img
                src="/nfc/stand.webp"
                alt={locale === "es" ? "Expositor NFC de sobremesa para reseñas en Google" : "Tabletop NFC stand for Google reviews"}
                width={1100}
                height={1100}
                loading="lazy"
                className="col-span-7 w-full"
              />
              {/* eslint-enable @next/next/no-img-element */}
              <span className="absolute -left-2 -top-3 rounded-full bg-ember px-4 py-1.5 text-[0.8125rem] font-semibold text-paper-raise shadow-[0_10px_26px_-12px_rgba(78,91,48,0.8)]">
                {c.badge[locale]}
              </span>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal y={10}>
              <p className="text-[0.875rem] font-medium text-ember">{c.label[locale]}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                {c.title[locale]}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="t-lead mt-6 max-w-[50ch] text-pretty">{c.lead[locale]}</p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-7 space-y-3">
                {c.points.map((p) => (
                  <li key={p.es} className="flex gap-3 text-[0.9375rem] text-ink-soft">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ember" />
                    {p[locale]}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                <div>
                  {nfcOffer.price ? (
                    <p className="flex items-baseline gap-3">
                      <span className="text-sm text-ink-mute">{c.pricePrefix[locale]}</span>
                      <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em]">{nfcOffer.price}</span>
                      {nfcOffer.regular && (
                        <span className="text-base text-ink-faint line-through">{nfcOffer.regular}</span>
                      )}
                    </p>
                  ) : (
                    <p className="text-[1.25rem] font-semibold tracking-[-0.02em]">{c.priceFallback[locale]}</p>
                  )}
                </div>
                <NfcCta locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
