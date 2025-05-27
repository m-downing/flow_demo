# Theming and Dark Mode

The FLOW design system supports light and dark themes through a centralized theming system.

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

## Theme Persistence

- Theme preference is automatically saved to localStorage
- Theme is restored on page reload
- DOM state is synchronized with saved preference 