// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - UTILITY FUNCTIONS
// =============================================================================

import {
  Particle,
  ParticleType,
  ParticleConfig,
  SCROLL_ZONES,
  DEFAULT_CONFIG,
} from './types';

// =============================================================================
// RANDOM UTILITIES
// =============================================================================

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
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

  // Distribution: 60% nodes, 25% accents, 15% trails
  const nodeCount = Math.floor(count * 0.6);
  const accentCount = Math.floor(count * 0.25);
  const trailCount = count - nodeCount - accentCount;

  // Create nodes (primary teal particles)
  for (let i = 0; i < nodeCount; i++) {
    particles.push(createParticle('node', i, config));
  }

  // Create accents (amber particles)
  for (let i = 0; i < accentCount; i++) {
    particles.push(createParticle('accent', nodeCount + i, config));
  }

  // Create trails (white subtle particles)
  for (let i = 0; i < trailCount; i++) {
    particles.push(createParticle('trail', nodeCount + accentCount + i, config));
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

  // Starting position near center (will explode from here)
  const baseX = 50 + randomRange(-5, 5); // Center with slight variation
  const baseY = 40 + randomRange(-5, 5); // Slightly above center (Hero area)

  // Random angle for radial explosion
  const angle = randomRange(0, Math.PI * 2);

  // Scroll range - particles appear and disappear at different times
  const scrollStart = randomRange(0, 0.05);
  const scrollEnd = randomRange(0.85, 1.0);

  return {
    id: `particle-${type}-${index}`,
    type,
    size: randomRange(sizeRange.min, sizeRange.max),
    color,
    opacity: randomRange(opacityRange.min, opacityRange.max),
    glowIntensity: type === 'accent' ? randomRange(0.6, 1) : randomRange(0.3, 0.7),
    x: baseX,
    y: baseY,
    baseX,
    baseY,
    angle,
    speed: randomRange(0.5, 1.5),
    phase: randomRange(0, Math.PI * 2),
    scrollStart,
    scrollEnd,
  };
}

// =============================================================================
// TRAJECTORY CALCULATIONS
// =============================================================================

export function getScrollZone(scrollProgress: number): keyof typeof SCROLL_ZONES {
  if (scrollProgress < SCROLL_ZONES.hero.end) return 'hero';
  if (scrollProgress < SCROLL_ZONES.about.end) return 'about';
  if (scrollProgress < SCROLL_ZONES.problem.end) return 'problem';
  if (scrollProgress < SCROLL_ZONES.services.end) return 'services';
  return 'contact';
}

export function calculateParticlePosition(
  particle: Particle,
  scrollProgress: number,
  canvasWidth: number,
  canvasHeight: number
): { x: number; y: number; opacity: number } {
  const zone = getScrollZone(scrollProgress);

  // Calculate zone-local progress (0-1 within the current zone)
  const zoneConfig = SCROLL_ZONES[zone];
  const zoneProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - zoneConfig.start) / (zoneConfig.end - zoneConfig.start))
  );

  // Base position as pixels
  let x = (particle.baseX / 100) * canvasWidth;
  let y = (particle.baseY / 100) * canvasHeight;

  // Apply zone-specific trajectory
  switch (zone) {
    case 'hero':
      // Explosion from center - particles spread outward
      const explosionDistance = zoneProgress * 400 * particle.speed;
      const oscillation = Math.sin(zoneProgress * Math.PI * 2 + particle.phase) * 20;
      x += Math.cos(particle.angle) * explosionDistance + oscillation * 0.3;
      y += Math.sin(particle.angle) * explosionDistance + oscillation * 0.5;
      break;

    case 'about':
      // Drift left toward About section text
      const heroEndX = Math.cos(particle.angle) * 400 * particle.speed;
      const heroEndY = Math.sin(particle.angle) * 400 * particle.speed;
      const driftX = -200 * zoneProgress; // Move left
      const driftOscillation = Math.sin(zoneProgress * Math.PI * 3 + particle.phase) * 30;
      x += heroEndX + driftX + driftOscillation * 0.5;
      y += heroEndY + Math.cos(particle.phase + zoneProgress) * 50;
      break;

    case 'problem':
      // Cascade downward in sync with stacking cards
      const aboutEndX = Math.cos(particle.angle) * 400 * particle.speed - 200;
      const cascadeY = zoneProgress * canvasHeight * 0.6;
      const cascadeOscillation = Math.sin(zoneProgress * Math.PI * 4 + particle.phase) * 40;
      x += aboutEndX + cascadeOscillation;
      y += Math.sin(particle.angle) * 400 * particle.speed + cascadeY;
      break;

    case 'services':
      // Horizontal flow matching cinema scroll
      const problemEndY = Math.sin(particle.angle) * 400 * particle.speed + canvasHeight * 0.6;
      const horizontalFlow = -zoneProgress * canvasWidth * 1.5; // Flow left with slides
      const flowOscillation = Math.sin(zoneProgress * Math.PI * 6 + particle.phase) * 25;
      x = (canvasWidth * 0.7) + horizontalFlow + Math.cos(particle.angle) * 100;
      y = canvasHeight * 0.5 + Math.sin(particle.phase + zoneProgress * 2) * 100 + flowOscillation;
      break;

    case 'contact':
      // Converge toward center-bottom (Contact CTA area)
      const targetX = canvasWidth * 0.5;
      const targetY = canvasHeight * 0.6;
      const convergeFactor = zoneProgress;
      const currentX = (canvasWidth * 0.7) - canvasWidth * 1.5 + Math.cos(particle.angle) * 100;
      const currentY = canvasHeight * 0.5 + Math.sin(particle.phase) * 100;
      x = currentX + (targetX - currentX) * convergeFactor;
      y = currentY + (targetY - currentY) * convergeFactor;
      // Spiral inward
      const spiralAngle = particle.phase + zoneProgress * Math.PI * 2;
      const spiralRadius = (1 - convergeFactor) * 50;
      x += Math.cos(spiralAngle) * spiralRadius;
      y += Math.sin(spiralAngle) * spiralRadius;
      break;
  }

  // Calculate opacity based on scroll position and particle's visible range
  let opacity = particle.opacity;

  // Fade in at start
  if (scrollProgress < particle.scrollStart + 0.05) {
    const fadeInProgress = (scrollProgress - particle.scrollStart) / 0.05;
    opacity *= Math.max(0, Math.min(1, fadeInProgress));
  }

  // Fade out at end
  if (scrollProgress > particle.scrollEnd - 0.05) {
    const fadeOutProgress = (particle.scrollEnd - scrollProgress) / 0.05;
    opacity *= Math.max(0, Math.min(1, fadeOutProgress));
  }

  // Keep particles in bounds with some padding
  x = Math.max(-50, Math.min(canvasWidth + 50, x));
  y = Math.max(-50, Math.min(canvasHeight + 50, y));

  return { x, y, opacity };
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
// =============================================================================

export function getParticleConnections(
  particles: Array<{ x: number; y: number; opacity: number }>,
  maxDistance: number = 120
): Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> {
  const connections: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.12 *
          Math.min(particles[i].opacity, particles[j].opacity);

        if (opacity > 0.01) {
          connections.push({
            x1: particles[i].x,
            y1: particles[i].y,
            x2: particles[j].x,
            y2: particles[j].y,
            opacity,
          });
        }
      }
    }
  }

  return connections;
}
