"use client";
// File: app/login/page.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import AuthSidePanel from "../components/Auth/AuthSidePanel";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"STUDENT" | "TEACHER" | "ADMIN">("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const session = await getSession();
    const actualRole = session?.user?.role;
    const roleSelected = session?.user?.roleSelected;

    // Admin flow ke liye agar admin dashboard rakhna hai ya home page, yahan set kar sakte hain
    if (role === "ADMIN" || actualRole === "ADMIN") {
      if (actualRole !== "ADMIN") {
        setError("This account is not an admin account.");
        setLoading(false);
        return;
      }
      router.push("/dashboard/admin");
      return;
    }

    if (!roleSelected) {
      router.push("/choose-role");
      return;
    }

    if (actualRole !== role) {
      setError(
        `This account is registered as a ${actualRole?.toLowerCase()}. Please select "${actualRole === "TEACHER" ? "Teacher" : "Student"}" to log in.`
      );
      setLoading(false);
      return;
    }

    // Sabhi student aur teacher login ke baad seedha home page par jayenge
    router.push("/");
  }

  return (
    <div className="relative flex min-h-screen w-full">
      <AuthSidePanel
        title="Welcome back."
        subtitle="Log in to join your next live class or pick up a recorded lecture where you left off."
      />

      <div className="flex w-full flex-1 items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-md pt-8 lg:pt-0">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#0EA894]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0EA894]">
              Welcome back
            </span>
          </div>

          <h2 className="mb-2 text-3xl font-black tracking-tight text-[#0D1B2E]">
            Log in to your account
          </h2>
          <p className="mb-8 text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-[#0EA894] hover:underline">
              Sign up
            </Link>
          </p>

          {/* Role toggle */}
          <div className="mb-6 grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setRole("STUDENT")}
              className={`rounded-2xl border-2 px-3 py-3 text-xs sm:text-sm font-bold transition-colors ${
                role === "STUDENT"
                  ? "border-[#0EA894] bg-[#0EA894]/10 text-[#0D1B2E]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("TEACHER")}
              className={`rounded-2xl border-2 px-3 py-3 text-xs sm:text-sm font-bold transition-colors ${
                role === "TEACHER"
                  ? "border-[#0EA894] bg-[#0EA894]/10 text-[#0D1B2E]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => setRole("ADMIN")}
              className={`rounded-2xl border-2 px-3 py-3 text-xs sm:text-sm font-bold transition-colors ${
                role === "ADMIN"
                  ? "border-violet-500 bg-violet-50 text-violet-700"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm text-[#0D1B2E] outline-none transition-colors focus:border-[#0EA894]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 pr-12 text-sm text-[#0D1B2E] outline-none transition-colors focus:border-[#0EA894]"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-[#0EA894] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0EA894]/20 transition-all hover:bg-[#0bc0a9] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Logging in..." : "Log in →"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
              or
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full rounded-full border-2 border-slate-200 px-6 py-3.5 text-sm font-bold text-[#0D1B2E] transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}