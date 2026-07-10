'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button, Drawer, Space, Dropdown, MenuProps } from 'antd';
import { Menu as MenuIcon, User as UserIcon, X, Search, Bookmark, Bell, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import AuthModal from './AuthModal';
import { supabase } from '@/lib/supabase';

import Image from 'next/image';

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [visible, setVisible] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; tab: 'login' | 'signup' }>({ open: false, tab: 'login' });

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';

  const menuItems = [
    { label: 'Home', href: '/', icon: null },
    { label: 'About Us', href: '/about', icon: null },
    { label: 'Courses', href: '/courses', icon: null },
    { label: 'Internships', href: '/internships', icon: null },
    { label: 'Eligibility Checker', href: '/eligibility', icon: <Bell size={18} /> },
    { label: 'Find Scholarships', href: '/search', icon: <Search size={18} /> },
    { label: 'Contact Us', href: '/contact', icon: null },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: <Link href={isAdmin ? "/admin" : "/dashboard"}>Dashboard</Link>,
      icon: isAdmin ? <Shield size={16} className="text-primary" /> : <LayoutDashboard size={16} />,
    },
    {
      key: 'profile',
      label: <Link href="/profile">Profile</Link>,
      icon: <UserIcon size={16} />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogOut size={16} />,
      danger: true,
      onClick: () => signOut(),
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Vidyatraa Logo" 
              width={240} 
              height={80} 
              className="object-contain h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <Space size="middle">
                <Link href="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  <Bookmark size={20} />
                </Link>
                <Link href="/notifications" className="text-gray-600 hover:text-primary transition-colors">
                  <Bell size={20} />
                </Link>
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                  <Button 
                    type="primary" 
                    shape="circle" 
                    icon={<UserIcon size={18} />} 
                    className="flex items-center justify-center bg-primary"
                  />
                </Dropdown>
              </Space>
            ) : (
              <Space>
                <Button 
                  type="text" 
                  className="font-semibold"
                  onClick={() => setAuthModal({ open: true, tab: 'login' })}
                >
                  Login
                </Button>
                <Button 
                  type="primary" 
                  className="bg-primary hover:bg-primary/90 rounded-xl"
                  onClick={() => setAuthModal({ open: true, tab: 'signup' })}
                >
                  Join Now
                </Button>
              </Space>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
              <Link href="/notifications" className="text-gray-600">
                <Bell size={20} />
              </Link>
            )}
            <button
              onClick={() => setVisible(true)}
              className="text-gray-600 hover:text-primary"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        closeIcon={<X size={20} />}
      >
        <div className="flex flex-col space-y-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 text-lg font-medium text-gray-700"
              onClick={() => setVisible(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <hr className="border-gray-100" />
          {user ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="text-lg font-medium text-primary flex items-center space-x-3" onClick={() => setVisible(false)}>
                  <Shield size={20} />
                  <span>Admin Panel</span>
                </Link>
              )}
              <Link href="/dashboard" className="text-lg font-medium text-gray-700" onClick={() => setVisible(false)}>Dashboard</Link>
              <Link href="/profile" className="text-lg font-medium text-gray-700" onClick={() => setVisible(false)}>Profile</Link>
              <Button danger block size="large" onClick={() => { signOut(); setVisible(false); }}>Logout</Button>
            </>
          ) : (
            <div className="flex flex-col space-y-3">
              <Button 
                block 
                size="large"
                onClick={() => { setAuthModal({ open: true, tab: 'login' }); setVisible(false); }}
              >
                Login
              </Button>
              <Button 
                type="primary" 
                block 
                size="large"
                className="bg-primary"
                onClick={() => { setAuthModal({ open: true, tab: 'signup' }); setVisible(false); }}
              >
                Join Now
              </Button>
            </div>
          )}
        </div>
      </Drawer>

      <AuthModal 
        isOpen={authModal.open} 
        onClose={() => setAuthModal({ ...authModal, open: false })} 
        initialTab={authModal.tab}
      />
    </nav>
  );
};

export default Navbar;
