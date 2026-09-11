'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '@/data/projects';
import {
  PixelMosque,
  PixelBranch,
  PixelScales,
  PixelSprout,
  PixelCassette,
  PixelRocket,
  PixelDino,
  PixelChat,
  PixelBrush,
  PixelSpaceship,
} from './PixelIcons';

interface NeonProjectCardProps {
  project: Project;
  neonColor: 'purple' | 'green' | 'cyan' | 'orange' | 'yellow' | 'pink' | 'silver';
  iconType: 'mosque' | 'branch' | 'scales' | 'sprout' | 'cassette' | 'rocket' | 'dino' | 'chat' | 'brush' | 'spaceship';
  onOpenCode?: (project: Project) => void;
}

export const NeonProjectCard: React.FC<NeonProjectCardProps> = ({
  project,
  neonColor,
  iconType,
  onOpenCode,
}) => {
  const [showCode, setShowCode] = useState(false);

  // Color mappings based on projects.jpeg neon cards
  const colorStyles = {
    purple: {
      border: 'border-[#B026FF]',
      shadow: 'hover:shadow-glow-purple',
      title: 'text-[#E0A7FF]',
      badge: 'text-[#E0A7FF] bg-[#B026FF]/10 border-[#B026FF]/30',
      btn: 'border-[#B026FF] text-[#E0A7FF] hover:bg-[#B026FF] hover:text-black',
    },
    green: {
      border: 'border-[#39FF14]',
      shadow: 'hover:shadow-glow-green',
      title: 'text-[#7DFF68]',
      badge: 'text-[#7DFF68] bg-[#39FF14]/10 border-[#39FF14]/30',
      btn: 'border-[#39FF14] text-[#7DFF68] hover:bg-[#39FF14] hover:text-black',
    },
    cyan: {
      border: 'border-[#00F0FF]',
      shadow: 'hover:shadow-glow-cyan',
      title: 'text-[#78F6FF]',
      badge: 'text-[#78F6FF] bg-[#00F0FF]/10 border-[#00F0FF]/30',
      btn: 'border-[#00F0FF] text-[#78F6FF] hover:bg-[#00F0FF] hover:text-black',
    },
    orange: {
      border: 'border-[#FF7A00]',
      shadow: 'hover:shadow-glow-orange',
      title: 'text-[#FFB066]',
      badge: 'text-[#FFB066] bg-[#FF7A00]/10 border-[#FF7A00]/30',
      btn: 'border-[#FF7A00] text-[#FFB066] hover:bg-[#FF7A00] hover:text-black',
    },
    yellow: {
      border: 'border-[#FFE600]',
      shadow: 'hover:shadow-glow-yellow',
      title: 'text-[#FFF275]',
      badge: 'text-[#FFF275] bg-[#FFE600]/10 border-[#FFE600]/30',
      btn: 'border-[#FFE600] text-[#FFF275] hover:bg-[#FFE600] hover:text-black',
    },
    pink: {
      border: 'border-[#FF2A85]',
      shadow: 'hover:shadow-glow-pink',
      title: 'text-[#FFA1CE]',
      badge: 'text-[#FFA1CE] bg-[#FF2A85]/10 border-[#FF2A85]/30',
      btn: 'border-[#FF2A85] text-[#FFA1CE] hover:bg-[#FF2A85] hover:text-black',
    },
    silver: {
      border: 'border-slate-400',
      shadow: 'hover:shadow-lg',
      title: 'text-slate-200',
      badge: 'text-slate-300 bg-slate-800 border-slate-600',
      btn: 'border-slate-400 text-slate-200 hover:bg-slate-200 hover:text-black',
    },
  }[neonColor];

  // Render pixel icon
  const renderIcon = () => {
    switch (iconType) {
      case 'mosque':
        return <PixelMosque size={36} />;
      case 'branch':
        return <PixelBranch size={36} />;
      case 'scales':
        return <PixelScales size={36} />;
      case 'sprout':
        return <PixelSprout size={36} />;
      case 'cassette':
        return <PixelCassette size={36} />;
      case 'rocket':
        return <PixelRocket size={36} />;
      case 'dino':
        return <PixelDino size={36} />;
      case 'chat':
        return <PixelChat size={36} />;
      case 'brush':
        return <PixelBrush size={36} />;
      case 'spaceship':
        return <PixelSpaceship size={36} />;
      default:
        return <PixelRocket size={36} />;
    }
  };

  return (
    <div
      className={`bg-[#0B0F19]/90 border-2 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative group select-none ${colorStyles.border} ${colorStyles.shadow}`}
    >
      {/* Top Header: Title in Retro Pixel Font */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3
            className={`font-arcade text-sm font-bold tracking-wider uppercase truncate ${colorStyles.title}`}
          >
            {project.title.split(' ')[0]} {project.title.split(' ')[1] || ''}
          </h3>
          <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${colorStyles.badge}`}>
            {project.status}
          </span>
        </div>

        {/* Center Pixel Art Icon Frame */}
        <div className="w-full py-4 bg-[#050811]/90 rounded-xl border border-slate-800/80 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
          {renderIcon()}
        </div>

        {/* Subtitle / Tagline */}
        <p className="font-arcade text-xs text-white tracking-wide mb-1 text-center truncate">
          {project.tagline.split('&')[0] || project.tagline}
        </p>

        {/* Description snippet */}
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-4 text-center line-clamp-2">
          {project.description}
        </p>

        {/* Category and Tech Tags in Retro Pill Format */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap font-arcade text-[8px] text-slate-400 mb-4">
          <span className="text-slate-500 uppercase">{project.categoryLabel.split(' ')[0]}</span>
          <span>•</span>
          {project.techStack.slice(0, 2).map((tech) => (
            <span key={tech} className="bg-slate-800/60 px-1.5 py-0.5 rounded text-slate-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button: VIEW PROJECT (Styled like projects.jpeg) */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 font-arcade text-[10px] tracking-wider uppercase py-2.5 px-3 rounded-lg border-2 text-center transition-all duration-150 flex items-center justify-center gap-1.5 ${colorStyles.btn}`}
          >
            <span>VIEW PROJECT</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {project.codeSnippetPreview && (
            <button
              onClick={() => setShowCode(!showCode)}
              className="p-2 border-2 border-slate-700 hover:border-slate-500 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Cuplikan Kode"
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Code Drawer dropdown */}
        {showCode && project.codeSnippetPreview && (
          <div className="mt-2 bg-[#050811] border border-slate-800 rounded-lg p-2.5 font-mono text-[10px] text-emerald-300">
            <div className="flex justify-between text-[8px] text-slate-500 border-b border-slate-800 pb-1 mb-1">
              <span>{project.codeSnippetPreview.filename}</span>
              <span>{project.codeSnippetPreview.language}</span>
            </div>
            <pre className="overflow-x-auto leading-relaxed">
              <code>{project.codeSnippetPreview.snippet}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
