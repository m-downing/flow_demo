'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';
import AccountDrawer from './AccountDrawer';
import MainLoadingSpinner from './MainLoadingScreen';
import { InfoBanner, CriticalBanner } from '../components/feedback';
import { NotificationProvider } from '../../app/contexts/NotificationContext';
import { ThemeProvider } from '../../app/contexts/ThemeContext';
import { useDemoNotifications } from '../../app/hooks/useDemoNotifications';

interface AppWrapperProps {
  children: React.ReactNode;
}

// Map of app names to their corresponding browser tab titles
const APP_TITLES: Record<string, string> = {
  'FLOW': 'FLOW',
};

// Map of app names to their corresponding favicon paths
const APP_FAVICONS: Record<string, string> = {
  'FLOW': '/icons/favicons/favicon.ico',
};

const DEFAULT_FAVICON = '/icons/favicons/favicon.ico';

const updateFavicon = (iconPath: string) => {
  const linkElements = document.querySelectorAll("link[rel*='icon']");
  if (linkElements.length > 0) {
    linkElements.forEach(link => {
      link.setAttribute('href', iconPath);
    });
  } else {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = iconPath;
    document.head.appendChild(link);
  }
};

// Initialize theme on client side
const initializeTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // No saved preference, check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
};

// Separate component for demo notifications to avoid conditional hook calls
const DemoNotificationsInitializer: React.FC = () => {
  useDemoNotifications();
  return null;
};

// Inner component that uses the demo hook
const AppContent: React.FC<AppWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const pathname = usePathname();

  // Only initialize demo notifications on client side
  useEffect(() => {
    setIsClient(true);
    // Initialize theme when component mounts
    initializeTheme();
  }, []);

  // ========================================
  // BANNER CONTROLS - Change these to enable/disable banners
  // ========================================
  const showInfoBanner = true;     // Set to 'true' to enable InfoBanner
  const showCriticalBanner = false;  // Set to 'true' to enable CriticalBanner

  useEffect(() => {
    document.title = APP_TITLES['FLOW'] || 'FLOW | UI Demo';
    updateFavicon(APP_FAVICONS['FLOW'] || DEFAULT_FAVICON);
  }, []);

  useEffect(() => {
    if (!pathname.includes('/dashboard')) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return (
    <div className={`grid ${isSidebarExpanded ? 'grid-cols-[180px_1fr]' : 'grid-cols-[64px_1fr]'} min-h-screen min-w-[768px] relative transition-all duration-300 ease-in-out`}>
      {/* Initialize demo notifications only after client-side hydration */}
      {isClient && <DemoNotificationsInitializer />}
      
      {/* Account Drawer */}
      <AccountDrawer />
      
      <Sidebar 
        isExpanded={isSidebarExpanded}
        onExpandedChange={setIsSidebarExpanded}
      />
      <main className="overflow-y-auto min-h-screen bg-neutral-50 dark:bg-primary-900 relative">
        {/* ======================================== */}
        {/* SYSTEM BANNERS - Configure above at lines 26-27 */}
        {/* ======================================== */}
        
        {/* CriticalBanner - For urgent alerts, maintenance, security issues */}
        <CriticalBanner
          title="This banner cannot be dismissed by the user and will persist on all pages until removed by dev team."
          message={
            <div className="space-y-1">
              <p><em>More information on variants and features of system alert banners can be found at src/design-system/README/banner-alerts.md</em></p>
            </div>
          }
          icon={<ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 text-error-500" />}
          isVisible={showCriticalBanner}
        />

        {/* InfoBanner - For feature announcements, tips, non-critical updates */}
        <InfoBanner
          id="flow-redesign-demo-info-2025"
          title="FLOW v2.0 Design System Demo"
          message={
            <div className="space-y-1">
              <p><strong>New Features: </strong><em>App Switcher, User Prefs, Dark Mode, Banners, and AI Chat Agent.</em> </p>
              <p>This InfoBanner can be dismissed and won&apos;t reappear once closed.</p>
            </div>
          }
          action={{
            label: "Explore Features",
            onClick: () => {
              console.log('Navigate to features overview');
              alert('Demo: This would navigate to the features overview page');
            }
          }}
          icon={<SparklesIcon className="w-5 h-5 text-primary-700 flex-shrink-0" />}
          isVisible={showInfoBanner}
        />

        {(loading) && <MainLoadingSpinner />}
        {!loading && children}
      </main>
    </div>
  );
};

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent>{children}</AppContent>
      </NotificationProvider>
    </ThemeProvider>
  );
}
