'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/design-system/layout';
import { Card } from '@/design-system/layout';
import { colors } from '@/design-system/foundations/tokens';
import { useTheme } from '@/app/contexts/ThemeContext';

// Type definitions
type Region = 'EMEA' | 'APAC' | 'NA' | 'LATAM';

interface Bubble {
  id: string;
  region: Region;
  x: number;
  y: number;
  size: number;
}

export default function HomePage() {
  const [retailSelectedTab, setRetailSelectedTab] = useState(0);
  const [wholesaleSelectedTab, setWholesaleSelectedTab] = useState(0);
  const { theme } = useTheme();

  // Define region colors
  const regionColors: Record<Region, string> = {
    EMEA: colors.dataViz.positive,  // Pink/Red
    APAC: colors.dataViz.secondary, // Blue
    NA: colors.dataViz.highlight,   // Orange
    LATAM: colors.dataViz.positive, // Pink/Red (same as EMEA)
  };

  // Retail bubbles data
  const retailBubbles: Bubble[] = [
    { id: 'NA-INK-C01', region: 'NA', x: 15, y: 20, size: 70 },
    { id: 'AF-JP-C01', region: 'APAC', x: 35, y: 15, size: 85 },
    { id: 'AF-SC-C01', region: 'APAC', x: 60, y: 18, size: 80 },
    { id: 'EM-UK-C01', region: 'EMEA', x: 80, y: 25, size: 65 },
    { id: 'NA-NE-C01', region: 'NA', x: 25, y: 45, size: 90 },
    { id: 'NA-INK-C01-2', region: 'NA', x: 50, y: 40, size: 95 },
    { id: 'NA-NE-CDC4', region: 'NA', x: 75, y: 42, size: 85 },
    { id: 'AF-CN-C01', region: 'APAC', x: 10, y: 65, size: 80 },
    { id: 'NA-INK-C02', region: 'NA', x: 30, y: 70, size: 75 },
    { id: 'NA-NE-C01-3', region: 'NA', x: 55, y: 68, size: 82 },
    { id: 'EM-NE-C01', region: 'EMEA', x: 75, y: 65, size: 70 },
    { id: 'NA-NE-CDC2', region: 'NA', x: 85, y: 70, size: 65 },
    { id: 'AF-CN-C02', region: 'APAC', x: 20, y: 85, size: 75 },
    { id: 'EM-UK-C01-2', region: 'EMEA', x: 40, y: 88, size: 68 },
    { id: 'NA-NE-C02', region: 'NA', x: 60, y: 85, size: 78 },
    { id: 'AF-SC-C01 (DM 13)', region: 'APAC', x: 80, y: 88, size: 85 },
    { id: 'AF-NE-C01', region: 'APAC', x: 50, y: 58, size: 70 },
  ];

  // Wholesale bubbles data - fewer, larger bubbles
  const wholesaleBubbles: Bubble[] = [
    { id: 'NA-NE-C01', region: 'NA', x: 30, y: 50, size: 180 },
    { id: 'AF-SC-C01 (DM1)', region: 'APAC', x: 70, y: 35, size: 120 },
    { id: 'LA-BR-Cann', region: 'LATAM', x: 65, y: 75, size: 70 },
    { id: 'EM-CH-Lausanne', region: 'EMEA', x: 85, y: 80, size: 80 },
  ];

  return (
    <PageContainer>
      <div className="p-6">
        {/* Logo and Title */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <img 
              src={theme === 'dark' ? "/icons/ui/oculus.svg" : "/icons/ui/oculus-dark.svg"} 
              alt="Oculus Logo" 
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">OCULUS</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Intelligent Automation Reordering System</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* ICP Retail Card */}
          <div className="col-span-6">
            <Card className="h-[770px] !p-0 overflow-hidden">
              <div className="bg-primary-700 px-4 py-3">
                <h6 className="text-lg font-medium text-neutral-50 text-center">
                  ICP Retail
                </h6>
              </div>
              
              <div className="p-4 h-full flex flex-col">
                {/* Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    onClick={() => setRetailSelectedTab(0)}
                    className={`py-3 px-3 rounded-md text-center transition-all
                      ${retailSelectedTab === 0 
                        ? 'bg-primary-600 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    <div className="text-xs uppercase font-medium mb-1">Fungible</div>
                    <div className="text-2xl font-bold">39</div>
                    <div className="text-xs">TOTAL TRIGGERS</div>
                  </button>
                  <button
                    onClick={() => setRetailSelectedTab(1)}
                    className={`py-3 px-3 rounded-md text-center transition-all
                      ${retailSelectedTab === 1 
                        ? 'bg-primary-600 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    <div className="text-xs uppercase font-medium mb-1">&#160;</div>
                    <div className="text-2xl font-bold">39</div>
                    <div className="text-xs">OPEN TRIGGERS</div>
                  </button>
                  <button
                    onClick={() => setRetailSelectedTab(2)}
                    className={`py-3 px-3 rounded-md text-center transition-all
                      ${retailSelectedTab === 2 
                        ? 'bg-primary-600 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    <div className="text-xs uppercase font-medium mb-1">Brokerage</div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-xs">CLOSED TRIGGERS</div>
                  </button>
                </div>

                {/* Bubble Chart Container */}
                <div className="flex-1 relative bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 uppercase mb-2">
                    Total Triggers
                  </div>
                  
                  {/* Bubble Chart */}
                  <div className="relative h-[500px]">
                    {retailBubbles.map((bubble) => (
                      <div
                        key={bubble.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs font-medium text-neutral-900 transition-all hover:scale-110 cursor-pointer"
                        style={{
                          left: `${bubble.x}%`,
                          top: `${bubble.y}%`,
                          width: `${bubble.size}px`,
                          height: `${bubble.size}px`,
                          backgroundColor: regionColors[bubble.region],
                          opacity: 0.8,
                        }}
                      >
                        <span className="text-center px-1" style={{ fontSize: '10px' }}>
                          {bubble.id}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: regionColors.EMEA }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">EMEA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: regionColors.APAC }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">APAC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: regionColors.NA }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">NA</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ICP Wholesale Card */}
          <div className="col-span-6">
            <Card className="h-[770px] !p-0 overflow-hidden">
              <div className="bg-primary-700 px-4 py-3">
                <h6 className="text-lg font-medium text-neutral-50 text-center">
                  ICP Wholesale
                </h6>
              </div>
              
              <div className="p-4 h-full flex flex-col">
                {/* Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    onClick={() => setWholesaleSelectedTab(0)}
                    className={`py-3 px-3 rounded-md text-center transition-all
                      ${wholesaleSelectedTab === 0 
                        ? 'bg-primary-600 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    <div className="text-xs uppercase font-medium mb-1">Fungible</div>
                    <div className="text-2xl font-bold">1996</div>
                    <div className="text-xs">TOTAL TRIGGERS</div>
                  </button>
                  <button
                    onClick={() => setWholesaleSelectedTab(1)}
                    className={`py-3 px-3 rounded-md text-center transition-all
                      ${wholesaleSelectedTab === 1 
                        ? 'bg-primary-600 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    <div className="text-xs uppercase font-medium mb-1">&#160;</div>
                    <div className="text-2xl font-bold">205</div>
                    <div className="text-xs">OPEN TRIGGERS</div>
                  </button>
                  <button
                    onClick={() => setWholesaleSelectedTab(2)}
                    className={`py-3 px-3 rounded-md text-center transition-all
                      ${wholesaleSelectedTab === 2 
                        ? 'bg-primary-600 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    <div className="text-xs uppercase font-medium mb-1">Tenants</div>
                    <div className="text-2xl font-bold">1791</div>
                    <div className="text-xs">CLOSED TRIGGERS</div>
                  </button>
                </div>

                {/* Bubble Chart Container */}
                <div className="flex-1 relative bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                  <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 uppercase mb-2">
                    Total Triggers
                  </div>
                  
                  {/* Bubble Chart */}
                  <div className="relative h-[500px]">
                    {wholesaleBubbles.map((bubble) => (
                      <div
                        key={bubble.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs font-medium text-neutral-900 transition-all hover:scale-110 cursor-pointer"
                        style={{
                          left: `${bubble.x}%`,
                          top: `${bubble.y}%`,
                          width: `${bubble.size}px`,
                          height: `${bubble.size}px`,
                          backgroundColor: regionColors[bubble.region],
                          opacity: 0.8,
                        }}
                      >
                        <span className="text-center px-2" style={{ fontSize: bubble.size > 100 ? '14px' : '11px' }}>
                          {bubble.id}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: regionColors.EMEA }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">EMEA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: regionColors.LATAM }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">LATAM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: regionColors.NA }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">NA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: regionColors.APAC }}
                      />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">APAC</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}