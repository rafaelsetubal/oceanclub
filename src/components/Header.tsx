'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CTAButton } from './CTAButton';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'O QUE É', href: '#o-que-e' },
    { label: 'COMO FUNCIONA', href: '#como-funciona' },
    { label: 'PLANOS', href: '#planos' },
    { label: 'EXPERIÊNCIA', href: '#experiencia' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#020b10]/90 py-4 backdrop-blur-md sm:py-5">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Brand / Official Ocean Club Logo */}
        <a
          href="#"
          className="group flex items-center transition-opacity duration-300 hover:opacity-90 flex-shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="Ocean Club Cotas Náuticas"
            width={160}
            height={90}
            priority
            unoptimized
            className="h-9 sm:h-11 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation & Right CTA */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          <nav className="flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] lg:text-xs uppercase tracking-[0.16em] font-medium text-white hover:text-white/80 transition-opacity duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop WhatsApp Refined Pill CTA */}
          <CTAButton
            variant="header-pill"
            size="sm"
            isWhatsApp
            whatsAppOptions={{ source: 'header' }}
            icon="arrow"
          >
            Consultar disponibilidade
          </CTAButton>
        </div>

        {/* Mobile Hamburger & Quick CTA */}
        <div className="flex md:hidden items-center gap-3">
          <CTAButton
            variant="header-pill"
            size="sm"
            isWhatsApp
            whatsAppOptions={{ source: 'header' }}
            icon="arrow"
            className="h-[36px] px-3.5 text-[10px]"
          >
            Consultar
          </CTAButton>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:text-white/80 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        inert={!mobileMenuOpen}
        className={cn(
          'fixed inset-x-0 top-full bg-ocean-primary/95 backdrop-blur-xl border-b border-white/10 px-8 py-6 transition-all duration-300 ease-in-out md:hidden shadow-2xl flex flex-col gap-4',
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="flex flex-col divide-y divide-white/5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white/90 hover:text-white py-3.5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="pt-2">
          <CTAButton
            variant="primary-red"
            size="md"
            href="#planos"
            onClick={() => setMobileMenuOpen(false)}
            icon="arrow"
            className="w-full justify-center text-xs"
          >
            Ver cotas
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
