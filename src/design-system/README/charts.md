# Chart Components

Data visualization components built for displaying metrics, KPIs, and analytical data. All charts are responsive, theme-aware, and designed for business intelligence applications.

## 📊 Overview

The chart system includes:
- **Basic Charts**: Bar, Line, Pie, Scatter Plot charts
- **Metric Displays**: MetricCard for KPI presentation
- **Progress Tracking**: ProgressTracker for goal visualization
- **Composite Views**: ChartGallery for dashboard layouts
- **Design Tokens**: Consistent chart styling and colors

### Import

```tsx
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  ScatterPlot,
  MetricCard, 
  ProgressTracker,
  ChartGallery 
} from '@your-org/design-system';
```

## 📈 BarChart

A responsive bar chart component for comparing categorical data.

### Props

```tsx
interface BarChartProps {
  /** Chart data array */
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  /** Width of the chart */
  width?: number;
  /** Height of the chart */
  height?: number;
  /** Color scheme for bars */
  color?: string;
  /** Chart title */
  title?: string;
  /** X-axis label */
  xAxisLabel?: string;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Whether to show grid lines */
  showGrid?: boolean;
  /** Custom styling */
  className?: string;
}
```

### Usage Examples

#### Basic Bar Chart

```tsx
const salesData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
];

<BarChart 
  data={salesData}
  title="Monthly Sales"
  xAxisLabel="Month"
  yAxisLabel="Sales ($)"
  height={300}
/>
```

#### Customized Bar Chart

```tsx
<BarChart 
  data={salesData}
  color="#17314a"
  showGrid={true}
  className="shadow-lg rounded-lg"
  title="Revenue by Quarter"
/>
```

---

## 📈 LineChart

A line chart component for showing trends over time.

### Props

```tsx
interface LineChartProps {
  /** Chart data array */
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  /** Multiple data series */
  multiSeries?: Array<{
    dataKey: string;
    stroke: string;
    name: string;
  }>;
  /** Chart dimensions */
  width?: number;
  height?: number;
  /** Chart title */
  title?: string;
  /** Axis labels */
  xAxisLabel?: string;
  yAxisLabel?: string;
  /** Styling options */
  showGrid?: boolean;
  showDots?: boolean;
  strokeWidth?: number;
}
```

### Usage Examples

#### Single Series Line Chart

```tsx
const trendData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 6000 },
  { month: 'Apr', revenue: 8000 },
  { month: 'May', revenue: 5000 },
];

<LineChart 
  data={trendData}
  title="Revenue Trend"
  xAxisLabel="Month"
  yAxisLabel="Revenue ($)"
  showDots={true}
  height={300}
/>
```

#### Multi-Series Line Chart

```tsx
const multiData = [
  { month: 'Jan', revenue: 4000, costs: 2000, profit: 2000 },
  { month: 'Feb', revenue: 3000, costs: 1800, profit: 1200 },
  { month: 'Mar', revenue: 6000, costs: 3000, profit: 3000 },
];

<LineChart 
  data={multiData}
  multiSeries={[
    { dataKey: 'revenue', stroke: '#17314a', name: 'Revenue' },
    { dataKey: 'costs', stroke: '#e34242', name: 'Costs' },
    { dataKey: 'profit', stroke: '#0fa892', name: 'Profit' }
  ]}
  title="Financial Overview"
  height={400}
/>
```

---

## 🥧 PieChart

A pie chart component for showing proportional data.

### Props

```tsx
interface PieChartProps {
  /** Chart data */
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  /** Chart dimensions */
  width?: number;
  height?: number;
  /** Chart title */
  title?: string;
  /** Inner radius for donut chart */
  innerRadius?: number;
  /** Whether to show labels */
  showLabels?: boolean;
  /** Whether to show percentages */
  showPercentages?: boolean;
  /** Custom color palette */
  colors?: string[];
}
```

### Usage Examples

#### Basic Pie Chart

```tsx
const categoryData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 },
];

<PieChart 
  data={categoryData}
  title="Traffic by Device"
  showPercentages={true}
  height={300}
/>
```

#### Donut Chart

```tsx
<PieChart 
  data={categoryData}
  innerRadius={60}
  title="Market Share"
  showLabels={true}
  colors={['#17314a', '#829ab1', '#0fa892']}
/>
```

---

## 📊 ScatterPlot

A scatter plot component for correlation analysis.

### Props

```tsx
interface ScatterPlotProps {
  /** Chart data */
  data: Array<{
    x: number;
    y: number;
    name?: string;
    category?: string;
  }>;
  /** Chart dimensions */
  width?: number;
  height?: number;
  /** Chart title */
  title?: string;
  /** Axis labels */
  xAxisLabel?: string;
  yAxisLabel?: string;
  /** Point styling */
  pointSize?: number;
  pointColor?: string;
  /** Whether to show trend line */
  showTrendLine?: boolean;
}
```

### Usage Examples

```tsx
const correlationData = [
  { x: 10, y: 20, name: 'Point A' },
  { x: 15, y: 35, name: 'Point B' },
  { x: 25, y: 45, name: 'Point C' },
  { x: 30, y: 55, name: 'Point D' },
];

<ScatterPlot 
  data={correlationData}
  title="Sales vs Marketing Spend"
  xAxisLabel="Marketing Spend ($k)"
  yAxisLabel="Sales Revenue ($k)"
  showTrendLine={true}
  pointSize={8}
  height={400}
/>
```

---

## 📊 MetricCard

A card component for displaying key performance indicators.

### Props

```tsx
interface MetricCardProps {
  /** Metric label */
  label: string;
  /** Main metric value */
  value: number | string;
  /** Change in value */
  delta?: number;
  /** Trend direction */
  trend?: 'up' | 'down';
  /** Status indicator */
  status?: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
  /** Click handler */
  onClick?: () => void;
}
```

### Usage Examples

#### Basic Metric Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MetricCard 
    label="Total Revenue"
    value="$124,500"
    delta={12.5}
    trend="up"
    status="success"
  />
  
  <MetricCard 
    label="Active Users"
    value="8,432"
    delta={-2.1}
    trend="down"
    status="warning"
  />
  
  <MetricCard 
    label="Conversion Rate"
    value="3.24%"
    delta={0.8}
    trend="up"
    status="primary"
  />
</div>
```

#### Clickable Metric Card

```tsx
<MetricCard 
  label="Orders Today"
  value={157}
  delta={23}
  trend="up"
  status="success"
  onClick={() => navigate('/orders')}
/>
```

---

## 📊 ProgressTracker

A component for tracking progress toward goals.

### Props

```tsx
interface ProgressTrackerProps {
  /** Progress data */
  data: Array<{
    label: string;
    current: number;
    target: number;
    color?: string;
  }>;
  /** Component title */
  title?: string;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Show percentage */
  showPercentage?: boolean;
  /** Custom styling */
  className?: string;
}
```

### Usage Examples

```tsx
const goalData = [
  { label: 'Sales Target', current: 850, target: 1000 },
  { label: 'Customer Acquisition', current: 420, target: 500 },
  { label: 'Revenue Goal', current: 75000, target: 100000 },
];

<ProgressTracker 
  data={goalData}
  title="Q4 Goals"
  showPercentage={true}
  orientation="horizontal"
/>
```

---

## 🎯 ChartGallery

A layout component for organizing multiple charts in a dashboard format.

### Props

```tsx
interface ChartGalleryProps {
  /** Gallery title */
  title?: string;
  /** Chart components */
  children: React.ReactNode;
  /** Layout columns */
  columns?: 1 | 2 | 3 | 4;
  /** Gap between charts */
  gap?: 'sm' | 'md' | 'lg';
  /** Custom styling */
  className?: string;
}
```

### Usage Examples

```tsx
<ChartGallery 
  title="Sales Dashboard"
  columns={2}
  gap="lg"
>
  <MetricCard 
    label="Total Sales"
    value="$45,231"
    delta={8.2}
    trend="up"
    status="success"
  />
  
  <MetricCard 
    label="New Customers"
    value="124"
    delta={15.3}
    trend="up"
    status="primary"
  />
  
  <BarChart 
    data={monthlyData}
    title="Monthly Performance"
    height={300}
  />
  
  <LineChart 
    data={trendData}
    title="Growth Trend"
    height={300}
  />
</ChartGallery>
```

## 🎨 Chart Tokens

The chart system uses design tokens for consistent styling.

### Import Chart Tokens

```tsx
import { chartTokens } from '@your-org/design-system';
```

### Available Tokens

```tsx
// Color palette for data visualization
chartTokens.colors.primary     // #17314a
chartTokens.colors.secondary   // #829ab1
chartTokens.colors.positive    // #0fa892
chartTokens.colors.negative    // #e34242
chartTokens.colors.neutral     // #bcccdc
chartTokens.colors.highlight   // #f6ad55

// Status colors
chartTokens.status.success     // Success green
chartTokens.status.warning     // Warning amber
chartTokens.status.error       // Error red
chartTokens.status.primary     // Primary blue
chartTokens.status.neutral     // Neutral gray

// Chart spacing and sizing
chartTokens.spacing.xs         // 4px
chartTokens.spacing.sm         // 8px
chartTokens.spacing.md         // 16px
chartTokens.spacing.lg         // 24px
chartTokens.spacing.xl         // 32px
```

### Using Chart Tokens

```tsx
// Custom styled chart
<BarChart 
  data={data}
  color={chartTokens.colors.primary}
  className="p-4"
  style={{
    borderColor: chartTokens.status.primary
  }}
/>

// Custom metric card colors
<MetricCard 
  label="Custom Metric"
  value="$1,234"
  status="primary"
  style={{
    borderLeft: `4px solid ${chartTokens.status.primary}`
  }}
/>
```

## 📱 Responsive Design

All chart components are responsive by default:

```tsx
// Responsive chart sizing
<div className="w-full">
  <BarChart 
    data={data}
    width="100%"
    height={300}
    className="min-w-0" // Prevents overflow
  />
</div>

// Responsive grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <MetricCard label="Mobile" value="123" />
  <MetricCard label="Desktop" value="456" />
  <MetricCard label="Tablet" value="789" />
</div>
```

## 🌙 Theme Support

Charts automatically adapt to light/dark themes:

```tsx
// Charts respect theme context
<BarChart 
  data={data}
  title="Themed Chart"
  // Background, text, and grid colors adjust automatically
/>

// Metric cards with theme-aware styling
<MetricCard 
  label="Themed Metric"
  value="$1,234"
  // Card background and text colors adapt to theme
/>
```

## ♿ Accessibility

Chart components include accessibility features:

- **ARIA Labels**: Charts include descriptive labels
- **Keyboard Navigation**: Interactive charts support keyboard navigation
- **Screen Reader Support**: Data tables available for complex charts
- **Color Blind Friendly**: Color palettes designed for accessibility
- **High Contrast**: Support for high contrast modes

```tsx
// Accessible chart example
<BarChart 
  data={salesData}
  title="Monthly Sales Data"
  aria-label="Bar chart showing monthly sales from January to May"
  // Automatically includes data table for screen readers
/>
```

## 🔧 Customization

Charts can be customized while maintaining consistency:

```tsx
// Custom colors using design tokens
<PieChart 
  data={data}
  colors={[
    chartTokens.colors.primary,
    chartTokens.colors.secondary,
    chartTokens.colors.positive
  ]}
/>

// Custom styling with Tailwind
<MetricCard 
  label="Enhanced Metric"
  value="$1,234"
  className="shadow-lg hover:shadow-xl transition-shadow"
/>

// Custom chart wrapper
<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
  <LineChart 
    data={data}
    title="Custom Wrapped Chart"
    height={250}
  />
</div>
```

## 🎯 Best Practices

### Data Visualization Guidelines

1. **Choose Appropriate Chart Types**:
   - Bar charts for comparing categories
   - Line charts for trends over time
   - Pie charts for parts of a whole (limit to 5-7 segments)
   - Scatter plots for correlations

2. **Use Semantic Colors**:
   - Green for positive metrics/gains
   - Red for negative metrics/losses
   - Blue for neutral information
   - Consistent colors across related charts

3. **Provide Context**:
   - Include meaningful titles and labels
   - Show units of measurement
   - Add trend indicators and deltas

4. **Ensure Accessibility**:
   - Use sufficient color contrast
   - Don't rely solely on color to convey information
   - Provide alternative text descriptions

### Dashboard Layout

```tsx
// Effective dashboard structure
<div className="space-y-6">
  {/* Key metrics at the top */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <MetricCard label="Revenue" value="$125K" trend="up" />
    <MetricCard label="Users" value="8.4K" trend="up" />
    <MetricCard label="Conversion" value="3.2%" trend="down" />
    <MetricCard label="Retention" value="85%" trend="up" />
  </div>
  
  {/* Detailed charts below */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <BarChart data={monthlyData} title="Monthly Performance" />
    <LineChart data={trendData} title="Growth Trend" />
    <PieChart data={categoryData} title="Traffic Sources" />
    <ProgressTracker data={goalData} title="Goal Progress" />
  </div>
</div>
``` 