# FLOW Design System Demo

A Next.js demonstration of the FLOW Design System - an enterprise-grade UI component library and design framework.

## Tech Stack

- **Framework**: Next.js 15.3.2
- **UI Library**: React 18.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 3.4.0
- **Components**: MUI 5.14.18, Heroicons 2.2.0
- **Charts**: Recharts 2.15.3

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── backlogs/          # Backlogs demo
│   ├── chart-gallery/     # Chart components showcase (default page)
│   ├── colors/            # Color token reference
│   ├── demo-tables/       # Table components demo
│   ├── kpi/               # KPI dashboard demo
│   ├── network/           # Network visualization demo
│   └── snapshot/          # Snapshot dashboard demo
└── design-system/         # Core design system
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

## Demo Pages

- **Chart Gallery** (`/`) - Comprehensive showcase of chart components
- **Tables Demo** (`/demo-tables`) - Table and list view demonstrations
- **Color Tokens** (`/colors`) - Design system color palette reference
- **Snapshot** (`/snapshot`) - Dashboard snapshot view
- **Backlogs** (`/backlogs`) - Backlog management interface
- **KPIs** (`/kpi`) - Key performance indicators dashboard
- **Network** (`/network`) - Network visualization components

## Quick Start

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

## Design System Usage

Import components from the design system:

```typescript
import { Component } from '@/design-system';
```

The design system provides a comprehensive set of components organized by category, including charts, controls, forms, layout, and data visualization components.

## Design System Architecture

The FLOW Design System is built with a multi-application architecture in mind, utilizing three core components:

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

When implementing this design system in a new application:
1. Wrap your application with `AppWrapper`
2. Configure your app's navigation in `constants.ts`
3. Update `APP_TITLES` and `APP_FAVICONS` in `AppWrapper.tsx`
4. Customize theme tokens and components as needed

This architecture enables consistent user experience across multiple applications while maintaining flexibility for app-specific requirements.

