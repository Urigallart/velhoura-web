"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Arrow } from "@/components/ui/Button";
import { ProductGlyph } from "@/components/visual/ProductGlyph";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/useLocale";
import { localePath } from "@/i18n/locale";

/**
 * One product, presented as its own object rather than as a portfolio
 * thumbnail.
 *
 * Four things happen at rest and four more on hover, none of them touching
 * layout:
 *
 *  · the screenshot drifts against the card as the card crosses the viewport,
 *    so the artwork has depth the card does not;
 *  · a hairline in the product's own accent draws across the top edge;
 *  · the meta row rolls: the year leaves upward, the call to action arrives
 *    from below.
 *
 * Pointer tracking writes two CSS custom properties for the spotlight — no
 * React state, so moving the cursor never re-renders the card.
 */
export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const locale = useLocale();
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || frame.current) return;

    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((clientY - r.top) / r.height) * 100}%`);
    });
  };

  return (
    <Link
      ref={ref}
      href={localePath(locale, `/products/${product.slug}`)}
      onPointerMove={onPointerMove}
      aria-label={`${product.name} — ver producto`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raise",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--e-out)]",
        "hover:-translate-y-1.5 hover:border-line-strong",
        "hover:shadow-[0_30px_64px_-34px_rgba(8,9,10,0.28)]",
        "focus-visible:-translate-y-1.5",
      )}
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      {/* Accent hairline, drawn in from the left. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 h-px w-0 bg-[var(--accent)] transition-[width] duration-700 ease-[var(--e-out)] group-hover:w-full"
      />

      {/* Cursor spotlight. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--accent) 9%, transparent), transparent 66%)",
        }}
      />

      {/* Artwork */}
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-sunk sm:aspect-[16/9]">
        <motion.div
          style={reduced ? undefined : { y: artY }}
          className="absolute -inset-y-[7%] inset-x-0"
        >
          <div className="relative size-full transition-transform duration-[900ms] ease-[var(--e-out)] group-hover:scale-[1.04]">
            {product.image ? (
              <Image
                src={product.image}
                alt={`Captura de ${product.name}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <ProductGlyph seed={index} accent={product.accent} />
            )}
          </div>
        </motion.div>

        <span className="absolute left-5 top-5 z-20 rounded-full border border-line bg-paper-raise/85 px-3 py-1 font-sans text-[0.8125rem] text-ink-soft backdrop-blur-sm">
          {product.category}
        </span>

        <StatusPill status={product.status} />
      </div>

      {/* Meta */}
      <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-7">
        <p className="t-label t-num">
          Producto {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="t-h3 mt-3 text-ink">{product.name}</h3>

        <p className="t-body mt-2.5 max-w-[40ch] text-[0.9375rem]">
          {product.summary}
        </p>

        {/* Footer row: the year leaves, the call to action arrives. */}
        <div className="relative mt-7 h-6 overflow-hidden pt-px">
          <span className="t-num absolute inset-x-0 top-0 flex items-center text-sm text-ink-mute transition-[transform,opacity] duration-500 ease-[var(--e-out)] group-hover:-translate-y-6 group-hover:opacity-0">
            {product.year}
          </span>
          <span className="absolute inset-x-0 top-0 flex translate-y-6 items-center gap-1.5 text-sm font-medium text-ink opacity-0 transition-[transform,opacity] duration-500 ease-[var(--e-out)] group-hover:translate-y-0 group-hover:opacity-100">
            {locale === "en" ? "View product" : "Ver producto"}
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: Product["status"] }) {
  const live = status === "LIVE";
  const building = status === "BUILDING";

  return (
    <span className="absolute right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-line bg-paper-raise/85 px-3 py-1 font-sans text-[0.8125rem] text-ink-soft backdrop-blur-sm">
      <span aria-hidden="true" className="relative flex size-1.5">
        {/* A live product gets a heartbeat; the others are simply marked. */}
        {live && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-patina opacity-70" />
        )}
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            live && "bg-patina",
            building && "bg-[var(--accent)]",
            !live && !building && "bg-ink-faint",
          )}
        />
      </span>
      {status}
    </span>
  );
}
