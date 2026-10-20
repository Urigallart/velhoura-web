import type { Locale } from "@/i18n/locale";
import { maintenancePrice } from "./plans";

/**
 * Knowledge base for the on-site assistant.
 *
 * The assistant is rule-based: it matches keywords in the visitor's message
 * against the topics below and answers with text written here. It never
 * invents anything — every figure and claim comes from what the site already
 * publishes (plans, services, process, FAQ). Where the studio has not
 * committed to something (delivery times, payment terms, phone, discounts),
 * the answer says so and sends the visitor to the people who can decide.
 */

type Text = Record<Locale, string>;

export type Topic = {
  id: string;
  /** Lower-case, accent-free fragments. A fragment matches inside a word. */
  keys: Record<Locale, string[]>;
  answer: Text;
  /** Topic ids offered as quick replies after this answer. */
  next?: string[];
  /** Offer the contact form under the answer. */
  contact?: boolean;
};

export const topicLabels: Record<string, Text> = {
  services: { es: "¿Qué servicios ofrecéis?", en: "What do you offer?" },
  prices: { es: "¿Cuánto cuesta una web?", en: "How much is a website?" },
  process: { es: "¿Cómo trabajáis?", en: "How do you work?" },
  time: { es: "¿Cuánto tarda?", en: "How long does it take?" },
  wordpress: { es: "¿Con qué tecnología trabajáis?", en: "What technology do you use?" },
  shop: { es: "Quiero una tienda online", en: "I want an online shop" },
  seo: { es: "SEO y Google Ads", en: "SEO and Google Ads" },
  brand: { es: "Logo y marca", en: "Logo and brand" },
  start: { es: "¿Qué necesito para empezar?", en: "What do I need to start?" },
  care: { es: "¿Y el mantenimiento?", en: "What about maintenance?" },
  who: { es: "¿Quiénes sois?", en: "Who are you?" },
  contact: { es: "Quiero hablar con vosotros", en: "I'd like to talk to you" },
};

export const topics: Topic[] = [
  {
    id: "greeting",
    keys: {
      es: ["hola", "buenas", "buenos dias", "buenas tardes", "hey", "que tal"],
      en: ["hello", "hi ", "hey", "good morning", "good afternoon", "howdy"],
    },
    answer: {
      es: "¡Hola! Pregúntame lo que quieras sobre nuestros servicios: precios, cómo trabajamos, qué necesitas para empezar…",
      en: "Hi! Ask me anything about our services: prices, how we work, what you need to get started…",
    },
    next: ["services", "prices", "process"],
  },
  {
    id: "services",
    keys: {
      es: ["servicio", "ofrec", "hacei", "haceis", "que hac", "a que os dedic", "dedicais", "trabajos"],
      en: ["service", "offer", "what do you do", "what you do", "do you do", "specialis", "specializ"],
    },
    answer: {
      es: "Tres áreas que se complementan: **marca** (logotipo, identidad visual, diseño gráfico y packaging), **web** (diseño web, tiendas online y desarrollo a medida) y **captación** (SEO y campañas de Google Ads). Puedes contratar una sola o todas.",
      en: "Three areas that work together: **brand** (logo, visual identity, graphic design and packaging), **web** (web design, online shops and custom development) and **growth** (SEO and Google Ads campaigns). You can hire one or all of them.",
    },
    next: ["prices", "brand", "seo"],
  },
  {
    id: "prices",
    keys: {
      es: ["precio", "cuesta", "cuanto vale", "cuanto cobr", "tarifa", "presupuesto", "coste", "costo", "caro", "barato", "euro", "€", "pagar", "pago"],
      en: ["price", "cost", "how much", "quote", "budget", "rate", "fee", "cheap", "expensive", "euro", "€", "pay"],
    },
    answer: {
      es: "Publicamos precios orientativos para que sepas por dónde empezar:\n• **Landing**: desde 199 €\n• **Business**: desde 499 €\n• **Tienda online**: desde 799 €\n• **Custom** (apps, plataformas, SaaS): presupuesto a medida\n\nSon cifras de partida, no un precio final: lo que necesites de verdad se presupuesta por escrito y conoces el coste antes de empezar. De formas de pago o descuentos no puedo decirte nada seguro; eso lo acordamos con vosotros directamente.",
      en: "We publish indicative prices so you know where to start:\n• **Landing**: from €199\n• **Business**: from €499\n• **Online shop**: from €799\n• **Custom** (apps, platforms, SaaS): quoted to measure\n\nThese are starting points, not a final price: what you actually need is quoted in writing and you know the cost before we begin. I can't promise anything about payment terms or discounts; we agree those with you directly.",
    },
    next: ["shop", "care", "contact"],
    contact: true,
  },
  {
    id: "landing",
    keys: {
      es: ["landing", "pagina sencilla", "una pagina", "web sencilla", "web basica"],
      en: ["landing", "one page", "single page", "simple site", "simple website", "basic site"],
    },
    answer: {
      es: "La **Landing** (desde 199 €) es para profesionales y negocios que necesitan una presencia digital sencilla y potente: diseño personalizado, responsive, animaciones, SEO básico, formulario de contacto y optimización de velocidad.",
      en: "The **Landing** (from €199) is for professionals and businesses that need a simple, strong online presence: custom design, responsive, animations, basic SEO, contact form and speed optimisation.",
    },
    next: ["prices", "contact"],
  },
  {
    id: "business",
    keys: {
      es: ["business", "web corporativa", "web de empresa", "varias paginas", "web completa"],
      en: ["business plan", "corporate", "company site", "multi-page", "multipage", "several pages", "full website"],
    },
    answer: {
      es: "El plan **Business** (desde 499 €) es para empresas que necesitan una web más completa: varias páginas, animaciones avanzadas, SEO, formularios, integraciones y panel de gestión de contenido.",
      en: "The **Business** plan (from €499) is for companies that need a fuller website: several pages, advanced animations, SEO, forms, integrations and a content management panel.",
    },
    next: ["prices", "contact"],
  },
  {
    id: "shop",
    keys: {
      es: ["tienda", "ecommerce", "e-commerce", "vender online", "vender por internet", "shopify", "carrito", "stripe"],
      en: ["shop", "store", "ecommerce", "e-commerce", "sell online", "shopify", "cart", "stripe"],
    },
    answer: {
      es: "Montamos tiendas online propias (desde 799 €): catálogo y fichas de producto, carrito y checkout, pagos con Stripe, gestión de pedidos e inventario, panel de administración, envíos y descuentos.",
      en: "We build online shops of your own (from €799): catalogue and product pages, cart and checkout, Stripe payments, order and inventory management, an admin panel, shipping and discounts.",
    },
    next: ["prices", "time", "contact"],
  },
  {
    id: "custom",
    keys: {
      es: ["a medida", "personalizad", "aplicacion", "app", "saas", "plataforma", "software", "programar", "desarrollo"],
      en: ["custom", "bespoke", "application", " app", "saas", "platform", "software", "develop", "build an"],
    },
    answer: {
      es: "Sí, también desarrollamos a medida: aplicaciones web, plataformas, SaaS, sistemas personalizados, integraciones por API y bases de datos. Se presupuesta según lo que necesites; cuéntanos la idea y la vemos.",
      en: "Yes, we also build to measure: web applications, platforms, SaaS, custom systems, API integrations and databases. It's quoted according to what you need; tell us the idea and we'll look at it.",
    },
    next: ["prices", "contact"],
    contact: true,
  },
  {
    id: "wordpress",
    keys: {
      es: ["wordpress", "wp", "editar yo", "editar mi web", "gestionar contenido", "cms"],
      en: ["wordpress", "wp", "edit it myself", "edit my site", "content management", "cms"],
    },
    answer: {
      es: "No trabajamos con WordPress ni con plantillas: programamos cada web desde cero con tecnología moderna como **React** y **Next.js**, la misma de esta página. Son webs más rápidas y seguras, y si necesitas actualizar contenidos te dejamos un panel sencillo para cambiar textos e imágenes tú mismo.",
      en: "We don't use WordPress or templates: we code every site from scratch with modern technology like **React** and **Next.js**, the same as this site. They're faster and more secure, and if you need to update content we leave you a simple dashboard to change text and images yourself.",
    },
    next: ["prices", "services"],
  },
  {
    id: "process",
    keys: {
      es: ["proceso", "como trabaj", "como funciona", "pasos", "metodo", "etapas", "como es trabajar"],
      en: ["process", "how do you work", "how it works", "steps", "method", "stages", "what's it like"],
    },
    answer: {
      es: "Cuatro pasos:\n1. **Escuchamos**: hablamos de tu negocio y tus objetivos.\n2. **Proponemos**: te enviamos un plan por escrito con lo que haremos y su coste.\n3. **Construimos**: trabajamos por etapas, revisando contigo cada avance.\n4. **Lanzamos y mejoramos**: tras el lanzamiento medimos resultados para seguir mejorando.",
      en: "Four steps:\n1. **We listen**: we talk about your business and goals.\n2. **We propose**: we send a written plan with what we'll do and what it costs.\n3. **We build**: we work in stages, reviewing each step with you.\n4. **We launch and improve**: after launch we measure results to keep improving.",
    },
    next: ["time", "start", "prices"],
  },
  {
    id: "time",
    keys: {
      es: ["cuanto tarda", "cuanto tiempo", "plazo", "tiempo de entrega", "cuando estara", "cuando lo teneis", "rapido", "urgente", "semanas", "dias", "meses", "entrega"],
      en: ["how long", "timeline", "deadline", "turnaround", "delivery time", "when will", "fast", "urgent", "weeks", "days", "months"],
    },
    answer: {
      es: "Aún no publicamos plazos fijos porque dependen de lo que necesites: una landing no es lo mismo que una tienda o una app a medida. Lo que sí hacemos es darte un calendario por escrito en la propuesta, antes de empezar. Si tienes una fecha límite, cuéntanosla y te decimos con honestidad si llegamos.",
      en: "We don't publish fixed timeframes because they depend on what you need: a landing page is not a shop or a custom app. What we do is put a schedule in writing in the proposal, before we start. If you have a deadline, tell us and we'll say honestly whether we can make it.",
    },
    next: ["process", "contact"],
    contact: true,
  },
  {
    id: "seo",
    keys: {
      es: ["seo", "google", "posicion", "ads", "publicidad", "campana", "anuncios", "trafico", "clientes", "captar", "visibilidad"],
      en: ["seo", "google", "ranking", "ads", "advertising", "campaign", "traffic", "customers", "clients", "leads", "visibility"],
    },
    answer: {
      es: "En captación hacemos **SEO** (para que te encuentren en Google) y campañas de **Google Ads** (para aparecer delante de quien ya te está buscando). Tras el lanzamiento medimos resultados para seguir mejorando.",
      en: "For growth we do **SEO** (so people find you on Google) and **Google Ads** campaigns (to appear in front of people already looking for you). After launch we measure results to keep improving.",
    },
    next: ["services", "contact"],
  },
  {
    id: "social",
    keys: {
      es: ["redes sociales", "instagram", "tiktok", "facebook", "meta ads", "community", "social media"],
      en: ["social media", "instagram", "tiktok", "facebook", "meta ads", "community manager"],
    },
    answer: {
      es: "La gestión de redes sociales y las campañas en Meta no figuran entre los servicios que publicamos hoy (nuestra captación es SEO y Google Ads). Si es lo que buscas, escríbenos y te decimos con sinceridad si podemos ayudarte.",
      en: "Social media management and Meta campaigns are not among the services we publish today (our growth work is SEO and Google Ads). If that's what you need, write to us and we'll tell you honestly whether we can help.",
    },
    next: ["seo", "contact"],
    contact: true,
  },
  {
    id: "brand",
    keys: {
      es: ["logo", "logotipo", "marca", "identidad", "branding", "packaging", "envase", "diseno grafico", "diseno de marca"],
      en: ["logo", "brand", "identity", "branding", "packaging", "graphic design"],
    },
    answer: {
      es: "En marca hacemos logotipos, identidad visual, diseño gráfico y packaging: lo que hace que tu negocio se reconozca y se recuerde. Y como lo hace el mismo equipo que tu web, todo encaja.",
      en: "In brand we do logos, visual identity, graphic design and packaging: what makes your business recognisable and memorable. And since the same team builds your website, it all fits together.",
    },
    next: ["services", "prices", "contact"],
  },
  {
    id: "start",
    keys: {
      es: ["necesito para empezar", "para empezar", "que necesito", "como empiezo", "como empezar", "contratar", "primer paso", "materiales", "textos", "fotos"],
      en: ["need to start", "to get started", "what do i need", "how do i start", "how to start", "hire", "first step", "materials", "texts", "photos"],
    },
    answer: {
      es: "Solo contarnos a qué te dedicas y qué quieres conseguir. Si ya tienes logotipo, textos o fotos, nos sirven; si no, te ayudamos a prepararlos. La primera conversación es sin compromiso.",
      en: "Just tell us what you do and what you want to achieve. If you already have a logo, texts or photos, they help; if not, we'll help you prepare them. The first conversation is no strings attached.",
    },
    next: ["process", "contact"],
    contact: true,
  },
  {
    id: "care",
    keys: {
      es: ["mantenimiento", "mantener", "mantiene", "despues de publicar", "una vez publicada", "actualizacion", "copias de seguridad", "cuota", "mensual", "soporte"],
      en: ["maintenance", "maintain", "after launch", "once it's live", "updates", "backups", "monthly", "support", "retainer"],
    },
    answer: {
      es: `El mantenimiento es **opcional** y va **aparte** del precio de la web, **desde ${maintenancePrice("es")}**:
• Actualizaciones y parches de seguridad
• Copias de seguridad periódicas
• Vigilamos que la web siga en línea
• Pequeños cambios de textos e imágenes
• Soporte por email

La cuota exacta depende del tamaño de la web y te la indicamos en la propuesta. Si prefieres llevarla tú, te la entregamos lista y te explicamos cómo.`,
      en: `Maintenance is **optional** and **separate** from the price of the site, **from ${maintenancePrice("en")}**:
• Updates and security patches
• Regular backups
• We keep an eye on the site staying online
• Small text and image changes
• Email support

The exact fee depends on the size of the site and is stated in the proposal. If you'd rather run it yourself, we hand it over ready and show you how.`,
    },
    next: ["prices", "contact"],
    contact: true,
  },
  {
    id: "who",
    keys: {
      es: ["quienes sois", "quien eres", "quien sois", "equipo", "oriol", "ian", "socios", "sobre vosotros", "empresa", "estudio"],
      en: ["who are you", "who is", "team", "oriol", "ian", "partners", "about you", "company", "studio"],
    },
    answer: {
      es: "Somos **Oriol Gallart** e **Ian Monfil**, dos socios de Barcelona. Oriol viene del desarrollo full stack y del diseño de interfaces; Ian, de los sistemas y las redes, y del desarrollo con React y Next.js. Quien diseña y quien programa son las mismas personas que te atienden.",
      en: "We are **Oriol Gallart** and **Ian Monfil**, two partners based in Barcelona. Oriol comes from full stack development and interface design; Ian from systems and networks, and from building with React and Next.js. The people who design and the people who code are the same people who answer you.",
    },
    next: ["services", "contact"],
  },
  {
    id: "where",
    keys: {
      es: ["donde", "barcelona", "ubicacion", "oficina", "direccion", "ciudad", "remoto", "a distancia"],
      en: ["where", "barcelona", "location", "office", "address", "city", "remote"],
    },
    answer: {
      es: "Estamos en Barcelona, pero trabajamos con clientes de **toda España** y de **otros países**: todo el proyecto se puede llevar en remoto, por videollamada y email, en español o en inglés.",
      en: "We're based in Barcelona, but we work with clients **all over Spain** and **in other countries**: the whole project can run remotely, over video calls and email, in English or Spanish.",
    },
    next: ["who", "contact"],
  },
  {
    id: "clients",
    keys: {
      es: ["tipo de empresa", "con quien trabaj", "pymes", "autonomo", "restaurante", "pequeno negocio", "mi negocio", "referencias", "portfolio", "portafolio", "ejemplos", "proyectos"],
      en: ["type of business", "who do you work with", "small business", "freelancer", "restaurant", "my business", "references", "portfolio", "examples", "projects"],
    },
    answer: {
      es: "Sobre todo pymes, comercios y profesionales que quieren una presencia digital seria sin coordinar a varios proveedores. Puedes ver trabajos reales en la sección “Trabajo real” de esta misma página.",
      en: "Mostly small businesses, shops and professionals who want a serious online presence without juggling several suppliers. You can see real work in the “Real work” section of this page.",
    },
    next: ["services", "contact"],
  },
  {
    id: "contact",
    keys: {
      es: ["contacto", "contactar", "hablar", "llamar", "telefono", "whatsapp", "email", "correo", "escribir", "reunion", "cita", "llamada"],
      en: ["contact", "talk", "call", "phone", "whatsapp", "email", "mail", "write to", "meeting", "appointment"],
    },
    answer: {
      es: "Lo más rápido es contarnos tu proyecto con el formulario (te respondemos nosotros, no un robot) o escribirnos a **velouraianuri@gmail.com**. Todavía no publicamos teléfono ni WhatsApp.",
      en: "The quickest way is to tell us about your project with the form (we answer you, not a robot) or write to **velouraianuri@gmail.com**. We don't publish a phone number or WhatsApp yet.",
    },
    next: ["prices", "process"],
    contact: true,
  },
  {
    id: "thanks",
    keys: {
      es: ["gracias", "perfecto", "genial", "vale", "ok", "estupendo"],
      en: ["thanks", "thank you", "perfect", "great", "cool", "awesome"],
    },
    answer: {
      es: "¡A ti! Si quieres que lo hablemos con calma, cuéntanos tu proyecto y te respondemos.",
      en: "You're welcome! If you'd like to talk it through, tell us about your project and we'll get back to you.",
    },
    next: ["contact"],
    contact: true,
  },
];

export const fallback: Text & { next: string[] } = {
  es: "Eso no lo tengo claro, y prefiero no inventarme nada. Puedo contarte de servicios, precios, cómo trabajamos o qué necesitas para empezar; y para lo demás, lo mejor es que hables directamente con nosotros.",
  en: "I'm not sure about that, and I'd rather not make anything up. I can tell you about services, prices, how we work or what you need to get started; for anything else, it's best to talk to us directly.",
  next: ["services", "prices", "contact"],
};

export const ui = {
  es: {
    title: "Pregúntanos lo que quieras",
    note: "Asistente automático de Velhoura. Para algo concreto, habla con nosotros.",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    close: "Cerrar chat",
    open: "Abrir chat",
    contactCta: "Contar mi proyecto",
    hint: "Pregúntanos lo que quieras",
    typing: "Escribiendo…",
    greeting:
      "¡Hola! Somos {name}, de Velhoura. Pregúntanos por servicios, precios, cómo trabajamos o cuánto tarda. Este chat es un asistente automático, pero lo que te contamos sale de lo que publicamos.",
  },
  en: {
    title: "Ask us anything",
    note: "Velhoura's automated assistant. For anything specific, talk to us.",
    placeholder: "Type your question…",
    send: "Send",
    close: "Close chat",
    open: "Open chat",
    contactCta: "Tell us about my project",
    hint: "Ask us anything",
    typing: "Typing…",
    greeting:
      "Hi! We're {name} from Velhoura. Ask us about services, prices, how we work or how long things take. This chat is an automated assistant, but everything we tell you comes from what we publish.",
  },
};
