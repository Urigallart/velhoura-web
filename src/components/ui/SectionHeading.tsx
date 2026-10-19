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
 * The eyebrow is a running order, not a decoration: a signal-coloured index,
 * a rule, and the section's name. It is the same object on every section, which is
 * what lets a reader know where they are without a progress bar.
 */
export function SectionHeading({
  index,
  label,
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
      {(index || label) && (
        <Reveal y={12}>
          <p
            className={cn(
              "t-label mb-7 flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            {index && <span className="text-ember">{index}</span>}
            <span aria-hidden="true" className="h-px w-7 bg-line-strong" />
            {label}
          </p>
        </Reveal>
      )}

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
