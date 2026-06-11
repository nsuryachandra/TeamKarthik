import { useState, useMemo } from "react";
import {
  FileText,
  TrendingUp,
  Sparkles,
  Bookmark,
  Award,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export default function YearReview({ annualReports }) {
  const sortedReports = useMemo(() => {
    return [...annualReports].sort((a, b) => b.year - a.year);
  }, [annualReports]);
  const [activeYear, setActiveYear] = useState(null);
  const selectedReport = useMemo(() => {
    if (sortedReports.length === 0) return null;
    if (activeYear === null) {
      return sortedReports[0];
    }
    return sortedReports.find((r) => r.year === activeYear) || sortedReports[0];
  }, [sortedReports, activeYear]);
  if (sortedReports.length === 0) {
    return <div className="min-h-screen pt-8 pb-16 px-4 bg-white flex flex-col items-center justify-center">
        <Bookmark className="w-12 h-12 text-slate-350 mb-4 animate-bounce" />
        <p className="text-slate-500 font-mono text-xs">No annual summaries logged yet.</p>
      </div>;
  }
  return <div className="min-h-screen bg-[#f8fafc] pt-8 pb-16 px-4 sm:px-6 lg:px-8 text-left">
      
      {
    /* PAGE HEADER */
  }
      <div className="max-w-7xl mx-auto mb-10" id="annual-reports-header">
        <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-primary-light text-primary text-xs font-mono font-bold tracking-widest uppercase rounded border border-slate-200">
              Annual Reports
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-none mt-2 uppercase">
              Year in Review
            </h1>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-2xl">
              Summarizing our yearly highlights, volunteer numbers, and student outreach milestones.
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-1.5 rounded-2xl flex gap-1 shadow-sm">
            {sortedReports.map((r) => <button
    key={r.year}
    onClick={() => setActiveYear(r.year)}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedReport?.year === r.year ? "bg-primary text-white" : "text-slate-500 hover:text-primary hover:bg-slate-50"}`}
  >
                {r.year} Campaign
              </button>)}
          </div>
        </div>
      </div>

      {
    /* DETAILED BOOKLET AREA */
  }
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedReport && <motion.div
    key={selectedReport.id}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3 }}
    className="grid lg:grid-cols-12 gap-8 items-start"
  >
              
              {
    /* Binder Cover */
  }
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-primary text-white rounded-3xl p-6 relative overflow-hidden shadow-premium flex flex-col justify-between min-h-[340px]">
                  
                  <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
                  <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase font-black text-accent tracking-widest">
                      <Award className="w-4 h-4 text-accent" />
                      Annual Summary
                    </div>
                    <span className="text-white/40 font-mono text-xs font-bold">{selectedReport.year}</span>
                  </div>

                  <div className="space-y-2 py-4 z-10">
                    <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block">Report Booklet</span>
                    <h2 className="font-display font-black text-3xl leading-none">
                      {selectedReport.year} Year in Review
                    </h2>
                    <p className="text-xs text-accent font-semibold leading-relaxed">
                      "{selectedReport.subtitle}"
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 z-10 flex items-center justify-between text-[11px] font-mono text-slate-350">
                    <span>TEAM KARTHIK CORE</span>
                    <span>STUDENT WING</span>
                  </div>

                </div>

                {
    /* Growth block */
  }
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-premium flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shrink-0">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none font-bold block">Annual Volunteer Growth</span>
                    <span className="font-display font-black text-xl text-primary mt-1 block">{selectedReport.growthRate}</span>
                  </div>
                </div>

              </div>

              {
    /* General details and highlights */
  }
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-premium space-y-8">
                
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-mono font-bold tracking-widest uppercase rounded">
                    Main Theme
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-snug">
                    {selectedReport.theme}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed pt-2">
                    {selectedReport.summary}
                  </p>
                </div>

                {
    /* Core statistics */
  }
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-slate-200 py-6">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Activities Done</span>
                    <span className="font-display font-black text-lg text-primary block">{selectedReport.activitiesCount}</span>
                    <span className="text-[9px] text-[#2b8a3e] bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold border border-emerald-100">+100% target</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Total reach</span>
                    <span className="font-display font-black text-lg text-primary block">{(selectedReport.studentsReached / 1e3).toFixed(1)}k Students</span>
                    <span className="text-[9px] text-[#2b8a3e] bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold border border-emerald-100">Mentored</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Programs</span>
                    <span className="font-display font-black text-lg text-primary block">{selectedReport.programsCount} Active</span>
                    <span className="text-[9px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono font-bold border border-indigo-100">Core hubs</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Milestones</span>
                    <span className="font-display font-black text-lg text-primary block">{selectedReport.milestonesCount} Done</span>
                    <span className="text-[9px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-mono font-bold border border-purple-100">Completed</span>
                  </div>

                </div>

                {
    /* Highlights List */
  }
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                    <h4 className="font-display font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                      Key Accomplishments
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {selectedReport.highlights.map((hlt, idx) => <div
    key={idx}
    className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 transition-colors hover:bg-slate-100 text-left"
  >
                        <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                          {hlt}
                        </p>
                      </div>)}
                  </div>
                </div>

                {
    /* Action booklet download */
  }
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Annual Summary Booklet (.PDF)</span>
                      <span className="text-[10px] text-slate-500 block">Contains detailed overview of our student projects.</span>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer">
                    Preview Booklet
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>

              </div>

            </motion.div>}
        </AnimatePresence>
      </div>

    </div>;
}
