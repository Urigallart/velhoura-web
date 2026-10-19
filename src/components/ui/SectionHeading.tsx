import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { MaskedTitle } from "./MaskedTitle";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Two-digit section index, set in the signal — the page's running order. */
  index?: string;
  /** Short name of the section, e.g. "Products". */
  label?: string;
  /** Headline, split into masked lines. Wrap a word in `*` to mark emphasis. */
  lines: string[];
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
  /** Mask whole lines (default) or individual words. */
  split?: "line" | "word";
};

/**
 * A section's headline. `index` and `label` are still accepted so every
 * caller keeps compiling, but no eyebrow is drawn: the headline stands alone.
 */
export function SectionHeading({
  lines,
  subtitle,
  className,
  titleClassName,
  align = "left",
  split = "line",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}
    >
      <MaskedTitle
        lines={lines}
        split={split}
        className={cn("t-h1 text-balance", titleClassName)}
      />

      {subtitle && (
        <Reveal delay={200} y={16}>
          <p
            className={cn(
              "t-lead mt-7 max-w-xl text-pretty",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
