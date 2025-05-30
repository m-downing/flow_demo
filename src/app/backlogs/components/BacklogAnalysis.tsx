import React from 'react';
import { LineChart, BarChart } from '@/design-system/charts';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

// Updated to match ChartDataObject with name property
interface BacklogTrend {
  name: string;
  rackBacklogs: number;
  networkBacklogs: number;
  storageBacklogs: number;
  [key: string]: string | number;
}

// Updated to match ChartDataObject with name property
interface RegionalBacklog {
  name: string;
  backlogCount: number;
  resolvedCount: number;
  [key: string]: string | number;
}

interface BacklogAnalysisProps {
  backlogTrends: BacklogTrend[];
  regionalBacklogs: RegionalBacklog[];
}

const BacklogAnalysis: React.FC<BacklogAnalysisProps> = ({ backlogTrends, regionalBacklogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-8">
        <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Backlog Trend Analysis</h6>
            <button className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300">
              <ArrowTrendingUpIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            6-month trend of equipment backlogs by category
          </p>
          <div className="h-80">
            <LineChart 
              data={backlogTrends} 
              dataKey={['rackBacklogs', 'networkBacklogs', 'storageBacklogs']} 
              xAxisKey="name"
              height={320}
            />
          </div>
        </div>
      </div>
      
      <div className="md:col-span-4">
        <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Resolution Progress</h6>
            <button className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300">
              <ArrowTrendingUpIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Current vs. resolved backlogs by region
          </p>
          <div className="h-80">
            <BarChart 
              data={regionalBacklogs} 
              dataKey={['backlogCount', 'resolvedCount']} 
              xAxisKey="name"
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacklogAnalysis; 