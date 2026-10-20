"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { nav as navEs } from "@/data/site";
import {
  alternatePath,
  areaNames,
  getNav,
  getPlans,
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
    blurb: "Marca, web y captación para negocios de toda España.",
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
    blurb: "Brand, web and growth for businesses anywhere.",
    language: "Language",
  },
};
import { openContactModal } from "@/lib/contactModal";
import { nfcCopy, nfcPath } from "@/data/nfc";
import { planColour, planPath, planUi, type PlanId } from "@/data/planPages";
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
  const plans = getPlans(locale);
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
  // The dropdown is drawn straight into <body>, outside the header: a glass
  // panel can only blur the page behind it when none of its ancestors is
  // itself fading, clipped or filtered, and the header is all three at times.
  const menuRef = useRef<HTMLDivElement>(null);
  // False on the server and during hydration, true afterwards: <body> exists only then.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [menuTop, setMenuTop] = useState(76);

  // The prices dropdown works the same way, and only one of the two is open.
  const [pricesOpen, setPricesOpen] = useState(false);
  const [mobilePrices, setMobilePrices] = useState(false);
  const pricesMenuRef = useRef<HTMLDivElement>(null);
  const pricesTimer = useRef<number | undefined>(undefined);

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(pricesTimer.current);
    const r = servicesRef.current?.getBoundingClientRect();
    if (r) setMenuTop(Math.round(r.bottom + 8));
    setPricesOpen(false);
    setServicesOpen(true);
  };
  const openPrices = () => {
    window.clearTimeout(pricesTimer.current);
    window.clearTimeout(closeTimer.current);
    const r = servicesRef.current?.getBoundingClientRect();
    if (r) setMenuTop(Math.round(r.bottom + 8));
    setServicesOpen(false);
    setPricesOpen(true);
  };
  const closePricesSoon = () => {
    window.clearTimeout(pricesTimer.current);
    pricesTimer.current = window.setTimeout(() => setPricesOpen(false), 160);
  };
  const closeServicesSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  useEffect(() => {
    if (!servicesOpen && !pricesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setPricesOpen(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !servicesRef.current?.contains(target) &&
        !menuRef.current?.contains(target) &&
        !pricesMenuRef.current?.contains(target)
      ) {
        setServicesOpen(false);
        setPricesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [servicesOpen, pricesOpen]);

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
    // Lets the chat launcher step aside while the full-screen menu is open.
    if (menuOpen) document.documentElement.setAttribute("data-menu", "open");
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-menu");
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
              ? "glass-bar-strong"
              : "glass-bar",
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
            className="flex shrink-0 items-center px-4 max-md:pl-5"
          >
            <Image
              src="/brand/logo-mark.png"
              alt="Velhoura"
              width={305}
              height={256}
              priority
              className="h-7 w-auto"
            />
            {/* On phones the mark is the "V" of the name: "elhoura" continues it. */}
            <span
              aria-hidden="true"
              className="-ml-0.5 text-[1.3125rem] font-semibold leading-none tracking-[-0.045em] text-ink md:hidden"
            >
              elhoura
            </span>
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
              if (id === "pricing") {
                return (
                  <button
                    key={item.href}
                    type="button"
                    aria-expanded={pricesOpen}
                    aria-controls="prices-menu"
                    onClick={() => (pricesOpen ? setPricesOpen(false) : openPrices())}
                    onPointerEnter={(e) => e.pointerType === "mouse" && openPrices()}
                    onPointerLeave={(e) => e.pointerType === "mouse" && closePricesSoon()}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.875rem] transition-colors duration-300",
                      isActive || pricesOpen ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {(isActive || pricesOpen) && (
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
                        pricesOpen && "rotate-180",
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

        {/* Services dropdown: its own glass card under the pill, in <body>. */}
        {mounted &&
          createPortal(
        <AnimatePresence>
            {servicesOpen && (
              <motion.div
                id="services-menu"
                ref={menuRef}
                style={{ top: menuTop }}
                key="services"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onPointerEnter={(e) => e.pointerType === "mouse" && openServices()}
                onPointerLeave={(e) => e.pointerType === "mouse" && closeServicesSoon()}
                className="fixed left-1/2 z-[60] hidden w-[min(640px,calc(100vw-24px))] -translate-x-1/2 origin-top overflow-hidden rounded-3xl glass-panel p-3 md:block"
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
                                <span className="mt-0.5 block font-sans text-[0.8125rem] text-ink-mute">
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
                  className="group mt-2 flex items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/45 px-5 py-3 transition-colors duration-200 hover:border-ember"
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
                <div className="mt-2 flex items-center justify-between rounded-2xl bg-ink/[0.05] px-5 py-3">
                  <span className="text-sm text-ink-soft">
                    {t.blurb}
                  </span>
                  <Link
                    href={servicesIndexPath(locale)}
                    onClick={() => setServicesOpen(false)}
                    className="font-sans text-[0.8125rem] font-semibold text-ember"
                  >
                    {t.all}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
            ,
            document.body,
          )}

        {/* Prices dropdown: one tile per plan, in the plan's own colour. */}
        {mounted &&
          createPortal(
            <AnimatePresence>
              {pricesOpen && (
                <motion.div
                  id="prices-menu"
                  ref={pricesMenuRef}
                  style={{ top: menuTop }}
                  key="prices"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onPointerEnter={(e) => e.pointerType === "mouse" && openPrices()}
                  onPointerLeave={(e) => e.pointerType === "mouse" && closePricesSoon()}
                  className="fixed left-1/2 z-[60] hidden w-[min(560px,calc(100vw-24px))] -translate-x-1/2 origin-top overflow-hidden rounded-3xl glass-panel p-3 md:block"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {plans.map((pl) => (
                      <Link
                        key={pl.id}
                        href={planPath(locale, pl.id)}
                        onClick={() => setPricesOpen(false)}
                        style={{ background: planColour[pl.id as PlanId] }}
                        className="group flex min-h-[6.5rem] flex-col justify-between rounded-2xl p-4 text-ink transition-transform duration-300 ease-[var(--e-out)] hover:-translate-y-0.5"
                      >
                        <span className="flex items-center justify-between">
                          <span className="text-[1.125rem] font-semibold tracking-[-0.02em]">{pl.name}</span>
                          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                        <span className="text-[0.9375rem] font-semibold">
                          {pl.pricePrefix ? `${pl.pricePrefix} ${pl.price}` : pl.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-2xl bg-ink/[0.05] px-5 py-3">
                    <span className="text-sm text-ink-soft">{planUi.menuBlurb[locale]}</span>
                    <Link
                      href={localePath(locale, "/#pricing")}
                      onClick={() => setPricesOpen(false)}
                      className="font-sans text-[0.8125rem] font-semibold text-ember"
                    >
                      {planUi.mainPrices[locale]} →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}

        {/* Mobile menu: a full-screen sheet in <body>, Apple style. Big type,
            one line per section, sub-lists that open in place, the language
            switch and the call to action at the foot. The pill stays on top
            of it as the way out. */}
        {mounted &&
          createPortal(
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  id="mobile-menu"
                  key="sheet"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-0 z-[49] overflow-y-auto bg-white/55 md:hidden"
                  style={{ WebkitBackdropFilter: "blur(40px) saturate(1.8)", backdropFilter: "blur(40px) saturate(1.8)" }}
                >
                  <nav className="mx-auto flex min-h-full max-w-[30rem] flex-col px-7 pb-10 pt-[6.5rem]" aria-label={t.mainMobile}>
                    <ul className="flex flex-col">
                      {nav.map((item, i) => {
                        const isServices = item.href.endsWith("#services");
                        const isPrices = item.href.endsWith("#pricing");
                        const big =
                          "flex w-full items-center justify-between py-[0.4rem] text-left text-[clamp(1.875rem,9.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink";
                        const open = isServices ? mobileServices : isPrices ? mobilePrices : false;
                        return (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {isServices || isPrices ? (
                              <>
                                <button
                                  type="button"
                                  aria-expanded={open}
                                  onClick={() => (isServices ? setMobileServices((v) => !v) : setMobilePrices((v) => !v))}
                                  className={big}
                                >
                                  {item.label}
                                  <svg
                                    viewBox="0 0 16 16"
                                    aria-hidden="true"
                                    className={cn("size-5 text-ink-mute transition-transform duration-300 ease-[var(--e-out)]", open && "rotate-180")}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M4 6l4 4 4-4" />
                                  </svg>
                                </button>
                                <AnimatePresence initial={false}>
                                  {open && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                      className="overflow-hidden"
                                    >
                                      {isServices ? (
                                        <ul className="pb-3 pt-1">
                                          {servicePages.map((p) => (
                                            <li key={p.slug}>
                                              <Link
                                                href={servicePath(locale, p.esSlug)}
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-baseline justify-between gap-4 py-2 text-[1.25rem] font-medium tracking-[-0.02em] text-ink"
                                              >
                                                {p.name}
                                                <span className="text-[0.8125rem] font-normal tracking-normal text-ink-mute">{p.tag}</span>
                                              </Link>
                                            </li>
                                          ))}
                                          <li>
                                            <Link
                                              href={nfcPath(locale)}
                                              onClick={() => setMenuOpen(false)}
                                              className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-ember-wash px-4 py-3 text-[1.0625rem] font-medium text-ink"
                                            >
                                              {nfcCopy.bannerTitle[locale].replace(/^[^:]+:\s*/, "")}
                                              <span className="rounded-full bg-ember px-2.5 py-0.5 text-[0.6875rem] font-semibold text-paper-raise">
                                                {nfcCopy.badge[locale]}
                                              </span>
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              href={servicesIndexPath(locale)}
                                              onClick={() => setMenuOpen(false)}
                                              className="block py-3 text-[1rem] font-semibold text-ember"
                                            >
                                              {t.all}
                                            </Link>
                                          </li>
                                        </ul>
                                      ) : (
                                        <div className="pb-3 pt-1">
                                          <div className="grid grid-cols-2 gap-2">
                                            {plans.map((pl) => (
                                              <Link
                                                key={pl.id}
                                                href={planPath(locale, pl.id)}
                                                onClick={() => setMenuOpen(false)}
                                                style={{ background: planColour[pl.id as PlanId] }}
                                                className="flex min-h-[5.5rem] flex-col justify-between rounded-2xl p-3.5 text-ink"
                                              >
                                                <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">{pl.name}</span>
                                                <span className="text-[0.875rem] font-semibold">
                                                  {pl.pricePrefix ? `${pl.pricePrefix} ${pl.price}` : pl.price}
                                                </span>
                                              </Link>
                                            ))}
                                          </div>
                                          <Link
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="block py-3 text-[1rem] font-semibold text-ember"
                                          >
                                            {planUi.mainPrices[locale]} →
                                          </Link>
                                        </div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </>
                            ) : (
                              <Link href={item.href} onClick={() => setMenuOpen(false)} className={big}>
                                {item.label}
                              </Link>
                            )}
                          </motion.li>
                        );
                      })}
                    </ul>

                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + nav.length * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-auto flex flex-col gap-5 pt-10"
                    >
                      <LanguageSwitch
                        locale={locale}
                        pathname={pathname}
                        label={t.language}
                        className="self-start"
                        onNavigate={() => setMenuOpen(false)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          openContactModal();
                        }}
                        className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-ink py-1 pl-7 pr-1.5 text-[1rem] font-medium text-paper"
                      >
                        {t.start}
                        <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-paper/15">
                          <DiagonalArrow />
                        </span>
                      </button>
                    </motion.div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
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
