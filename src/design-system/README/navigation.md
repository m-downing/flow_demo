# Navigation Components

Navigation components help users find and filter content, providing intuitive ways to interact with data and interface elements.

## 🔍 FilterBar

A comprehensive filtering component that allows users to search, filter, and sort data with multiple criteria.

### Import

```tsx
import { FilterBar } from '@your-org/design-system';
```

### Props

```tsx
interface FilterBarProps {
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Current search value */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Available filter options */
  filters?: FilterOption[];
  /** Active filters */
  activeFilters?: Record<string, any>;
  /** Filter change handler */
  onFilterChange?: (filters: Record<string, any>) => void;
  /** Sort options */
  sortOptions?: SortOption[];
  /** Current sort configuration */
  currentSort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  /** Sort change handler */
  onSortChange?: (sort: { field: string; direction: 'asc' | 'desc' }) => void;
  /** Whether to show clear all filters button */
  showClearFilters?: boolean;
  /** Additional actions */
  actions?: React.ReactNode;
  /** Custom styling */
  className?: string;
}

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface SortOption {
  field: string;
  label: string;
}
```

### Usage Examples

#### Basic Search Bar

```tsx
const [searchValue, setSearchValue] = useState('');

<FilterBar 
  searchPlaceholder="Search products..."
  searchValue={searchValue}
  onSearchChange={setSearchValue}
/>
```

#### With Filter Options

```tsx
const filterOptions = [
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'books', label: 'Books' }
    ]
  },
  {
    id: 'status',
    label: 'Status',
    type: 'multiselect',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ]
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'number',
    placeholder: 'Enter price...'
  },
  {
    id: 'createdAt',
    label: 'Created Date',
    type: 'daterange'
  }
];

const [activeFilters, setActiveFilters] = useState({});

<FilterBar 
  searchPlaceholder="Search items..."
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  filters={filterOptions}
  activeFilters={activeFilters}
  onFilterChange={setActiveFilters}
  showClearFilters={true}
/>
```

#### With Sorting

```tsx
const sortOptions = [
  { field: 'name', label: 'Name' },
  { field: 'price', label: 'Price' },
  { field: 'createdAt', label: 'Date Created' },
  { field: 'updatedAt', label: 'Last Modified' }
];

const [currentSort, setCurrentSort] = useState({
  field: 'name',
  direction: 'asc'
});

<FilterBar 
  searchPlaceholder="Search and filter..."
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  filters={filterOptions}
  activeFilters={activeFilters}
  onFilterChange={setActiveFilters}
  sortOptions={sortOptions}
  currentSort={currentSort}
  onSortChange={setCurrentSort}
/>
```

#### With Custom Actions

```tsx
<FilterBar 
  searchPlaceholder="Search users..."
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  filters={userFilters}
  activeFilters={activeFilters}
  onFilterChange={setActiveFilters}
  actions={
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        Export
      </Button>
      <Button variant="primary" size="sm">
        Add User
      </Button>
    </div>
  }
/>
```

#### Complete Example

```tsx
function ProductFilterBar() {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [currentSort, setCurrentSort] = useState({
    field: 'name',
    direction: 'asc'
  });

  const filterOptions = [
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: categories.map(cat => ({ 
        value: cat.id, 
        label: cat.name 
      }))
    },
    {
      id: 'status',
      label: 'Status',
      type: 'multiselect',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'draft', label: 'Draft' },
        { value: 'archived', label: 'Archived' }
      ]
    },
    {
      id: 'price',
      label: 'Price Range',
      type: 'number'
    },
    {
      id: 'dateCreated',
      label: 'Date Created',
      type: 'daterange'
    }
  ];

  const sortOptions = [
    { field: 'name', label: 'Product Name' },
    { field: 'price', label: 'Price' },
    { field: 'category', label: 'Category' },
    { field: 'createdAt', label: 'Date Created' }
  ];

  const handleClearFilters = () => {
    setSearchValue('');
    setActiveFilters({});
    setCurrentSort({ field: 'name', direction: 'asc' });
  };

  return (
    <FilterBar 
      searchPlaceholder="Search products by name or SKU..."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      filters={filterOptions}
      activeFilters={activeFilters}
      onFilterChange={setActiveFilters}
      sortOptions={sortOptions}
      currentSort={currentSort}
      onSortChange={setCurrentSort}
      showClearFilters={Object.keys(activeFilters).length > 0 || searchValue}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" size="sm">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      }
    />
  );
}
```

---

## 🔄 TableToggle

A toggle component for switching between different table views or display modes.

### Import

```tsx
import { TableToggle } from '@your-org/design-system';
```

### Props

```tsx
interface TableToggleProps {
  /** Toggle options */
  options: ToggleOption[];
  /** Currently selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Toggle size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether toggle is disabled */
  disabled?: boolean;
  /** Custom styling */
  className?: string;
  /** Toggle orientation */
  orientation?: 'horizontal' | 'vertical';
}

interface ToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: {
    text: string;
    variant: 'primary' | 'success' | 'warning' | 'error';
  };
}
```

### Usage Examples

#### Basic Toggle

```tsx
const [viewMode, setViewMode] = useState('table');

const viewOptions = [
  { value: 'table', label: 'Table View' },
  { value: 'grid', label: 'Grid View' },
  { value: 'list', label: 'List View' }
];

<TableToggle 
  options={viewOptions}
  value={viewMode}
  onChange={setViewMode}
/>
```

#### With Icons

```tsx
import { 
  TableCellsIcon, 
  Squares2X2Icon, 
  ListBulletIcon 
} from '@heroicons/react/24/outline';

const viewOptionsWithIcons = [
  { 
    value: 'table', 
    label: 'Table', 
    icon: <TableCellsIcon className="w-4 h-4" />
  },
  { 
    value: 'grid', 
    label: 'Grid', 
    icon: <Squares2X2Icon className="w-4 h-4" />
  },
  { 
    value: 'list', 
    label: 'List', 
    icon: <ListBulletIcon className="w-4 h-4" />
  }
];

<TableToggle 
  options={viewOptionsWithIcons}
  value={viewMode}
  onChange={setViewMode}
  size="md"
/>
```

#### With Badges

```tsx
const statusOptions = [
  { 
    value: 'all', 
    label: 'All Items',
    badge: { text: '245', variant: 'primary' }
  },
  { 
    value: 'active', 
    label: 'Active',
    badge: { text: '198', variant: 'success' }
  },
  { 
    value: 'pending', 
    label: 'Pending',
    badge: { text: '23', variant: 'warning' }
  },
  { 
    value: 'inactive', 
    label: 'Inactive',
    badge: { text: '24', variant: 'error' }
  }
];

<TableToggle 
  options={statusOptions}
  value={selectedStatus}
  onChange={setSelectedStatus}
/>
```

#### Different Sizes

```tsx
<div className="space-y-4">
  <TableToggle 
    options={viewOptions}
    value={viewMode}
    onChange={setViewMode}
    size="sm"
  />
  
  <TableToggle 
    options={viewOptions}
    value={viewMode}
    onChange={setViewMode}
    size="md"
  />
  
  <TableToggle 
    options={viewOptions}
    value={viewMode}
    onChange={setViewMode}
    size="lg"
  />
</div>
```

#### Vertical Orientation

```tsx
<TableToggle 
  options={navigationOptions}
  value={selectedNav}
  onChange={setSelectedNav}
  orientation="vertical"
  className="w-48"
/>
```

#### With Disabled Options

```tsx
const toggleOptions = [
  { value: 'option1', label: 'Available Option' },
  { value: 'option2', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Another Option' }
];

<TableToggle 
  options={toggleOptions}
  value={selected}
  onChange={setSelected}
/>
```

## 🎯 Navigation Patterns

### Data Table with Filtering and View Toggle

```tsx
function DataTableWithNavigation() {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [viewMode, setViewMode] = useState('table');
  const [statusFilter, setStatusFilter] = useState('all');

  const filterOptions = [
    {
      id: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' }
      ]
    },
    {
      id: 'role',
      label: 'Role',
      type: 'multiselect',
      options: [
        { value: 'manager', label: 'Manager' },
        { value: 'developer', label: 'Developer' },
        { value: 'designer', label: 'Designer' }
      ]
    }
  ];

  const viewOptions = [
    { 
      value: 'table', 
      label: 'Table', 
      icon: <TableCellsIcon className="w-4 h-4" />
    },
    { 
      value: 'grid', 
      label: 'Grid', 
      icon: <Squares2X2Icon className="w-4 h-4" />
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Users', badge: { text: '156', variant: 'primary' }},
    { value: 'active', label: 'Active', badge: { text: '142', variant: 'success' }},
    { value: 'inactive', label: 'Inactive', badge: { text: '14', variant: 'error' }}
  ];

  return (
    <div className="space-y-4">
      {/* Main filter bar */}
      <FilterBar 
        searchPlaceholder="Search users..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={filterOptions}
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        actions={
          <div className="flex gap-2">
            <TableToggle 
              options={viewOptions}
              value={viewMode}
              onChange={setViewMode}
              size="sm"
            />
            <Button variant="primary" size="sm">
              Add User
            </Button>
          </div>
        }
      />

      {/* Status filter */}
      <TableToggle 
        options={statusOptions}
        value={statusFilter}
        onChange={setStatusFilter}
      />

      {/* Data display based on view mode */}
      {viewMode === 'table' ? (
        <DataTable data={filteredData} />
      ) : (
        <DataGrid data={filteredData} />
      )}
    </div>
  );
}
```

### Dashboard Navigation

```tsx
function DashboardNavigation() {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');
  const [dataSource, setDataSource] = useState('all');

  const timeRangeOptions = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const chartTypeOptions = [
    { 
      value: 'line', 
      label: 'Line Chart',
      icon: <ChartLineIcon className="w-4 h-4" />
    },
    { 
      value: 'bar', 
      label: 'Bar Chart',
      icon: <ChartBarIcon className="w-4 h-4" />
    },
    { 
      value: 'pie', 
      label: 'Pie Chart',
      icon: <ChartPieIcon className="w-4 h-4" />
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Time Range</label>
          <TableToggle 
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            size="sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Chart Type</label>
          <TableToggle 
            options={chartTypeOptions}
            value={chartType}
            onChange={setChartType}
            size="sm"
          />
        </div>

        <div className="ml-auto">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## ♿ Accessibility

Navigation components include comprehensive accessibility features:

### FilterBar
- **Keyboard Navigation**: Full keyboard support for all controls
- **ARIA Labels**: Descriptive labels for screen readers
- **Focus Management**: Proper focus handling through filter controls
- **Form Semantics**: Proper form and fieldset structures

### TableToggle
- **Radio Group Semantics**: Uses proper radio group structure
- **Keyboard Navigation**: Arrow key navigation between options
- **ARIA States**: Proper selected and disabled states
- **Focus Indicators**: Clear focus visualization

```tsx
// Accessible navigation example
<div role="toolbar" aria-label="Data filtering and view controls">
  <FilterBar 
    searchPlaceholder="Search users"
    aria-label="User search and filtering"
    searchValue={searchValue}
    onSearchChange={setSearchValue}
  />
  
  <TableToggle 
    options={viewOptions}
    value={viewMode}
    onChange={setViewMode}
    aria-label="Choose view mode"
  />
</div>
```

## 🎨 Theming

Navigation components automatically adapt to the current theme:
- Filter inputs and dropdowns respect theme colors
- Toggle buttons use theme-appropriate backgrounds and borders
- Focus states adapt to theme context
- Icons and text maintain proper contrast

## 🔧 Customization

Navigation components can be styled while maintaining functionality:

```tsx
// Custom styled filter bar
<FilterBar 
  searchPlaceholder="Custom search..."
  className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl"
  searchValue={searchValue}
  onSearchChange={setSearchValue}
/>

// Custom styled toggle
<TableToggle 
  options={options}
  value={selected}
  onChange={setSelected}
  className="bg-white shadow-lg rounded-full p-1"
  size="lg"
/>

// Custom filter styling
<FilterBar 
  searchPlaceholder="Search..."
  filters={[
    {
      id: 'custom',
      label: 'Custom Filter',
      type: 'select',
      options: customOptions
    }
  ]}
  className="border-2 border-primary-200"
/>
``` 