"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type CourseSummary = {
  id: string;
  title: string;
  subject: string;
  createdAt: Date;
  enrollments: { id: string }[];
  chapters: { id: string }[];
};

type Teacher = {
  id: string;
  name: string | null;
  email: string;
  subject: string | null;
  coursesTaught: CourseSummary[];
};

type Student = {
  id: string;
  name: string | null;
  email: string;
  enrollments: { id: string; course: { id: string; title: string; subject: string } }[];
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  teacher: { name: string | null; email: string };
  chapters: { id: string }[];
  enrollments: { id: string }[];
};

type DeleteTarget = {
  id: string;
  name: string;
  kind: "TEACHER" | "STUDENT" | "COURSE";
};

export default function AdminTabs({
  teachers,
  students,
  courses,
}: {
  teachers: Teacher[];
  students: Student[];
  courses: Course[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"teachers" | "students" | "courses">("teachers");
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<DeleteTarget | null>(null);
  const [actionError, setActionError] = useState("");

  const filteredTeachers = useMemo(
    () =>
      teachers.filter(
        (t) =>
          t.name?.toLowerCase().includes(query.toLowerCase()) ||
          t.email.toLowerCase().includes(query.toLowerCase())
      ),
    [teachers, query]
  );

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          s.name?.toLowerCase().includes(query.toLowerCase()) ||
          s.email.toLowerCase().includes(query.toLowerCase())
      ),
    [students, query]
  );

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.teacher.name?.toLowerCase().includes(query.toLowerCase()) ||
          c.subject.toLowerCase().includes(query.toLowerCase())
      ),
    [courses, query]
  );

  function askDelete(id: string, name: string, kind: "TEACHER" | "STUDENT" | "COURSE") {
    setActionError("");
    setConfirmTarget({ id, name, kind });
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    const { id, kind } = confirmTarget;

    const url =
      kind === "COURSE"
        ? `/api/admin/courses/${id}`
        : `/api/admin/users/${id}`;

    setDeletingId(id);
    setActionError("");
    try {
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Delete failed");
        setDeletingId(null);
        return;
      }
      setConfirmTarget(null);
      router.refresh();
    } catch {
      setActionError("Something went wrong. Try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6 mb-12">
      {/* Tab switch + search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="inline-flex rounded-2xl border-2 border-slate-200 bg-white p-1 w-fit">
          <button
            onClick={() => setTab("teachers")}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              tab === "teachers" ? "bg-[#0D1B2E] text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Teachers ({teachers.length})
          </button>
          <button
            onClick={() => setTab("students")}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              tab === "students" ? "bg-[#0D1B2E] text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Students ({students.length})
          </button>
          <button
            onClick={() => setTab("courses")}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
              tab === "courses" ? "bg-[#0D1B2E] text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Courses ({courses.length})
          </button>
        </div>

        <input
          type="text"
          placeholder={`Search ${tab}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-2xl border-2 border-slate-200 px-4 py-2.5 text-sm font-medium outline-none focus:border-[#0EA894] transition-colors w-full sm:w-80"
        />
      </div>

      {/* Teachers view */}
      {tab === "teachers" && (
        <div className="grid grid-cols-1 gap-5">
          {filteredTeachers.length === 0 && <EmptyState text="No teachers found." />}
          {filteredTeachers.map((t) => {
            const totalEnrollments = t.coursesTaught.reduce(
              (sum, c) => sum + c.enrollments.length,
              0
            );
            return (
              <div key={t.id} className="rounded-[2rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-lg font-black text-[#0D1B2E]">{t.name || "Unnamed Teacher"}</p>
                    <p className="text-xs text-slate-500">{t.email}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {t.subject && (
                      <span className="rounded-full bg-[#0EA894]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
                        {t.subject}
                      </span>
                    )}
                    <span className="rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-violet-600">
                      {totalEnrollments} enrolled total
                    </span>
                    <button
                      onClick={() => askDelete(t.id, t.name || "this teacher", "TEACHER")}
                      disabled={deletingId === t.id}
                      className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {deletingId === t.id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>

                {t.coursesTaught.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {t.coursesTaught.map((c) => (
                      <div key={c.id} className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4">
                        <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">{c.subject}</p>
                        <p className="text-sm font-black text-[#0D1B2E] mb-2">{c.title}</p>
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                          <span>{c.chapters.length} chapters</span>
                          <span>{c.enrollments.length} students</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Students view */}
      {tab === "students" && (
        <div className="grid grid-cols-1 gap-5">
          {filteredStudents.length === 0 && <EmptyState text="No students found." />}
          {filteredStudents.map((s) => (
            <div key={s.id} className="rounded-[2rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-lg font-black text-[#0D1B2E]">{s.name || "Unnamed Student"}</p>
                  <p className="text-xs text-slate-500">{s.email}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-violet-600">
                    {s.enrollments.length} course{s.enrollments.length !== 1 ? "s" : ""} enrolled
                  </span>
                  <button
                    onClick={() => askDelete(s.id, s.name || "this student", "STUDENT")}
                    disabled={deletingId === s.id}
                    className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    {deletingId === s.id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>

              {s.enrollments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">This student hasn&apos;t enrolled in any course yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {s.enrollments.map((e) => (
                    <span key={e.id} className="rounded-full bg-[#0EA894]/10 px-3.5 py-1.5 text-xs font-bold text-[#0EA894]">
                      {e.course.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Courses view */}
      {tab === "courses" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.length === 0 && <EmptyState text="No courses found." />}
          {filteredCourses.map((c) => (
            <div key={c.id} className="rounded-[2rem] border-2 border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-[#0EA894]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
                    {c.subject}
                  </span>
                  <button
                    onClick={() => askDelete(c.id, c.title, "COURSE")}
                    disabled={deletingId === c.id}
                    className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    {deletingId === c.id ? "Removing..." : "Remove"}
                  </button>
                </div>
                <p className="text-lg font-black text-[#0D1B2E] mb-1">{c.title}</p>
                <p className="text-xs text-slate-500 mb-3">
                  Instructor: {c.teacher.name || c.teacher.email}
                </p>
                {c.description && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-100">
                <span>{c.chapters.length} chapters</span>
                <span>{c.enrollments.length} students enrolled</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0D1B2E] to-[#070F18] p-7 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">⚠️</div>
            <h3 className="mb-2 text-lg font-black text-white">Remove {confirmTarget.name}?</h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-300">
              This is <span className="font-bold text-red-400">permanent</span>.{" "}
              {confirmTarget.kind === "TEACHER" &&
                "This teacher's account, login, and all their courses, chapters, and lectures will be deleted forever. They can only regain access by signing up again as a new account."}
              {confirmTarget.kind === "STUDENT" &&
                "This student's account, login, and all their enrollment data will be deleted forever. They can only regain access by signing up again as a new account."}
              {confirmTarget.kind === "COURSE" &&
                "This course, its chapters, lectures, and all student enrollments in it will be deleted forever."}
            </p>

            {actionError && (
              <p className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs font-medium text-red-300">
                {actionError}
              </p>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmTarget(null)}
                disabled={deletingId === confirmTarget.id}
                className="rounded-full border-2 border-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId === confirmTarget.id}
                className="rounded-full bg-red-600 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                {deletingId === confirmTarget.id ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
      <p className="text-sm text-slate-500 font-medium">{text}</p>
    </div>
  );
}