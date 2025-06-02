import React, { ReactNode, useState, useEffect } from 'react';
import { chartTokens, getChartColors } from '@/design-system/foundations/tokens';
import { getTypography } from '@/design-system/foundations/tokens/typography';
import { colors } from '@/design-system/foundations/tokens/colors';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * @typedef {'summary' | 'drilldown' | 'deepDive'} DetailLevel
 * Controls visual aspects of the tracker. For ProgressTracker, it might influence size or label verbosity.
 */
type DetailLevel = 'summary' | 'drilldown' | 'deepDive';

/**
 * @typedef ProgressTrackerProps
 * @property {number} value - The current progress value (e.g., 0-100).
 * @property {number} [max=100] - The maximum value for the progress.
 * @property {string} [label] - Optional label to display.
 * @property {'success' | 'warning' | 'error' | 'neutral' | 'primary'} [status='primary'] - Status to determine the color of the progress bar.
 * @property {DetailLevel} [mode='deepDive'] - Detail mode, influences size/verbosity.
 * @property {number} [size=100] - Size of the circular progress tracker (diameter).
 * @property {number} [strokeWidth=10] - Stroke width of the progress circle.
 * @property {(value: number, max: number) => string} [valueFormatter] - Function to format the displayed value.
 * @property {boolean} [loading=false] - Loading state (shows a generic loader).
 * @property {ReactNode} [emptyState] - Not typically used for progress, but included for consistency.
 * @property {boolean} [showValueAsTooltip=false] - Whether to show the value as a tooltip.
 * @property {'circular' | 'horizontal'} [variant='circular'] - The variant of the progress tracker.
 * @property {number} [height=8] - Height of the horizontal progress bar (only for horizontal variant).
 * @property {boolean} [showValue=true] - Whether to show the value text (for horizontal variant).
 */
interface ProgressTrackerProps {
  value: number;
  max?: number;
  label?: string;
  status?: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
  mode?: DetailLevel;
  size?: number;
  strokeWidth?: number;
  valueFormatter?: (value: number, max: number) => string;
  loading?: boolean;
  emptyState?: ReactNode; // Less relevant here, but for consistency
  showValueAsTooltip?: boolean; // New prop
  variant?: 'circular' | 'horizontal'; // New prop
  height?: number; // New prop for horizontal variant
  showValue?: boolean; // New prop for horizontal variant
}

/**
 * ProgressTracker component displays a circular or horizontal progress indicator.
 *
 * @param {ProgressTrackerProps} props - The properties for the ProgressTracker.
 * @returns {JSX.Element} The rendered ProgressTracker component.
 */
export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  value,
  max = 100,
  label,
  status = 'primary',
  mode = 'deepDive', // Summary might be smaller, deepDive larger/more info
  size: propSize,
  strokeWidth: propStrokeWidth,
  valueFormatter,
  loading = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emptyState: _emptyState, // Included for prop consistency, less typical for a progress bar
  showValueAsTooltip = false, // Default to false
  variant = 'circular', // Default to circular
  height = 8, // Default height for horizontal
  showValue = true, // Default to showing value
}) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === 'dark';
  const themeColors = getChartColors(isDark);

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: variant === 'horizontal' ? height : (propSize || (mode === 'summary' ? 50 : 100)), fontFamily: getTypography.fontFamily('body'), color: themeColors.axis.color }}>Loading...</div>;
  }

  // Handle cases where progress isn't meaningful (optional, based on use case)
  // if (value === undefined || value === null) {
  //   return emptyState ? <>{emptyState}</> : <div style={{ height: propSize || 100 }}>No progress data.</div>;
  // }

  const baseSize = mode === 'summary' ? 60 : (mode === 'drilldown' ? 80 : 100);
  const baseStroke = mode === 'summary' ? 6 : (mode === 'drilldown' ? 8 : 10);

  const currentSize = propSize !== undefined ? propSize : baseSize;
  const currentStrokeWidth = propStrokeWidth !== undefined ? propStrokeWidth : baseStroke;

  const radius = (currentSize - currentStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(value, max)) / max) * circumference;

  const progressColor = chartTokens.status[status];
  const trackColor = isDark ? colors.neutral[600] : colors.neutral[200]; // Dark-aware track color

  const defaultFormatter = (val: number, mx: number) => `${Math.round((val / mx) * 100)}%`;
  const displayValue = valueFormatter ? valueFormatter(value, max) : defaultFormatter(value, max);

  // Horizontal variant implementation
  if (variant === 'horizontal') {
    const percentage = Math.max(0, Math.min(value, max)) / max * 100;
    
    return (
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: getTypography.fontFamily('body'),
          opacity: isMounted ? 1 : 0,
          transition: 'opacity 0.15s ease-in-out',
          width: '100%'
        }}
        key={`progress-${theme}-${isMounted}`}
        title={showValueAsTooltip ? displayValue : undefined}
      >
        {isMounted && (
          <>
            {label && (
              <div style={{
                minWidth: mode === 'summary' ? '80px' : '128px',
                fontSize: getTypography.fontSize(mode === 'summary' ? 'xs' : 'sm'),
                color: themeColors.axis.color,
              }}>
                {label}
              </div>
            )}
            <div style={{
              flexGrow: 1,
              backgroundColor: trackColor,
              height: `${height}px`,
              borderRadius: `${height / 2}px`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  backgroundColor: progressColor,
                  height: '100%',
                  width: `${percentage}%`,
                  borderRadius: `${height / 2}px`,
                  transition: 'width 0.3s ease-out'
                }}
              />
            </div>
            {showValue && !showValueAsTooltip && (
              <div style={{
                minWidth: '40px',
                textAlign: 'right',
                fontSize: getTypography.fontSize(mode === 'summary' ? 'xs' : 'sm'),
                color: status === 'primary' ? themeColors.axis.color : progressColor,
                fontWeight: getTypography.fontWeight('semibold')
              }}>
                {displayValue}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Circular variant (existing implementation)
  return (
    <div 
      style={{ 
        display: 'inline-flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        fontFamily: getTypography.fontFamily('body'),
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 0.15s ease-in-out' 
      }}
      key={`progress-${theme}-${isMounted}`}
      title={showValueAsTooltip ? displayValue : undefined} // Set title attribute for tooltip
    >
      {isMounted && (
        <>
          <svg width={currentSize} height={currentSize} viewBox={`0 0 ${currentSize} ${currentSize}`}>
            <circle
              stroke={trackColor} // Theme-aware background track color
              fill="transparent"
              strokeWidth={currentStrokeWidth}
              r={radius}
              cx={currentSize / 2}
              cy={currentSize / 2}
            />
            <circle
              stroke={progressColor}
              fill="transparent"
              strokeWidth={currentStrokeWidth}
              strokeLinecap="round"
              r={radius}
              cx={currentSize / 2}
              cy={currentSize / 2}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: 'stroke-dashoffset 0.3s ease-out',
              }}
            />
            {mode === 'deepDive' && !showValueAsTooltip && ( // Only deepDive mode shows text inside circle
              <text
                x="50%"
                y="50%"
                dy=".3em" // Vertical alignment
                textAnchor="middle"
                fontSize={currentSize / (displayValue.length > 7 ? 5.5 : (displayValue.length > 3 ? 4.5 : 3.5))} // Adjust font size based on text length
                fill={themeColors.axis.color}
                fontWeight={getTypography.fontWeight('semibold')}
                fontFamily={getTypography.fontFamily('body')}
              >
                {displayValue}
              </text>
            )}
          </svg>
          {mode === 'drilldown' && !showValueAsTooltip && ( // Drilldown mode shows text below circle
            <div style={{
              marginTop: '8px',
              fontSize: getTypography.fontSize('sm'),
              color: themeColors.axis.color,
              textAlign: 'center',
              fontWeight: getTypography.fontWeight('semibold')
            }}>
              {displayValue}
            </div>
          )}
          {label && mode === 'deepDive' && (
            <div style={{
              marginTop: '8px',
              fontSize: getTypography.fontSize('sm'),
              color: themeColors.axis.color,
              textAlign: 'center'
            }}>
              {label}
            </div>
          )}
           {label && mode === 'summary' && (
            <div style={{
              marginTop: '4px',
              fontSize: getTypography.fontSize('xs'),
              color: themeColors.axis.color,
              textAlign: 'center'
            }}>
              {label}
            </div>
          )}
           {label && mode === 'drilldown' && (
            <div style={{
              marginTop: '4px',
              fontSize: getTypography.fontSize('xs'),
              color: themeColors.axis.color,
              textAlign: 'center'
            }}>
              {label}
            </div>
          )}
        </>
      )}
    </div>
  ); 
};

export default ProgressTracker; 