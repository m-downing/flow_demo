import { BacklogItem } from './BacklogTable';

// Mock data for backlogs
export const backlogItems: BacklogItem[] = [
  {
    id: 1,
    dataCenter: 'NYC-EAST-12',
    rackType: 'Compute',
    equipmentType: 'High-Performance Servers',
    region: 'NAM',
    quantity: 15,
    requestDate: '2023-08-15',
    expectedDelivery: '2023-11-30',
    delay: 25,
    status: 'manufacturing',
    priority: 'critical'
  },
  {
    id: 2,
    dataCenter: 'LONDON-WEST-07',
    rackType: 'Network',
    equipmentType: 'Core Switches',
    region: 'EMEA',
    quantity: 8,
    requestDate: '2023-09-03',
    expectedDelivery: '2023-12-15',
    delay: 12,
    status: 'orderPlaced',
    priority: 'high'
  },
  {
    id: 3,
    dataCenter: 'SINGAPORE-03',
    rackType: 'Storage',
    equipmentType: 'Flash Arrays',
    region: 'APAC',
    quantity: 10,
    requestDate: '2023-08-20',
    expectedDelivery: '2023-12-05',
    delay: 18,
    status: 'shipping',
    priority: 'high'
  },
  {
    id: 4,
    dataCenter: 'FRANKFURT-01',
    rackType: 'Compute',
    equipmentType: 'GPU Servers',
    region: 'EMEA',
    quantity: 5,
    requestDate: '2023-09-10',
    expectedDelivery: '2023-11-25',
    delay: 0,
    status: 'manufacturing',
    priority: 'medium'
  },
  {
    id: 5,
    dataCenter: 'NYC-WEST-08',
    rackType: 'Storage',
    equipmentType: 'Object Storage Arrays',
    region: 'NAM',
    quantity: 12,
    requestDate: '2023-07-25',
    expectedDelivery: '2023-11-20',
    delay: 45,
    status: 'blocked',
    priority: 'critical',
    blockerReason: 'Component shortage from manufacturer'
  },
  {
    id: 6,
    dataCenter: 'TOKYO-01',
    rackType: 'Network',
    equipmentType: 'Edge Routers',
    region: 'APAC',
    quantity: 6,
    requestDate: '2023-08-05',
    expectedDelivery: '2023-12-10',
    delay: 15,
    status: 'customs',
    priority: 'high'
  },
  {
    id: 7,
    dataCenter: 'SYDNEY-02',
    rackType: 'Compute',
    equipmentType: 'Blade Servers',
    region: 'APAC',
    quantity: 20,
    requestDate: '2023-09-15',
    expectedDelivery: '2023-12-20',
    delay: 5,
    status: 'orderPlaced',
    priority: 'medium'
  },
  {
    id: 8,
    dataCenter: 'SAO-PAULO-01',
    rackType: 'Storage',
    equipmentType: 'Backup Appliances',
    region: 'LATAM',
    quantity: 8,
    requestDate: '2023-08-30',
    expectedDelivery: '2023-11-28',
    delay: 30,
    status: 'blocked',
    priority: 'high',
    blockerReason: 'Import regulations changed, requires new certification'
  }
]; 