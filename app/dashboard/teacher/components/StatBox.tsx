export default function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="text-xs font-bold uppercase tracking-wider text-[#0EA894] mt-1">
        {label}
      </p>
    </div>
  );
}