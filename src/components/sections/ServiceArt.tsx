/**
 * A small drawn picture at the top of each service card: what that service
 * makes, in a few shapes. Pure SVG/CSS, ink and white on the card's colour, so
 * there is nothing to load and it scales with the card.
 */
export function ServiceArt({ id }: { id: string }) {
  if (id === "brand") {
    return (
      <div aria-hidden="true" className="grid h-44 grid-cols-3 gap-3">
        <div className="grid place-items-center rounded-2xl bg-white/70">
          <span className="text-[3rem] font-semibold leading-none tracking-[-0.06em]">Aa</span>
        </div>
        <div className="grid place-items-center rounded-2xl bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-mark.png"
            alt=""
            width={305}
            height={256}
            className="h-12 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="grid grid-rows-3 gap-2">
          <span className="rounded-xl bg-white/80" />
          <span className="rounded-xl bg-ink/85" />
          <span className="rounded-xl bg-white/45" />
        </div>
      </div>
    );
  }

  if (id === "web") {
    return (
      <div aria-hidden="true" className="h-44 overflow-hidden rounded-2xl bg-white/80 shadow-[0_12px_30px_-18px_rgba(8,9,10,0.4)]">
        <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2.5">
          <span className="size-2 rounded-full bg-ink/25" />
          <span className="size-2 rounded-full bg-ink/25" />
          <span className="size-2 rounded-full bg-ink/25" />
          <span className="ml-3 h-2 w-24 rounded-full bg-ink/10" />
        </div>
        <div className="grid grid-cols-5 gap-3 p-4">
          <div className="col-span-3 space-y-2.5">
            <span className="block h-3.5 w-11/12 rounded-full bg-ink" />
            <span className="block h-3.5 w-7/12 rounded-full bg-ink" />
            <span className="mt-3 block h-2 w-full rounded-full bg-ink/15" />
            <span className="block h-2 w-10/12 rounded-full bg-ink/15" />
            <span className="mt-3 inline-block h-7 w-20 rounded-full bg-ink" />
          </div>
          <span className="col-span-2 rounded-xl bg-gradient-to-br from-[#4fd1c5] to-[#2b7bff]" />
        </div>
      </div>
    );
  }

  // growth
  return (
    <div aria-hidden="true" className="grid h-44 grid-cols-5 gap-3">
      <div className="col-span-3 rounded-2xl bg-white/80 p-3.5">
        <div className="flex items-center gap-2 rounded-full bg-ink/8 px-3 py-2">
          <svg viewBox="0 0 16 16" fill="none" className="size-3.5 text-ink/60">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="h-2 w-16 rounded-full bg-ink/20" />
        </div>
        <div className="mt-3 space-y-2">
          <span className="block h-2.5 w-9/12 rounded-full bg-ink" />
          <span className="block h-2 w-full rounded-full bg-ink/15" />
          <span className="block h-2 w-8/12 rounded-full bg-ink/15" />
        </div>
      </div>
      <div className="col-span-2 flex items-end gap-2 rounded-2xl bg-ink p-3.5">
        <span className="w-full rounded-md bg-white/30" style={{ height: "30%" }} />
        <span className="w-full rounded-md bg-white/50" style={{ height: "52%" }} />
        <span className="w-full rounded-md bg-white/70" style={{ height: "74%" }} />
        <span className="w-full rounded-md bg-[#ff7da8]" style={{ height: "100%" }} />
      </div>
    </div>
  );
}
