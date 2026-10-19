"use client";

/**
 * One IntersectionObserver for the entire page.
 *
 * The previous implementation created a fresh observer per revealed element.
 * On this page that is roughly seventy observers, each with its own callback
 * closure and its own entry in the browser's intersection bookkeeping, all
 * recomputed on every scroll-driven layout pass. A single observer with N
 * targets does the same work once.
 *
 * Elements flip `data-shown="true"` when they cross the threshold; the actual
 * animation is entirely CSS (see `globals.css`), so nothing here runs per
 * frame. An optional `onShow` exists for the rare element that needs to *do*
 * something on arrival rather than merely transition — a counter, say.
 */

type Options = {
  /** Reveal once and stop watching (default), or re-run on re-entry. */
  once?: boolean;
  /** Called each time the element becomes visible. */
  onShow?: () => void;
};

type Entry = Required<Pick<Options, "once">> & { onShow?: () => void };

let observer: IntersectionObserver | null = null;
const registry = new WeakMap<Element, Entry>();

/** Fires slightly before the element is fully on screen, so the motion has
 *  already begun by the time the reader's eye arrives. */
const OPTIONS: IntersectionObserverInit = {
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.01,
};

function ensureObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  observer ??= new IntersectionObserver((entries, io) => {
    for (const entry of entries) {
      const config = registry.get(entry.target);
      if (!config) continue;

      if (entry.isIntersecting) {
        entry.target.setAttribute("data-shown", "true");
        config.onShow?.();
        if (config.once) {
          io.unobserve(entry.target);
          registry.delete(entry.target);
        }
      } else if (!config.once) {
        entry.target.setAttribute("data-shown", "false");
      }
    }
  }, OPTIONS);

  return observer;
}

/**
 * Starts watching `el`. Returns the matching unwatch function.
 *
 * Without IntersectionObserver — or in any environment where it never fires —
 * the element is shown immediately rather than left invisible. A reveal
 * animation must never be the reason content is missing.
 */
export function observe(el: Element, options: Options = {}): () => void {
  const { once = true, onShow } = options;
  const io = ensureObserver();

  if (!io) {
    el.setAttribute("data-shown", "true");
    onShow?.();
    return () => {};
  }

  registry.set(el, { once, onShow });
  io.observe(el);

  return () => {
    io.unobserve(el);
    registry.delete(el);
  };
}
