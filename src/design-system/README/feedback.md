# Feedback Components

Feedback components provide visual cues to users about system status, actions, and information. These components help create a responsive and informative user experience.

## ⏳ Spinner

A loading spinner component for indicating processing states.

### Import

```tsx
import { Spinner } from '@your-org/design-system';
```

### Props

```tsx
interface SpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'white';
  /** Additional CSS classes */
  className?: string;
  /** Screen reader text */
  label?: string;
}
```

### Usage Examples

#### Basic Usage

```tsx
<Spinner />

<Spinner size="lg" />

<Spinner variant="primary" />
```

#### Different Sizes

```tsx
<Spinner size="sm" />   {/* 16px */}
<Spinner size="md" />   {/* 24px - default */}
<Spinner size="lg" />   {/* 32px */}
<Spinner size="xl" />   {/* 48px */}
```

#### Color Variants

```tsx
<Spinner variant="primary" />     {/* Primary brand color */}
<Spinner variant="secondary" />   {/* Secondary color */}
<Spinner variant="white" />       {/* White - for dark backgrounds */}
```

#### With Custom Label

```tsx
<Spinner 
  size="lg"
  label="Loading data..."
  className="mx-auto"
/>
```

#### Inline with Text

```tsx
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Loading...</span>
</div>
```

---

## 💬 Tooltip

A tooltip component for providing contextual information on hover or focus.

### Import

```tsx
import { Tooltip } from '@your-org/design-system';
```

### Props

```tsx
interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether to show arrow */
  showArrow?: boolean;
  /** Additional CSS classes for tooltip */
  className?: string;
  /** Whether tooltip is disabled */
  disabled?: boolean;
}
```

### Usage Examples

#### Basic Usage

```tsx
<Tooltip content="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>
```

#### Different Positions

```tsx
<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <Button>Right</Button>
</Tooltip>
```

#### Rich Content

```tsx
<Tooltip 
  content={
    <div className="space-y-1">
      <div className="font-semibold">User Information</div>
      <div className="text-sm">john.doe@example.com</div>
      <div className="text-xs text-gray-400">Last login: 2 hours ago</div>
    </div>
  }
>
  <img 
    src="/avatar.jpg" 
    alt="User Avatar"
    className="w-8 h-8 rounded-full cursor-pointer"
  />
</Tooltip>
```

#### With Delay

```tsx
<Tooltip 
  content="This tooltip appears after 500ms"
  delay={500}
>
  <span>Hover for delayed tooltip</span>
</Tooltip>
```

#### Conditional Tooltip

```tsx
<Tooltip 
  content="Action not available"
  disabled={!isActionDisabled}
>
  <Button disabled={isActionDisabled}>
    Conditional Action
  </Button>
</Tooltip>
```

---

## 🏷️ Badge

A badge component for displaying status, counts, or labels.

### Import

```tsx
import { Badge } from '@your-org/design-system';
```

### Props

```tsx
interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Badge variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom color (overrides variant) */
  customColor?: {
    bg: string;
    text: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Whether badge is removable */
  removable?: boolean;
  /** Callback when badge is removed */
  onRemove?: () => void;
}
```

### Usage Examples

#### Basic Usage

```tsx
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

#### Different Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

#### Status Badges

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="secondary">Inactive</Badge>
```

#### Count Badges

```tsx
<div className="relative inline-block">
  <Button>Messages</Button>
  <Badge 
    variant="error" 
    size="sm"
    className="absolute -top-2 -right-2"
  >
    3
  </Badge>
</div>
```

#### Custom Colors

```tsx
<Badge 
  customColor={{
    bg: '#8B5CF6',
    text: '#FFFFFF'
  }}
>
  Custom Purple
</Badge>
```

#### Removable Badges

```tsx
<Badge 
  variant="primary"
  removable
  onRemove={() => console.log('Badge removed')}
>
  Removable Tag
</Badge>
```

#### Status Badges with Predefined Colors

The design system includes predefined badge colors for common statuses:

```tsx
import { badgeColors } from '@your-org/design-system';

// Supply chain statuses
<Badge customColor={badgeColors.planned}>Planned</Badge>
<Badge customColor={badgeColors.ordered}>Ordered</Badge>
<Badge customColor={badgeColors.manufacturing}>Manufacturing</Badge>
<Badge customColor={badgeColors.delivered}>Delivered</Badge>
<Badge customColor={badgeColors.active}>Active</Badge>

// Priority levels
<Badge customColor={badgeColors.critical}>Critical</Badge>
<Badge customColor={badgeColors.highPriority}>High Priority</Badge>
<Badge customColor={badgeColors.standard}>Standard</Badge>
```

---

## 🔔 NotificationBadge

A specialized badge for displaying notification counts.

### Import

```tsx
import { NotificationBadge } from '@your-org/design-system';
```

### Props

```tsx
interface NotificationBadgeProps {
  /** Number of notifications */
  count: number;
  /** Maximum count to display */
  max?: number;
  /** Whether to show badge when count is 0 */
  showZero?: boolean;
  /** Badge variant */
  variant?: 'primary' | 'error' | 'warning';
  /** Position relative to parent */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Additional CSS classes */
  className?: string;
}
```

### Usage Examples

#### Basic Usage

```tsx
<div className="relative inline-block">
  <Button>Notifications</Button>
  <NotificationBadge count={5} />
</div>
```

#### With Maximum Count

```tsx
<div className="relative inline-block">
  <Button>Messages</Button>
  <NotificationBadge count={127} max={99} />  {/* Shows "99+" */}
</div>
```

#### Different Positions

```tsx
<div className="relative inline-block">
  <Button>Item</Button>
  <NotificationBadge count={3} position="top-left" />
</div>

<div className="relative inline-block">
  <Button>Item</Button>
  <NotificationBadge count={8} position="bottom-right" />
</div>
```

#### Different Variants

```tsx
<NotificationBadge count={2} variant="primary" />   {/* Blue */}
<NotificationBadge count={5} variant="error" />     {/* Red */}
<NotificationBadge count={1} variant="warning" />   {/* Orange */}
```

#### Show Zero Count

```tsx
<NotificationBadge 
  count={0} 
  showZero 
  variant="primary"
/>
```

#### Icon with Notification

```tsx
import { BellIcon } from '@heroicons/react/24/outline';

<div className="relative inline-block">
  <BellIcon className="w-6 h-6 text-gray-600" />
  <NotificationBadge count={12} />
</div>
```

## 🎯 Usage Patterns

### Loading States

```tsx
// Button with loading spinner
<Button disabled={isLoading}>
  {isLoading ? (
    <div className="flex items-center gap-2">
      <Spinner size="sm" variant="white" />
      <span>Saving...</span>
    </div>
  ) : (
    'Save Changes'
  )}
</Button>

// Page loading state
{isLoading ? (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600">Loading data...</p>
    </div>
  </div>
) : (
  <DataTable data={data} />
)}
```

### Status Indicators

```tsx
// User status
<div className="flex items-center gap-2">
  <img src="/avatar.jpg" className="w-8 h-8 rounded-full" />
  <span>John Doe</span>
  <Badge variant="success" size="sm">Online</Badge>
</div>

// Order status
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <span>Order #12345</span>
    <Badge customColor={badgeColors.inTransit}>In Transit</Badge>
  </div>
  <div className="flex items-center justify-between">
    <span>Order #12346</span>
    <Badge customColor={badgeColors.delivered}>Delivered</Badge>
  </div>
</div>
```

### Interactive Elements with Tooltips

```tsx
// Help text
<div className="flex items-center gap-2">
  <label>Password Strength</label>
  <Tooltip content="Password must contain at least 8 characters, one uppercase letter, one number, and one special character">
    <QuestionMarkCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</div>

// Disabled actions
<Tooltip 
  content={!hasPermission ? "You don't have permission to delete this item" : ""}
  disabled={hasPermission}
>
  <Button 
    variant="danger"
    disabled={!hasPermission}
    onClick={handleDelete}
  >
    Delete
  </Button>
</Tooltip>
```

## ♿ Accessibility

All feedback components include accessibility features:

### Spinner
- Includes `role="status"` and `aria-label` for screen readers
- Customizable label for context-specific loading messages

### Tooltip
- Uses `aria-describedby` for proper screen reader association
- Keyboard accessible (shows on focus)
- Respects `prefers-reduced-motion` for animations

### Badge
- Semantic HTML structure
- Appropriate color contrast ratios
- Screen reader friendly text

### NotificationBadge
- Uses `aria-label` to announce count to screen readers
- Positioned with `aria-describedby` for context

## 🎨 Theming

All feedback components adapt to the current theme:
- Spinners use theme-aware colors
- Tooltips have appropriate backgrounds for light/dark modes
- Badges maintain proper contrast in all themes
- Notification badges adjust colors based on theme

## 🔧 Customization

Components can be styled while maintaining accessibility:

```tsx
// Custom spinner colors
<Spinner 
  className="text-purple-500"
  size="lg"
/>

// Custom tooltip styling
<Tooltip 
  content="Custom tooltip"
  className="bg-purple-100 text-purple-900 border border-purple-200"
>
  <Button>Hover me</Button>
</Tooltip>

// Custom badge with animation
<Badge 
  variant="primary"
  className="animate-pulse"
>
  New Feature!
</Badge>
``` 