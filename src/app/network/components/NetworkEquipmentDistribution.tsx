import React from 'react';
import { PieChart } from '@/design-system/charts';
import { networkEquipmentDistribution } from './mockData';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

// Custom SVG icon to replace Material-UI icon
const MoreIcon = () => (
  <EllipsisHorizontalIcon className="w-5 h-5" />
);

export const NetworkEquipmentDistribution: React.FC = () => {
  return (
    <div className="bg-white dark:bg-primary-800 shadow-md rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Network Equipment Distribution</h6>
        <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <MoreIcon />
        </button>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Types of network equipment deployed
      </p>
      <div className="h-80">
        <PieChart 
          data={networkEquipmentDistribution} 
          dataKey="value" 
          nameKey="name" 
          height={320} 
          mode="deepDive"
        />
      </div>
    </div>
  );
}; 