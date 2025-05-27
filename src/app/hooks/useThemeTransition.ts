'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface UseThemeTransitionOptions {
  /** Duration of the transition in milliseconds */
  duration?: number;
  /** Whether to use enhanced transitions */
  enhanced?: boolean;
  /** Callback fired when transition starts */
  onTransitionStart?: () => void;
  /** Callback fired when transition ends */
  onTransitionEnd?: () => void;
}

interface UseThemeTransitionReturn {
  /** Whether a theme transition is currently in progress */
  isTransitioning: boolean;
  /** The previous theme (useful for animations) */
  previousTheme: 'light' | 'dark' | null;
  /** Manually trigger enhanced transition for the next theme change */
  triggerEnhanced: () => void;
  /** Disable transitions temporarily */
  disableTransitions: () => void;
  /** Re-enable transitions */
  enableTransitions: () => void;
}

/**
 * Hook for managing theme transitions with various options and utilities
 */
export const useThemeTransition = (
  options: UseThemeTransitionOptions = {}
): UseThemeTransitionReturn => {
  const {
    duration = 300,
    enhanced = false,
    onTransitionStart,
    onTransitionEnd,
  } = options;

  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<'light' | 'dark' | null>(null);
  const [enhancedNext, setEnhancedNext] = useState(false);

  useEffect(() => {
    // Skip initial render
    if (previousTheme === null) {
      setPreviousTheme(theme);
      return;
    }

    // Only trigger transition if theme actually changed
    if (previousTheme !== theme) {
      setIsTransitioning(true);
      onTransitionStart?.();

      // Add enhanced transition class if requested
      if (enhanced || enhancedNext) {
        document.documentElement.classList.add('theme-transition-enhanced');
        setEnhancedNext(false); // Reset after use
      }

      // Reset transitioning state after transition completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        onTransitionEnd?.();
        
        // Remove enhanced transition class
        if (enhanced || document.documentElement.classList.contains('theme-transition-enhanced')) {
          document.documentElement.classList.remove('theme-transition-enhanced');
        }
      }, duration);

      setPreviousTheme(theme);

      return () => {
        clearTimeout(timer);
        document.documentElement.classList.remove('theme-transition-enhanced');
      };
    }
  }, [theme, duration, enhanced, enhancedNext, onTransitionStart, onTransitionEnd, previousTheme]);

  const triggerEnhanced = () => {
    setEnhancedNext(true);
  };

  const disableTransitions = () => {
    document.documentElement.classList.add('no-transitions');
  };

  const enableTransitions = () => {
    document.documentElement.classList.remove('no-transitions');
  };

  return {
    isTransitioning,
    previousTheme,
    triggerEnhanced,
    disableTransitions,
    enableTransitions,
  };
}; 