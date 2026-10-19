import Link from "next/link";
import { NfcCta } from "@/components/sections/NfcCta";
import { ButtonLink } from "@/components/ui/Button";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { nfcCopy, nfcOffer, nfcPage as p } from "@/data/nfc";
import { servicesIndexPath } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

/**
 * The NFC Google-review card, on its own page: what it is, how it works,
 * what is included and what it costs. Rendered by /servicios/tarjetas-nfc and
 * /en/services/nfc-review-cards. The price comes from `data/nfc.ts` and is not
 * invented: until it is filled in, the page says "special price, ask us".
 */
export function NfcPageView({ locale }: { locale: Locale }) {
  const alt = (es: string, en: string) => (locale === "es" ? es : en);

  const priceBlock = nfcOffer.price ? (
    <p className="flex flex-wrap items-baseline gap-x-3">
      <span className="text-sm text-ink-mute">{nfcCopy.pricePrefix[locale]}</span>
      <span className="text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">
        {nfcOffer.price}
      </span>
      {nfcOffer.regular && (
        <span className="text-lg text-ink-faint line-through">{nfcOffer.regular}</span>
      )}
    </p>
  ) : (
    <p className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
      {nfcCopy.priceFallback[locale]}
    </p>
  );

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.metaTitle[locale],
    description: p.metaDescription[locale],
    brand: { "@type": "Brand", name: "Velhoura" },
    ...(nfcOffer.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: nfcOffer.price.replace(/[^\d.,]/g, "").replace(",", "."),
          },
        }
      : {}),
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="shell">
          <Reveal y={10}>
            <nav className="t-label !font-sans !normal-case !tracking-normal !text-[0.875rem] flex items-center gap-2">
              <Link href={servicesIndexPath(locale)} className="transition-colors duration-300 hover:text-ink">
                {p.breadcrumb[locale]}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="!text-ember">{nfcCopy.badge[locale]}</span>
            </nav>
          </Reveal>

          <div className="mt-10 grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-6">
              <MaskedTitle
                split="word"
                as="h1"
                lines={p.headline[locale]}
                className="t-h1 text-balance"
                stagger={90}
              />
              <Reveal delay={200}>
                <p className="t-lead mt-8 max-w-[48ch] text-pretty">{p.heroLead[locale]}</p>
              </Reveal>
              <Reveal delay={280}>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                  {priceBlock}
                </div>
              </Reveal>
              <Reveal delay={340}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <NfcCta locale={locale} />
                  <ButtonLink href="#como" variant="outline" size="lg">
                    {p.seeWhat[locale]}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160} variant="lift" y={30} className="lg:col-span-6">
              <div className="relative mx-auto grid max-w-[600px] grid-cols-12 items-end gap-3">
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src="/nfc/plate.webp"
                  alt={alt("Placa NFC para dejar reseñas en Google", "NFC plate for leaving Google reviews")}
                  width={900}
                  height={1350}
                  className="col-span-5 w-full rounded-2xl"
                />
                <img
                  src="/nfc/stand.webp"
                  alt={alt("Expositor NFC de sobremesa para reseñas en Google", "Tabletop NFC stand for Google reviews")}
                  width={1100}
                  height={1100}
                  className="col-span-7 w-full"
                />
                {/* eslint-enable @next/next/no-img-element */}
                <span className="absolute -left-2 -top-3 rounded-full bg-ember px-4 py-1.5 text-[0.8125rem] font-semibold text-paper-raise shadow-[0_10px_26px_-12px_rgba(78,91,48,0.8)]">
                  {nfcCopy.badge[locale]}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como" className="band">
        <div className="shell">
          <SectionHeading label={p.stepsLabel[locale]} lines={p.stepsLines[locale]} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-3">
            {p.steps.map((s, i) => (
              <Reveal key={s.title.es} delay={i * 100} className="bg-paper-raise">
                <div className="h-full p-8 sm:p-10">
                  <p className="text-[0.875rem] font-medium text-ember">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="t-h3 mt-5">{s.title[locale]}</h2>
                  <p className="t-body mt-4 text-[0.9375rem]">{s.body[locale]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Includes + ideal for */}
      <section className="band bg-paper-off">
        <div className="shell grid gap-y-14 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <SectionHeading label={p.includesLabel[locale]} lines={p.includesLines[locale]} />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {p.includes.map((item, i) => (
                <Reveal key={item.es} delay={i * 50} className="bg-paper">
                  <li className="flex h-full items-start gap-3 px-6 py-5 text-[0.9375rem] text-ink-soft">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ember" />
                    {item[locale]}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5">
            <SectionHeading label={p.forLabel[locale]} lines={p.forLines[locale]} />
            <ul className="mt-12 space-y-4">
              {p.idealFor.map((item) => (
                <li key={item.es} className="flex gap-3 text-[1rem] text-ink-soft">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ember" />
                  {item[locale]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Price */}
      <section className="band">
        <div className="shell">
          <div className="grid items-center gap-y-8 rounded-3xl border border-line bg-ember-wash p-8 sm:p-12 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-7">
              <p className="text-[0.875rem] font-medium text-ember">{p.priceLabel[locale]}</p>
              <div className="mt-4">{priceBlock}</div>
              <p className="t-body mt-5 max-w-[46ch] text-[0.9375rem]">{p.priceNote[locale]}</p>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <NfcCta locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="band">
        <div className="shell grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <SectionHeading label={p.faqLabel[locale]} lines={p.faqLines[locale]} />
          </div>
          <div className="md:col-span-7">
            {p.faqs.map((f) => (
              <Reveal key={f.q.es}>
                <div className="border-b border-line py-6 first:pt-0">
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em]">{f.q[locale]}</h3>
                  <p className="t-body mt-2 text-[0.9375rem]">{f.a[locale]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="band bg-ink text-paper-raise">
        <div className="shell text-center">
          <MaskedTitle
            split="word"
            as="h2"
            lines={p.closeLines[locale]}
            className="mx-auto text-balance font-semibold leading-[0.95] tracking-[-0.045em] text-[clamp(2.5rem,7vw,5.5rem)]"
            stagger={90}
          />
          <Reveal delay={200}>
            <p className="mx-auto mt-7 max-w-[46ch] text-pretty text-paper-raise/70">{p.closeLead[locale]}</p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-9 flex justify-center">
              <NfcCta locale={locale} light />
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
