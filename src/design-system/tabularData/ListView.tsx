import React, { useState, useMemo } from 'react';
import { ListViewProps } from './types';
import { openTableInNewTab, paginateData } from './utils';
import { useTheme } from '../../app/contexts/ThemeContext';
import { colors } from '../foundations/tokens/colors';
import { getTypography } from '../foundations/tokens/typography';
import { TableToggle } from '../components/controls/TableToggle';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

export const ListView = <T extends Record<string, unknown>>({
  data,
  mode = 'deepDive',
  title,
  tableId,
  loading = false,
  emptyState = <p>No data available.</p>,
  renderItem,
  onItemClick,
  height = 400,
  width,
  onModeChange,
  showModeToggle = true,
  showPagination,
  pageSize = 25,
  currentPage = 1,
  onPageChange,
}: ListViewProps<T>) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Ensure initial page size matches one of the dropdown options
  const validPageSizes = [25, 50, 100];
  const initialPageSize = validPageSizes.includes(pageSize) ? pageSize : 25;
  
  // Local state management
  const [localMode, setLocalMode] = useState(mode);
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
  const [localPageSize, setLocalPageSize] = useState(initialPageSize);
  
  // Get mode constraints
  const currentMode = localMode;
  
  // Calculate pagination
  const showActualPagination = showPagination !== undefined ? showPagination : true;
  
  // Calculate total pages
  const totalPages = Math.ceil(data.length / localPageSize);
  
  // Process data based on mode
  const processedData = useMemo(() => {
    let result = data;
    
    // Apply pagination if enabled
    if (showActualPagination) {
      result = paginateData(result, localCurrentPage, localPageSize);
    }
    
    return result;
  }, [data, localCurrentPage, localPageSize, showActualPagination]);

  // Handle mode change
  const handleModeChange = (newMode: 'summary' | 'drilldown' | 'deepDive') => {
    // ListView only supports summary and deepDive modes
    if (newMode === 'drilldown') {
      // If drilldown is requested, treat it as deepDive for ListView
      newMode = 'deepDive';
    }
    
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
        title: title || 'List',
        data,
        renderItem,
      };
      openTableInNewTab(tableId, tableData);
    }
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
    backgroundColor: isDark ? colors.neutral[900] : colors.neutral[50],
    border: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    borderBottom: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
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

  const listContainerStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '8px',
  };

  const itemStyle: React.CSSProperties = {
    marginBottom: '8px',
    padding: '12px',
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    border: `1px solid ${isDark ? colors.neutral[600] : colors.neutral[200]}`,
    borderRadius: '6px',
    cursor: onItemClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
  };

  const itemHoverStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.neutral[700] : colors.neutral[200],
    transform: 'translateY(-1px)',
    boxShadow: `0 2px 4px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
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
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        {showModeToggle && (
          <TableToggle
            mode={currentMode}
            onChange={handleModeChange}
            showDeepDive={!!tableId}
            showDrilldown={false}
            onDeepDiveExternal={handleDeepDiveExternal}
          />
        )}
      </div>

      {/* List Container */}
      <div style={listContainerStyle}>
        {processedData.map((item, index) => (
          <div
            key={index}
            style={itemStyle}
            onMouseEnter={(e) => {
              if (onItemClick) {
                Object.assign(e.currentTarget.style, itemHoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (onItemClick) {
                Object.assign(e.currentTarget.style, itemStyle);
              }
            }}
            onClick={() => onItemClick && onItemClick(item, index)}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {showActualPagination && (
        <div
          style={{
            borderTop: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
          }}
        >
          <span style={{ color: isDark ? colors.neutral[300] : colors.neutral[600], fontSize: '14px' }}>
            Showing {((localCurrentPage - 1) * localPageSize) + 1} - {Math.min(localCurrentPage * localPageSize, data.length)} of {data.length} items
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Page size selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
              <label style={{ 
                color: isDark ? colors.neutral[300] : colors.neutral[600], 
                fontSize: '14px' 
              }}>
                Items per page:
              </label>
              <select
                value={localPageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                style={{
                  backgroundColor: isDark ? colors.neutral[700] : colors.neutral[50],
                  color: isDark ? colors.neutral[300] : colors.neutral[700],
                  border: `1px solid ${isDark ? colors.neutral[600] : colors.neutral[300]}`,
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
                border: `1px solid ${isDark ? colors.neutral[600] : colors.neutral[300]}`,
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
                border: `1px solid ${isDark ? colors.neutral[600] : colors.neutral[300]}`,
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
                        ? (isDark ? colors.neutral[700] : colors.neutral[700])
                        : 'transparent',
                      border: `1px solid ${
                        localCurrentPage === page 
                          ? (isDark ? colors.neutral[700] : colors.neutral[700])
                          : (isDark ? colors.neutral[600] : colors.neutral[300])
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
                border: `1px solid ${isDark ? colors.neutral[600] : colors.neutral[300]}`,
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
                border: `1px solid ${isDark ? colors.neutral[600] : colors.neutral[300]}`,
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

export default ListView;
