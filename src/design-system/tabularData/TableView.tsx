import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon, FunnelIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { TableViewProps, SortConfig, FilterConfig, ColumnDef } from './types';
import { filterData, sortData, paginateData, getVisibleColumns, getModeConstraints, openTableInNewTab } from './utils';
import { useTheme } from '../../app/contexts/ThemeContext';
import { colors } from '../foundations/tokens/colors';
import { getTypography } from '../foundations/tokens/typography';
import { TableToggle } from '../components/controls/TableToggle';

export const TableView = <T extends Record<string, any>>({
  data,
  columns,
  mode = 'deepDive',
  title,
  tableId,
  loading = false,
  emptyState = <p>No data available.</p>,
  onRowClick,
  onSort,
  onFilter,
  filters = [],
  sortConfig,
  height = 400,
  width,
  showPagination,
  pageSize = 20,
  currentPage = 1,
  totalPages,
  onPageChange,
  onModeChange,
  showModeToggle = true,
}: TableViewProps<T>) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Local state management
  const [localMode, setLocalMode] = useState(mode);
  const [localSortConfig, setLocalSortConfig] = useState<SortConfig | null>(sortConfig || null);
  const [localFilters, setLocalFilters] = useState<FilterConfig[]>(filters);
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  // Get mode constraints
  const currentMode = localMode;
  const constraints = getModeConstraints(currentMode);
  const visibleColumns = getVisibleColumns(columns, currentMode);
  
  // Calculate pagination - only for deep dive mode with explicit pagination
  const showActualPagination = showPagination !== undefined ? showPagination : constraints.showPagination;

  // Process data
  const processedData = useMemo(() => {
    let result = data;
    
    // Apply filters
    result = filterData(result, localFilters);
    
    // Apply sorting
    result = sortData(result, localSortConfig);
    
    // Apply pagination only if explicitly using pagination (not for mode constraints)
    if (showActualPagination && onPageChange) {
      result = paginateData(result, localCurrentPage, pageSize);
    }
    
    return result;
  }, [data, localFilters, localSortConfig, localCurrentPage, pageSize, showActualPagination, onPageChange]);

  // Handle mode change
  const handleModeChange = (newMode: 'summary' | 'drilldown' | 'deepDive') => {
    if (newMode === 'deepDive' && tableId) {
      // Don't change local mode for deep dive, just trigger external navigation
      return;
    }
    
    setLocalMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  // Handle deep dive external navigation
  const handleDeepDiveExternal = () => {
    if (tableId) {
      const tableData = {
        title: title || 'Table',
        data,
        columns,
        filters: localFilters,
        sortConfig: localSortConfig,
      };
      openTableInNewTab(tableId, tableData);
    }
  };

  // Handle sorting
  const handleSort = (columnId: string) => {
    const newSortConfig: SortConfig = {
      column: columnId,
      direction: localSortConfig?.column === columnId && localSortConfig.direction === 'asc' ? 'desc' : 'asc',
    };
    
    setLocalSortConfig(newSortConfig);
    if (onSort) {
      onSort(newSortConfig);
    }
  };

  // Column resizing
  const handleMouseDown = (e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    setResizingColumn(columnId);
    
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(100, e.clientX - tableRef.current!.getBoundingClientRect().left);
      setColumnWidths(prev => ({ ...prev, [columnId]: newWidth }));
    };
    
    const handleMouseUp = () => {
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Styling
  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height: currentMode === 'deepDive' ? '100%' : height,
    fontFamily: getTypography.fontFamily('body'),
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[50],
    border: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[100],
    borderBottom: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[50] : colors.neutral[900],
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[100],
    color: isDark ? colors.neutral[300] : colors.neutral[700],
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
    borderRight: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
    position: 'sticky',
    top: 0,
    cursor: 'pointer',
    userSelect: 'none',
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: `1px solid ${isDark ? colors.primary[700] : colors.neutral[200]}`,
    borderRight: `1px solid ${isDark ? colors.primary[700] : colors.neutral[200]}`,
    color: isDark ? colors.neutral[300] : colors.neutral[700],
  };

  const rowStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    cursor: onRowClick ? 'pointer' : 'default',
  };

  const rowHoverStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.primary[700] : colors.neutral[100],
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ color: isDark ? colors.neutral[400] : colors.neutral[600] }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {emptyState}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} ref={tableRef}>
      {/* Header */}
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        {showModeToggle && (
          <TableToggle
            mode={currentMode}
            onChange={handleModeChange}
            showDeepDive={!!tableId}
            onDeepDiveExternal={handleDeepDiveExternal}
          />
        )}
      </div>

      {/* Table Container */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <table style={tableStyle}>
          <thead>
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  style={{
                    ...thStyle,
                    width: columnWidths[column.id] || column.width || 'auto',
                    minWidth: column.minWidth || 100,
                    maxWidth: column.maxWidth || 'none',
                    position: 'relative',
                  }}
                  onClick={() => column.sortable !== false && handleSort(column.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{column.header}</span>
                    {column.sortable !== false && localSortConfig?.column === column.id && (
                      <span style={{ marginLeft: '8px' }}>
                        {localSortConfig.direction === 'asc' ? (
                          <ChevronUpIcon style={{ width: '14px', height: '14px' }} />
                        ) : (
                          <ChevronDownIcon style={{ width: '14px', height: '14px' }} />
                        )}
                      </span>
                    )}
                  </div>
                  
                  {/* Column resizer */}
                  {constraints.showColumnResize && column.resizable !== false && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        cursor: 'col-resize',
                        backgroundColor: resizingColumn === column.id ? colors.primary[500] : 'transparent',
                      }}
                      onMouseDown={(e) => handleMouseDown(e, column.id)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, index) => (
              <tr
                key={index}
                style={rowStyle}
                onMouseEnter={(e) => {
                  if (onRowClick) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = rowHoverStyle.backgroundColor!;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
                onClick={() => onRowClick && onRowClick(row, index)}
              >
                {visibleColumns.map((column) => (
                  <td key={column.id} style={tdStyle}>
                    {column.cell 
                      ? column.cell(row[column.accessorKey], row, index)
                      : String(row[column.accessorKey] || '')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showActualPagination && (
        <div
          style={{
            borderTop: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDark ? colors.primary[800] : colors.neutral[100],
          }}
        >
          <span style={{ color: isDark ? colors.neutral[300] : colors.neutral[600], fontSize: '14px' }}>
            Showing {processedData.length} of {data.length} rows
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Pagination controls would go here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableView;
