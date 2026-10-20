import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqs } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: { label: "Preguntas frecuentes", lines: ["Antes de", "*decidirte.*"] },
  en: { label: "FAQ", lines: ["Before you", "*decide.*"] },
};

/**
 * Frequently asked questions, as native <details> so they open without
 * JavaScript and are announced correctly by screen readers. The same list is
 * emitted as FAQPage structured data, which is what lets Google show the
 * answers directly under the search result.
 */
export function FaqSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const faqs = getFaqs(locale);
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="band bg-paper-sunk">
      <div className="shell">
        <SectionHeading align="center" tone="sky" lines={t.lines} />

        <div className="mx-auto mt-12 max-w-3xl space-y-3 md:mt-16">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60} y={12}>
              <details className="group rounded-3xl bg-paper-raise px-7 py-6 transition-shadow duration-300 open:shadow-[0_24px_50px_-32px_rgba(8,9,10,0.3)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-pretty">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-paper-sunk text-[1.25rem] leading-none text-ink transition-[transform,background-color] duration-300 ease-[var(--e-out)] group-open:rotate-45 group-open:bg-[#dcf56a]"
                  >
                    +
                  </span>
                </summary>
                <p className="t-body mt-4 max-w-[60ch]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </section>
  );
}
