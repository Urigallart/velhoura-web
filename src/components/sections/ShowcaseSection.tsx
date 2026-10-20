"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PreviewBusiness,
  PreviewCustom,
  PreviewEcommerce,
  PreviewLanding,
} from "@/components/visual/SitePreviews";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/useLocale";

/** English words for the examples; the previews themselves stay as built. */
const showcasesEn: Record<string, Pick<Showcase, "tier" | "sector" | "blurb" | "scope">> = {
  landing: {
    tier: "Landing",
    sector: "Botanical skincare · fictional brand",
    blurb: "One page. One product. Editorial type, plenty of space and a single call to action.",
    scope: ["One page", "Visual identity", "Entrance animation", "Basic SEO"],
  },
  business: {
    tier: "Business",
    sector: "Industrial engineering · fictional brand",
    blurb: "Multi-page company website: services, sectors, projects and proposal requests.",
    scope: ["6 pages", "Content manager", "Forms", "Technical SEO"],
  },
  ecommerce: {
    tier: "Online Store",
    sector: "Homeware · fictional brand",
    blurb: "A complete direct-to-consumer store: catalogue, cart, Stripe checkout and order management.",
    scope: ["Product catalogue", "Cart and checkout", "Stripe payments", "Order panel"],
  },
  custom: {
    tier: "Custom",
    sector: "Logistics SaaS · fictional brand",
    blurb: "A platform with real-time data, roles, a dashboard and API integrations.",
    scope: ["Web application", "Database", "API", "Real-time dashboard"],
  },
};

const copy = {
  es: {
    label: "Ejemplos",
    lines: ["Qué significa", "*cada plan.*"],
    subtitle: "Cuatro ejemplos construidos para mostrar el alcance de cada nivel. Las marcas son ficticias.",
    tablist: "Ejemplos por plan",
  },
  en: {
    label: "Examples",
    lines: ["What each plan", "*looks like.*"],
    subtitle: "Four examples built to show the scope of each tier. The brands are fictional.",
    tablist: "Examples by plan",
  },
};

type Showcase = {
  id: string;
  tier: string;
  brand: string;
  sector: string;
  blurb: string;
  scope: string[];
  preview: ReactNode;
};

/**
 * Worked examples for each tier, so a visitor can see the difference between
 * a landing, a corporate site and a platform without reading a feature list.
 *
 * Desktop gets a tabbed viewer with a crossfade; mobile stacks the three
 * previews so there is nothing to discover behind a control.
 */
const showcasesBase: Showcase[] = [
  {
    id: "landing",
    tier: "Landing",
    brand: "Meridia",
    sector: "Cosmética botánica · marca ficticia",
    blurb:
      "Una página. Un producto. Tipografía editorial, mucho aire y una única llamada a la acción.",
    scope: ["One page", "Identidad visual", "Animación de entrada", "SEO básico"],
    preview: <PreviewLanding />,
  },
  {
    id: "business",
    tier: "Business",
    brand: "Nordvik",
    sector: "Ingeniería industrial · marca ficticia",
    blurb:
      "Web corporativa multi-página: servicios, sectores, proyectos y captación de propuestas.",
    scope: ["6 páginas", "Gestor de contenido", "Formularios", "SEO técnico"],
    preview: <PreviewBusiness />,
  },
  {
    id: "ecommerce",
    tier: "Tienda Online",
    brand: "Solstice",
    sector: "Artículos de hogar · marca ficticia",
    blurb:
      "Tienda D2C completa: catálogo, carrito, checkout con Stripe y gestión de pedidos.",
    scope: ["Catálogo de producto", "Carrito y checkout", "Pagos con Stripe", "Panel de pedidos"],
    preview: <PreviewEcommerce />,
  },
  {
    id: "custom",
    tier: "Custom",
    brand: "Cadence",
    sector: "SaaS logístico · marca ficticia",
    blurb:
      "Plataforma con datos en tiempo real, roles, panel de control e integraciones por API.",
    scope: ["Aplicación web", "Base de datos", "API", "Dashboard en tiempo real"],
    preview: <PreviewCustom />,
  },
];

export function ShowcaseSection() {
  const locale = useLocale();
  const t = copy[locale];
  const showcases =
    locale === "en"
      ? showcasesBase.map((s) => ({ ...s, ...showcasesEn[s.id] }))
      : showcasesBase;
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = showcases[active];

  return (
    <section className="band-tight bg-paper-off">
      <div className="shell">
        <SectionHeading
          align="center"
          tone="green"
          index="03"
          label={t.label}
          lines={t.lines}
          subtitle={t.subtitle}
        />

        {/* ── Desktop: tabbed viewer ─────────────────────────────── */}
        <div className="mt-14 hidden md:block">
          <Reveal>
            <div
              role="tablist"
              aria-label={t.tablist}
              className="flex gap-1 rounded-full border border-line bg-paper-raise p-1"
              style={{ width: "fit-content" }}
            >
              {showcases.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  id={`tab-${s.id}`}
                  aria-selected={active === i}
                  aria-controls={`panel-${s.id}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300",
                    active === i ? "text-paper-raise" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active === i && (
                    <motion.span
                      layoutId="showcase-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 34,
                      }}
                    />
                  )}
                  <span className="relative z-10">{s.tier}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <BrowserFrame>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.id}
                      id={`panel-${current.id}`}
                      role="tabpanel"
                      aria-labelledby={`tab-${current.id}`}
                      initial={reduced ? false : { opacity: 0, scale: 1.015 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? undefined : { opacity: 0, scale: 0.995 }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      {current.preview}
                    </motion.div>
                  </AnimatePresence>
                </BrowserFrame>
              </div>

              <div className="lg:col-span-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="t-label !text-ember">{current.tier}</p>
                    <h3 className="t-h2 mt-3">{current.brand}</h3>
                    <p className="mt-2 text-sm text-ink-mute">
                      {current.sector}
                    </p>
                    <p className="t-body mt-5 max-w-[38ch]">{current.blurb}</p>

                    <ul className="mt-7 space-y-px overflow-hidden rounded-xl border border-line">
                      {current.scope.map((item) => (
                        <li
                          key={item}
                          className="flex items-center justify-between border-b border-line bg-paper-raise px-4 py-3 text-sm text-ink-soft last:border-b-0"
                        >
                          {item}
                          <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-line-strong"
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Mobile: stacked, nothing hidden behind a tab ────────── */}
        <div className="mt-12 space-y-10 md:hidden">
          {showcases.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <p className="t-label !text-ember">{s.tier}</p>
              <h3 className="t-h3 mt-2">{s.brand}</h3>
              <p className="mt-1 text-xs text-ink-mute">{s.sector}</p>
              <div className="mt-4">
                <BrowserFrame>{s.preview}</BrowserFrame>
              </div>
              <p className="t-body mt-4 text-[0.9375rem]">{s.blurb}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Neutral browser chrome so the previews read as real sites, not as UI cards. */
function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper-raise shadow-[0_34px_74px_-40px_rgba(8,9,10,0.42)]">
      <div className="flex items-center gap-2 border-b border-line bg-paper-sunk px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        <span className="mx-auto rounded-md bg-paper-raise px-3 py-0.5 font-sans text-[0.8125rem] text-ink-faint">
          ejemplo.velhoura.com
        </span>
      </div>
      <div className="aspect-[16/10] sm:aspect-[16/9]">{children}</div>
    </div>
  );
}
