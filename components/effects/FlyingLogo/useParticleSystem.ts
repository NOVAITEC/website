'use client';

// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - CUSTOM HOOK
// =============================================================================

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
  }>;
  getConnections: () => Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
  }>;
  isReducedMotion: boolean;
}

export function useParticleSystem(): UseParticleSystemReturn {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Create particles once on mount
  const particles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const count = getParticleCount(DEFAULT_CONFIG);
    return createParticles(count, DEFAULT_CONFIG);
  }, []);

  // Track scroll progress
  const scrollRef = useRef(0);

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

  // Calculate particle positions based on current scroll
  const getParticlePositions = useCallback(() => {
    if (canvasSize.width === 0 || canvasSize.height === 0) return [];

    return particles.map((particle) => {
      const { x, y, opacity } = calculateParticlePosition(
        particle,
        scrollProgress,
        canvasSize.width,
        canvasSize.height
      );

      return {
        id: particle.id,
        x,
        y,
        size: particle.size,
        color: particle.color,
        opacity,
        glowIntensity: particle.glowIntensity,
      };
    });
  }, [particles, scrollProgress, canvasSize]);

  // Get connection lines between nearby particles
  const getConnections = useCallback(() => {
    const positions = getParticlePositions();
    return getParticleConnections(
      positions.map((p) => ({ x: p.x, y: p.y, opacity: p.opacity })),
      100 // max distance for connections
    );
  }, [getParticlePositions]);

  return {
    particles,
    scrollProgress,
    canvasSize,
    getParticlePositions,
    getConnections,
    isReducedMotion,
  };
}
