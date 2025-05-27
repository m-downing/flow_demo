# Layout Components

Layout components provide the structural foundation for application interfaces.

## AppWrapper

Main application wrapper component that provides the overall layout structure and context providers.

```tsx
import { AppWrapper } from '@/design-system/layout';

<AppWrapper>
  {/* Your app content */}
</AppWrapper>
```

## Sidebar

Navigation sidebar component with collapsible functionality and navigation items.

```tsx
import { Sidebar } from '@/design-system/layout';

<Sidebar />
```

Features:
- Collapsible/expandable navigation
- Active state management
- Responsive behavior
- Integration with navigation constants

## LoadingSpinner

Animated loading indicator for async operations and page transitions.

```tsx
import { LoadingSpinner } from '@/design-system/layout';

<LoadingSpinner />
```

Features:
- Smooth CSS animations
- Consistent styling with design tokens
- Multiple size variants
- Accessible loading states

## Navigation Constants

Pre-defined navigation structure and tab configurations:

```tsx
import { appTabs, navTabs, dashboardTab } from '@/design-system/layout';

// Access navigation configuration
const tabs = appTabs;
const navigation = navTabs;
```

## Usage Patterns

```tsx
// Complete layout structure
import { AppWrapper, Sidebar, LoadingSpinner } from '@/design-system/layout';

function App() {
  return (
    <AppWrapper>
      <Sidebar />
      <main>
        {isLoading ? <LoadingSpinner /> : <Content />}
      </main>
    </AppWrapper>
  );
}
```

## Layout Guidelines

- Layout components handle responsive behavior automatically
- Consistent spacing and alignment across all layouts
- Integration with theme system for dark/light mode support
- Semantic HTML structure for accessibility 