'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { colors } from '../../foundations/tokens/colors';

/**
 * InfoBanner component props
 * @interface InfoBannerProps
 */
interface InfoBannerProps {
  /** Unique identifier for the banner - used for dismissal persistence */
  id: string;
  /** Banner title text */
  title?: string;
  /** Banner message content */
  message: React.ReactNode;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional CSS classes */
  className?: string;
  /** Custom icon (defaults to info icon) */
  icon?: React.ReactNode;
  /** Whether the banner should be visible */
  isVisible?: boolean;
}

/**
 * InfoBanner - A dismissible information banner that appears at the top of the main content area.
 * Once dismissed, it will not appear again on subsequent page visits.
 * 
 * @param props - InfoBanner component props
 * @returns JSX.Element
 */
const InfoBanner: React.FC<InfoBannerProps> = ({
  id,
  title,
  message,
  action,
  className = '',
  icon,
  isVisible = true
}) => {
  const [isInternallyVisible, setIsInternallyVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const storageKey = `infoBanner_dismissed_${id}`;

  useEffect(() => {
    // Only show if both external isVisible prop is true AND banner hasn't been dismissed
    if (isVisible) {
      const isDismissed = localStorage.getItem(storageKey) === 'true';
      if (!isDismissed) {
        setIsInternallyVisible(true);
        // Add small delay for smooth entrance animation
        setTimeout(() => setIsAnimating(true), 10);
      }
    } else {
      setIsInternallyVisible(false);
      setIsAnimating(false);
    }
  }, [storageKey, isVisible]);

  const handleDismiss = () => {
    setIsAnimating(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsInternallyVisible(false);
      localStorage.setItem(storageKey, 'true');
    }, 300);
  };

  if (!isInternallyVisible) {
    return null;
  }

  const defaultIcon = <InformationCircleIcon className="w-5 h-5 flex-shrink-0" style={{ color: colors.colors.primary[700] }} />;

  return (
    <div 
      className={`
        relative top-0 left-0 right-0 z-40 w-full
        transform transition-all duration-300 ease-in-out
        ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${className}
      `}
      style={{
        backgroundColor: colors.colors.teal[100],
        borderBottom: `2px solid ${colors.colors.teal[500]}`,
      }}
      role="banner"
      aria-live="polite"
    >
      <div className="px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {icon || defaultIcon}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 
                  className="text-sm font-semibold mb-1"
                  style={{ color: colors.colors.primary[700] }}
                >
                  {title}
                </h3>
              )}
              <div 
                className="text-sm leading-5"
                style={{ color: colors.colors.primary[600] }}
              >
                {message}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            {action && (
              <button
                onClick={action.onClick}
                className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200 hover:bg-teal-200"
                style={{ 
                  color: colors.colors.primary[700],
                }}
              >
                {action.label}
              </button>
            )}
            
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md transition-colors duration-200 hover:bg-teal-200"
              style={{ color: colors.colors.primary[700] }}
              aria-label="Dismiss banner"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner; 