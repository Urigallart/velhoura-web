"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useHeroSceneValues } from "./scene-config";

/**
 * The studio's globe: a pearl sphere with the continents drawn as a
 * gradient of dots, turned to face Spain, with a pin on Barcelona.
 *
 * It rests on Spain. Dragging turns it anywhere, and a couple of seconds after
 * the hand lets go it eases back — a globe that always finds its way home,
 * rather than one that spins off into the Pacific and leaves the pin on the
 * far side. The pin is a real 3D object attached to the surface, so it turns
 * with the planet and is hidden behind it; its label and its click target are
 * an HTML button pinned to the same point (drei's `Html`), which is what makes
 * it keyboard- and screen-reader-reachable.
 *
 * Texture credit: "2k_earth_daymap.jpg" — Solar System Scope
 * (solarsystemscope.com/textures), licensed CC BY 4.0.
 */

const EARTH_RADIUS = 1.15;
const ATMOSPHERE_RADIUS = EARTH_RADIUS * 1.055;

/** Barcelona — where the studio is. */
const BARCELONA = { lat: 41.3874, lon: 2.1686 };

/** How far a drag may tip the poles toward the viewer, in radians. */
const MAX_TILT = 0.9;

type Tier = "mobile" | "tablet" | "desktop";

type DragSample = { active: boolean; dx: number; dy: number };

export type StoryGlobeProps = {
  /** The story is being read: the pin stands a little taller. */
  open: boolean;
  /** Chapter being read (-1 before the story starts): the globe travels to it. */
  step: number;
  onPin: () => void;
  /** Text on the chip beside the pin. */
  pinLabel: string;
  /** Accessible name of the pin button. */
  pinAria: string;
  /** `id` of the card the pin controls. */
  controls: string;
};

/** Standard equirectangular placement on three's `SphereGeometry`. */
function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(lon + 180);
  const theta = THREE.MathUtils.degToRad(90 - lat);
  return new THREE.Vector3(
    -radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

const wrapPi = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

/**
 * How the globe turns for each chapter, relative to its rest pose on Spain.
 * It only turns — the camera never comes closer, so the planet is always whole
 * in its frame. One: on Barcelona. Two: turned towards the Atlantic. Three:
 * turned to the far side — the products live online, not in one place. Four:
 * home again.
 */
const JOURNEY = [
  { yaw: 0, pitch: 0, zoom: 1 },
  { yaw: -1.1, pitch: 0.12, zoom: 1 },
  { yaw: 2.5, pitch: -0.22, zoom: 1 },
  { yaw: 0, pitch: 0, zoom: 1 },
];
const REST = JOURNEY[0];

export function StoryGlobe({ open, step, onPin, pinLabel, pinAria, controls }: StoryGlobeProps) {
  const values = useHeroSceneValues();
  const [tier, setTier] = useState<Tier>("desktop");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragSample>({ active: false, dx: 0, dy: 0 });
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const widthMq = window.matchMedia("(max-width: 767px)");
    const tabletMq = window.matchMedia("(max-width: 1023px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setTier(widthMq.matches ? "mobile" : tabletMq.matches ? "tablet" : "desktop");
      setReducedMotion(motionMq.matches);
    };
    sync();
    widthMq.addEventListener("change", sync);
    tabletMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);
    return () => {
      widthMq.removeEventListener("change", sync);
      tabletMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  // A WebGL context that keeps rendering while scrolled past is the most
  // expensive thing on the page and nobody can see it: park it off screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The drag surface lies *under* the canvas, which is click-through, so the
  // pin's button (the one thing that opts back in) stays clickable while the
  // rest of the stage turns the globe. `pan-y` lets a finger still scroll the
  // page vertically; only sideways drags rotate.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.active = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.dx += e.clientX - lastPoint.current.x;
    drag.current.dy += e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };
  const consumeDrag = (): DragSample => {
    const d = drag.current;
    const sample = { active: d.active, dx: d.dx, dy: d.dy };
    d.dx = 0;
    d.dy = 0;
    return sample;
  };

  return (
    <div ref={hostRef} className="absolute inset-0">
      <div
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="absolute inset-[8%] z-0 cursor-grab touch-pan-y rounded-full active:cursor-grabbing"
      />

      <Canvas
        dpr={tier === "mobile" ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        // Close enough that the planet fills about two thirds of the stage.
        camera={{ position: [0, 0, 6.3], fov: 32 }}
        frameloop={onScreen ? "always" : "demand"}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
      >
        <Lighting fullEnvironment={tier !== "mobile"} />
        <Globe
          values={values}
          open={open}
          step={step}
          onPin={onPin}
          pinLabel={pinLabel}
          pinAria={pinAria}
          controls={controls}
          consumeDrag={consumeDrag}
          detail={tier === "desktop" ? "high" : "low"}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}

function Globe({
  values,
  open,
  step,
  onPin,
  pinLabel,
  pinAria,
  controls,
  consumeDrag,
  detail,
  reducedMotion,
}: {
  values: ReturnType<typeof useHeroSceneValues>;
  open: boolean;
  step: number;
  onPin: () => void;
  pinLabel: string;
  pinAria: string;
  controls: string;
  consumeDrag: () => DragSample;
  detail: "high" | "low";
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const earth = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Mesh>(null);
  const atmosphere = useRef<THREE.ShaderMaterial>(null);
  // Offsets from the resting pose (turned to Spain), and how long the hand
  // has been away.
  const offset = useRef({ yaw: 0, pitch: 0, idle: 0 });
  // The chapter's pose, eased towards its target every frame.
  const travel = useRef({ yaw: 0, pitch: 0, zoom: 1 });

  const segments = detail === "high" ? 72 : 32;
  const earthGeometry = useMemo(
    () => new THREE.SphereGeometry(EARTH_RADIUS, segments, segments),
    [segments],
  );
  const atmosphereGeometry = useMemo(
    () => new THREE.SphereGeometry(ATMOSPHERE_RADIUS, segments, segments),
    [segments],
  );

  // Where the pin sits, and the yaw/pitch that brings it to face the camera
  // with north still up.
  const pin = useMemo(() => {
    const v = latLonToVector(BARCELONA.lat, BARCELONA.lon, EARTH_RADIUS);
    const dir = v.clone().normalize();
    return {
      position: v,
      yaw: Math.atan2(-v.x, v.z),
      pitch: Math.atan2(v.y, Math.hypot(v.x, v.z)),
      // Stem and ring are modelled along +Y; this stands them on the surface.
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir),
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // Entrance: the planet settles in over a little more than a second.
    const born = Math.min(1, t / 1.3);
    const eased = 1 - Math.pow(1 - born, 3);
    g.scale.setScalar(0.88 + 0.12 * eased);
    if (earth.current) {
      (earth.current.material as THREE.MeshStandardMaterial).opacity = eased;
    }
    if (atmosphere.current) {
      atmosphere.current.uniforms.opacity.value = values.atmosphereOpacity * eased;
    }

    // Turning: a drag moves the offsets; left alone, they ease back to zero.
    const o = offset.current;
    const sample = consumeDrag();
    if (sample.dx !== 0 || sample.dy !== 0) {
      o.yaw += sample.dx * values.dragSensitivity;
      o.pitch = THREE.MathUtils.clamp(o.pitch + sample.dy * values.dragSensitivity, -MAX_TILT, MAX_TILT);
      o.idle = 0;
    } else if (sample.active) {
      o.idle = 0;
    } else {
      o.idle += delta;
      if (o.idle > 2.2) {
        o.yaw = wrapPi(o.yaw);
        const k = 1 - Math.exp(-delta * 1.8);
        o.yaw -= o.yaw * k;
        o.pitch -= o.pitch * k;
      }
    }
    const sway = reducedMotion ? 0 : Math.sin(t * 0.45) * 0.035;

    const goal = step >= 0 ? (JOURNEY[Math.min(step, JOURNEY.length - 1)] ?? REST) : REST;
    const tr = travel.current;
    const kt = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.4);
    tr.yaw += (goal.yaw - tr.yaw) * kt;
    tr.pitch += (goal.pitch - tr.pitch) * kt;
    tr.zoom += (goal.zoom - tr.zoom) * kt;
    state.camera.position.z = 6.3 / tr.zoom;

    g.rotation.set(pin.pitch + o.pitch + tr.pitch, pin.yaw + o.yaw + tr.yaw + sway, 0, "XYZ");

    // The pin: a ring that spreads and fades from its base, a head that rises
    // a little while the story is open.
    if (ring.current) {
      const p = reducedMotion ? 0.35 : (t % 2.4) / 2.4;
      ring.current.scale.setScalar(1 + p * 1.8);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = reducedMotion ? 0.35 : (1 - p) * 0.6;
    }
    if (head.current) {
      const target = open ? 1.3 : 1;
      head.current.scale.setScalar(THREE.MathUtils.lerp(head.current.scale.x, target, 1 - Math.exp(-delta * 8)));
    }
  });

  return (
    <group ref={group}>
      {/* The sphere itself: a soft pearl, so the colour is all in the land. */}
      <mesh ref={earth} geometry={earthGeometry}>
        <meshStandardMaterial
          color="#f3f5fb"
          roughness={0.5}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>

      <DotLand radius={EARTH_RADIUS} />

      {/* Thin Fresnel rim on a slightly larger backside sphere. */}
      <mesh geometry={atmosphereGeometry}>
        <shaderMaterial
          ref={atmosphere}
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

      {/* The pin. */}
      <group position={pin.position} quaternion={pin.quaternion}>
        <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
          <ringGeometry args={[0.05, 0.062, 40]} />
          <meshBasicMaterial color="#ff3b30" transparent opacity={0.5} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.2, 12]} />
          <meshStandardMaterial color="#f4f4f2" roughness={0.5} />
        </mesh>
        <mesh ref={head} position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.052, 24, 24]} />
          <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={0.55} roughness={0.35} />
        </mesh>

        <Html position={[0, 0.22, 0]} center occlude={[earth as React.RefObject<THREE.Object3D>]} zIndexRange={[30, 0]}>
          <button
            type="button"
            onClick={onPin}
            aria-expanded={open}
            aria-controls={controls}
            aria-label={pinAria}
            className="pointer-events-auto relative block size-12 cursor-pointer rounded-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff3b30]"
          >
            <span className="absolute bottom-full left-1/2 mb-0.5 -translate-x-1/2 whitespace-nowrap rounded-full sm:bottom-auto sm:left-full sm:top-1/2 sm:mb-0 sm:ml-1 sm:-translate-y-1/2 sm:translate-x-0 bg-[#08090a] px-3 py-1.5 text-[12px] font-medium tracking-[0.01em] text-white shadow-[0_8px_24px_-10px_rgba(8,9,10,0.6)]">
              {pinLabel}
            </span>
          </button>
        </Html>
      </group>
    </group>
  );
}

/**
 * Land as dots. The daymap is read once, in a canvas, only to learn which
 * points of the sphere are land; every dot is then drawn as one instance, so
 * the whole planet is two draw calls. Land takes a blue → violet → pink
 * gradient across the surface; the sea is a faint grid of pale dots.
 */
function DotLand({ radius }: { radius: number }) {
  const [points, setPoints] = useState<{ land: Float32Array; sea: Float32Array } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = "/textures/earth-land-1k.webp";
    img.onload = () => {
      if (cancelled) return;
      const W = 1024;
      const H = 512;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, W, H);
      const px = ctx.getImageData(0, 0, W, H).data;

      const isLand = (lat: number, lon: number) => {
        const x = Math.min(W - 1, Math.max(0, Math.floor(((lon + 180) / 360) * W)));
        const y = Math.min(H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * H)));
        const i = (y * W + x) * 4;
        const r = px[i];
        const g = px[i + 1];
        const b = px[i + 2];
        // Ocean is blue and fairly dark; everything else (green, sand, ice) is land.
        return !(b > r + 12 && b >= g - 6 && r < 150);
      };

      const land: number[] = [];
      const sea: number[] = [];
      const rows = 110;
      for (let r = 0; r <= rows; r++) {
        const lat = -90 + (180 * r) / rows;
        const n = Math.max(1, Math.round(rows * 2 * Math.cos(THREE.MathUtils.degToRad(lat))));
        for (let k = 0; k < n; k++) {
          const lon = -180 + (360 * (k + (r % 2) * 0.5)) / n;
          const v = latLonToVector(lat, lon, radius * 1.004);
          (isLand(lat, lon) ? land : sea).push(v.x, v.y, v.z);
        }
      }
      setPoints({ land: new Float32Array(land), sea: new Float32Array(sea) });
    };
    return () => {
      cancelled = true;
    };
  }, [radius]);

  const landMesh = useRef<THREE.InstancedMesh>(null);
  const seaMesh = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!points) return;
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3();
    const stops = [new THREE.Color("#2f8cff"), new THREE.Color("#8b5cf6"), new THREE.Color("#ff5fa2")];
    const tmp = new THREE.Color();

    const fill = (mesh: THREE.InstancedMesh | null, arr: Float32Array, colour: boolean) => {
      if (!mesh) return;
      const count = arr.length / 3;
      for (let i = 0; i < count; i++) {
        const x = arr[i * 3];
        const y = arr[i * 3 + 1];
        const z = arr[i * 3 + 2];
        up.set(x, y, z).normalize();
        dummy.position.set(x, y, z);
        dummy.lookAt(up.x * 4, up.y * 4, up.z * 4);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        if (colour) {
          // A diagonal sweep across the surface: blue, then violet, then pink.
          const t = THREE.MathUtils.clamp((up.x * 0.8 - up.y * 0.6 + 1) / 2, 0, 1);
          if (t < 0.5) tmp.copy(stops[0]).lerp(stops[1], t * 2);
          else tmp.copy(stops[1]).lerp(stops[2], (t - 0.5) * 2);
          mesh.setColorAt(i, tmp);
        }
      }
      mesh.count = count;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };

    fill(landMesh.current, points.land, true);
    fill(seaMesh.current, points.sea, false);
  }, [points]);

  const max = (a?: Float32Array) => Math.max(1, (a?.length ?? 0) / 3);

  return (
    <>
      <instancedMesh key={`land-${max(points?.land)}`} ref={landMesh} args={[undefined, undefined, max(points?.land)]}>
        <circleGeometry args={[0.0105, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh key={`sea-${max(points?.sea)}`} ref={seaMesh} args={[undefined, undefined, max(points?.sea)]}>
        <circleGeometry args={[0.0055, 8]} />
        <meshBasicMaterial color="#d7def0" toneMapped={false} />
      </instancedMesh>
    </>
  );
}

/**
 * Studio lighting: a white key from the upper right and a cool blue bounce
 * from the lower left, with procedural reflections (no HDR file to fetch).
 * The reflections are skipped on phones: baking them costs a six-face render
 * pass, the most GPU-expensive thing in the scene.
 */
function Lighting({ fullEnvironment }: { fullEnvironment: boolean }) {
  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[3.5, 4, 3]} intensity={2.6} color="#ffffff" />
      <pointLight position={[-3, -1.5, 2]} intensity={1.4} color="#c9b8ff" distance={11} decay={2} />
      {fullEnvironment && (
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2} position={[3, 2, 4]} scale={[3, 3, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.1} position={[-3, -1, 3]} scale={[2, 4, 1]} color="#cfe4ff" />
          <Lightformer form="ring" intensity={0.9} position={[0, 3, -3]} scale={5} color="#ffffff" />
        </Environment>
      )}
    </>
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
    vec3 glow = mix(vec3(0.42, 0.72, 1.0), vec3(0.93, 0.5, 0.95), clamp(vNormal.x * 0.5 + 0.5, 0.0, 1.0));
    gl_FragColor = vec4(glow, clamp(rim, 0.0, 1.0) * opacity);
  }
`;
