import { useState, useMemo } from "react";
import {
  Quote,
  Calendar,
  User,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Activity as ActIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export default function SuccessStories({
  successStories,
  activities,
  reports,
  onNavigateToTab
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const categories = useMemo(() => {
    const list = new Set(successStories.map((s) => s.category));
    return ["All", ...Array.from(list)];
  }, [successStories]);
  const filteredStories = useMemo(() => {
    if (activeCategory === "All") return successStories;
    return successStories.filter((s) => s.category === activeCategory);
  }, [successStories, activeCategory]);
  const selectedStory = useMemo(() => {
    return successStories.find((s) => s.id === selectedStoryId) || null;
  }, [successStories, selectedStoryId]);
  return <div className="min-h-screen bg-[#f8fafc] pt-8 pb-16 px-4 sm:px-6 lg:px-8 text-left">
      
      {
    /* SECTION HEADER */
  }
      <div className="max-w-7xl mx-auto mb-10" id="success-stories-header">
        <div className="border-b border-slate-200 pb-8">
          <span className="px-3 py-1 bg-accent-light text-accent-dark text-xs font-mono font-bold tracking-widest uppercase rounded border border-accent/20">
            Student Success Stories
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-none mt-2 uppercase">
            Success Stories
          </h1>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-2xl font-sans">
            Read comments and stories from students we have supported with computer labs and classes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedStory ? (
    /* GRID VIEW */
    <motion.div
      key="grid-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
              {
      /* Category selector */
    }
              <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-4">
                {categories.map((cat) => <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeCategory === cat ? "bg-primary text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`}
    >
                    {cat}
                  </button>)}
              </div>

              {
      /* Grid content */
    }
              {filteredStories.length === 0 ? <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-400 shadow-premium">
                  <BookOpen className="w-12 h-12 text-slate-350 mx-auto mb-4" />
                  <p className="text-sm font-medium">No student stories found in this category.</p>
                </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredStories.map((story) => <div
      key={story.id}
      className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden hover:border-slate-300 transition flex flex-col justify-between"
    >
                      <div>
                        {
      /* Story Cover */
    }
                        <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                          <img
      src={story.coverImage}
      alt={story.title}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-101"
      referrerPolicy="no-referrer"
    />
                          <span className="absolute top-4 left-4 bg-primary/95 text-white backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider">
                            {story.category}
                          </span>
                        </div>

                        {
      /* Story Content Summary */
    }
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                            <span className="flex items-center gap-1 font-semibold">
                              <Calendar className="w-3.5 h-3.5 text-accent" />
                              {story.date}
                            </span>
                            {story.author && <span className="flex items-center gap-1 truncate max-w-[150px] font-semibold">
                                <User className="w-3.5 h-3.5 text-accent" />
                                {story.author.split(" ")[0]}
                              </span>}
                          </div>

                          <h3 className="font-display font-bold text-base text-slate-900 tracking-tight leading-snug hover:text-accent transition-colors">
                            {story.title}
                          </h3>
                          
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-sans">
                            {story.summary}
                          </p>
                        </div>
                      </div>

                      {
      /* Bottom action trigger */
    }
                      <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                        {story.metrics && story.metrics[0] ? <div className="text-[10px] font-mono text-left">
                            <span className="text-slate-400 uppercase block leading-none font-bold">Key Metric</span>
                            <span className="font-black text-emerald-600 mt-1 block">{story.metrics[0].value}</span>
                          </div> : <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                            Case Verified
                          </div>}
                        <button
      onClick={() => setSelectedStoryId(story.id)}
      className="flex items-center gap-1.5 text-xs text-primary font-bold hover:text-accent transition cursor-pointer"
    >
                          Read Full Story
                          <ArrowRight className="w-4 h-4 text-accent" />
                        </button>
                      </div>

                    </div>)}
                </div>}
            </motion.div>
  ) : (
    /* DETAILED VIEW */
    <motion.div
      key="detail-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-premium p-6 sm:p-8 space-y-8"
    >
              <button
      onClick={() => setSelectedStoryId(null)}
      className="flex items-center gap-1.5 text-xs text-slate-500 font-bold hover:text-primary transition cursor-pointer"
    >
                <ArrowLeft className="w-4 h-4 text-accent" />
                Back to Stories List
              </button>

              <div className="grid lg:grid-cols-12 gap-8">
                
                {
      /* Visual Cover Column */
    }
                <div className="lg:col-span-5 space-y-6">
                  <div className="rounded-2xl overflow-hidden shadow-sm aspect-video sm:aspect-square bg-slate-100">
                    <img
      src={selectedStory.coverImage}
      alt={selectedStory.title}
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
                  </div>

                  {
      /* Impact Matrix List */
    }
                  {selectedStory.metrics && selectedStory.metrics.length > 0 && <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-display font-extrabold text-xs uppercase tracking-wider">
                          Program Details
                        </h4>
                      </div>
                      <div className="divide-y divide-slate-200">
                        {selectedStory.metrics.map((m, idx) => <div key={idx} className="py-2 flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-500">{m.label}</span>
                            <span className="font-extrabold text-primary">{m.value}</span>
                          </div>)}
                      </div>
                    </div>}

                  {
      /* Related Links */
    }
                  {(selectedStory.relatedActivityId || selectedStory.relatedReportId) && <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-xs font-extrabold text-slate-900 font-display uppercase tracking-wider">
                        Related Links
                      </h4>
                      <p className="text-[11px] text-slate-550 leading-normal font-sans">
                        See related activity logs below.
                      </p>
                      
                      <div className="space-y-1.5 pt-1">
                        {selectedStory.relatedActivityId && <button
      onClick={() => onNavigateToTab("activities", selectedStory.relatedActivityId)}
      className="w-full flex items-center gap-2 text-left p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold cursor-pointer"
    >
                            <ActIcon className="w-3.5 h-3.5 text-accent" />
                            View Activity Details
                          </button>}
                        {selectedStory.relatedReportId && <button
      onClick={() => onNavigateToTab("reports", selectedStory.relatedReportId)}
      className="w-full flex items-center gap-2 text-left p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold cursor-pointer"
    >
                            <FileText className="w-3.5 h-3.5 text-accent" />
                            View Report Details
                          </button>}
                      </div>
                    </div>}

                </div>

                {
      /* Editorial Content Column */
    }
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="space-y-3">
                    <span className="px-3 py-1 bg-accent-light text-accent-dark text-[10px] font-mono font-bold tracking-widest uppercase rounded border border-accent/20">
                      {selectedStory.category}
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight uppercase">
                      {selectedStory.title}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 border-b border-slate-200 pb-4">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-4 h-4 text-accent" />
                        Published: {selectedStory.date}
                      </span>
                      {selectedStory.author && <span className="flex items-center gap-1.5 font-semibold">
                          <User className="w-4 h-4 text-accent" />
                          Coordinator: {selectedStory.author}
                        </span>}
                    </div>
                  </div>

                  <div className="relative p-6 bg-slate-50 rounded-2xl border-l-4 border-accent italic text-slate-700 text-sm leading-relaxed font-sans">
                    <Quote className="w-8 h-8 text-accent/10 absolute -top-2 -left-2 rotate-180" />
                    "{selectedStory.summary}"
                  </div>

                  <div className="text-slate-600 text-sm leading-relaxed space-y-4 font-sans">
                    {selectedStory.content.split("\n\n").map((p, idx) => <p key={idx}>{p}</p>)}
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold block text-emerald-800 leading-none">
                        Verified Success
                      </span>
                      <span className="text-[11px] text-slate-550 mt-1 block font-sans">
                        This story was checked and verified by our student wing coordinators.
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
  )}
        </AnimatePresence>
      </div>

    </div>;
}
