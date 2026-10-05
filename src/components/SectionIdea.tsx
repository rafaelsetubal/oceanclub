'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, X, ArrowRight, Volume2, VolumeX } from 'lucide-react';

export function SectionIdea() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMuted, setModalMuted] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      if (modalVideoRef.current) {
        modalVideoRef.current.currentTime = inlineVideoRef.current ? inlineVideoRef.current.currentTime : 0;
        modalVideoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setIsModalOpen(false);
  };

  const toggleModalAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalVideoRef.current) {
      const nextMuted = !modalVideoRef.current.muted;
      modalVideoRef.current.muted = nextMuted;
      setModalMuted(nextMuted);
    }
  };

  return (
    <section
      id="o-que-e"
      className="relative z-30 bg-[#F4F1EA] text-[#071A2B] py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Editorial Chapter Header */}
        <div className="flex items-center justify-between border-b border-[#071A2B]/20 pb-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-bold text-[#071A2B]/80 tracking-wider">
              01
            </span>
            <span className="w-6 h-[1px] bg-[#071A2B]/40 inline-block" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#071A2B] font-sans">
              A IDEIA
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] font-mono text-[#071A2B]/70 font-medium">
            OCEAN CLUB · MODELO NÁUTICO
          </span>
        </div>

        {/* Main 2-Column Balanced Grid with Enlarged Presence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Textual Narrative (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div>
              {/* Headline with Contrasting Typography */}
              <h2 className="select-none">
                <span className="block font-sans font-light text-2.5xl sm:text-3xl md:text-[2.4rem] lg:text-[2.8rem] leading-[1.08] tracking-tight uppercase text-[#071A2B]">
                  COMPARTILHE
                </span>
                <span className="block font-sans font-light text-2.5xl sm:text-3xl md:text-[2.4rem] lg:text-[2.8rem] leading-[1.08] tracking-tight uppercase text-[#071A2B]">
                  UM JET SKI.
                </span>
                <span className="block font-display font-bold text-3.5xl sm:text-4.5xl md:text-[3.2rem] lg:text-[3.6rem] leading-[0.98] tracking-tight uppercase text-[#071A2B] mt-0.5 sm:mt-1">
                  VIVA MAIS O MAR.
                </span>
              </h2>

              {/* Subtitle & Body Text */}
              <div className="mt-5 sm:mt-6 space-y-3 max-w-[500px]">
                <p className="text-base sm:text-lg font-semibold text-[#071A2B] leading-relaxed">
                  Uma nova forma de acessar um jet ski em Ilhéus.
                </p>
                <p className="text-sm sm:text-base text-[#071A2B]/85 font-normal leading-[1.7]">
                  Em vez de arcar sozinho com compra, marina, manutenção e seguro, você compartilha a propriedade e os custos — e aproveita o que realmente importa: navegar.
                </p>
              </div>
            </div>

            {/* 3 Value Pillars (Micro-Specs) */}
            <div className="grid grid-cols-3 gap-4 pt-6 sm:pt-7 mt-6 sm:mt-7 border-t border-[#071A2B]/15 max-w-[500px]">
              <div>
                <span className="block font-display text-xl sm:text-2xl font-bold text-[#071A2B]">1/5</span>
                <span className="block text-xs sm:text-sm text-[#071A2B]/80 font-medium leading-tight mt-1">Cota Fracionada</span>
              </div>
              <div>
                <span className="block font-display text-xl sm:text-2xl font-bold text-[#071A2B]">Gestão</span>
                <span className="block text-xs sm:text-sm text-[#071A2B]/80 font-medium leading-tight mt-1">Gestão e Marina</span>
              </div>
              <div>
                <span className="block font-display text-xl sm:text-2xl font-bold text-[#071A2B]">Ilhéus</span>
                <span className="block text-xs sm:text-sm text-[#071A2B]/80 font-medium leading-tight mt-1">Pronto na Água</span>
              </div>
            </div>

            {/* Link CTA */}
            <div className="mt-7 sm:mt-8">
              <a
                href="#planos"
                className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#071A2B] py-1.5 relative"
              >
                <span>Ver cotas</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#071A2B]" />
                <span className="absolute bottom-0 left-0 w-12 h-[1.5px] bg-[#071A2B] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Enlarged Cinematic Video Canvas (lg:col-span-6) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            <div
              onClick={openModal}
              className="group relative w-full max-w-[520px] lg:max-w-[540px] aspect-[16/11] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#071A2B] shadow-2xl shadow-[#071A2B]/12 cursor-pointer select-none transition-all duration-300 hover:shadow-[0_20px_50px_rgba(7,26,43,0.22)] hover:scale-[1.01]"
            >
              {/* Inline Background Video (Autoplay / Muted) */}
              <video
                ref={inlineVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              >
                <source src="/videos/secao2.mp4" type="video/mp4" />
              </video>

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-white/80 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  EXPERIÊNCIA ILHÉUS
                </span>
              </div>

              {/* Centered Minimal Play Pill */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="px-5 py-2.5 rounded-full bg-white/95 group-hover:bg-white text-[#071A2B] text-xs tracking-[0.2em] uppercase font-semibold flex items-center gap-2.5 transition-all duration-300 shadow-2xl group-hover:scale-105">
                  <Play className="w-3.5 h-3.5 fill-[#071A2B] text-[#071A2B]" />
                  <span>ASSISTIR VÍDEO</span>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between text-white/70 text-[10px] font-mono pointer-events-none">
                <span>SEÇÃO 02</span>
                <span className="tracking-wider">TOQUE PARA AMPLIAR</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          LIGHTBOX MODAL (Plays full 9:16 vertical video with sound)
         ========================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Fechar vídeo"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-[380px] sm:max-w-[420px] max-h-[85vh] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              autoPlay
              controls
              playsInline
              loop
              className="w-full h-full object-cover"
            >
              <source src="/videos/secao2.mp4" type="video/mp4" />
            </video>

            <button
              onClick={toggleModalAudio}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
              aria-label={modalMuted ? 'Ativar som' : 'Mutar som'}
            >
              {modalMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

