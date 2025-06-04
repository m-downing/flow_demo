'use client';

import React, { useState } from 'react';
import { ListView, DetailLevel } from '@/design-system/tabularData';
import Badge, { BadgeVariant } from '@/design-system/components/feedback/Badge';
import { ServerRecord, sampleData } from './mockData';

// Custom render function for server items
const renderServerItem = (item: Record<string, unknown>, index: number): React.ReactNode => {
  const server = item as ServerRecord;
  
  // Map status values to badge variants
  const statusMapping: Record<string, { variant: BadgeVariant; display: string }> = {
    planned: { variant: 'forecast', display: 'Forecast' },
    ordered: { variant: 'purchaseReq', display: 'Purchase Req.' },
    manufacturing: { variant: 'integrator', display: 'Integrator' },
    qualityTesting: { variant: 'sop', display: 'S&OP' },
    readyToShip: { variant: 'purchaseOrder', display: 'Purchase Order' },
    inTransit: { variant: 'networkBuild', display: 'Network Build' },
    delivered: { variant: 'logicalBuild', display: 'Logical Build' },
    installing: { variant: 'completed', display: 'Completed' },
    active: { variant: 'completed', display: 'Completed' },
    delayed: { variant: 'unassigned2', display: 'Unassigned 2' },
  };

  const priorityMapping: Record<string, BadgeVariant> = {
    critical: 'critical',
    high: 'highPriority',
    standard: 'standard',
  };

  const serviceLevelMapping: Record<string, BadgeVariant> = {
    Basic: 'standard',
    Standard: 'purchaseReq',
    Premium: 'highPriority',
    Enterprise: 'critical',
  };

  const statusInfo = statusMapping[server.status] || { variant: 'unassigned1', display: server.status };
  const priorityVariant = priorityMapping[server.priority] || 'standard';
  const serviceLevelVariant = serviceLevelMapping[server.serviceLevel] || 'standard';

  return (
    <div key={`server-${server.id}-${index}`} className="p-6 space-y-4">
      {/* Header with server model and status */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {server.serverModel}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Server ID: {server.id}
          </p>
        </div>
        <Badge variant={statusInfo.variant}>
          {statusInfo.display}
        </Badge>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Location</p>
          <p className="text-sm text-neutral-900 dark:text-neutral-100">{server.location}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Priority</p>
          <Badge variant={priorityVariant} size="small">
            {server.priority}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Cost</p>
          <p className="text-sm text-neutral-900 dark:text-neutral-100">${server.cost.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Quantity</p>
          <p className="text-sm text-neutral-900 dark:text-neutral-100">{server.quantity}</p>
        </div>
      </div>

      {/* Additional details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="space-y-2">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Specifications</p>
          <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
            <p>{server.cpuCores} cores</p>
            <p>{server.ramSize} RAM</p>
            <p>{server.storageSize}</p>
            <p>{server.powerConsumption}W</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Dates</p>
          <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
            <p>Ordered: {server.orderDate}</p>
            <p>Expected: {server.expectedDelivery}</p>
            <p>Warranty: {server.warrantyExpiry}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Service</p>
          <div className="space-y-1">
            <Badge variant={serviceLevelVariant} size="small">
              {server.serviceLevel}
            </Badge>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{server.supplier}</p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">Rack: {server.rackUnit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServerInventoryListProps {
  height?: number;
  data?: ServerRecord[];
}

export default function ServerInventoryList({ height = 500, data = sampleData }: ServerInventoryListProps) {
  const [mode, setMode] = useState<DetailLevel>('summary');

  return (
    <ListView
      data={data}
      mode={mode}
      onModeChange={setMode}
      renderItem={renderServerItem}
      title="Server Inventory List"
      height={height}
    />
  );
} 