import React from 'react';

export const RetroStatusBar: React.FC = () => {
  return (
    <div className="w-full bg-bg-subtle/80 backdrop-blur-md border-y border-border/80 py-2 select-none overflow-x-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 font-mono text-[11px] whitespace-nowrap">
        
        {/* Left: Live Status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-text-muted">ROLE:</span>
          <span className="text-accent font-medium">FRONTEND WEB DEV INTERN</span>
          <span className="text-text-muted">@ CREATIVEMU ACADEMY</span>
        </div>

        {/* Center: RPG Stats */}
        <div className="hidden md:flex items-center gap-4 text-text-secondary">
          <div className="flex items-center gap-1.5">
            <span className="text-rose-400">♥ HP:</span>
            <div className="w-12 h-2 bg-bg-card rounded-full overflow-hidden border border-border">
              <div className="w-full h-full bg-rose-500"></div>
            </div>
            <span>100/100</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-amber-400">☕ COFFEE:</span>
            <div className="w-12 h-2 bg-bg-card rounded-full overflow-hidden border border-border">
              <div className="w-5/6 h-full bg-amber-500"></div>
            </div>
            <span>92%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-cyan-400">★ EXP:</span>
            <span className="text-text-primary">10+ REPOS</span>
          </div>
        </div>

        {/* Right: Academic Status */}
        <div className="flex items-center gap-2 text-text-muted">
          <span>LVL:</span>
          <span className="text-text-primary font-medium">SEM 6 INFORMATICS</span>
          <span className="hidden lg:inline text-text-muted">· UNU YOGYAKARTA</span>
        </div>

      </div>
    </div>
  );
};
