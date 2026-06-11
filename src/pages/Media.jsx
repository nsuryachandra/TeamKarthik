import React, { useState, useMemo } from "react";
import { Camera, MapPin, Calendar, ZoomIn, X } from "lucide-react";
export default function Media({ gallery }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeImgUrl, setActiveImgUrl] = useState(null);
  const categories = [
    "All",
    "College Visit",
    "School Visit",
    "Community Interaction",
    "Student Engagement",
    "Special Initiative"
  ];
  const filteredGallery = useMemo(() => {
    return selectedFilter === "All" ? gallery : gallery.filter((item) => item.category === selectedFilter);
  }, [gallery, selectedFilter]);
  React.useEffect(() => {
    const handleClose = (e) => {
      if (e.key === "Escape") {
        setActiveImgUrl(null);
      }
    };
    window.addEventListener("keydown", handleClose);
    return () => window.removeEventListener("keydown", handleClose);
  }, []);
  return <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      
      {
    /* 1. HEADER */
  }
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent bg-accent-light px-3.5 py-1.5 rounded-full border border-accent/20">
          Photos & Albums
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-none uppercase">
          Photo Gallery
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-sans">
          Pictures of our volunteer teams interacting directly with students in local colleges.
        </p>
      </section>

      {
    /* 2. CATEGORY FILTER TABS */
  }
      <section className="flex justify-center border-b border-slate-200 pb-2">
        <div className="flex gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto scrollbar-hide">
          {categories.map((tab) => <button
    key={tab}
    onClick={() => setSelectedFilter(tab)}
    className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all cursor-pointer ${selectedFilter === tab ? "bg-primary text-white shadow-sm" : "text-slate-600 hover:text-primary hover:bg-slate-100"}`}
  >
              {tab}
            </button>)}
        </div>
      </section>

      {
    /* 3. GRID */
  }
      {filteredGallery.length === 0 ? <div className="bg-white border border-dashed border-slate-250 rounded-3xl py-16 text-center space-y-3 shadow-premium">
          <Camera className="w-10 h-10 text-slate-350 mx-auto" strokeWidth={1} />
          <h3 className="font-display font-bold text-lg text-slate-900 uppercase">No images found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Check back later as our coordinators upload school photos.
          </p>
        </div> : <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredGallery.map((item) => <div
    key={item.id}
    onClick={() => setActiveImgUrl(item.url)}
    className="relative overflow-hidden rounded-2xl break-inside-avoid border border-slate-200 bg-white group cursor-pointer shadow-premium hover:border-slate-350 transition"
  >
              <img
    src={item.url}
    alt={item.title}
    className="w-full h-auto object-cover max-h-96"
    loading="lazy"
  />

              {
    /* Text Hover Panel */
  }
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="w-max px-2 py-0.5 rounded bg-accent text-white text-[8px] font-mono font-bold uppercase tracking-wider mb-2">
                  {item.category}
                </span>

                <h3 className="font-display font-bold text-sm tracking-tight leading-snug">
                  {item.title}
                </h3>

                <div className="flex justify-between items-center text-[10px] text-slate-300 font-mono mt-2 pt-2 border-t border-white/20">
                  <span className="flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {item.date}
                  </span>
                </div>
              </div>

              {
    /* Zoom Trigger Accent */
  }
              <div className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition duration-300">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>)}
        </div>}

      {
    /* LIGHTBOX LAYOUT */
  }
      {activeImgUrl && <div
    className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
    onClick={() => setActiveImgUrl(null)}
  >
          <button
    onClick={() => setActiveImgUrl(null)}
    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
    id="close-gallery-modal-btn"
  >
            <X className="w-6 h-6" />
          </button>

          <img
    src={activeImgUrl}
    alt="Expanded visual feed"
    className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-slate-700"
    onClick={(e) => e.stopPropagation()}
  />
        </div>}
    </div>;
}
