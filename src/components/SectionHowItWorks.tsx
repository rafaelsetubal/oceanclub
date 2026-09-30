import Image from 'next/image';
import { CTAButton } from './CTAButton';

const steps = [
  { title: 'Escolha', description: 'O modelo e a cota para você.' },
  { title: 'Agende', description: 'Combine a data com a equipe.' },
  { title: 'Chegue', description: 'Receba o jet ski e as orientações.' },
  { title: 'Navegue', description: 'Aproveite seu dia em Ilhéus.' },
];

export function SectionHowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="how-title" className="overflow-hidden bg-[#F4F1EA] text-[#071A2B]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[.8fr_1.5fr] lg:gap-16 lg:px-[5.4%]">
        <div>
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[.18em] text-[#071A2B]/60"><span>04</span><span className="h-px w-6 bg-[#071A2B]/30" />Como funciona</p>
          <h2 id="how-title" className="font-display text-5xl font-bold uppercase leading-[1.08] tracking-tight sm:text-6xl">É chegar.<br />E navegar.</h2>
          <p className="mt-5 max-w-[320px] text-base leading-relaxed text-[#071A2B]/70">Quatro passos para o seu dia no mar.</p>
          <CTAButton variant="primary-red" href="#planos" icon="arrow" className="mt-7 min-h-12 px-6 text-xs">Ver cotas</CTAButton>
        </div>
        <div>
          <ol className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => <li key={step.title} className="border-t border-[#071A2B]/20 pt-4"><span className="font-display text-3xl font-medium text-[#071A2B]/40">0{index + 1}</span><h3 className="mt-3 font-display text-xl font-bold uppercase">{step.title}</h3><p className="mt-2 max-w-[20ch] text-sm leading-relaxed text-[#071A2B]/70">{step.description}</p></li>)}
          </ol>
          <div className="relative mt-8 aspect-[2.2] overflow-hidden rounded-lg sm:aspect-[2.8]">
            <Image src="/images/compare-oceanclub.png" alt="Jet ski na Baía de Ilhéus ao pôr do sol" fill unoptimized sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-[center_65%]" />
          </div>
          <a href="#faq" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium">Dúvidas sobre custos e agendamento? Veja o FAQ →</a>
        </div>
      </div>
    </section>
  );
}
