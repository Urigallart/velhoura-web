"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProcess } from "@/data/localized";
import { useLocale } from "@/i18n/useLocale";

const copy = {
  es: {
    label: "Cómo trabajamos",
    lines: ["Cuatro pasos,", "*sin sorpresas.*"],
    subtitle: "El mismo recorrido para una web, una marca o una campaña. Siempre sabes en qué punto está tu proyecto.",
  },
  en: {
    label: "How we work",
    lines: ["Four steps,", "*no surprises.*"],
    subtitle: "The same path for a website, a brand or a campaign. You always know where your project stands.",
  },
};

/**
 * How a project runs.
 *
 * A single line is drawn by scroll progress through the section and each phase
 * lights as the line reaches it. The scroll value drives one spring, which
 * drives one `scaleY` and a handful of opacity transforms — the DOM is never
 * rewritten while scrolling, so the whole thing runs on the compositor.
 *
 * The indices are set at headline size rather than as mono eyebrows: they are
 * the section's rhythm, and at that scale a reader can find their place in it
 * from across the room.
 *
 * On mobile the track sits on the left edge; on desktop it runs down the
 * gutter between the index column and the copy.
 */
export function ProcessSection() {
  const locale = useLocale();
  const t = copy[locale];
  const processSteps = getProcess(locale);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Start filling as the track enters the lower third, finish before it leaves.
    offset: ["start 78%", "end 55%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });

  return (
    <section id="process" className="band">
      <div className="shell">
        <SectionHeading
          index="05"
          label={t.label}
          lines={t.lines}
          subtitle={t.subtitle}
        />

        <div ref={trackRef} className="relative mt-16 md:mt-24">
          {/* The rail. */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[calc(16.6667%-0.5px)]"
          />

          {/* The line that fills with scroll. */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-ember via-ember to-ink md:left-[calc(16.6667%-0.5px)]"
          />

          <ol className="space-y-16 md:space-y-28">
            {processSteps.map((step, i) => (
              <Step
                key={step.index}
                step={step}
                i={i}
                total={processSteps.length}
                progress={progress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  i,
  total,
  progress,
}: {
  step: ReturnType<typeof getProcess>[number];
  i: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  // Where this phase sits along the rail, 0..1.
  const at = i / (total - 1);
  const ramp = 0.14;

  const active = useTransform(progress, [Math.max(at - ramp, 0), at], [0, 1], {
    clamp: true,
  });

  const dotScale = useTransform(active, [0, 1], [1, 1.7]);
  const textOpacity = useTransform(active, [0, 1], [0.32, 1]);
  // The index goes further than the copy: nearly gone before its turn, fully
  // present after it, so the eye is pulled down the page by the numbers.
  const indexOpacity = useTransform(active, [0, 1], [0.16, 1]);

  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-12 md:gap-x-10">
      {/* Index column (desktop) */}
      <div className="hidden md:col-span-2 md:block">
        <motion.p
          style={{ opacity: indexOpacity }}
          className="t-h2 t-num -mt-2 text-ink"
        >
          {step.index}
        </motion.p>
      </div>

      {/* Node on the rail */}
      <div className="relative flex justify-center pt-[7px] md:col-span-1 md:justify-start md:pt-3">
        <motion.span
          style={{ scale: dotScale }}
          className="relative z-10 block size-[15px] shrink-0 rounded-full border border-line bg-paper md:-ml-[7px]"
        >
          <motion.span
            style={{ opacity: active }}
            className="absolute inset-[3px] rounded-full bg-ember"
          />
        </motion.span>
      </div>

      {/* Copy */}
      <motion.div style={{ opacity: textOpacity }} className="md:col-span-9">
        <p className="t-label t-num md:hidden">{step.index}</p>
        <h3 className="t-h2 mt-1 md:mt-0">{step.title}</h3>
        <p className="t-body mt-4 max-w-[46ch]">{step.body}</p>
      </motion.div>
    </li>
  );
}
