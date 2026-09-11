'use client';

import React, { useState } from 'react';
import {
  PixelScroll,
  PixelPotion,
  PixelWand,
  PixelAtom,
  PixelGear,
  PixelSnake,
  PixelBranch,
  PixelWave,
  PixelShield,
  PixelRocket,
} from './PixelIcons';
import { Music, RefreshCw, ArrowLeft, ArrowRight, Minus, Square, X, Sparkles } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  description: string;
  level: string;
  icon: React.ReactNode;
  frameColor: string;
}

export const RpgSkillsWindow: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const skills: SkillItem[] = [
    {
      id: 'html5',
      name: 'HTML5',
      category: 'Frontend Core',
      description: 'Structuring semantic and accessible web content',
      level: 'Mastered',
      icon: <PixelScroll size={40} />,
      frameColor: '#F59E0B',
    },
    {
      id: 'css3',
      name: 'CSS3',
      category: 'Styling & Layout',
      description: 'Modern CSS, Flexbox, Grid, and responsive layout',
      level: 'Advanced',
      icon: <PixelPotion size={40} />,
      frameColor: '#38BDF8',
    },
    {
      id: 'javascript',
      name: 'JavaScript / TS',
      category: 'Core Logic',
      description: 'Interactive scripting, TypeScript type safety',
      level: 'Advanced',
      icon: <PixelWand size={40} />,
      frameColor: '#FBBF24',
    },
    {
      id: 'react-next',
      name: 'React / Next.js',
      category: 'Modern Web Stack',
      description: 'App Router, SSR, atomic components & hooks',
      level: 'Active Intern',
      icon: <PixelAtom size={40} />,
      frameColor: '#22D3EE',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Design Systems',
      description: 'Rapid UI, responsive tokens & micro-animations',
      level: 'Advanced',
      icon: <PixelWave size={40} />,
      frameColor: '#2DD4BF',
    },
    {
      id: 'node-zustand',
      name: 'Node.js & Zustand',
      category: 'Runtime & State',
      description: 'Lightweight reactive stores & asynchronous APIs',
      level: 'Proficient',
      icon: <PixelGear size={40} />,
      frameColor: '#A855F7',
    },
    {
      id: 'git-flow',
      name: 'Git & GitHub',
      category: 'Collaboration',
      description: 'Branch protection, PR peer reviews & teamwork',
      level: 'Proficient',
      icon: <PixelBranch size={40} />,
      frameColor: '#F97316',
    },
    {
      id: 'sha256',
      name: 'SHA-256 & Crypto',
      category: 'Data Provenance',
      description: 'Cryptographic hash anchoring & data verification',
      level: 'Specialized',
      icon: <PixelShield size={40} />,
      frameColor: '#0EA5E9',
    },
    {
      id: 'supabase-prisma',
      name: 'Supabase & Prisma',
      category: 'Databases',
      description: 'PostgreSQL relational schemas & SQLite audit logs',
      level: 'Proficient',
      icon: <PixelSnake size={40} />,
      frameColor: '#10B981',
    },
    {
      id: 'lighthouse',
      name: 'Performance & SEO',
      category: 'Engineering Craft',
      description: 'Lighthouse 99+, zero layout shift & Web Vitals',
      level: 'Proficient',
      icon: <PixelRocket size={40} />,
      frameColor: '#EC4899',
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#070A12] overflow-hidden">
      {/* Subtle Star Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-12 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-twinkle" />
        <div className="absolute bottom-24 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Retro Window Outer Frame (matching skills.jpeg) */}
        <div className="bg-[#0D1322] border-4 border-slate-600 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* 1. OS Title Bar: PIXEL_DEV // PORTFOLIO v2.0 */}
          <div className="bg-[#1E293B] border-b-2 border-slate-700 px-4 py-2 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-amber-300 tracking-wider">
                PIXEL_DEV // PORTFOLIO v2.0
              </span>
            </div>

            {/* Window Controls: _ [] X */}
            <div className="flex items-center gap-1.5">
              <button className="w-4 h-4 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xs flex items-center justify-center text-slate-300 text-[10px]">
                <Minus className="w-2.5 h-2.5" />
              </button>
              <button className="w-4 h-4 bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-xs flex items-center justify-center text-slate-300 text-[10px]">
                <Square className="w-2 h-2" />
              </button>
              <button className="w-4 h-4 bg-rose-700 hover:bg-rose-600 border border-rose-500 rounded-xs flex items-center justify-center text-white text-[10px]">
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* 2. Browser Navigation URL Bar: SKILLS.HTML */}
          <div className="bg-[#0F172A] border-b-2 border-slate-700 px-4 py-2 flex items-center gap-3 select-none">
            <div className="flex items-center gap-1 text-slate-400">
              <ArrowLeft className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
              <ArrowRight className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
              <RefreshCw className="w-3 h-3 hover:text-white cursor-pointer ml-1" />
            </div>

            <div className="flex-1 bg-[#020617] border border-slate-700 rounded px-3 py-1 font-arcade text-xs text-amber-300 flex items-center justify-between">
              <span>SKILLS.HTML</span>
              <span className="text-[9px] text-slate-500 font-mono">200 OK</span>
            </div>
          </div>

          {/* 3. Dungeon Room Studio & Inventory Grid (matching skills.jpeg interior) */}
          <div className="dungeon-bg p-4 sm:p-8 relative">
            
            {/* Red RPG Header Banner */}
            <div className="bg-[#831843]/90 border-2 border-rose-500 rounded-xl px-4 py-2.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <h3 className="font-pixel text-xs sm:text-sm text-white uppercase tracking-wider">
                  PROGRAMMING &amp; TECH STACK
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/80 px-3 py-1 rounded-md">
                <span className="font-arcade text-[10px] text-slate-300">STATUS:</span>
                <span className="font-arcade text-[10px] text-emerald-400 font-bold animate-pulse">
                  ACTIVE INTERN
                </span>
              </div>
            </div>

            {/* 10 Gold-Framed RPG Inventory Tiles (5 columns x 2 rows on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 mb-8">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className="group bg-[#111827]/90 hover:bg-[#1E293B] border-2 border-amber-500/70 hover:border-amber-400 rounded-xl p-3 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-rpg-gold relative select-none"
                >
                  {/* Corner Gold Studs */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-amber-400 rounded-xs" />
                  <div className="absolute top-1 right-1 w-1 h-1 bg-amber-400 rounded-xs" />
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-amber-400 rounded-xs" />
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-amber-400 rounded-xs" />

                  {/* Inner Icon Box */}
                  <div className="w-16 h-16 bg-[#0B0F19] rounded-lg border border-slate-700/80 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    {skill.icon}
                  </div>

                  {/* Skill Name */}
                  <h4 className="font-arcade text-xs font-bold text-white tracking-wide uppercase mb-1">
                    {skill.name}
                  </h4>

                  {/* Description */}
                  <p className="text-[10px] text-slate-400 leading-snug font-sans line-clamp-2 mb-2">
                    {skill.description}
                  </p>

                  {/* Level Pill */}
                  <span className="font-arcade text-[8px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full mt-auto">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>

            {/* Selected Skill Detail Popup / Drawer */}
            {selectedSkill && (
              <div className="bg-[#131B2B] border-2 border-amber-400 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-fadeIn">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-900 border border-amber-500/40 rounded-lg">
                    {selectedSkill.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-arcade text-sm font-bold text-amber-300 uppercase">
                        {selectedSkill.name}
                      </h4>
                      <span className="font-arcade text-[9px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                        {selectedSkill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 font-sans">
                      {selectedSkill.description} • Kategori: <strong>{selectedSkill.category}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="font-arcade text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-3 py-1.5 rounded-lg"
                >
                  TUTUP [X]
                </button>
              </div>
            )}

            {/* 4. Bottom Retro Navigation Bar (matching skills.jpeg bottom buttons) */}
            <div className="pt-6 border-t-2 border-slate-700/80 flex flex-wrap items-center justify-center gap-2 select-none">
              <button
                onClick={() => scrollToSection('navbar')}
                className="font-arcade text-xs bg-rose-900/80 hover:bg-rose-800 text-rose-200 border-2 border-rose-500 px-4 py-2 rounded-lg pixel-btn"
              >
                HOME
              </button>

              <button
                onClick={() => scrollToSection('experience')}
                className="font-arcade text-xs bg-blue-900/80 hover:bg-blue-800 text-blue-200 border-2 border-blue-500 px-4 py-2 rounded-lg pixel-btn"
              >
                ABOUT
              </button>

              {/* Active Highlighted Button with Musical Notes (matching skills.jpeg) */}
              <div className="relative">
                {/* Floating Musical Notes Animation */}
                <div className="absolute -top-3.5 right-1 flex items-center gap-1 text-cyan-400 animate-bounce pointer-events-none">
                  <span className="font-arcade text-xs">♪</span>
                  <span className="font-arcade text-[10px]">♫</span>
                </div>

                <button className="font-arcade text-xs bg-amber-500 text-black font-bold border-2 border-amber-300 px-5 py-2 rounded-lg shadow-rpg-gold pixel-btn">
                  » SKILLS «
                </button>
              </div>

              <button
                onClick={() => scrollToSection('projects')}
                className="font-arcade text-xs bg-blue-900/80 hover:bg-blue-800 text-blue-200 border-2 border-blue-500 px-4 py-2 rounded-lg pixel-btn"
              >
                PROJECTS
              </button>

              <a
                href="/cv-reyhan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-arcade text-xs bg-purple-900/80 hover:bg-purple-800 text-purple-200 border-2 border-purple-500 px-4 py-2 rounded-lg pixel-btn"
              >
                RESUME PDF
              </a>

              <button
                onClick={() => scrollToSection('contact')}
                className="font-arcade text-xs bg-blue-900/80 hover:bg-blue-800 text-blue-200 border-2 border-blue-500 px-4 py-2 rounded-lg pixel-btn"
              >
                CONTACT
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
