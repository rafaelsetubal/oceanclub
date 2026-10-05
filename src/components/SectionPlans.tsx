'use client';

import React, { useState } from 'react';
import { CTAButton } from './CTAButton';

const plans = [
  { model: 'GTI 130', price: '17.000', monthly: '300', side: '/images/plan-gti-130-side.png', angle: '/images/plan-gti-130-angle.png' },
  { model: 'SE 170', price: '29.000', monthly: '500', side: '/images/plan-se-170-side.png', angle: '/images/plan-se-170-angle.png' },
  { model: 'GTI 170 WAKE', price: '30.000', monthly: '625', side: '/images/plan-wake-170-side.png', angle: '/images/plan-wake-170-angle.png' },
];

export function SectionPlans() {
  const [selectedModel, setSelectedModel] = useState(0);
  const selectedPlan = plans[selectedModel];
  const annualMonthlyCost = (Number(selectedPlan.monthly) * 12).toLocaleString('pt-BR');
  return (
    <section id="planos" aria-labelledby="plans-title" className="plans-showcase relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="plans-grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1440px] px-6 pb-8 pt-20 sm:px-10 sm:pb-10 sm:pt-24 lg:px-[5.4%] lg:pb-12 lg:pt-24">
        <header className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/80 font-bold sm:text-sm"><span>03</span><span className="h-px w-6 bg-white/45" aria-hidden="true" />Planos</p>
            <h2 id="plans-title" className="font-display text-[2.8rem] font-bold uppercase leading-[0.89] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">Escolha<br />seu jet ski.</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">Diferentes modelos.<br />Uma mesma experiência no mar.</p>
          </div>
          <div className="grid max-w-[340px] grid-cols-[auto_1px_auto] items-center gap-4 pt-1 sm:gap-5 lg:mr-2">
            <p className="text-xs leading-snug text-white/85 sm:text-sm">Cotas a partir de<br /><strong className="mt-0.5 block font-display text-lg text-[#F23343] sm:text-2xl">R$ 17.000</strong><span className="font-medium text-white">+ R$ 300/mês</span></p>
            <span className="h-10 bg-white/35" aria-hidden="true" />
            <p className="max-w-[145px] text-xs leading-relaxed text-white/85 sm:text-sm">Marina, manutenção,<br />seguro e operação<br />incluídos.</p>
          </div>
        </header>

        <div className="plans-list mt-8 grid grid-cols-1 sm:mt-10 sm:grid-cols-3">
          {plans.map((plan, index) => (
            <article key={plan.model} className={`plan-item plan-item-${index + 1} group relative min-w-0 ${index > 0 ? 'border-t border-white/20 sm:border-l sm:border-t-0' : ''}`}>
              <div className="plan-model relative z-10 pt-4 sm:px-5 sm:pt-0 lg:px-7">
                <p className="font-sans text-xs uppercase leading-tight tracking-[0.06em] text-white/90 font-semibold sm:text-sm">SEA-DOO</p>
                <h3 className="font-display text-[1.65rem] font-bold uppercase leading-[0.95] tracking-tight sm:text-[1.8rem] lg:text-[2.0rem]">{plan.model}</h3>
              </div>

              <div className="plan-art relative mx-[-10px] mt-1 h-[clamp(175px,19vw,250px)] overflow-hidden sm:mx-0 sm:mt-[-4px]">
                <img src={plan.side} alt={`Sea-Doo ${plan.model}`} width={700} height={490} loading="lazy" className="plan-product plan-product-side absolute inset-0 h-full w-full object-contain" />
                <img src={plan.angle} alt="" aria-hidden="true" width={700} height={490} loading="lazy" className="plan-product plan-product-angle absolute inset-0 h-full w-full object-contain" />
                <div className="absolute inset-x-0 bottom-7 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden="true" />
              </div>

              <div className="plan-info relative z-10 px-4 pb-4 pt-1 sm:px-5 sm:pb-0 lg:px-7">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/80 font-bold">1 cota de 5</p>
                <p className="mt-0.5 whitespace-nowrap font-display text-[2.25rem] font-bold leading-none tracking-[-0.045em] text-[#F23343] sm:text-[2.2rem] lg:text-[2.6rem]">R$ {plan.price}</p>
                <p className="mt-1 text-sm font-semibold text-white sm:text-base">+ R$ {plan.monthly} <span className="text-xs font-normal uppercase tracking-[0.1em] text-white/80">/ mês</span></p>
                <p className="mt-3 max-w-[28ch] text-xs sm:text-sm leading-relaxed text-white/80">{index === 0 ? 'A menor aquisição e mensalidade entre as opções apresentadas.' : index === 1 ? 'Uma alternativa intermediária em investimento e mensalidade.' : 'Compare esta configuração com a equipe antes de escolher sua cota.'}</p>
                <CTAButton
                  isWhatsApp
                  whatsAppOptions={{
                    source: 'section_planos',
                    model: plan.model,
                    message: `Olá! Tenho interesse na cota náutica do Sea-Doo ${plan.model} em Ilhéus. Gostaria de consultar a disponibilidade e valores.`,
                  }}
                  variant="link-whatsapp"
                  icon="arrow"
                  className="mt-4 min-h-11 text-xs tracking-normal font-semibold text-white hover:text-white/90"
                >
                  Consultar disponibilidade
                </CTAButton>
              </div>
            </article>
          ))}
        </div>

        <div className="relative z-10 mt-14 border-t border-white/20 pt-10 sm:mt-20 sm:pt-12">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-white/75 font-semibold sm:text-sm">Compare com clareza</p>
              <h3 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">A cota é sua entrada.<br />A mensalidade cuida da estrutura.</h3>
              <p className="mt-5 max-w-[380px] text-sm sm:text-base leading-relaxed text-white/85">São dois valores diferentes: a aquisição da participação no jet ski e o custo mensal da operação compartilhada.</p>
              <p className="mt-4 max-w-[380px] text-sm sm:text-base leading-relaxed text-white/85">Para escolher o modelo, peça à equipe a ficha da embarcação, o ano, a capacidade e os equipamentos disponíveis.</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/20 bg-white/[.04]">
              <div role="group" aria-label="Escolha um modelo para comparar os custos" className="grid grid-cols-3 border-b border-white/20">
                {plans.map((plan, index) => <button key={plan.model} type="button" aria-pressed={selectedModel === index} onClick={() => setSelectedModel(index)} className={`min-h-16 px-3 py-4 text-xs sm:text-sm font-semibold leading-relaxed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white ${selectedModel === index ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>{plan.model}</button>)}
              </div>

              <div className="p-6 sm:p-8" aria-live="polite" aria-atomic="true">
                <p className="text-xs sm:text-sm uppercase tracking-[.14em] text-white/75 font-semibold">Sea-Doo {selectedPlan.model} · participação de 1/5</p>
                <dl className="mt-6 grid grid-cols-2 gap-5">
                  <div><dt className="text-xs sm:text-sm text-white/80 font-medium">Aquisição da cota</dt><dd className="mt-2 font-display text-3xl font-bold text-[#F23343] sm:text-4xl">R$ {selectedPlan.price}</dd></div>
                  <div><dt className="text-xs sm:text-sm text-white/80 font-medium">Mensalidade</dt><dd className="mt-2 font-display text-3xl font-bold sm:text-4xl">R$ {selectedPlan.monthly}<span className="ml-1 font-sans text-xs sm:text-sm font-normal text-white/80">/mês</span></dd></div>
                </dl>
                <div className="mt-6 border-t border-white/15 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm sm:text-base text-white/90">12 mensalidades: <strong className="font-semibold text-white">R$ {annualMonthlyCost}</strong></p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/70">Projeção com o valor mensal apresentado, sem reajustes ou despesas de uso.</p>
                  </div>
                  <CTAButton
                    isWhatsApp
                    whatsAppOptions={{
                      source: 'section_planos',
                      model: selectedPlan.model,
                      message: `Olá! Tenho interesse na cota náutica do Sea-Doo ${selectedPlan.model} em Ilhéus. Gostaria de consultar as condições e disponibilidade.`,
                    }}
                    variant="primary-red"
                    size="sm"
                    icon="arrow"
                    className="self-start sm:self-auto shrink-0 h-[44px] px-5 text-xs font-semibold"
                  >
                    Consultar {selectedPlan.model}
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-7 border-t border-white/20 pt-8 sm:grid-cols-3 sm:gap-8">
            <div><p className="font-mono text-xs sm:text-sm font-bold text-[#F23343]">01 / AQUISIÇÃO</p><h4 className="mt-3 font-display text-xl font-bold uppercase">Sua participação</h4><p className="mt-2 text-sm sm:text-base leading-relaxed text-white/80">O preço destacado corresponde a uma das cinco cotas do modelo escolhido. Consulte as condições de pagamento e o contrato.</p></div>
            <div><p className="font-mono text-xs sm:text-sm font-bold text-[#F23343]">02 / MENSALIDADE</p><h4 className="mt-3 font-display text-xl font-bold uppercase">Estrutura compartilhada</h4><p className="mt-2 text-sm sm:text-base leading-relaxed text-white/80">Marina, manutenção, seguro e operação fazem parte da proposta. Conheça o escopo dos serviços e as coberturas na contratação.</p></div>
            <div><p className="font-mono text-xs sm:text-sm font-bold text-[#F23343]">03 / USO</p><h4 className="mt-3 font-display text-xl font-bold uppercase">Planeje cada saída</h4><p className="mt-2 text-sm sm:text-base leading-relaxed text-white/80">Confirme a cobrança de combustível e eventuais despesas extras, além da disponibilidade e das regras de agendamento.</p></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .plans-showcase {
          background: radial-gradient(ellipse at 56% 32%, rgba(8, 35, 48, .48), transparent 67%), #020b10;
        }
        .plans-grain {
          opacity: .12;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
        }
        .plan-item { animation: plan-enter .65s both; }
        .plan-item-1 { animation-delay: 60ms; }
        .plan-item-2 { animation-delay: 130ms; }
        .plan-item-3 { animation-delay: 200ms; }
        .plan-art { background: radial-gradient(ellipse at 50% 76%, rgba(115,137,146,.13), transparent 57%); }
        .plan-product { padding: 0; transition: opacity .42s ease, transform .7s cubic-bezier(.2,.7,.2,1), filter .5s ease; }
        .plan-product-side { opacity: 1; transform: scale(1); filter: drop-shadow(0 12px 12px rgba(0,0,0,.2)); }
        .plan-product-angle { opacity: 0; transform: scale(.96); filter: drop-shadow(0 16px 16px rgba(0,0,0,.25)); }
        .plan-item:hover .plan-product-side, .plan-item:focus-within .plan-product-side { opacity: 0; transform: scale(1.035); }
        .plan-item:hover .plan-product-angle, .plan-item:focus-within .plan-product-angle { opacity: 1; transform: scale(1); }
        @keyframes plan-enter { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @media (min-width: 640px) {
          .plan-item-2 { padding-top: 0; }
          .plan-item-2 .plan-art { height: clamp(175px,19vw,250px); }
          .plan-info { padding-bottom: 0; }
        }
        @media (max-width: 639px) {
          .plan-item { padding-bottom: 1.25rem; }
          .plan-item + .plan-item { margin-top: .25rem; }
          .plan-model { padding-left: .25rem; }
          .plan-art { height: 205px; }
          .plan-info { padding-left: .25rem; padding-right: .25rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .plan-item { animation:none; }
          .plan-product, .plan-link svg { transition:none; }
          .plan-product-angle { display:none; } .plan-item:hover .plan-product-side, .plan-item:focus-within .plan-product-side { opacity:1; transform:none; }
        }
      `}</style>
    </section>
  );
}

