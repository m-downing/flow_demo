# FLOW Design System Integration Guide

This guide provides step-by-step instructions for integrating the FLOW Design System into your existing React/Next.js applications.

## Overview

The FLOW Design System provides a unified UI framework for all supply chain management applications, ensuring consistent user experiences across data infrastructure tools, capacity planning interfaces, and monitoring dashboards.

## Prerequisites

- React 18.2.0 or higher
- Next.js 15.x (or compatible React framework)
- Node.js 18.x or higher
- TypeScript 5.x

## Integration Steps

### 1. Copy Design System Files

Copy the following directories and files to your project root:

```bash
# Core design system
/src/design-system/              # Complete directory with all components

# Global configuration files
/src/app/globals.css            # Global styles and theme transitions
/src/app/layout.tsx             # Base layout wrapper
/src/app/not-found.tsx          # 404 page template

# Utility directories
/src/app/hooks/                 # Reusable React hooks
/src/app/services/              # Service layer (replace mock data)
/src/app/contexts/              # Global state management

# Build configuration
tailwind.config.mjs             # Tailwind configuration
postcss.config.js               # PostCSS configuration
```

### 2. Install Dependencies

Add the following packages to your `package.json`:

```json
{
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@mui/icons-material": "^5.17.1",
    "@mui/material": "^5.14.18",
    "recharts": "^2.15.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.21",
    "@types/recharts": "^1.8.29"
  }
}
```

Run installation:
```bash
npm install
```

### 3. Update Your Root Layout

Replace your existing root layout with the provided template:

```tsx
// app/layout.tsx (or pages/_app.tsx for Pages Router)
import type { Metadata } from "next";
import AppWrapper from "../design-system/layout/AppWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
```

### 4. Configure Build Tools

The provided `tailwind.config.mjs` and `postcss.config.js` should work without modification. These files are pre-configured to use the design system tokens.

### 5. Connect Your Data Layer

The design system includes mock services and data for demonstration purposes. Your engineering team will need to:

- Replace mock notification services with your GraphQL subscriptions
- Connect table and list components to your GraphQL queries
- Update data fetching patterns to match your existing architecture
- Configure any necessary GraphQL client providers

**Note**: The design system components are data-source agnostic and will work with any data fetching approach your team uses.

### 6. Environment Configuration

Configure any environment-specific variables your application requires. The design system will adapt to your existing setup.

## Using Design System Components

### Import Components

```tsx
// Import from the design system barrel exports
import { 
  Button, 
  Card, 
  TableView, 
  MetricCard,
  LineChart 
} from '@/design-system';
```

### Example: Data Table Implementation

```tsx
import { TableView } from '@/design-system';

export function ServerInventory() {
  const columns = [
    { id: 'name', header: 'Server Name', sortable: true },
    { id: 'status', header: 'Status', sortable: true },
    { id: 'capacity', header: 'Capacity', sortable: true },
    { id: 'location', header: 'Data Center', sortable: true }
  ];

  // Your team will connect this to your GraphQL queries
  return (
    <TableView
      data={serverData}
      columns={columns}
      pageSize={25}
      onRowClick={(row) => console.log('Selected:', row)}
    />
  );
}
```

### Example: Metric Dashboard

```tsx
import { MetricCard, LineChart } from '@/design-system';

export function CapacityDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Capacity"
        value="2.4PB"
        change={12.5}
        trend="increase"
      />
      <MetricCard
        title="Utilization"
        value="78%"
        change={-2.3}
        trend="decrease"
      />
      {/* Additional metrics */}
    </div>
  );
}
```

## Working with the Design System

### Design Token Usage

The design system uses carefully crafted design tokens for colors, typography, spacing, and other visual properties. These tokens ensure consistency across all applications.

**Important**: Do not modify design token files. These are maintained centrally to ensure brand consistency across all applications.

### Using Semantic Color Classes

Always use the semantic color classes provided by the design system:

```tsx
// ✅ CORRECT - Using design system classes
<div className="bg-primary-600 text-white">
<div className="border-error-500 text-error-700">
<div className="bg-neutral-100 dark:bg-neutral-900">

// ❌ INCORRECT - Using arbitrary colors
<div className="bg-blue-600 text-white">
<div className="border-red-500 text-red-700">
<div style={{ backgroundColor: '#1a1a1a' }}>
```

## Common Integration Patterns

### 1. Page Layout Structure

```tsx
export default function DataCenterOverview() {
  return (
    <div className="pt-8 px-6 pb-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50">
            Data Center Overview
          </h1>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            {/* Primary content */}
          </div>
          <div className="lg:col-span-4">
            {/* Secondary content */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 2. Component Composition

When you need additional functionality, compose rather than modify:

```tsx
// ✅ CORRECT - Composition
import { Card } from '@/design-system';

function AlertCard({ children, ...props }) {
  return (
    <Card className="border-l-4 border-warning-500" {...props}>
      <div className="flex items-start gap-3">
        <WarningIcon className="text-warning-600" />
        {children}
      </div>
    </Card>
  );
}

// ❌ INCORRECT - Modifying core components
// Never edit files in the /design-system directory
```

## Migration Checklist

- [ ] Copy all required files and directories
- [ ] Install npm dependencies
- [ ] Update root layout/app wrapper
- [ ] Configure environment variables
- [ ] Connect components to your data layer
- [ ] Update favicon and app metadata
- [ ] Test dark mode functionality
- [ ] Verify responsive behavior
- [ ] Remove any demo pages not needed

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Ensure you have the correct TypeScript version and have copied the type definitions
2. **Tailwind not working**: Check that `tailwind.config.mjs` is properly configured and imported
3. **Dark mode flashing**: Make sure `suppressHydrationWarning` is on the `<html>` element
4. **Missing styles**: Verify `globals.css` is imported in your root layout

### Getting Help

- Review demo implementations in the original design system repository
- Check component documentation in `/src/design-system/_Documentation/`
- Ensure all peer dependencies are installed

## Best Practices

1. **Use Existing Components**: Always check if a component exists before creating custom solutions
2. **Maintain Consistency**: Follow the established patterns shown in the demo pages
3. **Accessibility**: The design system includes ARIA labels and keyboard navigation - preserve these
4. **Performance**: Components are optimized for large datasets - use built-in pagination and virtualization
5. **Responsive Design**: Test on multiple screen sizes, components are mobile-first by design

## Design System Updates

The design system is maintained centrally. When updates are released:

1. You will receive notification of available updates
2. Review the changelog for any breaking changes
3. Update the `/design-system/` directory as a whole
4. Test your application thoroughly
5. Report any integration issues to the design system team

## Requesting Changes

If you need functionality not provided by the design system:

1. Check if it can be achieved through composition of existing components
2. Review the demo pages for similar patterns
3. Submit a request to the design system team with your use case
4. Do not create local modifications that diverge from the system

---

For questions or issues specific to your implementation, consult with your team's design system maintainer.
