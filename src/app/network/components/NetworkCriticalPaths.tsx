import React from 'react';
import { Badge } from '@/design-system';
import { EllipsisHorizontalIcon, SignalIcon as HeroSignalIcon } from '@heroicons/react/24/outline';

// Custom SVG icons to replace Material-UI icons
const MoreIcon = () => (
  <EllipsisHorizontalIcon className="w-5 h-5" />
);

const SignalIcon = () => (
  <HeroSignalIcon className="w-5 h-5" />
);

export const NetworkCriticalPaths: React.FC = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Critical Path Status</h6>
        <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <MoreIcon />
        </button>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Status of critical network paths between data centers
      </p>
      <div className="space-y-0">
        <div className="flex items-center py-3">
          <div className="flex-shrink-0 mr-3">
            <div className="text-green-600 dark:text-green-400">
              <SignalIcon />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50">NYC-EAST to LONDON-WEST</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Latency: 76ms | Packet Loss: 0.02% | Status: Optimal</div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <Badge variant="active" size="small">100%</Badge>
          </div>
        </div>
        <hr className="border-neutral-200 dark:border-neutral-600" />
        
        <div className="flex items-center py-3">
          <div className="flex-shrink-0 mr-3">
            <div className="text-green-600 dark:text-green-400">
              <SignalIcon />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50">NYC-EAST to FRANKFURT</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Latency: 89ms | Packet Loss: 0.03% | Status: Optimal</div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <Badge variant="active" size="small">99.9%</Badge>
          </div>
        </div>
        <hr className="border-neutral-200 dark:border-neutral-600" />
        
        <div className="flex items-center py-3">
          <div className="flex-shrink-0 mr-3">
            <div className="text-amber-700 dark:text-amber-500">
              <SignalIcon />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50">LONDON-WEST to SINGAPORE</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Latency: 172ms | Packet Loss: 0.5% | Status: Degraded</div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <Badge variant="highPriority" size="small">94.5%</Badge>
          </div>
        </div>
        <hr className="border-neutral-200 dark:border-neutral-600" />
        
        <div className="flex items-center py-3">
          <div className="flex-shrink-0 mr-3">
            <div className="text-green-600 dark:text-green-400">
              <SignalIcon />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50">FRANKFURT to SINGAPORE</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Latency: 151ms | Packet Loss: 0.02% | Status: Optimal</div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <Badge variant="active" size="small">99.8%</Badge>
          </div>
        </div>
        <hr className="border-neutral-200 dark:border-neutral-600" />
        
        <div className="flex items-center py-3">
          <div className="flex-shrink-0 mr-3">
            <div className="text-red-600 dark:text-red-400">
              <SignalIcon />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-50">SINGAPORE to TOKYO</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Latency: 210ms | Packet Loss: 2.1% | Status: Critical</div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <Badge variant="critical" size="small">88.7%</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}; 