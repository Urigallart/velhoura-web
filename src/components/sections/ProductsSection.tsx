import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProducts } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Proyectos propios",
    lines: ["Lo probamos", "*primero en casa.*"],
    subtitle: "Además de trabajar para clientes, lanzamos y mantenemos productos propios. Lo que aprendemos con ellos lo aplicamos a tu proyecto.",
    total: "En cartera",
    live: "En producción",
  },
  en: {
    label: "Our own projects",
    lines: ["We test it", "*at home first.*"],
    subtitle: "Besides client work, we launch and run products of our own. What we learn from them goes into your project.",
    total: "In portfolio",
    live: "In production",
  },
};

/**
 * Proof of craft: the studio's own products, built and run end to end. The
 * grid is intentionally uniform so going from four products to ten needs no
 * redesign.
 */
export function ProductsSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const products = getProducts(locale);
  const live = products.filter((p) => p.status === "LIVE").length;

  return (
    <section id="products" className="band border-t border-line bg-paper-off">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="06"
            label={t.label}
            lines={t.lines}
            subtitle={t.subtitle}
          />

          <Reveal delay={200} y={12}>
            <dl className="flex gap-8 md:justify-end">
              <div>
                <dd className="t-h3 t-num text-ink">
                  {String(products.length).padStart(2, "0")}
                </dd>
                <dt className="t-label mt-1.5">{t.total}</dt>
              </div>
              <div>
                <dd className="t-h3 t-num text-ink">
                  {String(live).padStart(2, "0")}
                </dd>
                <dt className="t-label mt-1.5">{t.live}</dt>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:gap-6 md:mt-20 lg:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 2) * 110} variant="lift" y={36}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
