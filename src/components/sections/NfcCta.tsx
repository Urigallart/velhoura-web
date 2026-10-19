"use client";

import { nfcCopy } from "@/data/nfc";
import type { Locale } from "@/i18n/locale";
import { openContactModalWith } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

/** Opens the contact modal with the NFC cards already mentioned. */
export function NfcCta({ locale, light = false }: { locale: Locale; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => openContactModalWith({ message: nfcCopy.prefill[locale] })}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-300",
        light
          ? "bg-paper-raise text-ink hover:bg-ember hover:text-paper-raise"
          : "bg-ink text-paper-raise hover:bg-ember",
      )}
    >
      {nfcCopy.cta[locale]}
      <span aria-hidden="true">→</span>
    </button>
  );
}
