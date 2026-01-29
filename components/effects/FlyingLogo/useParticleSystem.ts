'use client';

// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - CUSTOM HOOK
// =============================================================================
// Manages particle state, scroll tracking, and position calculations

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Particle, DEFAULT_CONFIG, CanvasSize } from './types';
import {
  createParticles,
  calculateParticlePosition,
  getParticleCount,
  prefersReducedMotion,
  getParticleConnections,
} from './particleUtils';

interface UseParticleSystemReturn {
  particles: Particle[];
  scrollProgress: number;
  canvasSize: CanvasSize;
  getParticlePositions: () => Array<{
    id: string;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    glowIntensity: number;
    scale: number;
  }>;
  getConnections: () => Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
  }>;
  isReducedMotion: boolean;
  time: number;
}

export function useParticleSystem(): UseParticleSystemReturn {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [time, setTime] = useState(0);

  // Create particles once on mount
  const particles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const count = getParticleCount(DEFAULT_CONFIG);
    return createParticles(count, DEFAULT_CONFIG);
  }, []);

  // Track scroll progress
  const scrollRef = useRef(0);

  // Animation time tracking
  useEffect(() => {
    if (typeof window === 'undefined' || isReducedMotion) return;

    let animationId: number;
    const startTime = performance.now();

    const updateTime = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000; // seconds
      setTime(elapsed);
      animationId = requestAnimationFrame(updateTime);
    };

    animationId = requestAnimationFrame(updateTime);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isReducedMotion]);

  // Handle scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      scrollRef.current = Math.max(0, Math.min(1, progress));
      setScrollProgress(scrollRef.current);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial size
    handleResize();

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsReducedMotion(prefersReducedMotion());

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calculate particle positions based on current scroll and time
  const getParticlePositions = useCallback(() => {
    if (canvasSize.width === 0 || canvasSize.height === 0) return [];

    return particles.map((particle) => {
      const { x, y, opacity, scale } = calculateParticlePosition(
        particle,
        scrollProgress,
        canvasSize.width,
        canvasSize.height,
        time
      );

      return {
        id: particle.id,
        x,
        y,
        size: particle.size,
        color: particle.color,
        opacity,
        glowIntensity: particle.glowIntensity,
        scale,
      };
    });
  }, [particles, scrollProgress, canvasSize, time]);

  // Get connection lines between nearby particles
  const getConnections = useCallback(() => {
    const positions = getParticlePositions();
    return getParticleConnections(
      positions.map((p) => ({ x: p.x, y: p.y, opacity: p.opacity })),
      120 // max distance for connections
    );
  }, [getParticlePositions]);

  return {
    particles,
    scrollProgress,
    canvasSize,
    getParticlePositions,
    getConnections,
    isReducedMotion,
    time,
  };
}
