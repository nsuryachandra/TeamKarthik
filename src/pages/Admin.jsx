import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Newspaper,
  UserPlus,
  Sliders,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Settings,
  FileText,
  FolderKanban,
  Milestone,
  MapPin
} from "lucide-react";
import AdminReports from "../components/AdminReports";
import AdminPrograms from "../components/AdminPrograms";
import AdminTimeline from "../components/AdminTimeline";
import AdminSuccessStories from "../components/AdminSuccessStories";
import AdminCoverageMap from "../components/AdminCoverageMap";
import AdminAnnualReports from "../components/AdminAnnualReports";
export default function Admin({
  activities,
  updates,
  registrations,
  gallery,
  config,
  reports = [],
  programs = [],
  timeline = [],
  successStories = [],
  coverageLocations = [],
  annualReports = [],
  onUpdateActivities,
  onUpdateUpdates,
  onUpdateRegistrations,
  onUpdateGallery,
  onUpdateConfig,
  onUpdateReports,
  onUpdatePrograms,
  onUpdateTimeline,
  onUpdateSuccessStories,
  onUpdateCoverageLocations,
  onUpdateAnnualReports
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [regSearch, setRegSearch] = useState("");
  const [regFilter, setRegFilter] = useState("All");
  const [actModalOpen, setActModalOpen] = useState(false);
  const [editingAct, setEditingAct] = useState(null);
  const [actTitle, setActTitle] = useState("");
  const [actProgramId, setActProgramId] = useState("");
  const [actDate, setActDate] = useState("");
  const [actLocation, setActLocation] = useState("");
  const [actCategory, setActCategory] = useState("Special Initiative");
  const [actCover, setActCover] = useState("");
  const [actSummary, setActSummary] = useState("");
  const [actDesc, setActDesc] = useState("");
  const [actHighlights, setActHighlights] = useState(["", "", ""]);
  const [actGallery, setActGallery] = useState([""]);
  const [upModalOpen, setUpModalOpen] = useState(false);
  const [editingUp, setEditingUp] = useState(null);
  const [upTitle, setUpTitle] = useState("");
  const [upDate, setUpDate] = useState("");
  const [upCategory, setUpCategory] = useState("Notice");
  const [upSummary, setUpSummary] = useState("");
  const [upContent, setUpContent] = useState("");
  const [upTime, setUpTime] = useState("2 min read");
  const [galUrl, setGalUrl] = useState("");
  const [galTitle, setGalTitle] = useState("");
  const [galCategory, setGalCategory] = useState("General");
  const [galLocation, setGalLocation] = useState("");
  const [configHeadline, setConfigHeadline] = useState(config.hero.headline);
  const [configMission, setConfigMission] = useState(config.hero.mission);
  const [configCollegesRoamed, setConfigCollegesRoamed] = useState(config.stats.collegesRoamed || 0);
  const [configIssuesRaised, setConfigIssuesRaised] = useState(config.stats.issuesRaised || 0);
  const [configInstantlySolved, setConfigInstantlySolved] = useState(config.stats.instantlySolved || 0);
  const [configFeatured, setConfigFeatured] = useState(config.featuredActivityId);
  const [notifyMsg, setNotifyMsg] = useState("");
  const triggerNotify = (msg) => {
    setNotifyMsg(msg);
    setTimeout(() => setNotifyMsg(""), 4e3);
  };
  const handleRegStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/registrations/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      const newRegs = registrations.map((r) => r.id === id ? { ...r, status: updated.status } : r);
      onUpdateRegistrations(newRegs);
      triggerNotify(`Registration status marked as "${status}"!`);
    } catch (e) {
      alert("Failed to modify registration status.");
    }
  };
  const handleRegDelete = async (id) => {
    if (!window.confirm("Verify: Are you sure you want to remove this registry application?")) return;
    try {
      const res = await fetch(`/api/registrations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onUpdateRegistrations(registrations.filter((r) => r.id !== id));
      triggerNotify("Applicant deleted from registry.");
    } catch (e) {
      alert("Failed to delete applicant.");
    }
  };
  const handleActSubmit = async (e) => {
    e.preventDefault();
    if (!actTitle || !actDate || !actLocation) {
      alert("Title, Date, and Location are mandatory values.");
      return;
    }
    const payload = {
      title: actTitle,
      date: actDate,
      location: actLocation,
      category: actCategory,
      coverImage: actCover || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600",
      summary: actSummary || "Summary prose...",
      description: actDesc || "Detailed historical narrative transcript...",
      keyHighlights: actHighlights.filter((h) => h.trim() !== ""),
      gallery: actGallery.filter((g) => g.trim() !== ""),
      programId: actProgramId || ""
    };
    try {
      if (editingAct) {
        const res = await fetch(`/api/activities/${editingAct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        onUpdateActivities(activities.map((a) => a.id === updated.id ? updated : a));
        triggerNotify("Activity catalog item updated!");
      } else {
        const res = await fetch("/api/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        onUpdateActivities([created, ...activities]);
        triggerNotify("New activity logged and published!");
      }
      setActModalOpen(false);
      resetActForm();
    } catch (e2) {
      alert("Failed to submit activity form.");
    }
  };
  const resetActForm = () => {
    setEditingAct(null);
    setActTitle("");
    setActDate("");
    setActLocation("");
    setActCategory("Special Initiative");
    setActCover("");
    setActSummary("");
    setActDesc("");
    setActHighlights(["", "", ""]);
    setActGallery([""]);
    setActProgramId("");
  };
  const handleEditActClick = (act) => {
    setEditingAct(act);
    setActTitle(act.title);
    setActDate(act.date);
    setActLocation(act.location);
    setActCategory(act.category);
    setActCover(act.coverImage);
    setActSummary(act.summary);
    setActDesc(act.description);
    setActHighlights([
      act.keyHighlights[0] || "",
      act.keyHighlights[1] || "",
      act.keyHighlights[2] || ""
    ]);
    setActGallery(act.gallery.length > 0 ? act.gallery : [""]);
    setActProgramId(act.programId || "");
    setActModalOpen(true);
  };
  const handleDeleteAct = async (id) => {
    if (!window.confirm("Verify: Are you sure you want to permanently delete this activity record and its timeline entries?")) return;
    try {
      const res = await fetch(`/api/activities/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onUpdateActivities(activities.filter((a) => a.id !== id));
      triggerNotify("Activity successfully wiped from records.");
    } catch (e) {
      alert("Failed to delete activity.");
    }
  };
  const handleUpSubmit = async (e) => {
    e.preventDefault();
    if (!upTitle || !upDate || !upSummary) {
      alert("Title, Date, and Summary are required.");
      return;
    }
    const payload = {
      title: upTitle,
      date: upDate,
      category: upCategory,
      summary: upSummary,
      content: upContent,
      readingTime: upTime
    };
    try {
      if (editingUp) {
        const res = await fetch(`/api/updates/${editingUp.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        onUpdateUpdates(updates.map((u) => u.id === updated.id ? updated : u));
        triggerNotify("Announcements chronicle updated.");
      } else {
        const res = await fetch("/api/updates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        onUpdateUpdates([created, ...updates]);
        triggerNotify("New bulletin update synchronized!");
      }
      setUpModalOpen(false);
      resetUpForm();
    } catch (e2) {
      alert("Failed to submit bulletin.");
    }
  };
  const resetUpForm = () => {
    setEditingUp(null);
    setUpTitle("");
    setUpDate("");
    setUpCategory("Notice");
    setUpSummary("");
    setUpContent("");
    setUpTime("2 min read");
  };
  const handleEditUpClick = (up) => {
    setEditingUp(up);
    setUpTitle(up.title);
    setUpDate(up.date);
    setUpCategory(up.category);
    setUpSummary(up.summary);
    setUpContent(up.content);
    setUpTime(up.readingTime);
    setUpModalOpen(true);
  };
  const handleDeleteUp = async (id) => {
    if (!window.confirm("Verify: Are you sure you want to delete this news bulletin?")) return;
    try {
      const res = await fetch(`/api/updates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onUpdateUpdates(updates.filter((u) => u.id !== id));
      triggerNotify("Bulletin deleted from registry.");
    } catch (e) {
      alert("Failed to delete bulletin.");
    }
  };
  const handleGalSubmit = async (e) => {
    e.preventDefault();
    if (!galUrl || !galTitle) {
      alert("We require at least a valid image Photo URL and a Short Title.");
      return;
    }
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: galUrl,
          title: galTitle,
          category: galCategory,
          location: galLocation || "Zonal"
        })
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      onUpdateGallery([created, ...gallery]);
      triggerNotify("Photo catalog expanded successfully.");
      setGalUrl("");
      setGalTitle("");
      setGalLocation("");
    } catch (e2) {
      alert("Failed to add image to gallery.");
    }
  };
  const handleDeleteGal = async (id) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onUpdateGallery(gallery.filter((g) => g.id !== id));
      triggerNotify("Photo removed from Media Center.");
    } catch (e) {
      alert("Failed to remove photograph.");
    }
  };
  const handleSaveConfig = async () => {
    const payload = {
      hero: {
        headline: configHeadline,
        mission: configMission,
        primaryCtaText: config.hero.primaryCtaText,
        secondaryCtaText: config.hero.secondaryCtaText
      },
      stats: {
        collegesRoamed: Number(configCollegesRoamed),
        issuesRaised: Number(configIssuesRaised),
        instantlySolved: Number(configInstantlySolved)
      },
      featuredActivityId: configFeatured
    };
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error();
      const result = await res.json();
      onUpdateConfig(result.config);
      triggerNotify("Homepage content parameters saved!");
    } catch (e) {
      alert("Failed to update homepage content parameters.");
    }
  };
  const filteredRegs = registrations.filter((r) => {
    const matchesSearch = r.fullName.toLowerCase().includes(regSearch.toLowerCase()) || r.email.toLowerCase().includes(regSearch.toLowerCase()) || r.college.toLowerCase().includes(regSearch.toLowerCase()) || r.area.toLowerCase().includes(regSearch.toLowerCase());
    const matchesFilter = regFilter === "All" || r.status === regFilter;
    return matchesSearch && matchesFilter;
  });
  return <div className="pt-24 min-h-[90vh] bg-gray-50 flex flex-col md:flex-row">
      
      {
    /* 1. SIDEBAR NAVIGATION CONTROLS */
  }
      <aside className="w-full md:w-64 bg-primary text-gray-300 flex flex-col border-r border-primary-dark shrink-0">
        <div className="p-6 border-b border-primary-light">
          <h2 className="font-display font-bold text-white text-base tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent animate-spin-slow" />
            Core Admin Console
          </h2>
          <span className="text-[9px] font-mono tracking-widest text-[#9ab4db] uppercase font-bold">
            Team Karthik Matrix
          </span>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          <button
    onClick={() => setActiveTab("overview")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "overview" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <LayoutDashboard className="w-4 h-4" />
            Metrics Summary
          </button>

          <button
    onClick={() => setActiveTab("activities")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "activities" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <Calendar className="w-4 h-4" />
            Activities Log
          </button>

          <button
    onClick={() => setActiveTab("reports")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "reports" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <FileText className="w-4 h-4" />
            Executive Reports
          </button>

          <button
    onClick={() => setActiveTab("programs")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "programs" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <FolderKanban className="w-4 h-4" />
            Programs Framework
          </button>

          <button
    onClick={() => setActiveTab("timeline")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "timeline" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <Milestone className="w-4 h-4" />
            Chronology Timeline
          </button>

          <button
    onClick={() => setActiveTab("updates")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "updates" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <Newspaper className="w-4 h-4" />
            Notices & News
          </button>

          <button
    onClick={() => setActiveTab("gallery")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "gallery" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <ImageIcon className="w-4 h-4" />
            Media Catalog
          </button>

          <button
    onClick={() => setActiveTab("registrations")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "registrations" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <UserPlus className="w-4 h-4" />
            Applicants registry
            {registrations.filter((r) => r.status === "Pending").length > 0 && <span className="ml-auto w-2 h-2 rounded-full bg-red-400 animate-ping" />}
          </button>

          <button
    onClick={() => setActiveTab("homepage")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "homepage" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <Sliders className="w-4 h-4" />
            Homepage controls
          </button>

          <button
    onClick={() => setActiveTab("stories")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "stories" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <Sparkles className="w-4 h-4" />
            Impact Stories
          </button>

          <button
    onClick={() => setActiveTab("coverage")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "coverage" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <MapPin className="w-4 h-4" />
            Coverage map
          </button>

          <button
    onClick={() => setActiveTab("annuals")}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all ${activeTab === "annuals" ? "bg-accent text-primary" : "hover:bg-white/5 text-gray-300"}`}
  >
            <FileText className="w-4 h-4" />
            Annual Reports
          </button>
        </nav>
      </aside>

      {
    /* 2. DYNAMIC MAIN WORKSPACE PANEL */
  }
      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-x-hidden">
        
        {
    /* Real-time sync notifier banner */
  }
        {notifyMsg && <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-xl text-xs font-semibold shadow-sm animate-fade-in flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            {notifyMsg}
          </div>}

        {
    /* 2A. SUBTAB: METRICS OVERVIEW */
  }
        {activeTab === "overview" && <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-display font-black text-primary">Workspace Analytics</h2>
              <p className="text-xs text-gray-500 mt-0.5">Real-time indicators tracking active publications and applications.</p>
            </div>

            {
    /* Dashboard grid metrics cards */
  }
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-mono text-gray-400 font-bold">Total Activities Logged</span>
                <p className="text-3xl font-display font-extrabold text-primary">{activities.length}</p>
                <div className="text-[10px] text-accent flex items-center gap-1 font-mono">
                  <span>Continuous on-ground visits</span>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-mono text-gray-400 font-bold">Total Announcements</span>
                <p className="text-3xl font-display font-extrabold text-primary">{updates.length}</p>
                <div className="text-[10px] text-accent flex items-center gap-1 font-mono">
                  <span>Bulletins published</span>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-mono text-gray-400 font-bold">Pending Join Requests</span>
                <p className="text-3xl font-display font-extrabold text-primary">
                  {registrations.filter((r) => r.status === "Pending").length}
                </p>
                <div className="text-[10px] text-red-500 font-semibold font-mono">
                  Action required
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-mono text-gray-400 font-bold">Total Photo Assets</span>
                <p className="text-3xl font-display font-extrabold text-primary">{gallery.length}</p>
                <div className="text-[10px] text-accent flex items-center gap-1 font-mono">
                  <span>In Media Center</span>
                </div>
              </div>
            </div>

            {
    /* Quick status box */
  }
            <div className="bg-primary text-white p-6 rounded-2xl border border-primary-light shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2 relative z-10 text-center md:text-left">
                <h3 className="font-display font-bold text-lg text-accent-light">Team Karthik Voluntary Engagement Index</h3>
                <p className="text-xs text-gray-300 max-w-xl">
                  This administrative panel is synced directly to local sandbox persistence at <code>db.json</code>. Your updates will immediately transform the active live view.
                </p>
              </div>
              <span className="px-5 py-2 rounded-xl bg-white/10 text-xs font-mono font-bold uppercase tracking-wider shrink-0 text-white border border-white/5">
                Version 1.0 (Phase 1 Approved)
              </span>
            </div>
          </div>}

        {
    /* ADMIN SUB-COMPONENTS FOR PHASE 2 */
  }
        {activeTab === "reports" && <AdminReports
    reports={reports}
    programs={programs}
    activities={activities}
    onUpdateReports={onUpdateReports}
    triggerNotify={triggerNotify}
  />}

        {activeTab === "programs" && <AdminPrograms
    programs={programs}
    onUpdatePrograms={onUpdatePrograms}
    triggerNotify={triggerNotify}
  />}

        {activeTab === "timeline" && <AdminTimeline
    timeline={timeline}
    onUpdateTimeline={onUpdateTimeline}
    triggerNotify={triggerNotify}
  />}

        {
    /* PHASE 3 IMPACT ADMIN SUB-COMPONENTS */
  }
        {activeTab === "stories" && <AdminSuccessStories
    successStories={successStories}
    onUpdateSuccessStories={onUpdateSuccessStories}
  />}

        {activeTab === "coverage" && <AdminCoverageMap
    coverageLocations={coverageLocations}
    onUpdateCoverageLocations={onUpdateCoverageLocations}
  />}

        {activeTab === "annuals" && <AdminAnnualReports
    annualReports={annualReports}
    onUpdateAnnualReports={onUpdateAnnualReports}
  />}

        {
    /* 2B. SUBTAB: ACTIVITIES MANAGEMENT */
  }
        {activeTab === "activities" && <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-3">
              <div>
                <h2 className="text-2xl font-display font-black text-primary">Activities Hub Catalog</h2>
                <p className="text-xs text-gray-500">Log new visits, campus connect reports, or special initiatives.</p>
              </div>
              <button
    onClick={() => {
      resetActForm();
      setActModalOpen(true);
    }}
    className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow"
  >
                <Plus className="w-4 h-4" />
                Add New Activity
              </button>
            </div>

            {
    /* Listing activities inside table/list rows */
  }
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100">
                {activities.map((act) => <div key={act.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img src={act.coverImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[9px] font-mono font-bold uppercase">
                            {act.category}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">{act.date} | {act.location}</span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-primary">{act.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{act.summary}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
    onClick={() => handleEditActClick(act)}
    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
    title="Edit Activity"
  >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
    onClick={() => handleDeleteAct(act.id)}
    className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
    title="Delete Activity"
  >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>}

        {
    /* 2C. SUBTAB: UPDATES & Bulletins */
  }
        {activeTab === "updates" && <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-3">
              <div>
                <h2 className="text-2xl font-display font-black text-primary">Notices & Circulars Chronicle</h2>
                <p className="text-xs text-gray-500 mt-0.5">Publish bulletins, notice alerts, and announcement segments.</p>
              </div>
              <button
    onClick={() => {
      resetUpForm();
      setUpModalOpen(true);
    }}
    className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow"
  >
                <Plus className="w-4 h-4" />
                Draft Notice Bulletin
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100 shadow-sm">
              {updates.map((up) => <div key={up.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-accent uppercase font-bold">{up.category}</span>
                      <span className="text-gray-400">• {up.date}</span>
                    </div>
                    <h4 className="font-display font-bold text-primary text-sm">{up.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{up.summary}</p>
                  </div>

                  <div className="flex gap-2 self-end sm:self-auto shrink-0">
                    <button
    onClick={() => handleEditUpClick(up)}
    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
  >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
    onClick={() => handleDeleteUp(up.id)}
    className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
  >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>)}
            </div>
          </div>}

        {
    /* 2D. SUBTAB: PHOTO CATALOG MANAGEMENT */
  }
        {activeTab === "gallery" && <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-display font-black text-primary">Media Snapshots Catalog</h2>
              <p className="text-xs text-gray-500 mt-0.5">Catalog high-quality images straight into the public Media Center.</p>
            </div>

            {
    /* Quick add photo structure */
  }
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-primary flex items-center gap-1.5 border-b border-gray-100 pb-2">
                <Plus className="w-4 h-4 text-accent" />
                Index New Image Asset
              </h3>

              <form onSubmit={handleGalSubmit} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                {
    /* url */
  }
                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="gal-url-field" className="font-mono text-[10px] uppercase text-gray-400 font-bold block">Unsplash Photograph URL</label>
                  <input
    id="gal-url-field"
    type="url"
    required
    placeholder="https://images.unsplash.com/photo-..."
    value={galUrl}
    onChange={(e) => setGalUrl(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary bg-gray-50/50"
  />
                </div>

                {
    /* Title */
  }
                <div className="space-y-1.5">
                  <label htmlFor="gal-title-field" className="font-mono text-[10px] uppercase text-gray-400 font-bold block">Photograph Description Title</label>
                  <input
    id="gal-title-field"
    type="text"
    required
    placeholder="E.g., Tenali youth counseling assembly"
    value={galTitle}
    onChange={(e) => setGalTitle(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary bg-gray-50/50"
  />
                </div>

                {
    /* Category */
  }
                <div className="space-y-1.5">
                  <label htmlFor="gal-cat-field" className="font-mono text-[10px] uppercase text-gray-400 font-bold block">Activity Category</label>
                  <select
    id="gal-cat-field"
    value={galCategory}
    onChange={(e) => setGalCategory(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
  >
                    <option value="College Visit">College Visit</option>
                    <option value="School Visit">School Visit</option>
                    <option value="Community Interaction">Community Interaction</option>
                    <option value="Student Engagement">Student Engagement</option>
                    <option value="Special Initiative">Special Initiative</option>
                  </select>
                </div>

                {
    /* Location */
  }
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="gal-loc-field" className="font-mono text-[10px] uppercase text-gray-400 font-bold block">Location Town</label>
                  <input
    id="gal-loc-field"
    type="text"
    placeholder="E.g., Hyderabad, Secunderabad"
    value={galLocation}
    onChange={(e) => setGalLocation(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary bg-gray-50/50"
  />
                </div>

                <div className="flex items-end justify-end md:col-span-2">
                  <button
    type="submit"
    className="bg-primary hover:bg-primary-light text-white font-bold h-9 px-6 rounded-lg shadow uppercase tracking-wide cursor-pointer text-[10px]"
  >
                    Catalog Photographic Asset
                  </button>
                </div>
              </form>
            </div>

            {
    /* List photo grid to delete */
  }
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((g) => <div key={g.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm relative group">
                  <div className="h-32">
                    <img src={g.url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 text-xs">
                    <span className="text-[8px] font-mono uppercase bg-gray-150 p-1 rounded block">{g.category}</span>
                    <h5 className="font-semibold text-gray-900 mt-1 line-clamp-1">{g.title}</h5>
                  </div>
                  <button
    onClick={() => handleDeleteGal(g.id)}
    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-650 hover:bg-red-750 text-white shadow bg-black/60 hover:bg-red-600 transition-colors"
  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>)}
            </div>
          </div>}

        {
    /* 2E. SUBTAB: APPLICANTS REGISTRY */
  }
        {activeTab === "registrations" && <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-4">
              <div>
                <h2 className="text-2xl font-display font-black text-primary">Voluntary Registry Applications</h2>
                <p className="text-xs text-gray-500">Respond to, evaluate, or status-vett incoming youth registers.</p>
              </div>

              <div className="flex gap-2">
                {
    /* Search */
  }
                <div className="relative">
                  <label htmlFor="applicant-search-field" className="sr-only">Search applicants</label>
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
    id="applicant-search-field"
    type="text"
    placeholder="Search applicants..."
    value={regSearch}
    onChange={(e) => setRegSearch(e.target.value)}
    className="pl-8 pr-3 py-2 border rounded-xl border-gray-200 text-xs focus:outline-none focus:ring-1 bg-white"
  />
                </div>

                {
    /* status Filter */
  }
                <label htmlFor="applicant-status-filter" className="sr-only">Filter by status</label>
                <select
    id="applicant-status-filter"
    value={regFilter}
    onChange={(e) => setRegFilter(e.target.value)}
    className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs bg-white"
  >
                  <option value="All">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {
    /* applicants list table layout */
  }
            <div className="bg-white border border-gray-100 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 font-mono text-[9px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    <th className="p-4">Applicant Detail</th>
                    <th className="p-4">Affiliated College / Location</th>
                    <th className="p-4">Interests Selected</th>
                    <th className="p-4">Evaluation Status</th>
                    <th className="p-4 text-center">Admin Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-sans">
                  {filteredRegs.map((reg) => <tr key={reg.id} className="hover:bg-gray-50/40">
                      {
    /* Name & Contact */
  }
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-bold text-gray-900 text-sm">{reg.fullName}</p>
                          <p className="text-xs text-gray-500 font-mono">Ph: {reg.mobileNumber}</p>
                          <p className="text-[11px] text-gray-400 lower-case font-mono">{reg.email}</p>
                        </div>
                      </td>

                      {
    /* College & Location */
  }
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-gray-700">{reg.college}</p>
                          <p className="text-[10px] text-gray-400 font-mono uppercase">{reg.area}</p>
                        </div>
                      </td>

                      {
    /* Interests tags list */
  }
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {reg.interests && reg.interests.length > 0 ? reg.interests.map((inter, idx) => <span key={idx} className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px]">
                                {inter}
                              </span>) : <span className="text-gray-400 italic text-[11px]">No specified interest</span>}
                        </div>
                      </td>

                      {
    /* Status */
  }
                      <td className="p-4">
                        <label htmlFor={`reg-status-select-${reg.id}`} className="sr-only">Change status</label>
                        <select
    id={`reg-status-select-${reg.id}`}
    value={reg.status}
    onChange={(e) => handleRegStatus(reg.id, e.target.value)}
    className={`px-2 py-1 rounded-md text-[10px] font-bold border ${reg.status === "Approved" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : reg.status === "Contacted" ? "bg-amber-50 text-amber-800 border-amber-200" : reg.status === "Rejected" ? "bg-red-50 text-red-800 border-red-200" : "bg-blue-50 text-blue-800 border-blue-200"}`}
  >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      {
    /* Controls */
  }
                      <td className="p-4 text-center">
                        <button
    onClick={() => handleRegDelete(reg.id)}
    className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
    title="Wipe Applicant"
  >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>)}

                  {filteredRegs.length === 0 && <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                        No registrations indexed currently under that filter list.
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div>
          </div>}

        {
    /* 2F. SUBTAB: HOMEPAGE CONTENT PARAMETERS */
  }
        {activeTab === "homepage" && <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-display font-black text-primary">Homepage Content Parameters</h2>
              <p className="text-xs text-gray-500 mt-0.5">Control Hero copy, statistics counters, and select the featured showcase.</p>
            </div>

            {
    /* Parameters card config */
  }
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-primary flex items-center gap-1">
                  Homepage hero parameters
                </h4>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  {
    /* Headline */
  }
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="config-headline-field" className="font-mono text-[10px] uppercase text-gray-400 font-bold block">Hero Headline</label>
                    <input
    id="config-headline-field"
    type="text"
    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-display font-medium"
    value={configHeadline}
    onChange={(e) => setConfigHeadline(e.target.value)}
  />
                  </div>

                  {
    /* Mission */
  }
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="config-mission-field" className="font-mono text-[10px] uppercase text-gray-400 font-bold block">Hero Mission Subtext</label>
                    <textarea
    id="config-mission-field"
    rows={3}
    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1"
    value={configMission}
    onChange={(e) => setConfigMission(e.target.value)}
  />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">
                  Statistical Impact Thresholds
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                  {
    /* Colleges Roamed */
  }
                  <div className="space-y-1.5">
                    <label htmlFor="config-colleges-field" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Colleges Roamed</label>
                    <input
    id="config-colleges-field"
    type="number"
    className="w-full px-3 py-2 rounded-lg border border-gray-200"
    value={configCollegesRoamed}
    onChange={(e) => setConfigCollegesRoamed(Number(e.target.value))}
  />
                  </div>

                  {
    /* Issues Raised */
  }
                  <div className="space-y-1.5">
                    <label htmlFor="config-issues-field" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Issues Logged</label>
                    <input
    id="config-issues-field"
    type="number"
    className="w-full px-3 py-2 rounded-lg border border-gray-200"
    value={configIssuesRaised}
    onChange={(e) => setConfigIssuesRaised(Number(e.target.value))}
  />
                  </div>

                  {
    /* Instantly Solved */
  }
                  <div className="space-y-1.5">
                    <label htmlFor="config-solved-field" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Instantly Solved</label>
                    <input
    id="config-solved-field"
    type="number"
    className="w-full px-3 py-2 rounded-lg border border-gray-200"
    value={configInstantlySolved}
    onChange={(e) => setConfigInstantlySolved(Number(e.target.value))}
  />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="font-display font-bold text-sm text-primary">
                  Select Featured Activity Showcase
                </h4>

                <div className="text-xs space-y-1.5">
                  <label htmlFor="config-featured-field" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Featured Showcase Target</label>
                  <select
    id="config-featured-field"
    value={configFeatured}
    onChange={(e) => setConfigFeatured(e.target.value)}
    className="w-full max-w-md px-3 py-2 rounded-lg border border-gray-200 bg-white"
  >
                    {activities.map((a) => <option key={a.id} value={a.id}>
                        {a.title} ({a.category})
                      </option>)}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 flex justify-end">
                <button
    type="button"
    onClick={handleSaveConfig}
    className="bg-primary hover:bg-primary-light text-white font-bold px-6 py-2.5 rounded-xl shadow cursor-pointer text-xs uppercase"
  >
                  Save Global Parameters
                </button>
              </div>
            </div>
          </div>}
      </main>

      {
    /* ==================== FORM MODAL: CREATE/EDIT ACTIVITY ==================== */
  }
      {actModalOpen && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-display font-black text-primary text-xl">
                {editingAct ? "Edit Activity Record" : "Document New Activity Entry"}
              </h3>
              <button
    onClick={() => {
      setActModalOpen(false);
      resetActForm();
    }}
    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            {
    /* MANUAL ENTRY SLOTS */
  }
            <form onSubmit={handleActSubmit} className="space-y-4 text-xs font-sans">
              
              <div className="grid sm:grid-cols-2 gap-4">
                {
    /* Title */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="act-title-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Activity Title <span className="text-red-500">*</span></label>
                  <input
    id="act-title-input"
    type="text"
    required
    placeholder="E.g., Skill workshop at KL University"
    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold"
    value={actTitle}
    onChange={(e) => setActTitle(e.target.value)}
  />
                </div>

                {
    /* Category */
  }
                <div className="space-y-1">
                  <label htmlFor="act-category-select" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Activity Category</label>
                  <select
    id="act-category-select"
    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
    value={actCategory}
    onChange={(e) => setActCategory(e.target.value)}
  >
                    <option value="College Visit">College Visit</option>
                    <option value="School Visit">School Visit</option>
                    <option value="Community Interaction">Community Interaction</option>
                    <option value="Student Engagement">Student Engagement</option>
                    <option value="Public Program">Public Program</option>
                    <option value="Special Initiative">Special Initiative</option>
                  </select>
                </div>

                {
    /* Linked Campaign / Program Dropdown */
  }
                <div className="space-y-1">
                  <label htmlFor="act-program-select" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Linked Program / Campaign</label>
                  <select
    id="act-program-select"
    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
    value={actProgramId}
    onChange={(e) => setActProgramId(e.target.value)}
  >
                    <option value="">(None - Independent Event)</option>
                    {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                {
    /* Date */
  }
                <div className="space-y-1">
                  <label htmlFor="act-date-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Date <span className="text-red-500">*</span></label>
                  <input
    id="act-date-input"
    type="date"
    required
    className="w-full px-3 py-2 rounded-lg border border-gray-200"
    value={actDate}
    onChange={(e) => setActDate(e.target.value)}
  />
                </div>

                {
    /* Location */
  }
                <div className="space-y-1">
                  <label htmlFor="act-location-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Location Town <span className="text-red-500">*</span></label>
                  <input
    id="act-location-input"
    type="text"
    required
    placeholder="E.g., Madhapur, Hyderabad, Telangana"
    className="w-full px-3 py-2 rounded-lg border border-gray-200"
    value={actLocation}
    onChange={(e) => setActLocation(e.target.value)}
  />
                </div>

                {
    /* Cover Photograph Link */
  }
                <div className="space-y-1">
                  <label htmlFor="act-cover-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Cover Photograph Link</label>
                  <input
    id="act-cover-input"
    type="url"
    placeholder="https://images.unsplash.com/photo-..."
    className="w-full px-3 py-2 rounded-lg border border-gray-200"
    value={actCover}
    onChange={(e) => setActCover(e.target.value)}
  />
                </div>

                {
    /* Summary */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="act-summary-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Refined summary (1-2 sentences)</label>
                  <input
    id="act-summary-input"
    type="text"
    className="w-full px-3 py-2.5 rounded-lg border border-gray-200"
    value={actSummary}
    onChange={(e) => setActSummary(e.target.value)}
  />
                </div>

                {
    /* Description */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="act-description-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Narrative narrative (3-4 sentences)</label>
                  <textarea
    id="act-description-input"
    rows={4}
    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
    value={actDesc}
    onChange={(e) => setActDesc(e.target.value)}
  />
                </div>

                {
    /* Highlights Slots */
  }
                <div className="space-y-2 sm:col-span-2 border-t border-gray-100 pt-3">
                  <span className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Target highlights (3 slots)</span>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {[0, 1, 2].map((idx) => <div key={idx} className="space-y-1 animate-fade-in">
                        <label htmlFor={`act-highlight-input-${idx}`} className="sr-only">Highlight {idx + 1}</label>
                        <input
    id={`act-highlight-input-${idx}`}
    type="text"
    placeholder={`Key accomplishment #${idx + 1}`}
    className="w-full px-2.5 py-1.5 rounded bg-gray-50 border border-gray-200 text-[11px]"
    value={actHighlights[idx] || ""}
    onChange={(e) => {
      const updated = [...actHighlights];
      updated[idx] = e.target.value;
      setActHighlights(updated);
    }}
  />
                      </div>)}
                  </div>
                </div>

                {
    /* Sub Gallery Link Slots */
  }
                <div className="space-y-2 sm:col-span-2 border-t border-gray-100 pt-3">
                  <span className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Internal gallery reel link (single URL limit)</span>
                  <div className="flex gap-2">
                    <label htmlFor="act-sub-gallery-input" className="sr-only">Subgallery Image Link</label>
                    <input
    id="act-sub-gallery-input"
    type="url"
    placeholder="https://images.unsplash.com/photo-..."
    className="w-full px-3 py-2 border rounded-lg"
    value={actGallery[0] || ""}
    onChange={(e) => {
      setActGallery([e.target.value]);
    }}
  />
                  </div>
                </div>

              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-end gap-2 text-xs">
                <button
    type="button"
    onClick={() => {
      setActModalOpen(false);
      resetActForm();
    }}
    className="px-5 py-2 hover:bg-gray-100 text-gray-600 rounded-lg cursor-pointer"
  >
                  Discard Close
                </button>
                <button
    type="submit"
    className="bg-primary hover:bg-primary-light text-white font-bold px-6 py-2 rounded-lg shadow-sm"
  >
                  {editingAct ? "Update Activity Log" : "Synchronize & Publish Entry"}
                </button>
              </div>

            </form>
          </div>
        </div>}

      {
    /* ==================== FORM MODAL: CREATE/EDIT BULLETIN ==================== */
  }
      {upModalOpen && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 space-y-4">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-display font-black text-primary text-lg">
                {editingUp ? "Edit Bulletin Entry" : "Create Official Announcement"}
              </h3>
              <button
    onClick={() => {
      setUpModalOpen(false);
      resetUpForm();
    }}
    className="p-1 text-gray-400 hover:text-primary"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid sm:grid-cols-2 gap-4">
                
                {
    /* Title */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="up-title-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Bulletin Headline</label>
                  <input
    id="up-title-input"
    type="text"
    required
    placeholder="E.g., Career Roadshow Tour Announced"
    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold"
    value={upTitle}
    onChange={(e) => setUpTitle(e.target.value)}
  />
                </div>

                {
    /* Category */
  }
                <div className="space-y-1">
                  <label htmlFor="up-category-select" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Classification Clause</label>
                  <select
    id="up-category-select"
    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white"
    value={upCategory}
    onChange={(e) => setUpCategory(e.target.value)}
  >
                    <option value="News">News</option>
                    <option value="Update">Update</option>
                    <option value="Notice">Notice</option>
                    <option value="Program Announcement">Program Announcement</option>
                  </select>
                </div>

                {
    /* Date */
  }
                <div className="space-y-1">
                  <label htmlFor="up-date-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Publish Date</label>
                  <input
    id="up-date-input"
    type="date"
    required
    className="w-full px-3 py-2 border rounded-lg"
    value={upDate}
    onChange={(e) => setUpDate(e.target.value)}
  />
                </div>

                {
    /* Reading time */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="up-readingtime-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Reading Time Metrics</label>
                  <input
    id="up-readingtime-input"
    type="text"
    placeholder="E.g., 3 min read"
    className="w-full px-3 py-2 border rounded-lg"
    value={upTime}
    onChange={(e) => setUpTime(e.target.value)}
  />
                </div>

                {
    /* Summary */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="up-summary-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Summary Snapshot</label>
                  <input
    id="up-summary-input"
    type="text"
    required
    className="w-full px-3 py-2 rounded-lg border border-gray-200"
    placeholder="E.g., Complete outline of regional centers visited."
    value={upSummary}
    onChange={(e) => setUpSummary(e.target.value)}
  />
                </div>

                {
    /* Content */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="up-content-input" className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Main Content Narrative Body</label>
                  <textarea
    id="up-content-input"
    rows={4}
    required
    className="w-full px-3 py-2 border rounded-lg text-xs"
    placeholder="Enter full announcement details..."
    value={upContent}
    onChange={(e) => setUpContent(e.target.value)}
  />
                </div>

              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-end gap-2">
                <button
    type="button"
    onClick={() => {
      setUpModalOpen(false);
      resetUpForm();
    }}
    className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-600"
  >
                  Discard
                </button>
                <button
    type="submit"
    className="bg-primary hover:bg-primary-light text-white font-bold px-5 py-2 rounded-lg shadow-sm"
  >
                  Save Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>}

    </div>;
}
