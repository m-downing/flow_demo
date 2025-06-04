"use client";
import React from 'react';
import { PageContainer } from '@/design-system/layout/PageContainer';

// Import all modular components
import KeyMetricsSection from './components/KeyMetricsSection';
import CapacityTrendChart from './components/CapacityTrendChart';
import RackTypeDistribution from './components/RackTypeDistribution';
import RegionDistributionChart from './components/RegionDistributionChart';
import DeploymentProgressSection from './components/DeploymentProgressSection';

const SnapshotPage: React.FC = () => {
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
        {/* TODO: Replace with new filter components when needed */}
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
