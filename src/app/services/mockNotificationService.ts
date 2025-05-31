import { Notification } from '@/app/types/notification';

// Data centers for realistic notifications
const dataCenters = [
  'Singapore DC-1', 'Singapore DC-2',
  'Tokyo DC-1', 'Tokyo DC-2', 
  'London DC-1', 'London DC-2',
  'New York DC-1', 'New York DC-2',
  'Frankfurt DC-1', 'Sydney DC-1',
  'Hong Kong DC-1', 'Mumbai DC-1'
];

// Order types and equipment
const orderTypes = [
  'Server Rack Deployment',
  'Network Equipment Upgrade',
  'Storage Array Installation',
  'Security Hardware Deployment',
  'Backup Infrastructure Setup'
];

// Generates realistic notification data
export const generateMockNotifications = (): Notification[] => {
  const notifications: Notification[] = [];
  const now = new Date();

  // Initial notifications (2-3 mix of read/unread)
  notifications.push({
    id: 'notif-1',
    type: 'success',
    title: 'Deployment Complete',
    message: 'Server rack installation completed successfully at Singapore DC-1. All 42U racks are operational and passed QA testing.',
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    metadata: {
      datacenter: 'Singapore DC-1',
      priority: 'low'
    }
  });

  notifications.push({
    id: 'notif-2',
    type: 'warning',
    title: 'Capacity Warning',
    message: 'Tokyo DC-1 approaching 85% capacity. Consider scheduling expansion or load balancing to other facilities.',
    timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    metadata: {
      datacenter: 'Tokyo DC-1',
      priority: 'medium'
    }
  });

  notifications.push({
    id: 'notif-3',
    type: 'info',
    title: 'Order Confirmation',
    message: 'Purchase order PO-2024-5846 for 20x Dell PowerEdge servers has been confirmed. Expected delivery: March 15, 2024.',
    timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: false,
    metadata: {
      orderType: 'PO-2024-5846',
      priority: 'low'
    }
  });

  return notifications;
};

// Demo notifications that will be triggered at intervals
export const getDemoNotifications = () => ({
  notification15s: {
    type: 'info' as const,
    title: 'New Order Confirmed',
    message: 'Purchase order PO-2024-5847 for network switches has been approved and confirmed by supplier. Estimated delivery: 5-7 business days.',
    metadata: {
      orderType: 'PO-2024-5847',
      priority: 'low' as const
    }
  },
  notification30s: {
    type: 'error' as const,
    title: 'Critical: Temperature Alert',
    message: 'Cooling system anomaly detected in Tokyo DC-1 Rack 15-20. Temperature exceeding safe thresholds. Immediate maintenance required.',
    metadata: {
      datacenter: 'Tokyo DC-1',
      priority: 'high' as const
    }
  },
  notification45s: {
    type: 'success' as const,
    title: 'Deployment Complete',
    message: 'Singapore DC security hardware deployment completed successfully. All firewalls and intrusion detection systems are online.',
    metadata: {
      datacenter: 'Singapore DC',
      priority: 'low' as const
    }
  }
});

// Utility functions for generating random notifications
export const generateRandomNotification = (): Omit<Notification, 'id' | 'timestamp' | 'isRead'> => {
  const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
  const categories: Array<'order' | 'capacity' | 'deployment' | 'maintenance' | 'critical'> = ['order', 'capacity', 'deployment', 'maintenance', 'critical'];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const dataCenter = dataCenters[Math.floor(Math.random() * dataCenters.length)];
  const orderType = orderTypes[Math.floor(Math.random() * orderTypes.length)];
  
  const templates = {
    order: [
      {
        title: `New Order: ${orderType}`,
        message: `Purchase order PO-2024-${Math.floor(Math.random() * 9999)} has been submitted for approval. Estimated value: $${(Math.random() * 500000 + 50000).toFixed(0)}.`
      },
      {
        title: 'Order Status Update',
        message: `Manufacturing completed for order PO-2024-${Math.floor(Math.random() * 9999)}. Items are ready for quality testing and shipment.`
      }
    ],
    capacity: [
      {
        title: 'Capacity Alert',
        message: `${dataCenter} is at ${Math.floor(Math.random() * 30 + 70)}% capacity. Monitor closely for optimization opportunities.`
      },
      {
        title: 'Expansion Required',
        message: `${dataCenter} requires additional rack space. Consider scheduling expansion within next quarter.`
      }
    ],
    deployment: [
      {
        title: 'Deployment Started',
        message: `${orderType} deployment initiated at ${dataCenter}. Estimated completion: ${Math.floor(Math.random() * 8 + 2)} hours.`
      },
      {
        title: 'Installation Update',
        message: `${orderType} at ${dataCenter} is 75% complete. Final testing and commissioning in progress.`
      }
    ],
    maintenance: [
      {
        title: 'Scheduled Maintenance',
        message: `Routine maintenance scheduled for ${dataCenter} on ${new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.`
      },
      {
        title: 'Maintenance Complete',
        message: `Preventive maintenance completed successfully at ${dataCenter}. All systems operational.`
      }
    ],
    critical: [
      {
        title: 'Critical Alert',
        message: `Urgent attention required at ${dataCenter}. System anomaly detected requiring immediate response.`
      },
      {
        title: 'Security Incident',
        message: `Security monitoring detected unusual activity at ${dataCenter}. Investigation in progress.`
      }
    ]
  };

  const template = templates[category][Math.floor(Math.random() * templates[category].length)];
  
  return {
    type,
    title: template.title,
    message: template.message,
    metadata: {
      datacenter: category === 'order' ? undefined : dataCenter,
      orderType: category === 'order' ? `PO-2024-${Math.floor(Math.random() * 9999)}` : undefined,
      priority: type === 'error' ? 'high' : type === 'warning' ? 'medium' : 'low'
    }
  };
}; 