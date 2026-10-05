import React from 'react';
import { TideChart } from './TideChart';
import Link from 'next/link';
import { ArrowRight, Compass, Anchor, Navigation } from 'lucide-react';
import { CTAButton } from './CTAButton';

export function SectionTides() {
  return (
    <section
      id="tabua-de-mares"
      className="relative py-24 sm:py-32 bg-[#020b14] overflow-hidden border-t border-white/5"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#16C4E8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 mb-4">
            <Compass className="w-4 h-4 text-[#16C4E8]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#16C4E8] font-bold">
              Condições Náuticas de Ilhéus
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Tábua de Marés <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/80">
              em Tempo Real
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/85 font-sans leading-relaxed">
            Consulte a variação do nível d&apos;água no Porto de Ilhéus minuto a minuto para planejar a sua navegação na Baía do Pontal, Rio Cachoeira e mar aberto.
          </p>
        </div>

        {/* Live Tide Chart Component */}
        <div className="mb-14">
          <TideChart />
        </div>

        {/* Nautical Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-xl p-6 bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#16C4E8]/15 border border-[#16C4E8]/30 flex items-center justify-center text-[#16C4E8] mb-4">
              <Anchor className="w-5 h-5" />
            </div>
            <h3 className="text-white font-display font-bold text-lg mb-2">
              Baía do Pontal
            </h3>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Maré enchente e preamar oferecem as melhores condições de calado para cruzar o canal e curtir o espelho d&apos;água sem se preocupar com baixios.
            </p>
          </div>

          <div className="rounded-xl p-6 bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#16C4E8]/15 border border-[#16C4E8]/30 flex items-center justify-center text-[#16C4E8] mb-4">
              <Navigation className="w-5 h-5" />
            </div>
            <h3 className="text-white font-display font-bold text-lg mb-2">
              Ponte Jorge Amado
            </h3>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              O cartão-postal de Ilhéus ganha um visual deslumbrante no pôr do sol. Com as marés monitoradas, sua rota de jet ski fica segura em qualquer hora.
            </p>
          </div>

          <div className="rounded-xl p-6 bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#F23343]/15 border border-[#F23343]/30 flex items-center justify-center text-[#F23343] mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-white font-display font-bold text-lg mb-2">
              Pronto para Navegar
            </h3>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Como cotista Ocean Club, você agenda pelo app e encontra o jet ski abastecido, limpo e na rampa pronto para navegar na melhor maré.
            </p>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/mare"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:border-[#16C4E8]/40"
          >
            <span>Ver Tábua Completa &amp; Navegação</span>
            <ArrowRight className="w-4 h-4 text-[#16C4E8]" />
          </Link>

          <CTAButton
            variant="primary-red"
            size="md"
            isWhatsApp
            whatsAppOptions={{ source: 'tides_section' }}
            icon="arrow"
          >
            Quero Navegar em Ilhéus
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
