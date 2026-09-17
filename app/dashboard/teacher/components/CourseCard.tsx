import Link from "next/link";
import { TeacherCourse } from "../types";

export default function CourseCard({ course }: { course: TeacherCourse }) {
  return (
    <Link
      href={`/dashboard/teacher/courses/${course.id}`}
      className="group relative rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA894]/50 hover:shadow-xl hover:shadow-[#0EA894]/5 flex flex-col justify-between"
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-[#0EA894]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#0EA894]">
            {course.subject}
          </span>
          {course.liveClasses.length > 0 && (
            <span className="rounded-full bg-red-50 border border-red-200 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-500 animate-pulse">
              Live Upcoming
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-black text-[#0D1B2E] group-hover:text-[#0EA894] transition-colors">
          {course.title}
        </h3>

        {course.description && (
          <p className="mb-6 line-clamp-2 text-sm text-slate-600 font-normal leading-relaxed">
            {course.description}
          </p>
        )}
      </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
        <div className="flex items-center gap-3">
          <span>{course.chapters.length} chapter{course.chapters.length !== 1 ? "s" : ""}</span>
          <span className="text-violet-600">
            {course.enrollments.length} student{course.enrollments.length !== 1 ? "s" : ""}
          </span>
        </div>
        <span className="text-[#0EA894] flex items-center gap-1 transition-transform group-hover:translate-x-1">
          Manage →
        </span>
      </div>
    </Link>
  );
}