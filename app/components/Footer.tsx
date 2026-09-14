import Link from "next/link";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "Live classes", href: "#live-classes" },
      { label: "Recorded lectures", href: "#lectures" },
      { label: "Browse subjects", href: "#" },
    ],
  },
  {
    title: "Teach",
    links: [
      { label: "Become a teacher", href: "#teachers" },
      { label: "Upload a lecture", href: "#" },
      { label: "Teacher resources", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "FAQs", href: "#faqs" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070F18] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5 lg:gap-16">
          
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="text-xl font-black tracking-tight text-white inline-block">
              Hybrid<span className="text-[#0EA894]">School</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-400 leading-relaxed">
              Join live classes or watch recorded lectures at your own pace, all in one seamless hybrid learning platform.
            </p>
          </div>

          {/* Footer Navigation Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA894]">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} HybridSchool. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-slate-300">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}