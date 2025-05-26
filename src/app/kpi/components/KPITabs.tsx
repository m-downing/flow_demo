import React, { useState, useEffect } from 'react';
import { 
  BarChart, LineChart 
} from '@/design-system/charts';
import {
  procurementEfficiencyData,
  deploymentTimeData,
  capacityUtilizationData,
  inventoryTurnoverData,
  regionalKpiData
} from './mockData';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

// MoreIcon component to replace MUI MoreVertIcon
const MoreIcon = () => (
  <EllipsisHorizontalIcon className="w-5 h-5" />
);

// Tab panel component
function TabPanel(props: { children: React.ReactNode; value: number; index: number; }) {
  const { children, value, index, ...other } = props;

  // Only render content when the tab is active
  if (value !== index) {
    return <div role="tabpanel" hidden aria-labelledby={`kpi-tab-${index}`} />;
  }

  return (
    <div
      role="tabpanel"
      id={`kpi-tabpanel-${index}`}
      aria-labelledby={`kpi-tab-${index}`}
      {...other}
    >
      <div className="py-3">
        {children}
      </div>
    </div>
  );
}

export const KPITabs: React.FC = () => {
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
    { label: 'Overview', value: 0 },
    { label: 'Procurement', value: 1 },
    { label: 'Deployment', value: 2 },
    { label: 'Utilization', value: 3 },
    { label: 'Cost Management', value: 4 }
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
                ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-800'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-500'
            }`}
            role="tab"
            aria-selected={tabValue === tab.value}
            aria-controls={`kpi-tabpanel-${tab.value}`}
            id={`kpi-tab-${tab.value}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-6 bg-white dark:bg-primary-800 shadow-md rounded-lg">
      {renderTabs()}
      
      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8">
            <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Regional KPI Comparison</h6>
                <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
                  <MoreIcon />
                </button>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                Performance metrics by geographical region
              </p>
              <div className="h-96">
                <BarChart 
                  data={regionalKpiData} 
                  dataKey={['procurementEfficiency', 'utilizationRate', 'deploymentTime']} 
                  xAxisKey="name" 
                  height={400}
                />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className="p-4 mb-6 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Top Performing Data Centers</h6>
                <button className="text-neutral-500 dark:text-neutral-400 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
                  <MoreIcon />
                </button>
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">NYC-WEST-08</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">North America</p>
                  </div>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400">94%</p>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-600" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">LONDON-EAST-04</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">EMEA</p>
                  </div>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400">92%</p>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-600" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">SINGAPORE-03</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">APAC</p>
                  </div>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400">89%</p>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-600" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">FRANKFURT-02</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">EMEA</p>
                  </div>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400">87%</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">KPI Achievement</h6>
                <button className="text-neutral-500 dark:text-neutral-400">
                  <MoreIcon />
                </button>
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex items-center">
                  <div className="w-32">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">Procurement</p>
                  </div>
                  <div className="flex-grow bg-neutral-200 dark:bg-neutral-600 h-2 rounded-full">
                    <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                  <p className="ml-2 text-green-600 dark:text-green-400">91%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-32">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">Deployment</p>
                  </div>
                  <div className="flex-grow bg-neutral-200 dark:bg-neutral-600 h-2 rounded-full">
                    <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <p className="ml-2 text-green-600 dark:text-green-400">87%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-32">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">Utilization</p>
                  </div>
                  <div className="flex-grow bg-neutral-200 dark:bg-neutral-600 h-2 rounded-full">
                    <div className="bg-neutral-500 dark:bg-neutral-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="ml-2 text-neutral-500 dark:text-neutral-400">78%</p>
                </div>
                <div className="flex items-center">
                  <div className="w-32">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">Cost</p>
                  </div>
                  <div className="flex-grow bg-neutral-200 dark:bg-neutral-600 h-2 rounded-full">
                    <div className="bg-amber-700 dark:bg-amber-700 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="ml-2 text-amber-700 dark:text-amber-500">65%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-6">
            <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Procurement Efficiency</h6>
                <button className="text-neutral-500 dark:text-neutral-400">
                  <MoreIcon />
                </button>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                % of orders processed within SLA timeframe
              </p>
              <div className="h-72">
                <LineChart 
                  data={procurementEfficiencyData} 
                  dataKey={['value', 'target']} 
                  xAxisKey="name" 
                  height={300}
                />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-6">
            <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Average Deployment Time</h6>
                <button className="text-neutral-500 dark:text-neutral-400">
                  <MoreIcon />
                </button>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                Days from order to operational deployment
              </p>
              <div className="h-72">
                <LineChart 
                  data={deploymentTimeData} 
                  dataKey={['value', 'target']} 
                  xAxisKey="name" 
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      
      {/* Procurement Tab */}
      <TabPanel value={tabValue} index={1}>
        <div className="p-4">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-4">Procurement Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Procurement Efficiency Trend</h6>
                  <button className="text-neutral-500 dark:text-neutral-400">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Percentage of orders processed within SLA timeframe
                </p>
                <div className="h-72">
                  <LineChart 
                    data={procurementEfficiencyData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Inventory Turnover Rate</h6>
                  <button className="text-neutral-500 dark:text-neutral-400">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Rate at which inventory is used and replaced
                </p>
                <div className="h-72">
                  <LineChart 
                    data={inventoryTurnoverData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      
      {/* Deployment Tab */}
      <TabPanel value={tabValue} index={2}>
        <div className="p-4">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-4">Deployment Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Deployment Time Trend</h6>
                  <button className="text-neutral-500 dark:text-neutral-400">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Average days from order to operational deployment
                </p>
                <div className="h-72">
                  <LineChart 
                    data={deploymentTimeData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Regional Deployment Times</h6>
                  <button className="text-neutral-500 dark:text-neutral-400">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Average deployment time by region (days)
                </p>
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey={["deploymentTime"]}
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      
      {/* Utilization Tab */}
      <TabPanel value={tabValue} index={3}>
        <div className="p-4">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-4">Utilization Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Capacity Utilization Trend</h6>
                  <button className="text-neutral-500 dark:text-neutral-400">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Percentage of data center capacity being utilized
                </p>
                <div className="h-72">
                  <LineChart 
                    data={capacityUtilizationData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4 bg-white dark:bg-primary-800 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">Regional Utilization Rates</h6>
                  <button className="text-neutral-500 dark:text-neutral-400">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  Capacity utilization percentage by region
                </p>
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey="utilizationRate" 
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      
      {/* Cost Management Tab */}
      <TabPanel value={tabValue} index={4}>
        <div className="p-4">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-4">Cost Management Key Performance Indicators</h6>
          <div className="flex justify-center items-center h-64">
            <p className="text-neutral-500 dark:text-neutral-400">
              Cost KPI data will be available in the next update
            </p>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}; 