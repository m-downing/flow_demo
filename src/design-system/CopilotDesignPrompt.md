# FLOW Design System Migration Prompt for AI Assistant

You are helping migrate legacy React/Next.js code to use the FLOW Design System. This is an enterprise-grade component library for supply chain management applications with strict patterns and conventions.

## Core Migration Principles

1. **Replace all hardcoded styles with design tokens**
2. **Use semantic color names, not Tailwind defaults**
3. **Apply consistent spacing tokens**
4. **Ensure dark mode support on all elements**
5. **Import from design-system paths only**

## Design Token Replacements

### Spacing Tokens
Replace arbitrary spacing values with design tokens:
```
WRONG: gap-4, p-4, mb-4, mt-8, px-6
RIGHT: gap-md, p-md, mb-md, mt-xl, px-lg

Spacing scale:
- xs: 0.25rem
- sm: 0.5rem  
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem
```

### Color Tokens
Replace Tailwind default colors with semantic tokens:
```
WRONG: bg-gray-100, text-gray-800, border-gray-300
RIGHT: bg-neutral-100, text-neutral-800, border-neutral-300

WRONG: bg-blue-600, text-blue-500
RIGHT: bg-primary-600, text-primary-500

Color categories:
- primary (blue shades)
- neutral (grays)
- success (green)
- warning (orange)
- error (red)
- Also available: purple, teal, amber, yellow, brown, orange, magenta, slate
```

### Dark Mode Pattern
Always include dark mode classes:
```
WRONG: bg-white text-black
RIGHT: bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50

WRONG: bg-gray-50
RIGHT: bg-neutral-50 dark:bg-neutral-950
```

## Component Migration Patterns

### Page Structure
Every page must use PageContainer:
```tsx
// WRONG
export default function MyPage() {
  return (
    <div className="p-8">
      <h1>Title</h1>
    </div>
  );
}

// RIGHT
import { PageContainer } from '@/design-system/layout/PageContainer';

export default function MyPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50 mb-md">
        Title
      </h1>
    </PageContainer>
  );
}
```

### Card/Panel Components
Replace div containers with Card:
```tsx
// WRONG
<div className="bg-white rounded-lg shadow p-6">
  <h2>Content</h2>
</div>

// RIGHT
import Card from '@/design-system/layout/Card';

<Card title="Content" padding="6">
  {/* content */}
</Card>
```

### Tables
Replace HTML tables with TableView:
```tsx
// WRONG
<table className="w-full">
  <thead>...</thead>
  <tbody>...</tbody>
</table>

// RIGHT
import { TableView } from '@/design-system/tabularData';

<TableView
  data={data}
  columns={columns}
  mode="summary"
  height={400}
/>
```

### Buttons
Replace button elements with Button component:
```tsx
// WRONG
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>

// RIGHT
import Button from '@/design-system/components/primitives/Button';

<Button variant="primary" size="md">
  Click me
</Button>
```

### Status Indicators
Replace spans/divs with Badge:
```tsx
// WRONG
<span className="bg-green-100 text-green-800 px-2 py-1 rounded">
  Active
</span>

// RIGHT
import Badge from '@/design-system/components/feedback/Badge';

<Badge variant="active">Active</Badge>
```

### Badge Components
Use Badge for supply chain status indicators and timeline elements:

```tsx
// WRONG
<div className="bg-blue-500 text-white px-3 py-1 rounded text-xs">
  Forecast
</div>

// RIGHT
import Badge from '@/design-system/components/feedback/Badge';

// General usage
<Badge variant="forecast" size="regular">Forecast</Badge>
<Badge variant="logicalBuild" size="small">Logical Build</Badge>
<Badge variant="completed">Completed</Badge>

// Supply chain status variants available:
// forecast, sop, businessCase, purchaseReq, purchaseOrder, 
// integrator, networkBuild, logicalBuild, completed,
// unassigned1, unassigned2
// Each has an "Inverted" variant for outline style

// Priority badges:
<Badge variant="critical">CRITICAL</Badge>
<Badge variant="highPriority">HIGH</Badge>
<Badge variant="standard">STANDARD</Badge>
```

#### Gantt Chart Timeline Usage
For horizontal timeline visualizations with API-driven dynamic widths:

```tsx
// API data determines badge width based on time duration
const timelineData = useQuery(GET_PROJECT_TIMELINE);
const totalDuration = calculateTotalDuration(timelineData);

{timelineData.stages.map(stage => (
  <Badge
    key={stage.id}
    variant={stage.name as BadgeVariant} // "forecast", "logicalBuild", etc.
    style={{ 
      width: `${(stage.duration / totalDuration) * containerWidth}px`,
      minWidth: '80px' // Ensure text readability
    }}
    className="!justify-start !pl-md" // Override centering for timeline layout
  >
    {stage.displayName}
  </Badge>
))}

// For percentage-based widths
<Badge 
  variant="networkBuild"
  style={{ width: `${(phaseDuration / totalProjectTime) * 100}%` }}
  className="!justify-start !pl-md !py-sm"
>
  Network Build
</Badge>
```

**Gantt Chart Considerations:**
- Use `style` prop for dynamic widths from API data
- Override default centering with `!justify-start !pl-md` 
- Set `minWidth` to ensure badge text remains readable
- Map API stage names directly to BadgeVariant types
- Consider using `size="small"` for compact timelines

### Loading States
Replace custom spinners with Spinner:
```tsx
// WRONG
<div className="animate-spin">...</div>

// RIGHT
import { Spinner } from '@/design-system/components/feedback';

<Spinner variant="primary" size="md" />
```

## Typography Patterns

### Headings
```tsx
// Page titles
<h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">

// Section headers  
<h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-md">

// Subsection headers
<h3 className="text-base font-medium text-neutral-700 dark:text-neutral-200">

// Body text
<p className="text-sm text-neutral-600 dark:text-neutral-300">
```

## Grid Layouts

Always use 12-column grid:
```tsx
// WRONG
<div className="grid grid-cols-3 gap-4">

// RIGHT
<div className="grid grid-cols-12 gap-md">
  <div className="col-span-4">...</div>
  <div className="col-span-4">...</div>
  <div className="col-span-4">...</div>
</div>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-12 gap-sm">
  <div className="col-span-12 md:col-span-8">Main content</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>
```

## Import Patterns

### Component Imports
```tsx
// Individual imports
import { PageContainer } from '@/design-system/layout/PageContainer';
import Card from '@/design-system/layout/Card';
import Button from '@/design-system/components/primitives/Button';
import Badge from '@/design-system/components/feedback/Badge';
import { TableView } from '@/design-system/tabularData';
import { MetricCard, BarChart } from '@/design-system/charts';

// Token imports
import { colors } from '@/design-system/foundations/tokens/colors';
import { spacing } from '@/design-system/foundations/tokens/spacing';
```

## Common Migration Checklist

When migrating a component/page:

1. ✓ Wrap content in PageContainer
2. ✓ Replace arbitrary spacing (p-4) with tokens (p-md)
3. ✓ Replace color classes with semantic tokens
4. ✓ Add dark mode variants to all color classes
5. ✓ Replace native HTML elements with design system components
6. ✓ Use 12-column grid for layouts
7. ✓ Import from @/design-system paths
8. ✓ Remove inline styles and custom CSS
9. ✓ Apply consistent typography classes
10. ✓ Test in both light and dark modes

## Example Full Migration

### Before:
```tsx
export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">Metrics</h2>
          <p className="text-gray-600">Value: 42</p>
        </div>
      </div>
    </div>
  );
}
```

### After:
```tsx
import { PageContainer } from '@/design-system/layout/PageContainer';
import Card from '@/design-system/layout/Card';

export default function Dashboard() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50 mb-lg">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
        <div className="col-span-12 md:col-span-4">
          <Card title="Metrics" padding="6">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Value: 42
            </p>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
```

## Critical Rules

1. NEVER use `px-4`, `py-4`, etc. Use `px-md`, `py-md`
2. NEVER use `gap-4`, `gap-6`. Use `gap-md`, `gap-lg`
3. NEVER use `text-gray-`. Use `text-neutral-`
4. NEVER forget dark mode classes
5. NEVER import components with relative paths
6. ALWAYS use PageContainer for page-level components
7. ALWAYS use semantic color tokens
8. ALWAYS test responsive behavior
9. ALWAYS use the 12-column grid system
10. ALWAYS maintain consistent patterns throughout the application

When migrating, preserve all business logic and functionality while updating the presentation layer to use the design system components and patterns.
