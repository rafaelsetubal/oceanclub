/**
 * WhatsApp conversion helper for Ocean Club Cotas Náuticas
 */

export const DEFAULT_WHATSAPP_PHONE = '5573999999999'; // Default Bahia DDD 73 contact placeholder

export type WhatsAppSource =
  | 'hero_initial'
  | 'hero_final'
  | 'header'
  | 'floating'
  | 'section_planos'
  | 'section_experiencia'
  | 'faq_direct'
  | 'final_cta'
  | 'final_cta_marina_visit'
  | 'general';

export interface WhatsAppLinkOptions {
  phone?: string;
  message?: string;
  source?: WhatsAppSource;
}

const CONTEXT_MESSAGES: Record<WhatsAppSource, string> = {
  hero_initial: 'Olá! Vim pelo site da Ocean Club e quero conhecer como funcionam as cotas náuticas em Ilhéus.',
  hero_final: 'Olá! Assisti à apresentação no site da Ocean Club e quero garantir minha cota de jetski em Ilhéus.',
  header: 'Olá! Gostaria de mais informações sobre as cotas náuticas da Ocean Club em Ilhéus.',
  floating: 'Olá! Estou navegando no site da Ocean Club e gostaria de falar com um consultor.',
  section_planos: 'Olá! Vi a embarcação Sea-Doo e gostaria de verificar a disponibilidade e valores da cota.',
  section_experiencia: 'Olá! Quero conhecer mais sobre a experiência náutica da Ocean Club em Ilhéus.',
  faq_direct: 'Olá! Tenho algumas dúvidas sobre o contrato de cotas náuticas da Ocean Club.',
  final_cta: 'Olá! Quero garantir minha cota náutica na Ocean Club para esta temporada em Ilhéus.',
  final_cta_marina_visit: 'Olá! Gostaria de agendar uma visita à marina em Ilhéus para conhecer o jet ski e a estrutura.',
  general: 'Olá! Vim pelo site da Ocean Club e quero conhecer as cotas náuticas.',
};

export function getWhatsAppUrl(options: WhatsAppLinkOptions = {}): string {
  const phone = options.phone || DEFAULT_WHATSAPP_PHONE;
  const rawMessage =
    options.message ||
    (options.source && CONTEXT_MESSAGES[options.source]
      ? CONTEXT_MESSAGES[options.source]
      : CONTEXT_MESSAGES.general);

  const encodedMessage = encodeURIComponent(rawMessage);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
