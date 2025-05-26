import React from 'react';
import { MetricCard } from '@/design-system/charts';

export const NetworkSummaryMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div>
        <MetricCard 
          label="Network Uptime" 
          value="99.97%" 
          delta={0.02} 
          trend="up"
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Avg. Network Latency" 
          value="12.8ms" 
          delta={-2.1} 
          trend="down"
          status="success" 
        />
      </div>
      <div>
        <MetricCard 
          label="Active Incidents" 
          value="4" 
          delta={2} 
          trend="up"
          status="error" 
        />
      </div>
      <div>
        <MetricCard 
          label="Bandwidth Utilization" 
          value="68.5%" 
          delta={4.3} 
          trend="up"
          status="warning" 
        />
      </div>
    </div>
  );
}; 