"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Teacher, Student, Course, DeleteTarget } from "./types";
import EmptyState from "./components/EmptyState";
import TeacherCard from "./components/TeacherCard";
import StudentCard from "./components/StudentCard";
import CourseCard from "./components/CourseCard";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

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

  function askDelete(id: string, name: string, kind: DeleteTarget["kind"]) {
    setActionError("");
    setConfirmTarget({ id, name, kind });
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    const { id, kind } = confirmTarget;
    const url = kind === "COURSE" ? `/api/admin/courses/${id}` : `/api/admin/users/${id}`;

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
          {(["teachers", "students", "courses"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors capitalize ${
                tab === t ? "bg-[#0D1B2E] text-white" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t} ({t === "teachers" ? teachers.length : t === "students" ? students.length : courses.length})
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder={`Search ${tab}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-2xl border-2 border-slate-200 px-4 py-2.5 text-sm font-medium outline-none focus:border-[#0EA894] transition-colors w-full sm:w-80"
        />
      </div>

      {tab === "teachers" && (
        <div className="grid grid-cols-1 gap-5">
          {filteredTeachers.length === 0 && <EmptyState text="No teachers found." />}
          {filteredTeachers.map((t) => (
            <TeacherCard
              key={t.id}
              teacher={t}
              isDeleting={deletingId === t.id}
              onDelete={() => askDelete(t.id, t.name || "this teacher", "TEACHER")}
            />
          ))}
        </div>
      )}

      {tab === "students" && (
        <div className="grid grid-cols-1 gap-5">
          {filteredStudents.length === 0 && <EmptyState text="No students found." />}
          {filteredStudents.map((s) => (
            <StudentCard
              key={s.id}
              student={s}
              isDeleting={deletingId === s.id}
              onDelete={() => askDelete(s.id, s.name || "this student", "STUDENT")}
            />
          ))}
        </div>
      )}

      {tab === "courses" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.length === 0 && <EmptyState text="No courses found." />}
          {filteredCourses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              isDeleting={deletingId === c.id}
              onDelete={() => askDelete(c.id, c.title, "COURSE")}
            />
          ))}
        </div>
      )}

      {confirmTarget && (
        <DeleteConfirmModal
          target={confirmTarget}
          isDeleting={deletingId === confirmTarget.id}
          error={actionError}
          onCancel={() => setConfirmTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}