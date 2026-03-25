'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Guests', href: '#speakers' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Partners', href: '#partners' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const targetId = href.replace('#', '');

    if (pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080808]/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
      style={{ borderBottom: scrolled ? '2px solid var(--yellow)' : '2px solid var(--card-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <Image src="/logo.jpeg" alt="Summer Hacks" width={160} height={52} className="h-10 md:h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm hover:text-[var(--yellow)] transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Register Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://luma.com/event/evt-uSPjRhJgEBSbx9j"
              className="animate-pulse-glow bg-[var(--magenta)] text-white px-4 py-2 text-xs font-pixel inline-block hover:scale-105 transition-transform whitespace-nowrap"
              data-luma-action="checkout"
              data-luma-event-id="evt-uSPjRhJgEBSbx9j"
            >
              REGISTER NOW
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-[var(--yellow)] font-pixel text-lg hover:text-[var(--magenta)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile Menu - Slide from Right */}
        <div
          className={`fixed top-16 right-0 w-64 h-screen bg-[#0a0a0a] border-l border-[var(--card-border)] py-4 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col space-y-3 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-gray-300 hover:text-[var(--yellow)] transition-colors cursor-pointer font-pixel"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
