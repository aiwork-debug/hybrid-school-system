import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import { enrollCourse } from "./actions";
import { LiveClassItem } from "./types";
import LiveClassCard from "./components/LiveClassCard";
import EnrolledCourseCard from "./components/EnrolledCourseCard";
import AvailableCourseCard from "./components/AvailableCourseCard";
import EmptyState from "./components/EmptyState";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (!session.user.role) redirect("/choose-role");
  if (session.user.role !== "STUDENT") redirect("/dashboard/teacher");

  const enrolledCourses = await prisma.course.findMany({
    where: {
      enrollments: { some: { studentId: session.user.id } },
    },
    include: {
      teacher: true,
      chapters: { include: { recordedLectures: true } },
      liveClasses: true,
    },
  });

  const upcomingLiveClasses: LiveClassItem[] = enrolledCourses.flatMap((course) => {
    const classes = course.liveClasses ?? [];
    return classes.map((lc) => ({
      id: lc.id,
      title: lc.title,
      startTime: "startTime" in lc ? (lc.startTime as Date) : undefined,
      meetingUrl: "meetingUrl" in lc ? (lc.meetingUrl as string | null) : null,
      courseTitle: course.title,
    }));
  });

  const availableCourses = await prisma.course.findMany({
    where: {
      NOT: { enrollments: { some: { studentId: session.user.id } } },
    },
    include: {
      teacher: true,
      _count: { select: { chapters: true } },
    },
  });

   const totalTeachers = await prisma.user.count({ where: { role: "TEACHER" } });
  const totalCourses = await prisma.course.count();
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Navbar />

      {/* Hero */}
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
                       <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Track your enrolled learning paths, explore new subjects, and access lecture videos and materials.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-2xl sm:text-3xl font-black text-white">{totalTeachers}</p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
                  Total Teachers
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-2xl sm:text-3xl font-black text-white">{totalCourses}</p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
                  Total Courses
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-2xl sm:text-3xl font-black text-white">{enrolledCourses.length}</p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
                  My Enrolled
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-2xl sm:text-3xl font-black text-white">{availableCourses.length}</p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
                  Can Enroll
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto space-y-12">

        {/* Live Classes */}
        {upcomingLiveClasses.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-[#0D1B2E]">Scheduled Live Classes</h2>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0EA894] bg-[#0EA894]/10 px-3 py-1 rounded-full">
                {upcomingLiveClasses.length} Upcoming
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingLiveClasses.map((lc) => (
                <LiveClassCard key={lc.id} liveClass={lc} />
              ))}
            </div>
          </div>
        )}

        {/* Enrolled Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#0D1B2E]">My Enrolled Courses</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {enrolledCourses.length} Active Course{enrolledCourses.length !== 1 ? "s" : ""}
            </span>
          </div>

          {enrolledCourses.length === 0 ? (
            <EmptyState text="You haven't enrolled in any courses yet. Explore available courses below and start learning!" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <EnrolledCourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>

        {/* Available Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#0D1B2E]">Explore Available Courses</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {availableCourses.length} Available
            </span>
          </div>

          {availableCourses.length === 0 ? (
            <EmptyState text="No new courses available right now." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <AvailableCourseCard key={course.id} course={course} onEnroll={enrollCourse} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}