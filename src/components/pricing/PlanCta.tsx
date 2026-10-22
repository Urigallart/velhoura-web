"use client";

import { planUi } from "@/data/planPages";
import type { Locale } from "@/i18n/locale";
import { openContactTopic } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

/** Opens the plan's own form, with its questions and price estimate. */
export function PlanCta({
  locale,
  planId,
  variant = "dark",
  children,
}: {
  locale: Locale;
  /** Opens this plan's own form (questions and estimate). */
  planId: string;
  variant?: "dark" | "light";
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => openContactTopic(planId)}
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
