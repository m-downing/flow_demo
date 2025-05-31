'use client';

import React from 'react';
import ChartGalleryPage from './chart-gallery/page';

export default function HomePage() {
  return (
    <div className="max-w-[1600px] mx-auto bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <ChartGalleryPage />
    </div>
  );
}