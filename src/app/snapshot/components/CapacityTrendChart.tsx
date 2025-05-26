import React from 'react';
import { LineChart } from '@/design-system/charts';

// Mock data for capacity trend chart
const capacityTrendData = [
  { name: 'Jan', actual: 4200, forecast: 3800, remaining: 800 },
  { name: 'Feb', actual: 4800, forecast: 4300, remaining: 700 },
  { name: 'Mar', actual: 5200, forecast: 4700, remaining: 650 },
  { name: 'Apr', actual: 5500, forecast: 5600, remaining: 600 },
  { name: 'May', actual: 5800, forecast: 6200, remaining: 550 },
  { name: 'Jun', actual: 6200, forecast: 5800, remaining: 500 },
];

const CapacityTrendChart: React.FC = () => {
  return (
    <div className="md:col-span-8">
      <div className="bg-neutral-50 dark:bg-primary-800 shadow-md rounded-lg p-4 h-full">
        <div className="flex justify-between items-center mb-2">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Global Capacity Trend</h6>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-200 mb-4">
          Actual vs forecasted rack capacity (last 6 months)
        </p>
        <div className="h-80">
          <LineChart 
            data={capacityTrendData} 
            dataKey={['actual', 'forecast']} 
            xAxisKey="name" 
            height={320}
            tooltipFormatter={(value, name) => {
              // Format the value as a string with the capitalized name
              const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
              return [`${value} racks`, formattedName];
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CapacityTrendChart; 