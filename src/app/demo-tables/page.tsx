'use client';

import React, { useState } from 'react';
import { TableView, ListView, ColumnDef, DetailLevel } from '../../design-system/tabularData';
import { useTheme } from '../contexts/ThemeContext';
import { colors } from '../../design-system/foundations/tokens/colors';
import { badgeColors } from '../../design-system/foundations/tokens/colors';

// Sample data for supply chain management
interface ServerRecord {
  id: string;
  serverModel: string;
  status: string;
  location: string;
  orderDate: string;
  expectedDelivery: string;
  priority: string;
  quantity: number;
  cost: number;
}

const sampleData: ServerRecord[] = [
  {
    id: 'SRV-001',
    serverModel: 'Dell PowerEdge R750',
    status: 'manufacturing',
    location: 'Austin Data Center',
    orderDate: '2024-01-15',
    expectedDelivery: '2024-02-15',
    priority: 'high',
    quantity: 12,
    cost: 156000,
  },
  {
    id: 'SRV-002',
    serverModel: 'HP ProLiant DL380',
    status: 'inTransit',
    location: 'Denver Data Center',
    orderDate: '2024-01-10',
    expectedDelivery: '2024-02-01',
    priority: 'critical',
    quantity: 8,
    cost: 98000,
  },
  {
    id: 'SRV-003',
    serverModel: 'Cisco UCS C240',
    status: 'delivered',
    location: 'Seattle Data Center',
    orderDate: '2023-12-20',
    expectedDelivery: '2024-01-20',
    priority: 'standard',
    quantity: 15,
    cost: 230000,
  },
  {
    id: 'SRV-004',
    serverModel: 'Supermicro SuperServer',
    status: 'qualityTesting',
    location: 'Chicago Data Center',
    orderDate: '2024-01-05',
    expectedDelivery: '2024-01-30',
    priority: 'high',
    quantity: 6,
    cost: 72000,
  },
  {
    id: 'SRV-005',
    serverModel: 'Dell PowerEdge R7525',
    status: 'planned',
    location: 'Phoenix Data Center',
    orderDate: '2024-02-01',
    expectedDelivery: '2024-03-01',
    priority: 'standard',
    quantity: 20,
    cost: 280000,
  },
  {
    id: 'SRV-006',
    serverModel: 'HPE Apollo 6500',
    status: 'ordered',
    location: 'Miami Data Center',
    orderDate: '2024-01-25',
    expectedDelivery: '2024-02-25',
    priority: 'critical',
    quantity: 4,
    cost: 120000,
  },
  {
    id: 'SRV-007',
    serverModel: 'IBM Power System E1080',
    status: 'delayed',
    location: 'Boston Data Center',
    orderDate: '2023-12-01',
    expectedDelivery: '2024-01-15',
    priority: 'high',
    quantity: 2,
    cost: 450000,
  },
  {
    id: 'SRV-008',
    serverModel: 'Lenovo ThinkSystem SR950',
    status: 'installing',
    location: 'Atlanta Data Center',
    orderDate: '2023-11-15',
    expectedDelivery: '2023-12-15',
    priority: 'standard',
    quantity: 10,
    cost: 185000,
  },
  {
    id: 'SRV-009',
    serverModel: 'Dell PowerEdge R740',
    status: 'active',
    location: 'Portland Data Center',
    orderDate: '2023-10-01',
    expectedDelivery: '2023-11-01',
    priority: 'standard',
    quantity: 25,
    cost: 350000,
  },
  {
    id: 'SRV-010',
    serverModel: 'HP ProLiant DL360',
    status: 'readyToShip',
    location: 'Las Vegas Data Center',
    orderDate: '2024-01-20',
    expectedDelivery: '2024-02-10',
    priority: 'high',
    quantity: 18,
    cost: 198000,
  },
];

export default function DemoTablesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State for interactive demos
  const [tableMode, setTableMode] = useState<DetailLevel>('summary');
  const [listMode, setListMode] = useState<DetailLevel>('summary');

  // Define columns for TableView
  const columns: ColumnDef<ServerRecord>[] = [
    {
      id: 'id',
      header: 'Server ID',
      accessorKey: 'id',
      width: 120,
      sortable: true,
    },
    {
      id: 'serverModel',
      header: 'Server Model',
      accessorKey: 'serverModel',
      width: 200,
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      width: 150,
      sortable: true,
      cell: (value) => {
        const statusColors = {
          planned: badgeColors.planned,
          ordered: badgeColors.ordered,
          manufacturing: badgeColors.manufacturing,
          qualityTesting: badgeColors.qualityTesting,
          readyToShip: badgeColors.readyToShip,
          inTransit: badgeColors.inTransit,
          delivered: badgeColors.delivered,
          installing: badgeColors.installing,
          active: badgeColors.active,
          delayed: badgeColors.delayed,
        };
        
        const colorConfig = statusColors[value as keyof typeof statusColors] || badgeColors.standard;
        
        return (
          <span
            style={{
              backgroundColor: colorConfig.bg,
              color: colorConfig.text,
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'capitalize',
            }}
          >
            {value.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        );
      },
    },
    {
      id: 'location',
      header: 'Location',
      accessorKey: 'location',
      width: 180,
      sortable: true,
    },
    {
      id: 'orderDate',
      header: 'Order Date',
      accessorKey: 'orderDate',
      width: 120,
      sortable: true,
    },
    {
      id: 'expectedDelivery',
      header: 'Expected Delivery',
      accessorKey: 'expectedDelivery',
      width: 140,
      sortable: true,
    },
    {
      id: 'priority',
      header: 'Priority',
      accessorKey: 'priority',
      width: 100,
      sortable: true,
      cell: (value) => {
        const priorityColors = {
          critical: badgeColors.critical,
          high: badgeColors.highPriority,
          standard: badgeColors.standard,
        };
        
        const colorConfig = priorityColors[value as keyof typeof priorityColors] || badgeColors.standard;
        
        return (
          <span
            style={{
              backgroundColor: colorConfig.bg,
              color: colorConfig.text,
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'capitalize',
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'quantity',
      width: 100,
      sortable: true,
    },
    {
      id: 'cost',
      header: 'Cost',
      accessorKey: 'cost',
      width: 120,
      sortable: true,
      cell: (value) => `$${value.toLocaleString()}`,
    },
  ];

  // Custom item renderer for ListView
  const renderListItem = (item: ServerRecord, index: number) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: isDark ? colors.neutral[200] : colors.neutral[800] }}>
          {item.serverModel}
        </h4>
        <span style={{ fontSize: '12px', color: isDark ? colors.neutral[400] : colors.neutral[600] }}>
          {item.id}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700] }}>
          📍 {item.location}
        </span>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700] }}>
          📅 {item.expectedDelivery}
        </span>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700] }}>
          💰 ${item.cost.toLocaleString()}
        </span>
        <span style={{ fontSize: '14px', color: isDark ? colors.neutral[300] : colors.neutral[700] }}>
          📦 {item.quantity} units
        </span>
      </div>
    </div>
  );

  const pageStyle: React.CSSProperties = {
    padding: '24px',
    backgroundColor: isDark ? colors.neutral[950] : colors.neutral[50],
    minHeight: '100vh',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '48px',
  };

  const headerStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[100] : colors.neutral[900],
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '24px',
  };

  const subHeaderStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[200] : colors.neutral[800],
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
  };

  const descriptionStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[400] : colors.neutral[600],
    fontSize: '14px',
    marginBottom: '16px',
    maxWidth: '800px',
    lineHeight: '1.5',
  };

  const demoContainerStyle: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: isDark ? colors.neutral[900] : colors.neutral[100],
    borderRadius: '8px',
    border: `1px solid ${isDark ? colors.neutral[700] : colors.neutral[200]}`,
  };

  const modeInfoStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: isDark ? colors.primary[900] : colors.primary[100],
    color: isDark ? colors.primary[200] : colors.primary[700],
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '12px',
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Tabular Data Components Demo</h1>
      <p style={descriptionStyle}>
        Interactive demonstration of the TableView and ListView components with integrated TableToggle controls. 
        Use the toggle buttons to switch between Summary, Drilldown, and Deep Dive modes. The rocket icon opens 
        the full table in a new tab.
      </p>
      
      {/* Interactive TableView Demo */}
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>TableView with Interactive Mode Toggle</h2>
        <div style={demoContainerStyle}>
          <div style={modeInfoStyle}>
            Current Mode: {tableMode} 
            {tableMode === 'summary' && ' (max 5 columns, unlimited rows)'}
            {tableMode === 'drilldown' && ' (all columns, layout constrained)'}
            {tableMode === 'deepDive' && ' (full featured, unlimited)'}
          </div>
          <p style={descriptionStyle}>
            Try switching between modes. Summary shows 5 key columns, Drilldown shows all columns but is layout-constrained, Deep Dive opens in a new tab with full features.
          </p>
          <TableView
            data={sampleData}
            columns={columns}
            mode={tableMode}
            onModeChange={setTableMode}
            title="Server Inventory Management"
            tableId="server-inventory-interactive"
            height={tableMode === 'deepDive' ? 600 : 400}
          />
        </div>
      </section>

      {/* Interactive ListView Demo */}
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>ListView with Interactive Mode Toggle</h2>
        <div style={demoContainerStyle}>
          <div style={modeInfoStyle}>
            Current Mode: {listMode}
            {listMode === 'summary' && ' (5 key columns displayed, unlimited items)'}
            {listMode === 'drilldown' && ' (all data displayed, layout constrained)'}
            {listMode === 'deepDive' && ' (unlimited features)'}
          </div>
          <p style={descriptionStyle}>
            The ListView displays the same data in cards. Summary mode shows only key information, while Drilldown and Deep Dive show progressively more detail.
          </p>
          <ListView
            data={sampleData}
            mode={listMode}
            onModeChange={setListMode}
            title="Server List View"
            tableId="server-list-interactive"
            renderItem={renderListItem}
            height={listMode === 'deepDive' ? 600 : 400}
          />
        </div>
      </section>

      {/* Features Overview */}
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>TableToggle Component Features</h2>
        <div style={{ color: isDark ? colors.neutral[300] : colors.neutral[700], fontSize: '14px' }}>
          <ul style={{ lineHeight: '1.6' }}>
            <li><strong>Summary Mode:</strong> Shows 5 key columns (developer-controlled) with unlimited scrolling</li>
            <li><strong>Drilldown Mode:</strong> Shows all columns, constrained by page layout dimensions</li>
            <li><strong>Deep Dive Mode:</strong> Full-featured table in dedicated page with no constraints</li>
            <li><strong>Smart Deep Dive:</strong> Rocket icon opens full table in new tab instead of inline mode change</li>
            <li><strong>Always Scrollable:</strong> All modes support vertical scrolling when data exceeds container height</li>
            <li><strong>Column Management:</strong> Sortable, resizable columns (where mode permits)</li>
            <li><strong>Theme Integration:</strong> Automatic light/dark theme support matching your design system</li>
          </ul>
        </div>
      </section>

      {/* Usage Notes */}
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>Implementation Notes</h2>
        <div style={{ color: isDark ? colors.neutral[300] : colors.neutral[700], fontSize: '14px' }}>
          <div style={{
            padding: '16px',
            backgroundColor: isDark ? colors.neutral[800] : colors.neutral[200],
            borderRadius: '6px',
            borderLeft: `4px solid ${colors.primary[500]}`,
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600' }}>Ready for Production Integration:</p>
            <ul style={{ margin: 0, lineHeight: '1.6' }}>
              <li>Replace sample data with your GraphQL/SQL data sources</li>
              <li>Customize column definitions for your specific data models</li>
              <li>Add real filtering and search functionality to the Deep Dive mode</li>
              <li>Implement server-side pagination for large datasets</li>
              <li>Add loading states and error handling for API calls</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 