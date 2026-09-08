'use client';

import React from 'react';
import { experienceData } from '@/data/projects';
import { Briefcase, Calendar, GraduationCap, CheckCircle } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Rekam Jejak Profesional & Akademik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Pengalaman & Magang
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-2 max-w-xl">
            Perjalanan memadukan teori ilmu komputer dengan pengalaman rekayasa perangkat lunak di dunia industri nyata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Timeline (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className="relative pl-6 sm:pl-8 border-l-2 border-border/80 hover:border-accent transition-colors group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-bg border-2 border-accent group-hover:scale-125 transition-transform" />

                <div className="bg-bg-card/70 hover:bg-bg-card border border-border/70 rounded-2xl p-6 transition-all shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">{exp.role}</h3>
                      <p className="text-sm font-medium text-accent">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-text-muted bg-bg-surface px-2.5 py-1 rounded-md border border-border/50 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="font-mono text-[10px] bg-accent/10 text-accent border border-accent/25 px-2 py-0.5 rounded-full">
                        {exp.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mt-3 mb-4">
                    {exp.description}
                  </p>

                  {/* Bullet Highlights */}
                  {exp.highlights && (
                    <ul className="space-y-1.5 mb-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] bg-bg-surface text-text-muted px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education Card (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4" />
                <span>Pendidikan Formal</span>
              </div>

              <h4 className="text-lg font-bold text-text-primary">
                Universitas Nahdlatul Ulama Yogyakarta
              </h4>
              <p className="text-sm text-accent font-medium mt-0.5">
                S1 Informatika (Fakultas Teknologi Informasi)
              </p>
              <p className="font-mono text-xs text-text-muted mt-1 mb-4">
                2023 — Sekarang (Semester 6)
              </p>

              <div className="space-y-3 pt-3 border-t border-border text-xs text-text-secondary leading-relaxed">
                <p>
                  • <strong>Fokus Studi:</strong> Rekayasa Perangkat Lunak, Struktur Data & Algoritma, Basis Data Relasional, Keamanan Sistem, dan Kriptografi.
                </p>
                <p>
                  • <strong>Aktivitas & Proyek:</strong> Membangun berbagai MVP aplikasi komunitas (MasjidFlow, BioLearn) dan riset skripsi di bidang <em>Post-Quantum Cryptography & Blockchain</em>.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-text-muted">Status:</span>
                  <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Aktif / On-Track
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
