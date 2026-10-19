"use client";

import { useEffect, useRef } from "react";
import { observe } from "@/lib/observe";
import { cn } from "@/lib/utils";

/**
 * Counts up to `value` the first time it is scrolled into view.
 *
 * Three details separate this from the usual version.
 *
 * It renders the *final* value in the server HTML and only rewinds once it
 * knows it will animate — so the figure is correct without JavaScript, correct
 * for a screen reader, and never flashes a zero.
 *
 * It writes to `textContent` rather than through state. A state-driven counter
 * re-renders React roughly sixty times a second for the length of the
 * animation, to change four characters; this component renders once and never
 * again, which is why the ref-mutation is the simple option here rather than
 * the clever one.
 *
 * And it eases out instead of ticking linearly, because a number that
 * decelerates into place reads as *arriving* at a value rather than merely
 * spinning to one.
 */
export function Counter({
  value,
  duration = 1400,
  className,
  suffix,
  pad = 0,
}: {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  /** Zero-pad to this many digits, e.g. `2` renders 4 as "04". */
  pad?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) =>
      (pad > 0 ? String(n).padStart(pad, "0") : String(n)) + (suffix ?? "");

    el.textContent = format(0);

    let raf = 0;
    let start: number | null = null;

    const step = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — close enough to the page's --e-out that the number and
      // the motion around it read as one gesture.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = format(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    const stop = observe(el, {
      onShow: () => {
        raf = requestAnimationFrame(step);
      },
    });

    return () => {
      stop();
      if (raf) cancelAnimationFrame(raf);
      // React still believes it rendered the final value; leave the DOM
      // agreeing with it.
      el.textContent = format(value);
    };
  }, [value, duration, pad, suffix]);

  return (
    <span ref={ref} className={cn("t-num", className)}>
      {pad > 0 ? String(value).padStart(pad, "0") : value}
      {suffix}
    </span>
  );
}
