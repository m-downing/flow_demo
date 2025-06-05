'use client';

import React from 'react';
import { PageContainer } from '@/design-system/layout';

export default function HomePage() {
  return (
    <PageContainer>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            HELIUS
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Coming Soon
          </p>
        </div>
      </div>
    </PageContainer>
  );
}