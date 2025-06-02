'use client';

// src/app/components-design-system/charts/MetricCard.tsx
import React from 'react';
import { chartTokens } from '@/design-system/foundations/tokens';

/**
 * @typedef MetricCardProps
 * @property {string} label - The label or title for the metric.
 * @property {number | string} value - The main value of the metric.
 * @property {number} [delta] - The change in value, can be percentage or absolute.
 * @property {'up' | 'down'} [trend] - Indicates the direction of the trend if delta is present.
 * @property {'success' | 'warning' | 'error' | 'neutral'} [status] - The status of the metric, influences accent colors. Defaults to 'neutral'.
 * @property {() => void} [onClick] - Optional click handler for the card.
 */

/**
 * MetricCard component displays a key metric, optionally with a delta and trend.
 * It uses chartTokens for styling.
 *
 * @param {MetricCardProps} props - The properties for the MetricCard.
 * @returns {JSX.Element} The rendered MetricCard component.
 */
interface MetricCardProps {
  label: string;
  value: number | string;
  delta?: number;
  trend?: 'up' | 'down';
  status?: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  trend,
  status = 'neutral', // Default status
  onClick,
}) => {
  // Get status color from chart tokens
  const statusColor = chartTokens.status[status];
  
  // Determine delta color classes based on trend and status
  let deltaColorClass = 'text-neutral-500 dark:text-neutral-400'; // Default neutral
  if (trend === 'up' && status === 'success') {
    deltaColorClass = 'text-success-500 dark:text-success-700';
  } else if (trend === 'up' && status === 'error') {
    deltaColorClass = 'text-error-500 dark:text-error-300'; // Up is bad for errors
  } else if (trend === 'down' && status === 'success') {
    deltaColorClass = 'text-success-500 dark:text-success-700'; // Down is good for success
  } else if (trend === 'down' && status === 'error') {
    deltaColorClass = 'text-error-500 dark:text-error-300';
  } else if (trend === 'up') {
    deltaColorClass = 'text-success-500 dark:text-success-700'; // Default up is good
  } else if (trend === 'down') {
    deltaColorClass = 'text-error-500 dark:text-error-300'; // Default down is bad
  }

  return (
    <div
      className={`
        p-4 rounded-lg shadow-md flex flex-col gap-2 font-sans 
        bg-white dark:bg-neutral-900 
        transition-shadow duration-300 ease-in-out
        ${onClick ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'}
      `}
      style={{ borderLeft: `4px solid ${statusColor}` }}
      onClick={onClick}
    >
      <div className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">
        {label}
      </div>
      <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-50">
        {value}
      </div>
      {delta !== undefined && (
        <div className={`text-sm font-medium ${deltaColorClass}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {delta}
          {typeof delta === 'number' ? '%' : ''}
        </div>
      )}
    </div>
  );
};

export default MetricCard; 