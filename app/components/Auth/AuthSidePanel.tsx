const points = [
  { label: "Real-time Live Sync" },
  { label: "Instant Cloud Archives" },
];

export default function AuthSidePanel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative hidden w-[45%] shrink-0 flex-col justify-between overflow-hidden bg-[#070F18] p-12 lg:flex">
      {/* Same layered glow treatment as the home Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#0EA894]/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10">
        <span className="text-xl font-black text-white">
          Hybrid<span className="text-[#0EA894]">School</span>
        </span>
      </div>

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#0EA894]/30 bg-[#0EA894]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0EA894] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
          <span>Live & Recorded Learning Platform</span>
        </div>

        <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-300">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {points.map((p) => (
            <div key={p.label} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0EA894]/10 text-sm font-bold text-[#0EA894]">
                ✓
              </div>
              <span className="text-sm font-bold text-white">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-xs text-slate-500">
        &copy; {new Date().getFullYear()} HybridSchool
      </div>
    </div>
  );
}