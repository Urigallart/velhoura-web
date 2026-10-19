import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * `/legal/` is excluded only because those pages are still placeholders —
 * see `app/legal/[doc]/page.tsx`. Once the real documents are in, drop the
 * `disallow` and the `robots: { index: false }` in that route's metadata: a
 * legal notice that search engines cannot reach is not much of a notice.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/legal/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
