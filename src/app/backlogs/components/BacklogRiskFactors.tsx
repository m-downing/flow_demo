import React from 'react';

const BacklogRiskFactors: React.FC = () => {
  return (
    <div className="bg-white dark:bg-primary-800 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h6 className="text-lg font-medium text-neutral-800 dark:text-neutral-50">
            Supply Chain Risk Factors
          </h6>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-neutral-50 dark:bg-primary-900 rounded-lg border border-neutral-200 dark:border-primary-600">
          <h6 className="text-sm font-medium text-red-700 dark:text-red-400">Component Shortages</h6>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Global shortage of specific processor models is affecting manufacturing of compute racks.
            Estimated impact: 15-20 day delay for high-performance servers.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 dark:bg-primary-900 rounded-lg border border-neutral-200 dark:border-primary-600">
          <h6 className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Shipping Delays</h6>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Congestion at major Asian ports is affecting shipping times to NAM and EMEA regions.
            Average additional delay: 10-12 days for equipment from APAC manufacturers.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 dark:bg-primary-900 rounded-lg border border-neutral-200 dark:border-primary-600">
          <h6 className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Import Regulations</h6>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            New security regulations for network equipment in LATAM region require additional certification.
            Process adds approximately 18-25 days to customs clearance.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 dark:bg-primary-900 rounded-lg border border-neutral-200 dark:border-primary-600">
          <h6 className="text-sm font-medium text-green-700 dark:text-green-400">Manufacturing Capacity</h6>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Primary storage equipment manufacturer has increased production capacity.
            Expected to reduce manufacturing delays by 30% starting next month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BacklogRiskFactors; 