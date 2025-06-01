import React from 'react';
import { PieChart } from '@/design-system/charts';
import { Card } from '@/design-system/layout';

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
      <Card
        title="Rack Type Distribution"
        subtitle="Current infrastructure by rack type"
        fullHeight
        rounded="md"
      >
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
      </Card>
    </div>
  );
};

export default RackTypeDistribution; 