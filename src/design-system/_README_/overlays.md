# Overlay Components

Overlay components provide modal dialogs and popup interfaces that appear above the main content.

## Modal

Base modal component for creating dialog interfaces with backdrop and focus management.

```tsx
import { Modal } from '@/design-system/overlays';

<Modal 
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
>
  <p>Modal content goes here</p>
</Modal>
```

Features:
- Focus trap management
- Backdrop click to close
- Escape key handling
- Accessible modal patterns
- Portal rendering

## Specialized Modals

Pre-built modal components for common use cases.

### UserPreferences

Modal for user preference and settings management.

```tsx
import { UserPreferences } from '@/design-system/overlays/modals';

<UserPreferences 
  isOpen={showPreferences}
  onClose={handleClosePreferences}
/>
```

### Notifications

Modal for displaying and managing notifications.

```tsx
import { Notifications } from '@/design-system/overlays/modals';

<Notifications 
  isOpen={showNotifications}
  onClose={handleCloseNotifications}
/>
```

## Usage Patterns

```tsx
// Import base modal
import { Modal } from '@/design-system/overlays';

// Import specialized modals
import { UserPreferences, Notifications } from '@/design-system/overlays/modals';

// Or import from main index
import { Modal, UserPreferences } from '@/design-system/overlays';
```

## Modal Guidelines

- Use modals sparingly for critical actions or complex forms
- Always provide clear close mechanisms
- Keep modal content focused and concise
- Consider mobile viewport constraints
- Implement proper focus management for accessibility

## Accessibility Features

- Automatic focus management
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus restoration on close
- Backdrop and escape key handling 