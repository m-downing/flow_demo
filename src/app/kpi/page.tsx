'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/design-system/layout/PageContainer';
import FilterBar from '@/design-system/components/controls/FilterBar';
import { 
  KPISummaryMetrics, 
  KPITabs, 
  KPIInsights 
} from './components';

const KPIPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [region, setRegion] = useState('all');
  const [priority, setPriority] = useState('all');
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };
  
  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  
  const handleMoreFiltersClick = () => {
    // Implementation for more filters can be added here
    console.log('More filters clicked');
  };
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
            Key Performance Indicators
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-200">
            Monitor and analyze data center supply chain performance metrics
          </p>
        </div>
        <FilterBar
          timeRange={timeRange}
          region={region}
          priority={priority}
          onTimeRangeChange={handleTimeRangeChange}
          onRegionChange={handleRegionChange}
          onPriorityChange={handlePriorityChange}
          onMoreFiltersClick={handleMoreFiltersClick}
        />
      </div>
      
      <KPISummaryMetrics />
      
      <KPITabs />
      
      <KPIInsights />
    </PageContainer>
  );
};

export default KPIPage; 