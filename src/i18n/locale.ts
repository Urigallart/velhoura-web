/**
 * The site's two languages and how their URLs relate.
 *
 * Spanish is the default and lives at the root, so every existing URL keeps
 * working; English mirrors it under /en, with English slugs where a slug is
 * a word a visitor reads (/servicios → /en/services).
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** Prefix a root-relative path for a locale ("/#contact" → "/en#contact"). */
export function localePath(locale: Locale, path: string): string {
  if (locale === "es") return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/** Pick the string for a locale from an { es, en } pair. */
export function pick<T>(locale: Locale, both: { es: T; en: T }): T {
  return both[locale];
}
