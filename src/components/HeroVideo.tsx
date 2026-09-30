'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroVideoProps {
  posterUrl?: string;
  videoSrc?: string;
}

export const HeroVideo = forwardRef<HTMLDivElement, HeroVideoProps>(
  (
    {
      posterUrl = '/images/hero-poster.webp',
      videoSrc = '/videos/herobg.mp4',
    },
    ref
  ) => {
    const videoElementRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      const vid = videoElementRef.current;
      if (!vid) return;

      // Force muted properties on DOM node to pass mobile autoplay security checks
      vid.defaultMuted = true;
      vid.muted = true;

      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback, poster remains visible
        });
      }
    }, []);

    return (
      <div
        ref={ref}
        className="absolute inset-0 w-full h-full overflow-hidden bg-ocean-black will-change-transform transform-gpu select-none"
      >
        {/* Background Poster fallback */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src={posterUrl}
            alt="Ocean Club Jetski em Ilhéus"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Real High-Definition Hero Video */}
        <video
          ref={videoElementRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Ultra-subtle directional gradient on the left side to guarantee white text readability while preserving natural water colors */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,20,40,.45) 0%, rgba(0,20,40,.18) 40%, rgba(0,20,40,0) 70%)',
          }}
        />

        {/* Top subtle navbar gradient */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
      </div>
    );
  }
);

HeroVideo.displayName = 'HeroVideo';
