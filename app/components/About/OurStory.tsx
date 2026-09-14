export default function OurStory() {
  return (
    <section className="relative w-full bg-slate-50/50 py-12 sm:py-16 overflow-hidden border-t border-slate-100">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#0EA894]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Section Tag with Dashes */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#0EA894]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
                Who We Are
              </span>
            </div>

            {/* Super Bold Heading */}
            <h2 className="text-3xl font-black tracking-tight text-[#0D1B2E] sm:text-5xl lg:text-6xl mb-6 leading-[1.08]">
              Empowering education through seamless digital innovation.
            </h2>

            {/* Description Paragraphs */}
            <p className="text-base sm:text-lg font-normal text-slate-600 leading-relaxed mb-6">
              Traditional schooling often limits students to physical presence, while purely online platforms lack the interactive engagement of a real live classroom. <strong className="text-[#0D1B2E] font-bold">HybridSchool</strong> was founded to solve this exact dilemma.
            </p>

            <p className="text-base font-normal text-slate-600 leading-relaxed mb-8">
              Our infrastructure automates attendance, unifies live streaming with pre-recorded lecture modules, and gives full tracking visibility to teachers, students, and administrators alike.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0EA894]/10 text-[#0EA894] font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-bold text-[#0D1B2E]">Real-time Live Sync</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0EA894]/10 text-[#0EA894] font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm font-bold text-[#0D1B2E]">Instant Cloud Archives</span>
              </div>
            </div>

          </div>

          {/* Right Cards Grid - Perfectly Aligned */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            <div className="group rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#0EA894]/50 hover:shadow-xl hover:shadow-[#0EA894]/5 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#0EA894]/10 text-[#0EA894] text-xs font-black uppercase tracking-wider mb-6">
                  Architecture
                </span>
                <p className="text-5xl font-black text-[#0EA894] mb-3 tracking-tight">100%</p>
                <h3 className="text-xl font-black text-[#0D1B2E] mb-2">Unified Access</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Live streams and recorded archives coexist inside the same intuitive course layout.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#0EA894]">
                <span>Seamless Experience</span>
                <span className="ml-auto transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>

            <div className="group rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#0D1B2E]/50 hover:shadow-xl hover:shadow-slate-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[#0D1B2E] text-xs font-black uppercase tracking-wider mb-6">
                  Analytics
                </span>
                <p className="text-5xl font-black text-[#0D1B2E] mb-3 tracking-tight">24/7</p>
                <h3 className="text-xl font-black text-[#0D1B2E] mb-2">Smart Tracking</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Automated logs for live attendance and watch progression metrics for admins.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#0D1B2E]">
                <span>Automated Logs</span>
                <span className="ml-auto transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}