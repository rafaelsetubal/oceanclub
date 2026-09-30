'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CTAButton } from './CTAButton';

const faqs = [
  { question: 'O que estou adquirindo ao comprar uma cota?', answer: 'Uma participação compartilhada no jet ski escolhido. Os modelos apresentados são divididos em cinco cotas. Antes de fechar, conheça o contrato, as regras de uso e as condições da embarcação com a equipe Ocean Club.' },
  { question: 'O que significa o valor mensal?', answer: 'Além do valor de aquisição da cota, cada modelo tem uma mensalidade para a estrutura e a gestão da operação. Marina, manutenção e seguro fazem parte da proposta apresentada. Solicite o detalhamento dos serviços, das coberturas e de eventuais despesas adicionais antes da contratação.' },
  { question: 'Quantas vezes posso navegar?', answer: 'A participação de 1/5 representa sua cota na embarcação. Ela não estabelece, por si só, um número de saídas. A frequência de uso e a distribuição das datas ainda serão detalhadas nas condições de contratação.' },
  { question: 'Como são reservados finais de semana e feriados?', answer: 'O uso é compartilhado e depende de agendamento. A antecedência da reserva, a divisão de datas concorridas e as regras de cancelamento ainda serão divulgadas. Não há garantia de uma data específica apresentada nesta página.' },
  { question: 'Combustível está incluído na mensalidade?', answer: 'Os valores apresentados distinguem a aquisição da cota e a mensalidade da estrutura. A cobrança de combustível e de outras despesas por saída ainda precisa ser definida; esses custos não estão calculados na projeção de 12 mensalidades.' },
  { question: 'Onde consulto as regras para pilotar e levar acompanhantes?', answer: 'Antes de navegar, confirme a documentação necessária para o condutor, a capacidade do modelo e as orientações de segurança. A equipe pode esclarecer os requisitos para a sua saída.' },
  { question: 'E se houver danos ou eu quiser transferir a cota?', answer: 'As responsabilidades por danos, a cobertura do seguro e as condições de transferência precisam estar descritas no contrato. Solicite esses documentos e esclareça as condições com a equipe antes de adquirir sua cota.' },
];

export function SectionFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-white/10 bg-[#020b10] py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-[5.4%]">
        <div>
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[.18em] text-white/55"><span>07</span><span className="h-px w-6 bg-white/30" />Dúvidas frequentes</p>
          <h2 id="faq-title" className="font-display text-5xl font-bold uppercase leading-[.95] tracking-tight sm:text-6xl">Tudo claro.<br />Antes de navegar.</h2>
          <p className="mt-6 max-w-[360px] text-base leading-relaxed text-white/65">Entenda a cota, os custos e o uso compartilhado. Uma boa experiência começa com informações claras.</p>
          <CTAButton variant="pill-outline" isWhatsApp whatsAppOptions={{ source: 'faq_direct' }} icon="arrow" className="mt-8 min-h-12 px-6 text-xs">Consultar disponibilidade</CTAButton>
        </div>
        <div className="border-t border-white/20">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.question} className="border-b border-white/20">
                <h3><button id={`faq-trigger-${idx}`} aria-controls={`faq-answer-${idx}`} aria-expanded={isOpen} onClick={() => setOpenIdx(isOpen ? null : idx)} className="flex min-h-[80px] w-full items-center justify-between gap-6 py-6 text-left text-base font-medium leading-relaxed text-white/90 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  {faq.question}<ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button></h3>
                <div id={`faq-answer-${idx}`} role="region" aria-labelledby={`faq-trigger-${idx}`} hidden={!isOpen} className="pb-7 pr-6 text-sm leading-[1.8] text-white/65">{faq.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
