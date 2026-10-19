import type { MetadataRoute } from "next";
import { getProducts, getServicePages, servicePath } from "@/data/localized";
import { nfcPath } from "@/data/nfc";
import { site } from "@/data/site";

/**
 * Every page in both languages, each entry listing its counterpart so search
 * engines serve the right one to each reader.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string) => `${site.url}${path === "/" ? "" : path}`;

  const pair = (es: string, en: string, priority: number) =>
    [es, en].map((path) => ({
      url: u(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: { es: u(es), en: u(en) } },
    }));

  return [
    ...pair("/", "/en", 1),
    ...pair("/servicios", "/en/services", 0.9),
    ...getServicePages("es").flatMap((p) =>
      pair(servicePath("es", p.esSlug), servicePath("en", p.esSlug), 0.9),
    ),
    ...pair(nfcPath("es"), nfcPath("en"), 0.8),
    ...getProducts("es").flatMap((p) =>
      pair(`/products/${p.slug}`, `/en/products/${p.slug}`, 0.8),
    ),
  ];
}
