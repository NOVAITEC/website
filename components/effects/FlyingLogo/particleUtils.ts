// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - UTILITY FUNCTIONS
// =============================================================================
// Calm, ambient animation - particles float gently through the page

import { Particle, ParticleType, ParticleConfig, DEFAULT_CONFIG } from './types';

// =============================================================================
// RANDOM UTILITIES
// =============================================================================

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

// Smooth easing for gentle transitions
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// =============================================================================
// COLOR UTILITIES
// =============================================================================

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// =============================================================================
// PARTICLE SPAWNING
// =============================================================================

export function createParticles(
  count: number,
  config: ParticleConfig = DEFAULT_CONFIG
): Particle[] {
  const particles: Particle[] = [];

  // Distribution: 60% nodes, 25% trails, 15% accents (very few amber)
  const nodeCount = Math.floor(count * 0.6);
  const trailCount = Math.floor(count * 0.25);
  const accentCount = count - nodeCount - trailCount;

  // Create nodes (primary teal particles)
  for (let i = 0; i < nodeCount; i++) {
    particles.push(createParticle('node', i, config));
  }

  // Create trails (subtle particles)
  for (let i = 0; i < trailCount; i++) {
    particles.push(createParticle('trail', nodeCount + i, config));
  }

  // Create accents (amber - very few)
  for (let i = 0; i < accentCount; i++) {
    particles.push(createParticle('accent', nodeCount + trailCount + i, config));
  }

  return particles;
}

function createParticle(
  type: ParticleType,
  index: number,
  config: ParticleConfig
): Particle {
  const sizeRange = config.sizes[type];
  const opacityRange = config.opacity[type];

  // Color based on type
  let color: string;
  switch (type) {
    case 'accent':
      color = config.colors.accent;
      break;
    case 'trail':
      color = config.colors.neutral;
      break;
    default:
      color = config.colors.primary;
  }

  // Distribute particles across the viewport
  // Start from random positions - scattered throughout the page
  const x = randomRange(5, 95);
  const y = randomRange(5, 95);

  return {
    id: `particle-${type}-${index}`,
    type,
    size: randomRange(sizeRange.min, sizeRange.max),
    color,
    opacity: randomRange(opacityRange.min, opacityRange.max),
    glowIntensity: type === 'accent' ? randomRange(0.5, 0.7) : randomRange(0.3, 0.5),
    x,
    y,
    // Gentle floating - different speeds and phases for organic feel
    floatSpeed: randomRange(0.3, 0.8),
    floatPhase: randomRange(0, Math.PI * 2),
    floatRadius: randomRange(15, 40),
    // Drift with scroll
    driftSpeed: randomRange(0.8, 1.2),
    // Staggered entrance - particles fade in one by one
    entranceDelay: randomRange(0, 2.5),
  };
}

// =============================================================================
// POSITION CALCULATION
// =============================================================================

export function calculateParticlePosition(
  particle: Particle,
  scrollProgress: number,
  canvasWidth: number,
  canvasHeight: number,
  time: number = 0
): { x: number; y: number; opacity: number; scale: number } {
  // Base position (percentage to pixels)
  let x = (particle.x / 100) * canvasWidth;
  let y = (particle.y / 100) * canvasHeight;

  // =========================================================================
  // 1. ENTRANCE ANIMATION
  // Particles gently fade in and drift from slightly above their position
  // =========================================================================
  const entranceProgress = Math.max(0, Math.min(1, (time - particle.entranceDelay) / 1.5));
  const entranceEased = easeOutCubic(entranceProgress);

  // Before entrance is complete, offset position slightly upward
  const entranceOffsetY = (1 - entranceEased) * -30;
  y += entranceOffsetY;

  // =========================================================================
  // 2. GENTLE FLOATING MOTION (constant, subtle)
  // Creates a soft, organic hovering effect
  // =========================================================================
  const floatTime = time * particle.floatSpeed;

  // Lissajous-like pattern for smooth, non-repetitive motion
  const floatX = Math.sin(floatTime + particle.floatPhase) * particle.floatRadius;
  const floatY = Math.cos(floatTime * 0.7 + particle.floatPhase) * particle.floatRadius * 0.6;

  x += floatX;
  y += floatY;

  // =========================================================================
  // 3. SCROLL-BASED DRIFT
  // Particles gently drift with the page as you scroll
  // =========================================================================
  const scrollDrift = scrollProgress * canvasHeight * 0.3 * particle.driftSpeed;
  y += scrollDrift;

  // =========================================================================
  // 4. OPACITY
  // Entrance fade + slight breathing effect
  // =========================================================================
  let opacity = particle.opacity * entranceEased;

  // Subtle breathing - particles gently pulse
  const breathe = 1 + Math.sin(time * 0.5 + particle.floatPhase) * 0.1;
  opacity *= breathe;

  // Fade out particles that have drifted too far down
  const yPercent = y / canvasHeight;
  if (yPercent > 1.2) {
    opacity *= Math.max(0, 1 - (yPercent - 1.2) * 5);
  }
  if (yPercent < -0.2) {
    opacity *= Math.max(0, 1 - (-0.2 - yPercent) * 5);
  }

  // =========================================================================
  // 5. SCALE
  // Subtle scale variation for depth
  // =========================================================================
  const scale = 0.9 + entranceEased * 0.1 + Math.sin(time * 0.3 + particle.floatPhase) * 0.05;

  // Keep particles somewhat in bounds (with generous padding)
  x = Math.max(-50, Math.min(canvasWidth + 50, x));

  return { x, y, opacity: Math.max(0, Math.min(1, opacity)), scale };
}

// =============================================================================
// DEVICE DETECTION
// =============================================================================

export function getParticleCount(config: ParticleConfig = DEFAULT_CONFIG): number {
  if (typeof window === 'undefined') return config.count.desktop;

  const width = window.innerWidth;
  if (width < 768) return config.count.mobile;
  if (width < 1024) return config.count.tablet;
  return config.count.desktop;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// =============================================================================
// CONNECTION LINE UTILITIES
// Subtle connections between nearby particles
// =============================================================================

export function getParticleConnections(
  particles: Array<{ x: number; y: number; opacity: number }>,
  maxDistance: number = 120
): Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> {
  const connections: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];

  // Limit connections - very few for subtlety
  const maxConnections = 10;
  let connectionCount = 0;

  for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
    for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        // Very subtle connection lines
        const opacity = (1 - distance / maxDistance) * 0.08 *
          Math.min(particles[i].opacity, particles[j].opacity);

        if (opacity > 0.01) {
          connections.push({
            x1: particles[i].x,
            y1: particles[i].y,
            x2: particles[j].x,
            y2: particles[j].y,
            opacity,
          });
          connectionCount++;
        }
      }
    }
  }

  return connections;
}
