import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { ProductGlyph } from "@/components/visual/ProductGlyph";
import { getProducts } from "@/data/localized";
import type { Product } from "@/data/products";
import { localePath, type Locale } from "@/i18n/locale";
import { cn } from "@/lib/utils";

const copy = {
  es: {
    all: "Todo nuestro trabajo",
    category: { APP: "App", WEB: "Web y tienda", SAAS: "SaaS", PLATFORM: "Plataforma" } as Record<string, string>,
    status: { LIVE: "En producción", "COMING SOON": "Próximamente", BUILDING: "En desarrollo" } as Record<string, string>,
    shot: (name: string) => `Captura de ${name}`,
    visit: (name: string) => `Visitar ${name}`,
    visitHint: "Se abre en una pestaña nueva",
    aboutLines: ["La historia", "*del proyecto.*"],
    galleryLines: ["Así se ve", "*por dentro.*"],
    galleryHint: "Desliza para ver más",
    includesLabel: "Qué incluye",
    stackLabel: "Con qué está hecho",
    ctaLines: { live: ["Pruébalo", "*en directo.*"], soon: ["Échale", "*un vistazo.*"] },
    ctaBody: "Nada de maquetas: es el producto real, funcionando ahora mismo.",
    ctaSoon: "Así se ve hoy, antes del lanzamiento.",
    yours: "¿Quieres algo así para tu negocio?",
    yoursCta: "Cuéntanos tu proyecto",
    next: "Siguiente proyecto",
  },
  en: {
    all: "All our work",
    category: { APP: "App", WEB: "Site and store", SAAS: "SaaS", PLATFORM: "Platform" } as Record<string, string>,
    status: { LIVE: "Live", "COMING SOON": "Coming soon", BUILDING: "In development" } as Record<string, string>,
    shot: (name: string) => `Screenshot of ${name}`,
    visit: (name: string) => `Visit ${name}`,
    visitHint: "Opens in a new tab",
    aboutLines: ["The story", "*behind it.*"],
    galleryLines: ["What it looks", "*like inside.*"],
    galleryHint: "Swipe to see more",
    includesLabel: "What's included",
    stackLabel: "Built with",
    ctaLines: { live: ["Try it", "*live.*"], soon: ["Take", "*a look.*"] },
    ctaBody: "No mock-ups: it's the real product, running right now.",
    ctaSoon: "This is how it looks today, ahead of launch.",
    yours: "Want something like this for your business?",
    yoursCta: "Tell us about your project",
    next: "Next project",
  },
};

const domain = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

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
  const tone = product.tone ?? "sky";
  const soon = product.status !== "LIVE";
  const phones = product.gallery?.filter((g) => g.kind === "phone") ?? [];
  const desktops = product.gallery?.filter((g) => g.kind === "desktop") ?? [];

  return (
    <div data-tone={tone}>
      {/* ── Hero: what it is, and the way in ─────────────────────────── */}
      <section className="pt-32 pb-14 sm:pt-40">
        <div className="shell">
          <Reveal y={10}>
            <Link
              href={localePath(locale, "/#products")}
              className="t-label inline-flex items-center gap-2 transition-colors duration-300 hover:text-ink"
            >
              <span aria-hidden="true">←</span> {t.all}
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-y-10 md:grid-cols-12 md:items-end md:gap-x-10">
            <div className="md:col-span-8">
              <Reveal delay={60}>
                <ul className="flex flex-wrap gap-2">
                  {[t.category[product.category] ?? product.category, t.status[product.status] ?? product.status, product.year].map(
                    (pill, i) => (
                      <li
                        key={pill}
                        className={cn(
                          "rounded-full px-3 py-1 text-[0.8125rem] font-medium",
                          i === 1
                            ? "bg-[linear-gradient(90deg,var(--g1),var(--g2))] text-white"
                            : "border border-line text-ink-soft",
                        )}
                      >
                        {pill}
                      </li>
                    ),
                  )}
                </ul>
              </Reveal>
              <MaskedTitle
                as="h1"
                lines={[product.name]}
                className="mt-6 text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
                split="word"
              />
              <Reveal delay={140}>
                <p className="t-lead mt-6 max-w-[46ch] text-pretty">{product.summary}</p>
              </Reveal>
            </div>

            {product.href && (
              <div className="md:col-span-4 md:justify-self-end">
                <Reveal delay={220}>
                  <ButtonLink href={product.href} size="lg" arrow className="w-full md:w-auto">
                    {t.visit(product.name)}
                  </ButtonLink>
                  <p className="mt-3 flex items-center gap-2 text-sm text-ink-mute md:justify-end">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-[linear-gradient(90deg,var(--g1),var(--g2))]" />
                    {domain(product.href)}
                  </p>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Cover ─────────────────────────────────────────────────────── */}
      <section className="pb-6">
        <div className="shell">
          <Reveal y={26}>
            <div className="overflow-hidden rounded-[1.75rem] border border-line bg-paper-raise shadow-[0_44px_86px_-50px_rgba(8,9,10,0.42)]">
              <div className="relative aspect-[16/10]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={t.shot(product.name)}
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    quality={90}
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

      {/* ── Story ─────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell">
          <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-5">
              <MaskedTitle
                as="h2"
                lines={t.aboutLines}
                className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
              />
            </div>
            <div className="md:col-span-7">
              <Reveal delay={120}>
                <p className="t-lead text-pretty">{product.description}</p>
              </Reveal>
            </div>
          </div>

          {product.story && (
            <ol className="mt-14 grid gap-4 sm:grid-cols-2">
              {product.story.map((block, i) => (
                <li key={block.title}>
                  <Reveal delay={i * 80} y={20} className="h-full">
                    <div className="h-full rounded-3xl border border-line bg-paper-raise p-7 sm:p-8">
                      <span className="t-num inline-grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,var(--g1),var(--g2))] text-sm font-semibold text-white">
                        {i + 1}
                      </span>
                      <h3 className="mt-5 text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">{block.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{block.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          )}

          {(product.highlights.length > 0 || product.stack) && (
            <Reveal delay={120} className="mt-10">
              <div className="grid gap-4 md:grid-cols-2">
                <ChipGroup label={t.includesLabel} items={product.highlights} />
                {product.stack && <ChipGroup label={t.stackLabel} items={product.stack} mono />}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      {(phones.length > 0 || desktops.length > 0) && (
        <section className="grain grain-invert relative isolate overflow-hidden bg-night py-[clamp(80px,10vw,140px)] text-paper-raise">
          {/* The product's own colour, as a glow behind its screens. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--g2),transparent)] opacity-35 blur-2xl"
          />
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <MaskedTitle
                as="h2"
                lines={t.galleryLines}
                className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-paper-raise"
              />
              {phones.length > 1 && <p className="text-sm text-paper-raise/50 sm:hidden">{t.galleryHint} →</p>}
            </div>

            {desktops.length > 0 && (
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {desktops.map((g, i) => (
                  <Reveal key={g.src} delay={i * 70} y={24} className={cn(i === 0 && "md:col-span-2")}>
                    <figure>
                      <div className="overflow-hidden rounded-2xl border border-paper-raise/10 bg-paper-raise shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
                        <div className="flex h-8 items-center gap-1.5 border-b border-black/5 bg-[#f3f4f6] px-3.5">
                          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                            <span key={c} className="size-2.5 rounded-full" style={{ background: c }} />
                          ))}
                        </div>
                        <Image src={g.src} alt={g.caption} width={2400} height={1500} sizes={i === 0 ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 600px, 100vw"} quality={90} className="block h-auto w-full" />
                      </div>
                      <figcaption className="mt-3 text-sm text-paper-raise/60">{g.caption}</figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}

            {phones.length > 0 && (
              <ul
                className={cn(
                  "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                  "sm:mx-auto sm:grid sm:snap-none sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:pb-0",
                  desktops.length > 0 ? "mt-10" : "mt-12",
                  phones.length === 1 && "sm:max-w-[280px] sm:grid-cols-1",
                  phones.length === 2 && "sm:max-w-[600px] sm:grid-cols-2",
                  (phones.length === 3 || phones.length > 4) && "sm:max-w-[920px] sm:grid-cols-3",
                  phones.length === 4 && "sm:grid-cols-2 lg:grid-cols-4",
                )}
              >
                {phones.map((g, i) => (
                  <li key={g.src} className="w-[72vw] max-w-[290px] shrink-0 snap-center sm:w-auto sm:max-w-none">
                    <Reveal delay={i * 70} y={24}>
                      <figure>
                        <div className="rounded-[2.4rem] border border-paper-raise/15 bg-black p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
                          <Image
                            src={g.src}
                            alt={g.caption}
                            width={1080}
                            height={2341}
                            sizes="(min-width: 640px) 300px, 72vw"
                            quality={90}
                            className="block h-auto w-full rounded-[1.9rem]"
                          />
                        </div>
                        <figcaption className="mt-4 text-sm leading-snug text-paper-raise/60">{g.caption}</figcaption>
                      </figure>
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ── Visit: the link, impossible to miss ───────────────────────── */}
      {product.href && (
        <section className="band">
          <div className="shell">
            <Reveal y={24}>
              <div className="relative isolate overflow-hidden rounded-[2rem] bg-night px-7 py-14 text-center text-paper-raise sm:px-12 sm:py-20">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_120%,var(--g2),transparent)] opacity-60"
                />
                <MaskedTitle
                  as="h2"
                  lines={soon ? t.ctaLines.soon : t.ctaLines.live}
                  className="mx-auto text-balance text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-paper-raise"
                />
                <p className="mx-auto mt-5 max-w-[44ch] text-pretty text-paper-raise/65">{soon ? t.ctaSoon : t.ctaBody}</p>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-9 inline-flex items-center gap-4 rounded-full bg-paper-raise py-2 pl-7 pr-2 text-[1.0625rem] font-semibold text-night transition-transform duration-300 hover:scale-[1.03]"
                >
                  {t.visit(product.name)}
                  <span className="grid size-11 place-items-center rounded-full bg-[linear-gradient(135deg,var(--g1),var(--g2))] text-white">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.5M11.5 4.5v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </a>
                <p className="mt-4 text-sm text-paper-raise/45">
                  {domain(product.href)} · {t.visitHint}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <p className="text-center text-[0.9375rem] text-ink-soft">
                {t.yours}{" "}
                <Link
                  href={localePath(locale, "/#contact")}
                  className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {t.yoursCta}
                </Link>
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Next product — keeps the browse loop closed. */}
      {next.slug !== product.slug && (
        <section className="border-t border-line bg-paper-off py-16">
          <div className="shell">
            <Link href={localePath(locale, `/products/${next.slug}`)} className="group grid items-center gap-6 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="t-label">{t.next}</p>
                <h2 className="t-h2 mt-3 transition-colors duration-300 group-hover:text-ink-soft">{next.name}</h2>
                <p className="mt-2 max-w-[52ch] text-[0.9375rem] text-ink-mute">{next.summary}</p>
              </div>
              {next.image && (
                <div className="relative hidden aspect-[16/10] w-64 overflow-hidden rounded-2xl border border-line sm:block">
                  <Image src={next.image} alt="" fill sizes="256px" quality={90} className="object-cover object-top transition-transform duration-700 ease-[var(--e-out)] group-hover:scale-[1.04]" />
                </div>
              )}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function ChipGroup({ label, items, mono }: { label: string; items: string[]; mono?: boolean }) {
  return (
    <div className="rounded-3xl border border-line bg-paper-off p-6 sm:p-7">
      <p className="t-label">{label}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "rounded-full border border-line bg-paper-raise px-3.5 py-1.5 text-[0.875rem] text-ink",
              mono && "font-mono text-[0.8125rem]",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
