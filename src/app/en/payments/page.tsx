import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentsView } from "@/components/payments/PaymentsView";

/** Client payments by code. Kept out of search results: it's for clients who have a code. */
export const metadata: Metadata = {
  title: "Payments",
  description: "Pay for your project with the code we sent you.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/payments", languages: { es: "/gestiones", en: "/en/payments" } },
};

export default function PaymentsPageEn() {
  // Suspense: the view reads the code and status from the URL.
  return (
    <Suspense>
      <PaymentsView locale="en" />
    </Suspense>
  );
}
