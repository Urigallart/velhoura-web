"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getProducts } from "@/data/localized";
import type { Product, ProductCategory } from "@/data/products";
import { localePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/useLocale";
import { openContactModal } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

/**
 * Real work, first thing after the intro: the studio's own products as large
 * image cards, filterable by kind, ending with an open slot for the
 * visitor's project. Dark ground, so it reads as a gallery wall between the
 * light hero and the light services below.
 *
 * Only projects that exist are shown — the studio's own products. Client
 * work joins this grid once there is client work to show.
 */

type Filter = "all" | ProductCategory;

const copy = {
  es: {
    label: "Nuestro trabajo",
    lines: ["Trabajo real,", "*funcionando hoy.*"],
    intro: "No son maquetas: son productos que hemos diseñado, programado y lanzado nosotros, y que hoy usan personas reales. El mismo método que aplicamos a tu proyecto.",
    cta: "Cuéntanos tu proyecto",
    filters: { all: "Todos", APP: "Apps", WEB: "Webs y tiendas" } as Record<string, string>,
    filterGroup: "Filtrar proyectos",
    category: { APP: "App", WEB: "Web y tienda", SAAS: "SaaS", PLATFORM: "Plataforma" } as Record<string, string>,
    status: { LIVE: "En producción", "COMING SOON": "Próximamente", BUILDING: "En desarrollo" } as Record<string, string>,
    open: (name: string) => `Ver ${name}`,
    nextTitle: ["Tu negocio,", "el siguiente."],
    nextBody: "Cuéntanos qué necesitas y te proponemos cómo hacerlo.",
  },
  en: {
    label: "Our work",
    lines: ["Real work,", "*live today.*"],
    intro: "These aren't mock-ups: they're products we designed, built and launched ourselves, used by real people today. The same method we bring to your project.",
    cta: "Tell us about your project",
    filters: { all: "All", APP: "Apps", WEB: "Sites and stores" } as Record<string, string>,
    filterGroup: "Filter projects",
    category: { APP: "App", WEB: "Site and store", SAAS: "SaaS", PLATFORM: "Platform" } as Record<string, string>,
    status: { LIVE: "Live", "COMING SOON": "Coming soon", BUILDING: "In development" } as Record<string, string>,
    open: (name: string) => `View ${name}`,
    nextTitle: ["Your business,", "next."],
    nextBody: "Tell us what you need and we'll propose how to do it.",
  },
};

export function WorkSection() {
  const locale = useLocale();
  const t = copy[locale];
  const products = getProducts(locale);
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section
      id="products"
      className="grain grain-invert relative isolate overflow-hidden bg-night py-[clamp(88px,11vw,152px)] text-paper-raise"
     data-tone="violet">
      <div className="shell">
        {/* Heading row: claim on the left, pitch and action on the right. */}
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
<MaskedTitle
              as="h2"
              lines={t.lines}
              className="t-h1 mt-6 text-balance text-paper-raise [&_.t-em]:text-paper-raise/45"
              stagger={90}
            />
          </div>
          <div className="flex flex-col items-start gap-6 md:col-span-5 md:items-end md:justify-end md:text-right">
            <Reveal delay={160}>
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-paper-raise/60">
                {t.intro}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <button
                type="button"
                onClick={openContactModal}
                className="inline-flex items-center gap-3 rounded-full border border-paper-raise/20 py-1.5 pl-5 pr-1.5 text-sm font-medium text-paper-raise transition-colors duration-300 hover:border-paper-raise/40 hover:bg-paper-raise/5"
              >
                {t.cta}
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full bg-ember text-paper-raise"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                    <path
                      d="M4.5 11.5 11.5 4.5M11.5 4.5H5.5M11.5 4.5v6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </Reveal>
          </div>
        </div>

        {/* Filters, on a hairline that runs to the edge. */}
        <Reveal delay={120} className="mt-14 md:mt-20">
          <div className="flex items-center gap-6">
            <div role="group" aria-label={t.filterGroup} className="flex flex-wrap gap-1">
              {(["all", ...categories] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    filter === f
                      ? "border border-paper-raise/20 bg-paper-raise/10 text-paper-raise"
                      : "border border-transparent text-paper-raise/55 hover:text-paper-raise",
                  )}
                >
                  {t.filters[f] ?? f}
                </button>
              ))}
            </div>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-paper-raise/15 sm:block" />
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 70} y={24}>
                <WorkCard product={p} t={t} href={localePath(locale, `/products/${p.slug}`)} />
              </Reveal>
            </li>
          ))}

          {/* The open slot: the next project in this grid. */}
          <li
            className={
              // Fills what is left of the last row, so the grid never ends on a lone card.
              shown.length % 3 === 0
                ? "lg:col-span-3"
                : shown.length % 3 === 1
                  ? "lg:col-span-2"
                  : undefined
            }
          >
            <Reveal delay={shown.length * 70} y={24} className="h-full">
              <button
                type="button"
                onClick={openContactModal}
                className="group relative flex aspect-[4/3] h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-paper-raise/15 bg-night-raise p-6 text-left transition-colors duration-300 hover:border-paper-raise/30 sm:aspect-auto sm:min-h-[12rem]"
              >
                <span className="t-label !text-paper-raise/45">+1</span>
                <span>
                  <span className="block text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-paper-raise">
                    {t.nextTitle[0]}
                    <br />
                    <span className="text-paper-raise/45">{t.nextTitle[1]}</span>
                  </span>
                  <span className="mt-3 block max-w-[30ch] text-sm text-paper-raise/55">
                    {t.nextBody}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-6 grid size-9 place-items-center rounded-full bg-ember text-paper-raise"
                >
                  →
                </span>
              </button>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

function WorkCard({
  product,
  t,
  href,
}: {
  product: Product;
  t: (typeof copy)["es"];
  href: string;
}) {
  return (
    <Link
      href={href}
      aria-label={t.open(product.name)}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-paper-raise/10 bg-night-raise"
    >
      {product.image && (
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          quality={90}
          className="object-cover object-top transition-transform duration-700 ease-[var(--e-out)] group-hover:scale-[1.03]"
        />
      )}
      {/* Readability: the image falls to night under the text. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,9,10,0)_0%,rgba(8,9,10,0.05)_45%,rgba(8,9,10,0.9)_100%)]"
      />

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <span className="min-w-0">
          <span className="block font-sans text-[0.8125rem] font-semibold text-paper-raise/60">
            {t.category[product.category] ?? product.category} · {t.status[product.status] ?? product.status}
          </span>
          <span className="mt-1.5 block text-lg font-semibold tracking-[-0.02em] text-paper-raise">
            {product.name}
          </span>
          <span className="mt-1 block truncate text-sm text-paper-raise/60">
            {product.highlights.slice(0, 3).join(" · ")}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-paper-raise/25 text-paper-raise transition-colors duration-300 group-hover:border-paper-raise group-hover:bg-paper-raise group-hover:text-night"
        >
          →
        </span>
      </span>
    </Link>
  );
}
