'use client';

// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - MAIN EXPORT
// =============================================================================
//
// A subtle, ambient particle system that creates a calm, professional atmosphere.
// Particles gently float through the page, supporting the content without
// distracting from it.
//
// DESIGN PHILOSOPHY:
// - Rust (Calm) over chaos
// - Subtle enhancement, not attention-grabbing
// - Professional and elegant
//
// ANIMATION BEHAVIOR:
// - On page load: Particles gently fade in one by one over ~2.5 seconds
// - Continuous: Soft floating motion (Lissajous patterns)
// - On scroll: Particles drift gently with the page
// - Very subtle connections between nearby particles
//
// PARTICLE COUNTS (reduced for subtlety):
// - Desktop: 18 particles
// - Tablet: 12 particles
// - Mobile: 8 particles
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
// ACCESSIBILITY:
// - Respects `prefers-reduced-motion` - disabled when user prefers reduced motion
// - Canvas is marked `aria-hidden="true"` for screen readers
//
// PERFORMANCE:
// - Uses Canvas 2D for smooth 60fps
// - Limited particle count for subtle effect
// - Passive scroll listeners
// - RequestAnimationFrame for efficient rendering
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
