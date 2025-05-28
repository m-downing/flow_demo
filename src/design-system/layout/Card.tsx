import React from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';

/**
 * Card component props
 * @interface CardProps
 */
interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Card title (optional) */
  title?: string;
  /** Additional class names to apply */
  className?: string;
  /** Whether to add padding to the card */
  padded?: boolean;
  /** Whether to add a border to the card */
  bordered?: boolean;
  /** Whether to add a shadow to the card */
  shadowed?: boolean;
  /** Whether to make the card clickable */
  hoverable?: boolean;
  /** Whether to make the card span the full width of its container */
  fullWidth?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Header content (alternative to title) */
  header?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  padded = true,
  bordered = true,
  shadowed = false,
  hoverable = false,
  fullWidth = false,
  footer,
  header,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Theme-aware base classes
  const baseClasses = isDark 
    ? 'bg-neutral-800 rounded-md overflow-hidden'
    : 'bg-white rounded-md overflow-hidden';
  
  // Optional classes based on props
  const paddingClasses = padded ? 'p-4' : '';
  const borderClasses = bordered 
    ? (isDark ? 'border border-neutral-700' : 'border border-neutral-200')
    : '';
  const shadowClasses = shadowed ? 'shadow-md' : '';
  const hoverClasses = hoverable ? 'transition-transform hover:scale-[1.01] cursor-pointer' : '';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Theme-aware text color for header/title
  const headerTextColor = isDark ? 'text-neutral-100' : 'text-neutral-900';
  
  // Theme-aware footer classes
  const footerBorderColor = isDark ? 'border-neutral-700' : 'border-neutral-200';
  const footerBgColor = isDark ? 'bg-neutral-900' : 'bg-neutral-50';
  
  return (
    <div 
      className={`
        ${baseClasses}
        ${paddingClasses}
        ${borderClasses}
        ${shadowClasses}
        ${hoverClasses}
        ${widthClasses}
        ${className}
      `}
    >
      {/* Header section (if provided) */}
      {(title || header) && (
        <div className={`font-medium text-lg ${headerTextColor} ${!header && padded ? '-mt-1 mb-3' : ''}`}>
          {header || title}
        </div>
      )}
      
      {/* Main content */}
      <div className={padded ? '' : 'p-4'}>
        {children}
      </div>
      
      {/* Footer (if provided) */}
      {footer && (
        <div className={`
          mt-4 
          ${padded ? '-mx-4 -mb-4 pt-3 px-4 pb-4' : 'mx-0 pb-0'}
          border-t ${footerBorderColor}
          ${footerBgColor}
        `}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 