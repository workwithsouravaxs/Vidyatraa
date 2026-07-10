"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Trophy, Compass, Award, User, LogOut, Menu, X, Flame } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // States for dropdown toggling
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [stats, setStats] = useState({
    name: "Rahul",
    xp: 1250,
    coins: 340,
    streak: 5,
    level: 4,
  });

  useEffect(() => {
    // Load student profile if exists
    const stored = localStorage.getItem("vidyatraa_student");
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setStats({
          name: profile.name || "Rahul",
          xp: profile.xp || 1250,
          coins: profile.coins || 340,
          streak: profile.streak || 5,
          level: profile.level || 4,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!isMoreOpen && !isProfileOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-dropdown-trigger") && !target.closest(".nav-dropdown-content")) {
        setIsMoreOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMoreOpen, isProfileOpen]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Trophy },
    { name: "Study Resources", href: "/resources", icon: BookOpen },
    { name: "AI Practice", href: "/generator", icon: SparklesIcon },
    { name: "Mock Tests", href: "/mock-tests", icon: Award },
    { name: "Doubt Solver", href: "/doubt-solver", icon: Compass },
  ];

  const secondaryNavItems = [
    { name: "Scholarships", href: "/scholarships" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Career Roadmaps", href: "/careers" },
    { name: "Parent View", href: "/parent" },
    { name: "Admin Control", href: "/admin" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("vidyatraa_student");
    router.push("/");
  };

  const isLanding = pathname === "/" || pathname === "/courses";
  const isAuth = pathname === "/auth";

  if (isAuth) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-navy py-3.5 px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          <div className="bg-primary border-3 border-navy rounded-2xl p-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] group-hover:scale-105 transition-transform">
            <span className="text-xl md:text-2xl font-bold text-white">🎓</span>
          </div>
          <span className="text-2xl font-bold font-fredoka tracking-wide text-navy">
            Vidya<span className="text-primary">traa</span>
          </span>
        </Link>

        {/* Desktop Navigation Links for Landing Pages */}
        {isLanding && (
          <div className="hidden lg:flex items-center gap-6 text-sm font-black text-navy">
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            <Link href="/scholarships" className="hover:text-primary transition-colors">Find Scholarships</Link>
            <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
          </div>
        )}

        {/* Desktop Navigation Links */}
        {!isLanding && (
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-extrabold text-sm transition-all border-2 ${
                    isActive
                      ? "bg-sky-100 text-sky-900 border-navy shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                      : "text-slate-600 border-transparent hover:border-navy hover:bg-slate-50 hover:text-navy hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-1px]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Dropdown for More */}
            <div
              className="relative"
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`nav-dropdown-trigger flex items-center gap-1 px-3.5 py-2 rounded-xl font-extrabold text-sm text-slate-600 border-2 border-transparent hover:border-navy hover:bg-slate-50 focus:outline-none ${
                  isMoreOpen ? "bg-slate-50 border-navy text-navy shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]" : ""
                }`}
              >
                <span>More</span>
                <span className="text-[10px]">▼</span>
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className="nav-dropdown-content absolute right-0 mt-2 w-48 bg-white border-3 border-navy rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-2 z-50 flex flex-col gap-1 text-left"
                  >
                    {secondaryNavItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className="block px-3 py-2 rounded-lg font-bold text-xs hover:bg-amber-50 hover:text-amber-800 text-slate-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Right Section: Gamification stats */}
        <div className="flex items-center gap-2 md:gap-3">
          {isLanding ? (
            <div className="flex items-center gap-3">
              <Link href="/auth?mode=login" className="font-bold text-navy hover:text-primary transition-colors text-sm md:text-base">
                Login
              </Link>
              <Link href="/auth?mode=signup" className="cartoon-btn cartoon-btn-yellow text-xs md:text-sm px-4 py-2">
                Start Free Trial
              </Link>
            </div>
          ) : (
            <>
              {/* Gamification Stats pill shelf */}
              <div className="flex items-center gap-1.5 md:gap-2">
                
                {/* Level */}
                <div className="hidden sm:flex items-center gap-1 text-indigo-700 bg-indigo-50 border-2 border-indigo-200 py-1 px-2.5 rounded-xl font-black text-xs shadow-[1.5px_1.5px_0px_0px_#6366f1]">
                  <span>Lvl {stats.level}</span>
                </div>
                
                {/* XP */}
                <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border-2 border-emerald-200 py-1 px-2.5 rounded-xl font-black text-xs shadow-[1.5px_1.5px_0px_0px_#10b981]">
                  <span>⭐ {stats.xp}</span>
                </div>

                {/* Coins */}
                <div className="flex items-center gap-1 text-amber-700 bg-amber-50 border-2 border-amber-200 py-1 px-2.5 rounded-xl font-black text-xs shadow-[1.5px_1.5px_0px_0px_#eab308]">
                  <span>🪙 {stats.coins}</span>
                </div>

                {/* Streak */}
                <div className="flex items-center gap-1 text-orange-700 bg-orange-50 border-2 border-orange-200 py-1 px-2.5 rounded-xl font-black text-xs shadow-[1.5px_1.5px_0px_0px_#f97316] animate-bounce-slow">
                  <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  <span>{stats.streak}d</span>
                </div>
              </div>

              {/* Profile Menu Dropdown */}
              <div
                className="relative"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="nav-dropdown-trigger flex items-center justify-center bg-sky-200 border-2 border-navy rounded-full w-9 h-9 hover:bg-sky-300 transition-colors focus:outline-none"
                >
                  <User className="w-5 h-5 text-sky-800" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      className="nav-dropdown-content absolute right-0 mt-2 w-48 bg-white border-3 border-navy rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-2 z-50 text-left"
                    >
                      <div className="px-3 py-2 border-b-2 border-slate-100 mb-1">
                        <p className="font-bold text-[10px] text-slate-400">LOGGED IN AS</p>
                        <p className="font-extrabold text-xs text-navy truncate">{stats.name}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-3 py-2 rounded-lg font-bold text-xs text-rose-600 hover:bg-rose-50 text-left transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-xl border-2 border-navy hover:bg-slate-50 focus:outline-none"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer Slide-down */}
      <AnimatePresence>
        {isOpen && !isLanding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden border-t-2 border-slate-100 mt-3 py-3 flex flex-col gap-2 overflow-hidden text-left"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm ${
                    isActive ? "bg-sky-100 text-sky-800 border-2 border-sky-400" : "text-slate-600 border-2 border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="border-t border-slate-100 my-1"></div>
            {secondaryNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Inline Sparkles icon to resolve compiler imports cleanly
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

