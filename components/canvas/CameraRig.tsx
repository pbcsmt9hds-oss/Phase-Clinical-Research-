'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scrollState';

// Camera waypoints keyed by global scroll progress (0 -> 1).
// Each section owns a slice of the timeline; camera lerps smoothly between them.
const WAYPOINTS: { t: number; pos: [number, number, number]; look: [number, number, number] }[] = [
  { t: 0.0, pos: [0, 0, 4.2], look: [0, 0, 0] }, // Hero: centered on particle core
  { t: 0.28, pos: [1.1, 0.3, 5.4], look: [1.3, 0, 0] }, // Dual-hub globe reveal
  { t: 0.42, pos: [0, 0.2, 6.5], look: [0, 0, 0] }, // Therapeutic cards (camera pulls back)
  { t: 0.62, pos: [0.2, 0, 4.6], look: [0, 0, -0.5] }, // RBQM risk lattice
  { t: 0.85, pos: [0, 0, 6.0], look: [0, 0, 0] }, // Founder / contact (wide, calm)
  { t: 1.0, pos: [0, 0, 6.2], look: [0, 0, 0] },
];

function sampleWaypoints(t: number) {
  let i = 0;
  while (i < WAYPOINTS.length - 2 && WAYPOINTS[i + 1].t < t) i++;
  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];
  const span = b.t - a.t || 1;
  const localT = THREE.MathUtils.clamp((t - a.t) / span, 0, 1);
  const eased = localT * localT * (3 - 2 * localT);

  const pos = new THREE.Vector3().fromArray(a.pos).lerp(new THREE.Vector3().fromArray(b.pos), eased);
  const look = new THREE.Vector3().fromArray(a.look).lerp(new THREE.Vector3().fromArray(b.look), eased);
  return { pos, look };
}

export default function CameraRig() {
  const { camera } = useThree();
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const { pos, look } = sampleWaypoints(scrollState.global);

    camera.position.lerp(pos, 0.06);
    currentLook.current.lerp(look, 0.06);
    camera.lookAt(currentLook.current);
  });

  return null;
}
