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
  | 'comparison'
  | 'section_experiencia'
  | 'faq_direct'
  | 'final_cta'
  | 'final_cta_marina_visit'
  | 'tides_section'
  | 'mare_page'
  | 'general';

export interface WhatsAppLinkOptions {
  phone?: string;
  message?: string;
  source?: WhatsAppSource;
  model?: string;
}

const CONTEXT_MESSAGES: Record<WhatsAppSource, string> = {
  hero_initial: 'Olá! Vim pelo site da Ocean Club e tenho interesse em conhecer como funcionam as cotas náuticas em Ilhéus.',
  hero_final: 'Olá! Gostaria de consultar as cotas disponíveis de jet ski da Ocean Club em Ilhéus.',
  header: 'Olá! Gostaria de mais informações sobre as cotas náuticas da Ocean Club em Ilhéus.',
  floating: 'Olá! Estou navegando no site da Ocean Club e gostaria de falar com um consultor sobre as cotas em Ilhéus.',
  section_planos: 'Olá! Gostaria de consultar a disponibilidade e valores das cotas de jet ski Sea-Doo em Ilhéus.',
  comparison: 'Olá! Vi o comparativo no site da Ocean Club e gostaria de saber mais sobre as cotas compartilhadas em Ilhéus.',
  section_experiencia: 'Olá! Gostaria de conhecer mais sobre a experiência náutica da Ocean Club em Ilhéus.',
  faq_direct: 'Olá! Estive lendo as dúvidas frequentes e gostaria de conversar sobre as cotas náuticas da Ocean Club em Ilhéus.',
  final_cta: 'Olá! Quero consultar a disponibilidade para garantir minha cota náutica na Ocean Club em Ilhéus.',
  final_cta_marina_visit: 'Olá! Gostaria de agendar uma visita à marina em Ilhéus para conhecer os jet skis e a estrutura da Ocean Club.',
  tides_section: 'Olá! Estava consultando a tábua de marés da Ocean Club e gostaria de saber mais sobre as cotas náuticas em Ilhéus.',
  mare_page: 'Olá! Acompanho a tábua de marés da Ocean Club e gostaria de verificar a disponibilidade das cotas de jet ski em Ilhéus.',
  general: 'Olá! Vim pelo site da Ocean Club e quero conhecer as cotas náuticas em Ilhéus.',
};

export function getWhatsAppUrl(options: WhatsAppLinkOptions = {}): string {
  const phone =
    options.phone ||
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE ||
    DEFAULT_WHATSAPP_PHONE;

  let rawMessage = options.message;

  if (!rawMessage) {
    if (options.model) {
      rawMessage = `Olá! Tenho interesse na cota náutica do Sea-Doo ${options.model} em Ilhéus. Gostaria de consultar a disponibilidade e valores.`;
    } else if (options.source && CONTEXT_MESSAGES[options.source]) {
      rawMessage = CONTEXT_MESSAGES[options.source];
    } else {
      rawMessage = CONTEXT_MESSAGES.general;
    }
  }

  const encodedMessage = encodeURIComponent(rawMessage);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

