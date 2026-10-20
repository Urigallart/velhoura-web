import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/locale";
import { cn } from "@/lib/utils";

const copy = {
  es: {
    lines: ["Un equipo.", "*Un responsable.*"],
    subtitle: "Así nos comparamos con las otras dos formas habituales de hacer una web.",
    cols: ["Velhoura", "Agencias grandes", "Plantillas y hacerlo tú"],
    rows: [
      ["Precio publicado antes de empezar", true, false, true],
      ["Diseño a medida", true, true, false],
      ["Un único contacto para todo", true, false, false],
      ["Hablas con quien diseña y programa", true, false, false],
      ["Propuesta por escrito con el alcance", true, true, false],
      ["Sin dedicarle tú el tiempo", true, true, false],
      ["Pensado para el presupuesto de una pyme", true, false, true],
    ] as [string, boolean, boolean, boolean][],
    note: "Comparativa general: cada agencia y cada herramienta es distinta.",
    yes: "Sí",
    no: "No",
  },
  en: {
    lines: ["One team.", "*One owner.*"],
    subtitle: "How we compare with the other two usual ways of getting a website.",
    cols: ["Velhoura", "Large agencies", "Templates and DIY"],
    rows: [
      ["Price published before you start", true, false, true],
      ["Custom design", true, true, false],
      ["One contact for everything", true, false, false],
      ["You talk to who designs and builds", true, false, false],
      ["Written proposal with the scope", true, true, false],
      ["No time needed from you", true, true, false],
      ["Built for a small business budget", true, false, true],
    ] as [string, boolean, boolean, boolean][],
    note: "A general comparison: every agency and every tool is different.",
    yes: "Yes",
    no: "No",
  },
};

function Mark({ on, yes, no }: { on: boolean; yes: string; no: string }) {
  return on ? (
    <span
      role="img"
      aria-label={yes}
      className="grid size-8 place-items-center rounded-full bg-[#1fb86a] text-white"
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ) : (
    <span
      role="img"
      aria-label={no}
      className="grid size-8 place-items-center rounded-full bg-ink/8 text-ink/40"
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/**
 * The argument as a comparison: three ways of getting a website, seven
 * things a business owner cares about, a tick or a cross in each cell. The
 * Velhoura column is the one with colour, so the eye lands there first.
 */
export function DifferentiationSection({ locale = "es" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <section className="band">
      <div className="shell">
        <SectionHeading align="center" tone="teal" lines={t.lines} subtitle={t.subtitle} />

        <Reveal className="mt-14 md:mt-20">
          <div className="overflow-x-auto rounded-[2rem] bg-paper-sunk p-3 sm:p-4">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[38%] px-5 pb-4 pt-3" />
                  {t.cols.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={cn(
                        "px-3 pb-4 pt-3 text-center text-[0.9375rem] font-semibold tracking-[-0.01em]",
                        i === 0
                          ? "rounded-t-3xl bg-gradient-to-b from-[#a5f0e4] to-[#bfe0ff] text-[1.0625rem] text-ink"
                          : "text-ink/60",
                      )}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map(([label, a, b, c], r) => {
                  const last = r === t.rows.length - 1;
                  return (
                    <tr key={label}>
                      <th
                        scope="row"
                        className={cn(
                          "bg-paper-raise px-5 py-4 text-[0.9375rem] font-medium text-ink",
                          r === 0 && "rounded-tl-2xl",
                          last && "rounded-bl-2xl",
                          !last && "border-b border-ink/8",
                        )}
                      >
                        {label}
                      </th>
                      {[a, b, c].map((on, i) => (
                        <td
                          key={i}
                          className={cn(
                            "px-3 py-4 text-center",
                            i === 0 ? "bg-gradient-to-b from-[#bfe0ff] to-[#d9ccff]/70" : "bg-paper-raise",
                            i === 2 && r === 0 && "rounded-tr-2xl",
                            i === 2 && last && "rounded-br-2xl",
                            i === 0 && last && "rounded-b-3xl",
                            !last && (i === 0 ? "border-b border-white/40" : "border-b border-ink/8"),
                          )}
                        >
                          <span className="inline-grid">
                            <Mark on={on} yes={t.yes} no={t.no} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-[0.8125rem] text-ink-mute">{t.note}</p>
      </div>
    </section>
  );
}
