"use client";
export default function ContactSection() {
  return (
    <section className="w-full px-6 sm:px-12 max-w-[105rem] mx-auto mt-6 sm:mt-8 mb-16 z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 relative overflow-hidden bg-gradient-to-b from-[#070F18] to-[#0D1B2E] p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Absolute Background Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,168,148,0.15),rgba(255,255,255,0))] pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#0EA894]/10 blur-[100px] pointer-events-none" />

          <div className="relative z-15">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0EA894]/30 bg-[#0EA894]/10 px-4 py-1.5 text-xs font-bold text-[#0EA894] tracking-wider uppercase mb-6 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#0EA894] animate-pulse" />
              <span>Get in Touch</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-4 leading-[1.12]">
              Let’s talk about your{" "}
              <span className="font-serif italic font-normal text-[#0EA894]">
                learning ecosystem
              </span>
            </h1>

            <p className="text-sm sm:text-base font-normal text-slate-300 leading-relaxed mb-8">
              Have questions about implementation, pricing, or live class integration? Drop us a line and our team will get back to you shortly.
            </p>
          </div>

          <div className="relative z-15 space-y-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0EA894]/10 border border-[#0EA894]/30 text-[#0EA894] font-bold">
                @
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Us</p>
                <p className="text-sm font-bold text-white">support@hybridschool.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0EA894]/10 border border-[#0EA894]/30 text-[#0EA894] font-bold">
                📍
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Office Location</p>
                <p className="text-sm font-bold text-white">Islamabad / Rawalpindi, Pakistan</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 rounded-[2.5rem] border-2 border-slate-200/80 bg-white p-8 sm:p-12 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0D1B2E] mb-2">Send us a message</h2>
            <p className="text-sm text-slate-600 mb-8 font-normal">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1B2E] mb-2">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ahmed Nadeem" 
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-[#0D1B2E] placeholder-slate-400 focus:border-[#0EA894] focus:bg-white focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1B2E] mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="ahmed@example.com" 
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-[#0D1B2E] placeholder-slate-400 focus:border-[#0EA894] focus:bg-white focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1B2E] mb-2">
                  Subject
                </label>
                <input 
                  type="text" 
                  placeholder="Platform Integration & Pricing" 
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-[#0D1B2E] placeholder-slate-400 focus:border-[#0EA894] focus:bg-white focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D1B2E] mb-2">
                  Message
                </label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your institution or requirements..." 
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-[#0D1B2E] placeholder-slate-400 focus:border-[#0EA894] focus:bg-white focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 px-8 rounded-2xl bg-[#0EA894] text-white font-black text-sm uppercase tracking-wider hover:bg-[#0c8f7e] shadow-lg shadow-[#0EA894]/20 transition-all duration-300 active:scale-[0.99]"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}