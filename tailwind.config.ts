import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          primary: '#03182D',
          deep: '#03182D',
          DEFAULT: '#06264A',
          surface: '#06264A',
          blue: '#075985',
          cyan: '#00A9D6',
          bright: '#16C4E8',
          offwhite: '#F5F8FA',
          black: '#02070B',
          red: '#F23343',
        },
        brand: {
          red: '#F23343',
          'red-hover': '#d92231',
          cyan: '#00A9D6',
          'cyan-bright': '#16C4E8',
          blue: '#075985',
          navy: '#06264A',
          dark: '#03182D',
        },
      },
      fontFamily: {
        display: ['var(--font-oswald)', 'Oswald', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest: '0.25em',
        ultra: '0.35em',
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(180deg, rgba(3, 24, 45, 0.4) 0%, rgba(3, 24, 45, 0.8) 100%)',
        'radial-vignette': 'radial-gradient(circle at center, transparent 30%, rgba(2, 7, 11, 0.75) 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 169, 214, 0.35)',
        'glow-red': '0 0 30px -5px rgba(242, 51, 67, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
