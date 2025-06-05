# Design System Documentation

## Overview

This design system provides a comprehensive set of design tokens, components, and utilities for building consistent user interfaces. It integrates seamlessly with Tailwind CSS for styling.

## Structure

```
src/design-system/
├── foundations/
│   └── tokens/           # Design tokens (colors, typography, spacing, etc.)
├── components/
│   ├── primitives/       # Basic UI elements (Button)
│   ├── forms/           # Form controls (Input)
│   ├── feedback/        # User feedback (Badge, Spinner, Tooltip, Banners)
│   ├── controls/        # Interactive controls (TableToggle)
│   └── filters/         # Data filtering components
├── charts/              # Chart components (LineChart, BarChart, etc.)
├── layout/              # Layout components (AppWrapper, Sidebar, Card)
├── overlays/            # Modal and overlay components
├── tabularData/         # Table and list components
└── utilities/           # Utility components (Theme toggle, AI chat)
```

## Design Tokens

### Colors
- **Primary**: Main brand colors (`primary-50` to `primary-900`)
- **Neutral**: Grayscale colors (`neutral-50` to `neutral-950`)
- **Semantic**: Success, warning, error colors
- **Data Visualization**: Chart-specific colors
- **Badge Colors**: Pre-configured badge color combinations

### Typography
- **Font Family**: Bahnschrift with fallbacks
- **Font Sizes**: `xxs` to `5xl` with line heights
- **Font Weights**: `thin` to `black`
- **Line Heights**: `tight`, `normal`, `relaxed`
- **Letter Spacing**: `tight`, `normal`, `wide`

### Spacing
- **Scale**: `xs` (0.25rem) to `2xl` (3rem)

### Shadows
- **Scale**: `xs` to `xl` with increasing depth

### Border Radius
- **Scale**: `xs` (0.125rem) to `xl` (1rem)

## Usage

### Importing Components
```typescript
// Individual components
import { Button } from '@/design-system/components/primitives';
import { LineChart } from '@/design-system/charts';
import { TableView } from '@/design-system/tabularData';

// Or from main export
import { Button, LineChart, TableView } from '@/design-system';
```

### Using Design Tokens in Components
```typescript
// Import tokens for direct usage
import { colors, getTypography } from '@/design-system/foundations/tokens';

// Or use through Tailwind classes
className="bg-primary-600 text-neutral-50"
```

### Available Components

#### Primitives
- **Button**: Primary, secondary, outline, ghost, danger variants

#### Forms
- **Input**: Text input with validation states

#### Feedback
- **Badge**: Status and priority indicators
- **Spinner**: Loading indicators
- **Tooltip**: Contextual help
- **NotificationBadge**: Notification counters
- **Banners**: Info and critical banners

#### Filters
- **DropdownSelect**: Single selection dropdown
- **DropdownMultiSelect**: Multiple selection dropdown
- **DateRangeFilter**: Date range picker
- **CheckboxFilter**: Checkbox filtering
- **ClearAllFilters**: Filter reset functionality

#### Charts
- **LineChart**: Time series and trend visualization
- **BarChart**: Categorical data comparison
- **PieChart**: Part-to-whole relationships
- **ScatterPlot**: Correlation visualization
- **ProgressTracker**: Multi-step progress indicator
- **MetricCard**: Key performance indicator display

#### Layout
- **AppWrapper**: Main application wrapper
- **Sidebar**: Navigation sidebar
- **Card**: Content container
- **PageContainer**: Page-level container
- **AccountDrawer**: User account interface
- **MainLoadingScreen**: Full-screen loading state

#### Overlays
- **Modal**: Base modal component
- **NotificationsModal**: Notification center
- **UserPreferencesModal**: User settings

#### Tabular Data
- **TableView**: Advanced data table with sorting, filtering, pagination
- **ListView**: Card-based data display

#### Utilities
- **LightDarkModeToggle**: Theme switcher
- **AIChatBox**: AI assistant interface
- **ThemeTransition**: Smooth theme transitions

## TypeScript Support

The design system includes comprehensive TypeScript types:

```typescript
import type { 
  Colors, 
  BadgeVariant, 
  FontSizeKey,
  SpinnerSize 
} from '@/design-system';
```

## Tailwind Integration

Design tokens are automatically available as Tailwind utilities:

```css
/* Colors */
.bg-primary-600
.text-badge-forecast-bg
.text-chart-status-error

/* Typography */
.text-xs
.font-semibold
.leading-relaxed

/* Spacing */
.p-md
.m-lg
.gap-xs

/* Shadows */
.shadow-md
.shadow-chart

/* Border Radius */
.rounded-sm
.rounded-lg
```

## Best Practices

1. **Use design tokens**: Always use design tokens instead of hardcoded values
2. **Component composition**: Build complex UIs by composing simple components
3. **TypeScript types**: Use provided types for better development experience
4. **Consistent spacing**: Use the spacing scale for consistent layouts
5. **Theme support**: Ensure components work in both light and dark modes

## Contributing

When adding new components or tokens:

1. Add to appropriate directory
2. Export from relevant index.ts file
3. Add TypeScript types if needed
4. Update Tailwind config if new tokens are added
5. Update this documentation 