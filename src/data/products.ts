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
  /**
   * The longer story on the product page, as short titled blocks: the
   * problem, what was built, and how it works. Facts only — nothing here
   * should claim users, revenue or results the product does not have.
   */
  story?: { title: string; body: string }[];
  /**
   * Real screens for the product page. "phone" shots are portrait captures
   * of a mobile layout (shown in a row); "desktop" ones are full-width.
   */
  gallery?: { src: string; kind: "phone" | "desktop"; caption: string }[];
  /** What it is built with, as shown on the product page. */
  stack?: string[];
  /** Gradient for the product page headings and glows — one of the `[data-tone]` palettes in globals.css. */
  tone?: "sky" | "violet" | "coral" | "green" | "teal" | "sun";
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
    tone: "violet",
    story: [
      {
        title: "El reto",
        body: "Preparar el teórico del carné suele ser repasar tests sueltos hasta memorizarlos. Se aprueba a base de repetir, se olvida igual de rápido y cuesta mantener la constancia durante semanas.",
      },
      {
        title: "Qué construimos",
        body: "Una app que organiza el temario como un camino: nueve temas divididos en lecciones cortas, con 247 preguntas al estilo del examen oficial y cada respuesta explicada. Al fallar, la pregunta se guarda en «Mis errores» para repasarla después.",
      },
      {
        title: "Cómo engancha",
        body: "La repetición espaciada vuelve a preguntarte lo que estás a punto de olvidar. Encima, una capa de juego: experiencia y niveles, rachas diarias, misiones, un reto del día, una mascota que acompaña y un indicador de lo preparado que estás para el examen real.",
      },
      {
        title: "Producto completo",
        body: "Cuentas de usuario, progreso sincronizado entre dispositivos, suscripción premium con Stripe y notificaciones. Se instala en el móvil como una app, sin pasar por las tiendas.",
      },
    ],
    gallery: [
      { src: "/products/roady/home.jpg", kind: "phone", caption: "Inicio: progreso hacia el examen y el tema en curso" },
      { src: "/products/roady/home-path.jpg", kind: "phone", caption: "El camino de lecciones, con el reto del día y recompensas" },
      { src: "/products/roady/feedback.jpg", kind: "phone", caption: "Cada respuesta se explica, con un tutor para dudas" },
      { src: "/products/roady/onboarding.jpg", kind: "phone", caption: "Primeros pasos guiados por la mascota" },
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase", "Stripe", "PWA"],
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
    tone: "sky",
    story: [
      {
        title: "El reto",
        body: "Mucha gente apunta sus entrenamientos en una libreta o en notas del móvil. Funciona hasta que quieres saber si estás progresando, qué peso usaste la última vez o qué músculo llevas días sin trabajar.",
      },
      {
        title: "Qué construimos",
        body: "Una app de entrenamiento completa: rutinas por días de la semana, registro de series, repeticiones y peso, y una biblioteca propia de 642 ejercicios con su técnica y los músculos que trabajan. Cada ejercicio guarda tu historial, tu mejor marca y tu 1RM estimado.",
      },
      {
        title: "Cómo ayuda a progresar",
        body: "Cada día propone un reto concreto a partir de tus últimas sesiones, como superar por una repetición tu marca anterior. Las estadísticas muestran qué grupos musculares has trabajado sobre un modelo anatómico en 3D que puedes girar.",
      },
      {
        title: "Constancia, con amigos",
        body: "Logros desbloqueables, objetivos, seguimiento del peso corporal con fotos de progreso y retos con amigos para comparar quién entrena más.",
      },
    ],
    gallery: [
      { src: "/products/gym-tracker/dashboard.jpg", kind: "phone", caption: "Hoy: el entrenamiento que toca y el reto del día" },
      { src: "/products/gym-tracker/stats.jpg", kind: "phone", caption: "Estadísticas sobre un modelo anatómico en 3D" },
      { src: "/products/gym-tracker/exercise.jpg", kind: "phone", caption: "Ficha de ejercicio con marcas y evolución" },
      { src: "/products/gym-tracker/library.jpg", kind: "phone", caption: "Biblioteca de 642 ejercicios, filtrable por músculo" },
      { src: "/products/gym-tracker/my-routine.jpg", kind: "phone", caption: "La rutina repartida en la semana" },
      { src: "/products/gym-tracker/achievements.jpg", kind: "phone", caption: "Logros que premian la constancia" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Three.js", "Recharts", "PWA"],
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
    tone: "sun",
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
    tone: "coral",
    story: [
      {
        title: "El punto de partida",
        body: "Una marca de ropa de gimnasio que todavía no ha lanzado su primera colección necesita algo antes que una tienda: una identidad reconocible y una forma de reunir a la gente que quiere estar el primer día.",
      },
      {
        title: "Qué construimos",
        body: "La identidad de la marca y una web de lanzamiento: una sola pantalla con fotografía de producto, el mensaje «the next drop is coming» y un aviso para enterarse del lanzamiento. Ligera, rápida y tan cuidada en el móvil como en el ordenador.",
      },
      {
        title: "Lo que viene",
        body: "La marca funcionará por drops, colecciones limitadas que salen en fechas concretas. Cuando llegue el primero, la web crecerá hacia una tienda online completa.",
      },
    ],
    gallery: [
      { src: "/products/zhestar/home.jpg", kind: "desktop", caption: "La portada de la tienda, preparada para el primer drop" },
      { src: "/products/zhestar/mobile.jpg", kind: "phone", caption: "La web de lanzamiento en móvil" },
    ],
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
    tone: "teal",
    story: [
      {
        title: "El reto",
        body: "Un equipo de diseño que trabaja con producto, luz y energía necesitaba contar su trabajo con la misma calma y precisión con la que diseña: sin ruido, dejando que los productos y las ideas hablen solos.",
      },
      {
        title: "Qué construimos",
        body: "Una web editorial. Abre con un mensaje claro y cuatro cifras que resumen el equipo, sigue con las últimas historias del estudio y la filosofía de trabajo, y termina con los premios recibidos y las personas detrás del diseño.",
      },
      {
        title: "Los detalles",
        body: "Tipografía grande y mucho aire, una paleta de azules fríos y grises, y una sección de premios donde las piezas se abren en abanico.",
      },
    ],
    gallery: [
      { src: "/products/simon-design/hero.jpg", kind: "desktop", caption: "Portada: el mensaje del equipo" },
      { src: "/products/simon-design/stories.jpg", kind: "desktop", caption: "Cifras de un vistazo y las últimas historias" },
      { src: "/products/simon-design/awards.jpg", kind: "desktop", caption: "Premios, con las piezas en abanico" },
      { src: "/products/simon-design/philosophy.jpg", kind: "desktop", caption: "La filosofía de trabajo" },
      { src: "/products/simon-design/team.jpg", kind: "desktop", caption: "Las personas detrás del diseño" },
    ],
  },
  {
    slug: "maria-del-mar",
    name: "Mª del Mar",
    summary:
      "Web para una psicopedagoga y coach de Barcelona: dos líneas de acompañamiento, en catalán y castellano.",
    description:
      "La web de Maria del Mar, psicopedagoga y coach en Barcelona (Sarrià–Sant Gervasi). Presenta sus dos líneas de acompañamiento —coaching y consultas puntuales para jóvenes y adultos, e intervención psicopedagógica para niños y adolescentes—, quién es ella, el espacio donde atiende y los testimonios de las personas que ha acompañado. Está en catalán y en castellano.",
    category: "WEB",
    status: "LIVE",
    year: "2026",
    highlights: [
      "Web en catalán y castellano",
      "Dos líneas de acompañamiento",
      "Sobre ella y su espacio en Barcelona",
      "Contacto directo desde cada página",
    ],
    href: "https://mmarcoach.com/ca",
    accent: "#4e8276",
    image: "/products/maria-del-mar.jpg",
    tone: "green",
    story: [
      {
        title: "El punto de partida",
        body: "Una profesional con más de veinticinco años acompañando a niños, jóvenes y familias necesitaba una web que transmitiera lo que ella transmite en consulta: calma, cercanía y claridad, para que quien llega sepa enseguida qué línea de trabajo le encaja.",
      },
      {
        title: "Qué construimos",
        body: "Una web para su negocio en Barcelona, en catalán y castellano. Abre con un mensaje claro y las dos líneas de acompañamiento, sigue con quién es ella y las fotografías de su espacio, y termina con los testimonios y un botón de contacto siempre a mano.",
      },
      {
        title: "Los detalles",
        body: "Una identidad propia con su logotipo y un verde suave, tipografía grande, mucho aire y fotografías reales de la consulta, para que la web se sienta tan cercana como ella.",
      },
    ],
    gallery: [
      { src: "/products/maria-del-mar/hero.jpg", kind: "desktop", caption: "Portada: el mensaje y las dos líneas de trabajo" },
      { src: "/products/maria-del-mar/lines.jpg", kind: "desktop", caption: "Dos líneas de acompañamiento, una misma mirada" },
      { src: "/products/maria-del-mar/about.jpg", kind: "desktop", caption: "Sobre ella, con cifras de un vistazo" },
      { src: "/products/maria-del-mar/space.jpg", kind: "desktop", caption: "Su espacio en Barcelona" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
