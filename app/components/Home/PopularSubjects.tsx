import { Calculator, FlaskConical, BookOpen, Code2, ArrowRight } from "lucide-react";

const subjects = [
  { name: "Mathematics", desc: "Algebra, Calculus & Geometry live sessions", icon: Calculator, count: "12+ Live Courses" },
  { name: "Science", desc: "Physics, Chemistry & Biology modules", icon: FlaskConical, count: "18+ Live Courses" },
  { name: "English", desc: "Literature, Grammar & Communication", icon: BookOpen, count: "10+ Live Courses" },
  { name: "Computer Science", desc: "Coding, Web Dev & Algorithms", icon: Code2, count: "15+ Live Courses" },
];

export default function PopularSubjects() {
  return (
    <section className="relative w-full bg-white py-12 sm:py-16 border-t border-slate-100">
      {/* Full Stretch Container with Zero Left/Right Padding */}
      <div className="w-full px-4 sm:px-8 lg:px-16 max-w-[105rem] mx-auto">
        
        {/* Section Header */}
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#0EA894]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
              Browse Subjects
            </span>
            <span className="h-[2px] w-8 bg-[#0EA894]" />
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0D1B2E] sm:text-5xl lg:text-6xl">
            Popular subjects
          </h2>

          <p className="max-w-xl text-base font-normal leading-relaxed text-slate-600">
            A look at what students are joining live classes and watching recorded lectures for right now.
          </p>
        </div>

        {/* Subjects Grid with Outlines & Rich Hover Effects */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {subjects.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="group relative flex flex-col justify-between rounded-3xl border-2 border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#0EA894] hover:shadow-2xl hover:shadow-[#0EA894]/10"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#0D1B2E] transition-all duration-500 group-hover:bg-[#0EA894] group-hover:border-[#0EA894] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#0EA894]/30">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-[#0EA894]/10 group-hover:text-[#0EA894] transition-colors">
                      {s.count}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-[#0D1B2E] tracking-tight mb-2 group-hover:text-[#0EA894] transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-slate-600">
                    {s.desc}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#0EA894]">
                  <span className="group-hover:translate-x-1 transition-transform">Explore category</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}