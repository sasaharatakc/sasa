import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ASLE brand palette
        teal: {
          DEFAULT: '#0f9b8e', // ASLE Teal
          deep: '#0a6b62', // Deep Teal
          dark: '#074a44',
          light: '#4fc3b6',
        },
        aqua: {
          DEFAULT: '#7fded1', // Soft Aqua
          light: '#c9f3ec', // Very Light Cyan
        },
        navy: {
          DEFAULT: '#0d2b34', // Deep Navy / Blue-green
          soft: '#173d47',
        },
        ink: '#122529',
        mist: '#f4faf9',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
        wider3: '0.28em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
