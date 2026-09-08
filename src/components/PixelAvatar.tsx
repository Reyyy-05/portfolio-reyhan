import React from 'react';

/**
 * PixelArtDevStation: Crisp vector pixel-art developer at workstation
 * Pure SVG with crispEdges rendering — ultra-sharp at any resolution!
 */
export const PixelAvatar: React.FC = () => {
  return (
    <div className="relative inline-block select-none group">
      {/* Outer Retro Glow Card */}
      <div className="relative bg-bg-card border-2 border-border p-4 rounded-2xl shadow-pixel hover:border-accent/60 transition-all duration-300">
        
        {/* Pixel Art Scene (SVG 32x32 pixel grid scaled up) */}
        <div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center relative overflow-hidden bg-[#0A0E17] rounded-xl border border-border/50">
          
          {/* Subtle scanline grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-60"></div>
          
          <svg
            viewBox="0 0 32 32"
            className="w-full h-full"
            style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
          >
            {/* Background Room Wall */}
            <rect x="0" y="0" width="32" height="32" fill="#0D1321" />
            <rect x="2" y="3" width="28" height="1" fill="#182338" />
            
            {/* Poster / Certificate on Wall */}
            <rect x="3" y="5" width="7" height="6" fill="#1B263B" />
            <rect x="4" y="6" width="5" height="4" fill="#0D1321" />
            <rect x="5" y="7" width="3" height="1" fill="#10B981" />
            <rect x="5" y="8" width="2" height="1" fill="#38BDF8" />

            {/* Window with Night Stars */}
            <rect x="22" y="4" width="8" height="8" fill="#080C15" />
            <rect x="23" y="5" width="6" height="6" fill="#040810" />
            <rect x="24" y="6" width="1" height="1" fill="#F8FAFC" className="animate-pulse" />
            <rect x="27" y="8" width="1" height="1" fill="#38BDF8" />
            <rect x="25" y="9" width="1" height="1" fill="#F59E0B" />

            {/* Desk Surface */}
            <rect x="2" y="21" width="28" height="2" fill="#334155" />
            <rect x="2" y="23" width="28" height="8" fill="#1E293B" />

            {/* Laptop Stand & Base */}
            <rect x="9" y="19" width="14" height="2" fill="#475569" />
            
            {/* Laptop Glowing Screen (Next.js / Code Theme) */}
            <rect x="10" y="12" width="12" height="8" fill="#020617" />
            <rect x="11" y="13" width="10" height="6" fill="#064E3B" />
            {/* Simulated Code Lines */}
            <rect x="12" y="14" width="4" height="1" fill="#10B981" />
            <rect x="17" y="14" width="3" height="1" fill="#34D399" />
            <rect x="13" y="15" width="6" height="1" fill="#6EE7B7" />
            <rect x="12" y="16" width="2" height="1" fill="#F59E0B" />
            <rect x="15" y="16" width="4" height="1" fill="#38BDF8" />
            <rect x="12" y="17" width="5" height="1" fill="#A7F3D0" />
            {/* Blinking Cursor */}
            <rect x="18" y="17" width="1" height="1" fill="#FFFFFF" className="animate-blink" />

            {/* Coffee Mug with Steaming Vapor */}
            <rect x="25" y="18" width="3" height="3" fill="#E2E8F0" />
            <rect x="28" y="19" width="1" height="2" fill="#CBD5E1" />
            <rect x="25" y="18" width="3" height="1" fill="#78350F" />
            {/* Pixel Steam */}
            <rect x="26" y="16" width="1" height="1" fill="#94A3B8" className="animate-bounce" />
            <rect x="27" y="15" width="1" height="1" fill="#64748B" />

            {/* Developer Character */}
            {/* Hair */}
            <rect x="13" y="6" width="7" height="3" fill="#1E1B18" />
            <rect x="12" y="8" width="9" height="2" fill="#1E1B18" />
            
            {/* Face */}
            <rect x="13" y="9" width="6" height="4" fill="#FBCFE8" />
            {/* Glasses */}
            <rect x="13" y="10" width="3" height="1" fill="#0F172A" />
            <rect x="17" y="10" width="2" height="1" fill="#0F172A" />
            <rect x="16" y="10" width="1" height="1" fill="#475569" />
            
            {/* Eyes */}
            <rect x="14" y="10" width="1" height="1" fill="#0284C7" />
            <rect x="18" y="10" width="1" height="1" fill="#0284C7" />
            {/* Smile */}
            <rect x="15" y="12" width="2" height="1" fill="#E11D48" />

            {/* Torso / Hoodie (Dark Emerald / Charcoal) */}
            <rect x="11" y="13" width="10" height="7" fill="#0F766E" />
            <rect x="14" y="13" width="4" height="6" fill="#115E59" />

            {/* Hands on Keyboard */}
            <rect x="10" y="20" width="3" height="1" fill="#FBCFE8" />
            <rect x="19" y="20" width="3" height="1" fill="#FBCFE8" />

            {/* Keyboard Grid */}
            <rect x="10" y="20" width="12" height="1" fill="#1E293B" />
          </svg>

          {/* Badge Overlay */}
          <div className="absolute bottom-2 left-2 z-20 bg-bg/90 backdrop-blur-md border border-accent/30 rounded-md px-2 py-0.5 font-mono text-[9px] text-accent flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
            <span>CODING @ INTERNSHIP</span>
          </div>

          <div className="absolute top-2 right-2 z-20 font-mono text-[9px] text-text-muted bg-bg/80 border border-border/40 rounded px-1.5 py-0.5">
            16-BIT RETRO
          </div>
        </div>

        {/* Caption */}
        <div className="mt-3 text-center">
          <p className="font-mono text-xs font-semibold text-text-primary">Reyhan Albar Fahryan</p>
          <p className="font-mono text-[10px] text-accent mt-0.5">Frontend Web Dev Intern · Creativemu Academy</p>
        </div>
      </div>
    </div>
  );
};
