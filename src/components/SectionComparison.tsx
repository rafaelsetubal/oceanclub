'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CTAButton } from './CTAButton';

gsap.registerPlugin(ScrollTrigger);

export function SectionComparison() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Backgrounds
  const imageNegativeRef = useRef<HTMLDivElement | null>(null);
  const imagePositiveRef = useRef<HTMLDivElement | null>(null);

  // State 01: Propriedade / Negativo
  const negativeStageRef = useRef<HTMLDivElement | null>(null);
  const negativeHeadlineRef = useRef<HTMLDivElement | null>(null);
  const costCompraRef = useRef<HTMLDivElement | null>(null);
  const costMarinaRef = useRef<HTMLDivElement | null>(null);
  const costSeguroRef = useRef<HTMLDivElement | null>(null);
  const costManutencaoRef = useRef<HTMLDivElement | null>(null);
  const costDepreciacaoRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const negativeClosingRef = useRef<HTMLDivElement | null>(null);

  // State 02: Ocean Club / Positivo
  const positiveStageRef = useRef<HTMLDivElement | null>(null);
  const positiveHeadlineRef = useRef<HTMLDivElement | null>(null);
  const benefit1Ref = useRef<HTMLDivElement | null>(null);
  const benefit2Ref = useRef<HTMLDivElement | null>(null);
  const benefit3Ref = useRef<HTMLDivElement | null>(null);
  const positiveClosingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        if (imagePositiveRef.current) gsap.set(imagePositiveRef.current, { opacity: 1 });
        if (positiveStageRef.current) gsap.set(positiveStageRef.current, { opacity: 1 });
        return;
      }

      // Initial States
      gsap.set(imageNegativeRef.current, { opacity: 1, scale: 1 });
      gsap.set(imagePositiveRef.current, { opacity: 0, scale: 1.05 });

      // Negative Stage: Headline visible, costs hidden initially
      gsap.set(negativeStageRef.current, { opacity: 1, pointerEvents: 'auto', y: 0 });
      gsap.set(negativeHeadlineRef.current, { opacity: 1, y: 0 });
      gsap.set(costCompraRef.current, { opacity: 0, y: 16 });
      gsap.set(costMarinaRef.current, { opacity: 0, y: 14 });
      gsap.set(costSeguroRef.current, { opacity: 0, y: 14 });
      gsap.set(costManutencaoRef.current, { opacity: 0, y: 14 });
      gsap.set(costDepreciacaoRef.current, { opacity: 0, y: 14 });
      gsap.set(workRef.current, { opacity: 0, y: 14 });
      gsap.set(negativeClosingRef.current, { opacity: 0, y: 14 });

      // Positive Stage: Starts completely hidden
      gsap.set(positiveStageRef.current, { opacity: 0, pointerEvents: 'none', y: 25 });
      gsap.set(positiveHeadlineRef.current, { opacity: 0, y: 16 });
      gsap.set(benefit1Ref.current, { opacity: 0, y: 14 });
      gsap.set(benefit2Ref.current, { opacity: 0, y: 14 });
      gsap.set(benefit3Ref.current, { opacity: 0, y: 14 });
      gsap.set(positiveClosingRef.current, { opacity: 0, y: 14 });

      // Scroll-Driven Master Timeline with GSAP ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // -------------------------------------------------------------
      // 0% -> 15%: Estado 01 Estabelecido (Headline + Imagem Negativa)
      // -------------------------------------------------------------
      tl.to(
        imageNegativeRef.current,
        {
          scale: 1.04,
          duration: 0.5,
          ease: 'none',
        },
        0
      );

      // -------------------------------------------------------------
      // 15% -> 30%: Revelar R$ 110 MIL+ COMPRA INICIAL
      // -------------------------------------------------------------
      tl.to(
        costCompraRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.14
      );

      // -------------------------------------------------------------
      // 30% -> 45%: Custos Subtraídos (- R$ 6.000 / ANO e - R$ 5.000 / ANO)
      // -------------------------------------------------------------
      tl.to(
        costMarinaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.28
      );

      tl.to(
        costSeguroRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.36
      );

      // -------------------------------------------------------------
      // 45% -> 55%: - R$ 2.000 / 50H MANUTENÇÃO e - DEPRECIAÇÃO CONTÍNUA
      // -------------------------------------------------------------
      tl.to(
        costManutencaoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.44
      );

      tl.to(
        costDepreciacaoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.51
      );

      // -------------------------------------------------------------
      // 55% -> 65%: Revelar TRABALHO + MAIS CUSTO. MAIS RESPONSABILIDADE.
      // -------------------------------------------------------------
      tl.to(
        workRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.57
      );

      tl.to(
        negativeClosingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        },
        0.63
      );

      // -------------------------------------------------------------
      // 65% -> 75%: TRANSIÇÃO CINEMATOGRÁFICA (Negativo -> Ilhéus Positivo)
      // -------------------------------------------------------------
      tl.to(
        negativeStageRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.09,
          ease: 'power2.in',
          pointerEvents: 'none',
        },
        0.68
      );

      tl.to(
        imageNegativeRef.current,
        {
          opacity: 0,
          scale: 1.12,
          duration: 0.16,
          ease: 'power2.inOut',
        },
        0.67
      );

      tl.to(
        imagePositiveRef.current,
        {
          opacity: 1,
          scale: 1.0,
          duration: 0.18,
          ease: 'power2.inOut',
        },
        0.67
      );

      // -------------------------------------------------------------
      // 75% -> 90%: Revelar COM A OCEAN CLUB / VOCÊ NÃO PRECISA SER DONO...
      // -------------------------------------------------------------
      tl.to(
        positiveStageRef.current,
        {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.04,
        },
        0.75
      );

      tl.to(
        positiveHeadlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.09,
          ease: 'power2.out',
        },
        0.76
      );

      // -------------------------------------------------------------
      // 90% -> 100%: 3 Benefícios Sequenciais + Payoff & CTA
      // -------------------------------------------------------------
      tl.to(
        benefit1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.83
      );

      tl.to(
        benefit2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.88
      );

      tl.to(
        benefit3Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.06,
          ease: 'power2.out',
        },
        0.93
      );

      tl.to(
        positiveClosingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power3.out',
        },
        0.96
      );

      // Final subtle image movement
      tl.to(
        imagePositiveRef.current,
        {
          scale: 1.03,
          duration: 0.25,
          ease: 'none',
        },
        0.75
      );
    }, el);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="duas-formas"
      className="relative w-full h-screen bg-ocean-black text-white overflow-hidden"
    >
      {/* =========================================================
          BACKGROUND 1: ESTADO NEGATIVO (Workshop / Manutenção)
         ========================================================= */}
      <div
        ref={imageNegativeRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform transform-gpu pointer-events-none"
      >
        <Image
          src="/images/compare-ownership.jpg"
          alt="Manutenção de um jet ski próprio em oficina"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.80] contrast-[1.15]"
        />
        {/* Dark Heavy Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/40 pointer-events-none" />
      </div>

      {/* =========================================================
          BACKGROUND 2: ESTADO POSITIVO (Ilhéus / Sunset & Ponte Jorge Amado)
         ========================================================= */}
      <div
        ref={imagePositiveRef}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-transform transform-gpu pointer-events-none opacity-0"
      >
        <Image
          src="/images/compare-oceanclub.png"
          alt="Navegando de jet ski em Ilhéus com a Ponte Jorge Amado ao pôr do sol"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Natural Sunset Glow with Subtle Directional Shadow for Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* =========================================================
          CONTAINER PRINCIPAL DE CONTEÚDO (STICKY 100VH)
         ========================================================= */}
      <div className="relative z-20 w-full h-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center pointer-events-none">
        
        {/* =======================================================
            ESTADO 01: PROPRIEDADE / CUSTOS & TRABALHO (NEGATIVO)
           ======================================================= */}
        <div
          ref={negativeStageRef}
          className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 top-0 bottom-0 flex flex-col justify-center items-start max-w-lg pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 will-change-transform"
        >
          {/* Headline */}
          <div ref={negativeHeadlineRef} className="w-full">
            <span className="block text-xs sm:text-sm uppercase tracking-[0.25em] font-mono text-brand-red font-bold mb-2">
              TER UM JET SKI PRÓPRIO
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-[2.6rem] xl:text-[2.85rem] uppercase text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] flex flex-col gap-1">
              <span className="block leading-none">TER UM JET SKI</span>
              <span className="block leading-none">É TER O TRABALHO</span>
              <span className="block leading-none text-white/90">DELE TAMBÉM.</span>
            </h3>
          </div>

          {/* Valor Principal Inicial: Compra Inicial */}
          <div ref={costCompraRef} className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/20 w-full max-w-sm will-change-transform opacity-0">
            <span className="block font-mono font-extrabold text-2xl sm:text-3xl text-brand-red tracking-tight leading-none">
              R$ 110 MIL+
            </span>
            <span className="block text-xs sm:text-sm uppercase tracking-[0.2em] font-mono text-white/80 font-medium mt-1">
              COMPRA INICIAL
            </span>
          </div>

          {/* Sequência de Custos Subtraídos */}
          <div className="mt-3 space-y-2 w-full max-w-sm">
            {/* 1. Marina */}
            <div
              ref={costMarinaRef}
              className="flex items-baseline justify-between border-b border-white/15 pb-1.5 will-change-transform opacity-0"
            >
              <span className="font-mono font-extrabold text-base sm:text-lg text-brand-red tracking-tight">
                − R$ 6.000 <span className="text-xs text-brand-red/90 font-medium">/ ANO</span>
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-medium">
                MARINA
              </span>
            </div>

            {/* 2. Seguro */}
            <div
              ref={costSeguroRef}
              className="flex items-baseline justify-between border-b border-white/15 pb-1.5 will-change-transform opacity-0"
            >
              <span className="font-mono font-extrabold text-base sm:text-lg text-brand-red tracking-tight">
                − R$ 5.000 <span className="text-xs text-brand-red/90 font-medium">/ ANO</span>
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-medium">
                SEGURO
              </span>
            </div>

            {/* 3. Manutenção */}
            <div
              ref={costManutencaoRef}
              className="flex items-baseline justify-between border-b border-white/15 pb-1.5 will-change-transform opacity-0"
            >
              <span className="font-mono font-extrabold text-base sm:text-lg text-brand-red tracking-tight">
                − R$ 2.000 <span className="text-xs text-brand-red/90 font-medium">/ 50H</span>
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-medium">
                MANUTENÇÃO
              </span>
            </div>

            {/* 4. Depreciação */}
            <div
              ref={costDepreciacaoRef}
              className="flex items-baseline justify-between border-b border-white/15 pb-1.5 will-change-transform opacity-0"
            >
              <span className="font-mono font-extrabold text-base sm:text-lg text-brand-red tracking-tight">
                − DEPRECIAÇÃO
              </span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-medium">
                CONTÍNUA
              </span>
            </div>
          </div>

          {/* O Custo Invisível: Trabalho */}
          <div ref={workRef} className="mt-3.5 pt-3 border-t border-white/15 w-full max-w-sm will-change-transform opacity-0">
            <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-brand-red font-bold mb-1">
              TRABALHO
            </span>
            <p className="font-mono text-xs sm:text-sm text-white/90 tracking-wide font-medium">
              MARINA · MANUTENÇÃO · DOCUMENTAÇÃO · GESTÃO
            </p>
          </div>

          {/* Fechamento do Estado Negativo */}
          <div ref={negativeClosingRef} className="mt-3 pt-0.5 will-change-transform opacity-0">
            <p className="font-display font-bold text-sm sm:text-base uppercase tracking-widest text-white">
              MAIS CUSTO. MAIS RESPONSABILIDADE.
            </p>
          </div>
        </div>

        {/* =======================================================
            ESTADO 02: OCEAN CLUB (LIBERDADE, GESTÃO & EXPERIÊNCIA)
           ======================================================= */}
        <div
          ref={positiveStageRef}
          className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 top-0 bottom-0 flex flex-col justify-center items-start max-w-xl pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 will-change-transform opacity-0"
        >
          {/* Headline Positiva */}
          <div ref={positiveHeadlineRef} className="w-full">
            <span className="block text-xs sm:text-sm uppercase tracking-[0.25em] font-mono text-brand-bright font-bold mb-2">
              COM A OCEAN CLUB
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-[2.6rem] xl:text-[2.85rem] uppercase text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] flex flex-col gap-1">
              <span className="block leading-none">VOCÊ NÃO PRECISA</span>
              <span className="block leading-none">SER DONO PARA</span>
              <span className="block leading-none text-brand-bright">TER O MAR.</span>
            </h3>
          </div>

          {/* 3 Benefícios Principais com Forte Presença e Espaçamento Harmonioso */}
          <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 w-full max-w-md">
            {/* Benefit 1 */}
            <div
              ref={benefit1Ref}
              className="border-l-2 border-brand-bright pl-4 py-1 will-change-transform opacity-0"
            >
              <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wider leading-snug">
                1/6 DA COTA
              </h4>
              <p className="text-sm sm:text-base text-white/90 font-normal font-sans mt-0.5">
                Uma fração do investimento.
              </p>
            </div>

            {/* Benefit 2 */}
            <div
              ref={benefit2Ref}
              className="border-l-2 border-brand-bright pl-4 py-1 will-change-transform opacity-0"
            >
              <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wider leading-snug">
                GESTÃO INCLUSA
              </h4>
              <p className="text-sm sm:text-base text-white/90 font-normal font-sans mt-0.5">
                Marina, manutenção e operação.
              </p>
            </div>

            {/* Benefit 3 */}
            <div
              ref={benefit3Ref}
              className="border-l-2 border-brand-bright pl-4 py-1 will-change-transform opacity-0"
            >
              <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wider leading-snug">
                PRONTO PARA USAR
              </h4>
              <p className="text-sm sm:text-base text-white/90 font-normal font-sans mt-0.5">
                Você chega e navega.
              </p>
            </div>
          </div>

          {/* Payoff & CTA */}
          <div
            ref={positiveClosingRef}
            className="mt-6 sm:mt-7 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full max-w-md will-change-transform opacity-0 pointer-events-auto"
          >
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-base uppercase tracking-[0.2em] text-white leading-tight">
                MENOS POSSE.
              </span>
              <span className="font-display font-bold text-sm sm:text-base uppercase tracking-[0.2em] text-brand-bright leading-tight">
                MAIS MAR.
              </span>
            </div>

            <CTAButton
              variant="primary-red"
              size="sm"
              href="#planos"
              icon="arrow"
              className="text-xs sm:text-sm px-6 py-3 font-display uppercase tracking-widest font-semibold shadow-2xl shadow-red-950/80 self-start sm:self-auto"
            >
              Conheça as Cotas
            </CTAButton>
          </div>
        </div>

      </div>
    </section>
  );
}
