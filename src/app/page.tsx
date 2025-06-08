'use client';

import React from 'react';
import { PageContainer } from '@/design-system/layout';
import { Card } from '@/design-system/layout';
import { BarChart } from '@/design-system/charts';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { getChartColors } from '@/design-system/foundations/tokens';
import { getTypography } from '@/design-system/foundations/tokens/typography';
import { useTheme } from '@/app/contexts/ThemeContext';
import { colors } from '@/design-system/foundations/tokens';

// Sample data for bar charts
const barChartData1 = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 5000, profit: 3200 },
  { name: 'Apr', revenue: 4500, profit: 2900 },
  { name: 'May', revenue: 6000, profit: 3800 },
  { name: 'Jun', revenue: 5500, profit: 3400 },
];

const barChartData2 = [
  { name: 'Q1', actual: 12000, target: 10000 },
  { name: 'Q2', actual: 15000, target: 14000 },
  { name: 'Q3', actual: 13500, target: 15000 },
  { name: 'Q4', actual: 17000, target: 16000 },
];

// Sample data for composed chart
const composedChartData = [
  { name: 'Page A', uv: 590, pv: 800, amt: 1400 },
  { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
  { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
  { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
  { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
  { name: 'Page F', uv: 1400, pv: 680, amt: 1700 },
];

export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = getChartColors(isDark);

  return (
    <PageContainer>
      <div className="p-6 space-y-6">
        {/* First row with two bar charts */}
        <div className="grid grid-cols-12 gap-6">
          {/* First Bar Chart */}
          <div className="col-span-6">
            <Card title="Monthly Revenue vs Profit">
              <BarChart
                data={barChartData1}
                dataKey={['revenue', 'profit']}
                xAxisKey="name"
                height={300}
                colors={[colors.dataViz.primary, colors.dataViz.secondary]}
                showLegend={true}
                mode="deepDive"
              />
            </Card>
          </div>

          {/* Second Bar Chart */}
          <div className="col-span-6">
            <Card title="Quarterly Performance">
              <BarChart
                data={barChartData2}
                dataKey={['actual', 'target']}
                xAxisKey="name"
                height={300}
                colors={[colors.dataViz.positive, colors.dataViz.highlight]}
                showLegend={true}
                mode="deepDive"
              />
            </Card>
          </div>
        </div>

        {/* Second row with composed chart */}
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Card title="Combined Metrics Analysis">
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={composedChartData}>
                  <CartesianGrid 
                    stroke={themeColors.grid.stroke} 
                    strokeDasharray={themeColors.grid.dashArray} 
                  />
                  <XAxis 
                    dataKey="name"
                    tick={{ 
                      fontSize: themeColors.axis.fontSize, 
                      fill: themeColors.axis.color, 
                      fontFamily: themeColors.axis.fontFamily 
                    }}
                    stroke={themeColors.axis.stroke}
                  />
                  <YAxis 
                    tick={{ 
                      fontSize: themeColors.axis.fontSize, 
                      fill: themeColors.axis.color, 
                      fontFamily: themeColors.axis.fontFamily 
                    }}
                    stroke={themeColors.axis.stroke}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: themeColors.tooltip.bg,
                      color: themeColors.tooltip.color,
                      borderRadius: themeColors.tooltip.borderRadius,
                      padding: themeColors.tooltip.padding,
                      fontSize: themeColors.tooltip.fontSize,
                      fontFamily: getTypography.fontFamily('body'),
                      border: 'none'
                    }}
                    labelStyle={{ color: themeColors.tooltip.color, fontWeight: 'bold' }}
                    itemStyle={{ color: themeColors.tooltip.color }}
                  />
                  <Legend 
                    wrapperStyle={{ 
                      fontSize: themeColors.axis.fontSize, 
                      fontFamily: themeColors.axis.fontFamily, 
                      color: themeColors.axis.color 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amt" 
                    fill={colors.dataViz.alt} 
                    stroke={colors.dataViz.alt}
                    fillOpacity={0.3}
                    name="Amount Trend"
                  />
                  <Bar 
                    dataKey="pv" 
                    barSize={20} 
                    fill={colors.dataViz.primary}
                    name="Page Views"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uv" 
                    stroke={colors.dataViz.highlight}
                    strokeWidth={3}
                    dot={{ fill: colors.dataViz.highlight, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Unique Views"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}