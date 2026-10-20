import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceArt } from "@/components/sections/ServiceArt";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices, servicesIndexPath } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

/** One colour per area: amber for brand, mint for web, pink for growth. */
const tones: Record<string, string> = {
  brand: "bg-gradient-to-br from-[#ffe9a3] to-[#ffb04d]",
  web: "bg-gradient-to-br from-[#b4f5e6] to-[#4fd1c5]",
  growth: "bg-gradient-to-br from-[#ffd0e6] to-[#f77fb5]",
};

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
    <section id="services" className="band">
      <div className="shell">
        <SectionHeading align="center" tone="violet" lines={t.lines} subtitle={t.intro} />

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={i * 110}
              variant="lift"
              y={34}
              className="h-full"
            >
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 text-ink transition-[transform,box-shadow] duration-500 ease-[var(--e-out)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(8,9,10,0.35)] sm:p-10 ${tones[service.id] ?? "bg-paper-sunk"}`}
              >
                <ServiceArt id={service.id} />
                <h3 className="mt-8 text-[clamp(2rem,3vw,2.5rem)] font-semibold leading-[1] tracking-[-0.045em]">{service.name}</h3>
                <p className="t-lead mt-4 text-pretty !text-ink">
                  {service.promise}
                </p>

                <ul className="mt-7 divide-y divide-ink/15 border-t border-ink/15">
                  {service.items.map((item) => (
                    <li key={item.name} className="py-3.5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="u-draw transition-colors duration-300 hover:text-ink/60"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            item.name
                          )}
                        </h4>
                        {item.from && (
                          <span className="shrink-0 font-sans text-xs text-ink/60">
                            {item.from}
                          </span>
                        )}
                      </div>
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
