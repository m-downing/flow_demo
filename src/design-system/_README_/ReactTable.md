# ReactTable Component

A robust and versatile custom React table component for apps migrating away from AG-Grid. Built with the same design tokens as the AG-Grid DataTable for consistent styling and behavior.

## Overview

ReactTable provides a native React table implementation with features like sorting, pagination, row selection, column resizing, and theme support. It's designed to be a drop-in replacement for AG-Grid tables while maintaining the same visual consistency.

## Basic Usage

```tsx
import { ReactTable, ReactColumnDef } from '@/design-system/DataTable';

const columns: ReactColumnDef<DataType>[] = [
  {
    field: 'id',
    title: 'ID',
    width: 80,
    summaryPriority: 1
  },
  {
    field: 'name',
    title: 'Name',
    summaryPriority: 2
  },
  {
    field: 'status',
    title: 'Status',
    statusAccessor: (row) => row.status,
    summaryPriority: 3
  }
];

<ReactTable 
  columns={columns}
  data={data}
  mode="summary"
  pagination={true}
/>
```

## Column Configuration

### ReactColumnDef Interface

```tsx
interface ReactColumnDef<T> {
  field: string;                    // Data field key
  title: string;                    // Column header text
  statusAccessor?: (row: T) => 'success' | 'warning' | 'error';
  summaryPriority?: number;         // Priority for summary mode (lower = higher priority)
  cellRenderer?: (value: unknown, row: T, index: number) => React.ReactNode;
  width?: number | string;          // Column width
  minWidth?: number;                // Minimum column width
  maxWidth?: number;                // Maximum column width
  valueFormatter?: (value: unknown) => string;
  sortable?: boolean;               // Enable/disable sorting (default: true)
  resizable?: boolean;              // Enable/disable resizing
  pinned?: 'left' | 'right';        // Pin column to side
  hide?: boolean;                   // Hide column
  align?: 'left' | 'center' | 'right'; // Text alignment
}
```

### Status Indicators

Use `statusAccessor` to add visual status indicators:

```tsx
const columns: ReactColumnDef<ServerData>[] = [
  {
    field: 'serverName',
    title: 'Server',
    statusAccessor: (row) => row.health, // 'success' | 'warning' | 'error'
    summaryPriority: 1
  },
  {
    field: 'utilization',
    title: 'CPU Usage',
    statusAccessor: (row) => 
      row.utilization > 90 ? 'error' : 
      row.utilization > 75 ? 'warning' : 'success',
    valueFormatter: (value) => `${value}%`
  }
];
```

### Custom Cell Renderers

Create custom cell content with `cellRenderer`:

```tsx
const columns: ReactColumnDef<UserData>[] = [
  {
    field: 'avatar',
    title: 'User',
    cellRenderer: (value, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src={row.avatar} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
        <span>{row.name}</span>
      </div>
    )
  }
];
```

## Table Modes

ReactTable supports three display modes that control column visibility:

### Summary Mode (default)
Shows only high-priority columns based on `summaryPriority`:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  mode="summary"
  maxSummaryColumns={5}
/>
```

### Drilldown Mode
Shows more columns for detailed analysis:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  mode="drilldown"
/>
```

### Deep Dive Mode
Shows all available columns:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  mode="deepDive"
/>
```

## Height Variants

Control table height using predefined variants:

```tsx
// Using height variants
<ReactTable 
  columns={columns}
  data={data}
  heightVariant="compact"    // ~6-7 rows visible
/>

<ReactTable 
  columns={columns}
  data={data}
  heightVariant="comfortable" // ~8-9 rows visible
/>

<ReactTable 
  columns={columns}
  data={data}
  heightVariant="spacious"   // ~11-12 rows visible
/>

// Custom height
<ReactTable 
  columns={columns}
  data={data}
  height={600}
/>
```

## Pagination

Built-in pagination with customizable page sizes:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  pagination={true}
  paginationPageSize={25}
/>
```

## Row Selection

Support for single and multiple row selection:

```tsx
const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

<ReactTable 
  columns={columns}
  data={data}
  rowSelection="multiple"
  selectedRows={selectedRows}
  onSelectionChanged={setSelectedRows}
/>
```

## Sorting

Built-in sorting with visual indicators:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  sortable={true} // Global sorting toggle
/>

// Per-column sorting control
const columns: ReactColumnDef<DataType>[] = [
  {
    field: 'name',
    title: 'Name',
    sortable: true
  },
  {
    field: 'id',
    title: 'ID',
    sortable: false // Disable sorting for this column
  }
];
```

## Column Resizing

Enable interactive column resizing:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  resizable={true}
/>
```

## Event Handlers

Handle user interactions:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  onRowClick={(row, index) => {
    console.log('Row clicked:', row);
  }}
  onSelectionChanged={(selectedRows) => {
    console.log('Selection changed:', selectedRows);
  }}
/>
```

## Styling Options

Customize table appearance:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  striped={true}        // Zebra striping
  hoverable={true}      // Row hover effects
  className="custom-table"
/>
```

## Loading and Empty States

Handle loading and empty data states:

```tsx
<ReactTable 
  columns={columns}
  data={data}
  loading={isLoading}
  emptyMessage="No data available"
/>
```

## Theme Support

ReactTable automatically adapts to light/dark themes using the same design tokens as AG-Grid DataTable:

- Consistent colors and typography
- Theme-appropriate borders and backgrounds
- Matching hover and selection states

## Complete Example

```tsx
import React, { useState } from 'react';
import { ReactTable, ReactColumnDef } from '@/design-system/DataTable';

interface ServerData {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  utilization: number;
  location: string;
  lastUpdate: string;
}

const ServerTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<ServerData[]>([]);
  
  const columns: ReactColumnDef<ServerData>[] = [
    {
      field: 'name',
      title: 'Server Name',
      statusAccessor: (row) => row.status,
      summaryPriority: 1,
      width: 200
    },
    {
      field: 'utilization',
      title: 'CPU Usage',
      summaryPriority: 2,
      statusAccessor: (row) => 
        row.utilization > 90 ? 'error' : 
        row.utilization > 75 ? 'warning' : 'success',
      valueFormatter: (value) => `${value}%`,
      align: 'right'
    },
    {
      field: 'location',
      title: 'Location',
      summaryPriority: 3
    },
    {
      field: 'lastUpdate',
      title: 'Last Update',
      valueFormatter: (value) => new Date(value as string).toLocaleString()
    }
  ];

  const data: ServerData[] = [
    {
      id: '1',
      name: 'web-server-01',
      status: 'success',
      utilization: 45,
      location: 'US-East',
      lastUpdate: '2024-01-15T10:30:00Z'
    },
    // ... more data
  ];

  return (
    <ReactTable
      columns={columns}
      data={data}
      mode="summary"
      heightVariant="comfortable"
      pagination={true}
      paginationPageSize={25}
      rowSelection="multiple"
      selectedRows={selectedRows}
      onSelectionChanged={setSelectedRows}
      onRowClick={(row) => console.log('Server selected:', row.name)}
      striped={true}
      hoverable={true}
    />
  );
};
```

## Migration from AG-Grid

ReactTable is designed to be a straightforward migration path from AG-Grid DataTable:

1. **Column Definitions**: Similar structure with `field` and `title`
2. **Status Indicators**: Same `statusAccessor` pattern
3. **Modes**: Identical `summary`, `drilldown`, and `deepDive` modes
4. **Height Variants**: Same height token system
5. **Theming**: Automatic theme support using shared design tokens

## Performance Considerations

- Optimized for datasets up to 1000 rows with pagination
- Virtual scrolling not included - use pagination for large datasets
- Column resizing uses efficient event handling
- Sorting is performed on the full dataset before pagination 