"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { UserCheck, Clock, Award, Target, Calendar, Download } from "lucide-react";
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

export default function ParentDashboard() {
  const [mounted, setMounted] = useState(false);
  const [studentName, setStudentName] = useState("Rahul");
  const [history, setHistory] = useState<TestResult[]>([]);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vidyatraa_student");
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setStudentName(profile.name || "Rahul");
      } catch (e) {
        console.error(e);
      }
    }

    const storedHistory = localStorage.getItem("vidyatraa_history");
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Weekly study time logs (in minutes)
  const studyTimeLogs = [
    { day: "Mon", time: 45 },
    { day: "Tue", time: 60 },
    { day: "Wed", time: 30 },
    { day: "Thu", time: 75 },
    { day: "Fri", time: 50 },
    { day: "Sat", time: 90 },
    { day: "Sun", time: 120 },
  ];

  const strongSubjects = [
    { name: "Mathematics", proficiency: "87%", count: 12 },
    { name: "English Literature", proficiency: "90%", count: 8 },
  ];

  const weakSubjects = [
    { name: "Social Studies (History)", proficiency: "72%", count: 15 },
  ];

  const buddyMsg = `Hello! I'm Buddy, ${studentName}'s study partner. I make sure revision remains fun while reporting direct progress analytics here! 👨‍👩‍👦`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Panel: Diagnostic lists & Mascot */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-left">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <UserCheck className="w-5 h-5 text-indigo-500" />
              <span>Parent Portal</span>
            </h3>

            <div className="space-y-4 text-xs font-bold text-slate-500">
              <p>Monitor your child's weekly study timelines, mock test scores, and chapter diagnostics to support their board preparation.</p>
              
              {/* Profile Card */}
              <div className="bg-slate-50 border-2 border-navy rounded-xl p-3.5 flex justify-between items-center text-navy font-extrabold shadow-sm">
                <div>
                  <p className="text-[10px] text-slate-400">STUDENT PROFILE</p>
                  <p className="text-sm font-fredoka">{studentName}</p>
                </div>
                <span className="bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded-full border border-navy">
                  Class 10
                </span>
              </div>
            </div>
          </div>

          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state="happy"
              message={buddyMsg}
              bubblePosition="bottom"
              size={120}
            />
          </div>

        </div>

        {/* Right Side Panel: Visual Analytics */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] min-h-[460px] flex flex-col text-left">
            
            <div className="border-b-4 border-navy pb-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs bg-navy text-white font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">
                  Weekly Report Cards
                </span>
                <h2 className="text-3xl font-black font-fredoka text-navy mt-2">
                  Parent Analytics Panel
                </h2>
              </div>

              <button
                onClick={() => alert("📥 Downloading Weekly Progress Summary Report Card PDF...")}
                className="cartoon-btn cartoon-btn-yellow text-xs px-4 py-2.5 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report Card</span>
              </button>
            </div>

            {/* Core KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-slate-50 border-2 border-navy rounded-2xl flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-slate-400">STUDY DURATION</p>
                  <p className="font-extrabold text-sm text-navy">7.8 Hours (Weekly)</p>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border-2 border-navy rounded-2xl flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-slate-400">ACCURACY METRICS</p>
                  <p className="font-extrabold text-sm text-navy">82.5% Average</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-navy rounded-2xl flex items-center gap-3">
                <Calendar className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-slate-400">MISSION ATTENDANCE</p>
                  <p className="font-extrabold text-sm text-navy">92% Compliance</p>
                </div>
              </div>
            </div>

            {/* Recharts chart */}
            <div className="border-2 border-navy rounded-2xl p-5 mb-6">
              <h4 className="font-extrabold font-fredoka text-navy text-sm mb-4">Daily Study Time Log (Mins)</h4>
              <div className="h-44 w-full">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studyTimeLogs} margin={{ top: 5, right: 5, left: -35, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={10} fontWeight={800} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} fontWeight={800} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #0f172a",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      />
                      <Bar dataKey="time" fill="#38bdf8" radius={[4, 4, 0, 0]} stroke="#0f172a" strokeWidth={2} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Strengths & weak areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strong Subjects */}
              <div className="cartoon-card-flat p-4 border-2 border-navy bg-emerald-50/20">
                <h4 className="font-extrabold text-emerald-950 font-fredoka text-sm mb-3 flex items-center gap-1">
                  <span>💪</span>
                  <span>Strong Academic Areas</span>
                </h4>
                <div className="space-y-2">
                  {strongSubjects.map((s) => (
                    <div key={s.name} className="flex justify-between items-center p-2.5 bg-white border border-emerald-200 rounded-xl text-xs font-bold">
                      <span className="text-navy">{s.name}</span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                        {s.proficiency} Proficiency
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weak Subjects */}
              <div className="cartoon-card-flat p-4 border-2 border-navy bg-amber-50/20">
                <h4 className="font-extrabold text-amber-950 font-fredoka text-sm mb-3 flex items-center gap-1">
                  <span>⚠️</span>
                  <span>Review Priority Areas</span>
                </h4>
                <div className="space-y-2">
                  {weakSubjects.map((s) => (
                    <div key={s.name} className="flex justify-between items-center p-2.5 bg-white border border-amber-200 rounded-xl text-xs font-bold">
                      <span className="text-navy">{s.name}</span>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 text-[10px]">
                        {s.proficiency} Proficiency
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

