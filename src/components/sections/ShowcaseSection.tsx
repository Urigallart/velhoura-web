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
    sector: "Training app · fictional brand",
    blurb: "One page, one message and a single button: download the app.",
    scope: ["One page", "Visual identity", "Entrance animation", "Basic SEO"],
  },
  business: {
    tier: "Business",
    sector: "Renewable energy · fictional brand",
    blurb: "Company website: solutions, cases, figures and quote requests.",
    scope: ["6 pages", "Content manager", "Forms", "Technical SEO"],
  },
  ecommerce: {
    tier: "Online Store",
    sector: "Trainers and clothes · fictional brand",
    blurb: "A complete store: catalogue, cart, Stripe checkout and order management.",
    scope: ["Product catalogue", "Cart and checkout", "Stripe payments", "Order panel"],
  },
  custom: {
    tier: "Custom",
    sector: "Logistics SaaS · fictional brand",
    blurb: "A platform with real-time data, roles, a dashboard and API integrations.",
    scope: ["Web application", "Database", "API", "Real-time dashboard"],
  },
};

/** Each example wears its plan's colour (same as the pricing cards). */
const planColour: Record<string, string> = {
  landing: "#ffe45c",
  business: "#ff7a45",
  ecommerce: "#7fd8ff",
  custom: "#c77dff",
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
    brand: "Pulso",
    sector: "App de entrenamiento · marca ficticia",
    blurb:
      "Una página, un mensaje y un único botón: descargar la app.",
    scope: ["Una página", "Identidad visual", "Animación de entrada", "SEO básico"],
    preview: <PreviewLanding />,
  },
  {
    id: "business",
    tier: "Business",
    brand: "Brisa",
    sector: "Energía renovable · marca ficticia",
    blurb:
      "Web corporativa: soluciones, casos, cifras y petición de presupuesto.",
    scope: ["6 páginas", "Gestor de contenido", "Formularios", "SEO técnico"],
    preview: <PreviewBusiness />,
  },
  {
    id: "ecommerce",
    tier: "Tienda Online",
    brand: "Kiko",
    sector: "Zapatillas y ropa · marca ficticia",
    blurb:
      "Tienda completa: catálogo, carrito, checkout con Stripe y gestión de pedidos.",
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
    <section className="band-tight bg-paper-sunk">
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
              className="mx-auto flex gap-1 rounded-full bg-paper-raise p-1.5 shadow-[0_10px_30px_-20px_rgba(8,9,10,0.3)]"
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
                    "relative rounded-full px-6 py-2.5 text-[0.9375rem] font-semibold transition-colors duration-300",
                    active === i ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active === i && (
                    <motion.span
                      layoutId="showcase-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: planColour[s.id] }}
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
                    <span
                      className="inline-block rounded-full px-3.5 py-1 text-[0.8125rem] font-semibold text-ink"
                      style={{ background: planColour[current.id] }}
                    >
                      {current.tier}
                    </span>
                    <h3 className="mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.05em]">
                      {current.brand}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-ink-mute">{current.sector}</p>
                    <p className="t-body mt-5 max-w-[38ch]">{current.blurb}</p>

                    <ul className="mt-7 space-y-2">
                      {current.scope.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 rounded-2xl bg-paper-raise px-4 py-3 text-[0.9375rem] font-medium text-ink"
                        >
                          <span
                            aria-hidden="true"
                            className="grid size-5 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold text-ink"
                            style={{ background: planColour[current.id] }}
                          >
                            ✓
                          </span>
                          {item}
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
              <span
                className="inline-block rounded-full px-3 py-1 text-[0.8125rem] font-semibold text-ink"
                style={{ background: planColour[s.id] }}
              >
                {s.tier}
              </span>
              <h3 className="mt-3 text-[2rem] font-semibold leading-none tracking-[-0.045em]">{s.brand}</h3>
              <p className="mt-1 text-sm text-ink-mute">{s.sector}</p>
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
    <div className="overflow-hidden rounded-3xl bg-paper-raise shadow-[0_40px_80px_-40px_rgba(8,9,10,0.45)]">
      <div className="flex items-center gap-2 bg-paper-sunk px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        <span className="mx-auto rounded-full bg-paper-raise px-4 py-0.5 font-sans text-[0.8125rem] text-ink-mute">
          ejemplo.velhoura.com
        </span>
      </div>
      <div className="aspect-[16/10] sm:aspect-[16/9]">{children}</div>
    </div>
  );
}
