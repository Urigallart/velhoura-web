import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildTools, designTools, type Tool } from "@/data/tools";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Herramientas",
    lines: ["Con lo que", "*trabajamos.*"],
    subtitle: "Diseño UX/UI, inteligencia artificial, marketing y desarrollo: las plataformas que usamos a diario para diseñar, construir y hacer crecer tu negocio.",
    aria: "Herramientas y marcas con las que trabajamos",
  },
  en: {
    label: "Tools",
    lines: ["What we", "*work with.*"],
    subtitle: "UX/UI design, artificial intelligence, marketing and development: the platforms we use every day to design, build and grow your business.",
    aria: "Tools and brands we work with",
  },
};

/**
 * The tools we work with, as two endless strips of logos — no boxes, just the
 * mark in its brand colour and its name. The strips run in opposite
 * directions, which is what makes the section read as a place rather than a
 * list; the second one is slower so the two never fall into step.
 *
 * Each strip is its list twice in a row, translated by exactly half its width
 * on a loop, so the seam is never visible. Pure CSS (see `.marquee` in
 * `globals.css`): hovering or focusing a strip pauses it so a logo can be
 * read, the edges fade out instead of cutting, and with reduced motion the
 * logos simply sit still in a wrapped grid.
 */
export function ToolsSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <section className="band bg-paper-off">
      <div className="shell">
        <SectionHeading align="center" tone="sky" label={t.label} lines={t.lines} subtitle={t.subtitle} />
      </div>

      <Reveal delay={150} className="mt-12 md:mt-16">
        <div role="region" aria-label={t.aria} className="space-y-2">
          <Strip tools={designTools} />
          <Strip tools={buildTools} reverse />
        </div>
      </Reveal>
    </section>
  );
}

function Strip({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  return (
    <div className={reverse ? "marquee marquee-reverse" : "marquee"}>
      <ul className="marquee-track">
        {tools.map((tool) => (
          <ToolTile key={tool.name} tool={tool} />
        ))}
        {/* The second run is only there to close the loop. */}
        {tools.map((tool) => (
          <ToolTile key={`dup-${tool.name}`} tool={tool} duplicate />
        ))}
      </ul>
    </div>
  );
}

function ToolTile({ tool, duplicate }: { tool: Tool; duplicate?: boolean }) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="marquee-item flex w-[116px] shrink-0 flex-col items-center gap-3 py-3"
    >
      {tool.icon ? (
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-label={tool.name}
          className="size-9"
          fill={`#${tool.icon.hex}`}
        >
          <path d={tool.icon.path} />
        </svg>
      ) : tool.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tool.logo} alt={tool.name} className="h-9 w-auto max-w-[84px] object-contain" />
      ) : (
        <span
          role="img"
          aria-label={tool.name}
          className="grid size-9 place-items-center rounded-[10px] bg-ink font-sans text-[0.8125rem] font-semibold tracking-tight text-paper"
        >
          {tool.mono}
        </span>
      )}
      <span className="whitespace-nowrap text-xs font-medium tracking-[-0.01em] text-ink-soft">
        {tool.name}
      </span>
    </li>
  );
}
