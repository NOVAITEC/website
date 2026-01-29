// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - TYPE DEFINITIONS
// =============================================================================
// Functional animation that guides user attention to key content

export type ParticleType = 'node' | 'accent' | 'trail';

export interface Particle {
  id: string;
  type: ParticleType;

  // Visual properties
  size: number;
  color: string;
  opacity: number;
  glowIntensity: number;

  // Starting position (percentage of viewport)
  startX: number;
  startY: number;

  // Movement characteristics
  floatSpeed: number;     // Base floating speed
  floatPhase: number;     // Phase offset for organic motion
  attractionStrength: number; // How strongly attracted to focus points (0.5-1.5)

  // Entrance
  entranceDelay: number;
}

// Focus points - where particles are attracted to guide user attention
export interface FocusPoint {
  x: number;  // Percentage of viewport width (0-100)
  y: number;  // Percentage of viewport height (0-100)
  radius: number; // How close particles get (in px)
  strength: number; // Attraction strength multiplier
}

// Section focus configuration
export interface SectionFocus {
  start: number;  // Scroll progress start (0-1)
  end: number;    // Scroll progress end (0-1)
  points: FocusPoint[];
}

export interface ParticleConfig {
  count: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  colors: {
    primary: string;
    accent: string;
    neutral: string;
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

// =============================================================================
// FOCUS POINTS CONFIGURATION
// These guide where particles cluster to draw attention
// =============================================================================

export const SECTION_FOCUS: SectionFocus[] = [
  // HERO (0-12%): Guide attention to CTA button (center-right area)
  {
    start: 0,
    end: 0.12,
    points: [
      { x: 50, y: 65, radius: 150, strength: 1.2 },  // Around CTA button
      { x: 30, y: 40, radius: 100, strength: 0.6 },  // Near headline
    ],
  },
  // ABOUT (12-25%): Focus on the "Over Mij" content
  {
    start: 0.12,
    end: 0.25,
    points: [
      { x: 35, y: 50, radius: 180, strength: 1.0 },  // Left side content
      { x: 70, y: 50, radius: 120, strength: 0.7 },  // Image area
    ],
  },
  // PROBLEM (25-55%): Scattered around the pain points
  {
    start: 0.25,
    end: 0.55,
    points: [
      { x: 50, y: 45, radius: 200, strength: 0.8 },  // Center - main text
      { x: 75, y: 55, radius: 150, strength: 0.9 },  // Right - mockups
    ],
  },
  // SERVICES (55-80%): Highlight the service cards
  {
    start: 0.55,
    end: 0.80,
    points: [
      { x: 25, y: 50, radius: 140, strength: 1.0 },  // Left card
      { x: 50, y: 50, radius: 140, strength: 1.0 },  // Center card
      { x: 75, y: 50, radius: 140, strength: 1.0 },  // Right card
    ],
  },
  // CONTACT (80-100%): Converge toward contact form/CTA
  {
    start: 0.80,
    end: 1.0,
    points: [
      { x: 50, y: 50, radius: 100, strength: 1.5 },  // Contact form center
    ],
  },
];

// Default particle configuration
export const DEFAULT_CONFIG: ParticleConfig = {
  count: {
    desktop: 20,
    tablet: 14,
    mobile: 10,
  },
  colors: {
    primary: '#06B6D4',   // Vibrant Teal
    accent: '#F59E0B',    // Amber Gold
    neutral: '#94A3B8',   // Slate-400
  },
  sizes: {
    node: { min: 3, max: 6 },
    accent: { min: 4, max: 7 },
    trail: { min: 2, max: 4 },
  },
  opacity: {
    node: { min: 0.35, max: 0.55 },
    accent: { min: 0.4, max: 0.65 },
    trail: { min: 0.15, max: 0.3 },
  },
};
