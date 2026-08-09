'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ChevronRight,
  Target,
  FileText,
  Activity,
  UserCheck,
  AlertTriangle,
  HelpCircle,
  FolderLock,
  Briefcase,
  Flame,
  Trophy,
  Landmark,
  Heart,
  MessageSquare
} from 'lucide-react';

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function RedesignedHome() {
  const [mounted, setMounted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showHackathonPopup, setShowHackathonPopup] = useState(false);

  const features = [
    {
      title: "Study Notes",
      desc: "Chapter-wise formula sheets, revision cards, and summaries.",
      icon: BookOpen,
      bg: "bg-sky-100 text-sky-800 border-sky-300",
    },
    {
      title: "Practice Papers",
      desc: "Customize difficulty and topics to generate model exams.",
      icon: Sparkles,
      bg: "bg-amber-100 text-amber-800 border-amber-300",
    },
    {
      title: "AI Doubt Solver",
      desc: "Get instant step-by-step friendly solutions to any query.",
      icon: Search,
      bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
      title: "Mock Tests",
      desc: "Real-time board exam simulation with timers and scoring.",
      icon: Award,
      bg: "bg-purple-100 text-purple-800 border-purple-300",
    },
    {
      title: "Daily Practice",
      desc: "Quick 20-question randomized challenges to build XP streaks.",
      icon: Flame,
      bg: "bg-orange-100 text-orange-850 border-orange-300",
    },
    {
      title: "Progress Tracker",
      desc: "Watch your levels rise, track accuracy, and review weak areas.",
      icon: Trophy,
      bg: "bg-rose-100 text-rose-800 border-rose-300",
    },
    {
      title: "Career Guidance",
      desc: "Explore tailored roadmaps from science to entrepreneurship.",
      icon: Landmark,
      bg: "bg-indigo-100 text-indigo-850 border-indigo-300",
    },
    {
      title: "Scholarship Hub",
      desc: "Search, filter, and apply to nationwide financial aid options.",
      icon: UserCheck,
      bg: "bg-teal-100 text-teal-850 border-teal-300",
    },
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowHackathonPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const platformCapabilities = [
    { 
      title: "Core Syllabus Coverage", 
      label: "Mathematics & Science Guides", 
      description: "Access complete revision notes, formulas, and mock questions structured around official Class 10 board formats." 
    },
    { 
      title: "Verified Scholarship Catalog", 
      label: "100% Manually Audited Schemes", 
      description: "Only official and verified state, national, and private funding opportunities listed. No spam or expired links." 
    },
    { 
      title: "Real-time Score Projections", 
      label: "Predictive Analytics", 
      description: "Your quiz results, test speed, and practice answer logs compile dynamically to estimate your board exam preparedness." 
    },
    { 
      title: "Student Internships & Projects", 
      label: "Practical Work Gigs", 
      description: "Match with partner micro-projects, gain skills, and earn stipends to jumpstart your career." 
    }
  ];

  const testimonials = [
    {
      quote: "Vidyatraa Prep completely changed how I revised for my Class 10 boards. The mistake log and formulas kept me focused, and I scored 94% in my CBSE exams. Now, I use the Vidyatraa portal to find intermediate college scholarships!",
      author: "Aditya Verma",
      meta: "Class 10 Student | CBSE (94%)",
      initials: "AV",
      colorClass: "bg-blue-600 text-white"
    },
    {
      quote: "Finding verified scholarships used to be a nightmare of broken links. Vidyatraa's eligibility checker scanned our details and matched us with real government schemes in seconds. It gave our family real financial relief.",
      author: "Radha Reddy",
      meta: "Parent of Varsha | Telangana SSC Aspirant",
      initials: "RR",
      colorClass: "bg-indigo-650 text-white"
    },
    {
      quote: "Vidyatraa is exactly what students need. The platform guides you from your secondary board preparation straight to college financing, micro-projects, and career opportunities on a single, clean dashboard.",
      author: "Sneha Nair",
      meta: "First-Gen Learner | Science Stream Aspirant",
      initials: "SN",
      colorClass: "bg-emerald-600 text-white"
    }
  ];

  const faqs = [
    {
      q: "What is the relationship between Vidyatraa and Vidyatraa Prep?",
      a: "Vidyatraa is the parent student-success platform. Vidyatraa Prep is our specialized, interactive learning wing dedicated to Class 10 board exam preparation, while the Vidyatraa Scholarship Hub helps you search, verify, and apply for financial aid to fund your studies."
    },
    {
      q: "How does the Predictive Board Score work?",
      a: "As you complete study notes, take mock tests, and correct equations on Vidyatraa Prep, our algorithms track your average accuracy, time spent, and error rates to output a simulated board exam percentage. This gives you a clear target to work toward."
    },
    {
      q: "Are the scholarships listed verified and up-to-date?",
      a: "Yes! Every single listing in our directory undergoes strict verification checks. We pull updates directly from state registries, national scholarship portals, and private trust foundations, verifying income boundaries and application deadlines."
    },
    {
      q: "Are the internships suitable for Class 10 and 12 students?",
      a: "Yes, all internships and micro-projects on Vidyatraa are specially curated for school students and early learners. They emphasize learning core digital skills, coordination, writing, and coding under direct mentorship with clear stipends."
    }
  ];

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafb] text-[#0f172a] overflow-x-hidden font-sans">
      
      {/* 🚀 1. The Hero Section (Introducing Vidyatraa) */}
      <section className="relative overflow-hidden py-10 md:py-16 px-4 md:px-8 bg-gradient-to-tr from-sky-50/40 via-indigo-50/20 to-emerald-50/20">
        {/* Soft floating background lights */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-300/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/15 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Soft pattern grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a02_1px,transparent_1px),linear-gradient(to_bottom,#0f172a02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm border border-blue-100/60 px-4 py-1.5 rounded-full text-xs font-bold text-blue-650 shadow-sm"
            >
              <Sparkles size={13} className="text-amber-500 animate-pulse" />
              <span>The Unified Student Success Ecosystem</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 font-poppins"
            >
              Master Your Exams.<br />
              Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Future.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed"
            >
              Vidyatraa is a single, unified environment built for Indian students. We combine secondary board exam preparation with AI-powered scholarship matching and student micro-projects, helping you excel in the classroom, build portfolios, and secure funding for your future studies.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-1"
            >
              <Link href="/courses">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 text-xs cursor-pointer flex items-center gap-2 shadow-sm">
                  <span>Explore Courses & Prep</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/search">
                <button className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border border-slate-200 transition-all duration-200 text-xs cursor-pointer shadow-sm">
                  Find Scholarships
                </button>
              </Link>
              <Link href="/internships">
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 text-xs cursor-pointer shadow-sm">
                  View Internships
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Interactive Modern UI Mockup (Authentic and Organic) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-300/15 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-300/15 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-md bg-white/70 backdrop-blur-md border border-slate-200 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-6">
              {/* Header of mockup */}
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-400/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-yellow-400/80 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-green-400/80 rounded-full" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Vidyatraa Ecosystem Hub</span>
              </div>
              
              {/* Feature Box 1: Mock Test Projections */}
              <div className="p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100/50 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">BOARD PREPARATION</span>
                  <span className="text-[10px] text-slate-400 font-bold">Class 10 Prep</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-500 font-poppins">Board Preparedness</h5>
                    <p className="text-2xl font-black text-slate-900 mt-0.5">93.8%</p>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-indigo-100 shadow-sm text-base">
                    📈
                  </div>
                </div>
                <div className="w-full bg-slate-200/50 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '93.8%' }} />
                </div>
              </div>
              
              {/* Feature Box 2: Course Progress & Mode Toggle */}
              <div className="p-4 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-100/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">ACTIVE COURSE</span>
                  <h4 className="text-xs font-extrabold text-slate-800 mt-1 font-poppins">Science & Technology</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Chapter 4: Carbon & Its Compounds</p>
                </div>
                {/* Light/Dark Mode Mock Toggle Switch */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Theme Mode</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full p-0.5 flex items-center justify-between border border-slate-350 select-none">
                    <span className="text-[9px] leading-none pl-0.5">☀️</span>
                    <div className="w-4 h-4 bg-[#0B3C91] rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
              
              {/* Feature Box 3: Internships Gig */}
              <div className="p-4 bg-amber-50/40 border border-amber-100/50 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-amber-600 bg-amber-100/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">ACTIVE INTERNSHIP</span>
                  <h4 className="text-xs font-extrabold text-slate-800 mt-1">Translation & Proofreading</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Mentorship session scheduled for tomorrow</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-200/50 flex items-center justify-center text-amber-600 text-xs font-extrabold">
                  ✍️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 2. The Story: The Problems We Solve */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3.5 py-1 rounded-full shadow-sm inline-block">The Challenge</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">
              Eliminating the Friction in Student Journeys
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium">
              Every year, thousands of deserving students lose critical academic momentum and career funding due to three core friction points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Friction 1 */}
            <div className="bg-[#fcfcff] border border-slate-200 rounded-[2rem] p-8 space-y-6 flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:bg-white hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-rose-50 border border-rose-100/50 text-rose-500 shadow-sm">
                  <AlertTriangle size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">1. Board Exam Stress & Cramming</h4>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-medium">
                  Many secondary students study hard but lack clear revision notes, cheat sheets, and active mock diagnostics. This creates anxiety and limits potential before final board evaluations.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-5">
                <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  <span>Explore Prep Wing</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Friction 2 */}
            <div className="bg-[#fcfcff] border border-slate-200 rounded-[2rem] p-8 space-y-6 flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:bg-white hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-amber-50 border border-amber-100/50 text-amber-500 shadow-sm">
                  <FolderLock size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">2. Hidden Grants & Rules</h4>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-medium">
                  Over ₹1,000 crores in educational grants go unclaimed annually. Finding these opportunities on outdated web directories with complex income filters is discouraging for families.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-5">
                <Link href="/search" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-655 hover:text-blue-700 transition-colors">
                  <span>Explore Scholarship Hub</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Friction 3 */}
            <div className="bg-[#fcfcff] border border-slate-200 rounded-[2rem] p-8 space-y-6 flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:bg-white hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-emerald-50 border border-emerald-100/50 text-emerald-500 shadow-sm">
                  <Briefcase size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">3. Lack of Portfolio & Gigs</h4>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-medium">
                  Applying academic knowledge to actual projects is rare. Students lack opportunities to gain micro-experience, earn pocket stipends, and build credentials for future admissions or jobs.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-5">
                <Link href="/internships" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  <span>Explore Internships Wing</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 3. The Journey: How We Help You Grow */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/40 border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3.5 py-1 rounded-full shadow-sm inline-block">The Roadmap</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">
              How Vidyatraa Guides You
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium">
              A single pipeline connecting school learning, credential building, and financial aid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { num: "01", step: "Structured Study", desc: "Read revision notes, formula guides, and equation summaries on our courses dashboard.", icon: BookOpen, color: "text-amber-500 bg-amber-500/10 border-amber-200" },
              { num: "02", step: "Diagnostic Mock Practice", desc: "Attempt dynamic mock papers to build confidence and generate score projections.", icon: Activity, color: "text-rose-500 bg-rose-500/10 border-rose-200" },
              { num: "03", step: "Match Scholarships", desc: "Check income and category requirements instantly using our AI filter logic.", icon: Search, color: "text-blue-500 bg-blue-500/10 border-blue-200" },
              { num: "04", step: "Apply & Earn Gigs", desc: "Gather required documents, apply to financial aids, or start micro-internships.", icon: Award, color: "text-emerald-500 bg-emerald-500/10 border-emerald-200" }
            ].map((wk, idx) => {
              const Icon = wk.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-[2rem] p-6 space-y-4 hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl border ${wk.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{wk.num}</span>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900">{wk.step}</h4>
                    <p className="text-xs text-slate-550 leading-relaxed font-medium">{wk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 4. Product Offerings (Prep, Scholarships, Internships) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3.5 py-1 rounded-full shadow-sm inline-block">Features</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">
              Explore Our Core Portals
            </h2>
          </div>

          <div className="space-y-8">
            {/* WING A: Vidyatraa Prep */}
            <div className="p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 bg-slate-50/40 flex flex-col lg:flex-row gap-12 items-center hover:border-slate-300 transition-all duration-300">
              <div className="flex-1 space-y-6 text-left">
                <div className="p-3 w-fit rounded-2xl bg-amber-500/10 border border-amber-200 text-amber-600">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-poppins">
                  Vidyatraa Prep & Courses
                </h3>
                <p className="text-sm leading-relaxed text-slate-550 font-medium">
                  Study for your Class 10 board exams with premium study aids. We offer formula catalogs, interactive practice papers, dynamic doubt solvers, and mistake trackers that help you understand what went wrong on your tests.
                </p>
                <Link href="/courses">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-200 text-xs cursor-pointer flex items-center gap-2 shadow-sm">
                    <span>Explore Learning Wing</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="w-full lg:w-96 shrink-0 bg-white border border-slate-200 rounded-[2rem] p-6 text-left space-y-3 font-semibold text-xs text-slate-700 shadow-sm">
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Subject-wise Formula Cards</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Dynamic MCQ Mock Exams</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Personal Mistake Ledgers</p>
              </div>
            </div>

            {/* WING B: AI Scholarship Hub */}
            <div className="p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 bg-slate-50/40 flex flex-col lg:flex-row gap-12 items-center hover:border-slate-300 transition-all duration-300">
              <div className="flex-1 space-y-6 text-left">
                <div className="p-3 w-fit rounded-2xl bg-indigo-500/10 border border-indigo-200 text-indigo-600">
                  <Award size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-poppins">
                  AI Scholarship Hub
                </h3>
                <p className="text-sm leading-relaxed text-slate-555 font-medium">
                  Discover verified financial support opportunities. Our platform parses complex criteria, matches you with state and national databases, and generates checklists to make applications painless.
                </p>
                <Link href="/search">
                  <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-200 text-xs cursor-pointer flex items-center gap-2 shadow-sm">
                    <span>Explore Funding Wing</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="w-full lg:w-96 shrink-0 bg-white border border-slate-200 rounded-[2rem] p-6 text-left space-y-3 font-semibold text-xs text-slate-700 shadow-sm">
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> State Schemes (Telangana & AP SSC)</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> National Merit Schemes (PMSSS, etc.)</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Private Trust Scholarships</p>
              </div>
            </div>

            {/* WING C: Internships & Micro-Projects */}
            <div className="p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 bg-slate-50/40 flex flex-col lg:flex-row gap-12 items-center hover:border-slate-300 transition-all duration-300">
              <div className="flex-1 space-y-6 text-left">
                <div className="p-3 w-fit rounded-2xl bg-emerald-500/10 border border-emerald-200 text-emerald-600">
                  <Briefcase size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-poppins">
                  Micro-Internships & Projects
                </h3>
                <p className="text-sm leading-relaxed text-slate-555 font-medium">
                  Apply your concepts to the real world. Secure pocket money stipends, build practical skills, work with mentors, and earn completion certificates to make your high school profile stand out.
                </p>
                <Link href="/internships">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-200 text-xs cursor-pointer flex items-center gap-2 shadow-sm">
                    <span>Explore Internships Wing</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="w-full lg:w-96 shrink-0 bg-white border border-slate-200 rounded-[2rem] p-6 text-left space-y-3 font-semibold text-xs text-slate-700 shadow-sm">
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Technical Micro Projects</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Content & Copywriting Gigs</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Badges & Mentorship Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Highlighted Course Modules Section (Styled identically to the Course Tab) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b-4 border-navy scroll-mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-fredoka text-navy mb-4">
              Featured Board Preparation Courses
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
              Explore subject-specific modules designed around CBSE and State Board guidelines to maximize your board exam success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="cartoon-card p-6 flex flex-col items-center text-center group"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-navy shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${feat.bg} mb-4 text-navy group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold font-fredoka text-navy mb-2">{feat.title}</h3>
                  <p className="text-sm font-semibold text-slate-550 leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/courses">
              <button className="cartoon-btn cartoon-btn-yellow text-sm px-8 py-3.5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                Explore Learning Wing 🚀
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🚀 5. Why Choose Vidyatraa */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3.5 py-1 rounded-full shadow-sm inline-block">Quality & Trust</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins leading-tight">
              A Platform Built for Deserving Students
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We eliminate stress and lack of information. We build portals that help students understand their core performance and assist EWS families in funding college tuition.
            </p>

            <div className="flex gap-4 items-center p-4 bg-slate-50/60 border border-slate-200 rounded-2xl shadow-sm">
              <div className="p-3 bg-emerald-500/10 border border-emerald-200 rounded-xl text-[#0f172a]">
                <ShieldCheck size={24} />
              </div>
              <div className="text-left space-y-0.5">
                <h5 className="font-extrabold text-slate-900 text-sm">100% Audited Directory</h5>
                <p className="text-xs text-slate-550 font-bold">Every single scholarship listing is verified by our team.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              { title: "AI Eligibility Match", body: "Filter by state, income levels, and academic criteria to find matches instantly.", icon: Sparkles, color: "bg-amber-500/10 border-amber-200 text-amber-600" },
              { title: "Structured Curriculum", body: "Access revision notes and formulas structured around Class 10 board guidelines.", icon: GraduationCap, color: "bg-sky-500/10 border-sky-200 text-blue-600" },
              { title: "Diagnostic Mock Papers", body: "Solve mock questions to build confidence, identify gaps, and calculate projections.", icon: FileText, color: "bg-rose-500/10 border-rose-200 text-rose-500" },
              { title: "Portfolio Building", body: "Excel in class and work on student internships to stand out from other candidates.", icon: Briefcase, color: "bg-emerald-500/10 border-emerald-200 text-emerald-600" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-50/60 border border-slate-200 rounded-[2rem] p-6 space-y-3 hover:bg-white hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`p-2.5 w-fit rounded-xl border-2 border-slate-200 ${item.color}`}>
                    <Icon size={18} />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{item.title}</h4>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 6. Ecosystem Specs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/30 border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3.5 py-1 rounded-full shadow-sm inline-block">Specifications</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">
              Ecosystem Platform Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {platformCapabilities.map((m, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50/80 px-2.5 py-0.5 rounded border border-blue-100/50 w-fit inline-block">{m.title}</span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">{m.label}</h4>
                </div>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-6">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 7. Testimonials (Organic speech blockquotes) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-14">
          <div className="space-y-3">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3.5 py-1 rounded-full shadow-sm inline-block">Feedback</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">
              What Students & Parents Say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="space-y-4">
                  <span className="text-4xl text-indigo-300/60 font-serif leading-none select-none">“</span>
                  <p className="text-xs sm:text-sm leading-relaxed italic -mt-2 text-slate-655 font-semibold">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-100/80 w-full">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-650 text-white flex items-center justify-center text-xs font-bold shadow-md shrink-0">
                    {test.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{test.author}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{test.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 7.5 Instagram Feed Integration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
            <div className="space-y-3 text-left">
              <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 px-3.5 py-1 rounded-full text-rose-600 font-bold text-xs">
                <InstagramIcon size={14} className="text-rose-500" />
                <span>On Socials</span>
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">
                Follow our journey
              </h2>
              <p className="text-slate-500 font-bold text-xs md:text-sm">
                Get daily study hacks, exam strategies, and product updates on Instagram.
              </p>
            </div>
            
            <a 
              href="https://www.instagram.com/vidyatraa.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-95 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg shadow-pink-500/20 transition-all hover:-translate-y-0.5"
            >
              <InstagramIcon size={16} />
              <span>@vidyatraa.app</span>
            </a>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Post 1 */}
            <a 
              href="https://www.instagram.com/vidyatraa.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[2rem] overflow-hidden border border-slate-200 shadow-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex flex-col justify-between text-white"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">STUDY HACKS</span>
                <span className="text-xl">📚</span>
              </div>
              <div className="space-y-2 text-left font-poppins">
                <h3 className="text-lg font-black leading-tight">5 Productivity Hacks for Board Exams ⚡</h3>
                <p className="text-[10px] text-white/80 font-bold">Swipe to learn how to organize study blocks and maximize focus intervals.</p>
              </div>
              
              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-sm font-black">
                <span className="flex items-center gap-1.5"><Heart size={18} className="fill-white" /> 1,240</span>
                <span className="flex items-center gap-1.5"><MessageSquare size={18} className="fill-white" /> 48</span>
              </div>
            </a>

            {/* Post 2 */}
            <a 
              href="https://www.instagram.com/vidyatraa.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[2rem] overflow-hidden border border-slate-200 shadow-md bg-gradient-to-br from-sky-400 via-indigo-600 to-purple-800 p-6 flex flex-col justify-between text-white"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">APP FEATURE</span>
                <span className="text-xl">🤖</span>
              </div>
              <div className="space-y-2 text-left font-poppins">
                <h3 className="text-lg font-black leading-tight">Meet your new AI Study Assistant! ✨</h3>
                <p className="text-[10px] text-white/80 font-bold">Ask any doubts, get customized tests, and rise up career lanes.</p>
              </div>
              
              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-sm font-black">
                <span className="flex items-center gap-1.5"><Heart size={18} className="fill-white" /> 980</span>
                <span className="flex items-center gap-1.5"><MessageSquare size={18} className="fill-white" /> 35</span>
              </div>
            </a>

            {/* Post 3 */}
            <a 
              href="https://www.instagram.com/vidyatraa.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[2rem] overflow-hidden border border-slate-200 shadow-md bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 p-6 flex flex-col justify-between text-white"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">COMMUNITY</span>
                <span className="text-xl">🏆</span>
              </div>
              <div className="space-y-2 text-left font-poppins">
                <h3 className="text-lg font-black leading-tight">Vidyatraa Scholars Program 🎓</h3>
                <p className="text-[10px] text-white/80 font-bold">Applications are open for nationwide student aid. Find matches today.</p>
              </div>
              
              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-sm font-black">
                <span className="flex items-center gap-1.5"><Heart size={18} className="fill-white" /> 1,540</span>
                <span className="flex items-center gap-1.5"><MessageSquare size={18} className="fill-white" /> 62</span>
              </div>
            </a>

          </div>

        </div>
      </section>

      {/* 🚀 8. FAQs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/30 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3.5 py-1 rounded-full shadow-sm inline-block">Support</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex justify-between items-center text-left text-sm font-extrabold text-slate-800 focus:outline-none font-poppins"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                      >
                        <p className="p-5 text-xs leading-relaxed font-semibold text-slate-500 text-left">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 9. Final CTA (Playful, Extraordinary Neo-Brutalist redesign) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-sky-50/50 border-t-4 border-navy relative overflow-hidden">
        {/* Bobbing animated background emojis */}
        <div className="absolute top-12 left-10 text-4xl select-none opacity-20 animate-bounce-slow">📚</div>
        <div className="absolute bottom-12 right-12 text-4xl select-none opacity-20 animate-bounce-slow" style={{ animationDelay: "1s" }}>💰</div>
        <div className="absolute top-1/3 right-10 text-4xl select-none opacity-20 animate-bounce-slow" style={{ animationDelay: "2s" }}>🎓</div>
        <div className="absolute bottom-1/3 left-12 text-4xl select-none opacity-20 animate-bounce-slow" style={{ animationDelay: "1.5s" }}>⚡</div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="cartoon-card bg-gradient-to-br from-yellow-50 to-amber-50 p-8 sm:p-14 border-3 border-navy shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center space-y-8">
            <div className="space-y-4">
              <span className="bg-primary text-white border-2 border-navy text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] inline-block">
                Start Your Journey Today
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-fredoka text-navy leading-tight">
                Build Your Knowledge.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-650">Secure Your Funding.</span>
              </h2>
              <p className="text-sm sm:text-base font-bold text-slate-650 max-w-xl mx-auto leading-relaxed">
                Access structured Class 10 board preparation guidelines on Vidyatraa Prep, match with verified government and private scholarship opportunities, or start earn-and-learn micro-internships!
              </p>
            </div>

            {/* Visual split preview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
              <div className="cartoon-card-flat bg-white border-2 border-navy p-5 space-y-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-transform">
                <span className="text-3xl">📚</span>
                <h4 className="font-extrabold font-fredoka text-navy text-base">Vidyatraa Prep</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  Formula cards, chapter summaries, personalized mistake logbooks, and score predictors.
                </p>
              </div>

              <div className="cartoon-card-flat bg-white border-2 border-navy p-5 space-y-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-transform">
                <span className="text-3xl">💰</span>
                <h4 className="font-extrabold font-fredoka text-navy text-base">Scholarship Hub</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  100% verified state, national, and trust financial aid schemes matched to your eligibility.
                </p>
              </div>

              <div className="cartoon-card-flat bg-white border-2 border-navy p-5 space-y-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-transform">
                <span className="text-3xl">💼</span>
                <h4 className="font-extrabold font-fredoka text-navy text-base">Student Internships</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  Real micro-projects, translation, writing, and digital tasks curated for high-school students.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 pt-6 border-t-2 border-dashed border-navy/25">
              <Link href="/courses">
                <button className="cartoon-btn cartoon-btn-sky px-8 py-3.5 text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2">
                  <span>Start Learning</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/search">
                <button className="cartoon-btn cartoon-btn-yellow px-8 py-3.5 text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                  Find Scholarships 💸
                </button>
              </Link>
              <Link href="/internships">
                <button className="cartoon-btn cartoon-btn-white px-8 py-3.5 text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] bg-slate-900 text-white hover:bg-slate-800">
                  Apply to Internships 💼
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathon Announcement Popup */}
      <AnimatePresence>
        {showHackathonPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-white border-3 border-[#0f172a] shadow-[8px_8px_0_0_#0f172a] rounded-[2rem] p-6 text-center space-y-5 overflow-hidden"
            >
              {/* Pattern lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#0f172a03_1.5px,transparent_1.5px)] bg-[size:1rem_1rem] pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setShowHackathonPopup(false)}
                className="absolute top-4 right-4 w-7 h-7 border-2 border-[#0f172a] rounded-lg bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-[1px_1px_0_0_#0f172a] cursor-pointer focus:outline-none"
                aria-label="Close Announcement Dialog"
              >
                <span className="font-extrabold text-xs">×</span>
              </button>

              {/* Glowing Trophy Badge */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-[#0f172a] flex items-center justify-center text-[#0f172a] shadow-[3px_3px_0_0_#0f172a] mx-auto animate-bounce mt-2 shrink-0">
                <Trophy size={26} />
              </div>

              {/* Heading */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-black text-amber-600 bg-yellow-50 border border-yellow-250 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  REGISTRATION OPEN
                </span>
                <h3 className="text-xl font-black font-fredoka text-navy pt-2">
                  Vidyatraa Hackathon 1.0
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  National Level Physical Coding Arena
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl">
                  <p className="text-[8px] font-bold text-slate-400 uppercase">Prize Pool</p>
                  <p className="text-sm font-extrabold text-sky-850">₹3,00,000</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                  <p className="text-[8px] font-bold text-slate-400 uppercase">Tracks</p>
                  <p className="text-sm font-extrabold text-purple-850">50 Domains</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-[8px] font-bold text-slate-400 uppercase">Date</p>
                  <p className="text-xs font-extrabold text-amber-850">Dec 25-26, 2026</p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <p className="text-[8px] font-bold text-slate-400 uppercase">Venue</p>
                  <p className="text-[10px] font-extrabold text-rose-850 font-sans">Hyderabad Campus</p>
                </div>
              </div>

              {/* Notice text */}
              <p className="text-[9px] text-slate-400 font-bold leading-normal bg-slate-50 border border-dashed border-slate-200 p-2.5 rounded-xl font-sans">
                ⚠️ Conduction mode is offline. Exact campus location details will be announced on December 22, 2026.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/hackathon" onClick={() => setShowHackathonPopup(false)}>
                  <button className="w-full cartoon-btn cartoon-btn-yellow py-3 text-xs shadow-[3px_3px_0_0_#0f172a] font-fredoka flex items-center justify-center gap-2 cursor-pointer">
                    <span>Explore Hackathon Page</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <button 
                  onClick={() => setShowHackathonPopup(false)}
                  className="w-full text-slate-400 hover:text-navy text-[10px] font-extrabold uppercase py-1.5 transition-colors cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
