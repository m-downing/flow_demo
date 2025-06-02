import React from 'react';
import Card from '@/design-system/layout/Card';

export const KPIInsights: React.FC = () => {
  return (
    <Card
      title="KPI Insights"
      headerAction={
        <button className="text-primary-600 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-neutral-300">
          View All Insights
        </button>
      }
      shadowLevel="md"
    >
      <div className="space-y-4">
        <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">Procurement Efficiency Improvement</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Procurement efficiency has increased by 6% over the last quarter, exceeding the target by 3%. 
            This is attributed to the implementation of the new automated vendor management system.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">Deployment Time Reduction</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Average deployment time has decreased from 18 days to 13 days over the past 6 months, 
            meeting the SLA target of 15 days. Streamlined customs clearance processes have contributed to this improvement.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-500">Cost Management Alert</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            APAC region is showing higher-than-expected shipping costs, currently 12% above budget. 
            Recommend reviewing logistics contracts and exploring alternative shipping routes.
          </p>
        </div>
      </div>
    </Card>
  );
}; 