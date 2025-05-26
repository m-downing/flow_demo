/**
 * Banner Alert Components - Integration Examples
 * 
 * This file demonstrates practical integration patterns for InfoBanner and CriticalBanner
 * components within the enterprise application architecture.
 */

import React, { useState, useEffect } from 'react';
import { InfoBanner, CriticalBanner } from '../components/feedback';
import { SparklesIcon } from '@heroicons/react/24/outline';

// Type definitions for alert system
interface AlertAction {
  label: string;
  onClick: () => void;
}

interface CriticalAlert {
  title: string;
  message: string;
  action?: AlertAction;
}

// Example 1: Basic InfoBanner for feature announcements
export const FeatureAnnouncementExample = () => {
  return (
    <InfoBanner
      id="q4-features-2024"
      title="New Q4 Features Available"
      message="Enhanced analytics dashboard with real-time inventory tracking and predictive insights."
      action={{
        label: "Explore Features",
        onClick: () => window.open('/features/q4-2024', '_blank')
      }}
    />
  );
};

// Example 2: InfoBanner with rich content for maintenance notifications
export const MaintenanceInfoExample = () => {
  return (
    <InfoBanner
      id="scheduled-maintenance-dec-2024"
      title="Scheduled System Maintenance"
      message={
        <div className="space-y-1">
          <p><strong>When:</strong> Saturday, December 14th, 2:00 AM - 4:00 AM EST</p>
          <p><strong>Impact:</strong> Reports and analytics will be temporarily unavailable</p>
          <p><strong>Duration:</strong> Approximately 2 hours</p>
        </div>
      }
      action={{
        label: "View Details",
        onClick: () => console.log('Navigate to maintenance details')
      }}
    />
  );
};

// Example 3: CriticalBanner for security alerts
export const SecurityAlertExample = () => {
  return (
    <CriticalBanner
      title="Security Alert - Action Required"
      message="Unusual login activity detected from multiple locations. Please verify your account security immediately."
      action={{
        label: "Secure Account",
        onClick: () => console.log('Navigate to security settings')
      }}
    />
  );
};

// Example 4: CriticalBanner for system-wide service disruption
export const ServiceDisruptionExample = () => {
  return (
    <CriticalBanner
      title="Service Disruption"
      message={
        <span>
          <strong>Payment processing is currently unavailable.</strong> Orders can still be placed 
          and will be processed once service is restored. Est. resolution: 45 minutes.
        </span>
      }
      action={{
        label: "Status Page",
        onClick: () => window.open('/system-status', '_blank')
      }}
    />
  );
};

// Example 5: Dynamic banner system with state management
export const DynamicBannerSystem = () => {
  const [systemStatus, setSystemStatus] = useState({
    hasSecurityAlert: false,
    hasServiceIssue: false,
    maintenanceWindow: null
  });

  // Simulate system status checks
  useEffect(() => {
    const checkSystemStatus = async () => {
      // In real implementation, this would call your system status API
      const mockStatus = {
        hasSecurityAlert: Math.random() > 0.8, // 20% chance
        hasServiceIssue: Math.random() > 0.9,  // 10% chance
        maintenanceWindow: null
      };
      setSystemStatus(mockStatus);
    };

    checkSystemStatus();
    
    // Check every 5 minutes
    const interval = setInterval(checkSystemStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Critical alerts always take precedence */}
      {systemStatus.hasSecurityAlert && (
        <CriticalBanner
          title="Security Alert"
          message="Multiple failed login attempts detected. Please review your account security."
          action={{
            label: "Review Security",
            onClick: () => console.log('Navigate to security review')
          }}
        />
      )}

      {systemStatus.hasServiceIssue && (
        <CriticalBanner
          title="Service Issue"
          message="We're experiencing high server load. Some features may be slower than usual."
        />
      )}

      {/* Info banners for non-critical notifications */}
      <InfoBanner
        id="weekly-digest-available"
        title="Weekly Operations Digest Ready"
        message="Your personalized weekly summary of supply chain operations is now available."
        icon={<SparklesIcon className="w-5 h-5 text-blue-700 flex-shrink-0" />}
        action={{
          label: "View Digest",
          onClick: () => console.log('Navigate to weekly digest')
        }}
      />
    </div>
  );
};

// Example 6: Integration with AppWrapper layout
export const AppWrapperIntegrationExample = () => {
  const [criticalAlert, setCriticalAlert] = useState<CriticalAlert | null>(null);
  
  // Mock function to simulate receiving critical system alerts
  const handleSystemAlert = (alert: CriticalAlert) => {
    setCriticalAlert(alert);
  };

  return (
    <div className="grid grid-cols-[100px_1fr] min-h-screen min-w-[768px] relative">
      {/* Sidebar would be here */}
      <div className="bg-primary-800 w-[100px]">
        {/* Sidebar content */}
      </div>
      
      {/* Main content area with banners */}
      <main className="overflow-y-auto min-h-screen bg-neutral-50 dark:bg-primary-900 relative">
        {/* Critical alerts */}
        {criticalAlert && (
          <CriticalBanner
            title={criticalAlert.title}
            message={criticalAlert.message}
            action={criticalAlert.action}
            isVisible={!!criticalAlert}
          />
        )}
        
        {/* Info banners */}
        <InfoBanner
          id="inventory-optimization-tip"
          title="Optimization Tip"
          message="Consider adjusting reorder points for seasonal items based on last year's data."
          action={{
            label: "Optimize Now",
            onClick: () => console.log('Navigate to inventory optimization')
          }}
        />
        
        {/* Your main page content */}
        <div className="p-6">
          <h1>Main Application Content</h1>
          <p>The banners appear above this content area...</p>
          
          {/* Demo button to trigger critical alert */}
          <button
            onClick={() => handleSystemAlert({
              title: "Demo Critical Alert",
              message: "This is a demonstration of a critical system alert.",
              action: {
                label: "Acknowledge",
                onClick: () => setCriticalAlert(null)
              }
            })}
            className="mt-4 px-4 py-2 bg-error-500 text-white rounded-md"
          >
            Trigger Critical Alert (Demo)
          </button>
        </div>
      </main>
    </div>
  );
};

// Example 7: Enterprise workflow integration
export const EnterpriseWorkflowExample = () => {
  const [notifications, setNotifications] = useState({
    complianceReminder: true,
    inventoryAlert: false,
    performanceInsight: true
  });

  return (
    <div className="relative">
      {/* Compliance reminder - Critical */}
      {notifications.complianceReminder && (
        <CriticalBanner
          title="Compliance Deadline Approaching"
          message="Annual safety compliance documentation must be submitted by December 31st, 2024."
          action={{
            label: "Complete Now",
            onClick: () => {
              console.log('Navigate to compliance portal');
              setNotifications(prev => ({ ...prev, complianceReminder: false }));
            }
          }}
        />
      )}

      {/* Low inventory alert - Critical when stock is critical */}
      {notifications.inventoryAlert && (
        <CriticalBanner
          title="Critical Inventory Alert"
          message="5 SKUs have fallen below minimum safety stock levels. Immediate reordering required."
          action={{
            label: "Review & Reorder",
            onClick: () => console.log('Navigate to inventory management')
          }}
        />
      )}

      {/* Performance insight - Informational */}
      {notifications.performanceInsight && (
        <InfoBanner
          id="monthly-performance-insight"
          title="Performance Insight Available"
          message="Your supply chain efficiency improved by 12% this month. See detailed analysis and recommendations."
          action={{
            label: "View Report",
            onClick: () => console.log('Navigate to performance report')
          }}
        />
      )}
    </div>
  );
};

// Export all examples for easy importing in documentation or demos
export const BannerExamples = {
  FeatureAnnouncementExample,
  MaintenanceInfoExample,
  SecurityAlertExample,
  ServiceDisruptionExample,
  DynamicBannerSystem,
  AppWrapperIntegrationExample,
  EnterpriseWorkflowExample
}; 