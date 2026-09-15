import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StudentCourseViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const courseId = resolvedParams.id;

  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/dashboard/teacher");

  // Check if student is enrolled in this course
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: session.user.id,
        courseId: courseId,
      },
    },
  });

  if (!enrollment) {
    redirect("/dashboard/student");
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      teacher: true,
      chapters: {
        orderBy: { order: "asc" },
        include: {
          recordedLectures: {
            orderBy: { createdAt: "asc" },
          },
        },
      },
    },
  });

  if (!course) redirect("/dashboard/student");

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Hero Header */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8 z-20">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-12 sm:py-16 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0EA894] uppercase tracking-wider mb-4 hover:underline"
            >
              ← Back to Student Dashboard
            </Link>

            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-[#0EA894]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
                {course.subject}
              </span>
              <span className="text-xs font-bold text-slate-400">
                Instructor: {course.teacher?.name || "Teacher"}
              </span>
            </div>

            <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {course.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {course.description || "Access your course chapters, recorded lectures, and downloadable materials below."}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters & Lectures Content */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#0D1B2E]">Course Content</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {course.chapters.length} Chapter{course.chapters.length !== 1 ? "s" : ""}
          </span>
        </div>

        {course.chapters.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-sm text-slate-500 font-medium">
              No chapters or lectures uploaded by the teacher yet. Check back soon!
            </p>
          </div>
        ) : (
          course.chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Chapter Header */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0EA894]/10 text-xs font-black text-[#0EA894]">
                  {index + 1}
                </span>
                <h3 className="text-lg font-black text-[#0D1B2E]">{chapter.title}</h3>
              </div>

              {/* Recorded Lectures List */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Lectures & Materials ({chapter.recordedLectures.length})
                </h4>

                {chapter.recordedLectures.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No lectures available in this chapter yet.</p>
                ) : (
                  <div className="space-y-3">
                    {chapter.recordedLectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 transition-all hover:border-[#0EA894]/40"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-black text-[#0D1B2E]">{lecture.title}</p>
                          {lecture.description && (
                            <p className="text-xs text-slate-500 leading-relaxed">{lecture.description}</p>
                          )}
                          {lecture.durationMins && (
                            <span className="inline-block text-[11px] font-bold text-slate-400">
                              ⏱ Duration: {lecture.durationMins} minutes
                            </span>
                          )}
                        </div>

                        {/* Action Buttons for Video & Slides */}
                        <div className="flex flex-wrap gap-2.5">
                          {lecture.videoUrl && (
                            <a
                              href={lecture.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl bg-[#0EA894] text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-md shadow-[#0EA894]/20 hover:bg-[#0c9582] transition-colors"
                            >
                              🎥 Watch Video ↗
                            </a>
                          )}
                          {lecture.slidesUrl && (
                            <a
                              href={lecture.slidesUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                            >
                              📄 View Slides ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}