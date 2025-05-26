// Define BadgeVariant type to match what's in the Badge component
export type BadgeVariant = 
  // Supply Chain Status Badges
  | 'planned'
  | 'ordered'
  | 'manufacturing'
  | 'qualityTesting'
  | 'readyToShip'
  | 'inTransit'
  | 'delivered'
  | 'installing'
  | 'active'
  | 'maintenance'
  | 'delayed'
  // Priority/Risk Badges
  | 'critical'
  | 'highPriority'
  | 'standard'
  | 'atRisk';

// Contact interface
export interface Contact {
  name: string;
  email: string;
  phone: string;
  role: string;
}

// AlertItem interface
export interface AlertItem {
  id: number;
  sctId: string;
  severity: 'critical' | 'warning' | 'update';
  message: string;
  location: string;
  timestamp: string;
  contacts: Contact[];
}

// LogisticsEntry interface
export interface LogisticsEntry {
  id: string;
  rackName: string;
  sku: string;
  supplier: string;
  purchaseOrder: string;
  status: 'Ordered' | 'Shipped' | 'In Transit' | 'Customs' | 'Delivered' | 'Delayed';
  currentLocation: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  priority: 'High' | 'Medium' | 'Low';
  quantity: number;
  assignedDc: string;
  trackingNumber: string;
  notes: string;
  lastUpdate: string;
} 