import { useState, useMemo } from "react";
import {
  Search,
  FileText,
  Activity as ActIcon,
  Layers,
  Megaphone,
  ArrowUpRight,
  Shield,
  MapPin,
  Calendar,
  Inbox,
  BookOpen,
  HardDrive
} from "lucide-react";
export default function Archive({
  reports = [],
  activities = [],
  programs = [],
  updates = [],
  onNavigateToTab
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [locationFilter, setLocationFilter] = useState("All");
  const locations = useMemo(() => {
    const list = /* @__PURE__ */ new Set();
    reports.forEach((r) => {
      if (r.location) {
        const city = r.location.split(",").pop()?.trim() || r.location;
        list.add(city);
      }
    });
    activities.forEach((a) => {
      if (a.location) {
        const city = a.location.split(",").pop()?.trim() || a.location;
        list.add(city);
      }
    });
    return ["All", ...Array.from(list)];
  }, [reports, activities]);
  const unifiedItems = useMemo(() => {
    const arr = [];
    reports.forEach((r) => {
      arr.push({
        id: r.id,
        title: r.title,
        summary: r.summary,
        date: r.date,
        type: "report",
        location: r.location,
        additional: r.category
      });
    });
    activities.forEach((a) => {
      arr.push({
        id: a.id,
        title: a.title,
        summary: a.summary,
        date: a.date,
        type: "activity",
        location: a.location,
        additional: a.category
      });
    });
    programs.forEach((p) => {
      arr.push({
        id: p.id,
        title: p.name,
        summary: p.description,
        date: p.startDate,
        type: "program",
        additional: p.status
      });
    });
    updates.forEach((u) => {
      arr.push({
        id: u.id,
        title: u.title,
        summary: u.summary,
        date: u.date,
        type: "update",
        additional: u.category
      });
    });
    return arr.sort((a, b) => b.date.localeCompare(a.date));
  }, [reports, activities, programs, updates]);
  const filteredItems = useMemo(() => {
    return unifiedItems.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.summary.toLowerCase().includes(searchTerm.toLowerCase()) || item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()) || item.additional && item.additional.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || item.type === activeTab;
      const matchesLocation = locationFilter === "All" || item.location && item.location.includes(locationFilter);
      return matchesSearch && matchesTab && matchesLocation;
    });
  }, [unifiedItems, searchTerm, activeTab, locationFilter]);
  const handleItemInspect = (type, id) => {
    if (!onNavigateToTab) return;
    if (type === "report") {
      onNavigateToTab("reports", id);
    } else if (type === "activity") {
      onNavigateToTab("activities", id);
    } else if (type === "program") {
      onNavigateToTab("programs", id);
    } else if (type === "update") {
      onNavigateToTab("updates", id);
    }
  };
  return <div id="organizational-archive-page" className="pt-8 min-h-screen bg-[#f8fafc] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {
    /* Archive Banner Header */
  }
        <div className="bg-slate-100 rounded-3xl p-6 sm:p-10 text-slate-900 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-premium border border-slate-200 select-none">
          
          <div className="space-y-3 relative z-10 max-w-xl text-left">
            <span className="font-mono text-[10px] text-accent-dark uppercase tracking-widest font-extrabold flex items-center gap-1.5 bg-accent-light border border-accent/20 px-3 py-1.5 rounded-full w-fit leading-none">
              <Shield className="w-3.5 h-3.5 text-accent" />
              All Preserved Records
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight uppercase">
              Archives
            </h1>
            <p className="text-slate-500 text-xs leading-relaxed font-sans font-semibold">
              Browse through all historical records, school visits, and activity updates.
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-accent shrink-0 select-none">
            <HardDrive className="w-8 h-8 text-accent animate-pulse" />
          </div>

        </div>

        {
    /* CONTROLS BAR */
  }
        <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4">
          
          <div className="sm:col-span-1 md:col-span-8 relative">
            <input
    type="text"
    placeholder="Search archives..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full text-xs border border-slate-200 rounded-2xl px-5 py-3.5 pl-11 focus:outline-none focus:border-primary transition shadow-premium bg-white text-slate-900 font-sans"
  />
            <Search className="absolute left-4 top-4 w-4.5 h-4.5 text-slate-400" />
          </div>

          <div className="sm:col-span-1 md:col-span-4 select-none relative">
            <select
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
    className="w-full text-xs border border-slate-200 rounded-2xl px-4 py-3.5 bg-white text-slate-700 focus:outline-none focus:border-primary transition shadow-premium font-mono font-bold cursor-pointer"
  >
              <option value="All">All Regions</option>
              {locations.filter((loc) => loc !== "All").map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
            </select>
          </div>

        </div>

        {
    /* CATEGORY tabs */
  }
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-0 scrollbar-none select-none">
          
          {[
    { id: "all", name: "All Records", icon: Layers },
    { id: "reports", name: "Reports", icon: FileText },
    { id: "activities", name: "Activities", icon: ActIcon },
    { id: "programs", name: "Programs", icon: BookOpen },
    { id: "updates", name: "Updates", icon: Megaphone }
  ].map((tab) => {
    const Icon = tab.icon;
    const count = tab.id === "all" ? unifiedItems.length : unifiedItems.filter((item) => item.type === tab.id).length;
    return <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`px-4 py-3.5 text-xs font-mono font-extrabold border-b-2 transition-all flex items-center gap-2 leading-none whitespace-nowrap cursor-pointer ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-650 hover:border-slate-200"}`}
    >
                <Icon className="w-4 h-4 shrink-0 text-accent" />
                {tab.name} ({count})
              </button>;
  })}

        </div>

        {
    /* RESULTS GRID / LIST */
  }
        {filteredItems.length > 0 ? <div className="space-y-4">
            
            {filteredItems.map((item) => {
    const modelStyles = {
      report: {
        badge: "bg-amber-50 text-amber-900 border-amber-100",
        label: "Report",
        icon: FileText
      },
      activity: {
        badge: "bg-emerald-50 text-emerald-900 border-emerald-100",
        label: "Activity",
        icon: ActIcon
      },
      program: {
        badge: "bg-blue-50 text-blue-900 border-blue-100",
        label: "Program",
        icon: BookOpen
      },
      update: {
        badge: "bg-purple-50 text-purple-900 border-purple-100",
        label: "Update",
        icon: Megaphone
      }
    };
    const style = modelStyles[item.type];
    const ItemIcon = style.icon;
    return <div
      key={item.id}
      onClick={() => handleItemInspect(item.type, item.id)}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium hover:border-slate-350 transition flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
    >
                  
                  {
      /* Left Side */
    }
                  <div className="space-y-2 md:max-w-xl text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded border ${style.badge}`}>
                        {style.label}
                      </span>
                      {item.additional && <span className="text-[9px] font-mono font-bold text-slate-400">
                          / {item.additional}
                        </span>}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-sm text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors uppercase">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 font-sans">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {
      /* Right Side */
    }
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0 text-right gap-2">
                    
                    <div className="flex flex-col md:items-end font-mono text-[10px] text-slate-450 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {item.date}
                      </span>
                      {item.location && <span className="flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3 h-3 text-accent animate-pulse" />
                          <span className="max-w-[120px] truncate">{item.location.split(",")[0]}</span>
                        </span>}
                    </div>

                    <button className="text-xs font-mono font-extrabold text-primary flex items-center gap-1 hover:text-accent transition">
                      View
                      <ArrowUpRight className="w-4 h-4 text-accent" />
                    </button>

                  </div>

                </div>;
  })}

          </div> : <div className="bg-white py-12 text-center rounded-2xl border border-slate-200 p-6 select-none border-dashed shadow-premium">
            <Inbox className="w-10 h-10 text-slate-350 mx-auto mb-3" />
            <p className="font-display font-medium text-sm text-slate-900 uppercase">No archive entries found</p>
            <p className="text-slate-450 text-xs mt-1">Try broadening search keywords or regions.</p>
          </div>}

      </div>
    </div>;
}
