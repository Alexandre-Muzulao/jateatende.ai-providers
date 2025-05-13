import type { Config } from 'tailwindcss';

const colors = {
  blue: {
    400: '#2589FE',
    500: '#0070F3',
    600: '#2F6FEB',
  },
  primary: {
    DEFAULT: '#f3b05a', // Cor principal
    light: '#f39452',   // Variante mais clara
    dark: '#ef774e',    // Variante mais escura
  },
  background: {
    light: '#ffffff',   // Fundo claro (modo padrão)
    dark: '#1d2935',    // Fundo escuro (modo dark)
  },
};

const config: Config = {
  darkMode: 'class', // Habilita o dark mode baseado em classes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors,
      backgroundColor: {
        ...colors,
        'primary-light': '#f39452',
        'primary-dark': '#ef774e',
      },
      textColor: {
        ...colors,
        'primary-light': '#f39452',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
