//src/app/snapshot/components/types.ts

// Import and re-export BadgeVariant from the design system
import { BadgeVariant } from '@/design-system/components/feedback/Badge';
export type { BadgeVariant };

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