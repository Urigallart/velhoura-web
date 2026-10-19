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
