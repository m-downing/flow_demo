import React from 'react';

export const KPIInsights: React.FC = () => {
  return (
    <div className="bg-white dark:bg-primary-800 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">KPI Insights</h6>
        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
          View All Insights
        </button>
      </div>
      <div className="space-y-4">
        <div className="p-3 bg-neutral-50 dark:bg-primary-900 rounded-lg border border-neutral-200 dark:border-primary-600">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">Procurement Efficiency Improvement</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Procurement efficiency has increased by 6% over the last quarter, exceeding the target by 3%. 
            This is attributed to the implementation of the new automated vendor management system.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 dark:bg-primary-900 rounded-lg border border-neutral-200 dark:border-primary-600">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">Deployment Time Reduction</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Average deployment time has decreased from 18 days to 13 days over the past 6 months, 
            meeting the SLA target of 15 days. Streamlined customs clearance processes have contributed to this improvement.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 dark:bg-primary-900 rounded-lg border border-neutral-200 dark:border-primary-600">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-500">Cost Management Alert</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            APAC region is showing higher-than-expected shipping costs, currently 12% above budget. 
            Recommend reviewing logistics contracts and exploring alternative shipping routes.
          </p>
        </div>
      </div>
    </div>
  );
}; 