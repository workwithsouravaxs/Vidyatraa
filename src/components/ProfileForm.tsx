'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, App, Card, Row, Col } from 'antd';
import { User, Phone, MapPin, GraduationCap, Briefcase, DollarSign, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

const POPULAR_COURSES = [
  'B.Tech / B.E (Engineering)',
  'MBBS / BDS / BAMS (Medical)',
  'B.Sc Nursing',
  'B.Pharm / D.Pharm (Pharmacy)',
  'B.Sc / M.Sc (General Science)',
  'B.Com / M.Com (Commerce)',
  'B.A / M.A (Arts & Humanities)',
  'BCA / MCA (Computer Applications)',
  'BBA / MBA (Management)',
  'CA / CS / ICWA (Finance)',
  'LLB / LLM (Law)',
  'B.Ed / M.Ed (Education)',
  'B.Arch (Architecture)',
  'B.Des (Design)',
  'Polytechnic Diploma',
  'ITI / Vocational Training',
  'PhD / Research'
];

interface ProfileFormProps {
  onSuccess?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSuccess }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showOtherCourse, setShowOtherCourse] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (data) {
            form.setFieldsValue(data);
            // If the course isn't in our popular list, it's an "Other" course
            if (data.current_course && !POPULAR_COURSES.includes(data.current_course)) {
              form.setFieldValue('current_course_select', 'Other');
              form.setFieldValue('current_course_manual', data.current_course);
              setShowOtherCourse(true);
            } else {
              form.setFieldValue('current_course_select', data.current_course);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onFinish = async (values: Record<string, unknown>) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Combine select/manual course values
      const finalCourse = values.current_course_select === 'Other' 
        ? values.current_course_manual 
        : values.current_course_select;

      // Prepare final data (removing temp form fields)
      const { current_course_select, current_course_manual, ...profileData } = values;
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          current_course: finalCourse,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      message.success('Profile updated successfully!');
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      message.error(errorMessage || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-12 text-center text-gray-500">Loading profile data...</div>;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark="optional"
      className="max-w-4xl mx-auto"
    >
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input prefix={<User size={18} className="text-gray-400 mr-2" />} className="h-11 rounded-xl" placeholder="Sourav Kumar" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Mobile Number"
            name="mobile_number"
            rules={[{ required: true, message: 'Please enter your mobile number' }]}
          >
            <Input prefix={<Phone size={18} className="text-gray-400 mr-2" />} className="h-11 rounded-xl" placeholder="+91 9876543210" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: 'Please select your state' }]}
          >
            <Select showSearch className="w-full h-11" placeholder="Select state">
              {INDIAN_STATES.map(state => (
                <Option key={state} value={state}>{state}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select your category' }]}
          >
            <Select className="w-full h-11" placeholder="Select category">
              <Option value="General">General</Option>
              <Option value="OBC">OBC</Option>
              <Option value="SC">SC</Option>
              <Option value="ST">ST</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input.TextArea rows={3} className="rounded-xl" placeholder="Enter your full address" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Annual Family Income (₹)"
            name="annual_income"
            rules={[{ required: true, message: 'Please enter your annual income' }]}
          >
            <InputNumber 
              className="w-full h-11 flex items-center" 
              placeholder="e.g. 250000"
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\₹\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Current Education Level"
            name="education_level"
            rules={[{ required: true, message: 'Please select your education level' }]}
          >
            <Select className="w-full h-11" placeholder="Select education level">
              <Option value="Class 10">Class 10</Option>
              <Option value="Class 12">Class 12</Option>
              <Option value="Undergraduate">Undergraduate</Option>
              <Option value="Postgraduate">Postgraduate</Option>
              <Option value="PhD">PhD/Research</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Previous Year Marks (%)"
            name="academic_marks"
            rules={[{ required: true, message: 'Please enter your marks' }]}
          >
            <InputNumber 
              min={0} max={100} 
              className="w-full h-11 flex items-center" 
              placeholder="e.g. 85" 
              addonAfter="%"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Parent's Occupation"
            name="parent_occupation"
            rules={[{ required: true, message: 'Please select parent occupation' }]}
          >
            <Select className="w-full h-11" placeholder="Select occupation">
              <Option value="Farmer">Farmer</Option>
              <Option value="Daily Wager">Daily Wager / Laborer</Option>
              <Option value="Government Employee">Government Employee</Option>
              <Option value="Private Sector">Private Sector</Option>
              <Option value="Self Employed">Self Employed / Business</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Special Status (Optional)"
            name="special_status"
          >
            <Select className="w-full h-11" placeholder="Select status if applicable">
              <Option value="None">None</Option>
              <Option value="Disability">Student with Disability</Option>
              <Option value="Orphan">Orphan Student</Option>
              <Option value="Single Parent">Single Parent Household</Option>
              <Option value="Ex-Servicemen">Child of Ex-Servicemen</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={showOtherCourse ? 12 : 24}>
          <Form.Item
            label="Current Course"
            name="current_course_select"
            rules={[{ required: true, message: 'Please select your course' }]}
          >
            <Select 
              showSearch 
              className="w-full h-11" 
              placeholder="Search or select course"
              onChange={(value) => setShowOtherCourse(value === 'Other')}
            >
              {POPULAR_COURSES.map(course => (
                <Option key={course} value={course}>{course}</Option>
              ))}
              <Option value="Other">Other (Type manually)</Option>
            </Select>
          </Form.Item>
        </Col>

        {showOtherCourse && (
          <Col xs={24} md={12}>
            <Form.Item
              label="Specify Your Course"
              name="current_course_manual"
              rules={[{ required: true, message: 'Please type your course name' }]}
            >
              <Input 
                prefix={<GraduationCap size={18} className="text-gray-400 mr-2" />} 
                className="h-11 rounded-xl" 
                placeholder="Type your course name here" 
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <div className="mt-8 flex justify-end">
        <Button 
          type="primary" 
          htmlType="submit" 
          size="large" 
          loading={loading}
          icon={<Save size={20} />}
          className="h-12 px-10 rounded-xl bg-primary font-bold"
        >
          Save & Complete Profile
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
