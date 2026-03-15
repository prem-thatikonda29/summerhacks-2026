'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const spritePositions = [
  { x: '10%', y: '20%', delay: 0 },
  { x: '85%', y: '15%', delay: 0.5 },
  { x: '15%', y: '70%', delay: 1 },
  { x: '80%', y: '65%', delay: 1.5 },
  { x: '5%', y: '45%', delay: 0.8 },
  { x: '90%', y: '40%', delay: 1.2 },
];

function getTimeRemaining() {
  const targetDate = new Date('2026-04-17T09:00:00');
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(getTimeRemaining());
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
      <div className="scanlines absolute inset-0 z-10" />
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--yellow)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--magenta)] rounded-full opacity-5 blur-3xl" />
      </div>

      {spritePositions.map((pos, i) => {
        const assetNum = (i % 3) + 1;
        return (
          <motion.div
            key={i}
            className="absolute z-20 opacity-40"
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

      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center gap-8 mb-8"
        >
          <Image
            src="/assets/itm.jpeg"
            alt="ITM Skills University"
            width={80}
            height={80}
            className="h-12 md:h-16 w-auto"
          />
          <Image
            src="/assets/sft.jpeg"
            alt="School of Future Tech"
            width={80}
            height={80}
            className="h-12 md:h-16 w-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-pixel text-[1.5rem] md:text-[2.5rem] lg:text-[4rem] leading-tight text-shadow-pixel mb-4">
            <span className="block text-[var(--yellow)]">SUMMER</span>
            <span className="block text-[var(--magenta)]">HACKS</span>
          </h1>

          <p className="text-[var(--cyan)] font-mono text-sm md:text-lg mb-4 tracking-wider">
            24 HOUR STARTUP HACKATHON
          </p>

          <div className="inline-block bg-[var(--card-bg)] border border-[var(--card-border)] px-6 py-3 rounded mb-8">
            <span className="text-[var(--yellow)] text-base">APRIL 17-18, 2026</span>
            <span className="mx-2 text-[var(--card-border)]">|</span>
            <span className="text-white text-base">ITM Skills University</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8"
        >
          <div className="flex flex-wrap justify-center gap-3 md:gap-8 lg:gap-12 items-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="font-pixel text-[var(--yellow)] text-2xl md:text-4xl lg:text-6xl leading-none">{String(value).padStart(2, '0')}</div>
                <div className="text-[10px] md:text-xs text-gray-400 uppercase mt-1 md:mt-2">{unit}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="bg-[var(--yellow)] text-black font-pixel text-xs px-8 py-4 hover:scale-105 transition-transform">
            PRESS START →
          </button>
          <button className="border-2 border-[var(--cyan)] text-[var(--cyan)] font-pixel text-xs px-8 py-4 hover:bg-[var(--cyan)] hover:text-black transition-colors">
            LEARN MORE
          </button>
        </motion.div> */}
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <Image
            key={i}
            src="/assets/asset-4.png"
            alt="Decorative asset"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        ))}
      </div>
    </section>
  );
}
