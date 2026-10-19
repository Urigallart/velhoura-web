import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/services/ServicePageView";
import { getServicePageBySlug, getServicePages, servicePath } from "@/data/localized";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getServicePages("en").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePageBySlug("en", slug);
  if (!page) return {};

  return {
    title: { absolute: `${page.metaTitle} — Velhoura` },
    description: page.metaDescription,
    alternates: {
      canonical: servicePath("en", page.esSlug),
      languages: {
        es: servicePath("es", page.esSlug),
        en: servicePath("en", page.esSlug),
      },
    },
    openGraph: {
      locale: "en_GB",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function ServicePageEn({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getServicePageBySlug("en", slug);
  if (!page) notFound();
  return <ServicePageView page={page} locale="en" />;
}
