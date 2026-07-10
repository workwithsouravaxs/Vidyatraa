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
  Briefcase
} from 'lucide-react';

export default function RedesignedHome() {
  const [mounted, setMounted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
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
    <div className="flex flex-col min-h-screen bg-slate-50/50 text-slate-800 overflow-x-hidden font-poppins">
      
      {/* 🚀 1. The Hero Section (Introducing Vidyatraa) */}
      <section className="relative flex flex-col items-center justify-center py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent overflow-hidden">
        {/* Floating gradient assets */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Interactive Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full text-center relative z-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 shadow-sm"
          >
            <Sparkles size={13} className="text-amber-500 animate-pulse" />
            <span>The Unified Student Success Ecosystem</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-slate-900 font-poppins"
            >
              Master Your Exams.<br />
              Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Future.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 font-normal max-w-3xl mx-auto leading-relaxed"
            >
              Vidyatraa is a single, unified environment built for Indian students. We combine secondary board exam preparation with AI-powered scholarship matching and student micro-projects, helping you excel in the classroom, build portfolios, and secure funding for your future studies.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link href="/courses">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] shadow-[0_4px_20px_rgba(37,99,235,0.2)] text-xs cursor-pointer">
                Explore Courses & Prep
              </button>
            </Link>
            <Link href="/search">
              <button className="bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-8 rounded-2xl border border-slate-200 transition-all duration-200 transform hover:scale-[1.02] text-xs cursor-pointer shadow-sm">
                Find Scholarships
              </button>
            </Link>
            <Link href="/internships">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] text-xs cursor-pointer shadow-sm">
                View Internships
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🚀 2. The Story: The Problems We Solve */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">The Challenge</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-poppins">
              Eliminating the Friction in Student Journeys
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Every year, thousands of deserving students lose critical academic momentum and career funding due to three core friction points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Friction 1 */}
            <div className="p-8 rounded-3xl border border-slate-200/80 bg-slate-50/50 space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-rose-50 border border-rose-100 text-rose-500">
                  <AlertTriangle size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-poppins">1. Board Exam Stress & Cramming</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  Many secondary students study hard but lack clear revision notes, cheat sheets, and active mock diagnostics. This creates anxiety and limits potential before final board evaluations.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 text-xs font-bold text-indigo-600 flex items-center gap-1.5 cursor-pointer">
                <Link href="/courses" className="flex items-center gap-1 hover:text-indigo-700">
                  <span>Explore Prep Wing</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Friction 2 */}
            <div className="p-8 rounded-3xl border border-slate-200/80 bg-slate-50/50 space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-amber-50 border border-amber-100 text-amber-500">
                  <FolderLock size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-poppins">2. Hidden Grants & Rules</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  Over ₹1,000 crores in educational grants go unclaimed annually. Finding these opportunities on outdated web directories with complex income filters is discouraging for families.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 text-xs font-bold text-indigo-600 flex items-center gap-1.5 cursor-pointer">
                <Link href="/search" className="flex items-center gap-1 hover:text-indigo-700">
                  <span>Explore Scholarship Hub</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Friction 3 */}
            <div className="p-8 rounded-3xl border border-slate-200/80 bg-slate-50/50 space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-500">
                  <Briefcase size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-poppins">3. Lack of Portfolio & Gigs</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  Applying academic knowledge to actual projects is rare. Students lack opportunities to gain micro-experience, earn pocket stipends, and build credentials for future admissions or jobs.
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-4 text-xs font-bold text-indigo-600 flex items-center gap-1.5 cursor-pointer">
                <Link href="/internships" className="flex items-center gap-1 hover:text-indigo-700">
                  <span>Explore Internships Wing</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 3. The Journey: How We Help You Grow */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">The Roadmap</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-poppins">
              How Vidyatraa Guides You
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              A single pipeline connecting school learning, credential building, and financial aid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { num: "01", step: "Structured Study", desc: "Read revision notes, formula guides, and equation summaries on our courses dashboard.", icon: BookOpen, color: "text-amber-500 bg-amber-50 border-amber-100" },
              { num: "02", step: "Diagnostic Mock Practice", desc: "Attempt dynamic mock papers to build confidence and generate score projections.", icon: Activity, color: "text-rose-500 bg-rose-50 border-rose-100" },
              { num: "03", step: "Match Scholarships", desc: "Check income and category requirements instantly using our AI filter logic.", icon: Search, color: "text-blue-500 bg-blue-50 border-blue-100" },
              { num: "04", step: "Apply & Earn Gigs", desc: "Gather required documents, apply to financial aids, or start micro-internships.", icon: Award, color: "text-emerald-500 bg-emerald-50 border-emerald-100" }
            ].map((wk, idx) => {
              const Icon = wk.icon;
              return (
                <div key={idx} className="bg-white p-6 border border-slate-200/80 rounded-3xl space-y-4 hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl border ${wk.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{wk.num}</span>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900 font-poppins">{wk.step}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{wk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 4. Product Offerings (Prep, Scholarships, Internships) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-poppins">
              Explore Our Core Portals
            </h2>
          </div>

          <div className="space-y-12">
            {/* WING A: Vidyatraa Prep */}
            <div className="p-8 sm:p-12 rounded-3xl border border-slate-250/80 shadow-sm flex flex-col lg:flex-row gap-12 items-center hover:border-blue-300 transition-all">
              <div className="flex-1 space-y-6 text-left">
                <div className="p-3 w-fit rounded-2xl bg-amber-50 border border-amber-100 text-amber-500">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-poppins">
                  Vidyatraa Prep & Courses
                </h3>
                <p className="text-sm leading-relaxed text-slate-550">
                  Study for your Class 10 board exams with premium study aids. We offer formula catalogs, interactive practice papers, dynamic doubt solvers, and mistake trackers that help you understand what went wrong on your tests.
                </p>
                <Link href="/courses">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 text-xs shadow-md mt-2 cursor-pointer">
                    <span>Explore Learning Wing</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="w-full lg:w-96 shrink-0 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left space-y-3 font-semibold text-xs text-slate-700">
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Subject-wise Formula Cards</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Dynamic MCQ Mock Exams</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Personal Mistake Ledgers</p>
              </div>
            </div>

            {/* WING B: AI Scholarship Hub */}
            <div className="p-8 sm:p-12 rounded-3xl border border-slate-250/80 shadow-sm flex flex-col lg:flex-row gap-12 items-center hover:border-indigo-300 transition-all">
              <div className="flex-1 space-y-6 text-left">
                <div className="p-3 w-fit rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <Award size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-poppins">
                  AI Scholarship Hub
                </h3>
                <p className="text-sm leading-relaxed text-slate-550">
                  Discover verified financial support opportunities. Our platform parses complex criteria, matches you with state and national databases, and generates checklists to make applications painless.
                </p>
                <Link href="/search">
                  <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 text-xs shadow-md mt-2 cursor-pointer">
                    <span>Explore Funding Wing</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="w-full lg:w-96 shrink-0 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left space-y-3 font-semibold text-xs text-slate-700">
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> State Schemes (Telangana & AP SSC)</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> National Merit Schemes (PMSSS, etc.)</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Private Trust Scholarships</p>
              </div>
            </div>

            {/* WING C: Internships & Micro-Projects */}
            <div className="p-8 sm:p-12 rounded-3xl border border-slate-250/80 shadow-sm flex flex-col lg:flex-row gap-12 items-center hover:border-emerald-300 transition-all">
              <div className="flex-1 space-y-6 text-left">
                <div className="p-3 w-fit rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-500">
                  <Briefcase size={28} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-poppins">
                  Micro-Internships & Projects
                </h3>
                <p className="text-sm leading-relaxed text-slate-550">
                  Apply your concepts to the real world. Secure pocket money stipends, build practical skills, work with mentors, and earn completion certificates to make your high school profile stand out.
                </p>
                <Link href="/internships">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-650 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 text-xs shadow-md mt-2 cursor-pointer">
                    <span>Explore Internships Wing</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>

              <div className="w-full lg:w-96 shrink-0 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left space-y-3 font-semibold text-xs text-slate-700">
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Technical Micro Projects</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Content & Copywriting Gigs</p>
                <p className="flex items-center gap-2 text-slate-800"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Badges & Mentorship Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Highlighted Course Modules Section (Styled in Cartoon style used in Courses Section) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Vidyatraa Prep Curriculum</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-poppins">
              Featured Board Preparation Courses
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Explore subject-specific modules designed around CBSE and State Board guidelines to maximize your board exam success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Mathematics Course", desc: "Structured guides covering Algebra, Geometry, Trigonometry, and Statistics. Includes 500+ solved board questions.", icon: BookOpen, bg: "bg-sky-100 text-sky-850 border-sky-300" },
              { title: "Science & Technology", desc: "Physics, Chemistry, and Biology concept sheets, diagrams, and step-by-step chemical equations.", icon: Target, bg: "bg-indigo-100 text-indigo-800 border-indigo-300" },
              { title: "AI Doubt Resolution", desc: "Scan and solve hard mathematical problems or physics equations instantly with step-by-step guidance.", icon: Sparkles, bg: "bg-amber-100 text-amber-800 border-amber-300" },
              { title: "Full Syllabus Mock Simulator", desc: "Time-bound simulated board exam sessions mapping exactly to official marking matrices.", icon: Activity, bg: "bg-purple-100 text-purple-800 border-purple-300" },
              { title: "Personalized Mistake Book", desc: "Keep track of questions you answered incorrectly during quizzes and revise them automatically.", icon: FileText, bg: "bg-rose-100 text-rose-800 border-rose-300" },
              { title: "Daily Practice Challenges", desc: "Maintain your study streaks with quick 20-question revision tasks across math and science subjects.", icon: TrendingUp, bg: "bg-orange-100 text-orange-850 border-orange-300" }
            ].map((course, idx) => {
              const Icon = course.icon;
              return (
                <div key={idx} className="cartoon-card p-6 flex flex-col items-center text-center group bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-navy shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${course.bg} mb-4 text-navy group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-navy mb-2 font-poppins">{course.title}</h3>
                  <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-6 flex-grow">{course.desc}</p>
                  <Link href="/courses" className="cartoon-btn cartoon-btn-yellow text-xs px-6 py-2.5 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] w-full">
                    Explore Prep Wing
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 5. Why Choose Vidyatraa */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Quality & Trust</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-poppins leading-tight">
              A Platform Built for Deserving Students
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We eliminate stress and lack of information. We build portals that help students understand their core performance and assist EWS families in funding college tuition.
            </p>

            <div className="flex gap-4 items-center p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-500">
                <ShieldCheck size={24} />
              </div>
              <div className="text-left space-y-0.5">
                <h5 className="font-bold text-slate-900 text-sm font-poppins">100% Audited Directory</h5>
                <p className="text-xs text-slate-500 leading-normal">Every single scholarship listing is verified by our team.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {[
              { title: "AI Eligibility Match", body: "Filter by state, income levels, and academic criteria to find matches instantly.", icon: Sparkles, color: "text-amber-500 bg-amber-50 border-amber-100" },
              { title: "Structured Curriculum", body: "Access revision notes and formulas structured around Class 10 board guidelines.", icon: GraduationCap, color: "text-blue-500 bg-blue-50 border-blue-100" },
              { title: "Diagnostic Mock Papers", body: "Solve mock questions to build confidence, identify gaps, and calculate projections.", icon: FileText, color: "text-rose-500 bg-rose-50 border-rose-100" },
              { title: "Portfolio Building", body: "Excel in class and work on student internships to stand out from other candidates.", icon: Briefcase, color: "text-emerald-500 bg-emerald-50 border-emerald-100" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 bg-white border border-slate-200/80 rounded-3xl space-y-3 hover:shadow-sm transition-all">
                  <div className={`p-2.5 w-fit rounded-xl border ${item.color}`}>
                    <Icon size={18} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-poppins">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 6. Ecosystem Specs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Specifications</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-poppins">
              Ecosystem Platform Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {platformCapabilities.map((m, idx) => (
              <div key={idx} className="p-6 border border-slate-200 rounded-3xl bg-white flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{m.title}</span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug font-poppins">{m.label}</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mt-6">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 7. Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center space-y-14">
          <div className="space-y-3">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Feedback</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-poppins">
              What Students & Parents Say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="flex flex-col items-center bg-slate-50/50 border border-slate-200 rounded-3xl p-6 md:p-8 text-left hover:shadow-sm transition-all">
                <p className="text-xs sm:text-sm leading-relaxed italic mb-6 text-slate-500 font-medium">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 w-full">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${test.colorClass}`}>
                    {test.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 font-poppins">{test.author}</p>
                    <p className="text-[10px] text-slate-500 font-semibold">{test.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 8. FAQs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Support</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-poppins">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex justify-between items-center text-left text-xs sm:text-sm font-bold text-slate-900 focus:outline-none font-poppins"
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
                        className="overflow-hidden border-t border-slate-200 bg-slate-50/50"
                      >
                        <p className="p-5 text-xs leading-relaxed font-medium text-slate-500 text-left">
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

      {/* 🚀 9. Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-50/60 border-t border-slate-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-poppins leading-tight">
            Build Your Knowledge. Secure Your Funding.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Access board preparation syllabus tools on Vidyatraa Prep, or match with verified government and private scholarship opportunities.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/courses">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] shadow-[0_4px_20px_rgba(37,99,235,0.2)] text-xs cursor-pointer">
                Start Learning
              </button>
            </Link>
            <Link href="/search">
              <button className="bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-8 rounded-2xl border border-slate-200 transition-all duration-200 transform hover:scale-[1.02] text-xs cursor-pointer shadow-sm">
                Find Scholarships
              </button>
            </Link>
            <Link href="/internships">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] text-xs cursor-pointer shadow-sm">
                Apply to Internships
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
