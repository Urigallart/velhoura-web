/**
 * Velhoura's own products.
 *
 * This array is the single source of truth for the Products section and for
 * the /products/[slug] pages. Adding a product = appending an entry here.
 * Nothing in the layout is hardcoded to a fixed number of products.
 */

export type ProductCategory = "APP" | "SAAS" | "PLATFORM" | "WEB";
export type ProductStatus = "BUILDING" | "LIVE" | "COMING SOON";

export type Product = {
  /** URL segment for /products/[slug] */
  slug: string;
  /** Display name */
  name: string;
  /** One line, shown on the card */
  summary: string;
  /** Two or three sentences, shown on the product page */
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  /** Year the build started */
  year: string;
  /** Short capability list for the product page */
  highlights: string[];
  /** External product site, once it exists */
  href?: string;
  /**
   * Visual identity for the card's generated artwork. Any CSS color.
   * Kept subtle — the cards are paper, not posters.
   */
  accent: string;
  /**
   * A real screenshot of the product, in `public/`. When present, the card
   * and product page show this instead of the generated `ProductGlyph` —
   * leave unset for a product that doesn't have a live UI to show yet.
   */
  image?: string;
};

export const products: Product[] = [
  {
    slug: "roady",
    name: "Roady",
    summary:
      "Preparación del examen teórico del permiso B, con repetición espaciada y gamificación.",
    description:
      "Roady convierte el temario del permiso B en un sistema de estudio diario: preguntas al estilo del examen real, repetición espaciada para no olvidar lo aprendido, y una capa de progreso y rachas que mantiene la constancia sin que se sienta como una obligación.",
    category: "APP",
    status: "LIVE",
    year: "2026",
    highlights: [
      "Banco de preguntas estilo examen oficial",
      "Repetición espaciada",
      "Rachas y progreso gamificado",
      "Cuenta y suscripción con Stripe",
    ],
    href: "https://drivy-rho.vercel.app/",
    accent: "#e8a13a",
    image: "/products/roady.jpg",
  },
  {
    slug: "gym-tracker",
    name: "Gym Tracker",
    summary:
      "Registro de entrenamientos con biblioteca de ejercicios, logros y retos entre amigos.",
    description:
      "Gym Tracker lleva el cuaderno de gimnasio a una app real: series, repeticiones y peso por ejercicio, una biblioteca propia de ejercicios, calendario de progreso, logros desbloqueables y retos para comparar constancia con amigos.",
    category: "APP",
    status: "LIVE",
    year: "2026",
    highlights: [
      "Biblioteca de ejercicios propia (RepDB)",
      "Calendario y progreso por sesión",
      "Logros y retos entre amigos",
      "Asistente con IA local",
    ],
    href: "https://gym-tracker-teal-xi.vercel.app/",
    accent: "#ef5b3f",
    image: "/products/gym-tracker.jpg",
  },
  {
    slug: "velhoura-eyewear",
    name: "Velhoura",
    summary: "Marca propia de gafas de sol: tienda online, catálogo y checkout completo.",
    description:
      "Velhoura es nuestra propia marca de gafas de sol, construida como una tienda online completa: catálogo curado, fichas de producto, checkout y la operativa de una marca D2C real — un ejemplo de cómo llevamos un producto de la idea a la venta.",
    category: "WEB",
    status: "LIVE",
    year: "2025",
    highlights: [
      "Catálogo y fichas de producto",
      "Checkout y gestión de pedidos",
      "Identidad de marca propia",
      "Envíos y devoluciones",
    ],
    href: "https://velhoura.com/",
    accent: "#171717",
    image: "/products/velhoura-eyewear.jpg",
  },
  {
    slug: "zhestar",
    name: "Zhestar",
    summary: "Marca de ropa de gym en preparación — la web del primer drop, en cuenta atrás.",
    description:
      "Zhestar es una marca de ropa de gym en construcción. La web actual presenta el primer drop (\"Drop 001\") antes de su lanzamiento, sentando la identidad de marca y la mecánica de lanzamiento por colecciones limitadas que seguirá creciendo con cada drop.",
    category: "WEB",
    status: "COMING SOON",
    year: "2026",
    highlights: [
      "Identidad de marca",
      "Ropa técnica de entrenamiento",
      "Mecánica de drops limitados",
    ],
    href: "https://www.zhestar.es/",
    accent: "#dc2626",
    image: "/products/zhestar.jpg",
  },
  {
    slug: "simon-design",
    name: "Simon Design",
    summary:
      "Web editorial para un equipo de diseño: cifras, historias, filosofía, premios y equipo.",
    description:
      "Simon Design es una web editorial para un equipo de diseño de producto, luz y energía. Una portada con un mensaje claro y cifras de un vistazo, una sección de historias del estudio, la filosofía de trabajo, los premios recibidos y las personas del equipo, con una tipografía y un ritmo pensados para leerse con calma.",
    category: "WEB",
    status: "LIVE",
    year: "2026",
    highlights: [
      "Portada editorial con cifras",
      "Historias del estudio",
      "Filosofía, premios y equipo",
    ],
    href: "https://simondesign.vercel.app/",
    accent: "#0ea5e9",
    image: "/products/simon-design.jpg",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
