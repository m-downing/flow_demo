# Banner Alert Components

Banner alert components provide critical system-wide messaging positioned at the top of the main content area. These components are designed for enterprise-grade applications where important information needs to be communicated prominently to users.

## 📢 InfoBanner

A dismissible information banner for non-critical announcements, feature updates, or general information that users can dismiss and won't see again.

### Import

```tsx
import { InfoBanner } from '@your-org/design-system';
```

### Props

```tsx
interface InfoBannerProps {
  /** Unique identifier for the banner - used for dismissal persistence */
  id: string;
  /** Banner title text */
  title?: string;
  /** Banner message content */
  message: React.ReactNode;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional CSS classes */
  className?: string;
  /** Custom icon (defaults to info icon) */
  icon?: React.ReactNode;
}
```

### Usage Examples

#### Basic Usage

```tsx
<InfoBanner
  id="feature-announcement"
  message="New dashboard features are now available!"
/>
```

#### With Title and Action

```tsx
<InfoBanner
  id="system-update"
  title="System Update"
  message="We've improved performance and added new functionality."
  action={{
    label: "Learn More",
    onClick: () => window.open('/updates', '_blank')
  }}
/>
```

#### Rich Content Message

```tsx
<InfoBanner
  id="maintenance-notice"
  title="Scheduled Maintenance"
  message={
    <div>
      <p>Maintenance window: <strong>Saturday 2:00 AM - 4:00 AM EST</strong></p>
      <p>Expected downtime: 2 hours</p>
    </div>
  }
  action={{
    label: "View Details",
    onClick: () => navigate('/maintenance-details')
  }}
/>
```

#### Custom Icon

```tsx
import { SparklesIcon } from '@heroicons/react/24/outline';

<InfoBanner
  id="new-feature"
  title="New Feature Available"
  message="Check out our enhanced reporting capabilities!"
  icon={<SparklesIcon className="w-5 h-5 text-blue-700 flex-shrink-0" />}
  action={{
    label: "Try Now",
    onClick: () => navigate('/reports')
  }}
/>
```

### Behavior

- **Dismissal**: Once dismissed, the banner will not appear again for the same `id`
- **Persistence**: Uses localStorage to remember dismissal state
- **Animation**: Smooth slide-down entrance and slide-up exit animations
- **Positioning**: Relative positioning that pushes content down (no content cutoff)
- **Layout**: Integrates seamlessly with page flow

---

## 🚨 CriticalBanner

A non-dismissible critical alert banner for urgent system-wide notifications that require immediate attention. Always visible and cannot be dismissed by users.

### Import

```tsx
import { CriticalBanner } from '@your-org/design-system';
```

### Props

```tsx
interface CriticalBannerProps {
  /** Banner title text */
  title?: string;
  /** Banner message content */
  message: React.ReactNode;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional CSS classes */
  className?: string;
  /** Custom icon (defaults to warning triangle) */
  icon?: React.ReactNode;
  /** Whether the banner should be visible */
  isVisible?: boolean;
}
```

### Usage Examples

#### Security Alert

```tsx
<CriticalBanner
  title="Security Alert"
  message="Suspicious activity detected. Please review your account immediately."
  action={{
    label: "Review Account",
    onClick: () => navigate('/security/review')
  }}
/>
```

#### System Maintenance

```tsx
<CriticalBanner
  title="System Maintenance in Progress"
  message="Some features may be temporarily unavailable. Est. completion: 30 minutes."
/>
```

#### Service Disruption

```tsx
<CriticalBanner
  message={
    <div>
      <strong>Service Disruption:</strong> Payment processing is currently unavailable. 
      Orders can still be placed but will be processed once service is restored.
    </div>
  }
  action={{
    label: "Status Page",
    onClick: () => window.open('/status', '_blank')
  }}
/>
```

#### Conditional Display

```tsx
const [hasSystemAlert, setHasSystemAlert] = useState(false);

// Show/hide based on system conditions
useEffect(() => {
  checkSystemStatus().then(status => {
    setHasSystemAlert(status.hasAlert);
  });
}, []);

return (
  <CriticalBanner
    isVisible={hasSystemAlert}
    title="System Alert"
    message="Critical system issue detected. Technical team is investigating."
  />
);
```

#### Data Loss Warning

```tsx
<CriticalBanner
  title="Data Loss Warning"
  message="Unsaved changes will be lost. The system will restart in 5 minutes for emergency maintenance."
  action={{
    label: "Save Work",
    onClick: () => handleEmergencySave()
  }}
/>
```

### Behavior

- **Non-dismissible**: Cannot be closed by users (persists across pages)
- **High Priority**: Higher z-index and stronger visual styling than InfoBanner
- **Persistent**: Remains visible across all pages when active
- **Animation**: Smooth slide-down entrance animation
- **Positioning**: Relative positioning that pushes content down (ensures content accessibility)
- **Accessibility**: Uses `role="alert"` and `aria-live="assertive"`

---

## Design Guidelines

### When to Use InfoBanner

- ✅ Feature announcements
- ✅ Non-critical system updates
- ✅ Optional promotional content
- ✅ User education or tips
- ✅ Survey or feedback requests

### When to Use CriticalBanner

- ✅ Security alerts or breaches
- ✅ System maintenance affecting operations
- ✅ Service disruptions
- ✅ Critical deadline reminders
- ✅ Emergency notifications
- ✅ Data loss warnings

### Visual Hierarchy

Both banners push content down while maintaining clear priority:

- **CriticalBanner**: `z-index: 50` + stronger visual styling (red/error colors)
- **InfoBanner**: `z-index: 40` + gentler styling (teal/info colors)

### Accessibility

- Both components include proper ARIA attributes
- Screen reader support with appropriate live regions
- Keyboard navigation support for interactive elements
- High contrast colors meeting WCAG guidelines

### Content Guidelines

#### InfoBanner Content
- Keep messages concise and actionable
- Use friendly, informative tone
- Include clear call-to-action when appropriate
- Avoid overwhelming users with too many simultaneous banners

#### CriticalBanner Content
- Use urgent but professional language
- Provide specific information about the issue
- Include timelines when relevant
- Offer clear next steps or actions

---

## Layout Considerations

Both banner components are positioned to work seamlessly with the application layout:

- **Width**: Spans full width of content area
- **Position**: Relative positioning that pushes content down
- **Stacking**: When both are visible, CriticalBanner appears above InfoBanner  
- **Responsive**: Content wraps appropriately on smaller screens
- **Accessibility**: All underlying content remains accessible

### Integration with AppWrapper

Banner components should be integrated directly into your AppWrapper component for consistent system-wide messaging. Here's the recommended implementation pattern:

#### Boolean Control Pattern

Use boolean flags to easily enable/disable banners during development and deployment:

```tsx
// In your AppWrapper component
const AppContent: React.FC<AppWrapperProps> = ({ children }) => {
  // ========================================
  // BANNER CONTROLS - Change these to enable/disable banners
  // ========================================
  const showInfoBanner = true;     // Set to 'true' to enable InfoBanner
  const showCriticalBanner = false; // Set to 'true' to enable CriticalBanner

  return (
    <main className="overflow-y-auto min-h-screen bg-neutral-50 dark:bg-primary-900 relative">
      {/* ======================================== */}
      {/* SYSTEM BANNERS - Configure above at boolean controls */}
      {/* ======================================== */}
      
      {/* CriticalBanner - For urgent alerts, maintenance, security issues */}
      <CriticalBanner
        title="System Maintenance in Progress"
        message={
          <div className="space-y-1">
            <p>Some features may be temporarily unavailable during maintenance.</p>
            <p>Estimated completion: 2:00 AM EST</p>
          </div>
        }
        icon={<ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 text-error-500" />}
        isVisible={showCriticalBanner}
      />

      {/* InfoBanner - For feature announcements, tips, non-critical updates */}
      <InfoBanner
        id="feature-update-v2025"
        title="New Features Available"
        message={
          <div className="space-y-1">
            <p><strong>Latest Updates: </strong><em>Enhanced reporting, dark mode, and improved performance.</em></p>
            <p>This InfoBanner can be dismissed and won't reappear once closed.</p>
          </div>
        }
        action={{
          label: "Explore Features",
          onClick: () => {
            console.log('Navigate to features overview');
            // Navigate to features page
          }
        }}
        icon={<SparklesIcon className="w-5 h-5 text-primary-700 flex-shrink-0" />}
        isVisible={showInfoBanner}
      />

      {/* Your main content */}
      {children}
    </main>
  );
};
```

#### InfoBanner ID Update Strategy

When updating InfoBanner content and you want previously dismissed users to see the new message:

1. **Change the `id` prop** to a new unique value
2. **Keep a consistent naming pattern** for easy tracking

```tsx
// Before content update
<InfoBanner
  id="feature-update-2024"
  message="Original message here..."
/>

// After content update - change the ID
<InfoBanner
  id="feature-update-2025"  // ← Changed ID resets dismissal state
  message="New updated message here..."
/>
```

**ID Naming Conventions:**
- `feature-update-v2025` - For feature announcements
- `maintenance-notice-jan2025` - For maintenance notifications  
- `security-alert-20250115` - For security alerts
- `system-upgrade-q1-2025` - For system updates

#### Development Tips

1. **Quick Banner Control**: Toggle boolean flags to quickly enable/disable banners during development
2. **Content Updates**: Change the InfoBanner ID when you want all users (including those who dismissed it) to see new content
3. **Testing**: Set both flags to `true` to test banner stacking and layout
4. **Production**: Use environment variables or config files to control banner visibility in different environments

#### Environment-Based Control

For more advanced control across environments:

```tsx
const showInfoBanner = process.env.NODE_ENV === 'production' ? true : false;
const showCriticalBanner = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
``` 