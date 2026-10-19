import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { legalLinks } from "@/data/site";
import { docs } from "@/components/legal/docs";
import { cn } from "@/lib/utils";

/**
 * Legal pages: aviso legal, privacidad, cookies, términos. The texts live in
 * `components/legal/docs.tsx`; the owner's identity in `data/legal.ts`.
 */

type Doc = keyof typeof docs;
type Params = { doc: string };

export function generateStaticParams(): Params[] {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { doc } = await params;
  const entry = docs[doc as Doc];
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.intro,
    alternates: { canonical: `/legal/${doc}` },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { doc } = await params;
  const entry = docs[doc as Doc];
  if (!entry) notFound();

  return (
    <section className="band pt-32 sm:pt-40">
      <div className="shell">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal y={10}>
                <p className="t-label flex items-center gap-3">
                  <span className="text-ember">§</span>
                  <span aria-hidden="true" className="h-px w-7 bg-line-strong" />
                  Legal
                </p>
              </Reveal>

              <nav className="mt-6 space-y-3" aria-label="Documentos legales">
                {legalLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={l.href === `/legal/${doc}` ? "page" : undefined}
                    className={cn(
                      "block text-sm transition-colors duration-300 hover:text-ink",
                      l.href === `/legal/${doc}` ? "font-medium text-ink" : "text-ink-soft",
                    )}
                  >
                    {l.label.es}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="md:col-span-8">
            <MaskedTitle as="h1" lines={[entry.title]} className="t-h1" />

            <Reveal delay={140}>
              <p className="t-lead mt-6 max-w-[52ch]">{entry.intro}</p>
            </Reveal>

            {/* Plain content, not revealed: a legal text should be readable
                the moment the page loads, all of it. */}
            <div
              className={cn(
                "mt-12 max-w-[68ch] space-y-10 text-[0.9375rem] leading-relaxed text-ink-soft",
                "[&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
                "[&_strong]:font-medium [&_strong]:text-ink",
              )}
            >
              {entry.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="t-h3 mb-4 text-[1.25rem] text-ink">{s.heading}</h2>
                  {s.body}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
