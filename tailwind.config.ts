import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deepBlack: '#070605',
        espresso: '#1a120d',
        amber: '#c7852d',
        copper: '#ad5f2b',
        forest: '#243126',
        mist: '#c6b9a8',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        bloom: '0 0 120px rgba(199, 133, 45, 0.45)',
      },
    },
  },
  plugins: [],
};
export default config;
