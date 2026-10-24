import type { Locale } from "@/i18n/locale";
import { maintenancePrice } from "./plans";
import { activeQuestions, pruneAnswers, type QuizAnswers, type QuizOption, type QuizQuestion } from "./quiz";

/**
 * The form behind each pricing card, and the price estimate it produces.
 *
 * Someone who clicks "Quiero mi tienda" has already said what they want, so
 * instead of the full project questionnaire (which starts with "what would
 * you like to build?") they get questions that only make sense for that plan.
 * Same shape as `quiz.ts`, rendered by the same `ProjectQuiz` component.
 *
 * ── The estimate ──────────────────────────────────────────────────────────
 * Each plan has a `base` (its "Desde" price) and each option may carry a
 * `cost`: a fixed number or a [min, max] range in euros, added on top. The
 * visitor sees the running total as a range as they answer.
 *
 * THESE FIGURES ARE THE STUDIO'S TO SET. Adjust `base` and any `cost` below;
 * nothing else needs to change. Options with no cost are included in the
 * plan's base price. VAT and third-party costs (domain, hosting, licences)
 * are never part of the estimate, and the form says so.
 */

type Cost = number | [number, number];

/** An option, optionally priced. */
const p = (id: string, es: string, en: string, cost?: Cost, hint?: [string, string]): QuizOption => ({
  id,
  label: { es, en },
  ...(cost !== undefined ? { cost } : null),
  ...(hint ? { hint: { es: hint[0], en: hint[1] } } : null),
});

/** A "none of these" option that clears the others in a multi-choice question. */
const none = (id: string, es: string, en: string): QuizOption => ({ ...p(id, es, en), exclusive: true });

const pickAll = { es: "Puedes elegir varias.", en: "Pick as many as you like." };

/* ── Shared questions ──────────────────────────────────────────────────── */

const content = (partial: Cost, full: Cost): QuizQuestion => ({
  id: "content",
  title: { es: "¿Tienes ya los textos?", en: "Do you already have the copy?" },
  help: {
    es: "Si no, los redactamos nosotros a partir de una conversación contigo.",
    en: "If not, we write them ourselves after a conversation with you.",
  },
  options: [
    p("ready", "Sí, los tengo todos", "Yes, I have all of it"),
    p("partial", "Tengo una parte", "I have some of it", partial),
    p("none", "No, necesito que los escribáis", "No, I need you to write them", full),
  ],
});

const images = (stock: Cost, custom: Cost): QuizQuestion => ({
  id: "images",
  title: { es: "¿Y las imágenes?", en: "And the images?" },
  help: {
    es: "Fotos, ilustraciones o gráficos que aparecerán en la web.",
    en: "Photos, illustrations or graphics that will appear on the site.",
  },
  options: [
    p("own", "Tengo fotos propias", "I have my own photos"),
    p("stock", "Buscadlas vosotros (bancos de imágenes)", "Find them for me (stock images)", stock),
    p("custom", "Quiero ilustraciones o gráficos a medida", "I want custom illustrations or graphics", custom),
  ],
});

const brand = (logo: Cost, identity: Cost): QuizQuestion => ({
  id: "brand",
  title: { es: "¿Tienes logo e identidad de marca?", en: "Do you have a logo and brand identity?" },
  help: {
    es: "Colores, tipografías y logo. Si ya los tienes, la web los sigue.",
    en: "Colours, typefaces and logo. If you have them, the site follows them.",
  },
  options: [
    p("yes", "Sí, ya los tengo", "Yes, I have them"),
    p("logo", "Necesito un logo sencillo", "I need a simple logo", logo),
    p("identity", "Necesito una identidad completa", "I need a full identity", identity, [
      "Logo, paleta, tipografías y guía de uso",
      "Logo, palette, typefaces and usage guide",
    ]),
  ],
});

const timing = (urgent: Cost): QuizQuestion => ({
  id: "timing",
  title: { es: "¿Para cuándo lo necesitas?", en: "When do you need it?" },
  help: {
    es: "Con un plazo muy corto reorganizamos el calendario para llegar.",
    en: "With a very tight deadline we rearrange our schedule to make it.",
  },
  options: [
    p("urgent", "Urgente, en menos de 2 semanas", "Urgent, in under 2 weeks", urgent),
    p("month", "En un mes, más o menos", "In about a month"),
    p("later", "En dos o tres meses", "In two or three months"),
    p("exploring", "Sin prisa, estoy mirando opciones", "No rush, I'm exploring options"),
  ],
});

const care: QuizQuestion = {
  id: "care",
  title: { es: "Una vez publicada, ¿quién se encarga?", en: "Once it's live, who looks after it?" },
  help: {
    es: "No suma al precio de la web; nos ayuda a saber cómo dejártela preparada.",
    en: "It doesn't add to the price; it tells us how to hand it over.",
  },
  note: {
    es: `Si quieres que nos encarguemos, el mantenimiento va aparte, desde ${maintenancePrice("es")}, fuera de esta estimación.`,
    en: `If you'd like us to handle it, maintenance is billed separately, from ${maintenancePrice("en")}, outside this estimate.`,
  },
  options: [
    p("me", "Yo mismo, con unas instrucciones", "Me, with some instructions"),
    p("you", "Prefiero que lo llevéis vosotros", "I'd rather you handled it"),
    p("unsure", "Todavía no lo sé", "I don't know yet"),
  ],
};

/* ── Landing ───────────────────────────────────────────────────────────── */

const landing: QuizQuestion[] = [
  {
    id: "purpose",
    title: { es: "¿Para qué es la landing?", en: "What is the landing page for?" },
    help: {
      es: "Una página que presenta un negocio y una que lanza una campaña se construyen distinto.",
      en: "A page that introduces a business and one that launches a campaign are built differently.",
    },
    options: [
      p("present", "Presentar mi negocio o mis servicios", "Introduce my business or services"),
      p("launch", "Lanzar un producto o servicio nuevo", "Launch a new product or service"),
      p("event", "Un evento o una campaña concreta", "An event or a specific campaign"),
      p("validate", "Validar una idea antes de invertir más", "Test an idea before investing more"),
    ],
  },
  {
    id: "length",
    title: { es: "¿Cuánto contenido tendrá?", en: "How much content will it have?" },
    help: {
      es: "Cada sección es un bloque: presentación, servicios, opiniones, preguntas, contacto…",
      en: "Each section is a block: intro, services, reviews, FAQ, contact…",
    },
    options: [
      p("short", "Corta, 3 o 4 secciones", "Short, 3 or 4 sections"),
      p("medium", "Media, de 5 a 7 secciones", "Medium, 5 to 7 sections", [40, 60]),
      p("long", "Larga, 8 secciones o más", "Long, 8 sections or more", [80, 120]),
    ],
  },
  content([20, 40], [50, 90]),
  images(15, [60, 100]),
  {
    id: "extras",
    title: { es: "¿Necesitas algo más además del formulario?", en: "Anything else besides the contact form?" },
    help: pickAll,
    multi: true,
    options: [
      p("booking", "Reservas o citas", "Bookings or appointments", [30, 50]),
      p("newsletter", "Captar emails para newsletter", "Collect emails for a newsletter", [20, 30]),
      p("whatsapp", "Botón de WhatsApp", "WhatsApp button", 10),
      p("languages", "Varios idiomas", "Several languages", [40, 70]),
      p("analytics", "Analítica y píxel para anuncios", "Analytics and an ad pixel", [15, 25]),
      none("nothing", "Nada más, con lo básico me vale", "Nothing else, the basics are fine"),
    ],
  },
  brand([50, 80], [120, 200]),
  {
    id: "domain",
    title: { es: "¿Tienes dominio?", en: "Do you have a domain?" },
    help: {
      es: "El dominio es la dirección de tu web, tipo tunegocio.com. Si no, te ayudamos a elegirlo.",
      en: "The domain is your site's address, like yourbusiness.com. If not, we'll help you pick one.",
    },
    note: {
      es: "El dominio y el alojamiento se pagan aparte, normalmente unos pocos euros al mes.",
      en: "Domain and hosting are paid separately, usually a few euros a month.",
    },
    options: [
      p("yes", "Sí, ya lo tengo", "Yes, I already have one"),
      p("no", "No, necesito uno", "No, I need one"),
      p("unsure", "No estoy seguro", "I'm not sure"),
    ],
  },
  timing([30, 60]),
];

/* ── Business ──────────────────────────────────────────────────────────── */

const business: QuizQuestion[] = [
  {
    id: "pages",
    title: { es: "¿Cuántas páginas calculas que tendrá?", en: "How many pages do you think it will have?" },
    help: {
      es: "Por ejemplo: inicio, servicios, sobre nosotros, contacto… Una aproximación es suficiente.",
      en: "For example: home, services, about, contact… A rough idea is enough.",
    },
    options: [
      p("3-5", "Entre 3 y 5", "3 to 5"),
      p("6-10", "Entre 6 y 10", "6 to 10", [60, 100]),
      p("10+", "Más de 10", "More than 10", [150, 220]),
      p("unknown", "No lo sé, ayudadme a decidirlo", "Not sure, help me decide", [0, 100]),
    ],
  },
  {
    id: "features",
    title: { es: "¿Qué tiene que poder hacer la web?", en: "What should the website be able to do?" },
    help: {
      es: "Puedes elegir varias. Los formularios de contacto y presupuesto ya van incluidos.",
      en: "Pick as many as you like. Contact and quote forms are already included.",
    },
    multi: true,
    options: [
      p("booking", "Reservas o citas online", "Online bookings or appointments", [40, 60]),
      p("blog", "Blog o noticias que actualice yo", "A blog or news I update myself", [30, 50]),
      p("portfolio", "Mostrar proyectos o trabajos", "Show projects or past work", [20, 40]),
      p("languages", "Varios idiomas", "Several languages", [60, 90]),
      p("members", "Área privada para clientes", "A private client area", [120, 180]),
      none("basic", "Nada de esto, solo informar y captar contactos", "None of these, just inform and get enquiries"),
    ],
  },
  {
    id: "integrations",
    title: { es: "¿Hay que conectarla con alguna herramienta?", en: "Does it need to connect to any tools?" },
    help: pickAll,
    multi: true,
    options: [
      p("crm", "Un CRM (HubSpot, Pipedrive…)", "A CRM (HubSpot, Pipedrive…)", [30, 50]),
      p("newsletter", "Email marketing (Mailchimp, Brevo…)", "Email marketing (Mailchimp, Brevo…)", [15, 30]),
      p("calendar", "Calendario (Calendly, Google Calendar)", "Calendar (Calendly, Google Calendar)", [10, 20]),
      p("reviews", "Mapa y reseñas de Google", "Google Maps and reviews", 10),
      p("payments", "Cobrar pagos o señales online", "Take payments or deposits online", [40, 60]),
      none("none", "Ninguna", "None"),
    ],
  },
  {
    id: "currentSite",
    title: { es: "¿Tienes web ahora mismo?", en: "Do you have a website right now?" },
    help: {
      es: "Si ya existe, aprovechamos su contenido y cuidamos que no pierdas posiciones en Google.",
      en: "If there is one, we reuse its content and make sure you keep your Google rankings.",
    },
    options: [
      p("none", "No, todavía no", "No, not yet"),
      p("outdated", "Sí, pero se ha quedado anticuada", "Yes, but it's outdated", [20, 40]),
      p("works", "Sí, funciona pero quiero más", "Yes, it works but I want more", [20, 40]),
      p("social", "Solo tengo redes sociales", "I only have social media"),
    ],
  },
  content([30, 50], [60, 100]),
  images(20, [60, 100]),
  brand([50, 80], [120, 200]),
  {
    id: "seo",
    title: { es: "¿Qué importancia tiene salir en Google?", en: "How important is ranking on Google?" },
    help: {
      es: "El SEO técnico va incluido. Posicionar por búsquedas concretas requiere estudio y contenidos.",
      en: "Technical SEO is included. Ranking for specific searches takes research and content.",
    },
    options: [
      p("basic", "Con que esté bien hecha me vale", "As long as it's built right, that's enough"),
      p("local", "Quiero salir cuando buscan en mi zona", "I want to show up in local searches"),
      p("strong", "Es clave, quiero competir por búsquedas", "It's key, I want to compete for searches"),
    ],
  },
  care,
  timing([40, 80]),
];

/* ── Online store ──────────────────────────────────────────────────────── */

const ecommerce: QuizQuestion[] = [
  {
    id: "productType",
    title: { es: "¿Qué vas a vender?", en: "What will you sell?" },
    help: pickAll,
    multi: true,
    options: [
      p("physical", "Productos físicos", "Physical products"),
      p("digital", "Productos digitales", "Digital products", [30, 60], ["Descargas, cursos, plantillas", "Downloads, courses, templates"]),
      p("services", "Servicios o reservas", "Services or bookings", [80, 140]),
      p("subscriptions", "Suscripciones", "Subscriptions", [120, 200]),
    ],
  },
  {
    id: "catalogSize",
    title: { es: "¿Cuántos productos tendrás?", en: "How many products will you have?" },
    help: {
      es: "Cambia mucho cómo se organiza la tienda: categorías, filtros, buscador.",
      en: "It changes a lot how the store is organised: categories, filters, search.",
    },
    options: [
      p("few", "Menos de 20", "Fewer than 20"),
      p("some", "Entre 20 y 200", "Between 20 and 200", [60, 120]),
      p("many", "Más de 200", "More than 200", [150, 250]),
      p("unknown", "Todavía no lo sé", "I don't know yet", [0, 120]),
    ],
  },
  {
    id: "variants",
    title: { es: "¿Tus productos tienen variantes?", en: "Do your products have variants?" },
    help: {
      es: "Tallas, colores, materiales, packs o productos personalizables.",
      en: "Sizes, colours, materials, bundles or customisable products.",
    },
    options: [
      p("no", "No, cada producto es único", "No, each product is a single item"),
      p("simple", "Sí, tallas o colores", "Yes, sizes or colours", [30, 60]),
      p("complex", "Sí, y personalizables por el cliente", "Yes, and customers can customise them", [100, 180]),
    ],
  },
  {
    id: "upload",
    title: { es: "¿Quién sube los productos?", en: "Who uploads the products?" },
    help: {
      es: "Te enseñamos a hacerlo tú, o te entregamos la tienda ya llena.",
      en: "We show you how to do it, or hand over the store already stocked.",
    },
    options: [
      p("me", "Yo mismo", "Me"),
      p("you", "Vosotros, la carga inicial", "You, the initial upload", [60, 150]),
    ],
  },
  {
    id: "shipping",
    title: { es: "¿A dónde vas a enviar?", en: "Where will you ship to?" },
    help: {
      es: "Define las tarifas de envío, los impuestos y los métodos de pago.",
      en: "It sets shipping rates, taxes and payment methods.",
    },
    when: (a) => (a.productType ?? []).includes("physical"),
    options: [
      p("local", "Solo a mi ciudad o recogida en tienda", "Just my city or in-store pickup"),
      p("spain", "A toda España", "All of Spain", [20, 40]),
      p("intl", "Europa o internacional", "Europe or international", [80, 140]),
    ],
  },
  {
    id: "payments",
    title: { es: "¿Qué formas de pago quieres?", en: "Which payment methods do you want?" },
    help: {
      es: "Tarjeta, Apple Pay y Google Pay van incluidos con Stripe.",
      en: "Cards, Apple Pay and Google Pay are included with Stripe.",
    },
    multi: true,
    options: [
      p("bizum", "Bizum", "Bizum", [25, 40]),
      p("paypal", "PayPal", "PayPal", [20, 30]),
      p("offline", "Transferencia o contrarreembolso", "Bank transfer or cash on delivery", 10),
      none("standard", "Con tarjeta me vale", "Cards are enough"),
    ],
  },
  {
    id: "integrations",
    title: { es: "¿Hay que conectarla con algo?", en: "Does it need to connect to anything?" },
    help: pickAll,
    multi: true,
    options: [
      p("invoicing", "Facturación o ERP (Holded, Sage…)", "Invoicing or ERP (Holded, Sage…)", [80, 150]),
      p("pos", "Stock de mi tienda física (TPV)", "My physical shop's stock (POS)", [120, 220]),
      p("marketplaces", "Amazon u otros marketplaces", "Amazon or other marketplaces", [120, 220]),
      p("email", "Email marketing y carritos abandonados", "Email marketing and abandoned carts", [25, 50]),
      none("none", "Nada de esto", "None of these"),
    ],
  },
  {
    id: "sellingNow",
    title: { es: "¿Dónde vendes ahora mismo?", en: "Where do you sell right now?" },
    help: pickAll,
    multi: true,
    options: [
      p("store", "En tienda física", "In a physical store"),
      p("social", "Por redes sociales o WhatsApp", "Through social media or WhatsApp"),
      p("marketplaces", "En marketplaces (Amazon, Etsy…)", "On marketplaces (Amazon, Etsy…)"),
      p("otherShop", "En otra tienda online que quiero cambiar", "In another online store I want to replace", [80, 160], [
        "Migramos productos, clientes y pedidos",
        "We move products, customers and orders",
      ]),
      none("nowhere", "Todavía en ningún sitio", "Nowhere yet"),
    ],
  },
  brand([60, 100], [150, 250]),
  timing([80, 150]),
];

/* ── Custom ────────────────────────────────────────────────────────────── */

const custom: QuizQuestion[] = [
  {
    id: "kind",
    title: { es: "¿Qué quieres construir?", en: "What do you want to build?" },
    help: {
      es: "Elige lo que más se acerque. Los detalles los vemos juntos.",
      en: "Pick the closest one. We'll go through the details together.",
    },
    options: [
      p("clientApp", "Una app para mis clientes", "An app for my customers", undefined, ["Reservas, área privada, pedidos…", "Bookings, client area, orders…"]),
      p("internal", "Una herramienta para mi equipo", "A tool for my team", undefined, ["Gestión interna, automatizar tareas", "Internal management, automating tasks"]),
      p("platform", "Una plataforma o marketplace", "A platform or marketplace", [1000, 2000]),
      p("saas", "Un producto SaaS", "A SaaS product", [1500, 3000], ["Con usuarios y suscripciones", "With users and subscriptions"]),
      p("other", "Otra cosa", "Something else", [0, 1000]),
    ],
  },
  {
    id: "stage",
    title: { es: "¿En qué punto está el proyecto?", en: "Where is the project right now?" },
    help: {
      es: "Si es una idea, empezamos por definirla contigo antes de construir.",
      en: "If it's an idea, we start by defining it with you before building.",
    },
    options: [
      p("idea", "Es solo una idea", "It's just an idea", [300, 600]),
      p("defined", "Lo tengo definido o con diseños", "It's defined or has designs"),
      p("existing", "Ya existe algo y quiero rehacerlo o ampliarlo", "Something exists and I want to rebuild or extend it", [200, 800]),
    ],
  },
  {
    id: "platforms",
    title: { es: "¿Dónde se va a usar?", en: "Where will it be used?" },
    help: {
      es: "Una web funciona en cualquier dispositivo; una app de tienda (iOS/Android) es otro desarrollo.",
      en: "A web app works on any device; a store app (iOS/Android) is a separate build.",
    },
    options: [
      p("web", "En el navegador, móvil y ordenador", "In the browser, phone and desktop"),
      p("mobile", "Como app en App Store y Google Play", "As an app on the App Store and Google Play", [1500, 3000]),
      p("both", "Las dos cosas", "Both", [2000, 4000]),
    ],
  },
  {
    id: "users",
    title: { es: "¿Cuántas personas la usarán?", en: "How many people will use it?" },
    help: {
      es: "Cambia cómo se diseña la infraestructura y los permisos.",
      en: "It changes how the infrastructure and permissions are designed.",
    },
    options: [
      p("few", "Menos de 50", "Fewer than 50"),
      p("hundreds", "Entre 50 y 1.000", "Between 50 and 1,000", [200, 500]),
      p("many", "Más de 1.000", "More than 1,000", [500, 1200]),
    ],
  },
  {
    id: "features",
    title: { es: "¿Qué tiene que incluir?", en: "What does it need to include?" },
    help: pickAll,
    multi: true,
    options: [
      p("accounts", "Usuarios con login y roles", "User accounts with roles", [200, 400]),
      p("admin", "Panel de administración", "An admin dashboard", [300, 600]),
      p("payments", "Pagos o suscripciones", "Payments or subscriptions", [300, 500]),
      p("notifications", "Notificaciones por email o push", "Email or push notifications", [150, 300]),
      p("integrations", "Conexión con otras herramientas (API)", "Connections to other tools (API)", [300, 700]),
      p("ai", "Automatizaciones o IA", "Automations or AI", [400, 900]),
    ],
  },
  care,
  timing([300, 600]),
];

/* ── Plans ─────────────────────────────────────────────────────────────── */

type PlanQuiz = {
  /** Starting price in euros: the "Desde" on the card (Custom has none there). */
  base: number;
  /**
   * Where the estimate stops. Past it the range would mostly be noise — a
   * project with every box ticked gets quoted properly — so the form shows
   * "Desde …" instead of a figure that keeps climbing.
   */
  cap?: number;
  questions: QuizQuestion[];
};

const byPlan: Record<string, PlanQuiz> = {
  landing: { base: 199, cap: 499, questions: landing },
  business: { base: 499, cap: 990, questions: business },
  ecommerce: { base: 799, cap: 1690, questions: ecommerce },
  custom: { base: 1500, questions: custom },
};

export function getPlanQuiz(planId: string): QuizQuestion[] {
  return byPlan[planId]?.questions ?? [];
}

/** `open`: the range ran past the plan's cap, so only a floor is shown. */
export type Estimate = { min: number; max: number; open?: boolean };

/** Base price plus the cost of every answer still in play, as a range. */
export function estimatePlan(planId: string, answers: QuizAnswers): Estimate | null {
  const plan = byPlan[planId];
  if (!plan) return null;
  const live = pruneAnswers(answers, plan.questions);
  let min = plan.base;
  let max = plan.base;
  for (const q of activeQuestions(live, plan.questions)) {
    for (const opt of q.options) {
      if (!opt.cost || !(live[q.id] ?? []).includes(opt.id)) continue;
      const [lo, hi] = typeof opt.cost === "number" ? [opt.cost, opt.cost] : opt.cost;
      min += lo;
      max += hi;
    }
  }
  if (plan.cap && max > plan.cap) return { min: Math.min(min, plan.cap), max: plan.cap, open: true };
  return { min, max };
}

/** "199 €", "1.499 – 2.300 €", "Desde 990 €" / "€199", "€1,499 – €2,300", "From €990". */
export function formatEstimate({ min, max, open }: Estimate, locale: Locale) {
  const n = (v: number) =>
    String(v).replace(/\B(?=(\d{3})+(?!\d))/g, locale === "es" ? "." : ",");
  if (open) return locale === "en" ? `From €${n(min)}` : `Desde ${n(min)} €`;
  if (locale === "en") return min === max ? `€${n(min)}` : `€${n(min)} – €${n(max)}`;
  return min === max ? `${n(min)} €` : `${n(min)} – ${n(max)} €`;
}
