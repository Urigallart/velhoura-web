import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { es: "/", en: "/en" },
  },
};

/** Spanish home. The page itself lives in `HomePage`, shared with /en. */
export default function Home() {
  return <HomePage locale="es" />;
}
