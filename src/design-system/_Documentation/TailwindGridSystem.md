# Tailwind Grid System Guide

This guide covers our standard implementation of Tailwind's grid system for creating responsive, consistent layouts across the application.

## Grid Fundamentals

This design system leverages Tailwind's powerful grid utilities to create flexible, responsive layouts. We primarily use a 12-column grid system for maximum flexibility.

### Basic Grid Setup

```jsx
// Standard 12-column grid
<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
  <div className="md:col-span-8">Main content</div>
  <div className="md:col-span-4">Sidebar</div>
</div>
```

### Responsive Breakpoints

- **Mobile (default)**: Single column layouts (not fully implemented yet - need to make updates to NavBar component, will do later)
- **Tablet (md)**: 12-column grid activates at 768px
- **Desktop (lg)**: Refined spacing and sizing at 1024px
- **Wide (xl)**: Maximum content width containers at 1280px

## Container Standards

### Page Containers

**Standard Page Layout**
```jsx
<div className="pt-8 px-6 py-8 pb-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
  <div className="max-w-[1600px] mx-auto">
    {/* Page content */}
  </div>
</div>
```

### Content Cards/Columns

**Standard Container Styling**
```jsx
<div className="
  bg-white dark:bg-neutral-900 
  shadow-md 
  rounded-lg 
  p-4
">
  {/* Component content */}
</div>
```

**Component Breakdown:**
- **Background**: `bg-white dark:bg-neutral-900` (elevated surfaces)
- **Shadow**: `shadow-md` for standard elevation
- **Rounding**: `rounded-lg` (8px radius)
- **Padding**: `p-4` (16px internal spacing)

### Alternative Container Styles

**Subtle Container (for nested content)**
```jsx
<div className="
  bg-neutral-50 dark:bg-neutral-900 
  shadow-sm 
  rounded-md 
  p-3
">
```

**Prominent Container (for important content)**
```jsx
<div className="
  bg-neutral-50 dark:bg-neutral-800 
  shadow-lg 
  rounded-lg 
  p-6
">
```

## Grid Patterns

### Common Layout Patterns

**Two-Column Layout (2/3 + 1/3)**
```jsx
<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
  <div className="md:col-span-8">{/* Main content */}</div>
  <div className="md:col-span-4">{/* Sidebar */}</div>
</div>
```

**Three-Column Layout (Equal)**
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
  <div>{/* Column 3 */}</div>
</div>
```

**Four-Column Layout (Cards)**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>{/* Card 1 */}</div>
  <div>{/* Card 2 */}</div>
  <div>{/* Card 3 */}</div>
  <div>{/* Card 4 */}</div>
</div>
```

**Dashboard Metrics Layout**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  {metrics.map(metric => (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-4">
      {/* Metric content */}
    </div>
  ))}
</div>
```

### Asymmetric Layouts

**Content with Details Panel**
```jsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <div className="lg:col-span-7">{/* Main content */}</div>
  <div className="lg:col-span-5">{/* Details panel */}</div>
</div>
```

**Wide Content with Narrow Sidebar**
```jsx
<div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
  <div className="xl:col-span-10">{/* Wide content */}</div>
  <div className="xl:col-span-2">{/* Narrow sidebar */}</div>
</div>
```

## Spacing Standards

### Gap Utilities

- **Tight spacing**: `gap-2` (8px) - For related items
- **Standard spacing**: `gap-4` (16px) - Default for most grids
- **Comfortable spacing**: `gap-6` (24px) - For distinct sections
- **Generous spacing**: `gap-8` (32px) - For major sections

### Padding Standards

**Container Padding by Size:**
- **Small containers**: `p-3` (12px)
- **Standard containers**: `p-4` (16px)
- **Large containers**: `p-6` (24px)
- **Hero/Feature sections**: `p-8` or `py-12 px-8`

### Margin Standards

**Section Separation:**
```jsx
// Between major sections
<div className="mb-6">{/* Section 1 */}</div>
<div className="mb-6">{/* Section 2 */}</div>

// Between related components
<div className="mb-4">{/* Component 1 */}</div>
<div className="mb-4">{/* Component 2 */}</div>
```

## Shadow and Elevation

### Shadow Hierarchy

1. **No shadow**: Inline or embedded content
2. **shadow-sm**: Subtle elevation for buttons, inputs
3. **shadow-md**: Standard cards and containers
4. **shadow-lg**: Dropdowns, important cards
5. **shadow-xl**: Modals, drawers, overlays

### Usage Examples

```jsx
// Standard card
<div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">

// Floating action button
<button className="bg-primary-600 text-white shadow-lg rounded-full p-3">

// Modal/Overlay
<div className="bg-white dark:bg-neutral-900 shadow-xl rounded-lg p-6">
```

## Responsive Considerations

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```jsx
<div className="
  grid 
  grid-cols-1           // Mobile: single column
  sm:grid-cols-2        // Small tablets: 2 columns
  md:grid-cols-3        // Tablets: 3 columns
  lg:grid-cols-4        // Desktop: 4 columns
  gap-4
">
```

### Responsive Padding/Margins

```jsx
<div className="
  p-4 md:p-6 lg:p-8    // Padding increases with screen size
  mx-4 md:mx-6 lg:mx-8 // Margins adjust for different screens
">
```

### Hide/Show Elements

```jsx
// Show only on desktop
<div className="hidden lg:block">

// Hide on mobile
<div className="block md:hidden">
```

## Best Practices

### 1. Consistent Spacing
Always use the predefined spacing scale (2, 4, 6, 8) rather than arbitrary values.

### 2. Responsive by Default
Every layout should work on mobile first, then enhance for larger screens.

### 3. Semantic Structure
```jsx
// Good: Clear hierarchy
<main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <article className="lg:col-span-8">
  <aside className="lg:col-span-4">
</main>

// Bad: Unclear structure
<div className="grid grid-cols-12">
  <div className="col-span-8">
  <div className="col-span-4">
</div>
```

### 4. Container Consistency
Use the same container styles for similar content types across the application.

### 5. Avoid Fixed Heights
Let content determine height naturally:
```jsx
// Good
<div className="min-h-screen">

// Avoid
<div className="h-[600px]">
```

## Common Grid Examples

### Dashboard Layout
```jsx
<div className="pt-8 px-6 pb-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
  <div className="max-w-[1600px] mx-auto">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
        Dashboard
      </h1>
    </div>
    
    {/* Metrics Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Metric cards */}
    </div>
    
    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
          {/* Chart or main content */}
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
          {/* Secondary content */}
        </div>
      </div>
    </div>
  </div>
</div>
```

### Form Layout
```jsx
<div className="max-w-2xl mx-auto">
  <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        {/* Full-width field */}
      </div>
      <div>
        {/* Half-width field */}
      </div>
      <div>
        {/* Half-width field */}
      </div>
    </div>
  </div>
</div>
```

## Accessibility Notes

1. **Logical Order**: Ensure grid items follow a logical reading order
2. **Focus Management**: Grid reordering shouldn't break keyboard navigation
3. **Screen Reader Support**: Use semantic HTML within grid containers
4. **Responsive Tables**: Consider converting complex grids to scrollable tables on mobile

## Summary

The Tailwind grid system provides a flexible foundation for layouts. By following these standards, you ensure:
- Consistent spacing and alignment
- Predictable responsive behavior
- Maintainable code structure
- Accessible layouts
- Professional appearance in both light and dark modes
