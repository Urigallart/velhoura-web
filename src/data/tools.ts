import {
  siApple,
  siBlender,
  siClaude,
  siFigma,
  siFramer,
  siGithub,
  siGoogleads,
  siGoogleanalytics,
  siGooglegemini,
  siGooglesearchconsole,
  siGoogletagmanager,
  siHubspot,
  siInstagram,
  siLinear,
  siLottiefiles,
  siMailchimp,
  siMeta,
  siMiro,
  siNextdotjs,
  siNotion,
  siPerplexity,
  siReact,
  siSemrush,
  siShopify,
  siSketch,
  siStorybook,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWebflow,
  siWhatsapp,
  siWoocommerce,
  siWordpress,
  siZapier,
  type SimpleIcon,
} from "simple-icons";

/**
 * The tools and brands the studio works with, shown as two running strips on
 * the home page. Logos come from Simple Icons (CC0), each in its brand colour.
 *
 * A brand whose logo is not in that library (or whose owner asks for it not
 * to be redistributed) gets a neutral tile with its initials instead — never
 * a hand-drawn imitation of its mark. Swap one for the real logo by adding an
 * SVG to `public/brands/` and setting `logo` on its entry. Keep the list to
 * tools actually in use.
 */

export type Tool = {
  name: string;
  /** Official logo from the icon library. */
  icon?: SimpleIcon;
  /** A logo file supplied by the studio, in `public/`. */
  logo?: string;
  /** Initials for the neutral tile, when there is no logo. */
  mono?: string;
};

/** Design, UX/UI and brand. */
export const designTools: Tool[] = [
  { name: "Figma", icon: siFigma },
  { name: "Framer", icon: siFramer },
  { name: "Sketch", icon: siSketch },
  { name: "Webflow", icon: siWebflow },
  { name: "Storybook", icon: siStorybook },
  { name: "LottieFiles", icon: siLottiefiles },
  { name: "Blender", icon: siBlender },
  { name: "Miro", icon: siMiro },
  { name: "Notion", icon: siNotion },
  { name: "Linear", icon: siLinear },
  { name: "Apple", icon: siApple },
  { name: "Simon Electric", logo: "/brands/simon-electric.png" },
  { name: "MMR", logo: "/logos/mmr-icon.webp" },
  { name: "Roady", logo: "/logos/roady.webp" },
  { name: "Gym Tracker", logo: "/logos/gym-tracker-icon.webp" },
  { name: "Zhestar", logo: "/logos/zhestar.webp" },
];

/** AI, marketing, commerce and development. */
export const buildTools: Tool[] = [
  { name: "Claude", icon: siClaude },
  { name: "ChatGPT", logo: "/brands/chatgpt.png" },
  { name: "Gemini", icon: siGooglegemini },
  { name: "Perplexity", icon: siPerplexity },
  { name: "Meta Ads", icon: siMeta },
  { name: "Google Ads", icon: siGoogleads },
  { name: "Analytics", icon: siGoogleanalytics },
  { name: "Search Console", icon: siGooglesearchconsole },
  { name: "Tag Manager", icon: siGoogletagmanager },
  { name: "Semrush", icon: siSemrush },
  { name: "HubSpot", icon: siHubspot },
  { name: "Mailchimp", icon: siMailchimp },
  { name: "Zapier", icon: siZapier },
  { name: "Shopify", icon: siShopify },
  { name: "WordPress", icon: siWordpress },
  { name: "WooCommerce", icon: siWoocommerce },
  { name: "Stripe", icon: siStripe },
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "TypeScript", icon: siTypescript },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Supabase", icon: siSupabase },
  { name: "Vercel", icon: siVercel },
  { name: "GitHub", icon: siGithub },
  { name: "Instagram", icon: siInstagram },
  { name: "WhatsApp", icon: siWhatsapp },
];

/** Kept for anything that wants one flat list. */
export const tools: Tool[] = [...designTools, ...buildTools];
