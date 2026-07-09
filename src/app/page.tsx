"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { BookOpen, Sparkles, Trophy, Award, Search, UserCheck, Flame, Landmark, ArrowRight } from "lucide-react";
import BuddyMascot from "@/components/BuddyMascot";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountMsg, setDiscountMsg] = useState("");
  const [appliedDiscountValue, setAppliedDiscountValue] = useState(0);

  const handleApplyCoupon = () => {
    let activeCoupons = ["BUDDY20", "ACE100", "PASS69"];
    const storedCoupons = localStorage.getItem("boardbuddy_coupons");
    if (storedCoupons) {
      try {
        activeCoupons = JSON.parse(storedCoupons);
      } catch (e) {
        console.error(e);
      }
    }

    const codeUpper = couponCode.toUpperCase().trim();
    if (activeCoupons.includes(codeUpper)) {
      setDiscountApplied(true);
      setDiscountMsg("🎉 Coupon applied! Gained flat ₹20 discount on BoardBuddy Pro!");
      setAppliedDiscountValue(20);
      confetti({ particleCount: 30, spread: 40 });
    } else {
      setDiscountApplied(false);
      setDiscountMsg("❌ Invalid coupon code. Try another one!");
      setAppliedDiscountValue(0);
    }
  };

  const features = [
    {
      title: "Study Notes",
      desc: "Chapter-wise formula sheets, revision cards, and summaries.",
      icon: BookOpen,
      bg: "bg-sky-100 text-sky-800 border-sky-300",
      emoji: "📚",
    },
    {
      title: "Practice Papers",
      desc: "Customize difficulty and topics to generate model exams.",
      icon: Sparkles,
      bg: "bg-amber-100 text-amber-800 border-amber-300",
      emoji: "📝",
    },
    {
      title: "AI Doubt Solver",
      desc: "Get instant step-by-step friendly solutions to any query.",
      icon: Search,
      bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      emoji: "🤖",
    },
    {
      title: "Mock Tests",
      desc: "Real-time board exam simulation with timers and scoring.",
      icon: Award,
      bg: "bg-purple-100 text-purple-800 border-purple-300",
      emoji: "🎯",
    },
    {
      title: "Daily Practice",
      desc: "Quick 20-question randomized challenges to build XP streaks.",
      icon: Flame,
      bg: "bg-orange-100 text-orange-800 border-orange-300",
      emoji: "🏆",
    },
    {
      title: "Progress Tracker",
      desc: "Watch your levels rise, track accuracy, and review weak areas.",
      icon: Trophy,
      bg: "bg-rose-100 text-rose-800 border-rose-300",
      emoji: "📈",
    },
    {
      title: "Career Guidance",
      desc: "Explore tailored roadmaps from science to entrepreneurship.",
      icon: Landmark,
      bg: "bg-indigo-100 text-indigo-800 border-indigo-300",
      emoji: "🎓",
    },
    {
      title: "Scholarship Hub",
      desc: "Search, filter, and apply to nationwide financial aid options.",
      icon: UserCheck,
      bg: "bg-teal-100 text-teal-800 border-teal-300",
      emoji: "💡",
    },
  ];

  const testimonials = [
    {
      quote: "My math anxiety literally vanished! BoardBuddy makes revision feel like leveling up in a game.",
      author: "Sneha, Class 10 (96.4% expected)",
      role: "Student",
      avatar: "👩‍🎓",
      bg: "bg-sky-50 border-sky-200",
    },
    {
      quote: "At ₹69, BoardBuddy is a blessing. It keeps my son focused, and the revision schedules save us from planning stress.",
      author: "Mr. Sharma, Bangalore",
      role: "Parent",
      avatar: "👨‍👩‍👦",
      bg: "bg-amber-50 border-amber-200",
    },
    {
      quote: "I recommend BoardBuddy's practice sheets to all my students. The questions are spot on with CBSE guidelines.",
      author: "Mrs. Anjali, Science Teacher",
      role: "Teacher",
      avatar: "👩‍🏫",
      bg: "bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 px-4 md:px-8 border-b-4 border-navy bg-gradient-to-b from-sky-50 to-white">
        {/* Background elements */}
        <div className="absolute top-10 left-10 text-3xl opacity-20 select-none animate-bounce-slow">✏️</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-20 select-none animate-bounce-slow" style={{ animationDelay: "1s" }}>📐</div>
        <div className="absolute top-1/2 right-12 text-3xl opacity-20 select-none animate-bounce-slow" style={{ animationDelay: "2s" }}>🎒</div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-yellow/20 border-2 border-navy rounded-full px-4 py-1.5 font-extrabold text-navy text-xs md:text-sm mb-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <span>🚀 Class 10 Board Exam Special</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold font-fredoka leading-tight text-navy mb-6">
              Ace Your Board Exams with <span className="text-primary underline decoration-yellow decoration-wavy decoration-3">Confidence!</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 font-medium mb-8 max-w-xl leading-relaxed">
              Everything you need to score higher—Notes, Practice Papers, Mock Tests, Career Guidance, AI Doubt Solver, and much more.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/auth?mode=signup" className="cartoon-btn cartoon-btn-yellow text-base px-8 py-4 flex items-center gap-2">
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="cartoon-btn cartoon-btn-white text-base px-8 py-4">
                Explore Features
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 bg-white border-2 border-navy rounded-2xl p-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex -space-x-2">
                <span className="w-8 h-8 rounded-full border border-navy bg-rose-200 flex items-center justify-center text-xs">🎓</span>
                <span className="w-8 h-8 rounded-full border border-navy bg-emerald-200 flex items-center justify-center text-xs">⭐</span>
                <span className="w-8 h-8 rounded-full border border-navy bg-amber-200 flex items-center justify-center text-xs">🔥</span>
              </div>
              <p className="text-xs md:text-sm font-bold text-navy">
                Join <span className="text-primary">12,000+ Class 10 students</span> revising today!
              </p>
            </div>
          </div>

          {/* Large Cartoon Illustration Area */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 cartoon-card bg-sky-200 flex items-center justify-center p-6 rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              {/* Custom SVG Illustration representing students studying together */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Big Sun */}
                <circle cx="170" cy="30" r="15" fill="#fcd34d" />
                <path d="M170,10 L170,5 M170,50 L170,45 M150,30 L145,30 M190,30 L185,30" stroke="#000" strokeWidth="2" />
                
                {/* Desk */}
                <rect x="20" y="145" width="160" height="25" rx="5" fill="#f97316" stroke="#0f172a" strokeWidth="3" />
                <rect x="40" y="170" width="12" height="25" fill="#0f172a" />
                <rect x="148" y="170" width="12" height="25" fill="#0f172a" />

                {/* Laptop & Books */}
                <rect x="75" y="115" width="40" height="30" rx="3" fill="#bae6fd" stroke="#0f172a" strokeWidth="3" />
                <line x1="75" y1="140" x2="115" y2="140" stroke="#0f172a" strokeWidth="3" />
                <rect x="35" y="125" width="25" height="20" rx="2" fill="#34d399" stroke="#0f172a" strokeWidth="3" />
                
                {/* Cute Student 1 */}
                <circle cx="60" cy="80" r="20" fill="#fed7aa" stroke="#0f172a" strokeWidth="3" />
                {/* hair */}
                <path d="M 40,80 Q 60,50 80,80" fill="#b45309" stroke="#0f172a" strokeWidth="3" />
                <rect x="52" y="100" width="16" height="45" fill="#3b82f6" stroke="#0f172a" strokeWidth="3" />
                <circle cx="50" cy="78" r="2" fill="#000" />
                <circle cx="58" cy="78" r="2" fill="#000" />
                <path d="M 52,85 Q 54,88 56,85" fill="none" stroke="#000" strokeWidth="2" />

                {/* Cute Student 2 */}
                <circle cx="130" cy="85" r="20" fill="#fbcfe8" stroke="#0f172a" strokeWidth="3" />
                {/* hair */}
                <circle cx="115" cy="75" r="8" fill="#1e293b" />
                <circle cx="145" cy="75" r="8" fill="#1e293b" />
                <path d="M 110,85 Q 130,60 150,85" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                <rect x="122" y="105" width="16" height="40" fill="#ec4899" stroke="#0f172a" strokeWidth="3" />
                <circle cx="122" cy="83" r="2" fill="#000" />
                <circle cx="130" cy="83" r="2" fill="#000" />
                <path d="M 124,89 Q 126,92 128,89" fill="none" stroke="#000" strokeWidth="2" />

                {/* Sparkles */}
                <path d="M 100,50 L 102,55 L 107,55 L 103,58 L 105,63 L 100,60 L 95,63 L 97,58 L 93,55 L 98,55 Z" fill="#f59e0b" />
              </svg>
            </div>
            
            {/* Buddy Mascot talking */}
            <div className="absolute -bottom-8 -left-4 md:-left-12">
              <BuddyMascot
                state="wave"
                message="Hey! Let's conquer these board exams together! 🚀"
                bubblePosition="right"
                size={110}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-4 md:px-8 border-b-4 border-navy bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-fredoka text-navy mb-4">
              Explore Our Power-ups!
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
              We packed every tool you need into BoardBuddy to make study sessions super addictive and productive.
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
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-navy shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${feat.bg} mb-4 text-2xl font-bold group-hover:scale-110 transition-transform`}>
                    {feat.emoji}
                  </div>
                  <h3 className="text-xl font-extrabold font-fredoka text-navy mb-2">{feat.title}</h3>
                  <p className="text-sm font-semibold text-slate-500 leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 border-b-4 border-navy bg-amber-50/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold font-fredoka text-navy mb-14">
            Hear From Our Study Crew!
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Speech Bubble */}
                <div className={`speech-bubble speech-bubble-bottom border-3 border-navy shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-6 bg-white max-w-sm mb-6`}>
                  <p className="text-navy font-bold text-sm md:text-base leading-relaxed italic text-left">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-navy bg-yellow flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    {test.avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-navy font-fredoka text-sm md:text-base">{test.author}</h4>
                    <p className="text-xs font-bold text-primary">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 md:px-8 bg-sky-100 border-b-4 border-navy relative">
        {/* Background stars */}
        <div className="absolute top-10 right-20 text-3xl opacity-20">⭐</div>
        <div className="absolute bottom-10 left-20 text-3xl opacity-20">⭐</div>

        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-green/20 border-2 border-navy rounded-full px-4 py-1.5 font-extrabold text-navy text-xs md:text-sm mb-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <span>✨ Unbeatable Value</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-fredoka text-navy mb-4">
            Select Your Learning Power-Up
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-bold mb-6 max-w-md">
            Unlock premium mock simulations, notes, and unlimited doubts resolution. Cancel anytime!
          </p>

          {/* Coupon Fields */}
          <div className="w-full max-w-sm mb-12 flex gap-2">
            <input
              type="text"
              placeholder="ENTER PROMO CODE (e.g. BUDDY20)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-4 py-2.5 border-2 border-navy rounded-xl text-xs font-black bg-white text-navy focus:outline-none uppercase"
            />
            <button
              onClick={handleApplyCoupon}
              className="cartoon-btn cartoon-btn-yellow text-xs px-4 py-2.5 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
            >
              Apply
            </button>
          </div>
          {discountMsg && (
            <p className={`text-xs font-extrabold -mt-10 mb-8 ${discountApplied ? "text-emerald-600" : "text-rose-500"}`}>
              {discountMsg}
            </p>
          )}

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
            
            {/* Plan 1: Free Trial */}
            <div className="cartoon-card p-5 bg-white flex flex-col justify-between relative shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
              <div className="text-left">
                <h3 className="text-lg font-bold font-fredoka text-navy mb-1">Free Trial</h3>
                <div className="mb-3">
                  <span className="bg-sky-100 text-sky-800 border-2 border-sky-300 font-extrabold text-[10px] px-2.5 py-1 rounded-xl shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] inline-block">
                    ⚡ 7 DAYS ACCESS
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black font-fredoka text-navy">₹0</span>
                  <span className="text-[10px] text-slate-400 font-bold">/ 7 days</span>
                </div>
                <ul className="text-left font-bold text-[11px] text-slate-500 space-y-2 mb-6">
                  <li className="flex items-center gap-1.5">✔ <span>Chapter notes & formulas</span></li>
                  <li className="flex items-center gap-1.5">✔ <span>2 daily trivia challenges</span></li>
                  <li className="flex items-center gap-1.5">❌ <span className="line-through text-slate-300">Unlimited mock test engines</span></li>
                  <li className="flex items-center gap-1.5">❌ <span className="line-through text-slate-300">AI doubt solver access</span></li>
                </ul>
              </div>
              <Link href="/auth?mode=signup" className="w-full cartoon-btn cartoon-btn-white text-xs py-2.5">
                Try Free Trial 🎁
              </Link>
            </div>

            {/* Plan 2: Monthly (1 Rs per day) */}
            <div className="cartoon-card p-5 bg-white flex flex-col justify-between relative shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
              <div className="text-left">
                <h3 className="text-lg font-bold font-fredoka text-navy mb-1">Monthly Plan</h3>
                <div className="mb-3">
                  <span className="bg-indigo-100 text-indigo-800 border-2 border-indigo-300 font-extrabold text-[10px] px-2.5 py-1 rounded-xl shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] inline-block">
                    📅 1 MONTH ACCESS
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black font-fredoka text-navy">₹30</span>
                  <span className="text-[10px] text-slate-400 font-bold">/ month</span>
                  <span className="text-[10px] text-slate-300 line-through font-bold">₹149</span>
                </div>
                <ul className="text-left font-bold text-[11px] text-slate-500 space-y-2 mb-6">
                  <li className="flex items-center gap-1.5">✔ <span>Full chapter notes & cards</span></li>
                  <li className="flex items-center gap-1.5">✔ <span>5 doubt solver queries / day</span></li>
                  <li className="flex items-center gap-1.5">✔ <span>1 custom practice sheet / week</span></li>
                  <li className="flex items-center gap-1.5">❌ <span className="line-through text-slate-300">Unlimited mock tests</span></li>
                </ul>
              </div>
              <Link href="/auth?mode=signup" className="w-full cartoon-btn cartoon-btn-white text-xs py-2.5">
                Get Monthly Plan ⚡
              </Link>
            </div>

            {/* Plan 3: Pro 3 Months (Recommended) */}
            <div className="cartoon-card p-5 bg-white border-3 border-primary flex flex-col justify-between relative shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all">
              <div className="absolute top-0 right-0 bg-primary text-white border-l-2 border-b-2 border-navy font-black text-[8px] px-2 py-0.5 uppercase tracking-wider rounded-bl-lg">
                Best Value
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold font-fredoka text-navy mb-1">BoardBuddy Pro</h3>
                <div className="mb-3">
                  <span className="bg-amber-100 text-amber-800 border-2 border-amber-300 font-extrabold text-[10px] px-2.5 py-1 rounded-xl shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] inline-block uppercase tracking-wider">
                    🔥 3 MONTHS PLAN
                  </span>
                </div>
                
                <div className="flex items-baseline gap-1.5 mb-4 flex-wrap">
                  {discountApplied ? (
                    <>
                      <span className="text-3xl font-black font-fredoka text-emerald-600">₹{69 - appliedDiscountValue}</span>
                      <span className="text-xs text-slate-300 line-through font-extrabold">₹69</span>
                    </>
                  ) : (
                    <span className="text-3xl font-black font-fredoka text-navy">₹69</span>
                  )}
                  <span className="text-[10px] text-slate-400 font-bold">/ 3 months</span>
                  <span className="text-[10px] text-rose-500 line-through font-bold">₹499</span>
                </div>

                <ul className="text-left font-bold text-[11px] text-slate-500 space-y-2 mb-6">
                  <li className="flex items-center gap-1.5">✔ <span className="text-emerald-600 font-extrabold">Unlimited mock test engines</span></li>
                  <li className="flex items-center gap-1.5">✔ <span>Full summaries & flashcards</span></li>
                  <li className="flex items-center gap-1.5">✔ <span className="text-emerald-600 font-extrabold">Unlimited AI doubt solving</span></li>
                  <li className="flex items-center gap-1.5">✔ <span>Practice paper generator</span></li>
                </ul>
              </div>
              <Link href="/auth?mode=signup" className="w-full cartoon-btn cartoon-btn-yellow text-xs py-3 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
                Get Pro Access 🚀
              </Link>
            </div>

            {/* Plan 4: 6 Months Plan */}
            <div className="cartoon-card p-5 bg-white flex flex-col justify-between relative shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
              <div className="text-left">
                <h3 className="text-lg font-bold font-fredoka text-navy mb-1">Semester Pass</h3>
                <div className="mb-3">
                  <span className="bg-purple-100 text-purple-800 border-2 border-purple-300 font-extrabold text-[10px] px-2.5 py-1 rounded-xl shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] inline-block uppercase tracking-wider">
                    🏫 6 MONTHS PASS
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black font-fredoka text-navy">₹199</span>
                  <span className="text-[10px] text-slate-400 font-bold">/ 6 months</span>
                  <span className="text-[10px] text-rose-500 line-through font-bold">₹999</span>
                </div>
                <ul className="text-left font-bold text-[11px] text-slate-500 space-y-2 mb-6">
                  <li className="flex items-center gap-1.5">✔ <span>Access for up to 6 months</span></li>
                  <li className="flex items-center gap-1.5">✔ <span className="text-indigo-600 font-extrabold">Unlimited AI solvers & mocks</span></li>
                  <li className="flex items-center gap-1.5">✔ <span>Custom printable worksheets</span></li>
                  <li className="flex items-center gap-1.5">✔ <span>Parent monitoring dashboard</span></li>
                </ul>
              </div>
              <Link href="/auth?mode=signup" className="w-full cartoon-btn cartoon-btn-white text-xs py-2.5">
                Get Semester Pass 🏫
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-slate-300 py-12 px-4 md:px-8 border-t-4 border-navy font-semibold text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white border-2 border-white rounded-lg p-1.5 text-lg">
                🎓
              </div>
              <span className="text-xl font-bold font-fredoka text-white tracking-wide">
                Board<span className="text-primary">Buddy</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              BoardBuddy is a fun, gamified study partner for Class 10 school children, preparing them to ace exams without stress.
            </p>
            <p className="text-xs text-slate-500">© 2026 BoardBuddy. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-base mb-4 font-fredoka">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/auth?mode=signup" className="hover:text-primary transition-colors">Start Learning</Link></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Explore Features</a></li>
              <li><Link href="/auth?mode=login" className="hover:text-primary transition-colors">Student Log In</Link></li>
              <li><Link href="/parent" className="hover:text-primary transition-colors">Parent Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-base mb-4 font-fredoka">Support & Rules</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Refund Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-base mb-4 font-fredoka">Stay Connected</h4>
            <p className="text-xs text-slate-400 mb-3">Join our community on social channels for tips, flashcards, and quizzes.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="bg-slate-800 border-2 border-slate-700 hover:border-primary rounded-lg w-8 h-8 flex items-center justify-center text-sm text-white hover:text-primary transition-all">
                📸
              </a>
              <a href="#" className="bg-slate-800 border-2 border-slate-700 hover:border-primary rounded-lg w-8 h-8 flex items-center justify-center text-sm text-white hover:text-primary transition-all">
                🎥
              </a>
              <a href="#" className="bg-slate-800 border-2 border-slate-700 hover:border-primary rounded-lg w-8 h-8 flex items-center justify-center text-sm text-white hover:text-primary transition-all">
                📧
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
