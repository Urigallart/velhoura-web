import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients, hasProof, results, reviews } from "@/data/proof";
import type { Locale } from "@/i18n/locale";

/**
 * Clients, results and reviews — rendered only once `data/proof.ts` has real
 * entries. Until then the section does not exist on the page at all, rather
 * than showing placeholders a visitor would read as invented.
 */
export function ProofSection({ locale = "es" }: { locale?: Locale }) {
  if (!hasProof) return null;

  return (
    <section id="clients" className="band">
      <div className="shell">
        <SectionHeading
          label={locale === "en" ? "Clients" : "Clientes"}
          lines={
            locale === "en"
              ? ["What clients", "*say about us.*"]
              : ["Lo que dicen", "*quienes ya confían.*"]
          }
        />

        {clients.length > 0 && (
          <Reveal delay={120}>
            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {clients.map((name) => (
                <li key={name} className="t-h3 text-ink-mute">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {results.length > 0 && (
          <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {results.map((r, i) => (
              <Reveal key={r.label} delay={i * 100} className="bg-paper-raise">
                <div className="px-6 py-7">
                  <dd className="t-h2 t-num text-ink">{r.value}</dd>
                  <dt className="mt-3 text-sm text-ink-soft">{r.label}</dt>
                  <p className="t-label mt-2">{r.client}</p>
                </div>
              </Reveal>
            ))}
          </dl>
        )}

        {reviews.length > 0 && (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Reveal key={r.author} delay={i * 100} variant="lift" y={28}>
                <figure className="h-full rounded-2xl border border-line bg-paper p-8 sm:p-10">
                  <blockquote className="t-lead !text-ink">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-ink-soft">
                    {r.author}
                    {r.role && <span className="text-ink-mute"> · {r.role}</span>}
                    {r.href && (
                      <>
                        {" · "}
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="u-draw text-ink"
                        >
                          {locale === "en" ? "See review" : "Ver reseña"}
                        </a>
                      </>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
