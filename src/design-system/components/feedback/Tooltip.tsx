import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useTheme } from '../../../app/contexts/ThemeContext';

/**
 * Tooltip positions
 */
export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Tooltip component props
 */
export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Element to trigger the tooltip */
  children: ReactNode;
  /** Tooltip position */
  position?: TooltipPosition;
  /** Whether to show an arrow pointing to the trigger element */
  arrow?: boolean;
  /** Tooltip width (overrides auto) */
  width?: string;
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Additional class names */
  className?: string;
  /** Disable tooltip */
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  arrow = true,
  width = 'auto',
  delay = 300,
  className = '',
  disabled = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Theme-aware tooltip classes
  const tooltipClasses = isDark
    ? 'bg-neutral-800 text-neutral-100 border border-neutral-700'
    : 'bg-neutral-900 text-neutral-100';

  // Calculate tooltip positioning styles
  const getTooltipStyle = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    // Apply explicit width or allow content to size naturally
    if (width !== 'auto') {
      styles.width = width;
    } else {
      styles.minWidth = 'max-content';
    }

    switch (position) {
      case 'top':
        styles.bottom = '100%';
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        styles.marginBottom = '4px';
        break;
      case 'right':
        styles.left = '100%';
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
        styles.marginLeft = '4px';
        break;
      case 'bottom':
        styles.top = '100%';
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        styles.marginTop = '4px';
        break;
      case 'left':
        styles.right = '100%';
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
        styles.marginRight = '4px';
        break;
    }

    return styles;
  };

  // Arrow positioning classes
  const arrowPositionClasses: Record<TooltipPosition, string> = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45',
  };

  // Arrow classes
  const arrowClasses = isDark
    ? 'bg-neutral-800 border-neutral-700'
    : 'bg-neutral-900';

  // Show tooltip after delay
  const showTooltip = () => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  // Hide tooltip immediately
  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setIsVisible(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isVisible && !disabled && (
        <div
          role="tooltip"
          ref={tooltipRef}
          className={
            `absolute z-50 rounded-sm px-2 py-1 text-sm shadow-md break-words ${width === 'auto' ? 'min-w-max' : ''} ${tooltipClasses} ${className}`
          }
          style={getTooltipStyle()}
        >
          {content}
          {arrow && (
            <div
              className={`absolute h-2 w-2 ${arrowClasses} ${arrowPositionClasses[position]}`}  
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
