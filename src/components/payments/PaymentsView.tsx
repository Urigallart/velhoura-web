"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ButtonAction } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Offer, PayState } from "@/lib/payments";
import type { Locale } from "@/i18n/locale";
import { localePath } from "@/i18n/locale";
import { openContactModal } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

type Project = { code: string; name: string; description: string | null; total: number; currency: string };

const copy = {
  es: {
    lines: ["Paga tu proyecto,", "*de forma segura.*"],
    lead: "Escribe el código que te hemos enviado. Verás el proyecto, el importe y las formas de pago; el pago lo procesa Stripe.",
    codeLabel: "Código de pago",
    placeholder: "VH-XXXX-XX",
    search: "Buscar",
    searching: "Buscando…",
    total: "Importe total",
    choose: "Elige cómo quieres pagar",
    offers: {
      full: { title: "Pago único", detail: "Pagas el proyecto completo de una vez." },
      half: { title: "50 % ahora, 50 % al entregar", detail: (later: string) => `Pagas la mitad para empezar y ${later} cuando te entreguemos el proyecto.` },
      monthly: { title: "Cuota mensual", detail: (months: number) => `Repartido en ${months} meses, con permanencia de ${months} meses. Después, la suscripción sigue como mantenimiento hasta que nos pidas cancelarla.` },
      rest: { title: "Pago restante", detail: "Lo que queda por pagar del proyecto." },
    },
    perMonth: "/mes",
    commitment: (months: number) => `Acepto la permanencia de ${months} meses y las`,
    terms: "condiciones de contratación",
    pay: (amount: string) => `Pagar ${amount}`,
    subscribe: (amount: string) => `Suscribirme por ${amount}/mes`,
    redirecting: "Abriendo el pago…",
    paidSoFar: (paid: string, total: string) => `Ya has pagado ${paid} de ${total}.`,
    paidTitle: "Este proyecto está pagado.",
    paidBody: "Gracias. Si necesitas la factura o tienes cualquier duda, escríbenos.",
    subTitle: "Tienes la suscripción activa.",
    subBody: (amount: string, since: string, until: string) =>
      `${amount} al mes desde el ${since}. La permanencia termina el ${until}; a partir de entonces puedes seguir con el mantenimiento o pedirnos cancelarla.`,
    okTitle: "Pago recibido.",
    okBody: "Gracias. Stripe te enviará el recibo por email y nosotros te escribiremos para seguir con el proyecto. Puede tardar unos segundos en aparecer aquí.",
    cancelled: "Has cancelado el pago. Puedes volver a intentarlo cuando quieras.",
    secure: "Pago seguro con Stripe. No guardamos los datos de tu tarjeta.",
    help: "¿No tienes código o algo no cuadra?",
    helpCta: "Escríbenos",
    errors: {
      not_configured: "Los pagos online todavía no están activos. Escríbenos y te ayudamos.",
      rate_limited: "Demasiados intentos seguidos. Espera unos minutos y vuelve a probar.",
      invalid_code: "Ese código no tiene el formato correcto. Revisa que esté bien escrito.",
      not_found: "No encontramos ningún proyecto con ese código. Revisa que esté bien escrito.",
      option_unavailable: "Esa forma de pago ya no está disponible para este proyecto. Vuelve a buscar el código.",
      commitment_required: "Para la cuota mensual tienes que aceptar la permanencia.",
      stripe_error: "No hemos podido conectar con el sistema de pago. Inténtalo de nuevo en un momento.",
      network: "No hemos podido conectar. Revisa tu conexión e inténtalo de nuevo.",
    } as Record<string, string>,
  },
  en: {
    lines: ["Pay for your project,", "*securely.*"],
    lead: "Enter the code we sent you. You'll see the project, the amount and the ways to pay; payment is handled by Stripe.",
    codeLabel: "Payment code",
    placeholder: "VH-XXXX-XX",
    search: "Look up",
    searching: "Looking up…",
    total: "Total",
    choose: "Choose how you want to pay",
    offers: {
      full: { title: "One payment", detail: "You pay for the whole project at once." },
      half: { title: "50% now, 50% on delivery", detail: (later: string) => `You pay half to get started and ${later} when we deliver the project.` },
      monthly: { title: "Monthly fee", detail: (months: number) => `Spread over ${months} months, with a ${months}-month commitment. After that, the subscription continues as maintenance until you ask us to cancel it.` },
      rest: { title: "Remaining payment", detail: "What's left to pay for the project." },
    },
    perMonth: "/month",
    commitment: (months: number) => `I accept the ${months}-month commitment and the`,
    terms: "terms of service",
    pay: (amount: string) => `Pay ${amount}`,
    subscribe: (amount: string) => `Subscribe for ${amount}/month`,
    redirecting: "Opening payment…",
    paidSoFar: (paid: string, total: string) => `You've paid ${paid} of ${total}.`,
    paidTitle: "This project is paid.",
    paidBody: "Thank you. If you need the invoice or have any questions, write to us.",
    subTitle: "Your subscription is active.",
    subBody: (amount: string, since: string, until: string) =>
      `${amount} a month since ${since}. The commitment ends on ${until}; from then on you can keep the maintenance or ask us to cancel it.`,
    okTitle: "Payment received.",
    okBody: "Thank you. Stripe will email you the receipt and we'll be in touch to carry on with the project. It can take a few seconds to show here.",
    cancelled: "You cancelled the payment. You can try again whenever you like.",
    secure: "Secure payment with Stripe. We never store your card details.",
    help: "No code, or something doesn't look right?",
    helpCta: "Write to us",
    errors: {
      not_configured: "Online payments aren't active yet. Write to us and we'll help.",
      rate_limited: "Too many attempts in a row. Wait a few minutes and try again.",
      invalid_code: "That code isn't in the right format. Check it's typed correctly.",
      not_found: "We couldn't find a project with that code. Check it's typed correctly.",
      option_unavailable: "That payment option is no longer available for this project. Look up the code again.",
      commitment_required: "For the monthly fee you need to accept the commitment.",
      stripe_error: "We couldn't reach the payment system. Try again in a moment.",
      network: "We couldn't connect. Check your connection and try again.",
    } as Record<string, string>,
  },
};

/**
 * The client payment page (/gestiones, /en/payments): a code goes in, the
 * project and its ways to pay come out, and the chosen one opens Stripe
 * Checkout. See `lib/payments.ts` for how a code is set up in Stripe.
 */
export function PaymentsView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const params = useSearchParams();
  const fromUrl = params.get("codigo");
  const status = params.get("estado");
  const [code, setCode] = useState(fromUrl ?? "");
  const [busy, setBusy] = useState(Boolean(fromUrl));
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ project: Project; state: PayState } | null>(null);
  const [picked, setPicked] = useState<Offer["option"] | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [paying, setPaying] = useState(false);
  const [notice, setNotice] = useState<"ok" | "cancelled" | null>(
    status === "ok" ? "ok" : status === "cancelado" ? "cancelled" : null,
  );

  const money = useCallback(
    (cents: number, currency: string) =>
      new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      }).format(cents / 100),
    [locale],
  );
  const date = (unix: number) =>
    new Date(unix * 1000).toLocaleDateString(locale === "en" ? "en-GB" : "es-ES", { day: "numeric", month: "long", year: "numeric" });

  /** The lookup request itself; results are applied by `show`. */
  const request = useCallback(async (raw: string) => {
    try {
      const res = await fetch("/api/pay/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: raw }),
      });
      const data = await res.json().catch(() => null);
      return res.ok ? { data } : { error: data?.error ?? "stripe_error" };
    } catch {
      return { error: "network" };
    }
  }, []);

  const show = useCallback(
    (r: { data?: { project: Project; state: PayState }; error?: string }) => {
      setBusy(false);
      if (r.error || !r.data) {
        setError(t.errors[r.error ?? "stripe_error"] ?? t.errors.stripe_error);
        return;
      }
      setResult(r.data);
      const offers = (r.data.state as { offers?: Offer[] }).offers;
      if (offers?.length === 1) setPicked(offers[0].option);
    },
    [t],
  );

  async function lookup(raw: string) {
    setBusy(true);
    setError(null);
    setResult(null);
    setPicked(null);
    setAccepted(false);
    show(await request(raw));
  }

  // Coming back from Stripe (or from a link with the code in it).
  useEffect(() => {
    if (!fromUrl) return;
    let live = true;
    void request(fromUrl).then((r) => live && show(r));
    return () => {
      live = false;
    };
  }, [fromUrl, request, show]);

  async function pay() {
    if (!result || !picked) return;
    setPaying(true);
    setError(null);
    try {
      const res = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: result.project.code, option: picked, locale, acceptCommitment: accepted }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) {
        setError(t.errors[data?.error] ?? t.errors.stripe_error);
        setPaying(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(t.errors.network);
      setPaying(false);
    }
  }

  const state = result?.state;
  const offers = state && (state.kind === "open" || state.kind === "partial") ? state.offers : [];
  const chosen = offers.find((o) => o.option === picked) ?? null;
  const cur = result?.project.currency ?? "eur";

  return (
    <section className="band pt-32 sm:pt-40">
      <div className="shell max-w-[760px]">
        <SectionHeading lines={t.lines} tone="green" titleClassName="!text-[clamp(2.25rem,6vw,4.25rem)]" subtitle={t.lead} />

        {notice === "ok" && (
          <div className="mt-10 rounded-2xl border border-[#0a9d4d]/30 bg-[#0a9d4d]/[0.06] px-5 py-4" role="status">
            <p className="font-medium text-ink">{t.okTitle}</p>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">{t.okBody}</p>
          </div>
        )}
        {notice === "cancelled" && (
          <p className="mt-10 rounded-2xl border border-line bg-paper-off px-5 py-4 text-[0.9375rem] text-ink-soft" role="status">
            {t.cancelled}
          </p>
        )}

        <form
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(null);
            void lookup(code);
          }}
        >
          <label className="block flex-1">
            <span className="t-label">{t.codeLabel}</span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder={t.placeholder}
              autoComplete="off"
              spellCheck={false}
              required
              maxLength={24}
              className="field mt-2 font-mono tracking-[0.08em]"
            />
          </label>
          <ButtonAction type="submit" size="lg" arrow disabled={busy} className="disabled:opacity-60">
            {busy ? t.searching : t.search}
          </ButtonAction>
        </form>

        {error && (
          <p role="alert" className="mt-4 text-[0.9375rem] text-ember-deep">
            {error}
          </p>
        )}

        {result && state && (
          <div className="mt-10 rounded-3xl border border-line bg-paper-raise p-6 sm:p-8">
            <p className="t-label font-mono">{result.project.code}</p>
            <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">{result.project.name}</h2>
            {result.project.description && <p className="mt-2 text-[0.9375rem] text-ink-soft">{result.project.description}</p>}
            <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-5">
              <span className="t-label">{t.total}</span>
              <span className="t-num text-[1.75rem] font-semibold text-ink">{money(result.project.total, cur)}</span>
            </div>

            {state.kind === "paid" && (
              <div className="mt-6 rounded-2xl bg-paper-off px-5 py-4">
                <p className="font-medium text-ink">{t.paidTitle}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">{t.paidBody}</p>
              </div>
            )}

            {state.kind === "subscribed" && (
              <div className="mt-6 rounded-2xl bg-paper-off px-5 py-4">
                <p className="font-medium text-ink">{t.subTitle}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">
                  {t.subBody(money(state.monthly, cur), date(state.start), date(state.commitmentEnds))}
                </p>
              </div>
            )}

            {state.kind === "partial" && (
              <p className="mt-6 text-[0.9375rem] text-ink-soft">{t.paidSoFar(money(state.paid, cur), money(result.project.total, cur))}</p>
            )}

            {offers.length > 0 && (
              <>
                {state.kind === "open" && <p className="t-label mt-7">{t.choose}</p>}
                <div role="radiogroup" className="mt-3 grid gap-3">
                  {offers.map((o) => {
                    const on = picked === o.option;
                    const info = t.offers[o.option];
                    const detail =
                      o.option === "half"
                        ? t.offers.half.detail(money(o.later ?? 0, cur))
                        : o.option === "monthly"
                          ? t.offers.monthly.detail(o.months ?? 12)
                          : (info.detail as string);
                    return (
                      <button
                        key={o.option}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => {
                          setPicked(o.option);
                          setAccepted(false);
                        }}
                        className={cn(
                          "flex items-start justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200",
                          on ? "border-ink bg-paper-sunk" : "border-line hover:border-line-strong",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block font-medium text-ink">{info.title}</span>
                          <span className="mt-1 block text-[0.875rem] leading-relaxed text-ink-soft">{detail}</span>
                        </span>
                        <span className="t-num shrink-0 text-right text-[1.25rem] font-semibold text-ink">
                          {money(o.now, cur)}
                          {o.option === "monthly" && <span className="text-[0.875rem] font-normal text-ink-mute">{t.perMonth}</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {chosen?.option === "monthly" && (
                  <label className="mt-4 flex items-start gap-3 text-[0.875rem] text-ink-soft">
                    <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5 size-4 accent-ink" />
                    <span>
                      {t.commitment(chosen.months ?? 12)}{" "}
                      <Link href="/legal/terms" target="_blank" className="text-ink underline decoration-line-strong underline-offset-4">
                        {t.terms}
                      </Link>
                      .
                    </span>
                  </label>
                )}

                <ButtonAction
                  size="lg"
                  arrow
                  onClick={pay}
                  disabled={!chosen || paying || (chosen.option === "monthly" && !accepted)}
                  className="mt-6 w-full disabled:opacity-50"
                >
                  {paying
                    ? t.redirecting
                    : chosen?.option === "monthly"
                      ? t.subscribe(money(chosen.now, cur))
                      : t.pay(money(chosen?.now ?? 0, cur))}
                </ButtonAction>
              </>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[0.875rem] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
              <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {t.secure}
          </span>
          <span>
            {t.help}{" "}
            <button type="button" onClick={openContactModal} className="font-medium text-ink underline decoration-line-strong underline-offset-4">
              {t.helpCta}
            </button>
          </span>
        </div>
        <p className="sr-only">
          <Link href={localePath(locale, "/")}>Velhoura</Link>
        </p>
      </div>
    </section>
  );
}
