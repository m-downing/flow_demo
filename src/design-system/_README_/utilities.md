# Utility Components

Utility components provide specialized functionality and helper interfaces for common application needs.

## LightDarkModeToggle

Theme toggle component for switching between light and dark modes.

```tsx
import { LightDarkModeToggle } from '@/design-system/utilities';

// Basic usage
<LightDarkModeToggle />

// With enhanced transitions
<LightDarkModeToggle enhanced={true} />

// Controlled mode
<LightDarkModeToggle 
  mode={currentTheme}
  onChange={(mode) => setTheme(mode)}
/>
```

### Features:
- Integrates with the theme context system
- Visual feedback for current theme state
- Smooth transitions between themes with optional enhancement
- Accessible toggle control with keyboard support
- Consistent styling with design tokens
- Scale animation during transitions

### Props:
- `mode?: 'light' | 'dark'` - Controlled theme mode
- `onChange?: (mode) => void` - Theme change callback
- `disabled?: boolean` - Disable the toggle
- `className?: string` - Additional CSS classes
- `enhanced?: boolean` - Enable enhanced transition animations

## ThemeTransition

Wrapper component that enhances theme switching with smooth visual transitions and optional overlay effects.

```tsx
import { ThemeTransition } from '@/design-system/utilities';

// Basic wrapper
<ThemeTransition>
  <YourComponent />
</ThemeTransition>

// Enhanced with overlay
<ThemeTransition 
  enhanced={true} 
  showOverlay={true} 
  duration={400}
>
  <ComplexComponent />
</ThemeTransition>
```

### Features:
- Smooth transition animations for wrapped content
- Optional overlay to mask visual inconsistencies
- Configurable transition duration
- Enhanced transition modes
- Performance optimized with GPU acceleration

### Props:
- `children: React.ReactNode` - Components to wrap
- `duration?: number` - Transition duration in milliseconds (default: 300)
- `showOverlay?: boolean` - Show subtle overlay during transition
- `enhanced?: boolean` - Use enhanced transition timing

## AIChatBox

AI-powered chat interface component for user assistance and interaction.

```tsx
import { AIChatBox } from '@/design-system/utilities';

<AIChatBox />
```

### Features:
- Interactive chat interface
- Message history management
- Typing indicators
- Responsive design
- Theme-aware styling
- Accessibility support

## Usage Patterns

```tsx
// Import individual utilities
import { LightDarkModeToggle, ThemeTransition } from '@/design-system/utilities';

// Or import from main index
import { LightDarkModeToggle } from '@/design-system';

// Enhanced app header with smooth transitions
function AppHeader() {
  return (
    <ThemeTransition enhanced={true}>
      <header className="flex justify-between items-center">
        <h1>Application</h1>
        <LightDarkModeToggle enhanced={true} />
      </header>
    </ThemeTransition>
  );
}

// Theme-sensitive layout component
function Layout({ children }) {
  return (
    <ThemeTransition showOverlay={true} duration={400}>
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        {children}
      </div>
    </ThemeTransition>
  );
}
```

## Theme Transition Utilities

### useThemeTransition Hook
Custom hook for advanced theme transition control:

```tsx
import { useThemeTransition } from '@/app/hooks/useThemeTransition';

function MyComponent() {
  const {
    isTransitioning,
    previousTheme,
    triggerEnhanced,
    disableTransitions,
    enableTransitions
  } = useThemeTransition({
    duration: 500,
    enhanced: true,
    onTransitionStart: () => console.log('Starting transition'),
    onTransitionEnd: () => console.log('Transition complete')
  });

  return (
    <div className={isTransitioning ? 'opacity-75' : 'opacity-100'}>
      Content with transition feedback
    </div>
  );
}
```

### CSS Utility Classes
Direct control over transition behavior:

```tsx
// Enhanced transitions
<div className="theme-transition-enhanced">
  Slower, more dramatic transitions
</div>

// Immediate changes (no transition)
<div className="theme-transition-immediate">
  Instant theme changes
</div>

// Performance optimized
<div className="theme-transition-stable">
  GPU-accelerated transitions
</div>

// Temporarily disable transitions
<div className="no-transitions">
  No transitions applied
</div>
```

## Integration Guidelines

- Utility components are designed to work seamlessly with other design system components
- They automatically inherit theme and styling from the design system
- Can be easily integrated into existing layouts and interfaces
- Follow consistent prop patterns with other components

## Accessibility

- All utility components include proper ARIA attributes
- Keyboard navigation support for interactive elements
- Screen reader compatibility with descriptive labels
- Focus management for theme toggle
- Respects `prefers-reduced-motion` for accessibility
- High contrast support for theme toggle states

## Performance

- Transitions use CSS custom properties for optimal performance
- GPU acceleration for smooth animations
- Minimal JavaScript overhead
- Optimized for 60fps animations
- Efficient DOM manipulation with class-based transitions 