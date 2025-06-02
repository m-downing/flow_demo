'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon,
  TrashIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import Modal from '@/design-system/overlays/Modal';
import Badge from '@/design-system/components/feedback/Badge';
import { useNotifications } from '@/app/contexts/NotificationContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Notification } from '@/app/types/notification';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, clearAllNotifications } = useNotifications();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === 'dark';

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === 'unread') {
      return notifications.filter(notification => !notification.isRead);
    }
    return notifications;
  }, [notifications, activeTab]);

  // Format relative time
  const formatRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Get icon for notification type
  const getNotificationIcon = (type: Notification['type']) => {
    const iconClass = 'h-5 w-5';
    switch (type) {
      case 'success':
        return <CheckCircleIcon className={`${iconClass} text-success-500`} />;
      case 'error':
        return <XCircleIcon className={`${iconClass} text-error-500`} />;
      case 'warning':
        return <ExclamationTriangleIcon className={`${iconClass} text-warning-500`} />;
      case 'info':
      default:
        return <InformationCircleIcon className={`${iconClass} text-blue-700`} />;
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  // Theme-aware classes
  const borderClasses = isDark ? 'border-neutral-700' : 'border-neutral-200';
  
  const tabInactiveClasses = isDark 
    ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:border-neutral-600'
    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300';

  const emptyStateIconClasses = isDark ? 'text-neutral-400' : 'text-neutral-400';
  const emptyStateTitleClasses = isDark ? 'text-neutral-100' : 'text-neutral-900';
  const emptyStateTextClasses = isDark ? 'text-neutral-300' : 'text-neutral-500';

  const clearButtonClasses = isDark
    ? 'border-neutral-600 text-neutral-200 bg-neutral-800 hover:bg-neutral-700 focus-visible:ring-neutral-400'
    : 'border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 focus-visible:ring-primary-600';

  const timestampClasses = isDark ? 'text-neutral-400' : 'text-neutral-500';

  const getNotificationClasses = (notification: Notification) => {
    if (notification.isRead) {
      return isDark
        ? 'bg-neutral-900 border-neutral-700 hover:bg-neutral-800'
        : 'bg-white border-neutral-200 hover:bg-neutral-50';
    } else {
      return isDark
        ? 'bg-neutral-700 border-neutral-500 hover:bg-neutral-600'
        : 'bg-blue-50 border-blue-100 hover:bg-blue-100';
    }
  };

  const getNotificationTitleClasses = () => {
    return isDark ? 'text-neutral-100' : 'text-neutral-900';
  };

  const getNotificationMessageClasses = (notification: Notification) => {
    if (notification.isRead) {
      return isDark ? 'text-neutral-300' : 'text-neutral-600';
    } else {
      return isDark ? 'text-neutral-200' : 'text-neutral-700';
    }
  };

  const modalFooter = (
    <div className="flex justify-between items-center">
      <button
        onClick={clearAllNotifications}
        className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${clearButtonClasses}`}
      >
        <TrashIcon className="h-4 w-4 mr-1.5" />
        Clear All
      </button>
      {notifications.some(n => !n.isRead) && (
        <button
          onClick={markAllAsRead}
          className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isDark
              ? 'bg-neutral-700 hover:bg-neutral-600 focus-visible:ring-neutral-400'
              : 'bg-primary-600 hover:bg-primary-700 focus-visible:ring-primary-600'
          }`}
        >
          <CheckIcon className="h-4 w-4 mr-1.5" />
          Mark All Read
        </button>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Notifications"
      size="lg"
      footer={isMounted ? modalFooter : undefined}
      key={`notifications-modal-${theme}-${isMounted}`}
    >
      {isMounted ? (
        <div 
          className="space-y-4"
          style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.15s ease-in-out' }}
        >
          {/* Tabs */}
          <div className={`border-b ${borderClasses}`}>
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? isDark ? 'border-neutral-400 text-neutral-200' : 'border-primary-600 text-primary-600'
                    : tabInactiveClasses
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'unread'
                    ? isDark ? 'border-neutral-400 text-neutral-200' : 'border-primary-600 text-primary-600'
                    : tabInactiveClasses
                }`}
              >
                Unread ({notifications.filter(n => !n.isRead).length})
              </button>
            </nav>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <InformationCircleIcon className={`mx-auto h-12 w-12 ${emptyStateIconClasses}`} />
                <h3 className={`mt-2 text-sm font-medium ${emptyStateTitleClasses}`}>No notifications</h3>
                <p className={`mt-1 text-sm ${emptyStateTextClasses}`}>
                  {activeTab === 'unread' ? 'All caught up!' : 'No notifications yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-colors duration-200
                      ${getNotificationClasses(notification)}
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${getNotificationTitleClasses()}`}>
                              {notification.title}
                            </p>
                            <p className={`mt-1 text-sm ${getNotificationMessageClasses(notification)}`}>
                              {notification.message}
                            </p>
                            {notification.metadata && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {notification.metadata.datacenter && (
                                  <Badge 
                                    variant={notification.type === 'error' ? 'critical' : 'standard'}
                                    size="small"
                                  >
                                    {notification.metadata.datacenter}
                                  </Badge>
                                )}
                                {notification.metadata.orderType && (
                                  <Badge 
                                    variant="standard" 
                                    size="small"
                                  >
                                    {notification.metadata.orderType}
                                  </Badge>
                                )}
                                {notification.metadata.priority && notification.metadata.priority !== 'low' && (
                                  <Badge 
                                    variant={notification.metadata.priority === 'high' ? 'critical' : 'highPriority'} 
                                    size="small"
                                  >
                                    {notification.metadata.priority}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                            <span className={`text-xs ${timestampClasses}`}>
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                            {!notification.isRead && (
                              <div className={`mt-2 w-2 h-2 ${isDark ? 'bg-neutral-400' : 'bg-primary-600'} rounded-full`}></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default NotificationsModal;
