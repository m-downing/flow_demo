# Theme Color Standards Guide

This guide outlines the standard color usage patterns across our application to ensure consistent theming and proper dark mode support.

## Core Principles

1. **Always use semantic color tokens** - Never use raw hex values or non-semantic colors
2. **Ensure dark mode compatibility** - Every color choice must have a dark mode variant
3. **Maintain proper contrast ratios** - Follow WCAG guidelines for text readability
4. **Use consistent patterns** - Similar components should use similar color schemes

## Page-Level Backgrounds

### Main Application Background
```jsx
// Light mode: neutral-50, Dark mode: neutral-950
<div className="bg-neutral-50 dark:bg-neutral-950">
```

### Secondary Backgrounds (Nested containers)
```jsx
// Light mode: white or neutral-50, Dark mode: neutral-900
<div className="bg-white dark:bg-neutral-900">
// or
<div className="bg-neutral-50 dark:bg-neutral-900">
```

## Component Color Standards

### Cards and Containers

**Standard Card**
```jsx
<div className="
  bg-white dark:bg-neutral-900 
  border border-neutral-200 dark:border-neutral-700
  shadow-md
">
```

**Elevated/Important Card**
```jsx
<div className="
  bg-neutral-50 dark:bg-neutral-800 
  border border-neutral-300 dark:border-neutral-600
  shadow-lg
">
```

### Text Colors

**Primary Text (Headings, Important Content)**
```jsx
<h1 className="text-neutral-800 dark:text-neutral-50">
<h2 className="text-neutral-800 dark:text-neutral-50">
<p className="text-neutral-900 dark:text-neutral-100">
```

**Secondary Text (Descriptions, Supporting)**
```jsx
<p className="text-neutral-600 dark:text-neutral-200">
<span className="text-neutral-600 dark:text-neutral-300">
```

**Muted Text (Timestamps, Labels)**
```jsx
<span className="text-neutral-500 dark:text-neutral-400">
<time className="text-neutral-400 dark:text-neutral-500">
```

### Interactive Elements

**Primary Buttons**
```jsx
// Default state
className="bg-primary-600 hover:bg-primary-700 text-neutral-50"

// Dark mode
className="bg-primary-500 hover:bg-primary-400 text-neutral-50"
```

**Secondary Buttons**
```jsx
// Light mode
className="bg-neutral-200 hover:bg-neutral-300 text-neutral-900 border border-neutral-300"

// Dark mode  
className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 border border-neutral-600"
```

**Links and Text Buttons**
```jsx
// Light mode
className="text-primary-600 hover:text-primary-700"

// Dark mode
className="text-primary-300 hover:text-primary-200"
```

### Form Elements

**Input Fields**
```jsx
<input className="
  bg-white dark:bg-primary-900 
  border border-neutral-300 dark:border-primary-600 
  text-neutral-900 dark:text-primary-100 
  placeholder-neutral-500 dark:placeholder-primary-400
  focus:border-primary-600 dark:focus:border-primary-400
" />
```

**Disabled Inputs**
```jsx
className="
  bg-neutral-100 dark:bg-neutral-900 
  border-neutral-300 dark:border-neutral-700 
  text-neutral-500 dark:text-neutral-500
"
```

### Status and Feedback

**Success States**
```jsx
// Background
className="bg-success-50 dark:bg-success-700/20"

// Text
className="text-success-700 dark:text-success-400"

// Border
className="border-success-500 dark:border-success-400"
```

**Warning States**
```jsx
// Background
className="bg-warning-50 dark:bg-warning-700/20"

// Text
className="text-warning-700 dark:text-warning-400"

// Border
className="border-warning-500 dark:border-warning-400"
```

**Error States**
```jsx
// Background
className="bg-error-50 dark:bg-error-500/20"

// Text  
className="text-error-700 dark:text-error-400"

// Border
className="border-error-500 dark:border-error-400"
```

### Data Visualization

**Chart Backgrounds**
```jsx
// Container
className="bg-neutral-50 dark:bg-neutral-900"

// Chart area
className="bg-white dark:bg-neutral-800"
```

**Chart Colors (Use dataViz tokens)**
- Primary data: `dataViz.primary`
- Secondary data: `dataViz.secondary`
- Positive values: `dataViz.positive`
- Negative values: `dataViz.negative`
- Alternative data: `dataViz.alt`
- Highlights: `dataViz.highlight`

### Tables

**Table Header**
```jsx
className="bg-neutral-100 dark:bg-primary-800 text-neutral-700 dark:text-neutral-300"
```

**Table Rows**
```jsx
// Default row
className="bg-white dark:bg-transparent"

// Hover state
className="hover:bg-neutral-100 dark:hover:bg-primary-700"

// Alternating rows (if used)
className="even:bg-neutral-50 dark:even:bg-primary-900/50"
```

**Table Borders**
```jsx
className="border-neutral-200 dark:border-primary-700"
```

### Navigation and Sidebars

**Sidebar Background**
```jsx
className="bg-primary-800 dark:bg-primary-900"
```

**Navigation Items**
```jsx
// Default
className="text-primary-200 hover:text-primary-50"

// Active
className="bg-primary-700 text-primary-50"

// Dark mode adjustments
className="dark:text-primary-300 dark:hover:text-primary-100"
```

### Modals and Overlays

**Modal Backdrop**
```jsx
className="bg-black/50 dark:bg-black/70"
```

**Modal Content**
```jsx
className="bg-white dark:bg-neutral-900"
```

**Modal Header/Footer**
```jsx
// Header
className="border-b border-neutral-200 dark:border-neutral-700"

// Footer
className="bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700"
```

## Special Components

### Badges and Pills

**Status Badges (Use predefined badge colors)**
```jsx
// Active/Success
className="bg-green-500 text-success-50"

// Warning/At Risk
className="bg-amber-700 text-neutral-50"

// Error/Critical
className="bg-error-500 text-neutral-50"

// Standard/Info
className="bg-blue-700 text-blue-50"
```

### Tooltips
```jsx
// Light mode
className="bg-neutral-800 text-neutral-50"

// Dark mode
className="bg-neutral-100 text-neutral-800"
```

### Dividers and Borders
```jsx
// Standard divider
className="border-neutral-200 dark:border-neutral-700"

// Subtle divider
className="border-neutral-100 dark:border-neutral-800"

// Strong divider
className="border-neutral-300 dark:border-neutral-600"
```

## Focus and Accessibility

### Focus Rings
```jsx
// Light mode
className="focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-opacity-50"

// Dark mode
className="dark:focus-visible:ring-primary-300 dark:focus-visible:ring-opacity-50"
```

### Skip Links and Accessibility Elements
```jsx
className="
  bg-primary-600 text-neutral-50 
  focus:bg-primary-700
  dark:bg-primary-500 dark:focus:bg-primary-400
"
```

## Best Practices

1. **Test in Both Themes** - Always verify your color choices work in both light and dark modes
2. **Check Contrast Ratios** - Use tools to ensure text is readable against backgrounds
3. **Be Consistent** - Similar elements should use similar color patterns
4. **Use Semantic Colors** - Choose colors based on meaning, not just appearance
5. **Avoid Hardcoded Colors** - Always use design tokens instead of hex values
6. **Group Related Classes** - Keep light and dark variants together for maintainability

## Common Patterns to Avoid

❌ **Don't use arbitrary colors**
```jsx
// Bad
<div className="bg-[#123456] text-[#fedcba]">
```

❌ **Don't forget dark mode**
```jsx
// Bad
<div className="bg-white text-black">
```

❌ **Don't mix semantic contexts**
```jsx
// Bad - using error colors for non-error content
<div className="bg-error-500 text-white">Welcome!</div>
```

✅ **Do use semantic tokens with dark mode support**
```jsx
// Good
<div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
```
