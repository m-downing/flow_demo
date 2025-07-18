// Define the common Dashboard tab that all apps will have
export const dashboardTab = {
  name: "Snapshot",
  icon: "ChartBarSquare",
  path: "/snapshot"
};

// Define app-specific navigation tabs
export const appTabs = {
  'flow': [
    { name: "Chart Gallery", icon: "PresentationChartLine", path: "/" },
    { name: "Tables Demo", icon: "TableCells", path: "/demo-tables" },
    { name: "Color Tokens", icon: "Swatch", path: "/colors" },
    { name: "Tailwind Grid", icon: "Squares2X2", path: "/tailwind-grid" },
    dashboardTab,
    { name: "KPI's", icon: "Briefcase", path: "/kpi" },
  ],
  helius: [dashboardTab],
  mimir: [dashboardTab],
  oculus: [dashboardTab]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
