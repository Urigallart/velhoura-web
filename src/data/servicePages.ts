import { plans } from "./plans";
import type { Service } from "./services";

/**
 * One page per service, under /servicios/[slug]. Each is a long-form page a
 * business owner can land on from Google: what it is, what you get, who it
 * suits, what it costs, and the questions people ask before hiring.
 *
 * Images: drop a file in `public/servicios/` and set `image` to its path
 * (e.g. "/servicios/diseno-web.jpg"). Until then the page shows a generated
 * visual in the brand's own materials, so nothing looks unfinished.
 *
 * Prices: only the web services have published figures (from `plans.ts`).
 * The rest say "Presupuesto a medida" until the studio sets a starting price.
 */

export type ServicePage = {
  slug: string;
  area: Service["id"];
  /** Name in menus and cards. */
  name: string;
  /** Short tag shown beside the name in the header dropdown. */
  tag: string;
  /** Search-facing title and description. */
  metaTitle: string;
  metaDescription: string;
  /** Page headline, split into lines; wrap a word in * for emphasis. */
  headline: string[];
  lead: string;
  image?: string;
  imageAlt?: string;
  benefits: { title: string; body: string }[];
  includes: string[];
  idealFor: string[];
  price: { from?: string; note: string };
  faqs: { q: string; a: string }[];
  related: string[];
};

const plan = (id: string) => plans.find((p) => p.id === id);
const priceFrom = (id: string) => {
  const p = plan(id);
  return p?.pricePrefix ? `${p.pricePrefix} ${p.price}` : undefined;
};

export const servicePages: ServicePage[] = [
  {
    slug: "identidad-de-marca",
    area: "brand",
    name: "Identidad de marca",
    tag: "Logotipo",
    metaTitle: "Diseño de logotipo e identidad de marca en Barcelona",
    metaDescription:
      "Creamos el logotipo y la identidad visual de tu negocio: símbolo, colores, tipografías y un manual sencillo para aplicarla bien en todas partes.",
    headline: ["Una marca que", "*se recuerda.*"],
    lead: "Tu logotipo es lo primero que ve un cliente y lo que más veces verá. Diseñamos una identidad que explica quién eres de un vistazo y que funciona igual de bien en un rótulo, una factura o un perfil de Instagram.",
    benefits: [
      {
        title: "Pensada desde tu negocio",
        body: "Antes de dibujar nada hablamos de tus clientes, tu competencia y cómo quieres que te perciban. El diseño sale de ahí, no de una moda.",
      },
      {
        title: "Coherente en todos los soportes",
        body: "Preparamos versiones para fondo claro y oscuro, tamaño pequeño y aplicaciones reales, para que nunca tengas que improvisar.",
      },
      {
        title: "Fácil de usar sin nosotros",
        body: "Te entregamos un manual breve y claro con colores, tipografías y ejemplos, para que cualquier proveedor la aplique bien.",
      },
    ],
    includes: [
      "Sesión inicial para entender tu negocio",
      "Propuestas de logotipo y una ronda de ajustes",
      "Paleta de colores y tipografías",
      "Versiones del logo para cada uso",
      "Manual de identidad en PDF",
      "Archivos listos para imprenta y web",
    ],
    idealFor: [
      "Negocios que empiezan y necesitan imagen desde cero",
      "Empresas con un logo antiguo que ya no las representa",
      "Marcas que se ven distintas en cada sitio y quieren orden",
    ],
    price: { note: "Presupuesto a medida según el alcance." },
    faqs: [
      {
        q: "¿Es lo mismo un logotipo que una identidad de marca?",
        a: "No. El logotipo es una pieza; la identidad incluye además los colores, las tipografías y las reglas que hacen que todo lo que publicas se reconozca como tuyo.",
      },
      {
        q: "¿Puedo renovar mi logo sin cambiarlo del todo?",
        a: "Sí. A menudo basta con modernizar y ordenar lo que ya tienes, conservando lo que tus clientes reconocen.",
      },
      {
        q: "¿En qué formatos recibo los archivos?",
        a: "En vectorial para imprenta y en imagen para web y redes, con versiones a color, en negativo y monocromo.",
      },
    ],
    related: ["diseno-grafico-y-packaging", "diseno-web"],
  },
  {
    slug: "diseno-grafico-y-packaging",
    area: "brand",
    name: "Diseño gráfico y packaging",
    tag: "Gráfico",
    metaTitle: "Diseño gráfico y packaging para empresas en Barcelona",
    metaDescription:
      "Papelería, catálogos, cartelería, piezas para redes y packaging: diseño gráfico que mantiene tu marca coherente en cada pieza.",
    headline: ["Cada pieza,", "*a la altura.*"],
    lead: "Una tarjeta, un menú, una etiqueta o una caja también venden. Diseñamos las piezas gráficas de tu negocio para que todas hablen el mismo idioma y transmitan cuidado.",
    benefits: [
      {
        title: "Packaging que destaca",
        body: "Envases y etiquetas pensados para el estante y para la foto: que se distingan a dos metros y que expliquen el producto de cerca.",
      },
      {
        title: "Listo para imprimir",
        body: "Preparamos los archivos con las especificaciones de tu imprenta para que no haya sorpresas de color ni de corte.",
      },
      {
        title: "Siempre dentro de tu marca",
        body: "Cada pieza parte de tu identidad, así que el conjunto se ve profesional aunque se haga en momentos distintos.",
      },
    ],
    includes: [
      "Papelería: tarjetas, facturas, sobres",
      "Catálogos, folletos y presentaciones",
      "Cartelería y rótulos",
      "Plantillas para redes sociales",
      "Diseño de etiquetas y envases",
      "Archivos de imprenta revisados",
    ],
    idealFor: [
      "Marcas de producto que van a salir a tienda",
      "Comercios y restaurantes que renuevan su imagen",
      "Empresas que necesitan material para ferias o ventas",
    ],
    price: { note: "Presupuesto por pieza o por paquete." },
    faqs: [
      {
        q: "¿Os encargáis también de la impresión?",
        a: "Diseñamos y preparamos los archivos para la imprenta que elijas, y podemos coordinarnos con ella para revisar pruebas.",
      },
      {
        q: "¿Podéis diseñar sobre una marca que ya existe?",
        a: "Sí. Trabajamos con tu identidad actual y, si hace falta, la ordenamos un poco para que las piezas queden coherentes.",
      },
      {
        q: "¿Hacéis plantillas que pueda editar yo?",
        a: "Sí, para redes y documentos habituales te dejamos plantillas editables para que puedas publicar sin depender de nosotros.",
      },
    ],
    related: ["identidad-de-marca", "tiendas-online"],
  },
  {
    slug: "diseno-web",
    area: "web",
    name: "Diseño web y WordPress",
    tag: "WordPress",
    metaTitle: "Diseño de páginas web y WordPress para pymes en Barcelona",
    metaDescription:
      "Webs corporativas rápidas, adaptadas a móvil y fáciles de editar, pensadas para que las visitas se conviertan en contactos.",
    headline: ["Tu mejor comercial,", "*abierto siempre.*"],
    lead: "Cuando alguien oye hablar de ti, lo primero que hace es buscarte. Diseñamos webs claras y rápidas que explican lo que haces, generan confianza y le ponen fácil contactar.",
    benefits: [
      {
        title: "Diseñada para convertir",
        body: "Cada página tiene un objetivo: que te llamen, te escriban o te pidan presupuesto. El diseño acompaña a la visita hasta ese paso.",
      },
      {
        title: "Rápida y en el móvil",
        body: "La mayoría de visitas llegan desde el teléfono. La web carga deprisa y se lee bien en cualquier pantalla, algo que también valora Google.",
      },
      {
        title: "La editas tú",
        body: "Con WordPress puedes cambiar textos, fotos o añadir novedades sin tocar código y sin esperar a nadie.",
      },
    ],
    includes: [
      "Estructura y textos orientados a captar contactos",
      "Diseño a medida con tu identidad",
      "Adaptación a móvil y tablet",
      "Formularios de contacto",
      "SEO básico y velocidad optimizada",
      "Formación para editar el contenido",
    ],
    idealFor: [
      "Pymes y profesionales sin web o con una desfasada",
      "Negocios locales que quieren aparecer y recibir consultas",
      "Empresas que necesitan explicar bien varios servicios",
    ],
    price: {
      from: priceFrom("landing"),
      note: `Landing ${priceFrom("landing")?.toLowerCase()} · Web de empresa ${priceFrom("business")?.toLowerCase()}. Precios orientativos.`,
    },
    faqs: [
      {
        q: "¿Qué diferencia hay entre una landing y una web completa?",
        a: "Una landing es una sola página centrada en un objetivo; una web de empresa tiene varias páginas para servicios, sobre vosotros, contacto y más.",
      },
      {
        q: "¿Puedo actualizar la web yo mismo?",
        a: "Sí. Te explicamos cómo editar textos e imágenes para que el día a día no dependa de nosotros.",
      },
      {
        q: "¿Os encargáis del dominio y el alojamiento?",
        a: "Te ayudamos a elegirlos y a configurarlos para que la web quede publicada y funcionando.",
      },
    ],
    related: ["seo", "tiendas-online"],
  },
  {
    slug: "tiendas-online",
    area: "web",
    name: "Tiendas online",
    tag: "E-commerce",
    metaTitle: "Diseño de tiendas online para pymes en Barcelona",
    metaDescription:
      "Tiendas online con catálogo, carrito, pagos seguros y gestión de pedidos, para vender también fuera de tu horario.",
    headline: ["Vende también", "*cuando cierras.*"],
    lead: "Una tienda online amplía tu negocio más allá del mostrador y del horario. La montamos completa: catálogo, carrito, pagos y un panel sencillo para gestionar pedidos.",
    benefits: [
      {
        title: "Compra sin fricción",
        body: "Fichas de producto claras, carrito rápido y un pago en pocos pasos, para que menos gente abandone a mitad.",
      },
      {
        title: "Pagos seguros",
        body: "Integramos pasarelas de pago fiables para que tus clientes paguen con confianza y tú cobres sin complicaciones.",
      },
      {
        title: "Gestión sencilla",
        body: "Productos, stock, pedidos, envíos y descuentos desde un panel pensado para usarlo a diario.",
      },
    ],
    includes: [
      "Catálogo y fichas de producto",
      "Carrito y proceso de compra",
      "Pagos con tarjeta",
      "Gestión de pedidos e inventario",
      "Envíos y códigos de descuento",
      "Panel de administración",
    ],
    idealFor: [
      "Comercios que quieren vender también online",
      "Marcas de producto que lanzan venta directa",
      "Negocios que hoy venden por mensajes y quieren ordenarlo",
    ],
    price: {
      from: priceFrom("ecommerce"),
      note: "Precio orientativo para una tienda completa.",
    },
    faqs: [
      {
        q: "¿Puedo subir y editar productos yo mismo?",
        a: "Sí. Desde el panel añades productos, cambias precios y gestionas el stock sin ayuda.",
      },
      {
        q: "¿Qué métodos de pago puedo ofrecer?",
        a: "Pago con tarjeta mediante una pasarela segura y, según tus necesidades, otros métodos habituales.",
      },
      {
        q: "¿Tenéis experiencia vendiendo online?",
        a: "Sí: uno de nuestros proyectos propios es una tienda online de gafas de sol que diseñamos y gestionamos nosotros.",
      },
    ],
    related: ["diseno-web", "google-ads"],
  },
  {
    slug: "desarrollo-a-medida",
    area: "web",
    name: "Desarrollo a medida",
    tag: "A medida",
    metaTitle: "Desarrollo web y aplicaciones a medida en Barcelona",
    metaDescription:
      "Áreas de cliente, sistemas de reservas, paneles internos y aplicaciones web hechas a la medida de cómo trabaja tu negocio.",
    headline: ["Herramientas que", "*te ahorran horas.*"],
    lead: "Cuando una plantilla no basta, lo programamos. Desarrollamos aplicaciones web y herramientas internas que se adaptan a tu forma de trabajar, en lugar de obligarte a adaptarte a ellas.",
    benefits: [
      {
        title: "Hecho para tu proceso",
        body: "Partimos de cómo trabajáis hoy y automatizamos lo repetitivo: reservas, presupuestos, seguimiento de clientes, informes.",
      },
      {
        title: "Tecnología actual",
        body: "Usamos herramientas modernas y probadas, las mismas con las que construimos y mantenemos nuestros propios productos.",
      },
      {
        title: "Crece contigo",
        body: "Empezamos por lo imprescindible y añadimos funciones por etapas, cuando el uso real demuestra que hacen falta.",
      },
    ],
    includes: [
      "Análisis de necesidades y propuesta técnica",
      "Diseño de la interfaz",
      "Desarrollo de la aplicación web",
      "Base de datos y usuarios con permisos",
      "Integraciones con otras herramientas",
      "Puesta en marcha y soporte inicial",
    ],
    idealFor: [
      "Empresas que gestionan todo con hojas de cálculo",
      "Negocios que necesitan un área privada para clientes",
      "Proyectos que quieren lanzar su propia plataforma",
    ],
    price: { note: "Presupuesto a medida tras analizar el proyecto." },
    faqs: [
      {
        q: "¿Cómo sé si necesito algo a medida?",
        a: "Si tu equipo repite tareas a mano o usa varias herramientas que no se hablan entre sí, probablemente sí. Lo valoramos juntos antes de proponer nada.",
      },
      {
        q: "¿Habéis hecho aplicaciones propias?",
        a: "Sí. Tenemos productos propios en producción, como una app para preparar el examen teórico de conducir y otra de registro de entrenamientos.",
      },
      {
        q: "¿Quién mantiene la aplicación después?",
        a: "Podemos seguir encargándonos del mantenimiento con una cuota mensual aparte, o dejarla documentada para que la gestione tu equipo. Las mejoras nuevas se presupuestan por separado.",
      },
    ],
    related: ["diseno-web", "seo"],
  },
  {
    slug: "seo",
    area: "growth",
    name: "Posicionamiento SEO",
    tag: "Google",
    metaTitle: "Posicionamiento SEO para pymes en Barcelona",
    metaDescription:
      "Mejoramos tu posición en Google para que te encuentre quien busca lo que ofreces en tu zona: SEO técnico, contenido y ficha de empresa.",
    headline: ["Que te encuentren", "*cuando te buscan.*"],
    lead: "Cada día hay personas buscando en Google lo que tú vendes. El posicionamiento SEO hace que aparezcas en esas búsquedas sin pagar por cada clic, con resultados que se acumulan con el tiempo.",
    benefits: [
      {
        title: "Visibilidad en tu zona",
        body: "Trabajamos tu ficha de empresa y las búsquedas locales para que aparezcas a quien busca cerca de ti.",
      },
      {
        title: "Una web que Google entiende",
        body: "Revisamos velocidad, estructura y contenidos para que tu web sea fácil de leer tanto para las personas como para el buscador.",
      },
      {
        title: "Resultados que se miden",
        body: "Te contamos cada mes qué ha cambiado: posiciones, visitas y contactos que llegan desde Google.",
      },
    ],
    includes: [
      "Revisión inicial de tu web y tu competencia",
      "Búsqueda de palabras clave con intención de compra",
      "Mejoras técnicas y de velocidad",
      "Optimización de textos y páginas clave",
      "Ficha de empresa en Google",
      "Informe mensual de evolución",
    ],
    idealFor: [
      "Negocios locales que dependen de que los encuentren",
      "Webs con visitas pero sin contactos",
      "Empresas que quieren depender menos de la publicidad",
    ],
    price: { note: "Presupuesto mensual según el punto de partida." },
    faqs: [
      {
        q: "¿Cuánto tarda en notarse el SEO?",
        a: "Depende de tu sector y de cómo esté la web, pero es un trabajo de meses. A cambio, sus resultados se mantienen sin pagar por cada visita.",
      },
      {
        q: "¿Es mejor SEO o Google Ads?",
        a: "Se complementan: los anuncios traen contactos desde el primer día y el SEO construye visibilidad a largo plazo. Te recomendamos la mezcla según tu caso.",
      },
      {
        q: "¿Podéis garantizar la primera posición?",
        a: "Nadie puede garantizarla honestamente, porque Google decide. Lo que sí garantizamos es un trabajo claro y medido, y explicarte cada resultado.",
      },
    ],
    related: ["google-ads", "diseno-web"],
  },
  {
    slug: "google-ads",
    area: "growth",
    name: "Campañas de Google Ads",
    tag: "Campañas",
    metaTitle: "Gestión de campañas de Google Ads en Barcelona",
    metaDescription:
      "Campañas de Google Ads con presupuesto controlado, dirigidas a búsquedas con intención de compra y medidas por contactos reales.",
    headline: ["Clientes desde", "*el primer día.*"],
    lead: "Con Google Ads apareces arriba del todo justo cuando alguien busca lo que ofreces. Creamos y gestionamos campañas pensadas para traer contactos, no solo clics, con un presupuesto que controlas tú.",
    benefits: [
      {
        title: "Presupuesto bajo control",
        body: "Tú decides cuánto invertir. Nosotros nos encargamos de que cada euro vaya a las búsquedas que de verdad pueden convertirse en clientes.",
      },
      {
        title: "Anuncios y páginas que encajan",
        body: "Como también hacemos webs, nos aseguramos de que la página a la que llega el anuncio esté preparada para convertir.",
      },
      {
        title: "Medido por resultados",
        body: "Configuramos la medición de llamadas y formularios para saber qué campañas funcionan y cuáles hay que ajustar.",
      },
    ],
    includes: [
      "Estudio de búsquedas y competencia",
      "Configuración de la cuenta y la medición",
      "Redacción de anuncios",
      "Segmentación por zona y horario",
      "Optimización continua de pujas y palabras",
      "Informe mensual con contactos conseguidos",
    ],
    idealFor: [
      "Negocios que necesitan contactos a corto plazo",
      "Lanzamientos de servicios o productos nuevos",
      "Empresas en sectores con mucha competencia en Google",
    ],
    price: { note: "Gestión mensual a medida, más la inversión en anuncios." },
    faqs: [
      {
        q: "¿Cuánto tengo que invertir en anuncios?",
        a: "Depende de tu sector y tu zona. Te proponemos una cifra inicial prudente y la ajustamos con los datos de las primeras semanas.",
      },
      {
        q: "¿El dinero de los anuncios se paga a vosotros?",
        a: "No: la inversión se paga directamente a Google desde tu cuenta. Nosotros cobramos solo por la gestión.",
      },
      {
        q: "¿Puedo parar las campañas cuando quiera?",
        a: "Sí. Las campañas se pueden pausar o ajustar en cualquier momento según tu carga de trabajo.",
      },
    ],
    related: ["seo", "diseno-web"],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}

export const areaName: Record<Service["id"], string> = {
  brand: "Marca",
  web: "Web",
  growth: "Captación",
};
