import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#070F18] py-20 sm:py-28 rounded-[3rem] sm:rounded-[4rem] mx-4 sm:mx-8 lg:mx-12 mb-16 z-10 shadow-2xl">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#0EA894]/15 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Full Stretch Container */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          
          {/* Top Label with Dashes */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#0EA894]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
              Get Started Today
            </span>
            <span className="h-[2px] w-8 bg-[#0EA894]" />
          </div>

          {/* Super Bold Heading */}
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl mb-4 leading-[1.08]">
            Ready to get started?
          </h2>

          {/* Description */}
          <p className="max-w-xl text-base sm:text-lg font-normal text-slate-300 leading-relaxed">
            Join a live class today, or explore recorded lectures at your own pace. Free to sign up as a student.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center rounded-full bg-[#0EA894] px-9 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/25 transition-all duration-300 hover:bg-[#0bc0a9] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Join a live class</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>

            <Link
              href="#lectures"
              className="group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md px-9 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Browse lectures</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5 opacity-70 group-hover:opacity-100">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}