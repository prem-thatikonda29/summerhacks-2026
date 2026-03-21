'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image'
;

const spritePositions = [
  { x: '10%', y: '20%', delay: 0 },
  { x: '85%', y: '15%', delay: 0.5 },
  { x: '15%', y: '70%', delay: 1 },
  { x: '80%', y: '65%', delay: 1.5 },
  { x: '5%', y: '45%', delay: 0.8 },
  { x: '90%', y: '40%', delay: 1.2 },
];

const faqs = [
  {
    question: 'What is the team size limit?',
    answer: 'Teams must have 2-4 members. Solo participation is not allowed, so make sure to find a team before the event!',
  },
  {
    question: 'Is there any participation fee?',
    answer: 'No! Participation is completely free. We provide dinner, snacks, and breakfast to all participants.',
  },
  {
    question: 'What if I don\'t have a team?',
    answer: 'No worries! We have a WhatsApp group where you can connect with other participants and recruit teammates. Teams must be 2-4 members.',
  },
  {
    question: 'Do I need to bring my own laptop?',
    answer: 'Yes, please bring your laptop, charger, and any other hardware you might need for your project.',
  },
  {
    question: 'What are the judging criteria?',
    answer: 'Projects are judged on Innovation (40%), Technical Implementation (30%), Business Potential (20%), and Presentation (10%).',
  },
  {
    question: 'Can I start working on my project before the event?',
    answer: 'No, all work must be done during the 24-hour hackathon. You can come with ideas, but no code!',
  },
  {
    question: 'Is there a code of conduct?',
    answer: 'Yes, all participants must follow our code of conduct. We have a zero-tolerance policy for harassment.',
  },
  {
    question: 'Will there be food provided?',
    answer: 'Yes! We provide dinner, snacks, and breakfast throughout the event. Let us know about dietary restrictions in advance.',
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-2 border-[var(--card-border)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 text-left flex items-center justify-between transition-colors ${
          isOpen ? 'bg-[var(--card-bg)]' : 'hover:bg-[var(--card-bg)]'
        }`}
        style={{
          borderColor: isOpen ? 'var(--cyan)' : 'var(--card-border)',
        }}
      >
        <div className="flex items-center gap-4">
          <span className={isOpen ? 'text-[var(--cyan)]' : 'text-gray-500'}>🔒</span>
          <span className="font-pixel text-xs text-white">{item.question}</span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-[var(--cyan)]"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 text-gray-400 text-sm border-t-2 border-[var(--cyan)] flex items-center justify-center min-h-[100px]">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const leftFAQs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightFAQs = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <section id="faq" className="py-20 md:py-32 bg-[var(--background)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-sm md:text-lg text-[var(--yellow)] mb-2">
            CHEAT CODES UNLOCKED
          </h2>
          <div className="w-24 h-1 bg-[var(--magenta)] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {leftFAQs.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i} />
            ))}
          </div>
          <div className="space-y-4">
            {rightFAQs.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i + leftFAQs.length} />
            ))}
          </div>
        </div>
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
