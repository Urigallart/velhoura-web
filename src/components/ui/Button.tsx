import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "outline-inverse" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * One button, three registers.
 *
 * The hover is a colour change and nothing else: buttons stay exactly where
 * they are, so a pointer never has to chase a target.
 */

const base = [
  "group relative isolate inline-flex items-center justify-center gap-2",
  "overflow-hidden rounded-full font-medium whitespace-nowrap",
  "transition-[color,background-color,border-color] duration-300 ease-[var(--e-out)]",
].join(" ");

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper-raise hover:bg-ember focus-visible:bg-ember",
  outline:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper-raise focus-visible:border-ink focus-visible:bg-ink focus-visible:text-paper-raise",
  // For dark grounds (the featured pricing card). Its own variant because
  // `cn` is a plain join: overriding `outline`'s hover colours from a call
  // site would depend on stylesheet order, not on which class came last.
  "outline-inverse":
    "border border-paper-raise/25 text-paper-raise hover:border-paper-raise hover:bg-paper-raise hover:text-night focus-visible:border-paper-raise focus-visible:bg-paper-raise focus-visible:text-night",
  ghost: "text-ink-soft hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[54px] px-7 text-[0.9375rem]",
};

function Inner({
  children,
  arrow,
}: {
  children: ReactNode;
  arrow: boolean;
}) {
  return (
    <>
      <span className="relative">{children}</span>
      {arrow && <Arrow />}
    </>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Renders an arrow after the label. */
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "md",
  arrow = false,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <Inner arrow={arrow}>
      {children}
    </Inner>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

type ButtonActionProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/**
 * Same look as `ButtonLink`, but a real `<button>` for actions that don't
 * navigate — opening the contact modal, submitting a form.
 */
export function ButtonAction({
  children,
  variant = "solid",
  size = "md",
  arrow = false,
  className,
  type = "button",
  ...rest
}: ButtonActionProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <Inner arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}

/**
 * The arrow that follows a button or link label. It stays still: the
 * control's hover is a colour change only.
 */
export function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative block size-3.5 shrink-0 overflow-hidden", className)}
    >
      <Chevron className="absolute inset-0" />
    </span>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("size-full", className)}>
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8L9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline text link with the same arrow behaviour. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  const cls = cn(
    "group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink",
    "transition-colors duration-300 hover:text-ember",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        <span className="u-draw">{children}</span>
        <Arrow />
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <span className="u-draw">{children}</span>
      <Arrow />
    </Link>
  );
}
