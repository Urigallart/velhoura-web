import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices, servicesIndexPath } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Servicios",
    lines: ["Marca, web", "y *clientes.*"],
    intro: "Puedes contratarnos para una sola cosa o para todo. Lo habitual es empezar por lo que más falta hace y sumar el resto cuando tiene sentido.",
    unsure: "¿No sabes por dónde empezar? Cuéntanos tu negocio y te decimos qué priorizar.",
    all: "Ver todos los servicios",
    ask: "Pedir propuesta",
  },
  en: {
    label: "Services",
    lines: ["Brand, web", "and *clients.*"],
    intro: "Hire us for one thing or for everything. Most clients start with what's most needed and add the rest when it makes sense.",
    unsure: "Not sure where to start? Tell us about your business and we'll tell you what to prioritise.",
    all: "See all services",
    ask: "Request a proposal",
  },
};

/**
 * The offer, in the three questions a business owner actually has: how do I
 * look, where do people find me, and how do they become customers. Three
 * columns of equal weight — no area is the "main" one, because for a client
 * they only work together.
 */
export function ServicesSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const services = getServices(locale);
  return (
    <section id="services" className="band border-t border-line bg-paper-off">
      <div className="shell">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <SectionHeading
              index="02"
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

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={i * 110}
              variant="lift"
              y={34}
              className="h-full"
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper p-8 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--e-out)] hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_26px_58px_-32px_rgba(8,9,10,0.24)] sm:p-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px w-0 bg-ember transition-[width] duration-700 ease-[var(--e-out)] group-hover:w-full"
                />

                <p className="t-label t-num !text-ember">{service.index}</p>
                <h3 className="t-h2 mt-4">{service.name}</h3>
                <p className="t-lead mt-4 text-pretty !text-ink">
                  {service.promise}
                </p>
                <p className="t-body mt-4 text-[0.9375rem]">{service.body}</p>

                <ul className="mt-8 divide-y divide-line border-t border-line">
                  {service.items.map((item) => (
                    <li key={item.name} className="py-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="u-draw transition-colors duration-300 hover:text-ember"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            item.name
                          )}
                        </h4>
                        {item.from && (
                          <span className="shrink-0 font-mono text-xs text-ink-mute">
                            {item.from}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-mute">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-ink-mute">
              {t.unsure}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={servicesIndexPath(locale)} arrow>
                {t.all}
              </ButtonLink>
              <ButtonLink href="#contact" variant="outline" arrow>
                {t.ask}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
