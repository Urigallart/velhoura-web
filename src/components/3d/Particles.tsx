"use client";

import { useMemo } from "react";
import { Sparkles } from "@react-three/drei";

type ParticlesProps = {
  count: number;
  /** 0 → 1 entrance progress; particles fade in with the centrepiece. */
  intro: number;
};

/**
 * A sparse field of points around the planet.
 *
 * Retuned so the field stays inside the armature's rings instead of spilling
 * across the hero — a cloud that reaches past the instrument reads as fog
 * rather than as depth.
 *
 * Built on drei's `Sparkles` (one instanced draw call) rather than a
 * hand-rolled `InstancedMesh`: it is already the cheap, well-tuned option for
 * exactly this "a few drifting motes" effect.
 */
export function Particles({ count, intro }: ParticlesProps) {
  // Two shells at different radii read as depth rather than as a flat cloud.
  const outerCount = useMemo(() => Math.round(count * 0.65), [count]);
  const innerCount = count - outerCount;

  if (count <= 0) return null;

  return (
    <group>
      <Sparkles
        count={outerCount}
        scale={[2.9, 2.9, 2.6]}
        size={1.5}
        speed={0.22}
        opacity={0.5 * intro}
        color="#a9b3c4"
        noise={1.2}
      />
      <Sparkles
        count={innerCount}
        scale={[1.8, 1.7, 1.7]}
        size={2}
        speed={0.36}
        opacity={0.55 * intro}
        color="#8a9a5b"
        noise={0.8}
      />
    </group>
  );
}
