/** @type {import('tailwindcss').Config} */

// Import design tokens from the design system
import { colors, badgeColors } from './src/design-system/foundations/tokens/colors.js';
import { typography } from './src/design-system/foundations/tokens/typography.js';
import { spacing } from './src/design-system/foundations/tokens/spacing.js';
import { borderRadius } from './src/design-system/foundations/tokens/borderRadius.js';
import { shadows } from './src/design-system/foundations/tokens/shadows.js';
import { chartTokens } from './src/design-system/foundations/tokens/charts.js';

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Typography system from design tokens
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      
      // Color system from design tokens
      colors: {
        ...colors,
        // Add badge colors as a nested object for easy access
        badge: badgeColors,
        // Add chart-specific colors
        chart: {
          status: chartTokens.status,
          series: chartTokens.series,
          // Theme-specific chart colors
          light: {
            series: chartTokens.seriesVariants.light,
            axis: chartTokens.axis.light,
            grid: chartTokens.grid.light,
            tooltip: chartTokens.tooltip.light,
          },
          dark: {
            series: chartTokens.seriesVariants.dark,
            axis: chartTokens.axis.dark,
            grid: chartTokens.grid.dark,
            tooltip: chartTokens.tooltip.dark,
          }
        }
      },
      
      // Layout system from design tokens
      borderRadius,
      boxShadow: shadows,
      spacing,
      
      // Chart-specific utilities
      strokeWidth: {
        'chart': chartTokens.axis.light.strokeWidth,
        'chart-bold': '2',
        'chart-thick': '3',
      },
      
      // Typography utilities
      textShadow: {
        'chart': '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
      
      // Custom utilities
      backgroundImage: {
        'grid-pattern': `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 10px,
          var(--grid-color) 10px,
          var(--grid-color) 11px
        )`,
      },
      
      // Animation utilities
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
