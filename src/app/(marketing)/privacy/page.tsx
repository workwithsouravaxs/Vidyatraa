import React from 'react';
import { Divider } from 'antd';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p>
              At Vidyatraa, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information Collection and Use</h2>
            <p>
              Vidyatraa is a platform designed to navigate students to educational opportunities. We collect basic profile information (such as name, education details, and contact info) solely to match you with the most relevant scholarships and grants. 
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Zero Commission Policy for Students</h2>
            <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary my-6">
              <p className="m-0 font-medium">
                We want to be completely transparent: <strong>We do not charge any commission, fees, or hidden costs to students</strong> applying for scholarships through our platform. Your data is used exclusively to facilitate your educational journey.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Protection</h2>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We do not sell your personal data to third parties.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Organization Collaborations</h2>
            <p>
              If an organization wishes to collaborate with Vidyatraa, any data sharing required for the fulfillment of those services will be strictly governed by individual agreements communicated and signed by both parties. We are happy to offer tailored services to organizations.
            </p>

            <Divider className="my-10" />
            <p className="text-gray-500 text-sm">
              If you have any questions about this Privacy Policy, please contact us at workwithsouravaxs@gmail.com.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
