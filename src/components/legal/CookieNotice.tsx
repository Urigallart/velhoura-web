"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/i18n/useLocale";
import { COOKIE_NOTICE_KEY } from "@/data/legal";

const copy = {
  es: {
    title: "Sin cookies de seguimiento",
    body: "Esta web no usa cookies de analítica, publicidad ni redes sociales. Solo recordamos que has cerrado este aviso.",
    more: "Política de cookies",
    ok: "Entendido",
  },
  en: {
    title: "No tracking cookies",
    body: "This site uses no analytics, advertising or social media cookies. We only remember that you closed this notice.",
    more: "Cookie policy",
    ok: "Got it",
  },
};

/**
 * An informative cookie notice — deliberately not a consent banner.
 *
 * The site sets no non-essential cookies, so there is nothing to accept or
 * reject: "Accept / Reject" buttons here would control nothing, which is
 * worse than no banner. This tells the visitor what the site does and links
 * the policy. Dismissing it stores one preference flag in localStorage,
 * which is exempt from consent as a setting the visitor asked for.
 *
 * If the site ever adds analytics or ads, this has to become a real consent
 * banner: blocked by default, with "reject" as easy as "accept".
 */
export function CookieNotice() {
  const locale = useLocale();
  const t = copy[locale];
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(COOKIE_NOTICE_KEY) === "dismissed";
    } catch {
      // Storage blocked (private mode, settings): just show it this visit.
    }
    if (dismissed) return;
    // A beat after load, so it doesn't compete with the page's first frame.
    const id = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(COOKIE_NOTICE_KEY, "dismissed");
    } catch {
      // Nothing to do: it simply shows again next visit.
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label={t.title}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-[440px] rounded-2xl border border-line bg-paper-raise p-5 shadow-[0_30px_70px_-30px_rgba(8,9,10,0.35)] sm:inset-x-auto sm:left-6 sm:bottom-6"
        >
          <p className="text-[0.9375rem] font-medium text-ink">{t.title}</p>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">{t.body}</p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <Link
              href="/legal/cookies"
              className="text-[0.8125rem] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
            >
              {t.more}
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-full bg-ink px-5 py-2 text-[0.8125rem] font-medium text-paper-raise transition-colors duration-300 hover:bg-ember"
            >
              {t.ok}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
