import { Video, PlaySquare, ClipboardList, ArrowRight } from "lucide-react";

const offers = [
  {
    title: "Live classes",
    desc: "Join your teacher's class in real time, ask questions, and see the same board everyone else sees.",
    icon: Video,
  },
  {
    title: "Recorded lectures",
    desc: "Missed a class or want a second pass? Every lecture is saved so you can watch it at your own pace.",
    icon: PlaySquare,
  },
  {
    title: "Attendance & records",
    desc: "Teachers and admins get a clean record of who joined, who watched, and how each course is going.",
    icon: ClipboardList,
  },
];

export default function WhatWeOffer() {
  return (
    <section id="live-classes" className="relative overflow-hidden bg-white py-10 sm:py-12 w-full text-[#0D1B2E]">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0D1B2E_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Full Stretch Container */}
      <div className="relative w-full px-0">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[2px] w-6 bg-[#0EA894]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0EA894]">
              Core Features
            </span>
            <span className="h-[2px] w-6 bg-[#0EA894]" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-[#0D1B2E] sm:text-4xl mb-3">
            What we offer
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg font-normal">
            Everything you need to deliver and experience seamless education, whether you are live in class or catching up later.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[120rem] mx-auto">
          <div className="grid gap-5 sm:grid-cols-3 w-full">
            {offers.map((o, idx) => {
              const IconComponent = o.icon;
              return (
                <div
                  key={o.title}
                  className="group relative flex flex-col justify-between rounded-[2rem] border border-slate-200/90 bg-slate-50/70 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0EA894]/50 hover:bg-white hover:shadow-xl hover:shadow-[#0EA894]/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0EA894]/10 border border-[#0EA894]/20 text-[#0EA894] transition-all duration-300 group-hover:bg-[#0EA894] group-hover:text-white group-hover:scale-105">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-black text-slate-400 tracking-wider">0{idx + 1}</span>
                    </div>

                    <h3 className="text-xl font-black text-[#0D1B2E] tracking-tight mb-2 relative z-10 group-hover:text-[#0EA894] transition-colors">
                      {o.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 relative z-10 font-normal">
                      {o.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-[11px] font-bold tracking-widest uppercase text-[#0EA894] relative z-10">
                    <span className="transition-all group-hover:translate-x-1">Explore feature</span>
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}