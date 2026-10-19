"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observe } from "@/lib/observe";
import { cn } from "@/lib/utils";

type Split = "line" | "word";

type MaskedTitleProps = {
  /**
   * One string per typographic line. Wrap a word in asterisks to mark it as
   * emphasised — `"Two people. *No handoffs.*"`. That is the only markup this
   * component understands, on purpose: emphasis belongs in the copy, not in a
   * nest of spans at the call site.
   *
   * How the mark *renders* is `.t-em`'s decision, and in a one-family sans
   * system that is deliberately no change at all — the markers stay in the
   * copy so the intent survives if the type stack ever gains an italic.
   */
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Delay before the first unit, in ms. */
  delay?: number;
  /** Gap between consecutive units, in ms. */
  stagger?: number;
  /** Mask whole lines (calmer) or individual words (livelier). */
  split?: Split;
};

/**
 * A headline that rises from behind its own mask.
 *
 * The mask is plain `overflow: hidden` and only `transform` animates, so the
 * whole thing composites. The real text is exposed once, flat, to assistive
 * technology; the animated copy is `aria-hidden`, so a screen reader hears one
 * continuous sentence instead of a pile of fragments.
 */
export function MaskedTitle({
  lines,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 90,
  split = "line",
}: MaskedTitleProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el);
  }, []);

  // Word delays accumulate across lines so the stagger reads as one gesture
  // travelling through the headline rather than restarting on every line.
  let unit = 0;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic tag, generic Element APIs only
      ref={ref as any}
      data-shown="false"
      className={cn(className)}
    >
      <span className="sr-only">{lines.map(strip).join(" ")}</span>

      <span aria-hidden="true">
        {lines.map((line, i) => {
          if (split === "line") {
            const at = delay + unit++ * stagger;
            return (
              <span
                key={i}
                className="lm"
                style={{ "--rd": `${at}ms` } as React.CSSProperties}
              >
                <span>{render(line)}</span>
              </span>
            );
          }

          const words = emphasisByWord(line);
          return (
            <span key={i} className="block">
              {words.map(({ text, em }, w) => {
                const at = delay + unit++ * stagger;
                return (
                  <span
                    key={w}
                    className="wm"
                    style={{ "--rd": `${at}ms` } as React.CSSProperties}
                  >
                    {/* The trailing space lives inside the mask so words keep
                        their natural spacing and can still wrap. */}
                    <span>
                      {em ? <em className="t-em">{text}</em> : text}
                      {w < words.length - 1 ? " " : null}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

/**
 * Splits a line into words for per-word masks, carrying `*emphasis*` across
 * word boundaries — "*cuando te buscan.*" spans three masks, and each of
 * them must know it is emphasised.
 */
function emphasisByWord(line: string): { text: string; em: boolean }[] {
  let open = false;
  return line.split(" ").map((word) => {
    const starts = word.startsWith("*");
    const ends = word.length > 1 && word.endsWith("*");
    const em = open || starts;
    if (starts && !ends) open = true;
    if (ends) open = false;
    return { text: word.replace(/\*/g, ""), em };
  });
}

/** `*emphasis*` → `.t-em`. Everything else is passed through. */
function render(text: string): ReactNode {
  if (!text.includes("*")) return text;

  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={i} className="t-em">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}

/** The same string with its emphasis markers removed, for screen readers. */
function strip(text: string): string {
  return text.replace(/\*/g, "");
}
