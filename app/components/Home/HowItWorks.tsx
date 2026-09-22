"use client";

import { useState } from "react";

const studentSteps = [
  {
    number: "01",
    title: "Create your student account",
    desc: "Sign up instantly and set your role to student to access your learner portal dashboard.",
  },
  {
    number: "02",
    title: "Join live classes & explore courses",
    desc: "Browse available subjects, enroll in courses, and click 'Join Live' when your scheduled classes go live.",
  },
  {
    number: "03",
    title: "Learn & track progress",
    desc: "Access recorded lecture videos, study materials, submit assignments, and track your overall completion progress automatically.",
  },
];

const teacherSteps = [
  {
    number: "01",
    title: "Set up your instructor account",
    desc: "Register on the platform, choose the teacher role, and open your professional instructor portal.",
  },
  {
    number: "02",
    title: "Create courses & schedule live sessions",
    desc: "Build your course curriculum, upload chapter lectures, and schedule live streaming classes with meeting links easily.",
  },
  {
    number: "03",
    title: "Manage students & track engagement",
    desc: "Monitor student enrollments, review submitted assignments, grade tests, and oversee classroom analytics seamlessly.",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"STUDENT" | "TEACHER">("STUDENT");

  const steps = activeTab === "STUDENT" ? studentSteps : teacherSteps;

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 border-t border-slate-100">
      {/* Full Stretch Container with Zero Left/Right Padding */}
      <div className="w-full px-4 sm:px-8 lg:px-16 max-w-[105rem] mx-auto">
        
        {/* Role Toggle Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-slate-50 border border-slate-200 p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab("STUDENT")}
              className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                activeTab === "STUDENT"
                  ? "bg-[#0EA894] text-white shadow-md shadow-[#0EA894]/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              For Students 
            </button>
            <button
              onClick={() => setActiveTab("TEACHER")}
              className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                activeTab === "TEACHER"
                  ? "bg-[#0EA894] text-white shadow-md shadow-[#0EA894]/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              For Teachers 
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 pt-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#0EA894]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
                Getting started
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tight text-[#0D1B2E] sm:text-6xl mb-6 leading-[1.08]">
              How it <br />
              works for {activeTab === "STUDENT" ? "Students" : "Teachers"}
            </h2>

            <p className="text-base sm:text-lg font-normal leading-relaxed text-slate-600 max-w-md mb-8">
              {activeTab === "STUDENT"
                ? "Simple steps to discover courses, join interactive live classes, and manage your learning journey without hassle."
                : "Streamlined tools to build curriculum, host live lectures, and manage your student community effortlessly."}
            </p>

            <a
              href="/signup"
              className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#0EA894] hover:underline"
            >
              <span>Get started now</span>
              <span className="ml-2 font-black">→</span>
            </a>
          </div>

          {/* Right Stacked Process Rows with Outlines */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className="group relative py-8 px-6 sm:px-8 rounded-3xl border-2 border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-[#0EA894] hover:shadow-xl hover:shadow-[#0EA894]/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
                  
                  {/* Step Number Badge */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-black text-[#0D1B2E] group-hover:bg-[#0EA894] group-hover:border-[#0EA894] group-hover:text-white transition-all duration-300">
                    {step.number}
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black tracking-tight text-[#0D1B2E] mb-3 group-hover:text-[#0EA894] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-base font-normal leading-relaxed text-slate-600 max-w-2xl">
                      {step.desc}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}