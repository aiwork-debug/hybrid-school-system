export default function EmptyCourses() {
  return (
    <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0EA894]/10 text-[#0EA894] text-xl font-bold">
        📚
      </div>
      <h3 className="text-lg font-black text-[#0D1B2E] mb-1">No courses created yet</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto">
        You haven&apos;t created any courses yet. Add your first course using the form above to get started.
      </p>
    </div>
  );
}