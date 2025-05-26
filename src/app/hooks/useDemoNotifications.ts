'use client';

import { useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { getDemoNotifications } from '../services/mockNotificationService';

export const useDemoNotifications = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const demoNotifications = getDemoNotifications();

    // Schedule notifications at 15s, 30s, 45s intervals
    const timer15s = setTimeout(() => {
      addNotification({
        title: demoNotifications.notification15s.title,
        message: demoNotifications.notification15s.message,
        type: demoNotifications.notification15s.type,
        metadata: {
          orderType: demoNotifications.notification15s.metadata.orderType,
          priority: 'low',
        },
      });
    }, 15000);

    const timer30s = setTimeout(() => {
      addNotification({
        title: demoNotifications.notification30s.title,
        message: demoNotifications.notification30s.message,
        type: demoNotifications.notification30s.type,
        metadata: {
          datacenter: demoNotifications.notification30s.metadata.datacenter,
          priority: 'high',
        },
      });
    }, 30000);

    const timer45s = setTimeout(() => {
      addNotification({
        title: demoNotifications.notification45s.title,
        message: demoNotifications.notification45s.message,
        type: demoNotifications.notification45s.type,
        metadata: {
          datacenter: demoNotifications.notification45s.metadata.datacenter,
          priority: 'low',
        },
      });
    }, 45000);

    // Cleanup timeouts on unmount
    return () => {
      clearTimeout(timer15s);
      clearTimeout(timer30s);
      clearTimeout(timer45s);
    };
  }, [addNotification]);
}; 