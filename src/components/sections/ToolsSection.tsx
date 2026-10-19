import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tools, type Tool } from "@/data/tools";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Herramientas",
    lines: ["Con lo que", "*trabajamos.*"],
    subtitle: "Las plataformas y tecnologías que usamos a diario para diseñar, construir y hacer crecer tu negocio.",
    aria: "Herramientas con las que trabajamos",
  },
  en: {
    label: "Tools",
    lines: ["What we", "*work with.*"],
    subtitle: "The platforms and technologies we use every day to design, build and grow your business.",
    aria: "Tools we work with",
  },
};

/**
 * The tools we work with, as an endless strip of logos — no boxes, just
 * the mark in its brand colour and its name.
 *
 * The strip is the list twice in a row, translated by exactly half its width
 * on a loop, so the seam is never visible. It is pure CSS (see `.marquee` in
 * `globals.css`): hovering or focusing it pauses the run so a tile can be
 * read, the edges fade out instead of cutting, and with reduced motion the
 * tiles simply sit still in a wrapped grid.
 */
export function ToolsSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <section className="band border-t border-line">
      <div className="shell">
        <SectionHeading
          label={t.label}
          lines={t.lines}
          subtitle={t.subtitle}
        />
      </div>

      <Reveal delay={150} className="mt-12 md:mt-16">
        <div className="marquee" role="region" aria-label={t.aria}>
          <ul className="marquee-track">
            {tools.map((t) => (
              <ToolTile key={t.name} tool={t} />
            ))}
            {/* The second run is only there to close the loop. */}
            {tools.map((t) => (
              <ToolTile key={`dup-${t.name}`} tool={t} duplicate />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function ToolTile({ tool, duplicate }: { tool: Tool; duplicate?: boolean }) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="marquee-item flex w-[104px] shrink-0 flex-col items-center gap-2.5 py-2"
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={tool.name}
        className="size-8"
        fill={`#${tool.icon.hex}`}
      >
        <path d={tool.icon.path} />
      </svg>
      <span className="whitespace-nowrap text-[11px] font-medium tracking-[-0.01em] text-ink-soft">
        {tool.name}
      </span>
    </li>
  );
}
