import type { Metadata } from "next";
import { ServicesIndexView } from "@/components/services/ServicesIndexView";

export const metadata: Metadata = {
  title: "Servicios: marca, diseño web, tiendas online, SEO y Google Ads",
  description:
    "Todos los servicios de Velhoura para pymes de Barcelona: identidad de marca, diseño gráfico y packaging, diseño web y WordPress, tiendas online, desarrollo a medida, SEO y Google Ads.",
  alternates: {
    canonical: "/servicios",
    languages: { es: "/servicios", en: "/en/services" },
  },
};

export default function ServiciosPage() {
  return <ServicesIndexView locale="es" />;
}
