import type { Locale } from "@/i18n/locale";
import { getPlans } from "./localized";
import { estimatePlan, formatEstimate, getPlanQuiz } from "./planQuiz";
import { o, only, type QuizAnswers, type QuizQuestion } from "./quiz";

/**
 * Which form opens where. Every "ask us" button on the site names a topic,
 * and the contact modal shows that topic's questions instead of the general
 * project questionnaire — a visitor on the Google Ads page is asked about
 * campaigns, not about how many pages their website needs.
 *
 * The general questionnaire (`quiz.ts`) stays for the openers that don't
 * know what the visitor wants yet: the navbar's "Empezar un proyecto", the
 * chat, the contact section.
 *
 * The four plans reuse their questions and price estimate from
 * `planQuiz.ts`. The services have no published price, so their forms ask
 * and don't estimate.
 */

export type TopicId =
  | "landing"
  | "business"
  | "ecommerce"
  | "custom"
  | "web"
  | "brand"
  | "packaging"
  | "seo"
  | "ads"
  | "nfc";

type Text = Record<Locale, string>;
const t = (es: string, en: string): Text => ({ es, en });
const pickAll = t("Puedes elegir varias.", "Pick as many as you like.");

/* ── Shared ────────────────────────────────────────────────────────────── */

const timing: QuizQuestion = {
  id: "timing",
  title: t("¿Para cuándo lo necesitas?", "When do you need it?"),
  help: t("Nos ayuda a organizar el calendario y a proponerte algo realista.", "It helps us plan and propose something realistic."),
  options: [
    o("asap", "Lo antes posible", "As soon as possible"),
    o("month", "En un mes, más o menos", "In about a month"),
    o("later", "En dos o tres meses", "In two or three months"),
    o("exploring", "Sin prisa, estoy mirando opciones", "No rush, I'm exploring options"),
  ],
};

const budget: QuizQuestion = {
  id: "budget",
  title: t("¿Qué presupuesto tienes en mente?", "What budget do you have in mind?"),
  help: t("Orientativo: solo para proponerte algo que encaje.", "Just a ballpark, so we propose something that fits."),
  note: t("No te comprometes a nada.", "It doesn't commit you to anything."),
  options: [
    o("<300", "Menos de 300 €", "Under €300"),
    o("300-800", "Entre 300 y 800 €", "€300 to €800"),
    o("800-2000", "Entre 800 y 2.000 €", "€800 to €2,000"),
    o("2000+", "Más de 2.000 €", "Over €2,000"),
    o("unknown", "Todavía no lo sé", "I don't know yet"),
  ],
};

const monthly = (id: string, title: Text, help: Text, note?: Text): QuizQuestion => ({
  id,
  title,
  help,
  ...(note ? { note } : null),
  options: [
    o("<150", "Menos de 150 € al mes", "Under €150 a month"),
    o("150-300", "Entre 150 y 300 € al mes", "€150 to €300 a month"),
    o("300-600", "Entre 300 y 600 € al mes", "€300 to €600 a month"),
    o("600+", "Más de 600 € al mes", "Over €600 a month"),
    o("unknown", "Todavía no lo sé", "I don't know yet"),
  ],
});

/* ── Brand identity ────────────────────────────────────────────────────── */

const brand: QuizQuestion[] = [
  {
    id: "brandStart",
    title: t("¿De dónde partimos?", "Where are we starting from?"),
    help: t("Así sabemos si creamos desde cero o si hay algo que conservar.", "So we know whether we create from scratch or keep something."),
    options: [
      o("none", "No tengo nada todavía", "I have nothing yet"),
      o("refresh", "Tengo logo pero quiero renovarlo", "I have a logo but want to refresh it"),
      o("apply", "La marca está, falta aplicarla bien", "The brand exists, it just needs applying properly"),
    ],
  },
  {
    id: "brandNeeds",
    title: t("¿Qué necesitas?", "What do you need?"),
    help: pickAll,
    multi: true,
    options: [
      o("logo", "Logotipo", "Logo"),
      o("palette", "Colores y tipografías", "Colours and typefaces"),
      o("manual", "Manual de marca", "Brand guidelines"),
      o("stationery", "Papelería (tarjetas, facturas…)", "Stationery (cards, invoices…)"),
      o("social", "Plantillas para redes sociales", "Social media templates"),
      only("unsure", "No lo sé, orientadme", "Not sure, advise me"),
    ],
  },
  {
    id: "brandFeel",
    title: t("¿Cómo quieres que se perciba tu marca?", "How should your brand come across?"),
    help: t("Elige la que más se acerque. Lo afinamos juntos.", "Pick the closest one. We'll refine it together."),
    options: [
      o("warm", "Cercana y amable", "Warm and friendly"),
      o("premium", "Premium y elegante", "Premium and elegant"),
      o("modern", "Moderna y tecnológica", "Modern and tech"),
      o("solid", "Sólida y profesional", "Solid and professional"),
      o("bold", "Divertida y atrevida", "Fun and bold"),
    ],
  },
  {
    id: "brandRefs",
    title: t("¿Tienes referencias?", "Do you have references?"),
    help: t("Marcas o estilos que te gusten, aunque sean de otro sector.", "Brands or styles you like, even from another sector."),
    options: [
      o("yes", "Sí, tengo marcas que me gustan", "Yes, I have brands I like"),
      o("loose", "Tengo ideas sueltas", "I have a few loose ideas"),
      o("none", "Ninguna, confío en vosotros", "None, I trust you"),
    ],
  },
  timing,
  budget,
];

/* ── Graphic design and packaging ──────────────────────────────────────── */

const packaging: QuizQuestion[] = [
  {
    id: "pieces",
    title: t("¿Qué necesitas diseñar?", "What do you need designed?"),
    help: pickAll,
    multi: true,
    options: [
      o("stationery", "Papelería: tarjetas, facturas, sobres", "Stationery: cards, invoices, envelopes"),
      o("print", "Catálogo, folleto o presentación", "Catalogue, brochure or presentation"),
      o("signage", "Cartelería o rótulos", "Posters or signage"),
      o("social", "Plantillas para redes sociales", "Social media templates"),
      o("packaging", "Etiquetas y envases", "Labels and packaging"),
      o("other", "Otra cosa", "Something else"),
    ],
  },
  {
    id: "amount",
    title: t("¿Cuántas piezas, más o menos?", "Roughly how many pieces?"),
    help: t("Cada diseño distinto cuenta como una pieza.", "Each different design counts as one piece."),
    options: [
      o("1", "Una", "One"),
      o("2-5", "Entre 2 y 5", "2 to 5"),
      o("5+", "Más de 5", "More than 5"),
      o("unknown", "No lo sé", "I don't know"),
    ],
  },
  {
    id: "identity",
    title: t("¿Tienes identidad de marca?", "Do you have a brand identity?"),
    help: t("Si la tienes, los diseños la siguen; si no, podemos crearla.", "If you have one, the designs follow it; if not, we can create it."),
    options: [
      o("full", "Sí, logo, colores y tipografías", "Yes: logo, colours and typefaces"),
      o("logo", "Solo el logo", "Just the logo"),
      o("none", "No, todavía no", "No, not yet"),
    ],
  },
  {
    id: "medium",
    title: t("¿Dónde se va a usar?", "Where will it be used?"),
    help: t("Imprenta y pantalla se preparan distinto.", "Print and screen are prepared differently."),
    options: [
      o("print", "En papel, para imprenta", "On paper, for print"),
      o("digital", "En digital", "Digitally"),
      o("both", "En los dos", "Both"),
    ],
  },
  timing,
  budget,
];

/* ── SEO ───────────────────────────────────────────────────────────────── */

const seo: QuizQuestion[] = [
  {
    id: "site",
    title: t("¿Tienes web?", "Do you have a website?"),
    help: t("El SEO se trabaja sobre una web; si no la tienes, también te ayudamos.", "SEO works on a website; if you don't have one, we can help with that too."),
    options: [
      o("live", "Sí, ya está publicada", "Yes, it's live"),
      o("building", "Está en construcción", "It's being built"),
      o("none", "No tengo web todavía", "I don't have one yet"),
    ],
  },
  {
    id: "where",
    title: t("¿Dónde quieres aparecer?", "Where do you want to show up?"),
    help: t("No es lo mismo competir en tu barrio que en todo un país.", "Competing in your area is not the same as across a country."),
    options: [
      o("local", "En mi ciudad o mi zona", "In my city or area"),
      o("spain", "En toda España", "Across Spain"),
      o("intl", "También en otros países", "In other countries too"),
    ],
  },
  {
    id: "now",
    title: t("¿Cómo te encuentran ahora en Google?", "How do people find you on Google today?"),
    help: t("Una idea aproximada es suficiente.", "A rough idea is enough."),
    options: [
      o("some", "Salgo en primera página para algunas búsquedas", "I'm on page one for some searches"),
      o("name", "Solo si buscan mi nombre", "Only if they search my name"),
      o("no", "Casi no aparezco", "I barely show up"),
      o("unknown", "No lo sé", "I don't know"),
    ],
  },
  {
    id: "gbp",
    title: t("¿Tienes ficha de empresa en Google Maps?", "Do you have a Google Maps business listing?"),
    help: t("Para búsquedas locales pesa casi tanto como la web.", "For local searches it counts almost as much as the website."),
    options: [
      o("yes", "Sí", "Yes"),
      o("no", "No", "No"),
      o("unknown", "No lo sé", "I don't know"),
    ],
  },
  {
    id: "goal",
    title: t("¿Qué es lo más importante para ti?", "What matters most to you?"),
    help: t("Lo que mediremos para saber si funciona.", "What we'll measure to know it's working."),
    options: [
      o("leads", "Más llamadas y contactos", "More calls and enquiries"),
      o("sales", "Más ventas online", "More online sales"),
      o("visits", "Más visitas a mi local", "More visits to my shop"),
      o("compete", "Superar a la competencia", "Beat the competition"),
    ],
  },
  monthly(
    "budget",
    t("¿Qué presupuesto mensual tienes en mente?", "What monthly budget do you have in mind?"),
    t("El SEO es un trabajo continuo; se presupuesta por meses.", "SEO is ongoing work; it's quoted per month."),
  ),
];

/* ── Google Ads ────────────────────────────────────────────────────────── */

const ads: QuizQuestion[] = [
  {
    id: "before",
    title: t("¿Has hecho campañas en Google Ads antes?", "Have you run Google Ads campaigns before?"),
    help: t("Si hay historial, partimos de los datos que ya existen.", "If there's history, we start from the data that's already there."),
    options: [
      o("never", "Nunca", "Never"),
      o("self", "Sí, por mi cuenta", "Yes, on my own"),
      o("agency", "Sí, con otra agencia", "Yes, with another agency"),
      o("active", "Tengo campañas activas ahora", "I have campaigns running now"),
    ],
  },
  {
    id: "goal",
    title: t("¿Qué quieres conseguir con los anuncios?", "What do you want the ads to achieve?"),
    help: pickAll,
    multi: true,
    options: [
      o("calls", "Llamadas", "Phone calls"),
      o("forms", "Contactos y peticiones de presupuesto", "Enquiries and quote requests"),
      o("sales", "Ventas en mi tienda online", "Sales in my online store"),
      o("visits", "Visitas a mi local", "Visits to my shop"),
    ],
  },
  {
    id: "area",
    title: t("¿Dónde quieres que se vean?", "Where should they show?"),
    help: t("Segmentamos por zona y horario para no pagar clics que no te sirven.", "We target by area and time so you don't pay for clicks that don't help."),
    options: [
      o("city", "En mi ciudad o un radio cercano", "In my city or a nearby radius"),
      o("region", "En mi provincia o comunidad", "In my province or region"),
      o("spain", "En toda España", "Across Spain"),
      o("intl", "También en otros países", "In other countries too"),
    ],
  },
  {
    id: "landing",
    title: t("¿Tienes una web a la que mandar el tráfico?", "Do you have a page to send the traffic to?"),
    help: t("Un anuncio funciona tan bien como la página a la que lleva.", "An ad works only as well as the page it leads to."),
    options: [
      o("ready", "Sí, con formulario o tienda", "Yes, with a form or store"),
      o("weak", "Sí, pero se puede mejorar", "Yes, but it could be better"),
      o("none", "No, necesitaría una", "No, I'd need one"),
    ],
  },
  monthly(
    "spend",
    t("¿Cuánto quieres invertir en anuncios al mes?", "How much do you want to spend on ads each month?"),
    t("Es lo que pagas a Google por los clics.", "It's what you pay Google for the clicks."),
    t("Nuestra gestión de las campañas va aparte.", "Our campaign management is separate."),
  ),
  timing,
];

/* ── NFC review cards ──────────────────────────────────────────────────── */

const nfc: QuizQuestion[] = [
  {
    id: "business",
    title: t("¿Qué tipo de negocio tienes?", "What kind of business do you have?"),
    help: t("Para saber dónde va a estar la tarjeta y quién la va a usar.", "So we know where the card will sit and who will use it."),
    options: [
      o("food", "Restaurante, bar o cafetería", "Restaurant, bar or café"),
      o("shop", "Tienda", "Shop"),
      o("health", "Salud, belleza o bienestar", "Health, beauty or wellness"),
      o("services", "Servicios o despacho", "Services or office"),
      o("other", "Otro", "Other"),
    ],
  },
  {
    id: "cards",
    title: t("¿Cuántas tarjetas necesitas?", "How many cards do you need?"),
    help: t("Una por mostrador, mesa o punto de cobro.", "One per counter, table or till."),
    options: [
      o("1", "Una", "One"),
      o("2-5", "Entre 2 y 5", "2 to 5"),
      o("5+", "Más de 5", "More than 5"),
    ],
  },
  {
    id: "listing",
    title: t("¿Tienes ficha de empresa en Google?", "Do you have a Google business listing?"),
    help: t("La tarjeta lleva directamente a dejar la reseña en ella.", "The card takes customers straight to reviewing it."),
    options: [
      o("yes", "Sí, ya la tengo", "Yes, I have one"),
      o("no", "No, habría que crearla", "No, it would need creating"),
      o("unknown", "No lo sé", "I don't know"),
    ],
  },
];

/* ── Web design (the service page: landing or company site) ────────────── */

const webType: QuizQuestion = {
  id: "webType",
  title: t("¿Qué tipo de web necesitas?", "What kind of website do you need?"),
  help: t("Si no lo tienes claro, elige la última y te orientamos.", "If you're not sure, pick the last one and we'll advise you."),
  options: [
    o("landing", "Una sola página (landing)", "A single page (landing)", ["Desde 199 €", "From €199"]),
    o("business", "Una web de empresa con varias páginas", "A company site with several pages", ["Desde 499 €", "From €499"]),
    o("unsure", "No lo sé, ayudadme a decidir", "Not sure, help me decide"),
  ],
};
const isLanding = (a: QuizAnswers) => (a.webType ?? []).includes("landing");
const branch = (questions: QuizQuestion[], on: (a: QuizAnswers) => boolean) =>
  questions.map((q) => ({ ...q, when: (a: QuizAnswers) => on(a) && (q.when ? q.when(a) : true) }));
const web: QuizQuestion[] = [
  webType,
  ...branch(getPlanQuiz("landing"), (a) => isLanding(a)),
  ...branch(getPlanQuiz("business"), (a) => (a.webType ?? []).length > 0 && !isLanding(a)),
];

/* ── Topics ────────────────────────────────────────────────────────────── */

const services: Record<Exclude<TopicId, "landing" | "business" | "ecommerce" | "custom">, { name: Text; questions: QuizQuestion[] }> = {
  web: { name: t("Diseño web", "Web design"), questions: web },
  brand: { name: t("Identidad de marca", "Brand identity"), questions: brand },
  packaging: { name: t("Diseño gráfico y packaging", "Graphic design and packaging"), questions: packaging },
  seo: { name: t("Posicionamiento SEO", "SEO"), questions: seo },
  ads: { name: t("Google Ads", "Google Ads"), questions: ads },
  nfc: { name: t("Tarjetas NFC de reseñas", "NFC review cards"), questions: nfc },
};

const planIds = ["landing", "business", "ecommerce", "custom"] as const;

export type Topic = {
  /** Shown in the form's top bar. */
  eyebrow: string;
  /** For the email subject. */
  projectType: string;
  questions: QuizQuestion[];
  /** Live price estimate, for the plans (and the web service, per branch). */
  estimate?: (answers: QuizAnswers) => string | null;
};

export function getTopic(id: string | undefined, locale: Locale): Topic | null {
  if (!id) return null;
  if ((planIds as readonly string[]).includes(id)) {
    const plan = getPlans(locale).find((p) => p.id === id);
    if (!plan) return null;
    const price = plan.pricePrefix ? `${plan.pricePrefix} ${plan.price}` : plan.price;
    return {
      eyebrow: `${locale === "en" ? `${plan.name} plan` : `Plan ${plan.name}`} · ${price}`,
      projectType: locale === "en" ? `${plan.name} plan` : `Plan ${plan.name}`,
      questions: getPlanQuiz(id),
      estimate: (a) => {
        const e = estimatePlan(id, a);
        return e && formatEstimate(e, locale);
      },
    };
  }
  const s = services[id as keyof typeof services];
  if (!s) return null;
  return {
    eyebrow: s.name[locale],
    projectType: s.name[locale],
    questions: s.questions,
    estimate:
      id === "web"
        ? (a) => {
            if ((a.webType ?? []).length === 0) return null;
            const e = estimatePlan(isLanding(a) ? "landing" : "business", a);
            return e && formatEstimate(e, locale);
          }
        : undefined,
  };
}

/** The form each service page opens, by its Spanish slug. */
export const topicForService: Record<string, TopicId> = {
  "identidad-de-marca": "brand",
  "diseno-grafico-y-packaging": "packaging",
  "diseno-web": "web",
  "tiendas-online": "ecommerce",
  "desarrollo-a-medida": "custom",
  seo: "seo",
  "google-ads": "ads",
};
