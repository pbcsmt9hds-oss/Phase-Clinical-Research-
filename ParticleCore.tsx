'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scrollState';

const PARTICLE_COUNT = 2600;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPointerInfluence;
  uniform vec2 uPointer;
  uniform float uOpacity;

  attribute float aRandom;
  attribute vec3 aBasePosition;

  varying float vAlpha;
  varying float vRandom;

  void main() {
    vRandom = aRandom;

    vec3 pos = aBasePosition;

    // Predictive-pulse drift: each particle orbits its base position
    float drift = sin(uTime * 0.6 + aRandom * 40.0) * 0.12;
    pos += normalize(pos + 0.001) * drift;

    // Cursor raycast influence: particles nearest the pointer swell outward
    vec2 toPointer = pos.xy - uPointer * 3.0;
    float distToPointer = length(toPointer);
    float influence = smoothstep(1.6, 0.0, distToPointer) * uPointerInfluence;
    pos += normalize(vec3(toPointer, 0.4)) * influence * 0.6;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (2.2 + influence * 3.0 + aRandom * 1.6) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = uOpacity * (0.5 + 0.5 * aRandom);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    vec3 cyan = vec3(0.0, 0.949, 0.996);
    vec3 emerald = vec3(0.063, 0.725, 0.506);
    vec3 color = mix(emerald, cyan, vRandom);

    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(color, glow * vAlpha);
  }
`;

/**
 * Builds a molecular-receptor-like distribution: several nested shells of
 * points around a common center, so the cloud reads as a structured
 * receptor rather than pure noise.
 */
function buildReceptorGeometry(count: number) {
  const basePositions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);

  const shellCount = 5;
  for (let i = 0; i < count; i++) {
    const shell = i % shellCount;
    const radius = 1.1 + shell * 0.42;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;
    randoms[i] = Math.random();
  }

  return { basePositions, randoms };
}

export default function ParticleCore() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { basePositions, randoms } = useMemo(
    () => buildReceptorGeometry(PARTICLE_COUNT),
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointerInfluence: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: 1 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return;

    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uPointer.value.set(
      scrollState.pointer.x,
      scrollState.pointer.y
    );

    // Fade + shrink the core out of view once the user scrolls past hero
    const heroVisible = THREE.MathUtils.clamp(1 - scrollState.global * 3.2, 0, 1);
    materialRef.current.uniforms.uOpacity.value = heroVisible;

    const targetInfluence = heroVisible > 0.1 ? 1 : 0;
    materialRef.current.uniforms.uPointerInfluence.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uPointerInfluence.value,
      targetInfluence,
      0.05
    );

    pointsRef.current.rotation.y += delta * 0.06;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;

    const s = 1 + heroVisible * 0.0;
    pointsRef.current.scale.setScalar(0.85 + heroVisible * 0.15);
    pointsRef.current.visible = heroVisible > 0.005;
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={basePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aBasePosition"
          count={PARTICLE_COUNT}
          array={basePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={PARTICLE_COUNT}
          array={randoms}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
