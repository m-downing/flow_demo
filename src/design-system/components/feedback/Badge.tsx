// src/app/components/design-system/Badge.tsx

import React from 'react';

/**
 * Badge variants for all possible status indicators in the application
 */
export type BadgeVariant = 
  // Supply Chain Status Badges
  | 'planned'
  | 'plannedInverted'
  | 'ordered'
  | 'orderedInverted'
  | 'manufacturing'
  | 'manufacturingInverted'
  | 'qualityTesting'
  | 'qualityTestingInverted'
  | 'readyToShip'
  | 'readyToShipInverted'
  | 'inTransit'
  | 'inTransitInverted'
  | 'delivered'
  | 'deliveredInverted'
  | 'installing'
  | 'installingInverted'
  | 'active'
  | 'activeInverted'
  | 'maintenance'
  | 'maintenanceInverted'
  | 'delayed'
  | 'delayedInverted'
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
  // Check if it's a priority/risk badge
  const isPriorityBadge = ['critical', 'highPriority', 'standard', 'atRisk'].includes(variant);
  
  // Transform text to uppercase for priority/risk badges
  const content = isPriorityBadge ? children?.toString().toUpperCase() : children;
  
  // Size classes
  const sizeClasses = size === 'small' 
    ? 'px-1.5 py-1.5 text-xxs' 
    : 'px-2 py-1 text-xs';
  
  // Build variant-specific Tailwind classes
  const variantClasses = {
    // Supply Chain Status Badges
    planned: 'bg-badge-planned-bg text-badge-planned-text',
    plannedInverted: 'bg-badge-plannedInverted-bg text-badge-plannedInverted-text',
    ordered: 'bg-badge-ordered-bg text-badge-ordered-text',
    orderedInverted: 'bg-badge-orderedInverted-bg text-badge-orderedInverted-text',
    manufacturing: 'bg-badge-manufacturing-bg text-badge-manufacturing-text',
    manufacturingInverted: 'bg-badge-manufacturingInverted-bg text-badge-manufacturingInverted-text',
    qualityTesting: 'bg-badge-qualityTesting-bg text-badge-qualityTesting-text',
    qualityTestingInverted: 'bg-badge-qualityTestingInverted-bg text-badge-qualityTestingInverted-text',
    readyToShip: 'bg-badge-readyToShip-bg text-badge-readyToShip-text',
    readyToShipInverted: 'bg-badge-readyToShipInverted-bg text-badge-readyToShipInverted-text',
    inTransit: 'bg-badge-inTransit-bg text-badge-inTransit-text',
    inTransitInverted: 'bg-badge-inTransitInverted-bg text-badge-inTransitInverted-text',
    delivered: 'bg-badge-delivered-bg text-badge-delivered-text',
    deliveredInverted: 'bg-badge-deliveredInverted-bg text-badge-deliveredInverted-text',
    installing: 'bg-badge-installing-bg text-badge-installing-text',
    installingInverted: 'bg-badge-installingInverted-bg text-badge-installingInverted-text',
    active: 'bg-badge-active-bg text-badge-active-text',
    activeInverted: 'bg-badge-activeInverted-bg text-badge-activeInverted-text',
    maintenance: 'bg-badge-maintenance-bg text-badge-maintenance-text',
    maintenanceInverted: 'bg-badge-maintenanceInverted-bg text-badge-maintenanceInverted-text',
    delayed: 'bg-badge-delayed-bg text-badge-delayed-text',
    delayedInverted: 'bg-badge-delayedInverted-bg text-badge-delayedInverted-text',
    // Priority/Risk Badges
    critical: 'bg-badge-critical-bg text-badge-critical-text',
    highPriority: 'bg-badge-highPriority-bg text-badge-highPriority-text',
    standard: 'bg-badge-standard-bg text-badge-standard-text',
    atRisk: 'bg-badge-atRisk-bg text-badge-atRisk-text',
  };
  
  const variantClass = variantClasses[variant];
  
  if (!variantClass) {
    console.error(`Badge variant "${variant}" is not defined`);
    return null;
  }
  
  // Cursor class if onClick provided
  const cursorClass = onClick ? 'cursor-pointer hover:opacity-90' : '';
  
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        font-semibold
        rounded-xs
        opacity-85
        ${sizeClasses}
        ${variantClass}
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