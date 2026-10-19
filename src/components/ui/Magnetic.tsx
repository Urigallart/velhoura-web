"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Pulls its child a little way toward the cursor while the cursor is near it,
 * and springs it back on the way out.
 *
 * The effect people remember from a studio site is rarely a big animation —
 * it is the moment a button seems to notice them. Kept deliberately small
 * (`strength` is a fraction of the distance travelled, capped by the element's
 * own size) so it reads as attention, not as a toy.
 *
 * Guarded to fine pointers: on touch there is no hover state to anticipate,
 * and a magnet with nothing to attract is just a listener burning battery.
 */
export function Magnetic({
  children,
  strength = 0.32,
  radius = 90,
  className,
}: {
  children: ReactNode;
  /** Fraction of the cursor's offset the element travels. */
  strength?: number;
  /** How far outside the element the field extends, in px. */
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 18, mass: 0.35 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;

    let frame = 0;

    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Inside the element's box plus `radius` in every direction.
        const inside =
          Math.abs(dx) < r.width / 2 + radius &&
          Math.abs(dy) < r.height / 2 + radius;

        if (inside) {
          x.set(dx * strength);
          y.set(dy * strength);
        } else {
          x.set(0);
          y.set(0);
        }
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      x.set(0);
      y.set(0);
    };
  }, [fine, reduced, radius, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      // `inline-block`: a block wrapper would stretch an inline-flex child to
      // the container width and widen the clickable area past the pill.
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
