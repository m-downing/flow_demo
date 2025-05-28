import React, { useState, useMemo } from 'react';
import { ListViewProps } from './types';
import { getModeConstraints, openTableInNewTab } from './utils';
import { useTheme } from '../../app/contexts/ThemeContext';
import { colors } from '../foundations/tokens/colors';
import { getTypography } from '../foundations/tokens/typography';
import { TableToggle } from '../components/controls/TableToggle';

export const ListView = <T extends Record<string, any>>({
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
}: ListViewProps<T>) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Local state management
  const [localMode, setLocalMode] = useState(mode);
  
  // Get mode constraints
  const currentMode = localMode;
  const constraints = getModeConstraints(currentMode);
  
  // Process data based on mode
  const processedData = useMemo(() => {
    let result = data;
    
    // No row limits in any mode - all modes support unlimited scrolling
    // Mode constraints only affect column visibility and layout features
    
    return result;
  }, [data]);

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
        title: title || 'List',
        data,
        renderItem,
      };
      openTableInNewTab(tableId, tableData);
    }
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
    color: isDark ? colors.neutral[100] : colors.neutral[900],
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
    border: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
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

      {/* Footer with count */}
      {currentMode !== 'summary' && (
        <div
          style={{
            borderTop: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
            padding: '12px 16px',
            backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
          }}
        >
          <span style={{ color: isDark ? colors.neutral[400] : colors.neutral[600], fontSize: '14px' }}>
            Showing {processedData.length} of {data.length} items
          </span>
        </div>
      )}
    </div>
  );
};

export default ListView;
