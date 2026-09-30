import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SectionIdea } from '@/components/SectionIdea';
import { SectionComparison } from '@/components/SectionComparison';
import { SectionHowItWorks } from '@/components/SectionHowItWorks';
import { SectionPlans } from '@/components/SectionPlans';
import { SectionExperience } from '@/components/SectionExperience';
import { SectionTides } from '@/components/SectionTides';
import { SectionFAQ } from '@/components/SectionFAQ';
import { SectionFinalCTA } from '@/components/SectionFinalCTA';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ocean-primary selection:bg-[#071A2B] selection:text-white">
      {/* Persistent Minimal Header */}
      <Header />

      {/* Hero Scroll-Driven Proof of Concept */}
      <Hero />

      {/* SEÇÃO 01 — A IDEIA (Editorial Lifestyle Transition) */}
      <SectionIdea />

      {/* SEÇÃO 02 — A DIFERENÇA (Scroll-Driven: Ter Próprio vs Ocean Club) */}
      <SectionComparison />

      {/* SEÇÃO 03 — PLANOS (Catálogo de modelos e cotas) */}
      <SectionPlans />

      {/* SEÇÃO 04 — COMO FUNCIONA (Da escolha da cota à navegação) */}
      <SectionHowItWorks />

      {/* SEÇÃO 05 — ILHÉUS & PROVA SOCIAL */}
      <SectionExperience />

      {/* SEÇÃO 06 — TÁBUA DE MARÉS (Tempo Real & Ilhéus) */}
      <SectionTides />

      {/* SEÇÃO 07 — DÚVIDAS FREQUENTES */}
      <SectionFAQ />

      {/* SEÇÃO 08 — CTA FINAL */}
      <SectionFinalCTA />

      {/* Editorial Luxury Footer */}
      <footer className="bg-[#02070B] border-t border-white/10 py-12 px-6 text-white/60">
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="whitespace-nowrap font-display tracking-widest uppercase text-white font-bold text-base">
              OCEAN CLUB
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="text-xs font-sans text-white/70">
              Cotas Náuticas Compartilhadas · Ilhéus & Itabuna — Bahia
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-xs font-mono text-white/50 uppercase tracking-wider">
            <a href="#o-que-e" className="hover:text-white transition-colors">
              O que é
            </a>
            <a href="#como-funciona" className="hover:text-white transition-colors">
              Como funciona
            </a>
            <a href="#planos" className="hover:text-white transition-colors">
              Planos
            </a>
            <a href="#experiencia" className="hover:text-white transition-colors">
              Experiência
            </a>
            <a href="/mare" className="text-[#16C4E8] hover:text-white transition-colors">
              Tábua de Marés
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              Dúvidas
            </a>
          </div>

          <p className="text-[11px] font-mono text-white/40">
            © {new Date().getFullYear()} Ocean Club. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

