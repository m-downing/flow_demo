'use client';

import React from 'react';
import { MetricCard } from '../../design-system/charts/MetricCard';
import { PieChart } from '../../design-system/charts/PieChart';
import { LineChart, ChartDataObject as LineChartData } from '../../design-system/charts/LineChart';
import { BarChart, ChartDataObject as BarChartData } from '../../design-system/charts/BarChart';
import { ScatterPlot, ScatterDataObject } from '../../design-system/charts/ScatterPlot';
import { ProgressTracker } from '../../design-system/charts/ProgressTracker';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="mb-10 p-5 border border-neutral-200 dark:border-primary-700 rounded-lg">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50 mb-5">
        {title}
      </h2>
      <div className="flex flex-wrap gap-5 items-start">
        {children}
      </div>
    </div>
  );
};

const ChartVariant: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="flex-1 min-w-[300px]">
      <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2 text-center">
        {title}
      </h3>
      {children}
    </div>
  );
};

const mockPieData = [
  { name: 'Compute Racks', value: 520 },
  { name: 'Storage Racks', value: 380 },
  { name: 'Network Racks', value: 210 },
  { name: 'Security Appliances', value: 120 },
];

const mockLineData: LineChartData[] = [
  { name: 'Jan', capacity: 4200, utilization: 3100, deployed: 3850, incidents: 12 },
  { name: 'Feb', capacity: 4800, utilization: 3400, deployed: 4200, incidents: 8 },
  { name: 'Mar', capacity: 5200, utilization: 3800, deployed: 4650, incidents: 15 },
  { name: 'Apr', capacity: 5500, utilization: 4100, deployed: 5000, incidents: 6 },
  { name: 'May', capacity: 5800, utilization: 4350, deployed: 5300, incidents: 11 },
  { name: 'Jun', capacity: 6200, utilization: 4650, deployed: 5750, incidents: 9 },
];

const mockBarData: BarChartData[] = [
  { name: 'NYC-EAST', racks: 1200, servers: 14400 },
  { name: 'LONDON-WEST', racks: 850, servers: 10200 },
  { name: 'SINGAPORE', racks: 720, servers: 8640 },
  { name: 'FRANKFURT', racks: 950, servers: 11400 },
  { name: 'TOKYO', racks: 680, servers: 8160 },
];

const mockScatterData: ScatterDataObject[] = [
  { x: 85, y: 12, z: 120, name: 'NYC-EAST-12' },
  { x: 72, y: 18, z: 80, name: 'LONDON-WEST-07' },
  { x: 91, y: 8, z: 150, name: 'SINGAPORE-03' },
  { x: 68, y: 22, z: 70, name: 'FRANKFURT-01' },
  { x: 88, y: 14, z: 110, name: 'TOKYO-SOUTH-05' },
  { x: 76, y: 16, z: 90, name: 'NYC-WEST-08' },
];

export const ChartGallery: React.FC = () => {
  return (
    <div className="pt-8 px-6 py-8 pb-16 bg-neutral-50 dark:bg-primary-900 min-h-screen max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
            Chart & Metric Component Gallery
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-200">
            Interactive showcase of all available chart and metric components with different modes
          </p>
        </div>
      </div>

      <Section title="MetricCard">
        <ChartVariant title="Success Metric">
          <MetricCard label="Global Rack Capacity" value="6,200" delta={3.2} trend="up" status="success" onClick={() => alert('Success card clicked')} />
        </ChartVariant>
        <ChartVariant title="Warning Metric">
          <MetricCard label="Power Consumption" value="2.8MW" delta={8.5} trend="up" status="warning" />
        </ChartVariant>
        <ChartVariant title="Error Metric">
          <MetricCard label="Critical Incidents" value="12" delta={4} trend="up" status="error" />
        </ChartVariant>
        <ChartVariant title="Neutral Metric">
          <MetricCard label="Deployment Queue" value="43" />
        </ChartVariant>
         <ChartVariant title="Primary Metric (default)">
          <MetricCard label="Infrastructure Utilization" value="74.8%" delta={-2.1} trend="down" />
        </ChartVariant>
      </Section>

      <Section title="PieChart">
        <ChartVariant title="Summary Mode">
          <PieChart data={mockPieData} mode="summary" height={200} />
        </ChartVariant>
        <ChartVariant title="Drilldown Mode">
          <PieChart data={mockPieData} mode="drilldown" height={250} showLegend={true} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode">
          <PieChart data={mockPieData} mode="deepDive" height={300} labelFormatter={(e: { name: string; value: number }) => `${e.name} (${e.value})`} tooltipFormatter={(val: number, name: string) => [`${val} racks`, name]} onElementClick={(d, i) => console.log('Equipment type clicked:', d, i)} />
        </ChartVariant>
      </Section>

      <Section title="LineChart">
        <ChartVariant title="Summary Mode">
          <LineChart data={mockLineData} dataKey="capacity" mode="summary" height={200} />
        </ChartVariant>
        <ChartVariant title="Drilldown Mode (Single Line)">
          <LineChart data={mockLineData} dataKey="utilization" mode="drilldown" height={250} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode (Four Lines)">
          <LineChart data={mockLineData} dataKey={['capacity', 'utilization', 'deployed', 'incidents']} mode="deepDive" height={300} tooltipFormatter={(val, name) => {
            const labels = { capacity: 'Total Capacity', utilization: 'Current Utilization', deployed: 'Deployed Racks', incidents: 'Monthly Incidents' };
            const units = { capacity: ' racks', utilization: ' racks', deployed: ' racks', incidents: ' issues' };
            return [`${val}${units[name as keyof typeof units] || ''}`, labels[name as keyof typeof labels] || name];
          }} />
        </ChartVariant>
      </Section>

      <Section title="BarChart">
        <ChartVariant title="Drilldown Mode (Vertical)">
          <BarChart data={mockBarData} dataKey="racks" mode="drilldown" height={250} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode (Grouped Vertical)">
          <BarChart data={mockBarData} dataKey={['racks', 'servers']} mode="deepDive" height={300} />
        </ChartVariant>
      </Section>

      <Section title="ScatterPlot">
        <ChartVariant title="Drilldown Mode">
          <ScatterPlot data={mockScatterData} mode="drilldown" height={250} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode (with Bubble Size)">
          <ScatterPlot data={mockScatterData} mode="deepDive" zAxisKey="z" zAxisProps={{name: 'Rack Count', range: [20, 200]}} height={300} xAxisProps={{name: 'Utilization %', unit:'%'}} yAxisProps={{name: 'Incidents', unit:' issues'}}/>
        </ChartVariant>
      </Section>

      <Section title="ProgressTracker">
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Summary (Success)
          </h3>
          <div className="mt-4">
            <ProgressTracker value={85} status="success" mode="summary" label="Capacity Health" />
          </div>
        </div>
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Drilldown (Warning)
          </h3>
          <div className="mt-4">
            <ProgressTracker value={68} status="warning" mode="drilldown" label="Deployment Progress" valueFormatter={(v,m) => `${v}/${m} racks`} />
          </div>
        </div>
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Deep Dive (Primary)
          </h3>
          <div className="mt-4">
            <ProgressTracker value={92} status="primary" mode="deepDive" label="Power Efficiency" size={120} strokeWidth={12} />
          </div>
        </div>
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Error State
          </h3>
          <div className="mt-4">
            <ProgressTracker value={15} status="error" mode="deepDive" label="System Failures" size={100} />
          </div>
        </div>
      </Section>

       <Section title="Loading & Empty States">
         <ChartVariant title="LineChart Loading">
            <LineChart data={[]} dataKey="value" loading={true} />
         </ChartVariant>
         <ChartVariant title="PieChart Empty">
            <PieChart data={[]} emptyState={<em>No infrastructure data available</em>} />
         </ChartVariant>
         <ChartVariant title="BarChart Loading">
            <BarChart data={[]} dataKey="value" loading={true} height={200} />
         </ChartVariant>
          <ChartVariant title="ProgressTracker Loading">
            <ProgressTracker value={0} loading={true} />
         </ChartVariant>
       </Section>

    </div>
  );
};

export default ChartGallery;