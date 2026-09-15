import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import AddCourseForm from "./AddCourseForm";

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (!session.user.role) redirect("/choose-role");
  if (session.user.role !== "TEACHER") redirect("/dashboard/student");
  if (!session.user.subject) redirect("/choose-subject");

  const courses = await prisma.course.findMany({
    where: { teacherId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      chapters: true,
      liveClasses: {
        where: { scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: "asc" },
        take: 1,
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Navbar />
      
      {/* Hero Section with Full-Stretch Wrapper */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8 z-20">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-16 sm:py-20 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
          
          {/* Absolute Background Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#0EA894]/12 blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#0EA894]/30 bg-[#0EA894]/10 px-4 py-1.5 text-xs font-bold text-[#0EA894] tracking-wider uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
              <span>Teacher Dashboard</span>
            </div>

            <h1 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-5xl leading-[1.12]">
              Welcome back, {session.user.name?.split(" ")[0] || "Teacher"} 👋
            </h1>

            <p className="max-w-xl text-sm sm:text-base font-normal text-slate-300 leading-relaxed mb-8">
              You teach <span className="font-bold text-[#0EA894]">{session.user.subject}</span>. Manage your courses, add chapters, upload lecture videos, and schedule live classes for your students.
            </p>

            {/* Stats Grid inside Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-3xl font-black text-white">{courses.length}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
                  Active Courses
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-3xl font-black text-white">
                  {courses.reduce((sum, c) => sum + c.chapters.length, 0)}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
                  Total Chapters
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-3xl font-black text-white">
                  {courses.filter((c) => c.liveClasses.length > 0).length}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
                  Upcoming Live
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto space-y-12">
        
        {/* Add Course Card */}
        <div className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm transition-all hover:border-[#0EA894]/30">
          <AddCourseForm />
        </div>

        {/* Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black tracking-tight text-[#0D1B2E]">
              Your Courses
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {courses.length} Course{courses.length !== 1 ? "s" : ""} Available
            </span>
          </div>

          {courses.length === 0 ? (
            <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0EA894]/10 text-[#0EA894] text-xl font-bold">
                📚
              </div>
              <h3 className="text-lg font-black text-[#0D1B2E] mb-1">No courses created yet</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                You haven&apos;t created any courses yet. Add your first course using the form above to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <Link
                  key={c.id}
                  href={`/dashboard/teacher/courses/${c.id}`}
                  className="group relative rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA894]/50 hover:shadow-xl hover:shadow-[#0EA894]/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-[#0EA894]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
                        {c.subject}
                      </span>
                      {c.liveClasses.length > 0 && (
                        <span className="rounded-full bg-red-50 border border-red-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-500 animate-pulse">
                          Live Upcoming
                        </span>
                      )}
                    </div>
                    
                    <h3 className="mb-2 text-xl font-black text-[#0D1B2E] group-hover:text-[#0EA894] transition-colors">
                      {c.title}
                    </h3>
                    
                    {c.description && (
                      <p className="mb-6 line-clamp-2 text-sm text-slate-600 font-normal leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{c.chapters.length} chapter{c.chapters.length !== 1 ? "s" : ""}</span>
                    <span className="text-[#0EA894] flex items-center gap-1 transition-transform group-hover:translate-x-1">
                      Manage Course →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}