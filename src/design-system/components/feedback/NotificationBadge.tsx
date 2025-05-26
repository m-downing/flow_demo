'use client';

import React from 'react';

interface NotificationBadgeProps {
  count: number;
  variant?: 'sm' | 'md';
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ 
  count, 
  variant = 'md',
  className = '' 
}) => {
  if (count === 0) return null;

  const sizeClasses = {
    sm: 'h-3 w-3 text-xxs',
    md: 'h-3 w-3 text-xxs'
  };

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <span 
      className={`
        absolute -top-1 -right-1
        ${sizeClasses[variant]}
        bg-error-500
        text-white
        rounded-full
        flex items-center justify-center
        font-medium
        ${className}
      `}
      aria-label={`${count} unread notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;
