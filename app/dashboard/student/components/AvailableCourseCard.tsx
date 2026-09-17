import { AvailableCourse } from "../types";

export default function AvailableCourseCard({
  course,
  onEnroll,
}: {
  course: AvailableCourse;
  onEnroll: (courseId: string) => Promise<void>;
}) {
  return (
    <div className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
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
          {course._count?.chapters || 0} Chapters
        </span>
        <form action={onEnroll.bind(null, course.id)}>
          <button
            type="submit"
            className="rounded-xl bg-[#0D1B2E] text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-md hover:bg-slate-800 transition-colors"
          >
            Enroll Now +
          </button>
        </form>
      </div>
    </div>
  );
}