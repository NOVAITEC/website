"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

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
  const pathname = usePathname();

  // Initialize Lenis once
  useEffect(() => {
    // Disable Lenis on mobile/touch devices for better performance
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
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
      autoRaf: true,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

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
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  // Reset scroll and resize Lenis on route changes
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Ensure Lenis is running (not stopped/locked)
    lenis.start();

    // Let the new page render, then resize Lenis to detect new content height
    requestAnimationFrame(() => {
      lenis.resize();
      lenis.scrollTo(0, { immediate: true });
    });
  }, [pathname]);

  return <>{children}</>;
}
