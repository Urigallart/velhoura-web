/**
 * Tunable numbers for the hero's 3D scene.
 *
 * REPLACES the previous Theatre.js control surface. That file shipped
 * `@theatre/core` to every visitor — a full animation-sequencing runtime,
 * a project, a sheet and a reactive subscription — in order to hold nine
 * static numbers that nothing ever changed at runtime. It also needed an
 * empty `theatre-state.json` committed purely to stop the library throwing
 * in production one second after load.
 *
 * The scene renders identically from this object, minus the dependency.
 * If the visual Studio panel is ever genuinely wanted for scrubbing these
 * values live, reinstate it here behind the same `useHeroSceneValues()`
 * signature — nothing else in the scene reads these numbers directly.
 *
 * Ranges are the sane bounds for each value, kept as documentation now that
 * a slider is no longer enforcing them.
 */

export type HeroSceneValues = {
  /** Entrance, in seconds. */
  introDuration: number;
  introDelay: number;

  /** Idle motion. A planet's axial spin, not an abstract object's tumble. */
  floatSpeed: number;
  floatIntensity: number;
  /** Radians per second of continuous spin. */
  rotationSpeed: number;

  /** Radians of rotation per pixel of pointer movement while dragging. */
  dragSensitivity: number;

  /** Material and composition. */
  atmosphereOpacity: number;
  earthRoughness: number;

  /** Points drifting around the planet, at full desktop budget. */
  particleCount: number;
};

export const heroScene: HeroSceneValues = {
  introDuration: 1.4, // 0.6 – 3
  introDelay: 0.15, // 0 – 1.5

  floatSpeed: 0.7, // 0 – 3
  floatIntensity: 0.28, // 0 – 2
  rotationSpeed: 0.07, // 0 – 0.3

  dragSensitivity: 0.008, // 0.001 – 0.02

  atmosphereOpacity: 0.9, // 0.2 – 1
  earthRoughness: 0.82, // 0.4 – 1

  particleCount: 64, // 0 – 220
};

/** Kept as a hook so the call site is unchanged if a live editor ever
 *  returns here. */
export function useHeroSceneValues(): HeroSceneValues {
  return heroScene;
}
