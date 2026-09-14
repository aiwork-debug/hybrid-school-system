const stats = [
  { value: "500+", label: "Active students" },
  { value: "50+", label: "Teachers" },
  { value: "1,000+", label: "Recorded lectures" },
  { value: "24/7", label: "Access to lectures" },
];

export default function StatsBar() {
  return (
    <section className="relative bg-[#070F18] border-y border-white/10 py-16">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,168,148,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4 lg:divide-x lg:divide-white/10">
        {stats.map((s, idx) => (
          <div 
            key={s.label} 
            className="flex flex-col items-center text-center lg:px-4 group transition-transform duration-300 hover:-translate-y-1"
          >
            <p className="text-3xl font-black tracking-tight text-[#0EA894] sm:text-5xl drop-shadow-sm">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-400 sm:text-sm tracking-wide uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}