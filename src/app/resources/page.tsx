"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { BookOpen, Sparkles, Award, FileText, ArrowRight, Download, Play, Eye, RotateCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type Flashcard = {
  front: string;
  back: string;
};

type Chapter = {
  id: number;
  name: string;
  desc: string;
  summary: string;
  formulas: string[];
  questions: { q: string; a: string }[];
  flashcards: Flashcard[];
};

type Subject = {
  name: string;
  emoji: string;
  color: string;
  badgeColor: string;
  chapters: Chapter[];
};

export default function StudyResources() {
  const initialSubjects: Subject[] = [
    {
      name: "Mathematics",
      emoji: "📐",
      color: "bg-sky-100 border-sky-400 text-sky-800",
      badgeColor: "bg-sky-400 text-white",
      chapters: [
        {
          id: 1,
          name: "Quadratic Equations",
          desc: "Roots of equations, discriminant method, and word problems.",
          summary: "A quadratic equation is of the form ax² + bx + c = 0, where a ≠ 0. The solutions are called roots and can be found using factorization, completing the square, or the quadratic formula.",
          formulas: [
            "Standard Form: ax² + bx + c = 0",
            "Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a",
            "Discriminant: D = b² - 4ac",
            "Nature of Roots: If D > 0 (two real & distinct), D = 0 (two real & equal), D < 0 (no real roots).",
          ],
          questions: [
            { q: "Find the roots of x² - 5x + 6 = 0.", a: "Factorizing gives (x - 2)(x - 3) = 0. Therefore, the roots are x = 2 and x = 3." },
            { q: "What is the discriminant of 2x² - 4x + 3 = 0?", a: "Here, a=2, b=-4, c=3. D = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, it has no real roots." },
          ],
          flashcards: [
            { front: "Discriminant Formula", back: "D = b² - 4ac" },
            { front: "Condition for Equal Roots", back: "Discriminant (D) must equal 0" },
            { front: "Sum of Roots (α + β)", back: "-b / a" },
            { front: "Product of Roots (α * β)", back: "c / a" },
          ],
        },
        {
          id: 2,
          name: "Arithmetic Progressions",
          desc: "Understanding terms, common difference, and sum of series.",
          summary: "An Arithmetic Progression (AP) is a sequence of numbers in which the difference between consecutive terms is constant, known as the common difference (d).",
          formulas: [
            "nth term formula: an = a + (n - 1)d",
            "Sum of first n terms: Sn = (n / 2) [2a + (n - 1)d] or Sn = (n / 2) [a + l]",
          ],
          questions: [
            { q: "Find the 10th term of the AP: 2, 7, 12, ...", a: "Here, a = 2, d = 5, n = 10. a10 = 2 + (10-1)5 = 2 + 45 = 47." },
          ],
          flashcards: [
            { front: "AP Common Difference d", back: "d = a_n - a_(n-1)" },
            { front: "Sum of n terms shortcut", back: "S_n = n/2 * (First term + Last term)" },
          ],
        },
      ],
    },
    {
      name: "Science",
      emoji: "🧪",
      color: "bg-emerald-100 border-emerald-400 text-emerald-800",
      badgeColor: "bg-emerald-400 text-white",
      chapters: [
        {
          id: 1,
          name: "Chemical Reactions",
          desc: "Balancing equations, combinations, and displacement reactions.",
          summary: "Chemical reactions involve the breaking and making of chemical bonds to produce new substances. They are classified into combination, decomposition, displacement, double displacement, and redox reactions.",
          formulas: [
            "Reactants → Products",
            "Combination: A + B → AB",
            "Decomposition: AB → A + B",
            "Displacement: A + BC → AC + B",
          ],
          questions: [
            { q: "Why should a magnesium ribbon be cleaned before burning in air?", a: "To remove the protective layer of basic magnesium carbonate from its surface, so it burns easily." },
            { q: "What is a redox reaction?", a: "A reaction in which both oxidation (gain of oxygen/loss of hydrogen) and reduction (loss of oxygen/gain of hydrogen) occur simultaneously." },
          ],
          flashcards: [
            { front: "Exothermic Reaction", back: "Reaction that releases heat energy into the surroundings." },
            { front: "Catalyst", back: "Substance that speeds up a reaction without being consumed." },
            { front: "Rusting Formula", back: "Hydrated iron oxide: Fe2O3 • xH2O" },
          ],
        },
      ],
    },
    {
      name: "Social Studies",
      emoji: "🌍",
      color: "bg-amber-100 border-amber-400 text-amber-800",
      badgeColor: "bg-amber-400 text-white",
      chapters: [
        {
          id: 1,
          name: "Nationalism in India",
          desc: "Non-cooperation movement, Civil Disobedience, and Partition.",
          summary: "The growth of modern nationalism in India is intimately connected to the anti-colonial movement. Gandhi led major satyagrahas that brought the masses together in protest.",
          formulas: [
            "1915: Gandhiji returns to India",
            "1919: Rowlatt Act & Jallianwala Bagh",
            "1921: Non-Cooperation Movement",
            "1930: Dandi Salt March & Civil Disobedience",
          ],
          questions: [
            { q: "Why did Gandhiji decide to withdraw the Non-Cooperation Movement?", a: "Due to the violent incident at Chauri Chaura in February 1922, where protestors set fire to a police station." },
          ],
          flashcards: [
            { front: "Rowlatt Act (1919)", back: "Allowed detention of political prisoners without trial for up to 2 years." },
            { front: "Poona Pact (1932)", back: "Agreement between Ambedkar and Gandhi securing reserved seats for depressed classes." },
          ],
        },
      ],
    },
    {
      name: "English",
      emoji: "📖",
      color: "bg-purple-100 border-purple-400 text-purple-800",
      badgeColor: "bg-purple-400 text-white",
      chapters: [
        {
          id: 1,
          name: "A Letter to God",
          desc: "Lencho's faith, the postmaster's kindness, and the heavy storm.",
          summary: "Lencho, a simple farmer, has absolute faith in God. When a hailstorm ruins his crops, he writes a letter to God asking for 100 pesos. The postmaster helps him, but Lencho suspects the post office staff of stealing the missing portion.",
          formulas: [
            "Protagonist: Lencho",
            "Setting: A valley farm",
            "Core Conflict: Faith vs. Reality",
            "Irony: Lencho calling his helpers 'a bunch of crooks'.",
          ],
          questions: [
            { q: "Who does Lencho have complete faith in?", a: "Lencho has complete faith in God. He believes God sees everything, even what is deep in one's conscience." },
          ],
          flashcards: [
            { front: "Pesos", back: "The currency of several Latin American countries, requested by Lencho." },
            { front: "Irony in the story", back: "The post office employees who raised money for Lencho were accused of stealing it." },
          ],
        },
      ],
    },
  ];

  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  useEffect(() => {
    const storedRes = localStorage.getItem("boardbuddy_resources_list");
    if (storedRes) {
      try {
        setSubjects(JSON.parse(storedRes));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem("boardbuddy_resources_list", JSON.stringify(initialSubjects));
    }
  }, []);

  const [activeSubIdx, setActiveSubIdx] = useState(0);
  const [activeChapIdx, setActiveChapIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"notes" | "formulas" | "flashcards" | "questions">("notes");
  const [activeFlashIdx, setActiveFlashIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [visibleAnsIdx, setVisibleAnsIdx] = useState<number | null>(null);
  
  // Download simulation state
  const [downloadingType, setDownloadingType] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<{
    title: string;
    type: "Summary PDF" | "Mind Map";
    contentLines: string[];
  } | null>(null);

  const activeSubject = subjects[activeSubIdx];
  const activeChapter = activeSubject.chapters[activeChapIdx] || activeSubject.chapters[0];

  const handlePreview = (type: "Summary PDF" | "Mind Map") => {
    let content: string[] = [];
    if (type === "Summary PDF") {
      content = [
        `Subject: ${activeSubject.name}`,
        `Topic: ${activeChapter.name} Core Notes`,
        `Revision Summary:`,
        activeChapter.summary,
        `Key Formulas:`,
        ...activeChapter.formulas
      ];
    } else {
      content = [
        `Subject: ${activeSubject.name} Concept Map`,
        `Topic: ${activeChapter.name} Core Workflow`,
        `🚀 [Stage 1: Introduction & Definitions]`,
        `   ↳ Understanding terminology, core attributes, and variables.`,
        `📈 [Stage 2: Core Theorems & Derivations]`,
        `   ↳ Establishing dependencies, proving equations, and analyzing constants.`,
        `💡 [Stage 3: High-Yield Practice & Applications]`,
        `   ↳ Applying rules to solve previous-year board exam questions.`
      ];
    }
    setPreviewContent({
      title: `${activeChapter.name} - ${type}`,
      type,
      contentLines: content
    });
  };

  const triggerDownload = (type: string) => {
    setDownloadingType(type);
    
    // Simulate API download lag
    setTimeout(() => {
      setDownloadingType(null);
      setPreviewContent(null);
      
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#38bdf8", "#fbbf24", "#34d399"]
      });

      alert(`🎉 Hurray! Your ${type} has been saved to your downloads list!`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Subject and Chapter Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Subject Tabs */}
          <div className="cartoon-card p-5 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">Select Subject</h3>
            <div className="flex flex-col gap-2">
              {subjects.map((sub, idx) => (
                <button
                  key={sub.name}
                  onClick={() => {
                    setActiveSubIdx(idx);
                    setActiveChapIdx(0);
                    setActiveTab("notes");
                    setActiveFlashIdx(0);
                    setIsFlipped(false);
                    setVisibleAnsIdx(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 border-navy font-bold text-sm transition-all flex items-center justify-between ${
                    activeSubIdx === idx
                      ? `${sub.color} shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]`
                      : "bg-white hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sub.emoji}</span>
                    <span>{sub.name}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-navy ${sub.badgeColor}`}>
                    {sub.chapters.length} Ch
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Chapters List */}
          <div className="cartoon-card p-5 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">Chapters</h3>
            <div className="flex flex-col gap-2">
              {activeSubject.chapters.map((chap, idx) => (
                <button
                  key={chap.name}
                  onClick={() => {
                    setActiveChapIdx(idx);
                    setActiveTab("notes");
                    setActiveFlashIdx(0);
                    setIsFlipped(false);
                    setVisibleAnsIdx(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border-2 border-navy font-bold transition-all text-xs ${
                    activeChapIdx === idx
                      ? "bg-amber-50 border-amber-400 text-amber-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                      : "bg-white hover:bg-slate-50 text-slate-500"
                  }`}
                >
                  <p className="font-extrabold text-navy text-sm mb-1">{chap.name}</p>
                  <p className="line-clamp-2 leading-relaxed text-slate-400">{chap.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Mascot Quote */}
          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state="thinking"
              message="Did you know? Reviewing flashcards for just 5 minutes a day increases retention by 40%! 🧠"
              bubblePosition="bottom"
              size={110}
            />
          </div>
        </div>

        {/* Right Side: Chapter Study Dashboard (Interactive tabs) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Main Dashboard Card */}
          <div className="cartoon-card bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
            
            {/* Header info */}
            <div className="p-6 border-b-4 border-navy bg-slate-50 flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs bg-navy text-white font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">
                  {activeSubject.name}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-fredoka text-navy mt-2">
                  {activeChapter.name}
                </h2>
              </div>

              {/* Download Quick Button */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview("Summary PDF")}
                  className="cartoon-btn cartoon-btn-white text-xs px-3.5 py-2.5 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Notes</span>
                </button>
                <button
                  onClick={() => handlePreview("Mind Map")}
                  className="cartoon-btn cartoon-btn-yellow text-xs px-3.5 py-2.5 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Mind Map</span>
                </button>
              </div>
            </div>

            {/* Tab Selectors */}
            <div className="grid grid-cols-4 border-b-2 border-navy text-center font-extrabold text-xs md:text-sm text-navy bg-white">
              {(["notes", "formulas", "flashcards", "questions"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3.5 capitalize border-r border-slate-200 transition-all ${
                    activeTab === tab ? "bg-amber-100 text-amber-900 border-b-2 border-b-amber-500 font-black" : "hover:bg-slate-50"
                  }`}
                >
                  {tab === "notes" ? "📝 Summary" : tab === "formulas" ? "🔢 Formulas" : tab === "flashcards" ? "⚡ Flashcards" : "❓ Q&A"}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6 md:p-8 min-h-[300px]">
              <AnimatePresence mode="wait">
                
                {/* 1. Summary Notes */}
                {activeTab === "notes" && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 text-left"
                  >
                    <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-5">
                      <h4 className="font-extrabold font-fredoka text-sky-900 text-lg mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span>Revision Summary</span>
                      </h4>
                      <p className="text-sm font-bold text-sky-950/80 leading-relaxed">
                        {activeChapter.summary}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-extrabold font-fredoka text-navy text-lg">💡 High-Yield Learnings</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-600">
                        <li className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-2">
                          <span className="text-amber-500 text-base">★</span>
                          <span>Always double-check units and sign conventions.</span>
                        </li>
                        <li className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-2">
                          <span className="text-amber-500 text-base">★</span>
                          <span>Review textbook examples; they account for 30%+ of marks.</span>
                        </li>
                        <li className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-2">
                          <span className="text-amber-500 text-base">★</span>
                          <span>Write step-by-step methods to secure partial marks.</span>
                        </li>
                        <li className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-2">
                          <span className="text-amber-500 text-base">★</span>
                          <span>Create summary maps of chemical formulas.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Simulated interactive video classes */}
                    <div className="border-3 border-navy rounded-2xl p-5 bg-purple-50 flex items-center justify-between flex-wrap gap-4">
                      <div className="text-left">
                        <h4 className="font-extrabold text-purple-950 text-sm">Play Animated Video Lesson</h4>
                        <p className="text-[11px] font-bold text-purple-900/60 mt-1">12 minutes visual guide by Buddy</p>
                      </div>
                      <button
                        onClick={() => alert("📺 Launching Video Player! Load custom cartoon visual guidelines...")}
                        className="cartoon-btn cartoon-btn-sky px-4 py-2 text-xs flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-sky-800" />
                        <span>Watch Now</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2. Formulas Sheet */}
                {activeTab === "formulas" && (
                  <motion.div
                    key="formulas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 text-left"
                  >
                    <h4 className="font-extrabold font-fredoka text-navy text-lg mb-2">Key Equations & Rules</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeChapter.formulas.map((form, idx) => (
                        <div key={idx} className="cartoon-card-flat p-4 bg-yellow/5 border-2 border-navy flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full border border-navy bg-yellow/30 flex items-center justify-center font-black text-xs">
                            {idx + 1}
                          </span>
                          <span className="font-black text-xs md:text-sm text-navy">{form}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3. Flashcards */}
                {activeTab === "flashcards" && (
                  <motion.div
                    key="flashcards"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <h4 className="font-extrabold font-fredoka text-navy text-lg text-center">
                      Card {activeFlashIdx + 1} of {activeChapter.flashcards.length}
                    </h4>

                    {/* Flippable Card Container */}
                    <div
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="w-72 h-44 cursor-pointer select-none perspective"
                    >
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full relative preserve-3d"
                      >
                        {/* Front Side */}
                        <div className="absolute inset-0 backface-hidden cartoon-card p-6 flex flex-col items-center justify-center text-center bg-sky-100 hover:bg-sky-200">
                          <span className="text-xs text-sky-700 font-extrabold uppercase tracking-wide mb-2">Term</span>
                          <p className="font-extrabold text-base md:text-lg text-navy">{activeChapter.flashcards[activeFlashIdx]?.front}</p>
                          <span className="text-[10px] font-bold text-slate-400 mt-4 flex items-center gap-1">
                            <RotateCw className="w-3 h-3 animate-spin" /> Click to Flip
                          </span>
                        </div>
                        {/* Back Side */}
                        <div className="absolute inset-0 backface-hidden cartoon-card p-6 flex flex-col items-center justify-center text-center bg-amber-100 rotate-y-180">
                          <span className="text-xs text-amber-700 font-extrabold uppercase tracking-wide mb-2">Definition</span>
                          <p className="font-bold text-xs md:text-sm text-amber-950 leading-relaxed">
                            {activeChapter.flashcards[activeFlashIdx]?.back}
                          </p>
                          <span className="text-[10px] font-bold text-slate-400 mt-4">Click to Flip Back</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4">
                      <button
                        disabled={activeFlashIdx === 0}
                        onClick={() => {
                          setActiveFlashIdx(activeFlashIdx - 1);
                          setIsFlipped(false);
                        }}
                        className={`cartoon-btn cartoon-btn-white text-xs px-4 py-2 ${activeFlashIdx === 0 ? "opacity-50" : ""}`}
                      >
                        ← Prev
                      </button>
                      <button
                        disabled={activeFlashIdx === activeChapter.flashcards.length - 1}
                        onClick={() => {
                          setActiveFlashIdx(activeFlashIdx + 1);
                          setIsFlipped(false);
                        }}
                        className={`cartoon-btn cartoon-btn-yellow text-xs px-4 py-2 ${
                          activeFlashIdx === activeChapter.flashcards.length - 1 ? "opacity-50" : ""
                        }`}
                      >
                        Next →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 4. Questions & Answers */}
                {activeTab === "questions" && (
                  <motion.div
                    key="questions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 text-left"
                  >
                    <h4 className="font-extrabold font-fredoka text-navy text-lg">Class 10 Board Questions</h4>
                    
                    <div className="space-y-3">
                      {activeChapter.questions.map((quest, idx) => (
                        <div key={idx} className="cartoon-card-flat border-2 border-navy overflow-hidden">
                          <div
                            onClick={() => setVisibleAnsIdx(visibleAnsIdx === idx ? null : idx)}
                            className="bg-slate-50 p-4 font-bold text-xs md:text-sm text-navy cursor-pointer flex justify-between items-center"
                          >
                            <span className="font-extrabold flex-1 pr-4">{idx + 1}. {quest.q}</span>
                            <span className="text-primary font-black flex items-center gap-1 shrink-0 text-xs">
                              <Eye className="w-4 h-4" /> {visibleAnsIdx === idx ? "Hide" : "Show Answer"}
                            </span>
                          </div>
                          {visibleAnsIdx === idx && (
                            <div className="p-4 border-t-2 border-navy bg-white text-xs md:text-sm font-semibold text-slate-600 leading-relaxed">
                              {quest.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      {/* Preview Modal */}
      {previewContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cartoon-card bg-white p-6 max-w-lg w-full flex flex-col justify-between max-h-[85vh] border-3 border-navy shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
          >
            {/* Modal Header */}
            <div className="border-b-3 border-navy pb-3 mb-4 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] bg-primary text-white font-black px-2 py-0.5 rounded-full border border-navy">
                  {previewContent.type === "Summary PDF" ? "📄 PDF DOCUMENT PREVIEW" : "🗺️ CONCEPT MIND MAP"}
                </span>
                <h4 className="font-extrabold text-sm md:text-base text-navy font-fredoka mt-1">{previewContent.title}</h4>
              </div>
              <button
                onClick={() => setPreviewContent(null)}
                className="cartoon-btn cartoon-btn-white text-xs px-2.5 py-1.5"
              >
                ✕ Close
              </button>
            </div>

            {/* Document Body (Syllabus details) */}
            <div className="flex-1 overflow-y-auto bg-slate-50 border-2 border-navy rounded-xl p-4 font-bold text-xs md:text-sm text-slate-700 space-y-3 max-h-[50vh] text-left">
              {previewContent.contentLines.map((line, idx) => {
                if (line.startsWith("Subject:") || line.startsWith("Topic:") || line.startsWith("Revision Summary:") || line.startsWith("Key Formulas:")) {
                  return (
                    <p key={idx} className="text-navy font-extrabold border-b border-slate-200 pb-1 uppercase tracking-wide text-[10px] first:mt-0 mt-3">
                      {line}
                    </p>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed pl-2 border-l-2 border-slate-300">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Action controls */}
            <div className="mt-4 pt-3 border-t-2 border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setPreviewContent(null)}
                className="cartoon-btn cartoon-btn-white text-xs px-4 py-2.5"
              >
                Cancel
              </button>
              <button
                disabled={downloadingType !== null}
                onClick={() => triggerDownload(previewContent.type)}
                className="cartoon-btn cartoon-btn-yellow text-xs px-5 py-2.5 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingType ? "Downloading..." : "Download to Device 🚀"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
