// Define the common Dashboard tab that all apps will have
export const dashboardTab = {
  name: "Snapshot",
  icon: "ChartBarSquare",
  path: "/snapshot"
};

// Define app-specific navigation tabs
export const appTabs = {
  'flow': [
    { name: "Dashboard", icon: "Briefcase", path: "/" },
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
  helius: [dashboardTab],
  mimir: [dashboardTab],
  oculus: [dashboardTab]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
