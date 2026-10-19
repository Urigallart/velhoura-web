import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { ProductGlyph } from "@/components/visual/ProductGlyph";
import { getProducts } from "@/data/localized";
import type { Product } from "@/data/products";
import { localePath, type Locale } from "@/i18n/locale";

const copy = {
  es: {
    all: "Todos los productos",
    category: "Categoría",
    status: "Estado",
    year: "Año",
    shot: (name: string) => `Captura de ${name}`,
    about: "Sobre el producto",
    visit: (name: string) => `Visitar ${name}`,
    next: "Siguiente producto",
  },
  en: {
    all: "All products",
    category: "Category",
    status: "Status",
    year: "Year",
    shot: (name: string) => `Screenshot of ${name}`,
    about: "About the product",
    visit: (name: string) => `Visit ${name}`,
    next: "Next product",
  },
};

/** One of the studio's own products. Rendered by /products/[slug] and /en/products/[slug]. */
export function ProductPageView({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = copy[locale];
  const products = getProducts(locale);
  const index = products.findIndex((p) => p.slug === product.slug);
  const next = products[(index + 1) % products.length];

  return (
    <>
      <section className="border-b border-line pt-32 pb-16 sm:pt-40">
        <div className="shell">
          <Reveal y={10}>
            <Link
              href={localePath(locale, "/#products")}
              className="t-label inline-flex items-center gap-2 transition-colors duration-300 hover:text-ink"
            >
              <span aria-hidden="true">←</span> {t.all}
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-y-8 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-8">
              <MaskedTitle as="h1" lines={[product.name]} className="t-h1" split="word" />
              <Reveal delay={140}>
                <p className="t-lead mt-6 max-w-[46ch] text-pretty">
                  {product.summary}
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-4">
              <Reveal delay={220}>
                <dl className="space-y-px overflow-hidden rounded-xl border border-line">
                  {[
                    [t.category, product.category],
                    [t.status, product.status],
                    [t.year, product.year],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-line bg-paper-raise px-4 py-3 last:border-b-0"
                    >
                      <dt className="t-label">{k}</dt>
                      <dd className="t-num text-sm font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-off py-14">
        <div className="shell">
          <Reveal y={26}>
            <div className="overflow-hidden rounded-2xl border border-line bg-paper-raise shadow-[0_44px_86px_-50px_rgba(8,9,10,0.42)]">
              <div className="relative aspect-[16/9]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={t.shot(product.name)}
                    fill
                    sizes="(min-width: 768px) 1120px, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                ) : (
                  <ProductGlyph seed={index} accent={product.accent} />
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="shell grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="t-label">{t.about}</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={100}>
              <p className="t-h3 max-w-[52ch] text-pretty text-ink-soft">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-12">
              <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
                {product.highlights.map((h) => (
                  <li key={h} className="bg-paper-raise px-5 py-6 text-sm text-ink-soft">
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            {product.href && (
              <Reveal delay={280} className="mt-10">
                <ButtonLink href={product.href} size="lg" arrow>
                  {t.visit(product.name)}
                </ButtonLink>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Next product — keeps the browse loop closed. */}
      {next.slug !== product.slug && (
        <section className="border-t border-line bg-paper-off py-16">
          <div className="shell">
            <Link href={localePath(locale, `/products/${next.slug}`)} className="group block">
              <p className="t-label">{t.next}</p>
              <div className="mt-4 flex items-baseline justify-between gap-6">
                <h2 className="t-h2 transition-colors duration-300 group-hover:text-ember">
                  {next.name}
                </h2>
                <span
                  aria-hidden="true"
                  className="text-2xl text-ink-mute transition-transform duration-500 ease-[var(--e-out)] group-hover:translate-x-2 group-hover:text-ink"
                >
                  →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
