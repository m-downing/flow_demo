/**
 * Design system chart tokens
 * These tokens are specifically for styling chart components and MetricCards.
 */

import { colors } from '../foundations/tokens/colors';
import { typography } from '../foundations/tokens/typography';
import { shadows } from '../foundations/tokens/shadows';

export const chartTokens = {
  status: {
    // Maps to dataViz colors for semantic status indicators
    error: colors.colors.error[500],
    warning: colors.colors.warning[500],
    success: colors.colors.success[500],
    neutral: colors.colors.neutral[500],
    primary: colors.colors.primary[600],
  },
  // Keep original series array for backward compatibility (light mode)
  series: [
    // Data visualization color palette for consistent charting
    colors.colors.dataViz.primary,    // Main data series
    colors.colors.dataViz.secondary,  // Comparison data series
    colors.colors.dataViz.highlight,  // Highlighting specific metrics
    colors.colors.dataViz.alt,        // Alternative data categories
    colors.colors.dataViz.positive,   // Positive trends
    colors.colors.dataViz.negative,   // Negative trends
  ],
  // New theme-specific variants
  seriesVariants: {
    light: [
      // Data visualization color palette for light mode
      colors.colors.dataViz.primary,    // Main data series - dark blue
      colors.colors.dataViz.secondary,  // Comparison data series - blue-gray
      colors.colors.dataViz.highlight,  // Highlighting specific metrics - orange
      colors.colors.dataViz.alt,        // Alternative data categories - light blue-gray
      colors.colors.dataViz.positive,   // Positive trends - green
      colors.colors.dataViz.negative,   // Negative trends - red
    ],
    dark: [
      // Data visualization color palette for dark mode
      colors.colors.primary[300],        // Main data series
      colors.colors.primary[500],          // Comparison data series
      colors.colors.teal[200],          // Highlighting specific metrics
      colors.colors.neutral[50],         // Alternative data categories
      colors.colors.success[500],        // Positive trends
      colors.colors.error[500],          // Negative trends
    ]
  },
  axis: {
    light: {
      stroke: colors.colors.neutral[500],
      strokeWidth: 1,
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.xs,
      color: colors.colors.neutral[700],
    },
    dark: {
      stroke: colors.colors.neutral[400],
      strokeWidth: 1,
      fontFamily: typography.fontFamily.body,
      fontSize: typography.fontSize.xs,
      color: colors.colors.neutral[300],
    }
  },
  grid: {
    light: {
      stroke: colors.colors.neutral[200],
      dashArray: '3 3',
    },
    dark: {
      stroke: colors.colors.neutral[600],
      dashArray: '3 3',
    }
  },
  tooltip: {
    light: {
      bg: colors.colors.neutral[800],
      color: colors.colors.neutral[50],
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: typography.fontSize.sm,
    },
    dark: {
      bg: colors.colors.neutral[100],
      color: colors.colors.neutral[800],
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: typography.fontSize.sm,
    }
  },
  card: {
    // Example padding values
    padding: '1rem',
    gap: '0.5rem',
    // Maps to shadows.md
    shadow: shadows.md,
  },
};

// Utility function to get theme-appropriate colors
export const getChartColors = (isDark: boolean = false) => ({
  series: isDark ? chartTokens.seriesVariants.dark : chartTokens.seriesVariants.light,
  axis: isDark ? chartTokens.axis.dark : chartTokens.axis.light,
  grid: isDark ? chartTokens.grid.dark : chartTokens.grid.light,
  tooltip: isDark ? chartTokens.tooltip.dark : chartTokens.tooltip.light,
  status: chartTokens.status,
  card: chartTokens.card,
});

export default chartTokens; 