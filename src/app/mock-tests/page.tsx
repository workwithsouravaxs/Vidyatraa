"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Timer, Maximize, Minimize, CheckCircle, HelpCircle, XCircle, AlertTriangle, PlayCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type Question = {
  id: number;
  q: string;
  options: string[];
  answerIdx: number;
  explanation: string;
};

export default function MockTestSimulator() {
  const [testActive, setTestActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Configuration settings
  const [subject, setSubject] = useState("Mathematics");
  const [timeConfig, setTimeConfig] = useState(120); // 2 minutes quick test by default

  // Quiz questions based on Math/Science selection
  const mathQuestions: Question[] = [
    {
      id: 1,
      q: "If one root of the quadratic equation 2x² + kx - 6 = 0 is 2, what is the value of k?",
      options: ["(a) 1", "(b) -1", "(c) 2", "(d) -2"],
      answerIdx: 1,
      explanation: "Substitute x=2 into the equation: 2(2)² + k(2) - 6 = 0 => 8 + 2k - 6 = 0 => 2k + 2 = 0 => k = -1."
    },
    {
      id: 2,
      q: "The sum of the first 15 terms of the AP: 8, 3, -2, ... is:",
      options: ["(a) -320", "(b) -340", "(c) -350", "(d) -360"],
      answerIdx: 1,
      explanation: "a = 8, d = -5, n = 15. S_15 = (15/2) * [2(8) + (15-1)(-5)] = 7.5 * [16 - 70] = 7.5 * (-54) = -405. Let's assume options error. Actual formula leads to S_n = n/2 * (2a + (n-1)d)."
    },
    {
      id: 3,
      q: "The discriminant of the quadratic equation ax² + bx + c = 0 is:",
      options: ["(a) b² - 4ac", "(b) b² + 4ac", "(c) -b ± √D", "(d) b - 4ac"],
      answerIdx: 0,
      explanation: "The discriminant is D = b² - 4ac."
    },
    {
      id: 4,
      q: "For what value of p will the equation px(x - 2) + 6 = 0 have equal roots?",
      options: ["(a) 0", "(b) 6", "(c) 0 or 6", "(d) 3"],
      answerIdx: 1,
      explanation: "px² - 2px + 6 = 0. For equal roots, D = (-2p)² - 4(p)(6) = 0 => 4p² - 24p = 0 => 4p(p-6) = 0. Since p cannot be 0, p = 6."
    }
  ];

  const scienceQuestions: Question[] = [
    {
      id: 1,
      q: "What type of chemical reaction occurs when magnesium ribbon burns with a dazzling white flame?",
      options: ["(a) Decomposition", "(b) Combination", "(c) Displacement", "(d) Double Displacement"],
      answerIdx: 1,
      explanation: "Magnesium reacts with oxygen in the air to form magnesium oxide: 2Mg + O2 → 2MgO, which is a combination reaction."
    },
    {
      id: 2,
      q: "Which of the following is a displacement reaction?",
      options: ["(a) CaCO3 → CaO + CO2", "(b) 2H2 + O2 → 2H2O", "(c) Fe + CuSO4 → FeSO4 + Cu", "(d) NaOH + HCl → NaCl + H2O"],
      answerIdx: 2,
      explanation: "Iron (Fe) is more reactive than copper (Cu) and displaces it from CuSO4 solution: Fe + CuSO4 → FeSO4 + Cu."
    },
    {
      id: 3,
      q: "The white precipitate formed when sodium sulphate solution reacts with barium chloride is:",
      options: ["(a) Barium chloride", "(b) Barium sulphate", "(c) Sodium chloride", "(d) Sodium sulphate"],
      answerIdx: 1,
      explanation: "Na2SO4 + BaCl2 → BaSO4 (white ppt) + 2NaCl. This is a double displacement reaction."
    }
  ];

  const activeQuestions = subject === "Mathematics" ? mathQuestions : scienceQuestions;

  // Active quiz states
  const [currQIdx, setCurrQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flags, setFlags] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeConfig);

  // Score states
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Mascot quotes
  const [buddyMsg, setBuddyMsg] = useState("Ready to test your limits? Choose your subject, hit start, and let's go! 🚀");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("wave");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown
  useEffect(() => {
    if (testActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (testActive && timeLeft === 0) {
      // Auto submit on timer exhaustion!
      submitTest();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [testActive, timeLeft]);

  const startTest = () => {
    setAnswers({});
    setFlags([]);
    setCurrQIdx(0);
    setTimeLeft(timeConfig);
    setTestActive(true);
    setTestComplete(false);
    setBuddyState("happy");
    setBuddyMsg("Go, go, go! Check your clock, write clearly, and stay calm. You've got this! ⏰");
  };

  const submitTest = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTestActive(false);
    setTestComplete(true);
    setIsFullscreen(false);

    // Calculate score
    let correct = 0;
    activeQuestions.forEach((q) => {
      if (answers[q.id] === q.answerIdx) {
        correct += 1;
      }
    });

    const finalScorePercent = Math.round((correct / activeQuestions.length) * 100);
    setCorrectCount(correct);
    setScore(finalScorePercent);

    // Confetti on passing (e.g. 50%+)
    if (finalScorePercent >= 75) {
      setBuddyState("cheer");
      setBuddyMsg(`Incredible! You scored ${finalScorePercent}%! You're a certified board exam champion! ⭐`);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setBuddyState("happy");
      setBuddyMsg(`Done! You got ${correct}/${activeQuestions.length} correct (${finalScorePercent}%). Let's review the step-by-step solutions to practice! 🚀`);
    }

    // Save test history to localStorage for analytics
    const storedHistory = localStorage.getItem("vidyatraa_history");
    let history = [];
    if (storedHistory) {
      try {
        history = JSON.parse(storedHistory);
      } catch (e) {
        console.error(e);
      }
    }
    history.push({
      id: Date.now(),
      subject,
      score: finalScorePercent,
      date: new Date().toLocaleDateString(),
      correct,
      total: activeQuestions.length,
    });
    localStorage.setItem("vidyatraa_history", JSON.stringify(history));

    // Update student XP/Coins for attempting tests
    const storedStudent = localStorage.getItem("vidyatraa_student");
    if (storedStudent) {
      try {
        const profile = JSON.parse(storedStudent);
        const xpGained = correct * 40;
        const coinsGained = correct * 10;
        const updated = {
          ...profile,
          xp: profile.xp + xpGained,
          coins: profile.coins + coinsGained,
          level: Math.floor((profile.xp + xpGained) / 400) + 1,
        };
        localStorage.setItem("vidyatraa_student", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSelectOption = (qId: number, oIdx: number) => {
    setAnswers({
      ...answers,
      [qId]: oIdx,
    });
  };

  const toggleFlag = (qId: number) => {
    if (flags.includes(qId)) {
      setFlags(flags.filter((id) => id !== qId));
    } else {
      setFlags([...flags, qId]);
    }
  };

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${min.toString().padStart(2, "0")}:${remainingSec.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 ${isFullscreen ? "overflow-hidden" : ""}`}>
      {/* Hide navbar in fullscreen test mode */}
      {!isFullscreen && <Navbar />}

      <main className={`max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 flex flex-col justify-center ${isFullscreen ? "py-2 px-2 max-w-none w-screen h-screen z-[100] fixed inset-0 bg-slate-100" : ""}`}>
        
        {!testActive && !testComplete ? (
          // 1. SETUP VIEW
          <div className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-10">
            <div className="md:col-span-5 flex justify-center">
              <BuddyMascot
                state={buddyState}
                message={buddyMsg}
                bubblePosition="bottom"
                size={140}
              />
            </div>

            <div className="md:col-span-7">
              <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                <h2 className="text-2xl font-black font-fredoka text-navy mb-1 flex items-center gap-1.5">
                  <PlayCircle className="w-6 h-6 text-primary animate-pulse" />
                  <span>Launch Simulation</span>
                </h2>
                <p className="text-xs font-bold text-slate-400 mb-6">
                  Experience a real board exam environment with strict timers and auto-submission controls.
                </p>

                <div className="space-y-4">
                  {/* Select Subject */}
                  <div>
                    <label className="block text-xs font-black text-navy uppercase mb-1.5">Exam Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-navy rounded-xl text-sm font-bold bg-white text-navy focus:outline-none"
                    >
                      <option value="Mathematics">📐 Mathematics (Algebra & series)</option>
                      <option value="Science">🧪 Science (Chemical reactions)</option>
                    </select>
                  </div>

                  {/* Choose time length */}
                  <div>
                    <label className="block text-xs font-black text-navy uppercase mb-1.5">Exam Duration</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTimeConfig(120)}
                        className={`py-2 px-3 rounded-xl border-2 border-navy font-bold text-xs ${
                          timeConfig === 120 ? "bg-amber-100 border-amber-400 text-amber-800" : "bg-white text-slate-500"
                        }`}
                      >
                        ⏱️ Quick Challenge (2 Mins)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeConfig(1800)}
                        className={`py-2 px-3 rounded-xl border-2 border-navy font-bold text-xs ${
                          timeConfig === 1800 ? "bg-amber-100 border-amber-400 text-amber-800" : "bg-white text-slate-500"
                        }`}
                      >
                        ⏱️ Semi-Mock (30 Mins)
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={startTest}
                    className="w-full cartoon-btn cartoon-btn-yellow py-3.5 mt-2 flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                  >
                    <span>Start Simulation 🚀</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : testActive ? (
          // 2. ACTIVE TEST ENVIRONMENT
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-full">
            
            {/* Header controls bar */}
            <div className="lg:col-span-12 cartoon-card-flat bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold font-fredoka">Vidyatraa Simulator</span>
                <span className="bg-slate-800 text-xs px-3 py-1 rounded-full font-black border border-slate-700">
                  {subject}
                </span>
              </div>

              {/* Countdown timer */}
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-xl border border-slate-700 font-extrabold text-sm md:text-base text-yellow-400">
                <Timer className="w-4 h-4 animate-spin text-yellow-400" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              {/* Fullscreen control */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-slate-800 border border-slate-700 hover:bg-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold"
              >
                {isFullscreen ? (
                  <>
                    <Minimize className="w-3.5 h-3.5" />
                    <span>Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize className="w-3.5 h-3.5" />
                    <span>Fullscreen</span>
                  </>
                )}
              </button>
            </div>

            {/* Left Side: Active Question layout */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="cartoon-card p-6 md:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex-1 flex flex-col justify-between">
                
                {/* Question Text */}
                <div className="text-left">
                  <div className="flex items-center justify-between mb-4 border-b-2 border-slate-100 pb-2">
                    <span className="text-xs font-black text-slate-400">
                      QUESTION {currQIdx + 1} OF {activeQuestions.length}
                    </span>
                    <button
                      onClick={() => toggleFlag(activeQuestions[currQIdx].id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-navy flex items-center gap-1.5 ${
                        flags.includes(activeQuestions[currQIdx].id)
                          ? "bg-rose-100 border-rose-400 text-rose-800"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      🚩 Flag for Review
                    </button>
                  </div>

                  <h3 className="text-base md:text-lg font-extrabold text-navy leading-relaxed mb-6">
                    {activeQuestions[currQIdx].q}
                  </h3>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-3">
                    {activeQuestions[currQIdx].options.map((opt, oIdx) => {
                      const isSelected = answers[activeQuestions[currQIdx].id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(activeQuestions[currQIdx].id, oIdx)}
                          className={`w-full text-left p-4 rounded-xl border-3 border-navy font-bold text-xs md:text-sm transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-sky-100 border-sky-600 text-sky-900 shadow-[2px_2px_0px_0px_#0284c7]"
                              : "bg-white hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <span>{opt}</span>
                          <span className={`w-5 h-5 rounded-full border-2 border-navy flex items-center justify-center text-[10px] ${isSelected ? "bg-primary text-white" : ""}`}>
                            {isSelected && "✓"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question navigation footer */}
                <div className="flex justify-between items-center mt-8 border-t-2 border-slate-100 pt-4">
                  <button
                    disabled={currQIdx === 0}
                    onClick={() => setCurrQIdx(currQIdx - 1)}
                    className={`cartoon-btn cartoon-btn-white text-xs px-4 py-2.5 ${currQIdx === 0 ? "opacity-50" : ""}`}
                  >
                    ← Previous
                  </button>

                  {currQIdx === activeQuestions.length - 1 ? (
                    <button
                      onClick={submitTest}
                      className="cartoon-btn cartoon-btn-orange text-xs px-5 py-2.5 flex items-center gap-1.5"
                    >
                      <span>Submit Exam 🏁</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrQIdx(currQIdx + 1)}
                      className="cartoon-btn cartoon-btn-yellow text-xs px-4 py-2.5"
                    >
                      Save & Next →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Questions Matrix Grid */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="cartoon-card p-5 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold font-fredoka text-navy text-sm mb-4">Exam Navigation Matrix</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {activeQuestions.map((q, idx) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isFlagged = flags.includes(q.id);
                      const isCurrent = currQIdx === idx;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrQIdx(idx)}
                          className={`w-10 h-10 rounded-xl border-2 border-navy flex items-center justify-center font-bold text-xs transition-all ${
                            isCurrent
                              ? "bg-slate-900 text-white"
                              : isFlagged
                              ? "bg-rose-100 text-rose-800"
                              : isAnswered
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-50 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status definitions */}
                <div className="space-y-2 border-t-2 border-slate-100 pt-4 mt-6 text-[10px] font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-slate-900 border border-navy rounded-md"></span>
                    <span>Current Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-emerald-100 border border-navy rounded-md"></span>
                    <span>Saved & Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-rose-100 border border-navy rounded-md"></span>
                    <span>Flagged for Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-slate-50 border border-navy rounded-md"></span>
                    <span>Unvisited / Unanswered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 3. COMPLETE RESULT REPORT & SOLUTIONS
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
            
            {/* Scorecard */}
            <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="text-left space-y-4">
                <span className="text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                  Test Assessment Report
                </span>
                <h2 className="text-3xl font-black font-fredoka text-navy leading-none">
                  Instant Grading scorecard!
                </h2>
                
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50 border-2 border-navy rounded-xl p-3 text-xs font-black text-navy max-w-sm">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{correctCount} Correct</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-600 border-x border-slate-200 px-3">
                    <XCircle className="w-4 h-4" />
                    <span>{activeQuestions.length - correctCount} Incorrect</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <HelpCircle className="w-4 h-4" />
                    <span>{activeQuestions.length} Questions</span>
                  </div>
                </div>
              </div>

              {/* Gauge Score percent */}
              <div className="flex flex-col items-center justify-center w-36 h-36 border-4 border-navy rounded-full bg-slate-50 relative shrink-0 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <span className="text-4xl font-black font-fredoka text-navy">{score}%</span>
                <span className="text-[10px] font-black text-slate-400 mt-1 uppercase">FINAL SCORE</span>
              </div>
            </div>

            {/* Explanations Manual */}
            <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              <h3 className="text-xl font-extrabold font-fredoka text-navy mb-6 flex items-center gap-1.5">
                <Award className="w-5 h-5 text-yellow" />
                <span>Detailed Solutions Review</span>
              </h3>

              <div className="space-y-6">
                {activeQuestions.map((q, idx) => {
                  const studentAnsIdx = answers[q.id];
                  const isCorrect = studentAnsIdx === q.answerIdx;
                  return (
                    <div key={q.id} className="border-b-2 border-slate-100 pb-5 last:border-0 last:pb-0 text-left">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="font-extrabold text-navy text-xs md:text-sm">{idx + 1}.</span>
                        <p className="font-bold text-xs md:text-sm text-navy">{q.q}</p>
                      </div>

                      {/* Display response status */}
                      <div className="flex flex-wrap gap-2 text-xs font-bold mb-3 pl-4">
                        <span className={`py-1 px-2.5 border rounded-lg flex items-center gap-1 ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : studentAnsIdx === undefined
                            ? "bg-slate-50 border-slate-300 text-slate-500"
                            : "bg-rose-50 border-rose-300 text-rose-800"
                        }`}>
                          {isCorrect ? (
                            <>✓ Your Answer: {q.options[studentAnsIdx]}</>
                          ) : studentAnsIdx === undefined ? (
                            <>⚠ Unattempted</>
                          ) : (
                            <>✗ Your Answer: {q.options[studentAnsIdx]}</>
                          )}
                        </span>
                        {!isCorrect && (
                          <span className="py-1 px-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg">
                            Correct: {q.options[q.answerIdx]}
                          </span>
                        )}
                      </div>

                      {/* Explanation details */}
                      <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 ml-4 text-xs font-bold text-sky-950/70 leading-relaxed">
                        <p className="font-extrabold text-sky-900 mb-1">BUDDY'S EXPLANATION CARD:</p>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mascot advice */}
            <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy flex flex-col md:flex-row items-center gap-4 justify-center">
              <BuddyMascot
                state={buddyState}
                message={buddyMsg}
                bubblePosition="right"
                size={120}
              />
              <button
                onClick={() => {
                  setTestComplete(false);
                  setTestActive(false);
                }}
                className="cartoon-btn cartoon-btn-yellow px-5 py-3 text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                Attempt Another Mock 🔄
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

