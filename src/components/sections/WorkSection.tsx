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

type Open = ProductCategory | null;

const copy = {
  es: {
    label: "Nuestro trabajo",
    lines: ["Trabajo real,", "*funcionando hoy.*"],
    intro: "No son maquetas: son productos que hemos diseñado, programado y lanzado nosotros, y que hoy usan personas reales. El mismo método que aplicamos a tu proyecto.",
    cta: "Cuéntanos tu proyecto",
    folders: { WEB: "Webs y tiendas", APP: "Apps" } as Record<string, string>,
    projects: (n: number) => (n === 1 ? "1 proyecto" : `${n} proyectos`),
    folderHint: "Abre una carpeta para verlos.",
    yourProject: "Tu proyecto",
    yourProjectBody: "Cuéntanos qué necesitas",
    filters: { all: "Todos", APP: "Apps", WEB: "Webs y tiendas" } as Record<string, string>,
    filterGroup: "Filtrar proyectos",
    category: { APP: "App", WEB: "Web y tienda", SAAS: "SaaS", PLATFORM: "Plataforma" } as Record<string, string>,
    marks: "Marcas y aplicaciones en las que hemos trabajado",
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
    folders: { WEB: "Sites and stores", APP: "Apps" } as Record<string, string>,
    projects: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    folderHint: "Open a folder to see them.",
    yourProject: "Your project",
    yourProjectBody: "Tell us what you need",
    filters: { all: "All", APP: "Apps", WEB: "Sites and stores" } as Record<string, string>,
    filterGroup: "Filter projects",
    category: { APP: "App", WEB: "Site and store", SAAS: "SaaS", PLATFORM: "Platform" } as Record<string, string>,
    marks: "Brands and apps we have worked on",
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
  const categories = (["WEB", "APP"] as ProductCategory[]).filter((c) => products.some((p) => p.category === c));
  const [open, setOpen] = useState<Open>(null);
  const shown = open ? products.filter((p) => p.category === open) : [];

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
                {t.intro} {t.folderHint}
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

        {/* Folders: one per kind of work, each with a few of its projects peeking
            out. Opening one lists its projects below; the last is an open slot. */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-3 md:mt-20">
          {categories.map((c, i) => {
            const items = products.filter((p) => p.category === c);
            return (
              <li key={c}>
                <Reveal delay={i * 80} y={24} className="h-full">
                  <Folder
                    label={t.folders[c] ?? c}
                    sub={t.projects(items.length)}
                    images={items.map((p) => p.image).filter((x): x is string => Boolean(x))}
                    active={open === c}
                    onClick={() => setOpen(open === c ? null : c)}
                  />
                </Reveal>
              </li>
            );
          })}
          <li>
            <Reveal delay={categories.length * 80} y={24} className="h-full">
              <Folder
                label={t.yourProject}
                sub={t.yourProjectBody}
                images={[]}
                empty
                active={false}
                onClick={openContactModal}
              />
            </Reveal>
          </li>
        </ul>

        {open && (
          <ul key={open} className="anim-rise mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <li key={p.slug}>
                <WorkCard product={p} t={t} href={localePath(locale, `/products/${p.slug}`)} />
              </li>
            ))}
          </ul>
        )}

        {/* The marks of the projects, as app icons: no heading, the icons say it. */}
        <ul
          aria-label={t.marks}
          className="mt-12 flex flex-nowrap items-start justify-between gap-1 sm:mt-20 sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-8"
        >
          {products
            .filter((p) => appIcons[p.slug] && p.slug !== "velhoura-eyewear")
            .map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 70} y={18}>
                  <Link
                    href={localePath(locale, `/products/${p.slug}`)}
                    aria-label={t.open(p.name)}
                    className="group flex w-[3.75rem] flex-col items-center gap-1.5 sm:w-[104px] sm:gap-3"
                  >
                    <IconTile slug={p.slug} name={p.name} />
                    <span className="text-center text-[0.625rem] font-medium leading-tight text-paper-raise/65 sm:text-[0.8125rem] transition-colors duration-300 group-hover:text-paper-raise">
                      {p.name}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * A folder card. Back panel with a tab, a few project screenshots fanned out
 * behind a frosted front panel; on hover or when open the screenshots rise.
 * With `empty`, the folder holds nothing: a slot for the visitor's project.
 */
function Folder({
  label,
  sub,
  images,
  active,
  empty,
  onClick,
}: {
  label: string;
  sub: string;
  images: string[];
  active: boolean;
  empty?: boolean;
  onClick: () => void;
}) {
  const shots = images.slice(0, 3);
  const fan = shots.length === 1 ? [{ x: "0%", r: 0 }] : shots.length === 2 ? [{ x: "-22%", r: -7 }, { x: "22%", r: 7 }] : [{ x: "-32%", r: -9 }, { x: "32%", r: 9 }, { x: "0%", r: 0 }];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={empty ? undefined : active}
      className={cn(
        "group relative block h-full w-full rounded-3xl border bg-night-raise p-5 pb-6 text-left transition-colors duration-300 sm:p-6",
        active ? "border-paper-raise/40" : "border-paper-raise/12 hover:border-paper-raise/30",
      )}
    >
      <div className="relative mx-auto aspect-[5/4] w-[86%]">
        {/* Back panel and tab */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-[18%] w-[36%] rounded-t-2xl bg-gradient-to-b from-[#2a3f86] to-[#1b2c68]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-[11%] rounded-2xl rounded-tl-none bg-gradient-to-b from-[#1b2c68] to-[#101a45]"
        />

        {/* Projects peeking out */}
        {shots.map((src, i) => (
          <span
            key={src}
            aria-hidden="true"
            className={cn(
              "absolute bottom-[34%] left-1/2 aspect-[4/3] w-[56%] -translate-x-1/2 overflow-hidden rounded-xl bg-night shadow-[0_14px_30px_-10px_rgba(0,0,0,0.7)] ring-1 ring-white/20 transition-[margin] duration-500 ease-[var(--e-out)]",
              active ? "mb-[22%]" : "mb-[14%] group-hover:mb-[20%]",
            )}
            style={{
              translate: fan[i].x,
              rotate: `${fan[i].r}deg`,
              zIndex: i === shots.length - 1 ? 2 : 1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="size-full object-cover object-top" />
          </span>
        ))}

        {empty && (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[26%] z-[2] grid size-14 -translate-x-1/2 place-items-center rounded-full bg-ember text-2xl leading-none text-paper-raise transition-transform duration-500 group-hover:scale-110"
          >
            +
          </span>
        )}

        {/* Front panel, frosted */}
        <span
          aria-hidden="true"
          className="absolute inset-x-[-3%] bottom-0 z-[3] h-[46%] rounded-2xl border border-white/25 bg-gradient-to-b from-white/25 to-white/10 backdrop-blur-md"
        />
      </div>

      <span className="mt-6 flex items-end justify-between gap-3">
        <span className="min-w-0">
          <span className="block text-lg font-semibold tracking-[-0.02em] text-paper-raise">{label}</span>
          <span className="mt-1 block text-sm text-paper-raise/55">{sub}</span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
            active
              ? "rotate-90 border-paper-raise bg-paper-raise text-night"
              : "border-paper-raise/25 text-paper-raise group-hover:border-paper-raise",
          )}
        >
          →
        </span>
      </span>
    </button>
  );
}

/** The same app icon as on the cards, larger, standing on its own. */
function IconTile({ slug, name }: { slug: string; name: string }) {
  const icon = appIcons[slug];
  if (!icon) return null;
  return (
    <span
      className={`relative block size-[2.75rem] overflow-hidden rounded-[22.5%] shadow-[0_18px_36px_-14px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.16)] transition-transform duration-500 ease-[var(--e-out)] group-hover:-translate-y-1.5 group-hover:scale-105 sm:size-[6.25rem] ${icon.bg}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon.src}
        alt={name}
        loading="lazy"
        className={`size-full ${icon.bleed ? "object-cover" : `object-contain ${icon.pad}`}`}
        style={icon.invert ? { filter: "brightness(0) invert(1)" } : undefined}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10"
      />
    </span>
  );
}

/**
 * Each project's mark as an app icon, in the corner of its card: a rounded
 * tile (the iOS "squircle" radius) with a soft highlight, the logo inside.
 * Projects without a logo of their own fall back to the studio's mark.
 */
const appIcons: Record<string, { src: string; bg: string; pad: string; invert?: boolean; bleed?: boolean }> = {
  roady: { src: "/logos/roady.webp", bg: "bg-white", pad: "p-[17%]" },
  "gym-tracker": { src: "/logos/gym-tracker-icon.webp", bg: "bg-white", pad: "p-[12%]" },
  "velhoura-eyewear": { src: "/brand/logo-mark.png", bg: "bg-[#111317]", pad: "p-[22%]", invert: true },
  zhestar: { src: "/logos/zhestar.webp", bg: "bg-white", pad: "p-[20%]" },
  "maria-del-mar": { src: "/logos/mmr-icon.webp", bg: "bg-[#4e8276]", pad: "", bleed: true },
};

function AppIcon({ slug, name }: { slug: string; name: string }) {
  const icon = appIcons[slug];
  if (!icon) return null;
  return (
    <span
      className={`absolute right-5 top-5 z-[2] block size-14 overflow-hidden rounded-[22.5%] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.14)] transition-transform duration-500 ease-[var(--e-out)] group-hover:scale-110 sm:right-6 sm:top-6 sm:size-16 ${icon.bg}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon.src}
        alt={name}
        loading="lazy"
        className={`size-full ${icon.bleed ? "object-cover" : `object-contain ${icon.pad}`}`}
        style={icon.invert ? { filter: "brightness(0) invert(1)" } : undefined}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10"
      />
    </span>
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
      <AppIcon slug={product.slug} name={product.name} />

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
