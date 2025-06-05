'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { TableView, ListView, ColumnDef, FilterConfig, SortConfig } from '@/design-system/tabularData';
import { useTheme } from '@/app/contexts/ThemeContext';
import { colors } from '@/design-system/foundations/tokens/colors';
import { getTypography } from '@/design-system/foundations/tokens/typography';
import { shadows } from '@/design-system/foundations/tokens/shadows';
import Badge, { BadgeVariant } from '@/design-system/components/feedback/Badge';
import Button from '@/design-system/components/primitives/Button';
import Input from '@/design-system/components/forms/Input';
import { 
  DropdownSelect, 
  DropdownMultiSelect,
  CheckboxFilter,
  ClearAllFilters,
  SelectOption,
  MultiSelectOption,
  DateRange
} from '@/design-system/components/filters';

interface DeepDivePageProps {
  params: Promise<{
    tableId: string;
  }>;
}

interface TableDataState {
  title: string;
  data: Record<string, unknown>[];
  columns?: ColumnDef<Record<string, unknown>>[];
  renderItem?: (item: Record<string, unknown>, index: number) => React.ReactNode;
  filters?: FilterConfig[];
  sortConfig?: SortConfig | null;
}

interface DeepDiveFilters {
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

// Function to recreate columns with Badge components for server data
const createServerColumns = (): ColumnDef<Record<string, unknown>>[] => [
  {
    id: 'id',
    header: 'Server ID',
    accessorKey: 'id',
    width: 120,
    sortable: true,
  },
  {
    id: 'serverModel',
    header: 'Server Model',
    accessorKey: 'serverModel',
    width: 200,
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    width: 150,
    sortable: true,
    cell: (value) => {
      // Map status values to new badge variants and display text
      const statusMapping: Record<string, { variant: BadgeVariant; display: string }> = {
        planned: { variant: 'forecast', display: 'Forecast' },
        ordered: { variant: 'purchaseReq', display: 'Purchase Req.' },
        manufacturing: { variant: 'integrator', display: 'Integrator' },
        qualityTesting: { variant: 'sop', display: 'S&OP' },
        readyToShip: { variant: 'purchaseOrder', display: 'Purchase Order' },
        inTransit: { variant: 'networkBuild', display: 'Network Build' },
        delivered: { variant: 'logicalBuild', display: 'Logical Build' },
        installing: { variant: 'completed', display: 'Completed' },
        active: { variant: 'completed', display: 'Completed' },
        delayed: { variant: 'unassigned2', display: 'Unassigned 2' },
      };
      
      const mapping = statusMapping[value as string];
      if (!mapping) {
        return <Badge variant="unassigned1">{String(value)}</Badge>;
      }
      
      return (
        <Badge variant={mapping.variant}>
          {mapping.display}
        </Badge>
      );
    },
  },
  {
    id: 'location',
    header: 'Location',
    accessorKey: 'location',
    width: 180,
    sortable: true,
  },
  {
    id: 'orderDate',
    header: 'Order Date',
    accessorKey: 'orderDate',
    width: 120,
    sortable: true,
  },
  {
    id: 'expectedDelivery',
    header: 'Expected Delivery',
    accessorKey: 'expectedDelivery',
    width: 140,
    sortable: true,
  },
  {
    id: 'priority',
    header: 'Priority',
    accessorKey: 'priority',
    width: 100,
    sortable: true,
    cell: (value) => {
      // Map priority values to badge variants
      const priorityMap: Record<string, BadgeVariant> = {
        critical: 'critical',
        high: 'highPriority',
        standard: 'standard',
      };
      
      const variant = priorityMap[value as string] || 'standard';
      
      return (
        <Badge variant={variant}>
          {String(value)}
        </Badge>
      );
    },
  },
  {
    id: 'quantity',
    header: 'Quantity',
    accessorKey: 'quantity',
    width: 100,
    sortable: true,
  },
  {
    id: 'cost',
    header: 'Cost',
    accessorKey: 'cost',
    width: 120,
    sortable: true,
    cell: (value) => `$${Number(value).toLocaleString()}`,
  },
  {
    id: 'supplier',
    header: 'Supplier',
    accessorKey: 'supplier',
    width: 160,
    sortable: true,
  },
  {
    id: 'warrantyExpiry',
    header: 'Warranty Expiry',
    accessorKey: 'warrantyExpiry',
    width: 130,
    sortable: true,
  },
  {
    id: 'cpuCores',
    header: 'CPU Cores',
    accessorKey: 'cpuCores',
    width: 100,
    sortable: true,
    cell: (value) => `${value} cores`,
  },
  {
    id: 'ramSize',
    header: 'RAM Size',
    accessorKey: 'ramSize',
    width: 100,
    sortable: true,
  },
  {
    id: 'storageSize',
    header: 'Storage Size',
    accessorKey: 'storageSize',
    width: 120,
    sortable: true,
  },
  {
    id: 'powerConsumption',
    header: 'Power (W)',
    accessorKey: 'powerConsumption',
    width: 100,
    sortable: true,
    cell: (value) => `${value}W`,
  },
  {
    id: 'rackUnit',
    header: 'Rack Unit',
    accessorKey: 'rackUnit',
    width: 110,
    sortable: true,
  },
  {
    id: 'serviceLevel',
    header: 'Service Level',
    accessorKey: 'serviceLevel',
    width: 120,
    sortable: true,
    cell: (value) => {
      // Map service level to badge variants
      const serviceLevelMap: Record<string, BadgeVariant> = {
        Basic: 'standard',
        Standard: 'purchaseReq',
        Premium: 'highPriority',
        Enterprise: 'critical',
      };
      
      const variant = serviceLevelMap[value as string] || 'standard';
      
      return (
        <Badge variant={variant}>
          {String(value)}
        </Badge>
      );
    },
  },
  {
    id: 'lastMaintenance',
    header: 'Last Maintenance',
    accessorKey: 'lastMaintenance',
    width: 140,
    sortable: true,
  },
  {
    id: 'nextMaintenance',
    header: 'Next Maintenance',
    accessorKey: 'nextMaintenance',
    width: 140,
    sortable: true,
  },
];

export default function DeepDivePage({ params }: DeepDivePageProps) {
  const [tableId, setTableId] = useState<string>('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [tableData, setTableData] = useState<TableDataState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state for server inventory data
  const [filters, setFilters] = useState<DeepDiveFilters>({
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

  // Resolve params Promise
  useEffect(() => {
    params.then(resolvedParams => {
      setTableId(resolvedParams.tableId);
    });
  }, [params]);

  useEffect(() => {
    if (!tableId) return;
    
    try {
      // First, try to get data from sessionStorage
      const storedData = sessionStorage.getItem(`table-${tableId}`);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData) as TableDataState;
        
        // For server inventory data, recreate columns with Badge components
        if (tableId === 'server-inventory-interactive' || tableId === 'server-list-interactive') {
          parsedData.columns = createServerColumns();
        }
        
        setTableData(parsedData);
        setLoading(false);
        
        // Clean up the session data after a delay to avoid issues with React StrictMode
        setTimeout(() => {
          sessionStorage.removeItem(`table-${tableId}`);
        }, 5000); // 5 second delay
      } else {
        // In a real app, you would fetch data from your API using the tableId
        setError('No table data found. In a production app, this would fetch data from your API using the table ID.');
        setLoading(false);
      }
    } catch {
      setError('Failed to load table data');
      setLoading(false);
    }
  }, [tableId]);

  // Extract unique values for dropdown options from table data
  const statusOptions: MultiSelectOption[] = useMemo(() => {
    if (!tableData?.data) return [];
    const statuses = [...new Set(tableData.data.map(item => item.status as string).filter(Boolean))];
    return statuses.map(status => ({ 
      value: status, 
      label: status.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      group: status.includes('planned') || status.includes('ordered') ? 'Planning' : 
             status.includes('manufacturing') || status.includes('quality') ? 'Production' :
             status.includes('transit') || status.includes('delivered') ? 'Shipping' : 'Operations'
    }));
  }, [tableData?.data]);

  const locationOptions: MultiSelectOption[] = useMemo(() => {
    if (!tableData?.data) return [];
    const locations = [...new Set(tableData.data.map(item => item.location as string).filter(Boolean))];
    return locations.map(location => ({ 
      value: location, 
      label: location,
      group: location.startsWith('NA-EAST') ? 'East' :
             location.startsWith('NA-WEST') ? 'West' :
             location.startsWith('NA-CENTRAL') ? 'Central' : 'South'
    }));
  }, [tableData?.data]);

  const supplierOptions: SelectOption[] = useMemo(() => {
    if (!tableData?.data) return [];
    const suppliers = [...new Set(tableData.data.map(item => item.supplier as string).filter(Boolean))];
    return suppliers.map(supplier => ({ value: supplier, label: supplier }));
  }, [tableData?.data]);

  const serviceLevelOptions: MultiSelectOption[] = useMemo(() => {
    if (!tableData?.data) return [];
    const levels = [...new Set(tableData.data.map(item => item.serviceLevel as string).filter(Boolean))];
    return levels.map(level => ({ value: level, label: level }));
  }, [tableData?.data]);

  const priorityOptions: MultiSelectOption[] = useMemo(() => {
    if (!tableData?.data) return [];
    const priorities = [...new Set(tableData.data.map(item => item.priority as string).filter(Boolean))];
    return priorities.map(priority => ({ value: priority, label: priority }));
  }, [tableData?.data]);

  // Filter the data based on current filters
  const filteredData = useMemo(() => {
    if (!tableData?.data) return [];
    
    return tableData.data.filter(item => {
      // Search filter
      if (filters.search && 
          !(item.serverModel as string)?.toLowerCase().includes(filters.search.toLowerCase()) &&
          !(item.supplier as string)?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(item.status as string)) {
        return false;
      }

      // Priority filter
      if (filters.priority.length > 0 && !filters.priority.includes(item.priority as string)) {
        return false;
      }

      // Location filter
      if (filters.location.length > 0 && !filters.location.includes(item.location as string)) {
        return false;
      }

      // Supplier filter
      if (filters.supplier && item.supplier !== filters.supplier) {
        return false;
      }

      // Service level filter
      if (filters.serviceLevel.length > 0 && !filters.serviceLevel.includes(item.serviceLevel as string)) {
        return false;
      }

      // Date range filter (using orderDate)
      if (filters.dateRange.startDate || filters.dateRange.endDate) {
        const orderDate = new Date(item.orderDate as string);
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
  }, [tableData?.data, filters]);

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

  const containerStyle: React.CSSProperties = {
    height: 'calc(100vh - 80px)', // Use more of the viewport height
    display: 'flex',
    flexDirection: 'column',
    fontFamily: getTypography.fontFamily('body'),
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[50],
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '24px 32px', // Add top margin and horizontal margins
    boxShadow: isDark ? shadows.xl : shadows.md,
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[100],
    borderBottom: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[50] : colors.neutral[900],
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
  };

  const tableContainerStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    padding: '0'
  };

  const isServerData = tableId === 'server-inventory-interactive' || tableId === 'server-list-interactive';

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ color: isDark ? colors.neutral[300] : colors.neutral[600], fontSize: '18px' }}>
            Loading table data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Deep Dive Table View</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px', padding: '24px' }}>
            <p style={{ color: isDark ? colors.neutral[300] : colors.neutral[600], fontSize: '16px', marginBottom: '16px' }}>
              {error}
            </p>
            <p style={{ color: isDark ? colors.neutral[400] : colors.neutral[500], fontSize: '14px' }}>
              Table ID: {tableId}
            </p>
            <p style={{ color: isDark ? colors.neutral[400] : colors.neutral[500], fontSize: '14px', marginTop: '16px' }}>
              To implement this fully, connect your GraphQL/SQL data source to fetch table data by ID.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!tableData) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ color: isDark ? colors.neutral[300] : colors.neutral[600] }}>No table data available</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header with title and advanced filtering */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          {tableData.title || `Table ${tableId}`}
          {isServerData && filteredData.length !== tableData.data.length && (
            <span style={{ fontSize: '16px', fontWeight: '400', marginLeft: '16px', opacity: 0.7 }}>
              ({filteredData.length} of {tableData.data.length} items)
            </span>
          )}
        </h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isServerData && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.close()}
          >
            Close
          </Button>
        </div>
      </div>

      {/* Filter Panel for Server Data */}
      {isServerData && showFilters && (
        <div style={{ 
          padding: '16px 24px', 
          borderBottom: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
          backgroundColor: isDark ? colors.primary[900] : colors.neutral[50],
          position: 'relative',
          zIndex: 1000
        }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              margin: '0 0 12px 0',
              color: isDark ? colors.neutral[50] : colors.neutral[900]
            }}>
              Advanced Filters
            </h3>
          </div>

          {/* Filter Controls Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {/* Search */}
            <Input
              label="Search Servers"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search by model or supplier..."
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
          </div>

          {/* Boolean Filters and Clear */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '16px',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <CheckboxFilter
                label="Active Servers Only"
                value={filters.activeOnly}
                onChange={(value) => setFilters(prev => ({ ...prev, activeOnly: value }))}
                description="Show only servers with 'active' status"
                size="sm"
              />

              <CheckboxFilter
                label="Has Valid Warranty"
                value={filters.hasWarranty}
                onChange={(value) => setFilters(prev => ({ ...prev, hasWarranty: value }))}
                description="Exclude servers without warranty"
                size="sm"
              />
            </div>

            <ClearAllFilters
              onClear={clearAllFilters}
              disabled={!hasActiveFilters}
              variant="button"
            />
          </div>
        </div>
      )}

      {/* Full table container */}
      <div style={tableContainerStyle}>
        {tableData.renderItem || !tableData.columns ? (
          // ListView for list-style data or when no columns are defined
          <ListView
            data={isServerData ? filteredData : tableData.data}
            mode="deepDive"
            renderItem={tableData.renderItem || ((item: Record<string, unknown>) => (
              <div style={{ padding: '8px' }}>
                <pre style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  color: isDark ? colors.neutral[300] : colors.neutral[700],
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            ))}
            height={undefined} // Let it take full height
            showModeToggle={false} // No mode toggle needed on Deep Dive page
          />
        ) : (
          // TableView for tabular data
          <TableView
            data={isServerData ? filteredData : tableData.data}
            columns={tableData.columns}
            mode="deepDive"
            filters={tableData.filters}
            sortConfig={tableData.sortConfig}
            height={undefined} // Let it take full height
            showModeToggle={false} // No mode toggle needed on Deep Dive page
          />
        )}
      </div>
    </div>
  );
} 