'use client';

import React, { useState } from 'react';
import { 
  BacklogSummaryMetrics, 
  BacklogFilters, 
  BacklogTabs, 
  backlogItems 
} from './components';

const BacklogsPage: React.FC = () => {
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterTimeRange, setFilterTimeRange] = useState('select');
  
  const handleRegionFilterChange = (value: string) => {
    setFilterRegion(value);
  };
  
  const handlePriorityFilterChange = (value: string) => {
    setFilterPriority(value);
  };

  const handleTimeRangeFilterChange = (value: string) => {
    setFilterTimeRange(value);
  };
  
  // Calculate summary metrics
  const totalBacklogs = backlogItems.length;
  const criticalBacklogs = backlogItems.filter(item => item.priority === 'critical').length;
  const blockedBacklogs = backlogItems.filter(item => item.status === 'blocked').length;
  const avgDelay = Math.round(backlogItems.reduce((sum, item) => sum + item.delay, 0) / totalBacklogs);
  
  return (
    <div className="pt-8 px-6 py-8 pb-16 bg-neutral-50 dark:bg-primary-900 min-h-screen max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
            Supply Chain Backlogs
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-200">
            Monitor and manage infrastructure equipment backlogs across global data centers
          </p>
        </div>
        <BacklogFilters
          filterRegion={filterRegion}
          filterPriority={filterPriority}
          filterTimeRange={filterTimeRange}
          onRegionChange={handleRegionFilterChange}
          onPriorityChange={handlePriorityFilterChange}
          onTimeRangeChange={handleTimeRangeFilterChange}
        />
      </div>
      
      <BacklogSummaryMetrics
        totalBacklogs={totalBacklogs}
        criticalBacklogs={criticalBacklogs}
        blockedBacklogs={blockedBacklogs}
        avgDelay={avgDelay}
      />
      
      <BacklogTabs backlogItems={backlogItems} />
    </div>
  );
};

export default BacklogsPage;
