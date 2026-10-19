"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { characters, type Character } from "@/data/characters";
import { topicLabels, ui } from "@/data/assistant";
import { useLocale } from "@/i18n/useLocale";
import { answer, answerTopic, onOpenAssistant, type Reply } from "@/lib/assistant";
import { openContactModal } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "me"; text: string; reply?: Reply };

/** `**bold**`, line breaks and "• " bullets — all the formatting the answers use. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong> : part,
          )}
        </Fragment>
      ))}
    </>
  );
}

function Face({ who, className }: { who: Character; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={who.face}
      alt=""
      width={96}
      height={96}
      className={cn("rounded-full bg-paper-sunk object-cover", className)}
    />
  );
}

/**
 * The studio's chat. Mounted once in the root layout: a round launcher at the
 * bottom-right, and a panel that opens from it or from a character in the
 * hero. Answers come from `data/assistant.ts`; see `lib/assistant.ts`.
 */
export function AssistantChat() {
  const locale = useLocale();
  const t = ui[locale];
  const [open, setOpen] = useState(false);
  const [who, setWho] = useState<Character>(characters[0]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  // Past the first screen the launcher drops its label and shrinks to the
  // face alone, so it stops sitting on top of the content being read.
  const [compact, setCompact] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const greet = (c: Character) =>
    setMsgs([
      {
        from: "bot",
        text: t.greeting.replace("{name}", c.name),
        reply: { topic: "greeting", text: "", next: ["services", "prices", "process", "time"], contact: false },
      },
    ]);

  useEffect(() => {
    return onOpenAssistant((id) => {
      const c = characters.find((x) => x.id === id) ?? characters[0];
      setWho(c);
      setOpen(true);
      setMsgs((m) => (m.length ? m : [{
        from: "bot",
        text: ui[locale].greeting.replace("{name}", c.name),
        reply: { topic: "greeting", text: "", next: ["services", "prices", "process", "time"], contact: false },
      }]));
    });
  }, [locale]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > window.innerHeight * 0.5);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const toggle = () => {
    setOpen((v) => !v);
    if (!msgs.length) greet(who);
  };

  const ask = (label: string, get: () => Reply) => {
    if (busy) return;
    setMsgs((m) => [...m, { from: "me", text: label }]);
    setBusy(true);
    const r = get();
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: r.text, reply: r }]);
      setBusy(false);
    }, 450);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    ask(text, () => answer(text, locale));
  };

  const last = msgs[msgs.length - 1];
  const chips = !busy && last?.from === "bot" ? last.reply : undefined;

  return (
    <div className="assistant-root fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          role="dialog"
          aria-label={t.title}
          className="flex h-[min(34rem,calc(100svh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line bg-paper-raise shadow-[0_30px_80px_-30px_rgba(8,9,10,0.45)]"
        >
          <header className="flex items-center gap-3 border-b border-line px-4 py-3">
            <Face who={who} className="size-10" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9375rem] font-semibold leading-tight">{who.name} · Velhoura</p>
              <p className="truncate text-xs text-ink-mute">{who.role[locale]}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-line-strong hover:text-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div ref={logRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start gap-2")}>
                {m.from === "bot" && <Face who={who} className="mt-0.5 size-7 shrink-0" />}
                <p
                  className={cn(
                    "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[0.9rem] leading-relaxed",
                    m.from === "me" ? "rounded-br-md bg-ink text-paper-raise" : "rounded-bl-md bg-paper-sunk text-ink",
                  )}
                >
                  <Rich text={m.text} />
                </p>
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2">
                <Face who={who} className="size-7 shrink-0" />
                <p className="rounded-2xl rounded-bl-md bg-paper-sunk px-3.5 py-3" aria-label={t.typing}>
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-1.5 animate-pulse rounded-full bg-ink-mute"
                        style={{ animationDelay: `${d * 160}ms` }}
                      />
                    ))}
                  </span>
                </p>
              </div>
            )}
            {chips && (
              <div className="flex flex-wrap gap-2 pl-9 pt-1">
                {chips.next.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => ask(topicLabels[id]?.[locale] ?? id, () => answerTopic(id, locale))}
                    className="rounded-full border border-line-strong px-3 py-1.5 text-[0.8125rem] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper-raise"
                  >
                    {topicLabels[id]?.[locale] ?? id}
                  </button>
                ))}
                {chips.contact && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openContactModal();
                    }}
                    className="rounded-full bg-ember px-3 py-1.5 text-[0.8125rem] font-medium text-paper-raise transition-colors duration-300 hover:bg-ember-deep"
                  >
                    {t.contactCta} →
                  </button>
                )}
              </div>
            )}
          </div>

          <form onSubmit={submit} className="border-t border-line p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.placeholder}
                maxLength={300}
                aria-label={t.placeholder}
                className="h-11 min-w-0 flex-1 rounded-full border border-line bg-paper px-4 text-[0.9375rem] outline-none transition-colors duration-300 focus:border-ink"
              />
              <button
                type="submit"
                disabled={!draft.trim() || busy}
                aria-label={t.send}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper-raise transition-colors duration-300 hover:bg-ember disabled:opacity-35 disabled:hover:bg-ink"
              >
                →
              </button>
            </div>
            <p className="mt-2 px-1 text-[0.6875rem] leading-snug text-ink-mute">{t.note}</p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? t.close : t.open}
        className={cn(
          "group relative flex items-center rounded-full border border-line bg-paper-raise p-1.5 shadow-[0_14px_40px_-18px_rgba(8,9,10,0.5)] transition-[border-color,padding] duration-300 hover:border-line-strong",
          !compact && "sm:pr-5",
        )}
      >
        <span className="relative">
          <Face who={who} className="size-12" />
          <span aria-hidden="true" className="absolute right-0 top-0 flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-60" />
            <span className="relative inline-flex size-3 rounded-full border-2 border-paper-raise bg-ember" />
          </span>
        </span>
        <span
          className={cn(
            "hidden overflow-hidden whitespace-nowrap text-[0.9375rem] font-medium transition-[max-width,opacity,margin] duration-300 sm:block",
            compact ? "ml-0 max-w-0 opacity-0" : "ml-3 max-w-[16rem] opacity-100",
          )}
        >
          {t.hint}
        </span>
      </button>
    </div>
  );
}
