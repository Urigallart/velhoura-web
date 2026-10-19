"use client";

import dynamic from "next/dynamic";
import type { StoryGlobeProps } from "./StoryGlobe";

/**
 * Client boundary for the globe. `ssr: false` is only allowed in a Client
 * Component, and keeps the three.js chunk (several hundred KB) out of the
 * server-rendered payload: it loads in its own chunk after hydration, and
 * until then a soft disc holds the place so the stage is never empty.
 */
const StoryGlobe = dynamic(() => import("./StoryGlobe").then((m) => m.StoryGlobe), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-[18%] rounded-full bg-paper-sunk"
    />
  ),
});

export function StoryGlobeLoader(props: StoryGlobeProps) {
  return <StoryGlobe {...props} />;
}
