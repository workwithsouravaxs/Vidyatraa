"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Trophy, TrendingUp, AlertTriangle, Target, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type TestResult = {
  id: number;
  subject: string;
  score: number;
  date: string;
  correct: number;
  total: number;
};

export default function PerformanceDashboard() {
  const [mounted, setMounted] = useState(false);
  const [reportType, setReportType] = useState<"weekly" | "monthly">("weekly");
  const [history, setHistory] = useState<TestResult[]>([]);

  useEffect(() => {
    setMounted(true);

    // Load mock test history
    const stored = localStorage.getItem("boardbuddy_history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed default history data if empty
      const defaultHistory: TestResult[] = [
        { id: 1, subject: "Mathematics", score: 75, date: "07/02", correct: 3, total: 4 },
        { id: 2, subject: "Science", score: 66, date: "07/04", correct: 2, total: 3 },
        { id: 3, subject: "Mathematics", score: 100, date: "07/06", correct: 4, total: 4 },
        { id: 4, subject: "Science", score: 100, date: "07/08", correct: 3, total: 3 },
      ];
      setHistory(defaultHistory);
      localStorage.setItem("boardbuddy_history", JSON.stringify(defaultHistory));
    }
  }, []);

  // Performance data configurations
  const weeklyData = [
    { name: "Wk 1", score: 62 },
    { name: "Wk 2", score: 70 },
    { name: "Wk 3", score: 81 },
    { name: "Wk 4", score: 89 },
  ];

  const monthlyData = [
    { name: "Mar", score: 55 },
    { name: "Apr", score: 68 },
    { name: "May", score: 72 },
    { name: "Jun", score: 80 },
    { name: "Jul", score: 89 },
  ];

  const subjectPerformance = [
    { subject: "Math", score: 87, fill: "#38bdf8" },
    { subject: "Science", score: 83, fill: "#34d399" },
    { subject: "Social", score: 72, fill: "#fbbf24" },
    { subject: "English", score: 90, fill: "#a78bfa" },
  ];

  const strongAreas = [
    { topic: "Quadratic Equations", accuracy: "94% Accuracy", reason: "Scored full marks in 3 consecutive tests!" },
    { topic: "Chemical Reactions", accuracy: "89% Accuracy", reason: "Excellent recall of exothermic reactions." },
    { topic: "Letter to God (English)", accuracy: "90% Accuracy", reason: "Analyzed characters correctly." },
  ];

  const weakAreas = [
    { topic: "Arithmetic Progressions", accuracy: "68% Accuracy", reason: "Struggling with sum of series formulas.", link: "/resources" },
    { topic: "Nationalism in India", accuracy: "71% Accuracy", reason: "Struggled with Satyagraha dates.", link: "/resources" },
  ];

  const avgAccuracy = history.length > 0
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length)
    : 85;

  const dynamicTrendData = history.length > 0
    ? history.map((h) => ({
        name: h.date,
        score: h.score,
      }))
    : (reportType === "weekly" ? weeklyData : monthlyData);

  // Mascot quotes
  const buddyMsg = "Whoa! Look at that upward curve! Your scores have jumped 27% since March. Keep up this momentum! 🚀";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Stats cards & Charts */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Accuracy */}
            <div className="cartoon-card p-4 bg-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-100 border border-sky-300 text-sky-800 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400">AVG ACCURACY</p>
                <h4 className="text-lg font-black text-navy leading-none mt-1">{avgAccuracy}%</h4>
              </div>
            </div>

            {/* Mock Tests Completed */}
            <div className="cartoon-card p-4 bg-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 border border-purple-300 text-purple-800 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400">MOCKS COMPLETED</p>
                <h4 className="text-lg font-black text-navy leading-none mt-1">{history.length} Tests</h4>
              </div>
            </div>

            {/* Time Taken */}
            <div className="cartoon-card p-4 bg-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-100 border border-orange-300 text-orange-800 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400">AVG TEST SPEED</p>
                <h4 className="text-lg font-black text-navy leading-none mt-1">11 Mins</h4>
              </div>
            </div>

            {/* Streak Level */}
            <div className="cartoon-card p-4 bg-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400">IMPROVEMENT</p>
                <h4 className="text-lg font-black text-navy leading-none mt-1">+27% Up</h4>
              </div>
            </div>

          </div>

          {/* Main Chart Area */}
          <div className="cartoon-card p-6 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="text-left">
                <h3 className="text-xl font-extrabold font-fredoka text-navy flex items-center gap-1.5">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Improvement Curve</span>
                </h3>
                <p className="text-xs font-bold text-slate-400 mt-1">Track your progress and learning increments over time</p>
              </div>

              {/* Selector */}
              <div className="flex bg-slate-100 border-2 border-navy rounded-xl p-1 text-xs font-bold text-navy">
                <button
                  onClick={() => setReportType("weekly")}
                  className={`py-1 px-3.5 rounded-lg ${
                    reportType === "weekly" ? "bg-white border border-navy shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]" : "text-slate-500"
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setReportType("monthly")}
                  className={`py-1 px-3.5 rounded-lg ${
                    reportType === "monthly" ? "bg-white border border-navy shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]" : "text-slate-500"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Performance Line Chart */}
            <div className="h-64 w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dynamicTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontWeight={700} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} fontWeight={700} tickLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "2px solid #0f172a",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#0f172a",
                      }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Subject wise charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recharts Bar Chart */}
            <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <h4 className="font-extrabold font-fredoka text-navy text-sm mb-4 text-left">Subject Proficiency %</h4>
              <div className="h-44 w-full">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformance} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="subject" stroke="#64748b" fontSize={10} fontWeight={800} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} fontWeight={800} tickLine={false} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #0f172a",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      />
                      <Bar dataKey="score" radius={[5, 5, 0, 0]} stroke="#0f172a" strokeWidth={2} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Test attempts history log list */}
            <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
              <h4 className="font-extrabold font-fredoka text-navy text-sm mb-4 text-left">Exam Activity History</h4>
              
              <div className="space-y-2 flex-1 overflow-y-auto max-h-40 pr-1">
                {history.map((h) => (
                  <div key={h.id} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold">
                    <div className="text-left">
                      <p className="text-navy">{h.subject} Mock</p>
                      <p className="text-[10px] text-slate-400">{h.date}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                      h.score >= 75
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-amber-50 border-amber-300 text-amber-800"
                    }`}>
                      {h.score}% score ({h.correct}/{h.total})
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Weak / Strong Areas Recommendations & Mascot */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Diagnostic Strengths list */}
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-base font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <span className="text-lg">💪</span>
              <span>Your Strong Areas</span>
            </h3>

            <div className="space-y-3">
              {strongAreas.map((sa) => (
                <div key={sa.topic} className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-extrabold text-xs text-emerald-950 font-fredoka">{sa.topic}</h4>
                    <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      {sa.accuracy}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-emerald-900/60 leading-tight">{sa.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Weaknesses list + links */}
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-base font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Needs Improvement</span>
            </h3>

            <div className="space-y-3">
              {weakAreas.map((wa) => (
                <div key={wa.topic} className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-extrabold text-xs text-amber-950 font-fredoka">{wa.topic}</h4>
                    <span className="text-[9px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">
                      {wa.accuracy}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-amber-900/60 leading-tight mb-2">{wa.reason}</p>
                  <a
                    href={wa.link}
                    className="inline-flex text-[9px] font-black bg-white hover:bg-slate-50 border border-navy text-navy px-2.5 py-1 rounded-lg"
                  >
                    Review Notes 📖
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mascot encouraging dialogue */}
          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state="happy"
              message={buddyMsg}
              bubblePosition="bottom"
              size={120}
            />
          </div>

        </div>
      </main>
    </div>
  );
}
