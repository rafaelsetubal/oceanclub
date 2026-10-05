'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after small scroll or 1.5 seconds
    const timer = setTimeout(() => setIsVisible(true), 1500);
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const whatsAppUrl = getWhatsAppUrl({ source: 'floating' });

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
    >
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp da Ocean Club"
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-full shadow-2xl shadow-black/50 hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white text-emerald-600" />
        </span>

        <MessageCircle className="w-5 h-5 fill-current transition-transform duration-300 group-hover:rotate-12" />

        <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide hidden sm:inline-block pr-1">
          Falar no WhatsApp
        </span>
      </a>
    </div>
  );
}
