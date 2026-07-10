'use client';

import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, App, Card, Row, Col, InputNumber } from 'antd';
import { Plus, Link as LinkIcon, FileText, Building, DollarSign } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const INDIAN_STATES = [
  'All India', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

interface ScholarshipFormProps {
  id?: string;
}

export default function ScholarshipForm({ id }: ScholarshipFormProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (id) {
      const fetchScholarship = async () => {
        try {
          const { data, error } = await supabase
            .from('scholarships')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;
          if (data) {
            form.setFieldsValue({
              ...data,
              deadline: data.deadline ? dayjs(data.deadline) : null,
            });
          }
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          message.error('Error fetching scholarship: ' + errorMessage);
        } finally {
          setFetching(false);
        }
      };
      fetchScholarship();
    }
  }, [id, form, message]);

  const onFinish = async (values: Record<string, unknown>) => {
    setLoading(true);
    try {
      // 1. Session Check
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Your session has expired. Please log in again.');
      }
      const scholarshipData = {
        title: values.title || 'Untitled Scholarship',
        description: values.description || '',
        amount: values.amount || '',
        deadline: values.deadline ? (values.deadline as dayjs.Dayjs).format('YYYY-MM-DD') : null,
        state: values.state || 'All India',
        category: values.category || 'All',
        gender_requirement: values.gender_requirement || 'All',
        provider: values.provider || '',
        official_link: values.official_link || '',
        is_verified: true,
      };

      let dbError;
      if (id) {
        const { error } = await supabase
          .from('scholarships')
          .update(scholarshipData)
          .eq('id', id);
        dbError = error;
      } else {
        const { error } = await supabase
          .from('scholarships')
          .insert(scholarshipData);
        dbError = error;
      }

      if (dbError) {
        console.error('Supabase DB Error Details:', {
          code: dbError.code,
          message: dbError.message,
          hint: dbError.hint,
          details: dbError.details
        });
        throw new Error(`Database Error: ${dbError.message}. ${dbError.hint || ''}`);
      }
      
      message.success(id ? 'Scholarship updated successfully!' : 'Scholarship added successfully!');
      form.resetFields();
      setSuccess(true);
      setLoading(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Submission Error:', error);
      message.error(errorMessage || 'Failed to process scholarship');
      setLoading(false);
    }
  };

  const handleDone = () => {
    router.push('/admin');
    router.refresh();
  };

  if (fetching) return <div className="p-12 text-center text-gray-500">Loading scholarship data...</div>;

  return (
    <Card className="rounded-3xl border-none shadow-sm p-4 sm:p-8 bg-white">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false} // Make placeholders feel optional
      >
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item
              label="Scholarship Title"
              name="title"
              rules={[{ required: false }]}
            >
              <Input 
                prefix={<FileText size={18} className="text-gray-400 mr-2" />} 
                className="h-11 rounded-xl" 
                placeholder="e.g. HDFC Bank Parivartan Scholarship" 
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea 
                rows={4} 
                className="rounded-xl" 
                placeholder="Details about eligibility, benefits, and how to apply..." 
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Scholarship Amount"
              name="amount"
            >
              <Input 
                prefix={<DollarSign size={18} className="text-gray-400 mr-2" />} 
                className="h-11 rounded-xl" 
                placeholder="e.g. ₹ 75,000 per year" 
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Deadline"
              name="deadline"
            >
              <DatePicker className="w-full h-11 rounded-xl" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Applicable State"
              name="state"
            >
              <Select showSearch className="w-full h-11" placeholder="Select state">
                {INDIAN_STATES.map(state => (
                  <Option key={state} value={state}>{state}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Category"
              name="category"
            >
              <Select className="w-full h-11" placeholder="Select category">
                <Option value="All">All Categories</Option>
                <Option value="General">General</Option>
                <Option value="OBC">OBC</Option>
                <Option value="SC">SC</Option>
                <Option value="ST">ST</Option>
                <Option value="Minority">Minority</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Gender Requirement"
              name="gender_requirement"
            >
              <Select className="w-full h-11" placeholder="Select gender">
                <Option value="All">All Genders</Option>
                <Option value="Male">Male Only</Option>
                <Option value="Female">Female Only</Option>
                <Option value="Transgender">Transgender Only</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Provider / Organization"
              name="provider"
            >
              <Input 
                prefix={<Building size={18} className="text-gray-400 mr-2" />} 
                className="h-11 rounded-xl" 
                placeholder="e.g. HDFC Bank, Government of Bihar" 
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Official Website Link"
              name="official_link"
            >
              <Input 
                prefix={<LinkIcon size={18} className="text-gray-400 mr-2" />} 
                className="h-11 rounded-xl" 
                placeholder="https://example.com/scholarship" 
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-8 flex justify-end space-x-4">
          <Button 
            size="large" 
            className="h-12 px-8 rounded-xl"
            onClick={() => router.push('/admin')}
          >
            Cancel
          </Button>
          {success ? (
            <Button 
              type="primary" 
              size="large" 
              onClick={handleDone}
              className="h-12 px-10 rounded-xl bg-green-600 border-none font-bold"
            >
              Done / Go to Dashboard
            </Button>
          ) : (
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              loading={loading}
              icon={<Plus size={20} />}
              className="h-12 px-10 rounded-xl bg-primary font-bold"
            >
              {id ? 'Update Scholarship' : 'Publish Scholarship'}
            </Button>
          )}
          {success && (
            <Button 
              size="large" 
              onClick={() => setSuccess(false)}
              className="h-12 px-8 rounded-xl border-gray-200 text-gray-600"
            >
              Add Another
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
}
