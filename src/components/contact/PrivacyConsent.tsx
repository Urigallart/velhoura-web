import Link from "next/link";
import type { Locale } from "@/i18n/locale";
import { owner } from "@/data/legal";

const copy = {
  es: {
    accept: "He leído y acepto la",
    policy: "política de privacidad",
    layer: (brand: string) =>
      `Responsable: ${brand}. Finalidad: responder a tu solicitud y enviarte una propuesta. No cedemos tus datos a terceros salvo a los proveedores que hacen funcionar la web. Puedes acceder a ellos, rectificarlos o suprimirlos escribiéndonos a ${owner.email}.`,
  },
  en: {
    accept: "I have read and accept the",
    policy: "privacy policy",
    layer: (brand: string) =>
      `Controller: ${brand}. Purpose: to answer your request and send you a proposal. We don't share your data with third parties other than the providers that run the site. You can access, correct or delete it by writing to ${owner.email}.`,
  },
};

/**
 * The basic data-protection notice and consent checkbox that must accompany
 * any form collecting personal data (RGPD art. 13, LOPDGDD art. 11): who,
 * why, your rights, and a link to the full policy. The checkbox is required
 * and unticked by default — pre-ticked consent is not valid consent.
 *
 * The field is named `consent`; the form reads it and the API route refuses
 * submissions without it.
 */
export function PrivacyConsent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] text-ink-soft">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--ink)]"
        />
        <span>
          {t.accept}{" "}
          <Link
            href="/legal/privacy"
            target="_blank"
            className="text-ink underline underline-offset-4 hover:text-ember"
          >
            {t.policy}
          </Link>
          .
        </span>
      </label>
      <p className="text-[0.75rem] leading-relaxed text-ink-mute">{t.layer(owner.brand)}</p>
    </div>
  );
}
