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
    { name: "Data Centers", icon: "Squares2X2", path: "#" },
    { name: "Project View", icon: "ClipboardDocumentList", path: "#" },
    { name: "Integrator", icon: "WrenchScrewdriver", path: "#" },
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
  ],
  'hyperion': [
    { name: "Dashboard", icon: "ChartBarSquare", path: "/hyperion" },
    { name: "Grid View", icon: "TableCells", path: "#" },
    { name: "Compute", icon: "ComputerDesktop", path: "#" },
    { name: "Data Center", icon: "Squares2X2", path: "#" },
    { name: "P.O. / P.R.", icon: "CreditCard", path: "#" },
    { name: "Business Case", icon: "Briefcase", path: "#" },
  ],
  'oculus': [
    { name: "Dashboard", icon: "ChartBarSquare", path: "/" },
    { name: "ROP Fungible", icon: "ArrowsRightLeft", path: "#" },
    { name: "ROP Brokerage", icon: "Scale", path: "#" },
    { name: "ICP Retail", icon: "ShoppingCart", path: "#" },
    { name: "ICP Wholesale", icon: "TruckIcon", path: "#" },
  ]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
