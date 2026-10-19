/**
 * English overlay for `servicePages.ts`, keyed by the Spanish slug. The
 * English pages live at /en/services/[slugEn].
 */

import { maintenancePrice } from "./plans";

type PageEn = {
  slugEn: string;
  name: string;
  tag: string;
  metaTitle: string;
  metaDescription: string;
  headline: string[];
  lead: string;
  benefits: { title: string; body: string }[];
  includes: string[];
  idealFor: string[];
  priceNote: string;
  faqs: { q: string; a: string }[];
};

export const servicePagesEn: Record<string, PageEn> = {
  "identidad-de-marca": {
    slugEn: "brand-identity",
    name: "Brand identity",
    tag: "Logo",
    metaTitle: "Logo design and brand identity in Barcelona",
    metaDescription:
      "We create your business's logo and visual identity: symbol, colours, typefaces and a simple guide to apply it well everywhere.",
    headline: ["A brand", "*people remember.*"],
    lead: "Your logo is the first thing a customer sees and the thing they'll see most often. We design an identity that explains who you are at a glance and works just as well on a shop sign, an invoice or an Instagram profile.",
    benefits: [
      {
        title: "Built from your business",
        body: "Before drawing anything we talk about your customers, your competitors and how you want to be seen. The design comes from there, not from a trend.",
      },
      {
        title: "Consistent everywhere",
        body: "We prepare versions for light and dark backgrounds, small sizes and real applications, so you never have to improvise.",
      },
      {
        title: "Easy to use without us",
        body: "You get a short, clear guide with colours, typefaces and examples, so any supplier can apply it properly.",
      },
    ],
    includes: [
      "Kick-off session to understand your business",
      "Logo proposals and a round of revisions",
      "Colour palette and typefaces",
      "Logo versions for every use",
      "Brand guidelines in PDF",
      "Files ready for print and web",
    ],
    idealFor: [
      "New businesses that need an image from scratch",
      "Companies with an old logo that no longer represents them",
      "Brands that look different everywhere and want order",
    ],
    priceNote: "Custom quote depending on scope.",
    faqs: [
      {
        q: "Is a logo the same as a brand identity?",
        a: "No. The logo is one piece; the identity also includes colours, typefaces and the rules that make everything you publish recognisably yours.",
      },
      {
        q: "Can I refresh my logo without changing it completely?",
        a: "Yes. Often it's enough to modernise and tidy what you already have, keeping what your customers recognise.",
      },
      {
        q: "What formats do I receive?",
        a: "Vector files for print and image files for web and social media, in colour, reversed and single-colour versions.",
      },
    ],
  },
  "diseno-grafico-y-packaging": {
    slugEn: "graphic-design-and-packaging",
    name: "Graphic design and packaging",
    tag: "Graphic",
    metaTitle: "Graphic design and packaging for businesses in Barcelona",
    metaDescription:
      "Stationery, catalogues, signage, social media pieces and packaging: graphic design that keeps your brand consistent in every piece.",
    headline: ["Every piece,", "*up to standard.*"],
    lead: "A business card, a menu, a label or a box sells too. We design your business's graphic pieces so they all speak the same language and show care.",
    benefits: [
      {
        title: "Packaging that stands out",
        body: "Boxes and labels designed for the shelf and for the photo: recognisable from two metres away and clear up close.",
      },
      {
        title: "Ready to print",
        body: "We prepare files to your printer's specifications so there are no surprises with colour or cutting.",
      },
      {
        title: "Always on brand",
        body: "Every piece starts from your identity, so the whole set looks professional even when made at different times.",
      },
    ],
    includes: [
      "Stationery: cards, invoices, envelopes",
      "Catalogues, brochures and presentations",
      "Signage and posters",
      "Social media templates",
      "Label and packaging design",
      "Checked print-ready files",
    ],
    idealFor: [
      "Product brands about to reach shops",
      "Shops and restaurants refreshing their image",
      "Companies that need material for fairs or sales",
    ],
    priceNote: "Quoted per piece or as a package.",
    faqs: [
      {
        q: "Do you also handle the printing?",
        a: "We design and prepare files for the printer of your choice, and can coordinate with them to check proofs.",
      },
      {
        q: "Can you design on top of an existing brand?",
        a: "Yes. We work with your current identity and, if needed, tidy it a little so the pieces stay consistent.",
      },
      {
        q: "Do you make templates I can edit myself?",
        a: "Yes, for social media and everyday documents we leave you editable templates so you can publish without depending on us.",
      },
    ],
  },
  "diseno-web": {
    slugEn: "web-design",
    name: "Web design and WordPress",
    tag: "WordPress",
    metaTitle: "Website design and WordPress for small businesses in Barcelona",
    metaDescription:
      "Fast, mobile-ready company websites that are easy to edit, designed to turn visits into enquiries.",
    headline: ["Your best salesperson,", "*always open.*"],
    lead: "When someone hears about you, the first thing they do is look you up. We design clear, fast websites that explain what you do, build trust and make it easy to get in touch.",
    benefits: [
      {
        title: "Designed to convert",
        body: "Every page has a goal: a call, a message or a quote request. The design guides the visitor to that step.",
      },
      {
        title: "Fast and mobile-first",
        body: "Most visits come from phones. The site loads quickly and reads well on any screen — something Google values too.",
      },
      {
        title: "You edit it",
        body: "With WordPress you can change text, photos or add news without touching code and without waiting for anyone.",
      },
    ],
    includes: [
      "Structure and copy aimed at winning enquiries",
      "Custom design with your identity",
      "Mobile and tablet ready",
      "Contact forms",
      "Basic SEO and optimised speed",
      "Training to edit the content",
    ],
    idealFor: [
      "Businesses and professionals with no website or an outdated one",
      "Local businesses that want to be found and get enquiries",
      "Companies that need to explain several services clearly",
    ],
    priceNote: "Indicative prices.",
    faqs: [
      {
        q: "What's the difference between a landing page and a full website?",
        a: "A landing page is a single page focused on one goal; a company website has several pages for services, about, contact and more.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes. We show you how to edit text and images so day-to-day changes don't depend on us.",
      },
      {
        q: "Do you take care of the domain and hosting?",
        a: "We help you choose and set them up so the site is published and running.",
      },
    ],
  },
  "tiendas-online": {
    slugEn: "online-stores",
    name: "Online stores",
    tag: "E-commerce",
    metaTitle: "Online store design for small businesses in Barcelona",
    metaDescription:
      "Online stores with catalogue, cart, secure payments and order management, so you sell even after closing time.",
    headline: ["Keep selling", "*after you close.*"],
    lead: "An online store takes your business beyond the counter and opening hours. We build the whole thing: catalogue, cart, payments and a simple panel to manage orders.",
    benefits: [
      {
        title: "Friction-free buying",
        body: "Clear product pages, a quick cart and checkout in a few steps, so fewer people give up halfway.",
      },
      {
        title: "Secure payments",
        body: "We integrate reliable payment gateways so customers pay with confidence and you get paid without hassle.",
      },
      {
        title: "Simple management",
        body: "Products, stock, orders, shipping and discounts from a panel designed for daily use.",
      },
    ],
    includes: [
      "Catalogue and product pages",
      "Cart and checkout",
      "Card payments",
      "Order and stock management",
      "Shipping and discount codes",
      "Admin panel",
    ],
    idealFor: [
      "Shops that want to sell online too",
      "Product brands launching direct sales",
      "Businesses selling through messages that want to get organised",
    ],
    priceNote: "Indicative price for a complete store.",
    faqs: [
      {
        q: "Can I add and edit products myself?",
        a: "Yes. From the panel you add products, change prices and manage stock without help.",
      },
      {
        q: "Which payment methods can I offer?",
        a: "Card payments through a secure gateway and, depending on your needs, other common methods.",
      },
      {
        q: "Do you have experience selling online?",
        a: "Yes: one of our own projects is an online sunglasses store that we designed and run ourselves.",
      },
    ],
  },
  "desarrollo-a-medida": {
    slugEn: "custom-development",
    name: "Custom development",
    tag: "Custom",
    metaTitle: "Custom web development and applications in Barcelona",
    metaDescription:
      "Client areas, booking systems, internal dashboards and web applications built around the way your business works.",
    headline: ["Tools that", "*save you hours.*"],
    lead: "When a template isn't enough, we build it. We develop web applications and internal tools that adapt to the way you work, instead of forcing you to adapt to them.",
    benefits: [
      {
        title: "Made for your process",
        body: "We start from how you work today and automate the repetitive parts: bookings, quotes, client follow-up, reports.",
      },
      {
        title: "Modern technology",
        body: "We use modern, proven tools — the same ones we use to build and run our own products.",
      },
      {
        title: "Grows with you",
        body: "We start with the essentials and add features in stages, when real use shows they're needed.",
      },
    ],
    includes: [
      "Needs analysis and technical proposal",
      "Interface design",
      "Web application development",
      "Database and users with permissions",
      "Integrations with other tools",
      "Launch and initial support",
    ],
    idealFor: [
      "Companies running everything on spreadsheets",
      "Businesses that need a private area for clients",
      "Projects that want to launch their own platform",
    ],
    priceNote: "Custom quote after reviewing the project.",
    faqs: [
      {
        q: "How do I know if I need something custom?",
        a: "If your team repeats tasks by hand or uses several tools that don't talk to each other, you probably do. We assess it together before proposing anything.",
      },
      {
        q: "Have you built your own applications?",
        a: "Yes. We have our own products in production, such as an app to prepare for the driving theory test and a workout logging app.",
      },
      {
        q: "Who maintains the application afterwards?",
        a: `We can keep handling maintenance for a separate monthly fee (from ${maintenancePrice("en")}, depending on the project), or leave it documented for your team to run. New improvements are quoted separately.`,
      },
    ],
  },
  seo: {
    slugEn: "seo",
    name: "SEO",
    tag: "Google",
    metaTitle: "SEO for small businesses in Barcelona",
    metaDescription:
      "We improve your Google ranking so people searching for what you offer in your area find you: technical SEO, content and business profile.",
    headline: ["Be found", "*when they search.*"],
    lead: "Every day people search Google for what you sell. SEO puts you in those results without paying per click, with results that build up over time.",
    benefits: [
      {
        title: "Visibility in your area",
        body: "We work on your business profile and local searches so you show up for people looking nearby.",
      },
      {
        title: "A website Google understands",
        body: "We review speed, structure and content so your site is easy to read for both people and search engines.",
      },
      {
        title: "Measurable results",
        body: "Every month we tell you what changed: rankings, visits and enquiries coming from Google.",
      },
    ],
    includes: [
      "Initial review of your site and competitors",
      "Keyword research with buying intent",
      "Technical and speed improvements",
      "Optimisation of key pages and copy",
      "Google business profile",
      "Monthly progress report",
    ],
    idealFor: [
      "Local businesses that depend on being found",
      "Websites with visits but no enquiries",
      "Companies that want to rely less on advertising",
    ],
    priceNote: "Monthly quote depending on your starting point.",
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "It depends on your sector and your site, but it's a matter of months. In return, results last without paying for each visit.",
      },
      {
        q: "Is SEO or Google Ads better?",
        a: "They complement each other: ads bring enquiries from day one and SEO builds long-term visibility. We recommend the mix for your case.",
      },
      {
        q: "Can you guarantee the top spot?",
        a: "Nobody can honestly guarantee it, because Google decides. What we do guarantee is clear, measured work and an explanation of every result.",
      },
    ],
  },
  "google-ads": {
    slugEn: "google-ads",
    name: "Google Ads campaigns",
    tag: "Campaigns",
    metaTitle: "Google Ads campaign management in Barcelona",
    metaDescription:
      "Google Ads campaigns with a controlled budget, aimed at searches with buying intent and measured by real enquiries.",
    headline: ["Customers from", "*day one.*"],
    lead: "With Google Ads you appear at the very top exactly when someone searches for what you offer. We create and manage campaigns built to bring enquiries, not just clicks, with a budget you control.",
    benefits: [
      {
        title: "Budget under control",
        body: "You decide how much to invest. We make sure every euro goes to searches that can really become customers.",
      },
      {
        title: "Ads and pages that match",
        body: "Because we also build websites, we make sure the page the ad leads to is ready to convert.",
      },
      {
        title: "Measured by results",
        body: "We set up tracking for calls and forms so we know which campaigns work and which need adjusting.",
      },
    ],
    includes: [
      "Search and competitor research",
      "Account and tracking setup",
      "Ad copywriting",
      "Targeting by area and schedule",
      "Ongoing bid and keyword optimisation",
      "Monthly report with enquiries won",
    ],
    idealFor: [
      "Businesses that need enquiries in the short term",
      "Launches of new services or products",
      "Companies in sectors with heavy competition on Google",
    ],
    priceNote: "Custom monthly management, plus ad spend.",
    faqs: [
      {
        q: "How much do I need to spend on ads?",
        a: "It depends on your sector and area. We propose a cautious starting figure and adjust it with data from the first weeks.",
      },
      {
        q: "Is the ad money paid to you?",
        a: "No: ad spend is paid directly to Google from your account. We only charge for management.",
      },
      {
        q: "Can I pause the campaigns whenever I want?",
        a: "Yes. Campaigns can be paused or adjusted at any time depending on your workload.",
      },
    ],
  },
};
