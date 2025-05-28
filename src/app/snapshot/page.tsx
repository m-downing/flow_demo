"use client";
import React, { useState } from 'react';
import FilterBar from '@/design-system/components/controls/FilterBar';

// Import all modular components
import KeyMetricsSection from './components/KeyMetricsSection';
import CapacityTrendChart from './components/CapacityTrendChart';
import RackTypeDistribution from './components/RackTypeDistribution';
import RegionDistributionChart from './components/RegionDistributionChart';
import DeploymentProgressSection from './components/DeploymentProgressSection';

const SnapshotPage: React.FC = () => {
  // Filter state
  const [timeRange, setTimeRange] = useState('30days');
  const [region, setRegion] = useState('all');
  const [priority, setPriority] = useState('all');

  // Filter handlers
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
    // Handle more filters modal/drawer
    console.log('More filters clicked');
  };

  return (
    <div className="pt-8 px-6 py-8 pb-16 bg-neutral-50 dark:bg-primary-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
            Global Infrastructure Dashboard
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-200">
            Real-time overview of data center capacity, deployments, and critical alerts
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
          showMoreFilters={true}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Top row - Key metrics */}
        <KeyMetricsSection />
        
        {/* Second row - Capacity Trends chart and Rack Type Distribution pie chart */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <CapacityTrendChart />
          <RackTypeDistribution />
        </div>
        
        {/* Infrastructure Distribution by Region */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <RegionDistributionChart />
          <DeploymentProgressSection />
        </div>
      </div>
    </div>
  );
};

export default SnapshotPage;
