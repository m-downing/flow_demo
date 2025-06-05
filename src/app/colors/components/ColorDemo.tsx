'use client';

import React from 'react';
import { colors } from '@/design-system/foundations/tokens/colors.js';
import Badge, { BadgeVariant } from '@/design-system/components/feedback/Badge';

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
  {
    name: 'Dark Mode Data Visualization',
    colors: {
      'Main data series': colors.primary[300],
      'Comparison data': colors.primary[500],
      'Highlighting': colors.teal[200],
      'Alternative data': colors.neutral[50],
      'Positive trends': colors.success[500],
      'Negative trends': colors.error[500],
    },
  },
];

const ColorDemo: React.FC = () => {
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    // Could add a toast notification here
  };

  return (
    <>
      <h1 className="text-4xl font-heading font-bold text-neutral-800 dark:text-neutral-50 mb-sm">Color Tokens</h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-2xl">
        Design system color tokens for consistent UI development
      </p>

      <div className="space-y-2xl">
        {colorGroups.map((group) => (
          <div key={group.name} className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-neutral-700 p-xl">
            <h2 className="text-2xl font-heading font-semibold text-neutral-800 dark:text-neutral-50 mb-lg">
              {group.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-lg">
              {Object.entries(group.colors).map(([shade, color]) => (
                <div
                  key={`${group.name}-${shade}`}
                  className="cursor-pointer group"
                  onClick={() => copyToClipboard(color)}
                >
                  <div
                    className="w-full h-24 rounded-lg shadow-md dark:shadow-none dark:border dark:border-neutral-600 transition-all duration-200 group-hover:shadow-lg dark:group-hover:shadow-none dark:group-hover:border-neutral-500 group-hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{shade}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Usage examples */}
      <div className="mt-2xl bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-neutral-700 p-xl">
        <h2 className="text-2xl font-heading font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
          Usage Examples
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-md">
          Colors are integrated with Tailwind and can be used directly in utility classes:
        </p>
        <div className="space-y-md">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-md border border-neutral-200 dark:border-neutral-700">
            <code className="text-sm">
              <span className="text-purple-700 dark:text-purple-400">&lt;div</span>{' '}
              <span className="text-blue-700 dark:text-blue-100">className</span>=
              <span className="text-green-700 dark:text-green-500">&quot;bg-primary-600 text-neutral-50&quot;</span>
              <span className="text-purple-700 dark:text-purple-400">&gt;</span>
              <span className="text-neutral-700 dark:text-neutral-300">Primary background with light text</span>
              <span className="text-purple-700 dark:text-purple-400">&lt;/div&gt;</span>
            </code>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-md border border-neutral-200 dark:border-neutral-700">
            <code className="text-sm">
              <span className="text-purple-700 dark:text-purple-400">&lt;p</span>{' '}
              <span className="text-blue-700 dark:text-blue-100">className</span>=
              <span className="text-green-700 dark:text-green-500">&quot;text-success-500 font-semibold&quot;</span>
              <span className="text-purple-700 dark:text-purple-400">&gt;</span>
              <span className="text-neutral-700 dark:text-neutral-300">Success message</span>
              <span className="text-purple-700 dark:text-purple-400">&lt;/p&gt;</span>
            </code>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-md border border-neutral-200 dark:border-neutral-700">
            <code className="text-sm">
              <span className="text-purple-700 dark:text-purple-400">&lt;div</span>{' '}
              <span className="text-blue-700 dark:text-blue-100">className</span>=
              <span className="text-green-700 dark:text-green-500">&quot;border-2 border-error-300 bg-error-50&quot;</span>
              <span className="text-purple-700 dark:text-purple-400">&gt;</span>
              <span className="text-neutral-700 dark:text-neutral-300">Error state container</span>
              <span className="text-purple-700 dark:text-purple-400">&lt;/div&gt;</span>
            </code>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-md border border-neutral-200 dark:border-neutral-700">
            <code className="text-sm">
              <span className="text-purple-700 dark:text-purple-400">&lt;span</span>{' '}
              <span className="text-blue-700 dark:text-blue-100">className</span>=
              <span className="text-green-700 dark:text-green-500">&quot;bg-dataViz-primary text-white px-3 py-1 rounded&quot;</span>
              <span className="text-purple-700 dark:text-purple-400">&gt;</span>
              <span className="text-neutral-700 dark:text-neutral-300">Data viz badge</span>
              <span className="text-purple-700 dark:text-purple-400">&lt;/span&gt;</span>
            </code>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-md border border-neutral-200 dark:border-neutral-700">
            <code className="text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">{'// Dark mode example'}</span><br/>
              <span className="text-purple-700 dark:text-purple-400">&lt;div</span>{' '}
              <span className="text-blue-700 dark:text-blue-100">className</span>=
              <span className="text-green-700 dark:text-green-500">&quot;bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100&quot;</span>
              <span className="text-purple-700 dark:text-purple-400">&gt;</span>
              <span className="text-neutral-700 dark:text-neutral-300">Theme-aware container</span>
              <span className="text-purple-700 dark:text-purple-400">&lt;/div&gt;</span>
            </code>
          </div>
        </div>
        <div className="mt-md p-md bg-primary-50 dark:bg-primary-900/20 rounded-md border border-primary-200 dark:border-primary-700">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            <strong className="text-primary-800 dark:text-primary-200">Note:</strong> All color tokens are available as Tailwind utilities. Use the format{' '}
            <code className="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 px-1 rounded">bg-[colorName]-[shade]</code>,{' '}
            <code className="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 px-1 rounded">text-[colorName]-[shade]</code>, or{' '}
            <code className="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 px-1 rounded">border-[colorName]-[shade]</code>.
            For dark mode support, add corresponding dark: variants.
          </p>
        </div>
      </div>

      <div className="mt-xl text-center text-sm text-neutral-500 dark:text-neutral-400">
        Click any color swatch to copy its hex value to clipboard
      </div>

      {/* Badge showcase */}
      <div className="mt-2xl bg-white dark:bg-neutral-900 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-neutral-700 p-xl">
        <h2 className="text-2xl font-heading font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
          Badge Variants
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-lg">
          Supply chain status badges with their inverted (outlined) variants for flexible design hierarchy:
        </p>
        
        {/* Supply Chain Status Badges */}
        <div className="space-y-lg">
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-md">Supply Chain Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {[
                { name: 'Forecast', variant: 'forecast' as BadgeVariant },
                { name: 'S&OP', variant: 'sop' as BadgeVariant },
                { name: 'Business Case', variant: 'businessCase' as BadgeVariant },
                { name: 'Purchase Req.', variant: 'purchaseReq' as BadgeVariant },
                { name: 'Purchase Order', variant: 'purchaseOrder' as BadgeVariant },
                { name: 'Integrator', variant: 'integrator' as BadgeVariant },
                { name: 'Network Build', variant: 'networkBuild' as BadgeVariant },
                { name: 'Logical Build', variant: 'logicalBuild' as BadgeVariant },
                { name: 'Completed', variant: 'completed' as BadgeVariant },
                { name: 'Unassigned 1', variant: 'unassigned1' as BadgeVariant },
                { name: 'Unassigned 2', variant: 'unassigned2' as BadgeVariant },
              ].map(({ name, variant }) => (
                <div key={variant} className="flex items-center gap-md p-md bg-neutral-50 dark:bg-neutral-800 rounded-md">
                  <div className="flex items-center gap-sm">
                    <Badge variant={variant}>{name}</Badge>
                    <Badge variant={`${variant}Inverted` as BadgeVariant}>{name}</Badge>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono ml-sm">
                      {variant} / {variant}Inverted
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority/Risk Badges */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-md">Priority & Risk</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {[
                { name: 'Critical', variant: 'critical' as BadgeVariant },
                { name: 'High Priority', variant: 'highPriority' as BadgeVariant },
                { name: 'Standard', variant: 'standard' as BadgeVariant },
                { name: 'At Risk', variant: 'atRisk' as BadgeVariant },
              ].map(({ name, variant }) => (
                <div key={variant} className="flex items-center gap-md p-md bg-neutral-50 dark:bg-neutral-800 rounded-md">
                  <div className="flex items-center gap-sm">
                    <Badge variant={variant}>{name}</Badge>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono ml-sm">
                      {variant}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-lg p-md bg-primary-50 dark:bg-primary-900/20 rounded-md border border-primary-200 dark:border-primary-700">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            <strong className="text-primary-800 dark:text-primary-200">Usage:</strong> Use inverted variants for secondary content or when you need outlined/ghost button styling with transparent backgrounds and colored borders.
          </p>
        </div>

        {/* Badge Icons Section */}
        <div className="mt-lg">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-md">Badges with Icons</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-md">
            Badges can optionally include icons to provide additional visual context. Available icons: exclamation-triangle and information-circle.
          </p>
          
          <div className="space-y-md">
            {/* Regular size badges with icons */}
            <div>
              <h4 className="text-md font-medium text-neutral-600 dark:text-neutral-300 mb-sm">Regular Size</h4>
              <div className="flex flex-wrap items-center gap-md p-md bg-neutral-50 dark:bg-neutral-800 rounded-md">
                <Badge variant="critical" icon="exclamation-triangle">Critical Alert</Badge>
                <Badge variant="atRisk" icon="exclamation-triangle">At Risk</Badge>
                <Badge variant="standard" icon="information-circle">Information</Badge>
                <Badge variant="forecast" icon="information-circle">Forecast</Badge>
                <Badge variant="completedInverted" icon="information-circle">Completed</Badge>
                <Badge variant="highPriority" icon="exclamation-triangle">High Priority</Badge>
              </div>
            </div>

            {/* Small size badges with icons */}
            <div>
              <h4 className="text-md font-medium text-neutral-600 dark:text-neutral-300 mb-sm">Small Size</h4>
              <div className="flex flex-wrap items-center gap-md p-md bg-neutral-50 dark:bg-neutral-800 rounded-md">
                <Badge variant="critical" icon="exclamation-triangle" size="small">Critical</Badge>
                <Badge variant="atRisk" icon="exclamation-triangle" size="small">Risk</Badge>
                <Badge variant="standard" icon="information-circle" size="small">Info</Badge>
                <Badge variant="forecast" icon="information-circle" size="small">Forecast</Badge>
                <Badge variant="sopInverted" icon="information-circle" size="small">S&OP</Badge>
                <Badge variant="highPriority" icon="exclamation-triangle" size="small">High</Badge>
              </div>
            </div>

            {/* Mixed examples showing both icons */}
            <div>
              <h4 className="text-md font-medium text-neutral-600 dark:text-neutral-300 mb-sm">Icon Comparison</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="p-md bg-neutral-50 dark:bg-neutral-800 rounded-md">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-sm">Exclamation Triangle (Alerts & Warnings)</p>
                  <div className="flex flex-wrap gap-sm">
                    <Badge variant="critical" icon="exclamation-triangle">Critical</Badge>
                    <Badge variant="atRisk" icon="exclamation-triangle">At Risk</Badge>
                    <Badge variant="highPriority" icon="exclamation-triangle">High Priority</Badge>
                  </div>
                </div>
                <div className="p-md bg-neutral-50 dark:bg-neutral-800 rounded-md">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-sm">Information Circle (Info & Status)</p>
                  <div className="flex flex-wrap gap-sm">
                    <Badge variant="standard" icon="information-circle">Standard</Badge>
                    <Badge variant="forecast" icon="information-circle">Forecast</Badge>
                    <Badge variant="completed" icon="information-circle">Completed</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-md p-md bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong className="text-blue-800 dark:text-blue-200">Icon Usage:</strong> Use exclamation-triangle for alerts, warnings, and high-priority items. Use information-circle for informational content, status updates, and general notifications.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorDemo;
