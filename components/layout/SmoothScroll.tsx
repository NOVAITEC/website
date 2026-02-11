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

/**
 * Extract hash from an href string.
 * Handles both "#section" and "/#section" formats.
 * Returns null if no valid hash found.
 */
function extractHash(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const hash = href.substring(hashIndex);
  return hash && hash !== "#" ? hash : null;
}

/**
 * Check if a /#hash link targets the current page.
 * Pure #hash links always target the current page.
 * /#hash links only target the homepage.
 */
function isCurrentPageHash(href: string): boolean {
  if (href.startsWith("#")) return true;
  if (href.startsWith("/#")) return window.location.pathname === "/";
  return false;
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
      // On mobile, handle anchor clicks with native smooth scroll
      // Supports both #hash and /#hash links
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest(
          'a[href^="#"], a[href^="/#"]'
        ) as HTMLAnchorElement | null;
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        const hash = extractHash(href);
        if (!hash) return;

        // For /#hash links, only handle on the matching page
        if (!isCurrentPageHash(href)) return;

        const element = document.querySelector(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth", block: "start" });
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

    // Handle anchor clicks - supports both #hash and /#hash (same-page)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest(
        'a[href^="#"], a[href^="/#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hash = extractHash(href);
      if (!hash) return;

      // For /#hash links, only handle on the matching page
      if (!isCurrentPageHash(href)) return;

      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        lenis.scrollTo(element as HTMLElement, {
          offset: -80,
          duration: 1.2,
        });
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

  // Handle scroll position on route changes (including hash navigation)
  useEffect(() => {
    const hash = window.location.hash;
    const lenis = lenisRef.current;

    if (lenis) {
      // Ensure Lenis is running (not stopped/locked by tunnel scroll)
      lenis.start();

      // Let the new page render, then handle scroll position
      requestAnimationFrame(() => {
        lenis.resize();

        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            // Scroll to hash target immediately on route changes
            lenis.scrollTo(element as HTMLElement, {
              offset: -80,
              immediate: true,
            });
            return;
          }
        }

        // No hash or element not found - scroll to top
        lenis.scrollTo(0, { immediate: true });
      });
    } else {
      // Mobile: handle hash scrolling after route change
      if (hash) {
        requestAnimationFrame(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
