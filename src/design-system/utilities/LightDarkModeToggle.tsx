'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

/**
 * Light/Dark Mode Toggle component props
 */
interface LightDarkModeToggleProps {
  /** Current mode */
  mode?: 'light' | 'dark';
  /** Callback when mode changes */
  onChange?: (mode: 'light' | 'dark') => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Enhanced transition animation */
  enhanced?: boolean;
}

const LightDarkModeToggle: React.FC<LightDarkModeToggleProps> = ({
  mode,
  onChange,
  disabled = false,
  className = '',
  enhanced = false,
}) => {
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to get current theme from DOM and localStorage
  const getCurrentTheme = useCallback((): 'light' | 'dark' => {
    // First check if there's a passed mode prop
    if (mode) return mode;
    
    // Check localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme as 'light' | 'dark';
    }
    
    // Check DOM
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }, [mode]);

  // Initialize the current mode on mount
  useEffect(() => {
    const detectedMode = getCurrentTheme();
    setCurrentMode(detectedMode);
  }, [getCurrentTheme]);

  // Apply theme changes to DOM and localStorage with enhanced transitions
  const applyTheme = useCallback((newMode: 'light' | 'dark') => {
    // Add enhanced transition temporarily if enabled
    if (enhanced) {
      document.documentElement.classList.add('theme-transition-enhanced');
    }

    if (newMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newMode);

    // Remove enhanced transition class after transition
    if (enhanced) {
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition-enhanced');
      }, 450); // Slightly longer than transition duration
    }
  }, [enhanced]);

  // Update internal state when prop changes
  useEffect(() => {
    if (mode && mode !== currentMode) {
      setCurrentMode(mode);
      applyTheme(mode);
    }
  }, [mode, currentMode, applyTheme]);

  // Apply theme when currentMode changes
  useEffect(() => {
    applyTheme(currentMode);
  }, [currentMode, applyTheme]);

  const handleToggle = () => {
    if (disabled) return;
    
    setIsTransitioning(true);
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setCurrentMode(newMode);
    onChange?.(newMode);

    // Reset transitioning state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const toggleClasses = [
    'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-400 dark:focus-visible:ring-offset-neutral-900',
    currentMode === 'light' 
      ? 'bg-neutral-200 dark:bg-neutral-700' 
      : 'bg-neutral-600',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    isTransitioning ? 'scale-105' : '',
  ].filter(Boolean).join(' ');

  const knobClasses = [
    'inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-all duration-300',
    currentMode === 'light' ? 'translate-x-1' : 'translate-x-6',
    isTransitioning ? 'scale-110' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label className="flex items-center gap-3 cursor-pointer">
        {/* Light mode icon */}
        <SunIcon 
          className={`h-5 w-5 transition-all duration-300 ${
            currentMode === 'light' 
              ? 'text-amber-500 scale-110' 
              : 'text-amber-400 scale-100'
          }`}
        />
        
        {/* Toggle switch */}
        <div 
          className={toggleClasses}
          onClick={handleToggle}
          role="switch"
          aria-checked={currentMode === 'dark'}
          aria-label={`Switch to ${currentMode === 'light' ? 'dark' : 'light'} mode`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          {/* Toggle knob */}
          <span className={knobClasses} />
        </div>
        
        {/* Dark mode icon */}
        <MoonIcon 
          className={`h-5 w-5 transition-all duration-300 ${
            currentMode === 'dark' 
              ? 'text-neutral-100 scale-110' 
              : 'text-neutral-400 dark:text-neutral-500 scale-100'
          }`}
        />
      </label>
      
      {/* Mode label */}
      <span className="text-sm text-neutral-700 dark:text-neutral-300 min-w-[3rem] transition-colors duration-300">
        {currentMode === 'light' ? 'Light' : 'Dark'}
      </span>
    </div>
  );
};

export default LightDarkModeToggle;