import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import AdminTabs from "./AdminTabs";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/login");

  const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
  const totalTeachers = await prisma.user.count({ where: { role: "TEACHER" } });
  const totalCourses = await prisma.course.count();
  const totalEnrollments = await prisma.enrollment.count();

  const teachers = await prisma.user.findMany({
    where: { role: "TEACHER" },
    orderBy: { createdAt: "desc" },
    include: {
      coursesTaught: {
        orderBy: { createdAt: "desc" },
        include: {
          enrollments: true,
          chapters: true,
        },
      },
    },
  });

  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" },
    include: {
      enrollments: {
        include: { course: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

    const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teacher: { select: { name: true, email: true } },
      chapters: true,
      enrollments: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Navbar />

      {/* Hero */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8 z-20">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-16 sm:py-20 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold text-violet-300 tracking-wider uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span>Admin Dashboard</span>
            </div>

            <h1 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-5xl leading-[1.12]">
              Welcome, {session.user.name?.split(" ")[0] || "Admin"} 👑
            </h1>
                        <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Monitor all platform activity here — teachers, students, courses, and enrollments.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <StatBox label="Total Teachers" value={totalTeachers} />
              <StatBox label="Total Students" value={totalStudents} />
              <StatBox label="Total Courses" value={totalCourses} />
              <StatBox label="Total Enrollments" value={totalEnrollments} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Teachers / Students */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto">
        <AdminTabs teachers={teachers} students={students} courses={courses} />      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
      <p className="text-2xl sm:text-3xl font-black text-white">{value}</p>
      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-violet-300 mt-1">
        {label}
      </p>
    </div>
  );
}