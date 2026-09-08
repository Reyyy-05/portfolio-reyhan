'use client';

import React from 'react';
import { ArrowDown, Github, ExternalLink, Code2, Sparkles, Terminal } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-bg">
      {/* Subtle Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & Pitch (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Role Eyebrow with Pulse Indicator */}
            <div className="inline-flex items-center gap-2 bg-bg-card border border-border/80 rounded-full px-3.5 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs text-text-secondary tracking-wide uppercase">
                Frontend Intern @ Creativemu Academy
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
              Crafting Fast, Tactile & Scalable{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-cyan to-accent-purple">
                Frontend Experiences.
              </span>
            </h1>

            {/* Bio Copy */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl">
              Halo, saya <strong className="text-text-primary font-semibold">Reyhan Albar Fahryan</strong>. Mahasiswa S1 Informatika (Semester 6) dan Web Development Intern. Saya membangun produk digital dari nol—mulai dari web catalog komersial, mobile app edukasi, hingga sistem integritas data kriptografis.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-bg-card/70 border border-border/60 rounded-xl p-3">
                <div className="font-mono text-xl font-bold text-accent">10+</div>
                <div className="text-[11px] text-text-muted mt-0.5">Repositori Terbuka</div>
              </div>
              <div className="bg-bg-card/70 border border-border/60 rounded-xl p-3">
                <div className="font-mono text-xl font-bold text-accent-cyan">Next.js</div>
                <div className="text-[11px] text-text-muted mt-0.5">Stack Harian Magang</div>
              </div>
              <div className="bg-bg-card/70 border border-border/60 rounded-xl p-3">
                <div className="font-mono text-xl font-bold text-accent-purple">Expo</div>
                <div className="text-[11px] text-text-muted mt-0.5">Mobile MVPs</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-accent text-bg hover:bg-accent-hover font-mono text-xs font-semibold px-5 py-3.5 rounded-xl shadow-glow-emerald hover:shadow-pixel-accent transition-all duration-200"
              >
                <span>Lihat 10 Proyek Nyata</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/Reyyy-05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-bg-card hover:bg-bg-surface text-text-primary border border-border/80 hover:border-border font-mono text-xs font-medium px-4 py-3.5 rounded-xl transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub @Reyyy-05</span>
                <ExternalLink className="w-3 h-3 text-text-muted" />
              </a>
            </div>

          </div>

          {/* Right: Pixel Art Workstation Avatar (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PixelAvatar />
          </div>

        </div>
      </div>
    </section>
  );
};
