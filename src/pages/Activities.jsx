import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Calendar,
  X,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  Tag,
  Clock,
  LayoutGrid
} from "lucide-react";
export default function Activities({ activities, onSelectActivity, resetSelection }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayMode, setDisplayMode] = useState("grid");
  const [focusedActivityId, setFocusedActivityId] = useState(onSelectActivity || null);
  const categories = [
    "All",
    "College Visit",
    "School Visit",
    "Community Interaction",
    "Student Engagement",
    "Public Program",
    "Special Initiative"
  ];
  React.useEffect(() => {
    if (onSelectActivity) {
      setFocusedActivityId(onSelectActivity);
    }
  }, [onSelectActivity]);
  const handleCloseDetail = () => {
    setFocusedActivityId(null);
    if (resetSelection) {
      resetSelection();
    }
  };
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory;
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || activity.location.toLowerCase().includes(searchQuery.toLowerCase()) || activity.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activities, selectedCategory, searchQuery]);
  const focusedActivity = useMemo(() => {
    return activities.find((a) => a.id === focusedActivityId);
  }, [activities, focusedActivityId]);
  return <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {
    /* 1. HUB HEADER */
  }
      <section className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent bg-accent-light px-3.5 py-1.5 rounded-full border border-accent/20">
            Activities List
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-2 uppercase">
            Campus Activities
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-sans">
            Browse our activities across local schools, college chapters, and village drives.
          </p>
        </div>

        {
    /* View Mode Toggle */
  }
        <div className="bg-white border border-slate-200 rounded-xl p-1.5 flex gap-1 self-start md:self-auto shadow-premium">
          <button
    onClick={() => setDisplayMode("grid")}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer ${displayMode === "grid" ? "bg-primary text-white shadow-sm" : "text-slate-655 hover:text-primary hover:bg-slate-50"}`}
  >
            <LayoutGrid className="w-4 h-4" />
            Grid View
          </button>
          <button
    onClick={() => setDisplayMode("timeline")}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer ${displayMode === "timeline" ? "bg-primary text-white shadow-sm" : "text-slate-655 hover:text-primary hover:bg-slate-50"}`}
  >
            <Clock className="w-4 h-4" />
            Timeline View
          </button>
        </div>
      </section>

      {
    /* 2. SEARCH BAR & CATEGORY PILLS */
  }
      <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-premium space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
    type="text"
    placeholder="Search by title, location, or keywords..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white text-slate-900"
  />
          </div>

          <div className="text-xs font-mono text-slate-400 self-end md:self-auto font-semibold">
            Showing <span className="font-bold text-slate-700">{filteredActivities.length}</span> activities
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide pt-1">
          {categories.map((cat) => <button
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${selectedCategory === cat ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"}`}
  >
              {cat}
            </button>)}
        </div>
      </section>

      {
    /* 3. DYNAMIC CONTENT AREA */
  }
      {filteredActivities.length === 0 ? <div className="bg-white border border-dashed border-slate-250 rounded-3xl py-16 text-center space-y-3 shadow-premium">
          <BookOpen className="w-10 h-10 text-slate-350 mx-auto" />
          <h3 className="font-display font-bold text-lg text-slate-900 uppercase">No Records Found</h3>
          <p className="text-slate-505 text-sm max-w-md mx-auto leading-relaxed">
            We couldn't find any activities matching "{searchQuery}" under "{selectedCategory}". Try updating your query or selecting another category.
          </p>
        </div> : displayMode === "grid" ? (
    /* GRID MODE */
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => <div
      key={activity.id}
      onClick={() => setFocusedActivityId(activity.id)}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-premium hover:border-slate-350 transition flex flex-col justify-between cursor-pointer group"
    >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img
      src={activity.coverImage}
      alt={activity.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
      referrerPolicy="no-referrer"
    />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide bg-primary text-white">
                      {activity.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-450 font-mono font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {activity.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent animate-pulse" />
                      {activity.location.split(",")[0]}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-slate-900 group-hover:text-primary transition-colors text-base line-clamp-2">
                    {activity.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                    {activity.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                  View Details
                  <ArrowUpRight className="w-3 h-3 text-accent" />
                </span>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Student Program</span>
              </div>
            </div>)}
        </div>
  ) : (
    /* TIMELINE MODE */
    <div className="relative border-l border-slate-200 ml-4 md:ml-32 space-y-12 py-4">
          {filteredActivities.map((activity) => <div key={activity.id} className="relative pl-6 md:pl-10">
              <div className="hidden md:block absolute -left-32 top-1 text-right w-24">
                <p className="font-display font-black text-lg text-primary">{activity.date.split("-")[1]}/{activity.date.split("-")[2]}</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">{activity.date.split("-")[0]}</p>
              </div>

              <div className="absolute -left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-accent border border-white z-10 animate-pulse" />

              <div
      onClick={() => setFocusedActivityId(activity.id)}
      className="bg-white border border-slate-200 rounded-2xl shadow-premium hover:border-slate-350 transition p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row gap-6 text-left"
    >
                <div className="w-full md:w-1/3 shrink-0 h-40 overflow-hidden rounded-xl bg-slate-100">
                  <img
      src={activity.coverImage}
      alt={activity.title}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-accent-light text-accent-dark border border-accent/20 text-[10px] font-mono font-bold tracking-wide uppercase">
                        {activity.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 md:hidden font-semibold">{activity.date}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl hover:text-accent transition leading-snug">
                      {activity.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                      {activity.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="flex items-center gap-1 font-mono text-slate-500 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {activity.location}
                    </span>
                    <span className="font-bold text-primary flex items-center gap-1">
                      Explore Story
                      <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                    </span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
  )}

      {
    /* 4. ACTIVITY DETAILED OVERLAY */
  }
      {focusedActivity && <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col transition duration-300 border-l border-slate-200">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 sm:p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                  {focusedActivity.category}
                </span>
              </div>
              <button
    onClick={handleCloseDetail}
    className="p-2 rounded-lg hover:bg-slate-50 text-slate-500 transition cursor-pointer"
    id="close-activity-modal-btn"
  >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative h-64 sm:h-80 w-full bg-slate-100 shrink-0">
              <img
    src={focusedActivity.coverImage}
    alt={focusedActivity.title}
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 text-left">
                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent" />
                    {focusedActivity.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-accent" />
                    {focusedActivity.location}
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-display font-extrabold leading-tight uppercase">
                  {focusedActivity.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8 flex-1 text-left">
              <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-accent space-y-1.5 border border-slate-200">
                <h4 className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-accent" />
                  Key Summary
                </h4>
                <p className="text-sm font-semibold text-primary leading-relaxed font-sans">
                  {focusedActivity.summary}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-slate-900 text-lg uppercase">
                  Activity Details
                </h3>
                <p className="text-sm text-slate-605 leading-relaxed whitespace-pre-wrap font-sans">
                  {focusedActivity.description}
                </p>
              </div>

              {focusedActivity.keyHighlights && focusedActivity.keyHighlights.length > 0 && <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="font-display font-extrabold text-slate-900 text-lg uppercase">
                    Key Points
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {focusedActivity.keyHighlights.map((hl, k) => <div key={k} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center flex flex-col justify-between shadow-sm">
                        <span className="text-xs font-bold text-slate-800 leading-relaxed font-sans">{hl}</span>
                        <span className="text-[10px] font-mono text-accent uppercase font-bold mt-2">Target 0{k + 1}</span>
                      </div>)}
                  </div>
                </div>}

              {focusedActivity.gallery && focusedActivity.gallery.length > 0 && <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="font-display font-extrabold text-slate-900 text-lg uppercase">
                    Photos
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {focusedActivity.gallery.map((img, idx) => <div key={idx} className="h-40 sm:h-48 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                        <img
    src={img}
    alt="Activity moment"
    className="w-full h-full object-cover hover:scale-101 transition duration-300"
    referrerPolicy="no-referrer"
  />
                      </div>)}
                  </div>
                </div>}
            </div>
          </div>
        </div>}
    </div>;
}
