import React, { useState, useMemo, useCallback } from 'react';
import { AGDataTable, AGColumnDef } from '@/design-system/DataTable';
import Badge from '@/design-system/components/feedback/Badge';
import ContactModal from './ContactModal';
import { ICellRendererParams } from 'ag-grid-community';
import { AlertItem, BadgeVariant } from './types';

// Mock data for alerts
const alertData: AlertItem[] = [
  { 
    id: 1, sctId: 'SCT-001', severity: 'critical', message: 'Power capacity threshold exceeded', location: 'NYC-EAST-12', timestamp: '2023-10-30 09:15:22',
    contacts: [
      { name: 'Alice Wonderland', email: 'alice.w@example.com', phone: '555-0101', role: 'DC Operations Lead' },
      { name: 'Bob The Builder', email: 'bob.b@example.com', phone: '555-0102', role: 'Power Systems SME' }
    ]
  },
  { 
    id: 2, sctId: 'SCT-002', severity: 'warning', message: 'Storage rack delivery delayed', location: 'LONDON-WEST-07', timestamp: '2023-10-30 08:30:45',
    contacts: [
      { name: 'Carol Danvers', email: 'carol.d@example.com', phone: '555-0103', role: 'Logistics Coordinator' },
      { name: 'Dave Lister', email: 'dave.l@example.com', phone: '555-0104', role: 'Regional Manager EMEA' }
    ]
  },
  { 
    id: 3, sctId: 'SCT-003', severity: 'update', message: 'Quarterly capacity forecast updated', location: 'ALL', timestamp: '2023-10-30 07:25:10',
    contacts: [
      { name: 'Eve Polastri', email: 'eve.p@example.com', phone: '555-0105', role: 'Analytics Team' },
      { name: 'Frank Drebin', email: 'frank.d@example.com', phone: '555-0106', role: 'Reporting Lead' }
    ]
  },
  { 
    id: 4, sctId: 'SCT-004', severity: 'warning', message: 'Cooling system maintenance scheduled', location: 'SINGAPORE-04', timestamp: '2023-10-29 18:45:33',
    contacts: [
      { name: 'Grace Hopper', email: 'grace.h@example.com', phone: '555-0107', role: 'Facilities APAC' },
      { name: 'Hank Hill', email: 'hank.h@example.com', phone: '555-0108', role: 'HVAC Specialist' }
    ]
  },
  { 
    id: 5, sctId: 'SCT-005', severity: 'critical', message: 'Network rack inventory below threshold', location: 'FRANKFURT-01', timestamp: '2023-10-29 15:20:18',
    contacts: [
      { name: 'Ivy Benson', email: 'ivy.b@example.com', phone: '555-0109', role: 'Network Inventory Manager' },
      { name: 'Jack Burton', email: 'jack.b@example.com', phone: '555-0110', role: 'Procurement Officer' }
    ]
  },
];

const CriticalAlertsTable: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentAlertForContacts, setCurrentAlertForContacts] = useState<AlertItem | null>(null);
  
  const handleOpenContactModal = useCallback((alert: AlertItem) => {
    setCurrentAlertForContacts(alert);
    setIsContactModalOpen(true);
  }, []);

  const handleCloseContactModal = useCallback(() => {
    setIsContactModalOpen(false);
    setCurrentAlertForContacts(null);
  }, []);

  const alertColumns = useMemo((): AGColumnDef<AlertItem>[] => [
    {
      field: 'severity',
      title: 'Severity',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => {
        const row = params.data as AlertItem;
        let badgeVariant: BadgeVariant;
        switch(row.severity) {
          case 'critical': badgeVariant = 'critical'; break;
          case 'warning': badgeVariant = 'atRisk'; break;
          case 'update': badgeVariant = 'standard'; break;
          default: badgeVariant = 'standard';
        }
        return <Badge variant={badgeVariant} size="small">{row.severity.toUpperCase()}</Badge>;
      }
    },
    {
      field: 'sctId',
      title: 'SCT ID',
      width: 100,
      cellRenderer: (params: ICellRendererParams) => {
        const row = params.data as AlertItem;
        return (
          <span 
            onClick={() => navigator.clipboard.writeText(row.sctId)}
            title="Copy SCT ID"
          >
            {row.sctId}
          </span>
        );
      }
    },
    {
      field: 'message',
      title: 'Occurrence',
      width: 300,
      cellRenderer: (params: ICellRendererParams) => {
        const row = params.data as AlertItem;
        return row.message;
      }
    },
    {
      field: 'location',
      title: 'Location',
      width: 140,
      cellRenderer: (params: ICellRendererParams) => {
        const row = params.data as AlertItem;
        return row.location;
      }
    },
    {
      field: 'timestamp',
      title: 'Event Date',
      width: 180,
      cellRenderer: (params: ICellRendererParams) => {
        const row = params.data as AlertItem;
        return row.timestamp;
      }
    },
    {
      field: 'resolutionLog',
      title: 'Resolution Log',
      width: 140,
      cellRenderer: (params: ICellRendererParams) => {
        const row = params.data as AlertItem;
        return (
          <div className="flex justify-center items-center h-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 cursor-pointer hover:opacity-75"
              onClick={() => handleOpenContactModal(row)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
        );
      }
    }
  ], [handleOpenContactModal]);

  return (
    <>
      <div className="md:col-span-12"> 
        <div className="bg-white dark:bg-primary-800 shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Critical Alerts
            </h6>
            <button className="px-3 py-1 border border-neutral-300 rounded-md text-sm font-medium text-primary-600 hover:bg-neutral-50 dark:text-neutral-50 dark:hover:bg-primary-600">View All</button>
          </div>
          <div className="w-full overflow-x-auto">
            <AGDataTable 
              columns={alertColumns} 
              data={alertData} 
              mode="deepDive" 
              maxSummaryColumns={5}
              maxRows={5}
              heightVariant="comfortable"
              width="100%"
            />
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        alert={currentAlertForContacts}
      />
    </>
  );
};

export default CriticalAlertsTable; 