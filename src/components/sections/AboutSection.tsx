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
    <section id="about" className="band">
      <div className="shell">
        <SectionHeading align="center" tone="sun" lines={t.lines} subtitle={t.body} />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={i * 120} variant="lift" y={34}>
              <article
                className={`group relative h-full overflow-hidden rounded-[2rem] p-8 text-ink transition-[transform,box-shadow] duration-500 ease-[var(--e-out)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(8,9,10,0.35)] sm:p-10 ${i % 2 === 0 ? "bg-gradient-to-br from-[#0d2b5e] to-[#1f58c7] !text-white" : "bg-gradient-to-br from-[#ffe6d6] to-[#ffb892]"}`}
              >
                {/* Ember hairline across the top, drawn in on hover — the same
                    gesture the product cards use, so the page has one idea of
                    what "this is interactive" looks like. */}
                {/* The monogram stands in until there is a portrait to use. */}
                <div className={`flex size-16 items-center justify-center rounded-full ${i % 2 === 0 ? "bg-white/15" : "bg-white/60"}`}>
                  <span className="font-sans text-lg font-semibold tracking-tight">
                    {member.monogram}
                  </span>
                </div>

                <h3 className="mt-7 text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-none tracking-[-0.04em]">{member.name}</h3>
                <p className="mt-2 text-[0.9375rem] font-medium opacity-70">{member.role}</p>
                <p className="t-body mt-5 max-w-[38ch] text-[0.9375rem] !text-current opacity-80">
                  {member.bio}
                </p>

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
