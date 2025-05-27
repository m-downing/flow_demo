"use client";

import React, { useMemo, useState, useCallback, useRef } from 'react';
import { useTheme } from '../../app/contexts/ThemeContext';
import { tableTokens } from './tokens';

type DetailLevel = 'summary' | 'drilldown' | 'deepDive';
type HeightVariant = 'compact' | 'comfortable' | 'spacious' | 'auto' | 'fill';
type SortDirection = 'asc' | 'desc' | null;

export interface ReactColumnDef<T = Record<string, unknown>> {
  field: string;
  title: string;
  statusAccessor?: (row: T) => 'success' | 'warning' | 'error';
  summaryPriority?: number; // Lower number = higher priority for summary mode
  cellRenderer?: (value: unknown, row: T, index: number) => React.ReactNode;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  valueFormatter?: (value: unknown) => string;
  sortable?: boolean;
  resizable?: boolean;
  pinned?: 'left' | 'right';
  hide?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface ReactTableProps<T = Record<string, unknown>> {
  columns: ReactColumnDef<T>[];
  data: T[];
  mode?: DetailLevel;
  maxSummaryColumns?: number;
  maxRows?: number;
  height?: number | string;
  heightVariant?: HeightVariant;
  width?: number | string;
  onRowClick?: (data: T, index: number) => void;
  pagination?: boolean;
  paginationPageSize?: number;
  rowSelection?: 'single' | 'multiple';
  selectedRows?: T[];
  onSelectionChanged?: (selectedRows: T[]) => void;
  sortable?: boolean;
  resizable?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

interface SortState {
  field: string;
  direction: SortDirection;
}

// Status indicator component
const StatusIndicator: React.FC<{
  status: 'success' | 'warning' | 'error';
  mode: DetailLevel;
  children: React.ReactNode;
}> = ({ status, mode, children }) => {
  const statusColors: Record<'success' | 'warning' | 'error', string> = {
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
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isDark: boolean;
}> = ({ currentPage, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange, isDark }) => {
  const pageSizeOptions = [10, 25, 50, 100];
  
  const buttonStyle = (isActive: boolean, disabled: boolean = false): React.CSSProperties => ({
    padding: '6px 12px',
    border: isDark ? tableTokens.header.darkBorder : tableTokens.header.border.light,
    backgroundColor: isActive 
      ? (isDark ? tableTokens.header.darkBg : tableTokens.header.bg)
      : 'transparent',
    color: isDark ? tableTokens.header.darkColor : tableTokens.header.color,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontSize: tableTokens.header.fontSize,
    fontFamily: tableTokens.header.fontFamily,
    borderRadius: '4px',
    margin: '0 2px',
  });

  const selectStyle: React.CSSProperties = {
    padding: '4px 8px',
    border: isDark ? tableTokens.header.darkBorder : tableTokens.header.border.light,
    backgroundColor: isDark ? tableTokens.header.darkBg : tableTokens.header.bg,
    color: isDark ? tableTokens.header.darkColor : tableTokens.header.color,
    fontSize: tableTokens.header.fontSize,
    fontFamily: tableTokens.header.fontFamily,
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: isDark ? tableTokens.footer.darkBg : tableTokens.footer.bg,
      borderTop: isDark ? tableTokens.footer.darkBorder : tableTokens.footer.border.light,
      fontSize: tableTokens.footer.fontSize,
      color: isDark ? tableTokens.footer.darkColor : tableTokens.footer.color,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={selectStyle}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span>entries</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>
          Showing {startItem} to {endItem} of {totalItems} entries
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={buttonStyle(false, currentPage === 1)}
        >
          Previous
        </button>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={buttonStyle(currentPage === pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={buttonStyle(false, currentPage === totalPages)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export function ReactTable<T = Record<string, unknown>>({
  columns,
  data,
  mode = 'summary',
  maxSummaryColumns = 5,
  maxRows,
  height,
  heightVariant = 'auto',
  width = '100%',
  onRowClick,
  pagination = true,
  paginationPageSize = 25,
  rowSelection,
  selectedRows = [],
  onSelectionChanged,
  sortable = true,
  resizable = false,
  striped = true,
  hoverable = true,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}: ReactTableProps<T>) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const tableRef = useRef<HTMLDivElement>(null);
  
  // State management
  const [sortState, setSortState] = useState<SortState>({ field: '', direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(paginationPageSize);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [isResizing, setIsResizing] = useState<string | null>(null);

  // Filter columns based on mode
  const visibleColumns = useMemo(() => {
    let cols = columns.filter(col => !col.hide);
    
    if (mode === 'summary') {
      cols = cols
        .sort((a, b) => (a.summaryPriority || 999) - (b.summaryPriority || 999))
        .slice(0, maxSummaryColumns);
    }
    
    return cols;
  }, [columns, mode, maxSummaryColumns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.field || !sortState.direction) return data;
    
    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortState.field];
      const bVal = (b as Record<string, unknown>)[sortState.field];
      
      if (aVal === bVal) return 0;
      
      // Handle comparison for unknown types
      let comparison = 0;
      if (aVal == null && bVal == null) {
        comparison = 0;
      } else if (aVal == null) {
        comparison = -1;
      } else if (bVal == null) {
        comparison = 1;
      } else {
        // Convert to string for comparison if not primitive types
        const aStr = String(aVal);
        const bStr = String(bVal);
        comparison = aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      }
      
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pagination, currentPage, pageSize]);

  // Calculate height
  const actualHeight = useMemo(() => {
    if (height !== undefined) return height;
    
    if (heightVariant !== 'auto') {
      return tableTokens.heights[heightVariant];
    }
    
    switch (mode) {
      case 'summary':
        return maxRows ? tableTokens.heights.compact : tableTokens.heights.comfortable;
      case 'drilldown':
        return tableTokens.heights.comfortable;
      case 'deepDive':
        return tableTokens.heights.spacious;
      default:
        return tableTokens.heights.comfortable;
    }
  }, [height, heightVariant, mode, maxRows]);

  // Handle sorting
  const handleSort = useCallback((field: string) => {
    if (!sortable) return;
    
    setSortState(prev => {
      if (prev.field !== field) {
        return { field, direction: 'asc' };
      }
      
      switch (prev.direction) {
        case null:
          return { field, direction: 'asc' };
        case 'asc':
          return { field, direction: 'desc' };
        case 'desc':
          return { field: '', direction: null };
        default:
          return { field: '', direction: null };
      }
    });
  }, [sortable]);

  // Handle row selection
  const handleRowSelection = useCallback((row: T) => {
    if (!rowSelection || !onSelectionChanged) return;
    
    if (rowSelection === 'single') {
      onSelectionChanged([row]);
    } else {
      const isSelected = selectedRows.some(selected => selected === row);
      if (isSelected) {
        onSelectionChanged(selectedRows.filter(selected => selected !== row));
      } else {
        onSelectionChanged([...selectedRows, row]);
      }
    }
  }, [rowSelection, selectedRows, onSelectionChanged]);

  // Handle pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  // Column resizing
  const handleMouseDown = useCallback((e: React.MouseEvent, field: string) => {
    if (!resizable) return;
    
    e.preventDefault();
    setIsResizing(field);
    
    const startX = e.clientX;
    const startWidth = columnWidths[field] || 150;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      setColumnWidths(prev => ({ ...prev, [field]: newWidth }));
    };
    
    const handleMouseUp = () => {
      setIsResizing(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [resizable, columnWidths]);

  // Styles
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof actualHeight === 'number' ? `${actualHeight}px` : actualHeight,
    border: isDark ? tableTokens.container.border.dark : tableTokens.container.border.light,
    borderRadius: tableTokens.container.borderRadius,
    boxShadow: tableTokens.container.shadow,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: isDark ? tableTokens.row.darkBg : '#ffffff',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: tableTokens.row.fontSize,
    fontFamily: tableTokens.row.fontFamily,
    color: isDark ? tableTokens.row.darkColor : tableTokens.row.color,
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: isDark ? tableTokens.header.darkBg : tableTokens.header.bg,
    color: isDark ? tableTokens.header.darkColor : tableTokens.header.color,
    fontSize: tableTokens.header.fontSize,
    fontWeight: tableTokens.header.fontWeight,
    fontFamily: tableTokens.header.fontFamily,
    height: tableTokens.header.height,
    borderBottom: isDark ? tableTokens.header.darkBorder : tableTokens.header.border.light,
  };

  const totalPages = Math.ceil(sortedData.length / pageSize);

  return (
    <div ref={tableRef} style={containerStyle} className={className}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
          <div>Loading...</div>
        </div>
      )}
      
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr>
              {rowSelection && (
                <th style={{
                  width: '40px',
                  padding: '0 12px',
                  textAlign: 'center',
                  borderRight: isDark ? tableTokens.header.darkBorder : tableTokens.header.border.light,
                }}>
                  {rowSelection === 'multiple' && (
                    <input
                      type="checkbox"
                      checked={selectedRows.length === data.length && data.length > 0}
                      onChange={(e) => {
                        if (onSelectionChanged) {
                          onSelectionChanged(e.target.checked ? data : []);
                        }
                      }}
                    />
                  )}
                </th>
              )}
              
              {visibleColumns.map((column, index) => (
                <th
                  key={column.field}
                  style={{
                    padding: '0 12px',
                    textAlign: column.align || 'left',
                    cursor: sortable && column.sortable !== false ? 'pointer' : 'default',
                    position: 'relative',
                    width: columnWidths[column.field] || column.width || 'auto',
                    minWidth: column.minWidth || 100,
                    maxWidth: column.maxWidth || 'none',
                    borderRight: index < visibleColumns.length - 1 
                      ? (isDark ? tableTokens.header.darkBorder : tableTokens.header.border.light)
                      : 'none',
                  }}
                  onClick={() => handleSort(column.field)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{column.title}</span>
                    {sortable && column.sortable !== false && (
                      <span style={{ marginLeft: '8px', fontSize: '12px' }}>
                        {sortState.field === column.field ? (
                          sortState.direction === 'asc' ? '↑' : sortState.direction === 'desc' ? '↓' : '↕'
                        ) : '↕'}
                      </span>
                    )}
                  </div>
                  
                  {resizable && index < visibleColumns.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        cursor: 'col-resize',
                        backgroundColor: isResizing === column.field ? '#3B82F6' : 'transparent',
                      }}
                      onMouseDown={(e) => handleMouseDown(e, column.field)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (rowSelection ? 1 : 0)}
                  style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: isDark ? tableTokens.row.darkColor : tableTokens.row.color,
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const isSelected = selectedRows.some(selected => selected === row);
                const isEven = rowIndex % 2 === 0;
                
                return (
                  <tr
                    key={rowIndex}
                    style={{
                      height: tableTokens.row.height,
                      backgroundColor: isSelected 
                        ? (isDark ? tableTokens.row.hoverBg.dark : tableTokens.row.hoverBg.light)
                        : (striped && !isEven) 
                          ? tableTokens.row.zebraBg 
                          : 'transparent',
                      borderBottom: isDark ? tableTokens.row.borderBottom.dark : tableTokens.row.borderBottom.light,
                      cursor: onRowClick ? 'pointer' : 'default',
                    }}
                    onClick={() => onRowClick?.(row, rowIndex)}
                    onMouseEnter={(e) => {
                      if (hoverable && !isSelected) {
                        e.currentTarget.style.backgroundColor = isDark 
                          ? tableTokens.row.hoverBg.dark 
                          : tableTokens.row.hoverBg.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (hoverable && !isSelected) {
                        e.currentTarget.style.backgroundColor = (striped && !isEven) 
                          ? tableTokens.row.zebraBg 
                          : 'transparent';
                      }
                    }}
                  >
                    {rowSelection && (
                      <td style={{
                        padding: '0 12px',
                        textAlign: 'center',
                        borderRight: isDark ? tableTokens.row.borderBottom.dark : tableTokens.row.borderBottom.light,
                      }}>
                        <input
                          type={rowSelection === 'single' ? 'radio' : 'checkbox'}
                          checked={isSelected}
                          onChange={() => handleRowSelection(row)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                    
                    {visibleColumns.map((column, colIndex) => {
                      const value = (row as Record<string, unknown>)[column.field];
                      const formattedValue = column.valueFormatter ? column.valueFormatter(value) : value;
                      const status = column.statusAccessor ? column.statusAccessor(row) : null;
                      
                      let cellContent: React.ReactNode;
                      
                      if (column.cellRenderer) {
                        cellContent = column.cellRenderer(value, row, rowIndex);
                      } else if (status) {
                        cellContent = (
                          <StatusIndicator status={status} mode={mode}>
                            {String(formattedValue ?? '')}
                          </StatusIndicator>
                        );
                      } else {
                        // Convert unknown value to renderable content
                        cellContent = String(formattedValue ?? '');
                      }
                      
                      return (
                        <td
                          key={column.field}
                          style={{
                            padding: '0 12px',
                            textAlign: column.align || 'left',
                            borderRight: colIndex < visibleColumns.length - 1 
                              ? (isDark ? tableTokens.row.borderBottom.dark : tableTokens.row.borderBottom.light)
                              : 'none',
                            width: columnWidths[column.field] || column.width || 'auto',
                            minWidth: column.minWidth || 100,
                            maxWidth: column.maxWidth || 'none',
                          }}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && paginatedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={sortedData.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          isDark={isDark}
        />
      )}
    </div>
  );
}
