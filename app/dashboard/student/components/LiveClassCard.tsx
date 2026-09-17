import { LiveClassItem } from "../types";

export default function LiveClassCard({ liveClass }: { liveClass: LiveClassItem }) {
  return (
    <div className="rounded-[2.5rem] border-2 border-[#0EA894]/30 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-[#0EA894] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-2xl">
        Live
      </div>
      <div>
        <span className="rounded-full bg-[#0EA894]/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#0EA894] mb-3 inline-block">
          {liveClass.courseTitle}
        </span>
        <h3 className="text-lg font-black text-[#0D1B2E] mb-2">{liveClass.title}</h3>
        <p className="text-xs text-slate-500 font-medium">
          🕒 {liveClass.startTime ? new Date(liveClass.startTime).toLocaleString() : "Time not specified"}
        </p>
      </div>

      {liveClass.meetingUrl && (
        <div className="pt-4 border-t border-slate-100">
          <a
            href={liveClass.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-xl bg-[#0EA894] text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-md shadow-[#0EA894]/20 hover:bg-[#0c9582] transition-colors"
          >
            Join Live Class →
          </a>
        </div>
      )}
    </div>
  );
}