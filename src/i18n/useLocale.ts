"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "./locale";

/**
 * The current language, read from the URL — the single source of truth, so
 * client components (nav, modal, intro cards) always agree with the page.
 */
export function useLocale(): Locale {
  return localeFromPath(usePathname() ?? "/");
}
