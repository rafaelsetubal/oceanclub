'use client';

import React from 'react';
import Image from 'next/image';
import { CTAButton } from './CTAButton';

export function SectionFinalCTA() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="relative min-h-[340px] sm:min-h-[390px] lg:min-h-[430px]">
        <Image src="/images/compare-oceanclub.png" alt="Pôr do sol sobre a Baía do Pontal em Ilhéus" fill unoptimized sizes="100vw" className="object-cover object-[center_28%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020a10]/80 via-[#020a10]/15 to-[#020a10]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020a10]/45 via-transparent to-[#020a10]/15" />
        <div className="relative mx-auto grid min-h-[340px] max-w-[1440px] grid-cols-1 items-center gap-8 px-6 py-12 sm:min-h-[390px] sm:px-10 md:grid-cols-[1fr_auto] lg:min-h-[430px] lg:px-[5.4%]">
          <div className="max-w-[620px]">
            <p className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75"><span>08</span><span className="h-px w-6 bg-white/50" />Seu próximo capítulo</p>
            <h2 className="font-display text-[2.15rem] font-bold uppercase leading-[0.91] tracking-tight sm:text-5xl lg:text-[3.8rem]">Mais mar.<br />Na sua vida.</h2>
            <p className="mt-3 font-display text-lg font-bold uppercase leading-tight tracking-wide sm:text-xl">Conheça sua próxima cota náutica.</p>
            <p className="mt-5 max-w-[420px] text-sm leading-relaxed text-white/80">Compare os modelos e converse com a equipe sobre disponibilidade, custos e regras de uso.</p>
          </div>
          <CTAButton variant="primary-red" size="lg" isWhatsApp icon="arrow" className="h-[54px] justify-self-start px-8 text-xs tracking-[0.12em] md:justify-self-end">Consultar disponibilidade</CTAButton>
        </div>
      </div>
    </section>
  );
}

