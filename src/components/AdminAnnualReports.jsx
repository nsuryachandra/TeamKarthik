import { useState } from "react";
import { Plus, X, FileText, TrendingUp } from "lucide-react";
export default function AdminAnnualReports({
  annualReports,
  onUpdateAnnualReports
}) {
  const [editingReport, setEditingReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [repYear, setRepYear] = useState(2026);
  const [repSubtitle, setRepSubtitle] = useState("");
  const [repTheme, setRepTheme] = useState("");
  const [repSummary, setRepSummary] = useState("");
  const [repActsCount, setRepActsCount] = useState(115);
  const [repStudentsCount, setRepStudentsCount] = useState(12400);
  const [repProgsCount, setRepProgsCount] = useState(10);
  const [repMilesCount, setRepMilesCount] = useState(15);
  const [repGrowth, setRepGrowth] = useState("+45% YoY");
  const [highlightInput, setHighlightInput] = useState("");
  const [repHighlights, setRepHighlights] = useState([]);
  const handleOpenCreate = () => {
    setEditingReport(null);
    setRepYear(2026);
    setRepSubtitle("");
    setRepTheme("");
    setRepSummary("");
    setRepActsCount(120);
    setRepStudentsCount(12500);
    setRepProgsCount(12);
    setRepMilesCount(16);
    setRepGrowth("+45% YoY");
    setRepHighlights([]);
    setModalOpen(true);
  };
  const handleOpenEdit = (rep) => {
    setEditingReport(rep);
    setRepYear(rep.year);
    setRepSubtitle(rep.subtitle);
    setRepTheme(rep.theme);
    setRepSummary(rep.summary);
    setRepActsCount(rep.activitiesCount);
    setRepStudentsCount(rep.studentsReached);
    setRepProgsCount(rep.programsCount);
    setRepMilesCount(rep.milestonesCount);
    setRepGrowth(rep.growthRate);
    setRepHighlights(rep.highlights || []);
    setModalOpen(true);
  };
  const addHighlight = () => {
    if (!highlightInput) return;
    setRepHighlights([...repHighlights, highlightInput]);
    setHighlightInput("");
  };
  const removeHighlight = (idx) => {
    setRepHighlights(repHighlights.filter((_, i) => i !== idx));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!repSubtitle || !repTheme || !repSummary) {
      alert("Subtitle, primary focus theme, and summary are mandatory.");
      return;
    }
    const payload = {
      year: Number(repYear),
      subtitle: repSubtitle,
      theme: repTheme,
      summary: repSummary,
      activitiesCount: Number(repActsCount),
      studentsReached: Number(repStudentsCount),
      programsCount: Number(repProgsCount),
      milestonesCount: Number(repMilesCount),
      growthRate: repGrowth,
      highlights: repHighlights
    };
    try {
      if (editingReport) {
        const res = await fetch(`/api/annual-reports/${editingReport.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updated = await res.json();
          onUpdateAnnualReports(annualReports.map((r) => r.id === updated.id ? updated : r));
        }
      } else {
        const res = await fetch("/api/annual-reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const added = await res.json();
          onUpdateAnnualReports([added, ...annualReports]);
        }
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to commit annual report: ", err);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this annual campaign report entry?")) return;
    try {
      const res = await fetch(`/api/annual-reports/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        onUpdateAnnualReports(annualReports.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete annual report: ", err);
    }
  };
  return <div className="space-y-6">
      
      {
    /* HEADER CONTROLS */
  }
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Annual Season Reports Desk</h2>
          <p className="text-xs text-gray-500 mt-1 leading-snug">
            Compose and edit yearly digital reports showcasing milestones, growth index scores and structured campaign targets.
          </p>
        </div>
        
        <button
    onClick={handleOpenCreate}
    className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 self-start cursor-pointer"
  >
          <Plus className="w-4 h-4" />
          Concoct New Campaign Year
        </button>
      </div>

      {
    /* TABLE INDEX */
  }
      <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafbfc] border-b border-gray-150 font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
              <th className="p-4">Report Year & Subtitle</th>
              <th className="p-4">Focus Theme</th>
              <th className="p-4">Outreach stats</th>
              <th className="p-4">Growth Rate index</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {annualReports.length === 0 ? <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">No yearly reviews logged.</td>
              </tr> : annualReports.map((rep) => <tr key={rep.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-indigo-50 rounded-lg shrink-0 text-indigo-700">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-primary">{rep.year} Review booklet</div>
                        <span className="text-[10px] text-gray-400 font-medium tracking-tight block">
                          "{rep.subtitle}"
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-gray-700 block truncate max-w-xs">{rep.theme}</span>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-gray-500">
                    <div>Activities: <strong className="text-primary">{rep.activitiesCount}</strong></div>
                    <div>Students: <strong className="text-primary">{(rep.studentsReached / 1e3).toFixed(1)}k</strong></div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {rep.growthRate}
                    </span>
                  </td>
                  <td className="p-4 text-right overflow-visible">
                    <div className="flex items-center justify-end gap-2">
                      <button
    onClick={() => handleOpenEdit(rep)}
    className="p-1 px-2.5 border border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 hover:text-primary"
  >
                        Edit
                      </button>
                      <button
    onClick={() => handleDelete(rep.id)}
    className="p-1 px-2 border border-red-150 text-red-650 hover:bg-red-50 rounded-lg font-bold"
  >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>)}
          </tbody>
        </table>
      </div>

      {
    /* CREATE / EDIT DIALOG FORM */
  }
      {modalOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 w-full max-w-xl shadow-xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fafbfc]">
              <div>
                <h3 className="font-display font-extrabold text-base text-primary">
                  {editingReport ? "Edit Year Review Ledger" : "Compose Strategic Year Review Campaign"}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Hydrate yearly highlights and audited records.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto text-xs">
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Campaign Year</label>
                  <input
    type="number"
    required
    value={repYear}
    onChange={(e) => setRepYear(Number(e.target.value))}
    className="w-full px-3 py-2 border border-gray-200 rounded-xl"
  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-gray-650 mb-1">Booklet Motto subtitle</label>
                  <input
    type="text"
    required
    value={repSubtitle}
    onChange={(e) => setRepSubtitle(e.target.value)}
    placeholder="e.g. Scaling Tech Capabilities in Rural Telangana"
    className="w-full px-3 py-2 border border-gray-200 rounded-xl"
  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-650 mb-1">Primary Focus theme</label>
                <input
    type="text"
    required
    value={repTheme}
    onChange={(e) => setRepTheme(e.target.value)}
    placeholder="e.g. Empowering Rural Districts with Hardware & Literacy"
    className="w-full px-3 py-2 border border-gray-200 rounded-xl"
  />
              </div>

              <div>
                <label className="block font-bold text-gray-650 mb-1">Campaign Executive Summary</label>
                <textarea
    required
    rows={3}
    value={repSummary}
    onChange={(e) => setRepSummary(e.target.value)}
    placeholder="In 2026, we accelerated computer coaching centers..."
    className="w-full p-3 border border-gray-200 rounded-xl"
  />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#fafbfc] p-3 rounded-2xl border border-gray-150">
                <div>
                  <label className="block font-bold text-gray-500 mb-1 text-[10px]">Activities Done</label>
                  <input
    type="number"
    required
    value={repActsCount}
    onChange={(e) => setRepActsCount(Number(e.target.value))}
    className="w-full px-2 py-1 border border-gray-200 rounded-lg text-xs"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1 text-[10px]">Direct reach</label>
                  <input
    type="number"
    required
    value={repStudentsCount}
    onChange={(e) => setRepStudentsCount(Number(e.target.value))}
    className="w-full px-2 py-1 border border-gray-200 rounded-lg text-xs"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1 text-[10px]">Active Sectors</label>
                  <input
    type="number"
    required
    value={repProgsCount}
    onChange={(e) => setRepProgsCount(Number(e.target.value))}
    className="w-full px-2 py-1 border border-gray-200 rounded-lg text-xs"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1 text-[10px]">Milestones done</label>
                  <input
    type="number"
    required
    value={repMilesCount}
    onChange={(e) => setRepMilesCount(Number(e.target.value))}
    className="w-full px-2 py-1 border border-gray-200 rounded-lg text-xs"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Growth Index Rate text</label>
                  <input
    type="text"
    required
    value={repGrowth}
    onChange={(e) => setRepGrowth(e.target.value)}
    placeholder="e.g. +45% YoY Growth"
    className="w-full px-3 py-2 border border-gray-200 rounded-xl"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-650 mb-[5px]">Add Highlight Bulletins</label>
                  <div className="flex gap-2">
                    <input
    type="text"
    placeholder="e.g. Distributed 50 Raspberry Pi kits"
    value={highlightInput}
    onChange={(e) => setHighlightInput(e.target.value)}
    className="flex-grow p-1.5 border border-gray-200 rounded-lg text-xs"
  />
                    <button
    type="button"
    onClick={addHighlight}
    className="px-3 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-lg text-xs font-bold"
  >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {repHighlights.length > 0 && <div className="p-3 bg-gray-50 border border-gray-150 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold block text-gray-400">Highlights List Index:</span>
                  <div className="divide-y divide-gray-200 max-h-36 overflow-y-auto">
                    {repHighlights.map((hl, idx) => <div key={idx} className="py-1.5 flex items-start justify-between text-xs">
                        <span className="pr-4 leading-normal font-medium">• {hl}</span>
                        <button type="button" onClick={() => removeHighlight(idx)} className="text-red-500 font-bold hover:text-red-700">×</button>
                      </div>)}
                  </div>
                </div>}

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2 bg-[#fafbfc] -mx-6 -mb-6 p-4">
                <button
    type="button"
    onClick={() => setModalOpen(false)}
    className="px-4 py-2 border border-gray-200 text-gray-650 hover:bg-gray-50 rounded-xl font-bold"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold"
  >
                  Save Campaign Review
                </button>
              </div>

            </form>
          </div>
        </div>}

    </div>;
}
