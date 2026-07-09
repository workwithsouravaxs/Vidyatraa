"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { BookOpen, Sparkles, Download, Printer, PlayCircle, Save, RefreshCw, Cpu, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type PaperQuestion = {
  section: string;
  type: string;
  marksPerQuestion: number;
  items: string[];
};

type GeneratedPaper = {
  subject: string;
  board: string;
  difficulty: string;
  totalMarks: number;
  timeAllowed: string;
  sections: PaperQuestion[];
};

export default function PracticePaperGenerator() {
  const [subject, setSubject] = useState("Mathematics");
  const [difficulty, setDifficulty] = useState("Medium");
  const [marks, setMarks] = useState(50);
  const [questionType, setQuestionType] = useState("Mixed");

  // Loading and paper states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState<GeneratedPaper | null>(null);

  // Mascot quotes
  const [buddyMsg, setBuddyMsg] = useState("Select your settings on the left, and I'll generate a custom board-style paper using my AI engine! 🧠");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("idle");

  const generatePaper = () => {
    setIsGenerating(true);
    setBuddyState("thinking");
    setBuddyMsg("Hmm... thinking! Assembling the highest-yield Class 10 questions for you... ⚡");

    setTimeout(() => {
      setIsGenerating(false);
      setBuddyState("happy");
      setBuddyMsg("BEEP BOOP! Done! Here is your custom exam paper. You can download, print, or attempt it right now! 🎉");
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#38bdf8", "#fbbf24", "#34d399"]
      });

      // Assemble mock questions based on selections
      let mockSections: PaperQuestion[] = [];
      let time = "1.5 Hours";
      if (marks === 80) time = "3.0 Hours";
      if (marks === 25) time = "45 Mins";

      if (subject === "Mathematics") {
        mockSections = [
          {
            section: "SECTION A: Objective Type (MCQs)",
            type: "MCQ",
            marksPerQuestion: 1,
            items: [
              "What is the value of the discriminant for 3x² - 2x + 1/3 = 0? (a) 0 (b) 4 (c) -4 (d) 1/3",
              "The nth term of an AP is given by a_n = 3 + 4n. The common difference d is: (a) 3 (b) 4 (c) 7 (d) 1",
              "If the sum of roots is -5 and product is 6, the quadratic equation is: (a) x² - 5x + 6 = 0 (b) x² + 5x + 6 = 0 (c) x² - 5x - 6 = 0 (d) x² + 5x - 6 = 0"
            ]
          },
          {
            section: "SECTION B: Short Answer Type",
            type: "Short",
            marksPerQuestion: 3,
            items: [
              "Find the sum of all two-digit odd positive integers.",
              "Solve for x using factorization method: 6x² - x - 2 = 0."
            ]
          },
          {
            section: "SECTION C: Long Answer Type (Case Study)",
            type: "Long",
            marksPerQuestion: 5,
            items: [
              "A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.",
              "The sum of the 4th and 8th terms of an AP is 24 and the sum of the 6th and 10th terms is 44. Find the first three terms of the AP."
            ]
          }
        ];
      } else if (subject === "Science") {
        mockSections = [
          {
            section: "SECTION A: MCQs & Assertion-Reason",
            type: "MCQ",
            marksPerQuestion: 1,
            items: [
              "Fe2O3 + 2Al → Al2O3 + 2Fe. This reaction is an example of: (a) combination (b) double displacement (c) decomposition (d) displacement",
              "Which of the following is a balanced equation? (a) H2 + O2 → H2O (b) 2H2 + O2 → 2H2O (c) H2 + O2 → 2H2O (d) 2H2 + 2O2 → 2H2O"
            ]
          },
          {
            section: "SECTION B: Short Concepts",
            type: "Short",
            marksPerQuestion: 3,
            items: [
              "What happens chemically when quicklime (CaO) is added to water? Write a balanced equation and state if it is exothermic.",
              "Explain the term double displacement reaction with the help of a suitable chemical chemical equation."
            ]
          },
          {
            section: "SECTION C: Experimental Questions",
            type: "Long",
            marksPerQuestion: 5,
            items: [
              "Write balanced chemical equations for the following: (i) Hydrogen gas combines with nitrogen to form ammonia. (ii) Hydrogen sulphide gas burns in air to give water and sulphur dioxide. (iii) Barium chloride reacts with aluminium sulphate to give aluminium chloride and a precipitate of barium sulphate.",
              "A metal ribbon X burns in oxygen with a dazzling white flame forming a white ash Y. Identify X and Y. Write the chemical equation for the reaction."
            ]
          }
        ];
      } else {
        // Social Studies/English fallback
        mockSections = [
          {
            section: "SECTION A: Quick Recall",
            type: "MCQ",
            marksPerQuestion: 1,
            items: [
              "In which year did Mahatma Gandhi return to India from South Africa? (a) 1915 (b) 1919 (c) 1921 (d) 1930",
              "Who wrote the book 'Hind Swaraj'? (a) Subhas Chandra Bose (b) Mahatma Gandhi (c) Jawaharlal Nehru (d) Rabindranath Tagore"
            ]
          },
          {
            section: "SECTION B: Short Questions",
            type: "Short",
            marksPerQuestion: 3,
            items: [
              "What was the Rowlatt Act? Why did Indians oppose it?",
              "Describe the main features of the Civil Disobedience Movement of 1930."
            ]
          },
          {
            section: "SECTION C: Paragraph Analysis",
            type: "Long",
            marksPerQuestion: 5,
            items: [
              "Why did Mahatma Gandhi decide to start the Non-Cooperation Movement? How did it affect Indian business communities? Explain.",
              "Explain how the sense of collective belonging was cultivated in India during the anti-colonial struggle."
            ]
          }
        ];
      }

      // Filter sections based on selected questionType
      if (questionType === "MCQ") {
        mockSections = [mockSections[0]];
      } else if (questionType === "Short") {
        mockSections = [mockSections[1]];
      } else if (questionType === "Long") {
        mockSections = [mockSections[2]];
      }

      setGeneratedPaper({
        subject,
        board: "CBSE",
        difficulty,
        totalMarks: marks,
        timeAllowed: time,
        sections: mockSections,
      });
    }, 1500);
  };

  const handleDownload = () => {
    alert("📥 Saving Practice Paper to PDF... Saved in Downloads folder!");
    confetti({ particleCount: 30, spread: 40 });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters Config */}
        <div className="lg:col-span-4 flex flex-col gap-6 no-print">
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <Cpu className="w-5 h-5 text-primary" />
              <span>AI Configuration</span>
            </h3>

            <div className="space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-navy rounded-xl text-sm font-bold bg-white text-navy focus:outline-none"
                >
                  <option value="Mathematics">📐 Mathematics</option>
                  <option value="Science">🧪 Science</option>
                  <option value="Social Studies">🌍 Social Studies</option>
                  <option value="English">📖 English</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Difficulty</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Easy", "Medium", "Hard"].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 rounded-xl border-2 border-navy font-bold text-xs ${
                        difficulty === diff
                          ? "bg-sky-100 border-sky-400 text-sky-800 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                          : "bg-white hover:bg-slate-50 text-slate-500"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Marks */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Total Marks</label>
                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 80].map((mk) => (
                    <button
                      key={mk}
                      type="button"
                      onClick={() => setMarks(mk)}
                      className={`py-2 rounded-xl border-2 border-navy font-bold text-xs ${
                        marks === mk
                          ? "bg-amber-100 border-amber-400 text-amber-800 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                          : "bg-white hover:bg-slate-50 text-slate-500"
                      }`}
                    >
                      {mk} Marks
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Types */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Question Types</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-navy rounded-xl text-sm font-bold bg-white text-navy focus:outline-none"
                >
                  <option value="Mixed">🔄 Mixed Format (Standard)</option>
                  <option value="MCQ">🎯 Multiple Choice (MCQs)</option>
                  <option value="Short">📝 Short Answer Questions</option>
                  <option value="Long">✍️ Long Answer / Case Studies</option>
                </select>
              </div>

              {/* Generate Button */}
              <button
                disabled={isGenerating}
                onClick={generatePaper}
                className="w-full cartoon-btn cartoon-btn-yellow py-3.5 mt-2 flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? "Cooking Paper..." : "Generate AI Paper 🚀"}</span>
              </button>
            </div>
          </div>

          {/* Mascot Info */}
          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state={buddyState}
              message={buddyMsg}
              bubblePosition="bottom"
              size={120}
            />
          </div>
        </div>

        {/* Right Side: Paper Screen */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] min-h-[480px] flex flex-col">
            
            {isGenerating ? (
              // Loading screen
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin mb-6"></div>
                <h4 className="text-xl font-extrabold font-fredoka text-navy mb-2">Analyzing Syllabus Matrix...</h4>
                <p className="text-sm font-bold text-slate-400 max-w-xs">Selecting high-yield boards patterns from CBSE, ICSE databases...</p>
              </div>
            ) : generatedPaper ? (
              // Generated Paper View
              <div className="flex-1 flex flex-col">
                {/* Board Paper Header */}
                <div className="text-center border-b-4 border-navy pb-6 mb-6">
                  <span className="text-xs font-black text-primary tracking-widest uppercase bg-sky-50 border border-sky-300 px-3 py-1 rounded-full">
                    AI GENERATED TEST PATTERN
                  </span>
                  <h2 className="text-2xl font-black font-fredoka text-navy mt-3 uppercase tracking-wide">
                    BOARD PREPARATION MODEL PAPER
                  </h2>
                  <p className="text-sm font-extrabold text-slate-500 mt-1">
                    Subject: {generatedPaper.subject} | Grade 10 ({generatedPaper.board})
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 max-w-lg mx-auto bg-slate-50 border-2 border-navy rounded-xl p-2.5 text-xs font-bold text-navy">
                    <div>
                      <p className="text-slate-400">MARKS</p>
                      <p className="font-extrabold text-sm">{generatedPaper.totalMarks} Marks</p>
                    </div>
                    <div className="border-x border-slate-200">
                      <p className="text-slate-400">TIME ALLOWED</p>
                      <p className="font-extrabold text-sm">{generatedPaper.timeAllowed}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">DIFFICULTY</p>
                      <p className="font-extrabold text-sm text-rose-500">{generatedPaper.difficulty}</p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-left bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs font-bold text-slate-500 space-y-1">
                  <p className="text-navy font-extrabold mb-1">GENERAL INSTRUCTIONS:</p>
                  <p>1. All questions are compulsory. Reading time is 15 minutes.</p>
                  <p>2. Marks are indicated against each question or section.</p>
                  <p>3. Use step-by-step methods and clear neat diagrams for formulas.</p>
                </div>

                {/* Questions Layout */}
                <div className="flex-1 space-y-6 text-left">
                  {generatedPaper.sections.map((sect, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <h3 className="font-extrabold font-fredoka text-navy text-base border-b-2 border-navy pb-1.5">
                        {sect.section}
                      </h3>
                      <div className="space-y-4 text-xs md:text-sm font-semibold">
                        {sect.items.map((item, qIdx) => (
                          <div key={qIdx} className="flex items-start gap-3">
                            <span className="font-bold text-navy">{qIdx + 1}.</span>
                            <div className="flex-1 space-y-1">
                              <p className="text-slate-700 leading-relaxed font-bold">{item}</p>
                            </div>
                            <span className="text-[11px] font-black text-slate-400 whitespace-nowrap">
                              [{sect.marksPerQuestion} Mark{sect.marksPerQuestion > 1 ? "s" : ""}]
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paper Action Footer */}
                <div className="mt-8 pt-6 border-t-4 border-navy flex flex-wrap gap-3 no-print">
                  <button
                    onClick={handleDownload}
                    className="cartoon-btn cartoon-btn-white text-xs px-4 py-2.5 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="cartoon-btn cartoon-btn-white text-xs px-4 py-2.5 flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Test</span>
                  </button>

                  <button
                    onClick={() => {
                      alert("💾 Saved to dashboard resources panel! Attempt online synced.");
                      confetti({ particleCount: 30, spread: 30 });
                    }}
                    className="cartoon-btn cartoon-btn-white text-xs px-4 py-2.5 flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Paper</span>
                  </button>

                  <Link
                    href={`/mock-tests?subject=${subject}&difficulty=${difficulty}&marks=${marks}`}
                    className="cartoon-btn cartoon-btn-yellow text-xs px-5 py-2.5 flex items-center gap-1.5 ml-auto"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Attempt Online 🚀</span>
                  </Link>
                </div>
              </div>
            ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 max-w-sm flex flex-col items-center gap-4">
                  <span className="text-5xl">📄</span>
                  <h4 className="text-lg font-extrabold text-navy font-fredoka">No Paper Active</h4>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed">
                    Set up your preferred subject and difficulty on the left side panel, then tap **Generate** to render your custom mock test paper!
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
