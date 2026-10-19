/**
 * Global site configuration: identity, navigation and contact channels.
 */

export const site = {
  name: "Velhoura",
  /** What the studio is and where, in the words a search result shows. */
  tagline: "Agencia digital desde Barcelona",
  /**
   * The home page's <title>. Leads with what people type into Google
   * ("diseño web", "agencia de diseño web"), not with the brand, which nobody
   * searches yet. The studio is in Barcelona but works across Spain and abroad,
   * remotely, so the reach is national rather than one city.
   */
  title: "Diseño web y marketing digital en toda España — Velhoura",
  /** Search-result snippet: kept under ~155 characters so Google shows it whole. */
  description:
    "Agencia digital con base en Barcelona: páginas web desde 199 €, tiendas online, SEO y Google Ads para negocios de toda España y de cualquier país, en remoto.",

  /**
   * The studio's canonical origin. It feeds `metadataBase`, canonical links,
   * the sitemap, robots.txt and every Open Graph URL, so it must be the
   * address this site is actually served from — pointing it anywhere else
   * tells Google this site is a copy of that one.
   *
   * velhoura.com is NOT this site (it's the eyewear shop in
   * `data/products.ts`). When the studio gets its own domain, set
   * NEXT_PUBLIC_SITE_URL in Vercel (e.g. "https://velhoura.studio") and
   * redeploy; nothing else needs to change.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://velhouraempyre-ashen.vercel.app").replace(/\/$/, ""),
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
  area: "Barcelona · Toda España y en remoto",
  socials: [
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
  ],
} as const;

/** Only the channels that actually exist. */
export const activeSocials = contact.socials.filter((s) => s.href.length > 0);

/**
 * The documents exist in Spanish only — the binding version under Spanish
 * law — so both languages link to the same pages, labelled in their own
 * language.
 */
export const legalLinks = [
  { label: { es: "Aviso legal", en: "Legal notice" }, href: "/legal/notice" },
  { label: { es: "Privacidad", en: "Privacy" }, href: "/legal/privacy" },
  { label: { es: "Cookies", en: "Cookies" }, href: "/legal/cookies" },
  { label: { es: "Términos y condiciones", en: "Terms & conditions" }, href: "/legal/terms" },
] as const;
