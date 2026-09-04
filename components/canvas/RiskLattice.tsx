'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scrollState';

const GRID = 12; // 12x12 lattice
const COUNT = GRID * GRID;

export default function RiskLattice() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorAmber = useMemo(() => new THREE.Color('#F5A524'), []);
  const colorCrimson = useMemo(() => new THREE.Color('#F5455C'), []);
  const colorEmerald = useMemo(() => new THREE.Color('#10B981'), []);

  const scattered = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3.2,
          (Math.random() - 0.5) * 2.4
        )
      );
    }
    return arr;
  }, []);

  const aligned = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const spacing = 0.34;
    const offset = ((GRID - 1) * spacing) / 2;
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        arr.push(new THREE.Vector3(x * spacing - offset, y * spacing - offset, 0));
      }
    }
    return arr;
  }, []);

  const riskWeights = useMemo(() => {
    // Each point's "riskiness" — decays with a random seed so alignment
    // reads as risk points resolving into a compliant plane
    return Array.from({ length: COUNT }, () => Math.random());
  }, []);

  useFrame(() => {
    if (!meshRef.current || !groupRef.current) return;

    const sectionOpacity = THREE.MathUtils.clamp(
      1 - Math.abs(scrollState.global - 0.62) * 5.5,
      0,
      1
    );
    groupRef.current.visible = sectionOpacity > 0.01;
    groupRef.current.rotation.y = (1 - sectionOpacity) * 0.4;

    // Local alignment progress driven by the RBQM section's own scroll range
    const alignT = THREE.MathUtils.clamp((scrollState.global - 0.54) / 0.16, 0, 1);
    const eased = alignT * alignT * (3 - 2 * alignT); // smoothstep

    for (let i = 0; i < COUNT; i++) {
      const from = scattered[i];
      const to = aligned[i];
      const jitter = (1 - eased) * 0.15;

      dummy.position.set(
        THREE.MathUtils.lerp(from.x, to.x, eased) + (Math.random() - 0.5) * jitter,
        THREE.MathUtils.lerp(from.y, to.y, eased) + (Math.random() - 0.5) * jitter,
        THREE.MathUtils.lerp(from.z, to.z, eased)
      );

      const scale = 0.05 + eased * 0.03;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const risk = riskWeights[i];
      let color: THREE.Color;
      if (eased > 0.9) {
        color = colorEmerald;
      } else if (risk > 0.66) {
        color = colorCrimson;
      } else if (risk > 0.33) {
        color = colorAmber;
      } else {
        color = colorEmerald;
      }
      meshRef.current.setColorAt(i, color.lerp(new THREE.Color('#10B981'), eased * 0.6));
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.5]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
