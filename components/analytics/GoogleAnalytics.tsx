"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Declare gtag on window
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "consent",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Track page views
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_location: window.location.href,
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  // Delay loading until user interaction or after 5 seconds
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const events = ['scroll', 'click', 'touchstart', 'keydown'];
    let loaded = false;

    const loadGA = () => {
      if (loaded) return;
      loaded = true;
      setShouldLoad(true);
      events.forEach(event => window.removeEventListener(event, loadGA, { capture: true }));
    };

    // Load after user interaction
    events.forEach(event => window.addEventListener(event, loadGA, { capture: true, passive: true }));

    // Fallback: load after 5 seconds if no interaction
    const timer = setTimeout(loadGA, 5000);

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, loadGA, { capture: true }));
    };
  }, []);

  if (!GA_MEASUREMENT_ID || !shouldLoad) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script - loads after user interaction */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Functional analytics with privacy settings
            // Analytics storage is granted for functional analytics only
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            gtag('config', '${GA_MEASUREMENT_ID}', {
              // Anonymization settings
              anonymize_ip: true,

              // Disable cookies - use session-based tracking
              client_storage: 'none',

              // Disable advertising features
              allow_google_signals: false,
              allow_ad_personalization_signals: false,

              // Disable user-id tracking
              send_page_view: true,

              // Cookie settings (minimal)
              cookie_flags: 'SameSite=Strict;Secure',
              cookie_expires: 0,

              // Custom dimensions for anonymous tracking
              custom_map: {
                'dimension1': 'session_id'
              }
            });
          `,
        }}
      />

      {/* Page view tracker with Suspense for searchParams */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
