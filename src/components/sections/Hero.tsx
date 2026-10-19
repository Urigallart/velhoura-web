import { HeroBackdrop } from "@/components/visual/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { HeroCharacters } from "@/components/assistant/HeroCharacters";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    badge: "Agencia digital · Barcelona",
    lines: ["Creamos tu marca.", "Construimos tu web.", "Te traemos clientes"],
    lead: "Ayudamos a pymes de Barcelona a crecer en internet: una marca que se recuerda, una web que convierte visitas en contactos y campañas que te ponen delante de quien ya te está buscando. Un solo equipo, de principio a fin.",
    primary: "Cuéntanos tu negocio",
    secondary: "Ver servicios",
    small: "Precios orientativos publicados. Primera conversación sin compromiso.",
  },
  en: {
    badge: "Digital agency · Barcelona",
    lines: ["We shape your brand.", "We build your site.", "We bring you clients"],
    lead: "We help Barcelona businesses grow online: a brand people remember, a website that turns visits into enquiries and campaigns that put you in front of people already looking for you. One team, start to finish.",
    primary: "Tell us about your business",
    secondary: "See services",
    small: "Indicative prices published. First conversation, no strings attached.",
  },
};

/**
 * First screen.
 *
 * One centred column: badge, claim, one paragraph, two calls to action, and a
 * line of small print that answers the question the buttons raise. Everything
 * a visitor needs to decide is on one axis, so there is no second place for
 * the eye to go and no competition for the claim.
 *
 * The globe has its own section just below (see `GlobeSection`): large enough
 * to carry the studio's story, which it could not do boxed into the hero.
 *
 * The entrance is pure CSS on purpose. Everything above the fold paints from
 * the server HTML and resolves on its own timeline — no hydration, no rAF, no
 * blank hero if JavaScript is slow, throttled in a background tab, or absent.
 */
export function Hero({
  locale = "es",
  interactive = true,
}: { locale?: Locale; interactive?: boolean } = {}) {
  const t = copy[locale];
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-24">
      <HeroBackdrop />
      <HeroCharacters locale={locale} interactive={interactive} />

      <div className="shell relative text-center">
        {/* Badge — says what the studio is before the claim says what it does. */}
        <p
          className="anim-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 py-1.5 pl-2.5 pr-4 backdrop-blur-sm"
          style={{ "--d": "60ms" } as React.CSSProperties}
        >
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-ember"
          />
          <span className="t-label !font-sans !tracking-[0.1em] !text-[0.75rem]">{t.badge}</span>
        </p>

        {/* Claim: what we make, what we build, what it gets you. Each line
            rises from behind its own mask; the last one is the outcome, set
            a step quieter, and its full stop is the one piece of colour
            above the fold. Sized for three lines rather than two, so no line
            ever wraps inside its mask. */}
        <h1 className="mx-auto mt-7 max-w-[22ch] text-balance font-semibold leading-[0.95] tracking-[-0.045em] text-[clamp(1.75rem,7.4vw,6rem)] sm:mt-9">
          <span className="sr-only">{`${t.lines.join(" ")}.`}</span>
          <span aria-hidden="true" className="block">
            {t.lines.map((text, i) => ({
              text,
              d: 200 + i * 100,
              last: i === t.lines.length - 1,
            })).map((line) => (
              <span key={line.text} className="lm">
                <span
                  className={line.last ? "anim-unmask text-ink-mute" : "anim-unmask"}
                  style={{ "--d": `${line.d}ms` } as React.CSSProperties}
                >
                  {line.text}
                  {line.last && <span className="text-ember">.</span>}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p
          className="anim-rise t-lead mx-auto mt-7 max-w-[48ch] text-pretty"
          style={{ "--d": "540ms" } as React.CSSProperties}
        >
          {t.lead}
        </p>

        <div
          className="anim-rise mx-auto mt-9 flex max-w-sm flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4"
          style={{ "--d": "640ms" } as React.CSSProperties}
        >
          <div className="w-full sm:w-auto">
            <ButtonLink
              href="#contact"
              size="lg"
              arrow
              className="w-full sm:w-auto"
            >
              {t.primary}
            </ButtonLink>
          </div>
          <div className="w-full sm:w-auto">
            <ButtonLink
              href="#services"
              variant="outline"
              size="lg"
              arrow
              className="w-full sm:w-auto"
            >
              {t.secondary}
            </ButtonLink>
          </div>
        </div>

        <p
          className="anim-rise mt-5 text-xs text-ink-mute"
          style={{ "--d": "720ms" } as React.CSSProperties}
        >
          {t.small}
        </p>
      </div>
    </section>
  );
}
