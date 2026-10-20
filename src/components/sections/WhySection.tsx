import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { nfcPath } from "@/data/nfc";
import type { Locale } from "@/i18n/locale";
import { cn } from "@/lib/utils";

/**
 * "Why us", as a grid of bright cards: one large card on the left about
 * prices, six small ones beside it, each with an icon and a few words picked
 * out in colour. Every statement comes from what the site already says —
 * the plans, the process, the team, the products, the NFC offer.
 */

type Tone = "blue" | "teal" | "green" | "purple" | "orange" | "indigo";

const tone: Record<Tone, string> = {
  blue: "text-[#0a7cff]",
  teal: "text-[#0a8a9e]",
  green: "text-[#0a9d4d]",
  purple: "text-[#b13cf5]",
  orange: "text-[#f0662d]",
  indigo: "text-[#4a63d6]",
};

/** Icons: 40px, one stroke, coloured by the card's tone. */
const icons: Record<string, ReactNode> = {
  team: (
    <>
      <circle cx="14" cy="15" r="5" />
      <circle cx="28" cy="15" r="5" />
      <path d="M5 33c0-5 4-8 9-8s9 3 9 8M19 33c0-5 4-8 9-8s9 3 9 8" />
    </>
  ),
  chat: (
    <>
      <path d="M6 8h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H18l-8 7v-7H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
      <path d="M12 16h16M12 22h10" />
    </>
  ),
  doc: (
    <>
      <path d="M10 4h14l8 8v24H10z" />
      <path d="M24 4v8h8M15 20h12M15 26h12M15 32h8" />
    </>
  ),
  star: (
    <path d="M20 5l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3L20 28.6l-9.3 4.9 1.8-10.3L5 15.9l10.4-1.5z" />
  ),
  edit: (
    <>
      <path d="M6 30l-1 6 6-1L32 14l-5-5z" />
      <path d="M25 11l5 5" />
    </>
  ),
  home: (
    <>
      <path d="M5 19L20 6l15 13" />
      <path d="M9 16v18h22V16M16 34V24h8v10" />
    </>
  ),
};

function Icon({ name, color }: { name: string; color: Tone }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-10", tone[color])}
    >
      {icons[name]}
    </svg>
  );
}

type Part = string | { t: string; c: Tone };

type Card = {
  icon: string;
  color: Tone;
  parts: Part[];
  href?: string;
};

const copy = {
  es: {
    title: "Velhoura marca la diferencia.",
    sub: "Aún más razones para trabajar con nosotros.",
    big: {
      lines: ["Tu web,", "con precio claro."],
      lead: "Publicamos el punto de partida de cada plan: Landing desde 199 €, Business desde 499 € y Tienda Online desde 799 €.",
      link: "Ver los precios",
    },
    cards: [
      { icon: "team", color: "blue", parts: ["Marca, web y clientes con ", { t: "un solo equipo", c: "blue" }, ", sin coordinar a varios proveedores."] },
      { icon: "chat", color: "green", parts: [{ t: "Hablas directamente", c: "green" }, " con quien diseña y programa tu proyecto."] },
      { icon: "doc", color: "indigo", parts: ["Antes de empezar recibes una ", { t: "propuesta por escrito", c: "indigo" }, " con el alcance y el coste."] },
      { icon: "star", color: "orange", parts: ["Consigue ", { t: "más reseñas en Google", c: "orange" }, " con una tarjeta NFC en tu mostrador."], href: "nfc" },
      { icon: "edit", color: "teal", parts: ["Con WordPress ", { t: "editas tú mismo", c: "teal" }, " textos e imágenes cuando quieras."] },
      { icon: "home", color: "purple", parts: ["Lo probamos ", { t: "primero en casa", c: "purple" }, ": Roady, Gym Tracker y Zhestar son nuestros."] },
    ] as Card[],
  },
  en: {
    title: "Velhoura makes the difference.",
    sub: "Even more reasons to work with us.",
    big: {
      lines: ["Your website,", "with a clear price."],
      lead: "We publish the starting point of every plan: Landing from €199, Business from €499 and Online Shop from €799.",
      link: "See the prices",
    },
    cards: [
      { icon: "team", color: "blue", parts: ["Brand, web and customers with ", { t: "one team", c: "blue" }, ", no juggling several suppliers."] },
      { icon: "chat", color: "green", parts: [{ t: "Talk directly", c: "green" }, " to the people who design and build your project."] },
      { icon: "doc", color: "indigo", parts: ["Before we start you get a ", { t: "written proposal", c: "indigo" }, " with the scope and the cost."] },
      { icon: "star", color: "orange", parts: ["Get ", { t: "more Google reviews", c: "orange" }, " with an NFC card on your counter."], href: "nfc" },
      { icon: "edit", color: "teal", parts: ["With WordPress you ", { t: "edit it yourself", c: "teal" }, ": texts and images, whenever you like."] },
      { icon: "home", color: "purple", parts: ["We try it ", { t: "at home first", c: "purple" }, ": Roady, Gym Tracker and Zhestar are our own."] },
    ] as Card[],
  },
};

/** The four plan colours, as a stack of chips on the big card. */
const chips = [
  { name: "Landing", price: "199 €", bg: "bg-[#ffe45c]" },
  { name: "Business", price: "499 €", bg: "bg-[#ff7a45]" },
  { name: "Tienda", price: "799 €", bg: "bg-[#7fd8ff]" },
  { name: "Custom", price: "···", bg: "bg-[#c77dff]" },
];

export function WhySection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <section className="py-[clamp(56px,7vw,112px)]">
      <div className="shell">
        <Reveal>
          <h2 className="max-w-[28ch] text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em]">
            {t.title} <span className="text-ink-mute">{t.sub}</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 rounded-[2rem] bg-paper-sunk p-4 sm:p-5 lg:grid-cols-12">
          {/* Large card */}
          <Reveal className="lg:col-span-5 lg:row-span-2">
            <a
              href="#pricing"
              className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-3xl bg-paper-raise p-7 sm:p-9"
            >
              <p className="text-balance text-[clamp(2rem,3.4vw,2.875rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {t.big.lines[0]}
                <br />
                <span className="bg-gradient-to-r from-[#0a8a9e] to-[#0a9d4d] bg-clip-text text-transparent">
                  {t.big.lines[1]}
                </span>
              </p>
              <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft">{t.big.lead}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[#0a7cff]">
                {t.big.link} <span aria-hidden="true">→</span>
              </span>

              {/* The plans, as the coloured chips they are in the pricing section. */}
              <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
                {chips.map((c, i) => (
                  <div
                    key={c.name}
                    className={cn(
                      "rounded-2xl p-4 text-ink transition-transform duration-500 ease-[var(--e-out)]",
                      c.bg,
                      i % 2 === 1 ? "translate-y-3" : "",
                      "group-hover:-translate-y-1",
                    )}
                  >
                    <p className="text-[0.9375rem] font-semibold tracking-[-0.01em]">{c.name}</p>
                    <p className="mt-3 text-[1.5rem] font-semibold leading-none tracking-[-0.04em]">{c.price}</p>
                  </div>
                ))}
              </div>
            </a>
          </Reveal>

          {/* Six small cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            {t.cards.map((card, i) => {
              const body = (
                <>
                  <Icon name={card.icon} color={card.color} />
                  <p className="mt-6 text-[1.1875rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                    {card.parts.map((p, j) =>
                      typeof p === "string" ? (
                        <span key={j}>{p}</span>
                      ) : (
                        <span key={j} className={tone[p.c]}>
                          {p.t}
                        </span>
                      ),
                    )}
                  </p>
                </>
              );
              const cls =
                "block h-full rounded-3xl bg-paper-raise p-6 transition-transform duration-500 ease-[var(--e-out)] hover:-translate-y-1";
              return (
                <Reveal key={card.icon} delay={i * 70} className="h-full">
                  {card.href ? (
                    <Link href={nfcPath(locale)} className={cls}>
                      {body}
                    </Link>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
