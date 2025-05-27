# App Shell Architecture

The FLOW design system provides a comprehensive app shell architecture built around `AppWrapper` and `Sidebar` components that create a consistent navigation and layout experience across all applications.

## Core Components

### AppWrapper
The main application shell that provides:
- **Context Providers**: Theme and notification contexts for the entire app
- **Layout Structure**: Grid-based layout with fixed sidebar and flexible main content
- **System Banners**: Info and critical banners for system-wide messaging
- **AI Chat Integration**: Floating AI assistant with overlay functionality
- **Loading Management**: Global loading states and transitions

### Sidebar
The navigation component that handles:
- **App Switching**: Multi-app navigation with switcher interface
- **Tab Navigation**: Within-app page navigation
- **User Management**: User menu with preferences and notifications
- **Active State**: Visual feedback for current location
- **Loading States**: Per-tab loading indicators

## Architecture Flow

```
AppWrapper (Shell Container)
├── ThemeProvider (Theme Context)
├── NotificationProvider (Notification Context)
├── Sidebar (Navigation)
│   ├── App Switcher (Multi-app navigation)
│   ├── Tab Navigation (Within-app pages)
│   └── User Menu (Preferences, notifications)
├── System Banners (Info/Critical alerts)
├── AI Chat (Floating assistant)
└── Main Content (App-specific content)
```

## Configuration for New Apps

### 1. Update constants.ts

Each application must configure its navigation tabs in `src/design-system/layout/constants.ts`:

```typescript
// Add your app to the appTabs object
export const appTabs = {
  'flow': [
    dashboardTab,
    { name: "Backlogs", icon: "ServerStack", path: "/backlogs" },
    { name: "KPI's", icon: "Briefcase", path: "/kpi" },
    { name: "Network", icon: "Cloud", path: "/network" },
    { name: "FPY", icon: "ChartPie", path: "/first-pass-yield" },
  ],
  'your-app': [  // Add your app here
    dashboardTab,  // All apps should include the dashboard
    { name: "Feature1", icon: "YourIcon", path: "/feature1" },
    { name: "Feature2", icon: "YourIcon2", path: "/feature2" },
  ],
  // ... other apps
};
```

### 2. Required Tab Properties

Each tab object must include:
- **name**: Display name for the tab
- **icon**: Icon identifier (Heroicons name or custom icon path)
- **path**: Next.js route path for navigation

### 3. Available Icons

The sidebar supports these Heroicons (24/outline):
- `ChartBarSquare` - For dashboard/analytics
- `ServerStack` - For infrastructure/servers
- `Briefcase` - For business/KPIs
- `Cloud` - For network/cloud features
- `ChartPie` - For reporting/metrics

Or use custom icon paths for SVG files.

## Implementation Example

### Basic App Setup

```tsx
// app/layout.tsx or your main layout
import { AppWrapper } from '@/design-system/layout';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
```

### Banner Configuration

Control system banners in AppWrapper:

```tsx
// In AppWrapper component
const showInfoBanner = true;     // Feature announcements
const showCriticalBanner = false; // Urgent system alerts
```

### App Switcher Integration

The sidebar automatically includes app switching functionality. Update the app switcher menu in `Sidebar.tsx` to include your app:

```tsx
// Add your app to the switcher dropdown
<Link href="/your-app">
  <span className="font-semibold text-neutral-50 text-[10px]">
    Your App Name
  </span>
</Link>
```

## Navigation Behavior

### Tab Navigation
- Tabs automatically manage active states based on current pathname
- Loading spinners appear during navigation transitions
- Tab state persists in localStorage for user experience

### Multi-App Navigation
- App switcher provides access to other applications
- Each app maintains its own navigation state
- Seamless transitions between applications

### User Management
- User menu provides access to preferences and notifications
- Notification badges show unread counts
- Modal overlays for detailed interactions

## Responsive Design

The app shell is designed for:
- **Minimum Width**: 768px for optimal experience
- **Fixed Sidebar**: 100px width with vertical navigation
- **Flexible Content**: Main area adapts to available space
- **Mobile Considerations**: Optimized for tablet and desktop use

## Development Guidelines

### Adding New Apps
1. Update `constants.ts` with your app's tab configuration
2. Create corresponding Next.js routes for each tab
3. Ensure icons are available (Heroicons or custom SVGs)
4. Test navigation and active states

### Customizing Banners
- Use `InfoBanner` for feature announcements and tips
- Use `CriticalBanner` for urgent system-wide alerts
- Configure visibility flags in AppWrapper
- Provide clear messaging and optional actions

### Theme Integration
- AppWrapper automatically provides theme context
- All child components inherit theme state
- Sidebar adapts to light/dark mode automatically
- Custom components should use `useTheme()` hook

## Best Practices

- **Consistent Navigation**: Use the established tab patterns
- **Clear Naming**: Choose descriptive tab names (max 8-10 characters)
- **Appropriate Icons**: Select icons that clearly represent functionality
- **Path Convention**: Use lowercase, hyphenated paths (/feature-name)
- **Loading States**: Let the system handle navigation loading automatically
