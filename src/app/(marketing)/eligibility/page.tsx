'use client';

import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Button, Card, Steps, Result, Typography, Space } from 'antd';
import { CheckCircle2, Search, ArrowRight, User, MapPin, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';

const { Title, Text } = Typography;
const { Option } = Select;

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const EligibilityPage = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<number | null>(null);

  const onFinish = (values: unknown) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setLoading(true);
    // Simulate matching logic delay
    setTimeout(() => {
      setLoading(false);
      setMatches(Math.floor(Math.random() * 20) + 5); // Mock matching results
      setCurrent(2);
    }, 1500);
  };

  const steps = [
    { title: 'Personal', icon: <User size={18} /> },
    { title: 'Academic', icon: <GraduationCap size={18} /> },
    { title: 'Results', icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eligibility Checker</h1>
          <p className="text-gray-500">Find scholarships that match your profile in seconds.</p>
        </div>

        <Card className="rounded-2xl border-none shadow-sm overflow-hidden p-8">
          <Steps 
            current={current} 
            className="mb-12" 
            items={steps.map(s => ({
              title: s.title,
              icon: s.icon
            }))} 
          />

          {current < 2 ? (
            <Form
              layout="vertical"
              onFinish={onFinish}
              requiredMark="optional"
              className="space-y-6"
            >
              {current === 0 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                      <Select placeholder="Select gender" className="h-10">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="State of Residence" name="state" rules={[{ required: true }]}>
                      <Select placeholder="Select state" className="h-10" showSearch>
                        {INDIAN_STATES.map(state => (
                          <Option key={state} value={state}>{state}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                      <Select placeholder="Select category" className="h-10">
                        <Option value="general">General</Option>
                        <Option value="sc">SC</Option>
                        <Option value="st">ST</Option>
                        <Option value="obc">OBC</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Annual Family Income (₹)" name="income" rules={[{ required: true }]}>
                      <InputNumber 
                        className="w-full h-10 flex items-center" 
                        placeholder="e.g. 150000" 
                        formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/\₹\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button type="primary" onClick={() => setCurrent(1)} className="h-12 px-8 rounded-xl bg-primary">
                      Next Step <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>
              )}

              {current === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="Current Course" name="course" rules={[{ required: true }]}>
                      <Select placeholder="Select course" className="h-10">
                        <Option value="eng">Engineering</Option>
                        <Option value="med">Medical</Option>
                        <Option value="bsc">B.Sc</Option>
                        <Option value="com">Commerce</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Current Year" name="year" rules={[{ required: true }]}>
                      <Select placeholder="Select year" className="h-10">
                        <Option value="1">1st Year</Option>
                        <Option value="2">2nd Year</Option>
                        <Option value="3">3rd Year</Option>
                        <Option value="4">4th Year</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Previous Marks (%)" name="marks" rules={[{ required: true }]}>
                      <InputNumber min={0} max={100} className="w-full h-10 flex items-center" placeholder="e.g. 85" />
                    </Form.Item>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <Button onClick={() => setCurrent(0)} className="h-12 px-8 rounded-xl">Back</Button>
                    <Button type="primary" htmlType="submit" loading={loading} className="h-12 px-8 rounded-xl bg-primary">
                      Check Eligibility
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          ) : (
            <div className="text-center animate-in zoom-in duration-500">
              <Result
                status="success"
                title={<Title level={2}>Great News!</Title>}
                subTitle={
                  <Text className="text-lg">
                    You are eligible for <span className="text-primary font-bold">{matches}</span> scholarships.
                  </Text>
                }
                extra={[
                  <Link key="search" href="/search">
                    <Button type="primary" size="large" className="h-14 px-10 rounded-xl bg-primary text-lg">
                      View My Scholarships <Search className="ml-2" size={20} />
                    </Button>
                  </Link>,
                  <Button key="reset" size="large" onClick={() => setCurrent(0)} className="h-14 px-10 rounded-xl text-lg mt-4 sm:mt-0">
                    Check Again
                  </Button>
                ]}
              />
            </div>
          )}
        </Card>
      </main>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialTab="signup" />
    </div>
  );
};

export default EligibilityPage;
