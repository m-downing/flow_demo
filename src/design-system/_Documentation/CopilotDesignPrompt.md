# FLOW Design System Implementation Guide for AI Assistants

## Context
You are helping developers implement the FLOW Design System in their supply chain management applications. This design system ensures consistent UI/UX across all data infrastructure tools within the organization. When asked to update any file or component, follow these strict guidelines.

## Core Principles
1. **Never modify design tokens** - Use only existing color, spacing, and typography values
2. **Always use semantic classes** - Prefer design system classes over arbitrary values
3. **Maintain dark mode support** - Every element must work in both light and dark themes
4. **Follow established patterns** - Reference the patterns documented below

## Standard Page Layout Pattern

Every page should follow this structure:

```tsx
const PageName: React.FC = () => {
  return (
    <div className="pt-8 px-6 py-8 pb-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
              Page Title
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-200">
              Page description explaining the purpose
            </p>
          </div>
          {/* Optional: FilterBar or action buttons */}
        </div>
        
        {/* Main Content */}
        {/* Use grid layouts for content organization */}
      </div>
    </div>
  );
};
```

## Component Import Patterns

Always import from the design system barrel exports:

```tsx
// ✅ CORRECT - Import from design system
import { Button, Card, TableView, MetricCard, LineChart } from '@/design-system';
import { FilterBar } from '@/design-system/components/controls';

// ❌ INCORRECT - Direct file imports
import Button from '../../../design-system/components/primitives/Button';
```

## Grid System Usage

The design system uses a 12-column grid. Common patterns:

```tsx
// Four columns on desktop, responsive down to mobile
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

// Main content (8 cols) with sidebar (4 cols)
<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
  <div className="md:col-span-8">{/* Main content */}</div>
  <div className="md:col-span-4">{/* Sidebar */}</div>
</div>

// Equal three columns
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

// Two equal columns on larger screens
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

## Container/Card Pattern

All elevated content should use this pattern:

```tsx
// Standard container with shadow
<div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
  {/* Content */}
</div>

// Alternative for nested content
<div className="bg-neutral-50 dark:bg-neutral-900 shadow-md rounded-lg p-4">
  {/* Content */}
</div>

// Full-height containers in grids
<div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4 h-full">
  {/* Content */}
</div>
```

## Typography Standards

Use these exact classes for text elements:

```tsx
// Page titles
<h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">

// Section headers
<h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">

// Descriptions/subtitles
<p className="text-sm text-neutral-600 dark:text-neutral-200">

// Small/meta text
<p className="text-sm text-neutral-500 dark:text-neutral-200">

// Labels
<span className="text-xs text-neutral-500 dark:text-neutral-400">
```

## Color Usage

Always use semantic color classes:

```tsx
// Primary actions
className="bg-primary-600 hover:bg-primary-700 text-white"

// Success states
className="text-success-600 dark:text-success-400"

// Error/critical states
className="text-error-600 dark:text-error-400"
className="bg-error-50 dark:bg-error-900/20"

// Warning states
className="text-warning-600 dark:text-warning-400"

// Neutral backgrounds
className="bg-neutral-50 dark:bg-neutral-950"  // Page background
className="bg-white dark:bg-neutral-900"        // Card background
className="bg-neutral-100 dark:bg-neutral-700"  // Subtle background
```

## Button Patterns

```tsx
// Primary button
<button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
  Button Text
</button>

// Secondary button
<button className="bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
  Button Text
</button>
```

## Common Component Implementations

### Metric Cards Section
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  <MetricCard 
    label="Metric Name" 
    value="123" 
    delta={5.2} 
    trend="up"
    status="success" 
  />
  {/* Additional metric cards */}
</div>
```

### Data Tables
```tsx
<TableView
  data={dataArray}
  columns={[
    { id: 'column1', header: 'Column 1', sortable: true },
    { id: 'column2', header: 'Column 2', sortable: true },
  ]}
  pageSize={25}
  onRowClick={(row) => console.log('Row clicked:', row)}
/>
```

### Charts in Containers
```tsx
<div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-2">
    Chart Title
  </h6>
  <p className="text-sm text-neutral-500 dark:text-neutral-200 mb-4">
    Chart description
  </p>
  <div className="h-80">
    <LineChart 
      data={chartData} 
      dataKey={['series1', 'series2']} 
      xAxisKey="label" 
      height={320}
    />
  </div>
</div>
```

### Filter Bar Implementation
```tsx
<FilterBar
  timeRange={timeRange}
  region={region}
  priority={priority}
  onTimeRangeChange={handleTimeRangeChange}
  onRegionChange={handleRegionChange}
  onPriorityChange={handlePriorityChange}
  onMoreFiltersClick={handleMoreFiltersClick}
  showMoreFilters={true}
/>
```

## Spacing Guidelines

Use consistent spacing utilities:
- `gap-2` (8px) - Tight spacing for related items
- `gap-3` (12px) - Compact spacing
- `gap-4` (16px) - Standard spacing (default)
- `gap-6` (24px) - Comfortable spacing for distinct sections
- `mb-6` - Standard margin bottom between sections
- `p-4` - Standard padding for containers
- `px-6` - Standard horizontal padding for page layouts

## State Management Patterns

For local component state:
```tsx
const [filterValue, setFilterValue] = useState('all');

const handleFilterChange = (value: string) => {
  setFilterValue(value);
};
```

## Dark Mode Implementation

Every color must have a dark mode variant:
```tsx
// ✅ CORRECT
className="bg-white dark:bg-neutral-900"
className="text-neutral-800 dark:text-neutral-50"
className="border-neutral-200 dark:border-neutral-700"

// ❌ INCORRECT
className="bg-white"  // Missing dark variant
className="text-gray-800"  // Using non-semantic color
```

## Anti-Patterns to Avoid

1. **Never use inline styles**
   ```tsx
   // ❌ INCORRECT
   <div style={{ backgroundColor: '#f5f5f5' }}>
   
   // ✅ CORRECT
   <div className="bg-neutral-100 dark:bg-neutral-800">
   ```

2. **Never use arbitrary Tailwind values**
   ```tsx
   // ❌ INCORRECT
   <div className="p-[18px] text-[#333333]">
   
   // ✅ CORRECT
   <div className="p-4 text-neutral-800 dark:text-neutral-200">
   ```

3. **Never modify design system files**
   - Don't edit anything in `/design-system/`
   - Use composition to extend functionality

4. **Never hardcode colors**
   ```tsx
   // ❌ INCORRECT
   <div className="bg-blue-600">
   
   // ✅ CORRECT
   <div className="bg-primary-600">
   ```

## Implementation Checklist

When updating a component to use the design system:
- [ ] Replace all hardcoded colors with semantic classes
- [ ] Add dark mode variants to all color classes
- [ ] Use standard spacing values (2, 3, 4, 6, 8)
- [ ] Apply consistent typography classes
- [ ] Wrap content in proper container patterns
- [ ] Import components from design system barrel exports
- [ ] Follow the 12-column grid system
- [ ] Ensure responsive behavior with proper breakpoints
- [ ] Test in both light and dark modes

## Example Transformation

**Before:**
```tsx
<div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
  <h1 style={{ fontSize: '24px', color: '#333' }}>Dashboard</h1>
  <div style={{ marginTop: '10px' }}>
    <button style={{ backgroundColor: 'blue', color: 'white' }}>
      Click me
    </button>
  </div>
</div>
```

**After:**
```tsx
<div className="p-4 bg-neutral-50 dark:bg-neutral-900">
  <h4 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
    Dashboard
  </h4>
  <div className="mt-3">
    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
      Click me
    </button>
  </div>
</div>
```

---

**Instructions for AI Assistant Usage:**
When a developer asks you to update their code to use the design system, follow this guide strictly. Apply all patterns consistently and ensure every element supports both light and dark themes. If you're unsure about a specific pattern, refer to the examples above or suggest reviewing the demo pages in the design system repository. 