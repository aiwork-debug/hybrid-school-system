import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default async function GuidePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Header */}
        <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8">
          <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-12 sm:py-16 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="rounded-full bg-[#0EA894]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894] mb-3 inline-block">
                Platform Documentation
              </span>
              <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                System User Guide 📖
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Find complete instructions and workflows for Students, Teachers, and Administrators to get the most out of the platform.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto space-y-12 pb-20">
          
          {/* Student Guide Section */}
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex items-center space-x-4">
              <span className="p-3 bg-[#0EA894]/10 text-[#0EA894] rounded-2xl text-xl font-black">🎓</span>
              <div>
                <h2 className="text-2xl font-black text-[#0D1B2E]">Student Guide</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">How to learn & manage courses</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">1. Course Enrollment</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Explore available subjects on your dashboard and click Enroll Now to join any course instantly. You can also unenroll if needed.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">2. Live Classes</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Check your dashboard for scheduled live classes. Click the Join Live Class button at the scheduled time to connect via the meeting URL.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">3. Chapters & Materials</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Access enrolled courses to view chapters, recorded lectures, slides, and complete assignments uploaded by your teachers.
                </p>
              </div>
            </div>
          </div>

          {/* Teacher Guide Section */}
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex items-center space-x-4">
              <span className="p-3 bg-[#0EA894]/10 text-[#0EA894] rounded-2xl text-xl font-black">👨‍🏫</span>
              <div>
                <h2 className="text-2xl font-black text-[#0D1B2E]">Teacher Guide</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">How to teach & manage content</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">1. Course Creation</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Create new courses with titles, subjects, and descriptions. You can also delete your created courses safely along with their contents.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">2. Scheduling Live Classes</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Schedule live streaming sessions by setting up a title, date/time (`scheduledAt`), and providing a meeting link for your enrolled students.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">3. Lectures & Assignments</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Organize course content into chapters, add recorded lecture videos, slides, and post assignments with due dates for students.
                </p>
              </div>
            </div>
          </div>

          {/* Admin Guide Section */}
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex items-center space-x-4">
              <span className="p-3 bg-[#0EA894]/10 text-[#0EA894] rounded-2xl text-xl font-black">⚡</span>
              <div>
                <h2 className="text-2xl font-black text-[#0D1B2E]">Admin Guide</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">System oversight & management</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">1. User Role Management</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Oversee user roles (Student, Teacher, Admin) and ensure proper authorization across all system portals and protected routes.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-black text-[#0D1B2E] text-sm">2. Platform Monitoring</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monitor system logs, database stability, active courses, and overall user engagement to keep the hybrid school system running smoothly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}