'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { appTabs } from './constants';
import { ChartBarSquareIcon, ServerStackIcon, BriefcaseIcon, CloudIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import NotificationBadge from '../components/feedback/NotificationBadge';
import { Spinner } from '../components/feedback';
import NotificationsModal from '../overlays/modals/Notifications';
import UserPreferencesModal from '../overlays/modals/UserPreferences';
import { useNotifications } from '../../app/contexts/NotificationContext';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>('Snapshot');
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isUserPreferencesModalOpen, setIsUserPreferencesModalOpen] = useState(false);
  const [loadingTab, setLoadingTab] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const appSwitcherRef = useRef<HTMLDivElement>(null);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    // Determine active tab based on current pathname
    // Check all flow tabs for matching paths
    const currentTab = appTabs['flow'].find(tab => tab.path === pathname);
    if (currentTab) {
      setActiveTab(currentTab.name);
      localStorage.setItem('activeTab_flux', currentTab.name);
    } else {
      // Fallback to localStorage if no path match
      const savedTab = localStorage.getItem('activeTab_flux');
      if (savedTab) {
        setActiveTab(savedTab);
      }
    }
    
    // Clear loading state when pathname changes (navigation completed)
    setLoadingTab(null);
  }, [pathname]);

  // Handle click outside to close app switcher
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close user menu if clicking outside
      if (!target.closest('[data-user-menu-button]') && 
          !target.closest('.absolute.bottom-full') && 
          isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
      
      // Close app switcher if clicking outside
      if (appSwitcherRef.current && !appSwitcherRef.current.contains(event.target as Node)) {
        setIsAppSwitcherOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleTabClick = (tabName: string, tabPath?: string) => {
    setActiveTab(tabName);
    localStorage.setItem('activeTab_flux', tabName);
    
    // Set loading state for the clicked tab
    if (tabPath) {
      setLoadingTab(tabName);
    }
    
    // Navigate to the specified path
    if (tabPath) {
      router.push(tabPath);
    } else {
      // Fallback to the old event system for tabs without paths
      window.dispatchEvent(new Event('app:change'));
    }
  };

  const handleAppSwitcherClick = () => {
    setIsAppSwitcherOpen(!isAppSwitcherOpen);
    // Close user menu if it's open
    if (!isAppSwitcherOpen) {
      setIsUserMenuOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    // Close app switcher if it's open
    if (!isUserMenuOpen) {
      setIsAppSwitcherOpen(false);
    }
  };

  const handleNotificationsClick = () => {
    setIsNotificationsModalOpen(true);
    setIsUserMenuOpen(false); // Close user menu when opening notifications
  };

  const handlePreferencesClick = () => {
    setIsUserPreferencesModalOpen(true);
    setIsUserMenuOpen(false); // Close user menu when opening preferences
  };

  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    if (iconName === 'ChartBarSquare') {
      return <ChartBarSquareIcon className="w-6 h-6 text-neutral-50" />;
    } else if (iconName === 'ServerStack') {
      return <ServerStackIcon className="w-6 h-6 text-neutral-50" />;
    } else if (iconName === 'Briefcase') {
      return <BriefcaseIcon className="w-6 h-6 text-neutral-50" />;
    } else if (iconName === 'Cloud') {
      return <CloudIcon className="w-6 h-6 text-neutral-50" />;
    } else if (iconName === 'ChartPie') {
      return <ChartPieIcon className="w-6 h-6 text-neutral-50" />;
    } else {
      return (
        <Image 
          src={iconName}
          alt={`icon`}
          width={24}
          height={24}
          className="mb-2"
        />
      );
    }
  };

  return (
    <>
      <div className="relative" ref={appSwitcherRef}>
        <aside className="sticky top-0 h-screen flex flex-col bg-primary-800/90 w-[100px] font-heading">
          {/* Top section - always clickable, links to home */}
          <Link href="/">
            <div className="group h-[120px] flex flex-col items-center justify-center pt-2 cursor-pointer transition-colors duration-50 bg-primary-800/90 w-full">
              <div className="flex flex-col items-center gap-[5px]">
                <Image 
                  src="/icons/vertical-nav/flow.svg"
                  alt="FLOW Logo"
                  width={26}
                  height={26}
                  className="mb-1 group-hover:opacity-60 transition-opacity duration-50"
                />
                <h1 className="text-neutral-50 group-hover:text-neutral-50/[.6] text-[14px] tracking-wider font-body transition-colors duration-50">FLOW</h1>
              </div>
            </div>
          </Link>

          {/* App Switcher Icon */}
          <div className="bg-primary-800/90 w-full flex justify-center">
            <Image 
              src="/icons/vertical-nav/app-switcher.svg"
              alt="App Switcher"
              width={20}
              height={20}
              className="mt-2 mb-6 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={handleAppSwitcherClick}
            />
          </div>

          {/* App Switcher Submenu - Expanded within sidebar */}
          {isAppSwitcherOpen && (
            <div className="bg-primary-900 w-full py-4 px-4">
              <div className="flex flex-col gap-3 items-center">
                <Link href="#">
                  <span className="font-semibold text-neutral-50 text-[10px] tracking-wider hover:text-neutral-300 transition-colors duration-200 cursor-pointer">
                    Helius
                  </span>
                </Link>
                <Link href="#">
                  <span className="font-semibold text-neutral-50 text-[10px] tracking-wider hover:text-neutral-300 transition-colors duration-200 cursor-pointer">
                    Hyperion
                  </span>
                </Link>
                <Link href="#">
                  <span className="font-semibold text-neutral-50 text-[10px] tracking-wider hover:text-neutral-300 transition-colors duration-200 cursor-pointer">
                    Oculus
                  </span>
                </Link>
              </div>
            </div>
          )}

          {/* Middle section - navigation tabs */}
          <div className="flex-1 flex flex-col items-center py-8 gap-8 bg-primary-800/90 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {appTabs['flow'].map((tab) => (
              <div 
                key={tab.name}
                className={`flex flex-col items-center cursor-pointer group relative ${activeTab === tab.name ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity duration-200`}
                onClick={() => handleTabClick(tab.name, tab.path)}
                role="button"
                tabIndex={0}
                aria-label={`Go to ${tab.name}`}
              >
                {/* Loading spinner overlay */}
                {loadingTab === tab.name && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary-800/80 rounded-lg z-10">
                    <Spinner variant="light" size="md" aria-label={`Loading ${tab.name}`} />
                  </div>
                )}
                
                {/* Tab content - always rendered to maintain height, but made invisible when loading */}
                <div className={`flex flex-col items-center ${loadingTab === tab.name ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
                  <div className="mb-2">
                    {renderIcon(tab.icon)}
                  </div>
                  <span className="text-neutral-50 text-[11px] tracking-wider">{tab.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom section - User menu */}
          <div className="h-[80px] bg-primary-800/90 w-full flex flex-col items-center justify-end relative">
            {/* User Menu Submenu - Positioned absolutely above the icon */}
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 bg-primary-900 py-4 px-4">
                <div className="flex flex-col gap-3 items-center">
                  <span 
                    onClick={handlePreferencesClick}
                    className="font-medium text-neutral-50 text-[11px] tracking-tight hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
                  >
                    Preferences
                  </span>
                  <div className="flex items-center gap-2">
                    <span 
                      onClick={handleNotificationsClick}
                      className="font-medium text-neutral-50 text-[11px] tracking-tight hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
                    >
                      Alerts
                    </span>
                    {unreadCount > 0 && (
                      <div className="bg-error-500 text-white text-[10px] px-1 ml-1 min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="relative">
              <div 
                className="w-[24px] h-[24px] rounded-full bg-neutral-300 flex items-center justify-center cursor-pointer hover:bg-neutral-400 transition-all duration-50 shadow-md mb-6"
                role="button"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                tabIndex={0}
                onClick={toggleUserMenu}
                data-user-menu-button
              >
                <UserIcon className="w-4 h-4 text-primary-800" />
              </div>
              <NotificationBadge count={unreadCount} variant="md" />
            </div>
          </div>
        </aside>
      </div>

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      {/* User Preferences Modal */}
      <UserPreferencesModal
        isOpen={isUserPreferencesModalOpen}
        onClose={() => setIsUserPreferencesModalOpen(false)}
      />
    </>
  );
}
