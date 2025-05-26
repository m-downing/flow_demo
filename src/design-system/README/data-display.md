# Display Components

Display components are designed to present and organize information in clear, accessible formats. These components help users consume and interact with data effectively.

## 📊 DataTable

A comprehensive data table component that provides sorting, filtering, pagination, and selection functionality with a clean, responsive design.

### Import

```tsx
import { AGDataTable, AGColumnDef } from '@/design-system/DataTable';
```

### Props

```tsx
interface AGDataTableProps<T = Record<string, unknown>> {
  /** Column definitions */
  columns: AGColumnDef<T>[];
  /** Table data */
  data: T[];
  /** Table mode - affects column visibility and behavior */
  mode?: 'summary' | 'drilldown' | 'deepDive';
  /** Maximum columns to show in summary mode */
  maxSummaryColumns?: number;
  /** Maximum rows to show (enables pagination) */
  maxRows?: number;
  /** Explicit height override */
  height?: number | string;
  /** Height variant for consistent sizing */
  heightVariant?: 'compact' | 'comfortable' | 'spacious' | 'auto' | 'fill';
  /** Table width */
  width?: number | string;
  /** Row click handler */
  onRowClick?: (data: T) => void;
  /** Suppress vertical scrolling */
  suppressVerticalScroll?: boolean;
}

interface AGColumnDef<T = Record<string, unknown>> {
  /** Field identifier */
  field: string;
  /** Column header title */
  title: string;
  /** Status indicator accessor */
  statusAccessor?: (row: T) => 'success' | 'warning' | 'error';
  /** Priority for summary mode (lower = higher priority) */
  summaryPriority?: number;
  /** Custom cell renderer */
  cellRenderer?: (row: T) => React.ReactNode;
  /** Column width in pixels */
  width?: number;
  /** Value formatter function */
  valueFormatter?: (value: unknown) => string;
  /** Filter configuration (future use) */
  filter?: string;
  /** Pin column to left or right */
  pinned?: 'left' | 'right';
}
```

### Usage Examples

#### Basic Table

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const columns: AGColumnDef<User>[] = [
  {
    field: 'name',
    title: 'Name',
    summaryPriority: 1
  },
  {
    field: 'email',
    title: 'Email',
    summaryPriority: 2
  },
  {
    field: 'role',
    title: 'Role',
    summaryPriority: 3
  },
  {
    field: 'status',
    title: 'Status',
    summaryPriority: 4,
    cellRenderer: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'error'}>
        {row.status}
      </Badge>
    )
  }
];

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive' }
];

<AGDataTable 
  data={users}
  columns={columns}
  mode="summary"
/>
```

#### With Pagination

```tsx
function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <AGDataTable 
      data={users}
      columns={columns}
      mode="deepDive"
      maxRows={10}
    />
  );
}
```

#### With Row Interaction

```tsx
function InteractiveUsersTable() {
  const handleRowClick = (user: User) => {
    console.log('Selected user:', user);
    // Navigate to user detail or show modal
  };

  return (
    <AGDataTable 
      data={users}
      columns={columns}
      mode="drilldown"
      onRowClick={handleRowClick}
    />
  );
}
```

#### Table Modes

```tsx
function TableModeExample() {
  const [mode, setMode] = useState<'summary' | 'drilldown' | 'deepDive'>('summary');

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Button 
          variant={mode === 'summary' ? 'primary' : 'outline'}
          onClick={() => setMode('summary')}
        >
          Summary
        </Button>
        <Button 
          variant={mode === 'drilldown' ? 'primary' : 'outline'}
          onClick={() => setMode('drilldown')}
        >
          Drill Down
        </Button>
        <Button 
          variant={mode === 'deepDive' ? 'primary' : 'outline'}
          onClick={() => setMode('deepDive')}
        >
          Deep Dive
        </Button>
      </div>
      
      <AGDataTable 
        data={users}
        columns={columns}
        mode={mode}
        maxSummaryColumns={3}
      />
    </div>
  );
}
```

### Height Management

DataTable provides a sophisticated height management system to ensure consistent user experience across different contexts. Instead of using arbitrary height values, use the `heightVariant` prop for predictable, well-designed table sizes.

#### Available Height Variants

| Variant | Height | Visible Rows | Best For |
|---------|--------|--------------|----------|
| `compact` | 320px | ~6-7 rows | Summary cards, dashboards |
| `comfortable` | 400px | ~8-9 rows | Main content areas, standard tables |
| `spacious` | 500px | ~11-12 rows | Detail views, data analysis |
| `auto` | auto | All rows | Summary mode without pagination |
| `fill` | 100% | Variable | Tables that should fill their container |

#### Height Variant Examples

```tsx
// For dashboard summary tables
<AGDataTable 
  data={summaryData} 
  columns={columns}
  heightVariant="compact"
  mode="summary"
/>

// For main content area tables
<AGDataTable 
  data={mainData} 
  columns={columns}
  heightVariant="comfortable"
  mode="drilldown"
/>

// For detailed analysis views
<AGDataTable 
  data={detailData} 
  columns={columns}
  heightVariant="spacious"
  mode="deepDive"
/>

// Auto height (intelligent defaults)
<AGDataTable 
  data={data} 
  columns={columns}
  heightVariant="auto" // or omit for auto behavior
/>
```

#### Intelligent Auto Mode

When `heightVariant="auto"` (default), the table automatically chooses appropriate heights based on context:

- **Summary mode**: Uses `auto` height (no scrolling) unless `maxRows` is set, then uses `compact`
- **Drilldown mode**: Uses `comfortable` height  
- **DeepDive mode**: Uses `spacious` height

#### Migration from Fixed Heights

Replace restrictive fixed height props with height variants for better UX:

```tsx
// ❌ Before (restrictive - only 3-4 rows visible)
<AGDataTable height={280} />
<AGDataTable height={300} />

// ✅ After (better UX - 6-9 rows visible)
<AGDataTable heightVariant="compact" />     // ~6-7 rows visible
<AGDataTable heightVariant="comfortable" /> // ~8-9 rows visible
```

#### Custom Heights

You can still use explicit `height` prop for special cases:

```tsx
<AGDataTable height="60vh" />  // Custom responsive height
<AGDataTable height={600} />   // Specific pixel height
```

**Note**: The `height` prop takes precedence over `heightVariant` when both are provided.

### Table Densities

```tsx
<div className="space-y-6">
  <div>
    <h3 className="mb-2">Compact</h3>
    <AGDataTable 
      data={users}
      columns={columns}
      heightVariant="compact"
    />
  </div>
  
  <div>
    <h3 className="mb-2">Comfortable</h3>
    <AGDataTable 
      data={users}
      columns={columns}
      heightVariant="comfortable"
    />
  </div>
  
  <div>
    <h3 className="mb-2">Spacious</h3>
    <AGDataTable 
      data={users}
      columns={columns}
      heightVariant="spacious"
    />
  </div>
</div>
```

### Responsive Design

```tsx
const responsiveColumns: AGColumnDef<User>[] = [
  {
    field: 'name',
    title: 'User',
    width: 200,
    cellRenderer: (row) => (
      <div className="min-w-[200px]">
        <div className="font-medium">{row.name}</div>
        <div className="text-sm text-gray-500 md:hidden">{row.email}</div>
        <div className="text-sm text-gray-500 md:hidden">
          <Badge variant={row.status === 'active' ? 'success' : 'error'}>
            {row.status}
          </Badge>
        </div>
      </div>
    )
  },
  {
    field: 'email',
    title: 'Email',
    width: 200,
    // Note: Use CSS classes to hide on mobile
  },
  {
    field: 'status',
    title: 'Status',
    width: 120,
    cellRenderer: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'error'}>
        {row.status}
      </Badge>
    )
  }
];

<AGDataTable 
  data={users}
  columns={responsiveColumns}
  mode="drilldown"
  heightVariant="comfortable"
/>
```

## 📋 List Components

### SimpleList

A basic list component for displaying simple data items.

```tsx
interface SimpleListProps<T = any> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  emptyState?: React.ReactNode;
}

// Usage
<SimpleList 
  items={notifications}
  keyExtractor={(item) => item.id}
  renderItem={(notification) => (
    <div className="p-3 border-b last:border-b-0">
      <div className="font-medium">{notification.title}</div>
      <div className="text-sm text-gray-600">{notification.message}</div>
    </div>
  )}
/>
```

### DetailsList

A detailed list component with support for metadata and actions.

```tsx
interface DetailsListProps<T = any> {
  items: T[];
  renderItem: (item: T) => {
    title: React.ReactNode;
    description?: React.ReactNode;
    metadata?: React.ReactNode;
    actions?: React.ReactNode;
  };
  keyExtractor: (item: T) => string;
  className?: string;
}

// Usage
<DetailsList 
  items={projects}
  keyExtractor={(project) => project.id}
  renderItem={(project) => ({
    title: <Link href={`/projects/${project.id}`}>{project.name}</Link>,
    description: project.description,
    metadata: (
      <div className="flex gap-4 text-sm text-gray-500">
        <span>{project.team}</span>
        <span>{formatDate(project.updatedAt)}</span>
      </div>
    ),
    actions: (
      <Button size="sm" variant="outline">
        View Details
      </Button>
    )
  })}
/>
```

## ♿ Accessibility

Display components include comprehensive accessibility features:

### DataTable
- **Table Semantics**: Proper table, thead, tbody, th, and td elements
- **ARIA Labels**: Descriptive labels for interactive elements
- **Keyboard Navigation**: Full keyboard support for pagination and row interaction
- **Screen Reader Support**: Proper table structure and relationships
- **Focus Management**: Proper focus handling for clickable rows

```tsx
// Accessible table example
<AGDataTable 
  data={users}
  columns={columns}
  mode="drilldown"
  onRowClick={(user) => console.log('Selected:', user)}
/>
```

### List Components
- **List Semantics**: Proper ul/ol and li structures
- **ARIA Labels**: Descriptive labels for list purposes
- **Keyboard Navigation**: Support for arrow key navigation when applicable

## 🎨 Theming

Display components automatically adapt to the current theme:
- Table headers and borders use theme colors
- Hover and selection states adapt to theme context
- Loading and empty states maintain theme consistency
- Action buttons inherit theme styling

## 🔧 Customization

Display components support extensive customization:

```tsx
// Custom styled table with height variants
<AGDataTable 
  data={data}
  columns={columns}
  heightVariant="spacious"
  width="100%"
  mode="deepDive"
/>

// Compact table for dashboard use
<AGDataTable 
  data={summaryData}
  columns={columns}
  heightVariant="compact"
  mode="summary"
  maxSummaryColumns={4}
/>
```

## 💡 Best Practices

1. **Performance**: Use `maxRows` for large datasets to enable pagination
2. **Height Management**: Use `heightVariant` instead of fixed heights for consistent UX
3. **Mode Selection**: Choose appropriate mode based on use case:
   - `summary` for dashboard cards and quick overviews
   - `drilldown` for main content areas with moderate detail
   - `deepDive` for detailed analysis and data exploration
4. **Column Priority**: Set `summaryPriority` on columns for better summary mode display
5. **Responsive Design**: Consider mobile-first column priorities using `summaryPriority`
6. **Status Indicators**: Use `statusAccessor` for visual status feedback
7. **Custom Rendering**: Use `cellRenderer` for complex cell content like badges and actions
8. **Accessibility**: Always provide meaningful column titles and handle row interactions properly
9. **Data Loading**: Show appropriate loading states and handle errors gracefully
10. **User Feedback**: Provide clear feedback for user interactions and state changes 