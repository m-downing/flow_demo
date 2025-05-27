# Card Components

Card components provide consistent containers for organizing and displaying content.

## Card

Base card component for creating consistent content containers with proper spacing and styling.

```tsx
import { Card } from '@/design-system/cards';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

## Features

- **Consistent Styling**: Unified padding, shadows, and border radius
- **Responsive**: Adapts to container width
- **Theme Support**: Automatic light/dark mode styling
- **Flexible Content**: Accepts any React children
- **Semantic HTML**: Uses appropriate semantic elements

## Usage Patterns

```tsx
// Basic card
<Card>
  <div className="space-y-4">
    <h2>Dashboard Overview</h2>
    <p>Key metrics and insights</p>
  </div>
</Card>

// Card with custom styling
<Card className="border-l-4 border-primary-500">
  <div>Important information</div>
</Card>
```

## Design Guidelines

- Use cards to group related content
- Maintain consistent spacing within cards
- Avoid nesting cards too deeply
- Consider card hierarchy and visual weight
- Ensure sufficient contrast for accessibility

## Integration with Other Components

Cards work well with other design system components:

```tsx
// Card with chart
<Card>
  <h3>Sales Performance</h3>
  <BarChart data={salesData} />
</Card>

// Card with form elements
<Card>
  <h3>User Settings</h3>
  <div className="space-y-4">
    <Input label="Name" />
    <Button>Save Changes</Button>
  </div>
</Card>
```

## Accessibility

- Cards use semantic HTML structure
- Proper heading hierarchy within cards
- Sufficient color contrast for text
- Focus management for interactive cards 