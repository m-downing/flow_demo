'use client';

import React from 'react';
import { PageContainer } from '@/design-system/layout/PageContainer';
import Card from '@/design-system/layout/Card';
import ServerInventoryTable from './components/ServerInventoryTable';
import ServerInventoryList from './components/ServerInventoryList';

export default function DemoTablesPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-6 text-neutral-800 dark:text-neutral-50">Tabular Data Components Demo</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-200 mb-8 max-w-4xl">
        Interactive demonstration of the TableView and ListView components with integrated TableToggle controls. 
        Use the toggle buttons to switch between Summary, Drilldown, and Deep Dive modes. The rocket icon opens 
        the full table in a new tab.
      </p>
      
      {/* Interactive TableView Demo */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4 text-neutral-800 dark:text-neutral-50">TableView with Interactive Mode Toggle</h2>
        <Card
          subtitle="Try switching between modes. Summary shows 5 key columns, Drilldown shows all columns but is layout-constrained, Deep Dive opens in a new tab with full features."
          className="mb-6"
          padding="6"
        >
          <ServerInventoryTable height={600} />
        </Card>
      </section>

      {/* Interactive ListView Demo */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4 text-neutral-800 dark:text-neutral-50">ListView with Interactive Mode Toggle</h2>
        <Card
          subtitle="The ListView displays the same data in cards. ListView only supports Summary mode (key information) and Deep Dive mode (opens in new tab). Drilldown mode is not applicable since there are no columns to show/hide."
          className="mb-6"
          padding="6"
        >
          <ServerInventoryList height={600} />
        </Card>
      </section>

      {/* Features Overview */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4 text-neutral-800 dark:text-neutral-50">TableToggle Component Features</h2>
        <div className="max-w-none">
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-100">
            <li><strong className="text-neutral-900 dark:text-neutral-50">Summary Mode:</strong> Shows 5 key columns (TableView) or key information (ListView) with unlimited scrolling</li>
            <li><strong className="text-neutral-900 dark:text-neutral-50">Drilldown Mode:</strong> Shows all columns, constrained by page layout dimensions (TableView only)</li>
            <li><strong className="text-neutral-900 dark:text-neutral-50">Deep Dive Mode:</strong> Full-featured table/list in dedicated page with no constraints</li>
            <li><strong className="text-neutral-900 dark:text-neutral-50">Smart Deep Dive:</strong> Rocket icon opens full table in new tab instead of inline mode change</li>
            <li><strong className="text-neutral-900 dark:text-neutral-50">ListView Simplicity:</strong> ListView only shows Summary and Deep Dive modes (no Drilldown since no columns)</li>
            <li><strong className="text-neutral-900 dark:text-neutral-50">Always Scrollable:</strong> All modes support vertical scrolling when data exceeds container height</li>
            <li><strong className="text-neutral-900 dark:text-neutral-50">Column Management:</strong> Sortable, resizable columns (TableView only)</li>
            <li><strong className="text-neutral-900 dark:text-neutral-50">Theme Integration:</strong> Automatic light/dark theme support matching your design system</li>
          </ul>
        </div>
      </section>

      {/* Usage Notes */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-4 text-neutral-800 dark:text-neutral-50">Implementation Notes</h2>
        <div className="bg-blue-50 dark:bg-neutral-900 border-l-4 border-blue-700 dark:border-neutral-600 p-6 rounded-lg shadow-md">
          <p className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Ready for Production Integration:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-100">
              <li>Replace sample data with your GraphQL/SQL data sources</li>
              <li>Customize column definitions for your specific data models</li>
              <li>Add real filtering and search functionality to the Deep Dive mode</li>
              <li>Implement server-side pagination for large datasets</li>
              <li>Add loading states and error handling for API calls</li>
            </ul>
        </div>
      </section>
    </PageContainer>
  );
} 