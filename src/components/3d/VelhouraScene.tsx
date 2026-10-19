"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { VelhouraObject } from "./VelhouraObject";
import type { DragSample } from "./VelhouraObject";
import { Particles } from "./Particles";
import { useHeroSceneValues } from "./scene-config";

type Tier = "mobile" | "tablet" | "desktop";

/**
 * The Hero's 3D layer.
 *
 * Mounted only on the client (see `HeroSceneLoader`) and — this is the change
 * that matters — confined to the hero's square *stage*, concentric with the
 * SVG armature drawn around it (`visual/Armature.tsx`). Previously the canvas
 * spanned the whole hero and the globe was pushed right with a camera offset,
 * which put it behind the headline and forced a large blurred scrim to keep
 * the text legible. With the globe boxed into its own column, that scrim is
 * gone: the layout does the work instead of a blur.
 *
 * This component owns the Canvas, lighting, responsive tuning, the entrance
 * timing, the drag-to-rotate hotspot, and pausing the render loop whenever the
 * hero is off screen.
 */
export function VelhouraScene() {
  const values = useHeroSceneValues();
  const [tier, setTier] = useState<Tier>("desktop");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragSample>({ active: false, dx: 0, dy: 0 });
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const widthMq = window.matchMedia("(max-width: 767px)");
    const tabletMq = window.matchMedia("(max-width: 1023px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia("(pointer: fine)");

    const sync = () => {
      setTier(
        widthMq.matches ? "mobile" : tabletMq.matches ? "tablet" : "desktop",
      );
      setReducedMotion(motionMq.matches);
      setFinePointer(pointerMq.matches);
    };
    sync();

    widthMq.addEventListener("change", sync);
    tabletMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);
    pointerMq.addEventListener("change", sync);

    return () => {
      widthMq.removeEventListener("change", sync);
      tabletMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
      pointerMq.removeEventListener("change", sync);
    };
  }, []);

  /**
   * A WebGL context that keeps rendering while scrolled past is the most
   * expensive thing on this page and nobody can see it. The loop is parked
   * the moment the stage leaves the viewport and restarts on the way back —
   * on a laptop that is the difference between a warm fan and a quiet one.
   */
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "160px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const particleCount = useMemo(() => {
    if (reducedMotion) return 0;
    const base = values.particleCount;
    if (tier === "mobile") return Math.round(base * 0.4);
    if (tier === "tablet") return Math.round(base * 0.7);
    return base;
  }, [values.particleCount, tier, reducedMotion]);

  const dpr: [number, number] = tier === "mobile" ? [1, 1.5] : [1, 2];
  const detail = tier === "desktop" ? "high" : "low";

  // Drag handlers live on a plain DOM overlay rather than R3F's own pointer
  // events on the Earth mesh: the Canvas stays `pointer-events: none` (a CSS
  // mask hides paint, not hit-testing), and this overlay — exactly the stage
  // box, nothing more — is the one region that opts back in.
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

  // Reads and resets `drag.current` in one step. Defined here, where the ref
  // was constructed: this project's lint rules forbid mutating a ref's
  // contents from a component that only received it as a prop.
  const consumeDrag = (): DragSample => {
    const d = drag.current;
    const sample: DragSample = { active: d.active, dx: d.dx, dy: d.dy };
    d.dx = 0;
    d.dy = 0;
    return sample;
  };

  return (
    <div ref={hostRef} className="absolute inset-0">
      {/*
        Fine-pointer only. On a touch device `touch-action: none` (needed so a
        drag isn't also read as a page scroll) would swallow scrolls that
        begin anywhere inside this box. Drag-to-rotate is a cursor nicety;
        losing it on touch costs nothing, keeping the page scrollable there
        does not.
      */}
      {finePointer && (
        <div
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="absolute inset-[14%] z-20 cursor-grab touch-none rounded-full active:cursor-grabbing"
        />
      )}

      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        // Centred in the stage and pulled back far enough that the planet sits
        // comfortably inside the armature's inner rule rather than crowding it.
        camera={{ position: [0, 0, 10], fov: 32 }}
        frameloop={reducedMotion || !onScreen ? "demand" : "always"}
        // Overrides Canvas's own default inline style (position: relative,
        // pointerEvents: auto) rather than fighting it with `!important`.
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <Lighting fullEnvironment={tier !== "mobile"} />

        <SceneContent
          values={values}
          consumeDrag={consumeDrag}
          detail={detail}
          reducedMotion={reducedMotion}
          particleCount={particleCount}
        />
      </Canvas>
    </div>
  );
}

/**
 * Studio lighting: a white key from upper right and a khaki-green bounce from
 * lower left. The intensities are higher than they look because the camera now
 * sits further back to frame the planet inside the armature — same rig, longer
 * throw.
 */
function Lighting({ fullEnvironment }: { fullEnvironment: boolean }) {
  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[3.5, 4, 3]} intensity={2.6} color="#ffffff" />
      <pointLight
        position={[-3, -1.5, 2]}
        intensity={2}
        color="#9bab6a"
        distance={11}
        decay={2}
      />

      {/*
        Procedural studio reflections for the physical materials — no HDR file
        fetched, so this never blocks the initial paint. Skipped on mobile:
        baking it costs a six-face cube-camera render pass, the single most
        GPU-expensive thing this scene does, and the direct lights above are
        enough for the materials to read correctly without it.
      */}
      {fullEnvironment && (
        <Environment resolution={128}>
          <Lightformer
            form="rect"
            intensity={2}
            position={[3, 2, 4]}
            scale={[3, 3, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.1}
            position={[-3, -1, 3]}
            scale={[2, 4, 1]}
            color="#c5cfa0"
          />
          <Lightformer
            form="ring"
            intensity={0.9}
            position={[0, 3, -3]}
            scale={5}
            color="#ffffff"
          />
        </Environment>
      )}
    </>
  );
}

function SceneContent({
  values,
  consumeDrag,
  detail,
  reducedMotion,
  particleCount,
}: {
  values: ReturnType<typeof useHeroSceneValues>;
  consumeDrag: () => DragSample;
  detail: "high" | "low";
  reducedMotion: boolean;
  particleCount: number;
}) {
  const [intro, setIntro] = useState(reducedMotion ? 1 : 0);
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    if (intro >= 1) return;

    if (start.current === null) start.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - start.current - values.introDelay;
    const t = Math.min(Math.max(elapsed / values.introDuration, 0), 1);

    // easeOutCubic — a fast start that settles gently, no overshoot.
    setIntro(1 - Math.pow(1 - t, 3));
  });

  return (
    <>
      <VelhouraObject
        values={values}
        intro={intro}
        consumeDrag={consumeDrag}
        detail={detail}
      />
      <Particles count={particleCount} intro={intro} />
    </>
  );
}
