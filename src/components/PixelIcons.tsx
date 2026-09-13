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

/**
 * MinesweeperIcon: Classic 90s OS Minesweeper Grid
 */
export const MinesweeperIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
  >
    <path d="M0 0h48v48H0z" fill="none" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.5 5.5h29c2.216 0 4 1.785 4 4v29c0 2.216-1.784 4-4 4h-29c-2.216 0-4-1.784-4-4v-29c0-2.215 1.784-4 4-4m5.25 0v37M24 5.5v37m9.25-37v37m9.25-27.78h-37m37 9.25h-37m37 9.25h-37"
    />
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18.474 8.095l1.167-.75v5.5M9.224 8.095l1.167-.75v5.5m26.583 22.999l1.167-.749v5.5M36.1 27.667c0-1.125.992-2.011 2.127-1.788c.745.147 1.34.808 1.413 1.583c.055.576-.122 1.144-.51 1.493c-.718.647-3.03 2.39-3.03 2.39h3.55M26.85 9.167c0-1.124.992-2.011 2.127-1.787c.745.147 1.34.808 1.413 1.582c.055.576-.122 1.144-.51 1.494c-.718.646-3.03 2.39-3.03 2.39h3.55m-12.8 5.571c0-1.125.992-2.011 2.127-1.787c.745.146 1.34.807 1.413 1.582c.055.576-.122 1.144-.51 1.493c-.718.647-3.03 2.39-3.03 2.39h3.55m5.844 8.787c.368.318.725.463 1.616.463h.153c.824 0 1.493-.69 1.493-1.541v0c0-.852-.669-1.542-1.493-1.542h-1.769v-2.416h3.262m5.988-13.464c.368.318.725.464 1.616.464h.153c.824 0 1.493-.69 1.493-1.542v0c0-.852-.669-1.542-1.493-1.542h-1.769V7.346h3.262M30.4 20.274c0 1.006-.795 1.822-1.775 1.822s-1.775-.816-1.775-1.822v0c0-1.006.795-1.822 1.775-1.822h0c.98 0 1.775.816 1.775 1.822" />
      <path d="M30.243 17.267c-.296-.398-.746-.671-1.493-.671h-.125c-.98 0-1.775.815-1.775 1.822v1.856m12.8 0c0 1.006-.795 1.822-1.775 1.822h0c-.98 0-1.775-.816-1.775-1.822v0c0-1.006.795-1.822 1.775-1.822h0c.98 0 1.775.816 1.775 1.822" />
      <path d="M39.493 17.267c-.296-.398-.746-.671-1.493-.671h-.125c-.98 0-1.775.815-1.775 1.822v1.856" />
    </g>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.155 14.721L5.5 17.376m6.655-2.655L5.5 21.375m1.405 2.596l-1.404 1.404m9.249-9.249L6.906 23.97m3.999.001l-5.404 5.404m9.249-9.249l-3.845 3.845m3.845.154l-9.095 9.096m4-.001l-4.154 4.155m9.249-9.25l-5.095 5.096m9.25-9.25l-4.154 4.154m-.001 4l-1.095 1.096m9.25-9.25l-8.154 8.154m-1.096 1.095l-7.49 7.491m8.585-4.586l-6.25 6.25m9.155-9.154l-2.904 2.904M24 26.875l-6.345 6.346m-2.905 6.904l-2.345 2.346m9.25-9.25l-6.904 6.904M24 30.875l-2.345 2.346M24 34.875l-7.595 7.596m9.25-9.25L24 34.875m0 4l-3.595 3.596m9.25-9.25L24 38.875m9.25-5.25l-8.845 8.846m8.845-4.846l-4.845 4.846m4.845-.846l-.845.846"
    />
  </svg>
);

