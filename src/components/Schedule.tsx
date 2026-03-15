'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const phases = [
  { id: 1, name: 'Arrival & Registration', desc: 'DOORS OPEN' },
  { id: 2, name: 'Build Sprint Begins', desc: '24-HOUR CODING, MENTORING & WORKSHOPS' },
  { id: 3, name: 'Final Submission Window', desc: 'CODE FREEZE' },
  { id: 4, name: 'Awards Ceremony', desc: 'GRAND FINALE' },
];

function nodeColor(id: number): string {
  if (id === 4) return 'var(--yellow)';
  if (id === 3) return 'var(--magenta)';
  return 'var(--cyan)';
}

interface PhaseCardProps {
  phase: typeof phases[0];
  index: number;
  inView: boolean;
}

function PhaseCard({ phase, index, inView }: PhaseCardProps) {
  const color = nodeColor(phase.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="relative mb-16 ml-20"
    >
      <div className="flex items-center gap-6">
        {/* Dot on the line */}
        <div
          className="absolute -left-9 top-6 w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        />

        {/* Connector line to card */}
        <div
          className="absolute -left-8 top-8 w-8 h-px"
          style={{ backgroundColor: color }}
        />

        {/* Card with corner brackets */}
        <div className="relative flex-1">
          <div
            className="border-2 p-6 relative bg-[var(--card-bg)]"
            style={{
              borderColor: color,
            }}
          >
            {/* Top-left corner bracket */}
            <div
              className="absolute top-0 left-0 w-4 h-4"
              style={{
                borderTop: `2px solid ${color}`,
                borderLeft: `2px solid ${color}`,
              }}
            />
            {/* Top-right corner bracket */}
            <div
              className="absolute top-0 right-0 w-4 h-4"
              style={{
                borderTop: `2px solid ${color}`,
                borderRight: `2px solid ${color}`,
              }}
            />
            {/* Bottom-left corner bracket */}
            <div
              className="absolute bottom-0 left-0 w-4 h-4"
              style={{
                borderBottom: `2px solid ${color}`,
                borderLeft: `2px solid ${color}`,
              }}
            />
            {/* Bottom-right corner bracket */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4"
              style={{
                borderBottom: `2px solid ${color}`,
                borderRight: `2px solid ${color}`,
              }}
            />

            {/* Content */}
            <h3 className="font-pixel text-white text-sm uppercase mb-2 text-center">
              {phase.name}
            </h3>
            <div className="w-12 h-px mx-auto mb-3" style={{ backgroundColor: color }} />
            <p
              className="font-pixel text-xs text-center uppercase"
              style={{ color }}
            >
              {phase.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="schedule" className="py-20 md:py-32 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-pixel text-sm md:text-lg text-[var(--yellow)] mb-2">
            EVENT SCHEDULE
          </h2>
          <div className="w-24 h-1 bg-[var(--magenta)] mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Gradient line on the left */}
          <div
            className="absolute left-1 top-0 w-2 h-full"
            style={{
              background: 'linear-gradient(to bottom, var(--cyan), var(--magenta) 50%, var(--yellow))',
            }}
          />

          {/* Phase cards */}
          <div className="space-y-0">
            {phases.map((phase, index) => (
              <PhaseCard key={phase.id} phase={phase} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
