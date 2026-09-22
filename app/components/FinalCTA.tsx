"use client";
// File: app/components/FinalCTA.tsx

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function FinalCTA() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleAuthRedirect = (e: React.MouseEvent, defaultTarget: string) => {
    e.preventDefault();

    if (!session?.user) {
      // Agar logged in nahi hai toh signup page par bhejein
      router.push("/signup");
      return;
    }

    const role = session.user.role;
    const roleSelected = session.user.roleSelected;

    // Agar role select nahi kiya hua (Google login wale users ke liye)
    if (!roleSelected && role !== "ADMIN") {
      router.push("/choose-role");
      return;
    }

    // Role ke mutabiq respective dashboard par redirect karein
    if (role === "TEACHER") {
      router.push("/dashboard/teacher");
    } else if (role === "ADMIN") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/student");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070F18] py-12 sm:py-16 rounded-[3rem] sm:rounded-[4rem] mx-4 sm:mx-8 lg:mx-12 mb-16 z-10 shadow-2xl">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#0EA894]/15 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Full Stretch Container */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          
          {/* Top Label with Dashes */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#0EA894]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
              Get Started Today
            </span>
            <span className="h-[2px] w-8 bg-[#0EA894]" />
          </div>

          {/* Super Bold Heading */}
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl mb-4 leading-[1.08]">
            Ready to get started?
          </h2>

          {/* Description */}
          <p className="max-w-xl text-base sm:text-lg font-normal text-slate-300 leading-relaxed">
            Join a live class today, or explore recorded lectures at your own pace. Free to sign up as a student.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button
              onClick={(e) => handleAuthRedirect(e, "/signup")}
              className="group inline-flex items-center justify-center rounded-full bg-[#0EA894] px-9 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/25 transition-all duration-300 hover:bg-[#0bc0a9] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Join a live class</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>

            <button
              onClick={(e) => handleAuthRedirect(e, "#lectures")}
              className="group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md px-9 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Browse lectures</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5 opacity-70 group-hover:opacity-100">→</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}