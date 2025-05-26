# Design System Overview

A comprehensive, theme-aware design system built with React, TypeScript, and Tailwind CSS. This design system provides a unified set of components, tokens, and utilities to create consistent user interfaces across your applications.

## 🎯 Key Features

- **Theme Support**: Built-in light/dark mode with seamless switching
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Accessible**: Components built with accessibility best practices
- **Consistent**: Unified design tokens for colors, typography, and spacing
- **Modular**: Import only what you need with tree-shaking support
- **Customizable**: Flexible component APIs with sensible defaults

## 📦 Installation

```bash
npm install @your-org/design-system
# or
yarn add @your-org/design-system
```

## 🚀 Quick Start

### 1. Import Components

```tsx
import { Button, Card, Input } from '@your-org/design-system';
```

### 2. Use Theme Context

Wrap your app with the theme provider to enable theme switching:

```tsx
import { ThemeProvider } from '@your-org/design-system';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 3. Basic Usage

```tsx
import { Button, Card } from '@your-org/design-system';

function MyComponent() {
  return (
    <Card>
      <h2>Welcome</h2>
      <Button variant="primary" size="md">
        Get Started
      </Button>
    </Card>
  );
}
```

## 📚 Documentation Structure

- **[Foundations](./foundations.md)** - Design tokens, colors, typography, shadows
- **[Components](./components.md)** - Main UI component documentation
  - **[Forms](./forms.md)** - Button, Input, Select components
  - **[Display](./display.md)** - Card, DataTable components  
  - **[Feedback](./feedback.md)** - Spinner, Tooltip, Badge, Notification components
  - **[Navigation](./navigation.md)** - FilterBar, TableToggle components
- **[Layout](./layout.md)** - Sidebar, AppWrapper, LoadingSpinner components
- **[Overlays](./overlays.md)** - Modal and overlay components
- **[Charts](./charts.md)** - Data visualization components
- **[Utilities](./utilities.md)** - Utility components and helpers

## 🎨 Design Tokens

All components use a unified set of design tokens:

```tsx
import { colors, typography, shadows } from '@your-org/design-system';

// Access color tokens
const primaryColor = colors.primary[600];

// Typography tokens
const headingFont = typography.fontFamily.heading;
```

## 🌙 Theme System

Components automatically adapt to light/dark themes:

```tsx
import { useTheme } from '@your-org/design-system';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

## 🔧 Customization

Components accept additional className props for customization:

```tsx
<Button 
  variant="primary"
  className="custom-styles"
  fullWidth
>
  Custom Button
</Button>
```

## 📱 Responsive Design

All components are mobile-first and responsive by default using Tailwind CSS breakpoints.

## 🆘 Support

For questions, issues, or contributions, please refer to:
- Individual component documentation in this directory
- TypeScript definitions for prop interfaces
- Storybook examples (if available)

## 🏗️ Architecture

The design system is organized into logical modules:

```
src/design-system/
├── foundations/     # Design tokens and base styles
├── components/      # Reusable UI components
├── layout/          # Layout and structural components  
├── overlays/        # Modal and overlay components
├── charts/          # Data visualization components
└── utilities/       # Helper components and functions
```

## 🎯 Best Practices

1. **Import Selectively**: Only import components you need
2. **Use Design Tokens**: Prefer design tokens over custom values
3. **Leverage TypeScript**: Take advantage of type safety
4. **Theme Awareness**: Test components in both light and dark themes
5. **Accessibility**: Follow WCAG guidelines when customizing components 