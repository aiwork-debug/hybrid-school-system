import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { enrollCourse } from "./actions";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (!session.user.role) {
    redirect("/choose-role");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard/teacher");
  }

  // 1. Fetch courses jo student ne enroll kiye hain
  const enrolledCourses = await prisma.course.findMany({
    where: {
      enrollments: {
        some: {
          studentId: session.user.id,
        },
      },
    },
    include: {
      teacher: true,
      chapters: {
        include: {
          recordedLectures: true,
        },
      },
    },
  });

  // 2. Fetch all other available courses jo student ne enroll nahi kiye
  const availableCourses = await prisma.course.findMany({
    where: {
      NOT: {
        enrollments: {
          some: {
            studentId: session.user.id,
          },
        },
      },
    },
    include: {
      teacher: true,
      _count: {
        select: { chapters: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Navbar />
      
      {/* Hero Header */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8 z-20">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-12 sm:py-16 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="rounded-full bg-[#0EA894]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894] mb-3 inline-block">
              Student Portal
            </span>
            <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Welcome back, {session.user.name || "Student"}! 👋
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Track your enrolled learning paths, explore new subjects, and access lecture videos and materials.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto space-y-12">
        
        {/* Enrolled Courses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#0D1B2E]">My Enrolled Courses</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {enrolledCourses.length} Active Course{enrolledCourses.length !== 1 ? "s" : ""}
            </span>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-sm text-slate-500 font-medium">
                You havent enrolled in any courses yet. Explore available courses below and start learning!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-full bg-[#0EA894]/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#0EA894]">
                        {course.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Instructor: {course.teacher?.name || "Teacher"}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#0D1B2E] mb-2">{course.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description || "No description provided."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {course.chapters.length} Chapters
                    </span>
                    <Link
                      href={`/dashboard/student/courses/${course.id}`}
                      className="rounded-xl bg-[#0EA894] text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-md shadow-[#0EA894]/20 hover:bg-[#0c9582] transition-colors"
                    >
                      Continue Learning →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Courses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#0D1B2E]">Explore Available Courses</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {availableCourses.length} Available
            </span>
          </div>

          {availableCourses.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center">
              <p className="text-xs text-slate-400">No new courses available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <div key={course.id} className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-600">
                        {course.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {course.teacher?.name || "Teacher"}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#0D1B2E] mb-2">{course.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description || "No description provided."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {course._count.chapters} Chapters
                    </span>
                    <form action={enrollCourse.bind(null, course.id)}>
                      <button
                        type="submit"
                        className="rounded-xl bg-[#0D1B2E] text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-md hover:bg-slate-800 transition-colors"
                      >
                        Enroll Now +
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}