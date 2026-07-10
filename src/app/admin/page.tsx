"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import confetti from "canvas-confetti";
import { Shield, Sparkles, Send, Upload, Award, FileText, BarChart as ChartIcon, Users, DollarSign, Bell, Plus, Trash2, CheckCircle2, Ticket, Edit3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type StudentData = {
  id: number;
  name: string;
  board: string;
  status: "Active" | "Trial" | "Expired";
  joined: string;
};

type AdminScholarship = {
  id: number;
  name: string;
  provider: string;
  state: string;
  category: string;
  incomeLimit: string;
  maxIncome: number;
  eligibility: string;
  benefits: string;
  deadline: string;
};

type AdminChapter = {
  id: number;
  name: string;
  desc: string;
  summary: string;
  formulas: string[];
  questions: { q: string; a: string }[];
  flashcards: { front: string; back: string }[];
};

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"analytics" | "students" | "notes" | "scholarships" | "system">("analytics");
  
  // Interactive analytics statistics
  const [revenue, setRevenue] = useState(48260);
  const [stats, setStats] = useState({
    activeStudents: 1240,
    dailyUsers: 780,
    conversions: 84,
  });

  // State collections persisted in localStorage
  const [students, setStudents] = useState<StudentData[]>([]);
  const [coupons, setCoupons] = useState<string[]>([]);
  const [broadcastText, setBroadcastText] = useState("");
  const [currentBroadcast, setCurrentBroadcast] = useState("");

  // Syllabus publisher states
  const [targetSubject, setTargetSubject] = useState("Mathematics");
  const [newChapName, setNewChapName] = useState("");
  const [newChapDesc, setNewChapDesc] = useState("");
  const [newChapSummary, setNewChapSummary] = useState("");
  const [newChapFormula, setNewChapFormula] = useState("");
  const [newChapQuestion, setNewChapQuestion] = useState("");
  const [newChapAnswer, setNewChapAnswer] = useState("");

  // Scholarship builder states
  const [schName, setSchName] = useState("");
  const [schProvider, setSchProvider] = useState("");
  const [schState, setSchState] = useState("National");
  const [schCategory, setSchCategory] = useState("All Categories");
  const [schIncome, setSchIncome] = useState("Below ₹3.0 Lakhs");
  const [schMaxIncome, setSchMaxIncome] = useState(300000);
  const [schBenefits, setSchBenefits] = useState("");
  const [schEligibility, setSchEligibility] = useState("");
  const [schDeadline, setSchDeadline] = useState("");

  // Directory states
  const [allChapters, setAllChapters] = useState<{ subjectName: string; chapter: any }[]>([]);
  const [allScholarships, setAllScholarships] = useState<AdminScholarship[]>([]);

  // Mascot dynamic messages
  const [buddyMsg, setBuddyMsg] = useState("Welcome back to the Vidyatraa Command Deck! Tap any control tab to execute operations. 🛡️");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("idle");

  const refreshChaptersList = () => {
    const storedRes = localStorage.getItem("vidyatraa_resources_list");
    if (storedRes) {
      try {
        const parsed = JSON.parse(storedRes);
        const list: { subjectName: string; chapter: any }[] = [];
        parsed.forEach((sub: any) => {
          sub.chapters.forEach((chap: any) => {
            list.push({ subjectName: sub.name, chapter: chap });
          });
        });
        setAllChapters(list);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const refreshScholarshipsList = () => {
    const storedSch = localStorage.getItem("vidyatraa_scholarships_list");
    if (storedSch) {
      try {
        setAllScholarships(JSON.parse(storedSch));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    setMounted(true);

    // Initial load from localStorage
    let currentStudents: StudentData[] = [];
    const storedStudents = localStorage.getItem("vidyatraa_students_list");
    if (storedStudents) {
      try {
        currentStudents = JSON.parse(storedStudents);
      } catch (e) {
        console.error(e);
      }
    } else {
      currentStudents = [
        { id: 1, name: "Aryan Sen", board: "ICSE", status: "Active", joined: "06/12" },
        { id: 2, name: "Sneha Reddy", board: "CBSE", status: "Active", joined: "06/15" },
        { id: 3, name: "Varun Malhotra", board: "CBSE", status: "Trial", joined: "07/02" },
        { id: 4, name: "Priya Nair", board: "Telangana SSC", status: "Expired", joined: "05/18" },
      ];
    }

    // Dynamic injection of active logged-in student
    const storedLogged = localStorage.getItem("vidyatraa_student");
    if (storedLogged) {
      try {
        const logged = JSON.parse(storedLogged);
        const exists = currentStudents.some((s) => s.name.toLowerCase() === logged.name.toLowerCase());
        if (!exists) {
          currentStudents.unshift({
            id: Date.now(),
            name: logged.name,
            board: logged.board || "CBSE",
            status: logged.status || "Active",
            joined: "Today"
          });
        } else {
          // Sync state matches
          const matched = currentStudents.find((s) => s.name.toLowerCase() === logged.name.toLowerCase());
          if (matched && matched.status !== logged.status) {
            logged.status = matched.status;
            localStorage.setItem("vidyatraa_student", JSON.stringify(logged));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    setStudents(currentStudents);
    localStorage.setItem("vidyatraa_students_list", JSON.stringify(currentStudents));

    const storedCoupons = localStorage.getItem("vidyatraa_coupons");
    if (storedCoupons) {
      setCoupons(JSON.parse(storedCoupons));
    } else {
      const baseCoupons = ["BUDDY20", "ACE100", "PASS69"];
      setCoupons(baseCoupons);
      localStorage.setItem("vidyatraa_coupons", JSON.stringify(baseCoupons));
    }

    const storedBroadcast = localStorage.getItem("vidyatraa_broadcast");
    if (storedBroadcast) {
      setCurrentBroadcast(storedBroadcast);
    }

    refreshChaptersList();
    refreshScholarshipsList();
  }, []);

  // System Analytics Data Sets
  const earningsData = [
    { name: "Week 1", amount: 8200 },
    { name: "Week 2", amount: 12400 },
    { name: "Week 3", amount: 15300 },
    { name: "Week 4", amount: 20160 },
  ];

  const conversionsData = [
    { name: "Free Trial", count: 420 },
    { name: "Pro Access", count: 760 },
    { name: "Classroom Pass", count: 60 },
  ];

  // Actions
  const handleToggleStatus = (id: number) => {
    const updated = students.map((s) => {
      if (s.id === id) {
        const nextStatus: "Active" | "Expired" | "Trial" =
          s.status === "Active" ? "Expired" : "Active";
        
        // Also update currently logged-in student if names match!
        const storedLogged = localStorage.getItem("vidyatraa_student");
        if (storedLogged) {
          try {
            const logged = JSON.parse(storedLogged);
            if (logged.name.toLowerCase() === s.name.toLowerCase()) {
              logged.status = nextStatus;
              localStorage.setItem("vidyatraa_student", JSON.stringify(logged));
            }
          } catch (e) {
            console.error(e);
          }
        }
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setStudents(updated);
    localStorage.setItem("vidyatraa_students_list", JSON.stringify(updated));
    setBuddyState("happy");
    setBuddyMsg("Student subscription status toggled successfully! Sync active. 🔄");
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;

    localStorage.setItem("vidyatraa_broadcast", broadcastText);
    setCurrentBroadcast(broadcastText);
    setBroadcastText("");
    setBuddyState("cheer");
    setBuddyMsg("Success! Notification banner pushed live to student dashboards. 📣");

    confetti({ particleCount: 30, spread: 40 });
  };

  const handleClearBroadcast = () => {
    localStorage.removeItem("vidyatraa_broadcast");
    setCurrentBroadcast("");
    setBuddyState("idle");
    setBuddyMsg("System banner alert dismissed from all user platforms.");
  };

  const handleCreateCoupon = () => {
    const randomCode = `BUDDY${Math.floor(Math.random() * 900) + 100}`;
    const nextCoupons = [...coupons, randomCode];
    setCoupons(nextCoupons);
    localStorage.setItem("vidyatraa_coupons", JSON.stringify(nextCoupons));
    setBuddyState("happy");
    setBuddyMsg(`Gained +1 coupon: ${randomCode}! Active in Landing Checkout.`);

    confetti({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
  };

  const handleDeleteCoupon = (code: string) => {
    const nextCoupons = coupons.filter((c) => c !== code);
    setCoupons(nextCoupons);
    localStorage.setItem("vidyatraa_coupons", JSON.stringify(nextCoupons));
    setBuddyState("thinking");
    setBuddyMsg(`Promo code ${code} deleted from database.`);
  };

  const handlePublishChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapName.trim() || !newChapSummary.trim()) {
      alert("Please enter a chapter name and summary notes!");
      return;
    }

    const storedRes = localStorage.getItem("vidyatraa_resources_list");
    let resourcesDatabase: any[] = [];
    if (storedRes) {
      resourcesDatabase = JSON.parse(storedRes);
    }

    const nextChapter: AdminChapter = {
      id: Date.now(),
      name: newChapName,
      desc: newChapDesc || "Extra syllabus material loaded by Content Team.",
      summary: newChapSummary,
      formulas: newChapFormula ? [newChapFormula] : ["No formula cheat sheet appended."],
      questions: [
        {
          q: newChapQuestion || "General high-yield board question?",
          a: newChapAnswer || "Refer to detailed textbook pages."
        }
      ],
      flashcards: [
        { front: "Concept definition review", back: "Refer to chapter glossary notes." }
      ]
    };

    const subjectIndex = resourcesDatabase.findIndex((sub) => sub.name === targetSubject);
    if (subjectIndex !== -1) {
      resourcesDatabase[subjectIndex].chapters.push(nextChapter);
    } else {
      resourcesDatabase.push({
        name: targetSubject,
        emoji: targetSubject === "Mathematics" ? "📐" : targetSubject === "Science" ? "🧪" : "🌍",
        color: "bg-indigo-100 border-indigo-400 text-indigo-800",
        badgeColor: "bg-indigo-400 text-white",
        chapters: [nextChapter]
      });
    }

    localStorage.setItem("vidyatraa_resources_list", JSON.stringify(resourcesDatabase));
    
    // Clear inputs
    setNewChapName("");
    setNewChapDesc("");
    setNewChapSummary("");
    setNewChapFormula("");
    setNewChapQuestion("");
    setNewChapAnswer("");

    refreshChaptersList();
    setBuddyState("cheer");
    setBuddyMsg(`Chapter published! "${newChapName}" is now active in ${targetSubject} Resources list! 📚`);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleDeleteChapter = (subjectName: string, chapId: number) => {
    const storedRes = localStorage.getItem("vidyatraa_resources_list");
    if (storedRes) {
      try {
        const parsed = JSON.parse(storedRes);
        const nextDatabase = parsed.map((sub: any) => {
          if (sub.name === subjectName) {
            return {
              ...sub,
              chapters: sub.chapters.filter((c: any) => c.id !== chapId)
            };
          }
          return sub;
        });
        localStorage.setItem("vidyatraa_resources_list", JSON.stringify(nextDatabase));
        refreshChaptersList();
        setBuddyState("thinking");
        setBuddyMsg("Chapter deleted successfully and synchronized! 🗑️");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleEditChapter = (subjectName: string, chap: any) => {
    setTargetSubject(subjectName);
    setNewChapName(chap.name);
    setNewChapDesc(chap.desc);
    setNewChapSummary(chap.summary);
    setNewChapFormula(chap.formulas?.[0] || "");
    setNewChapQuestion(chap.questions?.[0]?.q || "");
    setNewChapAnswer(chap.questions?.[0]?.a || "");
    
    handleDeleteChapter(subjectName, chap.id);
    
    setBuddyState("wave");
    setBuddyMsg(`Chapter "${chap.name}" loaded into editor! Edit fields and click Publish.`);
  };

  const handlePublishScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schName.trim() || !schBenefits.trim()) {
      alert("Please provide the scheme name and benefits description!");
      return;
    }

    const storedSch = localStorage.getItem("vidyatraa_scholarships_list");
    let scholarshipDatabase: AdminScholarship[] = [];
    if (storedSch) {
      scholarshipDatabase = JSON.parse(storedSch);
    }

    const nextSch: AdminScholarship = {
      id: Date.now(),
      name: schName,
      provider: schProvider || "National Board Support Fund",
      state: schState,
      category: schCategory,
      incomeLimit: schIncome,
      maxIncome: schMaxIncome,
      eligibility: schEligibility || "Class 10 completed with 60% standard passing score.",
      benefits: schBenefits,
      deadline: schDeadline || "28th Feb 2027",
    };

    scholarshipDatabase.push(nextSch);
    localStorage.setItem("vidyatraa_scholarships_list", JSON.stringify(scholarshipDatabase));

    // Clear inputs
    setSchName("");
    setSchProvider("");
    setSchBenefits("");
    setSchEligibility("");
    setSchDeadline("");

    refreshScholarshipsList();
    setBuddyState("cheer");
    setBuddyMsg(`Scholarship published! "${schName}" is now active in Scholarship Hub! 💡`);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleDeleteScholarship = (schId: number) => {
    const storedSch = localStorage.getItem("vidyatraa_scholarships_list");
    if (storedSch) {
      try {
        const parsed = JSON.parse(storedSch);
        const updated = parsed.filter((s: any) => s.id !== schId);
        localStorage.setItem("vidyatraa_scholarships_list", JSON.stringify(updated));
        refreshScholarshipsList();
        setBuddyState("thinking");
        setBuddyMsg("Scholarship scheme deleted successfully from database! 🗑️");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleEditScholarship = (sch: AdminScholarship) => {
    setSchName(sch.name);
    setSchProvider(sch.provider);
    setSchState(sch.state);
    setSchCategory(sch.category);
    setSchIncome(sch.incomeLimit);
    setSchMaxIncome(sch.maxIncome);
    setSchBenefits(sch.benefits);
    setSchEligibility(sch.eligibility);
    setSchDeadline(sch.deadline);

    handleDeleteScholarship(sch.id);

    setBuddyState("wave");
    setBuddyMsg(`Scholarship "${sch.name}" loaded into editor! Edit fields and click Publish.`);
  };

  const loadNotesTemplate = (subject: string) => {
    if (subject === "Mathematics") {
      setTargetSubject("Mathematics");
      setNewChapName("Arithmetic Progressions");
      setNewChapDesc("Formulas for nth term, sum of n terms, and real problems.");
      setNewChapSummary("An arithmetic progression (AP) is a sequence of numbers in which the difference between consecutive terms is constant. This difference is called the common difference 'd'.");
      setNewChapFormula("nth Term: an = a + (n-1)d | Sum: Sn = n/2 * (2a + (n-1)d)");
      setNewChapQuestion("Find the 10th term of AP: 2, 7, 12...");
      setNewChapAnswer("Here a=2, d=5. a10 = 2 + (10-1)*5 = 2 + 45 = 47.");
      setBuddyState("happy");
      setBuddyMsg("Loaded Mathematics 'Arithmetic Progressions' template notes!");
    } else if (subject === "Science") {
      setTargetSubject("Science");
      setNewChapName("Light - Reflection");
      setNewChapDesc("Spherical mirrors, mirror formula, magnification and refraction laws.");
      setNewChapSummary("Reflection of light is the phenomenon of bouncing back of light rays when they hit a surface. Spherical mirrors include concave (converging) and convex (diverging) mirrors.");
      setNewChapFormula("Mirror Formula: 1/f = 1/v + 1/u | Magnification: m = -v/u");
      setNewChapQuestion("A concave mirror has focal length 10cm. If u = -15cm, find image position v.");
      setNewChapAnswer("1/v = 1/f - 1/u = 1/-10 - 1/-15 = -3/30 + 2/30 = -1/30. So v = -30cm.");
      setBuddyState("happy");
      setBuddyMsg("Loaded Science 'Light - Reflection' template notes!");
    }
  };

  const loadSchTemplate = () => {
    setSchName("Prime Minister's Special Scholarship Scheme (PMSSS)");
    setSchProvider("AICTE, Central Government");
    setSchState("National");
    setSchCategory("SC / ST / OBC");
    setSchIncome("Below ₹8.0 Lakhs");
    setSchMaxIncome(800000);
    setSchBenefits("Full academic tuition fee waiver & ₹10,000 monthly maintenance allowance.");
    setSchEligibility("Class 10 completed with 70%+ from CBSE/State boards.");
    setSchDeadline("30th Dec 2026");
    setBuddyState("happy");
    setBuddyMsg("Loaded Prime Minister's PMSSS scholarship template details!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: System status & Mascot */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="cartoon-card p-6 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-left">
            <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4 flex items-center gap-1.5">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span>Admin Console</span>
            </h3>

            <div className="space-y-4 text-xs font-bold text-slate-500">
              <p>You have full developer access to upload files, generate discount vouchers, and override user accounts in local session state.</p>
              
              <div className="bg-slate-100 border-2 border-navy rounded-xl p-3.5 flex justify-between items-center text-navy font-extrabold shadow-sm">
                <div>
                  <p className="text-[10px] text-slate-400">ACTIVE SESSION</p>
                  <p className="text-xs font-fredoka text-indigo-600">Dev Mode Active</p>
                </div>
                <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full border border-navy animate-pulse">
                  SYSTEM OK
                </span>
              </div>
            </div>
          </div>

          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state={buddyState}
              message={buddyMsg}
              bubblePosition="bottom"
              size={120}
            />
          </div>
        </div>

        {/* Right Side: Command tabs */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="cartoon-card p-6 md:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] min-h-[460px] flex flex-col text-left">
            
            <div className="border-b-4 border-navy pb-5 mb-6">
              <span className="text-xs bg-navy text-white font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">
                System Command Center
              </span>
              <h2 className="text-3xl font-black font-fredoka text-navy mt-2">
                Administration Panel
              </h2>
            </div>

            {/* Menu tab items */}
            <div className="grid grid-cols-5 border-b-2 border-navy text-center font-extrabold text-[10px] md:text-xs text-navy mb-6 bg-white">
              {(["analytics", "students", "notes", "scholarships", "system"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setBuddyState("idle");
                  }}
                  className={`py-3 capitalize border-r border-slate-200 transition-all ${
                    activeTab === tab ? "bg-amber-100 text-amber-900 border-b-2 border-b-amber-500 font-black" : "hover:bg-slate-50"
                  }`}
                >
                  {tab === "analytics" ? "📊 Stats" : tab === "students" ? "👥 Users" : tab === "notes" ? "📚 Notes" : tab === "scholarships" ? "💡 Aid" : "⚙️ Alerts"}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="flex-1">
              {/* TAB 1: SYSTEM ANALYTICS */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  {/* Stats KPIs row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border-2 border-navy rounded-2xl flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400">TOTAL EARNINGS</p>
                        <p className="font-extrabold text-sm text-navy">₹{revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 border-2 border-navy rounded-2xl flex items-center gap-3">
                      <Users className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400">ACTIVE STUDENTS</p>
                        <p className="font-extrabold text-sm text-navy">{stats.activeStudents} users</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 border-2 border-navy rounded-2xl flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400">DAILY USERS</p>
                        <p className="font-extrabold text-sm text-navy">{stats.dailyUsers} active</p>
                      </div>
                    </div>
                  </div>

                  {/* Recharts graphs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-navy rounded-2xl p-4 bg-white">
                      <h4 className="font-extrabold text-xs text-navy uppercase mb-3">Weekly Gross Earnings</h4>
                      <div className="h-44 w-full">
                        {mounted && (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="name" stroke="#64748b" fontSize={9} fontWeight={800} />
                              <YAxis stroke="#64748b" fontSize={9} fontWeight={800} />
                              <Tooltip contentStyle={{ fontSize: "10px" }} />
                              <Area type="monotone" dataKey="amount" stroke="#059669" fill="#d1fae5" strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    <div className="border-2 border-navy rounded-2xl p-4 bg-white">
                      <h4 className="font-extrabold text-xs text-navy uppercase mb-3">Account Conversions</h4>
                      <div className="h-44 w-full">
                        {mounted && (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionsData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="name" stroke="#64748b" fontSize={9} fontWeight={800} />
                              <YAxis stroke="#64748b" fontSize={9} fontWeight={800} />
                              <Tooltip contentStyle={{ fontSize: "10px" }} />
                              <Bar dataKey="count" fill="#38bdf8" stroke="#0f172a" strokeWidth={2} radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MANAGE STUDENTS */}
              {activeTab === "students" && (
                <div className="space-y-4">
                  <h3 className="font-extrabold font-fredoka text-navy text-base mb-2">Student Directory</h3>
                  
                  <div className="space-y-2.5">
                    {students.map((stud) => (
                      <div
                        key={stud.id}
                        className="cartoon-card-flat p-4 bg-slate-50 border-2 border-navy flex justify-between items-center text-xs font-bold"
                      >
                        <div className="text-left">
                          <p className="text-navy text-sm font-fredoka">{stud.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Joined {stud.joined} | Board: {stud.board}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black border ${
                            stud.status === "Active"
                              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                              : stud.status === "Trial"
                              ? "bg-sky-50 border-sky-300 text-sky-800"
                              : "bg-rose-50 border-rose-300 text-rose-800"
                          }`}>
                            {stud.status}
                          </span>

                          <button
                            onClick={() => handleToggleStatus(stud.id)}
                            className="cartoon-btn cartoon-btn-white text-[10px] px-3 py-1.5 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                          >
                            Toggle Status
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PUBLISH NOTES */}
              {activeTab === "notes" && (
                <div className="space-y-6">
                  <form onSubmit={handlePublishChapter} className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-extrabold font-fredoka text-navy text-base">Publish Class 10 Syllabus Notes</h3>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => loadNotesTemplate("Mathematics")}
                          className="bg-sky-50 text-sky-700 border border-sky-300 rounded-lg px-2.5 py-1 font-bold text-[10px] hover:bg-sky-100"
                        >
                          Load Math AP Template
                        </button>
                        <button
                          type="button"
                          onClick={() => loadNotesTemplate("Science")}
                          className="bg-indigo-50 text-indigo-700 border border-indigo-300 rounded-lg px-2.5 py-1 font-bold text-[10px] hover:bg-indigo-100"
                        >
                          Load Science Light Template
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Subject</label>
                        <select
                          value={targetSubject}
                          onChange={(e) => setTargetSubject(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-bold bg-white text-navy focus:outline-none"
                        >
                          <option value="Mathematics">📐 Mathematics</option>
                          <option value="Science">🧪 Science</option>
                          <option value="Social Studies">🌍 Social Studies</option>
                          <option value="English">📖 English</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Chapter Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Coordinate Geometry"
                          value={newChapName}
                          onChange={(e) => setNewChapName(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-navy uppercase mb-1">Brief Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Distance formula, section formula, and area calculations."
                        value={newChapDesc}
                        onChange={(e) => setNewChapDesc(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-navy uppercase mb-1">Syllabus Summary Notes</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detailed revision points to render in browser PDF preview overlay..."
                        value={newChapSummary}
                        onChange={(e) => setNewChapSummary(e.target.value)}
                        className="w-full p-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Key Formula</label>
                        <input
                          type="text"
                          placeholder="Distance = √((x2-x1)² + (y2-y1)²)"
                          value={newChapFormula}
                          onChange={(e) => setNewChapFormula(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Practice Question</label>
                        <input
                          type="text"
                          placeholder="Find distance between (2,3) & (4,1)."
                          value={newChapQuestion}
                          onChange={(e) => setNewChapQuestion(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Question Answer</label>
                        <input
                          type="text"
                          placeholder="Distance is √((4-2)² + (1-3)²) = √8 = 2√2."
                          value={newChapAnswer}
                          onChange={(e) => setNewChapAnswer(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full cartoon-btn cartoon-btn-yellow py-3 text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Chapter to Resources 🚀</span>
                    </button>
                  </form>

                  {/* Published Resources Inventory Table */}
                  <div className="mt-8 pt-6 border-t-2 border-slate-100">
                    <h4 className="font-extrabold text-navy font-fredoka text-sm mb-3">Published Notes Inventory</h4>
                    <div className="space-y-2">
                      {allChapters.length === 0 ? (
                        <p className="text-xs font-bold text-slate-400 italic">No custom notes uploaded yet.</p>
                      ) : (
                        allChapters.map(({ subjectName, chapter }) => (
                          <div key={chapter.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs font-bold shadow-sm">
                            <div className="text-left">
                              <span className="bg-navy text-white text-[9px] font-black px-2.5 py-0.5 rounded-full mr-2">
                                {subjectName}
                              </span>
                              <span className="text-navy font-extrabold">{chapter.name}</span>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{chapter.desc}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleEditChapter(subjectName, chapter)}
                                className="bg-sky-50 text-sky-600 border border-sky-300 px-2.5 py-1 rounded-lg hover:bg-sky-100 font-bold"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteChapter(subjectName, chapter.id)}
                                className="bg-rose-50 text-rose-600 border border-rose-300 px-2.5 py-1 rounded-lg hover:bg-rose-100 font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PUBLISH SCHOLARSHIPS */}
              {activeTab === "scholarships" && (
                <div className="space-y-6">
                  <form onSubmit={handlePublishScholarship} className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-extrabold font-fredoka text-navy text-base">Publish Scholarship Card</h3>
                      <button
                        type="button"
                        onClick={loadSchTemplate}
                        className="bg-sky-50 text-sky-700 border border-sky-300 rounded-lg px-2.5 py-1 font-bold text-[10px] hover:bg-sky-100"
                      >
                        Load National PMSSS Template
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Scheme Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. National Merit Support"
                          value={schName}
                          onChange={(e) => setSchName(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Provider Agency</label>
                        <input
                          type="text"
                          placeholder="e.g. Ministry of HRD, India"
                          value={schProvider}
                          onChange={(e) => setSchProvider(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Deadline Date</label>
                        <input
                          type="text"
                          placeholder="e.g. 31st Jan 2027"
                          value={schDeadline}
                          onChange={(e) => setSchDeadline(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Board State</label>
                        <select
                          value={schState}
                          onChange={(e) => setSchState(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-bold bg-white text-navy focus:outline-none"
                        >
                          <option value="National">National Level</option>
                          <option value="Telangana SSC">Telangana SSC</option>
                          <option value="Andhra Pradesh SSC">Andhra Pradesh SSC</option>
                          <option value="CBSE">CBSE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Category</label>
                        <select
                          value={schCategory}
                          onChange={(e) => setSchCategory(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-bold bg-white text-navy focus:outline-none"
                        >
                          <option value="All Categories">All Categories</option>
                          <option value="SC / ST / OBC">SC / ST / OBC</option>
                          <option value="EWS / General">EWS / General</option>
                          <option value="Single Girl Child">Single Girl Child</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Income limits text</label>
                        <input
                          type="text"
                          placeholder="Below ₹3.0 Lakhs"
                          value={schIncome}
                          onChange={(e) => setSchIncome(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Max Income Cap (Rupees)</label>
                        <input
                          type="number"
                          placeholder="300000"
                          value={schMaxIncome}
                          onChange={(e) => setSchMaxIncome(Number(e.target.value))}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Eligibility Criteria</label>
                        <input
                          type="text"
                          placeholder="Class 10 completed with 60%+"
                          value={schEligibility}
                          onChange={(e) => setSchEligibility(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-navy uppercase mb-1">Scholarship Benefits</label>
                        <input
                          type="text"
                          placeholder="Full tuition cover & ₹2,000 monthly allowance"
                          value={schBenefits}
                          onChange={(e) => setSchBenefits(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full cartoon-btn cartoon-btn-yellow py-3 text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Scholarship Scheme 🚀</span>
                    </button>
                  </form>

                  {/* Published Scholarships Inventory Table */}
                  <div className="mt-8 pt-6 border-t-2 border-slate-100">
                    <h4 className="font-extrabold text-navy font-fredoka text-sm mb-3">Published Scholarships Inventory</h4>
                    <div className="space-y-2">
                      {allScholarships.length === 0 ? (
                        <p className="text-xs font-bold text-slate-400 italic">No scholarship awards published yet.</p>
                      ) : (
                        allScholarships.map((sch) => (
                          <div key={sch.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs font-bold shadow-sm">
                            <div className="text-left">
                              <span className="bg-indigo-100 text-indigo-700 text-[9px] font-black px-2.5 py-0.5 rounded-full mr-2 border border-indigo-300">
                                {sch.state}
                              </span>
                              <span className="text-navy font-extrabold">{sch.name}</span>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">Benefits: {sch.benefits}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleEditScholarship(sch)}
                                className="bg-sky-50 text-sky-600 border border-sky-300 px-2.5 py-1 rounded-lg hover:bg-sky-100 font-bold"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteScholarship(sch.id)}
                                className="bg-rose-50 text-rose-600 border border-rose-300 px-2.5 py-1 rounded-lg hover:bg-rose-100 font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BROADCAST ALERTS & COUPONS */}
              {activeTab === "system" && (
                <div className="space-y-8">
                  {/* Alert Broadcast */}
                  <form onSubmit={handleBroadcast} className="space-y-3 border-b border-slate-200 pb-6 text-left">
                    <h4 className="font-extrabold text-navy font-fredoka text-sm mb-2 flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-rose-500" />
                      <span>Dashboard Banner Broadcast Alert</span>
                    </h4>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Type banner message (e.g. CBSE Mock exam starts tomorrow!)"
                        value={broadcastText}
                        onChange={(e) => setBroadcastText(e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-navy rounded-xl text-xs font-semibold focus:outline-none bg-white text-navy"
                      />
                      <button
                        type="submit"
                        className="cartoon-btn cartoon-btn-sky text-xs px-4 py-2.5 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0"
                      >
                        Push Alert
                      </button>
                    </div>

                    {currentBroadcast && (
                      <div className="mt-2.5 p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between text-xs font-bold text-rose-900">
                        <span className="truncate pr-4">Active Alert: &ldquo;{currentBroadcast}&rdquo;</span>
                        <button
                          type="button"
                          onClick={handleClearBroadcast}
                          className="text-[9px] bg-white border border-rose-400 text-rose-500 px-2 py-1 rounded hover:bg-rose-100"
                        >
                          Clear Alert
                        </button>
                      </div>
                    )}
                  </form>

                  {/* Coupon Codes Panel */}
                  <div className="text-left space-y-4">
                    <h4 className="font-extrabold text-navy font-fredoka text-sm mb-2 flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-amber-500" />
                      <span>System Coupon Manager</span>
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {coupons.map((code) => (
                        <div
                          key={code}
                          className="flex items-center gap-1 bg-slate-50 border-2 border-navy rounded-lg px-2.5 py-1 text-xs font-black text-navy"
                        >
                          <span>{code}</span>
                          <button
                            onClick={() => handleDeleteCoupon(code)}
                            title="Delete Coupon"
                            className="text-rose-500 hover:bg-rose-50 rounded p-0.5 ml-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleCreateCoupon}
                      className="cartoon-btn cartoon-btn-yellow text-xs px-4 py-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    >
                      Generate New Promo Coupon 🏷️
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Sparkles placeholder to prevent Lucide imports from failing
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
    </svg>
  );
}

