import React from 'react';
import FilterBar from '@/design-system/components/controls/FilterBar';

interface BacklogFiltersProps {
  filterRegion: string;
  filterPriority: string;
  filterTimeRange: string;
  onRegionChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onTimeRangeChange: (value: string) => void;
}

const BacklogFilters: React.FC<BacklogFiltersProps> = ({
  filterRegion,
  filterPriority,
  filterTimeRange,
  onRegionChange,
  onPriorityChange,
  onTimeRangeChange
}) => {
  return (
    <div className="flex items-center space-x-3">
      <FilterBar
        timeRange={filterTimeRange}
        region={filterRegion}
        priority={filterPriority}
        onTimeRangeChange={onTimeRangeChange}
        onRegionChange={onRegionChange}
        onPriorityChange={onPriorityChange}
      />
    </div>
  );
};

export default BacklogFilters; 