'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { appTabs } from './constants';
import { ChartBarSquareIcon, ServerStackIcon, BriefcaseIcon, CloudIcon, ChartPieIcon, PresentationChartLineIcon, ArrowRightStartOnRectangleIcon, ArrowLeftStartOnRectangleIcon, GlobeAltIcon, FireIcon, EyeIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import NotificationBadge from '../components/feedback/NotificationBadge';
import { Spinner } from '../components/feedback';
import Tooltip from '../components/feedback/Tooltip';
import NotificationsModal from '../overlays/modals/Notifications';
import UserPreferencesModal from '../overlays/modals/UserPreferences';
import { useNotifications } from '../../app/contexts/NotificationContext';

interface SidebarProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export default function Sidebar({ isExpanded, onExpandedChange }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<string>('Snapshot');
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isUserPreferencesModalOpen, setIsUserPreferencesModalOpen] = useState(false);
  const [loadingTab, setLoadingTab] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
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

  // Handle click outside to close menus and collapse sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close menus and collapse if clicking outside sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
        setIsAppSwitcherOpen(false);
        // Only collapse sidebar if menus were open
        if (isUserMenuOpen || isAppSwitcherOpen) {
          onExpandedChange(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onExpandedChange, isUserMenuOpen, isAppSwitcherOpen]);

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
    onExpandedChange(true);
    setIsAppSwitcherOpen(!isAppSwitcherOpen);
    setIsUserMenuOpen(false); // Close user menu
  };

  const handleUserMenuClick = () => {
    onExpandedChange(true);
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsAppSwitcherOpen(false); // Close app switcher
  };

  const handleExpandClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onExpandedChange(!isExpanded);
    setIsUserMenuOpen(false);
    setIsAppSwitcherOpen(false);
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
  const renderIcon = (iconName: string, isLarge: boolean = false) => {
    const iconClass = isLarge ? "w-7 h-7 text-neutral-50" : "w-6 h-6 text-neutral-50";
    const imageSize = isLarge ? 28 : 24;
    
    if (iconName === 'ChartBarSquare') {
      return <ChartBarSquareIcon className={iconClass} />;
    } else if (iconName === 'ServerStack') {
      return <ServerStackIcon className={iconClass} />;
    } else if (iconName === 'Briefcase') {
      return <BriefcaseIcon className={iconClass} />;
    } else if (iconName === 'Cloud') {
      return <CloudIcon className={iconClass} />;
    } else if (iconName === 'ChartPie') {
      return <ChartPieIcon className={iconClass} />;
    } else if (iconName === 'PresentationChartLine') {
      return <PresentationChartLineIcon className={iconClass} />;
    } else {
      return (
        <Image 
          src={iconName}
          alt={`icon`}
          width={imageSize}
          height={imageSize}
          className="mb-2"
        />
      );
    }
  };

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <aside className="sticky top-0 h-screen flex flex-col bg-primary-800/90 font-heading w-full">
          {/* Fixed Top section - App icon and switcher */}
          <div className="bg-primary-800/90 w-full">
            {/* App Home Icon - Fixed height container */}
            <Link href="/">
              <Tooltip 
                content="Flow UI" 
                position="right" 
                disabled={isExpanded}
                delay={200}
                className="block w-full"
              >
                <div className={`group ${isExpanded ? 'h-[100px]' : 'h-[80px]'} flex flex-col items-center justify-center pt-2 cursor-pointer transition-colors duration-50 bg-primary-800/90 w-full transition-all duration-200`}>
                  <div className="flex flex-col items-center gap-[5px]">
                    <div className="h-[26px] flex items-center justify-center">
                      <Image 
                        src="/icons/vertical-nav/flow.svg"
                        alt="FLOW Logo"
                        width={26}
                        height={26}
                        className="group-hover:opacity-60 transition-opacity duration-50"
                      />
                    </div>
                    {isExpanded && (
                      <h1 className="text-neutral-50 group-hover:text-neutral-50/[.6] text-[16px] tracking-wider font-body transition-colors duration-50">FLOW</h1>
                    )}
                  </div>
                </div>
              </Tooltip>
            </Link>

            {/* App Switcher Icon - Fixed height container */}
            <div className="bg-primary-800/90 w-full flex justify-center pb-4 h-[44px] items-center">
              <Tooltip 
                content="Switch Apps" 
                position="right" 
                disabled={isExpanded}
                delay={200}
              >
                <Image 
                  src="/icons/vertical-nav/app-switcher.svg"
                  alt="App Switcher"
                  width={20}
                  height={20}
                  className="opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={handleAppSwitcherClick}
                />
              </Tooltip>
            </div>
          </div>

          {/* App Switcher Submenu - Separate from fixed header */}
          {isExpanded && isAppSwitcherOpen && (
            <div className="bg-primary-900 w-full py-4 px-4">
              <div className="flex flex-col gap-5">
                <Link href="#">
                  <div className="flex items-center gap-3 font-semibold text-neutral-50 text-[16px] tracking-wider hover:text-neutral-300 transition-colors duration-200 cursor-pointer">
                    <FireIcon className="w-5 h-5" />
                    <span>Helius</span>
                  </div>
                </Link>
                <Link href="#">
                  <div className="flex items-center gap-3 font-semibold text-neutral-50 text-[16px] tracking-wider hover:text-neutral-300 transition-colors duration-200 cursor-pointer">
                    <GlobeAltIcon className="w-5 h-5" />
                    <span>Hyperion</span>
                  </div>
                </Link>
                <Link href="#">
                  <div className="flex items-center gap-3 font-semibold text-neutral-50 text-[16px] tracking-wider hover:text-neutral-300 transition-colors duration-200 cursor-pointer">
                    <EyeIcon className="w-5 h-5" />
                    <span>Oculus</span>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Middle section - navigation tabs */}
          <div className={`flex-1 flex flex-col ${isExpanded ? 'items-start' : 'items-center'} py-8 gap-8 bg-primary-800/90 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
            {appTabs['flow'].map((tab) => (
              <Tooltip
                key={tab.name}
                content={tab.name}
                position="right"
                disabled={isExpanded}
                delay={200}
              >
                <div 
                  className={`flex ${isExpanded ? 'flex-row w-full px-4 gap-3' : 'flex-col'} items-center cursor-pointer group relative ${activeTab === tab.name ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity duration-200`}
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
                  
                  {/* Tab content */}
                  <div className={`flex ${isExpanded ? 'flex-row gap-3' : 'flex-col'} items-center ${loadingTab === tab.name ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
                    <div className={isExpanded ? '' : 'mb-2'}>
                      {renderIcon(tab.icon, isExpanded)}
                    </div>
                    {isExpanded && (
                      <span className="text-neutral-50 tracking-wider text-[15px]">
                        {tab.name}
                      </span>
                    )}
                  </div>
                </div>
              </Tooltip>
            ))}
          </div>

          {/* Bottom section - User menu and expand button */}
          <div className="bg-primary-800/90 w-full">
            {/* User Menu Submenu */}
            {isExpanded && isUserMenuOpen && (
              <div className="bg-primary-900 py-4 px-4">
                <div className="flex flex-col gap-3">
                  <span 
                    onClick={handlePreferencesClick}
                    className="font-medium text-neutral-50 text-[14px] tracking-tight hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
                  >
                    Preferences
                  </span>
                  <div className="flex items-center justify-between">
                    <span 
                      onClick={handleNotificationsClick}
                      className="font-medium text-neutral-50 text-[14px] tracking-tight hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
                    >
                      Alerts
                    </span>
                    {unreadCount > 0 && (
                      <div className="bg-error-500 text-white text-[10px] px-1 min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* User Profile and Expand Icons */}
            <div className={`h-[80px] w-full flex flex-col items-center justify-center relative mb-6`}>
              {/* User Profile Icon */}
              <div className="relative">
                <Tooltip
                  content="User Settings"
                  position="right"
                  disabled={isExpanded}
                  delay={200}
                >
                  <div 
                    className="w-[24px] h-[24px] rounded-full bg-neutral-300 flex items-center justify-center cursor-pointer hover:bg-neutral-400 transition-all duration-50 shadow-md"
                    role="button"
                    aria-label="User menu"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    tabIndex={0}
                    onClick={handleUserMenuClick}
                    data-user-menu-button
                  >
                    <UserIcon className="w-4 h-4 text-primary-800" />
                  </div>
                </Tooltip>
                <NotificationBadge count={unreadCount} variant="md" />
              </div>

              {/* Expand/Collapse Icon */}
              <Tooltip
                content="Expand"
                position="right"
                disabled={isExpanded}
                delay={200}
              >
                <div 
                  className="cursor-pointer hover:opacity-60 transition-opacity duration-200 mt-5"
                  onClick={handleExpandClick}
                  role="button"
                  aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                  tabIndex={0}
                >
                  {isExpanded ? (
                    <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-neutral-400 transition-opacity duration-300" />
                  ) : (
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-neutral-400 transition-opacity duration-300" />
                  )}
                </div>
              </Tooltip>
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
