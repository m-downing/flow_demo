// src/app/components-design-system/charts/LineChart.tsx
import React, { ReactNode, useState, useRef, useEffect } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getChartColors } from '@/design-system/foundations/tokens';
import { getTypography } from '@/design-system/foundations/tokens/typography';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * @typedef {'drilldown' | 'deepDive'} DetailLevel
 * Controls the level of detail and features shown on the chart.
 */
type DetailLevel = 'drilldown' | 'deepDive';

/**
 * @typedef ChartDataObject
 * @property {string | number} name - The data point name, typically for the X-axis.
 * @property {number} [value] - A single value for a simple line chart.
 * @property {Record<string, number>} [series] - Multiple values for a multi-line chart, e.g., { series1: 10, series2: 20 }.
 */
export interface ChartDataObject {
  name: string | number; // For X-axis
  value?: number; // For single line
  [key: string]: string | number | null | undefined; // Allows for multiple series, e.g., seriesA: 10, seriesB: 20
}

/**
 * @typedef LineChartProps
 * @property {ChartDataObject[]} data - Data for the chart.
 * @property {string | string[]} dataKey - Key(s) in data objects for line(s), e.g., 'value' or ['seriesA', 'seriesB'].
 * @property {string} [xAxisKey='name'] - Key in data objects for X-axis labels.
 * @property {number} [width] - Chart width.
 * @property {number} [height=300] - Chart height.
 * @property {DetailLevel} [mode='deepDive'] - Chart detail mode.
 * @property {string[]} [colors] - Custom color palette for lines.
 * @property {boolean} [showLegend] - Toggle legend visibility.
 * @property {boolean} [showAxes] - Toggle axes visibility.
 * @property {(value: string | number) => string} [labelFormatter] - Formatter for data labels on lines (if enabled).
 * @property {(value: string | number | (string | number)[], name: string, props: object) => ReactNode} [tooltipFormatter] - Custom tooltip formatter.
 * @property {(event: object) => void} [onElementClick] - Click handler for line points/segments.
 * @property {boolean} [loading=false] - Loading state.
 * @property {ReactNode} [emptyState] - Content for empty data state.
 */
interface LineChartProps {
  data: ChartDataObject[];
  dataKey: string | string[]; 
  xAxisKey?: string;
  width?: number;
  height?: number;
  mode?: DetailLevel;
  colors?: string[]; 
  showLegend?: boolean;
  showAxes?: boolean;
  labelFormatter?: (value: string | number) => string;
  tooltipFormatter?: (value: string | number | (string | number)[], name: string, props: object) => ReactNode; 
onElementClick?: (event: object) => void; // Recharts event object or specific part
  loading?: boolean;
  emptyState?: ReactNode;
}

/**
 * LineChart component using Recharts to display line graphs with theming and detail levels.
 *
 * @param {LineChartProps} props - The properties for the LineChart.
 * @returns {JSX.Element} The rendered LineChart component.
 */
export const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  width,
  height = 300,
  mode = 'deepDive',
  colors: customColors,
  showLegend: propShowLegend,
  showAxes: propShowAxes,
  tooltipFormatter,
  onElementClick,
  loading = false,
  emptyState = <p>No data available for this chart.</p>,
  // labelFormatter is not directly used in basic Line, but can be passed to Line component if needed for labels
}) => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = getChartColors(isDark);

  useEffect(() => {
    // Store the ref value in a variable for the cleanup function
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

  let chartColors: string[];
  let currentShowLegend = true;
  let currentShowAxes = true;
  let showGrid = true;
  let gridDashArray = themeColors.grid.dashArray;

  switch (mode) {
    case 'drilldown':
      chartColors = themeColors.series;
      currentShowLegend = propShowLegend !== undefined ? propShowLegend : true;
      currentShowAxes = propShowAxes !== undefined ? propShowAxes : true;
      gridDashArray = '8 8'; // Lighter grid for drilldown
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

  const dataKeys = Array.isArray(dataKey) ? dataKey : [dataKey];

  return (
    <div ref={chartRef} style={{ width: width || '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart key={`line-${theme}`} data={data} onClick={onElementClick}>
          {currentShowAxes && showGrid && (
            <CartesianGrid stroke={themeColors.grid.stroke} strokeDasharray={gridDashArray} />
          )}
          {currentShowAxes && (
            <XAxis
              dataKey={xAxisKey}
              stroke={themeColors.axis.stroke}
              tick={{ fontSize: themeColors.axis.fontSize, fill: themeColors.axis.color, fontFamily: themeColors.axis.fontFamily }}
              axisLine={{ strokeWidth: themeColors.axis.strokeWidth }}
              tickLine={{ stroke: themeColors.axis.stroke }}
            />
          )}
          {currentShowAxes && (
            <YAxis
              stroke={themeColors.axis.stroke}
              tick={{ fontSize: themeColors.axis.fontSize, fill: themeColors.axis.color, fontFamily: themeColors.axis.fontFamily }}
              axisLine={{ strokeWidth: themeColors.axis.strokeWidth }}
              tickLine={{ stroke: themeColors.axis.stroke }}
            />
          )}
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={{
              backgroundColor: themeColors.tooltip.bg,
              color: themeColors.tooltip.color,
              borderRadius: themeColors.tooltip.borderRadius,
              padding: themeColors.tooltip.padding,
              fontSize: themeColors.tooltip.fontSize,
              fontFamily: getTypography.fontFamily('body'),
              border: 'none'
            }}
            itemStyle={{
              color: themeColors.tooltip.color
            }}
            labelStyle={{
              color: themeColors.tooltip.color
            }}
            cursor={{ stroke: 'rgba(128,128,128,0.3)', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          {currentShowLegend && (
            <Legend wrapperStyle={{ fontSize: themeColors.axis.fontSize, fontFamily: themeColors.axis.fontFamily, color: themeColors.axis.color }} />
          )}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={chartColors[index % chartColors.length]}
              strokeWidth={2}
              dot={{ r: mode === 'deepDive' ? 3 : 0, strokeWidth: 1, fill: chartColors[index % chartColors.length] }}
              activeDot={{ r: mode === 'deepDive' ? 5 : 0 }}
              isAnimationActive={isInView} // Only animate when in view
              animationBegin={0}
              animationDuration={1000}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart; 