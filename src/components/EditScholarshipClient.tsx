'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import ScholarshipForm from '@/components/ScholarshipForm';
import { Typography, Breadcrumb } from 'antd';
import { Edit, Home, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const { Title, Text } = Typography;

export default function EditScholarshipClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb 
            items={[
              { title: <Link href="/" className="flex items-center"><Home size={14} className="mr-1" /> Home</Link> },
              { title: <Link href="/admin" className="flex items-center"><LayoutDashboard size={14} className="mr-1" /> Admin</Link> },
              { title: 'Edit Scholarship' },
            ]} 
          />
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Edit size={24} />
            </div>
            <div>
              <Title level={2} className="!mb-0 !text-gray-900">Edit Scholarship</Title>
              <Text className="text-gray-500 text-lg">Modify the scholarship details below. All changes will be updated instantly.</Text>
            </div>
          </div>
        </div>

        <ScholarshipForm id={id} />

        {/* Footer Note */}
        <div className="mt-10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Vidyatraa Admin Panel. Ensure all information is accurate.</p>
        </div>
      </main>
    </div>
  );
}
