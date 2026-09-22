"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";

interface HeroProps {
  session: Session | null;
  enrolledCount: number;
  teacherCoursesCount: number;
}

// Har role ke liye alag image sliders (Background aur Right side images ke liye)
const loggedOutImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=100&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=100&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=100&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=100&w=2560&auto=format&fit=crop",
];

const studentImages = [
  {
    bg: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=100&w=2560&auto=format&fit=crop",
    right: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=100&w=1200&auto=format&fit=crop",
  },
  {
    bg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=100&w=2560&auto=format&fit=crop",
    right: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=100&w=1200&auto=format&fit=crop",
  },
];

const teacherImages = [
  {
    bg: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=100&w=2560&auto=format&fit=crop",
    right: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=100&w=1200&auto=format&fit=crop",
  },
  {
    bg: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=100&w=2560&auto=format&fit=crop",
    right: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=100&w=1200&auto=format&fit=crop",
  },
];

export default function Hero({ session, enrolledCount, teacherCoursesCount }: HeroProps) {
  const router = useRouter();
  const role = session?.user?.role;
  const isLoggedOut = !session;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Active images array select karna role ke mutabiq
  const activeSlider = isLoggedOut
    ? loggedOutImages.map((img) => ({ bg: img, right: "" }))
    : role === "STUDENT"
    ? studentImages
    : teacherImages;

useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlider.length);
    }, 3000); // Har 3 seconds ke baad change hoga
    return () => clearInterval(timer);
  }, [activeSlider.length]);

  const currentItem = activeSlider[currentSlide] || activeSlider[0];

  return (
    <section className="relative overflow-hidden bg-[#070F18] py-24 sm:py-32 mb-8 z-20">
      
      {/* Background Slider with Smooth Loop Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeSlider.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-full scale-100"
            }`}
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
        ))}
      </div>

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-[#070F18]/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070F18]/80 via-[#070F18]/40 to-[#070F18]/80 z-10" />
      
      <div className="relative z-20 w-full px-6 sm:px-12 max-w-[105rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className={`${isLoggedOut ? "lg:col-span-10 lg:col-start-2 text-center items-center" : "lg:col-span-8 text-left items-start"} flex flex-col`}>
            
            <div className="group inline-flex items-center gap-2.5 rounded-full border border-[#0EA894]/40 bg-[#0EA894]/20 px-5 py-2 text-xs font-bold text-[#0EA894] tracking-wider uppercase mb-6 backdrop-blur-md shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
              <span>
                {role === "STUDENT"
                  ? `Welcome Back, ${session?.user?.name || "Student"}! 🎓`
                  : role === "TEACHER"
                  ? `Instructor Hub | Welcome, ${session?.user?.name || "Teacher"} 👨‍🏫`
                  : "Live & Recorded Learning Platform"}
              </span>
            </div>

            <h1 className={`text-4xl font-black tracking-tight leading-[1.1] text-white sm:text-6xl lg:text-7xl drop-shadow-md ${isLoggedOut ? "max-w-5xl" : ""}`}>
              {role === "STUDENT" ? (
                <>Your learning portal, <br /><span className="font-serif italic font-normal text-[#0EA894] tracking-wide">{enrolledCount} active courses</span></>
              ) : role === "TEACHER" ? (
                <>Inspire students globally, <br /><span className="font-serif italic font-normal text-[#0EA894] tracking-wide">{teacherCoursesCount} courses created</span></>
              ) : (
                <>Learn from anywhere,<br /><span className="font-serif italic font-normal text-[#0EA894] tracking-wide">live or recorded</span></>
              )}
            </h1>

            <p className={`mt-6 text-base sm:text-lg font-medium text-slate-100 leading-relaxed drop-shadow ${isLoggedOut ? "max-w-3xl mx-auto" : "max-w-2xl"}`}>
              {role === "STUDENT"
                ? "Access your enrolled classes, join live lectures instantly, and track your syllabus progress right from your personal dashboard."
                : role === "TEACHER"
                ? "Manage your curriculum, review student assignments, upload lecture materials, and schedule live teaching sessions seamlessly."
                : "Join immersive live classes with your teacher in real time, or master subjects at your own pace with crystal-clear on-demand recorded lectures."}
            </p>

            <div className={`mt-8 flex flex-wrap items-center gap-4 ${isLoggedOut ? "justify-center" : ""}`}>
              {role === "STUDENT" ? (
                <Link href="/dashboard/student" className="rounded-full bg-[#0EA894] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/30 hover:bg-[#0bc0a9] transition-all">
                  Go to Student Dashboard →
                </Link>
              ) : role === "TEACHER" ? (
                <Link href="/dashboard/teacher" className="rounded-full bg-[#0EA894] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/30 hover:bg-[#0bc0a9] transition-all">
                  Manage Your Courses →
                </Link>
              ) : (
                <>
                  <Link href="/signup" className="rounded-full bg-[#0EA894] px-9 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/30 hover:bg-[#0bc0a9] transition-all">
                    Join a live class →
                  </Link>
                  <Link href="#teachers" className="rounded-full border border-white/30 bg-white/15 px-9 py-4 text-sm font-bold text-white hover:bg-white/25 transition-all backdrop-blur-md">
                    Explore features →
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Side Image Slider (Logged-in users ke liye) */}
          {!isLoggedOut && currentItem.right && (
            <div className="lg:col-span-4 hidden lg:flex justify-end relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0EA894]/30 blur-[80px] rounded-full z-0 pointer-events-none" />
              
              <div className="relative z-10 w-full max-w-[280px] sm:max-w-xs aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl">
                <img 
                  src={currentItem.right} 
                  alt="Role specific view" 
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070F18]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
                  <span className="text-white text-xs font-bold tracking-wide">
                    {role === "STUDENT" ? "Keep Growing" : "Keep Inspiring"}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}