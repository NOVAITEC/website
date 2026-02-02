"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

// Expose Lenis type globally for tunnel scroll control
declare global {
  interface Window {
    lenis: Lenis | null;
  }
}

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable Lenis on mobile/touch devices for better performance
    const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;

    if (isMobile) {
      // On mobile, just handle anchor clicks with native smooth scroll
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]');
        if (anchor) {
          const href = anchor.getAttribute("href");
          if (href && href !== "#") {
            const element = document.querySelector(href);
            if (element) {
              e.preventDefault();
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      };
      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    // Desktop: use Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose globally for tunnel scroll control
    window.lenis = lenis;

    // Optimized RAF loop - only runs when Lenis is actively animating
    let isAnimating = false;

    function raf(time: number) {
      lenis.raf(time);
      // Only continue RAF loop if Lenis is still animating
      if (isAnimating) {
        rafIdRef.current = requestAnimationFrame(raf);
      }
    }

    // Start/stop RAF based on Lenis scroll state
    const handleScrollStart = () => {
      if (!isAnimating) {
        isAnimating = true;
        rafIdRef.current = requestAnimationFrame(raf);
      }
    };

    const handleScrollStop = () => {
      isAnimating = false;
    };

    // Subscribe to Lenis scroll events
    lenis.on('scroll', handleScrollStart);

    // Use a timeout to detect scroll stop (Lenis doesn't have a native stop event)
    let scrollStopTimeout: NodeJS.Timeout;
    const handleScrollActivity = () => {
      clearTimeout(scrollStopTimeout);
      scrollStopTimeout = setTimeout(handleScrollStop, 150);
    };
    lenis.on('scroll', handleScrollActivity);

    // Initial RAF to handle page load scroll position
    rafIdRef.current = requestAnimationFrame(raf);
    scrollStopTimeout = setTimeout(handleScrollStop, 500);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement, {
              offset: -80,
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      clearTimeout(scrollStopTimeout);
      isAnimating = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
