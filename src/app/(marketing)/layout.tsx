'use client';

import React from 'react';
import Navbar from '@/components/NavbarVidyatraa';
import Footer from '@/components/FooterVidyatraa';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-slate-800 font-sans selection:bg-blue-500/20 selection:text-blue-900">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
