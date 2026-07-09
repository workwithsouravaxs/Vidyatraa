"use client";

import React from "react";
import { motion } from "framer-motion";

interface BuddyMascotProps {
  state?: "idle" | "wave" | "thinking" | "happy" | "cheer";
  message?: string;
  bubblePosition?: "left" | "right" | "top" | "bottom";
  className?: string;
  size?: number;
}

export default function BuddyMascot({
  state = "idle",
  message,
  bubblePosition = "right",
  className = "",
  size = 120,
}: BuddyMascotProps) {
  // SVG animation variants based on state
  const antennaVariants = {
    idle: { scaleY: [1, 1.1, 1], transition: { repeat: Infinity, duration: 2 } },
    thinking: { scaleY: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1 } },
    happy: { scaleY: [1, 1.15, 1], rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 1.5 } },
    wave: { scaleY: 1 },
    cheer: { scaleY: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.8 } },
  };

  const leftArmVariants = {
    idle: { rotate: 0 },
    thinking: { rotate: [0, 35, 0], transition: { repeat: Infinity, duration: 2 } },
    happy: { rotate: [0, 15, -15, 0], transition: { repeat: Infinity, duration: 1.2 } },
    wave: { rotate: [0, 60, 20, 60, 20, 0], transition: { duration: 2, repeat: Infinity } },
    cheer: { rotate: 120, transition: { type: "spring" as const } },
  };

  const rightArmVariants = {
    idle: { rotate: 0 },
    thinking: { rotate: 0 },
    happy: { rotate: [0, -15, 15, 0], transition: { repeat: Infinity, duration: 1.2 } },
    wave: { rotate: 0 },
    cheer: { rotate: -120, transition: { type: "spring" as const } },
  };

  const bodyVariants = {
    idle: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const } },
    thinking: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" as const } },
    happy: { y: [0, -8, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" as const } },
    wave: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const } },
    cheer: { y: [0, -10, 0], scaleY: [1, 0.95, 1.05, 1], transition: { repeat: Infinity, duration: 1.2 } },
  };

  const eyeVariants = {
    idle: { scaleY: [1, 1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 4 } },
    thinking: { scaleY: 1, x: [-2, 2, -2], transition: { repeat: Infinity, duration: 3 } },
    happy: { scaleY: 1, scaleX: 1.2 },
    wave: { scaleY: [1, 1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 4 } },
    cheer: { scaleY: 1 },
  };

  // Dialogue bubble styles based on position
  const getBubbleStyle = () => {
    switch (bubblePosition) {
      case "left":
        return "mr-4 speech-bubble speech-bubble-right self-center order-first";
      case "top":
        return "mb-4 speech-bubble speech-bubble-bottom self-center w-full";
      case "bottom":
        return "mt-4 speech-bubble speech-bubble-top self-center w-full";
      case "right":
      default:
        return "ml-4 speech-bubble speech-bubble-left self-center";
    }
  };

  return (
    <div className={`flex flex-col md:flex-row items-center justify-center ${className}`}>
      {/* Speech bubble */}
      {message && (bubblePosition === "left" || bubblePosition === "top") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${getBubbleStyle()} border-3 border-navy shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] bg-white text-navy font-bold rounded-2xl p-4 max-w-xs z-10 font-fredoka text-sm`}
        >
          {message}
        </motion.div>
      )}

      {/* Mascot Graphic */}
      <motion.div
        variants={bodyVariants}
        animate={state}
        className="relative flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background shadows/glows for cheering or happy */}
          {state === "happy" && (
            <g>
              <circle cx="50" cy="50" r="45" fill="#fef08a" opacity="0.4" />
              <path d="M 50,15 L 53,25 L 63,22 L 57,30 L 66,35 L 56,38 L 60,48 L 50,42 L 40,48 L 44,38 L 34,35 L 43,30 L 37,22 L 47,25 Z" fill="#eab308" opacity="0.6" transform="scale(0.8) translate(12, 10)" />
            </g>
          )}

          {/* Shadow underneath */}
          <ellipse cx="50" cy="90" rx="24" ry="5" fill="#e2e8f0" />

          {/* Left Arm (Waving / Cheering) */}
          <motion.g
            variants={leftArmVariants}
            style={{ originX: "32px", originY: "50px" }}
          >
            {/* Blue arm */}
            <rect x="18" y="44" width="15" height="10" rx="5" fill="#3b82f6" stroke="#0f172a" strokeWidth="3" />
            {/* Little hand */}
            <circle cx="18" cy="49" r="6" fill="#fcd34d" stroke="#0f172a" strokeWidth="3" />
          </motion.g>

          {/* Right Arm (Holding Books) */}
          <motion.g
            variants={rightArmVariants}
            style={{ originX: "68px", originY: "50px" }}
          >
            {/* Carrying books if idle/thinking, else floating */}
            {state === "idle" || state === "thinking" || state === "wave" ? (
              <g>
                {/* Arm holding books */}
                <path d="M 68,49 Q 80,49 76,64" fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" />
                <path d="M 68,49 Q 80,49 76,64" fill="none" stroke="#0f172a" strokeWidth="13" strokeLinecap="round" style={{ zIndex: -1 }} />
                <path d="M 68,49 Q 80,49 76,64" fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" />
                {/* Books stack */}
                {/* Book 1 (Red) */}
                <rect x="68" y="58" width="22" height="6" rx="2" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
                {/* Book 2 (Yellow) */}
                <rect x="66" y="63" width="23" height="6" rx="2" fill="#eab308" stroke="#0f172a" strokeWidth="2" />
                {/* Book 3 (Green) */}
                <rect x="67" y="68" width="21" height="6" rx="2" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
              </g>
            ) : (
              <g>
                {/* Raised Cheer Arm */}
                <rect x="67" y="44" width="15" height="10" rx="5" fill="#3b82f6" stroke="#0f172a" strokeWidth="3" />
                <circle cx="82" cy="49" r="6" fill="#fcd34d" stroke="#0f172a" strokeWidth="3" />
              </g>
            )}
          </motion.g>

          {/* Antenna */}
          <motion.g
            variants={antennaVariants}
            style={{ originX: "50px", originY: "35px" }}
          >
            <line x1="50" y1="35" x2="50" y2="18" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="14" r="6" fill="#f59e0b" stroke="#0f172a" strokeWidth="3" />
            {state === "thinking" && (
              <circle cx="50" cy="14" r="10" fill="#fef08a" opacity="0.5" className="animate-ping" />
            )}
          </motion.g>

          {/* Robot Main Body */}
          <rect x="30" y="32" width="40" height="42" rx="14" fill="#38bdf8" stroke="#0f172a" strokeWidth="4" />

          {/* Belly screen */}
          <rect x="36" y="52" width="28" height="15" rx="5" fill="#bae6fd" stroke="#0f172a" strokeWidth="3" />
          {/* Heartbeat/digital design on screen */}
          <path d="M 40,60 L 46,60 L 48,55 L 51,64 L 53,58 L 55,60 L 60,60" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />

          {/* Face Screen */}
          <rect x="35" y="36" width="30" height="14" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />

          {/* Eyes (Glowing digital) */}
          <motion.g variants={eyeVariants}>
            {state === "happy" || state === "cheer" ? (
              // Happy curved eyes: ^^
              <g>
                <path d="M 40,44 Q 44,40 48,44" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
                <path d="M 52,44 Q 56,40 60,44" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : (
              // Round glowing eyes
              <g>
                <ellipse cx="44" cy="43" rx="3.5" ry="4" fill="#22d3ee" />
                <ellipse cx="56" cy="43" rx="3.5" ry="4" fill="#22d3ee" />
                {/* Eye glint */}
                <circle cx="45.5" cy="41.5" r="1" fill="#ffffff" />
                <circle cx="57.5" cy="41.5" r="1" fill="#ffffff" />
              </g>
            )}
          </motion.g>

          {/* Cute cheeks */}
          <circle cx="38" cy="47" r="2" fill="#f43f5e" opacity="0.6" />
          <circle cx="62" cy="47" r="2" fill="#f43f5e" opacity="0.6" />

          {/* Feet */}
          {/* Left Foot */}
          <rect x="36" y="73" width="10" height="10" rx="3" fill="#0f172a" />
          {/* Right Foot */}
          <rect x="54" y="73" width="10" height="10" rx="3" fill="#0f172a" />
        </svg>
      </motion.div>

      {/* Speech bubble */}
      {message && (bubblePosition === "right" || bubblePosition === "bottom") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${getBubbleStyle()} border-3 border-navy shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] bg-white text-navy font-bold rounded-2xl p-4 max-w-xs z-10 font-fredoka text-sm`}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}
