import { useState, useMemo } from "react";
import {
  Folder,
  Target,
  ArrowRight,
  FileText,
  Image,
  Activity as ActIcon,
  CheckCircle2
} from "lucide-react";
export default function Programs({
  programs = [],
  activities = [],
  reports = [],
  selectedProgramId = null,
  onSelectProgramId,
  onNavigateToTab
}) {
  const [activeProgramId, setActiveProgramId] = useState(selectedProgramId);
  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const currentSelectId = onSelectProgramId ? selectedProgramId : activeProgramId;
  const setSelection = (id) => {
    if (onSelectProgramId) {
      onSelectProgramId(id);
    } else {
      setActiveProgramId(id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const filteredPrograms = useMemo(() => {
    if (activeStatusTab === "All") return programs;
    return programs.filter((p) => p.status === activeStatusTab);
  }, [programs, activeStatusTab]);
  const activeProgram = useMemo(() => {
    return programs.find((p) => p.id === currentSelectId);
  }, [programs, currentSelectId]);
  const activeProgramRelationships = useMemo(() => {
    if (!activeProgram) return null;
    const relatedReports = reports.filter(
      (r) => r.programId === activeProgram.id || activeProgram.relatedReportIds?.includes(r.id)
    );
    const relatedActivities = activities.filter(
      (a) => activeProgram.relatedActivityIds?.includes(a.id)
    );
    return { relatedReports, relatedActivities };
  }, [activeProgram, activities, reports]);
  return <div id="programs-initiatives-page" className="pt-8 min-h-screen bg-[#f8fafc] text-left">
      
      {!activeProgram ? (
    /* LANDING VIEW */
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          
          {
      /* Header Title */
    }
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <span className="font-mono text-xs text-accent uppercase tracking-widest font-extrabold block">
              Our Core Initiatives
            </span>
            <h1 className="font-display font-black text-3xl text-slate-900 tracking-tight uppercase">
              Programs
            </h1>
            <p className="text-slate-500 text-xs mt-1 max-w-2xl font-sans">
              Our structured programs focusing on computer literacy, youth coaching, and student support.
            </p>
          </div>

          {
      /* STATUS TABS NAVIGATION */
    }
          <div className="flex border-b border-slate-200 gap-2 pb-0">
            {["All", "Active", "Planned", "Completed", "Archived"].map((status) => {
      const count = status === "All" ? programs.length : programs.filter((p) => p.status === status).length;
      return <button
        key={status}
        onClick={() => setActiveStatusTab(status)}
        className={`px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition-all leading-none cursor-pointer ${activeStatusTab === status ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200"}`}
      >
                  {status} ({count})
                </button>;
    })}
          </div>

          {
      /* MAIN GRID */
    }
          {filteredPrograms.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => {
      const linkedReportsCount = reports.filter((r) => r.programId === program.id).length;
      const statusColors = {
        Active: "bg-emerald-50 text-emerald-800 border-emerald-100",
        Planned: "bg-blue-50 text-blue-800 border-blue-100",
        Completed: "bg-purple-50 text-purple-800 border-purple-100",
        Archived: "bg-gray-100 text-gray-700 border-gray-200"
      };
      return <div
        key={program.id}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-premium hover:border-slate-350 transition flex flex-col justify-between"
      >
                    <div className="h-40 bg-slate-100 relative select-none">
                      <img
        src={program.gallery?.[0] || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600"}
        alt={program.name}
        className="w-full h-full object-cover group-hover:scale-101 transition duration-500"
        referrerPolicy="no-referrer"
      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-sm ${statusColors[program.status]}`}>
                          ● {program.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="font-display font-bold text-base text-slate-900 tracking-tight leading-snug">
                          {program.name}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-sans">
                          {program.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block leading-none font-bold">Objectives</span>
                        <div className="space-y-1">
                          {program.objectives?.slice(0, 2).map((obj, i) => <div key={i} className="flex gap-2 items-start text-[11px] text-slate-600 font-sans">
                              <Target className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span className="truncate">{obj}</span>
                            </div>)}
                        </div>
                      </div>
                    </div>

                    {
        /* Bottom Metadata Indicators */
      }
                    <div className="bg-slate-50 border-t border-slate-100 px-5 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] text-slate-450 font-mono font-bold">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          {linkedReportsCount} Reports
                        </span>
                        <span>•</span>
                        <span>Est. {program.startDate}</span>
                      </div>

                      <button
        onClick={() => setSelection(program.id)}
        className="text-xs font-mono font-bold text-primary flex items-center gap-1 hover:text-accent cursor-pointer transition"
      >
                        View Details
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </button>
                    </div>

                  </div>;
    })}
            </div> : <div className="bg-white py-12 text-center rounded-2xl border border-slate-200 p-6 shadow-premium">
              <Folder className="w-10 h-10 text-slate-350 mx-auto mb-3" />
              <p className="font-display font-medium text-sm text-slate-900 uppercase">No programs found</p>
              <p className="text-slate-400 text-xs mt-1">Please try searching for another segment tab.</p>
            </div>}

        </div>
  ) : (
    /* DETAIL VIEW */
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
          
          <button
      onClick={() => setSelection(null)}
      className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-primary border border-slate-200 bg-white px-4 py-2 rounded-full cursor-pointer transition shadow-sm"
    >
            <ArrowRight className="w-4 h-4 rotate-180 text-accent" />
            Back to Programs Landing
          </button>

          {
      /* PROGRAM HEADER */
    }
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-premium">
            <div className="h-3 bg-accent" />
            
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full">
                  Status: {activeProgram.status}
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  Start Date: {activeProgram.startDate}
                </span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight uppercase">
                Initiative: {activeProgram.name}
              </h1>

              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                {activeProgram.description}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {
      /* Left Column */
    }
            <div className="md:col-span-2 space-y-8">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-premium">
                <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" />
                  Targets
                </h3>
                <div className="space-y-4">
                  {activeProgram.objectives?.map((obj, i) => <div key={i} className="flex gap-3 items-start select-none bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block font-mono">Objective {i + 1}</span>
                        <p className="text-[11px] text-slate-505 mt-0.5 leading-relaxed font-sans">{obj}</p>
                      </div>
                    </div>)}
                </div>
              </div>

              {activeProgram.gallery && activeProgram.gallery.length > 0 && <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                  <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <Image className="w-4 h-4 text-accent" />
                    Photos
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {activeProgram.gallery.map((img, idx) => <div key={idx} className="rounded-xl overflow-hidden border border-slate-200">
                        <img
      src={img}
      alt="Program moment"
      className="w-full h-44 object-cover"
      referrerPolicy="no-referrer"
    />
                      </div>)}
                  </div>
                </div>}

            </div>

            {
      /* Right side relationships */
    }
            <div className="space-y-8">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 leading-none">
                  <ActIcon className="w-4 h-4 text-accent animate-pulse" />
                  Activities
                </h3>
                <div className="space-y-3">
                  {activeProgramRelationships?.relatedActivities && activeProgramRelationships.relatedActivities.length > 0 ? activeProgramRelationships.relatedActivities.map((act) => <div
      key={act.id}
      onClick={() => onNavigateToTab && onNavigateToTab("activities", act.id)}
      className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary cursor-pointer transition group"
    >
                        <span className="text-[9px] font-mono text-slate-400 block font-bold">{act.date}</span>
                        <h4 className="text-[11px] font-bold text-primary transition group-hover:text-accent truncate mt-0.5">
                          {act.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2 text-[9px] text-slate-500 font-mono">
                          <span>{act.location.split(",")[0]}</span>
                          <span className="underline group-hover:text-primary font-bold">Inspect</span>
                        </div>
                      </div>) : <p className="text-[11px] text-slate-400 italic font-semibold font-sans">No activities logged.</p>}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 leading-none">
                  <FileText className="w-4 h-4 text-accent" />
                  Reports
                </h3>
                <div className="space-y-3">
                  {activeProgramRelationships?.relatedReports && activeProgramRelationships.relatedReports.length > 0 ? activeProgramRelationships.relatedReports.map((rep) => <div
      key={rep.id}
      onClick={() => onNavigateToTab && onNavigateToTab("reports", rep.id)}
      className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-primary cursor-pointer transition group"
    >
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 border-none pb-1 font-bold">
                          <span>{rep.date}</span>
                          <span className="text-amber-850 bg-amber-50 px-1 rounded border border-amber-100">Report</span>
                        </div>
                        <h4 className="text-[11px] font-bold text-primary transition group-hover:text-accent line-clamp-2 mt-0.5">
                          {rep.title}
                        </h4>
                        <div className="mt-2 text-right">
                          <span className="text-[9px] font-mono font-bold text-primary group-hover:text-accent underline">
                            Read Document
                          </span>
                        </div>
                      </div>) : <p className="text-[11px] text-slate-400 italic font-semibold font-sans">No reports logged.</p>}
                </div>
              </div>

              {
      /* Quick Action Block (Light theme card) */
    }
              <div className="p-5 rounded-2xl bg-slate-100 text-slate-900 space-y-3 relative overflow-hidden border border-slate-200 shadow-premium">
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-slate-200/50 font-display font-extrabold text-[80px] pointer-events-none uppercase select-none">
                  TK
                </div>
                <h4 className="font-display font-bold text-xs uppercase text-accent tracking-widest leading-none">
                  Student Wing
                </h4>
                <p className="text-[11px] text-slate-505 leading-relaxed font-sans font-medium">
                  Our student wing coordinates and runs these projects across colleges.
                </p>
                <button
      onClick={() => onNavigateToTab && onNavigateToTab("join")}
      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-center py-2 rounded-xl text-[10px] cursor-pointer block transition font-mono uppercase tracking-wider shadow-sm"
    >
                  Join the Movement
                </button>
              </div>

            </div>

          </div>

        </div>
  )}

    </div>;
}
