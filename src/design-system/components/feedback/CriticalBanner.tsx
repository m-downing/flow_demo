'use client';

import React, { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { colors } from '../../foundations/tokens/colors';

/**
 * CriticalBanner component props
 * @interface CriticalBannerProps
 */
interface CriticalBannerProps {
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
  /** Custom icon (defaults to warning triangle) */
  icon?: React.ReactNode;
  /** Whether the banner should be visible */
  isVisible?: boolean;
}

/**
 * CriticalBanner - A non-dismissible critical alert banner that appears at the top of the main content area.
 * This banner cannot be dismissed and will appear on all pages when active.
 * Use for system-wide critical notifications, maintenance alerts, or urgent security warnings.
 * 
 * @param props - CriticalBanner component props
 * @returns JSX.Element
 */
const CriticalBanner: React.FC<CriticalBannerProps> = ({
  title,
  message,
  action,
  className = '',
  icon,
  isVisible = true
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Add small delay for smooth entrance animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const defaultIcon = <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" style={{ color: colors.colors.error[500] }} />;

  return (
    <div 
      className={`
        relative top-0 left-0 right-0 z-50 w-full
        transform transition-all duration-300 ease-in-out
        ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${className}
      `}
      style={{
        backgroundColor: colors.colors.error[50],
        borderBottom: `2px solid ${colors.colors.error[500]}`,
      }}
      role="alert"
      aria-live="assertive"
    >
      <div className="px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {icon || defaultIcon}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 
                  className="text-sm font-bold mb-1"
                  style={{ color: colors.colors.error[500] }}
                >
                  {title}
                </h3>
              )}
              <div 
                className="text-sm leading-5 font-medium"
                style={{ color: colors.colors.error[500] }}
              >
                {message}
              </div>
            </div>
          </div>
          
          {action && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={action.onClick}
                className="text-sm font-bold px-4 py-2 rounded-md transition-all duration-200 border"
                style={{ 
                  color: colors.colors.error[500],
                  borderColor: colors.colors.error[300],
                  backgroundColor: colors.colors.neutral[50]
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.colors.error[100];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.colors.neutral[50];
                }}
              >
                {action.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CriticalBanner; 