import { plans } from "./plans";

/**
 * Questions a business owner asks before hiring a studio. Every answer is
 * built from facts already on the page — no promised turnaround times or
 * guarantees the studio has not committed to.
 */

export type Faq = { q: string; a: string };

const webPrices = plans
  .filter((p) => p.pricePrefix)
  .map((p) => `${p.name} ${p.pricePrefix?.toLowerCase()} ${p.price}`)
  .join(", ");

export const faqs: Faq[] = [
  {
    q: "¿Qué servicios ofrecéis?",
    a: "Tres áreas que se complementan: marca (logotipo, identidad visual, diseño gráfico y packaging), web (diseño web, WordPress, tiendas online y desarrollo a medida) y captación (posicionamiento SEO y campañas de Google Ads). Puedes contratar una sola o todas.",
  },
  {
    q: "¿Cuánto cuesta una web?",
    a: `Publicamos precios orientativos para que sepas por dónde empezar: ${webPrices}. Los proyectos a medida se presupuestan según lo que necesites, y siempre conoces el precio antes de que empecemos.`,
  },
  {
    q: "¿Trabajáis con WordPress?",
    a: "Sí. Para la mayoría de webs corporativas es una buena opción porque puedes editar textos e imágenes tú mismo. Cuando el proyecto pide algo más específico, lo desarrollamos a medida.",
  },
  {
    q: "¿Con qué tipo de empresas trabajáis?",
    a: "Sobre todo con pymes, comercios y profesionales de Barcelona y alrededores que quieren una presencia digital seria sin tener que coordinar a varios proveedores.",
  },
  {
    q: "¿Cómo es el proceso?",
    a: "Primero hablamos de tu negocio y tus objetivos. Después te enviamos un plan por escrito con lo que haremos y su coste. Construimos por etapas, revisando contigo cada avance, y tras el lanzamiento medimos los resultados para seguir mejorando.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Solo contarnos a qué te dedicas y qué quieres conseguir. Si ya tienes logotipo, textos o fotos, nos sirven; si no, te ayudamos a prepararlos.",
  },
  {
    q: "¿El mantenimiento está incluido una vez terminada la web?",
    a: "El precio del proyecto cubre el diseño, el desarrollo y la puesta en marcha de la web, y la corrección de errores de nuestro trabajo durante los 30 días siguientes a la entrega. Si quieres que después sigamos encargándonos de ella (actualizaciones, seguridad, copias de seguridad y pequeños cambios), es un pago mensual aparte, que presupuestamos según lo que necesite tu web.",
  },
];
