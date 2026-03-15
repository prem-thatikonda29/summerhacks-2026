'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function Register() {
  const [showConfetti, setShowConfetti] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const handleRegister = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <section id="register" className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden">



      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: '50vw', 
                  y: '50vh', 
                  scale: 0,
                  rotate: 0 
                }}
                animate={{ 
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: 1,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="absolute w-3 h-3"
                style={{
                  background: i % 4 === 0 ? 'var(--yellow)' : i % 4 === 1 ? 'var(--magenta)' : i % 4 === 2 ? 'var(--cyan)' : '#22c55e',
                  clipPath: i % 3 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'circle(50%)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
