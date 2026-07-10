'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign, 
  Search, 
  SlidersHorizontal, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Input, Select, Button, Card, Tag, Badge, Empty, message } from 'antd';

const { Option } = Select;

type Internship = {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  category: 'Technical' | 'Marketing' | 'Research' | 'Design' | 'Operations';
  eligibility: string;
  skills: string[];
  type: 'Remote' | 'Hybrid' | 'In-Office';
  deadline: string;
};

export default function InternshipsPage() {
  const initialInternships: Internship[] = [
    {
      id: 1,
      title: "Frontend Developer (React) - Micro Project",
      company: "Vidyatraa Labs",
      location: "Remote",
      duration: "2 Months",
      stipend: "₹8,000 / month",
      category: "Technical",
      eligibility: "Class 10+ completed, familiarity with HTML/CSS and basic JS.",
      skills: ["React", "CSS", "TypeScript"],
      type: "Remote",
      deadline: "30th Aug 2026"
    },
    {
      id: 2,
      title: "Content Marketing Intern",
      company: "EduGrowth Media",
      location: "Hyderabad, Telangana",
      duration: "3 Months",
      stipend: "₹6,000 / month",
      category: "Marketing",
      eligibility: "Excellent communication skills in English & regional languages.",
      skills: ["Copywriting", "SEO", "Social Media"],
      type: "Hybrid",
      deadline: "15th Sep 2026"
    },
    {
      id: 3,
      title: "Educational Research Assistant",
      company: "National Student Trust",
      location: "New Delhi",
      duration: "6 Months",
      stipend: "₹12,000 / month",
      category: "Research",
      eligibility: "High academic accuracy in Math or Science (90%+ in 10th boards).",
      skills: ["Data Analysis", "Academic Writing", "Excel"],
      type: "In-Office",
      deadline: "28th Aug 2026"
    },
    {
      id: 4,
      title: "UI/UX Design Intern",
      company: "Vidyatraa Platform Team",
      location: "Remote",
      duration: "3 Months",
      stipend: "₹10,000 / month",
      category: "Design",
      eligibility: "Basic portfolio showing wireframes or clean user interfaces.",
      skills: ["Figma", "Wireframing", "User Research"],
      type: "Remote",
      deadline: "10th Sep 2026"
    },
    {
      id: 5,
      title: "Community Operations Associate",
      company: "Aspirant Foundation",
      location: "Bengaluru, Karnataka",
      duration: "4 Months",
      stipend: "₹7,500 / month",
      category: "Operations",
      eligibility: "Organized individual passionate about teaching or helping student cohorts.",
      skills: ["Community Management", "Coordination", "Events"],
      type: "Hybrid",
      deadline: "05th Sep 2026"
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  const handleApply = (id: number, title: string) => {
    if (appliedIds.includes(id)) return;
    setAppliedIds([...appliedIds, id]);
    message.success(`Application submitted successfully for ${title}! 🎉`);
  };

  const filteredInternships = initialInternships.filter(intern => {
    const matchesSearch = intern.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          intern.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          intern.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || intern.category === categoryFilter;
    const matchesType = typeFilter === 'All' || intern.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 shadow-sm"
          >
            <Sparkles size={13} className="text-amber-500 animate-spin-slow" />
            <span>Launch Your Career</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Student Internships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Projects</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base text-slate-500 font-normal leading-relaxed"
          >
            Gain hands-on work experience, build your resume, and earn stipends through student-friendly micro-projects and verified corporate roles.
          </motion.p>
        </div>

        {/* Search and Filters Shelf */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                prefix={<Search className="text-slate-400 mr-2" size={18} />}
                placeholder="Search by role, company, or skills (e.g. React, Figma)..."
                size="large"
                className="h-12 rounded-xl border-slate-200 hover:border-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              <Select
                defaultValue="All"
                className="w-full md:w-44 h-12"
                onChange={setCategoryFilter}
              >
                <Option value="All">All Categories</Option>
                <Option value="Technical">Technical</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Research">Research</Option>
                <Option value="Design">Design</Option>
                <Option value="Operations">Operations</Option>
              </Select>
              <Select
                defaultValue="All"
                className="w-full md:w-44 h-12"
                onChange={setTypeFilter}
              >
                <Option value="All">All Job Types</Option>
                <Option value="Remote">Remote</Option>
                <Option value="Hybrid">Hybrid</Option>
                <Option value="In-Office">In-Office</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Listings */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredInternships.length > 0 ? (
                filteredInternships.map((intern) => (
                  <motion.div
                    key={intern.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Title, Company, Type */}
                      <div className="flex justify-between items-start gap-4 flex-wrap sm:flex-nowrap">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {intern.title}
                          </h3>
                          <p className="text-sm font-semibold text-blue-600 mt-1">{intern.company}</p>
                        </div>
                        <Tag color={
                          intern.type === 'Remote' ? 'green' : 
                          intern.type === 'Hybrid' ? 'blue' : 'orange'
                        } className="font-bold border-none px-3 py-1 rounded-full text-xs">
                          {intern.type}
                        </Tag>
                      </div>

                      {/* Info Bar */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-slate-400" />
                          {intern.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-400" />
                          {intern.duration}
                        </span>
                        <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                          <DollarSign size={14} className="text-emerald-500" />
                          {intern.stipend}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-slate-400" />
                          Apply by {intern.deadline}
                        </span>
                      </div>

                      {/* Eligibility description */}
                      <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                        <span className="font-bold text-slate-650 block mb-1">Eligibility:</span>
                        {intern.eligibility}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {intern.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="bg-slate-100/80 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-200/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="border-t border-slate-100 mt-6 pt-6 flex justify-end">
                      <Button
                        type={appliedIds.includes(intern.id) ? 'default' : 'primary'}
                        size="large"
                        onClick={() => handleApply(intern.id, intern.title)}
                        className={`h-11 px-8 rounded-xl font-bold ${
                          appliedIds.includes(intern.id) 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-none' 
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                        disabled={appliedIds.includes(intern.id)}
                      >
                        {appliedIds.includes(intern.id) ? (
                          <span className="flex items-center gap-1.5">
                            <CheckCircle size={15} />
                            Applied
                          </span>
                        ) : (
                          'Apply Now'
                        )}
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
                  <Empty description="No internships found matching your filters" />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / Quick Tips */}
          <aside className="space-y-6">
            <Card className="rounded-3xl border-slate-200/85 shadow-sm p-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/20 text-left">
              <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="text-amber-500" size={18} />
                Vidyatraa Ecosystem
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                We believe in learning-by-doing. Our micro-projects let secondary students gain practical experience that bridges class instruction and industrial needs.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Learn Concept</h5>
                    <p className="text-[10px] text-slate-400 leading-tight">Master Math, Science & Code concepts in Courses.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Build Micro Project</h5>
                    <p className="text-[10px] text-slate-400 leading-tight">Complete small projects to earn your Vidyatraa completion badge.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Get Hired</h5>
                    <p className="text-[10px] text-slate-400 leading-tight">Match with partner micro-gigs and earn monthly stipends.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border-slate-200/85 shadow-sm p-2 text-left">
              <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertCircle className="text-blue-500" size={16} />
                Need Guidance?
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Not sure which internship matches your skills? Take a look at our AI-guided career roadmaps.
              </p>
              <Button type="default" className="w-full h-10 font-bold rounded-xl flex items-center justify-center text-xs">
                View Career Paths
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </Card>
          </aside>
        </div>

      </div>
    </div>
  );
}
