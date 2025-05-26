"use client";

import React, { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, ICellRendererParams, ValueFormatterParams, GridReadyEvent, ModuleRegistry, AllCommunityModule, themeQuartz, colorSchemeDark, colorSchemeLight } from 'ag-grid-community';
import { useTheme } from '../../app/contexts/ThemeContext';
import { tableTokens } from './tokens';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

type DetailLevel = 'summary' | 'drilldown' | 'deepDive';
type HeightVariant = 'compact' | 'comfortable' | 'spacious' | 'auto' | 'fill';

// Export height variants for easy access
export const TABLE_HEIGHT_VARIANTS = tableTokens.heights;

export interface AGColumnDef<T = Record<string, unknown>> {
  field: string;
  title: string;
  statusAccessor?: (row: T) => 'success' | 'warning' | 'error';
  summaryPriority?: number; // Lower number = higher priority for summary mode
  cellRenderer?: (params: ICellRendererParams) => React.ReactNode;
  width?: number;
  valueFormatter?: (params: ValueFormatterParams) => string;
  filter?: boolean | string; // AG-Grid filter support
  pinned?: 'left' | 'right';
  sortable?: boolean;
  resizable?: boolean;
  hide?: boolean;
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
  pagination?: boolean;
  paginationPageSize?: number;
  rowSelection?: 'single' | 'multiple';
  onSelectionChanged?: (selectedRows: T[]) => void;
}

// Status indicator cell renderer
const StatusCellRenderer = (props: ICellRendererParams & { mode?: DetailLevel; colDef: AGColumnDef<unknown> }) => {
  const { data, colDef, mode } = props;
  const statusAccessor = colDef.statusAccessor;
  const status = statusAccessor ? statusAccessor(data) : null;
  const value = props.value;

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

  if (!status) {
    return <div style={baseStyle}>{value}</div>;
  }

  switch (mode || 'summary') {
    case 'summary':
      return (
        <div style={{
          ...baseStyle,
          borderLeft: `4px solid ${statusColors[status]}`,
          paddingLeft: '8px'
        }}>
          {value}
        </div>
      );
      
    case 'drilldown':
      return (
        <div style={{
          ...baseStyle,
          borderLeft: `3px solid ${statusColors[status]}`,
          paddingLeft: '8px'
        }}>
          {value}
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
          {value}
        </div>
      );
      
    default:
      return <div style={baseStyle}>{value}</div>;
  }
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
  suppressVerticalScroll = false,
  pagination,
  paginationPageSize,
  rowSelection,
  onSelectionChanged
}: AGDataTableProps<T>) {
  const { theme } = useTheme();
  const gridRef = useRef<AgGridReact>(null);

  const isDark = theme === 'dark';
  
  // Create theme configuration using the modern Theming API
  const agGridTheme = useMemo(() => {
    return isDark ? 
      themeQuartz
        .withPart(colorSchemeDark)
        .withParams({ 
          accentColor: '#627d98',
          spacing: 8,
        }) : 
      themeQuartz
        .withPart(colorSchemeLight)
        .withParams({
          accentColor: '#3B82F6',
          spacing: 8,
        });
  }, [isDark]);

  // Inject custom CSS for proper alignment
  React.useEffect(() => {
    const customCSS = `
      .ag-theme-quartz .ag-header-cell-comp-wrapper {
        justify-content: flex-start !important;
      }
      .ag-theme-quartz .ag-header-cell-menu-button {
        margin-left: 4px !important;
        margin-right: auto !important;
      }
      .ag-theme-quartz .ag-cell-wrapper {
        height: 100% !important;
      }
      .ag-theme-quartz .ag-cell {
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
      }
    `;
    
    const styleId = 'ag-grid-custom-alignment';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = customCSS;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      // Cleanup on unmount
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);
  
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
        return maxRows ? tableTokens.heights.compact : tableTokens.heights.comfortable;
      case 'drilldown':
        return tableTokens.heights.comfortable;
      case 'deepDive':
        return tableTokens.heights.spacious;
      default:
        return tableTokens.heights.comfortable;
    }
  }, [height, heightVariant, mode, maxRows]);

  // Convert our column definitions to AG-Grid column definitions
  const agGridColumns: ColDef[] = useMemo(() => {
    let cols = [...columns];
    
    // Filter columns based on mode
    if (mode === 'summary') {
      cols = columns
        .sort((a, b) => (a.summaryPriority || 999) - (b.summaryPriority || 999))
        .slice(0, maxSummaryColumns);
    }
    
    return cols.map((col) => ({
      field: col.field,
      headerName: col.title,
      width: col.width,
      pinned: col.pinned,
      sortable: col.sortable !== false, // Default to true
      resizable: col.resizable !== false, // Default to true
      filter: col.filter !== false, // Default to true
      hide: col.hide || false,
      valueFormatter: col.valueFormatter ? (params: ValueFormatterParams) => col.valueFormatter!(params) : undefined,
      cellRenderer: col.statusAccessor ? (params: ICellRendererParams) => 
        StatusCellRenderer({ ...params, mode, colDef: col as AGColumnDef<unknown> }) :
        col.cellRenderer ? (params: ICellRendererParams) => col.cellRenderer!(params) : undefined,
      cellStyle: () => {
        // Apply theme-appropriate cell styling with proper alignment
        // Handle font family conversion from array to string
        const fontFamily = Array.isArray(tableTokens.row.fontFamily) 
          ? tableTokens.row.fontFamily.join(', ') 
          : tableTokens.row.fontFamily;
        
        // Handle font size extraction from array format
        const fontSize = Array.isArray(tableTokens.row.fontSize) 
          ? tableTokens.row.fontSize[0] as string
          : tableTokens.row.fontSize as string;
        
        return {
          color: isDark ? tableTokens.row.darkColor : tableTokens.row.color,
          fontFamily,
          fontSize,
          fontWeight: tableTokens.row.fontWeight,
          lineHeight: tableTokens.row.lineHeight,
          display: 'flex',
          alignItems: 'center', // Vertically center all cell content
          justifyContent: 'flex-start', // Left-align all cell content
          height: '100%',
          padding: '0 12px', // Consistent horizontal padding
        };
      }
    }));
  }, [columns, mode, maxSummaryColumns, isDark]);

  // Grid options
  const gridOptions: GridOptions = useMemo(() => ({
    theme: agGridTheme,
    columnDefs: agGridColumns,
    rowData: data,
    
    // Pagination settings
    pagination: pagination !== false && (mode !== 'summary' || !!maxRows),
    paginationPageSize: paginationPageSize || maxRows || (mode === 'deepDive' ? 50 : 25),
    paginationPageSizeSelector: mode === 'deepDive' ? [50, 100, 200] : [25, 50, 100],
    
    // Selection settings
    rowSelection: rowSelection || undefined,
    
    // Event handlers
    onRowClicked: onRowClick ? (event) => onRowClick(event.data) : undefined,
    onSelectionChanged: onSelectionChanged ? (event) => {
      const selectedRows = event.api.getSelectedRows();
      onSelectionChanged(selectedRows);
    } : undefined,
    
    // Styling and behavior
    suppressHorizontalScroll: false,
    suppressVerticalScroll: suppressVerticalScroll,
    domLayout: heightVariant === 'auto' && mode === 'summary' && !maxRows ? 'autoHeight' : 'normal',
    
    // Theme and styling
    headerHeight: parseInt(tableTokens.header.height),
    rowHeight: parseInt(tableTokens.row.height),
    
    // Default column settings
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    },
    
    // Suppress context menu
    suppressContextMenu: true,
    
    // Loading overlay
    loadingOverlayComponent: undefined,
    noRowsOverlayComponent: undefined,
  }), [
    agGridTheme,
    agGridColumns, 
    data, 
    mode, 
    maxRows, 
    pagination, 
    paginationPageSize, 
    rowSelection, 
    onRowClick, 
    onSelectionChanged, 
    suppressVerticalScroll, 
    heightVariant
  ]);

  // Grid ready handler
  const onGridReady = (event: GridReadyEvent) => {
    // Auto-size columns if no explicit widths are provided
    const hasExplicitWidths = columns.some(col => col.width);
    if (!hasExplicitWidths) {
      event.api.sizeColumnsToFit();
    }
  };

  const containerHeight = typeof actualHeight === 'number' ? `${actualHeight}px` : actualHeight;
  const containerWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <div 
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
    >
      <AgGridReact
        ref={gridRef}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
        animateRows={true}
        suppressMovableColumns={false}
        suppressMenuHide={false}
        // Enable cell focus for better accessibility
        suppressCellFocus={false}
      />
    </div>
  );
}

// For backward compatibility
export const DataTable = AGDataTable;

// Example interface for rack logistics
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

  const rackColumns: AGColumnDef<RackData>[] = [
    {
      field: 'rackId',
      title: 'Rack ID',
      summaryPriority: 1,
      statusAccessor: (row) => row.overallStatus,
      width: 120,
      pinned: 'left',
    },
    {
      field: 'datacenter',
      title: 'Data Center',
      summaryPriority: 2,
      width: 150,
    },
    {
      field: 'utilization',
      title: 'Utilization %',
      summaryPriority: 3,
      statusAccessor: (row) => 
        row.utilization > 90 ? 'error' : 
        row.utilization > 75 ? 'warning' : 'success',
      valueFormatter: (params) => `${params.value}%`,
      width: 130,
    },
    {
      field: 'location',
      title: 'Location',
      summaryPriority: 4,
      width: 180,
    },
    {
      field: 'vendor',
      title: 'Vendor',
      summaryPriority: 5,
      width: 100,
    },
    // Additional columns for drilldown/deepDive
    {
      field: 'installDate',
      title: 'Install Date',
      valueFormatter: (params) => {
        try {
          return new Date(params.value).toLocaleDateString();
        } catch {
          return String(params.value ?? '');
        }
      },
      width: 120,
    },
    {
      field: 'powerUsage',
      title: 'Power Usage (kW)',
      width: 150,
      valueFormatter: (params) => `${params.value} kW`,
    },
    {
      field: 'temperature',
      title: 'Temperature (°C)',
      statusAccessor: (row) =>
        row.temperature > 35 ? 'error' :
        row.temperature > 30 ? 'warning' : 'success',
      width: 140,
      valueFormatter: (params) => `${params.value}°C`,
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
    backgroundColor: isActive ? (theme === 'dark' ? '#627d98' : '#3B82F6') : (theme === 'dark' ? '#525252' : '#E5E7EB'),
    color: isActive ? 'white' : (theme === 'dark' ? '#d4d4d4' : 'black'),
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
        heightVariant={mode === 'summary' ? 'auto' : 'comfortable'}
        onRowClick={(data) => console.log('Clicked rack:', data)}
        rowSelection="multiple"
        onSelectionChanged={(selectedRows) => console.log('Selected rows:', selectedRows)}
      />
    </div>
  );
};