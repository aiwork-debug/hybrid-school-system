"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },  
{ label: "Contact", href: "/contact" },  
{ label: "You are a teacher", href: "#teachers" },
  { label: "You are a student", href: "#students" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070F18]/90 backdrop-blur-md">
      {/* Full Stretch Container matching the rest of the site */}
      <nav className="mx-auto flex max-w-[105rem] items-center justify-between px-6 sm:px-12 py-4">
        
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Hybrid<span className="text-[#0EA894]">School</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:text-[#0EA894]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#0EA894] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#0EA894]/20 transition-all duration-300 hover:bg-[#0bc0a9] hover:scale-[1.03] active:scale-[0.98]"
          >
            Sign up
          </Link>
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
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:text-[#0EA894] block py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10 mt-2">
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
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}