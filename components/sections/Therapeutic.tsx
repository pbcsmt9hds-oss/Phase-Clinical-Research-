'use client';

import { useRef } from 'react';
import { GlassCard } from '@/components/ui/Primitives';

const areas = [
  {
    name: 'Oncology & Rare Diseases',
    accent: 'from-cyan/20',
    points: [
      'Tight biomarker tracking across complex, adaptive protocols',
      'Protocol deviation control on tightly windowed regimens',
      'Specialized retention strategies for small, hard-to-reach populations',
    ],
  },
  {
    name: 'Immunology & Nephrology',
    accent: 'from-emerald/20',
    points: [
      'Adaptive endpoint management as trial design evolves',
      'Strict biological specimen chain-of-custody handling',
      'Coordination across renal and immune-driven inclusion criteria',
    ],
  },
  {
    name: 'Psychiatry & Dermatology',
    accent: 'from-violet/20',
    points: [
      'Rater consistency on clinical scale-driven endpoints',
      'Decentralized trial compliance for remote-heavy populations',
      'Photographic and scale documentation standards enforced site-wide',
    ],
  },
];

export default function Therapeutic() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="therapeutic" className="relative min-h-screen px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Depth in the indications that punish inexperience.
          </h2>
          <p className="mt-4 text-mist">
            These are the therapeutic areas where a junior monitor's mistakes
            surface months later, in an audit. They&apos;re where Phase spends
            most of its time.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="mt-14 flex gap-6 overflow-x-auto pb-6 [scrollbar-width:thin]"
        >
          {areas.map((area) => (
            <GlassCard
              key={area.name}
              className={`relative min-w-[300px] max-w-[340px] shrink-0 overflow-hidden bg-gradient-to-br ${area.accent} to-transparent md:min-w-[360px]`}
            >
              <h3 className="text-lg font-medium text-white">{area.name}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {area.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
