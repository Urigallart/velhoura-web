import type { Locale } from "@/i18n/locale";

/**
 * The project questionnaire that replaces a blank "write us a message" form.
 *
 * Every question is one click, so a visitor describes their project without
 * composing anything. The list is not fixed: each question may carry a `when`
 * predicate over the answers so far, which is how the flow follows what the
 * person actually needs (a shop gets catalogue questions, a restaurant gets
 * booking questions, a brand-only project never sees web questions).
 *
 * Edit freely — `ContactModal` renders whatever this file returns and the API
 * route only receives the resulting question/answer pairs as text.
 */

type Text = Record<Locale, string>;

export type QuizOption = {
  id: string;
  label: Text;
  hint?: Text;
  /** In a multi-choice question, picking this clears the others (and vice versa). */
  exclusive?: boolean;
  /** Euros this choice adds to a plan's estimate: fixed, or a [min, max] range. */
  cost?: number | [number, number];
};

export type QuizQuestion = {
  id: string;
  title: Text;
  help: Text;
  note?: Text;
  multi?: boolean;
  options: QuizOption[];
  /** Shown only when this returns true for the answers given so far. */
  when?: (a: QuizAnswers) => boolean;
};

/** Question id → selected option ids. */
export type QuizAnswers = Record<string, string[]>;

const has = (a: QuizAnswers, q: string, ...ids: string[]) =>
  (a[q] ?? []).some((v) => ids.includes(v));

export const o = (id: string, es: string, en: string, hint?: [string, string]): QuizOption => ({
  id,
  label: { es, en },
  ...(hint ? { hint: { es: hint[0], en: hint[1] } } : null),
});

/** An "I don't know / none" option that can't be combined with the others. */
export const only = (id: string, es: string, en: string): QuizOption => ({
  ...o(id, es, en),
  exclusive: true,
});

export const quiz: QuizQuestion[] = [
  {
    id: "needs",
    title: { es: "¿Qué te gustaría construir?", en: "What would you like to build?" },
    help: {
      es: "Elige todo lo que encaje. Si no lo tienes claro, también vale: para eso estamos.",
      en: "Pick everything that fits. Not sure yet? That's fine too — that's what we're here for.",
    },
    multi: true,
    options: [
      o("web", "Una web nueva", "A new website", ["Para presentar tu negocio y captar clientes", "To present your business and win clients"]),
      o("redesign", "Renovar mi web actual", "Redesign my current website"),
      o("shop", "Una tienda online", "An online store", ["Vender tus productos por internet", "Sell your products online"]),
      o("brand", "Marca e identidad", "Brand and identity", ["Logo, colores, tipografía, packaging", "Logo, colours, typography, packaging"]),
      o("growth", "Aparecer en Google y anuncios", "Show up on Google and run ads", ["SEO, Google Ads, campañas", "SEO, Google Ads, campaigns"]),
      o("app", "Una app o herramienta a medida", "A custom app or tool", ["Reservas, área de clientes, software interno", "Bookings, client portals, internal software"]),
      only("unsure", "Todavía no lo sé", "I'm not sure yet"),
    ],
    note: {
      es: "No hay respuestas buenas o malas. Te orientamos nosotros.",
      en: "There are no right or wrong answers. We'll guide you.",
    },
  },
  {
    id: "sector",
    title: { es: "¿A qué se dedica tu negocio?", en: "What does your business do?" },
    help: {
      es: "Cada sector tiene sus propias necesidades. Así te hacemos las preguntas que de verdad importan.",
      en: "Every sector has its own needs. This way we only ask what really matters.",
    },
    options: [
      o("services", "Servicios profesionales", "Professional services", ["Consultoría, despachos, freelance, B2B", "Consulting, firms, freelance, B2B"]),
      o("local", "Comercio o tienda física", "Retail or local shop", ["Atención al público, local a pie de calle", "Walk-in customers, street-level shop"]),
      o("food", "Restaurante u hostelería", "Restaurant or hospitality", ["Bar, cafetería, restaurante, catering", "Bar, café, restaurant, catering"]),
      o("health", "Salud, belleza o bienestar", "Health, beauty or wellness", ["Clínica, gimnasio, estética, fisioterapia", "Clinic, gym, beauty, physiotherapy"]),
      o("education", "Academia o formación", "Academy or training", ["Cursos, escuelas, formación online o presencial", "Courses, schools, online or in-person"]),
      o("product", "Marca de producto o ecommerce", "Product brand or ecommerce", ["Vendes productos propios", "You sell your own products"]),
      o("startup", "Startup o proyecto nuevo", "Startup or new venture", ["Todavía estás arrancando la idea", "Still getting the idea off the ground"]),
      o("other", "Otro tipo de negocio", "Something else"),
    ],
  },
  {
    id: "stage",
    title: { es: "¿En qué punto está tu negocio?", en: "Where is your business right now?" },
    help: {
      es: "No es lo mismo lanzar algo desde cero que hacer crecer algo que ya funciona.",
      en: "Launching from scratch and growing something that already works are different jobs.",
    },
    options: [
      o("idea", "Es una idea todavía", "It's still an idea"),
      o("starting", "Acabo de empezar", "I've just started", ["Menos de un año", "Less than a year"]),
      o("growing", "Ya funciona y quiero crecer", "It works and I want to grow"),
      o("established", "Está consolidado", "It's well established", ["Varios años, equipo y clientes fijos", "Several years, a team, regular clients"]),
    ],
  },
  {
    id: "team",
    title: { es: "¿Cuántas personas trabajáis en el negocio?", en: "How many people work in the business?" },
    help: {
      es: "Nos ayuda a dimensionar el proyecto y a saber quién lo va a gestionar después.",
      en: "It helps us size the project and know who will run it afterwards.",
    },
    note: { es: "Cuéntate a ti si trabajas en él.", en: "Count yourself if you work in it." },
    when: (a) => !has(a, "stage", "idea"),
    options: [
      o("solo", "Solo yo", "Just me"),
      o("2-5", "De 2 a 5 personas", "2 to 5 people"),
      o("6-15", "De 6 a 15 personas", "6 to 15 people"),
      o("16+", "Más de 15 personas", "More than 15 people"),
    ],
  },
  {
    id: "currentSite",
    title: { es: "¿Tienes web ahora mismo?", en: "Do you have a website right now?" },
    help: {
      es: "Si ya existe, partimos de lo que funciona en vez de empezar de cero.",
      en: "If there is one, we build on what works instead of starting from zero.",
    },
    when: (a) =>
      !has(a, "stage", "idea") && has(a, "needs", "web", "redesign", "shop", "growth", "unsure"),
    options: [
      o("none", "No, todavía no", "No, not yet"),
      o("outdated", "Sí, pero se ha quedado anticuada", "Yes, but it's outdated"),
      o("works", "Sí, funciona pero quiero más", "Yes, it works but I want more"),
      o("social", "Solo tengo redes sociales", "I only have social media"),
    ],
  },

  /* ── Sector-specific ─────────────────────────────────────────────── */
  {
    id: "servicesGoal",
    title: { es: "¿Qué debería conseguir tu web?", en: "What should your website achieve?" },
    help: {
      es: "En servicios, la web suele ser el primer filtro antes de que alguien te llame.",
      en: "For services, the website is usually the first filter before someone calls you.",
    },
    multi: true,
    when: (a) => has(a, "sector", "services"),
    options: [
      o("leads", "Que me pidan presupuesto o contacto", "Get quote requests and enquiries"),
      o("calls", "Que reserven una llamada o reunión", "Get calls or meetings booked"),
      o("cases", "Mostrar casos y trabajos anteriores", "Show case studies and past work"),
      o("trust", "Transmitir confianza y profesionalidad", "Come across as trustworthy and professional"),
    ],
  },
  {
    id: "foodGoal",
    title: {
      es: "¿Qué quieres que hagan tus clientes desde la web?",
      en: "What should your customers be able to do online?",
    },
    help: {
      es: "Puedes elegir varias. Lo que más uses es lo que pondremos primero.",
      en: "Pick as many as you like. What you use most goes first.",
    },
    multi: true,
    when: (a) => has(a, "sector", "food"),
    options: [
      o("menu", "Ver la carta", "See the menu"),
      o("booking", "Reservar mesa", "Book a table"),
      o("orders", "Pedir para llevar o a domicilio", "Order takeaway or delivery"),
      o("maps", "Encontrarme en Google Maps", "Find me on Google Maps"),
      o("events", "Eventos y grupos", "Events and group bookings"),
    ],
  },
  {
    id: "healthGoal",
    title: {
      es: "¿Qué necesitan poder hacer tus clientes?",
      en: "What do your clients need to be able to do?",
    },
    help: {
      es: "Puedes elegir varias.",
      en: "Pick as many as you like.",
    },
    multi: true,
    when: (a) => has(a, "sector", "health"),
    options: [
      o("appointments", "Pedir cita online", "Book appointments online"),
      o("services", "Ver servicios y tarifas", "See services and prices"),
      o("passes", "Comprar bonos o cuotas", "Buy passes or memberships"),
      o("local", "Encontrarme cuando buscan cerca", "Find me when searching nearby"),
      o("reviews", "Ver opiniones de otros clientes", "Read reviews from other clients"),
    ],
  },
  {
    id: "educationGoal",
    title: { es: "¿Qué debería resolver la web?", en: "What should the website handle?" },
    help: {
      es: "Puedes elegir varias.",
      en: "Pick as many as you like.",
    },
    multi: true,
    when: (a) => has(a, "sector", "education"),
    options: [
      o("catalog", "Mostrar cursos y horarios", "Show courses and schedules"),
      o("enrol", "Inscripciones y pagos online", "Online enrolment and payment"),
      o("portal", "Un área privada para alumnos", "A private area for students"),
      o("acquire", "Captar alumnos nuevos", "Bring in new students"),
    ],
  },
  {
    id: "localGoal",
    title: { es: "¿Qué te ayudaría más?", en: "What would help you most?" },
    help: {
      es: "Puedes elegir varias.",
      en: "Pick as many as you like.",
    },
    multi: true,
    when: (a) => has(a, "sector", "local"),
    options: [
      o("found", "Que me encuentren en Google", "Be found on Google"),
      o("catalog", "Enseñar lo que vendo", "Show what I sell"),
      o("online", "Vender también por internet", "Sell online as well"),
      o("promos", "Avisar de novedades y ofertas", "Announce news and offers"),
    ],
  },
  {
    id: "startupFirst",
    title: { es: "¿Qué necesitas primero?", en: "What do you need first?" },
    help: {
      es: "Al empezar, el orden importa tanto como lo que se construye.",
      en: "When you're starting out, the order matters as much as what gets built.",
    },
    when: (a) => has(a, "sector", "startup") || has(a, "stage", "idea"),
    options: [
      o("validate", "Validar la idea con una landing", "Validate the idea with a landing page"),
      o("mvp", "Un primer producto que funcione (MVP)", "A first working product (MVP)"),
      o("brand", "Nombre, marca e identidad", "Name, brand and identity"),
      o("pitch", "Algo que enseñar a inversores o socios", "Something to show investors or partners"),
    ],
  },

  /* ── Need-specific ───────────────────────────────────────────────── */
  {
    id: "catalogSize",
    title: { es: "¿Cuántos productos vas a vender?", en: "How many products will you sell?" },
    help: {
      es: "Cambia mucho cómo se organiza la tienda y cómo se gestiona el stock.",
      en: "It changes a lot how the store is organised and stock is managed.",
    },
    when: (a) => has(a, "needs", "shop") || has(a, "sector", "product"),
    options: [
      o("few", "Menos de 20", "Fewer than 20"),
      o("some", "Entre 20 y 200", "Between 20 and 200"),
      o("many", "Más de 200", "More than 200"),
      o("unknown", "Todavía no lo sé", "I don't know yet"),
    ],
  },
  {
    id: "sellingNow",
    title: { es: "¿Dónde vendes ahora mismo?", en: "Where do you sell right now?" },
    help: {
      es: "Puedes elegir varias.",
      en: "Pick as many as you like.",
    },
    multi: true,
    when: (a) => has(a, "needs", "shop") || has(a, "sector", "product"),
    options: [
      o("store", "En tienda física", "In a physical store"),
      o("marketplaces", "En marketplaces (Amazon, Etsy…)", "On marketplaces (Amazon, Etsy…)"),
      o("social", "Por redes sociales o WhatsApp", "Through social media or WhatsApp"),
      only("nowhere", "Todavía en ningún sitio", "Nowhere yet"),
    ],
  },
  {
    id: "brandState",
    title: { es: "¿Cómo está tu marca ahora?", en: "Where is your brand right now?" },
    help: {
      es: "Así sabemos si partimos de cero o si hay algo que conservar.",
      en: "So we know whether we're starting from zero or there's something to keep.",
    },
    when: (a) => has(a, "needs", "brand"),
    options: [
      o("none", "No tengo nada todavía", "I have nothing yet"),
      o("refresh", "Tengo logo pero quiero renovarlo", "I have a logo but want to refresh it"),
      o("apply", "La marca está, falta aplicarla bien", "The brand exists, it just needs applying properly"),
    ],
  },
  {
    id: "acquisition",
    title: { es: "¿Cómo te encuentran ahora tus clientes?", en: "How do customers find you today?" },
    help: {
      es: "Puedes elegir varias. Es el punto de partida para saber dónde invertir.",
      en: "Pick as many as you like. It's the starting point for deciding where to invest.",
    },
    multi: true,
    when: (a) => has(a, "needs", "growth"),
    options: [
      o("referrals", "Boca a boca", "Word of mouth"),
      o("google", "Buscando en Google", "Searching on Google"),
      o("social", "Redes sociales", "Social media"),
      o("ads", "Publicidad de pago", "Paid advertising"),
      only("unknown", "No lo sé", "I don't know"),
    ],
  },
  {
    id: "appUsers",
    title: { es: "¿Quién va a usar la herramienta?", en: "Who will use the tool?" },
    help: {
      es: "Una app para tus clientes y una para tu equipo se diseñan de forma muy distinta.",
      en: "An app for your customers and one for your team are designed very differently.",
    },
    when: (a) => has(a, "needs", "app"),
    options: [
      o("customers", "Mis clientes", "My customers"),
      o("team", "Mi equipo, para el día a día", "My team, day to day"),
      o("both", "Ambos", "Both"),
    ],
  },
  {
    id: "painPoints",
    title: {
      es: "¿Dónde se os va más tiempo en el día a día?",
      en: "Where does most of your time go day to day?",
    },
    help: {
      es: "Puedes elegir varias. Es lo primero que intentaremos automatizar.",
      en: "Pick as many as you like. It's the first thing we'll try to automate.",
    },
    multi: true,
    when: (a) => has(a, "needs", "app"),
    options: [
      o("repetitive", "Tareas repetitivas", "Repetitive tasks"),
      o("clients", "Gestionar clientes y reservas", "Managing clients and bookings"),
      o("data", "Información desordenada en varios sitios", "Information scattered across places"),
      o("comms", "Comunicación con el equipo", "Team communication"),
    ],
  },

  /* ── Closing ─────────────────────────────────────────────────────── */
  {
    id: "goal",
    title: { es: "¿Qué es lo más importante para ti?", en: "What matters most to you?" },
    help: {
      es: "Si solo pudiéramos mejorar una cosa, ¿cuál sería?",
      en: "If we could only improve one thing, what would it be?",
    },
    options: [
      o("clients", "Conseguir más clientes", "Get more customers"),
      o("image", "Una imagen más profesional", "A more professional image"),
      o("sell", "Vender por internet", "Sell online"),
      o("time", "Ahorrar tiempo y automatizar", "Save time and automate"),
      o("stand", "Destacar sobre la competencia", "Stand out from competitors"),
    ],
  },
  {
    id: "timing",
    title: { es: "¿Para cuándo lo necesitas?", en: "When do you need it?" },
    help: {
      es: "Nos ayuda a organizar el calendario y a proponerte algo realista.",
      en: "It helps us plan and propose something realistic.",
    },
    options: [
      o("asap", "Lo antes posible", "As soon as possible"),
      o("1-2m", "En uno o dos meses", "In one or two months"),
      o("later", "Más adelante este año", "Later this year"),
      o("exploring", "Solo estoy mirando opciones", "I'm just exploring"),
    ],
  },
  {
    id: "budget",
    title: { es: "¿Qué presupuesto tienes en mente?", en: "What budget do you have in mind?" },
    help: {
      es: "Orientativo. Nuestras webs empiezan en 199 € y las tiendas en 799 €.",
      en: "Just a ballpark. Our websites start at €199 and online stores at €799.",
    },
    note: {
      es: "No te comprometes a nada: es solo para proponerte algo que encaje.",
      en: "It doesn't commit you to anything — it just helps us propose something that fits.",
    },
    options: [
      o("<500", "Menos de 500 €", "Under €500"),
      o("500-1000", "Entre 500 y 1.000 €", "€500 to €1,000"),
      o("1000-3000", "Entre 1.000 y 3.000 €", "€1,000 to €3,000"),
      o("3000+", "Más de 3.000 €", "Over €3,000"),
      o("unknown", "Todavía no lo sé", "I don't know yet"),
    ],
  },
];

/** The questions that apply given the answers so far, in order. */
export function activeQuestions(
  answers: QuizAnswers,
  questions: QuizQuestion[] = quiz,
): QuizQuestion[] {
  return questions.filter((q) => !q.when || q.when(answers));
}

/**
 * Drops answers to questions that no longer apply — e.g. the restaurant
 * questions after the visitor goes back and changes their sector — so the
 * email never contains answers from a path they abandoned.
 */
export function pruneAnswers(
  answers: QuizAnswers,
  questions: QuizQuestion[] = quiz,
): QuizAnswers {
  const live = new Set(activeQuestions(answers, questions).map((q) => q.id));
  return Object.fromEntries(Object.entries(answers).filter(([id]) => live.has(id)));
}

/** The answers as human-readable pairs, in question order. */
export function summarize(
  answers: QuizAnswers,
  locale: Locale,
  questions: QuizQuestion[] = quiz,
): { question: string; answer: string }[] {
  return activeQuestions(answers, questions)
    .filter((q) => (answers[q.id] ?? []).length > 0)
    .map((q) => ({
      question: q.title[locale],
      answer: q.options
        .filter((opt) => answers[q.id].includes(opt.id))
        .map((opt) => opt.label[locale])
        .join(", "),
    }));
}
