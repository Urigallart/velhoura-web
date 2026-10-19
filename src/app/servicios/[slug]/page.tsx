import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/services/ServicePageView";
import { getServicePageBySlug, getServicePages, servicePath } from "@/data/localized";

type Params = { slug: string };

/** Every service in the data file becomes a static page at build time. */
export function generateStaticParams(): Params[] {
  return getServicePages("es").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePageBySlug("es", slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: servicePath("es", page.esSlug),
      languages: {
        es: servicePath("es", page.esSlug),
        en: servicePath("en", page.esSlug),
      },
    },
    openGraph: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getServicePageBySlug("es", slug);
  if (!page) notFound();
  return <ServicePageView page={page} locale="es" />;
}
