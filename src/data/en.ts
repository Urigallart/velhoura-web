/**
 * English copy for everything in `data/`. Each entry overlays the Spanish
 * record with the same id, so prices, images, links and order stay defined
 * once, in the Spanish files, and only the words live here.
 */

import { maintenancePrice } from "./plans";

export const siteEn = {
  tagline: "Digital agency in Barcelona",
  description:
    "Velhoura is a Barcelona digital agency for small and medium businesses: brand identity, web design, online stores, SEO and Google Ads, delivered by one team from start to finish.",
  area: "Barcelona and surroundings",
  nav: {
    "/#services": "Services",
    "/#pricing": "Pricing",
    "/#about": "Studio",
    "/#contact": "Contact",
  } as Record<string, string>,
};

export const plansEn: Record<
  string,
  {
    name?: string;
    pitch: string;
    features: string[];
    price?: string;
    priceNote: string;
    cta: string;
  }
> = {
  landing: {
    pitch:
      "For professionals, projects and businesses that need a simple, strong online presence.",
    features: [
      "Custom design",
      "Responsive",
      "Animations",
      "Basic SEO",
      "Contact form",
      "Speed optimisation",
    ],
    priceNote: "Indicative price",
    cta: "I want my website",
  },
  business: {
    pitch: "For companies that need a more complete website.",
    features: [
      "Custom design",
      "Multiple pages",
      "Responsive",
      "Advanced animations",
      "SEO",
      "Forms",
      "Integrations",
      "Content management panel",
    ],
    priceNote: "Indicative price",
    cta: "I want my website",
  },
  ecommerce: {
    name: "Online Store",
    pitch: "For businesses that want to sell online with a store of their own.",
    features: [
      "Catalogue and product pages",
      "Cart and checkout",
      "Payments with Stripe",
      "Order and stock management",
      "Admin panel",
      "Shipping and discounts",
    ],
    priceNote: "Indicative price",
    cta: "I want my store",
  },
  custom: {
    pitch: "For projects that need something fully bespoke.",
    features: [
      "Web applications",
      "Platforms",
      "SaaS",
      "Custom systems",
      "API integrations",
      "Databases",
      "Specific features",
    ],
    price: "Let's talk",
    priceNote: "Custom quote",
    cta: "Get in touch",
  },
};

export const processEn: Record<string, { title: string; body: string }> = {
  "01": {
    title: "We listen",
    body: "We talk about your business, your customers and what you want to achieve. Before proposing anything, we understand where you are.",
  },
  "02": {
    title: "We propose",
    body: "We send you a written plan: what we'll do, in what order and what it costs. No small print.",
  },
  "03": {
    title: "We build",
    body: "We design and develop in stages. You see every step and we review it together before moving on.",
  },
  "04": {
    title: "We launch and improve",
    body: "We go live, measure how people respond and adjust whatever is needed to keep it delivering.",
  },
};

export const teamEn: Record<string, { role: string; bio: string }> = {
  "founder-01": {
    role: "Full Stack Developer",
    bio: "End-to-end full stack development: frontend and backend, interface design and the architecture underneath. Currently furthering his training with a Master's in AI and Big Data.",
  },
  "founder-02": {
    role: "Full Stack Developer",
    bio: "From repairing hardware to building products: systems and networks first, then full stack development with React and Next.js in production at Worldline. Currently studying Computer Engineering at Tecnocampus while co-founding and building Velhoura.",
  },
};

export const productsEn: Record<
  string,
  { summary: string; description: string; highlights: string[] }
> = {
  roady: {
    summary:
      "Prep for the Spanish driving theory test, with spaced repetition and gamification.",
    description:
      "Roady turns the driving theory syllabus into a daily study system: exam-style questions, spaced repetition so nothing learned is forgotten, and a layer of progress and streaks that keeps you consistent without it feeling like a chore.",
    highlights: [
      "Official-style question bank",
      "Spaced repetition",
      "Streaks and gamified progress",
      "Account and subscription with Stripe",
    ],
  },
  "gym-tracker": {
    summary:
      "Workout logging with an exercise library, achievements and challenges between friends.",
    description:
      "Gym Tracker turns the gym notebook into a real app: sets, reps and weight per exercise, its own exercise library, a progress calendar, unlockable achievements and challenges to compare consistency with friends.",
    highlights: [
      "Own exercise library (RepDB)",
      "Calendar and per-session progress",
      "Achievements and challenges with friends",
      "Local AI assistant",
    ],
  },
  "velhoura-eyewear": {
    summary: "Our own sunglasses brand: online store, catalogue and full checkout.",
    description:
      "Velhoura is our own sunglasses brand, built as a complete online store: a curated catalogue, product pages, checkout and the operations of a real direct-to-consumer brand — an example of how we take a product from idea to sale.",
    highlights: [
      "Catalogue and product pages",
      "Checkout and order management",
      "Own brand identity",
      "Shipping and returns",
    ],
  },
  "simon-design": {
    summary:
      "An editorial website for a design team: figures, stories, philosophy, awards and team.",
    description:
      "Simon Design is an editorial website for a design team working on product, light and energy. A home page with a clear message and key figures at a glance, a section of studio stories, the working philosophy, awards received and the people on the team, with typography and rhythm made for calm reading.",
    highlights: [
      "Editorial home page with figures",
      "Studio stories",
      "Philosophy, awards and team",
    ],
  },
  zhestar: {
    summary: "Gymwear brand in the making — the site for the first drop, counting down.",
    description:
      "Zhestar is a gymwear brand under construction. The current site presents the first drop (\"Drop 001\") ahead of launch, setting out the brand identity and the limited-collection drop mechanic that will grow with each release.",
    highlights: [
      "Brand identity",
      "Technical training wear",
      "Limited drop mechanic",
    ],
  },
};

export const servicesEn: Record<
  string,
  {
    name: string;
    promise: string;
    body: string;
    items: { name: string; detail: string }[];
  }
> = {
  brand: {
    name: "Brand",
    promise: "Be recognised at first glance.",
    body: "We shape how your business looks and presents itself, so it says the same thing on a business card, a box or a screen.",
    items: [
      {
        name: "Logo and visual identity",
        detail: "Symbol, colours, typefaces and a simple guide to use them well.",
      },
      {
        name: "Graphic design",
        detail: "Stationery, presentations, signage and pieces for social media.",
      },
      {
        name: "Packaging",
        detail: "Boxes and labels that stand out on the shelf and tell people who you are.",
      },
    ],
  },
  web: {
    name: "Web",
    promise: "A website that works while you run your business.",
    body: "We design and build fast websites that are easy to update and made so that visitors end up writing to you or buying.",
    items: [
      {
        name: "Web design and WordPress",
        detail: "Company websites you can edit yourself, without depending on anyone.",
      },
      {
        name: "Online stores",
        detail: "Catalogue, cart and secure payments so you can sell outside opening hours too.",
      },
      {
        name: "Custom development",
        detail: "Client areas, bookings, internal dashboards and whatever your business needs.",
      },
    ],
  },
  growth: {
    name: "Growth",
    promise: "Be found by people already looking for you.",
    body: "We work on your presence in Google so you show up when someone nearby searches for what you offer, and we measure what brings you customers.",
    items: [
      {
        name: "SEO",
        detail: "Content, performance and business profile to climb the results.",
      },
      {
        name: "Google Ads campaigns",
        detail: "Ads with a controlled budget, aimed at searches with buying intent.",
      },
      {
        name: "Measurement and improvement",
        detail: "We see where enquiries come from and fix what isn't performing.",
      },
    ],
  },
};

export const faqsEn: { q: string; a: string }[] = [
  {
    q: "What services do you offer?",
    a: "Three areas that work together: brand (logo, visual identity, graphic design and packaging), web (web design, WordPress, online stores and custom development) and growth (SEO and Google Ads campaigns). You can hire one or all of them.",
  },
  {
    q: "How much does a website cost?",
    a: "We publish indicative prices so you know where to start: __PRICES__. Custom projects are quoted on what you need, and you always know the price before we start.",
  },
  {
    q: "Do you work with WordPress?",
    a: "Yes. For most company websites it's a good choice because you can edit text and images yourself. When a project needs something more specific, we build it custom.",
  },
  {
    q: "What kind of companies do you work with?",
    a: "Mostly small and medium businesses, shops and professionals in Barcelona and the surrounding area who want a serious online presence without coordinating several suppliers.",
  },
  {
    q: "What does the process look like?",
    a: "First we talk about your business and goals. Then we send you a written plan with what we'll do and what it costs. We build in stages, reviewing every step with you, and after launch we measure results to keep improving.",
  },
  {
    q: "What do I need to get started?",
    a: "Just tell us what you do and what you want to achieve. If you already have a logo, copy or photos, we'll use them; if not, we'll help you prepare them.",
  },
  {
    q: "What happens once the site is live?",
    a: `Maintenance is optional and separate from the price of the site, from ${maintenancePrice("en")} depending on its size: we take care of updates, backups, keeping it online, small text and image changes and email support. If you'd rather run it yourself, we hand it over ready and show you how.`,
  },
];
