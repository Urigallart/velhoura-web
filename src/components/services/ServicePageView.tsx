import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import {
  areaNames,
  getProcess,
  getServicePages,
  servicePath,
  servicesIndexPath,
  type LocalizedServicePage,
} from "@/data/localized";
import { site } from "@/data/site";
import { localePath, type Locale } from "@/i18n/locale";

const copy = {
  es: {
    breadcrumb: "Servicios",
    route: "Ruta",
    ask: "Pedir propuesta",
    includesCta: "Qué incluye",
    indicative: "precio orientativo",
    whyLines: ["Por qué", "*funciona.*"],
    includesLabel: "Qué incluye",
    includesLines: ["Todo lo que", "*te llevas.*"],
    forLabel: "Para quién",
    forLines: ["Encaja si…"],
    processLabel: "Cómo trabajamos",
    processLines: ["Del primer café", "*al lanzamiento.*"],
    priceLabel: "Precio",
    custom: "Presupuesto a medida",
    priceAfter: "Antes de empezar recibes una propuesta por escrito con el alcance y el precio.",
    faqLabel: "Preguntas frecuentes",
    faqLines: ["Dudas", "*habituales.*"],
    relatedLabel: "También te puede interesar",
    relatedLines: ["Funciona mejor", "*en conjunto.*"],
    closeLines: ["Hablemos de", "*tu proyecto.*"],
    closeLead: "Cuéntanos a qué te dedicas y qué necesitas. Te respondemos nosotros mismos, sin compromiso.",
    closeCta: "Ir al contacto",
    country: "España",
  },
  en: {
    breadcrumb: "Services",
    route: "Breadcrumb",
    ask: "Request a proposal",
    includesCta: "What's included",
    indicative: "indicative price",
    whyLines: ["Why it", "*works.*"],
    includesLabel: "What's included",
    includesLines: ["Everything", "*you get.*"],
    forLabel: "Who it's for",
    forLines: ["A good fit if…"],
    processLabel: "How we work",
    processLines: ["From first coffee", "*to launch.*"],
    priceLabel: "Price",
    custom: "Custom quote",
    priceAfter: "Before we start you get a written proposal with the scope and the price.",
    faqLabel: "FAQ",
    faqLines: ["Common", "*questions.*"],
    relatedLabel: "You may also like",
    relatedLines: ["Works better", "*together.*"],
    closeLines: ["Let's talk about", "*your project.*"],
    closeLead: "Tell us what you do and what you need. We reply ourselves, no strings attached.",
    closeCta: "Go to contact",
    country: "Spain",
  },
};

/**
 * A service, at the length a business owner coming from Google needs to
 * decide: the promise, three reasons, what is included and who it suits,
 * how the work runs, what it costs, the usual questions, and a way to start.
 * Rendered by both /servicios/[slug] and /en/services/[slug].
 */
export function ServicePageView({
  page,
  locale,
}: {
  page: LocalizedServicePage;
  locale: Locale;
}) {
  const t = copy[locale];
  const all = getServicePages(locale);
  const related = page.related
    .map((s) => all.find((p) => p.esSlug === s))
    .filter((s) => s !== undefined);
  const processSteps = getProcess(locale);
  const areaName = areaNames[locale];

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.name,
      description: page.metaDescription,
      serviceType: page.name,
      inLanguage: locale,
      // Based in Barcelona, working across Spain and abroad, remotely.
      areaServed: [
        { "@type": "Country", name: t.country },
        { "@type": "Place", name: "Worldwide" },
      ],
      provider: { "@type": "ProfessionalService", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="shell">
          <Reveal y={10}>
            <nav aria-label={t.route} className="t-label flex items-center gap-2">
              <Link
                href={servicesIndexPath(locale)}
                className="transition-colors duration-300 hover:text-ink"
              >
                {t.breadcrumb}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="!text-ember">{areaName[page.area]}</span>
            </nav>
          </Reveal>

          <div className="mt-10 grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-6">
              <MaskedTitle
                split="word"
                as="h1"
                lines={page.headline}
                className="t-h1 text-balance"
                stagger={90}
              />
              <Reveal delay={200}>
                <p className="t-lead mt-8 max-w-[48ch] text-pretty">{page.lead}</p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <ButtonLink href="#empezar" size="lg" arrow>
                    {t.ask}
                  </ButtonLink>
                  <ButtonLink href="#incluye" variant="outline" size="lg">
                    {t.includesCta}
                  </ButtonLink>
                </div>
              </Reveal>
              {page.price.from && (
                <Reveal delay={360}>
                  <p className="mt-6 text-sm text-ink-mute">
                    <span className="font-medium text-ink">{page.price.from}</span>
                    {" · "}
                    {t.indicative}
                  </p>
                </Reveal>
              )}
            </div>

            <Reveal delay={160} variant="lift" y={30} className="lg:col-span-6">
              <ServiceVisual page={page} locale={locale} priority />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="band">
        <div className="shell">
          <SectionHeading label={page.name} lines={t.whyLines} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-3">
            {page.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 100} className="bg-paper-raise">
                <div className="h-full p-8 sm:p-10">
                  <p className="t-label t-num !text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="t-h3 mt-5">{b.title}</h2>
                  <p className="t-body mt-4 text-[0.9375rem]">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Includes + ideal for */}
      <section id="incluye" className="band bg-paper-off">
        <div className="shell grid gap-y-14 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <SectionHeading label={t.includesLabel} lines={t.includesLines} />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {page.includes.map((item, i) => (
                <Reveal key={item} delay={i * 50} className="bg-paper">
                  <li className="flex h-full items-start gap-3 px-6 py-5">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember"
                    />
                    <span className="text-[0.9375rem] text-ink">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <SectionHeading label={t.forLabel} lines={t.forLines} />
            <ul className="mt-12 space-y-4">
              {page.idealFor.map((item, i) => (
                <Reveal key={item} delay={i * 80}>
                  <li className="rounded-2xl border border-line bg-paper px-6 py-5 text-[0.9375rem] text-ink">
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="band">
        <div className="shell">
          <SectionHeading label={t.processLabel} lines={t.processLines} />
          <ol className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.index} delay={i * 90} variant="lift" y={24}>
                <li className="h-full rounded-2xl border border-line bg-paper p-7">
                  <p className="t-h2 t-num text-ink-faint">{step.index}</p>
                  <h3 className="t-h3 mt-5">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Price */}
      <section className="grain grain-invert border-y border-night bg-night py-[clamp(88px,12vw,160px)] text-paper-raise">
        <div className="shell text-center">
          <p className="t-label !text-paper-raise/45">{t.priceLabel}</p>
          <p className="t-h1 mx-auto mt-6 max-w-[18ch] text-balance text-paper-raise">
            {page.price.from ?? t.custom}
          </p>
          <p className="mx-auto mt-6 max-w-[48ch] text-pretty text-[0.9375rem] leading-relaxed text-paper-raise/60">
            {page.price.note} {t.priceAfter}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="band">
        <div className="shell grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <SectionHeading label={t.faqLabel} lines={t.faqLines} />
          </div>
          <div className="md:col-span-7">
            <div className="divide-y divide-line border-y border-line">
              {page.faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="t-h3 text-pretty">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-[transform,border-color,color] duration-300 ease-[var(--e-out)] group-open:rotate-45 group-open:border-ember group-open:text-ember"
                    >
                      +
                    </span>
                  </summary>
                  <p className="t-body mt-4 max-w-[60ch]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="band bg-paper-off">
          <div className="shell">
            <SectionHeading label={t.relatedLabel} lines={t.relatedLines} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={servicePath(locale, r.esSlug)}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-line bg-paper p-8 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--e-out)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_26px_58px_-32px_rgba(8,9,10,0.24)]"
                >
                  <span>
                    <span className="t-label !text-ember">{areaName[r.area]}</span>
                    <span className="t-h3 mt-3 block">{r.name}</span>
                    <span className="mt-2 block max-w-[44ch] text-sm text-ink-soft">
                      {r.metaDescription}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xl text-ink-mute transition-transform duration-500 ease-[var(--e-out)] group-hover:translate-x-1 group-hover:text-ink"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Close */}
      <section id="empezar" className="band">
        <div className="shell text-center">
          <MaskedTitle
            split="word"
            lines={t.closeLines}
            className="t-h1 text-balance"
            stagger={100}
          />
          <Reveal delay={200}>
            <p className="t-lead mx-auto mt-8 max-w-[44ch] text-pretty">
              {t.closeLead}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex justify-center">
              <ButtonLink href={localePath(locale, "/#contact")} size="lg" arrow>
                {t.closeCta}
              </ButtonLink>
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
