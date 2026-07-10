'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button, Card, Tag, Space, Typography, Breadcrumb, Divider, List } from 'antd';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Bookmark, 
  Share2, 
  ExternalLink,
  CheckCircle2,
  FileText,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { scholarshipService, Scholarship } from '@/services/scholarshipService';

const { Title, Paragraph, Text } = Typography;

const ScholarshipDetailsClient = () => {
  const params = useParams();
  const [scholarship, setScholarship] = React.useState<Scholarship | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (params.id) {
      scholarshipService.getScholarshipById(params.id as string).then(data => {
        setScholarship(data);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="animate-pulse text-primary font-bold">Loading scholarship details...</div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <h2 className="text-2xl font-bold">Scholarship Not Found</h2>
        <Link href="/search" className="mt-4 text-primary underline">Back to Search</Link>
      </div>
    );
  }

  // Combine with default values for sections that might not be in the service yet
  const fullScholarship = {
    ...scholarship,
    eligibility: scholarship.requirements || [
      'Must be an Indian citizen.',
      'Must be studying in a recognized institution.',
      'Family income criteria apply.'
    ],
    documents: scholarship.documents || [
      'Identity Proof (Aadhaar)',
      'Income Certificate',
      'Previous Year Marksheet',
      'Caste Certificate (if applicable)'
    ],
    description: scholarship.description || 'No detailed description available yet.',
    provider: scholarship.provider || 'Verified Educational Provider'
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-8">
          <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link href="/search">Scholarships</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Card className="rounded-2xl border-none shadow-sm mb-8">
              <div className="p-2">
                <Tag color="blue" className="mb-4 px-3 py-1 text-sm font-semibold rounded-full border-none bg-primary/10 text-primary">
                  {fullScholarship.provider}
                </Tag>
                <Title level={2} className="!mb-6 !leading-tight text-gray-900">
                  {fullScholarship.title}
                </Title>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <InfoItem icon={<MapPin className="text-primary" size={20} />} label="State" value={fullScholarship.state} />
                  <InfoItem icon={<Calendar className="text-primary" size={20} />} label="Deadline" value={fullScholarship.deadline} />
                  <InfoItem icon={<IndianRupee className="text-primary" size={20} />} label="Benefit" value={fullScholarship.amount} />
                </div>

                <Divider className="my-8" />

                <section className="mb-10">
                  <Title level={4} className="flex items-center mb-4">
                    <Info className="mr-2 text-primary" size={22} /> Description
                  </Title>
                  <Paragraph className="text-gray-600 text-lg leading-relaxed">
                    {fullScholarship.description}
                  </Paragraph>
                </section>

                <section className="mb-10">
                  <Title level={4} className="flex items-center mb-4">
                    <CheckCircle2 className="mr-2 text-primary" size={22} /> Eligibility Criteria
                  </Title>
                  <ul className="space-y-3">
                    {fullScholarship.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-6 h-6 bg-green-50 text-green-600 rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                          <CheckCircle2 size={14} />
                        </span>
                        <span className="text-gray-700 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mb-10">
                  <Title level={4} className="flex items-center mb-4">
                    <FileText className="mr-2 text-primary" size={22} /> Required Documents
                  </Title>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fullScholarship.documents.map((doc, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <FileText size={16} className="text-gray-400 mr-3" />
                        <span className="font-medium text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:w-1/3">
            <Card className="rounded-2xl border-none shadow-sm sticky top-24 overflow-hidden">
              <div className="p-2">
                <Title level={4} className="mb-6">Apply for Scholarship</Title>
                <div className="space-y-4">
                  <Button 
                    type="primary" 
                    block 
                    size="large" 
                    className="h-14 rounded-xl bg-primary text-lg font-bold"
                    href={fullScholarship.official_link || '#'}
                    target="_blank"
                  >
                    Apply Now
                  </Button>
                  <Button block size="large" className="h-14 rounded-xl flex items-center justify-center space-x-2">
                    <Bookmark size={20} className="text-gray-500" />
                    <span>Save to Dashboard</span>
                  </Button>
                  <Button block size="large" className="h-14 rounded-xl flex items-center justify-center space-x-2">
                    <Share2 size={20} className="text-gray-500" />
                    <span>Share with Friends</span>
                  </Button>
                </div>
                
                <Divider className="my-8" />
                
                <div className="bg-primary/5 p-6 rounded-2xl">
                  <h4 className="font-bold text-primary mb-2 flex items-center">
                    <Info size={18} className="mr-2" /> Official Link
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Always apply through the official government portal to ensure safety.
                  </p>
                  <Link 
                    href={fullScholarship.official_link || '#'} 
                    target="_blank"
                    className="text-primary font-bold flex items-center hover:underline"
                  >
                    Go to Official Website <ExternalLink size={14} className="ml-2" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-gray-500 mb-1">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider ml-2">{label}</span>
      </div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default ScholarshipDetailsClient;
