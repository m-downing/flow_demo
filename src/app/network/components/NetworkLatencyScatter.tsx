import React from 'react';
import { ScatterPlot } from '@/design-system/charts';
import { latencyData } from './mockData';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

// Custom SVG icon to replace Material-UI icon
const MoreIcon = () => (
  <EllipsisHorizontalIcon className="w-5 h-5" />
);

export const NetworkLatencyScatter: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Data Center Interconnect Latency</h6>
        <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <MoreIcon />
        </button>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        WAN latency between global data centers (ms)
      </p>
      <div className="h-80">
        <ScatterPlot 
          data={latencyData} 
          xAxisKey="x" 
          yAxisKey="y" 
          zAxisKey="z" 
          nameKey="name" 
          height={320}
          xAxisProps={{ name: 'Distance (ms)', unit: 'ms' }}
          yAxisProps={{ name: 'Latency', unit: 'ms' }}
          zAxisProps={{ name: 'Bandwidth', range: [50, 150] }}
        />
      </div>
    </div>
  );
}; 