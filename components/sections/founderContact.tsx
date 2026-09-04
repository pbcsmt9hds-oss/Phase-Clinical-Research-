'use client';

import { FormEvent, useState } from 'react';
import { GlassCard } from '@/components/ui/Primitives';
import { Button } from '@/components/ui/Button';

const stats = [
  { value: '15+', label: 'Combined years operational experience' },
  { value: '4', label: 'Regulatory frameworks navigated (FDA, EMA, TGA, CDSCO)' },
  { value: '0', label: 'Critical audit findings on senior-led trials' },
];

export default function FounderContact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative min-h-screen px-6 py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="data-readout text-4xl font-semibold text-white sm:text-5xl">
                {stat.value}
              </span>
              <span className="max-w-[220px] text-sm text-mist">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Talk to the people running your trial.
            </h2>
            <p className="max-w-md text-mist">
              For sponsors and emerging biotechs evaluating operational
              partners — reach the founders directly, not a business
              development layer.
            </p>
          </div>

          <GlassCard>
            {submitted ? (
              <div className="flex flex-col items-start gap-2 py-6">
                <span className="data-readout text-sm text-emerald">Message sent</span>
                <p className="text-sm text-mist">
                  A founder will respond directly within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs text-fog">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="rounded-lg border border-mist/15 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-fog focus:border-cyan/60"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="org" className="text-xs text-fog">
                    Organization
                  </label>
                  <input
                    id="org"
                    name="org"
                    type="text"
                    required
                    className="rounded-lg border border-mist/15 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-fog focus:border-cyan/60"
                    placeholder="Sponsor or biotech name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs text-fog">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-lg border border-mist/15 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-fog focus:border-cyan/60"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-fog">
                    Trial or program details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="resize-none rounded-lg border border-mist/15 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-fog focus:border-cyan/60"
                    placeholder="Phase, indication, and current operational gap"
                  />
                </div>
                <Button type="submit" variant="glow" className="mt-2 w-full">
                  Send message
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
