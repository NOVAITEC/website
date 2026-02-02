'use client';

// =============================================================================
// INTRO ANIMATION - Spectaculaire Logo Zoom-Through
// =============================================================================
// 1. Logo drops in met bounce
// 2. Logo pulst en gloeit op
// 3. Logo zoomt DOOR je heen (je vliegt erin)
// 4. Fade naar website

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Check if mobile - runs once on mount
const checkIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window;
};

export function IntroAnimation() {
  const [phase, setPhase] = useState<'drop' | 'pulse' | 'zoom' | 'fade' | 'done'>('drop');

  // Memoize timing based on mobile detection at mount
  // Mobile: ultra-fast for better LCP (target: ~0.8s total)
  const TIMING = useMemo(() => {
    const isMobile = checkIsMobile();
    return {
      logoDrop: isMobile ? 0.2 : 0.6,
      logoHold: isMobile ? 0.1 : 0.4,
      logoPulse: isMobile ? 0.15 : 0.5,
      zoomThrough: isMobile ? 0.25 : 0.8,
      fadeOut: isMobile ? 0.15 : 0.5,
    };
  }, []);

  useEffect(() => {
    const dropTime = TIMING.logoDrop * 1000;
    const holdTime = TIMING.logoHold * 1000;
    const pulseTime = TIMING.logoPulse * 1000;
    const zoomTime = TIMING.zoomThrough * 1000;
    const fadeTime = TIMING.fadeOut * 1000;

    const t1 = dropTime + holdTime;
    const t2 = t1 + pulseTime;
    const t3 = t2 + zoomTime;
    const t4 = t3 + fadeTime;

    const timers = [
      setTimeout(() => setPhase('pulse'), t1),
      setTimeout(() => setPhase('zoom'), t2),
      setTimeout(() => setPhase('fade'), t3),
      setTimeout(() => setPhase('done'), t4),
    ];

    return () => timers.forEach(clearTimeout);
  }, [TIMING]);

  if (phase === 'done') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[100] overflow-hidden"
        animate={{
          opacity: phase === 'fade' ? 0 : 1
        }}
        transition={{
          duration: TIMING.fadeOut,
          ease: 'easeOut'
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-midnight" />

        {/* Radial gradient that expands during zoom */}
        {phase === 'zoom' && (
          <motion.div
            className="absolute inset-0"
            initial={{
              background: 'radial-gradient(circle at center, rgba(6,182,212,0) 0%, rgba(11,28,46,1) 0%)'
            }}
            animate={{
              background: 'radial-gradient(circle at center, rgba(6,182,212,0.3) 0%, rgba(11,28,46,1) 70%)'
            }}
            transition={{ duration: TIMING.zoomThrough, ease: 'easeIn' }}
          />
        )}

        {/* Center container for logo */}
        <div className="absolute inset-0 flex items-center justify-center">

          {/* Logo - Drop phase */}
          {phase === 'drop' && (
            <motion.div
              className="relative"
              initial={{ scale: 0.5, y: -100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 200,
                duration: TIMING.logoDrop,
              }}
            >
              <Image
                src="/images/novaitec_beeldmerk_transparant_kleur.png"
                alt="NOVAITEC"
                width={192}
                height={192}
                priority
                sizes="(max-width: 768px) 144px, 192px"
                className="w-36 h-36 md:w-48 md:h-48"
              />
            </motion.div>
          )}

          {/* Logo - Pulse phase (glowing) */}
          {phase === 'pulse' && (
            <motion.div
              className="relative"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1.05] }}
              transition={{ duration: TIMING.logoPulse, ease: 'easeInOut' }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 1] }}
                transition={{ duration: TIMING.logoPulse }}
              >
                <div className="w-36 h-36 md:w-48 md:h-48 bg-teal rounded-full" />
              </motion.div>

              <Image
                src="/images/novaitec_beeldmerk_transparant_kleur.png"
                alt="NOVAITEC"
                width={192}
                height={192}
                priority
                sizes="(max-width: 768px) 144px, 192px"
                className="relative w-36 h-36 md:w-48 md:h-48"
              />
            </motion.div>
          )}

          {/* Logo - Zoom through phase */}
          {phase === 'zoom' && (
            <motion.div
              className="relative"
              initial={{ scale: 1.05 }}
              animate={{ scale: 30 }}
              transition={{
                duration: TIMING.zoomThrough,
                ease: [0.45, 0, 0.55, 1] // Accelerating
              }}
            >
              {/* Intense glow during zoom */}
              <motion.div
                className="absolute inset-0 blur-3xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: TIMING.zoomThrough * 0.8 }}
              >
                <div className="w-36 h-36 md:w-48 md:h-48 bg-teal rounded-full" />
              </motion.div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: TIMING.zoomThrough * 0.6 }}
              >
                <Image
                  src="/images/novaitec_beeldmerk_transparant_kleur.png"
                  alt=""
                  width={192}
                  height={192}
                  priority
                  sizes="(max-width: 768px) 144px, 192px"
                  className="w-36 h-36 md:w-48 md:h-48"
                />
              </motion.div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
