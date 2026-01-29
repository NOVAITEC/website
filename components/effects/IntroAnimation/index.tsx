'use client';

// =============================================================================
// INTRO ANIMATION - Logo Grow & Explode
// =============================================================================
// Shows on page load:
// 1. Logo appears and grows
// 2. Logo "explodes" into particles
// 3. Particles fly outward
// 4. Overlay fades to reveal the hero section

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Animation timing (in seconds)
const TIMING = {
  logoAppear: 0.3,      // Logo fades in
  logoGrow: 1.2,        // Logo scales up
  holdBeforeExplode: 0.2, // Brief pause before explosion
  explosion: 0.8,       // Particles fly out
  fadeOut: 0.6,         // Overlay fades away
};

// Particle configuration
const PARTICLE_COUNT = 24;
const PARTICLE_COLORS = ['#06B6D4', '#0891B2', '#22D3EE', '#F59E0B', '#FBBF24'];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  distance: number;
  delay: number;
}

function createParticles(): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    particles.push({
      id: i,
      x: 0,
      y: 0,
      size: 4 + Math.random() * 8,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      angle,
      distance: 150 + Math.random() * 350, // How far they fly
      delay: Math.random() * 0.15, // Staggered explosion
    });
  }

  return particles;
}

export function IntroAnimation() {
  const [phase, setPhase] = useState<'logo' | 'explode' | 'fadeout' | 'done'>('logo');
  const [particles] = useState<Particle[]>(createParticles);

  // Progress through animation phases
  useEffect(() => {
    const totalLogoTime = (TIMING.logoAppear + TIMING.logoGrow + TIMING.holdBeforeExplode) * 1000;
    const explosionTime = TIMING.explosion * 1000;
    const fadeOutTime = TIMING.fadeOut * 1000;

    // After logo animation, trigger explosion
    const explodeTimer = setTimeout(() => {
      setPhase('explode');
    }, totalLogoTime);

    // After explosion, fade out
    const fadeTimer = setTimeout(() => {
      setPhase('fadeout');
    }, totalLogoTime + explosionTime);

    // After fade, remove completely
    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, totalLogoTime + explosionTime + fadeOutTime);

    return () => {
      clearTimeout(explodeTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Don't render anything after animation is done
  if (phase === 'done') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: TIMING.fadeOut, ease: 'easeInOut' }}
      >
          {/* Logo - grows then disappears */}
          {(phase === 'logo') && (
            <motion.div
              className="relative"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{
                scale: {
                  duration: TIMING.logoGrow,
                  delay: TIMING.logoAppear,
                  ease: [0.34, 1.56, 0.64, 1], // Slight overshoot
                },
                opacity: {
                  duration: TIMING.logoAppear,
                  ease: 'easeOut',
                },
              }}
            >
              <Image
                src="/images/novaitec_beeldmerk_transparant_kleur.png"
                alt="NOVAITEC"
                width={180}
                height={180}
                priority
                className="w-32 h-32 md:w-44 md:h-44"
              />
            </motion.div>
          )}

          {/* Explosion particles */}
          {phase === 'explode' && (
            <div className="relative">
              {/* Brief flash of the logo at max size before exploding */}
              <motion.div
                initial={{ scale: 1.2, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Image
                  src="/images/novaitec_beeldmerk_transparant_kleur.png"
                  alt=""
                  width={180}
                  height={180}
                  className="w-32 h-32 md:w-44 md:h-44"
                />
              </motion.div>

              {/* Particles flying outward */}
              {particles.map((particle) => {
                const endX = Math.cos(particle.angle) * particle.distance;
                const endY = Math.sin(particle.angle) * particle.distance;

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      backgroundColor: particle.color,
                      boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                      left: '50%',
                      top: '50%',
                      marginLeft: -particle.size / 2,
                      marginTop: -particle.size / 2,
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    animate={{
                      x: endX,
                      y: endY,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: TIMING.explosion,
                      delay: particle.delay,
                      ease: [0.25, 0.46, 0.45, 0.94], // Ease out
                    }}
                  />
                );
              })}
            </div>
          )}
      </motion.div>
    </AnimatePresence>
  );
}
