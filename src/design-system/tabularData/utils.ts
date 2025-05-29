import { DetailLevel, ColumnDef, FilterConfig, SortConfig } from './types';

export const filterData = <T>(data: T[], filters: FilterConfig[]): T[] => {
  if (!filters || filters.length === 0) return data;

  return data.filter(row => {
    return filters.every(filter => {
      const value = (row as any)[filter.column];
      
      if (value === undefined || value === null) return false;
      
      switch (filter.operator) {
        case 'equals':
          return value === filter.value;
        case 'contains':
          return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
        case 'startsWith':
          return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
        case 'endsWith':
          return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase());
        case 'greaterThan':
          return Number(value) > Number(filter.value);
        case 'lessThan':
          return Number(value) < Number(filter.value);
        case 'between':
          return Number(value) >= Number(filter.value) && Number(value) <= Number(filter.value2);
        default:
          return true;
      }
    });
  });
};

export const sortData = <T>(data: T[], sortConfig: SortConfig | null): T[] => {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    const aValue = (a as any)[sortConfig.column];
    const bValue = (b as any)[sortConfig.column];
    
    if (aValue === bValue) return 0;
    
    let comparison = 0;
    if (aValue > bValue) comparison = 1;
    if (aValue < bValue) comparison = -1;
    
    return sortConfig.direction === 'desc' ? -comparison : comparison;
  });
};

export const paginateData = <T>(data: T[], currentPage: number, pageSize: number): T[] => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

export const getVisibleColumns = <T>(columns: ColumnDef<T>[], mode: DetailLevel): ColumnDef<T>[] => {
  const constraints = getModeConstraints(mode);
  
  let visibleColumns = columns.filter(col => !col.hidden);
  
  if (constraints.maxColumns && visibleColumns.length > constraints.maxColumns) {
    visibleColumns = visibleColumns.slice(0, constraints.maxColumns);
  }
  
  return visibleColumns;
};

export const getModeConstraints = (mode: DetailLevel) => {
  switch (mode) {
    case 'summary':
      return {
        maxColumns: 5,
        maxRows: undefined,
        showColumnResize: false,
        showAdvancedFilters: false,
        showPagination: false,
      };
    case 'drilldown':
      return {
        maxColumns: undefined,
        maxRows: undefined,
        showColumnResize: true,
        showAdvancedFilters: true,
        showPagination: false,
      };
    case 'deepDive':
      return {
        maxColumns: undefined,
        maxRows: undefined,
        showColumnResize: true,
        showAdvancedFilters: true,
        showPagination: true,
      };
    default:
      return {
        maxColumns: undefined,
        maxRows: undefined,
        showColumnResize: true,
        showAdvancedFilters: true,
        showPagination: true,
      };
  }
};

export const generateDeepDiveUrl = (tableId: string, tableData?: any): string => {
  const baseUrl = `/deepdive/table-id/${tableId}`;
  
  if (tableData) {
    // Generate a unique session key for this table data
    const sessionKey = `deepdive_${tableId}_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    // Store the data in sessionStorage with the key
    sessionStorage.setItem(sessionKey, JSON.stringify(tableData));
    
    // Pass only the session key in the URL
    return `${baseUrl}?sessionKey=${sessionKey}`;
  }
  
  return baseUrl;
};

export const openTableInNewTab = (tableId: string, tableData: any): void => {
  const url = generateDeepDiveUrl(tableId, tableData);
  window.open(url, '_blank');
}; 