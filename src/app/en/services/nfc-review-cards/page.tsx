import type { Metadata } from "next";
import { NfcPageView } from "@/components/services/NfcPageView";
import { nfcPage, nfcPath } from "@/data/nfc";

export const metadata: Metadata = {
  title: nfcPage.metaTitle.en,
  description: nfcPage.metaDescription.en,
  alternates: {
    canonical: nfcPath("en"),
    languages: { es: nfcPath("es"), en: nfcPath("en") },
  },
  openGraph: { title: nfcPage.metaTitle.en, description: nfcPage.metaDescription.en },
};

export default function NfcPageEn() {
  return <NfcPageView locale="en" />;
}
