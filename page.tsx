import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollDriver from '@/components/ScrollDriver';
import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import DualHub from '@/components/sections/DualHub';
import Therapeutic from '@/components/sections/Therapeutic';
import RBQM from '@/components/sections/RBQM';
import FounderContact from '@/components/sections/FounderContact';
import Footer from '@/components/sections/Footer';

// The Canvas touches window/WebGL — load client-side only
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <Scene />
      <ScrollDriver />

      <Nav />

      <main className="content-layer">
        <Hero />
        <DualHub />
        <Therapeutic />
        <RBQM />
        <FounderContact />
      </main>

      <div className="content-layer">
        <Footer />
      </div>
    </SmoothScroll>
  );
}
