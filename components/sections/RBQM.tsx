'use client';

import { GlassCard } from '@/components/ui/Primitives';

const rows = [
  { label: 'KRI tracking', value: 'Automated, threshold-based' },
  { label: 'QTL management', value: 'Reviewed at every DSMB cycle' },
  { label: 'Remote monitoring', value: 'Continuous, not visit-triggered' },
  { label: 'TMF status', value: 'Audit-ready at all times' },
];

export default function RBQM() {
  return (
    <section id="rbqm" className="relative min-h-screen px-6 py-32">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <div className="order-2 md:order-1" aria-hidden="true" />

        <div className="order-1 flex flex-col gap-8 md:order-2">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Risk resolved before it reaches an inspector.
            </h2>
            <p className="mt-4 max-w-md text-mist">
              Centralized monitoring surfaces site anomalies while they&apos;re
              still small — key risk indicators and quality tolerance limits
              are watched continuously, not rediscovered during a visit.
            </p>
          </div>

          <GlassCard>
            <dl className="flex flex-col divide-y divide-mist/10">
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <dt className="text-sm text-mist">{row.label}</dt>
                  <dd className="data-readout text-sm text-cyan">{row.value}</dd>
                </div>
              ))}
            </dl>
          </GlassCard>

          <p className="text-sm text-mist">
            Audit &amp; inspection defense: ICH-GCP compliant systems, with
            trial master files kept audit-ready throughout — not assembled
            after the notice arrives.
          </p>
        </div>
      </div>
    </section>
  );
}
