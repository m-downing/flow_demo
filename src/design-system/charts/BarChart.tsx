'use client';

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getChartColors } from '../foundations/tokens';
import { getTypography } from '../foundations/tokens/typography';
import { useTheme } from '../../app/contexts/ThemeContext';

// Re-using ChartDataObject from LineChart, assuming similar data structure needs
export interface ChartDataObject {
  name: string | number; // For X-axis or Y-axis (if horizontal)
  value?: number; // For single bar series
  [key: string]: string | number | null | undefined; // Allows for multiple series
}

/**
 * @typedef {'drilldown' | 'deepDive'} DetailLevel
 */
type DetailLevel = 'drilldown' | 'deepDive';

/**
 * @typedef BarChartProps
 * @property {ChartDataObject[]} data - Data for the chart.
 * @property {string | string[]} dataKey - Key(s) in data objects for bar(s).
 * @property {string} [xAxisKey='name'] - Key for X-axis labels.
 * @property {string} [yAxisKey] - Key for Y-axis labels (optional, Recharts infers).
 * @property {number} [width]
 * @property {number} [height=300]
 * @property {DetailLevel} [mode='deepDive']
 * @property {string[]} [colors]
 * @property {boolean} [showLegend]
 * @property {boolean} [showAxes]
 * @property {(value: string | number) => string} [labelFormatter] - Formatter for labels on bars.
 * @property {(value: string | number | (string | number)[], name: string, itemProps: object) => ReactNode} [tooltipFormatter]
 * @property {boolean} [loading=false]
 * @property {ReactNode} [emptyState]
 */
interface BarChartProps {
  data: ChartDataObject[];
  dataKey: string | string[];
  xAxisKey?: string;
  width?: number;
  height?: number;
  mode?: DetailLevel;
  colors?: string[];
  showLegend?: boolean;
  showAxes?: boolean;
  labelFormatter?: (value: string | number) => string; // For labels on bars
  tooltipFormatter?: (value: string | number | (string | number)[], name: string, itemProps: object) => ReactNode; // itemProps is the payload of the hovered item
  loading?: boolean;
  emptyState?: ReactNode;
}

/**
 * BarChart component using Recharts for themed bar graphs.
 *
 * @param {BarChartProps} props
 * @returns {JSX.Element}
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  width,
  height = 300,
  mode = 'drilldown',
  colors: customColors,
  showLegend: propShowLegend,
  showAxes: propShowAxes,
  loading = false,
  emptyState = <p>No data available for this chart.</p>,
}) => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = getChartColors(isDark);

  useEffect(() => {
    // Using a variable to store the ref value for the cleanup function
    const currentRef = chartRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  if (loading) {
    return <div style={{ width: width || '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: getTypography.fontFamily('body'), color: themeColors.axis.color }}>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div style={{ width: width || '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: getTypography.fontFamily('body'), color: themeColors.axis.color }}>{emptyState}</div>;
  }

  const dataKeys = Array.isArray(dataKey) ? dataKey : [dataKey];

  // Shared tooltip styling
  const tooltipStyle = {
    backgroundColor: themeColors.tooltip.bg,
    color: themeColors.tooltip.color,
    borderRadius: themeColors.tooltip.borderRadius,
    padding: themeColors.tooltip.padding,
    fontSize: themeColors.tooltip.fontSize,
    fontFamily: getTypography.fontFamily('body'),
    border: 'none'
  };

  let chartColors: string[];
  let currentShowLegend = true;
  let currentShowAxes = true;
  let showGrid = true;
  let gridDashArray = themeColors.grid.dashArray;

  switch (mode) {
    case 'drilldown':
      chartColors = themeColors.series;
      currentShowLegend = propShowLegend !== undefined ? propShowLegend : false;
      currentShowAxes = propShowAxes !== undefined ? propShowAxes : true;
      gridDashArray = '8 8'; 
      showGrid = true;
      break;
    case 'deepDive':
    default:
      chartColors = themeColors.series;
      currentShowLegend = propShowLegend !== undefined ? propShowLegend : true;
      currentShowAxes = propShowAxes !== undefined ? propShowAxes : true;
      showGrid = true;
      break;
  }

  if (customColors && customColors.length > 0) {
    chartColors = customColors;
  }

  // Vertical bar chart only
  return (
    <div ref={chartRef} style={{ width: width || '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          key={`vertical-${theme}`}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {currentShowAxes && showGrid && (
            <CartesianGrid strokeDasharray={gridDashArray} stroke={themeColors.grid.stroke} />
          )}
          {currentShowAxes && (
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: themeColors.axis.fontSize, fill: themeColors.axis.color, fontFamily: themeColors.axis.fontFamily }}
            />
          )}
          {currentShowAxes && (
            <YAxis 
              domain={[0, 'auto']}
              tick={{ fontSize: themeColors.axis.fontSize, fill: themeColors.axis.color, fontFamily: themeColors.axis.fontFamily }}
            />
          )}
          <Tooltip 
            contentStyle={tooltipStyle}
            labelStyle={{ color: themeColors.tooltip.color, fontWeight: 'bold' }}
            itemStyle={{ color: themeColors.tooltip.color }}
          />
          {currentShowLegend && dataKeys.length > 1 && (
            <Legend wrapperStyle={{ fontSize: themeColors.axis.fontSize, fontFamily: themeColors.axis.fontFamily, color: themeColors.axis.color }} />
          )}
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              name={key}
              dataKey={key}
              fill={chartColors[index % chartColors.length]}
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              isAnimationActive={isInView}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart; 