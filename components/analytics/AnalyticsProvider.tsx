"use client";

import { useEffect } from "react";
import { useAutoTracking } from "@/hooks/useAnalytics";
import { trackSectionView } from "@/lib/analytics";

// Section IDs to track (customize based on your sections)
const TRACKED_SECTIONS = [
  { id: "hero", name: "Hero Section" },
  { id: "about", name: "About Section" },
  { id: "problem", name: "Problem Section" },
  { id: "services", name: "Services Section" },
  { id: "process", name: "Process Section" },
  { id: "contact", name: "Contact Section" },
  { id: "faq", name: "FAQ Section" },
];

/**
 * Analytics Provider Component
 * Automatically tracks:
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Outbound link clicks
 * - Section visibility
 */
export function AnalyticsProvider() {
  // Enable scroll depth and outbound link tracking
  useAutoTracking();

  // Track section visibility
  useEffect(() => {
    const trackedSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting && !trackedSections.has(sectionId)) {
            trackedSections.add(sectionId);
            const section = TRACKED_SECTIONS.find((s) => s.id === sectionId);
            if (section) {
              trackSectionView(section.id, section.name);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all tracked sections
    TRACKED_SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
