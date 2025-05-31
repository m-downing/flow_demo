import React, { useState, useEffect } from 'react';
import BacklogAnalysis from './BacklogAnalysis';
import BacklogRiskFactors from './BacklogRiskFactors';

// Tab panel component
function TabPanel(props: { children: React.ReactNode; value: number; index: number; }) {
  const { children, value, index, ...other } = props;

  // Only render content when the tab is active
  if (value !== index) {
    return <div role="tabpanel" hidden aria-labelledby={`backlog-tab-${index}`} />;
  }

  return (
    <div
      role="tabpanel"
      id={`backlog-tabpanel-${index}`}
      aria-labelledby={`backlog-tab-${index}`}
      {...other}
    >
      <div className="py-3">
        {children}
      </div>
    </div>
  );
}

// Mock data for backlog trends
const backlogTrends = [
  { name: 'Jun', rackBacklogs: 35, networkBacklogs: 18, storageBacklogs: 22 },
  { name: 'Jul', rackBacklogs: 42, networkBacklogs: 23, storageBacklogs: 25 },
  { name: 'Aug', rackBacklogs: 48, networkBacklogs: 28, storageBacklogs: 30 },
  { name: 'Sep', rackBacklogs: 52, networkBacklogs: 25, storageBacklogs: 32 },
  { name: 'Oct', rackBacklogs: 45, networkBacklogs: 22, storageBacklogs: 28 },
  { name: 'Nov', rackBacklogs: 38, networkBacklogs: 20, storageBacklogs: 24 }
];

// Mock data for regional backlogs
const regionalBacklogs = [
  { name: 'NAM', backlogCount: 28, resolvedCount: 35 },
  { name: 'EMEA', backlogCount: 22, resolvedCount: 30 },
  { name: 'APAC', backlogCount: 32, resolvedCount: 25 },
  { name: 'LATAM', backlogCount: 14, resolvedCount: 10 }
];

const BacklogTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tabsReady, setTabsReady] = useState(false);
  
  useEffect(() => {
    // Delay tabs rendering to avoid measurement issues
    const timer = setTimeout(() => {
      setTabsReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };
  
  const tabs = [
    { label: 'All Backlogs', value: 0 },
    { label: 'Critical Backlogs', value: 1 },
    { label: 'Blocked Orders', value: 2 },
    { label: 'Analysis', value: 3 }
  ];
  
  // Render the tabs without scrolling
  const renderTabs = () => {
    if (!tabsReady) {
      return <div className="h-12 border-b border-neutral-200 dark:border-neutral-600"></div>;
    }
    
    return (
      <div className="flex border-b border-neutral-200 dark:border-neutral-600">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              tabValue === tab.value
                ? 'border-primary-500 text-primary-600 dark:text-neutral-400 bg-primary-50 dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-500'
            }`}
            role="tab"
            aria-selected={tabValue === tab.value}
            aria-controls={`backlog-tabpanel-${tab.value}`}
            id={`backlog-tab-${tab.value}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg mb-6">
      {renderTabs()}
      
      {/* All Backlogs Tab */}
      <TabPanel value={tabValue} index={0}>
        <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
          Backlog table component will be redesigned
        </div>
      </TabPanel>
      
      {/* Critical Backlogs Tab */}
      <TabPanel value={tabValue} index={1}>
        <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
          Critical backlog table component will be redesigned
        </div>
      </TabPanel>
      
      {/* Blocked Orders Tab */}
      <TabPanel value={tabValue} index={2}>
        <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
          Blocked orders table component will be redesigned
        </div>
      </TabPanel>
      
      {/* Analysis Tab */}
      <TabPanel value={tabValue} index={3}>
        <BacklogAnalysis 
          backlogTrends={backlogTrends}
          regionalBacklogs={regionalBacklogs}
        />
        <div className="md:col-span-12 mt-4">
          <BacklogRiskFactors />
        </div>
      </TabPanel>
    </div>
  );
};

export default BacklogTabs; 