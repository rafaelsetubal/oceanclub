'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function SectionExperience() {
  return (
    <section id="experiencia" className="relative isolate overflow-hidden bg-[#03111a] text-white">
      <div className="relative min-h-[390px] sm:min-h-[440px] lg:min-h-[470px]">
        <Image src="/images/bridge-ilheus.jpg" alt="Vista aérea da Baía do Pontal e Ponte Jorge Amado em Ilhéus" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b10]/95 via-[#020b10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b10]/65 via-transparent to-[#020b10]/15" />

        <div className="relative mx-auto flex min-h-[390px] max-w-[1440px] flex-col justify-center px-6 py-12 sm:min-h-[440px] sm:px-10 lg:min-h-[470px] lg:px-[5.4%]">
          <div className="max-w-[360px]">
            <p className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70"><span>05</span><span className="h-px w-6 bg-white/45" />Ilhéus</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight sm:text-5xl lg:text-[3.7rem]">O mar é<br />o destino.</h2>
            <p className="mt-3 max-w-[250px] font-display text-base font-medium uppercase leading-tight tracking-wide">A cidade é o ponto<br />de partida.</p>
          </div>

          <div className="mt-8 grid max-w-[850px] grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 sm:gap-x-7 lg:mt-12">
            {[
              ['PRAIAS DO SUL', 'Paisagens do litoral'],
              ['PONTE JORGE AMADO', 'Cartão-postal'],
              ['BAÍA DO PONTAL', 'Encontro com a cidade'],
              ['LITORAL DE ILHÉUS', 'Cenários incríveis'],
            ].map(([title, subtitle]) => (
              <div key={title} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/80 text-xs font-bold text-white" aria-hidden="true">→</span>
                <p className="font-display text-xs sm:text-sm font-semibold uppercase leading-tight tracking-[0.08em] text-white">{title}<span className="mt-1 block font-sans text-xs font-normal normal-case tracking-normal text-white/80">{subtitle}</span></p>
              </div>
            ))}
          </div>

          <div className="mt-5 max-w-[280px] sm:mt-0 sm:absolute sm:right-10 sm:top-12 sm:max-w-[240px] lg:right-[5.4%] lg:top-1/2 lg:-translate-y-1/2">
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Navegue pela Baía do Pontal, passe pela Ponte Jorge Amado e descubra um litoral mais bonito visto da água.</p>
            <a href="#planos" className="mt-3 inline-flex min-h-9 items-center gap-2 border border-white/80 px-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-[#071A2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Escolher meu jet ski <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-[#F4F1EA] text-[#071A2B]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-[5.4%] lg:py-28">
          <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto] sm:items-end sm:mb-9">
            <div>
              <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#071A2B]/80 font-bold"><span>06</span><span className="h-px w-5 bg-[#071A2B]/40" />Momentos no mar</p>
              <h3 className="font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight sm:text-[2.7rem]">É chegar,<br className="sm:hidden" /> pegar e navegar.</h3>
              <p className="mt-3 max-w-[420px] text-base sm:text-lg leading-relaxed text-[#071A2B]/80">Um pouco do que espera por você no mar de Ilhéus.</p>
            </div>
            <p className="self-start border-l border-[#071A2B]/25 pl-4 text-sm sm:text-base leading-relaxed text-[#071A2B]/80 sm:self-end">Fotos e vídeos do Instagram.<br /><span className="text-xs sm:text-sm font-medium">Novos momentos em breve.</span></p>
          </div>
          <div className="social-gallery grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {[
              ['Pôr do sol na baía', false],
              ['Passeio de jet ski', true],
              ['Ponte Jorge Amado', true],
              ['Um dia no mar', true],
              ['Litoral de Ilhéus', false],
            ].map(([label, video], index) => (
              <div key={label as string} role="img" aria-label={`Prévia ilustrativa: ${label}`} className={`social-tile social-tile-${index + 1} relative aspect-[.82] overflow-hidden sm:aspect-[.86]`}>
                <div className="social-tile-glow absolute inset-0" aria-hidden="true" />
                <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute right-3 top-3 h-4 w-4 fill-none stroke-white/85 stroke-[1.7]"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" className="fill-white/85 stroke-none" /></svg>
                <span className="absolute left-4 top-4 rounded bg-black/40 px-2.5 py-1 text-xs uppercase tracking-wider text-white font-medium">{video ? 'Vídeo em breve' : 'Foto em breve'}</span>
                <span className="absolute bottom-4 left-4 right-4 z-10 font-display text-xs font-semibold uppercase leading-tight tracking-wide text-white sm:text-sm">{label as string}</span>
                <span className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/75 to-transparent" aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#071A2B]/75 font-medium">Galeria ilustrativa · Fotos e vídeos em breve.</p>
        </div>
      </div>

      <style jsx>{`
        .social-tile { background: #a5a9a9; border-radius: 12px; } .social-tile-glow { background: linear-gradient(145deg, rgba(255,255,255,.18), transparent); }
        .social-tile::after { content: ''; position: absolute; inset: 0; border: 1px solid rgba(255,255,255,.15); pointer-events: none; }
        .social-tile > span:last-of-type { z-index: 0; }
      `}</style>
    </section>
  );
}

