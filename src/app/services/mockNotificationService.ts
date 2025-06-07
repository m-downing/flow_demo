import { Notification } from '@/app/types/notification';

export const generateMockNotifications = (): Notification[] => {
  return [
    {
      id: 'helius-1',
      title: 'System Status Update',
      message: 'OCULUS monitoring systems are operating normally',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
      metadata: {
        datacenter: 'DC-01',
        priority: 'medium'
      }
    },
    {
      id: 'helius-2',
      title: 'Performance Alert',
      message: 'Server response times are within acceptable parameters',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true,
      metadata: {
        datacenter: 'DC-02',
        priority: 'low'
      }
    },
    {
      id: 'helius-3',
      title: 'Maintenance Scheduled',
      message: 'Scheduled maintenance for OCULUS will begin at 2:00 AM EST',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      isRead: false,
      metadata: {
        datacenter: 'DC-03',
        priority: 'high'
      }
    }
  ];
};

export const getDemoNotifications = () => {
  return {
    notification15s: {
      title: 'OCULUS Infrastructure Alert',
      message: 'Network latency detected in DC-East region',
      type: 'warning' as const,
      metadata: {
        orderType: 'Infrastructure'
      }
    },
    notification30s: {
      title: 'OCULUS Performance Update',
      message: 'System optimization completed successfully',
      type: 'success' as const,
      metadata: {
        datacenter: 'DC-West'
      }
    },
    notification45s: {
      title: 'OCULUS Maintenance Notice',
      message: 'Routine maintenance completed ahead of schedule',
      type: 'info' as const,
      metadata: {
        datacenter: 'DC-Central'
      }
    }
  };
}; 