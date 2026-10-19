import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import {
  getServicePages,
  getServices,
  servicePath,
} from "@/data/localized";
import { localePath, type Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Servicios",
    lines: ["Todo lo digital", "de tu negocio,", "*en un solo sitio.*"],
    lead: "Marca, web y captación de clientes para pymes de Barcelona. Contrata un servicio suelto o combínalos: los hacemos encajar porque los hace el mismo equipo.",
    custom: "Presupuesto a medida",
    see: "Ver servicio →",
    closeLines: ["¿No sabes", "*por dónde empezar?*"],
    closeLead: "Cuéntanos tu situación y te decimos qué priorizar. Sin compromiso.",
    closeCta: "Pedir propuesta",
  },
  en: {
    label: "Services",
    lines: ["Everything digital", "for your business,", "*in one place.*"],
    lead: "Brand, web and customer growth for Barcelona businesses. Hire one service or combine them: they fit together because the same team makes them.",
    custom: "Custom quote",
    see: "See service →",
    closeLines: ["Not sure", "*where to start?*"],
    closeLead: "Tell us your situation and we'll tell you what to prioritise. No strings attached.",
    closeCta: "Request a proposal",
  },
};

/**
 * The full catalogue, grouped by the three areas. Each area opens with its
 * promise, then its services as large cards with their visual — the index is
 * meant to be browsed, not just scanned. Rendered by /servicios and
 * /en/services.
 */
export function ServicesIndexView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const services = getServices(locale);
  const pages = getServicePages(locale);

  return (
    <>
      <section className="border-b border-line pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="shell">
          <MaskedTitle
            split="word"
            as="h1"
            lines={t.lines}
            className="t-h1 mt-8 max-w-[18ch] text-balance"
            stagger={90}
          />
          <Reveal delay={200}>
            <p className="t-lead mt-8 max-w-[52ch] text-pretty">{t.lead}</p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink-soft transition-colors duration-300 hover:border-line-strong hover:text-ink"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {services.map((area, ai) => {
        const inArea = pages.filter((p) => p.area === area.id);
        return (
          <section
            key={area.id}
            id={area.id}
            className={`band border-b border-line ${ai % 2 ? "bg-paper-off" : ""}`}
          >
            <div className="shell">
              <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
                <div className="md:col-span-5">
                  <h2 className="t-h1 text-balance">{area.promise}</h2>
                </div>
                <div className="flex items-end md:col-span-7">
                  <p className="t-body max-w-[48ch]">{area.body}</p>
                </div>
              </div>

              <div className="mt-14 grid gap-6 md:grid-cols-2">
                {inArea.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 100} variant="lift" y={30}>
                    <Link
                      href={servicePath(locale, p.esSlug)}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper p-4 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--e-out)] hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_26px_58px_-32px_rgba(8,9,10,0.24)]"
                    >
                      <ServiceVisual page={p} locale={locale} className="rounded-xl" />
                      <div className="flex flex-1 flex-col p-4 pt-6">
                        <p className="t-label !text-ember">{p.tag}</p>
                        <h3 className="t-h2 mt-3">{p.name}</h3>
                        <p className="t-body mt-3 text-[0.9375rem]">{p.metaDescription}</p>
                        <p className="mt-auto flex items-center justify-between pt-6 text-sm">
                          <span className="font-medium text-ink">
                            {p.price.from ?? t.custom}
                          </span>
                          <span className="text-ink-mute transition-[transform,color] duration-500 ease-[var(--e-out)] group-hover:translate-x-1 group-hover:text-ink">
                            {t.see}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="band">
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
    </>
  );
}
