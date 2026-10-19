import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { nfcCopy, nfcOffer, nfcPath } from "@/data/nfc";
import type { Locale } from "@/i18n/locale";

/**
 * A quiet strip on the home page for the NFC Google-review card: a secondary
 * offer, so it is one line of copy and one link. The product has its own page
 * (see `NfcPageView`) with the presentation and the price.
 */
export function NfcSection({ locale = "es" }: { locale?: Locale }) {
  const c = nfcCopy;
  return (
    <section id="resenas" className="py-10 sm:py-14">
      <div className="shell">
        <Reveal>
          <Link
            href={nfcPath(locale)}
            className="group flex flex-col items-start gap-6 rounded-3xl border border-line bg-paper-off p-6 transition-colors duration-300 hover:border-ember sm:flex-row sm:items-center sm:gap-8 sm:p-7"
          >
            <span className="relative block w-full max-w-[150px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nfc/stand.webp"
                alt={locale === "es" ? "Expositor NFC para reseñas en Google" : "NFC stand for Google reviews"}
                width={1100}
                height={1100}
                loading="lazy"
                className="w-full"
              />
            </span>

            <span className="block flex-1">
              <span className="inline-block rounded-full bg-ember px-3 py-1 text-[0.75rem] font-semibold text-paper-raise">
                {c.badge[locale]}
              </span>
              <span className="mt-3 block text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
                {c.title[locale]}
              </span>
              <span className="mt-1.5 block max-w-[56ch] text-[0.9375rem] text-ink-soft">
                {c.label[locale]}.{" "}
                {nfcOffer.price ? `${c.pricePrefix[locale]} ${nfcOffer.price}` : c.priceFallback[locale]}
              </span>
            </span>

            <span className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-line-strong px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper-raise">
              {c.bannerLink[locale]}
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
