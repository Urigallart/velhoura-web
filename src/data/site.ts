/**
 * Global site configuration: identity, navigation and contact channels.
 */

export const site = {
  name: "Velhoura",
  /** What the studio is and where, in the words a search result shows. */
  tagline: "Agencia digital en Barcelona",
  description:
    "Velhoura es una agencia digital de Barcelona para pymes: identidad de marca, diseño web, tiendas online, SEO y Google Ads, hechos por un mismo equipo de principio a fin.",

  /**
   * ⚠ CHECK BEFORE LAUNCH. This is the studio's canonical origin and it feeds
   * `metadataBase`, the sitemap, robots.txt and every Open Graph URL.
   *
   * It currently collides with the eyewear brand in `data/products.ts`, which
   * also points at velhoura.com — so the "Visitar Velhoura" button on that
   * product page links back to this same site. One of the two needs its own
   * domain; the studio site is the one to move if the shop is already live
   * there.
   */
  url: "https://velhoura.com",
} as const;

export const nav = [
  { label: "Servicios", href: "/#services" },
  { label: "Precios", href: "/#pricing" },
  { label: "Estudio", href: "/#about" },
  { label: "Contacto", href: "/#contact" },
] as const;

/**
 * Social handles.
 *
 * Every entry here used to point at `"#"` — four links that scroll the page
 * to the top and tell a visitor the studio does not maintain its accounts.
 * A link with nothing behind it is worse than no link, so the footer and the
 * contact section render only the entries that have a real URL. Fill these
 * in and they appear on their own.
 */
export const contact = {
  email: "velouraianuri@gmail.com",
  /**
   * ⚠ PENDING — the studio's own numbers. Left empty on purpose: every place
   * that shows them renders only when they are filled in, in international
   * format (e.g. "+34 600 000 000"; WhatsApp as digits only, "34600000000").
   */
  phone: "" as string,
  whatsapp: "" as string,
  /** Where the studio is, as it should read on the page. */
  area: "Barcelona y alrededores",
  socials: [
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
  ],
} as const;

/** Only the channels that actually exist. */
export const activeSocials = contact.socials.filter((s) => s.href.length > 0);

export const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Legal Notice", href: "/legal/notice" },
  { label: "Terms & Conditions", href: "/legal/terms" },
] as const;
