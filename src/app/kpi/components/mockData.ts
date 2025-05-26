// Define interfaces for our KPI data
export interface KpiTrendData {
  name: string;
  value: number;
  target: number;
  [key: string]: string | number;
}

export interface RegionalKpiData {
  name: string;
  procurementEfficiency: number;
  deploymentTime: number;
  utilizationRate: number;
  [key: string]: string | number;
}

// Mock data for KPI charts
export const procurementEfficiencyData: KpiTrendData[] = [
  { name: 'Jan', value: 82, target: 85 },
  { name: 'Feb', value: 85, target: 85 },
  { name: 'Mar', value: 87, target: 85 },
  { name: 'Apr', value: 84, target: 85 },
  { name: 'May', value: 89, target: 85 },
  { name: 'Jun', value: 91, target: 85 },
];

export const deploymentTimeData: KpiTrendData[] = [
  { name: 'Jan', value: 18, target: 15 },
  { name: 'Feb', value: 17, target: 15 },
  { name: 'Mar', value: 16, target: 15 },
  { name: 'Apr', value: 15, target: 15 },
  { name: 'May', value: 14, target: 15 },
  { name: 'Jun', value: 13, target: 15 },
];

export const capacityUtilizationData: KpiTrendData[] = [
  { name: 'Jan', value: 68, target: 75 },
  { name: 'Feb', value: 71, target: 75 },
  { name: 'Mar', value: 73, target: 75 },
  { name: 'Apr', value: 75, target: 75 },
  { name: 'May', value: 76, target: 75 },
  { name: 'Jun', value: 78, target: 75 },
];

export const inventoryTurnoverData: KpiTrendData[] = [
  { name: 'Jan', value: 3.2, target: 4 },
  { name: 'Feb', value: 3.5, target: 4 },
  { name: 'Mar', value: 3.7, target: 4 },
  { name: 'Apr', value: 3.9, target: 4 },
  { name: 'May', value: 4.1, target: 4 },
  { name: 'Jun', value: 4.2, target: 4 },
];

export const regionalKpiData: RegionalKpiData[] = [
  { name: 'NAM', procurementEfficiency: 91, deploymentTime: 12, utilizationRate: 78 },
  { name: 'EMEA', procurementEfficiency: 87, deploymentTime: 14, utilizationRate: 75 },
  { name: 'APAC', procurementEfficiency: 84, deploymentTime: 16, utilizationRate: 81 },
  { name: 'LATAM', procurementEfficiency: 79, deploymentTime: 19, utilizationRate: 72 },
]; 