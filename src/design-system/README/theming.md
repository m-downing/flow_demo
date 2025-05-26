# Theming & Customization

The design system provides a flexible theming system that allows you to customize colors, typography, spacing, and other design tokens while maintaining consistency and accessibility.

## 🎨 Theme Structure

### Base Theme Configuration

```tsx
interface Theme {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
  borderRadius: BorderRadiusTokens;
  zIndex: ZIndexTokens;
  animation: AnimationTokens;
  breakpoints: BreakpointTokens;
}

// Default theme
const defaultTheme: Theme = {
  colors: {
    primary: { /* ... */ },
    secondary: { /* ... */ },
    success: { /* ... */ },
    warning: { /* ... */ },
    error: { /* ... */ },
    gray: { /* ... */ }
  },
  typography: { /* ... */ },
  spacing: { /* ... */ },
  // ... other tokens
};
```

### Theme Provider Setup

```tsx
import { ThemeProvider } from '@your-org/design-system';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <YourApplication />
    </ThemeProvider>
  );
}
```

## 🌓 Dark Mode Implementation

### Theme Variants

```tsx
// Light theme
const lightTheme: Theme = {
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6'
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af'
    },
    border: '#e5e7eb',
    // ... other color tokens
  },
  // ... other theme properties
};

// Dark theme
const darkTheme: Theme = {
  colors: {
    background: {
      primary: '#111827',
      secondary: '#1f2937',
      tertiary: '#374151'
    },
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      tertiary: '#9ca3af'
    },
    border: '#374151',
    // ... other color tokens
  },
  // ... other theme properties
};
```

### Dynamic Theme Switching

```tsx
import { useState, useEffect, createContext, useContext } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load saved theme preference
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      };
      
      updateTheme();
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    } else {
      setResolvedTheme(mode === 'dark' ? 'dark' : 'light');
    }
    
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const theme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme }}>
      <div data-theme={resolvedTheme} className={resolvedTheme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## 🎯 Custom Theme Creation

### Creating a Custom Theme

```tsx
import { createTheme } from '@your-org/design-system';

// Brand-specific theme
const brandTheme = createTheme({
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',  // Your brand blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    secondary: {
      // Custom secondary color palette
      50: '#fdf2f8',
      500: '#ec4899',  // Your brand pink
      600: '#db2777',
      // ... complete palette
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Poppins', 'Inter', 'sans-serif']
    }
  },
  // Override other tokens as needed
});

// Use the custom theme
<ThemeProvider theme={brandTheme}>
  <App />
</ThemeProvider>
```

### Theme Extension

```tsx
import { extendTheme } from '@your-org/design-system';

// Extend the default theme
const customTheme = extendTheme({
  colors: {
    // Add custom colors
    brand: {
      coral: '#ff6b6b',
      mint: '#51cf66',
      lavender: '#9c88ff'
    }
  },
  spacing: {
    // Add custom spacing values
    18: '4.5rem',
    72: '18rem'
  },
  typography: {
    fontSize: {
      // Custom font sizes
      '10xl': '10rem'
    }
  }
});
```

## 🔧 Component Customization

### Styled Components Integration

```tsx
import styled from 'styled-components';
import { useTheme } from '@your-org/design-system';

const CustomButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${({ theme, variant = 'primary' }) => 
    variant === 'primary' 
      ? theme.colors.primary[500] 
      : theme.colors.gray[100]
  };
  color: ${({ theme, variant = 'primary' }) => 
    variant === 'primary' 
      ? theme.colors.white 
      : theme.colors.gray[700]
  };
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.animation.duration.base} ${({ theme }) => theme.animation.easing.inOut};
  
  &:hover {
    background-color: ${({ theme, variant = 'primary' }) => 
      variant === 'primary' 
        ? theme.colors.primary[600] 
        : theme.colors.gray[200]
    };
  }
`;

// Usage
function MyComponent() {
  return (
    <div>
      <CustomButton variant="primary">Primary Action</CustomButton>
      <CustomButton variant="secondary">Secondary Action</CustomButton>
    </div>
  );
}
```

### CSS-in-JS with Emotion

```tsx
import { css } from '@emotion/react';
import { useTheme } from '@your-org/design-system';

function StyledComponent() {
  const { theme } = useTheme();
  
  const buttonStyles = css`
    background-color: ${theme.colors.primary[500]};
    color: ${theme.colors.white};
    padding: ${theme.spacing[3]} ${theme.spacing[6]};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    box-shadow: ${theme.shadows.sm};
    transition: all ${theme.animation.duration.base} ${theme.animation.easing.inOut};
    
    &:hover {
      background-color: ${theme.colors.primary[600]};
      box-shadow: ${theme.shadows.md};
    }
  `;
  
  return <button css={buttonStyles}>Themed Button</button>;
}
```

### Tailwind CSS Integration

```tsx
// tailwind.config.js
const { createTailwindTheme } = require('@your-org/design-system/tailwind');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...createTailwindTheme({
        colors: {
          primary: {
            50: '#eff6ff',
            500: '#3b82f6',
            600: '#2563eb',
            // ... your custom colors
          }
        }
      })
    }
  },
  plugins: []
};

// Usage in components
function TailwindComponent() {
  return (
    <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
      Tailwind Themed Button
    </button>
  );
}
```

## 🌈 Color System Customization

### Custom Color Palettes

```tsx
// Generate color palette from base color
import { generateColorPalette } from '@your-org/design-system/utils';

const customColors = {
  brand: generateColorPalette('#6366f1'), // Generates 50-950 scale
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',  // Base accent color
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e'
  }
};

const themeWithCustomColors = extendTheme({
  colors: customColors
});
```

### Dynamic Color Generation

```tsx
// Utility for creating cohesive color schemes
function createColorScheme(baseColor: string, options?: {
  saturation?: number;
  lightness?: number;
  harmony?: 'monochromatic' | 'analogous' | 'complementary' | 'triadic';
}) {
  // Implementation would generate harmonious color palettes
  return {
    primary: generateColorPalette(baseColor),
    secondary: generateComplementaryPalette(baseColor),
    accent: generateTriadicPalette(baseColor)
  };
}

// Usage
const dynamicTheme = createTheme({
  colors: createColorScheme('#3b82f6', { 
    harmony: 'complementary' 
  })
});
```

## 📱 Responsive Theming

### Breakpoint-Specific Themes

```tsx
const responsiveTheme = createTheme({
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  // Responsive spacing
  spacing: {
    container: {
      xs: '100%',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  // Responsive typography
  typography: {
    fontSize: {
      responsive: {
        xs: '0.875rem',
        sm: '1rem',
        md: '1.125rem',
        lg: '1.25rem'
      }
    }
  }
});
```

### Container Queries Support

```tsx
// Component that adapts to container size
const ResponsiveCard = styled.div`
  @container (min-width: 300px) {
    padding: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @container (min-width: 500px) {
    padding: ${({ theme }) => theme.spacing[8]};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;
```

## 🔌 Theme Plugins

### Creating Theme Plugins

```tsx
interface ThemePlugin {
  name: string;
  extend: (theme: Theme) => Partial<Theme>;
}

const animationPlugin: ThemePlugin = {
  name: 'enhanced-animations',
  extend: (theme) => ({
    animation: {
      ...theme.animation,
      duration: {
        ...theme.animation.duration,
        fast: '100ms',
        normal: '200ms',
        slow: '300ms'
      },
      easing: {
        ...theme.animation.easing,
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  })
};

// Apply plugin to theme
const enhancedTheme = applyPlugins(baseTheme, [animationPlugin]);
```

### Community Plugins

```tsx
// Example community plugins
import { 
  gradientPlugin,
  accessibilityPlugin,
  motionPlugin 
} from '@your-org/design-system-plugins';

const themeWithPlugins = applyPlugins(baseTheme, [
  gradientPlugin({
    gradients: {
      sunset: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
      ocean: 'linear-gradient(135deg, #667eea, #764ba2)'
    }
  }),
  accessibilityPlugin({
    highContrast: true,
    reducedMotion: true
  }),
  motionPlugin({
    spring: { stiffness: 300, damping: 30 }
  })
]);
```

## 🔍 Theme Development Tools

### Theme Debugging

```tsx
import { ThemeDebugger } from '@your-org/design-system/dev-tools';

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <YourApplication />
      {process.env.NODE_ENV === 'development' && (
        <ThemeDebugger 
          showTokens={true}
          showBreakpoints={true}
          position="bottom-right"
        />
      )}
    </ThemeProvider>
  );
}
```

### Theme Validation

```tsx
import { validateTheme } from '@your-org/design-system/utils';

// Validate theme structure and accessibility
const validation = validateTheme(myCustomTheme);

if (!validation.isValid) {
  console.warn('Theme validation issues:', validation.errors);
  // Example errors:
  // - Color contrast ratios below WCAG standards
  // - Missing required token values
  // - Invalid token formats
}
```

### Theme Preview

```tsx
import { ThemePreview } from '@your-org/design-system/dev-tools';

function ThemeDesigner() {
  const [previewTheme, setPreviewTheme] = useState(baseTheme);
  
  return (
    <div className="flex">
      <ThemeEditor 
        theme={previewTheme}
        onChange={setPreviewTheme}
      />
      <ThemePreview 
        theme={previewTheme}
        components={['Button', 'Input', 'Card', 'Modal']}
      />
    </div>
  );
}
```

## 🎨 Advanced Customization

### Custom Component Variants

```tsx
// Define custom variants for existing components
const customButtonVariants = {
  gradient: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    '&:hover': {
      background: 'linear-gradient(45deg, #5a6fd8, #6b4397)'
    }
  },
  neon: {
    background: 'transparent',
    color: '#00ff88',
    border: '2px solid #00ff88',
    boxShadow: '0 0 10px #00ff88',
    '&:hover': {
      background: '#00ff88',
      color: '#000',
      boxShadow: '0 0 20px #00ff88'
    }
  }
};

// Extend theme with custom variants
const themeWithVariants = extendTheme({
  components: {
    Button: {
      variants: customButtonVariants
    }
  }
});
```

### Conditional Theming

```tsx
// Apply different themes based on conditions
function ConditionalThemeProvider({ children }: { children: React.ReactNode }) {
  const userPreferences = useUserPreferences();
  const isAccessibilityMode = userPreferences.accessibility;
  
  const theme = isAccessibilityMode 
    ? highContrastTheme 
    : defaultTheme;
  
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
```

### Theme Composition

```tsx
// Compose multiple theme aspects
const composeThemes = (...themes: Partial<Theme>[]): Theme => {
  return themes.reduce((acc, theme) => ({
    colors: { ...acc.colors, ...theme.colors },
    typography: { ...acc.typography, ...theme.typography },
    spacing: { ...acc.spacing, ...theme.spacing },
    // ... merge other properties
  }), baseTheme);
};

// Usage
const finalTheme = composeThemes(
  brandColors,
  customTypography,
  extendedSpacing,
  animationEnhancements
);
```

## 💡 Best Practices

1. **Consistency**: Use design tokens consistently across all customizations
2. **Accessibility**: Always validate color contrast and accessibility standards
3. **Performance**: Consider the bundle size impact of theme customizations
4. **Maintainability**: Document custom themes and their intended use cases
5. **Testing**: Test themes across different devices and color modes
6. **Fallbacks**: Provide sensible fallbacks for custom properties
7. **Version Control**: Version your themes to enable safe updates

## 🚀 Migration Guide

### Upgrading Themes

```tsx
// Version 1 to Version 2 migration
const migrateThemeV1toV2 = (v1Theme: ThemeV1): ThemeV2 => {
  return {
    ...v1Theme,
    colors: {
      ...v1Theme.colors,
      // Map old color names to new structure
      primary: v1Theme.colors.brand,
      secondary: v1Theme.colors.accent
    },
    // Add new required properties
    animation: defaultAnimation,
    borderRadius: defaultBorderRadius
  };
};

// Use migration utility
const upgradedTheme = migrateThemeV1toV2(legacyTheme);
```

This theming system provides the flexibility to create unique, branded experiences while maintaining the consistency and accessibility standards of the design system. 