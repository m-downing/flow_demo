import { DetailLevel, ColumnDef, FilterConfig, SortConfig } from './types';

// Mode constraints
interface ModeConstraints {
  maxColumns: number | null;
  maxRows: number | null;
  showPagination: boolean;
  showFilters: boolean;
  showSort: boolean;
  showSearch: boolean;
  showExport: boolean;
  showColumnResize: boolean;
  showRowActions: boolean;
}

export const getModeConstraints = (mode: DetailLevel): ModeConstraints => {
  switch (mode) {
    case 'summary':
      return {
        maxColumns: 5,
        maxRows: null, // No row limit in any mode - all support unlimited scrolling
        showPagination: false,
        showFilters: false,
        showSort: true,
        showSearch: false,
        showExport: false,
        showColumnResize: false,
        showRowActions: false,
      };
    case 'drilldown':
      return {
        maxColumns: null,
        maxRows: null, // No row limit in any mode - all support unlimited scrolling
        showPagination: false,
        showFilters: false,
        showSort: true,
        showSearch: false,
        showExport: false,
        showColumnResize: true,
        showRowActions: true,
      };
    case 'deepDive':
      return {
        maxColumns: null,
        maxRows: null,
        showPagination: true,
        showFilters: true,
        showSort: true,
        showSearch: true,
        showExport: true,
        showColumnResize: true,
        showRowActions: true,
      };
  }
};

// Filter data based on filter configurations
export const filterData = <T extends Record<string, unknown>>(
  data: T[],
  filters: FilterConfig[]
): T[] => {
  if (!filters || filters.length === 0) return data;
  
  return data.filter(row => {
    return filters.every(filter => {
      const value = row[filter.column];
      const filterValue = filter.value;
      
      switch (filter.operator) {
        case 'equals':
          return value === filterValue;
        case 'contains':
          return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
        case 'startsWith':
          return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
        case 'endsWith':
          return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
        case 'greaterThan':
          return Number(value) > Number(filterValue);
        case 'lessThan':
          return Number(value) < Number(filterValue);
        default:
          return true;
      }
    });
  });
};

// Sort data based on sort configuration
export const sortData = <T extends Record<string, unknown>>(
  data: T[],
  sortConfig: SortConfig | null
): T[] => {
  if (!sortConfig) return data;
  
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.column];
    const bValue = b[sortConfig.column];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * multiplier;
    }
    
    return String(aValue).localeCompare(String(bValue)) * multiplier;
  });
};

// Paginate data
export const paginateData = <T>(
  data: T[],
  currentPage: number,
  pageSize: number
): T[] => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

// Get visible columns based on mode
export const getVisibleColumns = <T>(
  columns: ColumnDef<T>[],
  mode: DetailLevel
): ColumnDef<T>[] => {
  const constraints = getModeConstraints(mode);
  
  if (constraints.maxColumns && columns.length > constraints.maxColumns) {
    return columns.slice(0, constraints.maxColumns);
  }
  
  return columns;
};

// Generate deep dive URL
export const generateDeepDiveUrl = (tableId: string, tableData?: unknown): string => {
  const baseUrl = `/deepdive/table-id/${tableId}`;
  
  if (tableData) {
    // Store table data in sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`table-${tableId}`, JSON.stringify(tableData));
    }
  }
  
  return baseUrl;
};

// Open table in new tab
export const openTableInNewTab = (tableId: string, tableData?: unknown): void => {
  const url = generateDeepDiveUrl(tableId, tableData);
  
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
}; 