// Define the common Dashboard tab that all apps will have
export const dashboardTab = {
  name: "Snapshot",
  icon: "ChartBarSquare",
  path: "/"
};

// Define app-specific navigation tabs
export const appTabs = {
  'flow': [
    dashboardTab,
    { name: "Backlogs", icon: "ServerStack", path: "/backlogs" },
    { name: "KPI's", icon: "Briefcase", path: "/kpi" },
    { name: "Network", icon: "Cloud", path: "/network" },
  ],
  helius: [dashboardTab],
  mimir: [dashboardTab],
  oculus: [dashboardTab]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
