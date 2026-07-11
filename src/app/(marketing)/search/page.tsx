'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input, Select, Button, Card, Tag, Badge, Empty, Space } from 'antd';
import { Search, Filter, MapPin, Calendar, IndianRupee, ArrowRight, Bookmark, Tag as TagIcon } from 'lucide-react';

const { Option } = Select;

import { useRouter } from 'next/navigation';
import { scholarshipService, Scholarship } from '@/services/scholarshipService';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const SearchPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    state: 'All',
    category: 'All',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await scholarshipService.fetchExternalScholarships();
        setScholarships(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filters.state === 'All' || s.state === filters.state;
    const matchesCategory = filters.category === 'All' || s.category === filters.category;
    return matchesSearch && matchesState && matchesCategory;
  });

  const displayedScholarships = user ? filteredScholarships : filteredScholarships.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Search & Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Opportunity</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              prefix={<Search className="text-gray-400 mr-2" size={20} />}
              placeholder="Search scholarships by name or keywords..."
              size="large"
              className="h-14 rounded-xl shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" size="large" className="h-14 px-8 rounded-xl bg-primary">
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <Card className="rounded-2xl border-none shadow-sm sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter size={18} className="text-primary" />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <Select 
                    defaultValue="All" 
                    className="w-full h-10" 
                    onChange={(v) => setFilters({...filters, state: v})}
                    showSearch
                  >
                    <Option value="All">All India</Option>
                    {INDIAN_STATES.map(state => (
                      <Option key={state} value={state}>{state}</Option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <Select 
                    defaultValue="All" 
                    className="w-full h-10"
                    onChange={(v) => setFilters({...filters, category: v})}
                  >
                    <Option value="All">All Categories</Option>
                    <Option value="General">General</Option>
                    <Option value="SC">SC</Option>
                    <Option value="ST">ST</Option>
                    <Option value="OBC">OBC</Option>
                    <Option value="Girl Student">Girl Student</Option>
                  </Select>
                </div>

                <Button block className="rounded-lg h-10">Reset Filters</Button>
              </div>
            </Card>
          </aside>

          {/* Results Area */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <span className="text-gray-500 font-medium">
                Showing {filteredScholarships.length} scholarships
              </span>
              <Select defaultValue="newest" className="w-40 h-10 rounded-lg">
                <Option value="newest">Newest First</Option>
                <Option value="deadline">Deadline (Soonest)</Option>
                <Option value="amount">Amount (High to Low)</Option>
              </Select>
            </div>

            <div className="space-y-4">
              {displayedScholarships.length > 0 ? (
                displayedScholarships.map((s) => (
                  <ScholarshipCard key={s.id} scholarship={s} />
                ))
              ) : (
                <Card className="rounded-2xl border-none p-12 text-center">
                  <Empty description="No scholarships found matching your search." />
                </Card>
              )}
              
              {!user && filteredScholarships.length > 5 && (
                <div className="mt-8 text-center">
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 inline-block w-full max-w-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock All Opportunities</h3>
                    <p className="text-gray-600 mb-6">Create a free account to view all {filteredScholarships.length} scholarships matching your criteria.</p>
                    <Button 
                      type="primary" 
                      size="large" 
                      className="h-14 px-10 rounded-xl bg-primary text-lg"
                      onClick={() => router.push('/auth?mode=signup')}
                    >
                      Explore All <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <Card className="hover:shadow-md transition-shadow border-none rounded-2xl overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge count={scholarship.provider} className="provider-badge" style={{ backgroundColor: '#E0E7FF', color: '#3730A3', fontWeight: 600 }} />
          <Button type="text" icon={<Bookmark size={20} className="text-gray-400 group-hover:text-primary transition-colors" />} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
          {scholarship.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-2">
          {scholarship.description}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <IndianRupee size={16} />
            <span className="text-sm font-semibold text-gray-900">{scholarship.amount}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <MapPin size={16} />
            <span className="text-sm font-semibold text-gray-900">{scholarship.state}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar size={16} />
            <span className="text-sm font-semibold text-gray-900">{scholarship.deadline}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <TagIcon size={16} />
            <span className="text-sm font-semibold text-gray-900">{scholarship.category}</span>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
          <Link href={`/scholarships/view?id=${scholarship.id}`} className="text-primary font-bold flex items-center hover:underline">
            View Details <ArrowRight size={16} className="ml-1" />
          </Link>
          <Button 
            type="primary" 
            className="rounded-lg px-6 font-semibold bg-primary"
            href={scholarship.official_link || '#'}
            target="_blank"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default SearchPage;
