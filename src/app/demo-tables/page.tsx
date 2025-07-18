'use client';

import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/design-system/layout/PageContainer';
import Card from '@/design-system/layout/Card';
import ServerInventoryTable from './components/ServerInventoryTable';
import ServerInventoryList from './components/ServerInventoryList';
import { sampleData } from './components/mockData';
import { 
  DropdownSelect, 
  DropdownMultiSelect,
  DateRangeFilter,
  CheckboxFilter,
  ClearAllFilters,
  SelectOption,
  MultiSelectOption,
  DateRange,
  DEFAULT_PRESETS
} from '@/design-system/components/filters';
import Input from '@/design-system/components/forms/Input';

interface Filters {
  search: string;
  status: string[];
  priority: string[];
  location: string[];
  supplier: string | null;
  serviceLevel: string[];
  dateRange: DateRange;
  activeOnly: boolean;
  hasWarranty: boolean;
}

export default function DemoTablesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: [],
    priority: [],
    location: [],
    supplier: null,
    serviceLevel: [],
    dateRange: { startDate: null, endDate: null },
    activeOnly: false,
    hasWarranty: false,
  });

  // Extract unique values for dropdown options
  const statusOptions: MultiSelectOption[] = useMemo(() => {
    const statuses = [...new Set(sampleData.map(item => item.status))];
    return statuses.map(status => ({ 
      value: status, 
      label: status.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      group: status.includes('planned') || status.includes('ordered') ? 'Planning' : 
             status.includes('manufacturing') || status.includes('quality') ? 'Production' :
             status.includes('transit') || status.includes('delivered') ? 'Shipping' : 'Operations'
    }));
  }, []);

  const locationOptions: MultiSelectOption[] = useMemo(() => {
    const locations = [...new Set(sampleData.map(item => item.location))];
    return locations.map(location => ({ 
      value: location, 
      label: location,
      group: location.startsWith('NA-EAST') ? 'East' :
             location.startsWith('NA-WEST') ? 'West' :
             location.startsWith('NA-CENTRAL') ? 'Central' : 'South'
    }));
  }, []);

  const supplierOptions: SelectOption[] = useMemo(() => {
    const suppliers = [...new Set(sampleData.map(item => item.supplier))];
    return suppliers.map(supplier => ({ value: supplier, label: supplier }));
  }, []);

  const serviceLevelOptions: MultiSelectOption[] = useMemo(() => {
    const levels = [...new Set(sampleData.map(item => item.serviceLevel))];
    return levels.map(level => ({ value: level, label: level }));
  }, []);

  const priorityOptions: MultiSelectOption[] = useMemo(() => {
    const priorities = [...new Set(sampleData.map(item => item.priority))];
    return priorities.map(priority => ({ value: priority, label: priority }));
  }, []);

  // Filter the data based on current filters
  const filteredData = useMemo(() => {
    return sampleData.filter(item => {
      // Search filter
      if (filters.search && !item.serverModel.toLowerCase().includes(filters.search.toLowerCase()) &&
          !item.supplier.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(item.status)) {
        return false;
      }

      // Priority filter
      if (filters.priority.length > 0 && !filters.priority.includes(item.priority)) {
        return false;
      }

      // Location filter
      if (filters.location.length > 0 && !filters.location.includes(item.location)) {
        return false;
      }

      // Supplier filter
      if (filters.supplier && item.supplier !== filters.supplier) {
        return false;
      }

      // Service level filter
      if (filters.serviceLevel.length > 0 && !filters.serviceLevel.includes(item.serviceLevel)) {
        return false;
      }

      // Date range filter (using orderDate)
      if (filters.dateRange.startDate || filters.dateRange.endDate) {
        const orderDate = new Date(item.orderDate);
        if (filters.dateRange.startDate && orderDate < filters.dateRange.startDate) return false;
        if (filters.dateRange.endDate && orderDate > filters.dateRange.endDate) return false;
      }

      // Active only filter
      if (filters.activeOnly && item.status !== 'active') {
        return false;
      }

      // Has warranty filter
      if (filters.hasWarranty && item.warrantyExpiry === 'N/A') {
        return false;
      }

      return true;
    });
  }, [filters]);

  const clearAllFilters = () => {
    setFilters({
      search: '',
      status: [],
      priority: [],
      location: [],
      supplier: null,
      serviceLevel: [],
      dateRange: { startDate: null, endDate: null },
      activeOnly: false,
      hasWarranty: false,
    });
  };

  const hasActiveFilters = filters.search || filters.status.length > 0 || filters.priority.length > 0 || 
    filters.location.length > 0 || filters.supplier || filters.serviceLevel.length > 0 ||
    filters.dateRange.startDate || filters.dateRange.endDate ||
    filters.activeOnly || filters.hasWarranty;

  return (
    <PageContainer>
      <div className="flex justify-between items-start mb-lg">
        <div>
          <h1 className="text-2xl font-semibold mb-sm text-neutral-800 dark:text-neutral-50">
            Tabular Data Components Demo
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-200 max-w-4xl">
            Interactive demonstration with live filtering using our new filter components. 
            Showing {filteredData.length} of {sampleData.length} servers.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 text-sm font-medium border rounded-md transition-colors
                     border-neutral-300 text-neutral-700 bg-neutral-50 
                     hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 
                     dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="mb-lg" padding="6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-3">
              Server Inventory Filters
            </h3>
          </div>

          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Search */}
            <Input
              label="Search Servers"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search by model or supplier..."
              className="col-span-full md:col-span-2"
            />

            {/* Status Multi-Select */}
            <DropdownMultiSelect
              label="Status"
              value={filters.status}
              onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
              options={statusOptions}
              groupBy
              showChips={false}
              maxSelections={5}
            />

            {/* Priority Filter */}
            <DropdownMultiSelect
              label="Priority"
              value={filters.priority}
              onChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}
              options={priorityOptions}
              showChips={false}
            />

            {/* Location Multi-Select */}
            <DropdownMultiSelect
              label="Locations"
              value={filters.location}
              onChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              options={locationOptions}
              groupBy
              showChips={false}
            />

            {/* Supplier Single Select */}
            <DropdownSelect
              label="Supplier"
              value={filters.supplier}
              onChange={(value) => setFilters(prev => ({ ...prev, supplier: value }))}
              options={supplierOptions}
              clearable
            />

            {/* Service Level Multi-Select */}
            <DropdownMultiSelect
              label="Service Level"
              value={filters.serviceLevel}
              onChange={(value) => setFilters(prev => ({ ...prev, serviceLevel: value }))}
              options={serviceLevelOptions}
              showChips={false}
            />

            {/* Order Date Range */}
            <DateRangeFilter
              label="Order Date Range"
              value={filters.dateRange}
              onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
              presets={DEFAULT_PRESETS}
              className="col-span-full md:col-span-2"
            />

            {/* Boolean Filters */}
            <div className="space-y-3">
              <CheckboxFilter
                label="Active Servers Only"
                value={filters.activeOnly}
                onChange={(value) => setFilters(prev => ({ ...prev, activeOnly: value }))}
                description="Show only servers with 'active' status"
              />

              <CheckboxFilter
                label="Has Valid Warranty"
                value={filters.hasWarranty}
                onChange={(value) => setFilters(prev => ({ ...prev, hasWarranty: value }))}
                description="Exclude servers without warranty"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <ClearAllFilters
                onClear={clearAllFilters}
                disabled={!hasActiveFilters}
                variant="button"
                className="w-full"
              />
            </div>
          </div>
        </Card>
      )}
      
      {/* Interactive TableView Demo */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-md text-neutral-800 dark:text-neutral-50">
          TableView with Live Filtering ({filteredData.length} servers)
        </h2>
        <Card
          subtitle="Try the filters above to see real-time data filtering in action. Switch between modes to see different views."
          className="mb-lg"
          padding="6"
        >
          <ServerInventoryTable height={600} data={filteredData} />
        </Card>
      </section>

      {/* Interactive ListView Demo */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-md text-neutral-800 dark:text-neutral-50">
          ListView with Live Filtering ({filteredData.length} servers)
        </h2>
        <Card
          subtitle="The ListView shows the same filtered data in card format. Perfect for mobile or when you need more readable layouts."
          className="mb-lg"
          padding="6"
        >
          <ServerInventoryList height={600} data={filteredData} />
        </Card>
      </section>

      {/* Features Overview */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-md text-neutral-800 dark:text-neutral-50">Filter Components Showcase</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-neutral-900 border-l-4 border-blue-700 dark:border-neutral-600 p-lg rounded-lg">
            <p className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Filter Components Used:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-100">
              <li><strong>DropdownMultiSelect:</strong> Status, locations, and service levels with grouping</li>
              <li><strong>DropdownSelect:</strong> Single supplier selection with search</li>
              <li><strong>DateRangeFilter:</strong> Order date ranges with preset options</li>
              <li><strong>CheckboxFilter:</strong> Boolean filters for active status and warranty</li>
              <li><strong>ClearAllFilters:</strong> One-click filter reset functionality</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-neutral-900 border-l-4 border-green-700 dark:border-neutral-600 p-lg rounded-lg">
            <p className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Real-time Filtering Features:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-100">
              <li>Live data filtering with instant results</li>
              <li>Grouped options for better organization</li>
              <li>Date presets for common time ranges</li>
              <li>Multi-select with chip visualization</li>
              <li>Boolean filters for quick toggles</li>
              <li>Basic text search functionality</li>
              <li>Responsive grid layout for all screen sizes</li>
            </ul>
          </div>
        </div>
      </section>
    </PageContainer>
  );
} 