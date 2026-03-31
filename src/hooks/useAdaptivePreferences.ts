import { useEffect, useState } from 'react';

interface AdaptivePreferences {
  prefersReducedMotion: boolean;
  prefersDarkMode: boolean;
  isSlowConnection: boolean;
  isTouchDevice: boolean;
}

export const useAdaptivePreferences = (): AdaptivePreferences => {
  const [preferences, setPreferences] = useState<AdaptivePreferences>({
    prefersReducedMotion: false,
    prefersDarkMode: true,
    isSlowConnection: false,
    isTouchDevice: false,
  });

  useEffect(() => {
    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = motionQuery.matches;

    // Detect dark mode preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkMode = darkModeQuery.matches;

    // Detect touch capability
    const isTouchDevice =
      window.matchMedia('(hover: none)').matches ||
      navigator.maxTouchPoints > 0;

    // Detect slow connection (slow 3G or slower)
    const isSlowConnection =
      (navigator as any).connection?.effectiveType === '3g' ||
      (navigator as any).connection?.effectiveType === '4g' ||
      ((navigator as any).connection?.saveData === true);

    setPreferences({
      prefersReducedMotion,
      prefersDarkMode,
      isSlowConnection,
      isTouchDevice,
    });

    // Listen for changes in preferences
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPreferences((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
      }));
    };

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setPreferences((prev) => ({
        ...prev,
        prefersDarkMode: e.matches,
      }));
    };

    motionQuery.addEventListener?.('change', handleMotionChange);
    darkModeQuery.addEventListener?.('change', handleDarkModeChange);

    return () => {
      motionQuery.removeEventListener?.('change', handleMotionChange);
      darkModeQuery.removeEventListener?.('change', handleDarkModeChange);
    };
  }, []);

  return preferences;
};

export const useConnectionStatus = () => {
  const [connection, setConnection] = useState({
    type: 'unknown',
    effectiveType: '4g',
    saveData: false,
  });

  useEffect(() => {
    const nav = navigator as any;
    if (nav.connection) {
      setConnection({
        type: nav.connection.type,
        effectiveType: nav.connection.effectiveType,
        saveData: nav.connection.saveData,
      });

      const handleChange = () => {
        setConnection({
          type: nav.connection.type,
          effectiveType: nav.connection.effectiveType,
          saveData: nav.connection.saveData,
        });
      };

      nav.connection.addEventListener('change', handleChange);
      return () => nav.connection.removeEventListener('change', handleChange);
    }
  }, []);

  return connection;
};
