'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { SanityPartner } from '@/lib/queries';

const PARTNER_TYPE_LABELS: Record<string, string> = {
  'title-sponsor': 'Title Sponsor',
  'co-sponsor': 'Co-Sponsor',
  'marketing-partner': 'Marketing Partner',
  'event-management-partner': 'Event Management Partner',
  'technology-partner': 'Technology Partner',
  'community-partner': 'Community Partner',
  'media-partner': 'Media Partner',
};

function SponsorCard({ sponsor, index }: { sponsor: SanityPartner; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.a
      href={sponsor.websiteUrl}
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
          className="absolute -top-3 -left-3 px-3 py-2 max-w-[70%] text-center font-pixel text-[9px] leading-tight text-black"
          style={{ background: sponsor.color }}
        >
          {PARTNER_TYPE_LABELS[sponsor.partnerType] ?? sponsor.partnerType}
        </div>

        <div className="mt-4 mb-4 flex justify-center">
          {sponsor.logo ? (
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain"
            />
          ) : (
            <div className="w-[100px] h-[100px] flex items-center justify-center">
              <span className="font-pixel text-xs text-white/40">TBA</span>
            </div>
          )}
        </div>

        <h3 className="font-pixel text-sm text-white mb-2 text-center">{sponsor.name}</h3>
        <p className="text-sm text-gray-300 text-center">{sponsor.about}</p>
      </div>
    </motion.a>
  );
}

type Props = {
  sponsors: SanityPartner[];
};

export default function Sponsors({ sponsors }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="partners" className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
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
        <div className="w-[600px] h-[400px] bg-[var(--cyan)] opacity-[0.15] rounded-full blur-[150px]" />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-sm md:text-lg text-[var(--yellow)] mb-2">
            PARTNERS
          </h2>
          <div className="w-24 h-1 bg-[var(--magenta)] mx-auto" />
        </motion.div>

        {sponsors.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.map((sponsor, i) => (
              <div key={sponsor._id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <SponsorCard sponsor={sponsor} index={i} />
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
