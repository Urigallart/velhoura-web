"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary for the Hero's 3D layer.
 *
 * `next/dynamic`'s `ssr: false` is only permitted inside a Client Component,
 * hence this wrapper. `Hero.tsx` itself stays a Server Component: it renders
 * this as an ordinary child, and only this file's own bundle is client-only.
 *
 * The three.js/R3F chunk (several hundred KB) is therefore never part of the
 * initial server-rendered payload and loads in its own split chunk after
 * hydration — the hero's type and CTAs are already visible and interactive
 * from the CSS entrance before it arrives.
 *
 * The circular mask is what stops the canvas reading as a square: it feathers
 * the WebGL layer into the paper just inside the armature's inner rule, so the
 * planet appears to sit *in* the instrument rather than on top of it.
 */
const VelhouraScene = dynamic(
  () => import("./VelhouraScene").then((m) => m.VelhouraScene),
  { ssr: false, loading: () => null },
);

export function HeroSceneLoader() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 [mask-image:radial-gradient(circle_at_50%_50%,black_42%,transparent_64%)]"
    >
      <VelhouraScene />
    </div>
  );
}
