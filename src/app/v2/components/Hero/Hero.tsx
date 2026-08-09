'use client';

import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';

export default function Hero() {
  return (
    <section id="hero" className="relative z-[1] flex items-center overflow-hidden py-[48px] pb-[40px]">
      {/* Animated Background — orbs + grid that the glass blurs over */}
      <HeroBackground />

      {/* Glass Blur Overlay — deliberately painted after the background so
          backdrop-filter has a concrete backdrop to sample. */}
      <div className="hero-glass" />

      {/* Content Container */}
      <div className="wrap relative z-10 w-full">
        <div className="hero-grid grid lg:grid-cols-[1.1fr_0.9fr] gap-[50px] items-center">
          {/* Left: Content */}
          <HeroContent />

          {/* Right: Visual */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
