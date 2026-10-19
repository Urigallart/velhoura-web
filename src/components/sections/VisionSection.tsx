import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Nuestra forma de verlo",
    lines: ["Una web bonita", "que nadie visita", "*no sirve de nada.*"],
    body: "Por eso no separamos el diseño de la captación. Cada cosa que hacemos se mide por lo mismo que la mides tú: si te trae llamadas, reservas o ventas.",
  },
  en: {
    label: "How we see it",
    lines: ["A beautiful site", "nobody visits", "*is worth nothing.*"],
    body: "That's why we never separate design from growth. Everything we make is measured the way you measure it: by the calls, bookings or sales it brings in.",
  },
};

/**
 * A held breath between the product half of the page and the client half.
 * Almost nothing on screen, on purpose — and the one place the page goes dark,
 * so the two halves are separated by a change of material rather than by
 * another hairline.
 *
 * The line it carries used to be "Today it's an idea. Tomorrow it's a
 * product." — true of literally every product ever made, and therefore about
 * nothing. This one is about these two people specifically, which is the only
 * kind of sentence worth giving a whole screen to.
 */
export function VisionSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <section className="grain grain-invert relative isolate overflow-hidden border-y border-night bg-night py-[clamp(128px,20vw,272px)] text-paper-raise">
      {/* Ember wash — the hero's substrate in negative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[64vh] w-[78vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[120px] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--ember)_34%,transparent),transparent_68%)]" />
      </div>

      <div className="shell relative text-center">
<MaskedTitle
          as="p"
          lines={t.lines}
          className="t-h1 mx-auto mt-9 max-w-[17ch] text-balance text-paper-raise"
          stagger={110}
        />

        <Reveal delay={340} className="mt-11">
          <p className="mx-auto max-w-[44ch] text-pretty text-[0.9375rem] leading-relaxed text-paper-raise/55">
            {t.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
