/**
 * What the studio sells, grouped the way a client thinks about it: how the
 * business looks, where it lives online, and how customers find it.
 *
 * Prices for these areas are not published yet — only the web plans in
 * `plans.ts` have figures. Add a `from` to an item once there is a real one
 * and it will show next to it.
 */

export type ServiceItem = {
  name: string;
  detail: string;
  /** Starting price, as it should read ("desde 300 €"). Empty = not shown. */
  from?: string;
  /** The service page this item belongs to, under /servicios. */
  href?: string;
};

export type Service = {
  id: "brand" | "web" | "growth";
  index: string;
  name: string;
  /** One line a client would say, not one an agency would. */
  promise: string;
  body: string;
  items: ServiceItem[];
};

export const services: Service[] = [
  {
    id: "brand",
    index: "01",
    name: "Marca",
    promise: "Que se te reconozca a la primera.",
    body: "Damos forma a cómo se ve y se presenta tu negocio, para que transmita lo mismo en una tarjeta, en una caja o en una pantalla.",
    items: [
      {
        name: "Logotipo e identidad visual",
        href: "/servicios/identidad-de-marca",
        detail: "Símbolo, colores, tipografías y un manual sencillo para usarlos bien.",
      },
      {
        name: "Diseño gráfico",
        href: "/servicios/diseno-grafico-y-packaging",
        detail: "Papelería, presentaciones, cartelería y piezas para redes.",
      },
      {
        name: "Packaging",
        href: "/servicios/diseno-grafico-y-packaging",
        detail: "Envases y etiquetas que destacan en el estante y cuentan quién eres.",
      },
      {
        name: "Diseño 3D",
        href: "/servicios/diseno-3d",
        detail: "Casas para inmobiliarias, locales y espacios: míralos en 3D antes de que existan.",
      },
      {
        name: "Naming",
        href: "/servicios/naming",
        detail: "Nombres fáciles de decir y de escribir, con dominio y perfiles comprobados.",
      },
      {
        name: "Vídeo corporativo",
        href: "/servicios/video-corporativo",
        detail: "Vídeos cortos para tu web, redes y anuncios, con el estilo de tu marca.",
      },
    ],
  },
  {
    id: "web",
    index: "02",
    name: "Web",
    promise: "Una web que trabaja mientras tú atiendes el negocio.",
    body: "Diseñamos y programamos webs rápidas, fáciles de actualizar y pensadas para que quien entra acabe escribiéndote o comprando.",
    items: [
      {
        name: "Diseño web",
        href: "/servicios/diseno-web",
        detail: "Webs corporativas que puedes editar tú mismo sin depender de nadie.",
      },
      {
        name: "Tiendas online",
        href: "/servicios/tiendas-online",
        detail: "Catálogo, carrito y pagos seguros para vender también fuera de horario.",
      },
      {
        name: "Desarrollo a medida",
        href: "/servicios/desarrollo-a-medida",
        detail: "Áreas de cliente, reservas, paneles internos y lo que tu negocio necesite.",
      },
      {
        name: "Mantenimiento web",
        href: "/servicios/mantenimiento-web",
        detail: "Actualizaciones, copias de seguridad y soporte para que tu web siga al día.",
      },
      {
        name: "Software y apps a medida",
        href: "/servicios/software-a-medida",
        detail: "Software, apps y un CRM inmobiliario hechos a la medida de tu negocio.",
      },
      {
        name: "Inteligencia artificial",
        href: "/servicios/ia-para-empresas",
        detail: "IA, automatización y chatbots para ahorrar tiempo en tareas repetitivas.",
      },
    ],
  },
  {
    id: "growth",
    index: "03",
    name: "Captación",
    promise: "Que te encuentre quien ya te está buscando.",
    body: "Trabajamos tu presencia en Google para que aparezcas cuando alguien de tu zona busca lo que ofreces, y medimos qué te trae clientes.",
    items: [
      {
        name: "Posicionamiento SEO",
        href: "/servicios/seo",
        detail: "Contenido, rendimiento y ficha de empresa para subir en los resultados.",
      },
      {
        name: "Campañas de Google Ads",
        href: "/servicios/google-ads",
        detail: "Anuncios con presupuesto controlado, dirigidos a búsquedas con intención de compra.",
      },
      {
        name: "Medición y mejora",
        href: "/servicios/seo",
        detail: "Vemos de dónde llegan los contactos y ajustamos lo que no rinde.",
      },
      {
        name: "Agencia de marketing digital",
        href: "/servicios/agencia-marketing-digital",
        detail: "Web, SEO y medición trabajados por un mismo equipo.",
      },
      {
        name: "Auditoría SEO",
        href: "/servicios/auditoria-seo",
        detail: "Un informe claro de qué frena tu web y en qué orden corregirlo.",
      },
    ],
  },
];
