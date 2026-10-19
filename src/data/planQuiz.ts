import { o, only, quiz, type QuizQuestion } from "./quiz";

/**
 * The short form behind each pricing card. Someone who clicks "Quiero mi
 * tienda" has already said what they want, so instead of the full project
 * questionnaire (which starts with "what would you like to build?") they get
 * four questions that only make sense for that plan, then their details.
 *
 * Same shape as `quiz.ts`, rendered by the same `ProjectQuiz` component.
 */

const timing = quiz.find((q) => q.id === "timing")!;
const budget = quiz.find((q) => q.id === "budget")!;

const landing: QuizQuestion[] = [
  {
    id: "landingPurpose",
    title: { es: "¿Para qué es la landing?", en: "What is the landing page for?" },
    help: {
      es: "Una página que presenta un negocio y una que lanza una campaña se construyen distinto.",
      en: "A page that introduces a business and one that launches a campaign are built differently.",
    },
    options: [
      o("present", "Presentar mi negocio o mis servicios", "Introduce my business or services"),
      o("launch", "Lanzar un producto o servicio nuevo", "Launch a new product or service"),
      o("event", "Un evento o una campaña concreta", "An event or a specific campaign"),
      o("validate", "Validar una idea antes de invertir más", "Test an idea before investing more"),
    ],
  },
  {
    id: "landingContent",
    title: { es: "¿Tienes ya los textos y las imágenes?", en: "Do you already have the copy and images?" },
    help: {
      es: "Si no, te ayudamos a prepararlos. Solo queremos saber de dónde partimos.",
      en: "If not, we'll help you put them together. We just want to know where we're starting.",
    },
    options: [
      o("ready", "Sí, lo tengo todo", "Yes, I have everything"),
      o("partial", "Tengo una parte", "I have some of it"),
      o("none", "No, necesito ayuda con eso", "No, I need help with that"),
    ],
  },
  {
    id: "domain",
    title: { es: "¿Tienes dominio?", en: "Do you have a domain?" },
    help: {
      es: "El dominio es la dirección de tu web, tipo tunegocio.com.",
      en: "The domain is your site's address, like yourbusiness.com.",
    },
    options: [
      o("yes", "Sí, ya lo tengo", "Yes, I already have one"),
      o("no", "No, necesito uno", "No, I need one"),
      o("unsure", "No estoy seguro", "I'm not sure"),
    ],
  },
  timing,
];

const business: QuizQuestion[] = [
  {
    id: "pages",
    title: { es: "¿Cuántas páginas calculas que tendrá?", en: "How many pages do you think it will have?" },
    help: {
      es: "Por ejemplo: inicio, servicios, sobre nosotros, contacto… Una aproximación es suficiente.",
      en: "For example: home, services, about, contact… A rough idea is enough.",
    },
    options: [
      o("3-5", "Entre 3 y 5", "3 to 5"),
      o("6-10", "Entre 6 y 10", "6 to 10"),
      o("10+", "Más de 10", "More than 10"),
      o("unknown", "No lo sé, ayudadme a decidirlo", "Not sure, help me decide"),
    ],
  },
  {
    id: "businessFeatures",
    title: { es: "¿Qué tiene que poder hacer la web?", en: "What should the website be able to do?" },
    help: { es: "Puedes elegir varias.", en: "Pick as many as you like." },
    multi: true,
    options: [
      o("leads", "Recibir contactos y peticiones de presupuesto", "Receive enquiries and quote requests"),
      o("booking", "Reservas o citas online", "Online bookings or appointments"),
      o("blog", "Blog o noticias que actualice yo", "A blog or news I update myself"),
      o("portfolio", "Mostrar proyectos o trabajos", "Show projects or past work"),
      o("languages", "Varios idiomas", "Several languages"),
    ],
  },
  {
    id: "currentSite",
    title: { es: "¿Tienes web ahora mismo?", en: "Do you have a website right now?" },
    help: {
      es: "Si ya existe, partimos de lo que funciona en vez de empezar de cero.",
      en: "If there is one, we build on what works instead of starting from zero.",
    },
    options: [
      o("none", "No, todavía no", "No, not yet"),
      o("outdated", "Sí, pero se ha quedado anticuada", "Yes, but it's outdated"),
      o("works", "Sí, funciona pero quiero más", "Yes, it works but I want more"),
      o("social", "Solo tengo redes sociales", "I only have social media"),
    ],
  },
  timing,
];

const ecommerce: QuizQuestion[] = [
  {
    id: "productType",
    title: { es: "¿Qué vas a vender?", en: "What will you sell?" },
    help: { es: "Puedes elegir varias.", en: "Pick as many as you like." },
    multi: true,
    options: [
      o("physical", "Productos físicos", "Physical products"),
      o("digital", "Productos digitales", "Digital products", ["Descargas, cursos, plantillas", "Downloads, courses, templates"]),
      o("services", "Servicios o reservas", "Services or bookings"),
      o("subscriptions", "Suscripciones", "Subscriptions"),
    ],
  },
  {
    id: "catalogSize",
    title: { es: "¿Cuántos productos tendrás?", en: "How many products will you have?" },
    help: {
      es: "Cambia mucho cómo se organiza la tienda y cómo se gestiona el stock.",
      en: "It changes a lot how the store is organised and stock is managed.",
    },
    options: [
      o("few", "Menos de 20", "Fewer than 20"),
      o("some", "Entre 20 y 200", "Between 20 and 200"),
      o("many", "Más de 200", "More than 200"),
      o("unknown", "Todavía no lo sé", "I don't know yet"),
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
      o("local", "Solo a mi ciudad o recogida en tienda", "Just my city or in-store pickup"),
      o("spain", "A toda España", "All of Spain"),
      o("intl", "Europa o internacional", "Europe or international"),
    ],
  },
  {
    id: "sellingNow",
    title: { es: "¿Dónde vendes ahora mismo?", en: "Where do you sell right now?" },
    help: { es: "Puedes elegir varias.", en: "Pick as many as you like." },
    multi: true,
    options: [
      o("store", "En tienda física", "In a physical store"),
      o("marketplaces", "En marketplaces (Amazon, Etsy…)", "On marketplaces (Amazon, Etsy…)"),
      o("social", "Por redes sociales o WhatsApp", "Through social media or WhatsApp"),
      only("nowhere", "Todavía en ningún sitio", "Nowhere yet"),
    ],
  },
  timing,
];

const custom: QuizQuestion[] = [
  {
    id: "customKind",
    title: { es: "¿Qué quieres construir?", en: "What do you want to build?" },
    help: {
      es: "Elige lo que más se acerque. Los detalles los vemos juntos.",
      en: "Pick the closest one. We'll go through the details together.",
    },
    options: [
      o("clientApp", "Una app para mis clientes", "An app for my customers", ["Reservas, área privada, pedidos…", "Bookings, client area, orders…"]),
      o("internal", "Una herramienta para mi equipo", "A tool for my team", ["Gestión interna, automatizar tareas", "Internal management, automating tasks"]),
      o("platform", "Una plataforma o marketplace", "A platform or marketplace"),
      o("saas", "Un producto SaaS", "A SaaS product", ["Con usuarios y suscripciones", "With users and subscriptions"]),
      o("other", "Otra cosa", "Something else"),
    ],
  },
  {
    id: "customStage",
    title: { es: "¿En qué punto está el proyecto?", en: "Where is the project right now?" },
    help: {
      es: "Así sabemos si empezamos por definirlo o directamente por construirlo.",
      en: "So we know whether to start by defining it or go straight to building.",
    },
    options: [
      o("idea", "Es solo una idea", "It's just an idea"),
      o("defined", "Lo tengo definido o con diseños", "It's defined or has designs"),
      o("existing", "Ya existe algo y quiero rehacerlo o ampliarlo", "Something exists and I want to rebuild or extend it"),
    ],
  },
  budget,
  timing,
];

const byPlan: Record<string, QuizQuestion[]> = { landing, business, ecommerce, custom };

export function getPlanQuiz(planId: string): QuizQuestion[] {
  return byPlan[planId] ?? [timing];
}
