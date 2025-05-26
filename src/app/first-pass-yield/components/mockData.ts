// Define interfaces
export interface QueueChartData {
  name: string;
  workstation: string;
  currentSize: number;
  yesterdaySize: number;
  change: number;
  status: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
}

export interface RackData {
  id: string;
  name: string;
  station: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Complete';
  passingRate: number;
  needByDate: string;
  startDate: string;
  republishEvents: number;
  additionalRequests: number;
  notes: string;
}

// Mock data arrays
export const workstationData = [
  { name: 'Assembly', timely: 85, delayed: 12, critical: 3 },
  { name: 'Config', timely: 78, delayed: 18, critical: 4 },
  { name: 'Test', timely: 92, delayed: 6, critical: 2 },
  { name: 'QA', timely: 88, delayed: 9, critical: 3 },
  { name: 'Deploy', timely: 82, delayed: 15, critical: 3 },
];

export const fpyData = [
  { name: 'Assembly', passingRate: 92, republishEvents: 5, additionalRequests: 3 },
  { name: 'Config', passingRate: 88, republishEvents: 7, additionalRequests: 5 },
  { name: 'Test', passingRate: 95, republishEvents: 3, additionalRequests: 2 },
  { name: 'QA', passingRate: 96, republishEvents: 2, additionalRequests: 2 },
  { name: 'Deploy', passingRate: 90, republishEvents: 6, additionalRequests: 4 },
];

export const throughputData = [
  { name: 'Week 1', unitsPerDay: 18, cumulativeUnits: 18 },
  { name: 'Week 2', unitsPerDay: 22, cumulativeUnits: 40 },
  { name: 'Week 3', unitsPerDay: 25, cumulativeUnits: 65 },
  { name: 'Week 4', unitsPerDay: 20, cumulativeUnits: 85 },
  { name: 'Week 5', unitsPerDay: 28, cumulativeUnits: 113 },
  { name: 'Week 6', unitsPerDay: 32, cumulativeUnits: 145 },
];

export const queueData: QueueChartData[] = [
  { name: 'Assembly', workstation: 'Assembly', currentSize: 12, yesterdaySize: 15, change: -3, status: 'success' },
  { name: 'Config', workstation: 'Config', currentSize: 18, yesterdaySize: 14, change: 4, status: 'warning' },
  { name: 'Test', workstation: 'Test', currentSize: 8, yesterdaySize: 7, change: 1, status: 'neutral' },
  { name: 'QA', workstation: 'QA', currentSize: 5, yesterdaySize: 9, change: -4, status: 'success' },
  { name: 'Deploy', workstation: 'Deploy', currentSize: 22, yesterdaySize: 16, change: 6, status: 'error' },
];

// Generate rack data
export const rackData = (() => {
  const data: RackData[] = [];
  const statuses: RackData['status'][] = ['On Track', 'At Risk', 'Delayed', 'Complete'];
  const workstationNames = workstationData.map(d => d.name);

  for (let i = 0; i < 30; i++) {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (Math.floor(Math.random() * 30) + 1));
    const needByDate = new Date(today);
    needByDate.setDate(today.getDate() + (Math.floor(Math.random() * 21) + 5));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    data.push({
      id: `RACK-${1000 + i}`,
      name: `Rack ${1000 + i}`,
      station: workstationNames[i % workstationNames.length],
      status,
      passingRate: 75 + Math.floor(Math.random() * 25),
      needByDate: needByDate.toISOString().split('T')[0],
      startDate: startDate.toISOString().split('T')[0],
      republishEvents: Math.floor(Math.random() * 8),
      additionalRequests: Math.floor(Math.random() * 10),
      notes: status === 'At Risk' || status === 'Delayed' ? 'Issue noted' : '',
    });
  }

  return data;
})(); 