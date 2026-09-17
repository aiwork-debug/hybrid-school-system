import { Course } from "../types";

export default function CourseCard({
  course,
  isDeleting,
  onDelete,
}: {
  course: Course;
  isDeleting: boolean;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-[2rem] border-2 border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-[#0EA894]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
            {course.subject}
          </span>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Removing..." : "Remove"}
          </button>
        </div>
        <p className="text-lg font-black text-[#0D1B2E] mb-1">{course.title}</p>
        <p className="text-xs text-slate-500 mb-3">
          Instructor: {course.teacher.name || course.teacher.email}
        </p>
        {course.description && (
          <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
            {course.description}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-100">
        <span>{course.chapters.length} chapters</span>
        <span>{course.enrollments.length} students enrolled</span>
      </div>
    </div>
  );
}