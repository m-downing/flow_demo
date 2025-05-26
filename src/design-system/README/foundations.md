# Foundations

The foundations layer contains the core design tokens that ensure consistency across all components. These tokens define colors, typography, shadows, and other fundamental design properties.

## 🎨 Colors

### Import

```tsx
import { colors, badgeColors } from '@your-org/design-system';
```

### Color Palette

The design system provides a comprehensive color palette with semantic naming:

#### Primary Colors
```tsx
colors.primary[50]   // #f0f4f8 - Lightest
colors.primary[100]  // #d9e2ec
colors.primary[200]  // #bcccdc
colors.primary[300]  // #9fb3c8
colors.primary[400]  // #829ab1
colors.primary[500]  // #627d98
colors.primary[600]  // #17314a - Main brand color
colors.primary[700]  // #10273b
colors.primary[800]  // #091d2d
colors.primary[900]  // #030e19 - Darkest
```

#### Neutral Colors
```tsx
colors.neutral[50]   // #fcfcfc - Lightest
colors.neutral[100]  // #f5f5f5
colors.neutral[200]  // #e5e5e5
colors.neutral[300]  // #d4d4d4
colors.neutral[400]  // #a3a3a3
colors.neutral[500]  // #737373
colors.neutral[600]  // #525252
colors.neutral[700]  // #404040
colors.neutral[800]  // #262626
colors.neutral[900]  // #171717
colors.neutral[950]  // #121212 - Darkest
```

#### Semantic Colors
```tsx
// Success
colors.success[50]   // #ebf9f7
colors.success[500]  // #0fa892
colors.success[700]  // #0b7a6a

// Warning  
colors.warning[50]   // #ffd7c7
colors.warning[500]  // #ff976b
colors.warning[700]  // #f26f38

// Error
colors.error[50]     // #ffeded
colors.error[100]    // #ffc9c9
colors.error[300]    // #e05353
colors.error[500]    // #e34242
```

#### Extended Palette
The system includes additional colors for specific use cases:

```tsx
colors.purple[50]    // #f6f5fc
colors.purple[500]   // #8b5cf6
colors.purple[700]   // #7c3aed

colors.teal[50]      // #faffff
colors.teal[500]     // #14b8a6
colors.teal[700]     // #00B5CC

colors.amber[50]     // #fffbeb
colors.amber[500]    // #f5ac31
colors.amber[700]    // #F59E0B
```

#### Data Visualization Colors
```tsx
colors.dataViz.primary    // #17314a
colors.dataViz.secondary  // #829ab1
colors.dataViz.positive   // #0fa892
colors.dataViz.negative   // #e34242
colors.dataViz.alt        // #bcccdc
colors.dataViz.highlight  // #f6ad55
```

### Badge Color System

Pre-configured color combinations for badges:

```tsx
// Status badges
badgeColors.planned      // Blue theme
badgeColors.ordered      // Green theme
badgeColors.active       // Success theme
badgeColors.delayed      // Error theme

// Priority badges  
badgeColors.critical     // Error theme
badgeColors.highPriority // Warning theme
badgeColors.standard     // Blue theme
badgeColors.atRisk       // Warning theme
```

### Usage Examples

```tsx
// Using color tokens directly
const primaryButton = {
  backgroundColor: colors.primary[600],
  color: colors.neutral[50]
};

// Using with Tailwind classes (colors are configured in tailwind.config.js)
<div className="bg-primary-600 text-neutral-50">
  Themed content
</div>

// Using badge colors
const statusBadge = {
  backgroundColor: badgeColors.active.bg,
  color: badgeColors.active.text
};
```

## ✍️ Typography

### Import

```tsx
import { typography } from '@your-org/design-system';
```

### Font Families

```tsx
typography.fontFamily.sans    // Default sans-serif stack
typography.fontFamily.serif   // Serif font stack  
typography.fontFamily.mono    // Monospace font stack
typography.fontFamily.heading // Heading font stack
```

### Font Sizes

```tsx
typography.fontSize.xs     // 0.75rem (12px)
typography.fontSize.sm     // 0.875rem (14px)
typography.fontSize.base   // 1rem (16px)
typography.fontSize.lg     // 1.125rem (18px)
typography.fontSize.xl     // 1.25rem (20px)
typography.fontSize['2xl'] // 1.5rem (24px)
typography.fontSize['3xl'] // 1.875rem (30px)
typography.fontSize['4xl'] // 2.25rem (36px)
```

### Font Weights

```tsx
typography.fontWeight.thin       // 100
typography.fontWeight.light      // 300
typography.fontWeight.normal     // 400
typography.fontWeight.medium     // 500
typography.fontWeight.semibold   // 600
typography.fontWeight.bold       // 700
typography.fontWeight.extrabold  // 800
```

### Line Heights

```tsx
typography.lineHeight.tight    // 1.25
typography.lineHeight.snug     // 1.375
typography.lineHeight.normal   // 1.5
typography.lineHeight.relaxed  // 1.625
typography.lineHeight.loose    // 2
```

### Usage Examples

```tsx
// Direct usage
const headingStyle = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight
};

// With Tailwind classes
<h1 className="font-heading text-2xl font-bold leading-tight">
  Page Title
</h1>
```

## 🌫️ Shadows

### Import

```tsx
import { shadows } from '@your-org/design-system';
```

### Shadow Tokens

```tsx
shadows.sm     // Small shadow for subtle elevation
shadows.base   // Default shadow for cards and buttons  
shadows.md     // Medium shadow for elevated content
shadows.lg     // Large shadow for modals and overlays
shadows.xl     // Extra large shadow for high elevation
shadows.none   // No shadow
```

### Usage Examples

```tsx
// Direct usage
const cardStyle = {
  boxShadow: shadows.md
};

// With Tailwind classes
<div className="shadow-md">
  Elevated card
</div>
```

## 🎯 Best Practices

### Color Usage
1. **Use semantic colors** for consistent meaning across the app
2. **Maintain contrast ratios** - ensure WCAG AA compliance
3. **Test in both themes** - verify colors work in light and dark modes
4. **Use neutral colors** for text and backgrounds
5. **Reserve bright colors** for accents and important actions

### Typography Guidelines  
1. **Establish hierarchy** using consistent font sizes and weights
2. **Maintain readability** with appropriate line heights
3. **Use heading fonts sparingly** - primarily for headings and emphasis
4. **Keep body text readable** with sufficient contrast and spacing

### Shadow Usage
1. **Create depth** using consistent shadow tokens
2. **Don't overuse** - reserve for components that need elevation
3. **Consider context** - modals need more elevation than cards
4. **Maintain consistency** - use the same shadow for similar components

## 🔧 Customization

To extend or modify tokens, update the source files:
- `foundations/tokens/colors.ts` - Color definitions
- `foundations/tokens/typography.ts` - Typography tokens  
- `foundations/tokens/shadows.ts` - Shadow definitions

Remember to also update your `tailwind.config.js` to reflect any changes in the design tokens.

## 🌙 Theme Compatibility

All foundation tokens are designed to work seamlessly with the theme system:
- Colors automatically adapt to light/dark contexts
- Typography remains consistent across themes
- Shadows adjust opacity based on theme background
- Components reference these tokens for automatic theme switching 