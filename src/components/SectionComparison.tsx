'use client';

import { forwardRef, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CTAButton } from '@/components/CTAButton';

gsap.registerPlugin(ScrollTrigger);

export function SectionComparison() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const imageNegativeRef = useRef<HTMLDivElement | null>(null);
  const imagePositiveRef = useRef<HTMLDivElement | null>(null);

  const negativeStageRef = useRef<HTMLDivElement | null>(null);
  const negativeHeadlineRef = useRef<HTMLDivElement | null>(null);
  const costCompraRef = useRef<HTMLDivElement | null>(null);
  const costMarinaRef = useRef<HTMLDivElement | null>(null);
  const costSeguroRef = useRef<HTMLDivElement | null>(null);
  const costManutencaoRef = useRef<HTMLDivElement | null>(null);
  const costDepreciacaoRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const negativeClosingRef = useRef<HTMLDivElement | null>(null);

  const positiveStageRef = useRef<HTMLDivElement | null>(null);
  const positiveHeadlineRef = useRef<HTMLDivElement | null>(null);
  const benefit1Ref = useRef<HTMLDivElement | null>(null);
  const benefit2Ref = useRef<HTMLDivElement | null>(null);
  const benefit3Ref = useRef<HTMLDivElement | null>(null);
  const positiveClosingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(negativeStageRef.current, { opacity: 0, pointerEvents: 'none' });
        gsap.set(imagePositiveRef.current, { opacity: 1 });
        gsap.set(positiveStageRef.current, { opacity: 1 });
        gsap.set([positiveHeadlineRef.current, benefit1Ref.current, benefit2Ref.current, benefit3Ref.current, positiveClosingRef.current], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(imageNegativeRef.current, { opacity: 1, scale: 1 });
      gsap.set(imagePositiveRef.current, { opacity: 0, scale: 1.05 });

      gsap.set(negativeStageRef.current, { opacity: 1, pointerEvents: 'auto', y: 0 });
      gsap.set(negativeHeadlineRef.current, { opacity: 1, y: 0 });
      gsap.set(
        [
          costCompraRef.current,
          costMarinaRef.current,
          costSeguroRef.current,
          costManutencaoRef.current,
          costDepreciacaoRef.current,
          workRef.current,
          negativeClosingRef.current,
          positiveHeadlineRef.current,
          benefit1Ref.current,
          benefit2Ref.current,
          benefit3Ref.current,
          positiveClosingRef.current,
        ],
        { opacity: 1, y: 0 },
      );
      gsap.set(positiveStageRef.current, { opacity: 0, pointerEvents: 'none', y: 25 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(imageNegativeRef.current, { scale: 1.04, duration: 0.5, ease: 'none' }, 0);

      tl.to(costCompraRef.current, { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.14);
      tl.to(costMarinaRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.28);
      tl.to(costSeguroRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.36);
      tl.to(costManutencaoRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.44);
      tl.to(costDepreciacaoRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.51);
      tl.to(workRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.57);
      tl.to(negativeClosingRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.63);

      tl.to(negativeStageRef.current, { opacity: 0, y: -20, duration: 0.09, ease: 'power2.in', pointerEvents: 'none' }, 0.68);
      tl.to(imageNegativeRef.current, { opacity: 0, scale: 1.12, duration: 0.16, ease: 'power2.inOut' }, 0.67);
      tl.to(imagePositiveRef.current, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.inOut' }, 0.67);

      tl.to(positiveStageRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.04 }, 0.75);
      tl.to(positiveHeadlineRef.current, { opacity: 1, y: 0, duration: 0.09, ease: 'power2.out' }, 0.76);
      tl.to(benefit1Ref.current, { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' }, 0.83);
      tl.to(benefit2Ref.current, { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' }, 0.88);
      tl.to(benefit3Ref.current, { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' }, 0.93);
      tl.to(positiveClosingRef.current, { opacity: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0.96);
      tl.to(imagePositiveRef.current, { scale: 1.03, duration: 0.25, ease: 'none' }, 0.75);
    }, el);

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="comparison-title"
      className="relative h-screen min-h-[720px] overflow-hidden bg-ocean-black text-white"
    >
      <div ref={imageNegativeRef} className="absolute inset-0 h-full w-full overflow-hidden will-change-transform pointer-events-none">
        <Image
          src="/images/compare-ownership.jpg"
          alt="Manutenção de um jet ski próprio em oficina"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.80] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,.92)_0%,rgba(2,7,11,.66)_44%,rgba(2,7,11,.22)_100%)]" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      <div ref={imagePositiveRef} className="absolute inset-0 h-full w-full overflow-hidden opacity-0 will-change-transform pointer-events-none">
        <Image
          src="/images/compare-oceanclub.png"
          alt="Navegando de jet ski em Ilhéus com a Ponte Jorge Amado ao pôr do sol"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_65%] brightness-[0.82] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,.88)_0%,rgba(2,7,11,.48)_52%,rgba(2,7,11,.28)_100%)]" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      <div className="pointer-events-none absolute left-6 right-6 top-6 z-20 flex items-center justify-between sm:left-12 sm:right-12 lg:left-16 lg:right-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-wider text-white/70">02</span>
          <span className="h-px w-7 bg-white/35" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">A diferença</span>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 sm:block">Propriedade x Ocean Club</span>
      </div>

      <div ref={negativeStageRef} className="absolute inset-x-6 bottom-0 top-0 z-10 flex max-w-xl flex-col justify-center pt-28 pb-8 will-change-transform sm:inset-x-12 sm:pt-32 lg:inset-x-16">
        <div ref={negativeHeadlineRef}>
          <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-red sm:text-xs">
            TER UM JET SKI SOZINHO
          </span>
          <h2 id="comparison-title" className="font-display text-4xl font-bold uppercase leading-[1.08] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] sm:text-5xl lg:text-[3.5rem]">
            Ter é bom.
            <br />
            Bancar tudo pesa.
          </h2>
        </div>

        <div className="mt-6 w-full max-w-sm">
          <div ref={costCompraRef} className="will-change-transform opacity-0">
            <span className="block font-mono text-xl font-bold leading-none tracking-tight text-brand-red sm:text-2xl">R$ 110 MIL+</span>
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-white/70">Compra inicial</span>
          </div>

          <div className="mt-3 w-full max-w-sm space-y-2">
            <CostLine ref={costMarinaRef} value="- R$ 6.000 / ANO" label="Marina" />
            <CostLine ref={costSeguroRef} value="- R$ 5.000 / ANO" label="Seguro" />
            <CostLine ref={costManutencaoRef} value="- R$ 2.000 / 50H" label="Manutenção" />
            <CostLine ref={costDepreciacaoRef} value="- Depreciação contínua" label="Revenda" />
          </div>

          <div ref={workRef} className="mt-4 border-l-2 border-brand-red pl-4 opacity-0 will-change-transform">
            <p className="text-sm font-semibold text-white">+ Transporte · Limpeza · Checklist</p>
          </div>

          <div ref={negativeClosingRef} className="mt-3 opacity-0 will-change-transform">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-white/90 sm:text-sm">Mais custo. Mais responsabilidade.</p>
          </div>
        </div>
      </div>

      <div ref={positiveStageRef} className="absolute inset-x-6 bottom-0 top-0 z-10 flex max-w-xl flex-col justify-center pt-28 pb-8 opacity-0 will-change-transform sm:inset-x-12 sm:pt-32 lg:inset-x-16">
        <div ref={positiveHeadlineRef} className="w-full opacity-0 will-change-transform">
          <span className="mb-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-cyan-bright sm:text-xs">
            COM A OCEAN CLUB
          </span>
          <h3 className="flex flex-col gap-2 font-display text-4xl font-bold uppercase leading-[1.12] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] sm:text-5xl lg:text-[3.5rem]">
            <span>Seu jet ski.</span>
            <span className="text-brand-cyan-bright">Custos divididos.</span>
          </h3>
        </div>

        <div className="mt-6 w-full max-w-md space-y-3.5">
          <BenefitLine ref={benefit1Ref} title="1/5 da propriedade" text="Investimento compartilhado" />
          <BenefitLine ref={benefit2Ref} title="Operação administrada" text="Marina · Manutenção · Cuidados" />
          <BenefitLine ref={benefit3Ref} title="Chegue e navegue" text="Jet ski preparado pela equipe" />
        </div>

        <div ref={positiveClosingRef} className="mt-7 flex w-full max-w-md flex-col justify-between gap-4 opacity-0 will-change-transform sm:flex-row sm:items-center">
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold uppercase leading-tight tracking-[0.2em] text-white/95">Menos peso.</span>
            <span className="font-display text-sm font-bold uppercase leading-tight tracking-[0.2em] text-brand-cyan-bright">Mais mar.</span>
          </div>
          <CTAButton
            variant="primary-red"
            size="sm"
            href="#planos"
            icon="arrow"
            className="self-start px-6 py-3 font-display text-xs font-semibold uppercase tracking-widest shadow-2xl shadow-red-950/80 sm:self-auto"
          >
            Conheça as Cotas
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

type LineProps = {
  value?: string;
  label?: string;
  title?: string;
  text?: string;
};

const CostLine = forwardRef<HTMLDivElement, LineProps>(({ value, label }, ref) => (
  <div ref={ref} className="flex items-baseline justify-between gap-4 border-b border-white/20 py-2 will-change-transform">
    <span className="font-mono text-sm font-bold tracking-tight text-brand-red sm:text-base">{value}</span>
    <span className="font-mono text-[11px] uppercase tracking-wider text-white/70 sm:text-xs">{label}</span>
  </div>
));
CostLine.displayName = 'CostLine';

const BenefitLine = forwardRef<HTMLDivElement, LineProps>(({ title, text }, ref) => (
  <div ref={ref} className="border-b border-white/20 py-3 pl-4 border-l-2 border-l-brand-cyan-bright will-change-transform">
    <h4 className="font-display text-sm font-bold uppercase leading-snug tracking-wider text-white sm:text-base">{title}</h4>
    <p className="mt-0.5 font-sans text-xs font-light text-ocean-offwhite/90 sm:text-[13px]">{text}</p>
  </div>
));
BenefitLine.displayName = 'BenefitLine';
