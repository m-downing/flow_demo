# UI Components

UI components are organized by functional category for easy discovery and consistent usage patterns.

## Feedback Components

Components for providing user feedback and status information.

### Badge
Status and category indicators with pre-configured color schemes.

```tsx
import { Badge } from '@/design-system/components/feedback';

<Badge variant="success">Active</Badge>
<Badge variant="critical">Critical</Badge>
```

### NotificationBadge
Notification indicators for counts and alerts.

### InfoBanner & CriticalBanner
Page-level messaging components for important information.

### Spinner
Loading indicators for async operations.

### Tooltip
Contextual help and additional information overlays.

## Form Components

Interactive form elements with consistent styling and behavior.

### Button
Primary action component with multiple variants and states.

```tsx
import { Button } from '@/design-system/components/forms';

<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Cancel</Button>
```

### Input
Text input component with validation states and helper text.

```tsx
import { Input } from '@/design-system/components/forms';

<Input 
  label="Email Address"
  placeholder="Enter your email"
  type="email"
/>
```

### Select
Dropdown selection component with search and multi-select capabilities.

## Navigation Components

Components for navigation and filtering interfaces.

### FilterBar
Advanced filtering interface for data tables and lists.

```tsx
import { FilterBar } from '@/design-system/components/navigation';

<FilterBar 
  filters={filters}
  onFilterChange={handleFilterChange}
/>
```

### TableToggle
Toggle controls for table view options and settings.

## Usage Patterns

```tsx
// Import specific components
import { Badge, Spinner } from '@/design-system/components/feedback';
import { Button, Input } from '@/design-system/components/forms';
import { FilterBar } from '@/design-system/components/navigation';

// Or import from main index
import { Badge, Button, FilterBar } from '@/design-system/components';
```

## Component Guidelines

- All components follow consistent prop patterns
- Support for disabled and loading states
- Accessible by default with proper ARIA attributes
- Responsive design with mobile-first approach 