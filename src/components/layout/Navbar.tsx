"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { nav as navEs } from "@/data/site";
import {
  alternatePath,
  areaNames,
  getNav,
  getServicePages,
  servicePath,
  servicesIndexPath,
} from "@/data/localized";
import { localePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/useLocale";
import { usePathname } from "next/navigation";

const copy = {
  es: {
    home: "Velhoura, ir al inicio",
    start: "Empezar un proyecto",
    open: "Abrir menú",
    close: "Cerrar menú",
    main: "Principal",
    mainMobile: "Principal (móvil)",
    all: "Ver todos →",
    blurb: "Marca, web y captación para pymes de Barcelona.",
    language: "Idioma",
  },
  en: {
    home: "Velhoura, go to home",
    start: "Start a project",
    open: "Open menu",
    close: "Close menu",
    main: "Main",
    mainMobile: "Main (mobile)",
    all: "See all →",
    blurb: "Brand, web and growth for Barcelona businesses.",
    language: "Language",
  },
};
import { openContactModal } from "@/lib/contactModal";
import { nfcCopy, nfcPath } from "@/data/nfc";
import { cn } from "@/lib/utils";

/** The `id`s the nav tracks, in page order. */
const SECTION_IDS = navEs.map((item) => item.href.split("#")[1]);

/**
 * A floating pill rather than a full-width bar.
 *
 * The bar is detached from the top edge and centred, so the page reads as one
 * sheet the navigation hovers over instead of two stacked slabs. Past the fold
 * it firms up — the backing goes opaque and the shadow deepens — but it never
 * changes shape, because a control that resizes while you scroll is a control
 * you have to re-find.
 *
 * Two things it answers besides "where can I go". A progress hairline along
 * the pill's bottom edge (clipped by the radius, so it reads as the pill
 * filling) says how much page is left. And the item for whatever section is on
 * screen carries a soft pill of its own, which slides between items on a
 * spring — one shared `layoutId`, so the marker travels rather than blinking.
 */
export function Navbar() {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
  const t = copy[locale];
  const nav = getNav(locale).map((item) => ({
    ...item,
    href: localePath(locale, item.href),
  }));
  const servicePages = getServicePages(locale);
  const areaName = areaNames[locale];
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // The services dropdown: opens on hover or click, closes on leave (after a
  // short grace period, so a diagonal move to the panel does not drop it),
  // on Escape, and on any click outside.
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const servicesRef = useRef<HTMLDivElement>(null);

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [servicesOpen]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setCondensed(window.scrollY > 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /**
   * One observer for the anchored sections. The band is a horizontal slice
   * across the middle of the viewport — whatever is crossing the reader's
   * eyeline is "where they are", which is a far steadier answer than
   * "whichever section is topmost".
   */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-nav fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4">
      <div ref={servicesRef} className="relative w-full max-w-[var(--shell)]">
        <div
          className={cn(
            "relative mx-auto flex w-fit max-w-full items-center gap-1 overflow-hidden rounded-full border p-1.5",
            "transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--e-out)]",
            condensed || menuOpen
              ? "border-line bg-paper/85 shadow-[0_10px_34px_-14px_rgba(8,9,10,0.22)] backdrop-blur-xl backdrop-saturate-150"
              : "border-line/70 bg-paper/60 shadow-[0_6px_22px_-16px_rgba(8,9,10,0.2)] backdrop-blur-lg",
          )}
        >
          <Link
            href={localePath(locale, "/")}
            onClick={(e) => {
              setMenuOpen(false);
              // Already on the home: go to the page itself — the hero, below
              // the office — rather than letting the link reset to the top.
              if (pathname === localePath(locale, "/")) {
                e.preventDefault();
                const root = document.documentElement;
                const intro = root.dataset.intro;
                const z =
                  intro === "play" || intro === "done"
                    ? parseFloat(getComputedStyle(root).getPropertyValue("--intro-z"))
                    : 0;
                window.scrollTo({ top: Number.isFinite(z) ? z : 0, behavior: "smooth" });
              }
            }}
            aria-label={t.home}
            className="flex shrink-0 items-center px-4"
          >
            <Image
              src="/brand/logo-mark.png"
              alt="Velhoura"
              width={305}
              height={256}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <nav
            className="hidden items-center md:flex"
            aria-label={t.main}
          >
            {nav.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = active === id;
              if (id === "services") {
                return (
                  <button
                    key={item.href}
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    onClick={() => setServicesOpen((v) => !v)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && openServices()}
                    onPointerLeave={(e) => e.pointerType === "mouse" && closeServicesSoon()}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.875rem] transition-colors duration-300",
                      isActive || servicesOpen ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {(isActive || servicesOpen) && (
                      <motion.span
                        layoutId="nav-marker"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-paper-sunk"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className={cn(
                        "relative size-3 transition-transform duration-300 ease-[var(--e-out)]",
                        servicesOpen && "rotate-180",
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.875rem] transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-marker"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-paper-sunk"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <LanguageSwitch
            locale={locale}
            pathname={pathname}
            label={t.language}
            className="ml-1 hidden md:flex"
          />

          <button
            type="button"
            onClick={openContactModal}
            className="group ml-1 hidden h-10 shrink-0 items-center gap-2.5 rounded-full bg-ink py-1 pl-5 pr-1 text-[0.875rem] font-medium text-paper transition-colors duration-400 ease-[var(--e-out)] hover:bg-ember sm:inline-flex"
          >
            {t.start}
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-full bg-paper/15 transition-transform duration-500 ease-[var(--e-spring)] group-hover:rotate-45"
            >
              <DiagonalArrow />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.close : t.open}
            className="relative ml-1 flex size-10 shrink-0 items-center justify-center rounded-full md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-5 bg-ink transition-transform duration-400 ease-[var(--e-out)]",
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-5 bg-ink transition-transform duration-400 ease-[var(--e-out)]",
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1",
              )}
            />
          </button>

          {/* Reading progress, clipped by the pill's own radius. */}
          <motion.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-ember"
          />
        </div>

        {/* Services dropdown: its own card under the pill (the pill clips). */}
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              id="services-menu"
              key="services"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onPointerEnter={(e) => e.pointerType === "mouse" && openServices()}
              onPointerLeave={(e) => e.pointerType === "mouse" && closeServicesSoon()}
              className="absolute left-1/2 top-full mt-2 hidden w-[min(640px,calc(100vw-24px))] -translate-x-1/2 origin-top overflow-hidden rounded-3xl border border-line bg-paper/95 p-3 shadow-[0_24px_60px_-24px_rgba(8,9,10,0.35)] backdrop-blur-xl md:block"
            >
              <div className="grid grid-cols-3 gap-1">
                {(["brand", "web", "growth"] as const).map((area) => (
                  <div key={area} className="rounded-2xl p-2">
                    <p className="t-label px-3 pb-2 pt-1 !text-ember">{areaName[area]}</p>
                    <ul>
                      {servicePages
                        .filter((p) => p.area === area)
                        .map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={servicePath(locale, p.esSlug)}
                              onClick={() => setServicesOpen(false)}
                              className="group block rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-paper-sunk"
                            >
                              <span className="block text-[0.875rem] font-medium tracking-[-0.01em] text-ink">
                                {p.name}
                              </span>
                              <span className="mt-0.5 block font-mono text-[10px] tracking-[0.12em] text-ink-mute uppercase">
                                {p.tag}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                href={nfcPath(locale)}
                onClick={() => setServicesOpen(false)}
                className="group mt-2 flex items-center justify-between gap-4 rounded-2xl border border-line bg-ember-wash px-5 py-3 transition-colors duration-200 hover:border-ember"
              >
                <span className="flex items-center gap-3">
                  <span className="rounded-full bg-ember px-2.5 py-0.5 text-[0.6875rem] font-semibold text-paper-raise">
                    {nfcCopy.badge[locale]}
                  </span>
                  <span className="text-[0.875rem] font-medium tracking-[-0.01em] text-ink">
                    {nfcCopy.bannerTitle[locale].replace(/^[^:]+:\s*/, "")}
                  </span>
                </span>
                <span aria-hidden="true" className="text-ink transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <div className="mt-2 flex items-center justify-between rounded-2xl bg-paper-sunk px-5 py-3">
                <span className="text-sm text-ink-soft">
                  {t.blurb}
                </span>
                <Link
                  href={servicesIndexPath(locale)}
                  onClick={() => setServicesOpen(false)}
                  className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ember uppercase"
                >
                  {t.all}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile sheet — its own card under the pill, not a squeezed nav. */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              key="sheet"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-2 w-full overflow-hidden rounded-3xl border border-line bg-paper/95 shadow-[0_18px_50px_-20px_rgba(8,9,10,0.28)] backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col px-5 py-3" aria-label={t.mainMobile}>
                <LanguageSwitch
                  locale={locale}
                  pathname={pathname}
                  label={t.language}
                  className="mb-2 self-start"
                  onNavigate={() => setMenuOpen(false)}
                />
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {item.href.endsWith("#services") ? (
                      <div className="border-b border-line">
                        <button
                          type="button"
                          aria-expanded={mobileServices}
                          onClick={() => setMobileServices((v) => !v)}
                          className="flex w-full items-center justify-between py-4 text-lg font-medium tracking-tight text-ink"
                        >
                          {item.label}
                          <span className="t-label t-num">
                            {mobileServices ? "-" : "+"}
                          </span>
                        </button>
                        {mobileServices && (
                          <ul className="pb-3">
                            {servicePages.map((p) => (
                              <li key={p.slug}>
                                <Link
                                  href={servicePath(locale, p.esSlug)}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center justify-between py-2 text-[0.9375rem] text-ink-soft"
                                >
                                  {p.name}
                                  <span className="font-mono text-[10px] tracking-[0.12em] text-ink-mute uppercase">
                                    {p.tag}
                                  </span>
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href={nfcPath(locale)}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-between py-2 text-[0.9375rem] text-ink-soft"
                              >
                                {nfcCopy.bannerTitle[locale].replace(/^[^:]+:\s*/, "")}
                                <span className="rounded-full bg-ember px-2 py-0.5 text-[0.6875rem] font-semibold text-paper-raise">
                                  {nfcCopy.badge[locale]}
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={servicesIndexPath(locale)}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-ember uppercase"
                              >
                                {t.all}
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between border-b border-line py-4 text-lg font-medium tracking-tight text-ink"
                      >
                        {item.label}
                        <span className="t-label t-num">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openContactModal();
                  }}
                  className="group my-4 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-ink py-1 pl-6 pr-1.5 text-[0.9375rem] font-medium text-paper"
                >
                  {t.start}
                  <span
                    aria-hidden="true"
                    className="flex size-9 items-center justify-center rounded-full bg-paper/15"
                  >
                    <DiagonalArrow />
                  </span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/** The outbound arrow that sits in the CTA's disc. */
function DiagonalArrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
      <path
        d="M4.5 11.5 11.5 4.5M11.5 4.5H5.5M11.5 4.5v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * ES / EN. Each option links to the same page in that language (or its
 * nearest equivalent), so switching never drops the reader back at the top
 * of a different page.
 */
function LanguageSwitch({
  locale,
  pathname,
  label,
  className,
  onNavigate,
}: {
  locale: "es" | "en";
  pathname: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "items-center rounded-full bg-paper-sunk p-0.5 font-sans text-[11px] font-semibold tracking-[0.08em]",
        className?.includes("hidden") ? "" : "flex",
        className,
      )}
    >
      {(["es", "en"] as const).map((l) => (
        <Link
          key={l}
          href={l === locale ? pathname : alternatePath(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 uppercase transition-colors duration-200",
            l === locale ? "bg-paper text-ink shadow-sm" : "text-ink-mute hover:text-ink",
          )}
        >
          <Flag locale={l} />
          {l}
        </Link>
      ))}
    </div>
  );
}

/**
 * Inline SVG rather than emoji: Windows renders regional-indicator emoji as
 * plain letters ("ES"), which would just repeat the label next to it.
 */
function Flag({ locale }: { locale: "es" | "en" }) {
  // The switch renders in both the desktop bar and the mobile sheet.
  const clipId = `uk-flag-${useId()}`;
  return (
    <svg
      viewBox={locale === "es" ? "0 0 750 500" : "0 0 60 30"}
      aria-hidden="true"
      preserveAspectRatio="none"
      className="h-[9px] w-[14px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10"
    >
      {locale === "es" ? (
        <>
          <rect width="750" height="500" fill="#c60b1e" />
          <rect width="750" height="250" y="125" fill="#ffc400" />
        </>
      ) : (
        <>
          <clipPath id={clipId}>
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clipPath={`url(#${clipId})`}
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </>
      )}
    </svg>
  );
}
