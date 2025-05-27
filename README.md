# FLOW Design System Demo

This is a [Next.js](https://nextjs.org) project demonstrating the **FLOW Design System** - a comprehensive enterprise-grade UI component library and design framework.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.2.0 or higher
- npm, yarn, pnpm, or bun package manager

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📋 Application Overview

The FLOW Demo showcases a modern enterprise dashboard application with multiple mock-data visualization modules:

- **📊 Snapshot Dashboard** - Main dashboard view (default page)
- **📈 KPI Analytics** - Key performance indicators and metrics
- **🔄 First Pass Yield** - Manufacturing yield analysis
- **📦 Backlogs** - Work item and backlog management
- **🌐 Network Analytics** - Network performance monitoring

### Application Architecture
- **Framework:** Next.js 15.3.2 with App Router
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** Custom FLOW Design System
- **Data Visualization:** Recharts + AG Grid
- **TypeScript:** Full type safety throughout
- **Dark Mode:** System preference with manual toggle

## 🎨 Design System Structure

### Core Design System Location
All design system components are located in `src/design-system/` and organized as follows:

```
src/design-system/
├── README.md                    # Design system overview
├── index.ts                     # Main exports
├── foundations/                 # Design tokens and foundations
│   └── tokens/                 # Core design tokens
├── layout/                     # Layout components
├── components/                 # UI components by category
├── DataTable/                  # Enterprise data table
├── charts/                     # Data visualization
├── cards/                      # Card components
├── overlays/                   # Modals, tooltips
└── utilities/                  # Helper components
```

### 🎯 Critical Design System Files

#### **Design Tokens & Foundations**
- **`src/design-system/foundations/tokens/`** - Core design tokens
  - `colors.ts` - Complete color palette with dark/light mode support
  - `typography.ts` - Font families, sizes, weights, and line heights
  - `shadows.ts` - Box shadow definitions
  - `index.ts` - Token exports

#### **Layout Components**
- **`src/design-system/layout/AppWrapper.tsx`** - Main application wrapper with theme provider and responsive layout
- **`src/design-system/layout/Sidebar.tsx`** - Navigation sidebar with dark mode toggle and responsive behavior

#### **Configuration Files**
- **`tailwind.config.js`** - Tailwind CSS configuration with:
  - Custom color palette mapped to design tokens
  - Typography scale and font families
  - Spacing, border radius, and shadow utilities
  - Dark mode configuration (`class` strategy)
- **`postcss.config.js`** - PostCSS configuration for Tailwind processing
- **`src/app/globals.css`** - Global CSS with Tailwind imports and custom styles
- **`src/app/layout.tsx`** - Root layout with AppWrapper integration and theme detection

### 🧩 Component Categories

1. **DataTable** - Enterprise-grade data grids with sorting, filtering, and pagination
2. **Charts** - Data visualization components using Recharts
3. **Cards** - Various card layouts and containers
4. **Components** - UI components organized by function:
   - `feedback/` - Badges, alerts, notifications
   - `forms/` - Form inputs and controls
   - `navigation/` - Navigation components
5. **Layout** - Structural components for app organization
6. **Overlays** - Modals, tooltips, and popup components
7. **Utilities** - Helper components and utilities

## 📚 Documentation

### Individual Component Documentation
Detailed README files are available for each component category:

- **Main Design System:** [`src/design-system/README.md`](src/design-system/_README_.md)
- **Component Guides:**
  - [`src/design-system/_README_/_overview.md`](src/design-system/_README_/_overview.md) - System overview
  - [`src/design-system/_README_/tokens.md`](src/design-system/_README_/tokens.md) - Design tokens guide
  - [`src/design-system/_README_/theming.md`](src/design-system/_README_/theming.md) - Theming and dark mode
  - [`src/design-system/_README_/layout.md`](src/design-system/_README_/layout.md) - Layout components
  - [`src/design-system/_README_/appWrapper.md`](src/design-system/_README_/appWrapper.md) - App shell architecture
  - [`src/design-system/_README_/charts.md`](src/design-system/_README_/charts.md) - Chart components
  - [`src/design-system/_README_/cards.md`](src/design-system/_README_/cards.md) - Card components
  - [`src/design-system/_README_/components.md`](src/design-system/_README_/components.md) - UI components (forms, feedback, navigation)
  - [`src/design-system/_README_/overlays.md`](src/design-system/_README_/overlays.md) - Overlay components
  - [`src/design-system/_README_/utilities.md`](src/design-system/_README_/utilities.md) - Utility components

## 🛠 Technology Stack

### Core Dependencies
- **Next.js 15.3.2** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.0** - Utility-first CSS framework

### UI & Visualization
- **AG Grid React 33.3.0** - Enterprise data grid
- **Recharts 2.15.3** - Composable charting library
- **Heroicons 2.2.0** - Icon library
- **Material-UI 5.14.18** - Additional UI components

### Development Tools
- **ESLint 9** - Code linting
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing

## 🌙 Theme System

The application features a comprehensive theming system:

- **Automatic Detection** - Respects system preference on first visit
- **Manual Toggle** - Users can override with theme switcher
- **Persistent Storage** - Theme preference saved in localStorage
- **Design Token Integration** - All colors support light/dark variants
- **SSR Compatible** - No flash of incorrect theme

## 📁 Project Structure

```
flow_redesign_demo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with AppWrapper
│   │   ├── page.tsx           # Homepage (redirects to snapshot)
│   │   ├── globals.css        # Global styles
│   │   ├── backlogs/          # Backlog management module
│   │   ├── first-pass-yield/  # Manufacturing yield module
│   │   ├── kpi/               # KPI analytics module
│   │   ├── network/           # Network analytics module
│   │   ├── snapshot/          # Main dashboard module
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API and data services
│   │   └── types/             # TypeScript type definitions
│   └── design-system/         # FLOW Design System
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started with Development

1. **Explore the Design System** - Start with `src/design-system/README.md`
2. **Check Component Examples** - View implementation in app modules
3. **Review Design Tokens** - Understand the color and typography system
4. **Test Responsive Design** - Application is fully responsive
5. **Try Dark/Light Mode** - Toggle themes to see system in action

## 🤝 Contributing

This is a demonstration project showcasing the FLOW Design System. For production use, consider:

- Extracting the design system to a separate repo or npm package
- Adding comprehensive testing (unit, integration, visual regression)
- Implementing proper error boundaries and loading states
- Adding internationalization (i18n) support
- Setting up CI/CD pipelines

## 📄 License

This project was created by Michael Downing & the Chaos Monkey for training, testing, and demonstration purposes.
