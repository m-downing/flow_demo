# FLOW Design System Demo

A Next.js demonstration of the FLOW Design System - an enterprise-grade UI component library and design framework built for supply chain management applications.

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.2 (App Router)
- **UI Library**: React 18.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Heroicons 2.2.0
- **Charts**: Recharts 2.15.3
- **Theme**: Full dark mode support

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── backlogs/          # Backlogs demo
│   ├── chart-gallery/     # Chart components showcase (default page)
│   ├── colors/            # Color token reference
│   ├── deepdive/          # Dynamic table detail views
│   │   └── table-id/      
│   │       └── [tableId]/ # Dynamic route for table details
│   ├── demo-tables/       # Table components demo
│   ├── kpi/               # KPI dashboard demo
│   ├── network/           # Network visualization demo
│   ├── snapshot/          # Snapshot dashboard demo
│   ├── contexts/          # React contexts for global state
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Service layer (includes mock data)
│   └── types/             # TypeScript type definitions
└── design-system/         # Core design system
    ├── _Documentation/    # Comprehensive guides and standards
    ├── charts/            # Chart components
    ├── components/        # UI components
    │   ├── controls/      # Interactive controls
    │   ├── feedback/      # Feedback components
    │   ├── forms/         # Form elements
    │   └── primitives/    # Base components
    ├── foundations/       # Design tokens
    ├── layout/            # Layout components
    ├── overlays/          # Modals and overlays
    ├── tabularData/       # Table components
    └── utilities/         # Utility components
```

## 📖 Documentation

The design system includes comprehensive documentation in `src/design-system/_Documentation/`:

- **[CopilotDesignPrompt.md](src/design-system/_Documentation/CopilotDesignPrompt.md)** - AI assistant implementation guide for consistent code generation
- **[IntegrationGuide.md](src/design-system/_Documentation/IntegrationGuide.md)** - Step-by-step integration instructions for existing projects
- **[TailwindGridSystem.md](src/design-system/_Documentation/TailwindGridSystem.md)** - Grid system patterns and responsive layouts
- **[ThemeColorStandards.md](src/design-system/_Documentation/ThemeColorStandards.md)** - Color usage guidelines with dark mode patterns
- **[DesignTokens.md](src/design-system/_Documentation/DesignTokens.md)** - Complete design token reference

## 🎨 Demo Pages

- **Chart Gallery** (`/`) - Comprehensive showcase of chart components
- **Tables Demo** (`/demo-tables`) - Table and list view demonstrations
- **Color Tokens** (`/colors`) - Design system color palette reference
- **Deep Dive** (`/deepdive/table-id/[tableId]`) - Dynamic detail views for table data
- **Snapshot** (`/snapshot`) - Dashboard snapshot view
- **Backlogs** (`/backlogs`) - Backlog management interface
- **KPIs** (`/kpi`) - Key performance indicators dashboard
- **Network** (`/network`) - Network visualization components

## ⚡ Quick Start

### Prerequisites
- Node.js 18.2.0 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm run start
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features

### Design System Components
- **Charts**: Line, Bar, Area, Scatter, Pie, and specialized supply chain visualizations
- **Tables**: Advanced data tables with sorting, filtering, and pagination
- **Forms**: Comprehensive form components with validation
- **Feedback**: Alerts, notifications, banners, and loading states
- **Controls**: Buttons, toggles, filters, and interactive elements
- **Layout**: Responsive grid system, cards, and containers

### Dark Mode Support
- Automatic theme detection
- Manual theme toggle
- Consistent color tokens for both themes
- Smooth transitions between themes

### Enterprise Features
- Multi-application architecture support
- Global notification system
- Loading state management
- Responsive design (mobile-first approach)
- Accessibility compliance
- Performance optimized for large datasets

## 💻 Design System Usage

Import components from the design system:

```typescript
import { 
  Button, 
  Card, 
  TableView, 
  MetricCard,
  LineChart,
  FilterBar 
} from '@/design-system';
```

### Example: Creating a Dashboard

```typescript
import { MetricCard, LineChart, TableView } from '@/design-system';

export default function Dashboard() {
  return (
    <div className="pt-8 px-6 pb-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            label="Total Orders" 
            value="1,234" 
            delta={12.5} 
            trend="up"
            status="success" 
          />
        </div>
        
        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <LineChart data={chartData} />
          </div>
          <div className="lg:col-span-4">
            <TableView data={tableData} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🏗️ Architecture

The FLOW Design System is built with a multi-application architecture in mind:

### Core Layout Components

**`AppWrapper.tsx`** - The foundation component that provides:
- Application-level context providers (Theme, Notifications)
- Global layout structure with responsive grid
- System-wide banner notifications (Info and Critical)
- Loading state management
- Account drawer integration
- Dynamic favicon and title management per application

**`Sidebar.tsx`** - The primary navigation component featuring:
- Collapsible/expandable navigation
- Multi-app switcher functionality
- Tab-based navigation with loading states
- AI assistant integration (IRIS)
- Responsive design with tooltips

### Configuration

**`constants.ts`** - Central navigation configuration that must be customized for each application:
```typescript
export const appTabs = {
  'flow': [...],      // Navigation items for FLOW app
  'helius': [...],    // Navigation items for Helius app
  'mimir': [...],     // Navigation items for Mimir app
  'oculus': [...]     // Navigation items for Oculus app
};
```

## 🔧 Integration Guide

When implementing this design system in a new application:

1. **Wrap your application** with `AppWrapper`
2. **Configure navigation** in `constants.ts`
3. **Update app metadata** in `AppWrapper.tsx` (`APP_TITLES` and `APP_FAVICONS`)
4. **Customize theme tokens** as needed (without modifying core tokens)
5. **Connect data layer** - Replace mock services with your GraphQL/REST APIs

This architecture enables consistent user experience across multiple applications while maintaining flexibility for app-specific requirements.

## 🎨 Design Principles

1. **Consistency First** - Use existing components and patterns
2. **Dark Mode Always** - Every component supports both themes
3. **Semantic Tokens** - Use meaningful color and spacing tokens
4. **Responsive by Default** - Mobile-first approach
5. **Accessibility Built-in** - WCAG compliance and keyboard navigation

## 📚 Additional Resources

- Review the demo pages for implementation examples
- Check the documentation directory for detailed guides
- Use the AI assistant prompt guide for consistent code generation
- Follow the integration guide for step-by-step setup

Designed by Michael Downing.

