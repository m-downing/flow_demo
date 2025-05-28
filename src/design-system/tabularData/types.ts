import { ReactNode } from 'react';

export type DetailLevel = 'summary' | 'drilldown' | 'deepDive';

export interface ColumnDef<T = any> {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (value: any, row: T, index: number) => ReactNode;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  hidden?: boolean;
}

export interface FilterConfig {
  column: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
  value: any;
  value2?: any; // For 'between' operator
}

export interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

export interface TableData<T = any> {
  id: string;
  title: string;
  data: T[];
  columns: ColumnDef<T>[];
  totalRows?: number; // For server-side pagination
}

export interface TableViewProps<T = any> {
  data: T[];
  columns: ColumnDef<T>[];
  mode?: DetailLevel;
  title?: string;
  tableId?: string;
  loading?: boolean;
  emptyState?: ReactNode;
  onRowClick?: (row: T, index: number) => void;
  onSort?: (sortConfig: SortConfig) => void;
  onFilter?: (filters: FilterConfig[]) => void;
  filters?: FilterConfig[];
  sortConfig?: SortConfig;
  height?: number;
  width?: number;
  showPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onModeChange?: (mode: DetailLevel) => void;
  showModeToggle?: boolean;
}

export interface ListViewProps<T = any> {
  data: T[];
  mode?: DetailLevel;
  title?: string;
  tableId?: string;
  loading?: boolean;
  emptyState?: ReactNode;
  renderItem: (item: T, index: number) => ReactNode;
  onItemClick?: (item: T, index: number) => void;
  height?: number;
  width?: number;
  onModeChange?: (mode: DetailLevel) => void;
  showModeToggle?: boolean;
} 