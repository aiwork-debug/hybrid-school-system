import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import AddCourseForm from "./AddCourseForm";
import StatBox from "./components/StatBox";
import CourseCard from "./components/CourseCard";
import EmptyCourses from "./components/EmptyCourses";

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
      enrollments: true,
      liveClasses: {
        where: { scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: "asc" },
        take: 1,
      },
    },
  });

  const totalChapters = courses.reduce((sum, c) => sum + c.chapters.length, 0);
  const upcomingLiveCount = courses.filter((c) => c.liveClasses.length > 0).length;
  const totalStudentsEnrolled = courses.reduce((sum, c) => sum + c.enrollments.length, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Navbar />

      {/* Hero */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8 z-20">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-16 sm:py-20 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
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

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              <StatBox label="Active Courses" value={courses.length} />
              <StatBox label="Total Chapters" value={totalChapters} />
              <StatBox label="Total Students" value={totalStudentsEnrolled} />
              <StatBox label="Upcoming Live" value={upcomingLiveCount} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto space-y-12">
        <div className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm transition-all hover:border-[#0EA894]/30">
          <AddCourseForm />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black tracking-tight text-[#0D1B2E]">Your Courses</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {courses.length} Course{courses.length !== 1 ? "s" : ""} Available
            </span>
          </div>

          {courses.length === 0 ? (
            <EmptyCourses />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}