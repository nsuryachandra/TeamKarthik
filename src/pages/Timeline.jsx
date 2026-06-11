import { useState, useMemo } from "react";
import {
  Calendar,
  MapPin,
  Sliders,
  ChevronDown,
  ChevronUp,
  Clock
} from "lucide-react";
export default function Timeline({ timeline = [] }) {
  const [viewType, setViewType] = useState("monthly");
  const [expandedNodes, setExpandedNodes] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("All");
  const toggleNode = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const categories = useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    timeline.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return ["All", ...Array.from(set)];
  }, [timeline]);
  const filteredTimeline = useMemo(() => {
    let sorted = [...timeline].sort((a, b) => b.date.localeCompare(a.date));
    if (categoryFilter !== "All") {
      sorted = sorted.filter((t) => t.category === categoryFilter);
    }
    return sorted;
  }, [timeline, categoryFilter]);
  const groupedTimeline = useMemo(() => {
    const groups = {};
    filteredTimeline.forEach((entry) => {
      const dateObj = new Date(entry.date);
      let key = "";
      if (viewType === "monthly") {
        key = dateObj.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      } else {
        key = dateObj.getFullYear().toString();
      }
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(entry);
    });
    return groups;
  }, [filteredTimeline, viewType]);
  return <div id="journey-timeline-page" className="pt-8 min-h-screen bg-[#f8fafc] text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {
    /* Title & Introduction */
  }
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="font-mono text-xs text-accent uppercase tracking-widest font-extrabold block">
            Our Journey
          </span>
          <h1 className="font-display font-black text-3xl text-slate-900 tracking-tight uppercase">
            Journey
          </h1>
          <p className="text-slate-500 text-xs mt-1 max-w-2xl font-sans">
            Explore the timeline of our work in regional outreach and education.
          </p>
        </div>

        {
    /* CONTROLS BAR */
  }
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-premium">
          
          <div className="flex bg-[#f8fafc] rounded-xl border border-slate-200 p-1 w-full sm:w-auto">
            <button
    onClick={() => setViewType("monthly")}
    className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-mono font-extrabold transition-all cursor-pointer ${viewType === "monthly" ? "bg-primary text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
  >
              Monthly View
            </button>
            <button
    onClick={() => setViewType("yearly")}
    className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-mono font-extrabold transition-all cursor-pointer ${viewType === "yearly" ? "bg-primary text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
  >
              Yearly View
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto select-none">
            <Sliders className="w-4 h-4 text-accent shrink-0" />
            <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="w-full sm:w-xs text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:border-primary transition font-mono font-bold cursor-pointer"
  >
              <option value="All">All Milestones</option>
              {categories.filter((cat) => cat !== "All").map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </div>

        </div>

        {
    /* TIMELINE VISUAL STRUCTURE */
  }
        {Object.keys(groupedTimeline).length > 0 ? <div className="relative border-l-2 border-slate-200 pl-6 sm:pl-10 space-y-12 ml-2 sm:ml-6 pb-4">
            
            {Object.entries(groupedTimeline).map(([groupTitle, entries]) => <div key={groupTitle} className="space-y-6 relative">
                
                {
    /* Node group circle badge on line */
  }
                <div className="absolute -left-[35px] sm:-left-[51px] top-0 pointer-events-none z-10">
                  <div className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] bg-[#f8fafc] border-4 border-accent rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  </div>
                </div>

                {
    /* Group Heading Label */
  }
                <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 tracking-tight pl-2 uppercase">
                  {groupTitle}
                </h3>

                {
    /* Entries items container */
  }
                <div className="space-y-6 pl-2">
                  {entries.map((entry) => {
    const isExpanded = !!expandedNodes[entry.id];
    return <div
      key={entry.id}
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-premium hover:border-slate-350 transition relative space-y-4"
    >
                        {
      /* Milestone date & badge heading */
    }
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-mono font-extrabold bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                              {entry.category}
                            </span>
                            {entry.location && <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono font-bold">
                                <MapPin className="w-3 h-3 text-accent" />
                                {entry.location}
                              </span>}
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-450">
                            <Calendar className="w-3.5 h-3.5 text-accent animate-pulse" />
                            <span>{entry.date}</span>
                          </div>
                        </div>

                        {
      /* Title and summary */
    }
                        <div className="space-y-2">
                          <h4 className="font-display font-bold text-base text-slate-900 tracking-tight leading-snug uppercase">
                            {entry.title}
                          </h4>
                          <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">
                            {entry.summary}
                          </p>
                        </div>

                        {
      /* Milestone Images list */
    }
                        {entry.images && entry.images.length > 0 && isExpanded && <div className="grid grid-cols-2 gap-4 pt-2 select-none">
                            {entry.images.map((img, idx) => <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 shadow-inner relative max-h-40">
                                <img
      src={img}
      alt="Timeline photo"
      className="w-full h-full object-cover"
    />
                              </div>)}
                          </div>}

                        {
      /* Expandable trigger controls */
    }
                        {entry.images && entry.images.length > 0 && <div className="flex justify-end pt-1">
                            <button
      onClick={() => toggleNode(entry.id)}
      className="flex items-center gap-1 text-[10px] font-mono font-extrabold text-primary hover:text-accent uppercase tracking-wider cursor-pointer select-none"
    >
                              {isExpanded ? <>
                                  Hide Details
                                  <ChevronUp className="w-3.5 h-3.5 text-accent" />
                                </> : <>
                                  View Details
                                  <ChevronDown className="w-3.5 h-3.5 text-accent" />
                                </>}
                            </button>
                          </div>}

                      </div>;
  })}
                </div>

              </div>)}

          </div> : <div className="bg-white py-12 text-center rounded-2xl border border-slate-200 p-6 shadow-premium border-dashed">
            <Clock className="w-10 h-10 text-slate-350 mx-auto mb-3" />
            <p className="font-display font-medium text-sm text-slate-900 uppercase">No timeline milestones found</p>
            <p className="text-slate-450 text-xs mt-1">Please select another Category filter.</p>
          </div>}

      </div>
    </div>;
}
