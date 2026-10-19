import { ButtonLink } from "@/components/ui/Button";

/**
 * A 404 is still a page of the site, so it gets the display scale and the
 * signal index like every other section rather than the browser's apology.
 */
export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[76svh] items-center overflow-hidden">
      <div className="shell relative">
        <p className="t-label flex items-center gap-3">
          <span className="t-num text-ember">404</span>
          No encontrado
        </p>

        <h1 className="t-h1 mt-7 max-w-[15ch] text-balance">
          Esta página todavía no existe<span className="text-ember">.</span>
        </h1>

        <p className="t-lead mt-6 max-w-[42ch]">
          Puede que la hayamos movido, o que aún esté por construir. Las dos
          cosas pasan bastante por aquí.
        </p>

        <div className="mt-10">
          <>
            <ButtonLink href="/" size="lg" arrow>
              Volver al inicio
            </ButtonLink>
          </>
        </div>
      </div>
    </section>
  );
}
