import { useState, useMemo } from "react";
import {
  FileText,
  Search,
  Calendar,
  MapPin,
  BarChart2,
  Award,
  Folder,
  HardDrive,
  ChevronRight,
  ArrowLeft,
  Download,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  Lightbulb
} from "lucide-react";
export default function Reports({
  reports = [],
  activities = [],
  programs = [],
  selectedReportId = null,
  onSelectReportId,
  onNavigateToTab
}) {
  const [activeReportId, setActiveReportId] = useState(selectedReportId);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [programFilter, setProgramFilter] = useState("All");
  const [dateSort, setDateSort] = useState("latest");
  const currentSelectId = onSelectReportId ? selectedReportId : activeReportId;
  const setSelection = (id) => {
    if (onSelectReportId) {
      onSelectReportId(id);
    } else {
      setActiveReportId(id);
    }
  };
  const locations = useMemo(() => {
    const list = /* @__PURE__ */ new Set();
    reports.forEach((r) => {
      if (r.location) {
        const city = r.location.split(",").pop()?.trim() || r.location;
        list.add(city);
      }
    });
    return ["All", ...Array.from(list)];
  }, [reports]);
  const analytics = useMemo(() => {
    const total = reports.length;
    const catCounts = {};
    reports.forEach((r) => {
      catCounts[r.category] = (catCounts[r.category] || 0) + 1;
    });
    const currentDate = /* @__PURE__ */ new Date();
    const reportsThisMonth = reports.filter((r) => {
      const repDate = new Date(r.date);
      return repDate.getMonth() === currentDate.getMonth() && repDate.getFullYear() === currentDate.getFullYear();
    }).length;
    const progCounter = {};
    reports.forEach((r) => {
      if (r.programId) {
        progCounter[r.programId] = (progCounter[r.programId] || 0) + 1;
      }
    });
    let maxProgId = "";
    let maxCount = 0;
    Object.entries(progCounter).forEach(([id, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxProgId = id;
      }
    });
    const mostActiveProgram = programs.find((p) => p.id === maxProgId)?.name || "Campus Connect";
    return {
      total,
      catCounts,
      reportsThisMonth,
      mostActiveProgram
    };
  }, [reports, programs]);
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.summary.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase()) || r.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || r.category === categoryFilter;
      const matchesLocation = locationFilter === "All" || r.location.includes(locationFilter);
      const matchesProgram = programFilter === "All" || r.programId === programFilter;
      return matchesSearch && matchesCategory && matchesLocation && matchesProgram;
    }).sort((a, b) => {
      if (dateSort === "latest") {
        return b.date.localeCompare(a.date);
      } else {
        return a.date.localeCompare(b.date);
      }
    });
  }, [reports, searchTerm, categoryFilter, locationFilter, programFilter, dateSort]);
  const featuredReports = useMemo(() => {
    return reports.filter((r) => r.isFeatured);
  }, [reports]);
  const activeReport = useMemo(() => {
    return reports.find((r) => r.id === currentSelectId);
  }, [reports, currentSelectId]);
  const activeReportDetails = useMemo(() => {
    if (!activeReport) return null;
    const linkedActivity = activities.find((a) => a.id === activeReport.activityId);
    const linkedProgram = programs.find((p) => p.id === activeReport.programId);
    return { linkedActivity, linkedProgram };
  }, [activeReport, activities, programs]);
  return <div id="reports-center-page" className="pt-8 min-h-screen bg-[#f8fafc] text-left">
      
      {!activeReport ? (
    /* LANDING VIEW */
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          
          {
      /* Elegant Page Title */
    }
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest font-extrabold block mb-1">
                Verified Work Records
              </span>
              <h1 className="font-display font-black text-3xl text-slate-900 tracking-tight uppercase">
                Reports
              </h1>
              <p className="text-slate-500 text-xs mt-1 max-w-2xl font-sans">
                Read notes, surveys, and progress reports filed by our coordinators.
              </p>
            </div>
            {onNavigateToTab && <button
      onClick={() => onNavigateToTab("archive")}
      className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:text-accent border border-slate-200 px-4 py-2 rounded-full cursor-pointer bg-white transition shadow-sm hover:border-primary shrink-0"
    >
                <HardDrive className="w-3.5 h-3.5 text-accent" />
                All Reports
              </button>}
          </div>

          {
      /* REPORT ANALYTICS HUB */
    }
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shrink-0">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Reports Done</span>
                <p className="text-2xl font-black text-primary font-display mt-0.5">{analytics.total}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">Activities reported</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                <Compass className="w-5 h-5 text-accent animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Recent Reports</span>
                <p className="text-2xl font-black text-primary font-display mt-0.5">{analytics.reportsThisMonth}</p>
                <p className="text-[10px] text-slate-505 mt-0.5 font-semibold">Logged this month</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Main Program</span>
                <p className="text-sm font-black text-primary font-display mt-1.5 truncate max-w-[150px]">
                  {analytics.mostActiveProgram}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">Current campaign</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <BarChart2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider font-semibold">Topics</span>
                <p className="text-2xl font-black text-primary font-display mt-0.5">
                  {Object.keys(analytics.catCounts).length}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">Categories</p>
              </div>
            </div>

          </div>

          {
      /* FEATURED REPORTS */
    }
          {featuredReports.length > 0 && <div className="space-y-4">
              <div className="flex items-center gap-1.5 pl-1">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <h2 className="font-display font-extrabold text-xs text-slate-900 uppercase tracking-widest">
                  Key Highlights
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredReports.map((report) => <div
      key={report.id}
      className="relative bg-white border border-slate-200 shadow-premium rounded-2xl overflow-hidden hover:border-slate-300 transition flex flex-col justify-between"
    >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                    
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="bg-slate-50 border border-slate-200 text-slate-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                          {report.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-450 flex items-center gap-1 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          {report.date}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <h3 className="font-display font-bold text-base text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors">
                          {report.title}
                        </h3>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-sans">
                          {report.summary}
                        </p>
                      </div>

                      {report.observations?.length > 0 && <div className="flex flex-wrap gap-1.5 pt-1">
                          {report.observations.slice(0, 2).map((obs, i) => <span key={i} className="text-[9px] bg-slate-50 text-slate-605 px-2 py-0.5 rounded border border-slate-100 line-clamp-1 max-w-[200px] font-sans font-semibold">
                              ● {obs}
                            </span>)}
                        </div>}
                    </div>

                    <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
                      <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1.5 font-bold">
                        <Award className="w-3.5 h-3.5 text-accent" />
                        Verified Report
                      </span>
                      <button
      onClick={() => setSelection(report.id)}
      className="text-xs font-mono font-bold text-primary flex items-center gap-1 hover:text-accent cursor-pointer"
    >
                        Read Full Report
                        <ArrowUpRight className="w-4 h-4 text-accent" />
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>}

          {
      /* SEARCH SYSTEM */
    }
          <div className="bg-white rounded-3xl border border-slate-200 shadow-premium p-6 space-y-6">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-accent" />
                <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wide">
                  Filter Reports
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-400 font-bold">
                Showing {filteredReports.length} of {reports.length} Reports
              </span>
            </div>

            {
      /* Filters Row */
    }
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="relative">
                <input
      type="text"
      placeholder="Keywords / Location..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 pl-8 focus:outline-none focus:border-primary bg-white text-slate-900"
    />
                <Search className="absolute left-2.5 top-3.5 w-3.5 h-3.5 text-slate-400" />
              </div>

              <div>
                <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:border-primary cursor-pointer"
    >
                  <option value="All">All Categories</option>
                  <option value="College Visit Report">College Visit Reports</option>
                  <option value="School Visit Report">School Visit Reports</option>
                  <option value="Community Interaction Report">Community Interaction Reports</option>
                  <option value="Program Report">Program Reports</option>
                  <option value="Initiative Report">Initiative Reports</option>
                  <option value="Special Activity Report">Special Activity Reports</option>
                </select>
              </div>

              <div>
                <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:border-primary cursor-pointer"
    >
                  <option value="All">All Locations</option>
                  {locations.filter((loc) => loc !== "All").map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
                </select>
              </div>

              <div>
                <select
      value={programFilter}
      onChange={(e) => setProgramFilter(e.target.value)}
      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:border-primary cursor-pointer"
    >
                  <option value="All">All Linked Programs</option>
                  {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <select
      value={dateSort}
      onChange={(e) => setDateSort(e.target.value)}
      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:border-primary cursor-pointer"
    >
                  <option value="latest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                </select>
              </div>

            </div>

          </div>

          {
      /* REPORTS GRID */
    }
          {filteredReports.length > 0 ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => <div
      key={report.id}
      onClick={() => setSelection(report.id)}
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-premium hover:border-slate-350 transition flex flex-col justify-between cursor-pointer"
    >
                  <div className="space-y-4">
                    
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] bg-slate-50 border border-slate-200 text-slate-800 px-2.5 py-1 rounded-full font-mono font-bold leading-none select-none">
                        {report.category.replace(" Report", "")}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold shrink-0">
                        {report.date}
                      </span>
                    </div>

                    <div className="space-y-2 text-left">
                      <h4 className="font-display font-bold text-sm text-slate-900 tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {report.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-3 font-sans">
                        {report.summary}
                      </p>
                    </div>

                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-450">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span className="truncate max-w-[120px]">{report.location.split(",")[0]}</span>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-primary flex items-center gap-1 hover:text-accent transition">
                      Inspect
                      <ChevronRight className="w-3.5 h-3.5 text-accent" />
                    </span>
                  </div>
                </div>)}
            </div> : <div className="bg-white py-12 text-center rounded-2xl border border-slate-200 shadow-premium p-6">
              <FileText className="w-10 h-10 text-slate-350 mx-auto mb-3" />
              <p className="font-display font-bold text-sm text-slate-900">No reports found matching criteria</p>
              <p className="text-slate-400 text-xs mt-1">Try relaxing filters or search terms.</p>
              <button
      onClick={() => {
        setSearchTerm("");
        setCategoryFilter("All");
        setLocationFilter("All");
        setProgramFilter("All");
      }}
      className="mt-4 text-xs font-mono font-bold text-white bg-primary px-4 py-2 rounded-full cursor-pointer hover:bg-primary-dark transition shadow-sm"
    >
                Reset Filters
              </button>
            </div>}

        </div>
  ) : (
    /* DETAIL VIEW */
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          <button
      onClick={() => setSelection(null)}
      className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-primary border border-slate-200 bg-white px-4 py-2 rounded-full cursor-pointer transition shadow-sm"
    >
            <ArrowLeft className="w-4 h-4 text-accent" />
            Back to Reports Center
          </button>

          {
      /* REPORT HEADER */
    }
          <div className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden text-left">
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-indigo-50" />
            <div className="p-6 sm:p-8 space-y-4">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-slate-50 border border-slate-200 text-slate-800 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeReport.category}
                </span>
                {activeReport.isFeatured && <span className="bg-accent-light text-accent-dark text-[10px] px-3 py-1 rounded-full font-bold border border-accent/20 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-accent" />
                    Featured Document
                  </span>}
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight tracking-tight uppercase">
                {activeReport.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none font-bold">Report Date</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-accent animate-pulse" />
                    <span>{activeReport.date}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none font-bold">Center/Location</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800 truncate">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span className="truncate">{activeReport.location}</span>
                  </div>
                </div>

                {activeReportDetails?.linkedProgram && <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none font-bold">Linked Program</span>
                    <div
      onClick={() => onNavigateToTab && onNavigateToTab("programs")}
      className="flex items-center gap-1 text-xs font-bold text-primary hover:text-accent cursor-pointer truncate"
    >
                      <Folder className="w-3.5 h-3.5 text-accent" />
                      <span className="truncate underline">{activeReportDetails.linkedProgram.name}</span>
                    </div>
                  </div>}

                {activeReportDetails?.linkedActivity && <div className="space-y-0.5 col-span-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest leading-none font-bold">Related Activity</span>
                    <div
      onClick={() => onNavigateToTab && onNavigateToTab("activities")}
      className="flex items-center gap-1 text-xs font-bold text-primary hover:text-accent cursor-pointer truncate"
    >
                      <HardDrive className="w-3.5 h-3.5 text-accent" />
                      <span className="truncate underline">{activeReportDetails.linkedActivity.title}</span>
                    </div>
                  </div>}
              </div>

            </div>
          </div>

          {
      /* MAIN DOCUMENT TEXT LAYOUT */
    }
          <div className="grid md:grid-cols-3 gap-8 text-left">
            
            {
      /* Left Column */
    }
            <div className="md:col-span-2 space-y-8">
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                <h3 className="font-display font-extrabold text-xs uppercase text-slate-900 tracking-wider flex items-center gap-1.5 leading-none">
                  <Award className="w-4 h-4 text-accent" />
                  Summary
                </h3>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-sans italic">
                  "{activeReport.summary}"
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-premium">
                <h3 className="font-display font-extrabold text-sm text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-3">
                  I. Detailed Findings
                </h3>
                <div className="text-slate-600 text-xs leading-relaxed space-y-4 font-normal whitespace-pre-wrap font-sans">
                  {activeReport.description}
                </div>
              </div>

              {activeReport.gallery && activeReport.gallery.length > 0 && <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                  <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wide">
                    II. Photos
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {activeReport.gallery.map((imgUrl, idx) => <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 group relative bg-slate-50">
                        <img
      src={imgUrl}
      alt={`Report snapshot ${idx + 1}`}
      className="w-full h-40 object-cover"
      referrerPolicy="no-referrer"
    />
                      </div>)}
                  </div>
                </div>}

            </div>

            {
      /* Right details sidebar */
    }
            <div className="space-y-8">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 leading-none">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  Observations
                </h3>
                <div className="space-y-3">
                  {activeReport.observations?.length > 0 ? activeReport.observations.map((item, idx) => <div key={idx} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-slate-600 leading-relaxed font-semibold font-sans">{item}</p>
                      </div>) : <p className="text-[11px] text-slate-400 italic font-semibold font-sans">No observations listed.</p>}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 leading-none">
                  <MessageSquare className="w-4 h-4 text-accent animate-pulse" />
                  Feedback Logged
                </h3>
                <div className="space-y-3">
                  {activeReport.discussions?.length > 0 ? activeReport.discussions.map((item, idx) => <div key={idx} className="flex gap-2.5 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <p className="text-[11px] text-slate-600 leading-relaxed font-sans">{item}</p>
                      </div>) : <p className="text-[11px] text-slate-400 italic font-semibold font-sans">No comments logged.</p>}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 leading-none">
                  <Award className="w-4 h-4 text-accent" />
                  Outcomes
                </h3>
                <div className="space-y-3">
                  {activeReport.outcomes?.length > 0 ? activeReport.outcomes.map((item, idx) => <div key={idx} className="flex gap-2.5 items-start bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-slate-900 font-bold leading-normal font-sans">{item}</p>
                      </div>) : <p className="text-[11px] text-slate-400 italic font-semibold font-sans">No outcomes logged.</p>}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-premium">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 leading-none">
                  <FileText className="w-4 h-4 text-accent" />
                  Document Downloads
                </h3>
                <div className="space-y-2">
                  {activeReport.documents?.length > 0 ? activeReport.documents.map((doc, idx) => <div
      key={idx}
      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition"
    >
                        <div className="flex items-center gap-2 truncate">
                          <Download className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="text-[11px] font-mono text-slate-600 truncate">{doc}</span>
                        </div>
                        <button className="text-[10px] font-mono font-black text-primary hover:text-accent px-2 py-0.5 border border-slate-200 bg-white rounded cursor-pointer leading-none">
                          GET
                        </button>
                      </div>) : <div
      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition"
    >
                      <div className="flex items-center gap-2 truncate">
                        <Download className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="text-[11px] font-mono text-slate-600 truncate">Report_Brief_{activeReport.id}.pdf</span>
                      </div>
                      <button className="text-[10px] font-mono font-black text-primary hover:text-accent px-2 py-0.5 border border-slate-250 bg-white rounded cursor-pointer leading-none">
                        GET
                      </button>
                    </div>}
                </div>
              </div>

            </div>

          </div>

        </div>
  )}

    </div>;
}
