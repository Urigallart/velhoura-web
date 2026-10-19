"use client";

import { nfcCopy } from "@/data/nfc";
import type { Locale } from "@/i18n/locale";
import { openContactModalWith } from "@/lib/contactModal";

/** Opens the contact modal with the NFC cards already mentioned. */
export function NfcCta({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      onClick={() => openContactModalWith({ message: nfcCopy.prefill[locale] })}
      className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper-raise transition-colors duration-300 hover:bg-ember"
    >
      {nfcCopy.cta[locale]}
      <span aria-hidden="true">→</span>
    </button>
  );
}
