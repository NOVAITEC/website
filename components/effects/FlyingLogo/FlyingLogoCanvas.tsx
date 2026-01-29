'use client';

// =============================================================================
// FLYING LOGO PARTICLE SYSTEM - CANVAS RENDERER
// =============================================================================
// Renders particles with subtle glow effects on a canvas overlay

import { useRef, useEffect, useCallback } from 'react';
import { useParticleSystem } from './useParticleSystem';
import { hexToRgba } from './particleUtils';
import { DEFAULT_CONFIG } from './types';

export function FlyingLogoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const {
    canvasSize,
    getParticlePositions,
    getConnections,
    isReducedMotion,
    time,
  } = useParticleSystem();

  // Draw a single particle with subtle glow effect
  const drawParticle = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      glowIntensity: number,
      scale: number = 1
    ) => {
      if (opacity <= 0) return;

      const scaledSize = size * scale;

      // Subtle outer glow
      ctx.beginPath();
      ctx.arc(x, y, scaledSize * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.06 * glowIntensity);
      ctx.fill();

      // Inner glow
      ctx.beginPath();
      ctx.arc(x, y, scaledSize * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.15 * glowIntensity);
      ctx.fill();

      // Core (main particle)
      ctx.beginPath();
      ctx.arc(x, y, scaledSize, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.9);
      ctx.fill();
    },
    []
  );

  // Draw subtle connection lines
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
        if (opacity <= 0.005) return;

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

    // Sort particles by size for proper layering (smaller behind larger)
    const sortedPositions = [...positions].sort((a, b) => a.size - b.size);

    // Draw particles
    sortedPositions.forEach(({ x, y, size, color, opacity, glowIntensity, scale }) => {
      drawParticle(ctx, x, y, size, color, opacity, glowIntensity, scale);
    });

    // Request next frame
    animationRef.current = requestAnimationFrame(render);
  }, [getParticlePositions, getConnections, drawParticle, drawConnections]);

  // Setup canvas and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    canvas.style.width = `${canvasSize.width}px`;
    canvas.style.height = `${canvasSize.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

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

  // Re-render on time change
  useEffect(() => {
    if (!isReducedMotion && animationRef.current === null) {
      animationRef.current = requestAnimationFrame(render);
    }
  }, [time, render, isReducedMotion]);

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
      }}
      aria-hidden="true"
    />
  );
}
