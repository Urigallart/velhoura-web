import type { Locale } from "@/i18n/locale";
import { planIdFromSlug, planPath } from "./planPages";
import { faqs as faqsEs, type Faq } from "./faq";
import { plans as plansEs, type Plan } from "./plans";
import { processSteps as processEs, type ProcessStep } from "./process";
import { products as productsEs, type Product } from "./products";
import {
  servicePages as servicePagesEs,
  type ServicePage,
} from "./servicePages";
import { servicePagesEn } from "./servicePagesEn";
import { services as servicesEs, type Service } from "./services";
import { site, nav as navEs } from "./site";
import { team as teamEs, type Member } from "./team";
import {
  faqsEn,
  plansEn,
  processEn,
  productsEn,
  servicesEn,
  siteEn,
  teamEn,
} from "./en";

/**
 * Every dataset, in the language asked for. Spanish is the source; English
 * overlays only the words, so numbers, images and links cannot drift apart
 * between the two versions.
 */

export function getSite(locale: Locale) {
  return locale === "en"
    ? { ...site, tagline: siteEn.tagline, title: siteEn.title, description: siteEn.description }
    : site;
}

export function getArea(locale: Locale, es: string) {
  return locale === "en" ? siteEn.area : es;
}

export function getNav(locale: Locale) {
  return navEs.map((item) => ({
    href: item.href,
    label: locale === "en" ? (siteEn.nav[item.href] ?? item.label) : item.label,
  }));
}

export function getPlans(locale: Locale): Plan[] {
  if (locale === "es") return plansEs;
  return plansEs.map((p) => {
    const en = plansEn[p.id];
    if (!en) return p;
    return {
      ...p,
      name: en.name ?? p.name,
      pitch: en.pitch,
      features: en.features,
      pricePrefix: p.pricePrefix ? "From" : undefined,
      price: en.price ?? p.price,
      priceNote: en.priceNote,
      cta: en.cta,
    };
  });
}

export function getProcess(locale: Locale): ProcessStep[] {
  if (locale === "es") return processEs;
  return processEs.map((s) => ({ ...s, ...processEn[s.index] }));
}

export function getTeam(locale: Locale): Member[] {
  if (locale === "es") return teamEs;
  return teamEs.map((m) => ({ ...m, ...teamEn[m.id] }));
}

export function getProducts(locale: Locale): Product[] {
  if (locale === "es") return productsEs;
  return productsEs.map((p) => {
    const { captions, ...en } = productsEn[p.slug] ?? {};
    return {
      ...p,
      ...en,
      gallery: p.gallery?.map((g, i) => ({ ...g, caption: captions?.[i] ?? g.caption })),
    };
  });
}

/** Where a service page lives in each language. */
export function servicePath(locale: Locale, esSlug: string) {
  return locale === "en"
    ? `/en/services/${servicePagesEn[esSlug]?.slugEn ?? esSlug}`
    : `/servicios/${esSlug}`;
}

export function servicesIndexPath(locale: Locale) {
  return locale === "en" ? "/en/services" : "/servicios";
}

export function getServices(locale: Locale): Service[] {
  if (locale === "es") return servicesEs;
  return servicesEs.map((s) => {
    const en = servicesEn[s.id];
    return {
      ...s,
      name: en.name,
      promise: en.promise,
      body: en.body,
      items: s.items.map((item, i) => ({
        ...item,
        name: en.items[i]?.name ?? item.name,
        detail: en.items[i]?.detail ?? item.detail,
        href: item.href
          ? servicePath("en", item.href.replace("/servicios/", ""))
          : undefined,
      })),
    };
  });
}

/** A service page, with `slug` set to the slug of its own language. */
export type LocalizedServicePage = ServicePage & { esSlug: string };

export function getServicePages(locale: Locale): LocalizedServicePage[] {
  return servicePagesEs.map((p) => {
    if (locale === "es") return { ...p, esSlug: p.slug };
    const en = servicePagesEn[p.slug];
    const plan = (id: string) => getPlans("en").find((x) => x.id === id);
    const from = (id: string) => {
      const x = plan(id);
      return x?.pricePrefix ? `${x.pricePrefix} ${x.price}` : undefined;
    };
    const priceFrom =
      p.slug === "diseno-web"
        ? from("landing")
        : p.slug === "tiendas-online"
          ? from("ecommerce")
          : undefined;
    const note =
      p.slug === "diseno-web"
        ? `Landing ${from("landing")?.toLowerCase()} · Company website ${from("business")?.toLowerCase()}. ${en.priceNote}`
        : en.priceNote;
    return {
      ...p,
      esSlug: p.slug,
      slug: en.slugEn,
      name: en.name,
      tag: en.tag,
      metaTitle: en.metaTitle,
      metaDescription: en.metaDescription,
      headline: en.headline,
      lead: en.lead,
      benefits: en.benefits,
      includes: en.includes,
      idealFor: en.idealFor,
      price: { from: priceFrom, note: note },
      faqs: en.faqs,
    };
  });
}

export function getServicePageBySlug(locale: Locale, slug: string) {
  return getServicePages(locale).find((p) => p.slug === slug);
}

export function getFaqs(locale: Locale): Faq[] {
  if (locale === "es") return faqsEs;
  const prices = getPlans("en")
    .filter((p) => p.pricePrefix)
    .map((p) => `${p.name} ${p.pricePrefix?.toLowerCase()} ${p.price}`)
    .join(", ");
  return faqsEn.map((f) => ({ ...f, a: f.a.replace("__PRICES__", prices) }));
}

/**
 * The same page in the other language, for the language switch. Pages that
 * exist in only one language (legal texts) map to themselves; anything
 * unknown falls back to the other language's home.
 */
export function alternatePath(pathname: string, to: Locale): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (to === "en") {
    if (path === "/") return "/en";
    if (path === "/servicios") return "/en/services";
    if (path === "/servicios/tarjetas-nfc") return "/en/services/nfc-review-cards";
    const plan = path.match(/^\/precios\/([^/]+)$/);
    if (plan) {
      const id = planIdFromSlug("es", plan[1]);
      return id ? planPath("en", id) : "/en#pricing";
    }
    const service = path.match(/^\/servicios\/([^/]+)$/);
    if (service) return servicePath("en", service[1]);
    const product = path.match(/^\/products\/([^/]+)$/);
    if (product) return `/en/products/${product[1]}`;
    if (path.startsWith("/legal/")) return path;
    return path.startsWith("/en") ? path : "/en";
  }
  if (path === "/en") return "/";
  if (path === "/en/services") return "/servicios";
  if (path === "/en/services/nfc-review-cards") return "/servicios/tarjetas-nfc";
  const planEn = path.match(/^\/en\/pricing\/([^/]+)$/);
  if (planEn) {
    const id = planIdFromSlug("en", planEn[1]);
    return id ? planPath("es", id) : "/#pricing";
  }
  const service = path.match(/^\/en\/services\/([^/]+)$/);
  if (service) {
    const es = Object.entries(servicePagesEn).find(
      ([, v]) => v.slugEn === service[1],
    )?.[0];
    return es ? `/servicios/${es}` : "/servicios";
  }
  const product = path.match(/^\/en\/products\/([^/]+)$/);
  if (product) return `/products/${product[1]}`;
  return path.startsWith("/en") ? "/" : path;
}

export const areaNames: Record<Locale, Record<Service["id"], string>> = {
  es: { brand: "Marca", web: "Web", growth: "Captación" },
  en: { brand: "Brand", web: "Web", growth: "Growth" },
};
