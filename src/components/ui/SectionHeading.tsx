import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { MaskedTitle } from "./MaskedTitle";
import { cn } from "@/lib/utils";

export type Tone = "sky" | "violet" | "coral" | "green" | "teal" | "sun";

type SectionHeadingProps = {
  /** Kept so every caller compiles; no eyebrow is drawn any more. */
  index?: string;
  label?: string;
  /** Headline, split into masked lines. Wrap a word in `*` to mark emphasis. */
  lines: string[];
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
  /** The gradient the emphasised words take: see `[data-tone]` in globals.css. */
  tone?: Tone;
  /** Mask whole lines (default) or individual words. */
  split?: "line" | "word";
};

/**
 * A section's headline, set large. The words between asterisks are painted
 * with the section's tone — a gradient picked for what the section is about —
 * so each part of the page has its own colour while the type stays the same.
 */
export function SectionHeading({
  lines,
  subtitle,
  className,
  titleClassName,
  align = "left",
  tone = "sky",
  split = "line",
}: SectionHeadingProps) {
  return (
    <div
      data-tone={tone}
      className={cn(align === "center" && "mx-auto max-w-4xl text-center", className)}
    >
      <MaskedTitle
        lines={lines}
        split={split}
        className={cn(
          "text-balance text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.05em]",
          titleClassName,
        )}
      />

      {subtitle && (
        <Reveal delay={200} y={16}>
          <p
            className={cn(
              "t-lead mt-7 max-w-xl text-pretty",
              align === "center" && "mx-auto max-w-[52ch]",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
