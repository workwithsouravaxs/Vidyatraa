import React from 'react';
import { Divider } from 'antd';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p>
              Welcome to Vidyatraa. By accessing or using our platform, you agree to comply with and be bound by these Terms of Service.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Platform Purpose</h2>
            <p>
              Vidyatraa operates as an informational bridge and navigation platform. Our primary goal is to connect students with educational opportunities, scholarships, and grants. We do not guarantee the award of any scholarship, as final decisions rest with the respective scholarship providers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. For Students: 100% Free Service</h2>
            <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary my-6">
              <p className="m-0 font-medium">
                <strong>Vidyatraa does not charge any commission or fees from individuals/students applying for scholarships.</strong> Our platform is fundamentally designed to help you navigate toward opportunities without any financial burden from our end.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. For Organizations & Collaborators</h2>
            <p>
              We welcome and encourage organizations, NGOs, and educational institutions to collaborate with us to expand student opportunities. We are happy to offer tailored services to organizations.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>We offer dedicated services to organizations looking to reach deserving students.</li>
              <li>Any financial arrangements, service terms, or platform integrations for organizations will be discussed and communicated individually based on their specific requirements.</li>
              <li>Organizations must ensure that the opportunities they post are genuine and adhere to fair selection practices.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Responsibilities</h2>
            <p>
              Users are responsible for providing accurate and truthful information in their profiles and applications. Misrepresentation of academic records or financial status may result in permanent suspension from the platform.
            </p>

            <Divider className="my-10" />
            <p className="text-gray-500 text-sm">
              If you have any questions regarding these Terms of Service, please contact us at workwithsouravaxs@gmail.com.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
