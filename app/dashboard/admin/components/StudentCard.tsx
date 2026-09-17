import { Student } from "../types";

export default function StudentCard({
  student,
  isDeleting,
  onDelete,
}: {
  student: Student;
  isDeleting: boolean;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-[2rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-lg font-black text-[#0D1B2E]">
            {student.name || "Unnamed Student"}
          </p>
          <p className="text-xs text-slate-500">{student.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-violet-50 border border-violet-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-violet-600">
            {student.enrollments.length} course{student.enrollments.length !== 1 ? "s" : ""} enrolled
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

      {student.enrollments.length === 0 ? (
        <p className="text-xs text-slate-400 italic">
          This student hasn&apos;t enrolled in any course yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {student.enrollments.map((e) => (
            <span
              key={e.id}
              className="rounded-full bg-[#0EA894]/10 px-3.5 py-1.5 text-xs font-bold text-[#0EA894]"
            >
              {e.course.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}