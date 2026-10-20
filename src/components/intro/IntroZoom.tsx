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
  desk,
}: {
  /** The real hero — always in the document, revealed when the zoom lands. */
  hero: ReactNode;
  /** A copy of the hero without the globe, shown on the laptop glass. */
  screen: ReactNode;
  /**
   * The same copy as a desktop browser lays it out, captured as an image.
   * On a phone the live copy can only take the phone's own layout — a
   * narrow column in a landscape screen — so the laptop shows this instead
   * and it dissolves into the live copy on the way in. Regenerate it when
   * the hero changes (1440×858 at 2x, the glass's proportions).
   */
  desk?: string;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const deskImg = useRef<HTMLImageElement>(null);
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

    // The name on the glass slides off to the right as the camera goes in.
    scene.current.style.setProperty(
      "--intro-logo",
      String(Math.pow(clamp01(p / 0.4), 1.6)),
    );

    if (shade.current) shade.current.style.opacity = String(1 - e);

    // Phones: the desktop picture holds while the camera is in the room,
    // then gives way to the live phone layout well before the landing.
    if (deskImg.current) {
      deskImg.current.style.opacity = String(1 - clamp01((p - 0.3) / 0.18));
    }

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

    // Only while the room is in shot does the page ground take the scene's
    // colour (see globals.css); by the landing it is the page's own again.
    const room = p < 0.3 ? "on" : "off";
    if (root.dataset.introRoom !== room) root.dataset.introRoom = room;
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
    /**
     * Landing hands the page over for good. As soon as the camera arrives,
     * the runway is taken out of the document and the scroll position moves
     * up by the same amount in the same frame — nothing on screen moves — so
     * from then on the home is an ordinary page that starts at its top. A
     * scroll up only ever reaches the top of the page; it can no longer
     * slip back into the office and freeze the hero's buttons.
     *
     * Going back into the office takes a deliberate pull at the very top
     * (see `arm`). Right after that re-arming the landing check waits until
     * the camera has actually left, or the pull would land again at once.
     */
    let rearmed = false;

    const land = (g: Geometry) => {
      const root = document.documentElement;
      const y = Math.max(0, window.scrollY - g.z);
      root.dataset.intro = "skip";
      delete root.dataset.introNav;
      delete root.dataset.introRoom;
      root.style.removeProperty("--intro-nav");
      window.scrollTo({ top: y, behavior: "instant" });
    };

    const update = () => {
      frame = 0;
      const g = geo.current;
      if (!g || !isPlaying()) return;
      const p = clamp01(window.scrollY / g.z);
      if (rearmed && p < 0.97) rearmed = false;
      if (p >= 0.999 && !rearmed) {
        apply(1);
        land(g);
        return;
      }
      apply(p);
      setInRoom(p < 0.12);
      // Any scroll hands the screen back to the hero before the camera moves
      // in, so the landing is always on the real page.
      if (p > 0.02) setPreview(null);
      setPhase(p >= 0.999 ? "done" : "play");
    };

    /**
     * Pulling back out of the screen.
     *
     * Once landed (or when the page was reached by a link) the runway is out
     * of the document and the page starts at 0. Asking for what is above —
     * enough of it, at the very top — re-inserts the runway and jumps to its
     * end in the same frame, so the page does not move, and the rest of that
     * gesture carries the camera back out into the office. "Enough" is
     * several wheel notches or a long drag, so an ordinary scroll to the top
     * never sets it off.
     */
    const PULL = 700;
    let pull = 0;
    let pullAt = 0;
    const addPull = (amount: number) => {
      const now = Date.now();
      if (now - pullAt > 700) pull = 0;
      pullAt = now;
      pull += amount;
      if (pull >= PULL) {
        pull = 0;
        arm();
      }
    };

    const arm = () => {
      const root = document.documentElement;
      if (isPlaying() || window.scrollY > 0) return;
      const lp = location.pathname;
      if ((lp !== "/" && lp !== "/en") || prefersReducedMotion()) return;
      const g = measure();
      geo.current = g;
      writeIntroVars(g);
      root.dataset.intro = "done";
      rearmed = true;
      window.scrollTo({ top: g.z, behavior: "instant" });
      apply(1);
    };

    const atTop = () => !isPlaying() && window.scrollY <= 0;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && atTop()) addPull(-e.deltaY);
      else if (e.deltaY > 0) pull = 0;
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      pull = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      // A long drag down at the very top = asking for what is above.
      if (atTop() && y - touchY > 160) {
        touchY = y;
        arm();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (!atTop()) return;
      if (e.key === "ArrowUp") addPull(120);
      else if (e.key === "PageUp" || e.key === "Home") addPull(350);
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
        delete root.dataset.introRoom;
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
          className="intro-stage sticky top-0 w-full overflow-hidden bg-paper-sunk"
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

            {desk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={deskImg}
                src={desk}
                alt=""
                decoding="async"
                draggable={false}
                className="intro-desk absolute select-none object-cover object-top"
                style={{
                  left: "var(--intro-gx)",
                  top: "var(--intro-gy)",
                  width: "var(--intro-gw)",
                  height: "var(--intro-gh)",
                }}
              />
            )}

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
