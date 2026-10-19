import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { contact, legalLinks } from "@/data/site";

/**
 * Legal pages.
 *
 * ⚠ SCAFFOLD ONLY. The routes exist so the footer links resolve and so the
 * real texts have somewhere to live — the bodies below are placeholders and
 * are NOT valid legal documents. Replace each `body` with text reviewed by
 * whoever advises Velhoura before the site goes live.
 */

const docs = {
  privacy: {
    title: "Privacy Policy",
    intro: "Cómo tratamos los datos personales de quien visita esta web.",
  },
  cookies: {
    title: "Cookie Policy",
    intro: "Qué cookies utiliza esta web y con qué finalidad.",
  },
  notice: {
    title: "Legal Notice",
    intro: "Datos identificativos del titular de este sitio web.",
  },
  terms: {
    title: "Terms & Conditions",
    intro: "Condiciones de uso del sitio y de los servicios contratados.",
  },
} as const;

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
    robots: { index: false, follow: true },
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
            <Reveal y={10}>
              <p className="t-label flex items-center gap-3"><span className="text-ember">§</span><span aria-hidden="true" className="h-px w-7 bg-line-strong" />Legal</p>
            </Reveal>

            <nav className="mt-6 space-y-3" aria-label="Documentos legales">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-8">
            <MaskedTitle as="h1" lines={[entry.title]} className="t-h1" />

            <Reveal delay={140}>
              <p className="t-lead mt-6 max-w-[52ch]">{entry.intro}</p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 rounded-2xl border border-line bg-paper-off p-6 sm:p-8">
                <p className="t-label !text-ember">Pendiente de redacción</p>
                <p className="t-body mt-3 max-w-[56ch]">
                  Este documento es un marcador de posición. El texto definitivo
                  debe redactarse con los datos reales de Velhoura (titular,
                  domicilio, responsable del tratamiento, base jurídica y
                  proveedores) y revisarse antes de publicar el sitio.
                </p>
                <p className="t-body mt-4 text-sm">
                  Para cualquier consulta mientras tanto:{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-ink underline underline-offset-4 transition-colors hover:text-ember"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
