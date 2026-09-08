import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#090D14',
          subtle: '#0E1420',
          card: '#131B2B',
          surface: '#182236',
        },
        accent: {
          DEFAULT: '#10B981', // Emerald tech accent
          hover: '#059669',
          glow: 'rgba(16, 185, 129, 0.15)',
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          amber: '#F59E0B',
        },
        border: {
          DEFAULT: '#1E293B',
          subtle: '#141E30',
          glow: 'rgba(16, 185, 129, 0.3)',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        pixel: ['Courier New', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'pixel': '2px 2px 0px 0px rgba(0,0,0,0.8), -2px -2px 0px 0px rgba(255,255,255,0.05)',
        'pixel-accent': '3px 3px 0px 0px #10B981',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
