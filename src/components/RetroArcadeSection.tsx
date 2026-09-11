'use client';

import React, { useState } from 'react';
import { projectsData, Project } from '@/data/projects';
import { ArcadeCabinet } from './ArcadeCabinet';
import { NeonProjectCard } from './NeonProjectCard';
import { X, Sparkles, Terminal, Code2, ExternalLink, Github } from 'lucide-react';

export const RetroArcadeSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'featured' | 'web' | 'mobile'>('featured');

  // Featured 3 projects for the 3 arcade machines
  const imgnProject = projectsData.find((p) => p.id === 'imgn-concept-katalog') || projectsData[0];
  const biolearnProject = projectsData.find((p) => p.id === 'biolearn') || projectsData[2];
  const statprovProject = projectsData.find((p) => p.id === 'statprov') || projectsData[1];

  // Neon Cards for other projects
  const neonProjectsConfig = [
    { id: 'masjidflow', color: 'purple' as const, icon: 'mosque' as const },
    { id: 'kairav-studio', color: 'green' as const, icon: 'branch' as const },
    { id: 'kalkulator-ahliwaris', color: 'orange' as const, icon: 'scales' as const },
    { id: 'pupukku', color: 'yellow' as const, icon: 'sprout' as const },
    { id: 'kafebilyar-app', color: 'cyan' as const, icon: 'dino' as const },
    { id: 'smartroutine', color: 'pink' as const, icon: 'cassette' as const },
    { id: 'landingpage-bootcamp', color: 'silver' as const, icon: 'rocket' as const },
  ];

  const neonCards = neonProjectsConfig
    .map((cfg) => {
      const proj = projectsData.find((p) => p.id === cfg.id);
      return proj ? { project: proj, ...cfg } : null;
    })
    .filter(Boolean) as Array<{
    project: Project;
    color: 'purple' | 'green' | 'cyan' | 'orange' | 'yellow' | 'pink' | 'silver';
    icon: 'mosque' | 'branch' | 'scales' | 'sprout' | 'cassette' | 'rocket' | 'dino';
  }>;

  return (
    <section id="projects" className="py-24 relative bg-[#060911] overflow-hidden">
      {/* Background Starry Pixels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle" />
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-twinkle" />
        <div className="absolute top-40 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-60 right-1/4 w-1 h-1 bg-amber-300 rounded-full animate-twinkle" />
        <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle" />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Section Header (Styled after Home.jpeg: PIXEL REALMS PROJECTS) */}
        <div className="text-center mb-10 select-none">
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-cyan-300 tracking-widest text-glow-cyan uppercase mb-2">
            PIXEL REALMS
          </h2>
          <h3 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-pink-500 tracking-widest text-glow-pink uppercase">
            PROJECTS
          </h3>
          <p className="font-mono text-xs sm:text-sm text-slate-400 mt-3 max-w-xl mx-auto">
            10 Proyek Nyata dari GitHub Asli (@Reyyy-05) dengan arsitektur modern, rekam jejak produksi, dan cuplikan kode nyata.
          </p>
        </div>

        {/* Outer Retro Window Frame (As shown in projects.jpeg) */}
        <div className="bg-[#080C16]/95 border-2 border-cyan-500/80 rounded-2xl shadow-glow-cyan overflow-hidden backdrop-blur-xl">
          
          {/* Window Title Bar */}
          <div className="bg-[#0F172A] border-b-2 border-cyan-500/60 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-xs bg-cyan-400 animate-pulse" />
              <span className="font-pixel text-[11px] sm:text-xs text-cyan-300 tracking-wider">
                PROJECTS SHOWCASE
              </span>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                10 ITEMS LOADED
              </span>
              <div className="w-5 h-5 border border-pink-500/70 rounded flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-black cursor-pointer transition-colors">
                <X className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-4 sm:p-6 lg:p-8">
            
            {/* View Filter Switcher for Mobile / Tablet */}
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap font-arcade text-xs">
              <button
                onClick={() => setActiveCategory('featured')}
                className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                  activeCategory === 'featured'
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-glow-cyan'
                    : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                ★ FEATURED ARCADES (3)
              </button>
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                  activeCategory === 'all'
                    ? 'bg-pink-500 text-black border-pink-400 font-bold shadow-glow-pink'
                    : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                ALL WORKS (10)
              </button>
            </div>

            {/* Layout: Desktop Side-by-side or Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: 3 Arcade Cabinets (Featured Web, Mobile, Data) */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  activeCategory === 'all' ? 'hidden lg:block' : 'block'
                }`}
              >
                <div className="text-center lg:text-left mb-4">
                  <span className="font-arcade text-xs text-cyan-400 tracking-wider uppercase">
                    / CORE STACK CABINETS
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mesin arcade fisik untuk 3 karya unggulan utama.
                  </p>
                </div>

                {/* Horizontal row of 3 cabinets (scrollable on tablet, flex on desktop) */}
                <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4 overflow-x-auto pb-4">
                  {/* Cabinet 1: IMGN Concept (Web App) */}
                  <ArcadeCabinet
                    project={imgnProject}
                    arcadeTitle="IMGN CONCEPT"
                    badgeLabel="COMMERCIAL WEB"
                    colorTheme="green"
                    sideArtTitle="FULLSTACK CATALOG"
                    screenType="catalog"
                    onSelectProject={setSelectedProject}
                  />

                  {/* Cabinet 2: BioLearn (Mobile App) */}
                  <ArcadeCabinet
                    project={biolearnProject}
                    arcadeTitle="BIOLEARN"
                    badgeLabel="MOBILE EDTECH"
                    colorTheme="pink"
                    sideArtTitle="EXPO REACT NATIVE"
                    screenType="quiz"
                    onSelectProject={setSelectedProject}
                  />

                  {/* Cabinet 3: StatProv (Data Integrity) */}
                  <ArcadeCabinet
                    project={statprovProject}
                    arcadeTitle="STATPROV"
                    badgeLabel="DATA INTEGRITY"
                    colorTheme="cyan"
                    sideArtTitle="SHA-256 PROVENANCE"
                    screenType="hash"
                    onSelectProject={setSelectedProject}
                  />
                </div>
              </div>

              {/* Right Side: Neon Project Cards (7 Repositories) */}
              <div
                className={`lg:col-span-6 ${
                  activeCategory === 'featured' ? 'hidden lg:block' : 'block'
                }`}
              >
                <div className="text-center lg:text-left mb-4">
                  <span className="font-arcade text-xs text-pink-400 tracking-wider uppercase">
                    / NEON REPO CARDS
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Katalog proyek interaktif dengan direct links ke GitHub.
                  </p>
                </div>

                {/* 2-column Grid of Neon Cards (matching right-hand layout in projects.jpeg) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {neonCards.map((item) => (
                    <NeonProjectCard
                      key={item.project.id}
                      project={item.project}
                      neonColor={item.color}
                      iconType={item.icon}
                      onOpenCode={setSelectedProject}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Horizon: 3D Synthwave Perspective Grid */}
          <div className="relative h-20 w-full overflow-hidden border-t border-cyan-500/40 bg-gradient-to-t from-cyan-950/40 to-transparent">
            <div className="synthwave-grid absolute inset-x-0 -bottom-10 h-32 opacity-70" />
            
            <div className="absolute inset-0 flex items-center justify-between px-6 font-arcade text-[10px] text-cyan-400 select-none">
              <span>READY PLAYER ONE</span>
              <span className="animate-blink text-pink-400">SELECT TO PLAY</span>
              <span className="hidden sm:inline">HIGH SCORE: 999,990</span>
            </div>
          </div>

        </div>

      </div>

      {/* Code Drawer Modal (Interactive Retro Terminal for selected project) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B0F19] border-2 border-cyan-400 rounded-2xl max-w-2xl w-full p-6 shadow-glow-cyan relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h4 className="font-arcade text-sm text-cyan-300 uppercase">
                  {selectedProject.title} // SOURCE DRAWER
                </h4>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-7 h-7 border border-pink-500 rounded flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Architecture Highlight */}
            <div className="bg-slate-900/90 border-l-2 border-cyan-400 p-3 rounded-r-lg mb-4 text-xs text-slate-300">
              <p className="font-arcade text-[10px] text-cyan-400 uppercase mb-1">
                ENGINEERING HIGHLIGHT
              </p>
              <p>{selectedProject.engineeringHighlight}</p>
            </div>

            {/* Code Snippet */}
            {selectedProject.codeSnippetPreview ? (
              <div className="bg-[#050811] border border-slate-800 rounded-xl p-3 mb-4">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 border-b border-slate-800 pb-1 mb-2">
                  <span>{selectedProject.codeSnippetPreview.filename}</span>
                  <span className="text-emerald-400">{selectedProject.codeSnippetPreview.language}</span>
                </div>
                <pre className="font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-48">
                  <code>{selectedProject.codeSnippetPreview.snippet}</code>
                </pre>
              </div>
            ) : (
              <p className="font-mono text-xs text-slate-400 mb-4">
                Repositori kode publik tersedia langsung di GitHub.
              </p>
            )}

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="font-arcade text-[10px] text-slate-500">
                STATUS: <strong className="text-emerald-400">{selectedProject.status}</strong>
              </span>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-arcade text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 shadow-glow-cyan transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>BUKA REPOSITORI GITHUB ↗</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
