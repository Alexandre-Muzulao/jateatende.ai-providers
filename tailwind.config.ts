import type { Config } from 'tailwindcss';



const config: Config = {
  darkMode: 'class', // Habilita o dark mode baseado em classes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ample-soft)', 'sans-serif'],
      },
      colors: {
        primary: '#f39452',
        secondary: '#f3b05a',
        warning: '#ef774e',
        black: '#1d2935',
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
