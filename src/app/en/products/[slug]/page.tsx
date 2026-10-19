import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/products/ProductPageView";
import { getProducts } from "@/data/localized";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProducts("en").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProducts("en").find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: { absolute: `${product.name} — Velhoura` },
    description: product.summary,
    alternates: {
      canonical: `/en/products/${product.slug}`,
      languages: {
        es: `/products/${product.slug}`,
        en: `/en/products/${product.slug}`,
      },
    },
    openGraph: { locale: "en_GB", title: product.name, description: product.summary },
  };
}

export default async function ProductPageEn({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProducts("en").find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductPageView product={product} locale="en" />;
}
