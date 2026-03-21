'use client';

import { useRef, useState } from 'react';
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

const prizes = [
  {
    title: 'GRAND CHAMPION',
    amount: '₹40,000',
    desc: 'First Place - Grand Champion',
    isMain: true,
  },
  {
    title: '1st RUNNER UP',
    amount: '₹25,000',
    desc: 'Second Place - Runner Up',
    isMain: false,
  },
  {
    title: '2nd RUNNER UP',
    amount: '₹15,000',
    desc: 'Third Place - Quickest Build',
    isMain: false,
  },
  {
    title: 'HIDDEN ACHIEVEMENT',
    amount: '₹5,000',
    desc: 'Hidden Achievement Award',
    isMain: false,
  },
  {
    title: 'HIDDEN ACHIEVEMENT',
    amount: '₹5,000',
    desc: 'Hidden Achievement Award',
    isMain: false,
  },
];

type BlockVariant = 'question' | 'brick' | 'special';

function BlockTile({ prize, index, variant }: { prize: typeof prizes[0]; index: number; variant: BlockVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  const getBlockImage = () => {
    switch (variant) {
      case 'question':
        return '/assets/asset-7.png';
      case 'brick':
        return '/assets/asset-6.png';
      case 'special':
        return '/assets/asset-5.png';
    }
  };

  const boxShadowBase = `
    inset -4px -4px 0 rgba(0, 0, 0, 0.4),
    6px 6px 0 #000
  `;

  const boxShadowHover = `
    inset -4px -4px 0 rgba(0, 0, 0, 0.4),
    2px 2px 0 #000
  `;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex flex-col items-center gap-0"
    >
      {/* Text above the box */}
      <div className="text-center">
        <div className="font-pixel text-xs md:text-sm text-[var(--yellow)] mb-2">
          {prize.title}
        </div>
        <div className="font-pixel text-2xl md:text-3xl font-bold text-white">
          {prize.amount}
        </div>
      </div>

      {/* Tile Box with Background Image */}
      <div
        className="w-48 h-48 md:w-64 md:h-64 border-[3px] border-black relative cursor-pointer"
        style={{
          backgroundImage: `url('${getBlockImage()}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: isHovered ? boxShadowHover : boxShadowBase,
          transition: 'box-shadow 0.1s ease-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </motion.div>
  );
}

export default function Prizes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="prizes" className="py-12 md:py-16 bg-[var(--background)] relative overflow-hidden">
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
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-sm md:text-lg text-[var(--yellow)] mb-2">
            PRIZE POOL
          </h2>
          <div className="w-24 h-1 bg-[var(--magenta)] mx-auto" />
        </motion.div>

        {/* Podium Layout */}
        <div className="flex flex-col items-center gap-8">
          {/* 1st, 2nd, 3rd Podium */}
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {/* 2nd Place - Left */}
            <div className="flex justify-center order-2 md:order-1">
              <BlockTile prize={prizes[1]} index={1} variant="brick" />
            </div>

            {/* 1st Place - Center */}
            <div className="flex justify-center order-1 md:order-2">
              <BlockTile prize={prizes[0]} index={0} variant="question" />
            </div>

            {/* 3rd Place - Right */}
            <div className="flex justify-center order-3 md:order-3">
              <BlockTile prize={prizes[2]} index={2} variant="brick" />
            </div>
          </div>

          {/* Hidden Achievements - Below */}
          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
              <BlockTile prize={prizes[3]} index={3} variant="special" />
              <BlockTile prize={prizes[4]} index={4} variant="special" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
