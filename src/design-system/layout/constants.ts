// Define the type for navigation tabs
export interface NavTab {
  name: string;
  icon: string;
  path: string;
}

// Define the common Dashboard tab that all apps will have
export const dashboardTab: NavTab = {
  name: "Snapshot",
  icon: "ChartBarSquare",
  path: "#"
};

// Define app-specific navigation tabs
export const appTabs: Record<string, NavTab[]> = {
  'flow': [
    { name: "Chart Gallery", icon: "PresentationChartLine", path: "/flow" },
    { name: "Tables Demo", icon: "TableCells", path: "#" },
    { name: "Color Tokens", icon: "Swatch", path: "#" },
    { name: "Tailwind Grid", icon: "Squares2X2", path: "#" },
    dashboardTab,
    { name: "KPI's", icon: "Briefcase", path: "#" },
  ],
  'helius': [
    { name: "Dashboard", icon: "ChartBarSquare", path: "/helius" },
    { name: "Analytics", icon: "ChartPie", path: "#" },
    { name: "Reports", icon: "TableCells", path: "#" },
    { name: "Monitoring", icon: "EyeIcon", path: "#" },
    { name: "Alerts", icon: "FireIcon", path: "#" },
  ],
  'mimir': [
    { name: "Overview", icon: "ChartBarSquare", path: "/mimir" },
    { name: "Insights", icon: "PresentationChartLine", path: "#" },
    { name: "Predictions", icon: "AcademicCapIcon", path: "#" },
    { name: "Models", icon: "CpuChipIcon", path: "#" },
  ],
  'hyperion': [
    { name: "Supply Chain", icon: "GlobeAlt", path: "/hyperion" },
    { name: "Inventory", icon: "BuildingOffice", path: "#" },
    { name: "Orders", icon: "Briefcase", path: "#" },
    { name: "Logistics", icon: "TruckIcon", path: "#" },
    { name: "Analytics", icon: "ChartPie", path: "#" },
  ],
  'oculus': [
    { name: "Fungible", icon: "ArrowsRightLeft", path: "/" },
    { name: "Brokerage", icon: "Scale", path: "#" },
    { name: "Retail", icon: "Tag", path: "#" },
    { name: "Wholesale", icon: "BuildingOffice", path: "#" },
  ]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
