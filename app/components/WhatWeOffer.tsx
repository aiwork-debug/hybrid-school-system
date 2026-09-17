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
    <section id="live-classes" className="relative overflow-hidden bg-white py-12 sm:py-16 w-full text-[#0D1B2E]">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0D1B2E_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Full Stretch Container */}
      <div className="relative w-full px-0">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-8 bg-[#0EA894]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA894]">
              Core Features
            </span>
            <span className="h-[2px] w-8 bg-[#0EA894]" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#0D1B2E] sm:text-5xl lg:text-6xl mb-4">
            What we offer
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
            Everything you need to deliver and experience seamless education, whether you are live in class or catching up later.
          </p>
        </div>

        {/* Increased Max-Width and Responsive Padding for Full Stretch */}
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[120rem] mx-auto">
          <div className="grid gap-6 sm:grid-cols-3 w-full">
            {offers.map((o, idx) => {
              const IconComponent = o.icon;
              return (
                <div
                  key={o.title}
                  className="group relative flex flex-col justify-between rounded-[2.5rem] border border-slate-200/90 bg-slate-50/70 backdrop-blur-xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:border-[#0EA894]/50 hover:bg-white hover:shadow-2xl hover:shadow-[#0EA894]/15"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0EA894]/10 border border-[#0EA894]/20 text-[#0EA894] transition-all duration-500 group-hover:bg-[#0EA894] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#0EA894]/30">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-black text-slate-400 tracking-wider">0{idx + 1}</span>
                    </div>

                    <h3 className="text-2xl font-black text-[#0D1B2E] tracking-tight mb-3 relative z-10 group-hover:text-[#0EA894] transition-colors">
                      {o.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-slate-600 relative z-10 font-normal">
                      {o.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center text-xs font-bold tracking-widest uppercase text-[#0EA894] relative z-10">
                    <span className="transition-all group-hover:translate-x-1">Explore feature</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
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