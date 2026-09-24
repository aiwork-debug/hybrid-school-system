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

const loggedOutImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=85&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=85&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=85&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=85&w=3840&auto=format&fit=crop",
];

const studentImages = [
  {
    bg: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=85&w=3840&auto=format&fit=crop",
    right: "/Hero/student.jpg",
  },
  {
    bg: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=85&w=3840&auto=format&fit=crop",
    right: "/Hero/student.jpg",
  },
];

const teacherImages = [
  {
    bg: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=85&w=3840&auto=format&fit=crop",
    right: "/Hero/Teacher.webp",
  },
  {
    bg: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=85&w=3840&auto=format&fit=crop",
    right: "/Hero/Teacher.webp",
  },
];

export default function Hero({ session, enrolledCount, teacherCoursesCount }: HeroProps) {
  const router = useRouter();
  const role = session?.user?.role;
  const isLoggedOut = !session;

  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlider = isLoggedOut
    ? loggedOutImages.map((img) => ({ bg: img, right: "" }))
    : role === "STUDENT"
    ? studentImages
    : teacherImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlider.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeSlider.length]);

  const safeIndex = currentSlide % activeSlider.length;
  const currentItem = activeSlider[safeIndex] || activeSlider[0];

  return (
    <section className="relative w-full bg-white px-4 sm:px-8 lg:px-12 pt-8 pb-4 sm:pt-10 mb-8">
      <div className="relative w-full max-w-[105rem] mx-auto rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#070F18] shadow-2xl shadow-black/20 ring-1 ring-white/5 py-12 sm:py-16 min-h-[460px] sm:min-h-[520px]">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {activeSlider.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${
                index === safeIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url('${slide.bg}')`,
                animation: index === safeIndex ? "heroZoom 8s ease-in-out infinite alternate" : undefined,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            />
          ))}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#070F18]/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070F18]/70 via-[#070F18]/10 to-[#070F18]/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070F18]/45 via-transparent to-[#070F18]/45 z-10" />

        {/* Right Side Image — Pushed completely flush to the right edge and bottom corner */}
        {!isLoggedOut && currentItem.right && (
          <div className="absolute right-0 bottom-0 z-20 hidden lg:flex items-end justify-end w-[360px] xl:w-[420px] h-full pointer-events-none pr-0 mr-0">
            <div className="absolute bottom-16 right-16 w-72 h-72 bg-[#0EA894]/30 blur-[100px] rounded-full z-0" />
            <img
              src={currentItem.right}
              alt="Role specific view"
              className="relative z-10 h-full w-full object-contain object-right-bottom drop-shadow-2xl"
            />
          </div>
        )}

        <div className="relative z-20 w-full px-6 sm:px-12 max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Text Content */}
            <div
              className={`${
                isLoggedOut
                  ? "lg:col-span-10 lg:col-start-2 text-center items-center"
                  : "lg:col-span-7 text-left items-start"
              } flex flex-col`}
            >
              <div className="group inline-flex items-center gap-2.5 rounded-full border border-[#0EA894]/40 bg-[#0EA894]/15 px-5 py-2 text-xs font-bold text-[#0EA894] tracking-wider uppercase mb-6 backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
                <span>
                  {role === "STUDENT"
                    ? `Welcome Back, ${session?.user?.name || "Student"}! 🎓`
                    : role === "TEACHER"
                    ? `Instructor Hub | Welcome, ${session?.user?.name || "Teacher"} 👨‍🏫`
                    : "Live & Recorded Learning Platform"}
                </span>
              </div>

              <h1
                className={`text-4xl font-black tracking-tight leading-[1.1] text-white sm:text-6xl lg:text-7xl drop-shadow-md ${
                  isLoggedOut ? "max-w-5xl" : ""
                }`}
              >
                {role === "STUDENT" ? (
                  <>
                    Your learning portal, <br />
                    <span className="font-serif italic font-normal text-[#0EA894] tracking-wide">
                      {enrolledCount} active courses
                    </span>
                  </>
                ) : role === "TEACHER" ? (
                  <>
                    Inspire students globally, <br />
                    <span className="font-serif italic font-normal text-[#0EA894] tracking-wide">
                      {teacherCoursesCount} courses created
                    </span>
                  </>
                ) : (
                  <>
                    Learn from anywhere,
                    <br />
                    <span className="font-serif italic font-normal text-[#0EA894] tracking-wide">live or recorded</span>
                  </>
                )}
              </h1>

              <p
                className={`mt-6 text-base sm:text-lg font-medium text-slate-100 leading-relaxed drop-shadow ${
                  isLoggedOut ? "max-w-3xl mx-auto" : "max-w-2xl"
                }`}
              >
                {role === "STUDENT"
                  ? "Access your enrolled classes, join live lectures instantly, and track your syllabus progress right from your personal dashboard."
                  : role === "TEACHER"
                  ? "Manage your curriculum, review student assignments, upload lecture materials, and schedule live teaching sessions seamlessly."
                  : "Join immersive live classes with your teacher in real time, or master subjects at your own pace with crystal-clear on-demand recorded lectures."}
              </p>

              <div className={`mt-8 flex flex-wrap items-center gap-4 ${isLoggedOut ? "justify-center" : ""}`}>
                {role === "STUDENT" ? (
                  <Link
                    href="/dashboard/student"
                    className="rounded-full bg-[#0EA894] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/30 hover:bg-[#0bc0a9] transition-all"
                  >
                    Go to Student Dashboard →
                  </Link>
                ) : role === "TEACHER" ? (
                  <Link
                    href="/dashboard/teacher"
                    className="rounded-full bg-[#0EA894] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/30 hover:bg-[#0bc0a9] transition-all"
                  >
                    Manage Your Courses →
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="rounded-full bg-[#0EA894] px-9 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/30 hover:bg-[#0bc0a9] transition-all"
                    >
                      Join a live class →
                    </Link>
                    <Link
                      href="#teachers"
                      className="rounded-full border border-white/30 bg-white/10 px-9 py-4 text-sm font-bold text-white hover:bg-white/20 transition-all backdrop-blur-md"
                    >
                      Explore features →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {activeSlider.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === safeIndex ? "w-6 bg-[#0EA894]" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
      `}</style>
    </section>
  );
}