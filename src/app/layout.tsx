import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ocean Club — Cotas Náuticas em Ilhéus & Itabuna | Viva o Mar',
  description:
    'Sua porta de entrada para o mar de Ilhéus. Seja proprietário de uma cota de jetski de alto padrão sem se preocupar com marina, manutenção ou custos integrais.',
  keywords: [
    'Ocean Club',
    'Cotas Náuticas',
    'Jetski Ilhéus',
    'Cotas Jetski Bahia',
    'Ilhéus',
    'Itabuna',
    'Ponte Jorge Amado',
    'Marina Ilhéus',
    'Navegação Bahia',
  ],
  authors: [{ name: 'Ocean Club Cotas Náuticas' }],
  openGraph: {
    title: 'Ocean Club — Cotas Náuticas | Ilhéus - Bahia',
    description: 'Seu próximo dia no mar começa aqui. Cotas náuticas inteligentes em Ilhéus.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#03182D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${inter.variable} dark`}>
      <body className="bg-ocean-primary text-ocean-offwhite antialiased font-sans selection:bg-brand-cyan/30 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
