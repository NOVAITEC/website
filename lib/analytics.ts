/**
 * Google Analytics Event Tracking Utilities
 *
 * Usage:
 * - trackEvent('button_click', { button_name: 'contact_cta' })
 * - trackCTAClick('hero', 'Plan een gesprek')
 * - trackFormSubmit('contact')
 * - trackOutboundLink('https://linkedin.com/in/kyancordes')
 */

type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

// Check if gtag is available
function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Generic event tracking function
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (!isGtagAvailable()) return;

  window.gtag("event", eventName, {
    ...parameters,
    send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  });
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
  location: string,
  buttonText: string,
  destination?: string
): void {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: buttonText,
    cta_location: location,
    cta_text: buttonText,
    cta_destination: destination || "unknown",
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(
  formName: string,
  success: boolean = true
): void {
  trackEvent("form_submit", {
    event_category: "conversion",
    form_name: formName,
    form_success: success,
  });
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(url: string, linkText?: string): void {
  trackEvent("outbound_link", {
    event_category: "engagement",
    event_label: linkText || url,
    link_url: url,
    link_domain: new URL(url).hostname,
  });
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent("scroll_depth", {
    event_category: "engagement",
    scroll_percentage: percentage,
    event_label: `${percentage}%`,
  });
}

/**
 * Track section visibility (when user scrolls to a section)
 */
export function trackSectionView(sectionId: string, sectionName: string): void {
  trackEvent("section_view", {
    event_category: "engagement",
    section_id: sectionId,
    section_name: sectionName,
  });
}

/**
 * Track navigation clicks
 */
export function trackNavClick(linkText: string, destination: string): void {
  trackEvent("navigation_click", {
    event_category: "navigation",
    event_label: linkText,
    nav_destination: destination,
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent("file_download", {
    event_category: "engagement",
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Track video interactions
 */
export function trackVideoEvent(
  action: "play" | "pause" | "complete" | "progress",
  videoTitle: string,
  progress?: number
): void {
  trackEvent("video_interaction", {
    event_category: "engagement",
    video_action: action,
    video_title: videoTitle,
    video_progress: progress,
  });
}

/**
 * Track errors (for debugging)
 */
export function trackError(
  errorType: string,
  errorMessage: string,
  fatal: boolean = false
): void {
  trackEvent("exception", {
    description: `${errorType}: ${errorMessage}`,
    fatal: fatal,
  });
}

/**
 * Track search queries (if you have search functionality)
 */
export function trackSearch(searchTerm: string, resultsCount?: number): void {
  trackEvent("search", {
    event_category: "engagement",
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/**
 * Track timing events (page load, interactions, etc.)
 */
export function trackTiming(
  category: string,
  variable: string,
  value: number,
  label?: string
): void {
  trackEvent("timing_complete", {
    event_category: category,
    name: variable,
    value: Math.round(value),
    event_label: label,
  });
}
