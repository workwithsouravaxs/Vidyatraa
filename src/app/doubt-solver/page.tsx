"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image, Mic, History, Plus, Sparkles, User, HelpCircle, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import BuddyMascot from "@/components/BuddyMascot";

type ChatMessage = {
  id: number;
  sender: "user" | "buddy";
  text: string;
  type?: "text" | "image" | "voice";
  imageName?: string;
  steps?: string[];
  example?: { title: string; body: string };
  related?: string[];
};

export default function DoubtSolver() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "buddy",
      text: "Hey! I'm Buddy, your personal AI doubt solver. You can type a question, upload a photo of your homework, or speak it to me. What is puzzling you today? 🤖",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Mascot quotes
  const [buddyMsg, setBuddyMsg] = useState("I can solve Math, Science, and Social doubts instantly. Try typing or speaking a doubt!");
  const [buddyState, setBuddyState] = useState<"idle" | "wave" | "thinking" | "happy" | "cheer">("idle");

  const [savedDoubts, setSavedDoubts] = useState([
    "Why does copper sulphate change color?",
    "Derive the sum of n terms in an AP",
    "What is the Rowlatt Act of 1919?",
  ]);

  const handleSend = (textToSend: string, type: "text" | "image" | "voice" = "text", imageName?: string) => {
    if (!textToSend.trim()) return;

    // User message
    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: textToSend,
      type,
      imageName,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    setBuddyState("thinking");
    setBuddyMsg("Searching my neural databases for a simple, clear explanation... 🧠");

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setBuddyState("happy");
      setBuddyMsg("Got it! Check out this breakdown. Let me know if you want another example! 🚀");

      // Generate context-rich responses
      let aiResponseText = "";
      let steps: string[] = [];
      let example: { title: string; body: string } | undefined;
      let related: string[] = [];

      const query = textToSend.toLowerCase();

      if (query.includes("copper") || query.includes("colour") || query.includes("color")) {
        aiResponseText = "Great chemistry question! When iron reacts with copper sulphate, displacement happens! 🧪";
        steps = [
          "Copper sulphate (CuSO4) solution is blue in color because of copper ions.",
          "When you dip an iron nail (Fe) in it, iron, being more reactive than copper, displaces copper.",
          "Iron forms iron sulphate (FeSO4), which is light green.",
          "The chemical equation is: Fe (grey) + CuSO4 (blue) → FeSO4 (green) + Cu (reddish brown precipitate)."
        ];
        example = {
          title: "Similar Displacement Reaction:",
          body: "Zinc reacting with copper sulphate: Zn + CuSO4 → ZnSO4 (colorless) + Cu."
        };
        related = [
          "What is double displacement?",
          "Explain redox reactions simply"
        ];
      } else if (query.includes("ap") || query.includes("sum") || query.includes("arithmetic")) {
        aiResponseText = "Math is fun! Let's break down the sum of first n terms in an Arithmetic Progression (AP) 📐";
        steps = [
          "Let the AP be: a, a+d, a+2d, ... up to n terms.",
          "Write the sum S_n forwards: S_n = a + (a+d) + ... + [a+(n-1)d].",
          "Now write the sum S_n backwards: S_n = [a+(n-1)d] + [a+(n-2)d] + ... + a.",
          "Add the two equations. Each aligned pair adds up to [2a + (n-1)d].",
          "Since there are n such pairs: 2 * S_n = n * [2a + (n-1)d].",
          "Divide by 2 to get the formula: S_n = n/2 * [2a + (n-1)d]."
        ];
        example = {
          title: "Practice Exercise:",
          body: "Find sum of first 10 terms of AP: 2, 4, 6... Here a=2, d=2. S_10 = 10/2 * [2(2) + 9(2)] = 5 * [4+18] = 110."
        };
        related = [
          "Find nth term of AP formula",
          "What is a geometric progression?"
        ];
      } else {
        // Fallback friendly explanation
        aiResponseText = `Aha! Let's solve this doubt: "${textToSend}" together! 😊`;
        steps = [
          "Identify the core terms: Look up basic definitions in your textbook notes.",
          "Examine standard guidelines: Check for formulas or dates related to the topic.",
          "Step-by-step construction: Work it out methodically.",
          "Conclusion: Double check units or historical context."
        ];
        example = {
          title: "Buddy's study rule:",
          body: "Always break complex sentences into smaller chunks of 5 words each."
        };
        related = [
          "Show me relevant board questions",
          "Ask another general math doubt"
        ];
      }

      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: "buddy",
        text: aiResponseText,
        steps,
        example,
        related,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleVoiceAsk = () => {
    setIsRecording(true);
    setBuddyState("thinking");
    setBuddyMsg("Listening closely... Speak your doubt clearly! 🎤");

    setTimeout(() => {
      setIsRecording(false);
      setBuddyState("happy");
      const mockTranscriptions = [
        "Why does copper sulphate change color?",
        "Derive the sum of n terms in an AP",
      ];
      const selectedQuery = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      handleSend(selectedQuery, "voice");
    }, 2500);
  };

  const handleImageUpload = () => {
    const imageName = "homework_quadratic_eq.jpg";
    setBuddyState("thinking");
    setBuddyMsg("scanning and parsing characters from the image upload... 📷");
    
    setTimeout(() => {
      handleSend("Solve: x² - 5x + 6 = 0", "image", imageName);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: History logs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="cartoon-card p-5 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold font-fredoka text-navy flex items-center gap-1.5">
                <History className="w-5 h-5 text-slate-400" />
                <span>Saved Doubts</span>
              </h3>
              <button
                onClick={() => setMessages([messages[0]])}
                className="text-[10px] font-black text-rose-500 hover:underline flex items-center gap-0.5"
              >
                Clear Chats
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-left">
              {savedDoubts.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(d)}
                  className="w-full text-left p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl font-bold text-xs text-navy leading-tight transition-all"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Mascot widget */}
          <div className="cartoon-card-flat p-4 bg-sky-50 border-2 border-navy">
            <BuddyMascot
              state={buddyState}
              message={buddyMsg}
              bubblePosition="bottom"
              size={125}
            />
          </div>
        </div>

        {/* Right Side: Conversation Panel */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="cartoon-card bg-white shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] h-[550px] flex flex-col justify-between overflow-hidden">
            
            {/* Header info */}
            <div className="p-4 bg-slate-50 border-b-4 border-navy flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary border-2 border-navy flex items-center justify-center font-bold text-white shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                  🤖
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm text-navy font-fredoka leading-none">Buddy Doubt Engine</h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Online & Solving</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-white border-2 border-navy rounded-xl px-2.5 py-1 text-xs font-black text-navy shadow-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span>GPT-4o Synced</span>
              </div>
            </div>

            {/* Chats stream container */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end text-right" : "justify-start text-left"}`}
                >
                  {msg.sender === "buddy" && (
                    <div className="w-8 h-8 rounded-full border border-navy bg-sky-200 flex items-center justify-center text-sm shrink-0">
                      🤖
                    </div>
                  )}

                  <div className="max-w-md space-y-3">
                    {/* Speech bubble */}
                    <div className={`p-4 border-2 border-navy rounded-2xl text-xs md:text-sm font-bold shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] leading-relaxed text-left ${
                      msg.sender === "user" ? "bg-amber-100 text-amber-950" : "bg-white text-navy"
                    }`}>
                      {msg.type === "image" && (
                        <div className="mb-2 bg-slate-100 p-2.5 rounded-xl border border-dashed border-slate-300 text-[11px] text-slate-500 flex items-center gap-1.5">
                          <Image className="w-4 h-4" />
                          <span>Uploaded: {msg.imageName}</span>
                        </div>
                      )}
                      {msg.type === "voice" && (
                        <div className="mb-2 bg-slate-100 p-2.5 rounded-xl border border-dashed border-slate-300 text-[11px] text-slate-500 flex items-center gap-1.5">
                          <Mic className="w-4 h-4" />
                          <span>Asked by Voice Transcriber</span>
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </div>

                    {/* Render step breakdowns */}
                    {msg.steps && msg.steps.length > 0 && (
                      <div className="space-y-2 border-l-4 border-primary pl-4 py-1 text-left text-xs md:text-sm font-semibold">
                        <p className="font-extrabold text-navy text-xs uppercase mb-2">Step-by-step analysis:</p>
                        {msg.steps.map((st, sIdx) => (
                          <div key={sIdx} className="flex gap-2">
                            <span className="font-black text-primary shrink-0">{sIdx + 1}.</span>
                            <p className="text-slate-600 leading-relaxed font-bold">{st}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render similar practice examples */}
                    {msg.example && (
                      <div className="cartoon-card-flat p-4 bg-yellow/5 border-2 border-navy text-left text-xs md:text-sm font-bold">
                        <p className="font-extrabold text-yellow-700 font-fredoka flex items-center gap-1">
                          <span>💡 {msg.example.title}</span>
                        </p>
                        <p className="text-slate-600 mt-1 leading-relaxed">{msg.example.body}</p>
                      </div>
                    )}

                    {/* Render follow-up suggestions */}
                    {msg.related && msg.related.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-left pt-1 justify-start">
                        {msg.related.map((rel, rIdx) => (
                          <button
                            key={rIdx}
                            onClick={() => handleSend(rel)}
                            className="bg-white hover:bg-slate-50 border border-navy text-[10px] font-black text-navy px-3 py-1.5 rounded-xl shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
                          >
                            {rel}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full border border-navy bg-amber-200 flex items-center justify-center text-sm shrink-0">
                      <User className="w-4 h-4 text-amber-800" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                // Typing Indicator
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-full border border-navy bg-sky-200 flex items-center justify-center text-sm shrink-0">
                    🤖
                  </div>
                  <div className="bg-slate-100 border-2 border-navy rounded-xl px-4 py-2.5 text-xs text-slate-400 font-bold flex items-center gap-1 shadow-sm">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              )}

              {isRecording && (
                // Recording visualizer
                <div className="flex justify-end gap-3 items-center">
                  <div className="bg-rose-50 border-2 border-rose-300 rounded-xl px-4 py-3 text-xs text-rose-700 font-bold flex items-center gap-2 shadow-sm animate-pulse">
                    <span className="w-2 h-2 bg-rose-600 rounded-full animate-ping"></span>
                    <span>Recording voice doubt... Speak now!</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-navy bg-rose-200 flex items-center justify-center text-sm shrink-0">
                    <Mic className="w-4 h-4 text-rose-700" />
                  </div>
                </div>
              )}
            </div>

            {/* Inputs Panel Footer */}
            <div className="p-4 border-t-4 border-navy bg-slate-50 flex gap-2.5 items-center">
              
              <button
                type="button"
                onClick={handleImageUpload}
                title="Upload screenshot of homework"
                className="cartoon-btn cartoon-btn-white p-3 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0"
              >
                <Image className="w-5 h-5 text-slate-500" />
              </button>

              <button
                type="button"
                onClick={handleVoiceAsk}
                title="Ask question by voice"
                className="cartoon-btn cartoon-btn-white p-3 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0"
              >
                <Mic className="w-5 h-5 text-slate-500" />
              </button>

              <input
                type="text"
                placeholder="Ask about slaked lime, AP series, Satygraha..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(inputText);
                }}
                className="flex-1 px-4 py-3 border-2 border-navy rounded-xl text-xs md:text-sm font-semibold focus:outline-none bg-white text-navy"
              />

              <button
                onClick={() => handleSend(inputText)}
                className="cartoon-btn cartoon-btn-yellow p-3 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
