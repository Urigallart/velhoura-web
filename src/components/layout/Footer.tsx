"use client";

import Link from "next/link";
import { activeSocials, contact, legalLinks, site } from "@/data/site";
import { getNav } from "@/data/localized";
import { localePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/useLocale";

const copy = {
  es: {
    blurb: "Agencia digital con base en Barcelona. Marca, web y captación de clientes para negocios de toda España y de fuera, hechas por un mismo equipo.",
    sections: "Secciones",
    navigation: "Navegación",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
  },
  en: {
    blurb: "Barcelona-based digital agency. Brand, web and customer growth for businesses in Spain and worldwide, made by one team.",
    sections: "Sections",
    navigation: "Navigation",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

/**
 * The footer closes the page with the studio's name at poster scale.
 *
 * A wordmark set this large is not decoration: it is the last thing on the
 * page and the only thing a visitor will remember from it, so it gets the
 * display scale and the full width, clipped by the bottom edge the way a
 * printed cover is clipped by the trim.
 */
export function Footer() {
  const locale = useLocale();
  const t = copy[locale];
  const nav = getNav(locale).map((item) => ({
    ...item,
    href: localePath(locale, item.href),
  }));
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-off">
      <div className="shell pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ember" />
              Velhoura
            </p>
            <p className="t-body mt-5 max-w-[36ch] text-sm">
              {t.blurb}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label={t.sections}>
            <p className="t-label">{t.navigation}</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    <span className="u-draw">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {activeSocials.length > 0 && (
            <div className="md:col-span-2">
              <p className="t-label">Social</p>
              <ul className="mt-5 space-y-3">
                {activeSocials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      <span className="u-draw">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Takes the width the socials column would have used when there
              are none, so a long address never breaks mid-word. */}
          <div className={activeSocials.length > 0 ? "md:col-span-2" : "md:col-span-4"}>
            <p className="t-label">{t.contact}</p>
            <a
              href={`mailto:${contact.email}`}
              className="group mt-5 inline-flex text-sm break-words text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              <span className="u-draw">{contact.email}</span>
            </a>
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="t-num text-xs text-ink-mute">
            © {year} {site.name}. {t.rights}
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex text-xs text-ink-mute transition-colors duration-300 hover:text-ink"
                >
                  <span className="u-draw">{l.label[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The mark. `aria-hidden` because the name is already in the text above
          — a screen reader does not need it shouted a second time. */}
      <p
        aria-hidden="true"
        className="t-display mt-12 w-full px-[var(--gutter)] text-center leading-[0.72] text-ink/[0.055] select-none md:mt-16 md:px-11"
        style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}
      >
        Velhoura
      </p>
    </footer>
  );
}
