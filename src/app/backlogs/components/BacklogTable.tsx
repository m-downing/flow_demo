import React from 'react';
import { AGDataTable, AGColumnDef } from '@/design-system/DataTable';
import { Badge } from '@/design-system';
import type { BadgeVariant } from '@/design-system/components/feedback/Badge';

// Define interfaces for backlogs data
export interface BacklogItem {
  id: number;
  dataCenter: string;
  rackType: string;
  equipmentType: string;
  region: string;
  quantity: number;
  requestDate: string;
  expectedDelivery: string;
  delay: number;
  status: 'orderPlaced' | 'manufacturing' | 'shipping' | 'customs' | 'localDelivery' | 'blocked';
  priority: 'critical' | 'high' | 'medium' | 'low';
  blockerReason?: string;
}

interface BacklogTableProps {
  data: BacklogItem[];
  height?: number;
}

// Column definitions for backlog table
const backlogColumns: AGColumnDef<BacklogItem>[] = [
  {
    field: 'priority',
    title: 'Priority',
    width: 100,
    statusAccessor: (row: BacklogItem) => {
      if (row.priority === 'critical') return 'error';
      if (row.priority === 'high') return 'warning';
      if (row.priority === 'medium') return 'success';
      return 'success';
    },
    cellRenderer: (row: BacklogItem) => {
      // Map priorities to Badge variants
      const priorityToVariant: Record<string, BadgeVariant> = {
        'critical': 'critical',
        'high': 'highPriority',
        'medium': 'standard',
        'low': 'standard'
      };
      
      return <Badge variant={priorityToVariant[row.priority]}>{row.priority}</Badge>;
    }
  },
  {
    field: 'dataCenter',
    title: 'Data Center',
    width: 140,
    cellRenderer: (row: BacklogItem) => (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-900 dark:text-neutral-50">{row.dataCenter}</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">{row.region}</span>
      </div>
    )
  },
  {
    field: 'rackType',
    title: 'Equipment',
    width: 160,
    cellRenderer: (row: BacklogItem) => (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-900 dark:text-neutral-50">{row.rackType}</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">{row.equipmentType}</span>
      </div>
    )
  },
  {
    field: 'quantity',
    title: 'Qty',
    width: 70,
  },
  {
    field: 'status',
    title: 'Status',
    width: 160,
    cellRenderer: (row: BacklogItem) => {
      const statusText: Record<BacklogItem['status'], string> = {
        orderPlaced: 'Order Placed',
        manufacturing: 'Manufacturing',
        shipping: 'Shipping',
        customs: 'Customs',
        localDelivery: 'Local Delivery',
        blocked: 'Blocked'
      };
      
      const statusIcon = row.status === 'blocked' 
        ? (
          <svg className="w-4 h-4 text-red-500 dark:text-red-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
        : (
          <svg className="w-4 h-4 text-green-500 dark:text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      
      const statusColorClass = row.status === 'blocked' ? 'text-red-500 dark:text-red-400' : 'text-neutral-900 dark:text-neutral-50';
      
      return (
        <div className={`flex items-center ${statusColorClass}`}>
          {statusIcon}
          <span>{statusText[row.status]}</span>
        </div>
      );
    }
  },
  {
    field: 'delay',
    title: 'Delay (days)',
    width: 120,
    cellRenderer: (row: BacklogItem) => {
      let colorClass = 'text-neutral-600 dark:text-neutral-400';
      if (row.delay > 30) colorClass = 'text-red-500 dark:text-red-400';
      else if (row.delay > 15) colorClass = 'text-yellow-500 dark:text-yellow-400';
      else if (row.delay > 0) colorClass = 'text-blue-500 dark:text-blue-400';
      
      return <span className={`font-medium ${colorClass}`}>{row.delay > 0 ? `+${row.delay}` : '0'}</span>;
    }
  },
  {
    field: 'expectedDelivery',
    title: 'Expected Delivery',
    width: 150,
  }
];

const BacklogTable: React.FC<BacklogTableProps> = ({ data, height = 400 }) => {
  return (
    <div className="w-full overflow-x-auto">
      <AGDataTable 
        columns={backlogColumns} 
        data={data} 
        mode="deepDive" 
        width="100%"
        height={height}
      />
    </div>
  );
};

export default BacklogTable; 