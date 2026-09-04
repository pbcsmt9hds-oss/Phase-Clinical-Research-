'use client';

import { motion } from 'framer-motion';
import { StatusPill } from '@/components/ui/Primitives';
import { Button } from '@/components/ui/Button';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex max-w-3xl flex-col items-center gap-7"
      >
        <motion.div variants={item}>
          <StatusPill>Dual-Hub Clinical Operations • APAC &amp; Global</StatusPill>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Agile operations.
          <br />
          Global rigor.
        </motion.h1>

        <motion.p variants={item} className="max-w-xl text-balance text-lg leading-relaxed text-mist">
          Founded by senior clinical research specialists delivering Tier-1 MNC
          quality standards, centralized monitoring, and inspection-ready
          execution — without the corporate bloat.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button variant="glow">Initiate Trial Consultation</Button>
          <Button variant="ghost">Explore Operational Model</Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-fog"
      >
        <span className="data-readout text-[11px]">scroll to explore</span>
        <span className="h-8 w-px bg-gradient-to-b from-fog to-transparent" />
      </motion.div>
    </section>
  );
}
