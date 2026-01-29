// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - TYPE DEFINITIONS
// =============================================================================
// Simplified, elegant version focused on calm, ambient movement

export type ParticleType = 'node' | 'accent' | 'trail';

export interface Particle {
  id: string;
  type: ParticleType;

  // Visual properties
  size: number;           // Particle size in px
  color: string;          // Hex color
  opacity: number;        // Base opacity 0-1
  glowIntensity: number;  // Glow strength 0-1

  // Position
  x: number;              // Current x position (viewport %)
  y: number;              // Current y position (viewport %)

  // Gentle floating movement
  floatSpeed: number;     // How fast this particle floats (0.5-1.5)
  floatPhase: number;     // Phase offset for floating motion (0-2π)
  floatRadius: number;    // How far it moves from base position (20-60px)

  // Vertical drift with scroll
  driftSpeed: number;     // How fast it drifts down with scroll

  // Entrance animation
  entranceDelay: number;  // Delay before particle appears (0-2 seconds)
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
    neutral: string;    // White/subtle
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

// Default particle configuration - simplified and calmer
export const DEFAULT_CONFIG: ParticleConfig = {
  count: {
    desktop: 18,    // Reduced from 60
    tablet: 12,     // Reduced from 40
    mobile: 8,      // Reduced from 24
  },
  colors: {
    primary: '#06B6D4',   // Vibrant Teal
    accent: '#F59E0B',    // Amber Gold (very few)
    neutral: '#94A3B8',   // Slate-400 (subtle)
  },
  sizes: {
    node: { min: 3, max: 6 },       // Smaller, more subtle
    accent: { min: 4, max: 8 },     // Smaller accents
    trail: { min: 2, max: 4 },      // Small trails
  },
  opacity: {
    node: { min: 0.3, max: 0.5 },     // More subtle
    accent: { min: 0.35, max: 0.6 },  // Subtle but visible
    trail: { min: 0.15, max: 0.25 },  // Very subtle
  },
};
