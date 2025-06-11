// Define the type for navigation tabs
export interface NavTab {
  name: string;
  icon: string;
  path: string;
  hasDropdown?: boolean;
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
    { name: "Dashboard", icon: "Briefcase", path: "/flow" },
    { name: "Infrastructure", icon: "ServerStack", path: "#" },
    { name: "Network", icon: "Signal", path: "#" },
    { name: "VIE", icon: "Tv", path: "#" },
    { name: "Build Tracker", icon: "ComputerDesktop", path: "#" },
    { name: "Safety Stock", icon: "PresentationChartLine", path: "#" },
    { name: "Tags", icon: "Tag", path: "#", hasDropdown: true },
    { name: "Lead Times", icon: "Clock", path: "#", hasDropdown: true },
    { name: "Inventory", icon: "ArchiveBox", path: "#", hasDropdown: true },
    { name: "Utilities", icon: "WrenchScrewdriver", path: "#", hasDropdown: true },
    { name: "VCF", icon: "Cloud", path: "#", hasDropdown: true },
    { name: "Backlogs", icon: "Inbox", path: "#", hasDropdown: true },
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
    { name: "Orders", icon: "ShoppingCart", path: "#" },
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
