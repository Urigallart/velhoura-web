import type { Metadata } from "next";
import { ServicesIndexView } from "@/components/services/ServicesIndexView";

export const metadata: Metadata = {
  title: { absolute: "Services: brand, web design, online stores, SEO and Google Ads — Velhoura" },
  description:
    "All of Velhoura's services for businesses in Spain and worldwide: brand identity, graphic design and packaging, custom web design, online stores, custom development, SEO and Google Ads.",
  alternates: {
    canonical: "/en/services",
    languages: { es: "/servicios", en: "/en/services" },
  },
  openGraph: { locale: "en_GB" },
};

export default function ServicesPageEn() {
  return <ServicesIndexView locale="en" />;
}
