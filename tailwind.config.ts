import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0A0A0A',
        surface: '#141414',
        border: '#1F1F1F',
        'text-primary': '#FFFFFF',
        'text-secondary': '#999999',
        'text-muted': '#555555',
      },
      maxWidth: {
        quiz: '440px',
      },
      height: {
        cta: '56px',
      },
      minHeight: {
        option: '56px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};

export default config;
