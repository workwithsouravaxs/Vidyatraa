"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Trophy, Award, Search, UserCheck, Flame, Landmark, ArrowRight } from "lucide-react";
import BuddyMascot from "@/components/BuddyMascot";

export default function Home() {
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
      quote: "My math anxiety literally vanished! Vidyatraa makes revision feel like leveling up in a game.",
      author: "Sneha, Class 10 (96.4% expected)",
      role: "Student",
      initials: "S",
      bg: "bg-sky-50 border-sky-200",
      avatarColor: "bg-sky-500 text-white"
    },
    {
      quote: "At ₹69, Vidyatraa is a blessing. It keeps my son focused, and the revision schedules save us from planning stress.",
      author: "Mr. Sharma, Bangalore",
      role: "Parent",
      initials: "MS",
      bg: "bg-amber-50 border-amber-200",
      avatarColor: "bg-amber-500 text-white"
    },
    {
      quote: "I recommend Vidyatraa's practice sheets to all my students. The questions are spot on with CBSE guidelines.",
      author: "Mrs. Anjali, Science Teacher",
      role: "Teacher",
      initials: "MA",
      bg: "bg-emerald-50 border-emerald-200",
      avatarColor: "bg-emerald-500 text-white"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">

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
              We packed every tool you need into Vidyatraa to make study sessions super addictive and productive.
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
                  <p className="text-sm font-semibold text-slate-500 leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Showcase Section 1: Predictive Board Score */}
      <section className="py-20 px-4 md:px-8 border-b-4 border-navy bg-indigo-50 relative overflow-hidden text-left">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Playful Dashboard Widget Mockup */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cartoon-card p-6 bg-white border-3 border-navy shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
            >
              <div className="flex justify-between items-center border-b-2 border-navy pb-3 mb-4">
                <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full border border-navy uppercase tracking-wider">
                  Live Estimator
                </span>
                <span className="text-xs font-bold text-slate-400 font-fredoka">Board Potentials 🎓</span>
              </div>

              {/* Progress Circle & Score */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-navy rounded-2xl mb-4 text-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-3">
                  {/* Visual SVG Progress Ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="52" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                    <circle cx="64" cy="64" r="52" stroke="#6366f1" strokeWidth="10" fill="transparent"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - 0.93)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-navy font-fredoka">93%</span>
                    <span className="text-[9px] font-black text-indigo-600 uppercase">Predicted</span>
                  </div>
                </div>
                <p className="text-xs font-extrabold text-navy font-fredoka">Estimated Class 10 Board Score</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">Based on study consistency metrics</p>
              </div>

              {/* Subject Breakdown Predictions */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-black text-navy">
                  <span>📐 Mathematics</span>
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-lg text-[10px]">95% Predicted</span>
                </div>
                <div className="flex justify-between items-center text-xs font-black text-navy">
                  <span>🧪 Science</span>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-lg text-[10px]">91% Predicted</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copy & Details */}
          <div className="lg:col-span-7 text-left order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-indigo-100 border-2 border-navy rounded-full px-4 py-1 font-extrabold text-indigo-900 text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <span>🎯 Know Your Board Potential Before the Exam</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-fredoka text-navy leading-tight">
              Predictive Board Score
            </h2>

            <p className="text-sm md:text-base font-semibold text-slate-600 leading-relaxed">
              Why wait until the final board exam to know where you stand? Our <strong>Predictive Board Score</strong> uses your daily learning progress to estimate your expected board exam performance. Instead of guessing, you'll receive a smart prediction based on your study habits, helping you improve before it really matters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="cartoon-card-flat p-4 bg-white border-2 border-navy">
                <h4 className="font-extrabold text-xs text-indigo-800 uppercase mb-2">⚡ Smarter Predictors</h4>
                <ul className="text-xs font-bold text-slate-500 space-y-1">
                  <li>📊 Performance in Mock Tests</li>
                  <li>📝 Daily Practice Accuracy</li>
                  <li>📚 Chapter Completion Progress</li>
                  <li>🔄 Revision Consistency</li>
                  <li>⏱️ Time Spent Learning</li>
                  <li>🎯 AI Practice Paper Scores</li>
                  <li>📈 Improvement Over Time</li>
                  <li>🧩 Strong & Weak Topic Analysis</li>
                </ul>
              </div>

              <div className="cartoon-card-flat p-4 bg-white border-2 border-navy">
                <h4 className="font-extrabold text-xs text-indigo-800 uppercase mb-2">👁️ What You'll See</h4>
                <ul className="text-xs font-bold text-slate-500 space-y-1">
                  <li>⭐ Predicted Board Percentage</li>
                  <li>📚 Subject-wise Score Prediction</li>
                  <li>🚀 Improvement Suggestions</li>
                  <li>🎯 Chapters to Focus On</li>
                  <li>📈 Weekly Progress Updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Feature Showcase Section 2: Teach Me Back */}
      <section className="py-20 px-4 md:px-8 border-b-4 border-navy bg-amber-50/50 relative overflow-hidden text-left">
        {/* Cartoon decorations */}
        <div className="absolute top-10 right-10 text-4xl opacity-15">🎙️</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-15">🧠</div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Details */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 border-2 border-navy rounded-full px-4 py-1 font-extrabold text-amber-905 text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <span>🎤 Teach Me Back</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-fredoka text-navy leading-tight">
              The Best Way to Learn is to Teach
            </h2>

            <p className="text-sm md:text-base font-semibold text-slate-600 leading-relaxed">
              Reading is good. Practising is better. But explaining what you've learned is one of the most effective ways to remember it. With <strong>Teach Me Back</strong>, you become the teacher! After completing a chapter, explain the concept in your own words—just like you're teaching a friend or your younger sibling.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white border-2 border-navy rounded-xl text-left shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <span className="text-xl">🎙️</span>
                <h5 className="font-extrabold text-navy font-fredoka text-xs mt-1 mb-0.5">Voice Explanation</h5>
                <p className="text-[10px] font-bold text-slate-400 leading-tight">Record your voice and build confidence while improving retention.</p>
              </div>
              <div className="p-4 bg-white border-2 border-navy rounded-xl text-left shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <span className="text-xl">✍️</span>
                <h5 className="font-extrabold text-navy font-fredoka text-xs mt-1 mb-0.5">Written Explanation</h5>
                <p className="text-[10px] font-bold text-slate-400 leading-tight">Write everything you remember without looking at your notes.</p>
              </div>
              <div className="p-4 bg-white border-2 border-navy rounded-xl text-left shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <span className="text-xl">🎥</span>
                <h5 className="font-extrabold text-navy font-fredoka text-xs mt-1 mb-0.5">Video Setup</h5>
                <p className="text-[10px] font-bold text-slate-400 leading-tight">Coming Soon! Teach using expressions & develop speech skills.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feynman Waveform */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cartoon-card p-6 bg-white border-3 border-navy shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-navy flex items-center justify-center text-3xl mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                🤖
              </div>
              <p className="text-xs font-black text-navy font-fredoka">Buddy Mascot Listening...</p>

              {/* Fake Audio Waveform */}
              <div className="flex justify-center items-center gap-1.5 h-12 my-6">
                {[4, 8, 12, 6, 14, 10, 4, 8, 12, 6].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h * 2.5}px` }}
                    className="w-1.5 bg-amber-400 rounded-full border border-navy"
                  />
                ))}
              </div>

              <div className="w-full p-3.5 bg-slate-50 border-2 border-navy rounded-2xl text-left">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase">Feynman Technique benefits</p>
                <ul className="text-xs font-black text-navy mt-1.5 space-y-1">
                  <li>🧠 Improves Memory Retention</li>
                  <li>💬 Builds Communication Skills</li>
                  <li>🎯 Reveals Knowledge Gaps</li>
                  <li>🌟 Boosts Confidence</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section 3: Parent Guidance Centre */}
      <section className="py-20 px-4 md:px-8 border-b-4 border-navy bg-rose-50 relative overflow-hidden text-left">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Guidance Banners */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cartoon-card p-6 bg-white border-3 border-navy shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
            >
              <h4 className="font-black text-navy font-fredoka text-sm border-b-2 border-navy pb-3 mb-4">
                Parent Guidance Centre
              </h4>

              <div className="space-y-3">
                <div className="p-3 bg-rose-50 border-2 border-navy rounded-xl text-left">
                  <p className="text-[9px] font-black text-rose-800">WEEKLY RECOMMENDATION</p>
                  <p className="text-xs font-extrabold text-navy mt-0.5">
                    "Appreciate the daily efforts they show in notes revision rather than expecting full marks on mock tests."
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-[11px] font-bold text-slate-500 space-y-1.5">
                  <p className="text-navy font-black">🎓 Stress Buster Checklist:</p>
                  <p>✔ Maintain regular sleep times</p>
                  <p>✔ Encourage simple study gaps</p>
                  <p>✔ Positive reinforcing talks</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copy & Details */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 border-2 border-navy rounded-full px-4 py-1 font-extrabold text-rose-900 text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <span>❤️ Because Every Child Needs Support, Not Pressure</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-fredoka text-navy leading-tight">
              Parent Guidance Centre
            </h2>

            <p className="text-sm md:text-base font-semibold text-slate-600 leading-relaxed">
              Board exams can be stressful—not just for students, but for parents too. Sometimes, a few encouraging words can make a bigger difference than hours of studying. Our Parent Guidance Centre helps families create a healthy, positive, and motivating environment where children can perform at their best without pressure.
            </p>

            <div className="p-4 bg-white border-2 border-navy rounded-xl">
              <h4 className="font-extrabold text-xs text-rose-800 uppercase mb-2">🤝 Parents Will Receive Guidance On:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-bold text-slate-500">
                <p>• How to motivate instead of pressuring</p>
                <p>• Encouraging confidence during stress</p>
                <p>• Understanding exam stress and anxiety</p>
                <p>• Creating a peaceful study environment</p>
                <p>• Appreciating effort instead of only marks</p>
                <p>• Building healthy study routines</p>
                <p>• Supporting emotional well-being</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section 4: My Mistake Book */}
      <section className="py-20 px-4 md:px-8 border-b-4 border-navy bg-emerald-50 relative overflow-hidden text-left">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Details */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 border-2 border-navy rounded-full px-4 py-1 font-extrabold text-emerald-950 text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <span>📖 Every Mistake is a Step Towards Success</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-fredoka text-navy leading-tight">
              My Mistake Book
            </h2>

            <p className="text-sm md:text-base font-semibold text-slate-600 leading-relaxed">
              Top scorers don't avoid mistakes. They learn from them. The <strong>Mistake Book</strong> is your personal learning diary where every incorrect answer becomes an opportunity to improve. Instead of forgetting what went wrong, you'll build a collection of lessons that help you avoid making the same mistake again.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white border-2 border-navy rounded-xl">
                <h4 className="font-extrabold text-xs text-emerald-800 uppercase mb-2">❌ Save Every Mistake:</h4>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-bold text-slate-500">
                  <p>• Wrong Answers</p>
                  <p>• Difficult Questions</p>
                  <p>• Calculation Errors</p>
                  <p>• Concept Confusion</p>
                  <p>• Time Mistakes</p>
                  <p>• Formula Mistakes</p>
                  <p>• Careless Errors</p>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-navy rounded-xl">
                <h4 className="font-extrabold text-xs text-emerald-800 uppercase mb-2">💡 Reflect and Improve:</h4>
                <div className="text-[11px] font-bold text-slate-500 space-y-1">
                  <p><strong>1. What happened?</strong> (Calculation slip)</p>
                  <p><strong>2. Why did it happen?</strong> (Hurried near end)</p>
                  <p><strong>3. What did I learn?</strong> (Always verify signs)</p>
                  <p><strong>4. Next time?</strong> (Pace myself better)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Notebook Interface Mockup */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cartoon-card p-6 bg-white border-3 border-navy shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
            >
              <div className="border-b-2 border-navy pb-3 mb-4 flex justify-between items-center text-xs font-black text-navy">
                <span>📖 Mistake Ledger</span>
                <span className="text-[10px] text-slate-400">Class 10 Math</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-red-50 border-2 border-navy rounded-xl text-left text-xs font-bold text-red-950">
                  <p className="text-[9px] font-black text-red-700">INCORRECT MCQ</p>
                  <p className="mt-1">"Discriminant value of 2x² - 4x + 3 = 0 is positive."</p>
                </div>

                <div className="p-3 bg-emerald-50 border-2 border-navy rounded-xl text-left text-xs font-bold text-emerald-950">
                  <p className="text-[9px] font-black text-emerald-700">CORRECT ANALYSIS & REMEDIAL</p>
                  <p className="mt-1">D = (-4)² - 4*2*3 = 16 - 24 = -8. Discriminant is negative, so roots are imaginary!</p>
                </div>
              </div>
            </motion.div>
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
                  <div className={`w-12 h-12 rounded-full border-2 border-navy ${test.avatarColor} flex items-center justify-center text-sm font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]`}>
                    {test.initials}
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



    </div>
  );
}
