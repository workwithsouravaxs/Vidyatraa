"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Search, SlidersHorizontal, Calendar, Award, DollarSign, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type Scholarship = {
  id: number;
  name: string;
  provider: string;
  state: string;
  category: string;
  incomeLimit: string;
  maxIncome: number; // in Rupees
  eligibility: string;
  benefits: string;
  deadline: string;
};

export default function ScholarshipHub() {
  const initialScholarships: Scholarship[] = [
    {
      id: 1,
      name: "National Means-Cum-Merit Scholarship (NMMSS)",
      provider: "Ministry of Education, Central Govt",
      state: "National",
      category: "All Categories",
      incomeLimit: "Below ₹3.5 Lakhs",
      maxIncome: 350000,
      eligibility: "Class 10 students with 55%+ marks in Class 9.",
      benefits: "₹12,000 per year stipend for higher secondary study.",
      deadline: "30th Oct 2026",
    },
    {
      id: 2,
      name: "CBSE Single Girl Child Scholarship Scheme",
      provider: "Central Board of Secondary Education",
      state: "National",
      category: "Single Girl Child",
      incomeLimit: "No Income Bar",
      maxIncome: 9999999,
      eligibility: "Single girl child who passed Class 10 with 60%+ marks.",
      benefits: "₹500 per month for study support.",
      deadline: "15th Dec 2026",
    },
    {
      id: 3,
      name: "State Special EWS Support Scholarship",
      provider: "Dept. of Higher Education, State Board",
      state: "Telangana SSC",
      category: "EWS / General",
      incomeLimit: "Below ₹1.5 Lakhs",
      maxIncome: 150000,
      eligibility: "Class 10 students from economically weak backgrounds.",
      benefits: "Full tuition waiver and book allowances.",
      deadline: "20th Nov 2026",
    },
    {
      id: 4,
      name: "Dr. Ambedkar Post-Matric Scholarship",
      provider: "Ministry of Social Justice, India",
      state: "National",
      category: "SC / ST / OBC",
      incomeLimit: "Below ₹2.5 Lakhs",
      maxIncome: 250000,
      eligibility: "Class 10 students entering higher secondary courses.",
      benefits: "₹6,000 standard academic allowance.",
      deadline: "10th Nov 2026",
    },
  ];

  const [scholarships, setScholarships] = useState<Scholarship[]>(initialScholarships);

  useEffect(() => {
    const storedSch = localStorage.getItem("boardbuddy_scholarships_list");
    if (storedSch) {
      try {
        setScholarships(JSON.parse(storedSch));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem("boardbuddy_scholarships_list", JSON.stringify(initialScholarships));
    }
  }, []);

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All States");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterIncome, setFilterIncome] = useState(600000); // 6 Lakhs default limit

  // Apply tracking state
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  // Mascot quotes
  const [buddyMsg, setBuddyMsg] = useState("Need financial aid for Higher Secondary study? Filter schemes on the left and tap Apply. I'll automatically fill the forms with your profile! 💡");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("idle");

  const filteredScholarships = scholarships.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState === "All States" || s.state === filterState || s.state === "National";
    const matchesCategory = filterCategory === "All Categories" || s.category.includes(filterCategory) || s.category === "All Categories";
    const matchesIncome = s.maxIncome <= filterIncome;

    return matchesSearch && matchesState && matchesCategory && matchesIncome;
  });

  const handleApply = (id: number) => {
    if (appliedIds.includes(id)) return;

    setBuddyState("thinking");
    setBuddyMsg("Submitting scholarship file with your synced Class 10 BoardBuddy records... 📤");

    setTimeout(() => {
      setAppliedIds([...appliedIds, id]);
      setBuddyState("cheer");
      setBuddyMsg("Incredible! Application submitted successfully. We will monitor the review timeline! 🎉");

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#34d399", "#fbbf24"]
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Panel: Filters & Mascot */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <span>Filter Hub</span>
            </h3>

            <div className="space-y-4 text-left">
              {/* Search Bar */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Search Scheme</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search NMMSS, CBSE single girl child..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                  />
                </div>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Syllabus / Board State</label>
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-bold bg-white text-navy focus:outline-none"
                >
                  <option value="All States">All States / National</option>
                  <option value="National">National Level Schemes</option>
                  <option value="Telangana SSC">Telangana SSC</option>
                  <option value="Andhra Pradesh SSC">Andhra Pradesh SSC</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-bold bg-white text-navy focus:outline-none"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="SC / ST / OBC">SC / ST / OBC</option>
                  <option value="EWS / General">EWS (Economically Weak)</option>
                  <option value="Single Girl Child">Single Girl Child Special</option>
                </select>
              </div>

              {/* Income limit */}
              <div>
                <label className="block text-xs font-black text-navy uppercase mb-1.5">
                  Income Limit Cap (₹{filterIncome.toLocaleString()})
                </label>
                <input
                  type="range"
                  min={100000}
                  max={1000000}
                  step={50000}
                  value={filterIncome}
                  onChange={(e) => setFilterIncome(Number(e.target.value))}
                  className="w-full accent-primary mt-1"
                />
                <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹10 Lakhs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Mascot Quote */}
          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state={buddyState}
              message={buddyMsg}
              bubblePosition="bottom"
              size={120}
            />
          </div>

        </div>

        {/* Right Side Panel: Scholarships Cards List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] min-h-[460px] flex flex-col">
            
            <div className="border-b-4 border-navy pb-5 mb-6 text-left">
              <span className="text-xs bg-navy text-white font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">
                Financial Aid Portal
              </span>
              <h2 className="text-3xl font-black font-fredoka text-navy mt-2">
                Scholarship Schemes Hub
              </h2>
            </div>

            {/* List */}
            <div className="flex-1 space-y-6">
              {filteredScholarships.length > 0 ? (
                filteredScholarships.map((sch) => {
                  const isApplied = appliedIds.includes(sch.id);
                  return (
                    <div
                      key={sch.id}
                      className="cartoon-card-flat p-5 border-2 border-navy bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left"
                    >
                      <div className="space-y-3 flex-1">
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase">{sch.provider}</p>
                          <h4 className="font-extrabold text-navy text-base font-fredoka mt-0.5">{sch.name}</h4>
                        </div>

                        {/* Badges details info */}
                        <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                          <span className="bg-sky-50 border border-sky-300 px-2 py-0.5 rounded-md text-sky-800">
                            🌍 State: {sch.state}
                          </span>
                          <span className="bg-purple-50 border border-purple-300 px-2 py-0.5 rounded-md text-purple-800">
                            👥 Category: {sch.category}
                          </span>
                          <span className="bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-md text-amber-800">
                            💰 Income: {sch.incomeLimit}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-slate-500 leading-relaxed">
                          <p><strong className="text-navy font-bold">Eligibility: </strong>{sch.eligibility}</p>
                          <p className="mt-1"><strong className="text-navy font-bold">Benefits: </strong>
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-extrabold">
                              {sch.benefits}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Deadline & button panel */}
                      <div className="flex flex-col items-stretch md:items-end gap-3 shrink-0 w-full md:w-auto">
                        <div className="text-left md:text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 md:justify-end">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Deadline Date</span>
                          </p>
                          <p className="text-xs font-extrabold text-rose-500 font-fredoka mt-0.5">{sch.deadline}</p>
                        </div>

                        <button
                          onClick={() => handleApply(sch.id)}
                          className={`cartoon-btn px-4 py-2.5 text-xs font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
                            isApplied
                              ? "bg-slate-300 text-slate-600 border-slate-400 flex items-center gap-1"
                              : "cartoon-btn-yellow"
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Applied</span>
                            </>
                          ) : (
                            <span>Apply Now 🚀</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Empty state
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                  <span className="text-5xl mb-4">🔎</span>
                  <h4 className="font-extrabold text-navy text-sm font-fredoka">No matching scholarships</h4>
                  <p className="text-xs font-bold text-slate-400 max-w-xs mt-1">
                    Try adjusting the income slider caps or choosing General/All states category to explore more schemes.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
