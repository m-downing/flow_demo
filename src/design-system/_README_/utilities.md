# Utility Components

Utility components provide specialized functionality and helper interfaces for common application needs.

## LightDarkModeToggle

Theme toggle component for switching between light and dark modes.

```tsx
import { LightDarkModeToggle } from '@/design-system/utilities';

<LightDarkModeToggle />
```

Features:
- Integrates with the theme context system
- Visual feedback for current theme state
- Smooth transitions between themes
- Accessible toggle control
- Consistent styling with design tokens

## AIChatBox

AI-powered chat interface component for user assistance and interaction.

```tsx
import { AIChatBox } from '@/design-system/utilities';

<AIChatBox />
```

Features:
- Interactive chat interface
- Message history management
- Typing indicators
- Responsive design
- Theme-aware styling
- Accessibility support

## Usage Patterns

```tsx
// Import individual utilities
import { LightDarkModeToggle, AIChatBox } from '@/design-system/utilities';

// Or import from main index
import { LightDarkModeToggle } from '@/design-system';

// Common layout with utilities
function AppHeader() {
  return (
    <header className="flex justify-between items-center">
      <h1>Application</h1>
      <LightDarkModeToggle />
    </header>
  );
}
```

## Integration Guidelines

- Utility components are designed to work seamlessly with other design system components
- They automatically inherit theme and styling from the design system
- Can be easily integrated into existing layouts and interfaces
- Follow consistent prop patterns with other components

## Accessibility

- All utility components include proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management for interactive elements
- High contrast support for theme toggle 