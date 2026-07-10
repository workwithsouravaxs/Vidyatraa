"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Award, Medal, Shield, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type LeaderboardEntry = {
  rank: number;
  name: string;
  school: string;
  level: number;
  xp: number;
  badge: string;
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"school" | "district" | "friends">("school");
  const [studentName, setStudentName] = useState("Rahul");

  useEffect(() => {
    const stored = localStorage.getItem("vidyatraa_student");
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setStudentName(profile.name || "Rahul");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const schoolRankings: LeaderboardEntry[] = [
    { rank: 1, name: "Aryan Sen", school: "St. Xavier's Academy", level: 5, xp: 2150, badge: "🥇" },
    { rank: 2, name: "Sneha Reddy", school: "St. Xavier's Academy", level: 4, xp: 1850, badge: "🥈" },
    { rank: 3, name: studentName, school: "St. Xavier's Academy", level: 4, xp: 1250, badge: "🥉" },
    { rank: 4, name: "Varun Malhotra", school: "St. Xavier's Academy", level: 3, xp: 950, badge: "🛡️" },
    { rank: 5, name: "Priya Nair", school: "St. Xavier's Academy", level: 3, xp: 820, badge: "🛡️" },
  ];

  const districtRankings: LeaderboardEntry[] = [
    { rank: 1, name: "Kabir Mehta", school: "Delhi Public School", level: 6, xp: 3200, badge: "🥇" },
    { rank: 2, name: "Diya Sharma", school: "National High School", level: 5, xp: 2450, badge: "🥈" },
    { rank: 3, name: "Aryan Sen", school: "St. Xavier's Academy", level: 5, xp: 2150, badge: "🥉" },
    { rank: 4, name: "Aditi Rao", school: "Army Public School", level: 4, xp: 1980, badge: "🛡️" },
    { rank: 12, name: studentName, school: "St. Xavier's Academy", level: 4, xp: 1250, badge: "🛡️" },
  ];

  const friendsRankings: LeaderboardEntry[] = [
    { rank: 1, name: "Sneha Reddy", school: "St. Xavier's Academy", level: 4, xp: 1850, badge: "🥇" },
    { rank: 2, name: studentName, school: "St. Xavier's Academy", level: 4, xp: 1250, badge: "🥈" },
    { rank: 3, name: "Varun Malhotra", school: "St. Xavier's Academy", level: 3, xp: 950, badge: "🥉" },
  ];

  const activeRankings =
    activeTab === "school" ? schoolRankings : activeTab === "district" ? districtRankings : friendsRankings;

  // Mascot quotes
  const buddyMsg = `Incredible work! You are currently sitting at #${
    activeTab === "school" ? "3" : activeTab === "district" ? "12" : "2"
  } in the standings. Let's finish one more mock test to overtake the leaders! 🚀`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Stats and Mascot */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-left">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Standings Board</span>
            </h3>

            <div className="space-y-4 text-xs font-bold text-slate-500">
              <p>Solve daily quizzes, complete homework missions, and clear mock simulation tests to stack up XP points and climb the rankings.</p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-950">
                Weekly reset happens every Sunday at 12:00 AM! Top 3 positions receive gold badges and XP multipliers! 🌟
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

        {/* Right Side: Rankings Lists */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] min-h-[460px] flex flex-col">
            
            <div className="border-b-4 border-navy pb-5 mb-6 text-left">
              <span className="text-xs bg-navy text-white font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">
                Leaderboard Competition
              </span>
              <h2 className="text-3xl font-black font-fredoka text-navy mt-2">
                Class 10 Rankings
              </h2>
            </div>

            {/* Filter selectors */}
            <div className="grid grid-cols-3 border-b-2 border-navy text-center font-extrabold text-xs md:text-sm text-navy mb-6 bg-white">
              {(["school", "district", "friends"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3.5 capitalize border-r border-slate-200 transition-all ${
                    activeTab === tab ? "bg-amber-100 text-amber-900 border-b-2 border-b-amber-500 font-black" : "hover:bg-slate-50"
                      }`}
                >
                  {tab === "school" ? "🏫 My School" : tab === "district" ? "🌍 District" : "👥 Study Buddies"}
                </button>
              ))}
            </div>

            {/* Rankings table lists */}
            <div className="flex-1 space-y-3">
              {activeRankings.map((entry) => {
                const isStudent = entry.name === studentName;
                return (
                  <div
                    key={entry.rank}
                    className={`cartoon-card-flat p-4 border-2 border-navy flex justify-between items-center transition-all ${
                      isStudent ? "bg-yellow/20 border-yellow shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-extrabold" : "bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      {/* Rank badge */}
                      <span className="w-8 h-8 rounded-lg border-2 border-navy bg-white flex items-center justify-center font-black text-xs md:text-sm shrink-0">
                        {entry.badge}
                      </span>

                      <div>
                        <h4 className="font-extrabold text-navy text-sm md:text-base font-fredoka flex items-center gap-1.5">
                          <span>{entry.name}</span>
                          {isStudent && (
                            <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                              YOU
                            </span>
                          )}
                        </h4>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{entry.school}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-[9px] font-black text-slate-400">LEVEL</p>
                        <p className="text-xs font-black text-indigo-700">Lvl {entry.level}</p>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <p className="text-[9px] font-black text-slate-400">TOTAL XP</p>
                        <p className="text-xs font-black text-emerald-600">⭐ {entry.xp} XP</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

