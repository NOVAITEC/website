'use client';

// =============================================================================
// INTRO ANIMATION - Spectaculaire Logo Zoom-Through
// =============================================================================
// 1. Logo drops in met bounce
// 2. Logo pulst en gloeit op
// 3. Logo zoomt DOOR je heen (je vliegt erin)
// 4. Lichtflits + radial reveal van de hero
// 5. Speed lines voor snelheidsgevoel

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Animation timing (in seconds)
const TIMING = {
  logoDrop: 0.6,        // Logo drops in
  logoHold: 0.4,        // Brief hold
  logoPulse: 0.5,       // Glow intensifies
  zoomThrough: 0.8,     // Zoom through the logo
  flash: 0.3,           // White flash
  reveal: 0.5,          // Radial reveal
};

// Speed lines configuration
const SPEED_LINE_COUNT = 20;

interface SpeedLine {
  id: number;
  angle: number;
  length: number;
  delay: number;
  duration: number;
}

function createSpeedLines(): SpeedLine[] {
  const lines: SpeedLine[] = [];
  for (let i = 0; i < SPEED_LINE_COUNT; i++) {
    lines.push({
      id: i,
      angle: (i / SPEED_LINE_COUNT) * 360,
      length: 100 + Math.random() * 200,
      delay: Math.random() * 0.2,
      duration: 0.3 + Math.random() * 0.3,
    });
  }
  return lines;
}

export function IntroAnimation() {
  const [phase, setPhase] = useState<'drop' | 'pulse' | 'zoom' | 'flash' | 'reveal' | 'done'>('drop');
  const [speedLines] = useState<SpeedLine[]>(createSpeedLines);

  useEffect(() => {
    const dropTime = TIMING.logoDrop * 1000;
    const holdTime = TIMING.logoHold * 1000;
    const pulseTime = TIMING.logoPulse * 1000;
    const zoomTime = TIMING.zoomThrough * 1000;
    const flashTime = TIMING.flash * 1000;
    const revealTime = TIMING.reveal * 1000;

    let t1 = dropTime + holdTime;
    let t2 = t1 + pulseTime;
    let t3 = t2 + zoomTime;
    let t4 = t3 + flashTime;
    let t5 = t4 + revealTime;

    const timers = [
      setTimeout(() => setPhase('pulse'), t1),
      setTimeout(() => setPhase('zoom'), t2),
      setTimeout(() => setPhase('flash'), t3),
      setTimeout(() => setPhase('reveal'), t4),
      setTimeout(() => setPhase('done'), t5),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === 'done') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[100] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: TIMING.reveal, ease: 'easeOut' }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-midnight" />

        {/* Radial gradient that expands during zoom */}
        {(phase === 'zoom' || phase === 'flash') && (
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

        {/* Speed lines during zoom */}
        {phase === 'zoom' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {speedLines.map((line) => (
              <motion.div
                key={line.id}
                className="absolute bg-gradient-to-r from-teal to-transparent"
                style={{
                  width: 2,
                  height: line.length,
                  transformOrigin: 'center bottom',
                  rotate: `${line.angle}deg`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 0.8, 0] }}
                transition={{
                  duration: line.duration,
                  delay: line.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        {/* White flash */}
        {phase === 'flash' && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: TIMING.flash, ease: 'easeOut' }}
          />
        )}

        {/* Radial reveal mask */}
        {phase === 'reveal' && (
          <motion.div
            className="absolute inset-0 bg-midnight"
            initial={{
              clipPath: 'circle(0% at 50% 50%)'
            }}
            animate={{
              clipPath: 'circle(150% at 50% 50%)'
            }}
            transition={{ duration: TIMING.reveal, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: 0 }}
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
                width={200}
                height={200}
                priority
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
                width={200}
                height={200}
                priority
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
                  width={200}
                  height={200}
                  className="w-36 h-36 md:w-48 md:h-48"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Ring burst during flash */}
          {phase === 'flash' && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border-2 border-teal rounded-full"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 20, opacity: 0 }}
                  transition={{
                    duration: TIMING.flash + 0.3,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
