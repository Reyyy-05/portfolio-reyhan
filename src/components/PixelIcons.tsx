import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * PixelScroll: HTML5 Ancient Scroll with seal
 */
export const PixelScroll: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Scroll Parchment Body */}
    <rect x="4" y="3" width="16" height="18" fill="#FDE68A" />
    <rect x="3" y="2" width="18" height="2" fill="#D97706" />
    <rect x="3" y="20" width="18" height="2" fill="#D97706" />
    <rect x="2" y="3" width="2" height="18" fill="#B45309" />
    <rect x="20" y="3" width="2" height="18" fill="#B45309" />
    {/* Inside Text lines */}
    <rect x="6" y="6" width="12" height="2" fill="#78350F" />
    <rect x="6" y="10" width="8" height="2" fill="#92400E" />
    {/* Red HTML5 Badge */}
    <rect x="8" y="13" width="8" height="6" fill="#EF4444" />
    <rect x="10" y="14" width="4" height="4" fill="#FFFFFF" />
    <rect x="11" y="15" width="2" height="2" fill="#EF4444" />
  </svg>
);

/**
 * PixelPotion: CSS3 Glass flask with cyan/blue potion & cork
 */
export const PixelPotion: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Cork */}
    <rect x="10" y="2" width="4" height="3" fill="#B45309" />
    <rect x="9" y="4" width="6" height="2" fill="#92400E" />
    {/* Bottle Neck */}
    <rect x="10" y="5" width="4" height="4" fill="#38BDF8" opacity="0.8" />
    {/* Bottle Body */}
    <rect x="6" y="9" width="12" height="12" fill="#0284C7" />
    <rect x="5" y="11" width="14" height="8" fill="#0284C7" />
    {/* Glass Highlights */}
    <rect x="7" y="11" width="2" height="6" fill="#BAE6FD" />
    <rect x="8" y="10" width="2" height="2" fill="#FFFFFF" />
    {/* Liquid Glow & Bubble */}
    <rect x="12" y="13" width="4" height="4" fill="#38BDF8" />
    <rect x="14" y="15" width="2" height="2" fill="#FFFFFF" />
    <rect x="10" y="17" width="2" height="2" fill="#38BDF8" />
  </svg>
);

/**
 * PixelWand: JavaScript Magic Wand with glowing star & sparks
 */
export const PixelWand: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Golden Star Tip */}
    <rect x="15" y="2" width="4" height="4" fill="#FBBF24" />
    <rect x="13" y="4" width="8" height="2" fill="#F59E0B" />
    <rect x="16" y="1" width="2" height="6" fill="#FDE68A" />
    <rect x="14" y="3" width="2" height="2" fill="#FFFFFF" />
    {/* Sparks */}
    <rect x="11" y="2" width="1" height="1" fill="#FEF08A" />
    <rect x="21" y="4" width="1" height="1" fill="#FEF08A" />
    <rect x="19" y="8" width="1" height="1" fill="#FEF08A" />
    {/* Wooden Wand Shaft */}
    <rect x="13" y="7" width="3" height="3" fill="#92400E" />
    <rect x="10" y="10" width="3" height="3" fill="#78350F" />
    <rect x="7" y="13" width="3" height="3" fill="#92400E" />
    <rect x="4" y="16" width="3" height="3" fill="#78350F" />
    <rect x="2" y="19" width="3" height="3" fill="#451A03" />
  </svg>
);

/**
 * PixelAtom: React Glowing Atomic Core with orbital rings
 */
export const PixelAtom: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Center Core Nucleus */}
    <rect x="10" y="10" width="4" height="4" fill="#67E8F9" />
    <rect x="11" y="11" width="2" height="2" fill="#FFFFFF" />
    {/* Horizontal Ring */}
    <rect x="3" y="11" width="18" height="2" fill="#06B6D4" opacity="0.6" />
    <rect x="2" y="10" width="2" height="4" fill="#22D3EE" />
    <rect x="20" y="10" width="2" height="4" fill="#22D3EE" />
    {/* Diagonal Ring 1 */}
    <rect x="5" y="5" width="3" height="2" fill="#06B6D4" />
    <rect x="8" y="7" width="2" height="2" fill="#0891B2" />
    <rect x="14" y="15" width="2" height="2" fill="#0891B2" />
    <rect x="16" y="17" width="3" height="2" fill="#06B6D4" />
    {/* Diagonal Ring 2 */}
    <rect x="16" y="5" width="3" height="2" fill="#06B6D4" />
    <rect x="14" y="7" width="2" height="2" fill="#0891B2" />
    <rect x="8" y="15" width="2" height="2" fill="#0891B2" />
    <rect x="5" y="17" width="3" height="2" fill="#06B6D4" />
    {/* Orbiting Electrons */}
    <rect x="4" y="11" width="2" height="2" fill="#FFFFFF" />
    <rect x="17" y="6" width="2" height="2" fill="#A5F3FC" />
  </svg>
);

/**
 * PixelGear: Mechanical Cog with lightning bolt (Node.js & Zustand)
 */
export const PixelGear: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Outer Teeth */}
    <rect x="10" y="1" width="4" height="3" fill="#64748B" />
    <rect x="10" y="20" width="4" height="3" fill="#64748B" />
    <rect x="1" y="10" width="3" height="4" fill="#64748B" />
    <rect x="20" y="10" width="3" height="4" fill="#64748B" />
    {/* Corner Teeth */}
    <rect x="4" y="4" width="3" height="3" fill="#475569" />
    <rect x="17" y="4" width="3" height="3" fill="#475569" />
    <rect x="4" y="17" width="3" height="3" fill="#475569" />
    <rect x="17" y="17" width="3" height="3" fill="#475569" />
    {/* Main Gear Body */}
    <rect x="5" y="5" width="14" height="14" fill="#334155" />
    <rect x="7" y="7" width="10" height="10" fill="#1E293B" />
    {/* Golden Lightning in Center */}
    <polygon points="13,6 8,13 12,13 10,18 16,11 12,11" fill="#FBBF24" />
  </svg>
);

/**
 * PixelSnake: Glowing Serpent (Python / Integrity)
 */
export const PixelSnake: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    {/* Staff pole */}
    <rect x="11" y="2" width="2" height="20" fill="#92400E" />
    <rect x="10" y="1" width="4" height="2" fill="#D97706" />
    {/* Coiling Green Snake */}
    <rect x="14" y="4" width="5" height="4" fill="#22C55E" />
    <rect x="18" y="5" width="1" height="1" fill="#DC2626" />
    <rect x="12" y="8" width="4" height="3" fill="#16A34A" />
    <rect x="8" y="11" width="4" height="3" fill="#22C55E" />
    <rect x="12" y="14" width="4" height="3" fill="#16A34A" />
    <rect x="7" y="17" width="4" height="2" fill="#15803D" />
  </svg>
);

/**
 * PixelBranch: Git Branching diamond tree
 */
export const PixelBranch: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <polygon points="12,2 22,12 12,22 2,12" fill="#F97316" />
    <rect x="7" y="7" width="2" height="10" fill="#FFFFFF" />
    <rect x="9" y="10" width="4" height="2" fill="#FFFFFF" />
    <rect x="13" y="7" width="2" height="5" fill="#FFFFFF" />
    <rect x="6" y="6" width="4" height="4" fill="#FFFFFF" />
    <rect x="6" y="14" width="4" height="4" fill="#FFFFFF" />
    <rect x="12" y="6" width="4" height="4" fill="#FFFFFF" />
  </svg>
);

/**
 * PixelWave: Flowing banner / wave (Tailwind CSS)
 */
export const PixelWave: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="3" y="8" width="5" height="3" fill="#38BDF8" />
    <rect x="7" y="6" width="7" height="4" fill="#06B6D4" />
    <rect x="13" y="8" width="5" height="3" fill="#2DD4BF" />
    <rect x="17" y="10" width="4" height="3" fill="#14B8A6" />
    <rect x="3" y="14" width="5" height="3" fill="#06B6D4" />
    <rect x="7" y="12" width="7" height="4" fill="#2DD4BF" />
    <rect x="13" y="14" width="5" height="3" fill="#38BDF8" />
    <rect x="17" y="16" width="4" height="3" fill="#67E8F9" />
  </svg>
);

/**
 * PixelCassette: Retro audio/data cassette tape
 */
export const PixelCassette: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="3" y="4" width="18" height="16" fill="#1E293B" />
    <rect x="2" y="5" width="20" height="14" fill="#1E293B" />
    <rect x="5" y="6" width="14" height="7" fill="#A855F7" />
    <rect x="6" y="7" width="12" height="5" fill="#C084FC" />
    <rect x="7" y="8" width="3" height="3" fill="#0F172A" />
    <rect x="14" y="8" width="3" height="3" fill="#0F172A" />
    <rect x="10" y="9" width="4" height="1" fill="#475569" />
    <polygon points="6,20 18,20 16,16 8,16" fill="#0F172A" />
  </svg>
);

/**
 * PixelDino: Green T-Rex endless runner
 */
export const PixelDino: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="10" y="3" width="9" height="6" fill="#22C55E" />
    <rect x="12" y="4" width="2" height="2" fill="#000000" />
    <rect x="15" y="7" width="5" height="2" fill="#22C55E" />
    <rect x="9" y="8" width="6" height="8" fill="#16A34A" />
    <rect x="7" y="10" width="8" height="6" fill="#22C55E" />
    <rect x="4" y="10" width="4" height="3" fill="#16A34A" />
    <rect x="3" y="11" width="2" height="2" fill="#22C55E" />
    <rect x="15" y="11" width="3" height="1" fill="#22C55E" />
    <rect x="8" y="16" width="2" height="5" fill="#15803D" />
    <rect x="12" y="16" width="2" height="5" fill="#16A34A" />
    <rect x="12" y="21" width="3" height="1" fill="#16A34A" />
  </svg>
);

/**
 * PixelRocket: Retro Space Rocket with thruster
 */
export const PixelRocket: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="11" y="2" width="2" height="2" fill="#EF4444" />
    <rect x="10" y="4" width="4" height="2" fill="#EF4444" />
    <rect x="9" y="6" width="6" height="8" fill="#F8FAFC" />
    <rect x="10" y="8" width="4" height="4" fill="#38BDF8" />
    <rect x="11" y="9" width="2" height="2" fill="#FFFFFF" />
    <rect x="6" y="12" width="3" height="5" fill="#EF4444" />
    <rect x="15" y="12" width="3" height="5" fill="#EF4444" />
    <rect x="10" y="15" width="4" height="4" fill="#F59E0B" />
    <rect x="11" y="18" width="2" height="4" fill="#EF4444" />
  </svg>
);

/**
 * PixelScales: Balance scales of justice (Islamic Inheritance Faraidh)
 */
export const PixelScales: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="11" y="3" width="2" height="16" fill="#F59E0B" />
    <rect x="8" y="19" width="8" height="2" fill="#B45309" />
    <rect x="10" y="2" width="4" height="2" fill="#FBBF24" />
    <rect x="3" y="5" width="18" height="2" fill="#FBBF24" />
    <rect x="4" y="7" width="1" height="5" fill="#B45309" />
    <rect x="8" y="7" width="1" height="5" fill="#B45309" />
    <polygon points="3,12 10,12 8,15 5,15" fill="#F59E0B" />
    <rect x="15" y="7" width="1" height="5" fill="#B45309" />
    <rect x="19" y="7" width="1" height="5" fill="#B45309" />
    <polygon points="14,12 21,12 19,15 16,15" fill="#F59E0B" />
  </svg>
);

/**
 * PixelSprout: Agricultural plant sprout (Pupukku)
 */
export const PixelSprout: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="11" y="10" width="2" height="9" fill="#16A34A" />
    <rect x="8" y="18" width="8" height="3" fill="#78350F" />
    <rect x="6" y="8" width="5" height="3" fill="#22C55E" />
    <rect x="8" y="6" width="3" height="2" fill="#4ADE80" />
    <rect x="13" y="8" width="5" height="3" fill="#22C55E" />
    <rect x="13" y="6" width="3" height="2" fill="#4ADE80" />
    <rect x="11" y="4" width="2" height="3" fill="#38BDF8" />
  </svg>
);

/**
 * PixelMosque: Dome & Minaret (MasjidFlow)
 */
export const PixelMosque: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="11" y="2" width="2" height="2" fill="#FBBF24" />
    <rect x="12" y="1" width="2" height="1" fill="#FDE68A" />
    <rect x="9" y="4" width="6" height="3" fill="#10B981" />
    <rect x="7" y="7" width="10" height="4" fill="#059669" />
    <rect x="6" y="11" width="12" height="9" fill="#064E3B" />
    <rect x="10" y="14" width="4" height="6" fill="#022C22" />
    <rect x="2" y="7" width="3" height="13" fill="#047857" />
    <rect x="3" y="5" width="1" height="2" fill="#10B981" />
    <rect x="19" y="7" width="3" height="13" fill="#047857" />
    <rect x="20" y="5" width="1" height="2" fill="#10B981" />
  </svg>
);

/**
 * PixelShield: Cryptographic lock & shield (StatProv)
 */
export const PixelShield: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <polygon points="4,4 20,4 20,13 12,21 4,13" fill="#0284C7" />
    <polygon points="6,6 18,6 18,12 12,18 6,12" fill="#0369A1" />
    <rect x="10" y="11" width="4" height="4" fill="#FBBF24" />
    <rect x="11" y="8" width="2" height="3" fill="#FDE68A" />
    <rect x="11" y="12" width="2" height="2" fill="#000000" />
  </svg>
);

/**
 * PixelChat: 8-bit Speech Bubble
 */
export const PixelChat: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="3" y="4" width="18" height="12" fill="#EC4899" />
    <rect x="4" y="3" width="16" height="14" fill="#EC4899" />
    <rect x="7" y="9" width="2" height="2" fill="#FFFFFF" />
    <rect x="11" y="9" width="2" height="2" fill="#FFFFFF" />
    <rect x="15" y="9" width="2" height="2" fill="#FFFFFF" />
    <rect x="5" y="16" width="3" height="2" fill="#EC4899" />
    <rect x="4" y="18" width="2" height="2" fill="#EC4899" />
  </svg>
);

/**
 * PixelBrush: Color picker paintbrush
 */
export const PixelBrush: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="16" y="3" width="5" height="5" fill="#F97316" />
    <rect x="13" y="6" width="4" height="4" fill="#EA580C" />
    <rect x="10" y="9" width="4" height="4" fill="#C2410C" />
    <rect x="7" y="12" width="4" height="4" fill="#9A3412" />
    <rect x="4" y="15" width="4" height="4" fill="#FBBF24" />
    <rect x="2" y="18" width="3" height="4" fill="#F59E0B" />
  </svg>
);

/**
 * PixelSpaceship: Sci-Fi Space Cruiser (Voyager)
 */
export const PixelSpaceship: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`pixelated ${className}`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <polygon points="12,2 14,8 19,14 16,19 12,17 8,19 5,14 10,8" fill="#FACC15" />
    <rect x="11" y="6" width="2" height="5" fill="#FEF08A" />
    <rect x="11" y="17" width="2" height="4" fill="#EF4444" />
  </svg>
);
