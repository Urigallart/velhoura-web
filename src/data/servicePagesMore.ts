import { maintenancePrice } from "./plans";
import type { ServicePage } from "./servicePages";
import type { PageEn } from "./servicePagesEn";

/**
 * Service pages added after the first seven: marketing, AI, software and the
 * wider brand work. Same shape as `servicePages.ts` / `servicePagesEn.ts`,
 * written side by side here so a page and its translation stay together.
 *
 * Nothing here promises a result, a position in Google or a delivery time:
 * prices are "a medida" until the studio sets a starting figure.
 */

type Es = Omit<ServicePage, "slug" | "area" | "price"> & { priceNote: string };
type En = Omit<PageEn, "slugEn">;

type Entry = {
  slug: string;
  slugEn: string;
  area: ServicePage["area"];
  es: Es;
  en: En;
};

const entries: Entry[] = [
  /* ── Marketing digital ─────────────────────────────────────────────── */
  {
    slug: "agencia-marketing-digital",
    slugEn: "digital-marketing-agency",
    area: "growth",
    es: {
      name: "Agencia de marketing digital",
      tag: "Marketing digital",
      metaTitle: "Agencia de marketing digital para pymes en España",
      metaDescription:
        "Web, SEO y medición trabajados por un mismo equipo para que tu negocio llegue a quien ya te está buscando.",
      headline: ["Que te encuentren", "*y te escriban.*"],
      lead: "Una web bonita no sirve si nadie la ve. Trabajamos tu presencia digital de forma ordenada, con tu web, tu posicionamiento en Google y la medición, para que lo que haces llegue a quien te busca.",
      benefits: [
        { title: "Un solo equipo", body: "La web y la captación las llevamos juntos, así que todo encaja y no tienes que coordinar a varios proveedores." },
        { title: "Prioridades claras", body: "Empezamos por lo que más pesa en tu caso, no por hacerlo todo a la vez." },
        { title: "Medimos lo que importa", body: "Miramos contactos y consultas, no solo visitas, para saber qué te trae clientes." },
      ],
      includes: [
        "Revisión de tu situación digital",
        "Plan por escrito con prioridades",
        "Web y SEO coordinados",
        "Medición de visitas y contactos",
        "Informe sencillo de resultados",
        "Ajustes según lo que funcione",
      ],
      idealFor: [
        "Pymes y autónomos con una web que no les trae contactos",
        "Negocios locales que quieren aparecer en su zona",
        "Empresas que quieren ordenar su presencia digital",
      ],
      priceNote: "Presupuesto a medida según el alcance.",
      faqs: [
        { q: "¿Os encargáis de las redes sociales?", a: "Nuestro trabajo se centra en web, SEO y medición. Si necesitas otra cosa, cuéntanoslo y te decimos con sinceridad si podemos ayudarte." },
        { q: "¿Garantizáis resultados?", a: "No prometemos posiciones ni cifras, porque dependen del sector y la competencia. Sí te enseñamos qué hacemos y qué medimos en cada momento." },
      ],
      related: ["seo", "diseno-web"],
    },
    en: {
      name: "Digital marketing agency",
      tag: "Digital marketing",
      metaTitle: "Digital marketing agency for small businesses",
      metaDescription:
        "Web, SEO and measurement handled by one team so your business reaches the people already looking for you.",
      headline: ["Be found", "*and be contacted.*"],
      lead: "A nice website is no use if nobody sees it. We work your digital presence in an orderly way, with your site, your Google visibility and measurement, so what you do reaches the people searching for it.",
      benefits: [
        { title: "One team", body: "We handle the website and the growth work together, so everything fits and you don't have to coordinate several suppliers." },
        { title: "Clear priorities", body: "We start with what matters most in your case, not with doing everything at once." },
        { title: "We measure what matters", body: "We look at enquiries and contacts, not just visits, to know what brings you customers." },
      ],
      includes: [
        "A review of your digital situation",
        "A written plan with priorities",
        "Website and SEO working together",
        "Measurement of visits and contacts",
        "A simple results report",
        "Adjustments based on what works",
      ],
      idealFor: [
        "Small businesses and freelancers whose site brings no enquiries",
        "Local businesses that want to show up in their area",
        "Companies that want to put their digital presence in order",
      ],
      priceNote: "Custom quote depending on scope.",
      faqs: [
        { q: "Do you manage social media?", a: "Our work focuses on web, SEO and measurement. If you need something else, tell us and we'll honestly say whether we can help." },
        { q: "Do you guarantee results?", a: "We don't promise positions or figures, because they depend on the sector and the competition. We do show you what we do and what we measure at every step." },
      ],
    },
  },
  {
    slug: "agencia-seo",
    slugEn: "seo-agency",
    area: "growth",
    es: {
      name: "Agencia SEO",
      tag: "SEO",
      metaTitle: "Agencia SEO en España para negocios locales y pymes",
      metaDescription:
        "SEO técnico, contenidos y ficha de empresa para que Google entienda tu negocio y aparezcas en las búsquedas que importan.",
      headline: ["Aparece cuando", "*te buscan.*"],
      lead: "El SEO consiste en ayudar a Google a entender qué haces y a quién ayudas. Trabajamos la parte técnica, los contenidos y tu ficha de empresa para que aparezcas en las búsquedas que importan a tu negocio.",
      benefits: [
        { title: "Base técnica sólida", body: "Velocidad, estructura y buena lectura en móvil, que es donde empieza todo." },
        { title: "Contenido con intención", body: "Páginas pensadas para lo que de verdad busca tu cliente, no para rellenar." },
        { title: "También en tu zona", body: "Ficha de empresa y SEO local para que te encuentren cerca de donde estás." },
      ],
      includes: [
        "Análisis de las búsquedas de tu sector",
        "SEO técnico de la web",
        "Optimización de títulos y textos",
        "Ficha de empresa en Google",
        "Estructura y enlaces internos",
        "Informe de seguimiento",
      ],
      idealFor: [
        "Negocios locales que quieren aparecer en su zona",
        "Empresas con web pero sin visitas desde Google",
        "Tiendas online que quieren atraer búsquedas",
      ],
      priceNote: "Presupuesto a medida. Puedes empezar por una auditoría.",
      faqs: [
        { q: "¿Cuánto tarda en notarse el SEO?", a: "Es un trabajo gradual y no hay un plazo fijo. Desconfía de quien lo prometa: te explicamos qué esperar según tu caso." },
        { q: "¿Trabajáis también el SEO local?", a: "Sí. Trabajamos tu ficha de empresa y las búsquedas de tu zona, esté donde esté tu negocio." },
      ],
      related: ["auditoria-seo", "seo"],
    },
    en: {
      name: "SEO agency",
      tag: "SEO",
      metaTitle: "SEO agency for local businesses and small companies",
      metaDescription:
        "Technical SEO, content and business profile so Google understands your business and you show up in the searches that matter.",
      headline: ["Show up when", "*they search.*"],
      lead: "SEO is about helping Google understand what you do and who you help. We work on the technical side, the content and your business profile so you appear in the searches that matter to your business.",
      benefits: [
        { title: "A solid technical base", body: "Speed, structure and good reading on mobile, which is where everything starts." },
        { title: "Content with intent", body: "Pages built for what your customer actually searches for, not to fill space." },
        { title: "In your area too", body: "Business profile and local SEO so you're found near where you are." },
      ],
      includes: [
        "Analysis of searches in your sector",
        "Technical SEO for the website",
        "Optimisation of titles and copy",
        "Google business profile",
        "Structure and internal links",
        "Progress report",
      ],
      idealFor: [
        "Local businesses that want to show up in their area",
        "Companies with a site but no visits from Google",
        "Online shops that want to attract searches",
      ],
      priceNote: "Custom quote. You can start with an audit.",
      faqs: [
        { q: "How long until SEO shows?", a: "It's gradual work and there is no fixed timeline. Be wary of anyone who promises one: we explain what to expect for your case." },
        { q: "Do you also do local SEO?", a: "Yes. We work on your business profile and the searches in your area, wherever your business is." },
      ],
    },
  },
  {
    slug: "consultor-seo",
    slugEn: "seo-consultant",
    area: "growth",
    es: {
      name: "Consultor SEO",
      tag: "Consultoría",
      metaTitle: "Consultor SEO para pymes y negocios locales",
      metaDescription:
        "Te acompañamos como consultores SEO: revisamos tu caso, priorizamos y te dejamos un plan claro para aplicar.",
      headline: ["Alguien que te diga", "*qué hacer primero.*"],
      lead: "Si ya tienes web o un equipo, no siempre necesitas que lo hagamos todo. Te acompañamos como consultores: revisamos tu caso, priorizamos y te dejamos un plan claro para aplicarlo tú o tu equipo.",
      benefits: [
        { title: "Prioridades claras", body: "Saber qué hacer primero ahorra tiempo y dinero." },
        { title: "Un plan que se puede aplicar", body: "Acciones concretas y ordenadas, no un informe que se queda en un cajón." },
        { title: "Sin ataduras", body: "Puedes aplicarlo tú, tu equipo o pedirnos que lo hagamos nosotros." },
      ],
      includes: [
        "Sesión de diagnóstico",
        "Revisión de tu web y de la competencia",
        "Plan de acciones priorizado",
        "Recomendaciones técnicas y de contenido",
        "Resolución de dudas",
        "Seguimiento opcional",
      ],
      idealFor: [
        "Empresas con equipo propio que necesitan dirección",
        "Autónomos que gestionan su web y quieren orientación",
        "Negocios que ya han probado el SEO sin claridad",
      ],
      priceNote: "Presupuesto a medida según las sesiones necesarias.",
      faqs: [
        { q: "¿Tengo que contratar también la implantación?", a: "No. Puedes quedarte solo con el plan y aplicarlo tú, o pedirnos ayuda con partes concretas." },
        { q: "¿Cuántas sesiones hacen falta?", a: "Depende del caso. Lo concretamos en la primera conversación y te lo ponemos por escrito." },
      ],
      related: ["auditoria-seo", "agencia-seo"],
    },
    en: {
      name: "SEO consultant",
      tag: "Consulting",
      metaTitle: "SEO consultant for small businesses and local companies",
      metaDescription:
        "We work with you as SEO consultants: we review your case, prioritise and leave you a clear plan to apply.",
      headline: ["Someone to tell you", "*what to do first.*"],
      lead: "If you already have a site or a team, you don't always need us to do everything. We work with you as consultants: we review your case, prioritise and leave you a clear plan for you or your team to apply.",
      benefits: [
        { title: "Clear priorities", body: "Knowing what to do first saves time and money." },
        { title: "A plan you can apply", body: "Concrete, ordered actions, not a report that stays in a drawer." },
        { title: "No strings", body: "You can apply it yourself, with your team, or ask us to do it." },
      ],
      includes: [
        "Diagnostic session",
        "Review of your site and competitors",
        "Prioritised action plan",
        "Technical and content recommendations",
        "Answers to your questions",
        "Optional follow-up",
      ],
      idealFor: [
        "Companies with their own team that need direction",
        "Freelancers who manage their own site and want guidance",
        "Businesses that tried SEO before without clarity",
      ],
      priceNote: "Custom quote depending on the sessions needed.",
      faqs: [
        { q: "Do I also have to hire the implementation?", a: "No. You can keep just the plan and apply it yourself, or ask us for help with specific parts." },
        { q: "How many sessions are needed?", a: "It depends on the case. We settle it in the first conversation and put it in writing." },
      ],
    },
  },
  {
    slug: "auditoria-seo",
    slugEn: "seo-audit",
    area: "growth",
    es: {
      name: "Auditoría SEO",
      tag: "Diagnóstico",
      metaTitle: "Auditoría SEO de tu web: qué frena tu posicionamiento",
      metaDescription:
        "Revisamos tu web a fondo y te entregamos un informe por escrito con lo que conviene corregir y en qué orden.",
      headline: ["Descubre qué frena", "*tu web.*"],
      lead: "Antes de invertir en posicionamiento conviene saber en qué punto estás. Revisamos tu web a fondo y te entregamos un informe claro con lo que conviene corregir y en qué orden.",
      benefits: [
        { title: "Una foto real", body: "Ves qué funciona, qué falla y qué se puede mejorar, sin jerga innecesaria." },
        { title: "Con orden de prioridad", body: "Cada hallazgo viene con su importancia, para saber por dónde empezar." },
        { title: "Te lo explicamos", body: "Repasamos el informe contigo para que lo entiendas y puedas decidir." },
      ],
      includes: [
        "Revisión técnica: velocidad, móvil e indexación",
        "Análisis de títulos, textos y estructura",
        "Revisión de tu ficha de empresa",
        "Comparación con la competencia",
        "Informe por escrito con prioridades",
        "Sesión para explicártelo",
      ],
      idealFor: [
        "Webs que no reciben visitas desde Google",
        "Negocios que van a rediseñar su web",
        "Empresas que quieren una segunda opinión",
      ],
      priceNote: "Presupuesto cerrado antes de empezar.",
      faqs: [
        { q: "¿Qué recibo exactamente?", a: "Un informe por escrito con lo que hemos encontrado y un orden de prioridades, más una sesión para repasarlo contigo." },
        { q: "¿Tengo que contratar después el trabajo?", a: "No. El informe es tuyo y puedes aplicarlo con quien quieras." },
      ],
      related: ["agencia-seo", "consultor-seo"],
    },
    en: {
      name: "SEO audit",
      tag: "Diagnosis",
      metaTitle: "SEO audit of your website: what is holding it back",
      metaDescription:
        "We review your site in depth and give you a written report on what to fix and in what order.",
      headline: ["Find out what's", "*holding your site back.*"],
      lead: "Before investing in search visibility it helps to know where you stand. We review your site in depth and give you a clear report on what to fix and in what order.",
      benefits: [
        { title: "A real picture", body: "You see what works, what fails and what can improve, without needless jargon." },
        { title: "In priority order", body: "Each finding comes with its importance, so you know where to start." },
        { title: "We explain it", body: "We go through the report with you so you understand it and can decide." },
      ],
      includes: [
        "Technical review: speed, mobile and indexing",
        "Analysis of titles, copy and structure",
        "Review of your business profile",
        "Comparison with competitors",
        "Written report with priorities",
        "A session to walk you through it",
      ],
      idealFor: [
        "Sites that get no visits from Google",
        "Businesses about to redesign their site",
        "Companies that want a second opinion",
      ],
      priceNote: "Fixed quote before we start.",
      faqs: [
        { q: "What exactly do I get?", a: "A written report with what we found and a priority order, plus a session to go through it with you." },
        { q: "Do I have to hire the work afterwards?", a: "No. The report is yours and you can apply it with whoever you like." },
      ],
    },
  },
  {
    slug: "seo-para-ia",
    slugEn: "seo-for-ai",
    area: "growth",
    es: {
      name: "SEO para IA",
      tag: "Buscadores con IA",
      metaTitle: "SEO para IA: prepara tu web para los buscadores con inteligencia artificial",
      metaDescription:
        "Contenido claro, datos estructurados y una marca fácil de reconocer para que los asistentes y buscadores con IA entiendan tu negocio.",
      headline: ["Que la IA entienda", "*tu negocio.*"],
      lead: "Cada vez más gente pregunta a asistentes y buscadores con IA en lugar de repasar una lista de enlaces. Preparamos tu web para que se entienda bien: contenido claro, datos estructurados y una marca fácil de reconocer.",
      benefits: [
        { title: "Contenido claro y citable", body: "Respuestas directas a lo que preguntan tus clientes, bien explicadas." },
        { title: "Datos estructurados", body: "Información de tu negocio marcada para que las máquinas la lean sin ambigüedad." },
        { title: "Marca consistente", body: "Tu nombre, servicios y datos iguales en todas partes, para que se te identifique." },
      ],
      includes: [
        "Revisión de cómo se entiende hoy tu web",
        "Contenido en formato pregunta y respuesta",
        "Datos estructurados (schema)",
        "Coherencia de datos del negocio",
        "Mejoras de claridad y estructura",
        "Informe de lo implantado",
      ],
      idealFor: [
        "Negocios que ya trabajan su SEO y quieren dar el siguiente paso",
        "Empresas de servicios con muchas dudas habituales",
        "Webs con buen contenido pero poco estructurado",
      ],
      priceNote: "Presupuesto a medida según el tamaño de la web.",
      faqs: [
        { q: "¿Garantiza que aparezca en las respuestas de una IA?", a: "No, y ningún servicio puede garantizarlo. Mejoramos la claridad y la estructura de tu web, que es lo que sí depende de ti." },
        { q: "¿Sustituye al SEO de siempre?", a: "No, lo complementa. Una web rápida, clara y bien estructurada ayuda a ambos." },
      ],
      related: ["agencia-seo", "auditoria-seo"],
    },
    en: {
      name: "SEO for AI",
      tag: "AI search",
      metaTitle: "SEO for AI: get your site ready for AI-powered search",
      metaDescription:
        "Clear content, structured data and a recognisable brand so AI assistants and search engines understand your business.",
      headline: ["Help AI understand", "*your business.*"],
      lead: "More and more people ask AI assistants and search engines instead of scanning a list of links. We prepare your site to be understood well: clear content, structured data and a recognisable brand.",
      benefits: [
        { title: "Clear, quotable content", body: "Direct, well-explained answers to what your customers ask." },
        { title: "Structured data", body: "Your business information marked up so machines read it without ambiguity." },
        { title: "A consistent brand", body: "Your name, services and details the same everywhere, so you're identified." },
      ],
      includes: [
        "Review of how your site is understood today",
        "Content in question-and-answer format",
        "Structured data (schema)",
        "Consistency of business details",
        "Clarity and structure improvements",
        "Report of what was implemented",
      ],
      idealFor: [
        "Businesses already working on SEO that want the next step",
        "Service companies with many common questions",
        "Sites with good content but little structure",
      ],
      priceNote: "Custom quote depending on the size of the site.",
      faqs: [
        { q: "Does it guarantee I'll appear in AI answers?", a: "No, and no service can. We improve the clarity and structure of your site, which is the part that depends on you." },
        { q: "Does it replace regular SEO?", a: "No, it complements it. A fast, clear, well-structured site helps with both." },
      ],
    },
  },

  /* ── Implantación de IA ────────────────────────────────────────────── */
  {
    slug: "ia-para-empresas",
    slugEn: "ai-for-business",
    area: "web",
    es: {
      name: "IA para empresas",
      tag: "Inteligencia artificial",
      metaTitle: "Inteligencia artificial para empresas y pymes en España",
      metaDescription:
        "Te ayudamos a encontrar dónde la IA te ahorra tiempo de verdad y a ponerla en marcha, empezando por lo pequeño.",
      headline: ["La IA al servicio", "*de tu negocio.*"],
      lead: "Te ayudamos a encontrar dónde la inteligencia artificial te ahorra tiempo de verdad y a ponerla en marcha, sin humo y empezando por lo pequeño.",
      benefits: [
        { title: "Casos concretos", body: "Empezamos por tareas reales de tu día a día, no por tecnología por el gusto de usarla." },
        { title: "Sin complicaciones", body: "Te lo explicamos en claro y lo integramos con las herramientas que ya usas." },
        { title: "Tus datos, con cuidado", body: "Antes de empezar te explicamos qué datos se usan y con qué herramientas." },
      ],
      includes: [
        "Sesión para detectar oportunidades",
        "Propuesta de casos de uso priorizados",
        "Prototipo o prueba piloto",
        "Integración con tus herramientas",
        "Formación para tu equipo",
        "Seguimiento de lo que funciona",
      ],
      idealFor: [
        "Pymes con tareas repetitivas que consumen tiempo",
        "Equipos de atención al cliente con muchas consultas iguales",
        "Negocios que quieren probar sin una gran inversión",
      ],
      priceNote: "Presupuesto a medida según el caso de uso.",
      faqs: [
        { q: "¿Necesito saber de inteligencia artificial?", a: "No. Te explicamos lo que haga falta y empezamos por algo pequeño que puedas ver funcionando." },
        { q: "¿Qué pasa con los datos de mi empresa?", a: "Te explicamos qué datos se usan y con qué herramientas antes de empezar, y queda por escrito en la propuesta." },
      ],
      related: ["automatizacion", "chatbots-agentes-ia"],
    },
    en: {
      name: "AI for business",
      tag: "Artificial intelligence",
      metaTitle: "Artificial intelligence for businesses and small companies",
      metaDescription:
        "We help you find where AI really saves you time and put it to work, starting small.",
      headline: ["AI working", "*for your business.*"],
      lead: "We help you find where artificial intelligence really saves you time and put it to work, no hype, starting small.",
      benefits: [
        { title: "Concrete cases", body: "We start with real tasks from your day to day, not technology for its own sake." },
        { title: "No complications", body: "We explain it plainly and integrate it with the tools you already use." },
        { title: "Your data, handled with care", body: "Before we start we explain which data is used and with which tools." },
      ],
      includes: [
        "A session to spot opportunities",
        "Proposal of prioritised use cases",
        "Prototype or pilot",
        "Integration with your tools",
        "Training for your team",
        "Follow-up on what works",
      ],
      idealFor: [
        "Small businesses with repetitive, time-consuming tasks",
        "Customer service teams with many identical queries",
        "Businesses that want to try without a big investment",
      ],
      priceNote: "Custom quote depending on the use case.",
      faqs: [
        { q: "Do I need to know about artificial intelligence?", a: "No. We explain whatever is needed and start with something small you can see working." },
        { q: "What happens with my company's data?", a: "We explain which data is used and with which tools before starting, and it goes in writing in the proposal." },
      ],
    },
  },
  {
    slug: "automatizacion",
    slugEn: "automation",
    area: "web",
    es: {
      name: "Automatización",
      tag: "Procesos",
      metaTitle: "Automatización de procesos para empresas y pymes",
      metaDescription:
        "Conectamos tus herramientas para que las tareas repetitivas se hagan solas: formularios, correos, hojas de cálculo y más.",
      headline: ["Menos tareas", "*repetitivas.*"],
      lead: "Si copias datos de un sitio a otro, reenvías los mismos correos o apuntas pedidos a mano, probablemente se pueda automatizar. Conectamos tus herramientas para que lo repetitivo se haga solo.",
      benefits: [
        { title: "Ahorras tiempo", body: "Lo repetitivo pasa a hacerse solo, y tu equipo se dedica a lo que aporta valor." },
        { title: "Menos errores", body: "Un proceso automático no se olvida de un paso ni copia mal un dato." },
        { title: "Con tus herramientas", body: "Trabajamos con lo que ya usas, sin obligarte a cambiar de sistema." },
      ],
      includes: [
        "Revisión de tus procesos actuales",
        "Conexión entre herramientas: formularios, correo, hojas y más",
        "Avisos y respuestas automáticas",
        "Informes automáticos",
        "Pruebas antes de activar",
        "Documentación de lo que se ha montado",
      ],
      idealFor: [
        "Negocios que gestionan pedidos o reservas a mano",
        "Equipos que pasan datos de una herramienta a otra",
        "Empresas con tareas administrativas repetidas",
      ],
      priceNote: "Presupuesto a medida según los procesos a automatizar.",
      faqs: [
        { q: "¿Qué procesos se pueden automatizar?", a: "Casi cualquiera que siga siempre los mismos pasos. En la primera conversación revisamos los tuyos y te decimos cuáles compensa automatizar." },
        { q: "¿Y si algo falla?", a: "Probamos todo antes de activarlo y te dejamos documentado cómo funciona, para que sepas qué revisar." },
      ],
      related: ["ia-para-empresas", "software-a-medida"],
    },
    en: {
      name: "Automation",
      tag: "Processes",
      metaTitle: "Process automation for businesses and small companies",
      metaDescription:
        "We connect your tools so repetitive tasks run on their own: forms, emails, spreadsheets and more.",
      headline: ["Fewer", "*repetitive tasks.*"],
      lead: "If you copy data from one place to another, resend the same emails or write orders down by hand, it can probably be automated. We connect your tools so the repetitive work does itself.",
      benefits: [
        { title: "You save time", body: "Repetitive work runs by itself and your team spends time on what adds value." },
        { title: "Fewer mistakes", body: "An automatic process doesn't forget a step or copy a figure wrong." },
        { title: "With your tools", body: "We work with what you already use, without forcing you to change system." },
      ],
      includes: [
        "Review of your current processes",
        "Connections between tools: forms, email, spreadsheets and more",
        "Automatic alerts and replies",
        "Automatic reports",
        "Testing before switching on",
        "Documentation of what was built",
      ],
      idealFor: [
        "Businesses that handle orders or bookings by hand",
        "Teams that move data from one tool to another",
        "Companies with repeated administrative tasks",
      ],
      priceNote: "Custom quote depending on the processes to automate.",
      faqs: [
        { q: "Which processes can be automated?", a: "Almost any that always follows the same steps. In the first conversation we review yours and tell you which are worth automating." },
        { q: "What if something fails?", a: "We test everything before switching it on and document how it works, so you know what to check." },
      ],
    },
  },
  {
    slug: "chatbots-agentes-ia",
    slugEn: "chatbots-and-ai-agents",
    area: "web",
    es: {
      name: "Chatbots y agentes de IA",
      tag: "Asistentes",
      metaTitle: "Chatbots y agentes de IA para atender a tus clientes",
      metaDescription:
        "Un asistente que responde las dudas habituales con la información de tu negocio y pasa a una persona cuando hace falta.",
      headline: ["Un asistente que", "*atiende por ti.*"],
      lead: "Un chatbot bien hecho responde las dudas habituales a cualquier hora y pasa a una persona cuando hace falta. Lo diseñamos con la información de tu negocio, para tu web o tus canales de mensajería.",
      benefits: [
        { title: "Respuestas a cualquier hora", body: "Las preguntas de siempre quedan contestadas, también fuera de tu horario." },
        { title: "Con la información de tu negocio", body: "Responde con tus servicios, precios y condiciones, no con datos inventados." },
        { title: "Una persona cuando hace falta", body: "Si la consulta es compleja, la deriva a ti o a tu equipo." },
      ],
      includes: [
        "Diseño de las conversaciones",
        "Preparación con la información de tu negocio",
        "Integración en tu web o en mensajería",
        "Traspaso a una persona",
        "Revisión de las respuestas",
        "Mejoras a partir de conversaciones reales",
      ],
      idealFor: [
        "Negocios que reciben las mismas preguntas una y otra vez",
        "Empresas con atención al cliente saturada",
        "Webs que quieren ayudar al visitante a decidirse",
      ],
      priceNote: "Presupuesto a medida según el alcance del asistente.",
      faqs: [
        { q: "¿Puede inventarse respuestas?", a: "Lo diseñamos para responder con la información que le damos y derivar a una persona cuando no la tiene. Revisamos las respuestas para afinarlo." },
        { q: "¿Dónde puede funcionar?", a: "En tu web y, según el caso, en canales de mensajería. Lo concretamos al ver qué necesitas." },
      ],
      related: ["ia-para-empresas", "automatizacion"],
    },
    en: {
      name: "Chatbots and AI agents",
      tag: "Assistants",
      metaTitle: "Chatbots and AI agents to look after your customers",
      metaDescription:
        "An assistant that answers common questions with your business's information and hands over to a person when needed.",
      headline: ["An assistant that", "*answers for you.*"],
      lead: "A well-made chatbot answers common questions at any hour and hands over to a person when needed. We design it with your business's information, for your website or your messaging channels.",
      benefits: [
        { title: "Answers at any hour", body: "The usual questions get answered, outside your opening hours too." },
        { title: "With your business's information", body: "It answers with your services, prices and terms, not made-up facts." },
        { title: "A person when needed", body: "If the query is complex, it hands it to you or your team." },
      ],
      includes: [
        "Conversation design",
        "Preparation with your business's information",
        "Integration into your website or messaging",
        "Handover to a person",
        "Review of the answers",
        "Improvements from real conversations",
      ],
      idealFor: [
        "Businesses that get the same questions again and again",
        "Companies with overloaded customer service",
        "Sites that want to help visitors decide",
      ],
      priceNote: "Custom quote depending on the scope of the assistant.",
      faqs: [
        { q: "Can it make up answers?", a: "We design it to answer from the information we give it and to hand over to a person when it doesn't have it. We review the answers to fine-tune it." },
        { q: "Where can it work?", a: "On your website and, depending on the case, on messaging channels. We settle it once we see what you need." },
      ],
    },
  },

  /* ── Web ───────────────────────────────────────────────────────────── */
  {
    slug: "mantenimiento-web",
    slugEn: "website-maintenance",
    area: "web",
    es: {
      name: "Mantenimiento web",
      tag: "Después del lanzamiento",
      metaTitle: "Mantenimiento web: actualizaciones, copias y soporte",
      metaDescription:
        "Nos encargamos de las actualizaciones, las copias de seguridad y de vigilar que tu web siga en línea.",
      headline: ["Tu web, siempre", "*al día.*"],
      lead: "Una web publicada necesita cuidados: actualizaciones, copias de seguridad y alguien atento si algo falla. Nos encargamos para que tú te dediques a tu negocio.",
      benefits: [
        { title: "Siempre en línea", body: "Vigilamos que la web siga funcionando y actuamos si algo falla." },
        { title: "Con copias de seguridad", body: "Si pasa algo, tu web se puede recuperar." },
        { title: "Cambios sin esperas", body: "Pequeños cambios de textos e imágenes y soporte por email." },
      ],
      includes: [
        "Actualizaciones",
        "Copias de seguridad",
        "Vigilancia de que la web siga en línea",
        "Pequeños cambios de textos e imágenes",
        "Soporte por email",
      ],
      idealFor: [
        "Negocios que no quieren ocuparse de la parte técnica",
        "Webs que cambian de vez en cuando",
        "Quien prefiere tener a alguien de confianza detrás",
      ],
      priceNote: `Opcional y aparte del precio de la web, desde ${maintenancePrice("es")} según el tamaño de la web.`,
      faqs: [
        { q: "¿Es obligatorio?", a: "No. Es opcional. Si prefieres llevar tú la web, te la entregamos lista y te explicamos cómo hacerlo." },
        { q: "¿Puedo contratarlo si la web no la habéis hecho vosotros?", a: "Cuéntanos cómo está hecha y te decimos si podemos encargarnos." },
      ],
      related: ["diseno-web", "tiendas-online"],
    },
    en: {
      name: "Website maintenance",
      tag: "After launch",
      metaTitle: "Website maintenance: updates, backups and support",
      metaDescription:
        "We take care of updates, backups and keeping your website online.",
      headline: ["Your website,", "*always up to date.*"],
      lead: "A live website needs looking after: updates, backups and someone attentive if something fails. We take care of it so you can get on with your business.",
      benefits: [
        { title: "Always online", body: "We watch that the website keeps working and act if something fails." },
        { title: "With backups", body: "If something happens, your site can be recovered." },
        { title: "Changes without waiting", body: "Small text and image changes and email support." },
      ],
      includes: [
        "Updates",
        "Backups",
        "Monitoring that the site stays online",
        "Small text and image changes",
        "Email support",
      ],
      idealFor: [
        "Businesses that don't want to deal with the technical side",
        "Sites that change from time to time",
        "Anyone who prefers a trusted person behind it",
      ],
      priceNote: `Optional and separate from the price of the site, from ${maintenancePrice("en")} depending on the size of the site.`,
      faqs: [
        { q: "Is it compulsory?", a: "No, it's optional. If you prefer to run the site yourself, we hand it over ready and explain how." },
        { q: "Can I hire it if you didn't build the site?", a: "Tell us how it's built and we'll say whether we can take it on." },
      ],
    },
  },

  /* ── Software y apps ───────────────────────────────────────────────── */
  {
    slug: "software-a-medida",
    slugEn: "custom-software",
    area: "web",
    es: {
      name: "Software a medida",
      tag: "A medida",
      metaTitle: "Desarrollo de software a medida para empresas",
      metaDescription:
        "Paneles internos, gestión de pedidos, áreas de cliente y lo que necesite tu negocio, hecho a tu medida.",
      headline: ["Software hecho", "*a tu manera.*"],
      lead: "Si tus procesos no caben en un programa de catálogo, lo construimos a tu medida: paneles internos, gestión de pedidos, áreas de cliente o lo que necesite tu negocio.",
      benefits: [
        { title: "Encaja con tu forma de trabajar", body: "El programa se adapta a tu proceso, no al revés." },
        { title: "Por etapas", body: "Ves avances desde pronto y puedes corregir el rumbo antes de seguir." },
        { title: "Tuyo y ampliable", body: "Puede crecer con tu negocio cuando lo necesites." },
      ],
      includes: [
        "Análisis de necesidades",
        "Diseño de pantallas y flujos",
        "Desarrollo por etapas",
        "Panel de administración",
        "Pruebas con tu equipo",
        "Entrega y soporte inicial",
      ],
      idealFor: [
        "Empresas con procesos que ningún programa cubre bien",
        "Negocios que gestionan datos en hojas de cálculo",
        "Quien necesita un área privada para clientes o equipo",
      ],
      priceNote: "Presupuesto a medida por escrito antes de empezar.",
      faqs: [
        { q: "¿Cuánto cuesta?", a: "Depende de lo que necesites. Te enviamos un presupuesto por escrito con el alcance antes de empezar." },
        { q: "¿Puedo empezar por algo pequeño?", a: "Sí. Lo habitual es empezar por la parte que más pesa y ampliar después." },
      ],
      related: ["apps-a-medida", "desarrollo-a-medida"],
    },
    en: {
      name: "Custom software",
      tag: "Bespoke",
      metaTitle: "Custom software development for businesses",
      metaDescription:
        "Internal dashboards, order management, customer areas and whatever your business needs, built to measure.",
      headline: ["Software made", "*your way.*"],
      lead: "If your processes don't fit an off-the-shelf program, we build it to measure: internal dashboards, order management, customer areas or whatever your business needs.",
      benefits: [
        { title: "Fits the way you work", body: "The program adapts to your process, not the other way round." },
        { title: "In stages", body: "You see progress early and can change course before moving on." },
        { title: "Yours and expandable", body: "It can grow with your business when you need it." },
      ],
      includes: [
        "Needs analysis",
        "Design of screens and flows",
        "Development in stages",
        "Admin panel",
        "Testing with your team",
        "Handover and initial support",
      ],
      idealFor: [
        "Companies with processes no program covers well",
        "Businesses that manage data in spreadsheets",
        "Anyone who needs a private area for customers or the team",
      ],
      priceNote: "Custom quote in writing before we start.",
      faqs: [
        { q: "How much does it cost?", a: "It depends on what you need. We send a written quote with the scope before we start." },
        { q: "Can I start small?", a: "Yes. It's usual to start with the part that matters most and expand later." },
      ],
    },
  },
  {
    slug: "apps-a-medida",
    slugEn: "custom-apps",
    area: "web",
    es: {
      name: "Apps a medida",
      tag: "Móvil y web",
      metaTitle: "Desarrollo de apps a medida para móvil y web",
      metaDescription:
        "Diseñamos y desarrollamos tu app, de la idea al lanzamiento. Hemos lanzado las nuestras.",
      headline: ["Tu idea,", "*en el móvil.*"],
      lead: "Diseñamos y desarrollamos tu app de la idea al lanzamiento. Hemos diseñado, programado y lanzado nuestras propias apps, así que conocemos bien el camino.",
      benefits: [
        { title: "De la idea al lanzamiento", body: "Un mismo equipo diseña, programa y acompaña el lanzamiento." },
        { title: "Pensada para usarse", body: "Una experiencia clara y rápida, probada con personas reales." },
        { title: "Empezamos por lo esencial", body: "Una primera versión útil que se puede ampliar según lo que vayas aprendiendo." },
      ],
      includes: [
        "Definición del alcance",
        "Diseño de la experiencia y de las pantallas",
        "Desarrollo de la app",
        "Pruebas con usuarios",
        "Lanzamiento acompañado",
        "Mejoras posteriores",
      ],
      idealFor: [
        "Emprendedores con una idea de app",
        "Negocios que quieren dar un servicio a sus clientes desde el móvil",
        "Empresas que necesitan una herramienta interna en móvil",
      ],
      priceNote: "Presupuesto a medida por escrito antes de empezar.",
      faqs: [
        { q: "¿Qué ejemplos tenéis?", a: "Nuestras propias apps, como Roady o Gym Tracker, que puedes ver en la sección de proyectos." },
        { q: "¿Hace falta tenerlo todo definido?", a: "No. Si tienes una idea, la aterrizamos juntos antes de presupuestar." },
      ],
      related: ["software-a-medida", "crm-inmobiliario"],
    },
    en: {
      name: "Custom apps",
      tag: "Mobile and web",
      metaTitle: "Custom app development for mobile and web",
      metaDescription:
        "We design and build your app, from idea to launch. We've launched our own.",
      headline: ["Your idea,", "*on the phone.*"],
      lead: "We design and build your app from idea to launch. We've designed, built and launched our own apps, so we know the road well.",
      benefits: [
        { title: "From idea to launch", body: "One team designs, builds and supports the launch." },
        { title: "Made to be used", body: "A clear, fast experience, tested with real people." },
        { title: "We start with the essentials", body: "A useful first version you can expand as you learn." },
      ],
      includes: [
        "Scope definition",
        "Experience and screen design",
        "App development",
        "Testing with users",
        "Supported launch",
        "Later improvements",
      ],
      idealFor: [
        "Entrepreneurs with an app idea",
        "Businesses that want to serve customers from their phones",
        "Companies that need an internal tool on mobile",
      ],
      priceNote: "Custom quote in writing before we start.",
      faqs: [
        { q: "What examples do you have?", a: "Our own apps, such as Roady or Gym Tracker, which you can see in the projects section." },
        { q: "Do I need everything defined?", a: "No. If you have an idea, we shape it together before quoting." },
      ],
    },
  },
  {
    slug: "crm-inmobiliario",
    slugEn: "real-estate-crm",
    area: "web",
    es: {
      name: "CRM inmobiliario",
      tag: "Inmobiliarias",
      metaTitle: "CRM inmobiliario a medida para agencias",
      metaDescription:
        "Propiedades, contactos y visitas en un solo sitio, adaptado a cómo trabaja tu inmobiliaria.",
      headline: ["Tus propiedades y", "*clientes, en orden.*"],
      lead: "Un CRM pensado para inmobiliarias: propiedades, contactos interesados y visitas en un solo sitio, adaptado a tu forma de trabajar y no al revés.",
      benefits: [
        { title: "Todo en un sitio", body: "Propiedades, contactos y visitas juntos, sin hojas de cálculo sueltas." },
        { title: "Adaptado a tu agencia", body: "Los campos y el proceso se ajustan a cómo vendes y alquilas." },
        { title: "Conectado con tu web y tus 3D", body: "Las propiedades pueden mostrarse en tu web, con imágenes 3D hechas por nosotros." },
      ],
      includes: [
        "Ficha de propiedades con fotos y estado",
        "Base de contactos y seguimiento",
        "Agenda de visitas",
        "Avisos y recordatorios",
        "Informes sencillos",
        "Conexión con tu web",
      ],
      idealFor: [
        "Inmobiliarias que gestionan todo con hojas de cálculo",
        "Agencias que quieren ordenar sus propiedades y contactos",
        "Equipos que necesitan compartir información al día",
      ],
      priceNote: "Presupuesto a medida por escrito antes de empezar.",
      faqs: [
        { q: "¿Por qué no un CRM genérico?", a: "Un CRM genérico puede valer. Si tu forma de trabajar no encaja, lo hacemos a tu medida. Lo vemos en la primera conversación." },
        { q: "¿Se puede combinar con diseño 3D?", a: "Sí. Podemos mostrar tus propiedades con imágenes 3D en el CRM y en tu web." },
      ],
      related: ["diseno-3d", "software-a-medida"],
    },
    en: {
      name: "Real estate CRM",
      tag: "Estate agencies",
      metaTitle: "Custom real estate CRM for agencies",
      metaDescription:
        "Properties, contacts and viewings in one place, adapted to how your agency works.",
      headline: ["Your properties and", "*clients, in order.*"],
      lead: "A CRM built for estate agencies: properties, interested contacts and viewings in one place, adapted to the way you work, not the other way round.",
      benefits: [
        { title: "Everything in one place", body: "Properties, contacts and viewings together, with no loose spreadsheets." },
        { title: "Adapted to your agency", body: "Fields and process fit how you sell and let." },
        { title: "Connected to your site and 3D", body: "Properties can be shown on your website, with 3D images made by us." },
      ],
      includes: [
        "Property records with photos and status",
        "Contact base and follow-up",
        "Viewing calendar",
        "Alerts and reminders",
        "Simple reports",
        "Connection with your website",
      ],
      idealFor: [
        "Estate agencies that manage everything in spreadsheets",
        "Agencies that want to organise their properties and contacts",
        "Teams that need to share up-to-date information",
      ],
      priceNote: "Custom quote in writing before we start.",
      faqs: [
        { q: "Why not a generic CRM?", a: "A generic CRM may do. If your way of working doesn't fit, we build it to measure. We see it in the first conversation." },
        { q: "Can it be combined with 3D design?", a: "Yes. We can show your properties with 3D images in the CRM and on your website." },
      ],
    },
  },

  /* ── Marca ─────────────────────────────────────────────────────────── */
  {
    slug: "naming",
    slugEn: "naming",
    area: "brand",
    es: {
      name: "Naming",
      tag: "Nombre",
      metaTitle: "Naming: encontrar el nombre de tu marca o negocio",
      metaDescription:
        "Te proponemos nombres pensados para tu público, fáciles de decir y de escribir, y comprobamos dominio y perfiles.",
      headline: ["Un nombre que", "*se queda.*"],
      lead: "El nombre es lo primero que se dice de tu negocio. Te proponemos nombres pensados para tu público, fáciles de decir y de escribir, y comprobamos si se pueden usar como dominio y perfil.",
      benefits: [
        { title: "Pensado para tu público", body: "Partimos de tu negocio y de cómo quieres que se te perciba." },
        { title: "Fácil de decir y de escribir", body: "Un nombre que se recuerda, se pronuncia bien y se escribe sin dudas." },
        { title: "Con dominio y perfiles a la vista", body: "Comprobamos disponibilidad para que no te quedes sin el nombre." },
      ],
      includes: [
        "Sesión de briefing",
        "Propuestas de nombre con su razonamiento",
        "Comprobación de dominio y perfiles",
        "Ronda de ajustes",
        "Lista corta para decidir",
        "Continuación en logotipo e identidad",
      ],
      idealFor: [
        "Negocios nuevos sin nombre todavía",
        "Marcas que quieren renombrarse",
        "Proyectos que van a lanzar un producto nuevo",
      ],
      priceNote: "Presupuesto a medida según el alcance.",
      faqs: [
        { q: "¿Registráis la marca?", a: "El registro de una marca es un trámite legal aparte. Te orientamos sobre qué comprobar y puedes hacerlo con un agente de propiedad industrial." },
        { q: "¿Cuántos nombres me proponéis?", a: "Una lista corta y razonada. Lo concretamos al ver el proyecto." },
      ],
      related: ["identidad-de-marca", "diseno-grafico-y-packaging"],
    },
    en: {
      name: "Naming",
      tag: "Name",
      metaTitle: "Naming: finding the name for your brand or business",
      metaDescription:
        "We propose names built for your audience, easy to say and spell, and check domain and profiles.",
      headline: ["A name that", "*sticks.*"],
      lead: "The name is the first thing people say about your business. We propose names built for your audience, easy to say and spell, and check whether they can be used as a domain and profile.",
      benefits: [
        { title: "Built for your audience", body: "We start from your business and how you want to be seen." },
        { title: "Easy to say and spell", body: "A name that's remembered, pronounced well and spelled without doubt." },
        { title: "With domain and profiles in view", body: "We check availability so you don't lose the name." },
      ],
      includes: [
        "Briefing session",
        "Name proposals with their reasoning",
        "Domain and profile checks",
        "A round of adjustments",
        "A short list to decide from",
        "Continuation into logo and identity",
      ],
      idealFor: [
        "New businesses without a name yet",
        "Brands that want to rename",
        "Projects launching a new product",
      ],
      priceNote: "Custom quote depending on scope.",
      faqs: [
        { q: "Do you register the trademark?", a: "Registering a trademark is a separate legal process. We point you to what to check, and you can do it with an industrial property agent." },
        { q: "How many names do you propose?", a: "A short, reasoned list. We settle it once we see the project." },
      ],
    },
  },
  {
    slug: "video-corporativo",
    slugEn: "corporate-video",
    area: "brand",
    es: {
      name: "Vídeo corporativo",
      tag: "Vídeo",
      metaTitle: "Vídeo corporativo y de promoción para empresas",
      metaDescription:
        "Vídeos cortos para tu web, redes y anuncios, con el estilo de tu marca: guion, diseño, animación y edición.",
      headline: ["Cuenta tu negocio", "*en movimiento.*"],
      lead: "Un vídeo corto explica en medio minuto lo que una web tarda más en contar. Hacemos vídeos corporativos y de promoción para tu web, redes y anuncios, con el estilo de tu marca.",
      benefits: [
        { title: "Claro y breve", body: "Un mensaje principal, bien contado, en poco tiempo." },
        { title: "Con tu marca", body: "Colores, tipografías y tono de tu identidad, para que se te reconozca." },
        { title: "Para cada formato", body: "Versiones para web, redes verticales y anuncios." },
      ],
      includes: [
        "Guion y estructura",
        "Diseño visual con tu marca",
        "Animación y edición",
        "Música y sonido",
        "Formatos para web, redes y anuncios",
        "Ronda de revisión",
      ],
      idealFor: [
        "Negocios que quieren presentarse en vídeo",
        "Empresas que van a anunciarse en redes",
        "Lanzamientos de producto o de servicio",
      ],
      priceNote: "Presupuesto a medida según la duración y el tipo de vídeo.",
      faqs: [
        { q: "¿Hace falta grabar?", a: "Depende del tipo. Podemos trabajar con animación, con tus imágenes o con material que ya tengas." },
        { q: "¿Cuánto dura un vídeo?", a: "Para web y redes suelen ser vídeos cortos. Lo concretamos según tu objetivo." },
      ],
      related: ["identidad-de-marca", "agencia-marketing-digital"],
    },
    en: {
      name: "Corporate video",
      tag: "Video",
      metaTitle: "Corporate and promotional video for businesses",
      metaDescription:
        "Short videos for your website, social media and ads, in your brand's style: script, design, animation and editing.",
      headline: ["Tell your business", "*in motion.*"],
      lead: "A short video explains in half a minute what a website takes longer to tell. We make corporate and promotional videos for your website, social media and ads, in your brand's style.",
      benefits: [
        { title: "Clear and brief", body: "One main message, well told, in little time." },
        { title: "With your brand", body: "Colours, typefaces and tone from your identity, so you're recognised." },
        { title: "For every format", body: "Versions for web, vertical social media and ads." },
      ],
      includes: [
        "Script and structure",
        "Visual design with your brand",
        "Animation and editing",
        "Music and sound",
        "Formats for web, social media and ads",
        "A review round",
      ],
      idealFor: [
        "Businesses that want to introduce themselves on video",
        "Companies about to advertise on social media",
        "Product or service launches",
      ],
      priceNote: "Custom quote depending on length and type of video.",
      faqs: [
        { q: "Does it need filming?", a: "It depends on the type. We can work with animation, with your images or with material you already have." },
        { q: "How long is a video?", a: "For web and social media they're usually short. We settle it according to your goal." },
      ],
    },
  },
];

export const morePages: ServicePage[] = entries.map((e) => {
  const { priceNote, ...rest } = e.es;
  return { slug: e.slug, area: e.area, ...rest, price: { note: priceNote } };
});

export const morePagesEn: Record<string, PageEn> = Object.fromEntries(
  entries.map((e) => [e.slug, { slugEn: e.slugEn, ...e.en }]),
);
