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
// SCROLL ZONES:
// - Hero (0-10%): Logo explodes into particles from center
// - About (10-20%): Particles drift left toward content
// - Problem (20-50%): Cascade downward with stacking cards
// - Services (50-85%): Horizontal flow with cinema scroll
// - Contact (85-100%): Converge toward CTA button
//
// ACCESSIBILITY:
// - Respects `prefers-reduced-motion` - disabled when user prefers reduced motion
// - Canvas is marked `aria-hidden="true"` for screen readers
//
// PERFORMANCE:
// - Uses Canvas 2D for smooth 60fps with 40-60 particles
// - Particle count adapts to device: Desktop (50), Tablet (30), Mobile (18)
// - Uses `requestAnimationFrame` for efficient rendering
// - Passive scroll listeners for smooth scrolling
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
