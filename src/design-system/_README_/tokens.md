# Design Tokens

Design tokens provide consistent styling values across the FLOW design system.

## Colors

### Core Palette
- **Primary**: Blue color scale (50-900) with `primary.600` as the main brand color
- **Neutral**: Grayscale palette (50-950) for text and UI elements
- **Semantic Colors**: Success (green), Warning (orange), Error (red)

### Extended Palette
Additional colors available: purple, teal, amber, yellow, brown, orange, magenta, blue, slate

### Data Visualization Colors
Special `dataViz` color set optimized for charts:
- `primary` - Main data series
- `secondary` - Comparison data
- `positive` - Positive trends (green)
- `negative` - Negative trends (red)
- `highlight` - Highlighting metrics (orange)
- `alt` - Alternative categories

### Badge Colors
Pre-configured color combinations for status badges:
- Supply chain statuses (planned, ordered, manufacturing, etc.)
- Priority levels (critical, highPriority, standard, atRisk)

## Typography

Typography tokens provide consistent font families, sizes, and weights:
- **Font families**: body, heading, monospace
- **Font sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- **Font weights**: normal, medium, semibold, bold

## Spacing

Spacing tokens follow a consistent scale for margins, padding, and gaps.

## Shadows

Shadow tokens provide depth and elevation:
- Multiple shadow levels from subtle to prominent
- Consistent with design system elevation principles

## Border Radius

Border radius tokens for consistent corner rounding across components.

## Usage

```tsx
import { colors, typography, spacing, shadows, borderRadius } from '@/design-system/foundations/tokens';

// Using color tokens
const primaryColor = colors.colors.primary[600];
const successColor = colors.colors.dataViz.positive;

// Using typography tokens
const bodyFont = typography.fontFamily('body');
const headerSize = typography.fontSize('xl');
``` 