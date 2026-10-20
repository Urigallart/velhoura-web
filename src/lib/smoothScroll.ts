/**
 * Slow, eased scrolling for in-page jumps.
 *
 * The browser's own `scroll-behavior: smooth` is fast and fixed; for a jump
 * across the whole page it reads as a cut. This drives the scroll by hand:
 * the longer the distance, the longer it takes (about a second and a half at
 * least and three at most), with a gentle start and a gentle landing. Any
 * touch, wheel or key press from the visitor stops it at once.
 */

let frame = 0;
let stop: (() => void) | null = null;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function smoothScrollTo(target: number, onDone?: () => void) {
  const root = document.documentElement;
  const from = window.scrollY;
  const max = root.scrollHeight - window.innerHeight;
  const to = Math.max(0, Math.min(target, max));
  const dist = Math.abs(to - from);

  stop?.();
  if (dist < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: to, behavior: "instant" });
    onDone?.();
    return;
  }

  const duration = Math.min(3200, Math.max(1200, 900 + dist * 0.55));
  const start = performance.now();
  // The page's own smooth scrolling would fight every frame of this.
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const cancel = () => {
    cancelAnimationFrame(frame);
    root.style.scrollBehavior = previous;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
    stop = null;
  };
  stop = cancel;
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: from + (to - from) * ease(t), behavior: "instant" });
    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      cancel();
      onDone?.();
    }
  };
  frame = requestAnimationFrame(step);
}

/** Scrolls to an element, leaving room for the floating header. */
export function smoothScrollToElement(el: Element) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - margin);
}
