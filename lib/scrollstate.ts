/**
 * A single mutable object updated by GSAP ScrollTrigger on the main thread
 * and read every frame inside the R3F render loop via useFrame.
 *
 * Avoiding React state here is deliberate: scroll progress changes every
 * frame during a scrub, and pushing that through React re-renders would
 * be wasteful. The Canvas reads this object directly instead.
 */
export const scrollState = {
  /** 0 -> 1 across the entire page */
  global: 0,
  /** per-section progress, each 0 -> 1 while that section is in view */
  hero: 0,
  dualHub: 0,
  therapeutic: 0,
  rbqm: 0,
  contact: 0,
  /** normalized pointer position, -1 -> 1, updated on pointer move */
  pointer: { x: 0, y: 0 },
};
