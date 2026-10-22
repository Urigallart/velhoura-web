import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentsView } from "@/components/payments/PaymentsView";

/** Client payments by code. Kept out of search results: it's for clients who have a code. */
export const metadata: Metadata = {
  title: "Gestiones y pagos",
  description: "Paga tu proyecto con el código que te hemos enviado.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/gestiones", languages: { es: "/gestiones", en: "/en/payments" } },
};

export default function PaymentsPage() {
  // Suspense: the view reads the code and status from the URL.
  return (
    <Suspense>
      <PaymentsView locale="es" />
    </Suspense>
  );
}
