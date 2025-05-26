'use client';

import React from 'react';
import SnapshotPage from './snapshot/page';

export default function HomePage() {
  return (
    <div className="max-w-[1600px] mx-auto bg-neutral-50 dark:bg-primary-900 min-h-screen">
      <SnapshotPage />
    </div>
  );
}