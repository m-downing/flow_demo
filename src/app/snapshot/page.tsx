"use client";
import React, { useState } from 'react';
import { PageContainer } from '@/design-system/layout/PageContainer';
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
    <PageContainer>
      <div className="flex justify-between items-center mb-lg">
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
      
      {/* Key Metrics */}
      <div className="mb-lg">
        <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-md">
          Key Metrics
        </h6>
        <KeyMetricsSection />
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-sm">
        <CapacityTrendChart />
        <RackTypeDistribution />
      </div>
      
      {/* Regional distribution section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-sm mt-sm">
        <RegionDistributionChart />
        <DeploymentProgressSection />
      </div>
    </PageContainer>
  );
};

export default SnapshotPage;
