/**
 * Web development plans (the studio's second line of business).
 * Edit here — `PricingCard` renders whatever this array contains.
 */

export type Plan = {
  id: string;
  index: string;
  name: string;
  pitch: string;
  features: string[];
  /**
   * Split from the figure so the two can be set differently: the qualifier
   * stays small and mono, the number gets the display scale. A price that
   * reads as one run-on string is a price nobody scans.
   */
  pricePrefix?: string;
  price: string;
  priceNote?: string;
  cta: string;
  /** Exactly one plan should carry this. */
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "landing",
    index: "01",
    name: "Landing",
    pitch:
      "Para profesionales, proyectos y negocios que necesitan una presencia digital sencilla y potente.",
    features: [
      "Diseño personalizado",
      "Responsive",
      "Animaciones",
      "SEO básico",
      "Formulario de contacto",
      "Optimización de velocidad",
    ],
    pricePrefix: "Desde",
    price: "199 €",
    priceNote: "Precio orientativo",
    cta: "Quiero mi web",
  },
  {
    id: "business",
    index: "02",
    name: "Business",
    pitch: "Para empresas que necesitan una web más completa.",
    features: [
      "Diseño personalizado",
      "Varias páginas",
      "Responsive",
      "Animaciones avanzadas",
      "SEO",
      "Formularios",
      "Integraciones",
      "Panel / gestión de contenido",
    ],
    pricePrefix: "Desde",
    price: "499 €",
    priceNote: "Precio orientativo",
    cta: "Quiero mi web",
    featured: true,
  },
  {
    id: "ecommerce",
    index: "03",
    name: "Tienda Online",
    pitch: "Para negocios que quieren vender online con una tienda propia.",
    features: [
      "Catálogo y fichas de producto",
      "Carrito y checkout",
      "Pagos con Stripe",
      "Gestión de pedidos e inventario",
      "Panel de administración",
      "Envíos y descuentos",
    ],
    pricePrefix: "Desde",
    price: "799 €",
    priceNote: "Precio orientativo",
    cta: "Quiero mi tienda",
  },
  {
    id: "custom",
    index: "04",
    name: "Custom",
    pitch: "Para proyectos que necesitan algo completamente personalizado.",
    features: [
      "Aplicaciones web",
      "Plataformas",
      "SaaS",
      "Sistemas personalizados",
      "Integraciones API",
      "Bases de datos",
      "Funcionalidades específicas",
    ],
    price: "Hablemos",
    priceNote: "Presupuesto a medida",
    cta: "Contactar",
  },
];

/**
 * Optional maintenance once a site is live, billed monthly and separately
 * from the project. The figure is a floor: the exact fee depends on the site
 * and goes in each proposal. Every mention on the site reads from here.
 */
export const maintenance = {
  /** Monthly starting price, in euros. */
  from: 29,
  includes: {
    es: [
      "Actualizaciones y parches de seguridad",
      "Copias de seguridad periódicas",
      "Vigilamos que la web siga en línea",
      "Pequeños cambios de textos e imágenes",
      "Soporte por email cuando lo necesites",
    ],
    en: [
      "Updates and security patches",
      "Regular backups",
      "We keep an eye on the site staying online",
      "Small text and image changes",
      "Email support whenever you need it",
    ],
  },
};

/** "29 €/mes" / "€29/month". */
export const maintenancePrice = (locale: "es" | "en") =>
  locale === "en" ? `€${maintenance.from}/month` : `${maintenance.from} €/mes`;
