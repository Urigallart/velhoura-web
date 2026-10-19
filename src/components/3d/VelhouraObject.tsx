"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneValues } from "./scene-config";

/** One frame's worth of drag input, already consumed (`dx`/`dy` are the
 *  delta since the last call, not a running total). */
export type DragSample = {
  active: boolean;
  dx: number;
  dy: number;
};

type VelhouraObjectProps = {
  values: HeroSceneValues;
  /** 0 → 1 entrance progress, eased, driven by the parent's clock. */
  intro: number;
  /**
   * Pulls and resets the accumulated drag delta for this frame. A function
   * rather than the raw ref: the ref that backs it is created and owned by
   * `VelhouraScene`, and this project's lint rules (react-hooks/immutability)
   * forbid mutating a ref's contents from outside the component that
   * constructed it — so the reset happens inside that function, in the
   * owning component, and this component only ever reads its return value.
   */
  consumeDrag: () => DragSample;
  /** Fewer sphere segments on constrained devices. */
  detail: "high" | "low";
};

const EARTH_RADIUS = 1.15;
const ATMOSPHERE_RADIUS = EARTH_RADIUS * 1.055;

/** Clamp how far the planet can be tipped forward/back while dragging, so it
 *  never flips pole-over-pole — a real globe's handling, not a video-game
 *  free camera. */
const MAX_TILT = 1.15;

/**
 * Velhoura's hero centerpiece: a realistic, textured Earth with a thin
 * Fresnel atmosphere glow — a small, elegant technology/scale motif rather
 * than a literal product render.
 *
 * `Float` (drei) supplies the organic idle drift. On top of that, the planet
 * spins continuously and slowly on its own; dragging (mouse or touch, via the
 * hotspot in `VelhouraScene`) pauses that auto-spin and turns the globe
 * directly instead, resuming from wherever it was released.
 */
export function VelhouraObject({
  values,
  intro,
  consumeDrag,
  detail,
}: VelhouraObjectProps) {
  const outer = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereMaterial = useRef<THREE.ShaderMaterial>(null);

  // Texture credit: "2k_earth_daymap.jpg" — Solar System Scope
  // (solarsystemscope.com/textures), licensed CC BY 4.0.
  //
  // Loaded via a plain THREE.TextureLoader rather than drei's `useTexture`:
  // colorSpace/anisotropy need to be set on the texture right after creating
  // it (the standard three.js pattern — TextureLoader.load() returns
  // immediately and fills in pixel data asynchronously, applying whatever
  // metadata is already set once it does), and that texture is a value this
  // component owns outright, never a value handed back by a hook.
  const dayMap = useMemo(() => {
    const texture = new THREE.TextureLoader().load(
      "/textures/earth-daymap-2k.jpg",
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);

  const segments = detail === "high" ? 64 : 28;

  const earthGeometry = useMemo(
    () => new THREE.SphereGeometry(EARTH_RADIUS, segments, segments),
    [segments],
  );

  const atmosphereGeometry = useMemo(
    () => new THREE.SphereGeometry(ATMOSPHERE_RADIUS, segments, segments),
    [segments],
  );

  useFrame((_, delta) => {
    const group = outer.current;
    if (!group) return;

    // Entrance: scale/opacity driven by the eased progress from the parent.
    const s = intro;
    group.scale.setScalar(0.72 + s * 0.28);

    const earth = earthRef.current;
    if (earth) {
      const sample = consumeDrag();

      if (sample.dx !== 0 || sample.dy !== 0) {
        // A drag in flight: turn the globe directly by the pixel delta
        // since the last frame. Auto-spin is skipped this frame — the drag
        // is what's driving the rotation.
        earth.rotation.y += sample.dx * values.dragSensitivity;
        earth.rotation.x = THREE.MathUtils.clamp(
          earth.rotation.x + sample.dy * values.dragSensitivity,
          -MAX_TILT,
          MAX_TILT,
        );
      } else if (!sample.active) {
        // Nothing to consume and no pointer currently down: resume the
        // planet's own slow spin from wherever it was left.
        earth.rotation.y += values.rotationSpeed * delta;
      }

      const mat = earth.material as THREE.MeshStandardMaterial;
      mat.opacity = s;
    }

    if (atmosphereMaterial.current) {
      atmosphereMaterial.current.uniforms.opacity.value =
        values.atmosphereOpacity * s;
    }
  });

  return (
    <group ref={outer} scale={0.72}>
      <Float
        speed={values.floatSpeed}
        floatIntensity={values.floatIntensity}
        rotationIntensity={0.12}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Earth */}
        <mesh ref={earthRef} geometry={earthGeometry} castShadow={false} receiveShadow={false}>
          <meshStandardMaterial
            map={dayMap}
            roughness={values.earthRoughness}
            metalness={0}
            transparent
            opacity={intro}
          />
        </mesh>

        {/* Atmosphere — a thin Fresnel rim glow on a slightly larger
            backside sphere. Cheap: one extra draw call, no extra texture. */}
        <mesh geometry={atmosphereGeometry}>
          <shaderMaterial
            ref={atmosphereMaterial}
            args={[
              {
                uniforms: { opacity: { value: 0 } },
                vertexShader: ATMOSPHERE_VERTEX,
                fragmentShader: ATMOSPHERE_FRAGMENT,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
              },
            ]}
          />
        </mesh>
      </Float>
    </group>
  );
}

const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT = /* glsl */ `
  varying vec3 vNormal;
  uniform float opacity;
  void main() {
    float rim = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
    vec3 glow = vec3(0.31, 0.56, 1.0);
    gl_FragColor = vec4(glow, clamp(rim, 0.0, 1.0) * opacity);
  }
`;
