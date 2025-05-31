'use client';

import React from 'react';
import { colors } from '../../../design-system/foundations/tokens/colors.js';

// Define the color groups we want to display
const colorGroups = [
  {
    name: 'Primary',
    colors: {
      50: colors.primary[50],
      100: colors.primary[100],
      200: colors.primary[200],
      300: colors.primary[300],
      400: colors.primary[400],
      500: colors.primary[500],
      600: colors.primary[600],
      700: colors.primary[700],
      800: colors.primary[800],
      900: colors.primary[900],
    },
  },
  {
    name: 'Neutral',
    colors: {
      50: colors.neutral[50],
      100: colors.neutral[100],
      200: colors.neutral[200],
      300: colors.neutral[300],
      400: colors.neutral[400],
      500: colors.neutral[500],
      600: colors.neutral[600],
      700: colors.neutral[700],
      800: colors.neutral[800],
      900: colors.neutral[900],
      950: colors.neutral[950],
    },
  },
  {
    name: 'Success',
    colors: {
      50: colors.success[50],
      500: colors.success[500],
      700: colors.success[700],
    },
  },
  {
    name: 'Warning',
    colors: {
      50: colors.warning[50],
      500: colors.warning[500],
      700: colors.warning[700],
    },
  },
  {
    name: 'Error',
    colors: {
      50: colors.error[50],
      100: colors.error[100],
      300: colors.error[300],
      500: colors.error[500],
    },
  },
  {
    name: 'Data Visualization',
    colors: {
      primary: colors.dataViz.primary,
      secondary: colors.dataViz.secondary,
      positive: colors.dataViz.positive,
      negative: colors.dataViz.negative,
      alt: colors.dataViz.alt,
      highlight: colors.dataViz.highlight,
    },
  },
];

const ColorDemo: React.FC = () => {
  const copyToClipboard = (value: string, name: string) => {
    navigator.clipboard.writeText(value);
    // Could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary-800 mb-2">Color Tokens</h1>
        <p className="text-neutral-600 mb-12">
          Design system color tokens for consistent UI development
        </p>

        <div className="space-y-12">
          {colorGroups.map((group) => (
            <div key={group.name} className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-heading font-semibold text-primary-700 mb-6">
                {group.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {Object.entries(group.colors).map(([shade, color]) => (
                  <div
                    key={`${group.name}-${shade}`}
                    className="cursor-pointer group"
                    onClick={() => copyToClipboard(color, `${group.name.toLowerCase()}-${shade}`)}
                  >
                    <div
                      className="w-full h-24 rounded-lg shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium text-neutral-700">{shade}</p>
                      <p className="text-xs text-neutral-500 font-mono">{color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Usage examples */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-heading font-semibold text-primary-700 mb-4">
            Usage Examples
          </h2>
          <div className="space-y-4">
            <div className="bg-neutral-50 rounded-md p-4">
              <code className="text-sm">
                <span className="text-purple-700">import</span>{' '}
                <span className="text-neutral-700">{'{ colors }'}</span>{' '}
                <span className="text-purple-700">from</span>{' '}
                <span className="text-green-700">'@/design-system/foundations/tokens/colors'</span>;
              </code>
            </div>
            <div className="bg-neutral-50 rounded-md p-4">
              <code className="text-sm">
                <span className="text-neutral-700">backgroundColor:</span>{' '}
                <span className="text-green-700">colors.primary[600]</span>
              </code>
            </div>
            <div className="bg-neutral-50 rounded-md p-4">
              <code className="text-sm">
                <span className="text-neutral-700">color:</span>{' '}
                <span className="text-green-700">colors.neutral[900]</span>
              </code>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-500">
          Click any color swatch to copy its hex value to clipboard
        </div>
      </div>
    </div>
  );
};

export default ColorDemo;
