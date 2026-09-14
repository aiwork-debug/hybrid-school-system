export default function AboutHero() {
  return (
    <section className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-8 z-20">
      <div className="relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] py-20 sm:py-24 rounded-[2.5rem] border border-white/10 shadow-2xl">
        
        {/* Extremely Soft Subtle Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#0EA894]/12 blur-[130px] pointer-events-none" />
        
        {/* Light Mesh Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-12 mx-auto flex max-w-4xl flex-col items-center text-center">
          
          {/* Premium Pill Badge */}
          <div className="group inline-flex items-center gap-2.5 rounded-full border border-[#0EA894]/30 bg-[#0EA894]/10 px-4 py-1.5 text-xs font-bold text-[#0EA894] tracking-wider uppercase mb-5 shadow-inner backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
            <span>Our Mission & Vision</span>
          </div>

          {/* Ultra-Bold Typography */}
          <h1 className="text-4xl font-black tracking-tight leading-[1.08] text-white sm:text-5xl lg:text-6xl mb-4">
            Bridging the gap between{" "}
            <br />
            <span className="font-serif italic font-normal text-[#0EA894] tracking-wide">
              classroom & remote learning
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base font-normal text-slate-300 leading-relaxed">
            HybridSchool is built to empower teachers, students, and institutions with a seamless ecosystem where real-time live learning meets comprehensive on-demand archives.
          </p>

        </div>
      </div>
    </section>
  );
}