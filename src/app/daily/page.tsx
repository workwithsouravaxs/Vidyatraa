"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Flame, Star, Award, Compass, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type PracticeQuestion = {
  id: number;
  q: string;
  options: string[];
  correctIdx: number;
  tip: string;
};

export default function DailyPractice() {
  const [stats, setStats] = useState({
    name: "Rahul",
    xp: 1250,
    coins: 340,
    streak: 5,
    level: 4,
  });

  const [questType, setQuestType] = useState<"random" | "chapter">("random");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Mascot dynamic quotes
  const [buddyMsg, setBuddyMsg] = useState("Hey there! Ready to keep our streak burning? Complete today's 5-question speed quiz! 🔥");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("wave");

  const dailyQuestions: PracticeQuestion[] = [
    {
      id: 1,
      q: "Which of the following compounds is responsible for the yellow color of turmeric indicator in basic solution?",
      options: ["(a) Remains yellow", "(b) Turns reddish-brown", "(c) Turns blue", "(d) Turns colorless"],
      correctIdx: 1,
      tip: "Turmeric is a natural indicator. It remains yellow in acid but turns reddish-brown in base!"
    },
    {
      id: 2,
      q: "If the first term of an AP is 4 and the common difference is -3, the 5th term is:",
      options: ["(a) 16", "(b) -8", "(c) 7", "(d) -11"],
      correctIdx: 1,
      tip: "Formula: a_5 = a + 4d = 4 + 4(-3) = 4 - 12 = -8."
    },
    {
      id: 3,
      q: "In which Satyagraha did Mahatma Gandhi support the cotton mill workers?",
      options: ["(a) Champaran Satyagraha", "(b) Kheda Satyagraha", "(c) Ahmedabad Satyagraha", "(d) Rowlatt Satyagraha"],
      correctIdx: 2,
      tip: "The Ahmedabad Mill Strike in 1918 was Gandhiji's first hunger strike satyagraha supporting cotton workers."
    },
    {
      id: 4,
      q: "What is the degree of a non-zero constant polynomial?",
      options: ["(a) 0", "(b) 1", "(c) Not defined", "(d) 2"],
      correctIdx: 0,
      tip: "A constant polynomial like p(x) = 5 can be written as 5x^0, so its degree is 0."
    },
    {
      id: 5,
      q: "Which gas is released when reactive metals react with dilute hydrochloric acid?",
      options: ["(a) Oxygen", "(b) Carbon Dioxide", "(c) Hydrogen", "(d) Chlorine"],
      correctIdx: 2,
      tip: "Metal + Dilute Acid → Metal Salt + Hydrogen gas (which burns with a pop sound!)."
    }
  ];

  useEffect(() => {
    const stored = localStorage.getItem("boardbuddy_student");
    if (stored) {
      try {
        setStats(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
    setBuddyState("happy");
    setBuddyMsg("Question 1 is up! Focus and make it count! 🌟");
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === dailyQuestions[currentIdx].correctIdx;
    if (isCorrect) {
      setScore(score + 1);
      setBuddyState("cheer");
      setBuddyMsg("Spot on! That is absolutely correct. Keep it up! 🥳");
    } else {
      setBuddyState("thinking");
      setBuddyMsg(`Nice try! Here's a tip: ${dailyQuestions[currentIdx].tip} 💡`);
    }
  };

  const handleNext = () => {
    if (currentIdx < dailyQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
      setBuddyState("idle");
      setBuddyMsg(`Ready for Question ${currentIdx + 2}? Let's do it!`);
    } else {
      // Completed daily challenge!
      setCompleted(true);
      setIsPlaying(false);
      
      // Update streak and awards
      const streakIncrement = stats.streak + 1;
      const xpBonus = score * 30 + 100; // 100 flat bonus for daily completion
      const coinBonus = score * 10 + 25;

      const updated = {
        ...stats,
        streak: streakIncrement,
        xp: stats.xp + xpBonus,
        coins: stats.coins + coinBonus,
        level: Math.floor((stats.xp + xpBonus) / 400) + 1,
      };

      setStats(updated);
      localStorage.setItem("boardbuddy_student", JSON.stringify(updated));

      // Confetti fire!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setBuddyState("cheer");
      setBuddyMsg(`Sensational! Streak extended to 🔥 ${streakIncrement} Days! You earned +${xpBonus} XP and +${coinBonus} Coins! 🎉`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto py-8 px-4 md:px-8 flex-1 flex flex-col justify-center">
        
        {!isPlaying && !completed ? (
          // 1. INTRO START PANEL
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-10 w-full">
            <div className="md:col-span-5 flex justify-center">
              <BuddyMascot
                state={buddyState}
                message={buddyMsg}
                bubblePosition="bottom"
                size={145}
              />
            </div>

            <div className="md:col-span-7">
              <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                {/* Streak Banner */}
                <div className="flex items-center gap-3 bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6 shadow-inner">
                  <Flame className="w-10 h-10 text-orange-500 fill-orange-500 animate-bounce-slow" />
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-400">ACTIVE STREAK</p>
                    <h3 className="text-xl font-black font-fredoka text-orange-700">{stats.streak} Days Fire!</h3>
                  </div>
                </div>

                <h2 className="text-2xl font-black font-fredoka text-navy mb-3 text-left">
                  Daily Practice Challenge
                </h2>
                <p className="text-xs font-bold text-slate-500 leading-relaxed text-left mb-6">
                  Boost your Board Readiness level! Solve 5 randomized chapter questions to keep your fire streak alive and unlock daily chests.
                </p>

                <div className="space-y-4">
                  {/* Select challenge options */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => setQuestType("random")}
                      className={`p-3 rounded-xl border-2 border-navy font-bold text-xs ${
                        questType === "random"
                          ? "bg-sky-100 border-sky-400 text-sky-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      🎲 Random Syllabus mix
                    </button>
                    <button
                      onClick={() => setQuestType("chapter")}
                      className={`p-3 rounded-xl border-2 border-navy font-bold text-xs ${
                        questType === "chapter"
                          ? "bg-emerald-100 border-emerald-400 text-emerald-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      📂 Chapter Wise focus
                    </button>
                  </div>

                  <button
                    onClick={handleStart}
                    className="w-full cartoon-btn cartoon-btn-yellow py-4 mt-2 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                  >
                    <span>Start Practice Quiz 🚀</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : isPlaying ? (
          // 2. ACTIVE QUIZ PLAY
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] w-full">
            {/* Header info */}
            <div className="flex items-center justify-between mb-4 border-b-2 border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                <span>QUESTION {currentIdx + 1} OF 5</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-pulse" />
                <span>Streak Active</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2.5 border border-navy rounded-full mb-6 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / 5) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="text-left space-y-6">
              <h3 className="text-base md:text-lg font-black text-navy leading-relaxed">
                {dailyQuestions[currentIdx].q}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {dailyQuestions[currentIdx].options.map((opt, idx) => {
                  const isCorrect = idx === dailyQuestions[currentIdx].correctIdx;
                  const isSelected = selectedIdx === idx;
                  let btnStyle = "bg-white text-slate-600 border-navy hover:bg-slate-50";

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-[2px_2px_0px_0px_#10b981]";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-950 shadow-[2px_2px_0px_0px_#ef4444]";
                    } else {
                      btnStyle = "bg-white text-slate-300 border-slate-200 cursor-default";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-3 font-bold text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation box on answered */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-left p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl text-xs font-bold text-sky-950/80 leading-relaxed"
                >
                  <p className="font-extrabold text-sky-900 mb-1">LEARNING FACT SHEET:</p>
                  <p>{dailyQuestions[currentIdx].tip}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Footer */}
            <div className="mt-8 pt-6 border-t-2 border-slate-100 flex justify-between items-center">
              <div className="w-40">
                <BuddyMascot
                  state={buddyState}
                  message={buddyMsg}
                  bubblePosition="top"
                  size={90}
                />
              </div>

              {isAnswered && (
                <button
                  onClick={handleNext}
                  className="cartoon-btn cartoon-btn-yellow text-xs px-5 py-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                >
                  <span>{currentIdx === 4 ? "Complete Quest 🏁" : "Next Question →"}</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          // 3. COMPLETED VIEW
          <div className="cartoon-card p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] w-full text-center flex flex-col items-center gap-6">
            <span className="text-6xl animate-bounce-slow">🏆</span>
            <h2 className="text-3xl font-black font-fredoka text-navy leading-none">
              Daily Mission Cleared!
            </h2>
            <p className="text-xs md:text-sm font-extrabold text-slate-500 max-w-sm">
              Incredible work! You answered **{score}/5 questions** correctly. Your streak multiplier has been saved!
            </p>

            {/* Reward badges display */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-slate-50 border-2 border-navy rounded-2xl p-4 text-xs font-black text-navy my-2">
              <div className="flex flex-col items-center justify-center p-2 bg-white border border-navy rounded-xl shadow-sm">
                <span className="text-lg">🔥</span>
                <span className="text-slate-400 mt-1">STREAK</span>
                <span className="text-orange-600 text-sm mt-0.5">{stats.streak} Days</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-white border border-navy rounded-xl shadow-sm">
                <span className="text-lg">⭐</span>
                <span className="text-slate-400 mt-1">XP EARNED</span>
                <span className="text-emerald-600 text-sm mt-0.5">+{score * 30 + 100}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-white border border-navy rounded-xl shadow-sm">
                <span className="text-lg">🪙</span>
                <span className="text-slate-400 mt-1">COINS</span>
                <span className="text-amber-600 text-sm mt-0.5">+{score * 10 + 25}</span>
              </div>
            </div>

            <div className="w-full max-w-md">
              <BuddyMascot
                state="cheer"
                message={buddyMsg}
                bubblePosition="top"
                size={140}
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setCompleted(false)}
                className="cartoon-btn cartoon-btn-white text-xs px-5 py-3"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleStart}
                className="cartoon-btn cartoon-btn-yellow text-xs px-5 py-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                Practice Again 🔄
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
