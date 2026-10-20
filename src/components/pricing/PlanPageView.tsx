import Link from "next/link";
import type { ReactNode } from "react";
import { PlanCta } from "@/components/pricing/PlanCta";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PreviewBusiness,
  PreviewCustom,
  PreviewEcommerce,
  PreviewLanding,
} from "@/components/visual/SitePreviews";
import { getPlans, getProcess } from "@/data/localized";
import { detailCopy, getPlanDetail } from "@/data/planDetails";
import {
  planColour,
  planPageCopy,
  planPath,
  planTone,
  planUi,
  type PlanId,
} from "@/data/planPages";
import { localePath, type Locale } from "@/i18n/locale";

const previews: Record<PlanId, ReactNode> = {
  landing: <PreviewLanding />,
  business: <PreviewBusiness />,
  ecommerce: <PreviewEcommerce />,
  custom: <PreviewCustom />,
};

/**
 * A plan on its own page, in the plan's own colour: what it is, an example,
 * what is included, who it is for, what we need from the client, how the work
 * runs, the price and what it leaves out, the usual questions and the other
 * plans. The quote form is still one click away (`PlanCta`).
 */
export function PlanPageView({ id, locale }: { id: PlanId; locale: Locale }) {
  const plan = getPlans(locale).find((p) => p.id === id);
  const detail = getPlanDetail(id, locale);
  if (!plan || !detail) return null;

  const copy = planPageCopy[id];
  const colour = planColour[id];
  const tone = planTone[id];
  const process = getProcess(locale);
  const others = getPlans(locale).filter((p) => p.id !== id);
  const dc = detailCopy[locale];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${plan.name} — Velhoura`,
    description: copy.lead[locale],
    inLanguage: locale,
    provider: { "@type": "ProfessionalService", name: "Velhoura" },
  };

  return (
    <>
      {/* ── Hero, in the plan's colour ─────────────────────────── */}
      <section className="pt-28 pb-6 sm:pt-32">
        <div className="shell">
          <Reveal y={8}>
            <nav className="flex items-center gap-2 text-[0.875rem] text-ink-mute" aria-label={planUi.breadcrumb[locale]}>
              <Link href={localePath(locale, "/#pricing")} className="transition-colors hover:text-ink">
                {planUi.breadcrumb[locale]}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-ink">{plan.name}</span>
            </nav>
          </Reveal>

          <Reveal delay={80} className="mt-5">
            <div
              className="relative overflow-hidden rounded-[2rem] p-7 text-ink sm:rounded-[2.5rem] sm:p-12 lg:p-14"
              style={{ background: colour }}
            >
              <span aria-hidden="true" className="absolute -right-24 -top-24 size-[26rem] rounded-full bg-white/35 blur-2xl" />
              <div className="relative grid items-center gap-12 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <span className="inline-block rounded-full bg-ink px-4 py-1.5 text-[0.875rem] font-semibold text-paper-raise">
                    {plan.name}
                  </span>
                  <MaskedTitle
                    as="h1"
                    split="word"
                    lines={copy.lines[locale]}
                    className="mt-6 text-balance text-[clamp(2.25rem,5.2vw,4.5rem)] font-semibold leading-[0.97] tracking-[-0.05em] [&_.t-em]:text-ink/55"
                    stagger={80}
                  />
                  <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink/75">{copy.lead[locale]}</p>

                  <div className="mt-8 flex flex-wrap items-baseline gap-x-3">
                    {plan.pricePrefix && <span className="text-[1rem] font-medium text-ink/65">{plan.pricePrefix}</span>}
                    <span className="text-[clamp(2.75rem,5vw,4rem)] leading-none font-semibold tracking-[-0.05em]">{plan.price}</span>
                    {plan.priceNote && <span className="text-[0.875rem] text-ink/60">{plan.priceNote}</span>}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <PlanCta locale={locale} planName={plan.name} />
                    <a
                      href="#incluye"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-[0.9375rem] font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper-raise"
                    >
                      {planUi.seeIncluded[locale]}
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="overflow-hidden rounded-3xl bg-paper-raise shadow-[0_40px_80px_-36px_rgba(8,9,10,0.5)]">
                    <div className="flex items-center gap-2 bg-paper-sunk px-4 py-3">
                      <span className="flex gap-1.5" aria-hidden="true">
                        <span className="size-2 rounded-full bg-line-strong" />
                        <span className="size-2 rounded-full bg-line-strong" />
                        <span className="size-2 rounded-full bg-line-strong" />
                      </span>
                      <span className="mx-auto rounded-full bg-paper-raise px-4 py-0.5 text-[0.8125rem] text-ink-mute">
                        ejemplo.velhoura.com
                      </span>
                    </div>
                    <div className="aspect-[16/10]">{previews[id]}</div>
                  </div>
                  <p className="mt-3 text-center text-[0.8125rem] text-ink/60">
                    {copy.example.brand} · {copy.example.sector[locale]}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What is included ───────────────────────────────────── */}
      <section id="incluye" className="band-tight">
        <div className="shell">
          <SectionHeading align="center" tone={tone} lines={planUi.includes[locale]} />
          <div className="mt-12 grid gap-4 rounded-[2rem] bg-paper-sunk p-4 sm:p-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {detail.includes.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="h-full">
                <div className="h-full rounded-3xl bg-paper-raise p-6 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-full text-[0.8rem] font-bold text-ink"
                    style={{ background: colour }}
                  >
                    ✓
                  </span>
                  <h3 className="mt-5 text-[1.25rem] font-semibold leading-snug tracking-[-0.025em]">{item.title}</h3>
                  <p className="t-body mt-2 text-[0.9375rem]">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it is for, and what we need ────────────────────── */}
      <section className="band-tight">
        <div className="shell grid gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-[2rem] p-7 text-ink sm:p-10" style={{ background: colour }}>
              <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none tracking-[-0.04em]">{dc.idealFor}</h2>
              <ul className="mt-6 space-y-3">
                {detail.idealFor.map((line) => (
                  <li key={line} className="flex gap-3 text-[1rem] leading-snug">
                    <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-ink" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-[2rem] bg-paper-sunk p-7 sm:p-10">
              <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none tracking-[-0.04em]">{planUi.needsTitle[locale]}</h2>
              <p className="t-body mt-4 text-[0.9375rem]">{planUi.needsLead[locale]}</p>
              <ul className="mt-5 space-y-3">
                {copy.needs.map((n) => (
                  <li key={n.es} className="flex gap-3 text-[1rem] leading-snug text-ink-soft">
                    <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 rounded-full" style={{ background: colour }} />
                    {n[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How the work runs ──────────────────────────────────── */}
      <section className="band-tight">
        <div className="shell">
          <SectionHeading align="center" tone={tone} lines={planUi.process[locale]} />
          <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.index} delay={i * 80} className="h-full">
                <li className="h-full list-none rounded-3xl bg-paper-sunk p-6 sm:p-7">
                  <span
                    className="grid size-10 place-items-center rounded-full text-[1rem] font-bold text-ink"
                    style={{ background: colour }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[1.25rem] font-semibold leading-snug tracking-[-0.025em]">{step.title}</h3>
                  <p className="t-body mt-2 text-[0.9375rem]">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Price ──────────────────────────────────────────────── */}
      <section className="band-tight">
        <div className="shell">
          <Reveal>
            <div className="grid items-center gap-8 rounded-[2rem] p-7 text-ink sm:p-12 md:grid-cols-12" style={{ background: colour }}>
              <div className="md:col-span-7">
                <p className="text-[0.9375rem] font-semibold text-ink/65">{planUi.priceTitle[locale]}</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3">
                  {plan.pricePrefix && <span className="text-[1rem] font-medium text-ink/65">{plan.pricePrefix}</span>}
                  <span className="text-[clamp(3rem,6vw,5rem)] leading-none font-semibold tracking-[-0.05em]">{plan.price}</span>
                </p>
                {plan.priceNote && <p className="mt-2 text-[0.875rem] text-ink/60">{plan.priceNote}</p>}
                <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink/75">{dc.notIncluded}</p>
              </div>
              <div className="md:col-span-5 md:justify-self-end">
                <PlanCta locale={locale} planName={plan.name} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Questions ──────────────────────────────────────────── */}
      <section className="band-tight">
        <div className="shell">
          <SectionHeading align="center" tone={tone} lines={planUi.faq[locale]} />
          <div className="mx-auto mt-12 max-w-3xl space-y-3 md:mt-16">
            {copy.faqs.map((f, i) => (
              <Reveal key={f.q.es} delay={i * 60} y={12}>
                <details className="group rounded-3xl bg-paper-sunk px-7 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.02em]">{f.q[locale]}</h3>
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-paper-raise text-[1.25rem] leading-none transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="t-body mt-4 max-w-[60ch]">{f.a[locale]}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The other plans ────────────────────────────────────── */}
      <section className="band-tight">
        <div className="shell">
          <SectionHeading align="center" tone={tone} lines={planUi.others[locale]} />
          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.id} delay={i * 80} className="h-full">
                <Link
                  href={planPath(locale, o.id)}
                  className="group flex h-full min-h-[14rem] flex-col justify-between rounded-[2rem] p-7 text-ink transition-transform duration-500 ease-[var(--e-out)] hover:-translate-y-1.5"
                  style={{ background: planColour[o.id as PlanId] }}
                >
                  <span className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">{o.name}</span>
                  <span>
                    <span className="block text-[0.9375rem] leading-snug text-ink/70">{o.pitch}</span>
                    <span className="mt-4 flex items-baseline justify-between">
                      <span className="text-[1.5rem] font-semibold tracking-[-0.03em]">
                        {o.pricePrefix ? `${o.pricePrefix} ${o.price}` : o.price}
                      </span>
                      <span aria-hidden="true" className="text-[1.25rem] transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────── */}
      <section className="band-tight">
        <div className="shell">
          <Reveal>
            <div className="rounded-[2rem] bg-ink px-7 py-14 text-center text-paper-raise sm:px-12 sm:py-20">
              <MaskedTitle
                split="word"
                as="h2"
                lines={planUi.closeLines[locale]}
                className="mx-auto text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.97] tracking-[-0.05em] [&_.t-em]:text-paper-raise/55"
                stagger={80}
              />
              <p className="mx-auto mt-6 max-w-[44ch] text-paper-raise/70">{planUi.closeLead[locale]}</p>
              <div className="mt-8 flex justify-center">
                <PlanCta locale={locale} planName={plan.name} variant="light" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}

