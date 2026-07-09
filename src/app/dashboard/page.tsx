"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { BookOpen, Sparkles, Trophy, Award, Search, Flame, Calendar, CheckSquare, Square, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type Mission = {
  id: number;
  text: string;
  xp: number;
  coins: number;
  completed: boolean;
};

export default function Dashboard() {
  const [profile, setProfile] = useState({
    name: "Rahul",
    board: "CBSE",
    xp: 1250,
    coins: 340,
    level: 4,
    streak: 5,
    expectedPercentage: "95%+",
    status: "Active" as "Active" | "Expired" | "Trial",
  });

  const [showExpiredOverlay, setShowExpiredOverlay] = useState(false);

  const [missions, setMissions] = useState<Mission[]>([
    { id: 1, text: "Revise Chapter 1 (Algebra formulas)", xp: 50, coins: 15, completed: false },
    { id: 2, text: "Attempt Chemistry Chapter 3 Quiz", xp: 100, coins: 30, completed: false },
    { id: 3, text: "Solve 5 Doubt Solver questions", xp: 40, coins: 10, completed: false },
  ]);

  const [claimedDays, setClaimedDays] = useState<number[]>([1, 2]); // Mon and Tue claimed
  const [buddyMsg, setBuddyMsg] = useState("Good morning, champ! Ready for today's mission? Let's crush it! 🚀");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("wave");

  const [broadcast, setBroadcast] = useState("");

  useEffect(() => {
    // Load student profile
    const stored = localStorage.getItem("boardbuddy_student");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile({
          ...profile,
          ...parsed,
          status: (parsed.status as "Active" | "Expired" | "Trial") || "Active"
        });
        if (parsed.status === "Expired") {
          setShowExpiredOverlay(true);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const storedAlert = localStorage.getItem("boardbuddy_broadcast");
    if (storedAlert) {
      setBroadcast(storedAlert);
    }
  }, []);

  const totalMissions = missions.length;
  const completedMissionsCount = missions.filter((m) => m.completed).length;
  const missionProgressPercent = Math.round((completedMissionsCount / totalMissions) * 100);

  // Initial base percentage from dashboard description (e.g. 72% completed overall progress)
  const baseProgress = 72;
  const displayOverallProgress = baseProgress + Math.round((completedMissionsCount / totalMissions) * 28);

  const toggleMission = (id: number) => {
    const nextMissions = missions.map((m) => {
      if (m.id === id) {
        const isNowCompleted = !m.completed;
        
        // Gamification effects
        if (isNowCompleted) {
          setBuddyState("cheer");
          setBuddyMsg(`Awesome job! You gained +${m.xp} XP and +${m.coins} Coins! 🎉`);
          
          // Confetti!
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#38bdf8", "#fbbf24", "#34d399"]
          });

          // Update stats
          const updatedProfile = {
            ...profile,
            xp: profile.xp + m.xp,
            coins: profile.coins + m.coins,
            level: Math.floor((profile.xp + m.xp) / 400) + 1, // Simple level up formula
          };
          setProfile(updatedProfile);
          localStorage.setItem("boardbuddy_student", JSON.stringify(updatedProfile));
        } else {
          setBuddyState("idle");
          setBuddyMsg("Alright, you can attempt it later. Let's keep moving!");
        }

        return { ...m, completed: isNowCompleted };
      }
      return m;
    });

    setMissions(nextMissions);
  };

  const claimDailyReward = (dayNum: number) => {
    if (claimedDays.includes(dayNum)) return;
    if (dayNum !== claimedDays.length + 1) {
      setBuddyState("thinking");
      setBuddyMsg("Oops! You can only claim rewards day-by-day. Keep your streak active!");
      return;
    }

    const coinReward = dayNum * 15;
    const updatedProfile = {
      ...profile,
      coins: profile.coins + coinReward,
    };
    setProfile(updatedProfile);
    localStorage.setItem("boardbuddy_student", JSON.stringify(updatedProfile));

    setClaimedDays([...claimedDays, dayNum]);
    setBuddyState("cheer");
    setBuddyMsg(`Ka-ching! Day ${dayNum} reward claimed: +${coinReward} Coins! 🪙`);

    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#fbbf24", "#eab308"]
    });
  };

  const achievements = [
    { title: "First Quiz", desc: "Completed your first live simulation.", badge: "🥉", color: "bg-orange-50 border-orange-200" },
    { title: "7 Day Streak", desc: "Logged in and solved questions 7 days in a row.", badge: "🔥", color: "bg-red-50 border-red-200" },
    { title: "Math Master", desc: "Scored 90%+ in a full Algebra mock test.", badge: "📐", color: "bg-blue-50 border-blue-200" },
    { title: "Science Hero", desc: "Correctly resolved 15 doubts in Chemistry.", badge: "🧪", color: "bg-emerald-50 border-emerald-200" },
    { title: "Board Warrior", desc: "Generated and attempted 5 mock exam papers.", badge: "🛡️", color: "bg-amber-50 border-amber-200" },
  ];

  const quickLinks = [
    { title: "Study Notes", href: "/resources", icon: BookOpen, color: "bg-sky-400 text-white" },
    { title: "Mock Tests", href: "/mock-tests", icon: Award, color: "bg-purple-400 text-white" },
    { title: "AI Doubt Solver", href: "/doubt-solver", icon: Search, color: "bg-emerald-400 text-white" },
    { title: "Practice Papers", href: "/generator", icon: Sparkles, color: "bg-amber-400 text-white" },
    { title: "Leaderboards", href: "/leaderboard", icon: Trophy, color: "bg-rose-400 text-white" },
    { title: "Daily Challenge", href: "/daily", icon: Flame, color: "bg-orange-400 text-white" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* Broadcast alert banner */}
      {broadcast && (
        <div className="bg-rose-100 border-b-4 border-navy py-3 px-4 md:px-8 text-left">
          <div className="max-w-7xl mx-auto flex items-center justify-between font-black text-xs md:text-sm text-rose-950">
            <div className="flex items-center gap-2">
              <span className="text-lg">📢</span>
              <span><strong>IMPORTANT SYSTEM ANNOUNCEMENT:</strong> {broadcast}</span>
            </div>
            <button
              onClick={() => setBroadcast("")}
              className="cartoon-btn cartoon-btn-white text-[10px] px-2.5 py-1.5 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Section: Welcome, Missions & Mascot */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Greeting Card */}
          <div className="cartoon-card p-6 md:p-8 bg-sky-200 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-3 md:max-w-md">
              <h2 className="text-3xl md:text-4xl font-extrabold font-fredoka text-navy">
                Good Morning, {profile.name}! 👋
              </h2>
              <p className="text-sm md:text-base font-bold text-sky-950/70">
                You're making incredible progress towards your <span className="text-primary font-black bg-white/60 px-2 py-0.5 rounded-lg border border-sky-300">{profile.expectedPercentage} Goal</span> on the {profile.board} board!
              </p>
              
              {/* Overall Progress Circle details */}
              <div className="flex items-center gap-4 bg-white/70 border border-sky-300 rounded-2xl p-3 mt-4 text-xs font-extrabold text-navy shadow-inner">
                <div>
                  <p className="text-slate-400">BOARD READINESS</p>
                  <p className="text-lg text-primary">{displayOverallProgress}% COMPLETED</p>
                </div>
                <div className="flex-1 bg-slate-200 h-3 border-2 border-navy rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-500" style={{ width: `${displayOverallProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Circular Progress Gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0 bg-white rounded-full border-4 border-navy shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <svg className="w-full h-full transform -rotate-95" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#38bdf8"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * displayOverallProgress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black font-fredoka text-navy leading-none">{displayOverallProgress}%</span>
                <span className="text-[9px] font-bold text-slate-400 tracking-wider">READY</span>
              </div>
            </div>
          </div>

          {/* Today's Missions */}
          <div className="cartoon-card p-6 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h3 className="text-2xl font-extrabold font-fredoka text-navy">Today's Missions</h3>
            </div>
            
            <div className="space-y-3">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  onClick={() => toggleMission(mission.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-3 border-navy cursor-pointer transition-all ${
                    mission.completed
                      ? "bg-slate-100/70 border-slate-300 opacity-60 text-slate-400 line-through"
                      : "bg-white hover:bg-slate-50 text-navy hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {mission.completed ? (
                      <CheckSquare className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Square className="w-6 h-6 text-navy" />
                    )}
                    <span className="font-extrabold text-sm md:text-base">{mission.text}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 py-1 px-2.5 rounded-full font-bold">
                      ⭐ +{mission.xp}
                    </span>
                    <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 py-1 px-2.5 rounded-full font-bold">
                      🪙 +{mission.coins}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Mascot Block */}
          <div className="cartoon-card p-6 bg-[#f8fafc] border-dashed border-3 border-navy flex flex-col md:flex-row items-center gap-6 justify-center">
            <BuddyMascot
              state={buddyState}
              message={buddyMsg}
              bubblePosition="right"
              size={130}
            />
          </div>
        </div>

        {/* Right Section: Gamification & Achievements */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Daily Streak Planner Grid */}
          <div className="cartoon-card p-6 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>Weekly Streaks</span>
            </h3>

            <div className="grid grid-cols-7 gap-2 text-center">
              {[
                { day: "M", num: 1 },
                { day: "T", num: 2 },
                { day: "W", num: 3 },
                { day: "T", num: 4 },
                { day: "F", num: 5 },
                { day: "S", num: 6 },
                { day: "S", num: 7 },
              ].map((d) => {
                const isClaimed = claimedDays.includes(d.num);
                const isNext = d.num === claimedDays.length + 1;
                return (
                  <div
                    key={d.num}
                    onClick={() => claimDailyReward(d.num)}
                    className={`p-2.5 rounded-xl border-2 border-navy cursor-pointer transition-all flex flex-col items-center justify-between gap-1.5 ${
                      isClaimed
                        ? "bg-amber-300 border-amber-400"
                        : isNext
                        ? "bg-sky-100 border-sky-400 border-dashed animate-pulse"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="text-[10px] font-black text-slate-500">{d.day}</span>
                    <span className="text-lg">{isClaimed ? "🪙" : "🎁"}</span>
                    <span className="text-[9px] font-extrabold">{isClaimed ? "Claimed" : isNext ? "Claim" : "Locked"}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 text-xs font-bold text-amber-900 text-center">
              Claim daily rewards to keep your streak going! Streak multiplier active! 🔥
            </div>
          </div>

          {/* Achievement shelf */}
          <div className="cartoon-card p-6 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex-1">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              <span>Achievement Badges</span>
            </h3>

            <div className="space-y-3">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 border-navy ${ach.color}`}
                >
                  <span className="text-2xl">{ach.badge}</span>
                  <div className="text-left">
                    <h4 className="font-extrabold text-navy text-sm font-fredoka">{ach.title}</h4>
                    <p className="text-[11px] font-bold text-slate-500 leading-tight">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Quick Navigation Footer Links */}
      <section className="bg-slate-100 py-10 border-t-4 border-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h3 className="text-2xl font-extrabold font-fredoka text-navy mb-6 text-center">
            Ready for your Next Adventure?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="cartoon-card p-4 flex flex-col items-center justify-center text-center gap-3 bg-white hover:bg-slate-50"
                >
                  <div className={`p-2.5 rounded-xl border-2 border-navy shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] ${link.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs text-navy tracking-tight flex items-center gap-0.5">
                    <span>{link.title}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Expiry / Renew Subscription Modal Overlay */}
      {showExpiredOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cartoon-card bg-white p-6 max-w-md w-full text-center border-3 border-navy shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
          >
            <div className="text-5xl mb-4">😢</div>
            <h3 className="text-2xl font-extrabold font-fredoka text-navy mb-2">Subscription Expired!</h3>
            <p className="text-xs md:text-sm font-bold text-slate-500 mb-6 leading-relaxed text-left">
              Your BoardBuddy plan is currently inactive. Renew for ₹69/month to restore unlimited access to Mock Exams, AI Doubt Solvers, and daily challenges!
            </p>

            {/* Input Promo Code */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="ENTER PROMO CODE (e.g. BUDDY20)"
                id="renew_coupon_input"
                className="flex-1 px-3 py-2.5 border-2 border-navy rounded-xl text-xs font-black uppercase bg-white text-navy focus:outline-none"
              />
              <button
                onClick={() => {
                  const input = document.getElementById("renew_coupon_input") as HTMLInputElement;
                  const code = input?.value?.toUpperCase().trim();
                  
                  // Read generated coupons
                  let coupons = ["BUDDY20", "ACE100", "PASS69"];
                  const storedCoupons = localStorage.getItem("boardbuddy_coupons");
                  if (storedCoupons) {
                    try { coupons = JSON.parse(storedCoupons); } catch (e) {}
                  }

                  if (coupons.includes(code)) {
                    // Update localStorage profile back to Active
                    const updated = { ...profile, status: "Active" as const };
                    setProfile(updated);
                    localStorage.setItem("boardbuddy_student", JSON.stringify(updated));
                    
                    // Also update in students_list
                    const storedList = localStorage.getItem("boardbuddy_students_list");
                    if (storedList) {
                      try {
                        const parsedList = JSON.parse(storedList);
                        const nextList = parsedList.map((s: any) => s.name === profile.name ? { ...s, status: "Active" } : s);
                        localStorage.setItem("boardbuddy_students_list", JSON.stringify(nextList));
                      } catch(e) {}
                    }

                    setShowExpiredOverlay(false);
                    confetti({ particleCount: 50, spread: 60 });
                    alert("🎉 Coupon applied! Subscription renewed successfully!");
                  } else {
                    alert("❌ Invalid promo code. Type a valid coupon generated in the Admin panel!");
                  }
                }}
                className="cartoon-btn cartoon-btn-yellow text-xs px-4 py-2"
              >
                Apply
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => {
                  const updated = { ...profile, status: "Active" as const };
                  setProfile(updated);
                  localStorage.setItem("boardbuddy_student", JSON.stringify(updated));
                  
                  // Also update in students_list
                  const storedList = localStorage.getItem("boardbuddy_students_list");
                  if (storedList) {
                    try {
                      const parsedList = JSON.parse(storedList);
                      const nextList = parsedList.map((s: any) => s.name === profile.name ? { ...s, status: "Active" } : s);
                      localStorage.setItem("boardbuddy_students_list", JSON.stringify(nextList));
                    } catch(e) {}
                  }

                  setShowExpiredOverlay(false);
                  confetti({ particleCount: 50, spread: 60 });
                  alert("🎉 Subscription renewed successfully!");
                }}
                className="w-full cartoon-btn cartoon-btn-yellow py-3 text-xs font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                Renew Subscription for ₹69 ⚡
              </button>
              
              <Link
                href="/admin"
                onClick={() => setShowExpiredOverlay(false)}
                className="w-full cartoon-btn cartoon-btn-white py-3 text-xs font-bold"
              >
                Go to Admin Panel (Simulate Active Status)
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
