'use client';

import React from 'react';
import { CTAButton } from './CTAButton';
import { Anchor, Shield, Sparkles, KeyRound } from 'lucide-react';

export function NextSectionPreview() {
  const pillars = [
    {
      icon: KeyRound,
      title: 'Propriedade Inteligente',
      description: 'Você é dono da cota registrada. Sem pagar 100% do custo de aquisição.',
    },
    {
      icon: Shield,
      title: 'Zero Preocupação',
      description: 'Marina, seguro, limpeza, revisão e marinheiro sob gestão da Ocean Club.',
    },
    {
      icon: Sparkles,
      title: 'Experiência Náutica VIP',
      description: 'Combine sua saída com a equipe e conheça as orientações para navegar em Ilhéus.',
    },
  ];

  return (
    <section
      id="conhecer"
      className="relative z-30 bg-ocean-primary border-t border-white/10 py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ocean/80 border border-brand-cyan/30 text-brand-cyan text-[11px] uppercase tracking-[0.25em] font-medium mb-4">
            <Anchor className="w-3.5 h-3.5" />
            <span>O Próximo Passo</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            Como Funciona a <span className="text-brand-cyan">Ocean Club</span>
          </h2>
          
          <p className="mt-4 text-ocean-offwhite/80 text-sm sm:text-base leading-relaxed">
            Navegar em Ilhéus com a Ocean Club combina a liberdade de ter sua própria embarcação com a economia e a comodidade de um clube náutico exclusivo.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative p-8 bg-ocean/40 border border-white/10 hover:border-brand-cyan/60 transition-all duration-300 hover:-translate-y-1 hover:bg-ocean/70"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-ocean-primary border border-brand-cyan/40 text-brand-cyan mb-6 group-hover:scale-110 group-hover:text-white group-hover:bg-brand-cyan transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-ocean-offwhite/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-ocean to-ocean-blue/30 border border-brand-cyan/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
              Pronto para entrar na água?
            </h4>
            <p className="text-xs sm:text-sm text-ocean-offwhite/80 mt-1">
              Fale agora com nosso especialista e reserve sua cota em Ilhéus.
            </p>
          </div>
          <CTAButton
            variant="primary-red"
            size="lg"
            isWhatsApp
            whatsAppOptions={{ source: 'floating' }}
            icon="whatsapp"
            className="flex-shrink-0"
          >
            Falar no WhatsApp
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

