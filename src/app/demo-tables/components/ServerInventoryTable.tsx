'use client';

import React, { useState } from 'react';
import { TableView, ColumnDef, DetailLevel } from '../../../design-system/tabularData';
import Badge, { BadgeVariant } from '../../../design-system/components/feedback/Badge';
import { ServerRecord, sampleData } from './mockData';

// Column definitions
const columns: ColumnDef<ServerRecord>[] = [
  {
    id: 'id',
    header: 'Server ID',
    accessorKey: 'id',
    width: 120,
    sortable: true,
  },
  {
    id: 'serverModel',
    header: 'Server Model',
    accessorKey: 'serverModel',
    width: 200,
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    width: 150,
    sortable: true,
    cell: (value) => {
      // Map status values to proper display text
      const statusDisplayMap: Record<string, string> = {
        planned: 'Planned',
        ordered: 'Ordered',
        manufacturing: 'Manufacturing',
        qualityTesting: 'QA Testing',
        readyToShip: 'Ready to Ship',
        inTransit: 'In Transit',
        delivered: 'Delivered',
        installing: 'Installing',
        active: 'Active',
        delayed: 'Delayed',
      };
      
      const displayText = statusDisplayMap[value as string] || value;
      
      return (
        <Badge variant={value as BadgeVariant}>
          {String(displayText)}
        </Badge>
      );
    },
  },
  {
    id: 'location',
    header: 'Location',
    accessorKey: 'location',
    width: 180,
    sortable: true,
  },
  {
    id: 'orderDate',
    header: 'Order Date',
    accessorKey: 'orderDate',
    width: 120,
    sortable: true,
  },
  {
    id: 'expectedDelivery',
    header: 'Expected Delivery',
    accessorKey: 'expectedDelivery',
    width: 140,
    sortable: true,
  },
  {
    id: 'priority',
    header: 'Priority',
    accessorKey: 'priority',
    width: 100,
    sortable: true,
    cell: (value) => {
      const priorityMap: Record<string, BadgeVariant> = {
        critical: 'critical',
        high: 'highPriority',
        standard: 'standard',
      };
      
      const variant = priorityMap[value as string] || 'standard';
      
      return (
        <Badge variant={variant}>
          {String(value)}
        </Badge>
      );
    },
  },
  {
    id: 'quantity',
    header: 'Quantity',
    accessorKey: 'quantity',
    width: 100,
    sortable: true,
  },
  {
    id: 'cost',
    header: 'Cost',
    accessorKey: 'cost',
    width: 120,
    sortable: true,
    cell: (value) => `$${(value as number).toLocaleString()}`,
  },
  {
    id: 'supplier',
    header: 'Supplier',
    accessorKey: 'supplier',
    width: 160,
    sortable: true,
  },
  {
    id: 'warrantyExpiry',
    header: 'Warranty Expiry',
    accessorKey: 'warrantyExpiry',
    width: 130,
    sortable: true,
  },
  {
    id: 'cpuCores',
    header: 'CPU Cores',
    accessorKey: 'cpuCores',
    width: 100,
    sortable: true,
    cell: (value) => `${value} cores`,
  },
  {
    id: 'ramSize',
    header: 'RAM Size',
    accessorKey: 'ramSize',
    width: 100,
    sortable: true,
  },
  {
    id: 'storageSize',
    header: 'Storage Size',
    accessorKey: 'storageSize',
    width: 120,
    sortable: true,
  },
  {
    id: 'powerConsumption',
    header: 'Power (W)',
    accessorKey: 'powerConsumption',
    width: 100,
    sortable: true,
    cell: (value) => `${value}W`,
  },
  {
    id: 'rackUnit',
    header: 'Rack Unit',
    accessorKey: 'rackUnit',
    width: 110,
    sortable: true,
  },
  {
    id: 'serviceLevel',
    header: 'Service Level',
    accessorKey: 'serviceLevel',
    width: 120,
    sortable: true,
    cell: (value) => {
      const serviceLevelMap: Record<string, BadgeVariant> = {
        Basic: 'standard',
        Standard: 'ordered',
        Premium: 'highPriority',
        Enterprise: 'critical',
      };
      
      const variant = serviceLevelMap[value as string] || 'standard';
      
      return (
        <Badge variant={variant}>
          {String(value)}
        </Badge>
      );
    },
  },
  {
    id: 'lastMaintenance',
    header: 'Last Maintenance',
    accessorKey: 'lastMaintenance',
    width: 140,
    sortable: true,
  },
  {
    id: 'nextMaintenance',
    header: 'Next Maintenance',
    accessorKey: 'nextMaintenance',
    width: 140,
    sortable: true,
  },
];

interface ServerInventoryTableProps {
  height?: number;
}

export default function ServerInventoryTable({ height = 500 }: ServerInventoryTableProps) {
  const [mode, setMode] = useState<DetailLevel>('summary');

  return (
    <TableView
      data={sampleData}
      columns={columns}
      mode={mode}
      onModeChange={setMode}
      title="Server Inventory Management"
      tableId="server-inventory-interactive"
      height={height}
    />
  );
} 