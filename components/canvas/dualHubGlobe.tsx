'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scrollState';

// Approximate lat/long for the two hub clusters
const INDIA = { lat: 20.5, lon: 78.9 }; // Ahmedabad / Mumbai region
const AUSTRALIA = { lat: -33.0, lon: 148.0 }; // Sydney / Melbourne region

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Beacon({ position, color }: { position: THREE.Vector3; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.25;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Great-circle arc between the two hubs, drawn as a raised tube of points */
function TelemetryArc({ from, to, radius }: { from: THREE.Vector3; to: THREE.Vector3; radius: number }) {
  const lineRef = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = new THREE.Vector3().lerpVectors(from, to, t).normalize();
      const lift = Math.sin(t * Math.PI) * 0.55;
      point.multiplyScalar(radius + lift);
      points.push(point);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [from, to, radius]);

  useFrame((state) => {
    const mat = lineRef.current?.material as THREE.LineDashedMaterial | undefined;
    if (mat && 'dashOffset' in mat) {
      (mat as any).dashOffset = -state.clock.elapsedTime * 0.6;
    }
  });

  return (
    // @ts-expect-error - primitive line via geometry
    <line ref={lineRef} geometry={geometry}>
      <lineDashedMaterial color="#00F2FE" dashSize={0.08} gapSize={0.05} transparent opacity={0.85} />
    </line>
  );
}

export default function DualHubGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  const radius = 1.6;
  const indiaPos = useMemo(() => latLonToVector3(INDIA.lat, INDIA.lon, radius), []);
  const australiaPos = useMemo(() => latLonToVector3(AUSTRALIA.lat, AUSTRALIA.lon, radius), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Section-local progress: 0 while off-screen, ramps 0->1 through the section
    const sectionOpacity = THREE.MathUtils.clamp(
      1 - Math.abs(scrollState.global - 0.28) * 5.5,
      0,
      1
    );

    groupRef.current.visible = sectionOpacity > 0.01;
    groupRef.current.scale.setScalar(0.6 + sectionOpacity * 0.5);
    groupRef.current.rotation.y += delta * 0.12;

    const targetX = THREE.MathUtils.lerp(2.2, 0, sectionOpacity);
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.08
    );
  });

  return (
    <group ref={groupRef} position={[2.2, 0, 0]}>
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[radius, 3]} />
        <meshBasicMaterial color="#123044" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.985, 32, 32]} />
        <meshBasicMaterial color="#050810" transparent opacity={0.55} />
      </mesh>

      <Beacon position={indiaPos} color="#00F2FE" />
      <Beacon position={australiaPos} color="#10B981" />
      <TelemetryArc from={indiaPos} to={australiaPos} radius={radius} />
    </group>
  );
}
