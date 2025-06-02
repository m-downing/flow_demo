import React from 'react';
import { BarChart } from '@/design-system/charts';
import Card from '@/design-system/layout/Card';

// Mock data for region capacity
const regionCapacityData = [
  { name: 'NAM', Compute: 420, Storage: 280, Network: 120 },
  { name: 'EMEA', Compute: 380, Storage: 240, Network: 110 },
  { name: 'APAC', Compute: 320, Storage: 210, Network: 90 },
  { name: 'LATAM', Compute: 150, Storage: 120, Network: 50 },
];

const RegionDistributionChart: React.FC = () => {
  return (
    <div className="md:col-span-8">
      <Card
        title="Infrastructure Distribution by Region"
        subtitle="Current rack allocation across global regions"
        shadowLevel="sm"
        headerSpacing="2"
      >
        <div className="h-80">
          <BarChart 
            data={regionCapacityData} 
            dataKey={['Compute', 'Storage', 'Network']} 
            xAxisKey="name" 
            height={320}
          />
        </div>
      </Card>
    </div>
  );
};

export default RegionDistributionChart; 