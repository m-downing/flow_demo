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
  { name: '2018', spend: 249 },
  { name: '2019', spend: 409 },
  { name: '2020', spend: 537 },
  { name: '2021', spend: 345 },
  { name: '2022', spend: 433 },
  { name: '2023', spend: 585 },
  { name: '2024', spend: 504 },
  { name: '2025', spend: 174 },
];

const barChartData2 = [
  { name: 'Jan', volume: 43 },
  { name: 'Feb', volume: 48 },
  { name: 'Mar', volume: 138 },
  { name: 'Apr', volume: 88 },
  { name: 'May', volume: 52 },
  { name: 'Jun', volume: 26 },
];

// Sample data for composed chart
const composedChartData = [
  { name: 'Jan', uv: 11.2, pv: 5.1, amt: 8.3 },
  { name: 'Feb', uv: 9.8, pv: 4.2, amt: 7.0 },
  { name: 'Mar', uv: 5.6, pv: 8.9, amt: 7.2 },
  { name: 'Apr', uv: 10.5, pv: 4.8, amt: 7.7 },
  { name: 'May', uv: 12.1, pv: 5.3, amt: 8.6 },
  { name: 'Jun', uv: 6.2, pv: 9.4, amt: 7.8 },
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
            <Card>
              <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 text-center mb-4">
                Supply Chain PO Spend by Year ($MM)
              </h6>
              <BarChart
                data={barChartData1}
                dataKey={['spend']}
                xAxisKey="name"
                height={300}
                colors={[colors.dataViz.primary]}
                showLegend={false}
                mode="deepDive"
              />
            </Card>
          </div>

          {/* Second Bar Chart */}
          <div className="col-span-6">
            <Card>
              <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 text-center mb-4">
                Purchase Requisition Volumes by Month
              </h6>
              <BarChart
                data={barChartData2}
                dataKey={['volume']}
                xAxisKey="name"
                height={300}
                colors={[colors.dataViz.positive]}
                showLegend={false}
                mode="deepDive"
              />
            </Card>
          </div>
        </div>

        {/* Second row with composed chart */}
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Card>
              <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 text-center mb-4">
                Average PR to PO Turn Around Time
              </h6>
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
                    name="All Regions"
                  />
                  <Bar 
                    dataKey="pv" 
                    barSize={20} 
                    fill={colors.dataViz.primary}
                    name="N.A."
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uv" 
                    stroke={colors.dataViz.highlight}
                    strokeWidth={3}
                    dot={{ fill: colors.dataViz.highlight, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Non N.A."
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