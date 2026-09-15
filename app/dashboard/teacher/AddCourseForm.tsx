"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCourseForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    setTitle("");
    setDescription("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-1 flex items-center gap-3">
        <span className="h-[2px] w-8 bg-[#0EA894]" />
        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
          New Course
        </span>
      </div>
      <h2 className="mb-2 text-xl font-black tracking-tight text-[#0D1B2E]">
        Add a New Course
      </h2>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Course Title
        </label>
        <input
          type="text"
          placeholder="e.g. Algebra Basics"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm text-[#0D1B2E] outline-none transition-colors focus:border-[#0EA894]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Course Description
        </label>
        <textarea
          placeholder="What will students learn in this course?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm text-[#0D1B2E] outline-none transition-colors focus:border-[#0EA894]"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 rounded-full bg-[#0EA894] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0EA894]/20 transition-all hover:bg-[#0bc0a9] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {loading ? "Adding..." : "Add Course →"}
      </button>
    </form>
  );
}