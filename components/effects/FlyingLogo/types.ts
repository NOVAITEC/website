// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - TYPE DEFINITIONS
// =============================================================================

export type ParticleType = 'node' | 'accent' | 'trail';

export type ScrollZone =
  | 'hero'           // 0-8% - Initial explosion from center
  | 'about'          // 8-15% - Drift and float
  | 'problem-intro'  // 15-22% - "Herkenbaar?" - Swirl around title
  | 'problem-admin'  // 22-32% - Admin molen - Cascade like falling papers
  | 'problem-staff'  // 32-42% - Staff dilemma - Split and reform
  | 'problem-research' // 42-52% - Research gap - Orbit and scatter
  | 'problem-transition' // 52-60% - Transition - Gather and pulse
  | 'services'       // 60-85% - Horizontal flow with chaos
  | 'contact';       // 85-100% - Grand finale convergence

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

  // Chaos factors (for unpredictable movement)
  chaosX: number;         // random offset multiplier for X
  chaosY: number;         // random offset multiplier for Y
  wobbleFreq: number;     // oscillation frequency
  wobbleAmp: number;      // oscillation amplitude

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
// Updated to match the actual page sections with Problem slides
export const SCROLL_ZONES = {
  hero: { start: 0, end: 0.08 },
  about: { start: 0.08, end: 0.15 },
  'problem-intro': { start: 0.15, end: 0.22 },
  'problem-admin': { start: 0.22, end: 0.32 },
  'problem-staff': { start: 0.32, end: 0.42 },
  'problem-research': { start: 0.42, end: 0.52 },
  'problem-transition': { start: 0.52, end: 0.60 },
  services: { start: 0.60, end: 0.85 },
  contact: { start: 0.85, end: 1.0 },
} as const;

// Default particle configuration
export const DEFAULT_CONFIG: ParticleConfig = {
  count: {
    desktop: 60,
    tablet: 40,
    mobile: 24,
  },
  colors: {
    primary: '#06B6D4',   // Vibrant Teal
    accent: '#F59E0B',    // Amber Gold
    neutral: '#FFFFFF',   // White
  },
  sizes: {
    node: { min: 4, max: 10 },
    accent: { min: 12, max: 20 },
    trail: { min: 2, max: 5 },
  },
  opacity: {
    node: { min: 0.4, max: 0.7 },
    accent: { min: 0.5, max: 0.9 },
    trail: { min: 0.15, max: 0.35 },
  },
};
