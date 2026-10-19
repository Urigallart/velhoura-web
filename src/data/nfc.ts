/**
 * The NFC Google-review card: a product for shops and venues. A customer taps
 * their phone on the card and lands on the business's Google review page.
 *
 * ⚠ PENDING — the price. Nothing has been agreed, so none is invented: while
 * `price` is empty the section says "special price, ask us". Fill it in (and
 * `regular`, if there is a crossed-out figure) and it appears everywhere.
 */

export const nfcOffer = {
  price: "" as string,
  /** The price it replaces, shown crossed out. Leave empty for none. */
  regular: "" as string,
};

type Text = { es: string; en: string };
const t = (es: string, en: string): Text => ({ es, en });

export const nfcCopy = {
  badge: t("Oferta", "Special offer"),
  label: t("Para tiendas y locales", "For shops and venues"),
  title: t("Más reseñas en Google, con un toque.", "More Google reviews, with one tap."),
  lead: t(
    "Una tarjeta NFC para el mostrador de tu negocio. Tu cliente acerca el móvil y le abre directamente tu ficha de Google para dejar su reseña: sin buscarte, sin escribir nada.",
    "An NFC card for your counter. Your customer holds their phone to it and lands straight on your Google review page: no searching for you, no typing.",
  ),
  points: [
    t("Programamos cada tarjeta con el enlace directo a tu ficha de Google.", "We set up each card with the direct link to your Google listing."),
    t("Dos formatos: placa plana para pared o mostrador, y expositor de sobremesa.", "Two formats: a flat plate for wall or counter, and a tabletop stand."),
    t("Funciona con el móvil de tu cliente, sin instalar ninguna app.", "Works with your customer's phone, no app to install."),
  ],
  formats: [
    t("Placa", "Plate"),
    t("Expositor", "Stand"),
  ],
  priceFallback: t("Precio especial · consúltalo", "Special price · ask us"),
  pricePrefix: t("Desde", "From"),
  cta: t("Quiero mis tarjetas", "I want my cards"),
  prefill: t(
    "Hola, me interesan las tarjetas NFC de reseñas de Google para mi negocio.",
    "Hi, I'm interested in the NFC Google review cards for my business.",
  ),
  bannerTitle: t("Oferta: tarjeta NFC de reseñas de Google", "Offer: NFC Google review card"),
  bannerText: t(
    "Añádela a cualquiera de las webs y consigue reseñas desde el primer cliente.",
    "Add it to any of the websites and start collecting reviews from the first customer.",
  ),
  bannerLink: t("Ver la oferta", "See the offer"),
};

/** Where the offer's own page lives in each language. */
export const nfcPath = (locale: "es" | "en") =>
  locale === "en" ? "/en/services/nfc-review-cards" : "/servicios/tarjetas-nfc";

export const nfcPage = {
  breadcrumb: t("Servicios", "Services"),
  metaTitle: t(
    "Tarjetas NFC de reseñas de Google para tu negocio",
    "NFC Google review cards for your business",
  ),
  metaDescription: t(
    "Tarjeta NFC para el mostrador de tu tienda o local: tu cliente acerca el móvil y llega directo a tu ficha de Google para dejar su reseña. Oferta de Velhoura, Barcelona.",
    "An NFC card for your shop or venue counter: customers tap their phone and land straight on your Google listing to leave a review. A Velhoura offer, Barcelona.",
  ),
  headline: {
    es: ["Más reseñas en Google,", "*con un toque.*"],
    en: ["More Google reviews,", "*with one tap.*"],
  },
  heroLead: t(
    "Una tarjeta NFC para el mostrador de tu negocio. Tu cliente acerca el móvil y le abre directamente tu ficha de Google para dejar su reseña: sin buscarte, sin escribir nada.",
    "An NFC card for your counter. Your customer holds their phone to it and lands straight on your Google review page: no searching for you, no typing.",
  ),
  seeWhat: t("Cómo funciona", "How it works"),
  stepsLabel: t("Cómo funciona", "How it works"),
  stepsLines: {
    es: ["Tres pasos,", "*cero fricción.*"],
    en: ["Three steps,", "*zero friction.*"],
  },
  steps: [
    {
      title: t("Nos pasas tu ficha", "You send us your listing"),
      body: t(
        "Nos dices cuál es tu negocio en Google y el formato que prefieres: placa o expositor.",
        "You tell us which business it is on Google and the format you prefer: plate or stand.",
      ),
    },
    {
      title: t("La programamos", "We set it up"),
      body: t(
        "Dejamos la tarjeta lista con el enlace directo a tu ficha de reseñas de Google.",
        "We prepare the card with the direct link to your Google review page.",
      ),
    },
    {
      title: t("Tu cliente la toca", "Your customer taps it"),
      body: t(
        "Acerca el móvil, se abre tu ficha y deja su reseña en unos segundos. No instala nada.",
        "They hold their phone to it, your listing opens and they leave a review in seconds. Nothing to install.",
      ),
    },
  ],
  includesLabel: t("Qué incluye", "What's included"),
  includesLines: {
    es: ["Lo que", "*te llevas.*"],
    en: ["What", "*you get.*"],
  },
  includes: [
    t("Tarjeta NFC programada con el enlace directo a tu ficha de Google", "NFC card set up with the direct link to your Google listing"),
    t("Formato a elegir: placa plana o expositor de sobremesa", "Your choice of format: flat plate or tabletop stand"),
    t("Funciona con móviles con NFC, sin instalar ninguna app", "Works with NFC phones, no app to install"),
    t("Te explicamos cómo colocarla para que se use", "We tell you where to place it so it gets used"),
  ],
  forLabel: t("Para quién", "Who it's for"),
  forLines: { es: ["Encaja si…"], en: ["A good fit if…"] },
  idealFor: [
    t("Tienes una tienda, un bar o un restaurante", "You run a shop, a bar or a restaurant"),
    t("Atiendes en mostrador: peluquería, clínica, taller…", "You serve at a counter: salon, clinic, workshop…"),
    t("Quieres que más clientes te valoren en Google", "You want more customers to rate you on Google"),
  ],
  priceLabel: t("Precio", "Price"),
  priceNote: t(
    "Antes de empezar recibes el precio por escrito. Si pides varias unidades, te lo decimos al presupuestarlo.",
    "Before we start you get the price in writing. If you want several units, we'll quote it then.",
  ),
  faqLabel: t("Preguntas frecuentes", "FAQ"),
  faqLines: { es: ["Dudas", "*habituales.*"], en: ["Common", "*questions.*"] },
  faqs: [
    {
      q: t("¿Mi cliente tiene que instalar algo?", "Does my customer need to install anything?"),
      a: t("No. Solo acercar el móvil a la tarjeta: se abre tu ficha de Google directamente.", "No. They just hold their phone to the card: your Google listing opens straight away."),
    },
    {
      q: t("¿Y si el móvil no tiene NFC?", "What if the phone has no NFC?"),
      a: t("La mayoría de móviles actuales lo tienen, pero algunos antiguos no. Escríbenos y vemos qué alternativa encaja contigo.", "Most current phones have it, but some older ones don't. Write to us and we'll see what alternative suits you."),
    },
    {
      q: t("¿Cuánto cuesta?", "How much is it?"),
      a: t("Es una oferta con precio especial; pídenos el precio y te lo damos por escrito, sin compromiso.", "It's a special-price offer; ask us for the price and we'll give it to you in writing, no strings attached."),
    },
  ],
  closeLines: { es: ["Pide tus", "*tarjetas.*"], en: ["Order your", "*cards.*"] },
  closeLead: t(
    "Cuéntanos tu negocio y el formato que prefieres. Te respondemos nosotros mismos.",
    "Tell us about your business and the format you prefer. We reply ourselves.",
  ),
};
