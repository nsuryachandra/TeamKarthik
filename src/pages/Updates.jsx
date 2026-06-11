import { useState, useMemo } from "react";
import { Calendar, Search, Newspaper, UserCheck, Flame } from "lucide-react";
export default function Updates({ updates }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    "All",
    "News",
    "Update",
    "Notice",
    "Program Announcement"
  ];
  const filteredUpdates = useMemo(() => {
    return updates.filter((bulletin) => {
      const matchesCategory = selectedCategory === "All" || bulletin.category === selectedCategory;
      const matchesSearch = bulletin.title.toLowerCase().includes(searchQuery.toLowerCase()) || bulletin.content.toLowerCase().includes(searchQuery.toLowerCase()) || bulletin.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [updates, selectedCategory, searchQuery]);
  return <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {
    /* 1. HEADER */
  }
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent bg-accent-light px-3.5 py-1.5 rounded-full border border-accent/20">
          News & Circulars
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-none uppercase">
          Updates & Announcements
        </h1>
        <p className="text-base text-slate-650 leading-relaxed font-sans">
          Stay informed about our latest school programs, volunteer events, and student welfare notices.
        </p>
      </section>

      {
    /* 2. CONTROLS */
  }
      <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-premium flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full sm:w-auto">
          {categories.map((c) => <button
    key={c}
    onClick={() => setSelectedCategory(c)}
    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap cursor-pointer transition ${selectedCategory === c ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-primary"}`}
  >
              {c}
            </button>)}
        </div>

        <div className="relative w-full sm:w-72">
          <label htmlFor="update-search-input" className="sr-only">Search updates</label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
    id="update-search-input"
    type="text"
    placeholder="Search updates..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary bg-white text-slate-900"
  />
        </div>
      </section>

      {
    /* 3. GRID */
  }
      {filteredUpdates.length === 0 ? <div className="bg-white border border-slate-250 border-dashed rounded-3xl py-16 text-center space-y-3 shadow-premium">
          <Newspaper className="w-10 h-10 text-slate-350 mx-auto" strokeWidth={1} />
          <h3 className="font-display font-bold text-lg text-slate-900 uppercase">No updates found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Check back later as our coordinators post news from school programs.
          </p>
        </div> : <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {
    /* Main bulletin spotlight */
  }
          {selectedCategory === "All" && filteredUpdates.length > 0 && !searchQuery ? <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-premium space-y-6">
              <div className="flex justify-between items-center text-xs">
                <span className="bg-accent-light text-accent-dark border border-accent/20 px-3 py-0.5 rounded-full font-mono text-[9px] uppercase font-bold">
                  {filteredUpdates[0].category}
                </span>
                <span className="text-slate-450 font-mono flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {filteredUpdates[0].date}
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-display font-extrabold text-slate-900 leading-tight uppercase">
                {filteredUpdates[0].title}
              </h2>

              <p className="text-sm text-slate-650 font-medium border-l-2 border-accent pl-4 leading-relaxed font-sans">
                {filteredUpdates[0].summary}
              </p>

              <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
                {filteredUpdates[0].content}
              </div>

              <div className="border-t border-slate-200 pt-6 flex flex-wrap justify-between items-center text-xs gap-4 text-slate-500">
                <span className="flex items-center gap-1.5 font-mono font-bold">
                  <UserCheck className="w-4 h-4 text-accent" />
                  Verified Bulletin
                </span>
                <span className="font-mono font-bold">{filteredUpdates[0].readingTime || "3 min read"}</span>
              </div>
            </div> : null}

          {
    /* Side list */
  }
          <div
    className={`${selectedCategory === "All" && filteredUpdates.length > 0 && !searchQuery ? "md:col-span-4" : "md:col-span-12"} space-y-6`}
  >
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-accent animate-pulse" />
              {selectedCategory === "All" && filteredUpdates.length > 1 && !searchQuery ? "Other Updates" : "Update List"}
            </h3>

            <div className="space-y-6">
              {filteredUpdates.slice(selectedCategory === "All" && filteredUpdates.length > 0 && !searchQuery ? 1 : 0).map((up) => <div
    key={up.id}
    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-premium space-y-3"
  >
                    <div className="flex justify-between items-center text-xs text-slate-450 font-mono">
                      <span className="text-accent uppercase font-bold text-[10px] tracking-wider">
                        {up.category}
                      </span>
                      <span>{up.date}</span>
                    </div>

                    <h4 className="font-display font-bold text-slate-900 text-base leading-snug">
                      {up.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                      {up.summary}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 max-h-24 overflow-y-auto mt-2 leading-relaxed scrollbar-hide border border-slate-200">
                      {up.content}
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-450 font-semibold">
                      <span>Posted by: Student Wing Coordinator</span>
                      <span>{up.readingTime || "2 min read"}</span>
                    </div>
                  </div>)}
            </div>
          </div>

        </div>}
    </div>;
}
