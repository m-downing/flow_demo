import React from 'react';
import { MetricCard } from '@/design-system/charts';

export const KeyMetricsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-sm mb-lg">
      <div>
        <MetricCard 
          label="Total Global Rack Capacity" 
          value="1,230 Racks" 
          delta={3.2} 
          trend="up"
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Infrastructure Utilization" 
          value="74.8%" 
          delta={1.5} 
          trend="up"
          status="neutral" 
        />
      </div>
      <div>
        <MetricCard 
          label="Pending Deployments" 
          value="43 Racks" 
          delta={-5} 
          trend="down"
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Supply Chain Issues" 
          value="7 Active" 
          delta={2} 
          trend="up"
          status="error" 
        />
      </div>
    </div>
  );
};

export default KeyMetricsSection; 