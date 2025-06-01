import React from 'react';
import { ScatterPlot } from '@/design-system/charts';
import { Card } from '@/design-system/layout';
import { latencyData } from './mockData';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

// Custom SVG icon to replace Material-UI icon
const MoreIcon = () => (
  <EllipsisHorizontalIcon className="w-5 h-5" />
);

export const NetworkLatencyScatter: React.FC = () => {
  return (
    <Card
      title="Data Center Interconnect Latency"
      subtitle="WAN latency between global data centers (ms)"
      headerAction={
        <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <MoreIcon />
        </button>
      }
    >
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
    </Card>
  );
}; 