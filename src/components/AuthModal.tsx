'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Form, Input, Button, Divider, App } from 'antd';
import { Mail, Lock, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const router = useRouter();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isOpen) {
      // Use setTimeout to avoid synchronous setState during render cycle which triggers lint error
      const timer = setTimeout(() => {
        setActiveTab(initialTab);
        form.resetFields();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialTab, form]);

  const handleEmailAuth = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      if (activeTab === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;

        // Check role from profiles table (already has the role info)
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user?.id)
          .maybeSingle();

        let isAdmin = profileData?.role === 'admin' || profileData?.role === 'super_admin';

        // Fallback: Check admins table
        if (!isAdmin) {
          const { data: adminRecord } = await supabase
            .from('admins')
            .select('user_id')
            .eq('user_id', data.user?.id)
            .maybeSingle();
          if (adminRecord) isAdmin = true;
        }

        message.success(isAdmin ? 'Welcome back, Admin!' : 'Welcome back!');
        
        // Prefetch for speed
        const targetRoute = isAdmin ? '/admin' : '/dashboard';
        router.prefetch(targetRoute);
        
        onClose();
        router.push(targetRoute);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              full_name: values.fullName,
            },
          },
        });
        if (error) throw error;

        // Upsert into profiles to ensure admin can see them
        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            email: values.email,
            full_name: values.fullName,
            role: 'student'
          });
          if (profileError) console.error("Error creating profile:", profileError);
        }

        // For signup, we usually go to dashboard (unless manually added as admin beforehand)
        message.success('Account created successfully!');
        onClose();
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      const message_text = error instanceof Error ? error.message : 'An unknown error occurred';
      message.error(message_text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      className="auth-modal rounded-2xl overflow-hidden"
      centered
    >
      <div className="p-4">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
            <User size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm">
            Access your scholarship dashboard and personalized matching.
          </p>
        </div>

        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleEmailAuth}
          requiredMark={false}
        >
          {activeTab === 'signup' && (
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input 
                prefix={<User size={18} className="text-gray-400 mr-2" />} 
                placeholder="Full Name" 
                className="h-12 rounded-xl"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input 
              prefix={<Mail size={18} className="text-gray-400 mr-2" />} 
              placeholder="Email Address" 
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password 
              prefix={<Lock size={18} className="text-gray-400 mr-2" />} 
              placeholder="Password" 
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large" 
            loading={loading}
            className="h-12 rounded-xl bg-primary font-bold mt-2"
          >
            {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="text-primary font-bold ml-1 hover:underline"
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
            >
              {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
