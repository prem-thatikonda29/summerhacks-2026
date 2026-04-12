'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { SanityPerson } from '@/lib/queries';

function PersonCard({ person, index }: { person: SanityPerson; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.a
      href={person.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full block group"
    >
      <div className="bg-transparent p-6 border-white/60 border-2 border-dashed h-full group-hover:border-white transition-colors duration-300">
        <div
          className="absolute -top-3 -left-3 w-12 h-12 flex items-center justify-center font-pixel text-xs text-black"
          style={{ background: person.color }}
        >
          {index + 1}
        </div>

        <div className="mt-4 mb-4 flex justify-center">
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-white/10 flex items-center justify-center">
              <span className="font-pixel text-xs text-white/40">TBA</span>
            </div>
          )}
        </div>

        <h3 className="font-pixel text-sm text-white mb-2 text-center">{person.name}</h3>
        <p className="text-sm text-gray-300 text-center">{person.about}</p>
      </div>
    </motion.a>
  );
}

function SubSection({ title, people, color }: { title: string; people: SanityPerson[]; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-16 last:mb-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        className="flex items-center gap-4 mb-8"
      >
        <span className="font-pixel text-xs" style={{ color }}>{title}</span>
        <div className="flex-1 h-[1px] bg-[var(--card-border)]" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6">
        {people.map((person, i) => (
          <div key={person._id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
            <PersonCard person={person} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  judges: SanityPerson[];
  mentors: SanityPerson[];
};

export default function Speakers({ judges, mentors }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const isEmpty = judges.length === 0 && mentors.length === 0;

  return (
    <section id="speakers" className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-75 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Crect x='0' y='0' width='3' height='3' fill='%23333'/%3E%3C/svg%3E\")",
          backgroundSize: '28px 28px',
        }}
      />
      {/* Centered radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-[var(--magenta)] opacity-[0.08] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-sm md:text-lg text-[var(--yellow)] mb-2">
            JUDGES AND MENTORS
          </h2>
          <div className="w-24 h-1 bg-[var(--magenta)] mx-auto" />
        </motion.div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-pixel text-lg md:text-2xl text-[var(--magenta)]">
              To Be Disclosed Soon™
            </p>
          </motion.div>
        ) : (
          <>
            {judges.length > 0 && (
              <SubSection title="JUDGES" people={judges} color="var(--yellow)" />
            )}
            {mentors.length > 0 && (
              <SubSection title="MENTORS" people={mentors} color="var(--cyan)" />
            )}
          </>
        )}
      </div>
    </section>
  );
}
