'use client';

import React, { useState } from 'react';
import { projectsData } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { Layers, Sparkles, Filter } from 'lucide-react';

type FilterType = 'all' | 'featured' | 'web' | 'mobile' | 'systems';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('featured');

  const filterTabs = [
    { id: 'featured', label: 'Proyek Unggulan (5)' },
    { id: 'all', label: 'Semua Karya (10)' },
    { id: 'web', label: 'Web Applications' },
    { id: 'mobile', label: 'Mobile Apps (Expo)' },
    { id: 'systems', label: 'Systems & Data' },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'featured') return p.featured;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return p.category === 'web';
    if (activeFilter === 'mobile') return p.category === 'mobile';
    if (activeFilter === 'systems') return p.category === 'systems' || p.category === 'collab';
    return true;
  });

  return (
    <section id="projects" className="py-24 relative bg-bg-subtle/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Katalog Portofolio GitHub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Proyek & Repositori Teruji
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-2 max-w-xl">
              Seluruh proyek di bawah ini merupakan karya nyata yang dibangun dari nol, lengkap dengan repositori kode publik di GitHub dan arsitektur frontend teruji.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-bg-card/80 p-1.5 rounded-xl border border-border">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterType)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  activeFilter === tab.id
                    ? 'bg-accent text-bg font-bold shadow-sm'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 bg-bg-card/40 border border-border/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-mono text-sm font-semibold text-text-primary">
              Mencari repositori eksperimen lainnya?
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Jelajahi commit log dan eksplorasi open-source saya langsung di GitHub profil.
            </p>
          </div>
          <a
            href="https://github.com/Reyyy-05"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:text-accent-hover font-semibold px-4 py-2.5 rounded-lg border border-accent/30 bg-accent/10 hover:bg-accent hover:text-bg transition-all whitespace-nowrap"
          >
            Buka GitHub @Reyyy-05 ↗
          </a>
        </div>

      </div>
    </section>
  );
};
