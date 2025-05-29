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
  supplier: string;
  warrantyExpiry: string;
  cpuCores: number;
  ramSize: string;
  storageSize: string;
  powerConsumption: number;
  rackUnit: string;
  serviceLevel: string;
  lastMaintenance: string;
  nextMaintenance: string;
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
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-02-15',
    cpuCores: 32,
    ramSize: '128GB',
    storageSize: '2TB NVMe',
    powerConsumption: 750,
    rackUnit: 'A1-R15',
    serviceLevel: 'Premium',
    lastMaintenance: '2023-12-01',
    nextMaintenance: '2024-06-01',
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
    supplier: 'HPE',
    warrantyExpiry: '2027-02-01',
    cpuCores: 24,
    ramSize: '64GB',
    storageSize: '1TB SSD',
    powerConsumption: 650,
    rackUnit: 'B2-R08',
    serviceLevel: 'Standard',
    lastMaintenance: '2023-11-15',
    nextMaintenance: '2024-05-15',
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
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-01-20',
    cpuCores: 40,
    ramSize: '256GB',
    storageSize: '4TB NVMe',
    powerConsumption: 900,
    rackUnit: 'C3-R12',
    serviceLevel: 'Enterprise',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
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
    supplier: 'Super Micro Computer',
    warrantyExpiry: '2027-01-30',
    cpuCores: 16,
    ramSize: '32GB',
    storageSize: '500GB SSD',
    powerConsumption: 450,
    rackUnit: 'D4-R05',
    serviceLevel: 'Basic',
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-06-15',
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
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-01',
    cpuCores: 48,
    ramSize: '512GB',
    storageSize: '8TB NVMe',
    powerConsumption: 1100,
    rackUnit: 'E5-R20',
    serviceLevel: 'Premium',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-01',
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
    supplier: 'HPE',
    warrantyExpiry: '2027-02-25',
    cpuCores: 64,
    ramSize: '1TB',
    storageSize: '16TB NVMe',
    powerConsumption: 1500,
    rackUnit: 'F6-R04',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-08-25',
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
    supplier: 'IBM',
    warrantyExpiry: '2027-01-15',
    cpuCores: 80,
    ramSize: '2TB',
    storageSize: '32TB NVMe',
    powerConsumption: 2000,
    rackUnit: 'G7-R02',
    serviceLevel: 'Enterprise',
    lastMaintenance: '2023-10-01',
    nextMaintenance: '2024-04-01',
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
    supplier: 'Lenovo',
    warrantyExpiry: '2026-12-15',
    cpuCores: 36,
    ramSize: '192GB',
    storageSize: '3TB SSD',
    powerConsumption: 800,
    rackUnit: 'H8-R10',
    serviceLevel: 'Standard',
    lastMaintenance: '2023-12-10',
    nextMaintenance: '2024-06-10',
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
    supplier: 'Dell Technologies',
    warrantyExpiry: '2026-11-01',
    cpuCores: 28,
    ramSize: '96GB',
    storageSize: '1.5TB SSD',
    powerConsumption: 700,
    rackUnit: 'I9-R25',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-07-01',
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
    supplier: 'HPE',
    warrantyExpiry: '2027-02-10',
    cpuCores: 20,
    ramSize: '48GB',
    storageSize: '800GB SSD',
    powerConsumption: 550,
    rackUnit: 'J10-R18',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-08-10',
  },
  // Additional 40 rows
  {
    id: 'SRV-011',
    serverModel: 'Dell PowerEdge R640',
    status: 'manufacturing',
    location: 'New York Data Center',
    orderDate: '2024-02-05',
    expectedDelivery: '2024-03-05',
    priority: 'standard',
    quantity: 8,
    cost: 112000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-05',
    cpuCores: 24,
    ramSize: '64GB',
    storageSize: '1TB SSD',
    powerConsumption: 600,
    rackUnit: 'K11-R08',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-05',
  },
  {
    id: 'SRV-012',
    serverModel: 'HPE ProLiant DL560',
    status: 'ordered',
    location: 'Dallas Data Center',
    orderDate: '2024-02-08',
    expectedDelivery: '2024-03-08',
    priority: 'high',
    quantity: 12,
    cost: 168000,
    supplier: 'HPE',
    warrantyExpiry: '2027-03-08',
    cpuCores: 32,
    ramSize: '128GB',
    storageSize: '2TB NVMe',
    powerConsumption: 850,
    rackUnit: 'L12-R12',
    serviceLevel: 'Premium',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-08',
  },
  {
    id: 'SRV-013',
    serverModel: 'Cisco UCS C220',
    status: 'inTransit',
    location: 'San Francisco Data Center',
    orderDate: '2024-01-28',
    expectedDelivery: '2024-02-28',
    priority: 'critical',
    quantity: 6,
    cost: 84000,
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-02-28',
    cpuCores: 16,
    ramSize: '32GB',
    storageSize: '500GB SSD',
    powerConsumption: 400,
    rackUnit: 'M13-R06',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-08-28',
  },
  {
    id: 'SRV-014',
    serverModel: 'Supermicro Ultra',
    status: 'delivered',
    location: 'Los Angeles Data Center',
    orderDate: '2024-01-18',
    expectedDelivery: '2024-02-18',
    priority: 'standard',
    quantity: 15,
    cost: 195000,
    supplier: 'Super Micro Computer',
    warrantyExpiry: '2027-02-18',
    cpuCores: 20,
    ramSize: '48GB',
    storageSize: '750GB SSD',
    powerConsumption: 500,
    rackUnit: 'N14-R15',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-08-15',
  },
  {
    id: 'SRV-015',
    serverModel: 'Dell PowerEdge R7515',
    status: 'qualityTesting',
    location: 'Houston Data Center',
    orderDate: '2024-02-12',
    expectedDelivery: '2024-03-12',
    priority: 'high',
    quantity: 9,
    cost: 126000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-12',
    cpuCores: 28,
    ramSize: '96GB',
    storageSize: '1.5TB NVMe',
    powerConsumption: 720,
    rackUnit: 'O15-R09',
    serviceLevel: 'Premium',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-12',
  },
  {
    id: 'SRV-016',
    serverModel: 'IBM Power System S922',
    status: 'installing',
    location: 'Detroit Data Center',
    orderDate: '2024-01-22',
    expectedDelivery: '2024-02-22',
    priority: 'critical',
    quantity: 4,
    cost: 180000,
    supplier: 'IBM',
    warrantyExpiry: '2027-02-22',
    cpuCores: 40,
    ramSize: '256GB',
    storageSize: '4TB NVMe',
    powerConsumption: 1000,
    rackUnit: 'P16-R04',
    serviceLevel: 'Enterprise',
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-08-20',
  },
  {
    id: 'SRV-017',
    serverModel: 'Lenovo ThinkSystem SR630',
    status: 'active',
    location: 'Cleveland Data Center',
    orderDate: '2023-12-10',
    expectedDelivery: '2024-01-10',
    priority: 'standard',
    quantity: 22,
    cost: 286000,
    supplier: 'Lenovo',
    warrantyExpiry: '2027-01-10',
    cpuCores: 26,
    ramSize: '78GB',
    storageSize: '1.2TB SSD',
    powerConsumption: 650,
    rackUnit: 'Q17-R22',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-07-05',
  },
  {
    id: 'SRV-018',
    serverModel: 'HPE Apollo 4200',
    status: 'planned',
    location: 'Minneapolis Data Center',
    orderDate: '2024-02-15',
    expectedDelivery: '2024-03-15',
    priority: 'high',
    quantity: 7,
    cost: 98000,
    supplier: 'HPE',
    warrantyExpiry: '2027-03-15',
    cpuCores: 18,
    ramSize: '36GB',
    storageSize: '600GB SSD',
    powerConsumption: 480,
    rackUnit: 'R18-R07',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-15',
  },
  {
    id: 'SRV-019',
    serverModel: 'Dell PowerEdge R450',
    status: 'delayed',
    location: 'Salt Lake City Data Center',
    orderDate: '2024-01-30',
    expectedDelivery: '2024-03-01',
    priority: 'standard',
    quantity: 11,
    cost: 132000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-01',
    cpuCores: 22,
    ramSize: '56GB',
    storageSize: '900GB SSD',
    powerConsumption: 580,
    rackUnit: 'S19-R11',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-01',
  },
  {
    id: 'SRV-020',
    serverModel: 'Cisco UCS C480',
    status: 'readyToShip',
    location: 'Raleigh Data Center',
    orderDate: '2024-02-02',
    expectedDelivery: '2024-03-02',
    priority: 'critical',
    quantity: 5,
    cost: 125000,
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-03-02',
    cpuCores: 44,
    ramSize: '288GB',
    storageSize: '5TB NVMe',
    powerConsumption: 1200,
    rackUnit: 'T20-R05',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-02',
  },
  {
    id: 'SRV-021',
    serverModel: 'Supermicro BigTwin',
    status: 'manufacturing',
    location: 'Tampa Data Center',
    orderDate: '2024-02-18',
    expectedDelivery: '2024-03-18',
    priority: 'high',
    quantity: 14,
    cost: 196000,
    supplier: 'Super Micro Computer',
    warrantyExpiry: '2027-03-18',
    cpuCores: 30,
    ramSize: '120GB',
    storageSize: '2.5TB SSD',
    powerConsumption: 750,
    rackUnit: 'U21-R14',
    serviceLevel: 'Premium',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-18',
  },
  {
    id: 'SRV-022',
    serverModel: 'HPE ProLiant ML350',
    status: 'ordered',
    location: 'Nashville Data Center',
    orderDate: '2024-02-20',
    expectedDelivery: '2024-03-20',
    priority: 'standard',
    quantity: 8,
    cost: 104000,
    supplier: 'HPE',
    warrantyExpiry: '2027-03-20',
    cpuCores: 16,
    ramSize: '32GB',
    storageSize: '500GB SSD',
    powerConsumption: 420,
    rackUnit: 'V22-R08',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-20',
  },
  {
    id: 'SRV-023',
    serverModel: 'Dell PowerEdge T440',
    status: 'inTransit',
    location: 'Kansas City Data Center',
    orderDate: '2024-02-10',
    expectedDelivery: '2024-03-10',
    priority: 'high',
    quantity: 10,
    cost: 130000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-10',
    cpuCores: 24,
    ramSize: '64GB',
    storageSize: '1TB SSD',
    powerConsumption: 600,
    rackUnit: 'W23-R10',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-10',
  },
  {
    id: 'SRV-024',
    serverModel: 'Lenovo ThinkSystem ST650',
    status: 'delivered',
    location: 'Richmond Data Center',
    orderDate: '2024-02-03',
    expectedDelivery: '2024-03-03',
    priority: 'critical',
    quantity: 6,
    cost: 90000,
    supplier: 'Lenovo',
    warrantyExpiry: '2027-03-03',
    cpuCores: 20,
    ramSize: '48GB',
    storageSize: '750GB SSD',
    powerConsumption: 520,
    rackUnit: 'X24-R06',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-09-01',
  },
  {
    id: 'SRV-025',
    serverModel: 'IBM Power System S914',
    status: 'qualityTesting',
    location: 'Charlotte Data Center',
    orderDate: '2024-02-14',
    expectedDelivery: '2024-03-14',
    priority: 'standard',
    quantity: 3,
    cost: 75000,
    supplier: 'IBM',
    warrantyExpiry: '2027-03-14',
    cpuCores: 12,
    ramSize: '24GB',
    storageSize: '300GB SSD',
    powerConsumption: 350,
    rackUnit: 'Y25-R03',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-14',
  },
  {
    id: 'SRV-026',
    serverModel: 'Cisco UCS C125',
    status: 'installing',
    location: 'Buffalo Data Center',
    orderDate: '2024-01-25',
    expectedDelivery: '2024-02-25',
    priority: 'high',
    quantity: 13,
    cost: 169000,
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-02-25',
    cpuCores: 26,
    ramSize: '80GB',
    storageSize: '1.3TB SSD',
    powerConsumption: 680,
    rackUnit: 'Z26-R13',
    serviceLevel: 'Premium',
    lastMaintenance: '2024-02-23',
    nextMaintenance: '2024-08-23',
  },
  {
    id: 'SRV-027',
    serverModel: 'HPE Edgeline EL8000',
    status: 'active',
    location: 'Sacramento Data Center',
    orderDate: '2023-11-20',
    expectedDelivery: '2023-12-20',
    priority: 'standard',
    quantity: 16,
    cost: 208000,
    supplier: 'HPE',
    warrantyExpiry: '2026-12-20',
    cpuCores: 32,
    ramSize: '128GB',
    storageSize: '2TB NVMe',
    powerConsumption: 800,
    rackUnit: 'AA27-R16',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-07-15',
  },
  {
    id: 'SRV-028',
    serverModel: 'Supermicro FatTwin',
    status: 'planned',
    location: 'Albuquerque Data Center',
    orderDate: '2024-02-22',
    expectedDelivery: '2024-03-22',
    priority: 'critical',
    quantity: 4,
    cost: 88000,
    supplier: 'Super Micro Computer',
    warrantyExpiry: '2027-03-22',
    cpuCores: 36,
    ramSize: '192GB',
    storageSize: '3TB NVMe',
    powerConsumption: 950,
    rackUnit: 'BB28-R04',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-22',
  },
  {
    id: 'SRV-029',
    serverModel: 'Dell PowerEdge XR2',
    status: 'delayed',
    location: 'Tucson Data Center',
    orderDate: '2024-02-06',
    expectedDelivery: '2024-03-20',
    priority: 'high',
    quantity: 7,
    cost: 91000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-20',
    cpuCores: 14,
    ramSize: '28GB',
    storageSize: '400GB SSD',
    powerConsumption: 380,
    rackUnit: 'CC29-R07',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-20',
  },
  {
    id: 'SRV-030',
    serverModel: 'Lenovo ThinkSystem SR860',
    status: 'readyToShip',
    location: 'Fresno Data Center',
    orderDate: '2024-02-16',
    expectedDelivery: '2024-03-16',
    priority: 'standard',
    quantity: 9,
    cost: 117000,
    supplier: 'Lenovo',
    warrantyExpiry: '2027-03-16',
    cpuCores: 18,
    ramSize: '42GB',
    storageSize: '650GB SSD',
    powerConsumption: 490,
    rackUnit: 'DD30-R09',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-16',
  },
  {
    id: 'SRV-031',
    serverModel: 'HPE ProLiant BL460c',
    status: 'manufacturing',
    location: 'Spokane Data Center',
    orderDate: '2024-02-24',
    expectedDelivery: '2024-03-24',
    priority: 'critical',
    quantity: 12,
    cost: 156000,
    supplier: 'HPE',
    warrantyExpiry: '2027-03-24',
    cpuCores: 24,
    ramSize: '72GB',
    storageSize: '1.1TB SSD',
    powerConsumption: 620,
    rackUnit: 'EE31-R12',
    serviceLevel: 'Premium',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-24',
  },
  {
    id: 'SRV-032',
    serverModel: 'Cisco UCS C240 M6',
    status: 'ordered',
    location: 'Boise Data Center',
    orderDate: '2024-02-26',
    expectedDelivery: '2024-03-26',
    priority: 'high',
    quantity: 5,
    cost: 75000,
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-03-26',
    cpuCores: 16,
    ramSize: '32GB',
    storageSize: '500GB SSD',
    powerConsumption: 450,
    rackUnit: 'FF32-R05',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-26',
  },
  {
    id: 'SRV-033',
    serverModel: 'Dell PowerEdge R6515',
    status: 'inTransit',
    location: 'Billings Data Center',
    orderDate: '2024-02-11',
    expectedDelivery: '2024-03-11',
    priority: 'standard',
    quantity: 8,
    cost: 104000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-11',
    cpuCores: 20,
    ramSize: '56GB',
    storageSize: '850GB SSD',
    powerConsumption: 570,
    rackUnit: 'GG33-R08',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-11',
  },
  {
    id: 'SRV-034',
    serverModel: 'IBM LinuxONE III',
    status: 'delivered',
    location: 'Cheyenne Data Center',
    orderDate: '2024-01-12',
    expectedDelivery: '2024-02-12',
    priority: 'critical',
    quantity: 2,
    cost: 600000,
    supplier: 'IBM',
    warrantyExpiry: '2027-02-12',
    cpuCores: 96,
    ramSize: '4TB',
    storageSize: '64TB NVMe',
    powerConsumption: 3000,
    rackUnit: 'HH34-R02',
    serviceLevel: 'Enterprise',
    lastMaintenance: '2024-02-10',
    nextMaintenance: '2024-08-10',
  },
  {
    id: 'SRV-035',
    serverModel: 'Supermicro GPU Server',
    status: 'qualityTesting',
    location: 'Fargo Data Center',
    orderDate: '2024-02-13',
    expectedDelivery: '2024-03-13',
    priority: 'high',
    quantity: 6,
    cost: 240000,
    supplier: 'Super Micro Computer',
    warrantyExpiry: '2027-03-13',
    cpuCores: 48,
    ramSize: '256GB',
    storageSize: '8TB NVMe',
    powerConsumption: 1800,
    rackUnit: 'II35-R06',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-13',
  },
  {
    id: 'SRV-036',
    serverModel: 'Lenovo ThinkSystem SD530',
    status: 'installing',
    location: 'Sioux Falls Data Center',
    orderDate: '2024-02-04',
    expectedDelivery: '2024-03-04',
    priority: 'standard',
    quantity: 11,
    cost: 143000,
    supplier: 'Lenovo',
    warrantyExpiry: '2027-03-04',
    cpuCores: 22,
    ramSize: '66GB',
    storageSize: '1TB SSD',
    powerConsumption: 590,
    rackUnit: 'JJ36-R11',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-03-02',
    nextMaintenance: '2024-09-02',
  },
  {
    id: 'SRV-037',
    serverModel: 'HPE Cloudline CL2200',
    status: 'active',
    location: 'Madison Data Center',
    orderDate: '2023-12-28',
    expectedDelivery: '2024-01-28',
    priority: 'critical',
    quantity: 14,
    cost: 182000,
    supplier: 'HPE',
    warrantyExpiry: '2027-01-28',
    cpuCores: 28,
    ramSize: '112GB',
    storageSize: '2.2TB SSD',
    powerConsumption: 740,
    rackUnit: 'KK37-R14',
    serviceLevel: 'Premium',
    lastMaintenance: '2024-01-25',
    nextMaintenance: '2024-07-25',
  },
  {
    id: 'SRV-038',
    serverModel: 'Cisco UCS S3260',
    status: 'planned',
    location: 'Des Moines Data Center',
    orderDate: '2024-02-28',
    expectedDelivery: '2024-03-28',
    priority: 'high',
    quantity: 3,
    cost: 69000,
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-03-28',
    cpuCores: 12,
    ramSize: '24GB',
    storageSize: '300GB SSD',
    powerConsumption: 340,
    rackUnit: 'LL38-R03',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-28',
  },
  {
    id: 'SRV-039',
    serverModel: 'Dell PowerEdge C6420',
    status: 'delayed',
    location: 'Omaha Data Center',
    orderDate: '2024-02-07',
    expectedDelivery: '2024-03-21',
    priority: 'standard',
    quantity: 10,
    cost: 150000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-21',
    cpuCores: 30,
    ramSize: '120GB',
    storageSize: '2.4TB SSD',
    powerConsumption: 760,
    rackUnit: 'MM39-R10',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-21',
  },
  {
    id: 'SRV-040',
    serverModel: 'Supermicro MicroCloud',
    status: 'readyToShip',
    location: 'Lincoln Data Center',
    orderDate: '2024-02-19',
    expectedDelivery: '2024-03-19',
    priority: 'critical',
    quantity: 7,
    cost: 105000,
    supplier: 'Super Micro Computer',
    warrantyExpiry: '2027-03-19',
    cpuCores: 42,
    ramSize: '224GB',
    storageSize: '4.2TB NVMe',
    powerConsumption: 1100,
    rackUnit: 'NN40-R07',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-19',
  },
  {
    id: 'SRV-041',
    serverModel: 'HPE Synergy 480',
    status: 'manufacturing',
    location: 'Topeka Data Center',
    orderDate: '2024-03-01',
    expectedDelivery: '2024-03-31',
    priority: 'high',
    quantity: 8,
    cost: 120000,
    supplier: 'HPE',
    warrantyExpiry: '2027-03-31',
    cpuCores: 24,
    ramSize: '72GB',
    storageSize: '1.2TB SSD',
    powerConsumption: 640,
    rackUnit: 'OO41-R08',
    serviceLevel: 'Premium',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-30',
  },
  {
    id: 'SRV-042',
    serverModel: 'Lenovo ThinkSystem SR570',
    status: 'ordered',
    location: 'Wichita Data Center',
    orderDate: '2024-02-25',
    expectedDelivery: '2024-03-25',
    priority: 'standard',
    quantity: 9,
    cost: 126000,
    supplier: 'Lenovo',
    warrantyExpiry: '2027-03-25',
    cpuCores: 18,
    ramSize: '54GB',
    storageSize: '900GB SSD',
    powerConsumption: 540,
    rackUnit: 'PP42-R09',
    serviceLevel: 'Standard',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-25',
  },
  {
    id: 'SRV-043',
    serverModel: 'Cisco UCS C460',
    status: 'inTransit',
    location: 'Oklahoma City Data Center',
    orderDate: '2024-02-17',
    expectedDelivery: '2024-03-17',
    priority: 'critical',
    quantity: 4,
    cost: 96000,
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-03-17',
    cpuCores: 32,
    ramSize: '160GB',
    storageSize: '3.2TB NVMe',
    powerConsumption: 980,
    rackUnit: 'QQ43-R04',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-17',
  },
  {
    id: 'SRV-044',
    serverModel: 'Dell PowerEdge R350',
    status: 'delivered',
    location: 'Little Rock Data Center',
    orderDate: '2024-02-09',
    expectedDelivery: '2024-03-09',
    priority: 'high',
    quantity: 13,
    cost: 169000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-09',
    cpuCores: 26,
    ramSize: '78GB',
    storageSize: '1.3TB SSD',
    powerConsumption: 650,
    rackUnit: 'RR44-R13',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-03-07',
    nextMaintenance: '2024-09-07',
  },
  {
    id: 'SRV-045',
    serverModel: 'IBM Power System H924',
    status: 'qualityTesting',
    location: 'Jackson Data Center',
    orderDate: '2024-02-21',
    expectedDelivery: '2024-03-21',
    priority: 'standard',
    quantity: 2,
    cost: 380000,
    supplier: 'IBM',
    warrantyExpiry: '2027-03-21',
    cpuCores: 72,
    ramSize: '1.5TB',
    storageSize: '24TB NVMe',
    powerConsumption: 1800,
    rackUnit: 'SS45-R02',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-21',
  },
  {
    id: 'SRV-046',
    serverModel: 'Supermicro TwinPro',
    status: 'installing',
    location: 'Memphis Data Center',
    orderDate: '2024-02-15',
    expectedDelivery: '2024-03-15',
    priority: 'critical',
    quantity: 6,
    cost: 114000,
    supplier: 'Super Micro Computer',
    warrantyExpiry: '2027-03-15',
    cpuCores: 38,
    ramSize: '152GB',
    storageSize: '3.8TB SSD',
    powerConsumption: 920,
    rackUnit: 'TT46-R06',
    serviceLevel: 'Premium',
    lastMaintenance: '2024-03-13',
    nextMaintenance: '2024-09-13',
  },
  {
    id: 'SRV-047',
    serverModel: 'HPE ProLiant DL325',
    status: 'active',
    location: 'Mobile Data Center',
    orderDate: '2023-12-15',
    expectedDelivery: '2024-01-15',
    priority: 'high',
    quantity: 15,
    cost: 195000,
    supplier: 'HPE',
    warrantyExpiry: '2027-01-15',
    cpuCores: 20,
    ramSize: '60GB',
    storageSize: '1TB SSD',
    powerConsumption: 580,
    rackUnit: 'UU47-R15',
    serviceLevel: 'Standard',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
  },
  {
    id: 'SRV-048',
    serverModel: 'Lenovo ThinkAgile HX3320',
    status: 'planned',
    location: 'Birmingham Data Center',
    orderDate: '2024-03-02',
    expectedDelivery: '2024-04-01',
    priority: 'standard',
    quantity: 5,
    cost: 85000,
    supplier: 'Lenovo',
    warrantyExpiry: '2027-04-01',
    cpuCores: 16,
    ramSize: '48GB',
    storageSize: '800GB SSD',
    powerConsumption: 520,
    rackUnit: 'VV48-R05',
    serviceLevel: 'Basic',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-10-01',
  },
  {
    id: 'SRV-049',
    serverModel: 'Cisco UCS C245',
    status: 'delayed',
    location: 'Huntsville Data Center',
    orderDate: '2024-02-23',
    expectedDelivery: '2024-04-05',
    priority: 'critical',
    quantity: 8,
    cost: 152000,
    supplier: 'Cisco Systems',
    warrantyExpiry: '2027-04-05',
    cpuCores: 34,
    ramSize: '136GB',
    storageSize: '2.7TB NVMe',
    powerConsumption: 850,
    rackUnit: 'WW49-R08',
    serviceLevel: 'Enterprise',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-10-05',
  },
  {
    id: 'SRV-050',
    serverModel: 'Dell PowerEdge R7625',
    status: 'readyToShip',
    location: 'Montgomery Data Center',
    orderDate: '2024-02-27',
    expectedDelivery: '2024-03-27',
    priority: 'high',
    quantity: 12,
    cost: 204000,
    supplier: 'Dell Technologies',
    warrantyExpiry: '2027-03-27',
    cpuCores: 40,
    ramSize: '200GB',
    storageSize: '5TB NVMe',
    powerConsumption: 1200,
    rackUnit: 'XX50-R12',
    serviceLevel: 'Premium',
    lastMaintenance: 'N/A',
    nextMaintenance: '2024-09-27',
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
    // New columns
    {
      id: 'supplier',
      header: 'Supplier',
      accessorKey: 'supplier',
      width: 160,
      sortable: true,
    },
    {
      id: 'warrantyExpiry',
      header: 'Warranty Expiry',
      accessorKey: 'warrantyExpiry',
      width: 130,
      sortable: true,
    },
    {
      id: 'cpuCores',
      header: 'CPU Cores',
      accessorKey: 'cpuCores',
      width: 100,
      sortable: true,
      cell: (value) => `${value} cores`,
    },
    {
      id: 'ramSize',
      header: 'RAM Size',
      accessorKey: 'ramSize',
      width: 100,
      sortable: true,
    },
    {
      id: 'storageSize',
      header: 'Storage Size',
      accessorKey: 'storageSize',
      width: 120,
      sortable: true,
    },
    {
      id: 'powerConsumption',
      header: 'Power (W)',
      accessorKey: 'powerConsumption',
      width: 100,
      sortable: true,
      cell: (value) => `${value}W`,
    },
    {
      id: 'rackUnit',
      header: 'Rack Unit',
      accessorKey: 'rackUnit',
      width: 110,
      sortable: true,
    },
    {
      id: 'serviceLevel',
      header: 'Service Level',
      accessorKey: 'serviceLevel',
      width: 120,
      sortable: true,
      cell: (value) => {
        const serviceLevelColors = {
          Basic: badgeColors.standard,
          Standard: badgeColors.ordered,
          Premium: badgeColors.highPriority,
          Enterprise: badgeColors.critical,
        };
        
        const colorConfig = serviceLevelColors[value as keyof typeof serviceLevelColors] || badgeColors.standard;
        
        return (
          <span
            style={{
              backgroundColor: colorConfig.bg,
              color: colorConfig.text,
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      id: 'lastMaintenance',
      header: 'Last Maintenance',
      accessorKey: 'lastMaintenance',
      width: 140,
      sortable: true,
    },
    {
      id: 'nextMaintenance',
      header: 'Next Maintenance',
      accessorKey: 'nextMaintenance',
      width: 140,
      sortable: true,
    },
  ];

  // Custom item renderer for ListView
  const renderListItem = (item: ServerRecord, index: number) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: isDark ? colors.neutral[50] : colors.neutral[800] }}>
          {item.serverModel}
        </h4>
        <span style={{ fontSize: '12px', color: isDark ? colors.neutral[300] : colors.neutral[600] }}>
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
    backgroundColor: isDark ? colors.primary[900] : colors.neutral[50],
    minHeight: '100vh',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '48px',
  };

  const headerStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[50] : colors.neutral[900],
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '24px',
  };

  const subHeaderStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[50] : colors.neutral[800],
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
  };

  const descriptionStyle: React.CSSProperties = {
    color: isDark ? colors.neutral[300] : colors.neutral[600],
    fontSize: '14px',
    marginBottom: '16px',
    maxWidth: '800px',
    lineHeight: '1.5',
  };

  const demoContainerStyle: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: isDark ? colors.primary[800] : colors.neutral[100],
    borderRadius: '8px',
    border: `1px solid ${isDark ? colors.primary[600] : colors.neutral[200]}`,
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
            backgroundColor: isDark ? colors.primary[800] : colors.neutral[200],
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