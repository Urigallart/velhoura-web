import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getSite } from "@/data/localized";

const site = getSite("en");

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: {
    canonical: "/en",
    languages: { es: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    locale: "en_GB",
    title: site.title,
    description: site.description,
  },
};

/** English home: the same page as `/`, with English words. */
export default function HomeEn() {
  return <HomePage locale="en" />;
}
