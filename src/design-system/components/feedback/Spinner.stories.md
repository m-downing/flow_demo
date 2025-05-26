# Spinner Component

A flexible, reusable loading spinner component for providing visual feedback during loading states.

## Usage

```tsx
import { Spinner } from '@/design-system/components/feedback';

// Basic usage
<Spinner />

// With size and variant
<Spinner size="lg" variant="light" />

// With custom aria label
<Spinner aria-label="Loading data..." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the spinner |
| `variant` | `'primary' \| 'secondary' \| 'light' \| 'dark'` | `'primary'` | Color variant |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | `'Loading'` | Accessibility label |

## Variants

- **primary**: Blue spinner for general use
- **secondary**: Gray spinner for secondary actions  
- **light**: White spinner for dark backgrounds
- **dark**: Dark spinner for light backgrounds

## Sizes

- **xs**: 12px (1.5px border)
- **sm**: 16px (2px border)
- **md**: 20px (2px border) 
- **lg**: 24px (2.5px border)
- **xl**: 32px (3px border)

## Examples

### Navigation Loading (Sidebar)
```tsx
<Spinner variant="light" size="md" aria-label="Loading Snapshot" />
```

### Button Loading
```tsx
<button disabled>
  <Spinner size="sm" />
  Loading...
</button>
```

### Page Loading
```tsx
<div className="flex justify-center">
  <Spinner size="xl" variant="primary" />
</div>
``` 