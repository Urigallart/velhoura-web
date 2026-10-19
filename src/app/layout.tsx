import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactModal } from "@/components/contact/ContactModal";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { CookieNotice } from "@/components/legal/CookieNotice";
import { contact, site } from "@/data/site";
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
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Oriol Gallart" }, { name: "Ian Monfil" }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "agencia digital Barcelona",
    "diseño web Barcelona",
    "diseño web para pymes",
    "WordPress",
    "tienda online",
    "SEO Barcelona",
    "Google Ads",
    "branding",
    "diseño de logotipo",
    "packaging",
    "Velhoura",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
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
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  email: contact.email,
  founder: [
    { "@type": "Person", name: "Oriol Gallart" },
    { "@type": "Person", name: "Ian Monfil" },
  ],
  areaServed: { "@type": "City", name: "Barcelona" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  knowsAbout: [
    "Diseño web",
    "WordPress",
    "Tiendas online",
    "SEO",
    "Google Ads",
    "Identidad de marca",
    "Diseño gráfico",
    "Packaging",
  ],
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
