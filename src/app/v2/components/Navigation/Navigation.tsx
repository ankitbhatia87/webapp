'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [markUrl, setMarkUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/assets')
      .then((response) => response.json())
      .then((assets: { logoFull?: string; logoMark?: string }) => {
        if (assets.logoFull) setLogoUrl(assets.logoFull);
        if (assets.logoMark) setMarkUrl(assets.logoMark);
      })
      .catch(() => undefined);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="site-nav"
      className={`sticky top-0 z-50 border-b transition-all duration-400 backdrop-blur-xl ${
        scrolled
          ? 'bg-[rgba(8,9,12,0.9)] border-(--border) shadow-[0_12px_34px_rgba(0,0,0,0.38)]'
          : 'bg-[rgba(10,11,14,0.72)] border-(--border)'
      }`}
    >
      <div className="wrap flex items-center justify-between transition-all duration-400"
        style={{
          padding: scrolled ? '10px 32px' : '18px 32px'
        }}
      >
        {/* Logo */}
        <Link href="/v2" className="flex items-center gap-2">
          {/* Full logo for wide screens */}
          {logoUrl && <Image
            src={logoUrl}
            alt="Ankit Bhatia"
            width={191}
            height={38}
            className="hidden md:block transition-all duration-400"
            style={{ height: scrolled ? '32px' : '38px', width: 'auto', backgroundColor: 'transparent' }}
            priority
          />}
          {/* Mark for mobile screens */}
          {markUrl && <Image
            src={markUrl}
            alt="AB"
            width={40}
            height={40}
            className="md:hidden transition-all duration-400"
            style={{
              height: scrolled ? '32px' : '40px',
              width: 'auto',
              backgroundColor: 'transparent'
            }}
            priority
          />}
        </Link>

        {/* Nav Links */}
        <div className="nav-links">
          <button
            onClick={() => scrollToSection('purest')}
            className="relative pb-0.5 transition-colors duration-300 hover:text-(--text) before:content-[''] before:absolute before:left-0 before:right-full before:-bottom-4.5 before:h-0.5 before:bg-(--gold) before:transition-[right] before:duration-350 hover:before:right-0"
          >
            PUREST
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="relative pb-0.5 transition-colors duration-300 hover:text-(--text) before:content-[''] before:absolute before:left-0 before:right-full before:-bottom-4.5 before:h-0.5 before:bg-(--gold) before:transition-[right] before:duration-350 hover:before:right-0"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('journey')}
            className="relative pb-0.5 transition-colors duration-300 hover:text-(--text) before:content-[''] before:absolute before:left-0 before:right-full before:-bottom-4.5 before:h-0.5 before:bg-(--gold) before:transition-[right] before:duration-350 hover:before:right-0"
          >
            Journey
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="relative pb-0.5 transition-colors duration-300 hover:text-(--text) before:content-[''] before:absolute before:left-0 before:right-full before:-bottom-4.5 before:h-0.5 before:bg-(--gold) before:transition-[right] before:duration-350 hover:before:right-0"
          >
            About
          </button>
        </div>

        {/* CTA Button */}
        <a
          href="mailto:ankitbhatia.aus@gmail.com"
          className="nav-cta hover-lift"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
