'use client';

import React from 'react';
import { CTAButton } from './CTAButton';

export function HeroContent() {
  return (
    <div className="relative z-20 w-full h-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center select-none pointer-events-none">
      <div className="w-full max-w-[480px] pt-24 sm:pt-28 pb-12 flex flex-col justify-center items-start pointer-events-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
          <span className="w-5 h-[1px] bg-white/60 inline-block" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-white/75 font-sans">
            ILHÉUS · BAHIA
          </span>
        </div>

        {/* Headline with Refined Typographic Contrast */}
        <h1 className="select-none">
          <span className="font-display font-bold block text-4xl sm:text-5xl md:text-6xl lg:text-[4.0rem] leading-[0.98] tracking-tight uppercase text-white">
            SEU JET SKI.
          </span>
          <span className="font-sans font-light block text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] leading-[1.04] tracking-tight uppercase text-white/95 mt-1 sm:mt-1.5">
            MAIS MAR <br />
            NA SUA ROTINA.
          </span>
        </h1>

        {/* Subcopy */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] md:text-base text-white/80 font-light font-sans max-w-[430px] leading-[1.6]">
          Adquira uma cota de um Sea-Doo em Ilhéus e compartilhe os custos, com operação administrada pela Ocean Club.
        </p>
        <p className="mt-4 text-sm font-medium text-white">Cotas a partir de R$ 17.000 <span className="text-white/70">+ R$ 300/mês</span></p>

        {/* CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <CTAButton
            variant="primary-red"
            size="lg"
            href="#planos"
            icon="arrow"
            className="h-[48px] sm:h-[50px] px-7"
          >
            Ver cotas
          </CTAButton>

          <CTAButton
            variant="link-whatsapp"
            isWhatsApp
            whatsAppOptions={{ source: 'hero_initial' }}
            icon="arrow"
          >
            Consultar disponibilidade
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
