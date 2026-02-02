"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  trackScrollDepth,
  trackSectionView,
  trackOutboundLink,
} from "@/lib/analytics";

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 100%)
 */
export function useScrollDepthTracking() {
  const trackedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !trackedMilestones.current.has(milestone)
        ) {
          trackedMilestones.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);
}

/**
 * Hook to track when a section becomes visible
 */
export function useSectionTracking(
  sectionId: string,
  sectionName: string,
  threshold: number = 0.5
) {
  const hasTracked = useRef(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            trackSectionView(sectionId, sectionName);
          }
        });
      },
      { threshold }
    );

    // Find element by ID if ref not set
    const element = elementRef.current || document.getElementById(sectionId);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionId, sectionName, threshold]);

  return elementRef;
}

/**
 * Hook to automatically track outbound link clicks
 */
export function useOutboundLinkTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Check if it's an outbound link
      try {
        const url = new URL(href, window.location.origin);
        const isOutbound = url.hostname !== window.location.hostname;

        if (isOutbound) {
          const linkText = link.textContent?.trim() || link.getAttribute("aria-label") || "";
          trackOutboundLink(href, linkText);
        }
      } catch {
        // Invalid URL, skip tracking
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

/**
 * Combined analytics tracker component
 * Add this to your layout to enable automatic tracking
 */
export function useAutoTracking() {
  useScrollDepthTracking();
  useOutboundLinkTracking();
}

/**
 * Hook for tracking CTA clicks with callback
 */
export function useTrackCTA(
  location: string,
  buttonText: string,
  destination?: string
) {
  const { trackCTAClick } = require("@/lib/analytics");

  return useCallback(() => {
    trackCTAClick(location, buttonText, destination);
  }, [location, buttonText, destination]);
}
