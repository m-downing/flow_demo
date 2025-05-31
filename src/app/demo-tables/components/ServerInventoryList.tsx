'use client';

import React, { useState } from 'react';
import { ListView, DetailLevel } from '@/design-system/tabularData';
import Badge, { BadgeVariant } from '@/design-system/components/feedback/Badge';
import { useTheme } from '@/app/contexts/ThemeContext';
import { colors } from '@/design-system/foundations/tokens/colors';
import { ServerRecord, sampleData } from './mockData';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, CubeIcon } from '@heroicons/react/24/outline';

interface ServerInventoryListProps {
  height?: number;
}

export default function ServerInventoryList({ height = 500 }: ServerInventoryListProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mode, setMode] = useState<DetailLevel>('summary');

  // Custom item renderer for ListView - let ListView handle container styling
  const renderListItem = (item: ServerRecord) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: isDark ? colors.neutral[50] : colors.neutral[800] }}>
          {item.serverModel}
        </h4>
        <span style={{ fontSize: '12px', color: isDark ? colors.neutral[300] : colors.neutral[600] }}>
          {item.id}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700], display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPinIcon style={{ width: '16px', height: '16px' }} />
          {item.location}
        </span>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700], display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CalendarIcon style={{ width: '16px', height: '16px' }} />
          {item.expectedDelivery}
        </span>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700], display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CurrencyDollarIcon style={{ width: '16px', height: '16px' }} />
          ${item.cost.toLocaleString()}
        </span>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700], display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CubeIcon style={{ width: '16px', height: '16px' }} />
          {item.quantity} units
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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