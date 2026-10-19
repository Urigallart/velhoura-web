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
    <section id="faq" className="band border-t border-line bg-paper-off">
      <div className="shell">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <SectionHeading
              index="09"
              label={t.label}
              lines={t.lines}
            />
          </div>

          <div className="md:col-span-7">
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60} y={12}>
                  <details className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
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
                </Reveal>
              ))}
            </div>
          </div>
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
