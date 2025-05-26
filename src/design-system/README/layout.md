# Layout Components

Layout components provide structural elements for building application interfaces. These components handle the overall page layout, navigation structure, and loading states.

## 🏗️ AppWrapper

A top-level wrapper component that provides the main application structure and theme context.

### Import

```tsx
import { AppWrapper } from '@your-org/design-system';
```

### Props

```tsx
interface AppWrapperProps {
  /** Main content of the application */
  children: React.ReactNode;
  /** Whether to show the sidebar */
  showSidebar?: boolean;
  /** Custom sidebar component */
  sidebar?: React.ReactNode;
  /** Additional classes for the wrapper */
  className?: string;
  /** Header component */
  header?: React.ReactNode;
  /** Footer component */
  footer?: React.ReactNode;
}
```

### Usage Examples

#### Basic App Structure

```tsx
<AppWrapper showSidebar>
  <div className="p-6">
    <h1>Main Content</h1>
    <p>Your application content goes here</p>
  </div>
</AppWrapper>
```

#### With Custom Header and Footer

```tsx
<AppWrapper 
  showSidebar
  header={<CustomHeader />}
  footer={<CustomFooter />}
>
  <MainContent />
</AppWrapper>
```

#### Without Sidebar

```tsx
<AppWrapper showSidebar={false}>
  <FullWidthContent />
</AppWrapper>
```

#### Custom Sidebar

```tsx
<AppWrapper 
  showSidebar
  sidebar={<CustomSidebar />}
>
  <MainContent />
</AppWrapper>
```

---

## 📑 Sidebar

A navigation sidebar component with collapsible sections and theme awareness.

### Import

```tsx
import { Sidebar } from '@your-org/design-system';
```

### Props

```tsx
interface SidebarProps {
  /** Navigation items */
  navigationItems: NavigationItem[];
  /** Whether sidebar is collapsed */
  isCollapsed?: boolean;
  /** Callback when collapse state changes */
  onToggleCollapse?: (collapsed: boolean) => void;
  /** Current active route */
  activeRoute?: string;
  /** User information for profile section */
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
  /** Custom logo component */
  logo?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: NavigationItem[];
  badge?: {
    text: string;
    variant: 'primary' | 'success' | 'warning' | 'error';
  };
}
```

### Usage Examples

#### Basic Sidebar

```tsx
import { HomeIcon, ChartBarIcon, UsersIcon } from '@heroicons/react/24/outline';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <HomeIcon className="w-5 h-5" />,
    href: '/dashboard'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <ChartBarIcon className="w-5 h-5" />,
    href: '/analytics'
  },
  {
    id: 'users',
    label: 'Users',
    icon: <UsersIcon className="w-5 h-5" />,
    href: '/users',
    badge: {
      text: '12',
      variant: 'primary'
    }
  }
];

<Sidebar 
  navigationItems={navigationItems}
  activeRoute="/dashboard"
/>
```

#### With Nested Navigation

```tsx
const nestedNavigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <HomeIcon className="w-5 h-5" />,
    href: '/dashboard'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <ChartBarIcon className="w-5 h-5" />,
    children: [
      {
        id: 'reports',
        label: 'Reports',
        href: '/analytics/reports'
      },
      {
        id: 'metrics',
        label: 'Metrics',
        href: '/analytics/metrics'
      }
    ]
  }
];

<Sidebar 
  navigationItems={nestedNavigation}
  activeRoute="/analytics/reports"
/>
```

#### With User Profile

```tsx
<Sidebar 
  navigationItems={navigationItems}
  userInfo={{
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/john.jpg'
  }}
  logo={<CompanyLogo />}
/>
```

#### Collapsible Sidebar

```tsx
const [isCollapsed, setIsCollapsed] = useState(false);

<Sidebar 
  navigationItems={navigationItems}
  isCollapsed={isCollapsed}
  onToggleCollapse={setIsCollapsed}
/>
```

---

## ⏳ LoadingSpinner

A loading spinner component with multiple sizes and states for indicating loading processes.

### Import

```tsx
import { LoadingSpinner } from '@your-org/design-system';
```

### Props

```tsx
interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Loading message */
  message?: string;
  /** Whether to center the spinner */
  centered?: boolean;
  /** Whether to show as overlay */
  overlay?: boolean;
  /** Custom styling */
  className?: string;
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'white';
}
```

### Usage Examples

#### Basic Loading Spinner

```tsx
<LoadingSpinner />

<LoadingSpinner size="lg" message="Loading data..." />
```

#### Different Sizes

```tsx
<LoadingSpinner size="xs" />   {/* 12px */}
<LoadingSpinner size="sm" />   {/* 16px */}
<LoadingSpinner size="md" />   {/* 24px - default */}
<LoadingSpinner size="lg" />   {/* 32px */}
<LoadingSpinner size="xl" />   {/* 48px */}
```

#### Centered Loading

```tsx
<LoadingSpinner 
  centered 
  size="lg"
  message="Please wait while we load your data..."
/>
```

#### Overlay Loading

```tsx
<div className="relative">
  <YourContent />
  {isLoading && (
    <LoadingSpinner 
      overlay
      size="lg"
      message="Saving changes..."
    />
  )}
</div>
```

#### Color Variants

```tsx
<LoadingSpinner variant="primary" />   {/* Primary blue */}
<LoadingSpinner variant="secondary" /> {/* Secondary gray */}
<LoadingSpinner variant="white" />     {/* White - for dark backgrounds */}
```

---

## 📐 Layout Constants

The layout system includes predefined constants for consistent spacing and sizing.

### Import

```tsx
import { layoutConstants } from '@your-org/design-system';
```

### Available Constants

```tsx
// Sidebar dimensions
layoutConstants.sidebar.width          // Default sidebar width
layoutConstants.sidebar.collapsedWidth // Collapsed sidebar width
layoutConstants.sidebar.breakpoint     // Mobile breakpoint for sidebar

// Header dimensions  
layoutConstants.header.height          // Standard header height
layoutConstants.header.mobileHeight    // Mobile header height

// Spacing
layoutConstants.spacing.page           // Page padding
layoutConstants.spacing.content        // Content padding
layoutConstants.spacing.section        // Section spacing

// Z-index layers
layoutConstants.zIndex.sidebar         // Sidebar z-index
layoutConstants.zIndex.header          // Header z-index
layoutConstants.zIndex.overlay         // Overlay z-index
layoutConstants.zIndex.modal           // Modal z-index
```

### Using Layout Constants

```tsx
// Custom layout with constants
<div 
  className="ml-64"
  style={{
    marginLeft: layoutConstants.sidebar.width,
    paddingTop: layoutConstants.header.height
  }}
>
  <Content />
</div>

// Responsive sidebar
<div 
  className={`
    fixed left-0 top-0 h-full bg-white transition-all duration-300
    ${isCollapsed 
      ? 'w-16' 
      : 'w-64'
    }
  `}
  style={{
    width: isCollapsed 
      ? layoutConstants.sidebar.collapsedWidth 
      : layoutConstants.sidebar.width,
    zIndex: layoutConstants.zIndex.sidebar
  }}
>
  <SidebarContent />
</div>
```

## 🎯 Layout Patterns

### Standard Application Layout

```tsx
function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <AppWrapper
      showSidebar
      sidebar={
        <Sidebar 
          navigationItems={mainNavigation}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
          userInfo={currentUser}
        />
      }
      header={<AppHeader />}
    >
      <main className="p-6">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </AppWrapper>
  );
}
```

### Loading States

```tsx
function DataPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    loadData().then(setData).finally(() => setLoading(false));
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner 
          size="lg"
          message="Loading dashboard data..."
        />
      </div>
    );
  }
  
  return <DataContent data={data} />;
}

// Inline loading state
function SaveButton() {
  const [saving, setSaving] = useState(false);
  
  const handleSave = async () => {
    setSaving(true);
    try {
      await saveData();
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <Button onClick={handleSave} disabled={saving}>
      {saving ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" variant="white" />
          <span>Saving...</span>
        </div>
      ) : (
        'Save Changes'
      )}
    </Button>
  );
}
```

### Responsive Layout

```tsx
function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < layoutConstants.sidebar.breakpoint);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <AppWrapper
      showSidebar={!isMobile || sidebarOpen}
      sidebar={
        <Sidebar 
          navigationItems={navigation}
          isCollapsed={isMobile ? false : sidebarCollapsed}
          onToggleCollapse={isMobile ? setSidebarOpen : setSidebarCollapsed}
        />
      }
    >
      {isMobile && (
        <Button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden mb-4"
        >
          Toggle Menu
        </Button>
      )}
      <MainContent />
    </AppWrapper>
  );
}
```

## ♿ Accessibility

Layout components include comprehensive accessibility features:

### Sidebar
- **Keyboard Navigation**: Full keyboard support for navigation
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Focus handling during collapse/expand
- **Semantic HTML**: Proper nav and list structures

### AppWrapper
- **Skip Links**: Skip to main content functionality
- **Landmark Regions**: Proper ARIA landmarks
- **Focus Management**: Focus restoration and trapping

### LoadingSpinner
- **Screen Reader Support**: ARIA live regions for loading announcements
- **Accessible Labels**: Descriptive loading messages
- **Motion Preferences**: Respects `prefers-reduced-motion`

```tsx
// Accessible layout example
<AppWrapper
  header={
    <header role="banner">
      <nav aria-label="Main navigation">
        <Sidebar navigationItems={navigation} />
      </nav>
    </header>
  }
>
  <main role="main" aria-label="Main content">
    <h1>Page Title</h1>
    {loading ? (
      <LoadingSpinner 
        message="Loading page content"
        aria-live="polite"
      />
    ) : (
      <PageContent />
    )}
  </main>
</AppWrapper>
```

## 🎨 Theming

Layout components automatically adapt to the current theme:

- **Sidebar**: Background colors and text adapt to light/dark themes
- **LoadingSpinner**: Colors adjust based on theme context
- **AppWrapper**: Provides theme context to child components

## 🔧 Customization

Layout components can be customized while maintaining structure:

```tsx
// Custom styled sidebar
<Sidebar 
  navigationItems={navigation}
  className="border-r-2 border-primary-200"
  userInfo={user}
  logo={
    <div className="flex items-center gap-2 p-4">
      <img src="/logo.svg" alt="Company" className="w-8 h-8" />
      <span className="font-bold text-primary-600">Company</span>
    </div>
  }
/>

// Custom loading states
<LoadingSpinner 
  className="text-purple-500"
  message="Custom loading message"
/>

// Custom app wrapper
<AppWrapper 
  className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
  showSidebar
>
  <CustomContent />
</AppWrapper>
``` 