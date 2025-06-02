import React, { useState, useEffect } from 'react';
import { 
  BarChart, LineChart 
} from '@/design-system/charts';
import { ProgressTracker } from '@/design-system/charts/ProgressTracker';
import Card from '@/design-system/layout/Card';
import Button from '@/design-system/components/primitives/Button';
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
      <div className="py-sm">
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
            className={`flex-1 py-sm px-md text-sm font-medium border-b-2 transition-colors ${
              tabValue === tab.value
                ? 'border-primary-500 text-primary-600 dark:text-neutral-400 bg-primary-50 dark:bg-neutral-900'
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
    <Card shadowLevel="md" className="mb-lg">
      {renderTabs()}
      
      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-sm">
          <div className="md:col-span-8">
            <Card
              title="Regional KPI Comparison"
              subtitle="Performance metrics by geographical region"
              headerAction={
                <Button variant="ghost" size="sm" className="!p-1">
                  <MoreIcon />
                </Button>
              }
              shadowLevel="sm"
              headerSpacing="2"
            >
              <div className="h-96">
                <BarChart 
                  data={regionalKpiData} 
                  dataKey={['procurementEfficiency', 'utilizationRate', 'deploymentTime']} 
                  xAxisKey="name" 
                  height={400}
                />
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-4">
            <Card
              title="Top Performing Data Centers"
              headerAction={
                <Button variant="ghost" size="sm" className="!p-1">
                  <MoreIcon />
                </Button>
              }
              shadowLevel="sm"
              className="mb-lg"
              headerSpacing="2"
            >
              <div className="space-y-md mt-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">NYC-WEST-08</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">North America</p>
                  </div>
                  <p className="text-lg font-medium text-success-500 dark:text-success-700">94%</p>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-600" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">LONDON-EAST-04</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">EMEA</p>
                  </div>
                  <p className="text-lg font-medium text-success-500 dark:text-success-700">92%</p>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-600" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">SINGAPORE-03</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">APAC</p>
                  </div>
                  <p className="text-lg font-medium text-success-500 dark:text-success-700">89%</p>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-600" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">FRANKFURT-02</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">EMEA</p>
                  </div>
                  <p className="text-lg font-medium text-success-500 dark:text-success-700">87%</p>
                </div>
              </div>
            </Card>
            
            <Card
              title="KPI Achievement"
              headerAction={
                <Button variant="ghost" size="sm" className="!p-1">
                  <MoreIcon />
                </Button>
              }
              shadowLevel="sm"
              headerSpacing="2"
            >
              <div className="space-y-md mt-md">
                <ProgressTracker 
                  value={91} 
                  max={100} 
                  label="Procurement" 
                  status="success" 
                  variant="horizontal"
                  mode="summary"
                  height={8}
                />
                <ProgressTracker 
                  value={87} 
                  max={100} 
                  label="Deployment" 
                  status="success" 
                  variant="horizontal"
                  mode="summary"
                  height={8}
                />
                <ProgressTracker 
                  value={78} 
                  max={100} 
                  label="Utilization" 
                  status="neutral" 
                  variant="horizontal"
                  mode="summary"
                  height={8}
                />
                <ProgressTracker 
                  value={65} 
                  max={100} 
                  label="Cost" 
                  status="warning" 
                  variant="horizontal"
                  mode="summary"
                  height={8}
                />
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-6">
            <Card
              title="Procurement Efficiency"
              subtitle="% of orders processed within SLA timeframe"
              headerAction={
                <Button variant="ghost" size="sm" className="!p-1">
                  <MoreIcon />
                </Button>
              }
              shadowLevel="sm"
              headerSpacing="2"
            >
              <div className="h-72">
                <LineChart 
                  data={procurementEfficiencyData} 
                  dataKey={['value', 'target']} 
                  xAxisKey="name" 
                  height={300}
                />
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-6">
            <Card
              title="Average Deployment Time"
              subtitle="Days from order to operational deployment"
              headerAction={
                <Button variant="ghost" size="sm" className="!p-1">
                  <MoreIcon />
                </Button>
              }
              shadowLevel="sm"
              headerSpacing="2"
            >
              <div className="h-72">
                <LineChart 
                  data={deploymentTimeData} 
                  dataKey={['value', 'target']} 
                  xAxisKey="name" 
                  height={300}
                />
              </div>
            </Card>
          </div>
        </div>
      </TabPanel>
      
      {/* Procurement Tab */}
      <TabPanel value={tabValue} index={1}>
        <div className="p-md">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-md">Procurement Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-sm">
            <div className="md:col-span-6">
              <Card
                title="Procurement Efficiency Trend"
                subtitle="Percentage of orders processed within SLA timeframe"
                headerAction={
                  <Button variant="ghost" size="sm" className="!p-1">
                    <MoreIcon />
                  </Button>
                }
                shadowLevel="sm"
                headerSpacing="2"
              >
                <div className="h-72">
                  <LineChart 
                    data={procurementEfficiencyData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-6">
              <Card
                title="Inventory Turnover Rate"
                subtitle="Rate at which inventory is used and replaced"
                headerAction={
                  <Button variant="ghost" size="sm" className="!p-1">
                    <MoreIcon />
                  </Button>
                }
                shadowLevel="sm"
                headerSpacing="2"
              >
                <div className="h-72">
                  <LineChart 
                    data={inventoryTurnoverData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </TabPanel>
      
      {/* Deployment Tab */}
      <TabPanel value={tabValue} index={2}>
        <div className="p-md">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-md">Deployment Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-sm">
            <div className="md:col-span-6">
              <Card
                title="Deployment Time Trend"
                subtitle="Average days from order to operational deployment"
                headerAction={
                  <Button variant="ghost" size="sm" className="!p-1">
                    <MoreIcon />
                  </Button>
                }
                shadowLevel="sm"
                headerSpacing="2"
              >
                <div className="h-72">
                  <LineChart 
                    data={deploymentTimeData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-6">
              <Card
                title="Regional Deployment Times"
                subtitle="Average deployment time by region (days)"
                headerAction={
                  <Button variant="ghost" size="sm" className="!p-1">
                    <MoreIcon />
                  </Button>
                }
                shadowLevel="sm"
                headerSpacing="2"
              >
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey={["deploymentTime"]}
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </TabPanel>
      
      {/* Utilization Tab */}
      <TabPanel value={tabValue} index={3}>
        <div className="p-md">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-md">Utilization Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-sm">
            <div className="md:col-span-6">
              <Card
                title="Capacity Utilization Trend"
                subtitle="Percentage of data center capacity being utilized"
                headerAction={
                  <Button variant="ghost" size="sm" className="!p-1">
                    <MoreIcon />
                  </Button>
                }
                shadowLevel="sm"
                headerSpacing="2"
              >
                <div className="h-72">
                  <LineChart 
                    data={capacityUtilizationData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-6">
              <Card
                title="Regional Utilization Rates"
                subtitle="Capacity utilization percentage by region"
                headerAction={
                  <Button variant="ghost" size="sm" className="!p-1">
                    <MoreIcon />
                  </Button>
                }
                shadowLevel="sm"
                headerSpacing="2"
              >
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey="utilizationRate" 
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </TabPanel>
      
      {/* Cost Management Tab */}
      <TabPanel value={tabValue} index={4}>
        <div className="p-md">
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-md">Cost Management Key Performance Indicators</h6>
          <div className="flex justify-center items-center h-64">
            <p className="text-neutral-500 dark:text-neutral-400">
              Cost KPI data will be available in the next update
            </p>
          </div>
        </div>
      </TabPanel>
    </Card>
  );
}; 