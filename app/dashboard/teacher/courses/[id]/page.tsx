import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { 
  addChapter, 
  deleteChapter, 
  addRecordedLecture, 
  deleteLecture, 
  scheduleLiveClass, 
  deleteLiveClass 
} from "./actions";

export default async function TeacherCourseManagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const courseId = resolvedParams.id;

  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "TEACHER") redirect("/dashboard/student");

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          recordedLectures: {
            orderBy: { createdAt: "asc" },
          },
        },
      },
      liveClasses: {
        orderBy: { scheduledAt: "asc" },
      },
    },
  });

  if (!course || course.teacherId !== session.user.id) {
    redirect("/dashboard/teacher");
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="pb-20">
          {/* Hero Header */}
          <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8 z-20">
            <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-12 sm:py-16 rounded-[2.5rem] border border-white/10 shadow-2xl px-8 sm:px-16">
              
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <Link
                  href="/dashboard/teacher"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0EA894] uppercase tracking-wider mb-4 hover:underline"
                >
                  ← Back to Dashboard
                </Link>

                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-[#0EA894]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
                    {course.subject}
                  </span>
                </div>

                <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {course.title}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {course.description || "Manage your course syllabus, chapters, recorded lectures, and live classes below."}
                </p>
              </div>

            </div>
          </div>

          {/* Main Content Container */}
          <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Chapters, Lectures & Live Classes */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* LIVE CLASSES SECTION */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-[#0D1B2E]">Live Classes</h2>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {course.liveClasses.length} Scheduled
                  </span>
                </div>

                {course.liveClasses.length === 0 ? (
                  <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-6 text-center">
                    <p className="text-xs text-slate-400">No live classes scheduled for this course yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {course.liveClasses.map((lc) => (
                      <div key={lc.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 flex items-center justify-between shadow-sm">
                        <div>
                          <h3 className="text-base font-black text-[#0D1B2E]">{lc.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            🕒 Scheduled At: {new Date(lc.scheduledAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={lc.meetingUrl || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl bg-[#0EA894] text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-sm hover:bg-[#0c9582]"
                          >
                            Start / Join ↗
                          </a>
                          <form action={deleteLiveClass.bind(null, lc.id, course.id)}>
                            <button type="submit" className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-2 rounded-xl">
                              ✕
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* COURSE SYLLABUS SECTION */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-[#0D1B2E]">Course Syllabus</h2>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {course.chapters.length} Chapter{course.chapters.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {course.chapters.length === 0 ? (
                  <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                      No chapters added yet. Use the panel on the right to add your first chapter.
                    </p>
                  </div>
                ) : (
                  course.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0EA894]/10 text-xs font-black text-[#0EA894]">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-black text-[#0D1B2E]">{chapter.title}</h3>
                        </div>

                        <form action={deleteChapter.bind(null, chapter.id, course.id)}>
                          <button
                            type="submit"
                            className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
                          >
                            Delete Chapter
                          </button>
                        </form>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                          Lectures & Videos ({chapter.recordedLectures.length})
                        </h4>

                        {chapter.recordedLectures.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No lectures uploaded in this chapter yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {chapter.recordedLectures.map((lecture) => (
                              <div
                                key={lecture.id}
                                className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 transition-all hover:border-[#0EA894]/40"
                              >
                                <div>
                                  <p className="text-sm font-black text-[#0D1B2E]">{lecture.title}</p>
                                  {lecture.description && (
                                    <p className="text-xs text-slate-500 line-clamp-1">{lecture.description}</p>
                                  )}
                                  
                                  <div className="flex flex-wrap gap-3 mt-2">
                                    {lecture.videoUrl && (
                                      <a
                                        href={lecture.videoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[11px] font-bold text-[#0EA894] hover:underline bg-[#0EA894]/10 px-2.5 py-1 rounded-lg"
                                      >
                                        🎥 Watch Video ↗
                                      </a>
                                    )}
                                    {lecture.slidesUrl && (
                                      <a
                                        href={lecture.slidesUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[11px] font-bold text-blue-600 hover:underline bg-blue-50 px-2.5 py-1 rounded-lg"
                                      >
                                        📄 View Slides (PDF/PPT) ↗
                                      </a>
                                    )}
                                  </div>
                                </div>

                                <form action={deleteLecture.bind(null, lecture.id, course.id)}>
                                  <button
                                    type="submit"
                                    className="text-xs font-bold text-slate-400 hover:text-red-500 p-2"
                                  >
                                    ✕
                                  </button>
                                </form>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <details className="group">
                          <summary className="text-xs font-black uppercase tracking-wider text-[#0EA894] cursor-pointer list-none flex items-center gap-1">
                            <span>+ Add Lecture / Video / Slides to this Chapter</span>
                          </summary>

                          <form
                            action={async (formData) => {
                              "use server";
                              await addRecordedLecture(chapter.id, course.id, formData);
                            }}
                            className="mt-4 space-y-4 rounded-2xl bg-slate-50 p-5 border border-slate-200/60"
                          >
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Lecture Title
                              </label>
                              <input
                                type="text"
                                name="title"
                                required
                                placeholder="e.g. Introduction to Variables"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[#0D1B2E] focus:border-[#0EA894] focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                  Upload Video Recording
                                </label>
                                <input
                                  type="file"
                                  name="videoFile"
                                  accept="video/*"
                                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#0EA894]/10 file:text-[#0EA894] hover:file:bg-[#0EA894]/20"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                  Upload Slides / Notes (PDF/PPT)
                                </label>
                                <input
                                  type="file"
                                  name="slidesFile"
                                  accept=".pdf,.ppt,.pptx"
                                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                  Duration (Minutes)
                                </label>
                                <input
                                  type="number"
                                  name="durationMins"
                                  placeholder="45"
                                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[#0D1B2E] focus:border-[#0EA894] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                                Description (Optional)
                              </label>
                              <textarea
                                name="description"
                                rows={2}
                                placeholder="Brief overview of what's covered in this lecture..."
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-[#0D1B2E] focus:border-[#0EA894] focus:outline-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full rounded-xl bg-[#0EA894] text-white py-2.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-[#0EA894]/20 hover:bg-[#0c9582] transition-colors"
                            >
                              Save Lecture & Material
                            </button>
                          </form>
                        </details>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Side: Add Chapter & Schedule Live Class Cards */}
            <div className="space-y-6">
              
              {/* Schedule Live Class Form */}
              <div className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-[#0D1B2E]">Schedule Live Class</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add a Google Meet or Zoom meeting link along with time so students can join.
                </p>

                <form
                  action={async (formData) => {
                    "use server";
                    await scheduleLiveClass(course.id, formData);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Class Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Chapter 2 Live Q&A"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-[#0D1B2E] focus:border-[#0EA894] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Meeting Link (Zoom / Meet)
                    </label>
                    <input
                      type="url"
                      name="meetingUrl"
                      required
                      placeholder="https://meet.google.com/abc-xyz"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-[#0D1B2E] focus:border-[#0EA894] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Scheduled Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-[#0D1B2E] focus:border-[#0EA894] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0EA894] text-white py-3 text-xs font-black uppercase tracking-wider shadow-md hover:bg-[#0c9582] transition-colors"
                  >
                    + Schedule Live Class
                  </button>
                </form>
              </div>

              {/* Add Chapter Card */}
              <div className="sticky top-8 rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-[#0D1B2E]">Add New Chapter</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Organize your course into structured chapters before adding individual video lectures or slides.
                </p>

                <form
                  action={async (formData) => {
                    "use server";
                    await addChapter(course.id, formData);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Chapter Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Chapter 1: Fundamentals"
                      className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#0D1B2E] focus:border-[#0EA894] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-[#0D1B2E] text-white py-3.5 text-xs font-black uppercase tracking-wider shadow-lg hover:bg-slate-800 transition-colors"
                  >
                    + Create Chapter
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}