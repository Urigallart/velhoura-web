/**
 * English copy for everything in `data/`. Each entry overlays the Spanish
 * record with the same id, so prices, images, links and order stay defined
 * once, in the Spanish files, and only the words live here.
 */

import { maintenancePrice } from "./plans";

export const siteEn = {
  tagline: "Digital agency from Barcelona",
  title: "Web design and digital marketing agency — Velhoura",
  description:
    "Barcelona-based digital agency working remotely with clients across Spain and worldwide: websites from €199, online stores, SEO, Google Ads and branding.",
  area: "Barcelona · Spain-wide and remote",
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
  {
    summary: string;
    description: string;
    highlights: string[];
    story?: { title: string; body: string }[];
    /** Gallery captions, in the same order as the Spanish gallery. */
    captions?: string[];
  }
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
    story: [
      { title: "The challenge", body: "Preparing for the driving theory test usually means grinding through loose practice tests until you memorise them. You pass by repetition, forget just as fast, and staying consistent for weeks is hard." },
      { title: "What we built", body: "An app that lays the syllabus out as a path: nine topics split into short lessons, with 247 questions in the style of the official exam and every answer explained. Miss one and it is saved to \"My mistakes\" to review later." },
      { title: "Why it sticks", body: "Spaced repetition asks you again about what you are about to forget. On top sits a game layer: experience and levels, daily streaks, missions, a daily challenge, a mascot that keeps you company and a gauge of how ready you are for the real exam." },
      { title: "A complete product", body: "User accounts, progress synced across devices, a premium subscription with Stripe and notifications. It installs on the phone like an app, without going through the app stores." },
    ],
    captions: [
      "Home: progress towards the exam and the current topic",
      "The lesson path, with the daily challenge and rewards",
      "Every answer is explained, with a tutor for questions",
      "First steps, guided by the mascot",
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
    story: [
      { title: "The challenge", body: "Plenty of people log their workouts in a notebook or a notes app. It works until you want to know whether you are progressing, what weight you used last time or which muscle you have not trained in days." },
      { title: "What we built", body: "A complete training app: routines spread across the week, logging of sets, reps and weight, and its own library of 642 exercises with technique and the muscles they work. Every exercise keeps your history, your best mark and your estimated 1RM." },
      { title: "How it helps you progress", body: "Each day it suggests a concrete challenge based on your last sessions, such as beating your previous mark by one rep. The stats show which muscle groups you have trained on a 3D anatomical model you can rotate." },
      { title: "Consistency, with friends", body: "Unlockable achievements, goals, body-weight tracking with progress photos and challenges with friends to compare who trains more." },
    ],
    captions: [
      "Today: the workout that is due and the daily challenge",
      "Stats on a 3D anatomical model",
      "Exercise page with records and progress",
      "A library of 642 exercises, filterable by muscle",
      "The routine spread across the week",
      "Achievements that reward consistency",
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
    story: [
      { title: "The challenge", body: "A design team working on product, light and energy needed to tell its story with the same calm and precision it designs with: no noise, letting the products and ideas speak for themselves." },
      { title: "What we built", body: "An editorial website. It opens with a clear message and four figures that sum up the team, moves on to the latest studio stories and the working philosophy, and ends with the awards received and the people behind the design." },
      { title: "The details", body: "Large type and plenty of air, a palette of cool blues and greys, and an awards section where the pieces fan out." },
    ],
    captions: [
      "Home: the team's message",
      "Key figures at a glance and the latest stories",
      "Awards, with the pieces fanned out",
      "The working philosophy",
      "The people behind the design",
    ],
  },
  "maria-del-mar": {
    summary:
      "A website for an educational psychologist and coach in Barcelona: two lines of support, in Catalan and Spanish.",
    description:
      "The website of Maria del Mar, an educational psychologist and coach in Barcelona (Sarrià–Sant Gervasi). It presents her two lines of support — coaching and one-off sessions for young people and adults, and educational psychology for children and teenagers — who she is, the space where she sees people and the testimonials of the people she has supported. It is in Catalan and Spanish.",
    highlights: [
      "Website in Catalan and Spanish",
      "Two lines of support",
      "About her and her space in Barcelona",
      "Direct contact from every page",
    ],
    story: [
      { title: "The starting point", body: "A professional with more than twenty-five years supporting children, young people and families needed a website that conveyed what she conveys in the consulting room: calm, warmth and clarity, so that visitors know right away which line of work suits them." },
      { title: "What we built", body: "A website for her business in Barcelona, in Catalan and Spanish. It opens with a clear message and the two lines of support, moves on to who she is and photographs of her space, and ends with testimonials and a contact button always within reach." },
      { title: "The details", body: "Its own identity with her logo and a soft green, large type, plenty of air and real photographs of the practice, so the site feels as warm as she is." },
    ],
    captions: [
      "Home: the message and the two lines of work",
      "Two lines of support, one outlook",
      "About her, with key figures at a glance",
      "Her space in Barcelona",
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
    story: [
      { title: "The starting point", body: "A gymwear brand that has not yet launched its first collection needs something before a store: a recognisable identity and a way to gather the people who want to be there on day one." },
      { title: "What we built", body: "The brand identity and a launch site: a single screen with product photography, the message \"the next drop is coming\" and a sign-up to hear about the launch. Light, fast and as polished on the phone as on desktop." },
      { title: "What comes next", body: "The brand will work in drops, limited collections released on set dates. When the first one lands, the site will grow into a full online store." },
    ],
    captions: [
      "The store home page, ready for the first drop",
      "The launch site on mobile",
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
        name: "Web design",
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
    a: "Three areas that work together: brand (logo, visual identity, graphic design and packaging), web (web design, online stores and custom development) and growth (SEO and Google Ads campaigns). You can hire one or all of them.",
  },
  {
    q: "How much does a website cost?",
    a: "We publish indicative prices so you know where to start: __PRICES__. Custom projects are quoted on what you need, and you always know the price before we start.",
  },
  {
    q: "What technology do you build websites with?",
    a: "We code every site from scratch with modern technology like React and Next.js, the same this site is built with: no templates and no WordPress. That makes them faster and more secure, and if you need to update content we leave you a simple dashboard to change text and images yourself.",
  },
  {
    q: "What kind of companies do you work with?",
    a: "Mostly small and medium businesses, shops and professionals who want a serious online presence without coordinating several suppliers. We're based in Barcelona and work with clients all over Spain and in other countries, remotely.",
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
    q: "Do you work with clients outside Barcelona or in other countries?",
    a: "Yes. We're based in Barcelona, but we work with businesses all over Spain and in other countries. The whole project runs remotely, over video calls and email, in English or Spanish.",
  },
  {
    q: "Do you make websites for freelancers and small businesses?",
    a: "Yes, that's most of our work. For a freelancer or a small business we usually start with a landing page or a site of a few pages, well built and mobile-ready, that can grow later when the business needs it.",
  },
  {
    q: "Can you help me show up on Google?",
    a: "Yes. Every site we build ships with technical SEO done: speed, structure and copy written so Google understands what you do. If you want to go further, we work on SEO (including local SEO for wherever your business is) and Google Ads campaigns so you appear when people search for you.",
  },
  {
    q: "What happens once the site is live?",
    a: `Maintenance is optional and separate from the price of the site, from ${maintenancePrice("en")} depending on its size: we take care of updates, backups, keeping it online, small text and image changes and email support. If you'd rather run it yourself, we hand it over ready and show you how.`,
  },
];
