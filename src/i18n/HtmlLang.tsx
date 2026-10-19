"use client";

import { useEffect } from "react";
import { useLocale } from "./useLocale";

/**
 * Keeps `<html lang>` in step with the URL. The root layout is shared by both
 * languages and renders `lang="es"`; on /en pages this corrects it on load
 * and on every client-side navigation, so screen readers and translators
 * read the page in the right language.
 */
export function HtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
