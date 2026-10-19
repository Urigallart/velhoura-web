import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTeam } from "@/data/localized";
import type { Locale } from "@/i18n/locale";

const copy = {
  es: {
    label: "Estudio",
    lines: ["Dos personas.", "*Trato directo.*"],
    body: "Somos dos socios de Barcelona que diseñan y programan. Sin comerciales ni capas intermedias: hablas siempre con quien hace el trabajo, y las decisiones se toman en la misma conversación.",
    portfolio: "Ver portfolio",
  },
  en: {
    label: "Studio",
    lines: ["Two people.", "*Direct contact.*"],
    body: "We're two partners in Barcelona who design and code. No salespeople and no layers in between: you always talk to the people doing the work, and decisions are made in the same conversation.",
    portfolio: "View portfolio",
  },
};

/**
 * The two founders. Who a client will actually be talking to is the reason a
 * two-person studio is worth hiring instead of a larger one, so it is said
 * plainly.
 */
export function AboutSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  const team = getTeam(locale);
  return (
    <section id="about" className="band bg-paper-off">
      <div className="shell">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-6">
            <SectionHeading
              index="08"
              label={t.label}
              lines={t.lines}
            />
          </div>

          <div className="flex items-end md:col-span-6">
            <Reveal delay={160}>
              <p className="t-body max-w-[44ch]">
                {t.body}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={i * 120} variant="lift" y={34}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-paper p-8 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--e-out)] hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_26px_58px_-32px_rgba(8,9,10,0.24)] sm:p-10">
                {/* Ember hairline across the top, drawn in on hover — the same
                    gesture the product cards use, so the page has one idea of
                    what "this is interactive" looks like. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px w-0 bg-ember transition-[width] duration-700 ease-[var(--e-out)] group-hover:w-full"
                />

                {/* The monogram stands in until there is a portrait to use. */}
                <div className="flex size-16 items-center justify-center rounded-full border border-line bg-paper-sunk transition-colors duration-500 group-hover:border-line-strong">
                  <span className="font-sans text-lg font-medium tracking-tight text-ink-soft">
                    {member.monogram}
                  </span>
                </div>

                <h3 className="t-h3 mt-7">{member.name}</h3>
                <p className="t-label mt-2 !text-ember">{member.role}</p>
                <p className="t-body mt-5 max-w-[38ch] text-[0.9375rem]">
                  {member.bio}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-9 block h-px w-10 bg-line-strong transition-[width] duration-700 ease-[var(--e-out)] group-hover:w-24"
                />

                {member.href && (
                  <div className="mt-6">
                    <ArrowLink href={member.href}>{t.portfolio}</ArrowLink>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
