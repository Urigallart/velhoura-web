import { contact, site } from "./site";

/**
 * Who is legally behind the site, and who processes data on its behalf.
 *
 * ⚠ PENDING — the owner's identity. Spanish law (LSSI-CE art. 10, RGPD art.
 * 13) requires the website owner's name, tax ID and address to be published.
 * They are left empty on purpose rather than invented: every place that
 * shows them renders a visible "pendiente" marker until they are filled in.
 *
 * If Velhoura is not (yet) a company, the owner is the person who invoices —
 * e.g. one of the founders as an autónomo — with their own name and NIF.
 */
export const owner = {
  /** Full name, or company name (razón social) if there is one. */
  name: "" as string,
  /** NIF / NIE, or CIF for a company. */
  taxId: "" as string,
  /** Registered address (domicilio). */
  address: "" as string,
  email: contact.email,
  /** Commercial name as it appears on the site. */
  brand: site.name,
  website: site.url,
};

/** Date shown as "last updated" on every legal document. */
export const legalUpdated = "19 de octubre de 2026";

/**
 * Third parties that process personal data for the site (encargados del
 * tratamiento). Keep this in sync with what the code actually uses.
 */
export const processors = [
  {
    name: "Vercel Inc.",
    role: "Alojamiento de la web",
    data: "Dirección IP y datos técnicos de la conexión, en los registros del servidor",
    country: "Estados Unidos",
  },
  {
    name: "Resend, Inc.",
    role: "Envío de los mensajes del formulario de contacto a nuestro correo",
    data: "Los datos que nos envías a través del formulario",
    country: "Estados Unidos",
  },
  {
    name: "Stripe Payments Europe, Ltd.",
    role: "Cobro de los proyectos en la página de gestiones y pagos",
    data: "Nombre, email, datos de pago y el importe del proyecto (los datos de la tarjeta los recoge y guarda Stripe, no nosotros)",
    country: "Irlanda (UE)",
  },
] as const;

/** How long contact-form data is kept if no project is contracted. */
export const retention = "12 meses";

/**
 * The only thing the site stores in the browser: the localStorage flag that
 * remembers the cookie notice was closed. Named in the cookie policy.
 */
export const COOKIE_NOTICE_KEY = "velhoura-cookie-notice";
