'use client';

import { Suspense } from 'react';
import ScholarshipDetailsClient from '@/components/ScholarshipDetailsClient';
import { Spin } from 'antd';

export default function ScholarshipDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading scholarship..." />
      </div>
    }>
      <ScholarshipDetailsClient />
    </Suspense>
  );
}
