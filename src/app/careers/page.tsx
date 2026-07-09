"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Landmark, Award, ArrowRight, BookOpen, Compass, Briefcase, GraduationCap, DollarSign, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type CareerPathNode = {
  title: string;
  desc: string;
  emoji: string;
};

type CareerData = {
  name: string;
  emoji: string;
  color: string;
  whatIsIt: string;
  eligibility: string;
  duration: string;
  fees: string;
  salary: string;
  skills: string[];
  scope: string;
  roadmap: CareerPathNode[];
  colleges: string[];
};

export default function CareerRoadmaps() {
  const careers: CareerData[] = [
    {
      name: "Science & Engineering",
      emoji: "🚀",
      color: "bg-sky-100 border-sky-400 text-sky-800",
      whatIsIt: "A pathway focused on technology, physics, mathematics, chemistry, and building software or infrastructure systems.",
      eligibility: "Class 10 completed with science & math subjects. Score 75% or above recommended.",
      duration: "2 Years Stream (11th & 12th) + 4 Years B.Tech / B.E.",
      fees: "₹1,00,000 - ₹3,50,000 per year (Govt vs Private)",
      salary: "₹6,00,000 - ₹22,00,000 LPA (Starting averages)",
      skills: ["Mathematics", "Logical Reasoning", "Coding", "Physics", "Chemistry"],
      scope: "Software Engineer, Civil/Mechanical Designer, Data Analyst, Research Scientist.",
      colleges: ["Indian Institutes of Technology (IITs)", "National Institutes of Technology (NITs)", "BITS Pilani", "Delhi Technological University (DTU)"],
      roadmap: [
        { title: "Class 10 Boards", desc: "Ace your boards with Math & Science priority.", emoji: "🎓" },
        { title: "Class 11 & 12 (PCM)", desc: "Opt for Physics, Chemistry, Math stream. Prepare for JEE Main.", emoji: "📖" },
        { title: "Engineering Degree", desc: "Secure a seat in B.Tech Computer Science/Mechanical.", emoji: "🏛️" },
        { title: "First Job Placement", desc: "Get hired as a Junior Developer or Engineer.", emoji: "💼" },
      ],
    },
    {
      name: "Commerce & Finance",
      emoji: "📊",
      color: "bg-amber-100 border-amber-400 text-amber-800",
      whatIsIt: "A career mapping accounting, economics, financial audit, stock markets, banking, and business management operations.",
      eligibility: "Class 10 completed. 60%+ recommended. Strong affinity for simple mathematics.",
      duration: "2 Years Commerce + 3 Years B.Com / BBA + CA training (parallel).",
      fees: "₹40,000 - ₹1,50,000 per year.",
      salary: "₹5,00,000 - ₹15,00,000 LPA (Increases rapidly with CA credentials).",
      skills: ["Accounting", "Macro Economics", "Statistics", "Problem Solving", "Finance laws"],
      scope: "Chartered Accountant (CA), Financial Analyst, Investment Banker, CEO.",
      colleges: ["Shri Ram College of Commerce (SRCC)", "Lady Shri Ram College", "Christ University Bangalore", "St. Xavier's Mumbai"],
      roadmap: [
        { title: "Class 10 Graduation", desc: "Establish foundation in statistics & math.", emoji: "🎓" },
        { title: "Class 11 & 12 Commerce", desc: "Study Accounts, Business Studies, Economics.", emoji: "📈" },
        { title: "B.Com + CA Foundation", desc: "Enroll in college and clear CA Foundation entrance.", emoji: "🖋️" },
        { title: "CA Articleship & Finals", desc: "Work under a senior CA and clear final CA audits.", emoji: "💼" },
      ],
    },
    {
      name: "AI & Future Careers",
      emoji: "🤖",
      color: "bg-purple-100 border-purple-400 text-purple-800",
      whatIsIt: "Cutting-edge technologies including Machine Learning, Robotics, Generative AI models, and Advanced Data Modeling.",
      eligibility: "Class 10 completed. Score 80%+ with Math priority. High curiosity for coding.",
      duration: "2 Years Science + 4 Years B.Tech (AI/ML specialization) or BCA/MCA path.",
      fees: "₹1,20,000 - ₹4,00,000 per year.",
      salary: "₹8,00,000 - ₹35,00,000 LPA (Extremely high demand).",
      skills: ["Python coding", "Linear Algebra", "Probability", "Neural Networks", "Curiosity"],
      scope: "AI Engineer, Prompt Engineer, Machine Learning Developer, Robotics Scientist.",
      colleges: ["IIT Hyderabad (B.Tech AI)", "IIIT Bangalore", "Manipal Institute of Technology", "Vellore Institute of Technology (VIT)"],
      roadmap: [
        { title: "Class 10 Boards", desc: "Ace algebra, functions, and basic logic.", emoji: "🎓" },
        { title: "Self Study & Python", desc: "Learn basic coding via BoardBuddy guidelines.", emoji: "💻" },
        { title: "Advanced Degree", desc: "Secure B.Tech/BCA in Data Science & Artificial Intelligence.", emoji: "🏛️" },
        { title: "AI Research Deploy", desc: "Deploy GenAI apps or work on LLM fine-tuning.", emoji: "🤖" },
      ],
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const activeCareer = careers[activeIdx];

  // Mascot quotes
  const buddyMsg = `Hey! Choosing a career is like picking your character class in a roleplaying game. Here's a walkthrough for ${activeCareer.name}! 🚀`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Career Selectors & Mascot */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="cartoon-card p-5 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">Select Stream</h3>
            <div className="flex flex-col gap-2">
              {careers.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border-2 border-navy font-bold text-sm transition-all flex items-center justify-between ${
                    activeIdx === idx
                      ? `${c.color} shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]`
                      : "bg-white hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.emoji}</span>
                    <span>{c.name}</span>
                  </div>
                  <ChevronArrowRight active={activeIdx === idx} />
                </button>
              ))}
            </div>
          </div>

          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state="thinking"
              message={buddyMsg}
              bubblePosition="bottom"
              size={120}
            />
          </div>
        </div>

        {/* Right Side: Detailed Roadmap timeline */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] text-left">
            <div className="border-b-4 border-navy pb-5 mb-6">
              <span className="text-xs bg-navy text-white font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">
                Interactive Career Map
              </span>
              <h2 className="text-3xl font-black font-fredoka text-navy mt-2">
                {activeCareer.name} {activeCareer.emoji}
              </h2>
            </div>

            {/* Quick stats details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 border-2 border-navy rounded-2xl p-4 text-xs font-black text-navy mb-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-[10px] text-slate-400">DURATION</p>
                  <p className="leading-tight">{activeCareer.roadmap.length}+ Years</p>
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <Landmark className="w-5 h-5 text-sky-500" />
                <div>
                  <p className="text-[10px] text-slate-400">FEES AVG</p>
                  <p className="leading-tight text-xs truncate max-w-[100px]">{activeCareer.fees.split(" ")[0]}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-[10px] text-slate-400">SALARY</p>
                  <p className="leading-tight text-xs truncate max-w-[100px]">{activeCareer.salary.split(" ")[0]}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <Briefcase className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-[10px] text-slate-400">ELIGIBILITY</p>
                  <p className="leading-tight text-[11px] truncate max-w-[100px]">Class 10 Pass</p>
                </div>
              </div>
            </div>

            {/* What is it description */}
            <div className="space-y-4 mb-8">
              <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4">
                <h4 className="font-extrabold text-sky-950 text-sm mb-1">What is it?</h4>
                <p className="text-xs font-bold text-sky-900/70 leading-relaxed">{activeCareer.whatIsIt}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skills needed */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <h4 className="font-extrabold text-navy text-sm mb-2">Skills Required</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCareer.skills.map((sk) => (
                      <span key={sk} className="text-[10px] bg-white border border-navy px-2.5 py-1 rounded-lg font-bold text-navy">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colleges list */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <h4 className="font-extrabold text-navy text-sm mb-2">Target Best Colleges</h4>
                  <ul className="text-[10px] font-bold text-slate-500 space-y-1.5">
                    {activeCareer.colleges.slice(0, 3).map((col) => (
                      <li key={col} className="flex items-center gap-1">
                        <span className="text-indigo-500 text-xs">🏛️</span> <span>{col}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Roadmap timeline nodes */}
            <div className="space-y-6 relative pl-6 border-l-4 border-dashed border-navy py-1.5 ml-4">
              <h3 className="font-extrabold font-fredoka text-navy text-base mb-4 -ml-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                <span>Roadmap Walkthrough</span>
              </h3>

              {activeCareer.roadmap.map((node, nIdx) => (
                <div key={nIdx} className="relative mb-6 last:mb-0">
                  {/* Circle dot on line */}
                  <span className="absolute -left-[38px] top-1 w-8 h-8 rounded-full border-3 border-navy bg-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {node.emoji}
                  </span>
                  
                  <div className="bg-slate-50 border-2 border-navy rounded-xl p-3.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <span className="text-[9px] font-black text-primary">PHASE {nIdx + 1}</span>
                    <h5 className="font-extrabold text-navy text-sm font-fredoka mt-0.5">{node.title}</h5>
                    <p className="text-[11px] font-bold text-slate-400 leading-relaxed mt-1">{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function ChevronArrowRight({ active }: { active: boolean }) {
  return (
    <span className={`text-slate-400 font-bold transition-all text-xs ${active ? "translate-x-1 text-sky-600" : ""}`}>
      ➔
    </span>
  );
}
