import React from 'react';
import { MetricCard } from '@/design-system/charts';

const KeyMetricsSection: React.FC = () => {
  return (
    <div className="col-span-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          label="Total Global Rack Capacity" 
          value="1,230 Racks" 
          delta={3.2} 
          trend="up"
          status="success" 
        />
        <MetricCard 
          label="Infrastructure Utilization" 
          value="74.8%" 
          delta={1.5} 
          trend="up"
          status="neutral" 
        />
        <MetricCard 
          label="Pending Deployments" 
          value="43 Racks" 
          delta={-5} 
          trend="down"
          status="success" 
        />
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