import React from 'react';
import { PieChart } from '@/design-system/charts';
import { Card } from '@/design-system/layout';
import { networkEquipmentDistribution } from './mockData';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

// Custom SVG icon to replace Material-UI icon
const MoreIcon = () => (
  <EllipsisHorizontalIcon className="w-5 h-5" />
);

export const NetworkEquipmentDistribution: React.FC = () => {
  return (
    <Card
      title="Network Equipment Distribution"
      subtitle="Types of network equipment deployed"
      fullHeight
      headerAction={
        <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <MoreIcon />
        </button>
      }
    >
      <div className="h-80">
        <PieChart 
          data={networkEquipmentDistribution} 
          dataKey="value" 
          nameKey="name" 
          height={320} 
          mode="deepDive"
        />
      </div>
    </Card>
  );
}; 