'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';

interface HeroBridgeRevealProps {
  imageUrl?: string;
}

export const HeroBridgeReveal = forwardRef<HTMLDivElement, HeroBridgeRevealProps>(
  ({ imageUrl = '/images/bridge-ilheus.webp' }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform transform-gpu pointer-events-none select-none"
        style={{
          opacity: 0,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        }}
      >
        {/* Background High-Resolution Bridge Image */}
        <div className="absolute inset-0 w-full h-full bridge-image-wrapper">
          <Image
            src={imageUrl}
            alt="Ponte Jorge Amado em Ilhéus - Bahia"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          />
        </div>

        {/* Minimal Gradient Overlay to preserve natural photograph while maintaining text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-ocean-primary/90 to-transparent pointer-events-none" />
      </div>
    );
  }
);

HeroBridgeReveal.displayName = 'HeroBridgeReveal';
