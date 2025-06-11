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
  oculus: [
    { name: "Fungible", icon: "ArrowsRightLeft", path: "/fungible" },
    { name: "Brokerage", icon: "Scale", path: "/brokerage" },
    { name: "Retail", icon: "Tag", path: "/retail" },
    { name: "Wholesale", icon: "BuildingOffice", path: "/wholesale" },
  ]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
