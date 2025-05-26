# FLOW Design System

## Directory Structure

The FLOW design system is organized into the following top-level modules:

### Core Components (Top Level)
- **`DataTable/`** - Enterprise-grade data table components with advanced features
- **`cards/`** - Card layout components
- **`charts/`** - Data visualization components (charts, metrics, etc.)

### Supporting Modules
- **`components/`** - UI components organized by category
  - `feedback/` - Badges, alerts, notifications
  - `forms/` - Form inputs and controls
  - `navigation/` - Navigation components
- **`foundations/`** - Design tokens (colors, typography, spacing, etc.)
- **`layout/`** - Layout and structural components
- **`overlays/`** - Modals, tooltips, popovers
- **`utilities/`** - Utility components and helpers

## Key Design Decisions

### DataTable Promotion
DataTable has been promoted to a top-level module because:
- It's one of the most critical components for enterprise applications
- It handles the majority of data display in the application
- It has extensive documentation and configuration options
- It deserves high visibility for developers

### Import Patterns

```tsx
// Preferred: Direct imports for major components
import { AGDataTable, AGColumnDef } from '@/design-system/DataTable';
import { BarChart, LineChart } from '@/design-system/charts';
import { Card } from '@/design-system/cards';

// Alternative: Main index imports (also supported)
import { AGDataTable, BarChart, Card } from '@/design-system';
```

## Getting Started

See individual component directories for detailed documentation:
- [DataTable Documentation](./DataTable/README.md)
- [Charts Documentation](./charts/README.md)
- [Component Guidelines](./components/README.md) 