import React, { ReactNode, useState, useRef, useEffect } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartTokens, getChartColors } from './tokens';
import { typography } from '../foundations/tokens/typography';
import { useTheme } from '../../app/contexts/ThemeContext';
import { colors } from '../foundations/tokens/colors';
// colors and shadows might be needed for specific styling not covered by chartTokens directly
// import { colors as designSystemColors } from '../../components/design-system/tokens/colors';
// import { shadows } from '../../components/design-system/tokens/shadows';

/**
 * @typedef {'summary' | 'drilldown' | 'deepDive'} DetailLevel
 */
type DetailLevel = 'summary' | 'drilldown' | 'deepDive';

export interface PieChartDataObject {
  name: string;
  value: number;
  [key: string]: string | number | null | undefined; // Allow other properties if needed
}

// Utility function to lighten a hex color
const lightenHexColor = (hex: string, percent: number): string => {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, r + Math.round((255 - r) * percent));
  const newG = Math.min(255, g + Math.round((255 - g) * percent));
  const newB = Math.min(255, b + Math.round((255 - b) * percent));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

/**
 * @typedef ChartProps
 * @property {any[]} data - Data for the chart, expected to be in a format suitable for Recharts Pie component (e.g., [{ name: 'A', value: 100 }]).
 * @property {number} [width] - Desired width of the chart container. Defaults to 100%.
 * @property {number} [height=300] - Desired height of the chart container. Defaults to 300px.
 * @property {DetailLevel} [mode='deepDive'] - Controls styling and features: 'summary', 'drilldown', or 'deepDive'.
 * @property {string[]} [colors] - Optional array of hex color codes to override the default palette.
 * @property {boolean} [showLegend=true] - Whether to display the legend.
 * @property {(value: any, entry: any, index: number) => string} [labelFormatter] - Function to format labels on pie slices.
 * @property {(payload: any) => ReactNode} [tooltipFormatter] - Custom formatter for tooltip content.
 * @property {(data: any, index: number) => void} [onElementClick] - Callback function when a pie slice is clicked.
 * @property {boolean} [loading=false] - If true, displays a loading indicator (placeholder).
 * @property {ReactNode} [emptyState] - Content to display if data is empty.
 */
interface PieChartProps {
  data: PieChartDataObject[];
  width?: number;
  height?: number;
  mode?: DetailLevel;
  colors?: string[];
  showLegend?: boolean;
  // Pie-specific props
  dataKey?: string; // Key for the value to plot, e.g., 'value'
  nameKey?: string; // Key for the name/label of the slice, e.g., 'name'
  labelFormatter?: (entry: PieChartDataObject) => string;
  tooltipFormatter?: (value: number, name: string, props: object) => ReactNode;
  onElementClick?: (data: PieChartDataObject, index: number, e: React.MouseEvent) => void; // Updated signature
  loading?: boolean;
  emptyState?: ReactNode;
  // showAxes is not applicable to PieChart, so it's omitted from general ChartProps here
  // Gap settings
  paddingAngle?: number;
  cornerRadius?: number;
  innerRadius?: number;
  outerRadius?: number;
}

/**
 * PieChart component wraps Recharts PieChart to provide themed and configurable pie charts.
 *
 * @param {PieChartProps} props - The properties for the PieChart.
 * @returns {JSX.Element} The rendered PieChart component.
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  width,
  height = 300,
  mode = 'deepDive',
  colors: customColors,
  showLegend: propShowLegend,
  innerRadius = 0,
  outerRadius,
  paddingAngle = 0,
  cornerRadius = 0,
  onElementClick,
  labelFormatter,
  tooltipFormatter,
  loading = false,
  emptyState = <p>No data available for this chart.</p>,
}) => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themeColors = getChartColors(isDark);
  
  // Dark mode specific styling
  const pieStroke = isDark ? colors.colors.primary[700] : colors.colors.neutral[50];
  const pieStrokeWidth = isDark ? 2 : 1;

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
    return <div style={{ width: width || '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: typography.fontFamily.body, color: themeColors.axis.color }}>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div style={{ width: width || '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: typography.fontFamily.body, color: themeColors.axis.color }}>{emptyState}</div>;
  }

  let chartColors: string[];
  let currentShowLegend = true;
  let currentPaddingAngle = paddingAngle;
  const currentCornerRadius = cornerRadius; // Use the provided cornerRadius or default to 0

  switch (mode) {
    case 'summary':
      chartColors = Object.values(chartTokens.status).map(color => lightenHexColor(color, 0.4)); // Lighten by 40%
      currentShowLegend = false;
      currentPaddingAngle = paddingAngle || 0;
      break;
    case 'drilldown':
      chartColors = themeColors.series;
      currentShowLegend = propShowLegend !== undefined ? propShowLegend : true; // Small legend
      currentPaddingAngle = paddingAngle || 0.02; // Small gap
      break;
    case 'deepDive':
    default:
      chartColors = themeColors.series;
      currentShowLegend = propShowLegend !== undefined ? propShowLegend : true; // Full legend
      currentPaddingAngle = paddingAngle || 0.04; // More prominent gap
      break;
  }

  if (customColors && customColors.length > 0) {
    chartColors = customColors;
  }

  const defaultLabelFormatter = (entry: PieChartDataObject) => `${entry[nameKey]} : ${entry[dataKey]}`;
  const internalLabelFormatter = labelFormatter || defaultLabelFormatter;

  return (
    <div ref={chartRef} style={{ width: width || '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart key={`pie-${theme}`}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={mode === 'deepDive' ? ((entry: unknown) => internalLabelFormatter(entry as PieChartDataObject)) : false}
            outerRadius={outerRadius || 80}
            innerRadius={innerRadius}
            paddingAngle={currentPaddingAngle}
            cornerRadius={currentCornerRadius}
            fill="#8884d8"
            dataKey={dataKey}
            onClick={onElementClick ? ((data: unknown, index: number, event: unknown) => onElementClick(data as PieChartDataObject, index, event as React.MouseEvent)) : undefined}
            isAnimationActive={isInView} // Only animate when in view
            animationBegin={0}
            animationDuration={1000}
            stroke={pieStroke}
            strokeWidth={pieStrokeWidth}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} stroke={pieStroke} strokeWidth={pieStrokeWidth} />
            ))}
          </Pie>
          {currentShowLegend && mode !== 'summary' && (
            <Legend wrapperStyle={{ fontSize: themeColors.axis.fontSize, fontFamily: themeColors.axis.fontFamily, color: themeColors.axis.color }} />
          )}
          {mode !== 'summary' && (
              <Tooltip
                  formatter={tooltipFormatter as ((value: unknown, name: unknown, props: unknown) => React.ReactNode) | undefined}
                  contentStyle={{
                      backgroundColor: themeColors.tooltip.bg,
                      color: themeColors.tooltip.color,
                      borderRadius: themeColors.tooltip.borderRadius,
                      padding: themeColors.tooltip.padding,
                      fontSize: themeColors.tooltip.fontSize,
                      fontFamily: typography.fontFamily.body,
                      border: 'none'
                  }}
                  labelStyle={{
                      color: themeColors.tooltip.color,
                      fontWeight: 'bold'
                  }}
                  itemStyle={{
                      color: themeColors.tooltip.color
                  }}
                  wrapperStyle={{
                      color: themeColors.tooltip.color
                  }}
                  cursor={{ fill: 'transparent' }}
              />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart; 