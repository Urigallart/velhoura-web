import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlanPageView } from "@/components/pricing/PlanPageView";
import { getPlans } from "@/data/localized";
import { planIdFromSlug, planPageCopy, planPath, planSlugs } from "@/data/planPages";

type Params = { plan: string };

export function generateStaticParams(): Params[] {
  return planSlugs("en").map((plan) => ({ plan }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { plan: slug } = await params;
  const id = planIdFromSlug("en", slug);
  const plan = id && getPlans("en").find((p) => p.id === id);
  if (!id || !plan) return {};
  const title = `${plan.name} plan: ${plan.pricePrefix ? `${plan.pricePrefix.toLowerCase()} ` : ""}${plan.price}`;
  const description = planPageCopy[id].lead.en;
  return {
    title,
    description,
    alternates: {
      canonical: planPath("en", id),
      languages: { es: planPath("es", id), en: planPath("en", id) },
    },
    openGraph: { title, description },
  };
}

export default async function PlanPageEn({ params }: { params: Promise<Params> }) {
  const { plan } = await params;
  const id = planIdFromSlug("en", plan);
  if (!id) notFound();
  return <PlanPageView id={id} locale="en" />;
}
