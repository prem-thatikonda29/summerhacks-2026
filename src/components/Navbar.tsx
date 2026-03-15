'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Guests', href: '#speakers' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080808]/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
      style={{ borderBottom: scrolled ? '2px solid var(--yellow)' : '2px solid var(--card-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-pixel text-xs md:text-sm text-[var(--yellow)] text-shadow-pixel">
            SUMMER<br className="md:hidden" /> HACKS
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="text-sm hover:text-[var(--yellow)] transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://luma.com/event/evt-uSPjRhJgEBSbx9j"
              className="animate-pulse-glow bg-[var(--magenta)] text-white px-4 py-2 text-xs font-pixel inline-block hover:scale-105 transition-transform"
              data-luma-action="checkout"
              data-luma-event-id="evt-uSPjRhJgEBSbx9j"
            >
              REGISTER NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
