import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070F18] py-16 sm:py-24 mb-8 z-20">
      {/* Rich Multi-layered Background Glows & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#0EA894]/10 blur-[100px] pointer-events-none" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Full Stretch Container */}
      <div className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          
          {/* Premium Pill Badge */}
          <div className="group inline-flex items-center gap-2.5 rounded-full border border-[#0EA894]/30 bg-[#0EA894]/10 px-4 py-1.5 text-xs font-bold text-[#0EA894] tracking-wider uppercase mb-6 shadow-inner backdrop-blur-md transition-all duration-300 hover:border-[#0EA894]/60">
            <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
            <span>Live & Recorded Learning Platform</span>
          </div>

          {/* Ultra-Bold Premium Typography */}
          <h1 className="text-4xl font-black tracking-tight leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            Learn from anywhere,
            <br />
            <span className="font-serif italic font-normal text-[#0EA894] tracking-wide">
              live or recorded
            </span>
          </h1>

          {/* Refined Subtitle */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg font-normal text-slate-300 leading-relaxed">
            Join immersive live classes with your teacher in real time, or master subjects at your own pace with crystal-clear on-demand recorded lectures.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center rounded-full bg-[#0EA894] px-9 py-4 text-sm font-black text-white shadow-xl shadow-[#0EA894]/20 transition-all duration-300 hover:bg-[#0bc0a9] hover:shadow-[#0EA894]/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Join a live class</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
            
            <Link
              href="#lectures"
              className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-9 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5 active:translate-y-0"
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