import React, { useState, useMemo, useRef } from 'react';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { TableViewProps, SortConfig, FilterConfig } from './types';
import { filterData, sortData, paginateData, getVisibleColumns, getModeConstraints, openTableInNewTab } from './utils';
import { useTheme } from '../../app/contexts/ThemeContext';
import { colors } from '../foundations/tokens/colors';
import { getTypography } from '../foundations/tokens/typography';
import { TableToggle } from '../components/controls/TableToggle';

export const TableView = <T extends Record<string, unknown>>({
  data,
  columns,
  mode = 'deepDive',
  title,
  tableId,
  loading = false,
  emptyState = <p>No data available.</p>,
  onRowClick,
  onSort,
  filters = [],
  sortConfig,
  height = 400,
  width,
  showPagination,
  pageSize = 25,
  currentPage = 1,
  onPageChange,
  onModeChange,
  showModeToggle = true,
}: TableViewProps<T>) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Ensure initial page size matches one of the dropdown options
  const validPageSizes = [25, 50, 100];
  const initialPageSize = validPageSizes.includes(pageSize) ? pageSize : 25;
  
  // Local state management
  const [localMode, setLocalMode] = useState(mode);
  const [localSortConfig, setLocalSortConfig] = useState<SortConfig | null>(sortConfig || null);
  const [localFilters] = useState<FilterConfig[]>(filters);
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
  const [localPageSize, setLocalPageSize] = useState(initialPageSize);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  // Get mode constraints
  const currentMode = localMode;
  const constraints = getModeConstraints(currentMode);
  const visibleColumns = getVisibleColumns(columns, currentMode);
  
  // Calculate pagination - only for deep dive mode with explicit pagination
  const showActualPagination = showPagination !== undefined ? showPagination : constraints.showPagination;

  // Calculate total pages
  const filteredDataLength = useMemo(() => {
    return filterData(data, localFilters).length;
  }, [data, localFilters]);

  const totalPages = Math.ceil(filteredDataLength / localPageSize);

  // Process data
  const processedData = useMemo(() => {
    let result = data;
    
    // Apply filters
    result = filterData(result, localFilters);
    
    // Apply sorting
    result = sortData(result, localSortConfig);
    
    // Apply pagination only if explicitly using pagination (not for mode constraints)
    if (showActualPagination) {
      result = paginateData(result, localCurrentPage, localPageSize);
    }
    
    return result;
  }, [data, localFilters, localSortConfig, localCurrentPage, localPageSize, showActualPagination]);

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

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setLocalCurrentPage(page);
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setLocalPageSize(newPageSize);
    // Reset to first page when page size changes to avoid being on an invalid page
    setLocalCurrentPage(1);
    if (onPageChange) {
      onPageChange(1);
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (localCurrentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, localCurrentPage - 1);
      const end = Math.min(totalPages - 1, localCurrentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (localCurrentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
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
    zIndex: 10,
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
                    position: 'sticky',
                    top: 0,
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
                        zIndex: 11,
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
                      ? column.cell(row[column.accessorKey as keyof T], row, index)
                      : String(row[column.accessorKey as keyof T] || '')
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
            Showing {((localCurrentPage - 1) * localPageSize) + 1} - {Math.min(localCurrentPage * localPageSize, filteredDataLength)} of {filteredDataLength} rows
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Page size selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
              <label style={{ 
                color: isDark ? colors.neutral[300] : colors.neutral[600], 
                fontSize: '14px' 
              }}>
                Rows per page:
              </label>
              <select
                value={localPageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                style={{
                  backgroundColor: isDark ? colors.primary[700] : colors.neutral[50],
                  color: isDark ? colors.neutral[300] : colors.neutral[700],
                  border: `1px solid ${isDark ? colors.primary[600] : colors.neutral[300]}`,
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  minWidth: '60px',
                }}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* First page button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={localCurrentPage === 1}
              style={{
                padding: '4px 8px',
                backgroundColor: 'transparent',
                border: `1px solid ${isDark ? colors.primary[600] : colors.neutral[300]}`,
                borderRadius: '4px',
                cursor: localCurrentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: localCurrentPage === 1 ? 0.5 : 1,
                color: isDark ? colors.neutral[300] : colors.neutral[700],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                height: '32px',
              }}
              title="First page"
            >
              <ChevronDoubleLeftIcon style={{ width: '16px', height: '16px' }} />
            </button>

            {/* Previous page button */}
            <button
              onClick={() => handlePageChange(localCurrentPage - 1)}
              disabled={localCurrentPage === 1}
              style={{
                padding: '4px 8px',
                backgroundColor: 'transparent',
                border: `1px solid ${isDark ? colors.primary[600] : colors.neutral[300]}`,
                borderRadius: '4px',
                cursor: localCurrentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: localCurrentPage === 1 ? 0.5 : 1,
                color: isDark ? colors.neutral[300] : colors.neutral[700],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                height: '32px',
              }}
              title="Previous page"
            >
              <ChevronLeftIcon style={{ width: '16px', height: '16px' }} />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span style={{ 
                    color: isDark ? colors.neutral[400] : colors.neutral[600],
                    padding: '0 4px',
                  }}>
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: localCurrentPage === page 
                        ? (isDark ? colors.primary[600] : colors.primary[500])
                        : 'transparent',
                      border: `1px solid ${
                        localCurrentPage === page 
                          ? (isDark ? colors.primary[600] : colors.primary[500])
                          : (isDark ? colors.primary[600] : colors.neutral[300])
                      }`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: localCurrentPage === page
                        ? colors.neutral[50]
                        : (isDark ? colors.neutral[300] : colors.neutral[700]),
                      fontWeight: localCurrentPage === page ? '600' : '400',
                      minWidth: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}

            {/* Next page button */}
            <button
              onClick={() => handlePageChange(localCurrentPage + 1)}
              disabled={localCurrentPage === totalPages}
              style={{
                padding: '4px 8px',
                backgroundColor: 'transparent',
                border: `1px solid ${isDark ? colors.primary[600] : colors.neutral[300]}`,
                borderRadius: '4px',
                cursor: localCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: localCurrentPage === totalPages ? 0.5 : 1,
                color: isDark ? colors.neutral[300] : colors.neutral[700],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                height: '32px',
              }}
              title="Next page"
            >
              <ChevronRightIcon style={{ width: '16px', height: '16px' }} />
            </button>

            {/* Last page button */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={localCurrentPage === totalPages}
              style={{
                padding: '4px 8px',
                backgroundColor: 'transparent',
                border: `1px solid ${isDark ? colors.primary[600] : colors.neutral[300]}`,
                borderRadius: '4px',
                cursor: localCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: localCurrentPage === totalPages ? 0.5 : 1,
                color: isDark ? colors.neutral[300] : colors.neutral[700],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px',
                height: '32px',
              }}
              title="Last page"
            >
              <ChevronDoubleRightIcon style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableView;
