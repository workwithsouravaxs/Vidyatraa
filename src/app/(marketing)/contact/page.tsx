'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Tag, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Select } from 'antd';
import BuddyMascot from "@/components/BuddyMascot";

const { Option } = Select;

const supportCategories = [
  {
    id: 'child',
    name: 'Child Support',
    label: 'Child & Student Support 🎒',
    emoji: '🎒',
    desc: 'Doubt solver, revision notes, mock exams, & daily streaks.',
    bg: 'bg-sky-50/50 text-sky-950 border-sky-100 hover:bg-sky-50 hover:border-sky-300',
    activeBg: 'bg-gradient-to-br from-sky-500 to-sky-600 border-sky-600 text-white shadow-lg shadow-sky-500/10 scale-[1.02]',
    buddyMessage: "Board exams can be tough, but I'm here to help you solve any learning issues! Let's study together. 📚"
  },
  {
    id: 'parent',
    name: 'Parent Support',
    label: 'Parent Dashboard Support 👨‍👩‍👦',
    emoji: '👨‍👩‍👦',
    desc: 'Parent monitoring dashboard, weekly reports, & subscriptions.',
    bg: 'bg-rose-50/50 text-rose-950 border-rose-100 hover:bg-rose-50 hover:border-rose-300',
    activeBg: 'bg-gradient-to-br from-rose-500 to-rose-600 border-rose-600 text-white shadow-lg shadow-rose-500/10 scale-[1.02]',
    buddyMessage: "We want to make monitoring your child's progress as easy and stress-free as possible! 👨‍👩‍👦"
  },
  {
    id: 'scholarship',
    name: 'Scholarship Support',
    label: 'Scholarship & Funding Support 💡',
    emoji: '💡',
    desc: 'Eligibility checker, document uploads, & deadlines.',
    bg: 'bg-emerald-50/50 text-emerald-950 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-300',
    activeBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/10 scale-[1.02]',
    buddyMessage: "Finding government or private trust funding is our superpower. Tell us where you're stuck! 💡"
  },
  {
    id: 'internship',
    name: 'Internship Support',
    label: 'Internship & Gig Support 💼',
    emoji: '💼',
    desc: 'Micro-project matching, writing tasks, & stipends.',
    bg: 'bg-amber-50/50 text-amber-950 border-amber-100 hover:bg-amber-50 hover:border-amber-300',
    activeBg: 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-600 text-white shadow-lg shadow-amber-500/10 scale-[1.02]',
    buddyMessage: "Earn stipends and build a standout profile. How can we help you work? 💼"
  }
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [inquiryType, setInquiryType] = useState('General Inquiry');
  const [userMessage, setUserMessage] = useState('');
  const [category, setCategory] = useState('Child Support');
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const activeCategoryObject = supportCategories.find(c => c.name === category) || supportCategories[0];
  const buddyMsg = activeCategoryObject.buddyMessage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !userMessage) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields!');
      return;
    }

    setLoading(true);
    setSubmitStatus('idle');
    try {
      const fullMessage = `Category Route: ${category}\n\n${userMessage}`;
      const { error } = await supabase
        .from('enquiries')
        .insert([{
          name,
          email,
          phone: phone || null,
          subject: subject || null,
          inquiry_type: inquiryType || category,
          message: fullMessage,
          status: 'Pending'
        }]);

      if (error) throw error;
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setInquiryType('General Inquiry');
      setUserMessage('');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'An unknown error occurred';
      setSubmitStatus('error');
      setErrorMessage(msg || 'Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#fafafa] to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center font-sans">
      <main className="max-w-7xl mx-auto py-8 w-full">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 font-bold text-blue-650 text-xs md:text-sm shadow-sm">
            <span>👋 We Are Here to Assist You</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-poppins">Get in Touch</h1>
          <p className="text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Have questions about a scholarship or need help with your application? Select a support channel below and drop us a message.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Support Categories & Mascot */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2 font-poppins">
                <MessageSquare className="w-6 h-6 text-primary shrink-0" />
                <span>1. Select Support Category</span>
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-6">
                Choose the channel that matches your inquiry to route your request to the right team.
              </p>

              {/* Grid of Support Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supportCategories.map((cat) => {
                  const isActive = category === cat.name;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.name)}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all select-none cursor-pointer duration-200 outline-none ${
                        isActive 
                          ? cat.activeBg 
                          : `${cat.bg} border-slate-100`
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-3xl">{cat.emoji}</span>
                        {isActive && (
                          <span className="bg-white/20 backdrop-blur-md text-[9px] font-black px-2 py-0.5 rounded-full text-white tracking-wider">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>{cat.name}</h4>
                        <p className={`text-[11px] font-medium leading-snug ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{cat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mascot advice box */}
            <div className="bg-sky-50/50 border border-sky-100/60 rounded-3xl p-6 flex items-center justify-center shadow-sm">
              <BuddyMascot
                state="wave"
                message={buddyMsg}
                bubblePosition="bottom"
                size={110}
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] text-left space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1 font-poppins">
                  2. Send us a Message
                </h3>
                <p className="text-xs font-semibold text-slate-400">
                  Fill out the form below. We usually reply within 24 hours.
                </p>
              </div>

              {/* Polished Success/Error alerts */}
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-emerald-900 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-950">Thank you!</p>
                      <p className="text-emerald-800/90 mt-0.5">Your message has been sent successfully. Our team will review and respond shortly.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-900 text-xs font-semibold"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-rose-950">Error Occurred</p>
                      <p className="text-rose-800/90 mt-0.5">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {/* Active Category Display */}
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider font-semibold">Active Route</span>
                  <span className="bg-blue-50 text-blue-650 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                    {category}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Kumar"
                      className="w-full px-4 py-2.5 border border-slate-200 bg-white text-slate-800 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-slate-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-2.5 border border-slate-200 bg-white text-slate-800 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Input (Optional) */}
                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Phone Number <span className="text-slate-300">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2.5 border border-slate-200 bg-white text-slate-800 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-slate-300"
                    />
                  </div>

                  {/* Inquiry Type (Optional Selector) */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Inquiry Type <span className="text-slate-300">(Optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="inquiryType"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 bg-white text-slate-800 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Scholarship Help">Scholarship Help</option>
                        <option value="Course Enrollment">Course Enrollment</option>
                        <option value="Billing Support">Billing Support</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Subject (Optional) */}
                <div>
                  <label htmlFor="subject" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Subject <span className="text-slate-300">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Issue with loading scholarship requirements"
                    className="w-full px-4 py-2.5 border border-slate-200 bg-white text-slate-800 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-slate-300"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="How can we help you? Please write details here..."
                    className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-800 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all text-sm placeholder:text-slate-300"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-600 text-white font-bold h-12 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 disabled:opacity-50 cursor-pointer text-sm"
                  >
                    <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                    {!loading && <Send size={15} />}
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
