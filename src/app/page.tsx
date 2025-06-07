'use client';

import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/design-system/layout/PageContainer';
import Card from '@/design-system/layout/Card';
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { colors } from '@/design-system/foundations/tokens/colors';
import { getChartColors } from '@/design-system/foundations/tokens/charts';

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

export default function HomePage() {
  const [showFilters, setShowFilters] = useState(true); // Changed to true for expanded by default
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

  // Sample options for the filters
  const statusOptions: MultiSelectOption[] = [
    { value: 'forecast', label: 'Forecast', group: 'Planning' },
    { value: 'purchaseReq', label: 'Purchase Req.', group: 'Planning' },
    { value: 'integrator', label: 'Integrator', group: 'Production' },
    { value: 'sop', label: 'S&OP', group: 'Production' },
    { value: 'purchaseOrder', label: 'Purchase Order', group: 'Shipping' },
    { value: 'networkBuild', label: 'Network Build', group: 'Shipping' },
    { value: 'logicalBuild', label: 'Logical Build', group: 'Operations' },
    { value: 'completed', label: 'Completed', group: 'Operations' },
  ];

  const locationOptions: MultiSelectOption[] = [
    { value: 'NA-EAST-001', label: 'NA-EAST-001', group: 'East' },
    { value: 'NA-EAST-002', label: 'NA-EAST-002', group: 'East' },
    { value: 'NA-WEST-001', label: 'NA-WEST-001', group: 'West' },
    { value: 'NA-WEST-002', label: 'NA-WEST-002', group: 'West' },
    { value: 'NA-CENTRAL-001', label: 'NA-CENTRAL-001', group: 'Central' },
    { value: 'NA-SOUTH-001', label: 'NA-SOUTH-001', group: 'South' },
  ];

  const supplierOptions: SelectOption[] = [
    { value: 'Dell Technologies', label: 'Dell Technologies' },
    { value: 'HPE', label: 'HPE' },
    { value: 'Cisco Systems', label: 'Cisco Systems' },
    { value: 'Super Micro Computer', label: 'Super Micro Computer' },
    { value: 'IBM', label: 'IBM' },
    { value: 'Lenovo', label: 'Lenovo' },
  ];

  const serviceLevelOptions: MultiSelectOption[] = [
    { value: 'Basic', label: 'Basic' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Enterprise', label: 'Enterprise' },
  ];

  const priorityOptions: MultiSelectOption[] = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'standard', label: 'Standard' },
  ];

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

      {/* Stacked Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-6">
          <Card padding="6">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-50 mb-4">
              Substation Quantity Summary
            </h3>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={[
                  { name: 'Q1 2024', late: 4, atRisk: 0, onTrack: 12 },
                  { name: 'Q2 2024', late: 3, atRisk: 0, onTrack: 15 },
                  { name: 'Q3 2024', late: 5, atRisk: 0, onTrack: 18 },
                  { name: 'Q4 2024', late: 2, atRisk: 0, onTrack: 20 },
                  { name: 'Q1 2025', late: 6, atRisk: 0, onTrack: 14 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral[200]} />
                <XAxis 
                  dataKey="name" 
                  stroke={colors.neutral[500]}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke={colors.neutral[500]}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: colors.neutral[800],
                    color: colors.neutral[50],
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                />
                <Legend 
                  formatter={(value: string) => {
                    const legendMap: Record<string, string> = {
                      late: 'Late',
                      atRisk: 'At Risk',
                      onTrack: 'On Track'
                    };
                    return legendMap[value] || value;
                  }}
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px',
                    color: colors.neutral[900]
                  }}
                />
                <Bar dataKey="late" stackId="a" fill={colors.error[300]} fillOpacity={0.4} />
                <Bar dataKey="atRisk" stackId="a" fill={colors.orange[500]} />
                <Bar dataKey="onTrack" stackId="a" fill={colors.teal[500]} fillOpacity={0.4} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}