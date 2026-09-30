'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseHeroScrollOptions {
  triggerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLDivElement | null>;
  bridgeRef: React.RefObject<HTMLDivElement | null>;
  step1Ref: React.RefObject<HTMLDivElement | null>;
  step2Ref: React.RefObject<HTMLDivElement | null>;
  step3Ref: React.RefObject<HTMLDivElement | null>;
  scrollIndicatorRef: React.RefObject<HTMLDivElement | null>;
}

export function useHeroScroll({
  triggerRef,
  videoRef,
  bridgeRef,
  step1Ref,
  step2Ref,
  step3Ref,
  scrollIndicatorRef,
}: UseHeroScrollOptions) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Use gsap.context for bulletproof cleanup and scoping in React
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback for reduced motion: show final composed view or simple static states
        if (step1Ref.current) gsap.set(step1Ref.current, { opacity: 1, y: 0 });
        if (bridgeRef.current) gsap.set(bridgeRef.current, { opacity: 1, clipPath: 'none' });
        return;
      }

      // Initial States
      gsap.set(step1Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto' });
      gsap.set(step2Ref.current, { opacity: 0, y: 40, pointerEvents: 'none' });
      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, { opacity: 1 });
      }
      gsap.set(bridgeRef.current, {
        opacity: 0,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        scale: 1.1,
      });
      gsap.set(videoRef.current, { scale: 1, filter: 'blur(0px)' });

      // Create Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth interpolation
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timelineRef.current = tl;

      // -------------------------------------------------------------------
      // 0% - 15%: Initial State (Step 1 visible, subtle camera breathing)
      // -------------------------------------------------------------------
      tl.to(
        videoRef.current,
        {
          scale: 1.04,
          duration: 0.15,
          ease: 'power1.out',
        },
        0
      );

      // -------------------------------------------------------------------
      // 15% - 30%: Step 1 exits -> Step 2 enters
      // -------------------------------------------------------------------
      tl.to(
        step1Ref.current,
        {
          opacity: 0,
          y: -40,
          duration: 0.12,
          ease: 'power2.in',
          pointerEvents: 'none',
        },
        0.15
      );

      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.08,
            ease: 'power2.in',
          },
          0.15
        );
      }

      tl.to(
        step2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power2.out',
          pointerEvents: 'auto',
        },
        0.22
      );

      tl.to(
        videoRef.current,
        {
          scale: 1.09,
          duration: 0.2,
          ease: 'none',
        },
        0.15
      );

      // -------------------------------------------------------------------
      // 30% - 50%: Step 2 exits -> Cinematic Jet Ski focus
      // -------------------------------------------------------------------
      tl.to(
        step2Ref.current,
        {
          opacity: 0,
          y: -35,
          duration: 0.14,
          ease: 'power2.in',
          pointerEvents: 'none',
        },
        0.38
      );

      tl.to(
        videoRef.current,
        {
          scale: 1.15,
          duration: 0.2,
          ease: 'power1.inOut',
        },
        0.35
      );

      // -------------------------------------------------------------------
      // 50% - 70%: MAR -> ILHÉUS TRANSITION (Cinematic Reveal of Bridge)
      // -------------------------------------------------------------------
      tl.to(
        bridgeRef.current,
        {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1.0,
          duration: 0.24,
          ease: 'power2.inOut',
        },
        0.5
      );

      tl.to(
        videoRef.current,
        {
          scale: 1.25,
          filter: 'blur(6px)',
          opacity: 0.2,
          duration: 0.22,
          ease: 'power2.in',
        },
        0.52
      );

      // -------------------------------------------------------------------
      // 70% - 95%: Step 3 enters (Ilhéus location + Conversion CTA)
      // -------------------------------------------------------------------
      tl.to(
        step3Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          ease: 'power3.out',
          pointerEvents: 'auto',
        },
        0.7
      );

      // Subtle parallax on bridge layer as scroll reaches the end
      tl.to(
        bridgeRef.current,
        {
          scale: 1.04,
          duration: 0.25,
          ease: 'none',
        },
        0.75
      );
    }, triggerEl);

    return () => {
      ctx.revert();
    };
  }, [
    triggerRef,
    videoRef,
    bridgeRef,
    step1Ref,
    step2Ref,
    step3Ref,
    scrollIndicatorRef,
  ]);

  return { timeline: timelineRef };
}
