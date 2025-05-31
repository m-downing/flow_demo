import React from 'react';
import { PieChart } from '@/design-system/charts';

// Mock data for rack type distribution
const rackTypeData = [
  { name: 'Compute Racks', value: 520 },
  { name: 'Storage Racks', value: 380 },
  { name: 'Network Racks', value: 210 },
  { name: 'Security Appliances', value: 120 },
];

const RackTypeDistribution: React.FC = () => {
  return (
    <div className="md:col-span-4">
      <div className="bg-neutral-50 dark:bg-neutral-900 shadow-md rounded-md p-4 h-full">
        <div className="flex justify-between items-center mb-2">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Rack Type Distribution</h6>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-200 mb-4">
          Current infrastructure by rack type
        </p>
        <div className="h-80">
          <PieChart 
            data={rackTypeData} 
            dataKey="value" 
            nameKey="name" 
            height={320} 
            mode="deepDive"
            labelFormatter={(entry) => `${entry.value}`} 
            showLegend={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RackTypeDistribution; 