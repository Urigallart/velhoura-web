import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView } from "@/components/products/ProductPageView";
import { getProducts } from "@/data/localized";

type Params = { slug: string };

/** Every product in the data file becomes a static page at build time. */
export function generateStaticParams(): Params[] {
  return getProducts("es").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProducts("es").find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.summary,
    alternates: {
      canonical: `/products/${product.slug}`,
      languages: {
        es: `/products/${product.slug}`,
        en: `/en/products/${product.slug}`,
      },
    },
    openGraph: { title: product.name, description: product.summary },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProducts("es").find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductPageView product={product} locale="es" />;
}
