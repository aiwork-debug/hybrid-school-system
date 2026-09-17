import { DeleteTarget } from "../types";

export default function DeleteConfirmModal({
  target,
  isDeleting,
  error,
  onCancel,
  onConfirm,
}: {
  target: DeleteTarget;
  isDeleting: boolean;
  error: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0D1B2E] to-[#070F18] p-7 shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
          ⚠️
        </div>
        <h3 className="mb-2 text-lg font-black text-white">Remove {target.name}?</h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-300">
          This is <span className="font-bold text-red-400">permanent</span>.{" "}
          {target.kind === "TEACHER" &&
            "This teacher's account, login, and all their courses, chapters, and lectures will be deleted forever. They can only regain access by signing up again as a new account."}
          {target.kind === "STUDENT" &&
            "This student's account, login, and all their enrollment data will be deleted forever. They can only regain access by signing up again as a new account."}
          {target.kind === "COURSE" &&
            "This course, its chapters, lectures, and all student enrollments in it will be deleted forever."}
        </p>

        {error && (
          <p className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs font-medium text-red-300">
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-full border-2 border-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-300 transition-colors hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-full bg-red-600 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Removing..." : "Yes, Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}