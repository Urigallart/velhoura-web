"use client";

import { useEffect, useState } from "react";
import { ui } from "@/data/assistant";
import type { Locale } from "@/i18n/locale";

/**
 * The line in the chat bubbles, changing every few seconds so the invitation
 * is a different question each time. The server and the first paint always
 * show the first line, so nothing shifts on hydration; with reduced motion it
 * simply stays on it.
 */
export function RotatingHint({
  locale,
  every = 4500,
}: {
  locale: Locale;
  every?: number;
}) {
  const hints = ui[locale].hints;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % hints.length), every);
    return () => window.clearInterval(id);
  }, [hints.length, every]);

  return (
    <span key={i} className="nudge-in inline-block">
      {hints[i]}
    </span>
  );
}
