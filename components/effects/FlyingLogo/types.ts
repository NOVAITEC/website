// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - TYPE DEFINITIONS
// =============================================================================

export type ParticleType = 'node' | 'accent' | 'trail';

export type ScrollZone =
  | 'hero'      // 0-10% - Logo explodes into particles
  | 'about'     // 10-20% - Particles drift left
  | 'problem'   // 20-50% - Cascade down with stacking cards
  | 'services'  // 50-85% - Horizontal flow with cinema scroll
  | 'contact';  // 85-100% - Converge to CTA

export interface Particle {
  id: string;
  type: ParticleType;

  // Visual properties
  size: number;           // 2-18px
  color: string;          // hex color
  opacity: number;        // 0-1
  glowIntensity: number;  // 0-1, controls glow strength

  // Position & movement
  x: number;              // current x position (viewport %)
  y: number;              // current y position (viewport %)
  baseX: number;          // original x position
  baseY: number;          // original y position

  // Trajectory
  angle: number;          // radial angle for explosion
  speed: number;          // movement speed multiplier
  phase: number;          // oscillation phase offset

  // Scroll range
  scrollStart: number;    // scroll progress where particle appears (0-1)
  scrollEnd: number;      // scroll progress where particle fades (0-1)
}

export interface ParticleConfig {
  count: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  colors: {
    primary: string;    // Teal
    accent: string;     // Amber
    neutral: string;    // White
  };
  sizes: {
    node: { min: number; max: number };
    accent: { min: number; max: number };
    trail: { min: number; max: number };
  };
  opacity: {
    node: { min: number; max: number };
    accent: { min: number; max: number };
    trail: { min: number; max: number };
  };
}

export interface CanvasSize {
  width: number;
  height: number;
}

// Scroll zone boundaries (as scroll progress 0-1)
export const SCROLL_ZONES = {
  hero: { start: 0, end: 0.10 },
  about: { start: 0.10, end: 0.20 },
  problem: { start: 0.20, end: 0.50 },
  services: { start: 0.50, end: 0.85 },
  contact: { start: 0.85, end: 1.0 },
} as const;

// Default particle configuration
export const DEFAULT_CONFIG: ParticleConfig = {
  count: {
    desktop: 50,
    tablet: 30,
    mobile: 18,
  },
  colors: {
    primary: '#06B6D4',   // Vibrant Teal
    accent: '#F59E0B',    // Amber Gold
    neutral: '#FFFFFF',   // White
  },
  sizes: {
    node: { min: 4, max: 8 },
    accent: { min: 10, max: 16 },
    trail: { min: 2, max: 4 },
  },
  opacity: {
    node: { min: 0.3, max: 0.6 },
    accent: { min: 0.4, max: 0.8 },
    trail: { min: 0.1, max: 0.3 },
  },
};
