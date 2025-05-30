'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { appTabs } from './constants';
import { ChartBarSquareIcon, ServerStackIcon, BriefcaseIcon, CloudIcon, ChartPieIcon, PresentationChartLineIcon, ArrowRightStartOnRectangleIcon, ArrowLeftStartOnRectangleIcon, GlobeAltIcon, FireIcon, EyeIcon, TableCellsIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Spinner } from '../components/feedback';
import Tooltip from '../components/feedback/Tooltip';
import AIChatBox from '../utilities/AIChatBox';
import { useTheme } from '../../app/contexts/ThemeContext';

interface SidebarProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export default function Sidebar({ isExpanded, onExpandedChange }: SidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<string>('Snapshot');
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [loadingTab, setLoadingTab] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Theme-aware background classes
  const sidebarBg = isDark ? 'bg-neutral-800' : 'bg-primary-800/90';
  const submenuBg = isDark ? 'bg-neutral-900' : 'bg-primary-900';
  const loadingBg = isDark ? 'bg-neutral-800/80' : 'bg-primary-800/80';

  // Handle text visibility based on expansion state
  useEffect(() => {
    if (isExpanded) {
      // Delay showing text until expansion is nearly complete (80% done)
      const timer = setTimeout(() => {
        setShowText(true);
      }, 160); // Start showing text at 80% of the transition
      return () => clearTimeout(timer);
    } else {
      // Hide text immediately when collapsing
      setShowText(false);
    }
  }, [isExpanded]);

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
        setIsAppSwitcherOpen(false);
        // Collapse sidebar if it's expanded (regardless of submenu state)
        if (isExpanded) {
          onExpandedChange(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onExpandedChange, isExpanded]);

  const handleTabClick = (tabName: string, tabPath?: string) => {
    setActiveTab(tabName);
    localStorage.setItem('activeTab_flux', tabName);
    
    // Set loading state for the clicked tab
    if (tabPath) {
      setLoadingTab(tabName);
    }
    
    // Collapse sidebar when a tab is clicked
    onExpandedChange(false);
    
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
  };

  const handleExpandClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onExpandedChange(!isExpanded);
    setIsAppSwitcherOpen(false);
  };

  const handleAIChatClick = () => {
    setIsAIChatOpen(true);
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
    } else if (iconName === 'TableCells') {
      return <TableCellsIcon className={iconClass} />;
    } else if (iconName === 'Swatch') {
      return <SwatchIcon className={iconClass} />;
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
        <aside className={`sticky top-0 h-screen flex flex-col ${sidebarBg} font-heading ${isExpanded ? 'w-[180px]' : 'w-[64px]'} transition-all duration-300 ease-in-out`}>
          {/* Fixed Top section - App icon and switcher */}
          <div className={`w-full transition-all duration-150 ease-in-out`}>
            {/* App Home Icon - Fixed height container */}
            <Link href="/">
              <Tooltip 
                content="Flow UI" 
                position="right" 
                disabled={isExpanded}
                delay={100}
                className="block w-full"
              >
                <div className={`group ${isExpanded ? 'h-[100px]' : 'h-[80px]'} flex flex-col items-center justify-center pt-2 cursor-pointer transition-all duration-300 ease-in-out w-full`}>
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
                      <h1 className={`text-neutral-50 group-hover:text-neutral-50/[.6] text-[16px] tracking-wider font-body transition-all duration-300 ease-in-out ${showText ? 'opacity-100' : 'opacity-0'}`}>FLOW</h1>
                    )}
                  </div>
                </div>
              </Tooltip>
            </Link>

            {/* App Switcher Icon - Fixed height container */}
            <div className={`w-full flex justify-center pb-4 h-[44px] items-center transition-all duration-300 ease-in-out`}>
              <Tooltip 
                content="Switch Apps" 
                position="right" 
                disabled={isExpanded}
                delay={100}
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
            <div className={`${submenuBg} w-full py-4 px-4 transition-all duration-300 ease-in-out ${showText ? 'opacity-100' : 'opacity-0'}`}>
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
          <div className={`flex-1 flex flex-col ${isExpanded ? 'items-start' : 'items-center'} py-8 gap-8 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-300 ease-in-out`}>
            {appTabs['flow'].map((tab) => (
              <Tooltip
                key={tab.name}
                content={tab.name}
                position="right"
                disabled={isExpanded}
                delay={100}
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
                    <div className={`absolute inset-0 flex items-center justify-center ${loadingBg} rounded-lg z-10`}>
                      <Spinner variant="light" size="md" aria-label={`Loading ${tab.name}`} />
                    </div>
                  )}
                  
                  {/* Tab content */}
                  <div className={`flex ${isExpanded ? 'flex-row gap-3' : 'flex-col'} items-center ${loadingTab === tab.name ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
                    <div className={isExpanded ? '' : 'mb-2'}>
                      {renderIcon(tab.icon, isExpanded)}
                    </div>
                    {isExpanded && (
                      <span className={`text-neutral-50 tracking-wider text-[15px] transition-all duration-300 ease-in-out ${showText ? 'opacity-100' : 'opacity-0'}`}>
                        {tab.name}
                      </span>
                    )}
                  </div>
                </div>
              </Tooltip>
            ))}
          </div>

          {/* Bottom section - AI Chat button and expand button */}
          <div className={`w-full transition-all duration-300 ease-in-out`}>
            <div className={`h-[80px] w-full flex flex-col items-center justify-center relative mb-6`}>
              {/* AI Chat Icon */}
              <Tooltip
                content="IRIS AI Assistant"
                position="right"
                disabled={isExpanded}
                delay={100}
              >
                <div 
                  className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center cursor-pointer hover:from-success-500 hover:to-success-700 transition-all duration-200 shadow-md"
                  role="button"
                  aria-label="Open AI Chat"
                  tabIndex={0}
                  onClick={handleAIChatClick}
                >
                  <SparklesIcon className="w-5 h-5 text-neutral-50" />
                </div>
              </Tooltip>

              {/* Expand/Collapse Icon */}
              <Tooltip
                content="Expand"
                position="right"
                disabled={isExpanded}
                delay={100}
              >
                <div 
                  className="cursor-pointer hover:opacity-60 transition-opacity duration-200 mt-5"
                  onClick={handleExpandClick}
                  role="button"
                  aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                  tabIndex={0}
                >
                  {isExpanded ? (
                    <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-neutral-400 dark:text-neutral-200 transition-opacity duration-300" />
                  ) : (
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-neutral-400 dark:text-neutral-200 transition-opacity duration-300" />
                  )}
                </div>
              </Tooltip>
            </div>
          </div>
        </aside>
      </div>

      {/* AI Chat Box */}
      <AIChatBox
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        title="IRIS"
        placeholder="Ask anything about your supply chain..."
      />
    </>
  );
}
