// Define interfaces for network data
export interface NetworkIncident {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  location: string;
  component: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

export interface NetworkUtilization {
  name: string;
  inbound: number;
  outbound: number;
  [key: string]: string | number;
}

export interface NetworkComponent {
  id: number;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'load_balancer';
  location: string;
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  utilization: number;
  lastUpdated: string;
}

// Mock data
export const networkIncidents: NetworkIncident[] = [
  { 
    id: 1, 
    severity: 'critical', 
    message: 'Network switch failure detected', 
    location: 'NYC-EAST-12', 
    component: 'Core Switch A4',
    timestamp: '2023-10-30 09:15:22',
    status: 'active'
  },
  { 
    id: 2, 
    severity: 'warning', 
    message: 'Elevated packet loss on APAC-EMEA link', 
    location: 'SINGAPORE-03 to FRANKFURT-01', 
    component: 'WAN Link',
    timestamp: '2023-10-30 08:30:45',
    status: 'investigating'
  },
  { 
    id: 3, 
    severity: 'info', 
    message: 'Firmware update scheduled', 
    location: 'LONDON-WEST-07', 
    component: 'Security Appliances',
    timestamp: '2023-10-30 07:25:10',
    status: 'active'
  },
  { 
    id: 4, 
    severity: 'warning', 
    message: 'Bandwidth utilization above 80%', 
    location: 'NYC-WEST-08', 
    component: 'Internet Gateway',
    timestamp: '2023-10-29 18:45:33',
    status: 'active'
  },
  { 
    id: 5, 
    severity: 'critical', 
    message: 'Multiple firewall failures detected', 
    location: 'FRANKFURT-01', 
    component: 'Security Cluster',
    timestamp: '2023-10-29 15:20:18',
    status: 'resolved'
  },
];

export const networkComponents: NetworkComponent[] = [
  { id: 1, name: 'Core Router A', type: 'router', location: 'NYC-EAST-12', status: 'operational', utilization: 62, lastUpdated: '2023-10-30 09:30:00' },
  { id: 2, name: 'Core Switch B', type: 'switch', location: 'NYC-EAST-12', status: 'operational', utilization: 58, lastUpdated: '2023-10-30 09:30:00' },
  { id: 3, name: 'Edge Firewall C', type: 'firewall', location: 'NYC-EAST-12', status: 'warning', utilization: 78, lastUpdated: '2023-10-30 09:30:00' },
  { id: 4, name: 'Load Balancer D', type: 'load_balancer', location: 'NYC-EAST-12', status: 'operational', utilization: 45, lastUpdated: '2023-10-30 09:30:00' },
  { id: 5, name: 'Core Router A', type: 'router', location: 'LONDON-WEST-07', status: 'operational', utilization: 55, lastUpdated: '2023-10-30 09:25:00' },
  { id: 6, name: 'Core Switch B', type: 'switch', location: 'LONDON-WEST-07', status: 'maintenance', utilization: 0, lastUpdated: '2023-10-30 09:25:00' },
  { id: 7, name: 'Edge Firewall C', type: 'firewall', location: 'LONDON-WEST-07', status: 'operational', utilization: 72, lastUpdated: '2023-10-30 09:25:00' },
  { id: 8, name: 'Core Router A', type: 'router', location: 'SINGAPORE-03', status: 'critical', utilization: 94, lastUpdated: '2023-10-30 09:20:00' },
  { id: 9, name: 'Core Switch B', type: 'switch', location: 'SINGAPORE-03', status: 'operational', utilization: 65, lastUpdated: '2023-10-30 09:20:00' },
  { id: 10, name: 'Edge Firewall C', type: 'firewall', location: 'SINGAPORE-03', status: 'operational', utilization: 61, lastUpdated: '2023-10-30 09:20:00' },
];

export const networkUtilizationData: NetworkUtilization[] = [
  { name: '00:00', inbound: 45, outbound: 32 },
  { name: '02:00', inbound: 38, outbound: 25 },
  { name: '04:00', inbound: 30, outbound: 20 },
  { name: '06:00', inbound: 35, outbound: 28 },
  { name: '08:00', inbound: 62, outbound: 55 },
  { name: '10:00', inbound: 78, outbound: 70 },
  { name: '12:00', inbound: 82, outbound: 73 },
  { name: '14:00', inbound: 85, outbound: 78 },
  { name: '16:00', inbound: 88, outbound: 80 },
  { name: '18:00', inbound: 75, outbound: 68 },
  { name: '20:00', inbound: 60, outbound: 52 },
  { name: '22:00', inbound: 50, outbound: 42 },
];

export const networkEquipmentDistribution = [
  { name: 'Routers', value: 120 },
  { name: 'Switches', value: 220 },
  { name: 'Firewalls', value: 80 },
  { name: 'Load Balancers', value: 40 },
  { name: 'WAN Optimizers', value: 30 },
];

export const latencyData = [
  { x: 35, y: 12, z: 120, name: 'NYC to London' },
  { x: 120, y: 24, z: 80, name: 'NYC to Tokyo' },
  { x: 80, y: 18, z: 100, name: 'London to Frankfurt' },
  { x: 140, y: 28, z: 70, name: 'London to Singapore' },
  { x: 95, y: 22, z: 90, name: 'Frankfurt to Tokyo' },
  { x: 60, y: 15, z: 110, name: 'NYC to Frankfurt' },
  { x: 175, y: 32, z: 60, name: 'Tokyo to Singapore' },
]; 