import React from 'react';
import { AGDataTable, AGColumnDef } from '@/design-system/DataTable';
import { Badge } from '@/design-system';
import type { BadgeVariant } from '@/design-system/components/feedback/Badge';
import { NetworkIncident, networkIncidents } from './mockData';
import type { ICellRendererParams } from 'ag-grid-community';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// Custom SVG icon to replace Material-UI icon
const WarningIcon = () => (
  <ExclamationTriangleIcon className="w-5 h-5" />
);

// Column definitions for network incidents
const networkIncidentColumns: AGColumnDef<NetworkIncident>[] = [
  {
    field: 'severity',
    title: 'Severity',
    width: 100,
    statusAccessor: (row) => {
      if (row.severity === 'critical') return 'error';
      if (row.severity === 'warning') return 'warning';
      return 'success';
    },
    cellRenderer: (params: ICellRendererParams) => {
      const row = params.data as NetworkIncident;
      // Map severity to Badge variants
      const severityToVariant: Record<string, BadgeVariant> = {
        'critical': 'critical',
        'warning': 'highPriority',
        'info': 'standard'
      };
      
      // Use the Badge component with the appropriate variant
      return <Badge variant={severityToVariant[row.severity]}>{row.severity.charAt(0).toUpperCase() + row.severity.slice(1)}</Badge>;
    }
  },
  {
    field: 'message',
    title: 'Incident',
    width: 200,
    cellRenderer: (params: ICellRendererParams) => {
      const row = params.data as NetworkIncident;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-neutral-900 dark:text-neutral-50">{row.message}</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{row.component}</span>
        </div>
      );
    }
  },
  {
    field: 'status',
    title: 'Status',
    width: 120,
  },
  {
    field: 'timestamp',
    title: 'Started',
    width: 120,
  },
  {
    field: 'duration',
    title: 'Duration',
    width: 100,
    cellRenderer: (params: ICellRendererParams) => {
      const row = params.data as NetworkIncident;
      const durationInMinutes = Math.floor((new Date().getTime() - new Date(row.timestamp).getTime()) / (1000 * 60));
      let colorClass = 'text-neutral-600 dark:text-neutral-400';
      
      if (durationInMinutes > 60) {
        colorClass = 'text-red-600 dark:text-red-400';
      } else if (durationInMinutes > 30) {
        colorClass = 'text-amber-700 dark:text-amber-500';
      }
      
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      const displayDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      
      return <span className={`font-medium ${colorClass}`}>{displayDuration}</span>;
    }
  }
];

export const NetworkIncidents: React.FC = () => {
  return (
    <div className="bg-white dark:bg-primary-800 shadow-md rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="text-amber-700 dark:text-amber-700 mr-2">
            <WarningIcon />
          </div>
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Network Incidents</h6>
        </div>
        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg transition-colors">
          View All
        </button>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Active and recent network infrastructure incidents
      </p>
      <div className="w-full overflow-x-auto">
        <AGDataTable 
          columns={networkIncidentColumns} 
          data={networkIncidents} 
          mode="drilldown" 
          maxRows={5}
          heightVariant="comfortable"
          width="100%"
        />
      </div>
    </div>
  );
}; 