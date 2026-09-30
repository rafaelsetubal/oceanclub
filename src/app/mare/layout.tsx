import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tábua de Marés de Ilhéus em Tempo Real | Ocean Club Cotas Náuticas',
  description:
    'Consulte a tábua de marés em tempo real para o Porto de Ilhéus Malhado, Baía do Pontal e Rio Cachoeira. Dados oficiais da Marinha do Brasil (DHN).',
  openGraph: {
    title: 'Tábua de Marés de Ilhéus em Tempo Real · Ocean Club',
    description:
      'Gráfico ao vivo de marés para o Porto de Ilhéus, Baía do Pontal e Rio Cachoeira. Dados oficiais da Marinha do Brasil (DHN).',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function MareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
