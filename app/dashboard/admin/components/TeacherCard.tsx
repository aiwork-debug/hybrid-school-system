import { Teacher } from "../types";

export default function TeacherCard({
  teacher,
  isDeleting,
  onDelete,
}: {
  teacher: Teacher;
  isDeleting: boolean;
  onDelete: () => void;
}) {
  const totalEnrollments = teacher.coursesTaught.reduce(
    (sum, c) => sum + c.enrollments.length,
    0
  );

  return (
    <div className="rounded-[2rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-lg font-black text-[#0D1B2E]">
            {teacher.name || "Unnamed Teacher"}
          </p>
          <p className="text-xs text-slate-500">{teacher.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {teacher.subject && (
            <span className="rounded-full bg-[#0EA894]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
              {teacher.subject}
            </span>
          )}
          <span className="rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-violet-600">
            {totalEnrollments} enrolled total
          </span>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>

      {teacher.coursesTaught.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {teacher.coursesTaught.map((c) => (
            <div key={c.id} className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                {c.subject}
              </p>
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
}