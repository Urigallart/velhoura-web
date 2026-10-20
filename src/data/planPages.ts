import type { Locale } from "@/i18n/locale";

/**
 * One page per plan, in addition to the quote form: what the plan is, what
 * it includes, what the studio needs from the client, an example, and the
 * usual questions. Everything explains the offer; nothing here promises
 * deadlines, results or guarantees the quotes do not state.
 *
 * What each card, tile and page of a plan looks like (colour, slug, tone) is
 * decided here, so the header menu, the pricing cards and the pages agree.
 */

export type PlanId = "landing" | "business" | "ecommerce" | "custom";
export const planIds: PlanId[] = ["landing", "business", "ecommerce", "custom"];

/** The colour each plan wears everywhere (same as the pricing cards). */
export const planColour: Record<PlanId, string> = {
  landing: "#ffe45c",
  business: "#ff7a45",
  ecommerce: "#7fd8ff",
  custom: "#c77dff",
};

/** The `[data-tone]` gradient for each plan's headline. */
export const planTone: Record<PlanId, "sun" | "coral" | "sky" | "violet"> = {
  landing: "sun",
  business: "coral",
  ecommerce: "sky",
  custom: "violet",
};

const slugs: Record<PlanId, { es: string; en: string }> = {
  landing: { es: "landing", en: "landing" },
  business: { es: "business", en: "business" },
  ecommerce: { es: "tienda-online", en: "online-shop" },
  custom: { es: "custom", en: "custom" },
};

export const planPath = (locale: Locale, id: string) => {
  const s = slugs[id as PlanId];
  if (!s) return locale === "en" ? "/en#pricing" : "/#pricing";
  return locale === "en" ? `/en/pricing/${s.en}` : `/precios/${s.es}`;
};

export function planIdFromSlug(locale: Locale, slug: string): PlanId | undefined {
  return planIds.find((id) => slugs[id][locale] === slug);
}

export const planSlugs = (locale: Locale) => planIds.map((id) => slugs[id][locale]);

type Text = { es: string; en: string };
const t = (es: string, en: string): Text => ({ es, en });

export type PlanPageCopy = {
  lines: { es: string[]; en: string[] };
  lead: Text;
  needs: Text[];
  /** The example shown on the page: which preview and what it is. */
  example: { brand: string; sector: Text };
  faqs: { q: Text; a: Text }[];
};

export const planPageCopy: Record<PlanId, PlanPageCopy> = {
  landing: {
    lines: {
      es: ["Tu presencia en internet,", "*en una sola página.*"],
      en: ["Your place online,", "*on a single page.*"],
    },
    lead: t(
      "Una página pensada para un único objetivo: que quien llega entienda qué ofreces y te contacte. Diseño propio, rápida y adaptada a móvil. Es el punto de partida más sencillo, y si el negocio crece se puede ampliar a una web completa.",
      "A page built for one goal: that whoever lands on it understands what you offer and gets in touch. Custom design, fast and made for mobile. It's the simplest place to start, and if the business grows it can become a full website.",
    ),
    needs: [
      t("Qué haces y a quién te diriges", "What you do and who you do it for"),
      t("Tu logotipo, si lo tienes (si no, lo hablamos)", "Your logo, if you have one (if not, we'll talk about it)"),
      t("Textos y fotos, si los tienes; si no, te ayudamos a prepararlos", "Copy and photos, if you have them; if not, we help you prepare them"),
      t("Un correo donde recibir los mensajes", "An email address where messages should arrive"),
    ],
    example: { brand: "Pulso", sector: t("App de entrenamiento · marca ficticia", "Training app · fictional brand") },
    faqs: [
      {
        q: t("¿Cuántas secciones tiene?", "How many sections does it have?"),
        a: t(
          "Una sola página con las secciones que necesites: presentación, qué ofreces, quién eres y contacto. Lo definimos contigo.",
          "A single page with the sections you need: introduction, what you offer, who you are and contact. We define it with you.",
        ),
      },
      {
        q: t("¿Puedo ampliarla más adelante?", "Can I grow it later?"),
        a: t(
          "Sí. Puedes pasar a una web con varias páginas cuando lo necesites; lo ya hecho se aprovecha.",
          "Yes. You can move to a multi-page website whenever you need to; what's already built is reused.",
        ),
      },
      {
        q: t("¿Incluye dominio y alojamiento?", "Does it include a domain and hosting?"),
        a: t(
          "No: se indican aparte en el presupuesto, junto con otros costes de terceros.",
          "No: they are listed separately in the quote, along with other third-party costs.",
        ),
      },
    ],
  },
  business: {
    lines: {
      es: ["Una web completa", "*para tu empresa.*"],
      en: ["A complete website", "*for your company.*"],
    },
    lead: t(
      "Varias páginas que cuentan quién eres, qué haces y cómo contactarte, con un panel para que cambies textos e imágenes tú mismo y preparada para aparecer en Google. Es el plan para negocios que quieren captar clientes de forma constante.",
      "Several pages that say who you are, what you do and how to reach you, with a panel so you can change texts and images yourself, and ready to show up on Google. It's the plan for businesses that want a steady flow of customers.",
    ),
    needs: [
      t("La estructura que imaginas (o la definimos juntos)", "The structure you have in mind (or we define it together)"),
      t("Logotipo e identidad, si existen", "Logo and identity, if they exist"),
      t("Textos e imágenes de cada página", "Copy and images for each page"),
      t("Acceso a las herramientas que quieras conectar: calendario, CRM…", "Access to the tools you want to connect: calendar, CRM…"),
    ],
    example: { brand: "Brisa", sector: t("Energía renovable · marca ficticia", "Renewable energy · fictional brand") },
    faqs: [
      {
        q: t("¿Puedo editar yo la web?", "Can I edit the website myself?"),
        a: t(
          "Sí. Con el panel de gestión de contenidos cambias textos, imágenes o noticias sin depender de nadie.",
          "Yes. With the content panel you change texts, images or news without depending on anyone.",
        ),
      },
      {
        q: t("¿Cuántas páginas incluye?", "How many pages does it include?"),
        a: t(
          "Las que tu negocio necesite: inicio, servicios, sobre vosotros, contacto… Se concreta en el presupuesto.",
          "As many as your business needs: home, services, about, contact… It's set out in the quote.",
        ),
      },
      {
        q: t("¿Y el mantenimiento?", "What about maintenance?"),
        a: t(
          "Es opcional y se paga aparte. Puedes encargarlo a nosotros o llevarlo tú; si prefieres lo segundo, te la entregamos lista y explicada.",
          "It's optional and billed separately. You can leave it to us or look after it yourself; if you prefer the latter, we hand it over ready and explained.",
        ),
      },
    ],
  },
  ecommerce: {
    lines: {
      es: ["Tu tienda online,", "*lista para vender.*"],
      en: ["Your online shop,", "*ready to sell.*"],
    },
    lead: t(
      "Catálogo, carrito y pago con Stripe en una tienda propia, con un panel para gestionar pedidos, inventario, envíos y descuentos. Para marcas y comercios que quieren vender por internet sin depender de un marketplace.",
      "Catalogue, cart and Stripe payments in a shop of your own, with a panel to manage orders, inventory, shipping and discounts. For brands and shops that want to sell online without relying on a marketplace.",
    ),
    needs: [
      t("Tus productos: nombres, fotos, descripciones y precios", "Your products: names, photos, descriptions and prices"),
      t("Cómo vas a cobrar y enviar", "How you'll get paid and ship"),
      t("Logotipo e identidad, si existen", "Logo and identity, if they exist"),
      t("Los datos legales de tu negocio para la tienda", "Your business's legal details for the shop"),
    ],
    example: { brand: "Kiko", sector: t("Zapatillas y ropa · marca ficticia", "Trainers and clothes · fictional brand") },
    faqs: [
      {
        q: t("¿Cómo cobro a mis clientes?", "How do I get paid?"),
        a: t(
          "Con Stripe, que permite pagar con tarjeta y otros métodos. El dinero va a tu cuenta.",
          "With Stripe, which supports card and other payment methods. The money goes to your account.",
        ),
      },
      {
        q: t("¿Puedo gestionar yo los pedidos?", "Can I manage orders myself?"),
        a: t(
          "Sí, desde un panel de administración con pedidos e inventario.",
          "Yes, from an admin panel with orders and inventory.",
        ),
      },
      {
        q: t("¿Cuántos productos puedo tener?", "How many products can I have?"),
        a: t(
          "El catálogo se dimensiona según lo que necesites; lo concretamos en el presupuesto.",
          "The catalogue is sized to what you need; we set it out in the quote.",
        ),
      },
    ],
  },
  custom: {
    lines: {
      es: ["Lo que no existe,", "*lo construimos.*"],
      en: ["What doesn't exist,", "*we build.*"],
    },
    lead: t(
      "Aplicaciones web, plataformas, SaaS o sistemas a medida, con bases de datos, integraciones por API y las funciones específicas que tu proyecto necesita. Se presupuesta según el alcance, después de entender qué quieres lograr.",
      "Web applications, platforms, SaaS or custom systems, with databases, API integrations and the specific features your project needs. It's quoted on scope, after we understand what you want to achieve.",
    ),
    needs: [
      t("Una descripción de lo que quieres conseguir", "A description of what you want to achieve"),
      t("Quién lo usará y cómo", "Who will use it and how"),
      t("Los sistemas con los que debe conectarse", "The systems it needs to connect to"),
      t("Prioridades: qué es imprescindible y qué puede esperar", "Priorities: what's essential and what can wait"),
    ],
    example: { brand: "Cadence", sector: t("SaaS logístico · marca ficticia", "Logistics SaaS · fictional brand") },
    faqs: [
      {
        q: t("¿Cuánto cuesta?", "How much does it cost?"),
        a: t(
          "Depende del alcance: te enviamos una propuesta por escrito con el precio antes de empezar.",
          "It depends on scope: we send a written proposal with the price before we start.",
        ),
      },
      {
        q: t("¿Puedo empezar por una parte?", "Can I start with a part?"),
        a: t(
          "Sí. Solemos recomendar empezar por lo esencial y ampliar después.",
          "Yes. We usually recommend starting with the essentials and growing from there.",
        ),
      },
      {
        q: t("¿Qué tecnologías usáis?", "What technologies do you use?"),
        a: t(
          "React y Next.js, con bases de datos y APIs según el proyecto.",
          "React and Next.js, with databases and APIs depending on the project.",
        ),
      },
    ],
  },
};

export const planUi = {
  breadcrumb: t("Precios", "Pricing"),
  includes: { es: ["Todo lo que", "*incluye.*"], en: ["Everything", "*included.*"] },
  ideal: { es: ["Es para ti", "*si…*"], en: ["It's for you", "*if…*"] },
  needsTitle: t("Qué necesitamos de ti", "What we need from you"),
  needsLead: t("Para empezar basta con una conversación. Cuanto de esto tengas a mano, más rápido avanzamos.", "A conversation is enough to start. The more of this you have at hand, the faster we go."),
  example: { es: ["Un ejemplo", "*de este plan.*"], en: ["An example", "*of this plan.*"] },
  process: { es: ["Cómo", "*lo hacemos.*"], en: ["How", "*we do it.*"] },
  priceTitle: t("Precio", "Price"),
  askPrice: t("Quiero este plan", "I want this plan"),
  seeIncluded: t("Qué incluye", "What's included"),
  faq: { es: ["Dudas", "*habituales.*"], en: ["Common", "*questions.*"] },
  others: { es: ["Otros", "*planes.*"], en: ["Other", "*plans.*"] },
  closeLines: { es: ["Hablemos de", "*tu proyecto.*"], en: ["Let's talk about", "*your project.*"] },
  closeLead: t("Cuéntanos qué necesitas y te enviamos una propuesta por escrito.", "Tell us what you need and we'll send you a written proposal."),
  prefill: (name: string, locale: Locale) =>
    locale === "en" ? `Hi, I'm interested in the ${name} plan.` : `Hola, me interesa el plan ${name}.`,
  mainPrices: t("Ver todos los precios", "See all prices"),
  menuBlurb: t("Precios orientativos, sin sorpresas.", "Indicative prices, no surprises."),
  fullPage: t("Ver página completa", "See the full page"),
};
