"use client";

import { planUi } from "@/data/planPages";
import type { Locale } from "@/i18n/locale";
import { openContactModalWith } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

/** Opens the contact form with the plan already named. */
export function PlanCta({
  locale,
  planName,
  variant = "dark",
  children,
}: {
  locale: Locale;
  planName: string;
  variant?: "dark" | "light";
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => openContactModalWith({ message: planUi.prefill(planName, locale) })}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-300",
        variant === "dark"
          ? "bg-ink text-paper-raise hover:bg-paper-raise hover:text-ink"
          : "bg-paper-raise text-ink hover:bg-ink hover:text-paper-raise",
      )}
    >
      {children ?? planUi.askPrice[locale]}
      <span aria-hidden="true">→</span>
    </button>
  );
}
