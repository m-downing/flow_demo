'use client';

import React from 'react';
import { PageContainer, Card } from '@/design-system/layout';

export default function BrokeragePage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-50 mb-2">
          Brokerage
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          OCULUS Brokerage Management System
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-neutral-700 dark:text-neutral-200 mb-2">
            Brokerage Dashboard Coming Soon
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            This section will contain brokerage analytics and management tools.
          </p>
        </div>
      </Card>
    </PageContainer>
  );
} 