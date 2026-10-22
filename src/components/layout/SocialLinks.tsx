import { siGithub, siInstagram } from "simple-icons";
import { activeSocials } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * LinkedIn's mark. The icon set the site uses dropped it, so it is drawn here
 * (24×24 viewBox, same as the others).
 */
const LINKEDIN =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const paths: Record<string, string> = {
  Instagram: siInstagram.path,
  LinkedIn: LINKEDIN,
  GitHub: siGithub.path,
};

/** The social channels that exist, as round icon buttons. */
export function SocialLinks({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {activeSocials.map((s) => {
        const path = paths[s.label];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              title={s.label}
              className={cn(
                "grid place-items-center rounded-full border border-line bg-paper-raise text-ink-soft transition-[color,border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper-raise",
                size === "lg" ? "size-12" : "size-10",
              )}
            >
              {path ? (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={size === "lg" ? "size-5" : "size-[1.125rem]"}>
                  <path d={path} />
                </svg>
              ) : (
                <span className="text-xs font-semibold">{s.label.slice(0, 2)}</span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
