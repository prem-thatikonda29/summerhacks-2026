'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';

const phases = [
  { id: 1, name: 'Arrival & Registration', desc: 'DOORS OPEN' },
  { id: 2, name: 'Build Sprint Begins', desc: '24-HOUR CODING, MENTORING & WORKSHOPS' },
  { id: 3, name: 'Final Submission Window', desc: 'CODE FREEZE' },
  { id: 4, name: 'Awards Ceremony', desc: 'GRAND FINALE' },
];

const NUM_DOTS = 16;

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
      className="relative mb-16 ml-32"
    >
      <div className="flex items-center gap-6">
        {/* Connector line to card */}
        <div
          className="absolute -left-8 top-8 w-8 h-px"
          style={{ backgroundColor: color }}
        />

        {/* Card with corner brackets */}
        <div className="relative flex-1">
          <div
            className="border-2 p-6 relative bg-[var(--card-bg)]"
            style={{ borderColor: color }}
          >
            <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
            <div className="absolute top-0 right-0 w-4 h-4" style={{ borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
            <div className="absolute bottom-0 left-0 w-4 h-4" style={{ borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
            <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />

            <h3 className="font-pixel text-white text-sm uppercase mb-2 text-center">{phase.name}</h3>
            <div className="w-12 h-px mx-auto mb-3" style={{ backgroundColor: color }} />
            <p className="font-pixel text-xs text-center uppercase" style={{ color }}>{phase.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: '-50px' });
  const [progress, setProgress] = useState(0);
  const [pacmanFrame, setPacmanFrame] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacmanFrame(f => f === 1 ? 2 : 1);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 50%', 'end 50%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.min(Math.max(latest, 0), 1));
  });

  const pacmanTopPct = Math.min(progress * 100, 96);
  // Dots disappear just before Pac-Man reaches them
  const eatenCount = Math.ceil((pacmanTopPct + 4) / 96 * (NUM_DOTS - 1));

  return (
    <section ref={sectionRef} id="schedule" className="py-20 md:py-32 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          ref={headingRef}
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
          {/* Dots track + Pac-Man */}
          <div className="absolute left-0 top-0 w-24 h-full pointer-events-none">
            {/* Dots */}
            {Array.from({ length: NUM_DOTS }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[var(--cyan)]"
                style={{
                  top: `${(i / (NUM_DOTS - 1)) * 96}%`,
                  left: '52px',
                  transform: 'translateX(-50%) translateY(-50%)',
                  opacity: i < eatenCount ? 0 : 1,
                  transition: 'opacity 0.1s',
                }}
              />
            ))}

            {/* Pac-Man */}
            <div
              className="absolute w-16 h-16"
              style={{
                top: `${pacmanTopPct}%`,
                left: '52px',
                transform: 'translateX(-50%) translateY(-50%) rotate(90deg)',
              }}
            >
              <img
                src={`/assets/pacman-${pacmanFrame}.png`}
                alt="Pac-Man"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

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
