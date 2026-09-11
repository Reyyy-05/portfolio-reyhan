'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Code2, Sparkles, Terminal } from 'lucide-react';
import { Project } from '@/data/projects';

interface ArcadeCabinetProps {
  project: Project;
  arcadeTitle: string;
  badgeLabel: string;
  colorTheme: 'cyan' | 'pink' | 'green';
  sideArtTitle: string;
  screenType: 'catalog' | 'quiz' | 'hash';
  characterColor?: string;
  onSelectProject?: (project: Project) => void;
}

export const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({
  project,
  arcadeTitle,
  badgeLabel,
  colorTheme,
  sideArtTitle,
  screenType,
  characterColor = '#38BDF8',
  onSelectProject,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Theme color maps
  const themeClasses = {
    cyan: {
      marqueeBg: 'bg-cyan-950/80 border-cyan-400',
      marqueeText: 'text-cyan-300 text-glow-cyan',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
      sideBorder: 'border-cyan-500/40',
      glow: 'hover:shadow-glow-cyan',
      btnColor: 'bg-cyan-500',
      btnSecondary: 'bg-blue-500',
    },
    pink: {
      marqueeBg: 'bg-pink-950/80 border-pink-400',
      marqueeText: 'text-pink-300 text-glow-pink',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-400/50',
      sideBorder: 'border-pink-500/40',
      glow: 'hover:shadow-glow-pink',
      btnColor: 'bg-pink-500',
      btnSecondary: 'bg-purple-500',
    },
    green: {
      marqueeBg: 'bg-emerald-950/80 border-emerald-400',
      marqueeText: 'text-emerald-300 text-glow-green',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
      sideBorder: 'border-emerald-500/40',
      glow: 'hover:shadow-glow-green',
      btnColor: 'bg-emerald-500',
      btnSecondary: 'bg-teal-500',
    },
  }[colorTheme];

  return (
    <div
      className="relative flex flex-col items-center group select-none transition-transform duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badge */}
      <div
        className={`font-arcade text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded border mb-2 transition-all ${themeClasses.badge}`}
      >
        {badgeLabel}
      </div>

      {/* Main Arcade Cabinet Body (240px wide on desktop) */}
      <div
        className={`w-56 sm:w-60 bg-[#0B0F19] border-2 rounded-t-2xl rounded-b-lg p-2.5 pb-4 flex flex-col justify-between transition-all duration-300 shadow-2xl relative ${themeClasses.sideBorder} ${themeClasses.glow}`}
      >
        {/* Marquee Header */}
        <div
          className={`w-full py-2 px-1 text-center rounded-lg border border-b-2 mb-2 ${themeClasses.marqueeBg}`}
        >
          <div className={`font-arcade text-xs font-bold tracking-widest uppercase truncate ${themeClasses.marqueeText}`}>
            {arcadeTitle}
          </div>
          <div className="text-[8px] font-mono text-slate-400 mt-0.5 truncate tracking-tighter">
            {project.pixelBadge}
          </div>
        </div>

        {/* CRT Bezel Frame */}
        <div className="relative bg-[#050811] border-2 border-slate-700/80 rounded-xl p-2 mb-3 shadow-inner overflow-hidden">
          {/* Bezel Screws */}
          <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-slate-600" />
          <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-slate-600" />
          <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-slate-600" />
          <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-slate-600" />

          {/* CRT Screen with Scanlines */}
          <div className="crt-screen w-full h-36 bg-[#02050D] rounded-lg border border-slate-800 p-2 flex flex-col justify-between font-mono text-[10px] overflow-hidden">
            
            {/* Screen Content based on project type */}
            {screenType === 'catalog' && (
              <div className="space-y-1.5 z-10 text-emerald-300">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1">
                  <span className="font-arcade text-[9px] text-emerald-400">IMGN // NEXT.JS</span>
                  <span className="text-[8px] text-emerald-500">LIVE</span>
                </div>
                {/* Visual Bike Sprocket Pixel Grid */}
                <div className="grid grid-cols-2 gap-1.5 py-1">
                  <div className="bg-emerald-950/60 border border-emerald-500/30 rounded p-1 text-[8px] text-center">
                    <div className="text-emerald-400 font-bold">PARTS</div>
                    <div className="text-[7px] text-slate-400">42 ITEMS</div>
                  </div>
                  <div className="bg-emerald-950/60 border border-emerald-500/30 rounded p-1 text-[8px] text-center">
                    <div className="text-cyan-400 font-bold">SQL RLS</div>
                    <div className="text-[7px] text-slate-400">&lt;80MS</div>
                  </div>
                </div>
                <div className="text-[8px] text-slate-400 truncate">
                  $ npx next dev --port 3000
                </div>
              </div>
            )}

            {screenType === 'quiz' && (
              <div className="space-y-1.5 z-10 text-pink-300">
                <div className="flex items-center justify-between border-b border-pink-500/30 pb-1">
                  <span className="font-arcade text-[9px] text-pink-400">BIOLEARN // EXPO</span>
                  <span className="text-[8px] text-pink-500">KLS 10-12</span>
                </div>
                {/* Quiz Mini Game Display */}
                <div className="bg-pink-950/60 border border-pink-500/30 rounded p-1.5 text-[8px] space-y-1">
                  <div className="text-pink-200 font-semibold truncate">Q: DNA Polymerase?</div>
                  <div className="flex justify-between text-[7px] text-slate-300">
                    <span className="text-emerald-400">A. Replikasi [✓]</span>
                    <span className="text-slate-400">Score: 98</span>
                  </div>
                </div>
                <div className="text-[8px] text-slate-400 truncate">
                  Zustand state: active
                </div>
              </div>
            )}

            {screenType === 'hash' && (
              <div className="space-y-1.5 z-10 text-cyan-300">
                <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1">
                  <span className="font-arcade text-[9px] text-cyan-400">STATPROV // HASH</span>
                  <span className="text-[8px] text-cyan-500">SHA-256</span>
                </div>
                {/* Hash Cipher Matrix Display */}
                <div className="bg-cyan-950/60 border border-cyan-500/30 rounded p-1 font-mono text-[7px] space-y-0.5">
                  <div className="text-cyan-400 truncate">HASH: e3b0c44298fc...</div>
                  <div className="text-slate-300 flex justify-between">
                    <span>INTEGRITY: OK</span>
                    <span className="text-emerald-400">VERIFIED</span>
                  </div>
                </div>
                <div className="text-[8px] text-slate-400 truncate">
                  Prisma Audit Logged
                </div>
              </div>
            )}

            {/* Bottom Screen Status Bar */}
            <div className="z-10 flex items-center justify-between text-[7px] text-slate-500 border-t border-slate-800 pt-1 font-arcade">
              <span>INSERT COIN</span>
              <span className="animate-blink text-emerald-400">1P READY</span>
            </div>
          </div>
        </div>

        {/* Control Panel (Joystick & Colored Buttons) */}
        <div className="bg-[#121826] border border-slate-700/80 rounded-lg p-2 mb-3 flex items-center justify-between shadow-sm">
          {/* Joystick Base & Ball */}
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center relative">
              {/* Shaft */}
              <div className="w-1 h-2.5 bg-slate-400 absolute bottom-2 rounded-t" />
              {/* Red Joystick Ball */}
              <div
                className={`w-3 h-3 rounded-full bg-rose-500 border border-rose-300 shadow-sm transition-transform ${
                  isHovered ? '-translate-y-1 rotate-12' : ''
                }`}
              />
            </div>
            <span className="font-arcade text-[7px] text-slate-500 uppercase">JOY</span>
          </div>

          {/* Arcade Push Buttons */}
          <div className="flex items-center gap-1.5">
            <div
              className={`w-3 h-3 rounded-full ${themeClasses.btnColor} border border-white/50 shadow-sm pixel-btn`}
              title="Button A"
            />
            <div
              className={`w-3 h-3 rounded-full ${themeClasses.btnSecondary} border border-white/50 shadow-sm pixel-btn`}
              title="Button B"
            />
            <div
              className="w-3 h-3 rounded-full bg-amber-400 border border-white/50 shadow-sm pixel-btn"
              title="Button C"
            />
          </div>
        </div>

        {/* Coin Door Section */}
        <div className="bg-[#0A0D15] border border-slate-800 rounded-md p-2 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-[7px] font-arcade text-slate-500 uppercase">CREDIT 02</div>
            <div className="text-[8px] font-mono text-slate-400">25¢ PLAY</div>
          </div>

          {/* Dual Lighted Coin Insert Slots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-4 bg-black border border-amber-500/70 rounded-xs flex items-center justify-center">
              <div className="w-0.5 h-2.5 bg-amber-400 animate-pulse" />
            </div>
            <div className="w-2.5 h-4 bg-black border border-amber-500/70 rounded-xs flex items-center justify-center">
              <div className="w-0.5 h-2.5 bg-amber-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Cabinet Action Links: GitHub & Details */}
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-slate-800/80 hover:bg-slate-700 text-white font-arcade text-[8px] py-1.5 px-2 rounded flex items-center justify-center gap-1 border border-slate-700 transition-colors"
          >
            <Github className="w-3 h-3" />
            <span>GITHUB</span>
          </a>

          {onSelectProject && (
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className={`font-arcade text-[8px] py-1.5 px-2.5 rounded font-bold transition-all text-slate-900 ${themeClasses.btnColor}`}
            >
              CODE ↗
            </button>
          )}
        </div>

        {/* Side Art Tag */}
        <div className="text-center mt-1.5">
          <span className="font-mono text-[7px] text-slate-600 tracking-tighter uppercase">
            {sideArtTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
