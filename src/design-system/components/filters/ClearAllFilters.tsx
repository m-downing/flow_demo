import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface ClearAllFiltersProps {
  onClear: () => void;
  disabled?: boolean;
  hasActiveFilters?: boolean;
  className?: string;
  variant?: 'button' | 'link' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  children?: React.ReactNode;
  position?: 'left' | 'center' | 'right';
}

const ClearAllFilters: React.FC<ClearAllFiltersProps> = ({
  onClear,
  disabled = false,
  hasActiveFilters = true,
  className = '',
  variant = 'button',
  size = 'md',
  showIcon = true,
  children,
  position = 'left',
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const handleClear = () => {
    if (!disabled && hasActiveFilters) {
      onClear();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'button' 
          ? 'px-2 py-1 text-xs'
          : 'text-xs';
      case 'lg':
        return variant === 'button'
          ? 'px-4 py-2.5 text-base'
          : 'text-base';
      default:
        return variant === 'button'
          ? 'px-3 py-2 text-sm'
          : 'text-sm';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  };

  const getVariantClasses = () => {
    const baseClasses = `
      transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-30
      inline-flex items-center gap-2
    `;

    if (disabled || !hasActiveFilters) {
      return variant === 'button'
        ? isDark
          ? `${baseClasses} bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700 rounded-sm`
          : `${baseClasses} bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-300 rounded-sm`
        : isDark
          ? `${baseClasses} text-neutral-500 cursor-not-allowed`
          : `${baseClasses} text-neutral-400 cursor-not-allowed`;
    }

    switch (variant) {
      case 'button':
        return isDark
          ? `${baseClasses} bg-primary-900 hover:bg-primary-800 text-primary-100 border border-primary-600 hover:border-primary-500 rounded-sm focus-visible:ring-primary-400 cursor-pointer`
          : `${baseClasses} bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-neutral-400 rounded-sm focus-visible:ring-primary-600 cursor-pointer`;
      
      case 'link':
        return isDark
          ? `${baseClasses} text-primary-400 hover:text-primary-300 underline decoration-1 underline-offset-2 focus-visible:ring-primary-400 cursor-pointer`
          : `${baseClasses} text-primary-600 hover:text-primary-700 underline decoration-1 underline-offset-2 focus-visible:ring-primary-600 cursor-pointer`;
      
      case 'icon':
        return isDark
          ? `${baseClasses} text-primary-400 hover:text-primary-300 hover:bg-primary-800 p-1.5 rounded-sm focus-visible:ring-primary-400 cursor-pointer`
          : `${baseClasses} text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 p-1.5 rounded-sm focus-visible:ring-primary-600 cursor-pointer`;
      
      default:
        return baseClasses;
    }
  };

  const getIconClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-5 h-5';
      default:
        return 'w-4 h-4';
    }
  };

  const getClearIcon = () => {
    return (
      <svg 
        className={getIconClasses()} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
        />
      </svg>
    );
  };

  const getContent = () => {
    if (children) {
      return (
        <>
          {showIcon && getClearIcon()}
          {children}
        </>
      );
    }

    switch (variant) {
      case 'icon':
        return getClearIcon();
      case 'link':
        return (
          <>
            {showIcon && getClearIcon()}
            Clear filters
          </>
        );
      default:
        return (
          <>
            {showIcon && getClearIcon()}
            Clear All
          </>
        );
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex ${getPositionClasses()} ${className}`}>
      <button
        type="button"
        onClick={handleClear}
        disabled={disabled || !hasActiveFilters}
        className={`${getVariantClasses()} ${getSizeClasses()}`}
        title={
          disabled || !hasActiveFilters
            ? 'No active filters to clear'
            : 'Clear all active filters'
        }
        aria-label="Clear all filters"
      >
        {getContent()}
      </button>
    </div>
  );
};

// Convenience wrapper for common use cases
export const ClearFiltersButton: React.FC<Omit<ClearAllFiltersProps, 'variant'>> = (props) => (
  <ClearAllFilters {...props} variant="button" />
);

export const ClearFiltersLink: React.FC<Omit<ClearAllFiltersProps, 'variant'>> = (props) => (
  <ClearAllFilters {...props} variant="link" />
);

export const ClearFiltersIcon: React.FC<Omit<ClearAllFiltersProps, 'variant' | 'showIcon'>> = (props) => (
  <ClearAllFilters {...props} variant="icon" showIcon={true} />
);

export default ClearAllFilters; 