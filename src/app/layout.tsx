import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactModal } from "@/components/contact/ContactModal";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { CookieNotice } from "@/components/legal/CookieNotice";
import { contact, site } from "@/data/site";
import { maintenance, plans } from "@/data/plans";
import { gateScript } from "@/components/intro/geometry";
import { HtmlLang } from "@/i18n/HtmlLang";
import "./globals.css";

/**
 * Two cuts of one family: Geist Sans carries every word a visitor reads, and
 * Geist Mono carries every number, index and status — the technical register.
 * The scale in `globals.css` is what creates hierarchy, not a second voice.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Oriol Gallart" }, { name: "Ian Monfil" }],
  creator: site.name,
  publisher: site.name,
  // Google ignores this tag; Bing and smaller engines still read it. The
  // ranking work is done by titles, headings and body copy.
  keywords: [
    "diseño web",
    "agencia de diseño web",
    "diseño web España",
    "agencia de diseño web en España",
    "agencia de marketing digital",
    "diseño web online",
    "diseño web en remoto",
    "diseño web Barcelona",
    "agencia digital Barcelona",
    "páginas web para pymes",
    "páginas web para autónomos",
    "diseño de páginas web económicas",
    "crear página web para mi negocio",
    "diseño de tiendas online",
    "tienda online Barcelona",
    "desarrollo web a medida",
    "diseño web WordPress",
    "posicionamiento SEO",
    "SEO local",
    "gestión de Google Ads",
    "diseño de logotipo",
    "identidad de marca",
    "branding",
    "web design agency",
    "web design Spain",
    "mantenimiento web",
    "Velhoura",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  // Matches `--paper`, so the browser chrome on mobile continues the page.
  themeColor: "#ffffff",
  colorScheme: "light",
};

/**
 * Structured data. Google reads this; a visitor never sees it. Declaring the
 * studio as a local professional service with named founders is what turns a search result
 * from a blue link into an entity the index can reason about.
 */
const euros = (price: string) => Number(price.replace(/[^\d]/g, ""));

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  slogan: site.tagline,
  email: contact.email,
  priceRange: "€€",
  // The published plans, so prices can show up alongside the result.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diseño y desarrollo web",
    itemListElement: [
      ...plans
        .filter((p) => p.pricePrefix)
        .map((p) => ({
          "@type": "Offer",
          name: `Página web ${p.name}`,
          description: p.pitch,
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: euros(p.price),
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
          },
          itemOffered: { "@type": "Service", name: `Diseño web — plan ${p.name}` },
        })),
      {
        "@type": "Offer",
        name: "Mantenimiento web",
        description: maintenance.includes.es.join(". "),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: maintenance.from,
          priceCurrency: "EUR",
          unitText: "MON",
          valueAddedTaxIncluded: false,
        },
        itemOffered: { "@type": "Service", name: "Mantenimiento web mensual" },
      },
    ],
  },
  founder: [
    { "@type": "Person", name: "Oriol Gallart" },
    { "@type": "Person", name: "Ian Monfil" },
  ],
  // Based in Barcelona, working across Spain and abroad, remotely.
  areaServed: [
    { "@type": "Country", name: "España" },
    { "@type": "Place", name: "Worldwide" },
  ],
  knowsLanguage: ["es", "en"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  knowsAbout: [
    "Diseño web",
    "Desarrollo web",
    "WordPress",
    "Tiendas online",
    "Ecommerce",
    "SEO",
    "SEO local",
    "Google Ads",
    "Identidad de marca",
    "Diseño de logotipos",
    "Diseño gráfico",
    "Packaging",
    "Mantenimiento web",
  ],
};

/** The site itself, tied to the organisation above and to both languages. */
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: ["es-ES", "en"],
  publisher: { "@id": `${site.url}/#organization` },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      // The intro gate writes `data-intro` and a few CSS variables here
      // before React hydrates.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Scroll reveals are JS-driven. Without JS the observer never runs,
            so every revealed element must resolve to its final, visible
            state — an animation may never be the reason content is missing. */}
        <noscript>
          <style>
            {
              "[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}.lm>span,.wm>span{transform:none!important}"
            }
          </style>
        </noscript>

        {/* Decides before first paint whether the office intro plays, so the
            first frame is either the framed office or the page — never a
            flash of one before the other. */}
        <script dangerouslySetInnerHTML={{ __html: gateScript }} />

        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>

      <body className="min-h-svh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Saltar al contenido
        </a>

        <HtmlLang />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ContactModal />
        <AssistantChat />
        <CookieNotice />
      </body>
    </html>
  );
}
