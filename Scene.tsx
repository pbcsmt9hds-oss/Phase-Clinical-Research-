'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import CameraRig from './CameraRig';
import ParticleCore from './ParticleCore';
import DualHubGlobe from './DualHubGlobe';
import RiskLattice from './RiskLattice';
import { scrollState } from '@/lib/scrollState';

function PointerTracker() {
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);
  return null;
}

export default function Scene() {
  return (
    <div className="webgl-fixed" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 4.2] }}
      >
        <color attach="background" args={['#070A0F']} />
        <fog attach="fog" args={['#070A0F', 6, 14]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#00F2FE" />

        <Suspense fallback={null}>
          <ParticleCore />
          <DualHubGlobe />
          <RiskLattice />
          <CameraRig />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.65}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2} />
          <Vignette eskil={false} offset={0.15} darkness={0.65} />
        </EffectComposer>
      </Canvas>
      <PointerTracker />
    </div>
  );
}
