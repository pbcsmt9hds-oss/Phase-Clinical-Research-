import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#070A0F',
        slate: '#0B0F17',
        panel: '#0E131C',
        cyan: {
          DEFAULT: '#00F2FE',
          dim: '#0AA8B5',
        },
        emerald: {
          DEFAULT: '#10B981',
          dim: '#0B7C58',
        },
        violet: {
          DEFAULT: '#7C5CFF',
          dim: '#5A3FD6',
        },
        amber: '#F5A524',
        crimson: '#F5455C',
        mist: '#A9B4C4',
        fog: '#5C6779',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(0, 242, 254, 0.35)',
        'glow-emerald': '0 0 40px -8px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
