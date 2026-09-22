import Link from "next/link";
import { Upload, Video, BarChart3, Check, BookOpen, Clock, Award, Users } from "lucide-react";
import { Session } from "next-auth";

interface CourseItem {
  id: string;
  title: string;
  description: string | null;
  subject: string;
}

interface ForTeachersProps {
  session: Session | null;
  teacherCourses: CourseItem[];
}

export default function ForTeachers({ session, teacherCourses }: ForTeachersProps) {
  const role = session?.user?.role;
  const isTeacher = role === "TEACHER";
  const isStudent = role === "STUDENT";

  // Content configurations based on role
  const config = isStudent ? {
    tag: "STUDENT HUB & TOOLS",
    title: "Stay ahead in your classes",
    description: "Access your course materials, track your completion status, and never miss an important live lecture from your expert instructors.",
    points: [
      { text: "Join live sessions with a single click from your dashboard", icon: Video },
      { text: "Access recorded lectures anytime for revision and self-paced study", icon: Clock },
      { text: "Track your syllabus progress and active enrollments effortlessly", icon: Award },
    ],
    buttonText: "Go to Student Dashboard",
    buttonLink: "/dashboard/student",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
    quote: "📚 Immersive learning environments designed for your academic success."
  } : isTeacher ? {
    tag: "INSTRUCTOR DASHBOARD",
    title: "Manage & inspire your students",
    description: `You currently have ${teacherCourses?.length || 0} active courses published. Keep track of chapters, upload new video materials, and schedule live teaching sessions seamlessly.`,
    points: [
      { text: "Go live or upload a recorded lecture — your choice, every time", icon: Video },
      { text: "Upload lectures in minutes, no complex editing tools needed", icon: Upload },
      { text: "See attendance and watch stats for every class you teach", icon: BarChart3 },
    ],
    buttonText: "Go to Teacher Dashboard",
    buttonLink: "/dashboard/teacher",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop",
    quote: "🎓 Empowering educators with seamless live video and course management tools."
  } : {
    tag: "PLATFORM FEATURES",
    title: "Built for teachers & students",
    description: "Whether you want to share your expertise globally or master a brand new skill, our platform gives you the ultimate tools for live and recorded education.",
    points: [
      { text: "Interactive live classes with real-time doubt clearing", icon: Video },
      { text: "High-quality on-demand video library for self-paced learning", icon: BookOpen },
      { text: "Dedicated dashboards tailored for both students and instructors", icon: Users },
    ],
    buttonText: "Start Learning / Teaching",
    buttonLink: "/signup",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    quote: "✨ Connecting passionate educators with enthusiastic learners worldwide."
  };

  return (
    <section id="teachers" className="relative w-full bg-white py-12 sm:py-16 border-t border-slate-100">
      <div className="w-full px-4 sm:px-8 lg:px-16 max-w-[105rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#0EA894]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
                {config.tag}
              </span>
            </div>

            <h2 className="mb-6 text-4xl font-black tracking-tight text-[#0D1B2E] sm:text-6xl leading-[1.08]">
              {config.title}
            </h2>

            <p className="mb-8 text-base sm:text-lg font-normal leading-relaxed text-slate-600 max-w-xl">
              {config.description}
            </p>

            <ul className="mb-10 flex flex-col gap-4">
              {config.points.map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0EA894]/10 text-[#0EA894] font-bold">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-base font-medium text-slate-700">{p.text}</span>
                  </li>
                );
              })}
            </ul>

            <Link
              href={config.buttonLink}
              className="inline-flex items-center justify-center rounded-full bg-[#0D1B2E] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-[#0EA894] transition-all"
            >
              <span>{config.buttonText}</span>
              <span className="ml-2 font-black">→</span>
            </Link>
          </div>

          {/* Right Column with Dynamic Image */}
          <div className="lg:col-span-6 rounded-[2.5rem] overflow-hidden border-2 border-slate-200/90 shadow-2xl relative h-[380px] bg-slate-900">
            <img 
              src={config.image} 
              alt={isStudent ? "Student studying" : isTeacher ? "Teacher lecturing" : "Learning platform"} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/80 via-transparent to-transparent flex items-end p-8">
              <p className="text-white text-sm font-bold tracking-wide">
                {config.quote}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}