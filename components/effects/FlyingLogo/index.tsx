'use client';

// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - MAIN EXPORT
// =============================================================================
//
// A particle system that extracts visual elements from the NOVAITEC beeldmerk
// and animates them through the entire website, creating an immersive
// "flying through the page" experience.
//
// USAGE:
// Import and place in layout.tsx inside SmoothScroll but before main content:
//
//   <SmoothScroll>
//     <FlyingLogo />
//     <Header />
//     <main>{children}</main>
//     <Footer />
//   </SmoothScroll>
//
// SCROLL ZONES & ANIMATIONS:
// - Hero (0-8%): EXPLOSION from center - particles burst outward dramatically
// - About (8-15%): Drift and float with organic motion
// - Problem Intro (15-22%): "Herkenbaar?" - Swirl around screen edges
// - Problem Admin (22-32%): Cascade down like falling papers
// - Problem Staff (32-42%): Split into groups, then reform
// - Problem Research (42-52%): Orbit and scatter like unfinished ideas
// - Problem Transition (52-60%): Gather and pulse with hope
// - Services (60-85%): Horizontal chaotic flow with waves
// - Contact (85-100%): GRAND FINALE - 3-phase spectacular convergence:
//   - Phase 1: Spiral inward from edges
//   - Phase 2: Form pulsing ring
//   - Phase 3: Star burst then final convergence
//
// FEATURES:
// - Time-based continuous animation (particles always move slightly)
// - Chaos factors for unpredictable, organic movement
// - Scale animations (particles grow/shrink based on section)
// - Improved particle connections with gradients
// - High-DPI canvas rendering for sharp visuals
//
// ACCESSIBILITY:
// - Respects `prefers-reduced-motion` - disabled when user prefers reduced motion
// - Canvas is marked `aria-hidden="true"` for screen readers
//
// PERFORMANCE:
// - Uses Canvas 2D for smooth 60fps with 60 particles
// - Particle count adapts to device: Desktop (60), Tablet (40), Mobile (24)
// - Uses `requestAnimationFrame` for efficient rendering
// - Passive scroll listeners for smooth scrolling
// - Connection limit (80 max) for performance
//
// =============================================================================

import { FlyingLogoCanvas } from './FlyingLogoCanvas';

export function FlyingLogo() {
  return <FlyingLogoCanvas />;
}

// Re-export components and utilities for advanced usage
export { FlyingLogoCanvas } from './FlyingLogoCanvas';
export { useParticleSystem } from './useParticleSystem';
export * from './types';
export * from './particleUtils';
