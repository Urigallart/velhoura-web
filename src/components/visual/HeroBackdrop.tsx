/**
 * The hero's substrate: film grain, and the fade that settles the first
 * screen into the section below it.
 *
 * It used to also draw the shell's column grid and three horizon rules. Both
 * are gone — with a centred hero the vertical rules cut straight through the
 * headline's counters, and once the type is doing the work there is nothing
 * for a visible grid to explain.
 *
 * Being a Server Component, it costs zero JavaScript and paints with the
 * first byte of HTML.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
