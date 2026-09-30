'use client';

import React from 'react';
import { HeroVideo } from './HeroVideo';
import { HeroContent } from './HeroContent';

export function Hero() {
  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-ocean-black flex items-center justify-center"
      id="hero"
    >
      {/* Background Hero Video */}
      <HeroVideo />

      {/* Hero Content (Editorial Copy + CTAs) */}
      <HeroContent />
    </section>
  );
}
