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
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
        arcade: ['Silkscreen', 'monospace'],
      },
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
        neon: {
          pink: '#FF2A85',
          purple: '#B026FF',
          cyan: '#00F0FF',
          green: '#39FF14',
          yellow: '#FFE600',
          orange: '#FF7A00',
          gold: '#F59E0B',
          blue: '#3B82F6',
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
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'blink': 'blink 1s step-start infinite',
        'scanline': 'scanline 8s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
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
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      boxShadow: {
        'pixel': '2px 2px 0px 0px rgba(0,0,0,0.8), -2px -2px 0px 0px rgba(255,255,255,0.05)',
        'pixel-accent': '3px 3px 0px 0px #10B981',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-pink': '0 0 20px rgba(255, 42, 133, 0.45)',
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.45)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.45)',
        'glow-purple': '0 0 20px rgba(176, 38, 255, 0.45)',
        'glow-yellow': '0 0 20px rgba(255, 230, 0, 0.45)',
        'glow-orange': '0 0 20px rgba(255, 122, 0, 0.45)',
        'rpg-gold': '0 0 0 2px #F59E0B, 0 0 15px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
};
export default config;
