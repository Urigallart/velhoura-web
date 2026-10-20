import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localePath, type Locale } from "@/i18n/locale";
import { cn } from "@/lib/utils";

const copy = {
  es: {
    lines: ["Marcas y apps", "*que ya hemos trabajado.*"],
    subtitle: "Algunos de los proyectos que hemos diseñado, construido o lanzado.",
  },
  en: {
    lines: ["Brands and apps", "*we've worked on.*"],
    subtitle: "A few of the projects we've designed, built or launched.",
  },
};

type Logo = {
  name: string;
  kind: { es: string; en: string };
  src: string;
  /** Full-bleed picture (it carries its own background) or a logo on white. */
  bleed?: boolean;
  slug?: string;
  width: number;
  height: number;
};

const logos: Logo[] = [
  {
    name: "MMR",
    kind: { es: "Psicopedagoga y coach", en: "Educational psychologist and coach" },
    src: "/logos/mmr.webp",
    bleed: true,
    width: 800,
    height: 520,
  },
  {
    name: "Roady",
    kind: { es: "Aplicación", en: "App" },
    src: "/logos/roady.webp",
    slug: "roady",
    width: 264,
    height: 278,
  },
  {
    name: "Gym Tracker",
    kind: { es: "Aplicación", en: "App" },
    src: "/logos/gym-tracker.webp",
    slug: "gym-tracker",
    width: 900,
    height: 546,
  },
];

/**
 * The logos of the brands and apps the studio has worked on, as three large
 * tiles: the client's own colour where its logo carries one (MMR), white
 * everywhere else. Add a logo to `logos` and its tile appears.
 */
export function LogosSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <section className="band-tight">
      <div className="shell">
        <SectionHeading align="center" tone="violet" lines={t.lines} subtitle={t.subtitle} />

        <div className="mt-12 grid gap-4 rounded-[2rem] bg-paper-sunk p-4 sm:p-5 md:mt-16 md:grid-cols-3">
          {logos.map((logo, i) => {
            const body = (
              <>
                {logo.bleed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <span className="absolute inset-x-[16%] bottom-[22%] top-[10%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      loading="lazy"
                      className="size-full object-contain transition-transform duration-500 ease-[var(--e-out)] group-hover:scale-105"
                    />
                  </span>
                )}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 px-6 pb-5 text-[0.9375rem]",
                    logo.bleed ? "text-white" : "text-ink",
                  )}
                >
                  <span className="font-semibold tracking-[-0.01em]">{logo.name}</span>
                  <span className={logo.bleed ? "text-white/75" : "text-ink-mute"}>{logo.kind[locale]}</span>
                </span>
              </>
            );

            const cls = cn(
              "group relative block aspect-[4/3] overflow-hidden rounded-3xl",
              logo.bleed ? "bg-[#4e8276]" : "bg-paper-raise",
              "transition-transform duration-500 ease-[var(--e-out)] hover:-translate-y-1",
            );

            return (
              <Reveal key={logo.name} delay={i * 90} className="h-full">
                {logo.slug ? (
                  <Link href={localePath(locale, `/products/${logo.slug}`)} className={cls}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
