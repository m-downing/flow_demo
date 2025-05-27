# DataTable Components

Enterprise-grade data table components built on AG Grid with theme support and advanced features.

## AGDataTable

Primary data table component with flexible display modes and comprehensive feature set.

```tsx
import { AGDataTable } from '@/design-system/DataTable';

<AGDataTable 
  columns={columns}
  data={data}
  mode="summary"
  heightVariant="comfortable"
  pagination={true}
/>
```

## Features

### Display Modes
- **Summary**: Condensed view with priority columns and status indicators
- **Drilldown**: Intermediate detail level with enhanced status visualization
- **Deep Dive**: Full detail view with comprehensive data display

### Height Variants
- **Compact**: Minimal row height for dense data
- **Comfortable**: Balanced spacing for readability
- **Spacious**: Maximum spacing for accessibility
- **Auto**: Automatically sizes to content
- **Fill**: Fills available container height

### Status Indicators
Visual status indicators that adapt to display mode:
- Summary: Left border status indicators
- Drilldown: Reduced border indicators
- Deep Dive: Circular status dots

## Column Configuration

```tsx
const columns: AGColumnDef[] = [
  {
    field: 'name',
    title: 'Name',
    summaryPriority: 1, // Higher priority for summary mode
    statusAccessor: (row) => row.status,
    width: 200,
    pinned: 'left'
  },
  {
    field: 'value',
    title: 'Value',
    valueFormatter: (params) => `$${params.value}`,
    filter: true,
    sortable: true
  }
];
```

## Advanced Features

- **Theme Integration**: Automatic light/dark mode support
- **Pagination**: Built-in pagination with configurable page sizes
- **Row Selection**: Single or multiple row selection
- **Filtering**: Column-level filtering capabilities
- **Sorting**: Multi-column sorting support
- **Pinning**: Pin columns to left or right
- **Resizing**: Resizable columns

## Specialized Tables

### RackLogisticsTable
Pre-configured table for rack logistics data with built-in filtering and status management.

```tsx
import { RackLogisticsTable } from '@/design-system/DataTable';

<RackLogisticsTable />
```

## Usage Patterns

```tsx
// Basic table
<AGDataTable 
  columns={columns}
  data={data}
/>

// Table with selection
<AGDataTable 
  columns={columns}
  data={data}
  rowSelection="multiple"
  onSelectionChanged={handleSelection}
/>

// Paginated table
<AGDataTable 
  columns={columns}
  data={data}
  pagination={true}
  paginationPageSize={25}
/>
```

## Accessibility

- Full keyboard navigation support
- Screen reader compatibility
- ARIA attributes for table structure
- Focus management for interactive elements
- High contrast theme support

## Performance

- Virtual scrolling for large datasets
- Efficient rendering with AG Grid
- Optimized column visibility based on mode
- Lazy loading support for pagination 