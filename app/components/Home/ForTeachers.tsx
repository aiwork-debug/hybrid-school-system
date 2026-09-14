import Link from "next/link";
import { Upload, Video, BarChart3, Check } from "lucide-react";

const points = [
  { text: "Go live or upload a recorded lecture — your choice, every time", icon: Video },
  { text: "Upload lectures in minutes, no editing tools needed", icon: Upload },
  { text: "See attendance and watch stats for every class you teach", icon: BarChart3 },
];

export default function ForTeachers() {
  return (
    <section id="teachers" className="relative w-full bg-white py-12 sm:py-16 border-t border-slate-100">
      {/* Full Stretch Container with Zero Left/Right Padding */}
      <div className="w-full px-4 sm:px-8 lg:px-16 max-w-[105rem] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#0EA894]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
                For teachers
              </span>
            </div>

            <h2 className="mb-6 text-4xl font-black tracking-tight text-[#0D1B2E] sm:text-6xl leading-[1.08]">
              Teach your way
            </h2>

            <p className="mb-8 text-base sm:text-lg font-normal leading-relaxed text-slate-600 max-w-xl">
              Deliver a live lecture when it works for your schedule, or upload a recording when it doesn&apos;t. Either way, your students never miss the material.
            </p>

            <ul className="mb-10 flex flex-col gap-4">
              {points.map((p) => (
                <li key={p.text} className="flex items-start gap-3.5">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0EA894]/10 text-[#0EA894] font-bold">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-base font-medium text-slate-700">{p.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup?role=teacher"
              className="inline-flex items-center justify-center rounded-full bg-[#0D1B2E] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:bg-[#0EA894] hover:shadow-[#0EA894]/20 hover:-translate-y-0.5"
            >
              <span>Start teaching</span>
              <span className="ml-2 font-black">→</span>
            </Link>
          </div>

          {/* Right Outline Card Box Column */}
          <div className="lg:col-span-6 rounded-[2.5rem] border-2 border-slate-200/90 bg-slate-50/60 p-6 sm:p-10 shadow-sm backdrop-blur-xl">
            <div className="flex flex-col gap-5">
              {points.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div 
                    key={p.text} 
                    className="group flex items-center gap-5 rounded-3xl border-2 border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA894] hover:shadow-xl hover:shadow-[#0EA894]/10"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#0D1B2E] transition-all duration-300 group-hover:bg-[#0EA894] group-hover:border-[#0EA894] group-hover:text-white group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0EA894] block mb-1">
                        Feature 0{idx + 1}
                      </span>
                      <p className="text-base font-bold text-[#0D1B2E] tracking-tight leading-snug">
                        {p.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}