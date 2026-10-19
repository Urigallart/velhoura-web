"use client";

import { characters } from "@/data/characters";
import { ui } from "@/data/assistant";
import type { Locale } from "@/i18n/locale";
import { openAssistant } from "@/lib/assistant";

/**
 * The partners, standing at the side of the first screen. Pressing one opens
 * the chat as that person. With `interactive={false}` it is only a picture —
 * used for the copy of the hero that sits on the laptop screen in the intro.
 */
export function HeroCharacters({
  locale,
  interactive = true,
}: {
  locale: Locale;
  interactive?: boolean;
}) {
  const who = characters[0];
  const t = ui[locale];

  const figure = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={who.figure}
      alt={interactive ? "" : ""}
      width={630}
      height={1300}
      draggable={false}
      className="h-full w-auto select-none object-contain object-bottom"
    />
  );

  return (
    <div
      className="pointer-events-none absolute bottom-10 left-1 z-[2] hidden h-[clamp(340px,50vh,560px)] min-[1280px]:block xl:left-[max(0.25rem,calc(50%-52rem))]"
      aria-hidden={interactive ? undefined : true}
    >
      {interactive ? (
        <button
          type="button"
          onClick={() => openAssistant(who.id)}
          aria-label={`${t.hint} — ${who.name}`}
          className="group pointer-events-auto relative block h-full cursor-pointer"
        >
          <span className="absolute -top-9 left-0 z-[3] whitespace-nowrap rounded-2xl rounded-bl-sm border border-line bg-paper-raise px-3.5 py-2 text-[0.8125rem] font-medium text-ink shadow-[0_12px_30px_-16px_rgba(8,9,10,0.4)] transition-colors duration-300 group-hover:border-ink">
            {t.hint}
          </span>
          {figure}
        </button>
      ) : (
        figure
      )}
    </div>
  );
}
