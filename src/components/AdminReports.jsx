import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, FileText, Search, Star, Sparkles, RefreshCw } from "lucide-react";
export default function AdminReports({
  reports = [],
  programs = [],
  activities = [],
  onUpdateReports,
  triggerNotify
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Field Surveys & Assessments");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [programId, setProgramId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [gallery, setGallery] = useState([""]);
  const [groqApiKey, setGroqApiKey] = useState(() => localStorage.getItem("groq_api_key") || "");
  const [aiReportType, setAiReportType] = useState("overall-stats");
  const [aiTargetMonth, setAiTargetMonth] = useState("");
  const [aiTargetProgramId, setAiTargetProgramId] = useState("");
  const [aiTargetEventId, setAiTargetEventId] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  useEffect(() => {
    localStorage.setItem("groq_api_key", groqApiKey);
  }, [groqApiKey]);
  useEffect(() => {
    const now = /* @__PURE__ */ new Date();
    const monthName = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    setAiTargetMonth(monthName);
  }, []);
  const filteredReports = reports.filter(
    (r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const resetForm = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setTitle("");
    setDate("");
    setLocation("");
    setCategory("Field Surveys & Assessments");
    setSummary("");
    setContent("");
    setProgramId("");
    setIsFeatured(false);
    setGallery([""]);
    setAiMessage("");
  };
  const handleEditClick = (rep) => {
    setCurrentItem(rep);
    setTitle(rep.title);
    setDate(rep.date);
    setLocation(rep.location);
    setCategory(rep.category);
    setSummary(rep.summary);
    setContent(rep.description || "");
    setProgramId(rep.programId || "");
    setIsFeatured(!!rep.isFeatured);
    setGallery(rep.gallery && rep.gallery.length > 0 ? rep.gallery : [""]);
    setIsEditing(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Verify: Delete this publication report?")) return;
    try {
      const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onUpdateReports(reports.filter((r) => r.id !== id));
      triggerNotify("Report document deletion processed!");
    } catch (e) {
      alert("Error deleting report.");
    }
  };
  const handleGroqGenerate = async () => {
    if (!groqApiKey) {
      alert("Please provide a Groq API Key.");
      return;
    }
    let targetId = "";
    if (aiReportType === "monthly") {
      targetId = aiTargetMonth;
    } else if (aiReportType === "program") {
      targetId = aiTargetProgramId;
      if (!targetId) {
        alert("Please select a target program.");
        return;
      }
    } else if (aiReportType === "event") {
      targetId = aiTargetEventId;
      if (!targetId) {
        alert("Please select a target event.");
        return;
      }
    }
    setAiGenerating(true);
    setAiMessage("");
    try {
      const res = await fetch("/api/groq/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType: aiReportType,
          targetId,
          groqApiKey
        })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Generation request failed");
      }
      const data = await res.json();
      const generatedMarkdown = data.reportMarkdown;
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      setDate(todayStr);
      if (aiReportType === "overall-stats") {
        setTitle(`Executive Performance & Grievance Report - ${todayStr}`);
        setLocation("Statewide / All Districts");
        setCategory("Impact Evaluation Briefs");
        setSummary("An executive-level overall performance audit compiling grassroots student grievances and resolution tracking statistics.");
      } else if (aiReportType === "monthly") {
        setTitle(`Monthly Impact Analysis Brief - ${aiTargetMonth}`);
        setLocation("District Zonal Hubs");
        setCategory("Field Surveys & Assessments");
        setSummary(`Structured monthly report assessing campus coverage and concerns resolved during ${aiTargetMonth}.`);
      } else if (aiReportType === "program") {
        const prog = programs.find((p) => p.id === aiTargetProgramId);
        setTitle(`Program Audit: ${prog?.name || "Target Campaign"}`);
        setLocation("Active Zonal Operations");
        setCategory("Impact Evaluation Briefs");
        setProgramId(aiTargetProgramId);
        setSummary(`Detailed progress review evaluating targets, achievements, and roadmap milestones for the "${prog?.name}" campaign.`);
      } else if (aiReportType === "event") {
        const evt = activities.find((a) => a.id === aiTargetEventId);
        setTitle(`Event Briefing: ${evt?.title || "Daily Outreach"}`);
        setLocation(evt?.location || "Outreach Venue");
        setCategory("Field Surveys & Assessments");
        setSummary(`Event narrative brief summarizing engagement activities, ground observations, and resolution outcomes for ${evt?.title}.`);
      }
      setContent(generatedMarkdown);
      setAiMessage("Report outline generated successfully! Review, make manual tweaks if desired, and click 'Save Publication' below.");
      triggerNotify("AI Report generated!");
    } catch (err) {
      alert("Groq AI Generation failed: " + err.message);
    } finally {
      setAiGenerating(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !location) {
      alert("Title, Date, and Region are mandatory fields.");
      return;
    }
    const payload = {
      title,
      date,
      location,
      category,
      summary,
      description: content,
      programId: programId || void 0,
      isFeatured,
      gallery: gallery.filter((g) => g.trim() !== "")
    };
    try {
      if (currentItem) {
        const res = await fetch(`/api/reports/${currentItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        onUpdateReports(reports.map((r) => r.id === updated.id ? updated : r));
        triggerNotify("Report schema updated successfully!");
      } else {
        const res = await fetch("/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        onUpdateReports([created, ...reports]);
        triggerNotify("Fresh report registered into permanent library!");
      }
      resetForm();
    } catch (e2) {
      alert("Failed to sync reports database.");
    }
  };
  return <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Executive Reports Catalog
          </h3>
          <p className="text-xs text-gray-500">Manage academic whitepapers, survey briefs, and research reports.</p>
        </div>
        {!isEditing && <button
    onClick={() => setIsEditing(true)}
    className="bg-primary hover:bg-primary-light text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
  >
            <Plus className="w-4 h-4" />
            Publish New Report
          </button>}
      </div>

      {isEditing ? <div className="space-y-6">
          
          {
    /* GROQ AI GENERATION SECTION */
  }
          {!currentItem && <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 max-w-2xl text-left">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                  Groq AI Automated Report Engine
                </h4>
                <span className="text-[9px] uppercase font-mono text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                  Llama 3.3 70B
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal font-sans">
                Choose a report archetype, enter your Groq API key, and automatically compile data-driven analytics. The AI will populate the catalog parameters below.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
                {
    /* Groq Key */
  }
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Groq API Key</label>
                  <input
    type="password"
    placeholder="gsk_..."
    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
    value={groqApiKey}
    onChange={(e) => setGroqApiKey(e.target.value)}
  />
                </div>

                {
    /* Report Type */
  }
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Report Type</label>
                  <select
    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
    value={aiReportType}
    onChange={(e) => setAiReportType(e.target.value)}
  >
                    <option value="overall-stats">Overall Strategic Summary</option>
                    <option value="monthly">Monthly Impact Analysis</option>
                    <option value="program">Program Progress Audit</option>
                    <option value="event">Event Briefing Sheet</option>
                  </select>
                </div>

                {
    /* Target selector based on Type */
  }
                {aiReportType === "monthly" && <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Target Month & Year</label>
                    <input
    type="text"
    placeholder="e.g. June 2026"
    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
    value={aiTargetMonth}
    onChange={(e) => setAiTargetMonth(e.target.value)}
  />
                  </div>}

                {aiReportType === "program" && <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Select Target Program</label>
                    <select
    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
    value={aiTargetProgramId}
    onChange={(e) => setAiTargetProgramId(e.target.value)}
  >
                      <option value="">-- Choose Program --</option>
                      {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>}

                {aiReportType === "event" && <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Select Daily Event</label>
                    <select
    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
    value={aiTargetEventId}
    onChange={(e) => setAiTargetEventId(e.target.value)}
  >
                      <option value="">-- Choose Event --</option>
                      {activities.map((a) => <option key={a.id} value={a.id}>{a.title} ({a.date})</option>)}
                    </select>
                  </div>}
              </div>

              <div className="flex justify-between items-center text-xs font-mono">
                {aiGenerating ? <span className="text-slate-700 font-bold animate-pulse flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
                    Groq is compiling report...
                  </span> : <span className="text-slate-400 text-[10px]">API authentication required</span>}
                <button
    type="button"
    onClick={handleGroqGenerate}
    disabled={aiGenerating || !groqApiKey}
    className="bg-accent text-white uppercase text-[10px] font-bold px-4 py-2 rounded-xl shadow-sm cursor-pointer disabled:opacity-50"
  >
                  Generate Report
                </button>
              </div>

              {aiMessage && <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-[11px] p-3 rounded-lg leading-normal font-sans">
                  {aiMessage}
                </div>}
            </div>}

          {
    /* EDIT OR CREATE FORM */
  }
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-150 p-5 sm:p-6 space-y-4 max-w-2xl">
            <div className="flex justify-between items-center border-b border-gray-150 pb-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary">
                {currentItem ? "Modify Executive Report" : "Save Publication Metadata"}
              </h4>
              <button
    type="button"
    onClick={resetForm}
    className="text-gray-400 hover:text-gray-650 cursor-pointer"
  >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Report Title *</label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="e.g. Demographics mapping and structural hardware literacy..."
    className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-primary"
  />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Report Date *</label>
                <input
    type="date"
    required
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
  />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Specific Location/Region *</label>
                <input
    type="text"
    required
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    placeholder="e.g. Secunderabad, Telangana"
    className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
  />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Category Classifier</label>
                <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white font-sans"
  >
                  <option value="Field Surveys & Assessments">Surveys & Assessments</option>
                  <option value="Impact Evaluation Briefs">Impact Briefs</option>
                  <option value="Policy Memorandums">Policy Memos</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Link to Initiative/Program</label>
                <select
    value={programId}
    onChange={(e) => setProgramId(e.target.value)}
    className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white font-sans"
  >
                  <option value="">(None - Standalone Report)</option>
                  {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="col-span-2 select-none flex items-center gap-2 pt-1">
                <input
    type="checkbox"
    id="isFeatured"
    checked={isFeatured}
    onChange={(e) => setIsFeatured(e.target.checked)}
    className="rounded text-primary focus:ring-accent w-4 h-4"
  />
                <label htmlFor="isFeatured" className="text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  Featured on Website Homepage & Reports Landing
                </label>
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Executive Summary (2-3 sentences max) *</label>
                <textarea
    required
    rows={2}
    value={summary}
    onChange={(e) => setSummary(e.target.value)}
    placeholder="Brief high-level summary paragraph of key learnings..."
    className="w-full text-xs border border-gray-200 rounded-xl p-3 bg-white focus:outline-none"
  />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Complete Document Content (Markdown Supported)</label>
                <textarea
    rows={10}
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Full report documentation containing methodology, analysis of findings, metrics counters, and regional recommendations..."
    className="w-full text-xs border border-gray-200 rounded-xl p-3 bg-white focus:outline-none font-sans"
  />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-mono uppercase text-gray-450 block mb-1">Document Image URLs (comma-separated)</label>
                <input
    type="text"
    value={gallery.join(", ")}
    onChange={(e) => setGallery(e.target.value.split(",").map((val) => val.trim()))}
    placeholder="e.g. https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
  />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-150 pt-4">
              <button
    type="button"
    onClick={resetForm}
    className="text-xs font-mono font-extrabold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl cursor-pointer"
  >
                Cancel
              </button>
              <button
    type="submit"
    className="text-xs font-mono font-extrabold text-white bg-primary hover:bg-primary-light px-6 py-2.5 rounded-xl cursor-pointer"
  >
                Save Publication
              </button>
            </div>
          </form>
        </div> : (
    /* CORE REPORTS LISTING GRID */
    <div className="space-y-4">
          <div className="relative max-w-sm">
            <input
      type="text"
      placeholder="Search Reports..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 pl-9 bg-white focus:outline-none"
    />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-gray-50 border-b border-gray-150 font-mono text-[10px] uppercase text-gray-500">
                <tr>
                  <th className="p-4 font-extrabold">Report details</th>
                  <th className="p-4 font-extrabold">Category</th>
                  <th className="p-4 font-extrabold">Date & Region</th>
                  <th className="p-4 font-extrabold">Status</th>
                  <th className="p-4 text-right font-extrabold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.map((rep) => <tr key={rep.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <div className="font-bold text-primary max-w-xs sm:max-w-md truncate">{rep.title}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">{rep.summary}</div>
                    </td>
                    <td className="p-4 text-[11px] font-mono text-gray-550">{rep.category}</td>
                    <td className="p-4 text-[11px] font-mono text-gray-550">
                      <div>{rep.date}</div>
                      <div className="text-gray-400 text-[10px]">{rep.location}</div>
                    </td>
                    <td className="p-4">
                      {rep.isFeatured ? <span className="bg-amber-50 text-amber-905 border border-amber-100 px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                          ★ Featured
                        </span> : <span className="text-gray-350 text-[10px] font-mono">Standard</span>}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
      onClick={() => handleEditClick(rep)}
      className="p-1.5 text-primary hover:bg-gray-100 rounded cursor-pointer"
      title="Edit"
    >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
      onClick={() => handleDelete(rep.id)}
      className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
      title="Delete"
    >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
                {filteredReports.length === 0 && <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 italic">No reports found matching keywords.</td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
  )}

    </div>;
}
