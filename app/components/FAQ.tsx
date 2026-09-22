const faqs = [
  {
    q: "Do I need to be online at the class time?",
    a: "Only for live classes. If you can't make it, every class is recorded and uploaded so you can watch it later.",
  },
  {
    q: "Can teachers upload lectures instead of going live?",
    a: "Yes. Teachers can either deliver a live lecture or upload a pre-recorded one — both show up in the same course.",
  },
  {
    q: "Is attendance tracked automatically?",
    a: "Yes. Joining a live class or watching a recorded lecture is logged automatically for teachers and admins.",
  },
  {
    q: "Can I use this on my phone?",
    a: "Yes, the platform works on any device with a browser — no separate app required.",
  },
  {
    q: "How do I get access after signing up?",
    a: "Once you sign up as a student or teacher, your dashboard is generated instantly with all your enrolled courses or classes.",
  },
  {
    q: "Can parents or school admins track student progress?",
    a: "Yes, dedicated admin and tracking views provide deep insights into individual course progression, watch history, and attendance records.",
  },
  {
    q: "Is there any limit on watching recorded lectures?",
    a: "None at all. You can replay recorded lectures as many times as you need at your own pace.",
  },
];

export default function FAQ() {
  return (
    <section id="faqs" className="relative w-full bg-white py-10 sm:py-12 border-t border-slate-100">
      {/* Full Stretch Container with Zero Left/Right Padding */}
      <div className="w-full px-4 sm:px-8 lg:px-16 max-w-[105rem] mx-auto">
        
        {/* Section Header */}
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-2 flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[#0EA894]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0EA894]">
              Support & Answers
            </span>
            <span className="h-[2px] w-6 bg-[#0EA894]" />
          </div>

          <h2 className="mb-3 text-2xl font-black tracking-tight text-[#0D1B2E] sm:text-4xl">
            Frequently asked questions
          </h2>

          <p className="max-w-md text-xs sm:text-sm font-normal leading-relaxed text-slate-600">
            Got questions about live classes, recordings, or tracking? Everything you need to know is right here.
          </p>
        </div>

        {/* Fully Stretched FAQ Accordion Container */}
        <div className="w-full rounded-3xl border-2 border-slate-200/90 bg-slate-50/50 p-5 sm:p-8 shadow-sm backdrop-blur-xl">
          <div className="divide-y divide-slate-200/80">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5 first:pt-0 last:pb-0">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base sm:text-lg font-black text-[#0D1B2E] transition-colors hover:text-[#0EA894]">
                  <span>{item.q}</span>
                  <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0D1B2E] transition-all duration-300 group-open:rotate-45 group-open:bg-[#0EA894] group-open:border-[#0EA894] group-open:text-white group-open:shadow-md group-open:shadow-[#0EA894]/20">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm font-normal leading-relaxed text-slate-600 pr-10">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}