'use client';

import { GlassCard } from '@/components/ui/Primitives';

const capabilities = [
  {
    title: 'Follow-the-sun oversight',
    body: 'Continuous site monitoring and real-time query resolution as coverage hands off between the India and Australia hubs — no overnight gaps in escalation.',
  },
  {
    title: 'Cross-border regulatory fluency',
    body: 'Working knowledge of FDA, EMA, TGA, and CDSCO guidance, applied consistently across every site in a multinational protocol.',
  },
  {
    title: 'Zero handover',
    body: 'Protocols are executed and monitored directly by senior CRAs — the people who scoped the trial are the people running it.',
  },
];

export default function DualHub() {
  return (
    <section id="dual-hub" className="relative min-h-screen px-6 py-32">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              One team, two hubs, no time zone left uncovered.
            </h2>
            <p className="mt-4 max-w-md text-mist">
              Phase Clinical Research is stationed across India and Australia —
              a structural choice, not a marketing line. It puts senior
              oversight within reach of every APAC site, at any hour.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {capabilities.map((cap) => (
              <GlassCard key={cap.title} className="text-left">
                <h3 className="text-base font-medium text-white">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{cap.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right column intentionally left clear — the fixed 3D globe reads through here */}
        <div className="hidden md:block" aria-hidden="true" />
      </div>
    </section>
  );
}
