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
      <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
};

const mockPieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const mockLineData: LineChartData[] = [
  { name: 'Jan', uv: 400, pv: 240, cv: 180, bounce: 45 },
  { name: 'Feb', uv: 300, pv: 139, cv: 200, bounce: 52 },
  { name: 'Mar', uv: 200, pv: 980, cv: 150, bounce: 38 },
  { name: 'Apr', uv: 278, pv: 390, cv: 290, bounce: 42 },
  { name: 'May', uv: 189, pv: 480, cv: 320, bounce: 48 },
  { name: 'Jun', uv: 239, pv: 380, cv: 280, bounce: 40 },
];

const mockBarData: BarChartData[] = [
  { name: 'Desktop', users: 1200, sessions: 2000 },
  { name: 'Mobile', users: 2100, sessions: 1500 },
  { name: 'Tablet', users: 800, sessions: 700 },
];

const mockScatterData: ScatterDataObject[] = [
  { x: 100, y: 200, z: 20, name: 'Point A' },
  { x: 120, y: 100, z: 50, name: 'Point B' },
  { x: 170, y: 300, z: 30, name: 'Point C' },
  { x: 140, y: 250, z: 70, name: 'Point D' },
  { x: 150, y: 400, z: 10, name: 'Point E' },
  { x: 110, y: 280, z: 90, name: 'Point F' },
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
          <MetricCard label="Revenue YTD" value="$1.2M" delta={15.2} trend="up" status="success" onClick={() => alert('Success card clicked')} />
        </ChartVariant>
        <ChartVariant title="Warning Metric">
          <MetricCard label="Avg. Response Time" value="350ms" delta={25} trend="up" status="warning" />
        </ChartVariant>
        <ChartVariant title="Error Metric">
          <MetricCard label="Error Rate" value="5.7%" delta={2.1} trend="up" status="error" />
        </ChartVariant>
        <ChartVariant title="Neutral Metric">
          <MetricCard label="Active Users" value="1,234" />
        </ChartVariant>
         <ChartVariant title="Primary Metric (default)">
          <MetricCard label="Tasks Completed" value="87" delta={-5} trend="down" />
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
          <PieChart data={mockPieData} mode="deepDive" height={300} labelFormatter={(e: { name: string; value: number }) => `${e.name} (${e.value})`} tooltipFormatter={(val: number, name: string) => [val, name.toUpperCase()]} onElementClick={(d, i) => console.log('Pie slice clicked:', d, i)} />
        </ChartVariant>
      </Section>

      <Section title="LineChart">
        <ChartVariant title="Summary Mode">
          <LineChart data={mockLineData} dataKey="uv" mode="summary" height={200} />
        </ChartVariant>
        <ChartVariant title="Drilldown Mode (Single Line)">
          <LineChart data={mockLineData} dataKey="pv" mode="drilldown" height={250} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode (Four Lines)">
          <LineChart data={mockLineData} dataKey={['uv', 'pv', 'cv', 'bounce']} mode="deepDive" height={300} tooltipFormatter={(val, name) => {
            const labels = { uv: 'Unique Visitors', pv: 'Page Views', cv: 'Conversions', bounce: 'Bounce Rate' };
            return [`Value: ${val}`, labels[name as keyof typeof labels] || name];
          }} />
        </ChartVariant>
      </Section>

      <Section title="BarChart">
        <ChartVariant title="Drilldown Mode (Vertical)">
          <BarChart data={mockBarData} dataKey="users" mode="drilldown" height={250} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode (Grouped Vertical)">
          <BarChart data={mockBarData} dataKey={['users', 'sessions']} mode="deepDive" height={300} />
        </ChartVariant>
      </Section>

      <Section title="ScatterPlot">
        <ChartVariant title="Drilldown Mode">
          <ScatterPlot data={mockScatterData} mode="drilldown" height={250} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode (with Bubble Size)">
          <ScatterPlot data={mockScatterData} mode="deepDive" zAxisKey="z" zAxisProps={{name: 'Size', range: [20, 200]}} height={300} xAxisProps={{name: 'X Value', unit:'px'}} yAxisProps={{name: 'Y Value', unit:'px'}}/>
        </ChartVariant>
      </Section>

      <Section title="ProgressTracker">
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Summary (Success)
          </h3>
          <div className="mt-4">
            <ProgressTracker value={75} status="success" mode="summary" label="Quick View" />
          </div>
        </div>
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Drilldown (Warning)
          </h3>
          <div className="mt-4">
            <ProgressTracker value={40} status="warning" mode="drilldown" label="Sprint Progress" valueFormatter={(v,m) => `${v}/${m} tasks`} />
          </div>
        </div>
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Deep Dive (Primary)
          </h3>
          <div className="mt-4">
            <ProgressTracker value={90} status="primary" mode="deepDive" label="Capacity Used" size={120} strokeWidth={12} />
          </div>
        </div>
        <div className="flex-1 min-w-[300px] text-center">
          <h3 className="text-lg text-neutral-800 dark:text-neutral-50 mb-2">
            Error State
          </h3>
          <div className="mt-4">
            <ProgressTracker value={25} status="error" mode="deepDive" label="Errors Found" size={100} />
          </div>
        </div>
      </Section>

       <Section title="Loading & Empty States">
         <ChartVariant title="LineChart Loading">
            <LineChart data={[]} dataKey="value" loading={true} />
         </ChartVariant>
         <ChartVariant title="PieChart Empty">
            <PieChart data={[]} emptyState={<em>No pie data here!</em>} />
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