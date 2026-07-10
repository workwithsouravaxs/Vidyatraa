"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, Clock, CheckCircle2, XCircle, HelpCircle, ChevronRight, ListTodo, Plus, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type PlannerTask = {
  id: number;
  timeSlot: string;
  subject: string;
  topic: string;
  status: "Completed" | "Pending" | "Skipped";
};

export default function RevisionPlanner() {
  const [examDate, setExamDate] = useState("2027-03-01");
  const [isGenerated, setIsGenerated] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "milestones">("daily");

  const [buddyMsg, setBuddyMsg] = useState("Enter your Class 10 exam date below, and I'll sketch a gamified revision road map leading right to the big day! 🗓️");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("wave");

  // Daily Tasks
  const [dailyTasks, setDailyTasks] = useState<PlannerTask[]>([
    { id: 1, timeSlot: "07:00 AM - 08:00 AM", subject: "Mathematics", topic: "Solve Quadratic equations factorization questions", status: "Pending" },
    { id: 2, timeSlot: "04:30 PM - 05:30 PM", subject: "Science", topic: "Read Chemistry Chapter 1 summary & balancing notes", status: "Pending" },
    { id: 3, timeSlot: "07:00 PM - 07:30 PM", subject: "English / Social", topic: "Solve 10 Satyagraha timeline multiple choice questions", status: "Pending" },
  ]);

  // Weekly Plan Schema
  const weeklyPlan = [
    { day: "Monday", subject: "Mathematics", topic: "Quadratic equations word problems" },
    { day: "Tuesday", subject: "Science", topic: "Chemical combination and displacement" },
    { day: "Wednesday", subject: "Social Studies", topic: "Gandhian satyagraha movements in India" },
    { day: "Thursday", subject: "English", topic: "Read 'A Letter to God' & study vocabulary" },
    { day: "Friday", subject: "Mathematics", topic: "Arithmetic Progressions nth term formulas" },
    { day: "Saturday", subject: "Science", topic: "Balanced chemical equations practice lab" },
    { day: "Sunday", subject: "Full Mock Test", topic: "Attempt 2-hour mathematics mock simulation" },
  ];

  // Milestones Months
  const milestones = [
    { phase: "Month 1 (Syllabus Completion)", details: "Focus on complete textbook solutions, exercises, and basic formulas across Math and Science." },
    { phase: "Month 2 (Chapter Wise Drills)", details: "Solve previous year questions (PYQs) for each chapter. Generate AI custom practice sheets." },
    { phase: "Month 3 (Full Exam Simulation)", details: "Attempt weekly full length mock tests, work on time pacing, and address weak syllabus areas." },
    { phase: "Month 4 (Quick Recap & Formulas)", details: "Daily speed flashcard review, cheat sheet formulas cramming, and doubt solver reviews." },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examDate) return;

    // Calculate days remaining
    const examTime = new Date(examDate).getTime();
    const nowTime = new Date().getTime();
    const diffTime = examTime - nowTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      setBuddyState("thinking");
      setBuddyMsg("Oops! Please select a future date for your board exams. 😊");
      return;
    }

    setDaysRemaining(diffDays);
    setIsGenerated(true);
    setBuddyState("cheer");
    setBuddyMsg(`Ka-boom! Plan generated! You have 🔥 ${diffDays} Days left. Let's tackle today's schedule one block at a time! 🚀`);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleStatusChange = (taskId: number, newStatus: "Completed" | "Pending" | "Skipped") => {
    const updated = dailyTasks.map((t) => {
      if (t.id === taskId) {
        if (newStatus === "Completed" && t.status !== "Completed") {
          setBuddyState("happy");
          setBuddyMsg("Bravo! Task complete! Gained +20 XP points. Keep this streak alive! 🔥");
          
          confetti({
            particleCount: 20,
            angle: 120,
            spread: 45,
            origin: { x: 1 }
          });
          
          // Add small XP to profile
          const stored = localStorage.getItem("vidyatraa_student");
          if (stored) {
            try {
              const profile = JSON.parse(stored);
              const updatedProfile = {
                ...profile,
                xp: profile.xp + 20,
                level: Math.floor((profile.xp + 20) / 400) + 1,
              };
              localStorage.setItem("vidyatraa_student", JSON.stringify(updatedProfile));
            } catch (e) {
              console.error(e);
            }
          }
        } else if (newStatus === "Skipped") {
          setBuddyState("thinking");
          setBuddyMsg("Don't worry! We can reschedule this task tomorrow. Rest is important too! 😊");
        }
        return { ...t, status: newStatus };
      }
      return t;
    });
    setDailyTasks(updated);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Panel: Configurations or mascot */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Setup revision planner */}
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Exam Schedule</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Set Board Exam Date</label>
                <input
                  type="date"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-navy rounded-xl text-sm font-bold bg-white text-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Focus Strategy</label>
                <select className="w-full px-3 py-2.5 border-2 border-navy rounded-xl text-sm font-bold bg-white text-navy focus:outline-none">
                  <option value="balanced">⚖️ All Subjects Balanced</option>
                  <option value="weak">🎯 Weak Areas Priority (Math/Sci)</option>
                  <option value="intense">🔥 Quick Revision Sprint (30 days)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full cartoon-btn cartoon-btn-yellow py-3.5 mt-2 flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              >
                <span>{isGenerated ? "Regenerate Planner 🗓️" : "Create My Revision Plan 🚀"}</span>
              </button>
            </form>
          </div>

          {/* Interactive Mascot display */}
          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state={buddyState}
              message={buddyMsg}
              bubblePosition="bottom"
              size={120}
            />
          </div>

        </div>

        {/* Right Side Panel: Interactive schedules display */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] min-h-[420px] flex flex-col">
            
            {isGenerated ? (
              // Planner Dashboards
              <div className="flex-1 flex flex-col">
                {/* Stats Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-navy pb-5 mb-6">
                  <div className="text-left">
                    <span className="text-xs bg-navy text-white font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">
                      PLAN ACTIVE
                    </span>
                    <h2 className="text-2xl font-black font-fredoka text-navy mt-2">
                      Syllabus Revision Planner
                    </h2>
                  </div>

                  <div className="bg-orange-50 border-2 border-navy rounded-2xl p-3 text-center shrink-0 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <p className="text-[9px] font-black text-slate-400">COUNTDOWN TO BOARDS</p>
                    <p className="text-lg font-black text-orange-700">{daysRemaining} Days Left!</p>
                  </div>
                </div>

                {/* Tab buttons */}
                <div className="grid grid-cols-3 border-b-2 border-navy text-center font-extrabold text-xs md:text-sm text-navy mb-6 bg-white">
                  {(["daily", "weekly", "milestones"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3.5 capitalize border-r border-slate-200 transition-all ${
                        activeTab === tab ? "bg-amber-100 text-amber-900 border-b-2 border-b-amber-500 font-black" : "hover:bg-slate-50"
                      }`}
                    >
                      {tab === "daily" ? "📝 Daily Checklist" : tab === "weekly" ? "📅 Weekly Routine" : "🏆 Milestones"}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 text-left">
                  <AnimatePresence mode="wait">
                    
                    {/* 1. Daily Checklist */}
                    {activeTab === "daily" && (
                      <motion.div
                        key="daily"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <ListTodo className="w-5 h-5 text-primary" />
                          <h4 className="font-extrabold text-navy font-fredoka text-base">Today's Study Slots</h4>
                        </div>

                        <div className="space-y-3">
                          {dailyTasks.map((task) => (
                            <div
                              key={task.id}
                              className={`cartoon-card-flat p-4 border-2 border-navy flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
                                task.status === "Completed"
                                  ? "bg-slate-100/70 border-slate-300 opacity-60 text-slate-400"
                                  : task.status === "Skipped"
                                  ? "bg-rose-50 border-rose-200"
                                  : "bg-white"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs font-black">
                                  <span className="text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> {task.timeSlot}
                                  </span>
                                  <span className="text-primary bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md text-[10px]">
                                    {task.subject}
                                  </span>
                                </div>
                                <p className={`font-bold text-sm text-navy ${task.status === "Completed" ? "line-through" : ""}`}>
                                  {task.topic}
                                </p>
                              </div>

                              {/* Action statuses */}
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleStatusChange(task.id, "Completed")}
                                  className={`px-3 py-1.5 rounded-lg border-2 border-navy font-bold text-xs ${
                                    task.status === "Completed"
                                      ? "bg-emerald-500 border-emerald-600 text-white shadow-sm"
                                      : "bg-white text-emerald-600 hover:bg-emerald-50"
                                  }`}
                                >
                                  {task.status === "Completed" ? "Completed" : "Mark Done"}
                                </button>
                                <button
                                  onClick={() => handleStatusChange(task.id, "Skipped")}
                                  className={`px-3 py-1.5 rounded-lg border-2 border-navy font-bold text-xs ${
                                    task.status === "Skipped"
                                      ? "bg-rose-500 border-rose-600 text-white shadow-sm"
                                      : "bg-white text-rose-500 hover:bg-rose-50"
                                  }`}
                                >
                                  {task.status === "Skipped" ? "Skipped" : "Skip"}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* 2. Weekly routine grid */}
                    {activeTab === "weekly" && (
                      <motion.div
                        key="weekly"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <h4 className="font-extrabold text-navy font-fredoka text-base mb-2">Subject Distribution Routine</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {weeklyPlan.map((wp) => (
                            <div key={wp.day} className="cartoon-card-flat p-4 border-2 border-navy flex items-start gap-3 bg-slate-50">
                              <span className="w-8 h-8 rounded-lg border-2 border-navy bg-amber-400 text-navy flex items-center justify-center font-extrabold text-xs">
                                {wp.day.substring(0, 3)}
                              </span>
                              <div>
                                <p className="text-xs font-black text-slate-400">{wp.day} Study Target</p>
                                <h5 className="font-extrabold text-navy text-sm font-fredoka mt-0.5">{wp.subject}</h5>
                                <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">{wp.topic}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* 3. Monthly targets */}
                    {activeTab === "milestones" && (
                      <motion.div
                        key="milestones"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <h4 className="font-extrabold text-navy font-fredoka text-base mb-4">Milestone Target Matrix</h4>
                        <div className="space-y-4">
                          {milestones.map((ml, idx) => (
                            <div key={idx} className="cartoon-card-flat p-4 border-2 border-navy flex gap-4 bg-white relative">
                              <div className="w-10 h-10 rounded-full border-2 border-navy bg-sky-200 text-sky-800 flex items-center justify-center font-black text-base shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <h5 className="font-black text-navy text-sm md:text-base font-fredoka">{ml.phase}</h5>
                                <p className="text-xs font-bold text-slate-400 mt-1.5 leading-relaxed">{ml.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            ) : (
              // Empty setup
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 max-w-sm flex flex-col items-center gap-4">
                  <span className="text-5xl">📅</span>
                  <h4 className="text-lg font-extrabold text-navy font-fredoka">Planner Offline</h4>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed">
                    Please key in your scheduled Class 10 board exam date in the side configuration panel to generate your custom daily, weekly, and monthly revision timelines.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

