# Chart Components

Data visualization components built on Recharts with theme support and consistent styling.

## Available Charts

### BarChart
Vertical and horizontal bar charts for categorical data comparison.

```tsx
import { BarChart } from '@/design-system/charts';

<BarChart 
  data={data}
  xKey="category"
  yKey="value"
  title="Sales by Category"
/>
```

### LineChart
Line charts for showing trends and time-series data.

```tsx
import { LineChart } from '@/design-system/charts';

<LineChart 
  data={timeSeriesData}
  xKey="date"
  yKey="value"
  title="Revenue Trend"
/>
```

### PieChart
Pie and donut charts for showing proportional data.

```tsx
import { PieChart } from '@/design-system/charts';

<PieChart 
  data={data}
  dataKey="value"
  nameKey="category"
  title="Market Share"
/>
```

### ScatterPlot
Scatter plots for correlation analysis and bubble charts.

```tsx
import { ScatterPlot } from '@/design-system/charts';

<ScatterPlot 
  data={data}
  xKey="x"
  yKey="y"
  title="Correlation Analysis"
/>
```

### ProgressTracker
Circular progress indicators for completion tracking.

```tsx
import { ProgressTracker } from '@/design-system/charts';

<ProgressTracker 
  percentage={75}
  title="Project Progress"
  subtitle="3 of 4 milestones"
/>
```

### MetricCard
Card component for displaying key metrics with optional charts.

```tsx
import { MetricCard } from '@/design-system/charts';

<MetricCard 
  title="Total Revenue"
  value="$125,000"
  change="+12%"
  trend="up"
/>
```

## Theme Integration

All chart components automatically adapt to light/dark themes:
- Theme-appropriate color palettes
- Consistent axis and grid styling
- Tooltip styling matches theme

## Chart Features

- **Responsive**: Automatically adapts to container size
- **Interactive**: Hover states and click handlers
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Customizable**: Extensive prop options for styling
- **Consistent**: Unified design tokens across all charts

## Usage Patterns

```tsx
// Import individual charts
import { BarChart, LineChart, PieChart } from '@/design-system/charts';

// Or import from main index
import { BarChart, LineChart } from '@/design-system';

// Common data structure
const chartData = [
  { category: 'A', value: 100 },
  { category: 'B', value: 200 },
  { category: 'C', value: 150 }
];
```

## Chart Guidelines

- Use appropriate chart types for your data
- Keep titles concise and descriptive
- Ensure sufficient color contrast
- Consider mobile viewport constraints
- Provide alternative text for accessibility 