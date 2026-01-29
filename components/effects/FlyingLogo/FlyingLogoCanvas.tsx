'use client';

// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - CANVAS RENDERER
// =============================================================================

import { useRef, useEffect, useCallback } from 'react';
import { useParticleSystem } from './useParticleSystem';
import { hexToRgba } from './particleUtils';
import { DEFAULT_CONFIG } from './types';

export function FlyingLogoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const {
    scrollProgress,
    canvasSize,
    getParticlePositions,
    getConnections,
    isReducedMotion,
  } = useParticleSystem();

  // Draw a single particle with glow effect
  const drawParticle = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      glowIntensity: number
    ) => {
      if (opacity <= 0) return;

      // Outer glow (largest, most transparent)
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.1 * glowIntensity);
      ctx.fill();

      // Middle glow
      ctx.beginPath();
      ctx.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.2 * glowIntensity);
      ctx.fill();

      // Inner glow
      ctx.beginPath();
      ctx.arc(x, y, size * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.4 * glowIntensity);
      ctx.fill();

      // Core (solid)
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity);
      ctx.fill();
    },
    []
  );

  // Draw connection lines
  const drawConnections = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      connections: Array<{
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        opacity: number;
      }>
    ) => {
      connections.forEach(({ x1, y1, x2, y2, opacity }) => {
        if (opacity <= 0.01) return;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = hexToRgba(DEFAULT_CONFIG.colors.primary, opacity);
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    },
    []
  );

  // Main render function
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get current particle positions
    const positions = getParticlePositions();
    const connections = getConnections();

    // Draw connections first (behind particles)
    drawConnections(ctx, connections);

    // Draw particles
    positions.forEach(({ x, y, size, color, opacity, glowIntensity }) => {
      drawParticle(ctx, x, y, size, color, opacity, glowIntensity);
    });

    // Request next frame
    animationRef.current = requestAnimationFrame(render);
  }, [getParticlePositions, getConnections, drawParticle, drawConnections]);

  // Setup canvas and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Start animation loop (only if not reduced motion)
    if (!isReducedMotion) {
      animationRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasSize, render, isReducedMotion]);

  // Re-render on scroll
  useEffect(() => {
    if (!isReducedMotion && animationRef.current === null) {
      animationRef.current = requestAnimationFrame(render);
    }
  }, [scrollProgress, render, isReducedMotion]);

  // Don't render if reduced motion is preferred
  if (isReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{
        willChange: 'transform',
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
