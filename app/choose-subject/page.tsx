"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SUBJECTS = [
  { value: "MATH", label: "Math" },
  { value: "SCIENCE", label: "Science" },
  { value: "ENGLISH", label: "English" },
  { value: "URDU", label: "Urdu" },
  { value: "COMPUTER_SCIENCE", label: "Computer Science" },
  { value: "SOCIAL_STUDIES", label: "Social Studies" },
];

export default function ChooseSubjectPage() {
  const router = useRouter();
  const { update } = useSession();
  const [subject, setSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!subject) return;
    setLoading(true);

    await fetch("/api/choose-subject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject }),
    });

    await update({ subject });
    router.push("/dashboard/teacher");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-10 text-center shadow-sm">
        <h1 className="mb-2 text-2xl font-black tracking-tight text-[#0D1B2E]">
          Which subject do you teach?
        </h1>
        <p className="mb-8 text-sm text-slate-600">
          Students will find your courses under this subject.
        </p>

        <div className="mb-6 grid grid-cols-2 gap-3">
          {SUBJECTS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSubject(s.value)}
              className={`rounded-2xl border-2 px-4 py-4 text-sm font-bold transition-colors ${
                subject === s.value
                  ? "border-[#0EA894] bg-[#0EA894]/10 text-[#0D1B2E]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!subject || loading}
          className="w-full rounded-full bg-[#0EA894] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0EA894]/20 transition-all hover:bg-[#0bc0a9] disabled:opacity-40"
        >
          {loading ? "Saving..." : "Continue →"}
        </button>
      </div>
    </div>
  );
}