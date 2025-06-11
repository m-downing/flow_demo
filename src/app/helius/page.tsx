'use client';

import React from 'react';
import { PageContainer, Card } from '@/design-system/layout';
import Button from '@/design-system/components/primitives/Button';
import Badge from '@/design-system/components/feedback/Badge';
import Image from 'next/image';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function HomePage() {
  const { theme } = useTheme();
  
  return (
    <PageContainer>
      <div className="mx-10 py-10">
        {/* Logo and Welcome Text - Centered */}
        <div className="flex flex-col items-center mb-8">
          <Image 
            src={theme === 'dark' ? "/icons/ui/helius.svg" : "/icons/ui/helius-dark.svg"} 
            alt="Helius Logo" 
            width={48} 
            height={48}
            className="mb-4"
          />
          <p className="text-center text-3xl text-neutral-700 dark:text-neutral-300">
            Welcome to <span className="font-bold">Helius</span> - Supply Planning Tool.
          </p>
        </div>

        {/* Main Card with Balance Views */}
        <div className="col-span-12">
          <Card 
            className="w-full"
            padding="6"
            headerSpacing="4"
          >
            {/* Header with Icon and Title */}
            <div className="flex items-start mb-2">
              <svg className="w-6 h-6 mr-3 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div>
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  Balance Views
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Demand Supply Balance View & Graph
                </p>
              </div>
            </div>

            {/* Description Text */}                                                                                                                                                                             
            <p className="text-neutral-600 dark:text-neutral-300 mb-6 ml-9">
              This view shows the demand and supply balances in both grid and graph formats. 
              Users can filter the data by service/product, site, fabric, attributes, and tenant.
            </p>

            {/* Button Grid - 6 columns with span-2 each */}
            <div className="grid grid-cols-12 gap-24 ml-9">
              <div className="col-span-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => {}}
                >
                  ICPW
                </Button>
              </div>
              <div className="col-span-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => {}}
                >
                  File Storage
                </Button>
              </div>
              <div className="col-span-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => {}}
                >
                  Data Protection
                </Button>
              </div>
              <div className="col-span-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => {}}
                >
                  Object Storage
                </Button>
              </div>
              <div className="col-span-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => {}}
                >
                  Block Storage
                </Button>
              </div>
              <div className="col-span-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => {}}
                >
                  Network
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* S&OP Automation Views */}
        <div className="col-span-12 mt-12">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50 mb-4">
            S&OP Automation Views:
          </h2>
          <div className="grid grid-cols-12 gap-4">
            {/* Negative Balance View */}
            <div className="col-span-3">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                      Negative Balance View
                    </h3>
                  </div>
                  <Badge variant="atRisk" size="small">
                    At Risk
                  </Badge>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view primarily displays information about supply shortages. It generates the number of orders to suggest for each site based on the demand needed.
                </p>
              </Card>
            </div>

            {/* Proposed Orders View */}
            <div className="col-span-3">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13m-7 6h7" />
                    </svg>
                    <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                      Proposed Orders View
                    </h3>
                  </div>
                  <Badge variant="sop" size="small">
                    Proposed
                  </Badge>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view shows all the orders suggested from the Negative Balance view. Users can check within the lead time and update the delivery date if needed.
                </p>
              </Card>
            </div>

            {/* Forecasted Orders View */}
            <div className="col-span-3">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                      Forecasted Orders View
                    </h3>
                  </div>
                  <Badge variant="forecast" size="small">
                    Forecasted
                  </Badge>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view shows all the orders predicted from the proposed orders view. Users can use these forecasted records for S&OP review and approval.
                </p>
              </Card>
            </div>

            {/* Planned View */}
            <div className="col-span-3">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                      Planned View
                    </h3>
                  </div>
                  <Badge variant="businessCase" size="small">
                    Planned
                  </Badge>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view shows all the orders planned from the Forecasted Orders view. Users can use this view to see all the supply currently in the planning stage.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Pre-S&OP Check */}
        <div className="col-span-12 mt-12">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50 mb-4">
            Pre-S&OP Check:
          </h2>
          <div className="grid grid-cols-12 gap-4">
            {/* Disabled Clusters Card */}
            <div className="col-span-6">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                    Disabled Clusters - Allocation Below Threshold
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view shows information about disabled clusters with allocations below the service threshold. Planners can review the cluster attributes.
                </p>
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {}}
                  >
                    View Now
                  </Button>
                </div>
              </Card>
            </div>

            {/* Duplicate Rack Card */}
            <div className="col-span-6">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                    Duplicate Rack in Supply and Inventory
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view shows racks that appear in both Inventory and Supply, which can overstate the available supply. Planners can work with the execution team to resolve these duplicates.
                </p>
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => {}}
                  >
                    View Now
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Other Views */}
        <div className="col-span-12 mt-12">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50 mb-4">
            Other Views:
          </h2>
          <div className="grid grid-cols-12 gap-4">
            {/* Cluster Inventory View */}
            <div className="col-span-4">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                    Cluster Inventory View
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view shows the net off by cluster for ICPW racks used for shared, VDI, or gap purposed. Users can filter the data by region, site, service, and cluster.
                </p>
              </Card>
            </div>

            {/* Data Center Layout View */}
            <div className="col-span-4">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                    Data Center Layout View
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  This view shows the NA data center layout, including rack counts, product allocation, and power details from DCOS and Satori at module and rack levels.
                </p>
              </Card>
            </div>

            {/* Reporting View */}
            <div className="col-span-4">
              <Card
                shadowLevel="sm"
                padding="4"
                className="h-full"
              >
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 mr-2 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
                    Reporting View
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Users can use this view to export demand and supply data for selected service type. It also exports the balance and running balance for all attributes.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}