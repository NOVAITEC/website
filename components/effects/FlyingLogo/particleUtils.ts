// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - UTILITY FUNCTIONS
// =============================================================================
// Particles are attracted to focus points to guide user attention

import {
  Particle,
  ParticleType,
  ParticleConfig,
  FocusPoint,
  SECTION_FOCUS,
  DEFAULT_CONFIG,
} from './types';

// =============================================================================
// RANDOM UTILITIES
// =============================================================================

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
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

  // Distribution: 60% nodes (teal), 25% trails (subtle), 15% accents (amber)
  const nodeCount = Math.floor(count * 0.6);
  const trailCount = Math.floor(count * 0.25);
  const accentCount = count - nodeCount - trailCount;

  for (let i = 0; i < nodeCount; i++) {
    particles.push(createParticle('node', i, config));
  }

  for (let i = 0; i < trailCount; i++) {
    particles.push(createParticle('trail', nodeCount + i, config));
  }

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

  // Distribute starting positions across the viewport
  // Bias toward edges so they can "flow" toward focus points
  const edgeBias = Math.random() < 0.6;
  let startX: number;
  let startY: number;

  if (edgeBias) {
    // Start from edges
    const side = Math.floor(Math.random() * 4);
    switch (side) {
      case 0: // Top
        startX = randomRange(10, 90);
        startY = randomRange(-5, 15);
        break;
      case 1: // Right
        startX = randomRange(85, 105);
        startY = randomRange(10, 90);
        break;
      case 2: // Bottom
        startX = randomRange(10, 90);
        startY = randomRange(85, 105);
        break;
      default: // Left
        startX = randomRange(-5, 15);
        startY = randomRange(10, 90);
    }
  } else {
    // Some particles start scattered throughout
    startX = randomRange(10, 90);
    startY = randomRange(10, 90);
  }

  return {
    id: `particle-${type}-${index}`,
    type,
    size: randomRange(sizeRange.min, sizeRange.max),
    color,
    opacity: randomRange(opacityRange.min, opacityRange.max),
    glowIntensity: type === 'accent' ? randomRange(0.5, 0.7) : randomRange(0.3, 0.5),
    startX,
    startY,
    floatSpeed: randomRange(0.3, 0.7),
    floatPhase: randomRange(0, Math.PI * 2),
    attractionStrength: randomRange(0.7, 1.3),
    entranceDelay: randomRange(0, 2),
  };
}

// =============================================================================
// FOCUS POINT CALCULATIONS
// =============================================================================

function getBlendedFocusPoints(scrollProgress: number): { points: FocusPoint[]; blend: number } {
  // Find current and next section for smooth transitions
  for (let i = 0; i < SECTION_FOCUS.length; i++) {
    const section = SECTION_FOCUS[i];
    if (scrollProgress >= section.start && scrollProgress < section.end) {
      // Calculate blend factor for transition (last 20% of section blends to next)
      const sectionProgress = (scrollProgress - section.start) / (section.end - section.start);
      const transitionStart = 0.8;

      if (sectionProgress > transitionStart && i < SECTION_FOCUS.length - 1) {
        const blend = (sectionProgress - transitionStart) / (1 - transitionStart);
        return { points: section.points, blend: easeInOutQuad(blend) };
      }

      return { points: section.points, blend: 0 };
    }
  }

  return { points: SECTION_FOCUS[SECTION_FOCUS.length - 1].points, blend: 0 };
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
  // =========================================================================
  // 1. ENTRANCE ANIMATION
  // =========================================================================
  const entranceProgress = Math.max(0, Math.min(1, (time - particle.entranceDelay) / 1.2));
  const entranceEased = easeOutCubic(entranceProgress);

  if (entranceProgress <= 0) {
    return { x: -100, y: -100, opacity: 0, scale: 0 };
  }

  // =========================================================================
  // 2. GET CURRENT FOCUS POINTS
  // =========================================================================
  const { points: focusPoints } = getBlendedFocusPoints(scrollProgress);

  // Convert starting position to pixels
  let x = (particle.startX / 100) * canvasWidth;
  let y = (particle.startY / 100) * canvasHeight;

  // =========================================================================
  // 3. ATTRACTION TO FOCUS POINTS
  // Particles are pulled toward the nearest/strongest focus point
  // =========================================================================
  if (focusPoints.length > 0) {
    // Find the focus point with strongest pull on this particle
    let totalPullX = 0;
    let totalPullY = 0;
    let totalWeight = 0;

    focusPoints.forEach((point, index) => {
      // Convert focus point to pixels
      const focusX = (point.x / 100) * canvasWidth;
      const focusY = (point.y / 100) * canvasHeight;

      // Distance from particle start to focus point
      const dx = focusX - x;
      const dy = focusY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Weight based on distance and point strength
      // Closer points have more influence
      const weight = point.strength / (1 + distance / 500);

      // Target position is around the focus point at its radius
      // Use particle's phase to distribute around the point
      const angle = particle.floatPhase + index * 1.5 + time * 0.1 * particle.floatSpeed;
      const targetX = focusX + Math.cos(angle) * point.radius * (0.5 + Math.random() * 0.5);
      const targetY = focusY + Math.sin(angle) * point.radius * (0.5 + Math.random() * 0.5);

      totalPullX += (targetX - x) * weight;
      totalPullY += (targetY - y) * weight;
      totalWeight += weight;
    });

    if (totalWeight > 0) {
      // Apply attraction with particle's individual strength
      const attractionFactor = 0.7 * particle.attractionStrength * entranceEased;
      x += (totalPullX / totalWeight) * attractionFactor;
      y += (totalPullY / totalWeight) * attractionFactor;
    }
  }

  // =========================================================================
  // 4. GENTLE FLOATING MOTION
  // Subtle organic movement around the attracted position
  // =========================================================================
  const floatTime = time * particle.floatSpeed;
  const floatX = Math.sin(floatTime + particle.floatPhase) * 20;
  const floatY = Math.cos(floatTime * 0.8 + particle.floatPhase) * 15;

  x += floatX;
  y += floatY;

  // =========================================================================
  // 5. ENTRANCE OFFSET
  // Particles drift in from their starting position
  // =========================================================================
  const startPosX = (particle.startX / 100) * canvasWidth;
  const startPosY = (particle.startY / 100) * canvasHeight;

  // Blend from start position to calculated position during entrance
  x = startPosX + (x - startPosX) * entranceEased;
  y = startPosY + (y - startPosY) * entranceEased;

  // =========================================================================
  // 6. OPACITY & SCALE
  // =========================================================================
  let opacity = particle.opacity * entranceEased;

  // Subtle breathing
  opacity *= 1 + Math.sin(time * 0.4 + particle.floatPhase) * 0.1;

  // Fade particles near edges
  const edgeFadeX = Math.min(x / 100, (canvasWidth - x) / 100, 1);
  const edgeFadeY = Math.min(y / 100, (canvasHeight - y) / 100, 1);
  opacity *= Math.min(edgeFadeX, edgeFadeY);

  const scale = 0.9 + entranceEased * 0.1;

  // Keep in bounds
  x = Math.max(-30, Math.min(canvasWidth + 30, x));
  y = Math.max(-30, Math.min(canvasHeight + 30, y));

  return {
    x,
    y,
    opacity: Math.max(0, Math.min(1, opacity)),
    scale,
  };
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
// CONNECTION LINES
// Connect particles that are near the same focus point
// =============================================================================

export function getParticleConnections(
  particles: Array<{ x: number; y: number; opacity: number }>,
  maxDistance: number = 100
): Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> {
  const connections: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];

  const maxConnections = 12;
  let connectionCount = 0;

  for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
    for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.1 *
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
