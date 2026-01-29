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

// Simplex-like noise approximation for smooth randomness
function noise(x: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

// Smooth interpolation
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

// Ease out cubic for natural deceleration
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Ease in out for smooth transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

  // Distribution: 55% nodes, 30% accents, 15% trails
  const nodeCount = Math.floor(count * 0.55);
  const accentCount = Math.floor(count * 0.30);
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

  // Starting position - ALL particles start from exact center (for explosion)
  const baseX = 50;
  const baseY = 45; // Slightly above center (Hero area)

  // Random angle for radial explosion - distributed evenly with some noise
  const angleOffset = randomRange(-0.3, 0.3);
  const angle = (index / 60) * Math.PI * 2 + angleOffset;

  // Scroll range - all particles visible throughout
  const scrollStart = randomRange(0, 0.02);
  const scrollEnd = randomRange(0.95, 1.0);

  return {
    id: `particle-${type}-${index}`,
    type,
    size: randomRange(sizeRange.min, sizeRange.max),
    color,
    opacity: randomRange(opacityRange.min, opacityRange.max),
    glowIntensity: type === 'accent' ? randomRange(0.7, 1) : randomRange(0.4, 0.8),
    x: baseX,
    y: baseY,
    baseX,
    baseY,
    angle,
    speed: randomRange(0.6, 1.4),
    phase: randomRange(0, Math.PI * 2),
    // Chaos factors for unpredictable movement
    chaosX: randomRange(-1, 1),
    chaosY: randomRange(-1, 1),
    wobbleFreq: randomRange(1, 4),
    wobbleAmp: randomRange(15, 40),
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
  if (scrollProgress < SCROLL_ZONES['problem-intro'].end) return 'problem-intro';
  if (scrollProgress < SCROLL_ZONES['problem-admin'].end) return 'problem-admin';
  if (scrollProgress < SCROLL_ZONES['problem-staff'].end) return 'problem-staff';
  if (scrollProgress < SCROLL_ZONES['problem-research'].end) return 'problem-research';
  if (scrollProgress < SCROLL_ZONES['problem-transition'].end) return 'problem-transition';
  if (scrollProgress < SCROLL_ZONES.services.end) return 'services';
  return 'contact';
}

// Get time-based animation offset for continuous motion
let timeOffset = 0;
export function updateTimeOffset(delta: number) {
  timeOffset += delta * 0.001; // Convert to seconds
}
export function getTimeOffset() {
  return timeOffset;
}

export function calculateParticlePosition(
  particle: Particle,
  scrollProgress: number,
  canvasWidth: number,
  canvasHeight: number,
  time: number = 0
): { x: number; y: number; opacity: number; scale: number } {
  const zone = getScrollZone(scrollProgress);

  // Calculate zone-local progress (0-1 within the current zone)
  const zoneConfig = SCROLL_ZONES[zone];
  const zoneProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - zoneConfig.start) / (zoneConfig.end - zoneConfig.start))
  );

  // Base position at center
  let x = (particle.baseX / 100) * canvasWidth;
  let y = (particle.baseY / 100) * canvasHeight;
  let scale = 1;

  // Time-based wobble for constant organic movement
  const timeWobbleX = Math.sin(time * particle.wobbleFreq + particle.phase) * particle.wobbleAmp * 0.3;
  const timeWobbleY = Math.cos(time * particle.wobbleFreq * 0.7 + particle.phase) * particle.wobbleAmp * 0.3;

  // Apply zone-specific trajectory
  switch (zone) {
    case 'hero': {
      // EXPLOSION from center - dramatic burst on page load
      const explosionPower = easeOutCubic(zoneProgress);
      const explosionDistance = explosionPower * 500 * particle.speed;

      // Spiral outward with chaos
      const spiralAngle = particle.angle + zoneProgress * Math.PI * 0.5;
      const chaosOffset = noise(zoneProgress * 3, particle.phase) * 100 * particle.chaosX;

      x += Math.cos(spiralAngle) * explosionDistance + chaosOffset;
      y += Math.sin(spiralAngle) * explosionDistance + noise(zoneProgress * 2, particle.phase + 1) * 80 * particle.chaosY;

      // Particles grow as they explode
      scale = 0.5 + explosionPower * 0.8;
      break;
    }

    case 'about': {
      // Continue from explosion, drift with organic floating motion
      const heroEndX = Math.cos(particle.angle + Math.PI * 0.5) * 500 * particle.speed;
      const heroEndY = Math.sin(particle.angle + Math.PI * 0.5) * 500 * particle.speed;

      // Drift toward left side with floating motion
      const driftX = -150 * zoneProgress * particle.speed;
      const floatY = Math.sin(zoneProgress * Math.PI * 2 + particle.phase) * 60;

      x += heroEndX + driftX + timeWobbleX;
      y += heroEndY + floatY + timeWobbleY;
      break;
    }

    case 'problem-intro': {
      // "Herkenbaar?" - Particles swirl around screen edges, creating anticipation
      const prevX = Math.cos(particle.angle + Math.PI * 0.5) * 500 * particle.speed - 150;
      const prevY = Math.sin(particle.angle + Math.PI * 0.5) * 500 * particle.speed;

      // Swirl into a circle formation around the text
      const targetRadius = 300 + particle.speed * 100;
      const swirlAngle = particle.angle + zoneProgress * Math.PI * 2;
      const targetX = canvasWidth * 0.5 + Math.cos(swirlAngle) * targetRadius;
      const targetY = canvasHeight * 0.5 + Math.sin(swirlAngle) * targetRadius;

      const blend = smoothstep(zoneProgress);
      x = prevX + (targetX - prevX) * blend + timeWobbleX * (1 - blend * 0.5);
      y = prevY + (targetY - prevY) * blend + timeWobbleY * (1 - blend * 0.5);

      // Pulse scale
      scale = 1 + Math.sin(zoneProgress * Math.PI * 4 + particle.phase) * 0.2;
      break;
    }

    case 'problem-admin': {
      // Admin molen - Particles cascade down like falling papers/data
      const circleX = canvasWidth * 0.5 + Math.cos(particle.angle) * (300 + particle.speed * 100);
      const circleY = canvasHeight * 0.5 + Math.sin(particle.angle) * (300 + particle.speed * 100);

      // Cascade down with zigzag pattern (like falling papers)
      const cascadeProgress = easeInOutCubic(zoneProgress);
      const fallDistance = cascadeProgress * canvasHeight * 0.4;
      const zigzag = Math.sin(zoneProgress * Math.PI * 8 + particle.phase) * 80 * particle.chaosX;

      // Move toward right side (where the mockup is)
      const driftRight = cascadeProgress * 200;

      x = circleX + zigzag + driftRight;
      y = circleY + fallDistance;

      // Some particles rotate (spin effect)
      const spin = Math.sin(zoneProgress * Math.PI * 6 + particle.phase) * 20;
      x += spin * particle.chaosY;
      break;
    }

    case 'problem-staff': {
      // Staff dilemma - Particles split into groups then reform
      const prevBaseX = canvasWidth * 0.5 + Math.cos(particle.angle) * (300 + particle.speed * 100) + 200;
      const prevBaseY = canvasHeight * 0.5 + Math.sin(particle.angle) * (300 + particle.speed * 100) + canvasHeight * 0.4;

      // Split into two groups based on angle
      const isLeftGroup = particle.angle < Math.PI;
      const splitOffset = isLeftGroup ? -200 : 200;

      // First half: split apart, Second half: come back together
      const splitPhase = zoneProgress < 0.5
        ? easeOutCubic(zoneProgress * 2)
        : 1 - easeOutCubic((zoneProgress - 0.5) * 2);

      x = prevBaseX + splitOffset * splitPhase + timeWobbleX;
      y = prevBaseY + Math.sin(zoneProgress * Math.PI * 3 + particle.phase) * 50 + timeWobbleY;

      // Stressed pulsing
      scale = 1 + splitPhase * 0.3 + Math.sin(zoneProgress * Math.PI * 8) * 0.1;
      break;
    }

    case 'problem-research': {
      // Research gap - Particles orbit and scatter like unfinished ideas
      const centerX = canvasWidth * 0.5;
      const centerY = canvasHeight * 0.5;

      // Orbital motion with increasing radius (ideas flying away)
      const orbitRadius = 150 + zoneProgress * 250 + particle.speed * 80;
      const orbitAngle = particle.angle + zoneProgress * Math.PI * 3;
      const orbitSpeed = 1 + particle.chaosX * 0.5;

      x = centerX + Math.cos(orbitAngle * orbitSpeed) * orbitRadius;
      y = centerY + Math.sin(orbitAngle * orbitSpeed) * orbitRadius * 0.6; // Elliptical

      // Add chaos - some particles break away
      if (particle.chaosX > 0.5) {
        const breakaway = (zoneProgress - 0.5) * 2;
        if (breakaway > 0) {
          x += breakaway * 200 * particle.chaosX;
          y += breakaway * 100 * particle.chaosY;
        }
      }

      x += timeWobbleX * 0.5;
      y += timeWobbleY * 0.5;
      break;
    }

    case 'problem-transition': {
      // "Je bent niet alleen" - Particles gather and pulse with hope
      const gatherX = canvasWidth * 0.5;
      const gatherY = canvasHeight * 0.5;

      // Calculate where particles are coming from
      const fromRadius = 200 + particle.speed * 150;
      const fromX = gatherX + Math.cos(particle.angle) * fromRadius;
      const fromY = gatherY + Math.sin(particle.angle) * fromRadius * 0.6;

      // Converge toward center with elastic effect
      const converge = easeInOutCubic(zoneProgress);
      const targetRadius = 80 + (1 - converge) * 200;
      const pulseRadius = targetRadius + Math.sin(zoneProgress * Math.PI * 6 + particle.phase) * 20;

      const finalAngle = particle.angle + converge * Math.PI * 0.5;
      x = gatherX + Math.cos(finalAngle) * pulseRadius;
      y = gatherY + Math.sin(finalAngle) * pulseRadius;

      // Blend from scattered to gathered
      x = fromX + (x - fromX) * converge;
      y = fromY + (y - fromY) * converge;

      // Hopeful glow pulse
      scale = 1 + Math.sin(zoneProgress * Math.PI * 4) * 0.3 * converge;
      break;
    }

    case 'services': {
      // Horizontal flow with chaotic, unpredictable movement
      const startX = canvasWidth * 0.5 + Math.cos(particle.angle) * 80;
      const startY = canvasHeight * 0.5 + Math.sin(particle.angle) * 80;

      // Flow across screen with wave motion
      const flowProgress = zoneProgress;
      const flowX = -flowProgress * canvasWidth * 1.8;

      // Chaotic vertical movement
      const waveY = Math.sin(flowProgress * Math.PI * 4 + particle.phase) * 150 * particle.chaosY;
      const noiseY = noise(flowProgress * 5, particle.phase) * 100;

      x = startX + flowX + particle.chaosX * 200;
      y = startY + waveY + noiseY + timeWobbleY;

      // Spread particles vertically across the screen
      y += (particle.angle / Math.PI - 1) * canvasHeight * 0.3;

      // Some particles move faster/slower
      x += particle.speed * flowProgress * -200;
      break;
    }

    case 'contact': {
      // GRAND FINALE - Spectacular convergence with multiple phases
      const targetX = canvasWidth * 0.5;
      const targetY = canvasHeight * 0.45;

      // Starting position (scattered from services)
      const scatterX = canvasWidth * -0.3 + particle.chaosX * 300;
      const scatterY = canvasHeight * 0.5 + (particle.angle / Math.PI - 1) * canvasHeight * 0.3;

      // Phase 1 (0-40%): Spiral inward from edges
      // Phase 2 (40-70%): Form a ring that pulses
      // Phase 3 (70-100%): Explode into a star burst, then converge to logo

      if (zoneProgress < 0.4) {
        // Phase 1: Spiral inward
        const phase1Progress = zoneProgress / 0.4;
        const spiralRadius = (1 - easeOutCubic(phase1Progress)) * 400 + 100;
        const spiralAngle = particle.angle + phase1Progress * Math.PI * 3;

        x = targetX + Math.cos(spiralAngle) * spiralRadius;
        y = targetY + Math.sin(spiralAngle) * spiralRadius * 0.7;

        // Blend from scattered position
        x = scatterX + (x - scatterX) * easeOutCubic(phase1Progress);
        y = scatterY + (y - scatterY) * easeOutCubic(phase1Progress);

        scale = 0.8 + phase1Progress * 0.4;
      } else if (zoneProgress < 0.7) {
        // Phase 2: Pulsing ring formation
        const phase2Progress = (zoneProgress - 0.4) / 0.3;
        const baseRadius = 120;
        const pulseRadius = baseRadius + Math.sin(phase2Progress * Math.PI * 6 + particle.phase) * 40;
        const ringAngle = particle.angle + phase2Progress * Math.PI * 2;

        x = targetX + Math.cos(ringAngle) * pulseRadius;
        y = targetY + Math.sin(ringAngle) * pulseRadius;

        // Breathing scale
        scale = 1.2 + Math.sin(phase2Progress * Math.PI * 4) * 0.3;
      } else {
        // Phase 3: Star burst then converge
        const phase3Progress = (zoneProgress - 0.7) / 0.3;

        if (phase3Progress < 0.3) {
          // Mini explosion outward
          const burstProgress = phase3Progress / 0.3;
          const burstRadius = 120 + easeOutCubic(burstProgress) * 200;
          const burstAngle = particle.angle + Math.PI * 0.25;

          x = targetX + Math.cos(burstAngle) * burstRadius;
          y = targetY + Math.sin(burstAngle) * burstRadius * 0.8;

          scale = 1.5 - burstProgress * 0.3;
        } else {
          // Final convergence to center
          const convergeProgress = (phase3Progress - 0.3) / 0.7;
          const converge = easeInOutCubic(convergeProgress);

          const burstX = targetX + Math.cos(particle.angle + Math.PI * 0.25) * 320;
          const burstY = targetY + Math.sin(particle.angle + Math.PI * 0.25) * 256;

          // Final position - tight formation
          const finalRadius = 30 + particle.speed * 20;
          const finalAngle = particle.angle + convergeProgress * Math.PI;
          const finalX = targetX + Math.cos(finalAngle) * finalRadius * (1 - converge * 0.7);
          const finalY = targetY + Math.sin(finalAngle) * finalRadius * (1 - converge * 0.7);

          x = burstX + (finalX - burstX) * converge;
          y = burstY + (finalY - burstY) * converge;

          // Particles glow brighter at the end
          scale = 1.2 + converge * 0.5;
        }
      }
      break;
    }
  }

  // Add subtle continuous time-based movement to all zones
  x += timeWobbleX * 0.2;
  y += timeWobbleY * 0.2;

  // Calculate opacity based on scroll position and particle's visible range
  let opacity = particle.opacity;

  // Fade in at start
  if (scrollProgress < particle.scrollStart + 0.03) {
    const fadeInProgress = (scrollProgress - particle.scrollStart) / 0.03;
    opacity *= Math.max(0, Math.min(1, fadeInProgress));
  }

  // Fade out at end
  if (scrollProgress > particle.scrollEnd - 0.03) {
    const fadeOutProgress = (particle.scrollEnd - scrollProgress) / 0.03;
    opacity *= Math.max(0, Math.min(1, fadeOutProgress));
  }

  // Zone-specific opacity modifications
  if (zone === 'contact' && scrollProgress > 0.95) {
    // Extra bright at finale
    opacity = Math.min(1, opacity * 1.5);
  }

  // Keep particles in bounds with some padding
  x = Math.max(-100, Math.min(canvasWidth + 100, x));
  y = Math.max(-100, Math.min(canvasHeight + 100, y));

  return { x, y, opacity, scale };
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
  maxDistance: number = 150
): Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> {
  const connections: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];

  // Limit connections for performance
  const maxConnections = 80;
  let connectionCount = 0;

  for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
    for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.15 *
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
