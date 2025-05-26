"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { tableTokens } from './tokens';

type DetailLevel = 'summary' | 'drilldown' | 'deepDive';
type HeightVariant = 'compact' | 'comfortable' | 'spacious' | 'auto' | 'fill';

// Export height variants for easy access
export const TABLE_HEIGHT_VARIANTS = tableTokens.heights;

export interface AGColumnDef<T = Record<string, unknown>> {
  field: string;
  title: string;
  statusAccessor?: (row: T) => 'success' | 'warning' | 'error';
  summaryPriority?: number; // Lower number = higher priority for summary mode
  cellRenderer?: (row: T) => React.ReactNode;
  width?: number;
  valueFormatter?: (value: unknown) => string;
  filter?: string; // For future filter implementation
  pinned?: 'left' | 'right';
}

export interface AGDataTableProps<T = Record<string, unknown>> {
  columns: AGColumnDef<T>[];
  data: T[];
  mode?: DetailLevel;
  maxSummaryColumns?: number;
  maxRows?: number;
  height?: number | string;
  heightVariant?: HeightVariant;
  width?: number | string;
  onRowClick?: (data: T) => void;
  suppressVerticalScroll?: boolean;
}

// Status indicator component
const StatusIndicator: React.FC<{
  status: 'success' | 'warning' | 'error';
  mode: DetailLevel;
  children: React.ReactNode;
}> = ({ status, mode, children }) => {
  const statusColors = {
    success: '#10B981',
    warning: '#F59E0B', 
    error: '#EF4444'
  };

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  };

  switch (mode) {
    case 'summary':
      return (
        <div style={{
          ...baseStyle,
          borderLeft: `4px solid ${statusColors[status]}`,
          paddingLeft: '8px'
        }}>
          {children}
        </div>
      );
      
    case 'drilldown':
      return (
        <div style={{
          ...baseStyle,
          borderLeft: `3px solid ${statusColors[status]}`,
          paddingLeft: '8px'
        }}>
          {children}
        </div>
      );
      
    case 'deepDive':
      return (
        <div style={{ ...baseStyle, gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: statusColors[status],
            flexShrink: 0
          }} />
          {children}
        </div>
      );
      
    default:
      return <div style={baseStyle}>{children}</div>;
  }
};

// Pagination component
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions: number[];
  isDark: boolean;
}> = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange, pageSizeOptions, isDark }) => {
  const buttonClass = isDark
    ? 'px-3 py-1 text-sm border border-primary-600 text-primary-300 hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed'
    : 'px-3 py-1 text-sm border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed';

  const selectClass = isDark
    ? 'px-2 py-1 text-sm bg-primary-600 border-primary-600 text-primary-300 rounded'
    : 'px-2 py-1 text-sm bg-white border-neutral-300 text-neutral-700 rounded';

  return (
    <div 
      className="flex items-center justify-between p-4 border-t"
      style={{
        backgroundColor: isDark ? tableTokens.footer.darkBg : tableTokens.footer.bg,
        borderTop: isDark ? tableTokens.footer.border.dark : tableTokens.footer.border.light,
        color: isDark ? tableTokens.footer.darkColor : tableTokens.footer.color,
        fontFamily: tableTokens.footer.fontFamily,
        fontSize: tableTokens.footer.fontSize,
        fontWeight: tableTokens.footer.fontWeight,
        lineHeight: tableTokens.footer.lineHeight,
      }}
    >
      <div className="flex items-center space-x-2">
        <span 
          className="text-sm"
          style={{
            color: isDark ? tableTokens.footer.darkColor : tableTokens.footer.color,
          }}
        >
          Show:
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className={selectClass}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span 
          className="text-sm"
          style={{
            color: isDark ? tableTokens.footer.darkColor : tableTokens.footer.color,
          }}
        >
          entries
        </span>
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={buttonClass}
        >
          Previous
        </button>
        
        <span 
          className="px-3 py-1 text-sm"
          style={{
            color: isDark ? tableTokens.footer.darkColor : tableTokens.footer.color,
          }}
        >
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={buttonClass}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export function AGDataTable<T = Record<string, unknown>>({
  columns,
  data,
  mode = 'summary',
  maxSummaryColumns = 5,
  maxRows,
  height,
  heightVariant = 'auto',
  width = '100%',
  onRowClick,
  suppressVerticalScroll = false
}: AGDataTableProps<T>) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = theme === 'dark';
  
  // Determine the actual height to use
  const actualHeight = useMemo(() => {
    // If explicit height is provided, use it
    if (height !== undefined) {
      return height;
    }
    
    // If heightVariant is specified, use token values
    if (heightVariant !== 'auto') {
      return tableTokens.heights[heightVariant];
    }
    
    // Auto mode: intelligent defaults based on table mode and data
    switch (mode) {
      case 'summary':
        // For summary mode, use auto height if no pagination, otherwise compact
        return maxRows ? tableTokens.heights.compact : tableTokens.heights.auto;
      case 'drilldown':
        return tableTokens.heights.comfortable;
      case 'deepDive':
        return tableTokens.heights.spacious;
      default:
        return tableTokens.heights.comfortable;
    }
  }, [height, heightVariant, mode, maxRows]);
  
  // Generate unique ID for this table instance - avoid hydration mismatch
  const [tableId, setTableId] = useState('');
  
  // State for dynamic styles to avoid hydration mismatch
  const [dynamicStyles, setDynamicStyles] = useState('');

  // Generate ID only on client side to avoid hydration mismatch
  useEffect(() => {
    setTableId(`datatable-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  // Generate styles on client side only to avoid hydration mismatch
  useEffect(() => {
    // Only generate styles if tableId is available
    if (!tableId) return;
    
    const styles = `
      .${tableId}-scrollable {
        scrollbar-width: thin;
        scrollbar-color: ${isDark ? tableTokens.scrollbar.dark.thumb : tableTokens.scrollbar.light.thumb} ${isDark ? tableTokens.scrollbar.dark.track : tableTokens.scrollbar.light.track};
      }
      
      .${tableId}-scrollable::-webkit-scrollbar {
        width: ${tableTokens.scrollbar.width} !important;
      }
      
      .${tableId}-scrollable::-webkit-scrollbar-track {
        background: ${isDark ? tableTokens.scrollbar.dark.track : tableTokens.scrollbar.light.track} !important;
        border-radius: ${tableTokens.scrollbar.borderRadius};
      }
      
      .${tableId}-scrollable::-webkit-scrollbar-thumb {
        background: ${isDark ? tableTokens.scrollbar.dark.thumb : tableTokens.scrollbar.light.thumb} !important;
        border-radius: ${tableTokens.scrollbar.borderRadius};
      }
      
      .${tableId}-scrollable::-webkit-scrollbar-thumb:hover {
        background: ${isDark ? tableTokens.scrollbar.dark.thumbHover : tableTokens.scrollbar.light.thumbHover} !important;
      }
      
      .${tableId}-scrollable::-webkit-scrollbar-corner {
        background: ${isDark ? tableTokens.scrollbar.dark.track : tableTokens.scrollbar.light.track} !important;
      }
    `;
    setDynamicStyles(styles);
  }, [tableId, isDark]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => {
    if (maxRows) return maxRows;
    return mode === 'deepDive' ? 50 : 25;
  });

  // Filter and sort columns based on mode
  const visibleColumns = useMemo(() => {
    let cols = [...columns];
    
    if (mode === 'summary') {
      cols = columns
        .sort((a, b) => (a.summaryPriority || 999) - (b.summaryPriority || 999))
        .slice(0, maxSummaryColumns);
    }
    
    return cols;
  }, [columns, mode, maxSummaryColumns]);

  // Pagination logic
  const { paginatedData, totalPages } = useMemo(() => {
    const usePagination = mode !== 'summary' || !!maxRows;
    
    if (!usePagination) {
      return { paginatedData: data, totalPages: 1 };
    }
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / pageSize);
    
    return { paginatedData, totalPages };
  }, [data, currentPage, pageSize, mode, maxRows]);

  // Page size options
  const pageSizeOptions = maxRows 
    ? [maxRows, maxRows * 2, maxRows * 4] 
    : (mode === 'deepDive' ? [50, 100, 200] : [25, 50, 100]);

  // Theme-aware styles using design tokens - applied only when mounted
  const activeTableClasses = isDark
    ? 'bg-primary-700 border-primary-700'
    : 'bg-white border-neutral-200';
    
  const initialTableClasses = 'bg-transparent border-transparent';

  const currentTableClasses = isMounted ? activeTableClasses : initialTableClasses;

  const headerClasses = isDark
    ? 'bg-primary-600 text-primary-100 border-primary-900'
    : 'bg-white text-neutral-900 border-neutral-300';
    
  const rowClasses = isDark
    ? 'bg-primary-700 border-primary-500 hover:bg-primary-500'
    : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100';
    
  const cellClasses = isDark
    ? 'text-primary-100'
    : 'text-neutral-700';

  // CSS custom properties for dark mode - Updated to use tableTokens
  const darkModeStyles = isDark ? {
    '--header-bg-dark': tableTokens.header.darkBg,
    '--header-color-dark': tableTokens.header.darkColor,
    '--row-bg-dark': '#10273b', // primary-700
    '--row-color-dark': '#f0f4f8', // primary-50
  } : {};

  const handleRowClick = (rowData: T) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  return (
    <>
      {/* Custom scrollbar styles - only rendered on client to avoid hydration mismatch */}
      {isMounted && dynamicStyles && <style>{dynamicStyles}</style>}
      
      <div 
        style={{ 
          height: typeof actualHeight === 'number' ? `${actualHeight}px` : actualHeight,
          width: typeof width === 'number' ? `${width}px` : width,
          ...darkModeStyles,
          opacity: isMounted ? 1 : 0, 
          transition: 'opacity 0.15s ease-in-out'
        }}
      >
        <div 
          className={`border rounded-lg overflow-hidden ${currentTableClasses}`}
          key={`datatable-${theme}-${isMounted}`}
          style={{ 
            border: isMounted ? (isDark ? tableTokens.container.border.dark : tableTokens.container.border.light) : '1px solid transparent',
            borderRadius: tableTokens.container.borderRadius,
            boxShadow: isMounted ? tableTokens.container.shadow : 'none',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {isMounted && (
            <>
              <div 
                className={`${suppressVerticalScroll ? 'overflow-hidden' : 'overflow-auto'}${tableId ? ` ${tableId}-scrollable` : ''}`}
                style={{ 
                  flex: 1,
                  minHeight: 0
                }}
              >
                <table className="w-full" style={{ width: '100%', tableLayout: 'fixed' }}>
                  {/* Table Header */}
                  <thead>
                    <tr 
                      className={headerClasses}
                      style={{
                        backgroundColor: isDark ? 'var(--header-bg-dark)' : tableTokens.header.bg,
                        color: isDark ? 'var(--header-color-dark)' : tableTokens.header.color,
                        height: tableTokens.header.height,
                        borderBottom: isDark ? tableTokens.header.border.dark : tableTokens.header.border.light
                      }}
                    >
                      {visibleColumns.map((column) => (
                        <th
                          key={column.field}
                          className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                          style={{
                            width: column.width ? `${column.width}px` : 'auto',
                            fontFamily: tableTokens.header.fontFamily,
                            fontSize: tableTokens.header.fontSize,
                            fontWeight: tableTokens.header.fontWeight,
                            lineHeight: tableTokens.header.lineHeight,
                            letterSpacing: tableTokens.header.letterSpacing
                          }}
                        >
                          {column.title}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {paginatedData.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`cursor-pointer transition-colors ${rowClasses} ${onRowClick ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={() => handleRowClick(row)}
                        style={{
                          height: tableTokens.row.height,
                          borderBottom: isDark ? tableTokens.row.borderBottom.dark : tableTokens.row.borderBottom.light,
                          backgroundColor: isDark ? 'var(--row-bg-dark)' : (rowIndex % 2 === 1 ? tableTokens.row.zebraBg : 'transparent')
                        }}
                      >
                        {visibleColumns.map((column) => {
                          const value = (row as Record<string, unknown>)[column.field];
                          const formattedValue = column.valueFormatter ? column.valueFormatter(value) : String(value ?? '');
                          const status = column.statusAccessor ? column.statusAccessor(row) : null;
                          
                          let cellContent: React.ReactNode = formattedValue;
                          
                          if (column.cellRenderer) {
                            cellContent = column.cellRenderer(row);
                          } else if (status) {
                            cellContent = (
                              <StatusIndicator status={status} mode={mode}>
                                {formattedValue}
                              </StatusIndicator>
                            );
                          }

                          return (
                            <td
                              key={column.field}
                              className={`px-4 py-3 text-sm ${cellClasses}`}
                              style={{
                                width: column.width ? `${column.width}px` : 'auto',
                                fontFamily: tableTokens.row.fontFamily,
                                fontSize: tableTokens.row.fontSize,
                                fontWeight: tableTokens.row.fontWeight,
                                lineHeight: tableTokens.row.lineHeight,
                                color: isDark ? 'var(--row-color-dark)' : tableTokens.row.color
                              }}
                            >
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {(mode !== 'summary' || !!maxRows) && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  pageSize={pageSize}
                  onPageSizeChange={setPageSize}
                  pageSizeOptions={pageSizeOptions}
                  isDark={isDark}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

// For backward compatibility
export const DataTable = AGDataTable;

// Define a stronger type for our example data
interface RackData {
  rackId: string;
  datacenter: string;
  utilization: number;
  location: string;
  vendor: string;
  overallStatus: 'success' | 'warning' | 'error';
  installDate: string;
  powerUsage: number;
  temperature: number;
}

// Example usage for rack logistics:
export const RackLogisticsTable = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const rackColumns: AGColumnDef<RackData>[] = [
    {
      field: 'rackId',
      title: 'Rack ID',
      summaryPriority: 1,
      statusAccessor: (row) => row.overallStatus,
    },
    {
      field: 'datacenter',
      title: 'Data Center',
      summaryPriority: 2,
    },
    {
      field: 'utilization',
      title: 'Utilization %',
      summaryPriority: 3,
      statusAccessor: (row) => 
        row.utilization > 90 ? 'error' : 
        row.utilization > 75 ? 'warning' : 'success',
      valueFormatter: (value) => `${value}%`,
    },
    {
      field: 'location',
      title: 'Location',
      summaryPriority: 4,
    },
    {
      field: 'vendor',
      title: 'Vendor',
      summaryPriority: 5,
    },
    // Additional columns for drilldown/deepDive
    {
      field: 'installDate',
      title: 'Install Date',
      valueFormatter: (value) => {
        try {
          return new Date(value as string).toLocaleDateString();
        } catch {
          return String(value ?? '');
        }
      },
    },
    {
      field: 'powerUsage',
      title: 'Power Usage (kW)',
    },
    {
      field: 'temperature',
      title: 'Temperature (°C)',
      statusAccessor: (row) =>
        row.temperature > 35 ? 'error' :
        row.temperature > 30 ? 'warning' : 'success',
    },
  ];

  const [mode, setMode] = React.useState<DetailLevel>('summary');
  const [rackData] = React.useState<RackData[]>([
    {
      rackId: 'R-NYC-001',
      datacenter: 'NYC Primary',
      utilization: 85,
      location: 'Floor 2, Aisle A',
      vendor: 'Dell',
      overallStatus: 'warning',
      installDate: '2023-01-15',
      powerUsage: 12.5,
      temperature: 28,
    },
    {
      rackId: 'R-NYC-002',
      datacenter: 'NYC Primary',
      utilization: 92,
      location: 'Floor 2, Aisle B',
      vendor: 'HP',
      overallStatus: 'error',
      installDate: '2023-02-20',
      powerUsage: 15.2,
      temperature: 32,
    },
    {
      rackId: 'R-LA-001',
      datacenter: 'LA Secondary',
      utilization: 65,
      location: 'Floor 1, Aisle A',
      vendor: 'Dell',
      overallStatus: 'success',
      installDate: '2023-03-10',
      powerUsage: 10.8,
      temperature: 26,
    },
  ]);

  const buttonStyle = (isActive: boolean) => ({
    marginRight: '8px',
    padding: '8px 16px',
    backgroundColor: isActive ? (isDark ? '#627d98' : '#3B82F6') : (isDark ? '#525252' : '#E5E7EB'),
    color: isActive ? 'white' : (isDark ? '#d4d4d4' : 'black'),
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  });

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => setMode('summary')}
          style={buttonStyle(mode === 'summary')}
        >
          Summary
        </button>
        <button 
          onClick={() => setMode('drilldown')}
          style={buttonStyle(mode === 'drilldown')}
        >
          Drill Down
        </button>
        <button 
          onClick={() => setMode('deepDive')}
          style={buttonStyle(mode === 'deepDive')}
        >
          Deep Dive
        </button>
      </div>

      <AGDataTable
        columns={rackColumns}
        data={rackData}
        mode={mode}
        height={mode === 'summary' ? 'auto' : 500}
        onRowClick={(data) => console.log('Clicked rack:', data)}
      />
    </div>
  );
};