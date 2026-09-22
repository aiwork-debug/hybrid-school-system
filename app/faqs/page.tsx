"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  categoryTitle: string;
  faqs: FAQItem[];
}

const studentCategories: FAQCategory[] = [
  {
    categoryTitle: "🎓 Account & Enrollment",
    faqs: [
      {
        question: "How do I create a student account and log in?",
        answer: "You can sign up using your email and choose 'Student' role. Once registered, use your credentials on the login page to access your personal dashboard instantly.",
      },
      {
        question: "How do I enroll in a new subject or course?",
        answer: "Browse available courses from the home page or your dashboard course catalog. Click 'Enroll Now' to get instant access to the curriculum materials.",
      },
      {
        question: "Can I change my profile details or password?",
        answer: "Yes, head over to your student dashboard settings to update your personal information, profile photo, and security credentials.",
      },
    ],
  },
  {
    categoryTitle: "🎥 Live Classes & Recorded Lectures",
    faqs: [
      {
        question: "How do I join a live class?",
        answer: "Navigate to your enrolled courses in your student dashboard. A 'Join Live' button will appear automatically 10 minutes before the scheduled class time.",
      },
      {
        question: "What if I miss a live session? Are recordings available?",
        answer: "Yes! All live sessions are automatically recorded and uploaded to your course portal within 2 hours after the live broadcast ends so you never miss a lesson.",
      },
      {
        question: "How can I adjust video playback quality for recorded lectures?",
        answer: "The video player comes with an adaptive bitrate control. You can manually select 720p, 1080p, or lower resolutions depending on your internet connection.",
      },
    ],
  },
  {
    categoryTitle: "📝 Assignments, Tests & Progress",
    faqs: [
      {
        question: "How do I submit my course assignments?",
        answer: "Go to the specific course module, open the assignment tab, upload your solution file (PDF, code zip, or document), and click 'Submit Assignment'.",
      },
      {
        question: "How is my course progress tracked?",
        answer: "Your dashboard automatically tracks completed video lectures, quiz scores, and assignment submissions, displaying an overall completion percentage bar.",
      },
      {
        question: "Will I get a certificate after completing a course?",
        answer: "Yes, upon successfully finishing all modules and passing required quizzes, a downloadable digital completion certificate becomes available in your profile.",
      },
    ],
  },
];

const teacherCategories: FAQCategory[] = [
  {
    categoryTitle: "📚 Course Creation & Management",
    faqs: [
      {
        question: "How do I create and publish a new course?",
        answer: "From your teacher dashboard, click on 'Create New Course', fill in the title, syllabus description, category, and upload a professional thumbnail banner.",
      },
      {
        question: "Can I edit my course content after publishing?",
        answer: "Yes, you have full flexibility to add new modules, update lecture videos, or modify assignment guidelines at any time from your instructor panel.",
      },
      {
        question: "How do I upload recorded lectures and study materials?",
        answer: "You can upload high-definition video files, lecture notes (PDFs), and reference resource links directly into individual course chapters.",
      },
    ],
  },
  {
    categoryTitle: "🔴 Hosting Live Classes & Interaction",
    faqs: [
      {
        question: "How do I schedule and host a live class?",
        answer: "Go to your teacher dashboard, select your course, and click 'Schedule Live Lecture' to input the date, time, and your preferred meeting/streaming link.",
      },
      {
        question: "Can I interact with students during a live session?",
        answer: "Yes, you can share your screen, use the interactive whiteboard, answer real-time student chat questions, and enable voice discussions.",
      },
      {
        question: "Are live lectures automatically saved for students?",
        answer: "If recorded through the platform integration, sessions are processed and stored in the course archive for students who couldn't attend live.",
      },
    ],
  },
  {
    categoryTitle: "💰 Analytics, Students & Payouts",
    faqs: [
      {
        question: "How do I track student enrollments and performance?",
        answer: "Your instructor dashboard provides real-time analytics showing total enrolled students, assignment submission status, and class engagement metrics.",
      },
      {
        question: "When and how do I receive my teaching earnings?",
        answer: "Payouts are processed automatically at the end of each billing cycle directly to your connected bank account or designated payment gateway.",
      },
      {
        question: "How can I resolve student queries or doubts?",
        answer: "You can check the course Q&A discussion board where students post subject-related questions and provide official instructor feedback.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [activeTab, setActiveTab] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [openIndices, setOpenIndices] = useState<{ [key: string]: boolean }>({ "0-0": true });

  // Form states for submitting a custom question
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedRole, setSubmittedRole] = useState("STUDENT");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const currentCategories = activeTab === "STUDENT" ? studentCategories : teacherCategories;

  function toggleAccordion(catIdx: number, faqIdx: number) {
    const key = `${catIdx}-${faqIdx}`;
    setOpenIndices((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleQuestionSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSuccess(true);
    setSubmittedQuery("");
    setTimeout(() => setFormSuccess(false), 5000);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Header matching GuidePage styling */}
        <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8">
          <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-12 sm:py-16 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="rounded-full bg-[#0EA894]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894] mb-3 inline-block">
                Help Center & Support
              </span>
              <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Frequently Asked Questions ❓
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore structured answers categorized by topics for students and instructors, or submit your own query directly.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto space-y-12 pb-20">
          
          {/* Role Toggle Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-full bg-white border border-slate-200 p-1.5 shadow-sm">
              <button
                onClick={() => { setActiveTab("STUDENT"); setOpenIndices({ "0-0": true }); }}
                className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                  activeTab === "STUDENT"
                    ? "bg-[#0EA894] text-white shadow-md shadow-[#0EA894]/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                For Students 🎓
              </button>
              <button
                onClick={() => { setActiveTab("TEACHER"); setOpenIndices({ "0-0": true }); }}
                className={`rounded-full px-8 py-3 text-sm font-bold transition-all ${
                  activeTab === "TEACHER"
                    ? "bg-[#0EA894] text-white shadow-md shadow-[#0EA894]/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                For Teachers 👨‍🏫
              </button>
            </div>
          </div>

          {/* Categorized FAQs Section */}
          <div className="space-y-12">
            {currentCategories.map((category, catIdx) => (
              <div 
                key={catIdx}
                className="w-full bg-white rounded-[2.5rem] border-2 border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6"
              >
                <h3 className="text-xl sm:text-2xl font-black text-[#0D1B2E] tracking-wide border-b border-slate-200 pb-4 flex items-center gap-3">
                  {category.categoryTitle}
                </h3>

                <div className="space-y-4">
                  {category.faqs.map((faq, faqIdx) => {
                    const key = `${catIdx}-${faqIdx}`;
                    const isOpen = !!openIndices[key];

                    return (
                      <div
                        key={faqIdx}
                        className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden transition-all duration-200 hover:border-[#0EA894]/40"
                      >
                        <button
                          onClick={() => toggleAccordion(catIdx, faqIdx)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-base text-[#0D1B2E] hover:text-[#0EA894] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <span className={`h-8 w-8 rounded-full bg-white flex items-center justify-center text-xl shrink-0 transition-transform ${isOpen ? "rotate-45 text-[#0EA894]" : "text-slate-500"}`}>
                            +
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 bg-white">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Question Submission Section */}
          <div className="w-full bg-white rounded-[2.5rem] border-2 border-slate-200/80 p-8 sm:p-12 shadow-sm">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0D1B2E] tracking-tight">
                Still have a question?
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Can’t find the specific answer you need? Drop your question below and our support team will respond directly via email.
              </p>
            </div>

            {formSuccess ? (
              <div className="rounded-2xl bg-[#0EA894]/10 border border-[#0EA894]/30 p-6 text-center text-[#0EA894] font-bold text-lg">
                🎉 Your question has been submitted successfully! We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={submittedName}
                      onChange={(e) => setSubmittedName(e.target.value)}
                      placeholder="Ahmed Nadeem"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#0EA894] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={submittedEmail}
                      onChange={(e) => setSubmittedEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#0EA894] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                    I am a
                  </label>
                  <select
                    value={submittedRole}
                    onChange={(e) => setSubmittedRole(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-[#0EA894] transition-colors"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="VISITOR">Visitor / Parent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                    Your Question or Query
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={submittedQuery}
                    onChange={(e) => setSubmittedQuery(e.target.value)}
                    placeholder="Type your question in detail here..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#0EA894] transition-colors resize-none"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="rounded-full bg-[#0EA894] px-10 py-4 text-sm font-black text-white shadow-lg shadow-[#0EA894]/25 hover:bg-[#0bc0a9] transition-all hover:-translate-y-0.5"
                  >
                    Submit Question →
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}