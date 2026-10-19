import {
  siClaude,
  siFigma,
  siGoogleads,
  siGoogleanalytics,
  siGooglesearchconsole,
  siInstagram,
  siMeta,
  siNextdotjs,
  siReact,
  siShopify,
  siStripe,
  siTailwindcss,
  siVercel,
  siWhatsapp,
  siWoocommerce,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

/**
 * The tools the studio works with, shown as a running strip on the home page.
 * Logos come from Simple Icons (CC0), each in its brand colour. Add or remove
 * a tool here and the strip follows; keep it to tools actually in use.
 */

export type Tool = { name: string; icon: SimpleIcon };

export const tools: Tool[] = [
  { name: "Meta Ads", icon: siMeta },
  { name: "Claude", icon: siClaude },
  { name: "Shopify", icon: siShopify },
  { name: "WordPress", icon: siWordpress },
  { name: "WooCommerce", icon: siWoocommerce },
  { name: "Google Ads", icon: siGoogleads },
  { name: "Analytics", icon: siGoogleanalytics },
  { name: "Search Console", icon: siGooglesearchconsole },
  { name: "Figma", icon: siFigma },
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Stripe", icon: siStripe },
  { name: "Vercel", icon: siVercel },
  { name: "Instagram", icon: siInstagram },
  { name: "WhatsApp", icon: siWhatsapp },
];
