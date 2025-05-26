// src/app/components/design-system/Badge.tsx

import React from 'react';
import { badgeColors } from '../../foundations/tokens/colors';

/**
 * Badge variants for all possible status indicators in the application
 */
export type BadgeVariant = 
  // Supply Chain Status Badges
  | 'planned'
  | 'ordered'
  | 'manufacturing'
  | 'qualityTesting'
  | 'readyToShip'
  | 'inTransit'
  | 'delivered'
  | 'installing'
  | 'active'
  | 'maintenance'
  | 'delayed'
  // Priority/Risk Badges
  | 'critical'
  | 'highPriority'
  | 'standard'
  | 'atRisk';

/**
 * Badge component props
 * @interface BadgeProps
 */
interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Badge variant/color */
  variant: BadgeVariant;
  /** Optional click handler */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /** Additional class names to apply */
  className?: string;
  /** Size of the badge - defaults to regular */
  size?: 'small' | 'regular';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  onClick,
  className = '',
  size = 'regular',
}) => {
  // Get colors from our badge color system
  const colorConfig = badgeColors[variant];
  
  if (!colorConfig) {
    console.error(`Badge variant "${variant}" is not defined in badgeColors`);
    return null;
  }
  
  // Check if it's a priority/risk badge
  const isPriorityBadge = ['critical', 'highPriority', 'standard', 'atRisk'].includes(variant);
  
  // Build style for the badge
  const style = {
    backgroundColor: colorConfig.bg,
    color: colorConfig.text,
    opacity: 0.85,
  };
  
  // Cursor class if onClick provided
  const cursorClass = onClick ? 'cursor-pointer hover:opacity-90' : '';
  
  // Transform text to uppercase for priority/risk badges
  const content = isPriorityBadge ? children?.toString().toUpperCase() : children;
  
  // Size classes
  const sizeClasses = size === 'small' 
    ? 'px-1.5 py-1.5 text-xxs' 
    : 'px-2 py-1 text-xs';
    
  return (
    <span
      style={style}
      className={`
        inline-flex
        items-center
        justify-center
        ${sizeClasses}
        font-semibold
        rounded-xs
        ${cursorClass}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {content}
    </span>
  );
};

export default Badge; 