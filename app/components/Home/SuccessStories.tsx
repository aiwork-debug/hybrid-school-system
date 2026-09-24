"use client";
// File: app/components/Home/ParentReviews.tsx

import { useRef, useState } from "react";

type Review = {
  name: string;
  location: string;
  flag: string; // emoji flag
  image: string;
  quote: string;
};

const reviews: Review[] = [
  {
    name: "Kalpana Bhalakrishnan",
    location: "Bengaluru, India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&crop=faces&q=80",
    quote:
      "Hybrid School completely changed how my daughter feels about learning. The teachers know her by name, and she actually looks forward to class every single day.",
  },
  {
    name: "Aloha Mae F.",
    location: "UAE",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=600&fit=crop&crop=faces&q=80",
    quote:
      "We moved countries twice in one year and this was the only school that kept my son's education consistent through all of it. Truly flexible.",
  },
  {
    name: "Zeenat Khan",
    location: "Jeddah, Saudi Arabia",
    flag: "🇸🇦",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop&crop=faces&q=80",
    quote:
      "The recorded lectures are a lifesaver. My kids can revisit any topic they didn't fully understand instead of just moving on and falling behind.",
  },
  {
    name: "Amit Kenny",
    location: "Goa, India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop&crop=faces&q=80",
    quote:
      "As a working parent, being able to track my son's progress and join parent-teacher calls online made all the difference for us.",
  },
  {
    name: "Ambili Jayan",
    location: "UAE",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop&crop=faces&q=80",
    quote:
      "My daughter struggled in a traditional classroom. Here, she gets to ask questions freely and learn at her own pace. Her confidence has grown so much.",
  },
  {
    name: "Shravani Karthik",
    location: "UAE",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop&crop=faces&q=80",
    quote:
      "Genuinely one of the best decisions we made for our children's education. The live classes feel personal, not like a recorded video dump.",
  },
];

export default function ParentReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Review | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-16 sm:py-20 bg-white mx-4 sm:mx-8 lg:mx-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#070F18] tracking-tight leading-tight">
            Hear from the parents of{" "}
            <span className="font-black">Hybrid School &apos;s learners</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl">
            Families share how Hybrid School Learning School has changed the way their children grow, learn, and thrive.
          </p>
        </div>

        {/* Arrows */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="h-11 w-11 rounded-full bg-[#0EA894] text-white flex items-center justify-center hover:bg-[#0bc0a9] transition-colors cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="h-11 w-11 rounded-full bg-[#0EA894] text-white flex items-center justify-center hover:bg-[#0bc0a9] transition-colors cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r) => (
          <button
            key={r.name}
            onClick={() => setSelected(r)}
            className="relative shrink-0 w-[260px] h-[340px] rounded-2xl overflow-hidden snap-start group cursor-pointer"
          >
            <img
              src={r.image}
              alt={r.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  r.name
                )}&size=400&background=0EA894&color=fff&bold=true`;
              }}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-left">
              <span className="text-lg">{r.flag}</span>
              <div>
                <p className="text-white font-bold text-sm leading-tight">{r.name}</p>
                <p className="text-white/80 text-xs">{r.location}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Popup Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 text-[#070F18] flex items-center justify-center hover:bg-white cursor-pointer z-10"
            >
              ✕
            </button>

            <img
              src={selected.image}
              alt={selected.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  selected.name
                )}&size=400&background=0EA894&color=fff&bold=true`;
              }}
              className="w-full h-80 object-cover"
            />

            <div className="p-7">
              <p className="text-slate-700 leading-relaxed text-[15px] mb-5">
                &ldquo;{selected.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selected.flag}</span>
                <div>
                  <p className="font-bold text-[#070F18] text-sm">{selected.name}</p>
                  <p className="text-slate-500 text-xs">{selected.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}