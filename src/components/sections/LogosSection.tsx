import { Strip } from "@/components/sections/ToolsSection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Tool } from "@/data/tools";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    lines: ["Marcas y apps", "*que ya hemos trabajado.*"],
    aria: "Marcas y aplicaciones en las que hemos trabajado",
  },
  en: {
    lines: ["Brands and apps", "*we've worked on.*"],
    aria: "Brands and apps we've worked on",
  },
};

/** The projects we have worked on. Add one here and it joins the strip. */
const projects: Tool[] = [
  { name: "MMR", logo: "/logos/mmr-icon.webp" },
  { name: "Roady", logo: "/logos/roady.webp" },
  { name: "Gym Tracker", logo: "/logos/gym-tracker-icon.webp" },
  { name: "Zhestar", logo: "/logos/zhestar.webp" },
  { name: "Simon Design", logo: "/brands/simon-electric.png" },
];

/**
 * A strip of the brands and apps we have worked on, in the same style as the
 * tools strip. With only a few projects the list is repeated so the strip
 * always fills the window and the loop has no gap.
 */
export function LogosSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const repeated = Array.from({ length: 6 }, () => projects).flat();

  return (
    <section className="band-tight">
      <div className="shell">
        <SectionHeading
          align="center"
          tone="violet"
          lines={t.lines}
          titleClassName="!text-[clamp(1.75rem,3.6vw,2.75rem)]"
        />
      </div>

      <Reveal delay={150} className="mt-8 md:mt-10">
        <div role="region" aria-label={t.aria}>
          <Strip tools={repeated} />
        </div>
      </Reveal>
    </section>
  );
}
