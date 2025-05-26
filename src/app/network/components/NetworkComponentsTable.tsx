import React from 'react';
import { AGDataTable, AGColumnDef } from '@/design-system/DataTable';
import { Badge } from '@/design-system';
import type { BadgeVariant } from '@/design-system/components/feedback/Badge';
import { NetworkComponent, networkComponents } from './mockData';

// Custom SVG icons to replace Material-UI icons
const RouterIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const WifiIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

const StorageIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

// Column definitions for network components
const networkComponentColumns: AGColumnDef<NetworkComponent>[] = [
  {
    field: 'name',
    title: 'Name',
    width: 180,
    statusAccessor: (row) => {
      switch (row.status) {
        case 'critical': return 'error';
        case 'warning': return 'warning';
        case 'maintenance': return 'warning';
        default: return 'success';
      }
    },
    cellRenderer: (row) => (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-900 dark:text-neutral-50">{row.name}</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">{row.location}</span>
      </div>
    )
  },
  {
    field: 'type',
    title: 'Type',
    width: 140,
    cellRenderer: (row) => {
      const typeIconMap = {
        router: <RouterIcon />,
        switch: <WifiIcon />,
        firewall: <WifiIcon />,
        load_balancer: <StorageIcon />
      };
      
      return (
        <div className="flex items-center text-neutral-700 dark:text-neutral-300">
          <span className="mr-2">{typeIconMap[row.type]}</span>
          <span className="capitalize">{row.type.replace('_', ' ')}</span>
        </div>
      );
    }
  },
  {
    field: 'status',
    title: 'Status',
    width: 140,
    cellRenderer: (row) => {
      // Map status to Badge variants
      const statusToVariant: Record<string, BadgeVariant> = {
        'operational': 'active',
        'warning': 'highPriority',
        'critical': 'critical',
        'maintenance': 'maintenance'
      };
      
      return <Badge variant={statusToVariant[row.status]}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</Badge>;
    }
  },
  {
    field: 'utilization',
    title: 'Utilization',
    width: 140,
    cellRenderer: (row) => {
      const getUtilizationColor = (value: number) => {
        if (value >= 80) return 'bg-red-500 dark:bg-red-400';
        if (value >= 70) return 'bg-yellow-500 dark:bg-amber-700';
        return 'bg-green-500 dark:bg-green-400';
      };
      
      return (
        <div className="flex items-center">
          <div className="w-24 bg-neutral-200 dark:bg-neutral-600 h-2 rounded-full mr-2">
            <div 
              className={`${getUtilizationColor(row.utilization)} h-2 rounded-full`} 
              style={{ width: `${row.utilization}%` }}
            ></div>
          </div>
          <span className="text-neutral-700 dark:text-neutral-300">{row.utilization}%</span>
        </div>
      );
    }
  },
  {
    field: 'lastUpdated',
    title: 'Last Updated',
    width: 150,
  }
];

export const NetworkComponentsTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-primary-800 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Network Components</h6>
        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg transition-colors">
          View All
        </button>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Status of critical network infrastructure equipment
      </p>
      <div className="w-full overflow-x-auto">
        <AGDataTable 
          columns={networkComponentColumns} 
          data={networkComponents} 
          mode="deepDive" 
          maxRows={5}
          heightVariant="comfortable"
          width="100%"
        />
      </div>
    </div>
  );
}; 