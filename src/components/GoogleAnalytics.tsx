import { useEffect } from 'react';

/**
 * Google Analytics 4 - Track page views and events
 *
 * To set up:
 * 1. Go to https://analytics.google.com/
 * 2. Create a property for your website
 * 3. Get your GA4 Measurement ID (looks like G-XXXXXXXXXX)
 * 4. Add to .env: VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
 */
export const GoogleAnalytics = () => {
  const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaId) {
      console.warn('[GA4] VITE_GA4_MEASUREMENT_ID not configured. Analytics disabled.');
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    function gtag(...args: any[]) {
      win.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId, {
      page_path: window.location.pathname,
      anonymize_ip: true,
    });

    // Store gtag globally for manual event tracking
    win.gtag = gtag;

    console.log('[GA4] Analytics initialized with ID:', gaId);
  }, [gaId]);

  return null;
};

/**
 * Track custom events in GA4
 * Usage: trackEvent('video_play', { video_title: 'My Video' })
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

/**
 * Track page view
 * Called automatically on route change in React Router
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
};
