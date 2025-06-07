// Define the common Dashboard tab that all apps will have
export const dashboardTab = {
  name: "Snapshot",
  icon: "ChartBarSquare",
  path: "/snapshot"
};

// Define app-specific navigation tabs
export const appTabs = {
  'flow': [
    { name: "Navigator", icon: "ArrowPathRoundedSquare", path: "/" },
    { name: "Balance Views", icon: "ChartBarSquare", path: "#" },
    { name: "Negative Balance", icon: "ArrowTrendingDown", path: "#" },
    { name: "Proposed Orders", icon: "ListBullet", path: "#" },
    { name: "Forecasted Orders", icon: "DocumentCurrencyDollar", path: "#" },
    { name: "Planned View", icon: "DocumentText", path: "#" },
    { name: "Disabled Clusters", icon: "BellAlert", path: "#" },
    { name: "Duplicate Rack", icon: "MagnifyingGlassPlus", path: "#" },
    { name: "Cluster Inventory", icon: "Cloud", path: "#" },
    { name: "Data Center Layout", icon: "ServerStack", path: "#" },
    { name: "Reporting View", icon: "ChartBarSquare", path: "#" },
  ],
  helius: [dashboardTab],
  mimir: [dashboardTab],
  oculus: [dashboardTab]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
