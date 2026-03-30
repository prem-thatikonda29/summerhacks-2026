'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Person = {
  id: number;
  name: string;
  about: string;
  photo: string;
  link: string;
  color: string;
};

const judges: Person[] = [
  // {
  //   id: 1,
  //   name: 'Jane Doe',
  //   about: 'Partner at Acme Ventures, early-stage investor.',
  //   photo: '/assets/judges/jane-doe.jpg',
  //   link: 'https://linkedin.com/in/janedoe',
  //   color: 'var(--yellow)',
  // },
];

const mentors: Person[] = [
  {
    id: 1,
    name: 'Abdullah Y. Shaikh',
    about: 'Co-founder & CEO @LixtaNetwork. Startup builder, co-leading Lixta Network & Komunity. Turns wild ideas into working products with a focus on clean UI/UX.',
    photo: '/assets/guests/abdullah.jpg',
    link: 'https://www.linkedin.com/in/abdullahys24/',
    color: 'var(--cyan)',
  },
  {
    id: 2,
    name: 'Haider Khursheed',
    about: 'Founder @Aeomi. AI researcher and builder, co-leading Lixta Network & Aeomi. Obsessed with building tech and crafting a corporation with a tech monopoly.',
    photo: '/assets/guests/haider.jpeg',
    link: 'https://www.linkedin.com/in/haiderkhursheedk/',
    color: 'var(--yellow)',
  },
  {
    id: 3,
    name: 'Anjali Goyal',
    about: 'SDE-3 at Adobe | Ex-Microsoft. Building systems at scale for millions. Focused on AI, distributed systems and real-world impact.',
    photo: '/assets/guests/anjali.jpg',
    link: 'https://www.linkedin.com/in/anjgoy/',
    color: 'var(--cyan)',
  },
];

function PersonCard({ person, index }: { person: Person; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.a
      href={person.link}
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
          {person.id}
        </div>

        <div className="mt-4 mb-4 flex justify-center">
          <Image
            src={person.photo}
            alt={person.name}
            width={100}
            height={100}
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
        </div>

        <h3 className="font-pixel text-sm text-white mb-2 text-center">{person.name}</h3>
        <p className="text-sm text-gray-300 text-center">{person.about}</p>
      </div>
    </motion.a>
  );
}

function SubSection({ title, people, color }: { title: string; people: Person[]; color: string }) {
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
          <div key={person.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
            <PersonCard person={person} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Speakers() {
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
