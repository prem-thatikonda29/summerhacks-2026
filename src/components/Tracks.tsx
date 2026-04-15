'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TRACK_SLUGS } from '@/lib/config';

const tracks = [
  {
    id: 1,
    name: 'Productivity, Focus & Digital Wellness',
    subtitle: 'The Attention Economy',
    desc: 'Build tools that help people reclaim their focus, filter the noise and take back control of their time and attention.',
    color: 'var(--cyan)',
  },
  {
    id: 2,
    name: 'FinTech, Money & Financial Literacy',
    subtitle: 'Money & Markets for Everyone',
    desc: 'Build tools that make personal finance less intimidating and financial intelligence accessible to everyone.',
    color: 'var(--yellow)',
  },
  {
    id: 3,
    name: 'Creator Economy, Freelancing & Entrepreneurship',
    subtitle: 'Build Your Own Thing',
    desc: 'Build the infrastructure for the new generation of freelancers, creators and solo operators betting on themselves.',
    color: 'var(--magenta)',
  },
  {
    id: 4,
    name: 'AI Agents, Automation & Smart Assistants',
    subtitle: 'AI That Actually Does Things',
    desc: 'Build AI systems that don\'t just respond — they act, automate and operate autonomously on your behalf.',
    color: '#22c55e',
  },
  {
    id: 5,
    name: 'HealthTech, Fitness & Wellbeing',
    subtitle: 'Health & Body Intelligence',
    desc: 'Build tools that connect the dots between your habits and how you feel, and tell you something actually useful about your health.',
    color: '#a855f7',
  },
];

function TrackCard({ track, index, href }: { track: typeof tracks[0]; index: number; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const card = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full group"
    >
      <div
        className="bg-transparent p-6 border-white/60 border-2 border-dashed h-full group-hover:border-white transition-colors duration-300"
      >
        <div
          className="absolute -top-3 -left-3 w-12 h-12 flex items-center justify-center font-pixel text-xs text-black"
          style={{ background: track.color }}
        >
          {track.id}
        </div>

        <div className="mt-4 mb-4 flex justify-center">
          <Image
            src={`/assets/tracks/track-${track.id}.png`}
            alt={track.name}
            width={100}
            height={100}
            className="w-[100px] h-[100px]"
          />
        </div>

        <h3 className="font-pixel text-[10px] text-white mb-1 text-center leading-relaxed break-words">{track.name}</h3>
        <p className="font-mono text-xs text-gray-500 text-center mb-3">({track.subtitle})</p>
        <p className="text-sm text-gray-400 text-center">{track.desc}</p>
      </div>
    </motion.div>
  );

  return href ? <Link href={href} className="block h-full">{card}</Link> : card;
}

export default function Tracks({ isRevealed }: { isRevealed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="tracks" className="py-20 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-sm md:text-lg text-[var(--yellow)] mb-2">
            SPAWN LOCATIONS
          </h2>
          <div className="w-24 h-1 bg-[var(--magenta)] mx-auto mb-4" />
          <p className="font-mono text-sm text-gray-400 mt-4">
            {isRevealed
              ? 'Problem statements are out now, click the below tracks to see what problem statements are in each track'
              : 'Problem statements to be revealed soon'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tracks.map((track, i) => (
            <TrackCard
              key={track.id}
              track={track}
              index={i}
              href={isRevealed ? `/problem-statements/${TRACK_SLUGS[track.id]}` : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
