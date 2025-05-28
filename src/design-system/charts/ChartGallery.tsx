'use client';

import React from 'react';
import { MetricCard } from './MetricCard';
import { PieChart } from './PieChart';
import { LineChart, ChartDataObject as LineChartData } from './LineChart';
import { BarChart, ChartDataObject as BarChartData } from './BarChart';
import { ScatterPlot, ScatterDataObject } from './ScatterPlot';
import { ProgressTracker } from './ProgressTracker';
import { chartTokens } from '../foundations/tokens'; // For section styling
import { getTypography } from '../foundations/tokens/typography';
import { useTheme } from '../../app/contexts/ThemeContext';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div style={{ 
      marginBottom: '40px', 
      padding: '20px', 
      border: `1px solid ${isDark ? chartTokens.grid.dark.stroke : chartTokens.grid.light.stroke}`, 
      borderRadius: '8px' 
    }}>
      <h2 style={{ 
        fontFamily: getTypography.fontFamily('heading'), 
        fontSize: getTypography.fontSize('xl'), 
        color: isDark ? '#e5e7eb' : '#374151', 
        marginBottom: '20px' 
      }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        {children}
      </div>
    </div>
  );
};

const ChartVariant: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
      <h3 style={{ 
        fontFamily: getTypography.fontFamily('body'), 
        fontSize: getTypography.fontSize('lg'), 
        color: isDark ? '#e5e7eb' : '#374151', 
        marginBottom: '10px' 
      }}>
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
  { name: 'Jan', uv: 400, pv: 240 },
  { name: 'Feb', uv: 300, pv: 139 },
  { name: 'Mar', uv: 200, pv: 980 },
  { name: 'Apr', uv: 278, pv: 390 },
  { name: 'May', uv: 189, pv: 480 },
  { name: 'Jun', uv: 239, pv: 380 },
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
    <div style={{ padding: '20px', fontFamily: getTypography.fontFamily('body') }}>
      <h2 style={{ 
        fontFamily: getTypography.fontFamily('heading'), 
        fontSize: getTypography.fontSize('3xl'), 
        marginBottom: '30px', 
        color: chartTokens.status.primary 
      }}>
        Chart & Metric Component Gallery
      </h2>

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
        <ChartVariant title="Deep Dive Mode (Multi-Line)">
          <LineChart data={mockLineData} dataKey={['uv', 'pv']} mode="deepDive" height={300} tooltipFormatter={(val, name) => [`Value: ${val}`, name === 'uv' ? 'Unique Visitors' : 'Page Views']} />
        </ChartVariant>
      </Section>

      <Section title="BarChart">
        <ChartVariant title="Summary Mode (Vertical)">
          <BarChart data={mockBarData} dataKey="users" mode="summary" height={200} />
        </ChartVariant>
        <ChartVariant title="Drilldown Mode (Horizontal)">
          <BarChart data={mockBarData} dataKey="sessions" mode="drilldown" layout="horizontal" height={250} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode (Grouped Vertical)">
          <BarChart data={mockBarData} dataKey={['users', 'sessions']} mode="deepDive" height={300} />
        </ChartVariant>
      </Section>

      <Section title="ScatterPlot">
        <ChartVariant title="Summary Mode">
          <ScatterPlot data={mockScatterData} mode="summary" height={250} />
        </ChartVariant>
        <ChartVariant title="Drilldown Mode (Bubble)">
          <ScatterPlot data={mockScatterData} mode="drilldown" zAxisKey="z" zAxisProps={{name: 'Size', range: [20, 200]}} height={300} />
        </ChartVariant>
        <ChartVariant title="Deep Dive Mode">
          <ScatterPlot data={mockScatterData} mode="deepDive" height={300} xAxisProps={{name: 'X Value', unit:'px'}} yAxisProps={{name: 'Y Value', unit:'px'}}/>
        </ChartVariant>
      </Section>

      <Section title="ProgressTracker">
        <ChartVariant title="Summary (Success)">
          <ProgressTracker value={75} status="success" mode="summary" label="Quick View" />
        </ChartVariant>
        <ChartVariant title="Drilldown (Warning)">
          <ProgressTracker value={40} status="warning" mode="drilldown" label="Medium Detail" valueFormatter={(v,m) => `${v}/${m} tasks`} />
        </ChartVariant>
        <ChartVariant title="Deep Dive (Primary)">
          <ProgressTracker value={90} status="primary" mode="deepDive" label="Capacity Used" size={120} strokeWidth={12} />
        </ChartVariant>
         <ChartVariant title="Error State">
          <ProgressTracker value={25} status="error" mode="deepDive" label="Errors Found" size={100} />
        </ChartVariant>
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