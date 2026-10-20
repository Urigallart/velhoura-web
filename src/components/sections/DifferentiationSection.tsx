import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "La diferencia",
    lines: ["Un equipo.", "*Un responsable.*"],
    themLabel: "Lo habitual",
    themTitle: "Tres proveedores, tres versiones.",
    themBody: "El logo lo hizo uno, la web otro y los anuncios un tercero. Cuando algo no funciona, cada uno señala al de al lado.",
    usTitle: "Una sola visión.",
    usTitleMuted: "De la marca a la última campaña.",
    usBody: "Quien diseña tu marca es quien construye tu web y quien prepara tus campañas. Todo encaja porque sale de las mismas manos, y si algo hay que cambiar, lo cambiamos sin pasar la pelota a nadie.",
    usNote: "Un único contacto para todo lo digital de tu negocio.",
  },
  en: {
    label: "The difference",
    lines: ["One team.", "*One owner.*"],
    themLabel: "The usual way",
    themTitle: "Three suppliers, three versions.",
    themBody: "One did the logo, another the website and a third the ads. When something doesn't work, each points at the next.",
    usTitle: "One vision.",
    usTitleMuted: "From the brand to the latest campaign.",
    usBody: "The people who design your brand are the ones who build your website and prepare your campaigns. Everything fits because it comes from the same hands, and if something needs changing, we change it without passing the buck.",
    usNote: "One contact for everything digital in your business.",
  },
};

/**
 * The argument, set as two panels side by side: the usual way of buying
 * digital work against ours. The difference is legible before a word is
 * read, because one of them keeps going.
 */
export function DifferentiationSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <section className="band">
      <div className="shell">
        <SectionHeading
          align="center"
          tone="teal"
          index="07"
          label={t.label}
          lines={t.lines}
        />

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
          {/* Them */}
          <Reveal className="overflow-hidden rounded-[2rem] bg-paper-sunk">
            <div className="flex h-full flex-col p-8 sm:p-11">
              <p className="t-label">{t.themLabel}</p>
              <p className="t-h2 mt-7 text-ink-mute">{t.themTitle}</p>
              <div className="mt-auto pt-12">
                <p className="text-sm text-ink-faint">
                  {t.themBody}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Us */}
          <Reveal delay={140} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#bff3f0] via-[#c4e3ff] to-[#dccfff] text-ink">
            {/* One ember hairline down the shared edge — the whole section's
                colour budget, spent on the boundary between the two ideas. */}
            <div className="flex h-full flex-col p-8 sm:p-11">
              <p className="text-[0.9375rem] font-semibold text-ink">Velhoura</p>
              <p className="t-h2 mt-7 text-balance">
                {t.usTitle}{" "}
                <span className="text-ink/55">{t.usTitleMuted}</span>
              </p>

              <p className="t-body mt-9 max-w-[46ch] !text-ink/80">
                {t.usBody}
              </p>

              <div className="mt-auto pt-12">
                <p className="text-sm text-ink/55">
                  {t.usNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
