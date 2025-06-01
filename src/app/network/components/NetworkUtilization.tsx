import React from 'react';
import { LineChart } from '@/design-system/charts';
import { Card } from '@/design-system/layout';
import { networkUtilizationData } from './mockData';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

// Custom SVG icon to replace Material-UI icon
const MoreIcon = () => (
  <EllipsisHorizontalIcon className="w-5 h-5" />
);

export const NetworkUtilization: React.FC = () => {
  return (
    <Card
      title="Network Bandwidth Utilization"
      subtitle="24-hour global network traffic pattern (Gbps)"
      fullHeight
      headerAction={
        <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <MoreIcon />
        </button>
      }
    >
      <div className="h-80">
        <LineChart 
          data={networkUtilizationData} 
          dataKey={['inbound', 'outbound']} 
          xAxisKey="name" 
          height={320}
        />
      </div>
    </Card>
  );
}; 