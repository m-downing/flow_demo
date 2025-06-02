"use client";

import React from "react";
import { PageContainer } from "@/design-system/layout/PageContainer";
import { MetricCard } from "@/design-system/charts";
import Card from "@/design-system/layout/Card";

const TailwindGridPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="mb-xl">
        <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50 mb-sm">
          Tailwind CSS Grid System Demo
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-200">
          Showcase of the 12-column grid system using col-span utilities
        </p>
      </div>

      {/* Basic Grid Examples */}
      <div className="space-y-xl">
        {/* Example 1: Equal Columns */}
        <section>
          <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
            1. Equal Width Columns (col-span-4)
          </h5>
          <div className="grid grid-cols-12 gap-md">
            <div className="col-span-4">
              <Card className="p-lg text-center bg-primary-50 dark:bg-neutral-800 border border-primary-200 dark:border-primary-600">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">col-span-4</p>
              </Card>
            </div>
            <div className="col-span-4">
              <Card className="p-lg text-center bg-primary-50 dark:bg-neutral-800 border border-primary-200 dark:border-primary-600">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">col-span-4</p>
              </Card>
            </div>
            <div className="col-span-4">
              <Card className="p-lg text-center bg-primary-50 dark:bg-neutral-800 border border-primary-200 dark:border-primary-600">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">col-span-4</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Example 2: Asymmetric Layout */}
        <section>
          <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
            2. Asymmetric Layout (2-6-4 Pattern)
          </h5>
          <div className="grid grid-cols-12 gap-md">
            <div className="col-span-2">
              <Card className="p-lg text-center bg-success-50 dark:bg-neutral-800 border border-success-500 dark:border-success-700">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">col-span-2</p>
              </Card>
            </div>
            <div className="col-span-6">
              <Card className="p-lg text-center bg-success-50 dark:bg-neutral-800 border border-success-500 dark:border-success-700">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">col-span-6</p>
              </Card>
            </div>
            <div className="col-span-4">
              <Card className="p-lg text-center bg-success-50 dark:bg-neutral-800 border border-success-500 dark:border-success-700">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">col-span-4</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Example 3: Nested Grids */}
        <section>
          <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
            3. Nested Grid Layout
          </h5>
          <div className="grid grid-cols-12 gap-md">
            <div className="col-span-8">
              <Card className="p-lg bg-warning-50 dark:bg-neutral-800 border border-warning-500 dark:border-warning-700">
                <p className="font-mono text-sm mb-4 text-neutral-800 dark:text-neutral-50">col-span-8 (Parent)</p>
                <div className="grid grid-cols-8 gap-sm">
                  <div className="col-span-3">
                    <Card className="p-md text-center bg-orange-100 dark:bg-neutral-700 border border-orange-500 dark:border-orange-700">
                      <p className="font-mono text-xs text-neutral-800 dark:text-neutral-50">col-span-3</p>
                    </Card>
                  </div>
                  <div className="col-span-5">
                    <Card className="p-md text-center bg-orange-100 dark:bg-neutral-700 border border-orange-500 dark:border-orange-700">
                      <p className="font-mono text-xs text-neutral-800 dark:text-neutral-50">col-span-5</p>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-span-4">
              <Card className="p-lg text-center bg-warning-50 dark:bg-neutral-800 border border-warning-500 dark:border-warning-700">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">col-span-4</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Example 4: Responsive Grid */}
        <section>
          <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
            4. Responsive Grid (Mobile → Desktop)
          </h5>
          <div className="grid grid-cols-12 gap-md">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <Card className="p-lg text-center bg-error-50 dark:bg-neutral-800 border border-error-300 dark:border-error-500">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">12 → 6 → 3</p>
                <p className="text-xs mt-sm text-neutral-600 dark:text-neutral-400">
                  Full on mobile, half on tablet, quarter on desktop
                </p>
              </Card>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <Card className="p-lg text-center bg-error-50 dark:bg-neutral-800 border border-error-300 dark:border-error-500">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">12 → 6 → 3</p>
                <p className="text-xs mt-sm text-neutral-600 dark:text-neutral-400">
                  Full on mobile, half on tablet, quarter on desktop
                </p>
              </Card>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <Card className="p-lg text-center bg-error-50 dark:bg-neutral-800 border border-error-300 dark:border-error-500">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">12 → 6 → 3</p>
                <p className="text-xs mt-sm text-neutral-600 dark:text-neutral-400">
                  Full on mobile, half on tablet, quarter on desktop
                </p>
              </Card>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <Card className="p-lg text-center bg-error-50 dark:bg-neutral-800 border border-error-300 dark:border-error-500">
                <p className="font-mono text-sm text-neutral-800 dark:text-neutral-50">12 → 6 → 3</p>
                <p className="text-xs mt-sm text-neutral-600 dark:text-neutral-400">
                  Full on mobile, half on tablet, quarter on desktop
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Example 5: Real-world Component Layout */}
        <section>
          <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
            4. Real-world Dashboard Layout
          </h5>
          <div className="grid grid-cols-12 gap-md">
            {/* Metrics Row */}
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-md">
                <div className="col-span-6 md:col-span-3">
                  <MetricCard
                    label="Total Rack Capacity"
                    value="1,842"
                    delta={12.5}
                    trend="up"
                    status="success"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <MetricCard
                    label="Utilization Rate"
                    value="78.3%"
                    delta={2.4}
                    trend="up"
                    status="neutral"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <MetricCard
                    label="Active Deployments"
                    value="47"
                    delta={-8.1}
                    trend="down"
                    status="success"
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
                  <MetricCard
                    label="Critical Alerts"
                    value="3"
                    delta={1}
                    trend="up"
                    status="error"
                  />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 md:col-span-8">
              <Card className="p-lg h-64">
                <h6 className="font-semibold text-neutral-800 dark:text-neutral-50 mb-2">
                  Main Content Area
                </h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  This would typically contain charts, tables, or other primary content.
                  Uses col-span-8 on medium+ screens.
                </p>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 md:col-span-4">
              <Card className="p-lg h-64">
                <h6 className="font-semibold text-neutral-800 dark:text-neutral-50 mb-2">
                  Sidebar Content
                </h6>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Secondary content like filters, quick actions, or summary info.
                  Uses col-span-4 on medium+ screens.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Grid Guidelines */}
        <section className="mt-2xl">
          <Card className="p-lg bg-neutral-100 dark:bg-neutral-800">
            <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
              Grid System Guidelines
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg text-sm">
              <div>
                <h6 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-50">Column Spans</h6>
                <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                  <li>• <code className="text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-50">col-span-1</code> = 1/12 width (8.33%)</li>
                  <li>• <code className="text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-50">col-span-2</code> = 2/12 width (16.67%)</li>
                  <li>• <code className="text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-50">col-span-3</code> = 3/12 width (25%)</li>
                  <li>• <code className="text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-50">col-span-4</code> = 4/12 width (33.33%)</li>
                  <li>• <code className="text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-50">col-span-6</code> = 6/12 width (50%)</li>
                  <li>• <code className="text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-50">col-span-12</code> = Full width (100%)</li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-50">Best Practices</h6>
                <ul className="space-y-1 text-neutral-600 dark:text-neutral-400">
                  <li>• Always use <code className="text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-50">grid-cols-12</code> as the parent grid</li>
                  <li>• Ensure column spans add up to 12 per row</li>
                  <li>• Use responsive prefixes (sm:, md:, lg:, xl:)</li>
                  <li>• Apply consistent gap values (gap-sm, gap-md, gap-lg)</li>
                  <li>• Nest grids when needed for complex layouts</li>
                  <li>• Start mobile-first with responsive modifiers</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </PageContainer>
  );
};

export default TailwindGridPage;
