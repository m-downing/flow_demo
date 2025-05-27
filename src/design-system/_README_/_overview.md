# Design System Overview

The FLOW Design System is a comprehensive component library organized into logical modules for enterprise applications.

## Architecture

The design system follows a modular architecture with clear separation of concerns:

### Core Components
- **DataTable** - Enterprise-grade data tables with advanced features
- **Charts** - Data visualization components (Bar, Line, Pie, Scatter, Progress)
- **Cards** - Layout card components

### Component Categories
- **Components** - UI components organized by purpose (feedback, forms, navigation)
- **Layout** - Structural components (AppWrapper, Sidebar, LoadingSpinner)
- **Overlays** - Modal and overlay components

### Foundation
- **Foundations** - Design tokens (colors, typography, spacing, shadows, borderRadius)
- **Utilities** - Helper components and utilities

## Import Patterns

```tsx
// Direct imports (recommended)
import { AGDataTable } from '@/design-system/DataTable';
import { BarChart, LineChart } from '@/design-system/charts';
import { Button, Input } from '@/design-system/components/forms';

// Main index imports
import { AGDataTable, BarChart, Button } from '@/design-system';
```

## Theming

The design system supports light and dark themes through a centralized theme context and design tokens.

## Getting Started

Explore individual component guides for detailed documentation and examples. 