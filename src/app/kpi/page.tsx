'use client';

import React from 'react';
import { PageContainer } from '@/design-system/layout/PageContainer';
import { 
  KPISummaryMetrics, 
  KPITabs, 
  KPIInsights 
} from './components';

const KPIPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-lg">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
            Key Performance Indicators
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-200">
            Monitor and analyze data center supply chain performance metrics
          </p>
        </div>
        {/* TODO: Replace with new filter components when needed */}
      </div>
      
      <KPISummaryMetrics />
      
      <KPITabs />
      
      <KPIInsights />
    </PageContainer>
  );
};

export default KPIPage; 