# Theming and Dark Mode

The FLOW design system supports light and dark themes through a centralized theming system with smooth, performant transitions.

## Theme Context

The theming system is built on React Context and provides:
- `useTheme()` hook for accessing current theme
- `toggleTheme()` function for switching themes
- Automatic localStorage persistence
- DOM class management (`dark` class on document element)

## Usage

```tsx
import { useTheme } from '@/app/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## Smooth Theme Transitions

### Global Transition System
The design system includes automatic smooth transitions for all theme changes:

- **300ms duration** with optimized timing function
- **Comprehensive coverage** of all visual properties
- **Reduced motion support** for accessibility
- **Performance optimized** using CSS custom properties

### Enhanced Transitions
For special cases requiring more dramatic transitions:

```tsx
import { LightDarkModeToggle } from '@/design-system/utilities';

// Enhanced transition animation
<LightDarkModeToggle enhanced={true} />
```

### Theme Transition Hook
Use the `useThemeTransition` hook for advanced transition control:

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
    onTransitionStart: () => console.log('Theme change started'),
    onTransitionEnd: () => console.log('Theme change completed')
  });

  return (
    <div className={isTransitioning ? 'transitioning' : ''}>
      {/* Your content */}
    </div>
  );
}
```

### ThemeTransition Component
Wrap components that need special transition handling:

```tsx
import { ThemeTransition } from '@/design-system/utilities';

<ThemeTransition enhanced={true} showOverlay={true} duration={400}>
  <YourComponent />
</ThemeTransition>
```

### Transition Utility Classes
Control transitions at the CSS level:

- `.theme-transition-enhanced` - Longer transition duration
- `.theme-transition-immediate` - Instant changes (no transition)
- `.theme-transition-stable` - Optimized for smooth performance
- `.no-transitions` - Temporarily disable all transitions

## Theme-Aware Components

### Charts
Chart components automatically adapt to the current theme:
- Different color palettes for light/dark modes
- Theme-appropriate axis and grid colors
- Tooltip styling adapts to theme

```tsx
// Charts automatically use theme-appropriate colors
<BarChart data={data} />
<LineChart data={data} />
```

### Design Tokens
The chart token system provides theme-specific variants:
- `chartTokens.seriesVariants.light` - Light mode chart colors
- `chartTokens.seriesVariants.dark` - Dark mode chart colors
- `getChartColors(isDark)` utility function

## Theme Implementation

### CSS Classes
The system uses Tailwind's dark mode support:
- Dark mode is triggered by the `dark` class on the document element
- Components use `dark:` prefixed classes for dark mode styles

### Component Integration
Components that need theme awareness:
1. Import `useTheme` hook
2. Check current theme with `theme === 'dark'`
3. Apply appropriate styling based on theme state

## Performance Considerations

### CSS Custom Properties
Transitions use CSS custom properties for optimal performance:
```css
:root {
  --theme-transition-duration: 0.3s;
  --theme-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Hardware Acceleration
Transition-heavy elements use GPU acceleration:
```css
.theme-transition-stable {
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: background-color, color, border-color;
}
```

### Reduced Motion Support
Respects user accessibility preferences:
```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --theme-transition-duration: 0.05s;
  }
}
```

## Theme Persistence

- Theme preference is automatically saved to localStorage
- Theme is restored on page reload
- DOM state is synchronized with saved preference
- Prevents flash of incorrect theme on page load 