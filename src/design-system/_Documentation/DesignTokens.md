# Design Tokens Guide

This guide documents the design tokens available in our Tailwind-based design system. These tokens provide a consistent foundation for building user interfaces across all applications.

## Overview

Design tokens are the smallest pieces of our design system - they define the visual properties like colors, spacing, typography, and effects that maintain consistency across our applications. All tokens are defined in `src/design-system/foundations/tokens/` and integrated with Tailwind CSS.

## Color Tokens

Our color system is built on a comprehensive palette with semantic naming and purpose-driven organization.

### Primary Colors
- **Primary-50 to Primary-900**: Core brand colors ranging from lightest to darkest
- **Primary-600** (`#17314a`): Main brand color for primary actions and emphasis
- Usage: Primary buttons, links, focus states, navigation elements

### Neutral Colors
- **Neutral-50 to Neutral-950**: Gray scale for text, backgrounds, and borders
- Usage: Body text, containers, dividers, disabled states

### Semantic Colors
```javascript
// Success states
success: { 50: '#ebf9f7', 500: '#0fa892', 700: '#0b7a6a' }

// Warning states  
warning: { 50: '#ffd7c7', 500: '#ff976b', 700: '#f26f38' }

// Error states
error: { 50: '#ffeded', 100: '#ffc9c9', 300: '#e05353', 500: '#e34242' }
```

### Additional Color Palettes
- **Purple, Green, Teal, Amber, Yellow, Brown, Orange, Magenta, Blue, Slate**: Extended palette for data visualization and special use cases

### Badge Colors
Pre-configured color combinations for supply chain status badges:
```javascript
// Example usage
<span className="bg-[#17314a] text-[#f0f4f8]">Planned</span>
<span className="bg-[#196937] text-neutral-50">Ordered</span>
<span className="bg-[#0fa892] text-[#ebf9f7]">Active</span>
<span className="bg-[#e34242] text-neutral-50">Delayed</span>
```

### Data Visualization Colors
```javascript
dataViz: {
  primary: '#17314a',
  secondary: '#829ab1', 
  positive: '#0fa892',
  negative: '#e34242',
  alt: '#bcccdc',
  highlight: '#f6ad55'
}
```

## Spacing Tokens

Consistent spacing creates visual rhythm and hierarchy:

```javascript
spacing: {
  xs: '0.25rem',  // 4px - Tight spacing for compact elements
  sm: '0.5rem',   // 8px - Small gaps between related items
  md: '1rem',     // 16px - Standard spacing
  lg: '1.5rem',   // 24px - Section spacing
  xl: '2rem',     // 32px - Large section breaks
  '2xl': '3rem'   // 48px - Major section divisions
}
```

**Usage in Tailwind:**
- Padding: `p-xs`, `px-md`, `py-lg`
- Margin: `m-sm`, `mx-xl`, `my-2xl`
- Gap: `gap-md`, `gap-x-lg`

## Border Radius Tokens

Consistent rounding for UI elements:

```javascript
borderRadius: {
  xs: '0.125rem',  // 2px - Subtle rounding
  sm: '0.275rem',  // 4.4px - Small elements
  md: '0.375rem',  // 6px - Default for cards/buttons
  lg: '0.5rem',    // 8px - Larger containers
  xl: '1rem'       // 16px - Modal/overlay elements
}
```

**Usage in Tailwind:**
- `rounded-sm` for buttons and inputs
- `rounded-md` for cards and containers
- `rounded-lg` for modals and overlays

## Shadow Tokens

Elevation and depth through shadows:

```javascript
shadows: {
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',   // Subtle depth
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',    // Light elevation
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',    // Standard cards
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',  // Dropdowns/popovers
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)'  // Modals/overlays
}
```

**Usage in Tailwind:**
- `shadow-sm` for buttons and interactive elements
- `shadow-md` for cards and containers
- `shadow-lg` for dropdowns and floating elements
- `shadow-xl` for modals and drawers

## Typography Tokens

Typography tokens define font families, sizes, weights, and spacing for consistent text rendering. Reference the `typography.js` file for the complete set of text styles.

## Component Usage Patterns

### Buttons
```jsx
// Primary button with design tokens
<button className="
  bg-primary-600 hover:bg-primary-700 
  text-neutral-50 
  px-md py-sm 
  rounded-sm 
  shadow-sm
">
  Click Me
</button>
```

### Cards/Containers
```jsx
// Standard container pattern
<div className="
  bg-neutral-50 dark:bg-neutral-900 
  p-lg 
  rounded-md 
  shadow-md 
  border border-neutral-200 dark:border-neutral-700
">
  Content
</div>
```

### Form Inputs
```jsx
// Input with focus states
<input className="
  bg-white dark:bg-primary-900 
  border border-neutral-300 dark:border-primary-600 
  text-neutral-900 dark:text-primary-100 
  px-md py-sm 
  rounded-sm
  focus:border-primary-600 dark:focus:border-primary-400
  focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-opacity-30
" />
```

## Dark Mode Considerations

All components should support both light and dark modes:
- Use semantic color tokens that have both light and dark variants
- Apply dark mode classes with the `dark:` prefix
- Test components in both themes to ensure readability and contrast

## Best Practices

1. **Always use tokens instead of arbitrary values** - This ensures consistency and makes theme updates easier
2. **Use semantic tokens when available** - e.g., `error-500` instead of `red-500` for error states
3. **Combine tokens thoughtfully** - Layer spacing, colors, and effects to create depth
4. **Test in both themes** - Ensure your components look good in light and dark modes
5. **Reference existing components** - Look at Button, Card, Input, and Modal components for patterns

## Token Access

All tokens are available through:
- Direct Tailwind classes (configured in `tailwind.config.mjs`)
- JavaScript imports from `@/design-system/foundations/tokens/*`
- TypeScript types from `@/design-system/foundations/tokens/types`
