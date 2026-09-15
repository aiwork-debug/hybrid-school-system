"use client";
// File: app/choose-role/page.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ChooseRolePage() {
  const router = useRouter();
  const { update } = useSession();
  const [role, setRole] = useState<"STUDENT" | "TEACHER" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!role) return;
    setLoading(true);

    await fetch("/api/choose-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    // refresh the JWT with the new role so redirects work immediately
    await update({ role, roleSelected: true });

    router.push(role === "TEACHER" ? "/dashboard/teacher" : "/dashboard/student");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-10 text-center shadow-sm">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-[2px] w-8 bg-[#0EA894]" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
            One last step
          </span>
          <span className="h-[2px] w-8 bg-[#0EA894]" />
        </div>

        <h1 className="mb-2 text-2xl font-black tracking-tight text-[#0D1B2E]">
          Are you a student or a teacher?
        </h1>
        <p className="mb-8 text-sm text-slate-600">
          This decides what your dashboard looks like. You can&apos;t change
          this later without contacting support.
        </p>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setRole("STUDENT")}
            className={`rounded-2xl border-2 px-4 py-6 text-sm font-bold transition-colors ${
              role === "STUDENT"
                ? "border-[#0EA894] bg-[#0EA894]/10 text-[#0D1B2E]"
                : "border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("TEACHER")}
            className={`rounded-2xl border-2 px-4 py-6 text-sm font-bold transition-colors ${
              role === "TEACHER"
                ? "border-[#0EA894] bg-[#0EA894]/10 text-[#0D1B2E]"
                : "border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            Teacher
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!role || loading}
          className="w-full rounded-full bg-[#0EA894] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0EA894]/20 transition-all hover:bg-[#0bc0a9] disabled:opacity-40"
        >
          {loading ? "Setting up..." : "Continue →"}
        </button>
      </div>
    </div>
  );
}