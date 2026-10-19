import Image from "next/image";
import {
  PreviewBusiness,
  PreviewCustom,
  PreviewEcommerce,
} from "@/components/visual/SitePreviews";
import type { ServicePage } from "@/data/servicePages";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/locale";

/**
 * The picture for a service. When the studio has supplied a photo
 * (`page.image`) it is shown as is; until then a visual is generated from
 * the brand's own materials — a browser frame for web work, a search result
 * for growth work, a specimen sheet for brand work — so the page never shows
 * an empty box or a stock photo.
 */
export function ServiceVisual({
  page,
  locale = "es",
  className,
  priority,
}: {
  page: ServicePage;
  locale?: Locale;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-paper-sunk",
        className,
      )}
    >
      {page.image ? (
        <Image
          src={page.image}
          alt={page.imageAlt ?? page.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />
      ) : (
        <Generated page={page} locale={locale} />
      )}
    </div>
  );
}

function Generated({ page, locale }: { page: ServicePage; locale: Locale }) {
  const en = locale === "en";
  if (page.area === "web") {
    const Preview =
      page.slug === "tiendas-online"
        ? PreviewEcommerce
        : page.slug === "desarrollo-a-medida"
          ? PreviewCustom
          : PreviewBusiness;
    return (
      <div aria-hidden="true" className="absolute inset-0 flex items-end justify-center p-[6%] pb-0">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-t-xl border border-b-0 border-line bg-paper shadow-[0_24px_60px_-28px_rgba(8,9,10,0.45)]">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-line bg-paper-sunk px-3 py-2">
            <span className="size-2 rounded-full bg-ink-faint/50" />
            <span className="size-2 rounded-full bg-ink-faint/50" />
            <span className="size-2 rounded-full bg-ink-faint/50" />
          </div>
          <div className="min-h-0 flex-1">
            <Preview />
          </div>
        </div>
      </div>
    );
  }

  if (page.area === "growth") {
    const rows = [
      { site: "tunegocio.es", title: en ? "Your business — what they search for, nearby" : "Tu negocio — Lo que buscan, cerca de ellos", ad: page.slug === "google-ads", hit: true },
      { site: "competidor-a.com", title: en ? "Another search result" : "Otro resultado de la búsqueda" },
      { site: "directorio.es", title: en ? "Directory of local businesses" : "Listado de empresas del sector" },
    ];
    return (
      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-3 p-[8%]">
        <div className="flex items-center gap-3 rounded-full border border-line bg-paper px-5 py-3 shadow-[0_10px_30px_-18px_rgba(8,9,10,0.35)]">
          <span className="size-3 rounded-full border-2 border-ink-mute" />
          <span className="text-sm text-ink-soft">{en ? "your service near me" : "tu servicio cerca de mí"}</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.site}
            className={cn(
              "rounded-xl border bg-paper px-5 py-4",
              r.hit
                ? "border-ember/40 shadow-[0_16px_40px_-20px_rgba(107,122,69,0.45)]"
                : "border-line opacity-60",
            )}
          >
            <p className="flex items-center gap-2 text-xs text-ink-mute">
              {r.ad && (
                <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-semibold text-paper">
                  {en ? "Sponsored" : "Patrocinado"}
                </span>
              )}
              {r.site}
            </p>
            <p className={cn("mt-1 text-[15px] font-medium", r.hit ? "text-ember" : "text-ink-soft")}>
              {r.title}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Brand: a specimen sheet — mark, palette, type.
  return (
    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-3 p-[7%]">
      <div className="col-span-3 row-span-3 grid place-items-center rounded-xl bg-ink text-paper">
        <span className="text-[clamp(40px,7vw,96px)] font-semibold leading-none tracking-[-0.06em]">
          Aa<span className="text-ember">.</span>
        </span>
      </div>
      <div className="col-span-2 row-span-2 rounded-xl bg-ember" />
      <div className="col-span-1 row-span-1 rounded-xl bg-paper ring-1 ring-line" />
      <div className="col-span-1 row-span-1 rounded-xl bg-ink-soft" />
      <div className="col-span-5 row-span-1 flex items-center justify-between rounded-xl bg-paper px-5 ring-1 ring-line">
        <span className="font-sans text-xs text-ink-mute">
          {page.tag}
        </span>
        <span className="text-sm font-medium text-ink">{page.name}</span>
      </div>
    </div>
  );
}
