import Link from "next/link";
import { EnrolledCourse } from "../types";

export default function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  return (
    <div className="rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="rounded-full bg-[#0EA894]/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#0EA894]">
            {course.subject}
          </span>
          <span className="text-xs font-bold text-slate-400">
            Instructor: {course.teacher?.name || "Teacher"}
          </span>
        </div>

        <h3 className="text-lg font-black text-[#0D1B2E] mb-2">{course.title}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {course.description || "No description provided."}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">
          {course.chapters?.length || 0} Chapters
        </span>
        <Link
          href={`/dashboard/student/courses/${course.id}`}
          className="rounded-xl bg-[#0EA894] text-white px-4 py-2 text-xs font-black uppercase tracking-wider shadow-md shadow-[#0EA894]/20 hover:bg-[#0c9582] transition-colors"
        >
          Continue Learning →
        </Link>
      </div>
    </div>
  );
}