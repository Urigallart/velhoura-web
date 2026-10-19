"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  IMG_H,
  IMG_W,
  measure,
  writeIntroVars,
  type Geometry,
} from "./geometry";
import { IntroCards } from "./IntroCards";
import { ScreenPreviews, type PreviewId } from "./ScreenPreviews";

/**
 * Scroll-driven entrance: an office, a MacBook, and a camera that walks into
 * the screen until the screen *is* the page.
 *
 * How the illusion holds together
 * ───────────────────────────────
 * The photo is a flat plate. Its display area is covered by a live copy of the
 * real hero, laid out at the viewport's own size and shrunk by `k` so it fits
 * the glass. One transform on a single wrapper — plate and glass together —
 * scales everything up until `s * k = 1`: at that moment the copy is rendered
 * 1:1 across the whole window. The real hero sits directly underneath at that
 * exact position, so the swap is invisible and the page carries on as a normal
 * document.
 *
 * Only `transform`, `opacity` and `clip-path` change per frame; nothing
 * triggers layout. The runway is `z` of scroll: the sticky stage holds the
 * viewport while progress runs 0 → 1, then releases it.
 *
 * Whether it plays at all is decided before first paint by the gate script
 * in `geometry.ts` (reduced motion or no JS → straight to the page).
 */

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** Slow start, slow landing — the camera never lurches. */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Only the gate (first load of `/`) arms the intro; client navigations skip it. */
const isPlaying = () => {
  const s = document.documentElement.dataset.intro;
  return s === "play" || s === "done";
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** How many IntroZoom instances are mounted (two only for an instant in dev). */
let mounted = 0;

export function IntroZoom({
  hero,
  screen,
}: {
  /** The real hero — always in the document, revealed when the zoom lands. */
  hero: ReactNode;
  /** A copy of the hero without the globe, shown on the laptop glass. */
  screen: ReactNode;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const geo = useRef<Geometry | null>(null);
  // The cards are interactive only while the camera is still in the room.
  const [inRoom, setInRoom] = useState(true);
  // What the laptop shows: the real hero — null — by default and whenever the
  // camera moves, or a plan demo while the visitor points at one in the cards.
  const [preview, setPreview] = useState<PreviewId | null>(null);

  const setPhase = useCallback((next: "play" | "done") => {
    const root = document.documentElement;
    if (root.dataset.intro !== next) root.dataset.intro = next;
  }, []);

  const apply = useCallback((p: number) => {
    const g = geo.current;
    if (!g || !scene.current) return;

    // Scale grows exponentially so every stretch of scroll reads as the same
    // amount of forward motion; the easing shapes the progress itself.
    const e = easeInOut(p);
    const s = g.s0 * Math.pow(1 / g.k / g.s0, e);

    // Focus drifts from the opening shot to the centre of the glass, so the
    // framing settles on the screen rather than on the desk.
    const f = easeInOut(clamp01(p * 1.25));
    const fx = g.fx0 * (1 - f) + g.ax * f;
    const fy = g.fy0 * (1 - f) + g.ay * f;
    const tx = g.cx0 * (1 - f) + (g.vw / 2) * f - s * fx;
    const ty = g.cy0 * (1 - f) + (g.vh / 2) * f - s * fy;
    scene.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;

    if (shade.current) shade.current.style.opacity = String(1 - e);

    // The cards and the cue belong to the room: they step aside and fade in
    // the first stretch, before the camera is anywhere near the glass.
    if (overlay.current) {
      const o = clamp01(p / 0.2);
      overlay.current.style.opacity = String(1 - o);
      overlay.current.style.setProperty("--intro-out", String(o));
    }

    // The header stays with the page for most of the way back out: it only
    // fades once the camera has pulled well back towards the room, so a
    // small scroll up from the top of the page never takes it away.
    const root = document.documentElement;
    const nav = clamp01((p - 0.35) / 0.3);
    root.style.setProperty("--intro-nav", String(nav));
    const navOn = nav > 0.5 ? "on" : "off";
    if (root.dataset.introNav !== navOn) root.dataset.introNav = navOn;
  }, []);

  useLayoutEffect(() => {
    // Skipped: the CSS already hides the runway; there is nothing to drive.
    if (!isPlaying()) return;
    geo.current = measure();
    writeIntroVars(geo.current);
    apply(clamp01(window.scrollY / geo.current.z));
  }, [apply]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const g = geo.current;
      if (!g || !isPlaying()) return;
      const p = clamp01(window.scrollY / g.z);
      apply(p);
      setInRoom(p < 0.12);
      // Any scroll hands the screen back to the hero before the camera moves
      // in, so the landing is always on the real page.
      if (p > 0.02) setPreview(null);

      if (p >= 0.999) {
        setPhase("done");
      } else {
        setPhase("play");
      }
    };

    /**
     * Pulling back out of the screen.
     *
     * While the intro is mounted, scrolling up past the hero simply runs the
     * zoom in reverse. When it is not mounted (the page was reached by a
     * client-side link) the runway is hidden and the page starts at 0, so
     * there is nothing above to scroll into: a scroll-up at the very top re-inserts the runway and jumps
     * to its end in the same frame — the page does not move — and the rest of
     * that gesture carries the camera back out into the office.
     */
    const arm = () => {
      const root = document.documentElement;
      if (isPlaying() || window.scrollY > 0) return;
      const lp = location.pathname;
      if ((lp !== "/" && lp !== "/en") || prefersReducedMotion()) return;
      const g = measure();
      geo.current = g;
      writeIntroVars(g);
      root.dataset.intro = "done";
      window.scrollTo({ top: g.z, behavior: "instant" });
      apply(1);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) arm();
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      // Finger dragging down at the top = asking for what is above.
      if (y - touchY > 24) arm();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Home") arm();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      // A phone's URL bar sliding away is a resize too; re-framing for that
      // would change the runway length mid-scroll, so only real changes count.
      const prev = geo.current;
      const next = measure();
      if (prev && prev.vw === next.vw && Math.abs(prev.vh - next.vh) < 120) return;
      geo.current = next;
      writeIntroVars(geo.current);
      schedule();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [apply, setPhase]);

  /**
   * The office belongs to the first visit to a home page. The gate script
   * arms it on a full page load; once the page is left, the markers go with
   * it, so arriving back at the home by any link inside the site — the logo,
   * a nav item, the language switch — lands on the page itself, hero first,
   * instead of replaying the office. (Pulling back from the top still brings
   * the office in, see `arm` above.) The removal waits a tick so a remount in
   * development's strict mode does not take the markers away from itself.
   */
  useEffect(() => {
    mounted += 1;
    return () => {
      mounted -= 1;
      window.setTimeout(() => {
        if (mounted > 0) return;
        const root = document.documentElement;
        delete root.dataset.intro;
        delete root.dataset.introNav;
        root.style.removeProperty("--intro-nav");
      }, 0);
    };
  }, []);

  return (
    <>
      <div
        className="intro-runway relative"
        style={{ height: "calc(var(--intro-z, 240svh) + var(--intro-vh, 100svh))" }}
      >
        <div
          className="sticky top-0 w-full overflow-hidden bg-paper-sunk"
          style={{ height: "var(--intro-vh, 100svh)" }}
        >
          {/* On narrow screens the opening shot is pulled back and the plate
              no longer fills the window; a blurred copy of it does. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/intro/office.webp"
            alt=""
            decoding="async"
            draggable={false}
            className="absolute inset-0 size-full scale-110 object-cover blur-2xl brightness-[0.9]"
          />
          <div
            ref={scene}
            aria-hidden="true"
            className="absolute left-0 top-0 origin-top-left will-change-transform"
            style={{
              width: "var(--intro-sw)",
              height: "var(--intro-sh)",
              // First frame, before hydration — the gate already computed it.
              transform: "var(--intro-t0)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/intro/office.webp"
              alt=""
              width={IMG_W}
              height={IMG_H}
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="block size-full select-none"
              style={{
                maskImage: "var(--intro-mask)",
                WebkitMaskImage: "var(--intro-mask)",
                // Both feathers apply: the plate fades on whichever edges show.
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />

            {/* The glass, painted paper: the page's own ground, so whatever
                the window's proportions the screen reads as one lit page. */}
            <div
              className="absolute bg-paper"
              style={{
                left: "var(--intro-gx)",
                top: "var(--intro-gy)",
                width: "var(--intro-gw)",
                height: "var(--intro-gh)",
              }}
            />

            {/* The live hero, laid out at window size, contained in the glass. */}
            <div
              inert
              className="absolute origin-top-left overflow-hidden bg-paper"
              style={{
                left: "var(--intro-left)",
                top: "var(--intro-top)",
                width: "var(--intro-vw)",
                height: "var(--intro-vh)",
                transform: "scale(var(--intro-k))",
              }}
            >
              {screen}
            </div>

            {/* Plan demos, cross-faded over the hero copy on demand. */}
            <ScreenPreviews active={preview} />

            {/* A faint sheen and edge falloff, on the glass only; gone by the
                time the page owns the whole window. */}
            <div
              ref={shade}
              className="pointer-events-none absolute"
              style={{
                left: "var(--intro-gx)",
                top: "var(--intro-gy)",
                width: "var(--intro-gw)",
                height: "var(--intro-gh)",
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 62%), radial-gradient(130% 100% at 50% 45%, rgba(8,12,24,0) 60%, rgba(8,12,24,0.08) 100%)",
              }}
            />
          </div>

          {/* Things to do while still in the room. */}
          <div
            ref={overlay}
            className="absolute inset-0 will-change-transform"
            style={{ pointerEvents: inRoom ? undefined : "none" }}
          >
            <IntroCards onPreview={setPreview} preview={preview} />
          </div>
        </div>
      </div>

      {/* Overlaps the last viewport of the runway, so when the zoom lands the
          real hero is already exactly where its copy was. */}
      <div className="intro-hero relative">{hero}</div>
    </>
  );
}
