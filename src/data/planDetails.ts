import type { Locale } from "@/i18n/locale";

/**
 * What opens when a visitor clicks a pricing card: who the plan is for, what
 * each included item actually means, and what the price leaves out.
 *
 * Kept separate from `plans.ts` so the cards stay short — the card is the
 * summary, this is the detail. Everything here explains the offer; it does
 * not add promises (deadlines, guarantees) beyond what each quote states.
 * "Not included" mirrors the terms and conditions.
 */

type Detail = {
  idealFor: string[];
  includes: { title: string; body: string }[];
};

type ById = Record<string, Detail>;

const es: ById = {
  landing: {
    idealFor: [
      "Profesionales y autónomos que necesitan estar en internet",
      "Lanzar un producto, servicio o evento",
      "Validar una idea antes de invertir más",
    ],
    includes: [
      { title: "Diseño personalizado", body: "Una página hecha para tu negocio, no una plantilla genérica." },
      { title: "Adaptada a móvil", body: "Se ve y funciona bien en móvil, tablet y ordenador." },
      { title: "Animaciones", body: "Movimiento sutil que hace la página más atractiva sin distraer." },
      { title: "SEO básico", body: "Títulos, descripciones y estructura para que Google entienda tu web." },
      { title: "Formulario de contacto", body: "Los mensajes de tus clientes llegan directamente a tu correo." },
      { title: "Carga rápida", body: "Optimizada para abrir en segundos, también con mala conexión." },
    ],
  },
  business: {
    idealFor: [
      "Empresas que quieren explicar varios servicios",
      "Negocios que necesitan captar clientes de forma constante",
      "Quien quiere actualizar contenidos sin depender de nadie",
    ],
    includes: [
      { title: "Diseño personalizado", body: "Identidad visual coherente en todas las páginas." },
      { title: "Varias páginas", body: "Inicio, servicios, sobre vosotros, contacto y lo que tu negocio necesite." },
      { title: "Adaptada a móvil", body: "Cada página pensada para verse bien en cualquier pantalla." },
      { title: "Animaciones avanzadas", body: "Transiciones y efectos que dan a la web un acabado premium." },
      { title: "SEO", body: "Cada página preparada para posicionar por lo que buscan tus clientes." },
      { title: "Formularios", body: "Contacto, presupuestos o reservas, según lo que necesites." },
      { title: "Integraciones", body: "Conexión con las herramientas que ya usas: calendario, mapas, redes, CRM…" },
      { title: "Gestión de contenidos", body: "Un panel para cambiar textos, imágenes o noticias tú mismo." },
    ],
  },
  ecommerce: {
    idealFor: [
      "Marcas que quieren vender sus productos online",
      "Tiendas físicas que quieren abrir un canal de venta por internet",
      "Quien vende por redes o marketplaces y quiere su propia tienda",
    ],
    includes: [
      { title: "Catálogo y fichas de producto", body: "Fotos, variantes (tallas, colores), precios y descripciones." },
      { title: "Carrito y checkout", body: "Un proceso de compra claro y rápido, pensado para que no se abandone." },
      { title: "Pagos con Stripe", body: "Tarjeta, Apple Pay y Google Pay, con cobros seguros." },
      { title: "Pedidos e inventario", body: "Sigue cada pedido y controla el stock desde un solo sitio." },
      { title: "Panel de administración", body: "Añade productos, cambia precios y gestiona la tienda sin ayuda." },
      { title: "Envíos y descuentos", body: "Tarifas de envío, códigos promocionales y ofertas." },
    ],
  },
  custom: {
    idealFor: [
      "Proyectos que no encajan en una web estándar",
      "Negocios que quieren automatizar procesos internos",
      "Startups que necesitan un primer producto (MVP)",
    ],
    includes: [
      { title: "Aplicaciones web", body: "Herramientas que se usan desde el navegador, sin instalar nada." },
      { title: "Plataformas", body: "Áreas de clientes, reservas, membresías o marketplaces." },
      { title: "SaaS", body: "Productos digitales con usuarios, suscripciones y panel propio." },
      { title: "Sistemas a medida", body: "Software adaptado a cómo trabaja tu equipo, no al revés." },
      { title: "Integraciones API", body: "Conectamos tu sistema con otras herramientas y servicios." },
      { title: "Bases de datos", body: "Tu información organizada, segura y fácil de consultar." },
      { title: "Funcionalidades específicas", body: "Lo que tu proyecto necesite, diseñado desde cero." },
    ],
  },
};

const en: ById = {
  landing: {
    idealFor: [
      "Professionals and freelancers who need to be online",
      "Launching a product, service or event",
      "Testing an idea before investing more",
    ],
    includes: [
      { title: "Custom design", body: "A page made for your business, not a generic template." },
      { title: "Mobile-ready", body: "Looks and works well on phone, tablet and desktop." },
      { title: "Animations", body: "Subtle motion that makes the page engaging without distracting." },
      { title: "Basic SEO", body: "Titles, descriptions and structure so Google understands your site." },
      { title: "Contact form", body: "Messages from your customers land straight in your inbox." },
      { title: "Fast loading", body: "Optimised to open in seconds, even on a poor connection." },
    ],
  },
  business: {
    idealFor: [
      "Companies that need to explain several services",
      "Businesses that want a steady flow of new customers",
      "Anyone who wants to update content without relying on others",
    ],
    includes: [
      { title: "Custom design", body: "A consistent visual identity across every page." },
      { title: "Several pages", body: "Home, services, about, contact and whatever your business needs." },
      { title: "Mobile-ready", body: "Every page designed to look right on any screen." },
      { title: "Advanced animations", body: "Transitions and effects that give the site a premium finish." },
      { title: "SEO", body: "Each page prepared to rank for what your customers search." },
      { title: "Forms", body: "Contact, quotes or bookings, whatever you need." },
      { title: "Integrations", body: "Connected to the tools you already use: calendar, maps, social, CRM…" },
      { title: "Content management", body: "A dashboard to change text, images or news yourself." },
    ],
  },
  ecommerce: {
    idealFor: [
      "Brands that want to sell their products online",
      "Physical shops opening an online sales channel",
      "Sellers on social media or marketplaces who want their own store",
    ],
    includes: [
      { title: "Catalogue and product pages", body: "Photos, variants (sizes, colours), prices and descriptions." },
      { title: "Cart and checkout", body: "A clear, quick purchase flow designed to keep buyers from dropping off." },
      { title: "Payments with Stripe", body: "Cards, Apple Pay and Google Pay, with secure payments." },
      { title: "Orders and stock", body: "Track every order and manage inventory from one place." },
      { title: "Admin dashboard", body: "Add products, change prices and run the store on your own." },
      { title: "Shipping and discounts", body: "Shipping rates, promo codes and offers." },
    ],
  },
  custom: {
    idealFor: [
      "Projects that don't fit a standard website",
      "Businesses that want to automate internal processes",
      "Startups that need a first product (MVP)",
    ],
    includes: [
      { title: "Web applications", body: "Tools used from the browser, with nothing to install." },
      { title: "Platforms", body: "Client portals, bookings, memberships or marketplaces." },
      { title: "SaaS", body: "Digital products with users, subscriptions and their own dashboard." },
      { title: "Custom systems", body: "Software shaped around how your team works, not the other way round." },
      { title: "API integrations", body: "We connect your system with other tools and services." },
      { title: "Databases", body: "Your information organised, secure and easy to query." },
      { title: "Specific features", body: "Whatever your project needs, designed from scratch." },
    ],
  },
};

export function getPlanDetail(id: string, locale: Locale): Detail | undefined {
  return (locale === "en" ? en : es)[id];
}

export const detailCopy = {
  es: {
    idealFor: "Ideal para",
    includes: "Qué incluye",
    notIncluded:
      "El precio no incluye IVA ni costes de terceros como dominio, alojamiento o licencias, que se indican aparte en el presupuesto. El mantenimiento una vez publicada la web es opcional y se paga aparte, con una cuota mensual.",
    seeMore: "Ver qué incluye",
    close: "Cerrar",
    cta: "Quiero este plan",
    chosen: "Plan elegido",
    estimateShown: "Precio estimado que vio en la web",
    formIntro: (name: string) => `Plan ${name}`,
    sendError: "No se pudo enviar el formulario.",
    sentLabel: "Enviado",
    sentTitle: "Solicitud recibida.",
    sentBody: (name: string) =>
      `Gracias. Revisamos lo que nos has contado sobre tu proyecto ${name} y te enviamos un presupuesto al correo que nos has dejado, normalmente en uno o dos días.`,
  },
  en: {
    idealFor: "Ideal for",
    includes: "What's included",
    notIncluded:
      "The price excludes VAT and third-party costs such as domain, hosting or licences, which are listed separately in the quote. Maintenance once the site is live is optional and billed separately, as a monthly fee.",
    seeMore: "See what's included",
    close: "Close",
    cta: "I want this plan",
    chosen: "Chosen plan",
    estimateShown: "Estimated price shown on the site",
    formIntro: (name: string) => `${name} plan`,
    sendError: "The form could not be sent.",
    sentLabel: "Sent",
    sentTitle: "Request received.",
    sentBody: (name: string) =>
      `Thank you. We'll go through what you've told us about your ${name} project and send a quote to the email you left, usually within a day or two.`,
  },
};
