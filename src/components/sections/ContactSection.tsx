"use client";

import { ButtonAction } from "@/components/ui/Button";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { activeSocials, contact } from "@/data/site";
import { openContactModal } from "@/lib/contactModal";
import { getArea } from "@/data/localized";
import { useLocale } from "@/i18n/useLocale";

const copy = {
  es: {
    label: "Contacto",
    lines: ["Cuéntanos", "*tu negocio.*"],
    lead: "Explícanos a qué te dedicas y qué te gustaría conseguir. Te respondemos nosotros mismos con una primera propuesta, sin compromiso.",
    cta: "Pedir propuesta",
  },
  en: {
    label: "Contact",
    lines: ["Tell us about", "*your business.*"],
    lead: "Tell us what you do and what you'd like to achieve. We'll reply ourselves with a first proposal, no strings attached.",
    cta: "Request a proposal",
  },
};

/**
 * The close: one clear ask, and every direct channel the studio actually has.
 * Phone and WhatsApp appear only once they are filled in `data/site.ts`.
 *
 * The button opens the contact modal (mounted once in the root layout); the
 * email address stays a plain `mailto:` for anyone who would rather write
 * directly, because a form is a preference, not a requirement.
 */
export function ContactSection() {
  const locale = useLocale();
  const t = copy[locale];
  return (
    <section
      id="contact"
      className="band grain relative isolate overflow-hidden"
     data-tone="coral">
      {/* Ground: an ember bloom low in the frame, so the page ends warm. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
      >
        <div className="absolute left-1/2 bottom-[-30%] h-[60vh] w-[90vw] -translate-x-1/2 rounded-[50%] blur-[110px] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ember)_14%,transparent),transparent_70%)]" />
      </div>

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
<MaskedTitle
            lines={t.lines}
            className="text-balance text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
            stagger={110}
          />

          <Reveal delay={240}>
            <p className="t-lead mx-auto mt-8 max-w-[46ch] text-pretty">
              {t.lead}
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-11 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-7">
              <>
                <ButtonAction size="lg" arrow onClick={openContactModal}>
                  {t.cta}
                </ButtonAction>
              </>

              <a
                href={`mailto:${contact.email}`}
                className="group font-sans text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                <span className="u-draw">{contact.email}</span>
              </a>
            </div>
          </Reveal>

          {(contact.phone || contact.whatsapp) && (
            <Reveal delay={400}>
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
                {contact.phone && (
                  <li>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="group text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      <span className="u-draw">{contact.phone}</span>
                    </a>
                  </li>
                )}
                {contact.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      <span className="u-draw">WhatsApp</span>
                    </a>
                  </li>
                )}
              </ul>
            </Reveal>
          )}

          <Reveal delay={420}>
            <p className="t-label mt-8">{getArea(locale, contact.area)}</p>
          </Reveal>

          {activeSocials.length > 0 && (
            <Reveal delay={440}>
              <ul className="mt-14 flex items-center justify-center gap-8">
                {activeSocials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      <span className="u-draw">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
