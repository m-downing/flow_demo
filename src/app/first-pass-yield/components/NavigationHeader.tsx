'use client';

import React from 'react';
import FilterBar from '@/design-system/components/navigation/FilterBar';

interface NavigationHeaderProps {
  timeRange: string;
  region: string;
  priority: string;
  onTimeRangeChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export default function NavigationHeader({ 
  timeRange,
  region, 
  priority,
  onTimeRangeChange,
  onRegionChange,
  onPriorityChange 
}: NavigationHeaderProps) {
  const handleMoreFiltersClick = () => {
    console.log('More filters clicked');
  };

  return (
    <>
      <div>
        <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">First Pass Yield</h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-200">
          Quality metrics of rack builds over time, measuring workstation performance
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <FilterBar
          timeRange={timeRange}
          region={region}
          priority={priority}
          onTimeRangeChange={onTimeRangeChange}
          onRegionChange={onRegionChange}
          onPriorityChange={onPriorityChange}
          onMoreFiltersClick={handleMoreFiltersClick}
          showMoreFilters={true}
        />
      </div>
    </>
  );
} 