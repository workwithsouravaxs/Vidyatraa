'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Calendar,
  Clock,
  Play,
  Users,
  Building,
  Map,
  BookOpen,
  Award,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Code,
  Shield,
  Heart,
  Sprout,
  DollarSign,
  GraduationCap,
  Lightbulb,
  CheckCircle,
  Mail,
  Phone,
  MessageCircle,
  ChevronRight,
  Info,
  Scale,
  Sliders,
  Plus,
  Minus,
  Search,
  Globe,
  Video,
  Terminal,
  Cpu,
  Database,
  Server,
  Layers,
  Activity,
  Laptop,
  Smartphone,
  Cloud,
  Network,
  Binary,
  Compass,
  Zap,
  UserCheck,
  Briefcase,
  MapPin,
  Gift,
  Menu as MenuIcon,
  X as XIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Types & Interfaces
interface DomainTrack {
  id: number;
  name: string;
  category: 'AI & Data Science' | 'Development & Cloud' | 'Hardware & Specialty' | 'Industry & TechSectors';
  description: string;
}

interface StatItem {
  label: string;
  target: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

export default function HackathonLanding() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeScheduleDay, setActiveScheduleDay] = useState<'day1' | 'overnight' | 'day2'>('day1');
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Pagination Visible Limits State
  const [visibleTracksLimit, setVisibleTracksLimit] = useState(20);
  const [visibleSpeakersLimit, setVisibleSpeakersLimit] = useState(20);
  const [visibleMentorsLimit, setVisibleMentorsLimit] = useState(20);
  const [visibleSponsorsLimit, setVisibleSponsorsLimit] = useState(20);
  const [visiblePartnersLimit, setVisiblePartnersLimit] = useState(20);

  // Countdown states: registrations vs kickoff event
  const [timeLeftReg, setTimeLeftReg] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeLeftEvent, setTimeLeftEvent] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Interactive Judging weights state (custom prioritization simulator)
  const [judgingWeights, setJudgingWeights] = useState({
    innovation: 25,
    technicalComplexity: 25,
    uiUx: 15,
    businessPotential: 15,
    scalability: 10,
    presentation: 5,
    impact: 5
  });

  // Animated Counter Values
  const [counterValues, setCounterValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Window Resize Hook for Mobile Detection & Limit Adjustment
  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      const mobileStatus = window.innerWidth < 640;
      setIsMobile(mobileStatus);
      // Initialize limit sets
      setVisibleTracksLimit(mobileStatus ? 10 : 20);
      setVisibleSpeakersLimit(mobileStatus ? 10 : 20);
      setVisibleMentorsLimit(mobileStatus ? 10 : 20);
      setVisibleSponsorsLimit(mobileStatus ? 10 : 20);
      setVisiblePartnersLimit(mobileStatus ? 10 : 20);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Calculate time left (July 24 vs Dec 25)
    const regTargetDate = new Date('2026-07-24T09:00:00+05:30').getTime();
    const eventTargetDate = new Date('2026-12-25T09:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();

      // Reg Countdown
      const diffReg = regTargetDate - now;
      if (diffReg <= 0) {
        setTimeLeftReg({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diffReg / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffReg % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffReg % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffReg % (1000 * 60)) / 1000);
        setTimeLeftReg({ days, hours, minutes, seconds });
      }

      // Event Countdown
      const diffEvent = eventTargetDate - now;
      if (diffEvent <= 0) {
        setTimeLeftEvent({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diffEvent / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffEvent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffEvent % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffEvent % (1000 * 60)) / 1000);
        setTimeLeftEvent({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Animate stats counters
    const statTargets = [1500, 200, 50, 20, 20, 20];
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const counterInterval = setInterval(() => {
      currentStep++;
      setCounterValues(prev => 
        statTargets.map((target, idx) => {
          const progress = currentStep / steps;
          const nextVal = Math.floor(target * progress);
          return nextVal > target ? target : nextVal;
        })
      );

      if (currentStep >= steps) {
        clearInterval(counterInterval);
      }
    }, stepTime);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
      clearInterval(counterInterval);
    };
  }, []);

  const triggerRegistrationConfetti = () => {
    const end = Date.now() + (2 * 1000);
    const colors = ['#38bdf8', '#fbbf24', '#34d399', '#f97316'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleWeightChange = (key: keyof typeof judgingWeights, increment: boolean) => {
    const step = 5;
    setJudgingWeights(prev => {
      const current = prev[key];
      const next = increment ? Math.min(100, current + step) : Math.max(0, current - step);
      return {
        ...prev,
        [key]: next
      };
    });
  };

  const totalWeights = Object.values(judgingWeights).reduce((a, b) => a + b, 0);

  // List of 50 Domain Tracks
  const domainTracks: DomainTrack[] = [
    { id: 1, name: 'Artificial Intelligence (AI)', category: 'AI & Data Science', description: 'Agentic workflows, predictive analysis, and intelligent utilities.' },
    { id: 2, name: 'Machine Learning (ML)', category: 'AI & Data Science', description: 'Custom pattern matching, model training, and classifier systems.' },
    { id: 3, name: 'Deep Learning', category: 'AI & Data Science', description: 'Multi-layer neural network implementations and tensor analytics.' },
    { id: 4, name: 'Generative AI', category: 'AI & Data Science', description: 'Large Language Model integrations, generation scripts, and LLM wrappers.' },
    { id: 5, name: 'Data Science', category: 'AI & Data Science', description: 'Dataset cleaning, processing models, and visual projections.' },
    { id: 6, name: 'Data Analytics', category: 'AI & Data Science', description: 'Insight mapping, statistical pipelines, and dashboard tracking.' },
    { id: 7, name: 'Computer Vision', category: 'AI & Data Science', description: 'Image classification, object tracking, and edge visual processing.' },
    { id: 8, name: 'Natural Language Processing (NLP)', category: 'AI & Data Science', description: 'Text synthesis, regional language translators, and parsing models.' },
    { id: 9, name: 'Cybersecurity', category: 'Hardware & Specialty', description: 'Penetration testing scripts, vulnerability checks, and security protocols.' },
    { id: 10, name: 'Blockchain', category: 'Hardware & Specialty', description: 'Smart contracts validation, digital ledger syncs, and verification.' },
    { id: 11, name: 'Web Development', category: 'Development & Cloud', description: 'Responsive site designs, server structures, and dynamic web layouts.' },
    { id: 12, name: 'Frontend Development', category: 'Development & Cloud', description: 'Fluid UI state transitions, responsive interfaces, and styling systems.' },
    { id: 13, name: 'Backend Development', category: 'Development & Cloud', description: 'Optimized API layouts, request controllers, and cache handlers.' },
    { id: 14, name: 'Full Stack Development', category: 'Development & Cloud', description: 'End-to-end user interfaces linked with active databases.' },
    { id: 15, name: 'Mobile App Development', category: 'Development & Cloud', description: 'Cross-platform mobile packages and native application pipelines.' },
    { id: 16, name: 'Cloud Computing', category: 'Development & Cloud', description: 'Serverless architecture, container workflows, and cloud storage.' },
    { id: 17, name: 'DevOps', category: 'Development & Cloud', description: 'Continuous deployment paths, build runners, and log managers.' },
    { id: 18, name: 'Internet of Things (IoT)', category: 'Hardware & Specialty', description: 'Sensors networking, hardware communications, and local controllers.' },
    { id: 19, name: 'Embedded Systems', category: 'Hardware & Specialty', description: 'Micro-controller algorithms, assembly execution, and firmware code.' },
    { id: 20, name: 'Robotics', category: 'Hardware & Specialty', description: 'Smart hardware motions, automated controls, and pathway sensors.' },
    { id: 21, name: 'AR/VR', category: 'Hardware & Specialty', description: 'Three-dimensional spatial rendering and immersive simulations.' },
    { id: 22, name: 'Mixed Reality', category: 'Hardware & Specialty', description: 'Bridging physical workspaces with interactive digital controls.' },
    { id: 23, name: 'Game Development', category: 'Development & Cloud', description: 'Interactive gameplay assets, rendering engines, and game loops.' },
    { id: 24, name: 'UI/UX Design', category: 'Development & Cloud', description: 'Aesthetic layouts, user testing paths, and accessibility checks.' },
    { id: 25, name: 'Product Design', category: 'Development & Cloud', description: 'Functional feature structures, workflows, and specifications.' },
    { id: 26, name: 'Human-Computer Interaction', category: 'Hardware & Specialty', description: 'Interactive design mechanics, gesture controls, and input models.' },
    { id: 27, name: 'Big Data', category: 'AI & Data Science', description: 'Scalable data structures, query optimizations, and stream parsers.' },
    { id: 28, name: 'Edge Computing', category: 'Development & Cloud', description: 'Local processing nodes and reduced latency response models.' },
    { id: 29, name: 'Quantum Computing', category: 'Hardware & Specialty', description: 'Qubit simulation scripts, complex equations, and quantum logic gates.' },
    { id: 30, name: 'FinTech', category: 'Industry & TechSectors', description: 'Micro-transactions validation, savings engines, and finance checkers.' },
    { id: 31, name: 'HealthTech', category: 'Industry & TechSectors', description: 'Wellness trackers, diagnosis advice templates, and medical software.' },
    { id: 32, name: 'EdTech', category: 'Industry & TechSectors', description: 'Gamified learning routes, online homework compilers, and study aids.' },
    { id: 33, name: 'AgriTech', category: 'Industry & TechSectors', description: 'Soil health analysis metrics, crop advisors, and smart watering plans.' },
    { id: 34, name: 'FoodTech', category: 'Industry & TechSectors', description: 'Supply chains logistics tracking and ingredients safety managers.' },
    { id: 35, name: 'ClimateTech', category: 'Industry & TechSectors', description: 'Carbon footprint projections, climate logs, and green utilities.' },
    { id: 36, name: 'Green Technology', category: 'Industry & TechSectors', description: 'Renewable power monitoring scripts and sustainable tech structures.' },
    { id: 37, name: 'Smart City Solutions', category: 'Hardware & Specialty', description: 'Traffic pattern adjustments, street utilities, and automated grids.' },
    { id: 38, name: 'Logistics & Supply Chain', category: 'Industry & TechSectors', description: 'Route optimization calculators and cargo delivery checkers.' },
    { id: 39, name: 'E-Commerce Technology', category: 'Industry & TechSectors', description: 'Shopping cart APIs, product recommendations, and vendor layouts.' },
    { id: 40, name: 'Social Impact Tech', category: 'Industry & TechSectors', description: 'Non-profit aid coordinators and open accessibility utilities.' },
    { id: 41, name: 'LegalTech', category: 'Industry & TechSectors', description: 'Contract parser tools and digitized document filing structures.' },
    { id: 42, name: 'HRTech', category: 'Industry & TechSectors', description: 'Skill matching profiles, onboarding guides, and review logs.' },
    { id: 43, name: 'Bioinformatics', category: 'AI & Data Science', description: 'Genome sequencing patterns, protein structures, and biological logs.' },
    { id: 44, name: 'Digital Twin', category: 'Hardware & Specialty', description: 'Software replicas of physical assets for real-time stress testing.' },
    { id: 45, name: 'SpaceTech', category: 'Hardware & Specialty', description: 'Orbit calculators, satellite packet checks, and telemetry logs.' },
    { id: 46, name: 'Drone Technology', category: 'Hardware & Specialty', description: 'Flight trajectory stabilizers and camera grid feeds.' },
    { id: 47, name: 'GIS & Geospatial', category: 'AI & Data Science', description: 'Map coordinate projections and geographic database indexing.' },
    { id: 48, name: 'Digital Forensics', category: 'Hardware & Specialty', description: 'Incident response records, file logs tracing, and integrity checkers.' },
    { id: 49, name: 'Automotive Tech', category: 'Hardware & Specialty', description: 'Telemetry diagnostic scripts and driver dashboard models.' },
    { id: 50, name: 'Industrial Automation', category: 'Hardware & Specialty', description: 'PLCs controllers communication and factory workflow monitors.' }
  ];

  const stats: StatItem[] = [
    { label: 'Expected Hackers', target: 1500, suffix: '+', icon: <Users size={16} />, color: 'bg-sky-50 text-sky-700 border-sky-300' },
    { label: 'Colleges Joining', target: 200, suffix: '+', icon: <Building size={16} />, color: 'bg-amber-50 text-amber-700 border-amber-300' },
    { label: 'Represented Cities', target: 50, suffix: '+', icon: <Map size={16} />, color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
    { label: 'Sponsor Slots Open', target: 20, suffix: '/20', icon: <Award size={16} />, color: 'bg-rose-50 text-rose-700 border-rose-300' },
    { label: 'Judges & Mentors Slots', target: 20, suffix: '/20', icon: <BookOpen size={16} />, color: 'bg-purple-50 text-purple-700 border-purple-300' },
    { label: 'Community Partners', target: 20, suffix: '/20', icon: <Sparkles size={16} />, color: 'bg-lime-50 text-lime-700 border-lime-300' }
  ];

  const prizes = [
    { rank: 'Grand 1st Prize', amount: '₹1,00,000', label: 'Cash Reward + Vidyatraa Incubation Priority', icon: <Trophy className="w-8 h-8 text-amber-500" />, color: 'bg-gradient-to-br from-amber-50 to-white border-amber-400 text-navy' },
    { rank: '2nd Prize Winner', amount: '₹60,000', label: 'Cash Reward + Premium Gadget Vouchers', icon: <Award className="w-8 h-8 text-slate-400" />, color: 'bg-gradient-to-br from-slate-50 to-white border-slate-355 text-navy' },
    { rank: '3rd Prize Winner', amount: '₹40,000', label: 'Cash Reward + Graphic Tablets Vouchers', icon: <Award className="w-8 h-8 text-orange-500" />, color: 'bg-gradient-to-br from-orange-50 to-white border-orange-400 text-navy' },
    { rank: 'Best Women Tech Coder', amount: '₹25,000', label: 'Awarded to promote diversity in engineering', icon: <Shield className="w-8 h-8 text-rose-500" />, color: 'bg-rose-50 border-rose-300 text-rose-850' },
    { rank: 'Best UI/UX Design', amount: '₹25,000', label: 'Awarded for visual polish and accessibility structures', icon: <Layers className="w-8 h-8 text-purple-500" />, color: 'bg-purple-50 border-purple-300 text-purple-850' },
    { rank: 'Best Innovative Idea', amount: '₹25,000', label: 'Awarded for out-of-the-box system complexity', icon: <Lightbulb className="w-8 h-8 text-emerald-500" />, color: 'bg-emerald-50 border-emerald-300 text-emerald-850' }
  ];

  const timelineSteps = [
    { title: 'Registration Opens', date: 'To be announced', desc: 'Secure your team slot free online.', status: 'upcoming' },
    { title: 'Registration Closes', date: 'December 15, 2026', desc: 'All hacker entries lock.', status: 'upcoming' },
    { title: 'Idea PPT Submission', date: 'December 18, 2026', desc: 'Upload 3-slide project draft online.', status: 'upcoming' },
    { title: 'Shortlisting Announced', date: 'December 22, 2026', desc: 'Top 100 teams clear to code.', status: 'upcoming' },
    { title: 'Check-in @ Host Campus', date: 'December 25, 2026 - 08:00 AM', desc: 'Collect passes, hacker bags, and venue guides.', status: 'upcoming' },
    { title: 'Hackathon Coding Kickoff', date: 'December 25, 2026 - 09:30 AM', desc: '36-hour physical timer begins.', status: 'upcoming' },
    { title: 'Evaluation & Presentation', date: 'December 26, 2026 - 09:00 PM', desc: 'Pitch functional prototypes to judges at campus.', status: 'upcoming' },
    { title: 'Results & Ceremonies', date: 'December 26, 2026 - 11:30 PM', desc: 'Handouts of awards and checks.', status: 'upcoming' }
  ];

  const scheduleDay1 = [
    { time: '7:30 – 9:00 AM', event: 'Registration & Kit Distribution', desc: 'Collect your offline entry pass, event stickers, custom notebooks, and developer shirts.', notes: 'ID badges, team tags, WiFi credentials, sponsor swag bags' },
    { time: '9:00 – 9:45 AM', event: 'Opening Ceremony', desc: 'Inaugural keynotes, safety layouts check, and guidelines briefing.', notes: 'Anthem, welcome address, chief guest speech' },
    { time: '9:45 – 10:30 AM', event: 'Sponsor Keynotes', desc: 'Live introduction of sponsors and their specific domain tracks (3–4 sponsors, 10 min each).', notes: 'Each sponsor introduces their problem statement/track live' },
    { time: '10:30 – 11:00 AM', event: 'Rules, Judging Criteria & Domain Briefing', desc: 'Overview of evaluation checkpoints, scoring schema, and submission formats.', notes: 'Explain checkpoints, scoring rubric, submission format' },
    { time: '11:00 AM', event: 'Hacking Begins (Official Start)', desc: 'The 36-hour physical timer begins running on the main screens.', notes: 'Timer displayed on main screen/stream' },
    { time: '11:00 AM – 1:00 PM', event: 'Ideation + Team Setup', desc: 'Brainstorming and initial repository setup on GitHub.', notes: 'Mentors circulate; sponsors visit their own domain tables' },
    { time: '1:00 – 2:00 PM', event: 'Lunch (Slot A/B to avoid rush)', desc: 'Fuel up and connect with other participants at the food panels.', notes: 'Sponsor booths open during lunch for informal networking' },
    { time: '2:00 – 4:00 PM', event: 'Deep Work Block', desc: 'Uninterrupted core development time in the dedicated coding zones.', notes: '“Do Not Disturb” hacking zone' },
    { time: '4:00 – 4:30 PM', event: 'Checkpoint 1 — Idea Validation', desc: 'Coordinators perform first architecture and idea validation reviews.', notes: 'Mentors + sponsor reps give 5-min feedback per team' },
    { time: '4:30 – 6:00 PM', event: 'Hacking Continues', desc: 'Refining code structure and setting up backend APIs.', notes: '' },
    { time: '6:00 – 6:30 PM', event: 'Energizer Break', desc: 'Flash Mob / Music / Games to reset energy levels on the floor.', notes: 'Short, loud, fun — resets energy' },
    { time: '6:30 – 8:00 PM', event: 'Hacking + Mentor Round 2', desc: 'Optional 1:1 troubleshooting and consulting slots with experts.', notes: 'Optional 1:1 slots' },
    { time: '8:00 – 9:00 PM', event: 'Dinner', desc: 'Enjoy hot food panels and discussions with team clans.', notes: '' },
    { time: '9:00 – 10:30 PM', event: 'Tech Talk / Sponsor Workshop', desc: 'Optional technical masterclasses and workshops hosted by sponsors.', notes: 'Counts toward “engagement points” for spectators too' },
    { time: '10:30 PM – 12:00 AM', event: 'Hacking + Midnight Snacks Rollout', desc: 'Snack panels open with coffee, energy drinks, and quick bites.', notes: 'Coffee/Red Bull station opens' },
    { time: '12:00 AM', event: 'Checkpoint 2 — Progress Demo', desc: 'Informal progress demo (2 min/team) to keep teams on track.', notes: 'Keeps teams honest on progress, no elimination' }
  ];

  const scheduleOvernight = [
    { time: '12:00 – 3:00 AM', event: 'Deep Hacking (low-noise zone)', desc: 'Focused building block with minimal distractions, dim lighting, and quiet music.', notes: 'Dim lighting, quiet music, dedicated helpdesk open' },
    { time: '3:00 – 3:30 AM', event: 'Midnight Gaming Break', desc: 'Optional recreational gaming corner for a quick team reset.', notes: 'FIFA/Valorant/board games corner for teams needing a reset' },
    { time: '3:30 – 6:00 AM', event: 'Hacking Continues', desc: 'Midnight development blocks; volunteer support team remains active.', notes: 'Volunteers do rounds with snacks/water' },
    { time: '6:00 – 7:00 AM', event: 'Sunrise Break / Fresh-up Slots', desc: 'Freshen up and take a short walk or stretch break.', notes: 'Washrooms, short walk, stretch break announced' },
    { time: '7:00 – 8:00 AM', event: 'Breakfast', desc: 'Hot breakfast to charge up team batteries for the final stretch.', notes: '' },
    { time: '8:00 – 9:00 AM', event: 'Hacking Resumes + Checkpoint 3', desc: 'Mandatory tech sync and feature freeze warning.', notes: '“6 hours to final submission” countdown begins' }
  ];

  const scheduleDay2 = [
    { time: '9:00 – 11:00 AM', event: 'Final Development Sprint', desc: 'Focusing on bug-squashing and stability. No new features.', notes: 'Mentors help only with bugs, not new features' },
    { time: '11:00 – 11:30 AM', event: 'Pitch Deck / Demo Video Prep Briefing', desc: 'Briefing on the final submission requirements and video demo formatting.', notes: 'Format, time limit, submission link shared' },
    { time: '11:30 AM – 1:00 PM', event: 'Final Touches + Submission Window Opens', desc: 'Uploading code and preparing final submissions with a live counter.', notes: 'Live “teams submitted” counter on screen for audience' },
    { time: '1:00 – 1:45 PM', event: 'Lunch', desc: 'A quick break before evaluations and judging rounds start.', notes: '' },
    { time: '1:45 PM', event: 'Hard Submission Deadline', desc: 'All submissions must be locked in. Portal locks completely.', notes: 'Portal locks — no late entries' },
    { time: '2:00 – 4:30 PM', event: 'Preliminary Judging Round (parallel tracks)', desc: 'Sponsors evaluate specific domain tracks in assigned rooms.', notes: 'Sponsors judge their own domains; faculty/industry judge open tracks' },
    { time: '2:00 – 4:30 PM', event: '(Parallel) Audience Engagement Zone', desc: 'Booths, gaming, and sponsor demo zones open for spectators.', notes: 'Gaming, AR/VR booths, sponsor demo booths, meme contest, photo booth' },
    { time: '4:30 – 5:00 PM', event: 'Shortlist Announcement', desc: 'Top teams per domain announced live on stream and big screens.', notes: 'Builds suspense — announce on stream + big screen' },
    { time: '5:00 – 6:30 PM', event: 'Grand Finale — Top Teams Pitch on Main Stage', desc: 'Finalist teams pitch live (5 min pitch + 3 min Q&A) to all judges and audience.', notes: 'Live audience + livestream; 5 min pitch + 3 min Q&A per team' },
    { time: '6:30 – 7:00 PM', event: 'Judges’ Deliberation', desc: 'Determining final rank positions; filled with live DJ set and lucky draws.', notes: 'Fill with a live performance / DJ set / sponsor lucky draw' },
    { time: '7:00 – 8:00 PM', event: 'Valedictory & Sponsor Recognition', desc: 'Acknowledging sponsors and organizers with thank-you videos.', notes: 'Certificates, sponsor thank-you videos, feedback collection' },
    { time: '8:00 – 8:45 PM', event: 'Prize Distribution & Closing Ceremony', desc: 'Crowning the domain winners and overall champions of Hackathon 1.0.', notes: 'Winners per domain + overall champion' },
    { time: '8:45 – 9:00 PM', event: 'Group Photo, Vote of Thanks, Wrap-up', desc: 'Concluding the 36-hour physical hackathon. Official close.', notes: 'Official close of 36-hour event' }
  ];

  const rulesData = {
    participation: [
      'Each team must consist of 2 to 4 members. Individual registration is allowed, and we will help you match with a team during the initial phase.',
      'Students from any stream, level, and college across India are eligible to apply. Yes, high school students are also highly welcome!',
      'Registration is 100% free of charge. No deposit or validation fees required.'
    ],
    submission: [
      'All source code must be submitted via a public GitHub repository.',
      'A short 2-minute video demo explaining the project is mandatory alongside the code link.',
      'Prototypes must be functional during evaluation; mock wireframes alone are not eligible for core cash awards.'
    ],
    conduct: [
      'We stand for safe, respectful peer workspaces. Harassment or abuse of any form triggers instant team disqualification.',
      'Respect mentor advice timings and judge evaluations.'
    ],
    plagiarism: [
      'Using pre-made open-source templates or starter boilerplates is fully fine, but copying a complete existing project from git is strictly banned.',
      'All submissions will pass automated originality check protocols.'
    ],
    judging: [
      'Decisions made by the panel of judges are final and binding.',
      'Teams must answer a 3-minute Q&A block post pitching session.'
    ],
    team: [
      'Changing team structure after registration locks requires coordinator approval.',
      'Cross-college teams are permitted.'
    ]
  };

  const faqs = [
    { q: 'Is there a registration fee to join Vidyatraa Hackathon 1.0?', a: 'No, it is 100% free for all students! We cover all events, workshops, food, and basic resources without any charges.' },
    { q: 'What is the maximum and minimum team size?', a: 'Each team must have between 2 to 4 members. If you are a solo hacker, register anyway! We will host a dedicated team-matching mixer on our Discord and on Day 1 morning.' },
    { q: 'Is this hackathon offline or online?', a: 'This hackathon is conducted Offline. The final 36-hour hacking sprint, mentoring, and judging pitches will take place physically at our Hyderabad Campus (Details to be announced).' },
    { q: 'Will food, snacks, and accommodation be provided?', a: 'Yes! For all attendees, we provide hot meals, constant streams of tea/coffee, snacks, and access to sleeping/resting rooms. Bring your laptop and your enthusiasm, we handle the rest!' },
    { q: 'Will certificates be provided?', a: 'Yes! Every registered participant who submits an eligible project prototype will receive a verifiable National Level Participation Certificate, sponsored by Vidyatraa.' },
    { q: 'What accommodation support is available for outstation teams?', a: 'Outstation teams who clear the initial shortlist will be offered shared hostel/guestroom accommodation near our campus for the duration of the hackathon at no extra charge.' },
    { q: 'Is there any travel reimbursement for outstation participants?', a: 'Yes! Top shortlisted teams coming from outside Hyderabad will be eligible for up to a 50% sleeper-class train/bus fare reimbursement, subject to ticket submission.' },
    { q: 'Who owns the Intellectual Property (IP) of the projects?', a: 'The participating teams own 100% of their IP. Vidyatraa holds no claims on your software. We only provide incubation resources if you choose to build a business out of it.' }
  ];

  // Helper component to render exactly 20 empty grids with slicing limits
  const renderEmptyGridsLimit = (slotLabel: string, limit: number) => {
    return Array.from({ length: 20 }).slice(0, limit).map((_, idx) => {
      const slotNum = String(idx + 1).padStart(2, '0');
      return (
        <div 
          key={idx} 
          className="cartoon-card border-2 border-dashed border-slate-350 p-4 flex flex-col justify-between items-center text-center bg-white/40 h-28 hover:bg-white hover:border-[#0f172a] transition-all animate-fade-in"
        >
          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-350">
            {slotNum}
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-[#0f172a] uppercase tracking-wide">{slotLabel} Slot</p>
            <p className="text-[9px] text-slate-400 font-bold mt-0.5">Pending Registry</p>
          </div>
        </div>
      );
    });
  };

  // Filter 50 Domain Tracks based on search and category
  const filteredDomains = domainTracks.filter(track => {
    const matchesSearch = track.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || track.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const visibleDomainsSlice = filteredDomains.slice(0, visibleTracksLimit);

  if (!mounted) return null;

  return (
    <div className="bg-[#fafafb] text-slate-900 font-poppins min-h-screen overflow-x-hidden pt-16">
      
      {/* Sticky Top Header Nav (Replaces global navbar) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-3 border-[#0f172a] shadow-[0_4px_0_0_#0f172a] py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo & Branding */}
          <a href="#" className="flex items-center gap-2 select-none group">
            <div className="relative w-9 h-9 border-2 border-[#0f172a] rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_#0f172a] group-hover:scale-105 transition-transform shrink-0 bg-white">
              <Image 
                src="/footer_logo.jpeg" 
                alt="Vidyatraa Header Logo" 
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <span className="text-sm md:text-lg font-black font-poppins tracking-wide text-navy whitespace-nowrap">
              Vidya<span className="text-primary">traa</span> Hackathon 1.0
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-[10px] font-extrabold uppercase font-poppins text-navy tracking-wide">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#statistics" className="hover:text-primary transition-colors">Stats</a>
            <a href="#tracks" className="hover:text-primary transition-colors">Tracks</a>
            <a href="#timeline" className="hover:text-primary transition-colors">Timeline</a>
            <a href="#prizes" className="hover:text-primary transition-colors">Prizes</a>
            <a href="#schedule" className="hover:text-primary transition-colors">Schedule</a>
            <a href="#rules" className="hover:text-primary transition-colors">Rules</a>
            <a href="#judges" className="hover:text-primary transition-colors">Mentors & Judges</a>
            <a href="#sponsors" className="hover:text-primary transition-colors">Sponsors</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQs</a>
            <a href="#register-flow" className="cartoon-btn cartoon-btn-yellow text-[9px] py-1.5 px-4 shadow-[1.5px_1.5px_0_0_#0f172a]">
              Apply Now
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-1.5 border-2 border-[#0f172a] rounded-lg bg-white text-[#0f172a] hover:bg-slate-50 shadow-[1.5px_1.5px_0_0_#0f172a] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border-b-3 border-[#0f172a] shadow-xl p-4 flex flex-col space-y-3 font-poppins text-xs font-bold uppercase text-navy border-t border-slate-100 lg:hidden select-none"
            >
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">About</a>
              <a href="#statistics" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Stats</a>
              <a href="#tracks" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Tracks</a>
              <a href="#timeline" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Timeline</a>
              <a href="#prizes" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Prizes</a>
              <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Schedule</a>
              <a href="#rules" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Rules</a>
              <a href="#judges" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Mentors & Judges</a>
              <a href="#sponsors" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">Sponsors</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-primary transition-colors">FAQs</a>
              <a 
                href="#register-flow" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerRegistrationConfetti();
                }}
                className="cartoon-btn cartoon-btn-yellow text-[10px] py-2 w-full text-center shadow-[2px_2px_0_0_#0f172a] mt-2 block"
              >
                Apply Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 🚀 1. The Landing (Hero Section) */}
      <section 
        className="relative px-4 md:px-8 overflow-hidden bg-gradient-to-tr from-sky-100/40 via-indigo-50/20 to-violet-100/40 border-b-3 border-[#0f172a]"
        style={{ paddingTop: '2cm', paddingBottom: '2cm' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Event Tag */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-yellow-100 border-2 border-[#0f172a] px-4 py-1.5 rounded-full text-xs font-extrabold text-[#0f172a] shadow-[2px_2px_0px_0px_#0f172a]"
            >
              <Calendar size={13} className="text-amber-600 animate-pulse" />
              <span>REGISTRATIONS START: TO BE ANNOUNCED • EVENT DATE: DEC 25-26, 2026 • HYDERABAD CAMPUS (VENUE DETAILS TBA)</span>
            </motion.div>

            {/* Event Name & Hero Tagline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 font-poppins"
            >
              Vidyatraa<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Hackathon 1.0</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-655 font-medium max-w-xl leading-relaxed"
            >
              The ultimate student coding arena. Build functional software applications across 50 core domains to shape modern classrooms, portfolios, and youth career lanes. Fully on-campus.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="cartoon-card p-5 w-full max-w-md bg-white border-3 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col space-y-3"
            >
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-2">
                <span className="text-xs font-extrabold uppercase text-slate-500 flex items-center gap-1.5">
                  <Clock size={14} className="text-rose-500 animate-spin" style={{ animationDuration: '6s' }} /> Countdown to Registration Launch
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">COMING SOON</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-sky-100/70 border border-sky-300 rounded-xl p-2.5">
                  <p className="text-3xl font-black font-poppins text-[#0f172a]">X</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Days</p>
                </div>
                <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-2.5">
                  <p className="text-3xl font-black font-poppins text-[#0f172a]">X</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Hrs</p>
                </div>
                <div className="bg-purple-100/70 border border-purple-300 rounded-xl p-2.5">
                  <p className="text-3xl font-black font-poppins text-[#0f172a]">X</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Min</p>
                </div>
                <div className="bg-rose-100/70 border border-rose-300 rounded-xl p-2.5">
                  <p className="text-3xl font-black font-poppins text-[#0f172a]">X</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Sec</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button 
                onClick={() => {
                  const el = document.getElementById('register-flow');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  triggerRegistrationConfetti();
                }}
                className="cartoon-btn cartoon-btn-yellow py-3 px-8 text-xs cursor-pointer shadow-[3px_3px_0_0_#0f172a] flex items-center gap-2 group"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setShowPromoModal(true)}
                className="cartoon-btn cartoon-btn-white py-3 px-6 text-xs cursor-pointer shadow-[3px_3px_0_0_#0f172a] flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-navy fill-current" />
                <span>Watch Promo</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-yellow-300/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-violet-300/10 blur-[80px] rounded-full pointer-events-none" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-full max-w-sm cartoon-card bg-white border-3 border-[#0f172a] p-6 shadow-[8px_8px_0_0_#0f172a] space-y-6"
            >
              <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-400 rounded-full border border-navy" />
                  <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-navy" />
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full border border-navy" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider">CAMPUS_BOARD_V1.0</span>
              </div>

              {/* Graphic Mockup Area */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 border-2 border-navy flex items-center justify-center text-navy shadow-[2px_2px_0_0_#0f172a] animate-pulse">
                  <Building className="w-7 h-7" />
                </div>
                <h4 className="text-xs font-black font-poppins text-navy tracking-wide">36 HOURS CAMPUS CODE SPRINT</h4>
                <p className="text-[10px] text-slate-400 leading-normal max-w-[200px]">36 Hours, Git Branches Checkpoint, Video Presentations Room</p>
                <div className="absolute -right-6 -bottom-6 w-12 h-12 bg-sky-200 border-2 border-navy rounded-full rotate-12 flex items-center justify-center text-xs font-extrabold shadow-[1px_1px_0_0_#0f172a]">
                  CAMPUS
                </div>
              </div>

              {/* Highlight Badges */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                  <div className="text-emerald-600"><Trophy size={18} /></div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Prize Pool</p>
                    <p className="text-xs font-extrabold text-emerald-800">₹3 Lakhs</p>
                  </div>
                </div>
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-2">
                  <div className="text-sky-655"><GraduationCap size={18} /></div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Entry</p>
                    <p className="text-xs font-extrabold text-sky-800">Free</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Countdown to Hackathon Kickoff Timer */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="cartoon-card p-4 w-full max-w-sm bg-white border-2 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col space-y-3 mt-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-505 flex items-center gap-1.5 font-poppins">
                  <Clock size={12} className="text-rose-500 animate-spin" style={{ animationDuration: '6s' }} /> Countdown to Hackathon Kickoff
                </span>
                <span className="text-[9px] font-extrabold text-amber-600 bg-yellow-50 border border-yellow-200 px-2.5 py-0.5 rounded-full uppercase font-poppins">DEC 25</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-center font-poppins">
                <div className="bg-sky-55 border border-sky-200 rounded-xl p-2">
                  <p className="text-xl font-black text-[#0f172a]">{timeLeftEvent.days}</p>
                  <p className="text-[9px] font-bold text-slate-505 uppercase">Days</p>
                </div>
                <div className="bg-amber-55 border border-amber-200 rounded-xl p-2">
                  <p className="text-xl font-black text-[#0f172a]">{timeLeftEvent.hours}</p>
                  <p className="text-[9px] font-bold text-slate-555 uppercase">Hrs</p>
                </div>
                <div className="bg-purple-55 border border-purple-200 rounded-xl p-2">
                  <p className="text-xl font-black text-[#0f172a]">{timeLeftEvent.minutes}</p>
                  <p className="text-[9px] font-bold text-slate-555 uppercase">Min</p>
                </div>
                <div className="bg-rose-55 border border-rose-200 rounded-xl p-2">
                  <p className="text-xl font-black text-[#0f172a]">{timeLeftEvent.seconds}</p>
                  <p className="text-[9px] font-bold text-slate-555 uppercase">Sec</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚀 2. About Hackathon */}
      <section id="about" className="py-20 px-4 max-w-7xl mx-auto border-b-2 border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold text-purple-755">
              <Zap size={12} className="text-purple-650" />
              <span>THE CONTEST SCHEME</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">
              36 Hours of Intense Physical Hacking
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              <strong>Vidyatraa Hackathon 1.0</strong> is an offline-only challenge designed to help student developers across India test their prototyping capabilities. Choose from <strong>50 tracks</strong> to write code, design user interfaces, and construct databases physically at our Hyderabad Campus.
            </p>
            
            {/* Core Loop & Framework Badges */}
            <div className="bg-slate-100 border-2 border-navy rounded-2xl p-4 space-y-3 shadow-[2px_2px_0_0_#0f172a] font-poppins">
              <h4 className="text-xs font-black text-navy uppercase tracking-wider">Overall Event Framework:</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2 text-slate-700">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>Duration:</strong> 36 hours of continuous hacking (Dec 25, 9:00 AM &rarr; Dec 26, 9:00 PM)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>Domains:</strong> ~50 problem statements across tracks (sponsor-owned + open innovation)</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>Core loop:</strong> Hack &rarr; Checkpoint &rarr; Mentor &rarr; Engage &rarr; Hack &rarr; Demo &rarr; Judge</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-yellow-50 border-2 border-navy rounded-2xl shadow-[2px_2px_0_0_#0f172a]">
                <h4 className="font-extrabold text-navy text-sm font-poppins">Why Participate?</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Build real portfolio projects, network with peer teams physically, and clear paths to internship opportunities.</p>
              </div>
              <div className="p-4 bg-sky-50 border-2 border-navy rounded-2xl shadow-[2px_2px_0_0_#0f172a]">
                <h4 className="font-extrabold text-navy text-sm font-poppins">On-Campus Mentors</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Get instant face-to-face feedback and consulting checkpoints from industry coordinators on the floor.</p>
              </div>
            </div>
          </div>

          {/* Highlights Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="cartoon-card p-5 bg-sky-100 border-3 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col justify-between h-44">
              <Clock className="w-8 h-8 text-sky-850" />
              <div>
                <h4 className="text-lg font-black font-poppins text-navy">36 Hours Sprint</h4>
                <p className="text-xs text-slate-550 mt-1">A high-energy physical coding weekend from campus kickoff to final code locks.</p>
              </div>
            </div>

            <div className="cartoon-card p-5 bg-amber-100 border-3 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col justify-between h-44">
              <Users className="w-8 h-8 text-amber-850" />
              <div>
                <h4 className="text-lg font-black font-poppins text-navy">Team: 2-4 Hackers</h4>
                <p className="text-xs text-slate-550 mt-1">Register as a team or join the matchmaking session on our Discord and on Day 1 morning.</p>
              </div>
            </div>

            <div className="cartoon-card p-5 bg-emerald-100 border-3 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col justify-between h-44">
              <Building className="w-8 h-8 text-emerald-855" />
              <div>
                <h4 className="text-lg font-black font-poppins text-navy">Hyderabad Campus</h4>
                <p className="text-xs text-slate-550 mt-1">Held physically at our core campus facility. Hot meals and sleeping rooms provided.</p>
              </div>
            </div>

            <div className="cartoon-card p-5 bg-purple-100 border-3 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col justify-between h-44">
              <Award className="w-8 h-8 text-purple-855" />
              <div>
                <h4 className="text-lg font-black font-poppins text-navy">National Level</h4>
                <p className="text-xs text-slate-550 mt-1">Showcase your software prototypes alongside physical participants from all across India.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🚀 3. Statistics */}
      <section id="statistics" className="bg-[#0f172a] text-white py-16 px-4 border-b-3 border-[#0f172a]">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">LIVE TRACKER</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins leading-none">Registration Scale</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">Real-time status targets for hackers, colleges, and open panel slots.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-navy border-2 border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center space-y-3 relative group hover:border-slate-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-black font-poppins text-white tracking-tight">
                    {counterValues[index] ? counterValues[index].toLocaleString() : 0}{stat.suffix}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 4. Hackathon Tracks */}
      <section id="tracks" className="py-20 px-4 max-w-7xl mx-auto border-b-2 border-slate-100">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-black text-sky-600 uppercase tracking-wider bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">DOMAINS</span>
          <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Hackathon Tracks</h2>
          <p className="text-slate-550 max-w-xl mx-auto text-sm">Select any of the 50 domains to construct your digital prototypes. Visible tracks paginate by 20 on desktop and 10 on mobile.</p>
          
          {/* Search and Filters */}
          <div className="max-w-xl mx-auto mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search domain (e.g. AI, Cyber, Web...)" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleTracksLimit(isMobile ? 10 : 20);
                }}
                className="w-full pl-11 pr-4 py-3 bg-white border-2 border-[#0f172a] rounded-xl text-xs font-bold text-navy shadow-[2px_2px_0_0_#0f172a] focus:outline-none"
              />
            </div>
            
            <select 
              value={selectedCategory} 
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setVisibleTracksLimit(isMobile ? 10 : 20);
              }}
              className="bg-white border-2 border-[#0f172a] px-4 py-3 rounded-xl text-xs font-bold text-navy shadow-[2px_2px_0_0_#0f172a] cursor-pointer focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Development & Cloud">Development & Cloud</option>
              <option value="Hardware & Specialty">Hardware & Specialty</option>
              <option value="Industry & TechSectors">Industry & TechSectors</option>
            </select>
          </div>
        </div>

        {/* Tracks Grid with Sliced Visible Limit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {visibleDomainsSlice.map((track) => (
              <motion.div
                key={track.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="cartoon-card p-4 border-2 border-[#0f172a] shadow-[3px_3px_0_0_#0f172a] bg-white flex flex-col justify-between h-36 group hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#0f172a] transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border">
                    {String(track.id).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-50 text-slate-455 border">
                    {track.category.split(' ')[0]}
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className="font-extrabold text-xs text-navy leading-tight group-hover:text-primary transition-colors">{track.name}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-normal line-clamp-2">{track.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDomains.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-bold text-xs">
            No tracks found matching your query.
          </div>
        )}

        {/* Show More Tracks Button */}
        {filteredDomains.length > visibleTracksLimit && (
          <div className="text-center mt-8">
            <button 
              onClick={() => setVisibleTracksLimit(prev => prev + (isMobile ? 10 : 20))}
              className="cartoon-btn cartoon-btn-white py-3 px-8 text-xs cursor-pointer shadow-[3px_3px_0_0_#0f172a] font-poppins flex items-center gap-2 mx-auto"
            >
              <span>Show More Domains</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 🚀 5. Event Timeline (Boxy Grid Layout) */}
      <section id="timeline" className="py-20 px-4 bg-slate-50 border-t-2 border-b-2 border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-black text-purple-600 uppercase tracking-wider bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">ROADMAP</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Event Timeline</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Optimize your schedule. A clean, highly visible boxy grid showing all stages from registration launch to cash prize distributions.</p>
          </div>

          {/* Boxy grid milestone trail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, index) => (
              <div 
                key={index} 
                className="cartoon-card p-5 bg-white border-3 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col justify-between h-48 hover:shadow-[6px_6px_0_0_#0f172a] hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-300 text-sky-850 font-black text-xs flex items-center justify-center">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-extrabold text-primary uppercase tracking-wider">{step.date}</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs md:text-sm text-navy uppercase tracking-wide leading-snug">{step.title}</h4>
                  <p className="text-[10px] text-slate-455 mt-1.5 leading-relaxed font-medium font-poppins">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🚀 6. Prize Pool */}
      <section id="prizes" className="py-20 px-4 max-w-7xl mx-auto border-b-2 border-slate-100">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-black text-rose-600 uppercase tracking-wider bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">PRIZE DISTRIBUTION</span>
          <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Cash Prize Pool</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">A total cash pool disbursed directly to winning developers. Build functional software to apply.</p>
        </div>

        {/* Top 3 Ranks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {prizes.slice(0, 3).map((prize, idx) => (
            <div 
              key={idx}
              className={`cartoon-card p-6 border-3 border-[#0f172a] shadow-[6px_6px_0_0_#0f172a] flex flex-col justify-between min-h-[220px] ${prize.color}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-wider text-navy bg-white/40 border border-navy/20 px-2.5 py-0.5 rounded-full">{prize.rank}</span>
                <div className="bg-white/80 p-2 rounded-xl border border-navy/20">{prize.icon}</div>
              </div>
              <div className="mt-6 space-y-1.5">
                <h3 className="text-3xl font-black font-poppins tracking-tight text-navy">{prize.amount}</h3>
                <p className="text-xs font-bold text-navy/70 leading-snug">{prize.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Special Tracks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {prizes.slice(3).map((prize, idx) => (
            <div 
              key={idx}
              className={`cartoon-card p-4 border-2 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] flex flex-col justify-between min-h-[150px] ${prize.color}`}
            >
              <div className="flex justify-between items-center pb-2 border-b border-navy/10">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-555">{prize.rank}</span>
                <div className="bg-white/50 p-1.5 rounded-lg">{prize.icon}</div>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-black font-poppins text-navy">{prize.amount}</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-normal mt-0.5">{prize.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Perks Banner */}
        <div className="mt-8 bg-sky-50 border-2 border-dashed border-sky-300 rounded-2xl p-6 text-center space-y-4">
          <h4 className="text-xs font-black font-poppins text-sky-850 uppercase tracking-widest">ADDITIONAL PROGRAM BENEFITS</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-white border border-sky-200 rounded-xl flex items-start gap-3">
              <div className="text-sky-655 mt-0.5"><Gift size={20} /></div>
              <div>
                <h5 className="font-extrabold text-navy text-xs">Exclusives Goodies</h5>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">T-shirts, custom vinyl stickers, notebooks, and cheat sheets for on-campus hackers.</p>
              </div>
            </div>
            <div className="p-4 bg-white border border-sky-200 rounded-xl flex items-start gap-3">
              <div className="text-sky-655 mt-0.5"><Award size={20} /></div>
              <div>
                <h5 className="font-extrabold text-navy text-xs">National Verifiable Credentials</h5>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">All eligible submissions will receive verified digital certificates indicating domain track details.</p>
              </div>
            </div>
            <div className="p-4 bg-white border border-sky-200 rounded-xl flex items-start gap-3">
              <div className="text-sky-655 mt-0.5"><Briefcase size={20} /></div>
              <div>
                <h5 className="font-extrabold text-navy text-xs">Incubation & Gigs Priority</h5>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Top team submissions get mapped directly into Vidyatraa Academy micro-project streams for paid gigs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 7. Schedule */}
      <section id="schedule" className="py-20 px-4 bg-slate-50 border-t-2 border-b-2 border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-black text-amber-600 uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">DAY PLANNER</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Hacking Schedule</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Track live checkpoint timings and on-campus schedule. Select the day tab to toggle.</p>

            {/* Toggle tabs */}
            <div className="inline-flex border-2 border-navy rounded-xl overflow-hidden p-1 bg-white shadow-[2px_2px_0_0_#0f172a] mt-4 select-none">
              <button 
                onClick={() => setActiveScheduleDay('day1')}
                className={`px-6 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer transition-all ${
                  activeScheduleDay === 'day1' ? 'bg-[#0f172a] text-white' : 'text-slate-655 hover:bg-slate-50'
                }`}
              >
                Day 1 (Dec 25)
              </button>
              <button 
                onClick={() => setActiveScheduleDay('overnight')}
                className={`px-6 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer transition-all ${
                  activeScheduleDay === 'overnight' ? 'bg-[#0f172a] text-white' : 'text-slate-655 hover:bg-slate-50'
                }`}
              >
                Overnight (Dec 25-26)
              </button>
              <button 
                onClick={() => setActiveScheduleDay('day2')}
                className={`px-6 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer transition-all ${
                  activeScheduleDay === 'day2' ? 'bg-[#0f172a] text-white' : 'text-slate-655 hover:bg-slate-50'
                }`}
              >
                Day 2 (Dec 26)
              </button>
            </div>
          </div>
 
          {/* Schedule timeline block */}
          <div className="max-w-3xl mx-auto bg-white border-3 border-[#0f172a] rounded-[2rem] p-6 md:p-8 shadow-[6px_6px_0_0_#0f172a]">
            <div className="space-y-6">
              {(activeScheduleDay === 'day1' ? scheduleDay1 : activeScheduleDay === 'overnight' ? scheduleOvernight : scheduleDay2).map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start border-b border-dashed border-slate-100 last:border-b-0 pb-5 last:pb-0">
                  <span className="bg-sky-50 border border-sky-300 text-sky-850 font-extrabold text-[10px] px-2.5 py-1 rounded-lg shrink-0 w-28 text-center">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-navy">{item.event}</h4>
                    <p className="text-xs text-slate-455 leading-relaxed mt-1">{item.desc}</p>
                    {item.notes && (
                      <div className="mt-2 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md inline-block">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 🚀 8. Audience & Stakeholder Experience */}
      <section id="experience" className="py-20 px-4 max-w-7xl mx-auto border-b-2 border-slate-100">
        <div className="space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">ENGAGEMENT HUB</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Stakeholder Experience</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              We design our event experience for everyone. Here is how we keep participants, spectators, and sponsors actively engaged.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Students / Participants */}
            <div className="cartoon-card p-6 bg-gradient-to-b from-sky-50 to-white border-3 border-[#0f172a] shadow-[6px_6px_0_0_#0f172a] hover:shadow-[8px_8px_0_0_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 text-sky-855 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wide text-navy">For Participants</h3>
                    <p className="text-[10px] font-bold text-slate-400">Engaging Students</p>
                  </div>
                </div>
                
                <ul className="space-y-4 text-left font-poppins">
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Momentum Tools
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Visible countdown timers, live leaderboard/progress tracker on the main screen, and checkpoint-based mini-feedback to prevent feeling stuck.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Mentorship Rhythm
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Rotating mentors every 4–6 hours to ensure high-quality advice; teams request help via a simple QR-code helpdesk system.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Non-Hacking Recharge Points
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Scheduled gaming corners, music breaks, and flash mobs so teams can plan their recharge intervals around deep work.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Recognition Beyond Winning
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Special alternative awards like &ldquo;Most Innovative Idea,&rdquo; &ldquo;Best Pivot,&rdquo; and &ldquo;Best Rookie Team&rdquo; to keep all teams invested.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Comfort Logistics
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Clearly marked rest zones, phone-charging stations, and a quiet zone for the 12 AM – 6 AM stretch to prevent burnout.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: Spectators / Audience */}
            <div className="cartoon-card p-6 bg-gradient-to-b from-purple-50 to-white border-3 border-[#0f172a] shadow-[6px_6px_0_0_#0f172a] hover:shadow-[8px_8px_0_0_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-300 text-purple-850 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wide text-navy">For Spectators</h3>
                    <p className="text-[10px] font-bold text-slate-400">Engaging the Audience</p>
                  </div>
                </div>
                
                <ul className="space-y-4 text-left font-poppins">
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Something to Watch Always
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Constant livestreaming with commentary during pitch/demo rounds and a &ldquo;spectator leaderboard&rdquo; showing trending domains.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Participatory Elements
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      People&rsquo;s Choice Award via QR-code voting at demo booths, plus meme contests and photo booths tied to event hashtags.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Content for Social Media
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Short reels shot during checkpoints, mentor rounds, and the midnight energizer to generate real-time visual proof of a lively event.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Open Demo Zones
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      During judging windows, a public demo/booth area runs continuously so the waiting audience has projects to explore.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3: Sponsors */}
            <div className="cartoon-card p-6 bg-gradient-to-b from-amber-50 to-white border-3 border-[#0f172a] shadow-[6px_6px_0_0_#0f172a] hover:shadow-[8px_8px_0_0_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-850 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wide text-navy">For Sponsors</h3>
                    <p className="text-[10px] font-bold text-slate-400">Engaging Brand Partners</p>
                  </div>
                </div>
                
                <ul className="space-y-4 text-left font-poppins">
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Ownership of a Track
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Sponsors don&rsquo;t just fund prizes — they own problem statements, judge submissions, and get dedicated Q&amp;A slots with hacking teams.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Stage Time Visibility
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Get a dedicated 10-minute keynote slot on the main stage and a closing thank-you video highlight for visibility beyond a basic logo.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Talent Access
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Direct access to the resume/portfolio wall and a dedicated 30-minute &ldquo;sponsor networking hour&rdquo; during lunch to scout talent.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Live Brand Presence
                    </h4>
                    <p className="text-[11px] text-slate-550 leading-relaxed pl-3.5">
                      Dedicated physical booths during audience engagement slots (Day 2, 2:00–4:30 PM) for live product demos, giveaways, and mini-challenges.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <h4 className="text-xs font-extrabold text-navy flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Data / ROI Takeaway
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3.5">
                      Detailed post-event reports detailing track team metrics, social impressions, and footfall metrics collected at their booth.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🚀 9. Rules & Guidelines */}
      <section id="rules" className="py-20 px-4 max-w-7xl mx-auto border-b-2 border-slate-100">
        <div className="space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-black text-navy uppercase tracking-wider bg-yellow-100 border border-yellow-350 px-3 py-1 rounded-full">COMPLIANCE</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Rules & Guidelines</h2>
            <p className="text-slate-550 max-w-xl mx-auto text-sm">
              We stand for clean hacking, respect, and original creations. Make sure you read these guidelines structured in a boxy grid overview.
            </p>
          </div>

          {/* Optimized grid layout displaying all rule parameters side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(rulesData).map((key) => {
              const rulesList = rulesData[key as keyof typeof rulesData];
              const cleanTitle = key.replace(/([A-Z])/g, ' $1');
              return (
                <div 
                  key={key} 
                  className="cartoon-card p-5 bg-white border-3 border-[#0f172a] shadow-[4px_4px_0_0_#0f172a] hover:shadow-[6px_6px_0_0_#0f172a] transition-all flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <h4 className="font-black text-xs md:text-sm uppercase tracking-wide text-navy border-b-2 border-slate-100 pb-2.5 mb-3.5 font-poppins flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary border border-navy" /> 
                      <span>{cleanTitle} Rules</span>
                    </h4>
                    <ul className="space-y-3 font-poppins">
                      {rulesList.map((rule, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-[11px] text-slate-655 leading-relaxed font-medium">
                          <span className="text-primary font-black mt-0.5 text-xs">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 🚀 10. Judging Criteria */}
      <section className="py-20 px-4 bg-slate-50 border-t-2 border-b-2 border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">SCORE BOARD</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Judging Weight Simulator</h2>
            <p className="text-slate-550 text-sm leading-relaxed">
              Wondering how projects are evaluated? Use our weight adjuster simulation to prioritize different parameters. Official ratios are listed on the right.
            </p>

            {/* Simulator Inputs */}
            <div className="space-y-3 bg-white border-2 border-navy rounded-[1.5rem] p-5 shadow-[4px_4px_0_0_#0f172a]">
              <h4 className="text-xs font-black font-poppins text-navy uppercase tracking-wider border-b pb-2 mb-3">Adjust Score Weighting:</h4>
              {Object.keys(judgingWeights).map((key) => {
                const val = judgingWeights[key as keyof typeof judgingWeights];
                return (
                  <div key={key} className="flex items-center justify-between text-xs font-bold text-navy">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleWeightChange(key as keyof typeof judgingWeights, false)}
                        className="w-6 h-6 border-2 border-navy rounded bg-slate-100 hover:bg-slate-202 flex items-center justify-center font-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{val}%</span>
                      <button 
                        onClick={() => handleWeightChange(key as keyof typeof judgingWeights, true)}
                        className="w-6 h-6 border-2 border-navy rounded bg-slate-100 hover:bg-slate-202 flex items-center justify-center font-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="border-t pt-3 mt-2 flex justify-between items-center text-xs font-extrabold text-navy">
                <span>SIMULATION TOTAL:</span>
                <span className={totalWeights === 100 ? 'text-emerald-655' : 'text-rose-505'}>
                  {totalWeights}% {totalWeights === 100 ? '✓ (Valid)' : '(Must equal 100%)'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="cartoon-card p-6 bg-white border-3 border-[#0f172a] shadow-[6px_6px_0_0_#0f172a] space-y-4">
              <h3 className="text-lg font-black font-poppins text-navy border-b-2 border-slate-100 pb-2 flex items-center gap-2">
                <Scale className="text-indigo-500" /> Official Evaluation Weighting
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-extrabold text-navy mb-1.5">
                    <span>Innovation & Originality</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-navy">
                    <div className="bg-sky-400 h-full" style={{ width: '25%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-extrabold text-navy mb-1.5">
                    <span>Technical Complexity & APIs</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-navy">
                    <div className="bg-amber-400 h-full" style={{ width: '25%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-extrabold text-navy mb-1.5">
                    <span>UI/UX & Playful Aesthetics</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-navy">
                    <div className="bg-purple-400 h-full" style={{ width: '15%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-extrabold text-navy mb-1.5">
                    <span>Business Potential & Sustainability</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-navy">
                    <div className="bg-rose-400 h-full" style={{ width: '15%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-extrabold text-navy mb-1.5">
                    <span>Scalability & Deployment Ready</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-navy">
                    <div className="bg-emerald-400 h-full" style={{ width: '10%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-extrabold text-navy mb-1.5">
                    <span>Pitch & Physical Q&A Response</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-navy">
                    <div className="bg-lime-400 h-full" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🚀 11, 12, 13. Keynote Speakers, Judges & Mentors Panels */}
      <section id="judges" className="py-20 px-4 max-w-7xl mx-auto border-b-2 border-slate-100">
        <div className="space-y-16">
          
          {/* Keynote Speakers (Influencers) - 20 slots pagination */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">PANELS REGISTER</span>
              <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Keynote Speakers</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">Open presentation slots for registered technical influencers. Paginated by 20 on desktop and 10 on mobile.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {renderEmptyGridsLimit('Speaker', visibleSpeakersLimit)}
            </div>

            {/* Speaker Pagination Button */}
            {20 > visibleSpeakersLimit && (
              <div className="text-center mt-6">
                <button 
                  onClick={() => setVisibleSpeakersLimit(prev => prev + (isMobile ? 10 : 20))}
                  className="cartoon-btn cartoon-btn-white py-2 px-6 text-xs cursor-pointer shadow-[2px_2px_0_0_#0f172a] font-poppins flex items-center gap-1.5 mx-auto"
                >
                  <span>Show More Speakers</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Judges & Coding Mentors - 20 slots pagination */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">EVALUATORS REGISTER</span>
              <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Judges & Coding Mentors</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">Open evaluation slots. Staff engineers and developers can lock in spots. Paginated by 20 on desktop and 10 on mobile.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {renderEmptyGridsLimit('Judge/Mentor', visibleMentorsLimit)}
            </div>

            {/* Mentor/Judge Pagination Button */}
            {20 > visibleMentorsLimit && (
              <div className="text-center mt-6">
                <button 
                  onClick={() => setVisibleMentorsLimit(prev => prev + (isMobile ? 10 : 20))}
                  className="cartoon-btn cartoon-btn-white py-2 px-6 text-xs cursor-pointer shadow-[2px_2px_0_0_#0f172a] font-poppins flex items-center gap-1.5 mx-auto"
                >
                  <span>Show More Evaluators</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 🚀 14. Sponsors & Community Partners */}
      <section id="sponsors" className="py-20 px-4 bg-slate-50 border-t-2 border-b-2 border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Sponsors - 20 slots pagination */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">SPONSORSHIPS REGISTER</span>
              <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Corporate Sponsors</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">Open sponsorship slots. Partner tiers are available for organizations to provide APIs credits. Paginated by 20 on desktop and 10 on mobile.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {renderEmptyGridsLimit('Sponsor', visibleSponsorsLimit)}
            </div>

            {/* Sponsor Pagination Button */}
            {20 > visibleSponsorsLimit && (
              <div className="text-center mt-6">
                <button 
                  onClick={() => setVisibleSponsorsLimit(prev => prev + (isMobile ? 10 : 20))}
                  className="cartoon-btn cartoon-btn-white py-2 px-6 text-xs cursor-pointer shadow-[2px_2px_0_0_#0f172a] font-poppins flex items-center gap-1.5 mx-auto"
                >
                  <span>Show More Sponsors</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <hr className="border-slate-350/30 border-dashed" />

          {/* Community Partners - 20 slots pagination */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <span className="text-xs font-black text-sky-655 uppercase tracking-wider bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">COMMUNITY ASSOCIATIONS</span>
              <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Community Partners</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">Open partnership slots. Join as local student clubs or coding chapters. Paginated by 20 on desktop and 10 on mobile.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {renderEmptyGridsLimit('Partner', visiblePartnersLimit)}
            </div>

            {/* Partner Pagination Button */}
            {20 > visiblePartnersLimit && (
              <div className="text-center mt-6">
                <button 
                  onClick={() => setVisiblePartnersLimit(prev => prev + (isMobile ? 10 : 20))}
                  className="cartoon-btn cartoon-btn-white py-2 px-6 text-xs cursor-pointer shadow-[2px_2px_0_0_#0f172a] font-poppins flex items-center gap-1.5 mx-auto"
                >
                  <span>Show More Partners</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 🚀 15. FAQ (Accordion) */}
      <section id="faq" className="py-20 px-4 max-w-4xl mx-auto border-b-2 border-slate-100">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-black text-amber-600 uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">QUESTIONS</span>
          <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm">Have doubts about virtual evaluation setups, timelines, or code ownership? Answers below.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index}
                className="bg-white border-2 border-navy rounded-2xl overflow-hidden shadow-[2px_2px_0_0_#0f172a]"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between text-navy font-extrabold text-xs md:text-sm uppercase tracking-wide cursor-pointer hover:bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-slate-150 text-xs text-slate-655 leading-relaxed font-medium bg-slate-50/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🚀 19. Registration Process */}
      <section id="register-flow" className="py-20 px-4 bg-slate-50 border-t-2 border-b-2 border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-black text-sky-600 uppercase tracking-wider bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">JOIN THE CONTEST</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Registration Steps</h2>
            <p className="text-slate-550 max-w-xl mx-auto text-sm">Secure your team slot remote online. Follow the roadmap path below.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {/* Step 1 */}
            <div className="cartoon-card p-5 bg-white border-2 border-navy shadow-[3px_3px_0_0_#0f172a] text-center flex flex-col justify-between items-center h-44 relative">
              <span className="text-xs font-black text-slate-400">STEP 1</span>
              <div className="text-sky-600"><Laptop size={28} /></div>
              <h4 className="font-extrabold text-navy text-xs font-poppins">Create Account</h4>
              <p className="text-[9px] text-slate-405 leading-snug mt-1">Sign up on the Vidyatraa Portal using Google/Email.</p>
            </div>

            {/* Step 2 */}
            <div className="cartoon-card p-5 bg-white border-2 border-navy shadow-[3px_3px_0_0_#0f172a] text-center flex flex-col justify-between items-center h-44 relative">
              <span className="text-xs font-black text-slate-400">STEP 2</span>
              <div className="text-sky-600"><Mail size={28} /></div>
              <h4 className="font-extrabold text-navy text-xs font-poppins">Verify Email</h4>
              <p className="text-[9px] text-slate-405 leading-snug mt-1">Check verification inbox link to unlock access.</p>
            </div>

            {/* Step 3 */}
            <div className="cartoon-card p-5 bg-white border-2 border-navy shadow-[3px_3px_0_0_#0f172a] text-center flex flex-col justify-between items-center h-44 relative">
              <span className="text-xs font-black text-slate-400">STEP 3</span>
              <div className="text-sky-600"><Users size={28} /></div>
              <h4 className="font-extrabold text-navy text-xs font-poppins">Create Team</h4>
              <p className="text-[9px] text-slate-405 leading-snug mt-1">Create a new clan name and get your team joining code.</p>
            </div>

            {/* Step 4 */}
            <div className="cartoon-card p-5 bg-white border-2 border-navy shadow-[3px_3px_0_0_#0f172a] text-center flex flex-col justify-between items-center h-44 relative">
              <span className="text-xs font-black text-slate-400">STEP 4</span>
              <div className="text-sky-600"><UserCheck size={28} /></div>
              <h4 className="font-extrabold text-navy text-xs font-poppins">Join Team</h4>
              <p className="text-[9px] text-slate-405 leading-snug mt-1">Invite friends or join an active team code block.</p>
            </div>

            {/* Step 5 */}
            <div className="cartoon-card p-5 bg-white border-2 border-navy shadow-[3px_3px_0_0_#0f172a] text-center flex flex-col justify-between items-center h-44 relative">
              <span className="text-xs font-black text-slate-400">STEP 5</span>
              <div className="text-sky-600"><Sliders size={28} /></div>
              <h4 className="font-extrabold text-navy text-xs font-poppins">Submit Details</h4>
              <p className="text-[9px] text-slate-405 leading-snug mt-1">Input university student cards, roll ids, and streams.</p>
            </div>

            {/* Step 6 */}
            <div className="cartoon-card p-5 bg-emerald-50 border-2 border-navy shadow-[3px_3px_0_0_#0f172a] text-center flex flex-col justify-between items-center h-44 relative">
              <span className="text-xs font-black text-emerald-600">STEP 6</span>
              <div className="text-emerald-655"><CheckCircle size={28} /></div>
              <h4 className="font-extrabold text-navy text-xs font-poppins">Confirmation</h4>
              <p className="text-[9px] text-emerald-800 leading-snug mt-1">Hacker pass generated! Lock in and start preparing drafts.</p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button 
              onClick={() => {
                triggerRegistrationConfetti();
                alert("You've successfully triggered the registration draft process! Check your dashboard details next.");
              }}
              className="cartoon-btn cartoon-btn-yellow py-3 px-8 text-xs cursor-pointer shadow-[3px_3px_0_0_#0f172a]"
            >
              Start Registration Draft Flow
            </button>
          </div>

        </div>
      </section>

      {/* 🚀 20. Contact */}
      <section id="contact" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-black text-[#0f172a] uppercase tracking-wider bg-yellow-100 border border-yellow-350 px-3 py-1 rounded-full">GET IN TOUCH</span>
            <h2 className="text-3xl md:text-5xl font-black font-poppins text-navy leading-none">Support & Contacts</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Got specific inquiries or registration questions? Contact our coordination team and we will reply within 4 hours.
            </p>

            <div className="space-y-4 font-poppins">
              <a href="mailto:hackathon@vidyatraa.com" className="flex items-center gap-3.5 text-xs font-extrabold text-navy hover:text-primary transition-colors">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500">
                  <Mail size={16} />
                </div>
                <span>hackathon@vidyatraa.com</span>
              </a>

              <a href="tel:+919876543210" className="flex items-center gap-3.5 text-xs font-extrabold text-navy hover:text-primary transition-colors">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500">
                  <Phone size={16} />
                </div>
                <span>+91 98765 43210</span>
              </a>

              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-3.5 text-xs font-extrabold text-navy hover:text-primary transition-colors">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500">
                  <MessageCircle size={16} />
                </div>
                <span>Chat via WhatsApp Support</span>
              </a>
            </div>

            <div className="pt-4 border-t border-dashed border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Join our social channels:</p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-[#0f172a] text-white flex items-center justify-center border border-navy shadow-[1.5px_1.5px_0_0_#0f172a] hover:scale-105 transition-transform" aria-label="GitHub">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center border border-navy shadow-[1.5px_1.5px_0_0_#0f172a] hover:scale-105 transition-transform" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-sky-400 text-white flex items-center justify-center border border-navy shadow-[1.5px_1.5px_0_0_#0f172a] hover:scale-105 transition-transform" aria-label="Twitter">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Location Map Card */}
          <div className="lg:col-span-7">
            <div className="cartoon-card bg-white border-3 border-[#0f172a] rounded-[2rem] p-5 shadow-[6px_6px_0_0_#0f172a] space-y-4">
              <div className="flex items-center justify-between border-b pb-2 text-xs font-extrabold text-navy">
                <span className="flex items-center gap-1.5"><MapPin className="text-rose-500 animate-bounce" size={14} /> Host Venue Location</span>
                <span className="text-[10px] text-slate-400 uppercase">Hyderabad Campus Hub</span>
              </div>
              
              {/* Highlight Venue Notice Card instead of physical map (Venue About to be announced) */}
              <div className="relative bg-slate-50 border-2 border-dashed border-[#0f172a] rounded-2xl p-6 text-center space-y-4 min-h-[260px] flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-[radial-gradient(#0f172a03_2px,transparent_2px)] bg-[size:1.5rem_1.5rem]" />
                
                <div className="w-14 h-14 rounded-full bg-yellow-100 border-2 border-[#0f172a] flex items-center justify-center text-yellow-600 shadow-[2px_2px_0_0_#0f172a] animate-bounce shrink-0">
                  <MapPin size={24} />
                </div>
                
                <span className="text-[10px] font-black text-amber-600 bg-yellow-50 border border-yellow-250 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  VENUE ANNOUNCEMENT PENDING
                </span>
                
                <h4 className="text-base font-black font-poppins text-navy">Hyderabad Campus Arena</h4>
                <p className="text-[10px] text-slate-450 leading-relaxed max-w-sm font-poppins">
                  The exact campus location details, parking directions, and gate registration guidelines will be announced and emailed to all registered teams on **December 22, 2026** along with the shortlisted selections. Stay tuned!
                </p>
                <button 
                  onClick={() => alert("We will email you the exact Google Map location as soon as it's announced!")}
                  className="bg-white border-2 border-[#0f172a] text-navy font-extrabold text-[10px] py-2 px-5 rounded-xl shadow-[2px_2px_0_0_#0f172a] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Get Location Updates
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🚀 Promo Modal (Teaser pop-up) */}
      <AnimatePresence>
        {showPromoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="cartoon-card bg-white border-3 border-[#0f172a] shadow-[8px_8px_0_0_#0f172a] max-w-2xl w-full p-5 space-y-4"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <h4 className="font-extrabold text-navy text-sm font-poppins">🎥 Vidyatraa Hackathon 1.0 - Teaser Stream</h4>
                <button 
                  onClick={() => setShowPromoModal(false)}
                  className="w-6 h-6 border border-slate-205 rounded flex items-center justify-center text-slate-400 hover:text-navy cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Mock Player */}
              <div className="bg-navy border-2 border-navy rounded-2xl h-72 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 to-purple-900/40 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                
                <div className="relative z-10 w-16 h-16 rounded-full bg-yellow-400 border-2 border-navy flex items-center justify-center text-navy shadow-[3px_3px_0_0_#0f172a] group-hover:scale-105 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 fill-navy text-navy pl-1" />
                </div>
                <h5 className="relative z-10 text-xs font-black font-poppins text-yellow-300 uppercase tracking-widest mt-4">STREAMING TRAILER NOW</h5>
                <p className="relative z-10 text-[10px] text-slate-400 mt-1 max-w-[280px]">Hear from former winning hacker groups, judges, and mentor guidelines in 3 minutes.</p>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => setShowPromoModal(false)}
                  className="cartoon-btn cartoon-btn-white py-2 px-5 text-[10px] shadow-[2px_2px_0_0_#0f172a]"
                >
                  Close Teaser Player
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

