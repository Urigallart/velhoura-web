import {
  PreviewBusiness,
  PreviewCustom,
  PreviewEcommerce,
  PreviewLanding,
} from "@/components/visual/SitePreviews";
import { cn } from "@/lib/utils";

/** One demo per plan; the keys are the plan ids in `data/plans.ts`. */
const PREVIEWS = {
  landing: PreviewLanding,
  business: PreviewBusiness,
  ecommerce: PreviewEcommerce,
  custom: PreviewCustom,
} as const;

export type PreviewId = keyof typeof PREVIEWS;

export const isPreviewId = (id: string): id is PreviewId => id in PREVIEWS;

/**
 * The laptop as a live demo: pointing at a kind of site in the cards puts one
 * on the screen. The demos are the same fictional sites the pricing section
 * uses, laid out at 1000 × 580 and projected onto the display's real,
 * slightly keystoned outline (`--intro-quad`, a homography from the
 * geometry) — so even a dark demo sits flush with the bezel on every side.
 * All are mounted at once and cross-faded, so switching is instant.
 */
export function ScreenPreviews({ active }: { active: PreviewId | null }) {
  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none absolute left-0 top-0 origin-top-left overflow-hidden bg-paper transition-opacity duration-300 [transition-timing-function:var(--e-out)]"
      style={{
        width: "1000px",
        height: "580px",
        transform: "var(--intro-quad)",
        opacity: active ? 1 : 0,
      }}
    >
      {(Object.keys(PREVIEWS) as PreviewId[]).map((id) => {
        const Preview = PREVIEWS[id];
        return (
          <div
            key={id}
            className={cn(
              "absolute inset-0 transition-opacity duration-300 [transition-timing-function:var(--e-out)]",
              active === id ? "opacity-100" : "opacity-0",
            )}
          >
            <Preview />
          </div>
        );
      })}
    </div>
  );
}
