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
    time,
  } = useParticleSystem();

  // Draw a single particle with glow effect and scale
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

      // Outer glow (largest, most transparent)
      ctx.beginPath();
      ctx.arc(x, y, scaledSize * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.08 * glowIntensity * scale);
      ctx.fill();

      // Middle glow
      ctx.beginPath();
      ctx.arc(x, y, scaledSize * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.15 * glowIntensity * scale);
      ctx.fill();

      // Inner glow
      ctx.beginPath();
      ctx.arc(x, y, scaledSize * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity * 0.35 * glowIntensity);
      ctx.fill();

      // Core (solid)
      ctx.beginPath();
      ctx.arc(x, y, scaledSize, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity);
      ctx.fill();

      // Bright center highlight for accent particles
      if (glowIntensity > 0.6 && scale > 0.8) {
        ctx.beginPath();
        ctx.arc(x, y, scaledSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba('#FFFFFF', opacity * 0.6);
        ctx.fill();
      }
    },
    []
  );

  // Draw connection lines with gradient effect
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

        // Create gradient for each connection
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, hexToRgba(DEFAULT_CONFIG.colors.primary, opacity));
        gradient.addColorStop(0.5, hexToRgba(DEFAULT_CONFIG.colors.primary, opacity * 1.2));
        gradient.addColorStop(1, hexToRgba(DEFAULT_CONFIG.colors.primary, opacity));

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
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

  // Re-render on scroll or time change
  useEffect(() => {
    if (!isReducedMotion && animationRef.current === null) {
      animationRef.current = requestAnimationFrame(render);
    }
  }, [scrollProgress, time, render, isReducedMotion]);

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
