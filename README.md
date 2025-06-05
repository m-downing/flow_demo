# FLOW Design System

An enterprise-grade UI component library and design framework built for global supply chain management applications.

## Overview

The FLOW Design System provides a comprehensive set of React components, design tokens, and layout patterns that ensure consistency across all supply chain management applications. Built on Next.js 15 with TypeScript and Tailwind CSS, it offers a modern development experience with enterprise-ready features.

## Key Features

- **Unified App Shell**: Consistent navigation, user preferences, and layout across all applications
- **Dark Mode Support**: System-aware theme switching with smooth transitions
- **Component Library**: Production-ready components for charts, tables, forms, and more
- **Design Tokens**: Centralized colors, typography, spacing, and shadows with full TypeScript support
- **Multi-App Architecture**: Supports app switching between FLOW, Helius, Hyperion, and Oculus
- **AI Integration**: Built-in IRIS assistant for supply chain insights
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **TypeScript First**: Comprehensive type definitions for all components and design tokens

## Quick Start

### Installation

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` to view the component gallery and documentation.

### Using the Design System

1. **Import Components**
   ```tsx
   import { Button, Card, Badge } from '@/design-system';
   import { TableView, MetricCard } from '@/design-system';
   ```

2. **Use Design Tokens with TypeScript Support**
   ```tsx
   import { colors, spacing } from '@/design-system/foundations/tokens';
   import type { BadgeVariant, FontSizeKey } from '@/design-system';
   ```

3. **Apply Consistent Layout**
   ```tsx
   import { PageContainer } from '@/design-system/layout/PageContainer';
   
   export default function MyPage() {
     return (
       <PageContainer>
         {/* Your content */}
       </PageContainer>
     );
   }
   ```

## Project Structure

```
src/
├── app/                    # Demo and documentation pages
│   ├── chart-gallery/      # Chart component showcase
│   ├── demo-tables/        # Table component demos
│   ├── colors/             # Color token reference
│   ├── tailwind-grid/      # Grid system documentation
│   ├── snapshot/           # Dashboard demo
│   └── kpi/                # KPI dashboard demo
│
└── design-system/          # Core design system
    ├── components/         # UI components
    ├── charts/             # Chart components
    ├── layout/             # Layout components
    ├── overlays/           # Modals and overlays
    ├── tabularData/        # Table components
    ├── utilities/          # Utility components
    └── foundations/        # Design tokens
        └── tokens/
            ├── colors.js
            ├── typography.js
            ├── spacing.js
            ├── shadows.js
            └── types.ts    # TypeScript definitions
```

## Core Components

### Layout Components
- `AppWrapper` - Main application wrapper with sidebar and theme support
- `PageContainer` - Consistent page-level container with proper spacing
- `Card` - Flexible content container with multiple variants
- `AccountDrawer` - User account interface with preferences

### Data Display
- `TableView` - Advanced data table with sorting, filtering, and mode toggling
- `ListView` - Card-based data display alternative
- `MetricCard` - KPI display with trends and status indicators

### Feedback
- `Badge` - Status indicators with semantic variants (28 predefined variants) and optional icons
- `Spinner` - Loading states with size variants
- `InfoBanner` / `CriticalBanner` - System-wide notifications
- `Tooltip` - Contextual help and information

### Charts
- `LineChart`, `BarChart`, `PieChart` - Comprehensive chart library
- `ScatterPlot` - Correlation analysis
- `ProgressTracker` - Multi-step workflow visualization
- `MetricCard` - KPI display with status indicators

### Filters & Controls
- `DropdownSelect` / `DropdownMultiSelect` - Advanced selection components
- `DateRangeFilter` - Date range picker with presets
- `CheckboxFilter` - Boolean filtering
- `TableToggle` - View mode switching

## Design Tokens

### Spacing
Use consistent spacing tokens instead of arbitrary values:
- `gap-sm`, `gap-md`, `gap-lg` (not `gap-4`, `gap-6`)
- `mb-sm`, `mb-md`, `mb-lg` (not `mb-4`, `mb-6`)

### Colors
Semantic color system with light/dark mode support:
- Primary, Neutral, Success, Warning, Error
- Extended palette for data visualization
- Badge-specific color mappings (28 predefined badge variants)
- Chart-specific color tokens for consistent data visualization

### Typography
Bahnschrift font family optimized for Windows environments with proper fallbacks:
- Font sizes from `xxs` (10px) to `5xl` (48px) with built-in line heights
- Utility functions for programmatic access
- TypeScript support for all typography tokens

## TypeScript Support

The design system includes comprehensive TypeScript definitions for all components and design tokens:

```tsx
import type { 
  BadgeVariant,
  ButtonVariant,
  FontSizeKey,
  Colors,
  SpinnerSize
} from '@/design-system';
```

## Best Practices

1. **Always use PageContainer** for consistent page layout
2. **Import from design-system paths**, not relative imports
3. **Use semantic color tokens** rather than Tailwind defaults
4. **Leverage TypeScript types** for better development experience
5. **Use existing components** before creating new ones
6. **Follow established patterns** in demo pages for implementation guidance
7. **Ensure theme compatibility** - all components support light/dark modes

## Documentation Pages

- `/` - Interactive chart component gallery
- `/demo-tables` - Table and list view demonstrations  
- `/colors` - Complete color token reference
- `/tailwind-grid` - Grid system guide with examples
- `/snapshot` - Full dashboard implementation example
- `/kpi` - KPI dashboard with tabs and insights

## Recent Improvements

- ✅ **Enhanced TypeScript Support**: Comprehensive type definitions now exported
- ✅ **Improved Tailwind Integration**: Enhanced configuration with additional utilities
- ✅ **Component Export Consistency**: All components properly exported and documented
- ✅ **Comprehensive Documentation**: Detailed design system documentation added

## Support

For questions or issues, please contact Michael Downing or refer to the demo implementations for guidance. See `src/design-system/README.md` for detailed component and token documentation.
