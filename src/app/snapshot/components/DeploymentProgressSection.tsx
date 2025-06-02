import React from 'react';
import { ProgressTracker } from '@/design-system/charts';
import Card from '@/design-system/layout/Card';

const DeploymentProgressSection: React.FC = () => {
  return (
    <div className="md:col-span-4">
      <Card
        title="Key Deployment Progress"
        subtitle="Major data center expansion initiatives"
        shadowLevel="sm"
        fullHeight={true}
        headerSpacing="2"
      >
        <div className="grid grid-cols-2 gap-4 mb-2">
          <ProgressTracker value={75} label="Frankfurt Expansion" status="success" mode="deepDive" />
          <ProgressTracker value={33} label="Singapore Phase 2" status="warning" mode="deepDive" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ProgressTracker value={90} label="NYC West Migration" status="warning" mode="deepDive" />
          <ProgressTracker value={15} label="London Retrofit" status="error" mode="deepDive" />
        </div>
      </Card>
    </div>
  );
};

export default DeploymentProgressSection; 