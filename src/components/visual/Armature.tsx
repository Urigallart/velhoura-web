"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * THE ARMATURE — the instrument the hero's globe is mounted inside.
 *
 * The 3D Earth used to float on its own, off to the right, meaning nothing in
 * particular and forcing a blurred scrim behind the headline to stay legible.
 * Here it becomes the centre of a measuring instrument: concentric rules, a
 * tick ring, and the studio's own five-phase loop — IDEA → DESIGN → BUILD →
 * LAUNCH → GROW — with a light travelling the ring so the process reads as
 * *running*.
 *
 * The decoration now carries the same argument the copy makes, and because
 * the globe is confined to this square stage, the headline column no longer
 * needs a scrim to survive.
 *
 * Everything here is inline SVG plus CSS keyframes: a few kilobytes,
 * resolution-independent, three rotations and one pulse, all `transform` and
 * `opacity`. Pointer parallax runs on springs and is skipped entirely on
 * coarse pointers and under `prefers-reduced-motion`.
 */

const C = 360; // centre of the 720×720 viewBox
const R_TICK = 330; // outer measuring ring
const R_LABEL = 296; // phase labels, between the tick ring and the loop
const R_NODE = 262; // the loop itself
const R_DASH = 210; // counter-rotating dashed ring
const R_INNER = 172; // inner rule — the globe sits just inside this

/** Pentagon, first vertex at twelve o'clock. */
const PHASES = ["IDEA", "DESIGN", "BUILD", "LAUNCH", "GROW"] as const;
const ANGLES = PHASES.map((_, i) => -90 + i * 72);

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Rounded: raw floats serialise differently on server and client, which
 *  trips React hydration on SVG attributes. */
const at = (deg: number, r: number) => ({
  x: Math.round((C + Math.cos(rad(deg)) * r) * 100) / 100,
  y: Math.round((C + Math.sin(rad(deg)) * r) * 100) / 100,
});

/** Labels read outward from the ring, so no label sits on the line it
 *  annotates. */
function anchorFor(deg: number): "start" | "middle" | "end" {
  const x = Math.cos(rad(deg));
  if (Math.abs(x) < 0.2) return "middle";
  return x > 0 ? "start" : "end";
}

export function Armature() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 48, damping: 20, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // One parallax depth per layer. Larger number = nearer the camera. The
  // globe itself does not move, so these stay small — the instrument breathes
  // around a fixed planet rather than sliding off it.
  const ringX = useTransform(sx, (v) => v * 9);
  const ringY = useTransform(sy, (v) => v * 7);
  const nodeX = useTransform(sx, (v) => v * 17);
  const nodeY = useTransform(sy, (v) => v * 13);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!fine || reduced) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      // Coalesce to one write per frame so fast movement can't thrash.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        px.set((e.clientX / window.innerWidth - 0.5) * 2);
        py.set((e.clientY / window.innerHeight - 0.5) * 2);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [fine, reduced, px, py]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 720"
      fill="none"
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      <defs>
        {/* The travelling light: an arc whose stroke fades out behind it. */}
        <linearGradient id="v-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* ── Rules ─────────────────────────────────────────────────────── */}
      <motion.g style={{ x: ringX, y: ringY }}>
        {/* Measuring ticks, one full turn every five minutes. */}
        <g
          style={{
            transformOrigin: `${C}px ${C}px`,
            animation: reduced ? undefined : "v-spin 300s linear infinite",
          }}
        >
          <circle cx={C} cy={C} r={R_TICK} stroke="var(--line-strong)" strokeWidth="1" />
          {Array.from({ length: 72 }, (_, i) => {
            const deg = i * 5;
            const major = i % 6 === 0;
            const a = at(deg, R_TICK);
            const b = at(deg, R_TICK - (major ? 14 : 6));
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={major ? "var(--ink-faint)" : "var(--line-strong)"}
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* The loop. */}
        <circle
          cx={C}
          cy={C}
          r={R_NODE}
          stroke="var(--line-strong)"
          strokeWidth="1"
        />

        {/* Counter-rotating dashed ring — the only thing on screen turning
            the other way, which is what makes the assembly read as a
            mechanism rather than as decoration. */}
        <circle
          cx={C}
          cy={C}
          r={R_DASH}
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeDasharray="1 9"
          style={{
            transformOrigin: `${C}px ${C}px`,
            animation: reduced ? undefined : "v-spin-back 220s linear infinite",
          }}
        />

        {/* Inner rule. The globe is framed just inside this. */}
        <circle cx={C} cy={C} r={R_INNER} stroke="var(--line-strong)" strokeWidth="1" />

        {/* Spokes, only where a phase sits, and only in the outer band so
            they never cross the planet. */}
        {ANGLES.map((deg) => {
          const a = at(deg, R_DASH);
          const b = at(deg, R_NODE);
          return (
            <line
              key={deg}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--line-strong)"
              strokeWidth="1"
            />
          );
        })}
      </motion.g>

      {/* ── The travelling light ──────────────────────────────────────── */}
      {!reduced && (
        <g
          style={{
            transformOrigin: `${C}px ${C}px`,
            animation: "v-spin 22s linear infinite",
          }}
        >
          <path
            d={arcPath(R_TICK, -90 - 46, -90)}
            stroke="url(#v-trail)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx={C} cy={C - R_TICK} r="3.5" fill="var(--ember)" />
          <circle
            cx={C}
            cy={C - R_TICK}
            r="9"
            fill="var(--ember)"
            opacity="0.16"
          />
        </g>
      )}

      {/* ── Phases ────────────────────────────────────────────────────── */}
      <motion.g style={{ x: nodeX, y: nodeY }}>
        {ANGLES.map((deg, i) => {
          const node = at(deg, R_NODE);
          const label = at(deg, R_LABEL);

          return (
            <g key={PHASES[i]}>
              {/* Halo that swells as the light reaches this phase. The five
                  delays share one 15s cycle, so the pulse walks the pentagon
                  in order — the process, running. */}
              {!reduced && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="7"
                  fill="var(--ember)"
                  style={{
                    transformOrigin: `${node.x}px ${node.y}px`,
                    animation: `v-breathe 15s ${i * 3}s ease-in-out infinite`,
                  }}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r="4.5"
                fill="var(--paper-raise)"
                stroke="var(--ink-soft)"
                strokeWidth="1.25"
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor={anchorFor(deg)}
                dominantBaseline="middle"
                className="fill-[var(--ink-mute)] font-mono text-[14px] font-medium tracking-[0.18em]"
              >
                {PHASES[i]}
              </text>
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}

/** SVG arc between two angles on a circle centred on the viewBox. */
function arcPath(r: number, fromDeg: number, toDeg: number): string {
  const a = at(fromDeg, r);
  const b = at(toDeg, r);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}
