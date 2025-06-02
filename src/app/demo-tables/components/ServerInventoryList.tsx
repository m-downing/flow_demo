'use client';

import React, { useState } from 'react';
import { ListView, DetailLevel } from '@/design-system/tabularData';
import Badge, { BadgeVariant } from '@/design-system/components/feedback/Badge';
import { ServerRecord, sampleData } from './mockData';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, CubeIcon } from '@heroicons/react/24/outline';

interface ServerInventoryListProps {
  height?: number;
}

export default function ServerInventoryList({ height = 500 }: ServerInventoryListProps) {
  const [mode, setMode] = useState<DetailLevel>('summary');

  // Custom item renderer for ListView - let ListView handle container styling
  const renderListItem = (item: ServerRecord) => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="m-0 text-neutral-800 dark:text-neutral-50 font-medium">
          {item.serverModel}
        </h4>
        <span className="text-xs text-neutral-600 dark:text-neutral-300">
          {item.id}
        </span>
      </div>
      <div className="flex gap-3 items-center flex-wrap">
        <span className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" />
          {item.location}
        </span>
        <span className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          {item.expectedDelivery}
        </span>
        <span className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
          <CurrencyDollarIcon className="w-4 h-4" />
          ${item.cost.toLocaleString()}
        </span>
        <span className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
          <CubeIcon className="w-4 h-4" />
          {item.quantity} units
        </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant={item.status as BadgeVariant}>
          {item.status}
        </Badge>
        <Badge variant={item.priority === 'critical' ? 'critical' : item.priority === 'high' ? 'highPriority' : 'standard'}>
          {item.priority}
        </Badge>
        <Badge variant={item.serviceLevel === 'Enterprise' ? 'critical' : item.serviceLevel === 'Premium' ? 'highPriority' : item.serviceLevel === 'Standard' ? 'ordered' : 'standard'}>
          {item.serviceLevel}
        </Badge>
      </div>
    </div>
  );

  return (
    <ListView
      data={sampleData}
      mode={mode}
      onModeChange={setMode}
      title="Server List View"
      tableId="server-list-interactive"
      renderItem={renderListItem}
      height={height}
    />
  );
} 