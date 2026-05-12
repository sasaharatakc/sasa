import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deepBlack: '#060505',
        espresso: '#1d120d',
        amber: '#c8872f',
        copper: '#9a5b2e',
        forest: '#223127',
        mist: '#c9bea8',
        cream: '#f2ebdc'
      }
    }
  },
  plugins: []
};
export default config;
