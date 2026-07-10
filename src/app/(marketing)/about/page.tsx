'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Divider } from 'antd';
import { Award, Target, Eye, Quote } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-blue-50/60 to-transparent py-20 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-fredoka">Our Story & Mission</h1>
            <p className="text-xl text-slate-600 leading-relaxed font-sans font-medium">
              Vidyatraa is on a mission to bridge the gap between talented students and
              life-changing educational opportunities.
            </p>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3 flex flex-col gap-16">
                <div className="relative">
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50 relative">
                    <Image
                      src="/pose.jpeg"
                      alt="Sourav Kumar"
                      width={400}
                      height={500}
                      className="object-cover w-full aspect-[4/5]"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl z-10">
                    <Quote size={32} className="opacity-50 mb-2" />
                    <p className="font-bold font-fredoka">Sourav Kumar</p>
                    <p className="text-sm opacity-80">Founder, Vidyatraa</p>
                  </div>
                </div>

                <div className="relative mt-4">
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50 relative">
                    <Image
                      src="/akhila_kondamadugu.jpeg"
                      alt="Akhila Kondamadugu"
                      width={400}
                      height={500}
                      className="object-cover w-full aspect-[4/5]"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-6 rounded-2xl shadow-xl z-10">
                    <Quote size={32} className="opacity-50 mb-2" />
                    <p className="font-bold font-fredoka">Akhila Kondamadugu</p>
                    <p className="text-sm opacity-80">Co-Founder, Vidyatraa</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 font-fredoka">A Message from the Founder</h2>
                <div className="prose prose-lg text-slate-650 max-w-none space-y-6 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  <p className="text-xl font-medium text-blue-600 italic">
                    &quot;My name is Sourav Kumar, and Vidyatraa was born from a problem I personally experienced.&quot;
                  </p>
                  <p>
                    Growing up as a student in India, I realized that opportunities were never equally visible to everyone.
                    Scholarships, grants, competitions, and educational support existed — but for students like me, finding them was difficult.
                  </p>
                  <p>
                    Not because we lacked talent. But because no one showed us the path.
                    There was no mentor guiding us step-by-step. No single platform simplifying opportunities.
                    Information was scattered across random websites, confusing portals, and outdated notices.
                    Many times, I discovered opportunities only after the deadlines had passed.
                  </p>
                  <p>
                    I know what it feels like to miss opportunities simply because you were unaware they existed.
                    And I also realized something important: Thousands of deserving students across India face the same problem every single day.
                  </p>
                  <p>
                    Especially students from rural areas, middle-class families, and first-generation learners who don&apos;t have
                    access to guidance, mentorship, or digital awareness.
                  </p>
                  <p className="bg-slate-50 p-8 rounded-2xl border-l-4 border-blue-600 font-bold text-slate-900">
                    Vidyatraa is more than a scholarship platform. It is a mission to ensure that no deserving student
                    loses educational opportunities because of lack of information, access, or support.
                  </p>
                  <p>
                    We are building an AI-powered student opportunity platform that helps students discover scholarships,
                    understand eligibility, manage documentation, and apply with confidence.
                  </p>
                  <p>
                    My vision is simple: To build a future where every student, regardless of background, has a fair chance to access education and opportunities.
                  </p>
                  <p>
                    This journey started from my own struggles. Now, I want Vidyatraa to become the guide I once needed myself.
                  </p>
                </div>

                <Divider className="my-12" />

                <div className="flex flex-wrap gap-4">
                  <Link href="/search">
                    <Button type="primary" size="large" className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold">
                      Browse Scholarships
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="large" className="h-14 px-8 rounded-xl font-bold">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission / Vision Cards */}
        <section className="py-24 bg-slate-50/40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm flex flex-col items-center text-center border border-slate-200/50">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 border border-blue-100">
                  <Target size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 font-fredoka">Our Mission</h3>
                <p className="text-slate-555 text-lg leading-relaxed font-medium">
                  To provide every student with a fair chance at success by delivering verified,
                  accessible, and timely information about educational funding and growth opportunities.
                </p>
              </div>
              <div className="bg-white p-12 rounded-[3rem] shadow-sm flex flex-col items-center text-center border border-slate-200/50">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-650 rounded-3xl flex items-center justify-center mb-8 border border-indigo-100">
                  <Eye size={40} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 font-fredoka">Our Vision</h3>
                <p className="text-slate-555 text-lg leading-relaxed font-medium">
                  To become the world&apos;s most trusted companion for students on their educational journey,
                  fostering a world where financial barriers no longer define a student&apos;s destiny.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
