'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Compass, Anchor, ShieldCheck, Waves, Info } from 'lucide-react';
import { TideChart } from '@/components/TideChart';
import { CTAButton } from '@/components/CTAButton';
import { cn } from '@/lib/utils';

export default function MarePage() {
  // Date selection state (defaults to today)
  const today = new Date();
  const getFormattedYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const todayStr = getFormattedYMD(today);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getFormattedYMD(yesterday);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = getFormattedYMD(tomorrow);

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  return (
    <main className="min-h-screen bg-[#020912] text-white selection:bg-[#16C4E8]/30 selection:text-white">
      {/* Top Floating Minimal Bar */}
      <header className="sticky top-0 z-50 bg-[#03182D]/90 backdrop-blur-md border-b border-white/10 py-3.5 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#16C4E8]" />
              <span className="hidden sm:inline">Voltar ao site</span>
            </Link>

            <span className="hidden sm:inline text-white/20">|</span>

            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Ocean Club"
                width={120}
                height={55}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </Link>
          </div>

          <CTAButton
            variant="header-pill"
            size="sm"
            isWhatsApp
            whatsAppOptions={{ source: 'mare_page' }}
            icon="arrow"
            className="h-[36px] text-[10px]"
          >
            Consultar Cotas
          </CTAButton>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {/* Page Eyebrow & Title */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <Waves className="w-3.5 h-3.5 text-[#16C4E8]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#16C4E8] font-semibold">
              Ilhéus · Marinha do Brasil (DHN)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Tábua de Marés
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/60 max-w-xl mx-auto">
            Consulte a altura da água, horários de preamar e baixa-mar no Porto de Ilhéus Malhado para navegar com segurança e liberdade.
          </p>

          {/* Quick Date Switcher Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <button
              onClick={() => setSelectedDate(yesterdayStr)}
              className={cn(
                'px-4 py-2 rounded-full border transition-all duration-200',
                selectedDate === yesterdayStr
                  ? 'bg-[#16C4E8] text-[#03182D] border-[#16C4E8] font-bold shadow-md shadow-[#16C4E8]/20'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              Ontem
            </button>

            <button
              onClick={() => setSelectedDate(todayStr)}
              className={cn(
                'px-4 py-2 rounded-full border transition-all duration-200',
                selectedDate === todayStr
                  ? 'bg-[#16C4E8] text-[#03182D] border-[#16C4E8] font-bold shadow-md shadow-[#16C4E8]/20'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              Hoje
            </button>

            <button
              onClick={() => setSelectedDate(tomorrowStr)}
              className={cn(
                'px-4 py-2 rounded-full border transition-all duration-200',
                selectedDate === tomorrowStr
                  ? 'bg-[#16C4E8] text-[#03182D] border-[#16C4E8] font-bold shadow-md shadow-[#16C4E8]/20'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              Amanhã
            </button>

            <div className="relative inline-flex items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  if (e.target.value) setSelectedDate(e.target.value);
                }}
                className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-white/80 focus:outline-none focus:border-[#16C4E8] transition-colors"
                title="Escolher outra data"
              />
            </div>
          </div>
        </div>

        {/* The Graphic Tide Card */}
        <div className="mb-12">
          <TideChart dateStr={selectedDate} showShare={true} />
        </div>

        {/* Nautical Guide for Sailors & Jet Skiers */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-5 h-5 text-[#16C4E8]" />
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-wide">
              Guia Prático de Navegação em Ilhéus
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#16C4E8]/10 text-[#16C4E8] flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">Baía do Pontal &amp; Rio Cachoeira</h3>
                  <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
                    A melhor janela para cruzar a baía e subir o Rio Cachoeira é entre 2 horas antes e 2 horas depois da <strong>Preamar</strong>. Nesse período, a profundidade nos canais é máxima e não há risco com bancos de areia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#16C4E8]/10 text-[#16C4E8] flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">Barra de Ilhéus &amp; Ponte Jorge Amado</h3>
                  <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
                    Durante a <strong>vazante</strong> (quando a maré está descendo), a corrente na boca da barra em direção ao mar aberto é mais intensa. Ao navegar sob a ponte, reduza a velocidade e mantenha atenção redobrada.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#16C4E8]/10 text-[#16C4E8] flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">Marés de Sizígia (Lua Cheia e Nova)</h3>
                  <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
                    Nas luas cheia e nova, a atração lunar e solar se somam, gerando marés mais altas na cheia e mais secas na baixa. A amplitude chega a quase 2 metros em Ilhéus.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#16C4E8]/10 text-[#16C4E8] flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1">Marés de Quadratura (Quartos Lunares)</h3>
                  <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
                    Nas luas quarto minguante e quarto crescente, a variação da maré é moderada e a correnteza é mais amena, excelente para passeios tranquilos em família.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ocean Club Pitch Card */}
        <div className="rounded-2xl bg-gradient-to-r from-[#03182D] to-[#062444] border border-[#16C4E8]/30 p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#16C4E8]/10 rounded-full blur-[80px] pointer-events-none" />

          <span className="inline-block px-3 py-1 rounded-full bg-[#16C4E8]/10 border border-[#16C4E8]/20 text-[#16C4E8] text-xs font-mono uppercase tracking-widest font-semibold mb-4">
            Liberdade sem complicação
          </span>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight uppercase mb-3">
            Navegue no mar de Ilhéus <br className="hidden sm:block" />
            na hora certa, sem trabalho nenhum.
          </h2>

          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Com a cota Ocean Club, você tem um Sea-Doo de última geração 100% revisado, abastecido e pronto na marina. Basta agendar pelo app e aproveitar o melhor do mar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton
              variant="primary-red"
              size="md"
              isWhatsApp
              whatsAppOptions={{ source: 'mare_page' }}
              icon="arrow"
            >
              Consultar Cotas Disponíveis
            </CTAButton>

            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors underline underline-offset-4"
            >
              Conhecer os Planos &rarr;
            </Link>
          </div>
        </div>

        {/* Editorial Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5 text-center text-xs font-mono text-white/40 space-y-2">
          <p>
            Fonte dos Dados: Marinha do Brasil · Diretoria de Hidrografia e Navegação (DHN) · Porto de Ilhéus Malhado
          </p>
          <p>
            © {new Date().getFullYear()} Ocean Club Cotas Náuticas · Ilhéus &amp; Itabuna, Bahia. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </main>
  );
}
