import React from 'react';
import { MetricCard } from '@/design-system/charts';

export const KPISummaryMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-sm mb-lg">
      <div>
        <MetricCard 
          label="Procurement Efficiency" 
          value="91%" 
          delta={6} 
          trend="up" 
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Avg. Deployment Time" 
          value="13 days" 
          delta={-5} 
          trend="down" 
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Capacity Utilization" 
          value="78%" 
          delta={3} 
          trend="up" 
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Inventory Turnover" 
          value="4.2x" 
          delta={0.3} 
          trend="up" 
          status="success" 
        />
      </div>
    </div>
  );
}; 