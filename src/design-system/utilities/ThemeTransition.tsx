'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';

interface ThemeTransitionProps {
  children: React.ReactNode;
  /** Custom transition duration in milliseconds */
  duration?: number;
  /** Show a subtle overlay during transition */
  showOverlay?: boolean;
  /** Enhanced transition for this component and children */
  enhanced?: boolean;
}

/**
 * ThemeTransition component enhances theme switching with smooth visual transitions
 * and optional overlay effects to mask any visual inconsistencies during the transition.
 */
const ThemeTransition: React.FC<ThemeTransitionProps> = ({
  children,
  duration = 300,
  showOverlay = false,
  enhanced = false,
}) => {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    // Skip initial render
    if (previousTheme === null) {
      setPreviousTheme(theme);
      return;
    }

    // Only trigger transition if theme actually changed
    if (previousTheme !== theme) {
      setIsTransitioning(true);
      
      // Add enhanced transition class to body during transition
      if (enhanced) {
        document.body.classList.add('theme-transition-enhanced');
      }

      // Reset transitioning state after transition completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        if (enhanced) {
          document.body.classList.remove('theme-transition-enhanced');
        }
      }, duration);

      setPreviousTheme(theme);

      return () => {
        clearTimeout(timer);
        if (enhanced) {
          document.body.classList.remove('theme-transition-enhanced');
        }
      };
    }
  }, [theme, duration, enhanced, previousTheme]);

  const containerClasses = [
    enhanced ? 'theme-transition-enhanced' : '',
    'theme-transition-stable',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {children}
      {showOverlay && isTransitioning && (
        <div 
          className="fixed inset-0 pointer-events-none z-50 transition-opacity"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            opacity: isTransitioning ? 1 : 0,
            transitionDuration: `${duration / 2}ms`,
          }}
        />
      )}
    </div>
  );
};

export default ThemeTransition; 