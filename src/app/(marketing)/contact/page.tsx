'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, App } from 'antd';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactPage() {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([{
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          message: values.message,
          status: 'Pending'
        }]);

      if (error) throw error;
      message.success('Thank you! Your message has been sent successfully.');
      form.resetFields();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      message.error(errorMessage || 'Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <main className="max-w-7xl mx-auto py-8 w-full">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-fredoka">Get in Touch</h1>
          <Paragraph className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have questions about a scholarship or need help with your application? Our team is here to assist you. Drop us a message and we&apos;ll get back to you as soon as possible.
          </Paragraph>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <div className="w-full">
            <Card className="rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 bg-white">
              <h2 className="text-xl font-bold text-slate-900 mb-6 font-fredoka">Send us a Message</h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="large"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <Form.Item
                    name="name"
                    label={<span className="font-semibold text-xs text-slate-700">Full Name</span>}
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="John Doe" className="rounded-xl h-11 border-slate-200" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={<span className="font-semibold text-xs text-slate-700">Email Address</span>}
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="john@example.com" className="rounded-xl h-11 border-slate-200" />
                  </Form.Item>
                </div>
                
                <Form.Item
                  name="phone"
                  label={<span className="font-semibold text-xs text-slate-700">Phone Number (Optional)</span>}
                >
                  <Input placeholder="+91 90000 00000" className="rounded-xl h-11 border-slate-200" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={<span className="font-semibold text-xs text-slate-700">Your Message</span>}
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea 
                    placeholder="How can we help you?" 
                    rows={6} 
                    className="rounded-xl resize-none border-slate-200"
                  />
                </Form.Item>

                <Form.Item className="mb-0 text-right">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    className="bg-blue-600 hover:bg-blue-500 h-12 px-8 rounded-xl font-bold flex items-center justify-center ml-auto"
                    icon={!loading && <Send size={18} className="mr-2" />}
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
