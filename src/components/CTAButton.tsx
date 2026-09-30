'use client';

import React, { useRef } from 'react';
import { getWhatsAppUrl, WhatsAppLinkOptions } from '@/lib/whatsapp';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary-red' | 'link-whatsapp' | 'header-pill' | 'pill-outline' | 'pill-solid' | 'primary' | 'secondary' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isWhatsApp?: boolean;
  whatsAppOptions?: WhatsAppLinkOptions;
  children: React.ReactNode;
  icon?: 'arrow' | 'whatsapp' | 'none';
  className?: string;
}

export function CTAButton({
  variant = 'primary-red',
  size = 'md',
  href,
  isWhatsApp = false,
  whatsAppOptions,
  children,
  icon = 'none',
  className,
  ...props
}: CTAButtonProps) {
  const contactDialog = useRef<HTMLDialogElement>(null);
  const baseClasses =
    'relative inline-flex items-center justify-center uppercase font-medium transition-all duration-300 select-none cursor-pointer';

  const variantClasses: Record<string, string> = {
    'primary-red':
      'h-[50px] sm:h-[52px] px-7 sm:px-8 rounded-[4px] bg-brand-red text-white hover:bg-[#d92231] tracking-[0.12em] font-display font-semibold text-xs sm:text-[13px] border-none shadow-none',
    primary:
      'h-[50px] sm:h-[52px] px-7 sm:px-8 rounded-[4px] bg-brand-red text-white hover:bg-[#d92231] tracking-[0.12em] font-display font-semibold text-xs sm:text-[13px] border-none shadow-none',
    'link-whatsapp':
      'bg-transparent text-white hover:text-white font-sans text-xs sm:text-[13px] tracking-[0.15em] font-medium px-0 py-2 border-b border-transparent hover:border-white/70 rounded-none gap-2 h-auto',
    'header-pill':
      'h-[40px] sm:h-[44px] px-5 sm:px-6 rounded-full border border-white/45 text-white hover:bg-white hover:text-ocean-primary font-sans text-[10px] sm:text-[11px] tracking-[0.18em] transition-all duration-300 gap-2',
    whatsapp:
      'h-[40px] sm:h-[44px] px-5 sm:px-6 rounded-full border border-white/45 text-white hover:bg-white hover:text-ocean-primary font-sans text-[10px] sm:text-[11px] tracking-[0.18em] transition-all duration-300 gap-2',
    'pill-outline':
      'h-[50px] px-7 rounded-full border border-white/60 text-white hover:bg-white hover:text-ocean-primary font-sans text-xs tracking-[0.15em]',
    'pill-solid':
      'h-[50px] px-7 rounded-full bg-white text-ocean-primary hover:bg-ocean-offwhite font-sans text-xs tracking-[0.15em]',
    secondary:
      'h-[50px] px-7 rounded-full border border-white/60 text-white hover:bg-white hover:text-ocean-primary font-sans text-xs tracking-[0.15em]',
  };

  const finalHref = isWhatsApp ? getWhatsAppUrl(whatsAppOptions) : href;

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      <span>{children}</span>
      {icon === 'arrow' && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      {icon === 'whatsapp' && (
        <MessageCircle className="w-3.5 h-3.5 opacity-90 transition-transform duration-300 group-hover:scale-110" />
      )}
    </span>
  );

  if (isWhatsApp && !whatsAppOptions?.phone) {
    return <>
      <button type="button" onClick={() => contactDialog.current?.showModal()} className={cn('group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4', baseClasses, variantClasses[variant], className)}>{content}</button>
      <dialog ref={contactDialog} aria-label="Atendimento Ocean Club" className="m-auto w-[calc(100%_-_2rem)] max-w-md rounded-xl border border-white/20 bg-[#071A2B] p-8 text-left text-white backdrop:bg-black/70">
        <h2 className="font-display text-3xl font-bold uppercase">Seu próximo dia no mar</h2>
        <p className="mt-4 text-base leading-relaxed text-white/75">O canal de atendimento da Ocean Club será disponibilizado em breve. Por enquanto, compare as cotas e conheça a proposta.</p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">Disponibilidade, regras de reserva e condições de contratação serão confirmadas no atendimento.</p>
        <form method="dialog" className="mt-6"><button className="min-h-12 rounded border border-white/50 px-6 text-sm" autoFocus>Voltar à página</button></form>
      </dialog>
    </>;
  }
  if (finalHref) {
    const isExternal = finalHref.startsWith('http') || isWhatsApp;
    return (
      <a
        onClick={props.onClick ? (event) => props.onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>) : undefined}
        href={finalHref}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn(
          'group',
          baseClasses,
          variantClasses[variant] || variantClasses['primary-red'],
          className
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(
        'group',
        baseClasses,
        variantClasses[variant] || variantClasses['primary-red'],
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
}
