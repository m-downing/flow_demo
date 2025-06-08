'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/design-system/layout';
import { Card } from '@/design-system/layout';
import { colors } from '@/design-system/foundations/tokens';

export default function HomePage() {
  const [retailSelectedTab, setRetailSelectedTab] = useState(0);
  const [wholesaleSelectedTab, setWholesaleSelectedTab] = useState(0);

  // Define bubble colors using dataViz palette
  const bubbleColors = [
    colors.dataViz.primary,
    colors.dataViz.secondary,
    colors.dataViz.positive,
    colors.dataViz.highlight,
    colors.dataViz.alt,
  ];

  return (
    <PageContainer>
      <div className="p-6">
        {/* Logo and Welcome Text */}
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/icons/ui/oculus-dark.svg" 
            alt="Oculus Logo" 
            className="w-16 h-16 mb-3"
          />
          <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200">
            Welcome to Oculus
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* ICP Retail Card */}
          <div className="col-span-6">
            <Card className="h-[600px] !p-0 overflow-hidden">
              <div className="bg-primary-700 px-4 py-3">
                <h6 className="text-lg font-medium text-neutral-50 text-center">
                  ICP Retail
                </h6>
              </div>
              
              <div className="p-4 h-full flex flex-col">
                {/* Tabs */}
                <div className="grid grid-cols-6 gap-2 mb-6">
                  <button
                    onClick={() => setRetailSelectedTab(0)}
                    className={`col-span-2 py-2 px-3 rounded-md text-sm font-medium transition-all
                      ${retailSelectedTab === 0 
                        ? 'bg-primary-700 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-primary-700'
                      }
                    `}
                  >
                    39
                  </button>
                  <button
                    onClick={() => setRetailSelectedTab(1)}
                    className={`col-span-2 py-2 px-3 rounded-md text-sm font-medium transition-all
                      ${retailSelectedTab === 1 
                        ? 'bg-primary-700 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-primary-700'
                      }
                    `}
                  >
                    39
                  </button>
                  <button
                    onClick={() => setRetailSelectedTab(2)}
                    className={`col-span-2 py-2 px-3 rounded-md text-sm font-medium transition-all
                      ${retailSelectedTab === 2 
                        ? 'bg-primary-700 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-primary-700'
                      }
                    `}
                  >
                    0
                  </button>
                </div>

                {/* Bubble Chart - Visual Mock */}
                <div className="flex flex-col items-center justify-center space-y-6 py-8 flex-1">
                  {/* Row 1 - 3 bubbles */}
                  <div className="flex justify-center space-x-6">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={`row1-${i}`}
                        className="w-20 h-20 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: bubbleColors[i % bubbleColors.length] }}
                      />
                    ))}
                  </div>
                  
                  {/* Row 2 - 5 bubbles */}
                  <div className="flex justify-center space-x-6">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={`row2-${i}`}
                        className="w-20 h-20 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: bubbleColors[(i + 3) % bubbleColors.length] }}
                      />
                    ))}
                  </div>
                  
                  {/* Row 3 - 4 bubbles */}
                  <div className="flex justify-center space-x-6">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={`row3-${i}`}
                        className="w-20 h-20 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: bubbleColors[(i + 1) % bubbleColors.length] }}
                      />
                    ))}
                  </div>
                  
                  {/* Row 4 - 5 bubbles */}
                  <div className="flex justify-center space-x-6">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={`row4-${i}`}
                        className="w-20 h-20 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: bubbleColors[(i + 2) % bubbleColors.length] }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ICP Wholesale Card */}
          <div className="col-span-6">
            <Card className="h-[600px] !p-0 overflow-hidden">
              <div className="bg-primary-700 px-4 py-3">
                <h6 className="text-lg font-medium text-neutral-50 text-center">
                  ICP Wholesale
                </h6>
              </div>
              
              <div className="p-4 h-full flex flex-col">
                {/* Tabs */}
                <div className="grid grid-cols-6 gap-2 mb-6">
                  <button
                    onClick={() => setWholesaleSelectedTab(0)}
                    className={`col-span-2 py-2 px-3 rounded-md text-sm font-medium transition-all
                      ${wholesaleSelectedTab === 0 
                        ? 'bg-primary-700 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-primary-700'
                      }
                    `}
                  >
                    1954
                  </button>
                  <button
                    onClick={() => setWholesaleSelectedTab(1)}
                    className={`col-span-2 py-2 px-3 rounded-md text-sm font-medium transition-all
                      ${wholesaleSelectedTab === 1 
                        ? 'bg-primary-700 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-primary-700'
                      }
                    `}
                  >
                    206
                  </button>
                  <button
                    onClick={() => setWholesaleSelectedTab(2)}
                    className={`col-span-2 py-2 px-3 rounded-md text-sm font-medium transition-all
                      ${wholesaleSelectedTab === 2 
                        ? 'bg-primary-700 text-neutral-50' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-primary-700'
                      }
                    `}
                  >
                    1748
                  </button>
                </div>

                {/* Bubble Chart - Visual Mock with 4 bubbles */}
                <div className="flex flex-col items-center justify-center py-8 flex-1">
                  <div className="grid grid-cols-2 gap-12">
                    {/* Top row - 2 large bubbles */}
                    <div 
                      className="w-40 h-40 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: colors.dataViz.primary }}
                    />
                    <div 
                      className="w-40 h-40 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: colors.dataViz.positive }}
                    />
                    
                    {/* Bottom row - 2 small bubbles */}
                    <div 
                      className="w-20 h-20 rounded-full opacity-80 hover:opacity-100 transition-opacity justify-self-center"
                      style={{ backgroundColor: colors.dataViz.highlight }}
                    />
                    <div 
                      className="w-20 h-20 rounded-full opacity-80 hover:opacity-100 transition-opacity justify-self-center"
                      style={{ backgroundColor: colors.dataViz.secondary }}
                    />
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