import React from 'react';
import { Heart, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070A10] border-t border-border/80 py-10 font-mono text-xs text-text-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-accent inline-block"></span>
          <span className="text-text-primary font-semibold">Reyhan Albar Fahryan</span>
          <span>© 2026</span>
          <span className="text-border-strong">•</span>
          <span className="text-accent">Built with Next.js 14 & Tailwind</span>
        </div>

        {/* Center / Right */}
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 bg-bg-surface px-2.5 py-1 rounded-md border border-border/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Vercel Deployment Live</span>
          </span>
          <a
            href="https://github.com/Reyyy-05"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            github.com/Reyyy-05
          </a>
        </div>

      </div>
    </footer>
  );
};
