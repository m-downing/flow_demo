'use client';

import React, { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { colors } from '@/design-system/foundations/tokens/colors';

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

  const defaultIcon = <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" style={{ color: colors.error[500] }} />;

  const bannerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '11px 16px',
    backgroundColor: colors.error[50],
    borderBottom: `2px solid ${colors.error[500]}`,
    fontSize: '14px',
    lineHeight: '1.5',
    position: 'relative',
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: '600',
    margin: '0 0 2px 0',
    color: colors.error[500]
  };

  const messageStyle: React.CSSProperties = {
    margin: '0',
    color: colors.error[500]
  };

  const actionButtonStyle: React.CSSProperties = {
    padding: '6px 12px',
    fontSize: '13px',
    fontWeight: '500',
    border: '1px solid',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: colors.error[500],
    borderColor: colors.error[300],
    backgroundColor: colors.neutral[50]
  };

  const handleActionMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = colors.error[100];
  };

  const handleActionMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = colors.neutral[50];
  };

  return (
    <div 
      className={`
        relative top-0 left-0 right-0 z-50 w-full
        transform transition-all duration-300 ease-in-out
        ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${className}
      `}
      style={bannerStyle}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start justify-between gap-4 w-full">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {icon || defaultIcon}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 
                className="text-sm font-bold mb-1"
                style={titleStyle}
              >
                {title}
              </h3>
            )}
            <div 
              className="text-sm leading-5 font-medium"
              style={messageStyle}
            >
              {message}
            </div>
          </div>
        </div>
        
        {action && (
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={action.onClick}
              className="text-sm font-bold px-4 py-1.5 rounded-md transition-all duration-200 border"
              style={actionButtonStyle}
              onMouseEnter={handleActionMouseEnter}
              onMouseLeave={handleActionMouseLeave}
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CriticalBanner; 