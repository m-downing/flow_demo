# Design Tokens

Design tokens are the visual design decisions that form the foundation of your design system. They represent values for colors, typography, spacing, shadows, and other visual properties that ensure consistency across all components and applications.

## 🎨 Colors

Color tokens provide a comprehensive palette that ensures consistent and accessible color usage throughout your application.

### Import

```tsx
import { colors } from '@your-org/design-system/tokens';
```

### Primary Colors

```tsx
// Brand primary colors
colors.primary[50]   // #f0f9ff
colors.primary[100]  // #e0f2fe
colors.primary[200]  // #bae6fd
colors.primary[300]  // #7dd3fc
colors.primary[400]  // #38bdf8
colors.primary[500]  // #0ea5e9 (Base primary)
colors.primary[600]  // #0284c7
colors.primary[700]  // #0369a1
colors.primary[800]  // #075985
colors.primary[900]  // #0c4a6e
colors.primary[950]  // #082f49
```

### Semantic Colors

```tsx
// Success colors
colors.success[50]   // #f0fdf4
colors.success[500]  // #22c55e (Base success)
colors.success[600]  // #16a34a
colors.success[700]  // #15803d

// Warning colors
colors.warning[50]   // #fffbeb
colors.warning[500]  // #f59e0b (Base warning)
colors.warning[600]  // #d97706
colors.warning[700]  // #b45309

// Error colors
colors.error[50]     // #fef2f2
colors.error[500]    // #ef4444 (Base error)
colors.error[600]    // #dc2626
colors.error[700]    // #b91c1c

// Info colors
colors.info[50]      // #eff6ff
colors.info[500]     // #3b82f6 (Base info)
colors.info[600]     // #2563eb
colors.info[700]     // #1d4ed8
```

### Neutral Colors

```tsx
// Gray scale
colors.gray[50]      // #f9fafb
colors.gray[100]     // #f3f4f6
colors.gray[200]     // #e5e7eb
colors.gray[300]     // #d1d5db
colors.gray[400]     // #9ca3af
colors.gray[500]     // #6b7280
colors.gray[600]     // #4b5563
colors.gray[700]     // #374151
colors.gray[800]     // #1f2937
colors.gray[900]     // #111827
colors.gray[950]     // #030712

// Special neutral tokens
colors.white         // #ffffff
colors.black         // #000000
colors.transparent   // transparent
```

### Usage Examples

```tsx
// In components
const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  background-color: ${props => 
    props.variant === 'primary' 
      ? colors.primary[500] 
      : colors.gray[100]
  };
  color: ${props => 
    props.variant === 'primary' 
      ? colors.white 
      : colors.gray[700]
  };
  
  &:hover {
    background-color: ${props => 
      props.variant === 'primary' 
        ? colors.primary[600] 
        : colors.gray[200]
    };
  }
`;

// In CSS classes (Tailwind)
<div className="bg-primary-500 text-white hover:bg-primary-600">
  Primary Button
</div>

// Direct usage in React
<div style={{ 
  backgroundColor: colors.primary[500],
  color: colors.white,
  padding: '12px 24px',
  borderRadius: '8px'
}}>
  Styled with tokens
</div>
```

### Color Accessibility

All color combinations meet WCAG 2.1 accessibility standards:

```tsx
// Accessible color combinations
const accessibleCombos = {
  // High contrast (AAA)
  primary: {
    background: colors.primary[500],
    text: colors.white,
    contrast: '7.1:1'
  },
  
  // Standard contrast (AA)
  secondary: {
    background: colors.gray[100],
    text: colors.gray[700],
    contrast: '4.7:1'
  },
  
  // Error state
  error: {
    background: colors.error[50],
    text: colors.error[700],
    contrast: '5.2:1'
  }
};
```

## 📝 Typography

Typography tokens define consistent text styling across your application.

### Import

```tsx
import { typography } from '@your-org/design-system/tokens';
```

### Font Families

```tsx
typography.fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Georgia', 'serif'],
  mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  display: ['Cal Sans', 'Inter', 'sans-serif']
};
```

### Font Sizes

```tsx
typography.fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem',  // 72px
  '8xl': '6rem',    // 96px
  '9xl': '8rem'     // 128px
};
```

### Font Weights

```tsx
typography.fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};
```

### Line Heights

```tsx
typography.lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2
};
```

### Letter Spacing

```tsx
typography.letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};
```

### Typography Scale

```tsx
// Predefined text styles
const textStyles = {
  display: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight
  },
  
  h1: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight
  },
  
  h2: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight
  },
  
  h3: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.snug
  },
  
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal
  },
  
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal
  },
  
  code: {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium
  }
};
```

### Usage Examples

```tsx
// In styled-components
const Heading = styled.h1`
  font-family: ${typography.fontFamily.sans.join(', ')};
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
`;

// In CSS classes (Tailwind)
<h1 className="text-3xl font-bold leading-tight tracking-tight">
  Page Title
</h1>

// Using predefined styles
<Text style={textStyles.h1}>
  Styled Heading
</Text>

// Responsive typography
<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
  Responsive Title
</h2>
```

## 🌊 Shadows

Shadow tokens provide consistent depth and elevation throughout your interface.

### Import

```tsx
import { shadows } from '@your-org/design-system/tokens';
```

### Shadow Scale

```tsx
shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
};
```

### Colored Shadows

```tsx
const coloredShadows = {
  primary: '0 4px 14px 0 rgb(14 165 233 / 0.25)',
  success: '0 4px 14px 0 rgb(34 197 94 / 0.25)',
  warning: '0 4px 14px 0 rgb(245 158 11 / 0.25)',
  error: '0 4px 14px 0 rgb(239 68 68 / 0.25)'
};
```

### Usage Examples

```tsx
// In styled-components
const Card = styled.div`
  box-shadow: ${shadows.lg};
  
  &:hover {
    box-shadow: ${shadows.xl};
  }
`;

// In CSS classes
<div className="shadow-lg hover:shadow-xl transition-shadow">
  Card with shadow
</div>

// Colored shadows for buttons
<button className="bg-primary-500 text-white px-4 py-2 rounded-lg shadow-primary">
  Primary Button
</button>
```

## 📏 Spacing

Spacing tokens ensure consistent spacing and layout throughout your application.

### Import

```tsx
import { spacing } from '@your-org/design-system/tokens';
```

### Spacing Scale

```tsx
spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem'       // 384px
};
```

## 📐 Border Radius

Border radius tokens provide consistent corner styling.

```tsx
borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
};
```

## 🎯 Z-Index

Z-index tokens ensure proper layering of interface elements.

```tsx
zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};
```

## 🎬 Animation

Animation tokens provide consistent timing and easing.

```tsx
animation = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    slower: '500ms'
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};
```

## 🔧 Usage Patterns

### Token Usage in Components

```tsx
// Using multiple token categories
const Button = ({ variant = 'primary', size = 'md' }: ButtonProps) => {
  const styles = {
    base: {
      fontFamily: typography.fontFamily.sans.join(', '),
      fontWeight: typography.fontWeight.medium,
      borderRadius: borderRadius.md,
      transition: `all ${animation.duration.base} ${animation.easing.inOut}`,
      boxShadow: shadows.sm
    },
    
    variants: {
      primary: {
        backgroundColor: colors.primary[500],
        color: colors.white,
        '&:hover': {
          backgroundColor: colors.primary[600],
          boxShadow: shadows.md
        }
      },
      secondary: {
        backgroundColor: colors.gray[100],
        color: colors.gray[700],
        '&:hover': {
          backgroundColor: colors.gray[200]
        }
      }
    },
    
    sizes: {
      sm: {
        fontSize: typography.fontSize.sm,
        padding: `${spacing[2]} ${spacing[3]}`
      },
      md: {
        fontSize: typography.fontSize.base,
        padding: `${spacing[2.5]} ${spacing[4]}`
      },
      lg: {
        fontSize: typography.fontSize.lg,
        padding: `${spacing[3]} ${spacing[6]}`
      }
    }
  };
  
  return (
    <button 
      style={{
        ...styles.base,
        ...styles.variants[variant],
        ...styles.sizes[size]
      }}
    >
      Button Text
    </button>
  );
};
```

### Custom Token Extensions

```tsx
// Extending base tokens for specific needs
const customTokens = {
  // Custom color palette
  brand: {
    coral: '#ff6b6b',
    mint: '#51cf66',
    lavender: '#9c88ff'
  },
  
  // Custom spacing for specific layouts
  layout: {
    sidebar: '240px',
    header: '64px',
    container: '1200px'
  },
  
  // Custom breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
```

### Token-Based Theme System

```tsx
// Light and dark theme variations
const themes = {
  light: {
    background: {
      primary: colors.white,
      secondary: colors.gray[50],
      tertiary: colors.gray[100]
    },
    text: {
      primary: colors.gray[900],
      secondary: colors.gray[600],
      tertiary: colors.gray[400]
    },
    border: colors.gray[200]
  },
  
  dark: {
    background: {
      primary: colors.gray[900],
      secondary: colors.gray[800],
      tertiary: colors.gray[700]
    },
    text: {
      primary: colors.white,
      secondary: colors.gray[300],
      tertiary: colors.gray[500]
    },
    border: colors.gray[700]
  }
};
```

## 💡 Best Practices

1. **Consistency**: Always use tokens instead of hardcoded values
2. **Semantic Naming**: Use meaningful names that describe purpose, not appearance
3. **Accessibility**: Ensure color combinations meet contrast requirements
4. **Documentation**: Keep token documentation up to date
5. **Testing**: Validate tokens across different themes and contexts
6. **Migration**: Provide clear migration paths when updating tokens
7. **Performance**: Consider token bundle size and loading performance

## 🔄 Token Updates

When updating design tokens:

```tsx
// Version your tokens for safe migrations
const tokensV2 = {
  ...tokensV1,
  colors: {
    ...tokensV1.colors,
    // Updated primary colors
    primary: {
      ...tokensV1.colors.primary,
      500: '#0ea5e9' // New primary color
    }
  }
};

// Provide migration utilities
const migrateTokens = (oldTokens: TokensV1): TokensV2 => {
  return {
    ...oldTokens,
    // Add migration logic here
  };
};
``` 