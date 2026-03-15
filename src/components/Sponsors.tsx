'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Sponsors() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="sponsors" className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
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
      </div>

      {/* Mario GIF - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48">
        <Image
          src="/assets/mario.gif"
          alt="Mario"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
    </section>
  );
}
