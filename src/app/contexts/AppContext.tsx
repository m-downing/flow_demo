'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type AppName = 'oculus' | 'hyperion' | 'mimir' | 'flow' | 'helius';

interface AppConfig {
  name: string;
  displayName: string;
  icon: string;
  favicon: string;
  path: string;
}

export const APP_CONFIGS: Record<AppName, AppConfig> = {
  oculus: {
    name: 'oculus',
    displayName: 'OCULUS',
    icon: '/icons/ui/oculus.svg',
    favicon: '/icons/favicons/oculus.ico',
    path: '/'
  },
  hyperion: {
    name: 'hyperion',
    displayName: 'HYPERION',
    icon: '/icons/ui/hyperion.svg',
    favicon: '/icons/favicons/hyperion.ico',
    path: '/hyperion'
  },
  mimir: {
    name: 'mimir',
    displayName: 'MIMIR',
    icon: '/icons/ui/mimir.svg',
    favicon: '/icons/favicons/mimir.ico',
    path: '/mimir'
  },
  flow: {
    name: 'flow',
    displayName: 'FLOW',
    icon: '/icons/ui/flow.svg',
    favicon: '/icons/favicons/flow.ico',
    path: '/flow'
  },
  helius: {
    name: 'helius',
    displayName: 'HELIUS',
    icon: '/icons/ui/helius.svg',
    favicon: '/icons/favicons/helius.ico',
    path: '/helius'
  }
};

interface AppContextType {
  currentApp: AppName;
  setCurrentApp: (app: AppName) => void;
  currentAppConfig: AppConfig;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine initial app based on pathname
  const getInitialApp = (): AppName => {
    if (pathname.startsWith('/hyperion')) return 'hyperion';
    if (pathname.startsWith('/mimir')) return 'mimir';
    if (pathname.startsWith('/flow')) return 'flow';
    if (pathname.startsWith('/helius')) return 'helius';
    return 'oculus'; // Default to oculus for root and other paths
  };
  
  const [currentApp, setCurrentAppState] = useState<AppName>(getInitialApp());

  // Update current app when pathname changes
  useEffect(() => {
    const newApp = getInitialApp();
    if (newApp !== currentApp) {
      setCurrentAppState(newApp);
    }
  }, [pathname]);

  const setCurrentApp = (app: AppName) => {
    setCurrentAppState(app);
    router.push(APP_CONFIGS[app].path);
  };

  const value = {
    currentApp,
    setCurrentApp,
    currentAppConfig: APP_CONFIGS[currentApp]
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 