'use client';

import React from 'react';
import { 
  NetworkSummaryMetrics,
  NetworkUtilization,
  NetworkEquipmentDistribution,
  NetworkLatencyScatter,
  NetworkCriticalPaths
} from './components';

const NetworkPage: React.FC = () => {
  return (
    <div className="pt-8 px-6 py-8 pb-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
            Network Infrastructure Monitoring
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-200">
            Real-time monitoring of global data center network connectivity and equipment
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
            Last updated: Just now
          </span>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Topology Map
          </button>
        </div>
      </div>
      
      <NetworkSummaryMetrics />
      
      {/* Network Utilization and Equipment Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-8">
          <NetworkUtilization />
        </div>
        <div className="md:col-span-4">
          <NetworkEquipmentDistribution />
        </div>
      </div>
      
      {/* Datacenter Interconnect Latency and Network Critical Paths */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-6">
          <NetworkLatencyScatter />
        </div>
        <div className="md:col-span-6">
          <NetworkCriticalPaths />
        </div>
      </div>
    </div>
  );
};

export default NetworkPage; 