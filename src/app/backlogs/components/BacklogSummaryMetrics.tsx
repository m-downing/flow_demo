import React from 'react';
import { MetricCard } from '@/design-system/charts';

interface BacklogSummaryMetricsProps {
  totalBacklogs: number;
  criticalBacklogs: number;
  blockedBacklogs: number;
  avgDelay: number;
}

const BacklogSummaryMetrics: React.FC<BacklogSummaryMetricsProps> = ({
  totalBacklogs,
  criticalBacklogs,
  blockedBacklogs,
  avgDelay
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div>
        <MetricCard 
          label="Total Backlogged Orders" 
          value={`${totalBacklogs}`} 
          delta={-3} 
          trend="down"
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Critical Priority Backlogs" 
          value={`${criticalBacklogs}`} 
          delta={1} 
          trend="up"
          status="error" 
        />
      </div>
      <div>
        <MetricCard 
          label="Blocked Orders" 
          value={`${blockedBacklogs}`} 
          delta={0} 
          trend={undefined}
          status="warning" 
        />
      </div>
      <div>
        <MetricCard 
          label="Average Delay" 
          value={`${avgDelay} days`} 
          delta={-2} 
          trend="down"
          status="success" 
        />
      </div>
    </div>
  );
};

export default BacklogSummaryMetrics; 