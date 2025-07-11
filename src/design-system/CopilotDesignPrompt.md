# FLOW Design System Migration Prompt for AI Assistant

You are helping migrate legacy React/Next.js code to use the FLOW Design System. This is an enterprise-grade component library for supply chain management applications with strict patterns and conventions.

## Core Migration Principles

1. **Replace all hardcoded styles with design tokens**
2. **Use semantic color names, not Tailwind defaults**
3. **Apply consistent spacing tokens**
4. **Ensure dark mode support on all elements**
5. **Import from design-system paths only**
6. **Leverage TypeScript types for better development experience**

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
- Also available: purple, teal, amber, yellow, brown, orange, magenta, slate, blue
- dataViz: Special colors for charts and data visualization
- badge: 28 predefined badge color combinations
```

### Dark Mode Pattern
Always include dark mode classes:
```tsx
WRONG: bg-white text-black
RIGHT: bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50

WRONG: bg-gray-50
RIGHT: bg-neutral-50 dark:bg-neutral-950
```

## COMPREHENSIVE DARK MODE IMPLEMENTATION GUIDE

### Essential Dark Mode Patterns (MUST USE)

#### 1. Primary Text Colors
```tsx
// Main headings and important text
className="text-neutral-800 dark:text-neutral-50"

// Secondary text (descriptions, labels)  
className="text-neutral-600 dark:text-neutral-200"
className="text-neutral-600 dark:text-neutral-300"

// Tertiary text (captions, timestamps)
className="text-neutral-500 dark:text-neutral-400"
```

#### 2. Background Colors
```tsx
// Main container backgrounds
className="bg-white dark:bg-neutral-800"
className="bg-white dark:bg-neutral-900"

// Section/card backgrounds  
className="bg-neutral-50 dark:bg-neutral-700"
className="bg-neutral-50 dark:bg-neutral-800"

// Highlighted/accent backgrounds
className="bg-neutral-100 dark:bg-neutral-700"
className="bg-blue-50 dark:bg-neutral-900"
className="bg-green-50 dark:bg-neutral-900"
```

#### 3. Border Colors
```tsx
// Standard borders
className="border-neutral-200 dark:border-neutral-600"
className="border-neutral-300 dark:border-neutral-600"

// Subtle borders
className="border-neutral-100 dark:border-neutral-700"
```

#### 4. Form Elements (CRITICAL - Often Missed)
```tsx
// Input fields - COMPLETE PATTERN
className="bg-white dark:bg-neutral-700 
           text-neutral-900 dark:text-neutral-50
           border-neutral-300 dark:border-neutral-600
           placeholder-neutral-500 dark:placeholder-neutral-400
           focus:border-primary-500 dark:focus:border-primary-400
           focus:ring-primary-500 dark:focus:ring-primary-400"

// Select dropdowns
className="bg-white dark:bg-neutral-700 
           text-neutral-900 dark:text-neutral-50
           border-neutral-300 dark:border-neutral-600"

// Button hover states  
className="bg-neutral-50 dark:bg-neutral-800 
           hover:bg-neutral-100 dark:hover:bg-neutral-700
           text-neutral-700 dark:text-neutral-200"
```

#### 5. Interactive Elements
```tsx
// Clickable items with hover
className="bg-neutral-50 dark:bg-neutral-800 
           hover:bg-neutral-100 dark:hover:bg-neutral-700
           text-neutral-700 dark:text-neutral-200
           border-neutral-200 dark:border-neutral-600"

// Focus states for accessibility
className="focus:outline-none focus-visible:ring-2 
           focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400
           focus:border-transparent"
```

#### 6. Status and Semantic Colors
```tsx
// Error states
className="text-error-500 dark:text-error-300"
className="bg-error-50 dark:bg-error-900/20"
className="border-error-300 dark:border-error-700"

// Success states  
className="text-success-500 dark:text-success-300"
className="bg-success-50 dark:bg-success-900/20"

// Warning states
className="text-warning-700 dark:text-warning-300"
className="bg-warning-50 dark:bg-warning-900/20"

// Info states
className="text-blue-700 dark:text-blue-300"
className="bg-blue-50 dark:bg-blue-900/20"
```

#### 7. Information Boxes and Callouts
```tsx
// Info box pattern
className="bg-blue-50 dark:bg-neutral-900 
           border-l-4 border-blue-700 dark:border-neutral-600 
           p-lg rounded-lg"

// Content within info boxes
className="text-neutral-900 dark:text-neutral-50"  // Headers
className="text-neutral-700 dark:text-neutral-100" // Body text

// Success callouts
className="bg-green-50 dark:bg-neutral-900 
           border-l-4 border-green-700 dark:border-neutral-600"
```

#### 8. Avatar and Profile Elements
```tsx
// Avatar backgrounds
className="bg-blue-100 dark:bg-blue-900"
className="bg-neutral-100 dark:bg-neutral-700"

// Avatar text
className="text-blue-700 dark:text-blue-100"
className="text-neutral-700 dark:text-neutral-300"
```

#### 9. Complex Layout Patterns
```tsx
// Chat/message containers
className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-sm"

// Modal/overlay backgrounds
className="bg-white dark:bg-neutral-800"

// Sidebar or navigation
className="bg-neutral-50 dark:bg-neutral-800 
           border-r border-neutral-200 dark:border-neutral-700"
```

#### 10. Conditional Status Colors (Advanced Pattern)
```tsx
// Dynamic color assignment based on status
className={`text-sm font-medium ${
  alert.severity === 'critical' ? 'text-error-500 dark:text-error-300' : 
  alert.severity === 'warning' ? 'text-warning-700 dark:text-warning-300' : 
  'text-blue-700 dark:text-blue-100'
}`}

// Dynamic backgrounds
className={`px-2 py-1 rounded ${
  status === 'active' ? 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300' :
  status === 'error' ? 'bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300' :
  'bg-neutral-50 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
}`}
```

### Critical Dark Mode Rules (NEVER BREAK)

1. **NEVER use single colors without dark variants**
   ```tsx
   WRONG: className="text-gray-800"
   RIGHT: className="text-neutral-800 dark:text-neutral-50"
   ```

2. **ALWAYS pair background and text colors**
   ```tsx
   WRONG: className="bg-white"
   RIGHT: className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
   ```

3. **ALWAYS include focus states for interactive elements**
   ```tsx
   WRONG: className="border rounded"
   RIGHT: className="border border-neutral-300 dark:border-neutral-600 
                    focus:border-primary-500 dark:focus:border-primary-400
                    focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
   ```

4. **ALWAYS use neutral colors, not gray**
   ```tsx
   WRONG: "text-gray-600" "bg-gray-100" "border-gray-300"
   RIGHT: "text-neutral-600 dark:text-neutral-300" "bg-neutral-100 dark:bg-neutral-700" "border-neutral-300 dark:border-neutral-600"
   ```

5. **ALWAYS test placeholder text colors**
   ```tsx
   WRONG: placeholder="Enter text"
   RIGHT: placeholder="Enter text" 
          className="placeholder-neutral-500 dark:placeholder-neutral-400"
   ```

6. **ALWAYS consider scrollbar areas**
   ```tsx
   // For scrollable containers
   className="overflow-y-auto bg-white dark:bg-neutral-800"
   ```

### Common Dark Mode Mistakes to Avoid

1. **Missing form element dark styles** - Input fields without proper dark mode
2. **Inconsistent border colors** - Using different neutral shades for borders  
3. **Missing placeholder colors** - Forgetting dark mode placeholder text
4. **Single background color** - Not pairing background with text color
5. **Missing hover states** - Interactive elements without dark hover states
6. **Conditional colors without dark variants** - Status colors missing dark mode
7. **Missing focus states** - Accessibility issues in dark mode

### Quick Dark Mode Checklist

Before submitting any component, verify:
- ✓ All text has `dark:text-` variants
- ✓ All backgrounds have `dark:bg-` variants  
- ✓ All borders have `dark:border-` variants
- ✓ All form elements have complete dark styling
- ✓ All interactive elements have `dark:hover:` states
- ✓ All focus states work in dark mode
- ✓ Conditional/dynamic colors include dark variants
- ✓ Status colors use appropriate dark variants
- ✓ No standalone `gray-` colors (use `neutral-` instead)

## TypeScript Support

The design system provides comprehensive TypeScript support. Always use types for better development experience:

```tsx
// Import types for components and tokens
import type { 
  BadgeVariant,
  BadgeIcon,
  ButtonVariant,
  FontSizeKey,
  Colors,
  SpinnerSize,
  SpinnerVariant,
  SelectOption,
  MultiSelectOption,
  DateRange,
  ColumnDef,
  FilterConfig,
  SortConfig
} from '@/design-system';

// Type-safe component usage
const badgeVariant: BadgeVariant = 'forecast';
const badgeIcon: BadgeIcon = 'exclamation-triangle';
const buttonSize: ButtonSize = 'md';
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
// Alternative import (both work):
// import { PageContainer } from '@/design-system';

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
Replace HTML tables with TableView or ListView:
```tsx
// WRONG
<table className="w-full">
  <thead>...</thead>
  <tbody>...</tbody>
</table>

// RIGHT
import { TableView, ListView } from '@/design-system/tabularData';
import type { ColumnDef, FilterConfig } from '@/design-system';

// Advanced table with filtering and sorting
<TableView
  data={data}
  columns={columns}
  mode="summary"
  height={400}
  filterConfig={filterConfig}
  sortConfig={sortConfig}
/>

// Or card-based layout
<ListView
  data={data}
  columns={columns}
  mode="detailed"
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

// Available variants: primary, secondary, outline, ghost, danger
// Available sizes: sm, md, lg
// Additional props: fullWidth, isLoading, leftIcon, rightIcon
```

### Form Controls
Use design system form components:
```tsx
// WRONG
<input type="text" className="border p-2" />

// RIGHT
import Input from '@/design-system/components/forms/Input';

<Input
  type="text"
  placeholder="Enter value"
  value={value}
  onChange={handleChange}
  error={error}
  label="Field Label"
/>
```

### Filter Components
Use specialized filter components for data filtering:
```tsx
// Single select dropdown
import { DropdownSelect } from '@/design-system/components/filters';
import type { SelectOption } from '@/design-system';

<DropdownSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select option"
/>

// Multi-select dropdown
import { DropdownMultiSelect } from '@/design-system/components/filters';

<DropdownMultiSelect
  options={options}
  values={selectedValues}
  onChange={setSelectedValues}
  placeholder="Select multiple"
/>

// Date range picker
import { DateRangeFilter } from '@/design-system/components/filters';

<DateRangeFilter
  value={dateRange}
  onChange={setDateRange}
  presets={DEFAULT_PRESETS}
/>

// Checkbox filter
import { CheckboxFilter } from '@/design-system/components/filters';

<CheckboxFilter
  label="Filter by status"
  checked={isChecked}
  onChange={setIsChecked}
/>
```

### Status Indicators and Feedback
Replace spans/divs with proper feedback components:
```tsx
// WRONG
<span className="bg-green-100 text-green-800 px-2 py-1 rounded">
  Active
</span>

// RIGHT
import Badge from '@/design-system/components/feedback/Badge';

<Badge variant="completed">Active</Badge>

// Loading states
import { Spinner } from '@/design-system/components/feedback';

<Spinner variant="primary" size="md" />

// Tooltips
import Tooltip from '@/design-system/components/feedback/Tooltip';

<Tooltip content="Helpful information">
  <Button>Hover me</Button>
</Tooltip>

// Notification badges
import NotificationBadge from '@/design-system/components/feedback/NotificationBadge';

<NotificationBadge count={5} variant="error" />
```

### Badge Components (Complete Variant List)
Use Badge for supply chain status indicators and timeline elements:

```tsx
import Badge from '@/design-system/components/feedback/Badge';
import type { BadgeVariant, BadgeIcon } from '@/design-system';

// Basic usage without icons
<Badge variant="forecast">Forecast</Badge>

// Badge with icons - NEW FUNCTIONALITY
<Badge variant="critical" icon="exclamation-triangle">Critical Alert</Badge>
<Badge variant="standard" icon="information-circle">Information</Badge>

// Available icon types:
// - 'exclamation-triangle': Use for alerts, warnings, high-priority items
// - 'information-circle': Use for informational content, status updates, notifications

// Size options with icons
<Badge variant="critical" icon="exclamation-triangle" size="small">Critical</Badge>
<Badge variant="standard" icon="information-circle" size="regular">Information</Badge>

// Supply chain status variants (28 total):
// Normal variants:
<Badge variant="forecast">Forecast</Badge>
<Badge variant="forecast" icon="information-circle">Forecast</Badge>
<Badge variant="sop">SOP</Badge>
<Badge variant="businessCase">Business Case</Badge>
<Badge variant="purchaseReq">Purchase Req</Badge>
<Badge variant="purchaseOrder">Purchase Order</Badge>
<Badge variant="integrator">Integrator</Badge>
<Badge variant="networkBuild">Network Build</Badge>
<Badge variant="logicalBuild">Logical Build</Badge>
<Badge variant="completed">Completed</Badge>
<Badge variant="completed" icon="information-circle">Completed</Badge>
<Badge variant="unassigned1">Unassigned 1</Badge>
<Badge variant="unassigned2">Unassigned 2</Badge>

// Inverted variants (outline style):
<Badge variant="forecastInverted">Forecast</Badge>
<Badge variant="forecastInverted" icon="information-circle">Forecast</Badge>
<Badge variant="sopInverted">SOP</Badge>
<Badge variant="businessCaseInverted">Business Case</Badge>
<Badge variant="purchaseReqInverted">Purchase Req</Badge>
<Badge variant="purchaseOrderInverted">Purchase Order</Badge>
<Badge variant="integratorInverted">Integrator</Badge>
<Badge variant="networkBuildInverted">Network Build</Badge>
<Badge variant="logicalBuildInverted">Logical Build</Badge>
<Badge variant="completedInverted">Completed</Badge>
<Badge variant="completedInverted" icon="information-circle">Completed</Badge>
<Badge variant="unassigned1Inverted">Unassigned 1</Badge>
<Badge variant="unassigned2Inverted">Unassigned 2</Badge>

// Priority badges (text auto-uppercase):
<Badge variant="critical">Critical</Badge>
<Badge variant="critical" icon="exclamation-triangle">Critical</Badge>
<Badge variant="highPriority">High Priority</Badge>
<Badge variant="highPriority" icon="exclamation-triangle">High Priority</Badge>
<Badge variant="standard">Standard</Badge>
<Badge variant="standard" icon="information-circle">Standard</Badge>
<Badge variant="atRisk">At Risk</Badge>
<Badge variant="atRisk" icon="exclamation-triangle">At Risk</Badge>

// Icon semantic guidelines:
// Use exclamation-triangle for:
// - Critical alerts and errors
// - High priority items
// - Risk indicators  
// - Warning states

// Use information-circle for:
// - Status updates
// - Informational content
// - Completed states
// - General notifications
// - Process status indicators

// Size options
<Badge variant="forecast" size="small">Small</Badge>
<Badge variant="forecast" size="small" icon="information-circle">Small with Icon</Badge>
<Badge variant="forecast" size="regular">Regular</Badge>
<Badge variant="forecast" size="regular" icon="information-circle">Regular with Icon</Badge>
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

### Charts and Data Visualization
Use design system chart components:
```tsx
// Import chart components
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  ScatterPlot, 
  ProgressTracker,
  MetricCard 
} from '@/design-system/charts';

// Line chart for time series
<LineChart
  data={chartData}
  width={800}
  height={400}
  showTooltip={true}
  isDark={theme === 'dark'}
/>

// Bar chart for comparisons
<BarChart
  data={barData}
  width={600}
  height={300}
  isDark={theme === 'dark'}
/>

// Metric cards for KPIs
<MetricCard
  title="Total Revenue"
  value="$2.4M"
  change="+12%"
  trend="up"
  status="positive"
/>

// Progress tracking
<ProgressTracker
  stages={projectStages}
  currentStage={3}
  completedStages={[0, 1, 2]}
/>
```

### Layout Components
Use comprehensive layout system:
```tsx
// App wrapper (main layout)
import AppWrapper from '@/design-system/layout/AppWrapper';

<AppWrapper>
  {/* Your app content */}
</AppWrapper>

// Sidebar navigation
import Sidebar from '@/design-system/layout/Sidebar';

// Account drawer
import AccountDrawer from '@/design-system/layout/AccountDrawer';

// Loading screen
import MainLoadingScreen from '@/design-system/layout/MainLoadingScreen';

// Constants for navigation
import { appTabs, navTabs, dashboardTab } from '@/design-system/layout';
```

### Modal and Overlay Components
Use overlay system for modals and popups:
```tsx
// Base modal
import Modal from '@/design-system/overlays/Modal';

<Modal
  isOpen={isModalOpen}
  onClose={closeModal}
  title="Modal Title"
  size="lg"
>
  <p>Modal content</p>
</Modal>

// Specialized modals
import { 
  NotificationsModal, 
  UserPreferencesModal 
} from '@/design-system/overlays/modals';

<NotificationsModal
  isOpen={showNotifications}
  onClose={() => setShowNotifications(false)}
/>
```

### Utility Components
Use utility components for common patterns:
```tsx
// Theme toggle
import LightDarkModeToggle from '@/design-system/utilities/LightDarkModeToggle';

<LightDarkModeToggle />

// AI chat interface
import AIChatBox from '@/design-system/utilities/AIChatBox';

<AIChatBox />

// Theme transitions
import ThemeTransition from '@/design-system/utilities/ThemeTransition';

<ThemeTransition>
  {/* Content with smooth theme transitions */}
</ThemeTransition>
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

// Typography tokens available:
// Font sizes: xxs, xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
// Font weights: thin, light, normal, medium, semibold, bold, black
// Line heights: tight, normal, relaxed
// Letter spacing: tight, normal, wide
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
// Main design system exports
import { 
  Button,
  Input,
  Badge,
  Spinner,
  Modal,
  TableView,
  ListView,
  LineChart,
  BarChart,
  MetricCard,
  PageContainer,
  Card
} from '@/design-system';

// Or individual imports for better tree-shaking
import Button from '@/design-system/components/primitives/Button';
import Card from '@/design-system/layout/Card';
import { TableView } from '@/design-system/tabularData';
import { MetricCard, BarChart } from '@/design-system/charts';

// Token imports
import { colors, badgeColors } from '@/design-system/foundations/tokens/colors';
import { typography, getTypography } from '@/design-system/foundations/tokens/typography';
import { spacing } from '@/design-system/foundations/tokens/spacing';
import { shadows } from '@/design-system/foundations/tokens/shadows';
import { borderRadius } from '@/design-system/foundations/tokens/borderRadius';
import { chartTokens, getChartColors } from '@/design-system/foundations/tokens/charts';

// Type imports
import type {
  BadgeVariant,
  BadgeIcon,
  ButtonVariant,
  SpinnerSize,
  Colors,
  Typography,
  FontSizeKey,
  ColumnDef,
  FilterConfig,
  SortConfig,
  SelectOption,
  MultiSelectOption,
  DateRange
} from '@/design-system';
```

## Common Migration Checklist

When migrating a component/page:

1. ✓ Wrap content in PageContainer
2. ✓ Replace arbitrary spacing (p-4) with tokens (p-md)
3. ✓ Replace color classes with semantic tokens
4. ✓ Add dark mode variants to ALL color classes (critical)
5. ✓ Replace native HTML elements with design system components
6. ✓ Use 12-column grid for layouts
7. ✓ Import from @/design-system paths
8. ✓ Remove inline styles and custom CSS
9. ✓ Apply consistent typography classes
10. ✓ Test in both light and dark modes extensively
11. ✓ Add TypeScript types for better development experience
12. ✓ Use proper component variants and sizes
13. ✓ Ensure responsive behavior works correctly
14. ✓ Verify all form elements have complete dark mode styling
15. ✓ Check all interactive elements have dark hover states
16. ✓ Confirm focus states work properly in both themes
17. ✓ Test placeholder text visibility in dark mode
18. ✓ Validate conditional/status colors include dark variants
19. ✓ Ensure scrollable areas have proper dark backgrounds
20. ✓ Verify avatar/profile elements work in both themes

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
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            Active
          </span>
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
import Badge from '@/design-system/components/feedback/Badge';
import type { BadgeVariant } from '@/design-system';

export default function Dashboard() {
  const status: BadgeVariant = 'completed';
  
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50 mb-lg">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
        <div className="col-span-12 md:col-span-4">
          <Card title="Metrics" padding="6">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-sm">
              Value: 42
            </p>
            <Badge variant={status} size="regular">
              Active
            </Badge>
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
4. NEVER forget dark mode classes - EVERY color class needs a dark variant
5. NEVER import components with relative paths
6. ALWAYS use PageContainer for page-level components
7. ALWAYS use semantic color tokens
8. ALWAYS test responsive behavior
9. ALWAYS use the 12-column grid system
10. ALWAYS maintain consistent patterns throughout the application
11. ALWAYS use TypeScript types when available
12. ALWAYS prefer design system components over custom implementations
13. ALWAYS use proper badge variants for supply chain status indicators
14. ALWAYS test both light and dark modes thoroughly
15. ALWAYS include focus states for accessibility in both themes
16. ALWAYS pair background colors with appropriate text colors
17. NEVER use conditional colors without dark variants

## Component Availability Reference

### All Available Components:
- **Primitives**: Button
- **Forms**: Input
- **Feedback**: Badge (28 variants), Spinner, Tooltip, NotificationBadge, InfoBanner, CriticalBanner
- **Filters**: DropdownSelect, DropdownMultiSelect, DateRangeFilter, CheckboxFilter, ClearAllFilters
- **Controls**: TableToggle
- **Charts**: LineChart, BarChart, PieChart, ScatterPlot, ProgressTracker, MetricCard
- **Layout**: AppWrapper, Sidebar, Card, PageContainer, AccountDrawer, MainLoadingScreen
- **Overlays**: Modal, NotificationsModal, UserPreferencesModal
- **TabularData**: TableView, ListView
- **Utilities**: LightDarkModeToggle, AIChatBox, ThemeTransition

When migrating, preserve all business logic and functionality while updating the presentation layer to use the design system components and patterns. Always prioritize using existing components over creating custom implementations.
