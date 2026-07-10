'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import ProfileForm from '@/components/ProfileForm';
import { Card, Typography, Breadcrumb } from 'antd';
import { User, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb 
            items={[
              { title: <Link href="/" className="flex items-center"><Home size={14} className="mr-1" /> Home</Link> },
              { title: <Link href="/dashboard">Dashboard</Link> },
              { title: 'Profile' },
            ]} 
          />
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <User size={24} />
            </div>
            <div>
              <Title level={2} className="!mb-0 !text-gray-900">Complete Your Profile</Title>
              <Text className="text-gray-500 text-lg">Help us find the perfect scholarships for your dreams.</Text>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="rounded-3xl border-none shadow-sm overflow-hidden p-2 sm:p-6 lg:p-10 bg-white">
          <div className="mb-10 pb-8 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Student Information</h3>
            <p className="text-gray-500">Your information is secure and used only for matching you with the right opportunities.</p>
          </div>
          
          <ProfileForm />
        </Card>

        {/* Footer Note */}
        <div className="mt-10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Vidyatraa Platform. All student data is encrypted and handled with care.</p>
        </div>
      </main>
    </div>
  );
}
