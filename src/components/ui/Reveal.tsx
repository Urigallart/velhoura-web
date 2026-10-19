"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observe } from "@/lib/observe";
import { cn } from "@/lib/utils";

/**
 * Deliberately a small closed union rather than `ElementType`: every call site
 * renders a block-level container, and the union keeps the component's surface
 * honest without dragging polymorphic-ref typing into the build.
 */
type Tag = "div" | "span" | "li" | "article" | "section" | "figure";

/** Matches the `[data-reveal="…"]` variants declared in `globals.css`. */
export type RevealVariant = "rise" | "lift" | "wipe" | "blur" | "fade";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in ms. */
  delay?: number;
  /** Travel distance for `rise` / `lift`, in px. */
  y?: number;
  variant?: RevealVariant;
  className?: string;
  as?: Tag;
  /** Reveal once and stop watching (default), or re-run on re-entry. */
  once?: boolean;
};

/**
 * Scroll reveal. All motion is CSS; this component only registers the element
 * with the page's single shared IntersectionObserver (`lib/observe.ts`) and
 * lets the attribute flip do the rest. `prefers-reduced-motion` is handled in
 * `globals.css`, where the element resolves to its visible state immediately.
 */
export function Reveal({
  children,
  delay = 0,
  y,
  variant = "rise",
  className,
  as: Tag = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, { once });
  }, [once]);

  return (
    <Tag
      // A dynamic `Tag` can't be narrowed to one concrete element, so TS asks
      // for a ref assignable to every tag's ref type at once. All of them
      // accept a plain HTMLElement at runtime and only generic Element APIs
      // (IntersectionObserver, data attributes) are ever used on it.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see comment above
      ref={ref as any}
      data-reveal={variant}
      data-shown="false"
      className={cn(className)}
      style={
        {
          "--rd": `${delay}ms`,
          ...(y !== undefined ? { "--ry": `${y}px` } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
