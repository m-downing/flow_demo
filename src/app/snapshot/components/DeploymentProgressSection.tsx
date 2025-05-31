import React from 'react';
import { ProgressTracker } from '@/design-system/charts';

const DeploymentProgressSection: React.FC = () => {
  return (
    <div className="md:col-span-4">
      <div className="bg-neutral-50 dark:bg-neutral-900 shadow-md rounded-lg p-4 h-full">
        <div className="flex justify-between items-center mb-2">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Key Deployment Progress</h6>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-200 mb-4">
          Major data center expansion initiatives
        </p>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <ProgressTracker value={75} label="Frankfurt Expansion" status="success" mode="deepDive" />
          <ProgressTracker value={33} label="Singapore Phase 2" status="warning" mode="deepDive" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ProgressTracker value={90} label="NYC West Migration" status="warning" mode="deepDive" />
          <ProgressTracker value={15} label="London Retrofit" status="error" mode="deepDive" />
        </div>
      </div>
    </div>
  );
};

export default DeploymentProgressSection; 