import type { Metadata } from "next";
import { NfcPageView } from "@/components/services/NfcPageView";
import { nfcPage, nfcPath } from "@/data/nfc";

export const metadata: Metadata = {
  title: nfcPage.metaTitle.es,
  description: nfcPage.metaDescription.es,
  alternates: {
    canonical: nfcPath("es"),
    languages: { es: nfcPath("es"), en: nfcPath("en") },
  },
  openGraph: { title: nfcPage.metaTitle.es, description: nfcPage.metaDescription.es },
};

export default function NfcPageEs() {
  return <NfcPageView locale="es" />;
}
