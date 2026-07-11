"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Sparkles, BookOpen, Star, Target, CheckCircle2 } from "lucide-react";
import { message } from "antd";
import { supabase } from "@/lib/supabase";
import BuddyMascot from "@/components/BuddyMascot";

type OnboardingData = {
  name: string;
  grade: string; // "School" | "UG" | "PG"
  board: string; // Course/Board chosen
  school: string; // School/Institute name
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
    grade: "School",
    board: "CBSE",
    school: "",
    goal: "Get into Top Science Stream (IIT / Medical)",
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

  // Signup form states (Controlled)
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Mascot dynamic state
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("wave");
  const [buddyMsg, setBuddyMsg] = useState("Hey there! Ready to start our learning adventure? Choose an option!");

  useEffect(() => {
    const queryMode = searchParams.get("mode");
    if (queryMode === "signup") {
      setMode("signup");
      setBuddyMsg("Welcome! Let's sign you up and customize your profile! 🚀");
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
      setBuddyMsg("Awesome! Now, which exam board or course are you preparing for?");
    } else if (onboardStep === 3) {
      const typeText = (onboardData.grade === "UG" || onboardData.grade === "PG") ? "institute" : "school";
      setBuddyState("idle");
      setBuddyMsg(`Nice! What is your ${typeText}'s name? It helps tailor your local leaderboard.`);
    } else if (onboardStep === 4) {
      setBuddyState("thinking");
      setBuddyMsg("Aim high! What target percentage or CGPA are we aiming to score?");
    } else if (onboardStep === 5) {
      setBuddyState("happy");
      setBuddyMsg("One last thing: What is your primary career or study goal?");
    }
  }, [onboardStep, mode, onboardData.grade]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBuddyState("thinking");
    setBuddyMsg("Verifying credentials...");
    try {
      if (authMethod === "email") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;

        // Fetch their profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        // Fetch onboarding signup info if profile not set fully
        const { data: signupData } = await supabase
          .from('website_signup')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        // Save local stats matching dashboard expectations
        const localProfile = {
          name: profileData?.full_name || signupData?.name || "Student",
          grade: profileData?.education_level || signupData?.category || "School",
          board: profileData?.board || signupData?.board_course || "CBSE",
          school: profileData?.school_institute || signupData?.school_institute || "School",
          goal: profileData?.goal || signupData?.goal || "Success",
          expectedPercentage: profileData?.academic_marks ? `${profileData.academic_marks}%` : signupData?.expected_percentage || "90%+",
          xp: profileData?.xp || 120,
          coins: profileData?.coins || 50,
          level: profileData?.level || 1,
          streak: profileData?.streak || 1,
        };

        localStorage.setItem("vidyatraa_student", JSON.stringify(localProfile));
        setBuddyState("happy");
        setBuddyMsg("Login successful! Redirecting you to the dashboard...");
        
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else {
        // OTP logic (mock verify for demo, fallback to email warning)
        setBuddyState("happy");
        setBuddyMsg("Verifying OTP code...");
        message.warning("SMS OTP requires phone configuration. Please log in using Email for direct access.");
      }
    } catch (err: any) {
      setBuddyState("thinking");
      setBuddyMsg("Oops! Verification failed. Check your credentials.");
      message.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    if (signupPassword.length < 6) {
      message.error("Password must be at least 6 characters long.");
      return;
    }
    setBuddyState("happy");
    setMode("onboarding");
  };

  const handleOnboardingNext = async () => {
    if (onboardStep < 5) {
      setOnboardStep(onboardStep + 1);
    } else {
      // Completed Onboarding!
      setLoading(true);
      setBuddyState("thinking");
      setBuddyMsg("Creating your secure Vidyatraa account... 🛡️");

      try {
        // 1. Sign up user in Supabase
        const { data, error } = await supabase.auth.signUp({
          email: signupEmail,
          password: signupPassword,
          options: {
            data: {
              full_name: onboardData.name,
            }
          }
        });

        if (error) throw error;
        if (!data.user) throw new Error("Failed to create user session.");

        // 2. Save details to website_signup table
        const { error: signupError } = await supabase
          .from('website_signup')
          .insert([{
            id: data.user.id,
            email: signupEmail,
            name: onboardData.name,
            category: onboardData.grade, // "School", "UG", "PG"
            board_course: onboardData.board,
            school_institute: onboardData.school,
            expected_percentage: onboardData.expectedPercentage,
            goal: onboardData.goal
          }]);

        if (signupError) console.error("Database save failed:", signupError);

        // 3. Upsert details to profiles table so they match auth logic
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: signupEmail,
            full_name: onboardData.name,
            mobile_number: "",
            state: onboardData.board.includes("State") ? onboardData.board : "All India",
            category: "General",
            address: "",
            annual_income: 0,
            education_level: onboardData.grade,
            academic_marks: parseFloat(onboardData.expectedPercentage.replace('%', '')) || 90,
            parent_occupation: "Other",
            special_status: "None",
            current_course: onboardData.board,
            role: 'student',
            xp: 120, // Starting bonus
            coins: 50,
            level: 1,
            streak: 1,
            board: onboardData.board,
            status: 'Active',
            updated_at: new Date().toISOString()
          });

        if (profileError) console.error("Profile save failed:", profileError);

        // 4. Save local representation matching App Expectations
        const updatedProfile = {
          name: onboardData.name,
          grade: onboardData.grade,
          board: onboardData.board,
          school: onboardData.school,
          goal: onboardData.goal,
          expectedPercentage: onboardData.expectedPercentage,
          xp: 120,
          coins: 50,
          level: 1,
          streak: 1,
        };
        localStorage.setItem("vidyatraa_student", JSON.stringify(updatedProfile));

        setBuddyState("cheer");
        setBuddyMsg("Woohoo! You're all set! Check out your custom dashboard! 🎉");

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

      } catch (err: any) {
        setBuddyState("thinking");
        setBuddyMsg("Account creation failed. Please check details and retry.");
        message.error(err.message || "Failed to create account.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setBuddyState("thinking");
    setBuddyMsg("Connecting to Google...");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      message.error(err.message || "Google login failed.");
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setBuddyState("happy");
    setBuddyMsg("We sent a mock 4-digit code to your phone! 📱");
  };

  // Determine standard goals based on selected category (grade)
  const isHigherEd = onboardData.grade === "UG" || onboardData.grade === "PG";
  const step5Question = isHigherEd 
    ? "What is your primary career or academic goal?"
    : "What is your primary goal after Class 10?";

  const step5Options = isHigherEd 
    ? [
        "Crack GATE / Higher Studies (M.Tech/MS)",
        "Prepare for UPSC / Civil Services",
        "Secure a High-Paying Corporate Job",
        "Start a Venture / Entrepreneurship",
        "Pursue Research & Academia (PhD)",
        "Skill Development & Professional Certifications"
      ]
    : [
        "Get into Top Science Stream (IIT / Medical)",
        "Pursue Commerce Stream (CA / Management)",
        "Explore Humanities & Arts Stream",
        "Diploma / Polytechnic Courses",
        "Skill Development & AI Careers"
      ];

  const step4Options = isHigherEd
    ? ["9.5+ CGPA / 95%+", "9.0-9.5 CGPA / 90-95%", "8.5-9.0 CGPA / 85-90%", "8.0-8.5 CGPA / 80-85%", "7.5-8.0 CGPA / 75-80%", "7.0 CGPA or below / 70% or below"]
    : ["95%+", "90-95%", "85-90%", "80-85%", "75-80%", "70% or below"];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-50 to-white py-12 px-4 relative font-sans">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 font-bold text-navy hover:text-primary transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Mascot guidance */}
        <div className="md:col-span-5 flex flex-col items-center">
          <BuddyMascot
            state={buddyState}
            message={buddyMsg}
            bubblePosition="bottom"
            size={160}
          />
        </div>

        {/* Right Side: Forms */}
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
                        className={`py-1.5 rounded-lg cursor-pointer ${authMethod === "email" ? "bg-white border border-navy shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]" : "text-slate-500"}`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMethod("otp")}
                        className={`py-1.5 rounded-lg cursor-pointer ${authMethod === "otp" ? "bg-white border border-navy shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]" : "text-slate-500"}`}
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
                        className="text-primary hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button type="submit" disabled={loading} className="w-full cartoon-btn cartoon-btn-yellow py-3 text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      {loading ? "Logging In..." : "Log In 🚀"}
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
                    <button onClick={() => setMode("signup")} className="text-primary hover:underline font-extrabold cursor-pointer">
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
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-navy uppercase mb-1">Create Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-navy uppercase mb-1">Confirm Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Confirm password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-navy rounded-xl text-sm font-semibold focus:outline-none"
                      />
                    </div>

                    <button type="submit" className="w-full cartoon-btn cartoon-btn-yellow py-3 text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
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
                    <button onClick={() => setMode("login")} className="text-primary hover:underline font-extrabold cursor-pointer">
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
                  className="space-y-6 text-left"
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

                  {/* Step 2: Board / Course (includes School boards, UG, PG) */}
                  {onboardStep === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <BookOpen className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">Course & Board Exam System</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">
                        Which exam board are you taking?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
                        {[
                          "CBSE", 
                          "ICSE", 
                          "Telangana SSC", 
                          "Andhra Pradesh SSC", 
                          "Other State Boards", 
                          "UG Courses", 
                          "PG Courses"
                        ].map((board) => (
                          <button
                            key={board}
                            type="button"
                            onClick={() => {
                              const categoryText = board === "UG Courses" ? "UG" : board === "PG Courses" ? "PG" : "School";
                              
                              // Clear and reset matching default goals
                              const defaultGoal = categoryText === "School" 
                                ? "Get into Top Science Stream (IIT / Medical)" 
                                : "Secure a High-Paying Corporate Job";
                                
                              const defaultPct = categoryText === "School" ? "95%+" : "9.5+ CGPA / 95%+";

                              setOnboardData({ 
                                ...onboardData, 
                                board, 
                                grade: categoryText,
                                goal: defaultGoal,
                                expectedPercentage: defaultPct
                              });
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl border-3 border-navy font-bold text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer ${
                              onboardData.board === board
                                ? "bg-sky-100 border-sky-600 text-sky-900 shadow-[2px_2px_0px_0px_#0284c7]"
                                : "bg-white hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            <span>{board}</span>
                            {onboardData.board === board && <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: School or Institute Name */}
                  {onboardStep === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-rose-500 mb-2">
                        <Star className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">Affiliation</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-4">
                        What is your School/Institute Name?
                      </h3>
                      <input
                        type="text"
                        required
                        placeholder={isHigherEd ? "e.g. Delhi University / IIT" : "e.g. Kendriya Vidyalaya"}
                        value={onboardData.school}
                        onChange={(e) => setOnboardData({ ...onboardData, school: e.target.value })}
                        className="w-full px-4 py-3 border-3 border-navy rounded-xl text-base font-bold focus:outline-none"
                      />
                    </motion.div>
                  )}

                  {/* Step 4: Expected Percentage / CGPA */}
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
                        {step4Options.map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setOnboardData({ ...onboardData, expectedPercentage: pct })}
                            className={`px-2.5 py-3 rounded-xl border-3 border-navy font-bold text-xs md:text-sm text-center transition-all cursor-pointer ${
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

                  {/* Step 5: Goal (Dynamic questions and options based on category) */}
                  {onboardStep === 5 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-2 text-indigo-500 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-extrabold text-xs uppercase tracking-wide">Future Path</span>
                      </div>
                      <h3 className="text-xl font-extrabold font-fredoka text-navy mb-3">
                        {step5Question}
                      </h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {step5Options.map((goal) => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => setOnboardData({ ...onboardData, goal })}
                            className={`w-full text-left px-4 py-3.5 rounded-xl border-3 border-navy font-bold text-[11px] md:text-xs transition-all flex items-center justify-between cursor-pointer ${
                              onboardData.goal === goal
                                ? "bg-indigo-100 border-indigo-600 text-indigo-900 shadow-[2px_2px_0px_0px_#4f46e5]"
                                : "bg-white hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            <span>{goal}</span>
                            {onboardData.goal === goal && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
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
                        className="cartoon-btn cartoon-btn-white py-3 text-xs w-1/3 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]"
                      >
                        ← Back
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={loading || (onboardStep === 1 && !onboardData.name.trim()) || (onboardStep === 3 && !onboardData.school.trim())}
                      onClick={handleOnboardingNext}
                      className={`cartoon-btn cartoon-btn-yellow py-3 text-xs flex-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
                        ((onboardStep === 1 && !onboardData.name.trim()) || (onboardStep === 3 && !onboardData.school.trim())) ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Processing..." : onboardStep === 5 ? "Submit & Play! 🎉" : "Continue →"}
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
