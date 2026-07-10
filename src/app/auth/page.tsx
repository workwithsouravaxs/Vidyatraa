"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Sparkles, BookOpen, Star, Target, CheckCircle2 } from "lucide-react";
import BuddyMascot from "@/components/BuddyMascot";

type OnboardingData = {
  name: string;
  grade: string;
  board: string;
  school: string;
  goal: string;
  expectedPercentage: string;
  xp: number;
  coins: number;
  level: number;
  streak: number;
  missionCompleted: boolean;
};

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup" | "onboarding">("login");
  const [authMethod, setAuthMethod] = useState<"email" | "otp" | "google">("email");

  // Onboarding wizard steps
  const [onboardStep, setOnboardStep] = useState(1);
  const [onboardData, setOnboardData] = useState<OnboardingData>({
    name: "",
    grade: "Class 10",
    board: "CBSE",
    school: "",
    goal: "Get into Top Science Stream",
    expectedPercentage: "95%+",
    xp: 120, // Starting bonus!
    coins: 50,
    level: 1,
    streak: 1,
    missionCompleted: false,
  });

  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Mascot dynamic state
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("wave");
  const [buddyMsg, setBuddyMsg] = useState("Hey there! Ready to start our learning adventure? Choose an option!");

  useEffect(() => {
    const queryMode = searchParams.get("mode");
    if (queryMode === "signup") {
      setMode("signup");
      setBuddyMsg("Welcome! Let's sign you up and prepare to crush those Class 10 exams! 🚀");
    } else {
      setMode("login");
      setBuddyMsg("Welcome back, friend! Let's get logged in and resume our streak! 🔥");
    }
  }, [searchParams]);

  // Adjust Buddy comments based on onboarding steps
  useEffect(() => {
    if (mode !== "onboarding") return;

    if (onboardStep === 1) {
      setBuddyState("wave");
      setBuddyMsg("Hi! Let's start with the basics. What's your name, champ?");
    } else if (onboardStep === 2) {
      setBuddyState("thinking");
      setBuddyMsg("Awesome! Now, which board exam are you preparing for?");
    } else if (onboardStep === 3) {
      setBuddyState("idle");
      setBuddyMsg("Nice! Which school do you go to? It helps tailor your school ranking leaderboard.");
    } else if (onboardStep === 4) {
      setBuddyState("thinking");
      setBuddyMsg("Aim high! What target percentage are we aiming to score?");
    } else if (onboardStep === 5) {
      setBuddyState("happy");
      setBuddyMsg("One last thing: What is your primary study goal after 10th grade?");
    }
  }, [onboardStep, mode]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBuddyState("happy");
    setBuddyMsg("Login successful! Redirecting you to the deck...");
    
    // Create a mock student profile
    const defaultProfile = {
      name: "Rahul",
      grade: "Class 10",
      board: "CBSE",
      school: "Delhi Public School",
      goal: "Science Stream with Computer Science",
      expectedPercentage: "95%+",
      xp: 1250,
      coins: 340,
      level: 4,
      streak: 5,
    };
    localStorage.setItem("vidyatraa_student", JSON.stringify(defaultProfile));
    
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBuddyState("happy");
    setMode("onboarding");
  };

  const handleOnboardingNext = () => {
    if (onboardStep < 5) {
      setOnboardStep(onboardStep + 1);
    } else {
      // Completed Onboarding!
      setBuddyState("cheer");
      setBuddyMsg("Woohoo! You're all set! Check out your custom dashboard! 🎉");
      
      // Save data
      localStorage.setItem("vidyatraa_student", JSON.stringify(onboardData));
      
      // Fire confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#fbbf24", "#34d399", "#f97316"]
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  };

  const handleGoogleLogin = () => {
    setBuddyState("happy");
    setBuddyMsg("Google accounts connected! Logging you in...");
    
    const googleProfile = {
      name: "Aryan Sen",
      grade: "Class 10",
      board: "ICSE",
      school: "St. Xavier's Academy",
      goal: "Commerce with Applied Math",
      expectedPercentage: "90-95%",
      xp: 450,
      coins: 120,
      level: 2,
      streak: 3,
    };
    localStorage.setItem("vidyatraa_student", JSON.stringify(googleProfile));

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setBuddyState("happy");
    setBuddyMsg("We sent a magical 4-digit code to your phone! 📱");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-50 to-white py-12 px-4 relative">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 font-bold text-navy hover:text-primary transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Mascot guidance (Responsive sizing) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <BuddyMascot
            state={buddyState}
            message={buddyMsg}
            bubblePosition="bottom"
            size={160}
          />
        </div>

        {/* Right Side: Forms (Standard & Onboarding) */}
        <div className="md:col-span-7 w-full max-w-md mx-auto">
          <div className="cartoon-card p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] bg-white relative">
            <AnimatePresence mode="wait">
              {/* LOGIN MODE */}
              {mode === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-2xl font-extrabold font-fredoka text-navy mb-1 text-center">
                    Welcome Back!
                  </h2>
                  <p className="text-sm font-bold text-slate-400 text-center mb-6">
                    Log in to continue your streak! 🔥
                  </p>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Method Selector */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 border-2 border-navy rounded-xl text-xs font-bold text-navy">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMethod("email");
                          setOtpSent(false);
                        }}
                        className={`py-1.5 rounded-lg ${authMethod === "email" ? "bg-white border border-navy shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]" : "text-slate-500"}`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMethod("otp")}
                        className={`py-1.5 rounded-lg ${authMethod === "otp" ? "bg-white border border-navy shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]" : "text-slate-500"}`}
                      >
                        OTP Code
                      </button>
                    </div>

                    {authMethod === "email" ? (
                      <>
                        <div>
                          <label className="block text-xs font-extrabold text-navy uppercase mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="rahul@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-extrabold text-navy uppercase mb-1">Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-extrabold text-navy uppercase mb-1">Mobile Number</label>
                          <div className="flex gap-2">
                            <input
                              type="tel"
                              required
                              placeholder="9876543210"
                              className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none"
                            />
                            {!otpSent ? (
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                className="cartoon-btn cartoon-btn-sky text-xs px-4"
                              >
                                Send
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                className="cartoon-btn cartoon-btn-white text-xs px-3"
                              >
                                Resend
                              </button>
                            )}
                          </div>
                        </div>

                        {otpSent && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                            <label className="block text-xs font-extrabold text-navy uppercase mb-1">Enter 4-Digit OTP</label>
                            <input
                              type="text"
                              required
                              maxLength={4}
                              placeholder="1234"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                          </motion.div>
                        )}
                      </>
                    )}

                    <div className="flex justify-between items-center text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => {
                          setBuddyState("thinking");
                          setBuddyMsg("No worries! Just enter your email and click the 'Forgot link' we emailed. 😊");
                        }}
                        className="text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button type="submit" className="w-full cartoon-btn cartoon-btn-yellow py-3 text-sm">
                      Log In 🚀
                    </button>
                  </form>

                  {/* Google Login Separator */}
                  <div className="relative my-6 text-center">
                    <hr className="border-t-2 border-slate-200" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-bold text-slate-400">
                      OR
                    </span>
                  </div>

                  <button
                    onClick={handleGoogleLogin}
                    className="w-full cartoon-btn cartoon-btn-white py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <span className="text-base">🌐</span>
                    <span>Sign In with Google</span>
                  </button>

                  <p className="text-center font-bold text-xs text-slate-500 mt-6">
                    New to Vidyatraa?{" "}
                    <button onClick={() => setMode("signup")} className="text-primary hover:underline font-extrabold">
                      Create Account
                    </button>
                  </p>
                </motion.div>
              )}

              {/* SIGNUP MODE */}
              {mode === "signup" && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-2xl font-extrabold font-fredoka text-navy mb-1 text-center">
                    Create Study Account
                  </h2>
                  <p className="text-sm font-bold text-slate-400 text-center mb-6">
                    Unlock gamified learning for ₹69/mo! 🎁
                  </p>

                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold text-navy uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-navy uppercase mb-1">Create Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-navy uppercase mb-1">Confirm Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Confirm password"
                        className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none"
                      />
                    </div>

                    <button type="submit" className="w-full cartoon-btn cartoon-btn-yellow py-3 text-sm">
                      Next Step: Customize Profile ➡️
                    </button>
                  </form>

                  <div className="relative my-6 text-center">
                    <hr className="border-t-2 border-slate-200" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-bold text-slate-400">
                      OR
                    </span>
                  </div>

                  <button
                    onClick={handleGoogleLogin}
                    className="w-full cartoon-btn cartoon-btn-white py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <span className="text-base">🌐</span>
                    <span>Sign Up with Google</span>
                  </button>

                  <p className="text-center font-bold text-xs text-slate-500 mt-6">
                    Already registered?{" "}
                    <button onClick={() => setMode("login")} className="text-primary hover:underline font-extrabold">
                      Log In
                    </button>
                  </p>
                </motion.div>
              )}

              {/* ONBOARDING MODE */}
              {mode === "onboarding" && (
                <motion.div
                  key="onboarding"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        className={`w-3 h-3 rounded-full border border-navy transition-all ${
                          s <= onboardStep ? "bg-amber-400 scale-110" : "bg-slate-100"
                        }`}
                      ></div>
                    ))}
                  </div>

                  {/* Step 1: Name */}
                  {onboardStep === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-amber-500 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">Onboarding Wizard</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">
                        What should we call you?
                      </h3>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={onboardData.name}
                        onChange={(e) => setOnboardData({ ...onboardData, name: e.target.value })}
                        className="w-full px-4 py-3 border-3 border-navy rounded-xl text-base font-bold focus:outline-none"
                      />
                    </motion.div>
                  )}

                  {/* Step 2: Board */}
                  {onboardStep === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <BookOpen className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">Board Exam System</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">
                        Which exam board are you taking?
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {["CBSE", "ICSE", "Telangana SSC", "Andhra Pradesh SSC", "Other State Boards"].map((board) => (
                          <button
                            key={board}
                            type="button"
                            onClick={() => setOnboardData({ ...onboardData, board })}
                            className={`w-full text-left px-4 py-3 rounded-xl border-3 border-navy font-bold text-sm transition-all flex items-center justify-between ${
                              onboardData.board === board
                                ? "bg-sky-100 border-sky-600 text-sky-900 shadow-[2px_2px_0px_0px_#0284c7]"
                                : "bg-white hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            <span>{board}</span>
                            {onboardData.board === board && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: School */}
                  {onboardStep === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-rose-500 mb-2">
                        <Star className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">School Affiliation</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">
                        What is your school's name?
                      </h3>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kendriya Vidyalaya"
                        value={onboardData.school}
                        onChange={(e) => setOnboardData({ ...onboardData, school: e.target.value })}
                        className="w-full px-4 py-3 border-3 border-navy rounded-xl text-base font-bold focus:outline-none"
                      />
                    </motion.div>
                  )}

                  {/* Step 4: Expected Percentage */}
                  {onboardStep === 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-emerald-500 mb-2">
                        <Target className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">Target Objective</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">
                        What is your expected percentage?
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {["95%+", "90-95%", "85-90%", "80-85%", "75-80%", "70% or below"].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setOnboardData({ ...onboardData, expectedPercentage: pct })}
                            className={`px-3 py-3.5 rounded-xl border-3 border-navy font-bold text-sm text-center transition-all ${
                              onboardData.expectedPercentage === pct
                                ? "bg-emerald-100 border-emerald-600 text-emerald-900 shadow-[2px_2px_0px_0px_#059669]"
                                : "bg-white hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            {pct}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Study Goal */}
                  {onboardStep === 5 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-indigo-500 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">Future Path</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">
                        What is your primary goal after Class 10?
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          "Get into Top Science Stream (IIT / Medical)",
                          "Pursue Commerce Stream (CA / Management)",
                          "Explore Humanities & Arts Stream",
                          "Diploma / Polytechnic Courses",
                          "Skill Development & AI Careers",
                        ].map((goal) => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => setOnboardData({ ...onboardData, goal })}
                            className={`w-full text-left px-4 py-3.5 rounded-xl border-3 border-navy font-bold text-xs transition-all flex items-center justify-between ${
                              onboardData.goal === goal
                                ? "bg-indigo-100 border-indigo-600 text-indigo-900 shadow-[2px_2px_0px_0px_#4f46e5]"
                                : "bg-white hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            <span>{goal}</span>
                            {onboardData.goal === goal && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons for Onboarding */}
                  <div className="flex gap-3 mt-8">
                    {onboardStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setOnboardStep(onboardStep - 1)}
                        className="cartoon-btn cartoon-btn-white py-3 text-xs w-1/3"
                      >
                        ← Back
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={onboardStep === 1 && !onboardData.name.trim()}
                      onClick={handleOnboardingNext}
                      className={`cartoon-btn cartoon-btn-yellow py-3 text-xs flex-1 ${
                        onboardStep === 1 && !onboardData.name.trim() ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {onboardStep === 5 ? "Submit & Play! 🎉" : "Continue →"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-bold text-navy text-sm">
        <div className="w-10 h-10 border-4 border-dashed border-primary rounded-full animate-spin mb-4"></div>
        <span>Loading Vidyatraa Onboarding... 🚀</span>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}

