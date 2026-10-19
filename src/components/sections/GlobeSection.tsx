"use client";

import { useEffect, useRef, useState } from "react";
import { StoryGlobeLoader } from "@/components/3d/StoryGlobeLoader";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/i18n/useLocale";
import { openContactModal } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

/**
 * "Velhoura, desde España." — the studio's globe, large, turned to Spain with
 * a pin on Barcelona. The pin (or the button beside it) opens a card that
 * tells the studio's story in four short chapters.
 *
 * Every statement in the chapters comes from facts already published on the
 * site — the two partners, their backgrounds, the products they have built,
 * who they work for. There is no founding date and no origin anecdote here
 * because none has been supplied; add them to `chapters` when they are.
 */

const copy = {
  es: {
    label: "Desde España",
    lines: ["Velhoura,", "*desde España.*"],
    lead: "Un estudio de Barcelona que diseña, programa y lanza. Toca el pin y te contamos cómo llegamos hasta aquí.",
    pinLabel: "Barcelona · España",
    pinAria: "Barcelona, España: abrir nuestra historia",
    hint: "Empieza por Barcelona",
    read: "Leer las postales",
    close: "Cerrar",
    chapter: (n: number) => `Postal ${n}`,
    prev: "Anterior",
    next: "Siguiente",
    cardAria: "Nuestra historia, en postales",
    postal: "Postal",
    sign: "Oriol e Ian",
    stamp: "Barcelona",
    drag: "Arrastra para girar el globo",
    cta: "Cuéntanos tu negocio",
    chapters: [
      {
        title: "Aquí empezamos.",
        body: "Barcelona. Somos Oriol e Ian, y trabajamos con negocios de la ciudad y de alrededor.",
      },
      {
        title: "Con quien hablas es quien lo hace.",
        body: "Oriol viene del desarrollo y del diseño de interfaces. Ian, de los sistemas, las redes y React. No hay nadie entre tú y quien te hace la web.",
      },
      {
        title: "Probamos primero en casa.",
        body: "Tenemos productos propios: las gafas Velhoura, Roady, Gym Tracker y Zhestar. Lo que aprendemos ahí lo usamos en tu proyecto.",
      },
      {
        title: "Ahora te toca a ti.",
        body: "Marca, web y clientes, en el mismo equipo. Cuéntanos qué haces y lo vemos.",
      },
    ],
  },
  en: {
    label: "From Spain",
    lines: ["Velhoura,", "*from Spain.*"],
    lead: "A Barcelona studio that designs, builds and launches. Tap the pin and we'll tell you how we got here.",
    pinLabel: "Barcelona · Spain",
    pinAria: "Barcelona, Spain: open our story",
    hint: "Start with Barcelona",
    read: "Read the postcards",
    close: "Close",
    chapter: (n: number) => `Postcard ${n}`,
    prev: "Previous",
    next: "Next",
    cardAria: "Our story, in postcards",
    postal: "Postcard",
    sign: "Oriol & Ian",
    stamp: "Barcelona",
    drag: "Drag to turn the globe",
    cta: "Tell us about your business",
    chapters: [
      {
        title: "This is where we start.",
        body: "Barcelona. We're Oriol and Ian, and we work with businesses in the city and around it.",
      },
      {
        title: "Who you talk to is who builds it.",
        body: "Oriol comes from development and interface design. Ian from systems, networks and React. There's nobody between you and the person building your site.",
      },
      {
        title: "We try it at home first.",
        body: "We have products of our own: the Velhoura sunglasses, Roady, Gym Tracker and Zhestar. What we learn there goes into your project.",
      },
      {
        title: "Now it's your turn.",
        body: "Brand, web and customers, in one team. Tell us what you do and we'll take it from there.",
      },
    ],
  },
};

const CHAPTERS_ID = "story-chapters";

export function GlobeSection() {
  const locale = useLocale();
  const t = copy[locale];
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // The chapter nearest the middle of the window is the one being read.
  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toStart = () =>
    refs.current[0]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section id="story" className="band relative border-t border-line">
      <div className="shell">
        <div className="text-center">
<MaskedTitle
            as="h2"
            split="word"
            lines={t.lines}
            className="mx-auto mt-7 text-balance font-semibold leading-[0.95] tracking-[-0.045em] text-[clamp(2.5rem,9vw,7.25rem)]"
            stagger={90}
          />
          <Reveal delay={240}>
            <p className="t-lead mx-auto mt-7 max-w-[52ch] text-pretty">{t.lead}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-6 lg:mt-14 lg:grid-cols-12">
          {/* The globe stays put while the story scrolls past it. */}
          <div className="lg:sticky lg:top-24 lg:col-span-6 lg:self-start">
            <div className="relative mx-auto aspect-square w-full max-w-[640px]">
              <StoryGlobeLoader
                open={active >= 0}
                step={active}
                onPin={toStart}
                pinLabel={t.pinLabel}
                pinAria={t.pinAria}
                controls={CHAPTERS_ID}
              />
              <p
                aria-hidden="true"
                className="t-label !font-sans !normal-case !tracking-normal !text-[0.8125rem] pointer-events-none absolute inset-x-0 bottom-[1%] text-center !text-ink-faint"
              >
                {t.drag}
              </p>
            </div>
          </div>

          {/* The story: four statements, set large, lit one at a time. */}
          <ol id={CHAPTERS_ID} className="lg:col-span-6 lg:col-start-7">
            {t.chapters.map((c, i) => (
              <li
                key={c.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={cn(
                  "flex flex-col justify-center py-8 transition-opacity duration-500 lg:min-h-[62svh] lg:py-10",
                  active === -1 || active === i ? "opacity-100" : "lg:opacity-[0.22]",
                )}
              >
                <p className="text-[0.875rem] font-medium text-ember">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
                  {c.title}
                </h3>
                <p className="t-body mt-5 max-w-[44ch] text-[1.0625rem]">{c.body}</p>
                {i === t.chapters.length - 1 && (
                  <button
                    type="button"
                    onClick={openContactModal}
                    className="mt-7 inline-flex h-12 items-center gap-2 self-start rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper-raise transition-colors duration-300 hover:bg-ember"
                  >
                    {t.cta}
                    <span aria-hidden="true">→</span>
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
