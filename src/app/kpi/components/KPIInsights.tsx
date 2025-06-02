import React from 'react';
import Card from '@/design-system/layout/Card';
import Button from '@/design-system/components/primitives/Button';

export const KPIInsights: React.FC = () => {
  return (
    <Card
      title="KPI Insights"
      headerAction={
        <Button variant="ghost" size="sm">
          View All Insights
        </Button>
      }
      shadowLevel="md"
    >
      <div className="space-y-md">
        <div className="p-sm bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-success-500 dark:text-success-700">Procurement Efficiency Improvement</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-xs">
            Procurement efficiency has increased by 6% over the last quarter, exceeding the target by 3%. 
            This is attributed to the implementation of the new automated vendor management system.
          </p>
        </div>
        
        <div className="p-sm bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-success-500 dark:text-success-700">Deployment Time Reduction</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-xs">
            Average deployment time has decreased from 18 days to 13 days over the past 6 months, 
            meeting the SLA target of 15 days. Streamlined customs clearance processes have contributed to this improvement.
          </p>
        </div>
        
        <div className="p-sm bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-500">Cost Management Alert</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-xs">
            APAC region is showing higher-than-expected shipping costs, currently 12% above budget. 
            Recommend reviewing logistics contracts and exploring alternative shipping routes.
          </p>
        </div>
      </div>
    </Card>
  );
}; 