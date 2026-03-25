'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const spritePositions = [
  { x: '10%', y: '20%', delay: 0 },
  { x: '85%', y: '15%', delay: 0.5 },
  { x: '15%', y: '70%', delay: 1 },
  { x: '80%', y: '65%', delay: 1.5 },
  { x: '5%', y: '45%', delay: 0.8 },
  { x: '90%', y: '40%', delay: 1.2 },
];

const instagramHref = 'https://www.instagram.com/summerhacks.live';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className="bg-[var(--background)] py-12 relative overflow-hidden">
      {spritePositions.map((pos, i) => {
        const assetNum = (i % 3) + 1;
        return (
          <motion.div
            key={i}
            className="absolute z-0 opacity-40"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: pos.delay, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: pos.delay }}
            >
              <Image
                src={`/assets/asset-${assetNum}.png`}
                alt={`Asset ${assetNum}`}
                width={64}
                height={64}
                className="w-12 h-12 md:w-16 md:h-16"
              />
            </motion.div>
          </motion.div>
        );
      })}

      <div className="max-w-6xl mx-auto px-4 pt-12 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <h2 className="font-pixel text-2xl md:text-4xl text-white mb-4">
            READY PLAYER ONE?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join the ultimate 24-hour coding challenge. Form your team,
            build something amazing, and compete for prizes!
          </p>

          <motion.a
            href="https://luma.com/event/evt-uSPjRhJgEBSbx9j"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-[var(--magenta)] text-white font-pixel text-sm md:text-lg px-12 py-4 hover:scale-105 transition-transform inline-block"
            data-luma-action="checkout"
            data-luma-event-id="evt-uSPjRhJgEBSbx9j"
          >
            REGISTER NOW →
          </motion.a>
        </motion.div>

        <div className="border-t border-[var(--card-border)] pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image src="/logo.jpeg" alt="Summer Hacks" width={160} height={52} className="h-12 w-auto object-contain" />
            <p className="text-xs md:text-sm text-gray-400">
              © 2026 Summer Hacks. All rights reserved.
            </p>
          </div>
          <a href={instagramHref} className="w-10 h-10 bg-[var(--card-bg)] border-2 border-[var(--card-border)] flex items-center justify-center hover:border-[var(--yellow)] hover:brightness-150 transition-all p-2">
            <Image src="/assets/instagram.png" alt="Instagram" width={24} height={24} className="w-full h-full object-contain" />
          </a>
        </div>

      </div>
    </footer>
  );
}
