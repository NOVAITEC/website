'use client';

// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - MAIN EXPORT
// =============================================================================
//
// A FUNCTIONAL particle system that guides user attention to key content.
// Particles are attracted to focus points on the page, subtly directing
// the viewer's eyes to important elements.
//
// HOW IT WORKS:
// - Particles start from the edges and drift toward "focus points"
// - Each section has different focus points (CTA, content, cards)
// - As you scroll, particles reposition to highlight the new section
//
// FOCUS POINTS PER SECTION:
// - Hero (0-12%): Around the CTA button and headline
// - About (12-25%): Left content area and image
// - Problem (25-55%): Center text and mockup areas
// - Services (55-80%): Around each service card
// - Contact (80-100%): Converge on contact form
//
// DESIGN PHILOSOPHY:
// - Particles add VALUE by guiding attention
// - Subtle but purposeful movement
// - Professional and supportive, never distracting
//
// USAGE:
// Place in layout.tsx inside SmoothScroll but before main content:
//
//   <SmoothScroll>
//     <FlyingLogo />
//     <Header />
//     <main>{children}</main>
//     <Footer />
//   </SmoothScroll>
//
// =============================================================================

import { FlyingLogoCanvas } from './FlyingLogoCanvas';

export function FlyingLogo() {
  return <FlyingLogoCanvas />;
}

export { FlyingLogoCanvas } from './FlyingLogoCanvas';
export { useParticleSystem } from './useParticleSystem';
export * from './types';
export * from './particleUtils';
