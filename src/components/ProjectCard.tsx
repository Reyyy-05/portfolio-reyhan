'use client';

import React, { useState } from 'react';
import { Github, ExternalLink, Code2, ChevronDown, ChevronUp, CheckCircle2, Cpu } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showCode, setShowCode] = useState(false);

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Production':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'MVP':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Collaboration':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="group bg-bg-card/70 hover:bg-bg-card border border-border/80 hover:border-accent/50 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-glow-emerald flex flex-col justify-between">
      
      {/* Card Header: Category & Status */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] bg-bg-surface text-accent px-2.5 py-1 rounded-md border border-accent/20 font-semibold">
              {project.pixelBadge}
            </span>
            <span className="font-mono text-xs text-text-muted">
              {project.categoryLabel}
            </span>
          </div>

          <span
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-mono text-xs text-accent-cyan mt-1 mb-3">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Engineering Highlight Box (The Frontend/Full-Stack Craft) */}
        <div className="bg-bg-surface/80 border-l-2 border-accent rounded-r-xl p-3.5 mb-5 text-xs text-text-secondary leading-relaxed">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-accent uppercase tracking-wider mb-1 font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Frontend & Architecture Highlight</span>
          </div>
          <p className="text-slate-300">{project.engineeringHighlight}</p>
        </div>

        {/* Code Snippet Drawer (If Available) */}
        {project.codeSnippetPreview && (
          <div className="mb-4">
            <button
              onClick={() => setShowCode(!showCode)}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-muted hover:text-text-primary py-1 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-accent" />
              <span>{showCode ? 'Tutup Cuplikan Kode' : 'Lihat Cuplikan Kode (' + project.codeSnippetPreview.filename + ')'}</span>
              {showCode ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showCode && (
              <div className="mt-2 bg-[#0A0E17] border border-border/80 rounded-xl p-3 overflow-x-auto font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border/40 pb-1.5 mb-2 text-[10px] text-text-muted">
                  <span>{project.codeSnippetPreview.filename}</span>
                  <span className="text-accent">{project.codeSnippetPreview.language}</span>
                </div>
                <pre className="text-emerald-300/90 leading-relaxed text-[11px]">
                  <code>{project.codeSnippetPreview.snippet}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] bg-bg-surface/60 text-slate-300 border border-border/50 rounded-md px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Real GitHub Repo Link */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-text-primary hover:text-accent transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>Buka Repositori GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:translate-x-0.5 transition-transform" />
        </a>

        {project.metrics && (
          <span className="font-mono text-[10px] text-text-muted bg-bg-surface px-2 py-0.5 rounded border border-border/40">
            {project.metrics.label}: <strong className="text-accent">{project.metrics.value}</strong>
          </span>
        )}
      </div>

    </div>
  );
};
