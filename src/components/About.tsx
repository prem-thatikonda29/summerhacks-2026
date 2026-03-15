'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

function StatCard({ value, label, suffix = '', prefix = '' }: { value: number; label: string; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-[var(--card-bg)] border-2 border-[var(--card-border)] p-3 md:p-6 hover:border-[var(--yellow)] transition-colors group"
    >
      <div className="font-pixel text-lg md:text-4xl text-[var(--yellow)] mb-2">
        {prefix}{start ? <CountUp end={value} duration={2} /> : '0'}{suffix}
      </div>
      <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{label}</div>
      <div className="w-8 h-1 bg-[var(--magenta)] mt-3 group-hover:w-full transition-all" />
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 md:py-32 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <h2 className="font-pixel text-sm md:text-lg text-[var(--yellow)] leading-relaxed">
              WHAT IS<br />SUMMER HACKS?
            </h2>
            <div className="w-16 h-1 bg-[var(--magenta)] mt-4 mb-6" />
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/assets/animated.gif"
                alt="Summer Hacks Animation"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
              Summer Hacks is a 24-hour startup hackathon where innovators, developers,
              and creators come together to build groundbreaking solutions. Join hundreds
              of participants in an intense, collaborative environment powered by
              creativity and code.
            </p>
            <p className="text-lg md:text-xl text-gray-400">
              <span className="text-[var(--cyan)]">Who can participate:</span> Students,
              developers, designers, and entrepreneurs from all backgrounds. Form teams
              of 2-4 members!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard value={90} label="Teams" />
          <StatCard value={24} label="Hours" />
          <StatCard value={5} label="Tracks" />
          <StatCard value={90000} label="Prize Pool" prefix="₹" />
        </div>
      </div>
    </section>
  );
}
