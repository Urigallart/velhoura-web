"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { products } from "@/data/products";
import type { Plan } from "@/data/plans";
import { getPlans } from "@/data/localized";
import { useLocale } from "@/i18n/useLocale";
import { team } from "@/data/team";
import { openContactModal, openContactModalWith } from "@/lib/contactModal";
import { cn } from "@/lib/utils";
import { isPreviewId, type PreviewId } from "./ScreenPreviews";

/**
 * Four cards in the room, ordered by what a prospective client wants to know:
 * what do you make → what does it cost → can you actually do it → how do I
 * start. Styled like a storefront's "latest" row — coloured eyebrow, bold
 * name, one line of pitch — and every word comes from the site's own data.
 *
 * Two of them drive the laptop: pointing at a kind of site (or picking a
 * plan) puts a demo of it on the screen, so the room becomes a showroom.
 * The price card is a small calculator whose button opens the contact form
 * already filled in with the plan chosen.
 *
 * They hang beside the laptop when the window is wide enough to keep it
 * clear (two per side), and otherwise in a swipeable row under it —
 * `data-intro-cards` on <html>, set with the geometry, picks which.
 */

type Props = {
  preview: PreviewId | null;
  onPreview: (id: PreviewId | null) => void;
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const enter = () => {
  const z = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--intro-z"),
  );
  window.scrollTo({
    top: Number.isFinite(z) ? z : window.innerHeight * 2,
    behavior: "smooth",
  });
};

const copy = {
  es: {
    offer: {
      landing: "Landing pages",
      business: "Webs de empresa",
      ecommerce: "Tiendas online",
      custom: "Apps a medida",
    } as Record<string, string>,
    offerEyebrow: "Lo que hacemos",
    offerTitle: "Webs, tiendas y apps",
    hover: "Pasa por encima y",
    tap: "Toca y",
    onScreen: "míralo en la pantalla.",
    priceEyebrow: "Calcula tu web",
    priceTitle: "¿Qué necesitas?",
    priceGroup: "Tipo de web",
    quote: "Presupuesto",
    askQuote: "Pedir presupuesto",
    projectType: "Web o tienda online",
    message: (name: string, price: string) =>
      `Hola, me interesa el plan ${name} (${price}). `,
    proofEyebrow: (n: number) => `${n} en producción`,
    proofTitle: "Lo hacemos para nosotros",
    proofPitch: "Productos propios, de la idea al lanzamiento.",
    by: (names: string[]) => `Por ${names.join(" e ")}`,
    talkEyebrow: "Hablemos",
    talkTitle: "¿Tienes una idea?",
    talkPitch: "Cuéntanosla y te respondemos con un plan.",
    noStrings: "Sin compromiso.",
    write: "Escríbenos",
    enter: "Desliza para entrar",
  },
  en: {
    offer: {
      landing: "Landing pages",
      business: "Company websites",
      ecommerce: "Online stores",
      custom: "Custom apps",
    } as Record<string, string>,
    offerEyebrow: "What we make",
    offerTitle: "Sites, stores and apps",
    hover: "Hover and",
    tap: "Tap and",
    onScreen: "see it on the screen.",
    priceEyebrow: "Price your site",
    priceTitle: "What do you need?",
    priceGroup: "Type of website",
    quote: "Quote",
    askQuote: "Request a quote",
    projectType: "Website or online store",
    message: (name: string, price: string) =>
      `Hi, I'm interested in the ${name} plan (${price}). `,
    proofEyebrow: (n: number) => `${n} in production`,
    proofTitle: "We build for ourselves",
    proofPitch: "Our own products, from idea to launch.",
    by: (names: string[]) => `By ${names.join(" and ")}`,
    talkEyebrow: "Let's talk",
    talkTitle: "Got an idea?",
    talkPitch: "Tell us and we'll reply with a plan.",
    noStrings: "No strings attached.",
    write: "Write to us",
    enter: "Scroll to enter",
  },
};

const priceOf = (p: Plan) =>
  p.pricePrefix ? `${p.pricePrefix} ${p.price}` : p.price;

const live = products.filter((p) => p.status === "LIVE");
const withImages = products.filter((p) => p.image);

/* ── The card shell: tilt, glare, lift ───────────────────────────────── */

/**
 * Leans towards the pointer like an object held up to the light, with a soft
 * highlight that follows it. Mouse only — on touch there is no hover to
 * respond to, and a card that tilts under a scrolling thumb feels broken.
 * Everything runs through CSS variables, so no re-render per pointer move.
 */
function Shell({
  as = "div",
  dark,
  onClick,
  className,
  children,
}: {
  as?: "div" | "button";
  dark?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const s = ref.current.style;
    s.setProperty("--ry", `${(x - 0.5) * 9}deg`);
    s.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    s.setProperty("--gx", `${x * 100}%`);
    s.setProperty("--gy", `${y * 100}%`);
    s.setProperty("--lift", "1");
  };

  const onLeave = () => {
    const s = ref.current?.style;
    if (!s) return;
    s.setProperty("--ry", "0deg");
    s.setProperty("--rx", "0deg");
    s.setProperty("--lift", "0");
  };

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      {...(as === "button" ? { type: "button" as const, onClick } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group/card relative flex h-full w-full flex-col overflow-hidden rounded-[22px] p-[clamp(16px,1.5vw,24px)] text-left",
        "[transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_scale(calc(1_+_var(--lift,0)_*_0.015))]",
        "shadow-[0_2px_4px_rgba(8,9,10,0.04),0_18px_40px_-18px_rgba(8,9,10,0.35)]",
        "transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--e-out)]",
        "hover:shadow-[0_2px_4px_rgba(8,9,10,0.05),0_30px_60px_-20px_rgba(8,9,10,0.45)]",
        dark ? "bg-ink text-paper" : "bg-paper text-ink",
        className,
      )}
    >
      {children}
      {/* Glare: a soft light that tracks the pointer across the surface. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,${dark ? 0.1 : 0.55}), transparent 55%)`,
          mixBlendMode: dark ? "screen" : "soft-light",
        }}
      />
    </Tag>
  );
}

function Head({
  eyebrow,
  title,
  pitch,
  dark,
}: {
  eyebrow: string;
  title: string;
  pitch?: string;
  dark?: boolean;
}) {
  return (
    <>
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.04em]",
          dark ? "text-paper/60" : "text-ember",
        )}
      >
        {eyebrow}
      </span>
      <span className="intro-title mt-1.5 text-[clamp(19px,1.55vw,26px)] font-semibold leading-[1.1] tracking-[-0.025em]">
        {title}
      </span>
      {pitch && (
        <span className="mt-2 text-[13.5px] font-medium leading-snug">
          {pitch}
        </span>
      )}
    </>
  );
}

/* ── 1 · What we make ─────────────────────────────────────────────────── */

function OfferCard({ preview, onPreview }: Props) {
  const locale = useLocale();
  const t = copy[locale];
  const plans = getPlans(locale);
  return (
    <Shell>
      <Head eyebrow={t.offerEyebrow} title={t.offerTitle} />
      <span className="intro-hint mt-1 text-[13px] leading-snug text-ink-soft">
        <span className="pointer-coarse:hidden">{t.hover}</span>
        <span className="hidden pointer-coarse:inline">{t.tap}</span>{" "}
        {t.onScreen}
      </span>
      {/* Leaving the list gives the screen back to the hero. */}
      <ul
        onPointerLeave={(e) => e.pointerType === "mouse" && onPreview(null)}
        className="intro-list mt-3 flex min-h-0 flex-1 flex-col justify-end gap-1"
      >
        {plans.filter((p) => isPreviewId(p.id)).map((p) => {
          const id = p.id as PreviewId;
          const on = preview === id;
          return (
            <li key={p.id}>
              <button
                type="button"
                onPointerEnter={(e) => e.pointerType === "mouse" && onPreview(id)}
                onFocus={() => onPreview(id)}
                onClick={(e) =>
                  e.nativeEvent instanceof PointerEvent &&
                  e.nativeEvent.pointerType !== "mouse"
                    ? onPreview(on ? null : id)
                    : scrollToSection("pricing")
                }
                aria-pressed={on}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-[14px] font-medium tracking-[-0.01em] transition-colors",
                  on ? "bg-ink text-paper" : "bg-paper-sunk hover:bg-line",
                )}
              >
                {t.offer[p.id] ?? p.name}
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-[11px]",
                    on ? "text-paper/70" : "text-ink-mute",
                  )}
                >
                  {p.price}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}

/* ── 2 · What it costs — a small calculator ───────────────────────────── */

function PriceCard({ onPreview }: Props) {
  const locale = useLocale();
  const t = copy[locale];
  const plans = getPlans(locale);
  const [pickedId, setPickedId] = useState(
    (plans.find((p) => p.featured) ?? plans[0]).id,
  );
  const picked = plans.find((p) => p.id === pickedId) ?? plans[0];

  const pick = (p: Plan) => {
    setPickedId(p.id);
    if (isPreviewId(p.id)) onPreview(p.id);
  };

  return (
    <Shell>
      <Head eyebrow={t.priceEyebrow} title={t.priceTitle} />
      <div
        role="radiogroup"
        aria-label={t.priceGroup}
        className="intro-chips mt-3 flex flex-wrap gap-1.5"
      >
        {plans.map((p) => {
          const on = picked.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => pick(p)}
              className={cn(
                "rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors",
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink hover:border-line-strong",
              )}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <span className="intro-price mt-auto pt-3">
        <span className="block text-[11px] font-medium text-ink-mute">
          {picked.pricePrefix ?? t.quote}
        </span>
        <span
          aria-live="polite"
          className="block text-[clamp(28px,2.6vw,40px)] font-semibold leading-none tracking-[-0.035em]"
        >
          {picked.price}
        </span>
        <span className="intro-features mt-2 line-clamp-2 block text-[12.5px] leading-snug text-ink-soft">
          {picked.features.slice(0, 3).join(" · ")}
        </span>
      </span>

      <button
        type="button"
        onClick={() =>
          openContactModalWith({
            projectType: t.projectType,
            message: t.message(picked.name, priceOf(picked)),
          })
        }
        className="intro-ask mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-ember"
      >
        {t.askQuote} <span aria-hidden="true">→</span>
      </button>
    </Shell>
  );
}

/* ── 3 · Proof ─────────────────────────────────────────────────────────── */

function ProofCard() {
  const t = copy[useLocale()];
  return (
    <Shell as="button" onClick={() => scrollToSection("products")}>
      <Head
        eyebrow={t.proofEyebrow(live.length)}
        title={t.proofTitle}
        pitch={t.proofPitch}
      />
      <span className="mt-1 line-clamp-2 text-[13px] leading-snug text-ink-soft">
        {t.by(team.map((m) => m.name))}
      </span>
      <span aria-hidden="true" className="relative mt-3 min-h-0 flex-1">
        <span className="absolute inset-x-0 bottom-0 top-2 flex items-end justify-center">
          {withImages.slice(0, 3).map((p, i) => (
            <span
              key={p.slug}
              className={cn(
                "relative block aspect-[4/5] h-[88%] max-h-[200px] overflow-hidden rounded-xl shadow-[0_14px_30px_-14px_rgba(8,9,10,0.5)] ring-1 ring-black/5 transition-transform duration-500 [transition-timing-function:var(--e-out)]",
                i === 0 &&
                  "z-0 -mr-[14%] translate-y-[4%] -rotate-6 group-hover/card:-translate-x-[6%] group-hover/card:-rotate-[9deg]",
                i === 1 && "z-10 group-hover/card:-translate-y-[3%]",
                i === 2 &&
                  "z-0 -ml-[14%] translate-y-[4%] rotate-6 group-hover/card:translate-x-[6%] group-hover/card:rotate-[9deg]",
              )}
            >
              <Image
                src={p.image!}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </span>
          ))}
        </span>
      </span>
    </Shell>
  );
}

/* ── 4 · How to start ──────────────────────────────────────────────────── */

function ContactCard() {
  const t = copy[useLocale()];
  return (
    <Shell as="button" dark onClick={openContactModal}>
      <Head
        dark
        eyebrow={t.talkEyebrow}
        title={t.talkTitle}
        pitch={t.talkPitch}
      />
      <span className="mt-1 text-[13px] leading-snug text-paper/60">
        {t.noStrings}
      </span>
      <span className="mt-auto pt-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors group-hover/card:bg-ember group-hover/card:text-paper">
          {t.write} <span aria-hidden="true">→</span>
        </span>
      </span>
    </Shell>
  );
}

/* ── Layout ────────────────────────────────────────────────────────────── */

export function IntroCards(props: Props) {
  const t = copy[useLocale()];
  const cards = [
    <OfferCard key="offer" {...props} />,
    <PriceCard key="price" {...props} />,
    <ProofCard key="proof" />,
    <ContactCard key="contact" />,
  ];
  const columns = [cards.slice(0, 2), cards.slice(2)];

  return (
    <>
      {/* Wide windows: a column either side of the laptop. */}
      <div className="intro-cards-sides">
        {columns.map((column, i) => (
          <div
            key={i}
            className="absolute top-1/2 flex flex-col gap-4"
            style={{
              width: "var(--intro-card-w)",
              height: "min(calc(var(--intro-vh) - 48px), 820px)",
              [i === 0 ? "left" : "right"]: "var(--intro-side-inset)",
              transform: `translate3d(calc(var(--intro-out, 0) * ${i === 0 ? -64 : 64}px), -50%, 0)`,
            }}
          >
            {column.map((card, j) => (
              <div
                key={j}
                className="anim-rise min-h-0 flex-1"
                style={
                  { "--d": `${650 + (i * 2 + j) * 90}ms` } as React.CSSProperties
                }
              >
                {card}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Everything narrower: one swipeable row under the laptop. */}
      <div
        className="intro-cards-row absolute inset-x-0"
        style={{
          top: "var(--intro-row-top)",
          bottom: "108px",
          transform: "translate3d(0, calc(var(--intro-out, 0) * 48px), 0)",
        }}
      >
        <div className="no-scrollbar flex h-full snap-x snap-mandatory gap-3 overflow-x-auto px-4 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
          {cards.map((card, i) => (
            <div
              key={i}
              className="intro-card-slot anim-rise h-full w-[min(76vw,280px)] shrink-0 snap-center"
              style={{ "--d": `${650 + i * 90}ms` } as React.CSSProperties}
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      {/* The one instruction the room needs. Also a button, for anyone who
          would rather click than scroll. */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8">
        {/* Entrance on a wrapper, so its fill does not pin the hover scale. */}
        <div
          className="anim-rise"
          style={{ "--d": "1100ms" } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={enter}
            className="group flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/60 bg-paper/80 py-2 pl-5 pr-2 text-[14px] font-medium tracking-[-0.01em] text-ink shadow-[0_2px_4px_rgba(8,9,10,0.04),0_12px_30px_-12px_rgba(8,9,10,0.35)] backdrop-blur-xl transition-[transform,background-color] duration-300 [transition-timing-function:var(--e-out)] hover:scale-[1.03] hover:bg-paper"
          >
            {t.enter}
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-full bg-ink text-paper transition-colors group-hover:bg-ember"
            >
              <svg
                viewBox="0 0 16 16"
                className="anim-nudge size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
