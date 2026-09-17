export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
      <p className="text-sm text-slate-500 font-medium">{text}</p>
    </div>
  );
}