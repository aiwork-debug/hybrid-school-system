"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const userRole = session?.user?.role;

  // Ordered links: Home -> Dashboard/Portals -> Other Links (without FAQs)
  const getNavLinks = () => {
    const homeLink = { label: "Home", href: "/" };
    const aboutContactLinks = [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ];

    if (status === "loading") {
      return [
        homeLink,
        { label: "Teacher Portal", href: "/login" },
        { label: "Student Portal", href: "/login" },
        ...aboutContactLinks,
      ];
    }

    // If logged in as TEACHER
    if (userRole === "TEACHER") {
      return [
        homeLink,
        { label: "Teacher Dashboard", href: "/dashboard/teacher" },
        ...aboutContactLinks,
      ];
    }

    // If logged in as STUDENT
    if (userRole === "STUDENT") {
      return [
        homeLink,
        { label: "Student Dashboard", href: "/dashboard/student" },
        ...aboutContactLinks,
      ];
    }

    // Default / Unauthenticated visitor
    return [
      homeLink,
      { label: "Teacher Portal", href: "/login" },
      { label: "Student Portal", href: "/login" },
      ...aboutContactLinks,
    ];
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070F18]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[105rem] items-center justify-between px-6 sm:px-12 py-4">
        
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Hybrid<span className="text-[#0EA894]">School</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:text-[#0EA894]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {status === "loading" ? (
            <div className="h-8 w-20 animate-pulse rounded-full bg-white/5" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-300">
                Hi, {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500/20"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[#0EA894] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#0EA894]/20 transition-all duration-300 hover:bg-[#0bc0a9] hover:scale-[1.03]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 lg:hidden p-2 text-slate-300 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#070F18] px-6 py-6 lg:hidden shadow-2xl">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:text-[#0EA894] block py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-3 pt-4 border-t border-white/10 mt-2">
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-400 transition-colors hover:bg-red-500/20"
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-full bg-[#0EA894] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#0EA894]/20 transition-all hover:bg-[#0bc0a9]"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}