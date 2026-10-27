"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { StoryGlobeProps } from "./StoryGlobe";

/**
 * Client boundary for the globe. `ssr: false` is only allowed in a Client
 * Component, and keeps the three.js chunk (several hundred KB) out of the
 * server-rendered payload.
 *
 * It also stays out of the first load: the globe sits far below the fold, so
 * its chunk, its land map and the work of starting WebGL are only paid for
 * once the visitor is within a screen or two of it. Until then — and while
 * the chunk arrives — a soft disc holds the place so the stage is never empty.
 */
const StoryGlobe = dynamic(() => import("./StoryGlobe").then((m) => m.StoryGlobe), { ssr: false });

const Placeholder = () => (
  <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-paper-sunk" />
);

export function StoryGlobeLoader(props: StoryGlobeProps) {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "1400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0">
      {near ? <StoryGlobe {...props} /> : <Placeholder />}
    </div>
  );
}
