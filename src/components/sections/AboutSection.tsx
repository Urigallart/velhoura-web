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

        <div className="mx-auto mt-10 grid max-w-[52rem] gap-3 md:mt-16 md:grid-cols-2 md:gap-4">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={i * 120} variant="lift" y={34}>
              <article
                className={`group relative h-full overflow-hidden rounded-[1.5rem] p-5 text-ink transition-[transform,box-shadow] duration-500 ease-[var(--e-out)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(8,9,10,0.35)] sm:p-6 ${i % 2 === 0 ? "bg-gradient-to-br from-[#0d2b5e] to-[#1f58c7] !text-white" : "bg-gradient-to-br from-[#ffe6d6] to-[#ffb892]"}`}
              >
                {/* Ember hairline across the top, drawn in on hover — the same
                    gesture the product cards use, so the page has one idea of
                    what "this is interactive" looks like. */}
                {/* The monogram stands in until there is a portrait to use. */}
                <div className={`flex size-11 items-center justify-center rounded-full ${i % 2 === 0 ? "bg-white/15" : "bg-white/60"}`}>
                  <span className="font-sans text-[0.9375rem] font-semibold tracking-tight">
                    {member.monogram}
                  </span>
                </div>

                {/* Each partner's figure, standing in the corner: Oriol's own picture,
                    and Ian's half of the picture of the two of them. */}
                {i === 0 ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-3 h-[10.5rem] sm:right-5 sm:h-[12rem]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/team/oriol.webp" alt="" loading="lazy" className="h-full w-auto" />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-3 h-[10.5rem] w-[3.4rem] overflow-hidden sm:right-5 sm:h-[12rem] sm:w-[3.9rem]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/team/duo.webp" alt="" loading="lazy" className="absolute bottom-0 right-0 h-full w-auto max-w-none" />
                  </span>
                )}

                <h3 className="mt-4 text-[clamp(1.375rem,2vw,1.625rem)] font-semibold leading-none tracking-[-0.035em]">{member.name}</h3>
                <p className={`mt-1.5 text-[0.8125rem] font-medium opacity-70 ${i === 0 ? "pr-24 sm:pr-28" : "pr-16 sm:pr-20"}`}>{member.role}</p>
                <p className={`t-body mt-3 max-w-[40ch] text-[0.8125rem] leading-relaxed !text-current opacity-80 ${i === 0 ? "pr-[5.5rem] sm:pr-24" : "pr-14 sm:pr-16"}`}>
                  {member.bio}
                </p>

                {member.href && (
                  <div className="mt-4">
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
