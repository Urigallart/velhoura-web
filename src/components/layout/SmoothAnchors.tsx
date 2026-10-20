"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { smoothScrollToElement } from "@/lib/smoothScroll";

/**
 * Makes every in-page jump slow and smooth, site-wide.
 *
 * It listens once, at the document, for clicks on links that point at an
 * element of the page already open (`#contact`, `/#pricing` while on the home)
 * and scrolls there by hand (see `lib/smoothScroll`). It also finishes the job
 * after a jump that crosses pages (`/servicios` → `/#pricing`): the new page
 * opens at the top and then travels down to the section, instead of appearing
 * already there.
 */
export function SmoothAnchors() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();
      smoothScrollToElement(el);
      history.pushState(null, "", url.hash);
    };
    // Capture phase, so this runs before Next's <Link> handler and can claim the click.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // After arriving from another page with a hash: start at the top, then travel.
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const id = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash));
      if (!el) return;
      window.scrollTo({ top: 0, behavior: "instant" });
      window.setTimeout(() => smoothScrollToElement(el), 120);
    }, 350);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
