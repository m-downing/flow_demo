'use client';

import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div 
      className={`
        px-12 pt-8 pb-16
        min-h-screen
        bg-neutral-50 dark:bg-neutral-950
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default PageContainer; 