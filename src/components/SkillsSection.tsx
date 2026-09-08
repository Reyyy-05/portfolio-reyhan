'use client';

import React from 'react';
import { skillsData } from '@/data/projects';
import { Code2, Database, Wrench, Sparkles } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-bg-subtle/40 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Keahlian & Toolkit Rekayasa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Tech Stack & Engineering Craft
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-2">
            Alat dan teknologi yang saya gunakan sehari-hari untuk merancang arsitektur web modern yang cepat dan teruji.
          </p>
        </div>

        {/* 3-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Frontend Core */}
          <div className="bg-bg-card border border-border/80 rounded-2xl p-6 shadow-sm hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-xl bg-accent/10 text-accent">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">Frontend Core</h3>
                <p className="font-mono text-[10px] text-accent">Modern React & Next.js</p>
              </div>
            </div>

            <div className="space-y-4">
              {skillsData.frontend.map((item, idx) => (
                <div key={idx} className="border-b border-border/30 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-text-primary mb-1">
                    <span>{item.name}</span>
                    <span className="font-mono text-[10px] text-accent bg-bg-surface px-1.5 py-0.2 rounded border border-border/50">
                      {item.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted">{item.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Backend & Data */}
          <div className="bg-bg-card border border-border/80 rounded-2xl p-6 shadow-sm hover:border-accent-cyan/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">Backend & Data</h3>
                <p className="font-mono text-[10px] text-accent-cyan">Relational & Provenance</p>
              </div>
            </div>

            <div className="space-y-4">
              {skillsData.backendData.map((item, idx) => (
                <div key={idx} className="border-b border-border/30 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-text-primary mb-1">
                    <span>{item.name}</span>
                    <span className="font-mono text-[10px] text-accent-cyan bg-bg-surface px-1.5 py-0.2 rounded border border-border/50">
                      {item.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted">{item.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Engineering Craft */}
          <div className="bg-bg-card border border-border/80 rounded-2xl p-6 shadow-sm hover:border-accent-purple/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-xl bg-accent-purple/10 text-accent-purple">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">Engineering Craft</h3>
                <p className="font-mono text-[10px] text-accent-purple">Workflow & Aesthetics</p>
              </div>
            </div>

            <div className="space-y-4">
              {skillsData.engineeringCraft.map((item, idx) => (
                <div key={idx} className="border-b border-border/30 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-text-primary mb-1">
                    <span>{item.name}</span>
                    <span className="font-mono text-[10px] text-accent-purple bg-bg-surface px-1.5 py-0.2 rounded border border-border/50">
                      {item.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted">{item.highlight}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
