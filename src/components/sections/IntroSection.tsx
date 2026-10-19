import { Counter } from "@/components/ui/Counter";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { team } from "@/data/team";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Por qué Velhoura",
    lines: ["Tu logo, tu web", "y tus anuncios,", "*con una sola voz.*"],
    p1: "Muchas pymes acaban con un diseñador para el logo, otra empresa para la web y alguien distinto para Google. Cada uno hace su parte, y nadie se encarga de que todo junto funcione.",
    p2: "En Velhoura lo llevamos todo nosotros: la imagen, la web y la forma de conseguir clientes. Menos reuniones, menos explicaciones repetidas y un único responsable de que dé resultado.",
    facts: [
      "Áreas: marca, web y captación",
      "Personas, sin intermediarios",
      "Productos propios en producción",
    ],
  },
  en: {
    label: "Why Velhoura",
    lines: ["Your logo, your site", "and your ads,", "*speaking as one.*"],
    p1: "Many small businesses end up with one designer for the logo, another company for the website and someone else for Google. Each does their part, and nobody makes sure it all works together.",
    p2: "At Velhoura we handle all of it: the look, the website and the way you win customers. Fewer meetings, fewer repeated explanations and one team accountable for results.",
    facts: [
      "Areas: brand, web and growth",
      "People, no middlemen",
      "Own products in production",
    ],
  },
};

/**
 * Why one studio rather than three suppliers. Deliberately spacious — one
 * idea, a lot of air.
 *
 * The figures at the bottom are read off the same data the rest of the page
 * renders from, so they cannot drift out of date: add a product and the count
 * moves on its own.
 */
export function IntroSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const facts = [
    { k: t.facts[0], v: services.length, pad: 2 },
    { k: t.facts[1], v: team.length, pad: 2 },
    {
      k: t.facts[2],
      v: products.filter((p) => p.status === "LIVE").length,
      pad: 2,
    },
  ];

  return (
    <section id="studio" className="band">
      <div className="shell">
        <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-4">
            <Reveal y={12}>
              <p className="t-label flex items-center gap-3">
                <span className="text-ember">01</span>
                {t.label}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <MaskedTitle
              as="h2"
              lines={t.lines}
              className="t-h1 text-balance"
              stagger={90}
            />

            <div className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16">
              <Reveal delay={120}>
                <p className="t-body max-w-[42ch]">
                  {t.p1}
                </p>
              </Reveal>

              <Reveal delay={220}>
                <p className="t-body max-w-[42ch]">
                  {t.p2}
                </p>
              </Reveal>
            </div>

            {/* The studio's operating shape, stated quietly. */}
            <Reveal delay={320} className="mt-14 md:mt-20">
              <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.k} className="bg-paper-raise px-6 py-7">
                    <dd className="t-h2 t-num text-ink">
                      <Counter value={fact.v} pad={fact.pad} />
                    </dd>
                    <dt className="t-label mt-3">{fact.k}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
