'use client';

import React, { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { TableView, ListView, ColumnDef, FilterConfig, SortConfig } from '../../../../design-system/tabularData';
import { useTheme } from '../../../contexts/ThemeContext';
import { colors } from '../../../../design-system/foundations/tokens/colors';
import { getTypography } from '../../../../design-system/foundations/tokens/typography';
import Badge, { BadgeVariant } from '../../../../design-system/components/feedback/Badge';

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
      // Map status values to badge variants
      const statusMap: Record<string, BadgeVariant> = {
        planned: 'planned',
        ordered: 'ordered',
        manufacturing: 'manufacturing',
        qualityTesting: 'qualityTesting',
        readyToShip: 'readyToShip',
        inTransit: 'inTransit',
        delivered: 'delivered',
        installing: 'installing',
        active: 'active',
        delayed: 'delayed',
      };
      
      // Map status values to proper display text
      const statusDisplayMap: Record<string, string> = {
        planned: 'Planned',
        ordered: 'Ordered',
        manufacturing: 'Manufacturing',
        qualityTesting: 'QA Testing',
        readyToShip: 'Ready to Ship',
        inTransit: 'In Transit',
        delivered: 'Delivered',
        installing: 'Installing',
        active: 'Active',
        delayed: 'Delayed',
      };
      
      const variant = statusMap[value as string] || 'standard';
      const displayText = statusDisplayMap[value as string] || String(value);
      
      return (
        <Badge variant={variant}>
          {displayText}
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
        Standard: 'ordered',
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
  const resolvedParams = use(params);
  const { tableId } = resolvedParams;
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [tableData, setTableData] = useState<TableDataState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('DeepDivePage useEffect - tableId:', tableId);
    
    try {
      // First, try to get data from sessionStorage
      const storedData = sessionStorage.getItem(`table-${tableId}`);
      console.log('Stored data found:', !!storedData);
      
      if (storedData) {
        console.log('Raw stored data:', storedData);
        const parsedData = JSON.parse(storedData) as TableDataState;
        console.log('Parsed data:', parsedData);
        
        // For server inventory data, recreate columns with Badge components
        if (tableId === 'server-inventory-interactive' || tableId === 'server-list-interactive') {
          parsedData.columns = createServerColumns();
          console.log('Recreated columns for server inventory');
        }
        
        setTableData(parsedData);
        setLoading(false);
        
        // Clean up the session data after a delay to avoid issues with React StrictMode
        setTimeout(() => {
          sessionStorage.removeItem(`table-${tableId}`);
          console.log(`Cleaned up sessionStorage for table-${tableId}`);
        }, 5000); // 5 second delay
      } else {
        console.log('No data found in sessionStorage for key:', `table-${tableId}`);
        
        // Fallback: check for sessionKey in URL params (backward compatibility)
        const sessionKey = searchParams.get('sessionKey');
        console.log('Session key from URL:', sessionKey);
        
        if (sessionKey) {
          const sessionData = sessionStorage.getItem(sessionKey);
          if (sessionData) {
            const parsedData = JSON.parse(sessionData) as TableDataState;
            
            // For server inventory data, recreate columns with Badge components
            if (tableId === 'server-inventory-interactive' || tableId === 'server-list-interactive') {
              parsedData.columns = createServerColumns();
            }
            
            setTableData(parsedData);
            setLoading(false);
            
            // Clean up the session data after a delay to avoid issues with React StrictMode
            setTimeout(() => {
              sessionStorage.removeItem(sessionKey);
            }, 5000); // 5 second delay
          } else {
            setError('Table data not found in session. The link may have expired.');
            setLoading(false);
          }
        } else {
          // In a real app, you would fetch data from your API using the tableId
          setError('No table data found. In a production app, this would fetch data from your API using the table ID.');
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error in DeepDivePage:', error);
      setError('Failed to load table data');
      setLoading(false);
    }
  }, [searchParams, tableId]);

  const containerStyle: React.CSSProperties = {
    height: 'calc(100vh - 80px)', // Use more of the viewport height
    display: 'flex',
    flexDirection: 'column',
    fontFamily: getTypography.fontFamily('body'),
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[50],
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '24px 32px', // Add top margin and horizontal margins
    boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
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
    padding: '0',
  };

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
        <h1 style={titleStyle}>{tableData.title || `Table ${tableId}`}</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Advanced filtering controls would go here */}
          <button
            style={{
              backgroundColor: isDark ? colors.primary[600] : colors.primary[500],
              color: colors.neutral[50],
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onClick={() => window.close()}
          >
            Close
          </button>
        </div>
      </div>

      {/* Full table container */}
      <div style={tableContainerStyle}>
        {tableData.renderItem || !tableData.columns ? (
          // ListView for list-style data or when no columns are defined
          <ListView
            data={tableData.data}
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
            data={tableData.data}
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