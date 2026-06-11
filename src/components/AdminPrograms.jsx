import { useState } from "react";
import { Plus, Trash2, Edit2, X, Target, Search, FolderKanban } from "lucide-react";
export default function AdminPrograms({
  programs = [],
  onUpdatePrograms,
  triggerNotify
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState(["", "", ""]);
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [gallery, setGallery] = useState([""]);
  const filteredPrograms = programs.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const resetForm = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setName("");
    setDescription("");
    setObjectives(["", "", ""]);
    setStartDate("");
    setStatus("Active");
    setGallery([""]);
  };
  const handleEditClick = (p) => {
    setCurrentItem(p);
    setName(p.name);
    setDescription(p.description);
    setObjectives(p.objectives && p.objectives.length > 0 ? p.objectives : ["", "", ""]);
    setStartDate(p.startDate);
    setStatus(p.status);
    setGallery(p.gallery && p.gallery.length > 0 ? p.gallery : [""]);
    setIsEditing(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Verify: Do you want to wipe out this central long-term initiative program?")) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onUpdatePrograms(programs.filter((p) => p.id !== id));
      triggerNotify("Program initiative deleted completely!");
    } catch (e) {
      alert("Error deleting program.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !startDate) {
      alert("Fields Name, Brief, and Registered Start Date are required.");
      return;
    }
    const payload = {
      name,
      description,
      objectives: objectives.filter((o) => o.trim() !== ""),
      startDate,
      status,
      gallery: gallery.filter((g) => g.trim() !== "")
    };
    try {
      if (currentItem) {
        const res = await fetch(`/api/programs/${currentItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        onUpdatePrograms(programs.map((p) => p.id === updated.id ? updated : p));
        triggerNotify("Program parameters saved successfully!");
      } else {
        const res = await fetch("/api/programs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        onUpdatePrograms([created, ...programs]);
        triggerNotify("New long-term framework logged and compiled!");
      }
      resetForm();
    } catch (e2) {
      alert("Failed to submit program details.");
    }
  };
  const handleObjectiveChange = (index, val) => {
    const list = [...objectives];
    list[index] = val;
    setObjectives(list);
  };
  const addObjectiveRow = () => {
    setObjectives([...objectives, ""]);
  };
  return <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-accent" />
            Strategic Initiatives Manager
          </h3>
          <p className="text-xs text-gray-500">Configure core organizational programs and continuous engagement blueprints.</p>
        </div>
        {!isEditing && <button
    onClick={() => setIsEditing(true)}
    className="bg-primary hover:bg-primary-light text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
  >
            <Plus className="w-4 h-4" />
            Launch New Program
          </button>}
      </div>

      {isEditing ? (
    /* EDIT OR CREATE FORM */
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-150 p-5 sm:p-6 space-y-4 max-w-2xl">
          <div className="flex justify-between items-center border-b border-gray-150 pb-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary">
              {currentItem ? "Modify Program Initiative" : "Establish New Initiative Blueprint"}
            </h4>
            <button
      type="button"
      onClick={resetForm}
      className="text-gray-400 hover:text-gray-655"
    >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-mono uppercase text-gray-405 block mb-1">Initiative Name *</label>
              <input
      type="text"
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="e.g. Campus Connect Chapter Campaign"
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
    />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-mono uppercase text-gray-405 block mb-1">Narrative Description *</label>
              <textarea
      required
      rows={3}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Elaborate on the continuous scope, regional targets, and direct community beneficiaries..."
      className="w-full text-xs border border-gray-200 rounded-xl p-3 bg-white focus:outline-none"
    />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-gray-405 block mb-1">Registered Start Date *</label>
              <input
      type="text"
      required
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      placeholder="e.g. June 2026, September 2025"
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
    />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-gray-405 block mb-1">Deployment Status *</label>
              <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white font-mono"
    >
                <option value="Active">Active Operations</option>
                <option value="Planned">Planned / Future Pipeline</option>
                <option value="Completed">Completed Objectives</option>
                <option value="Archived">Archived Records</option>
              </select>
            </div>

            <div className="col-span-2 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono uppercase text-gray-405 block">Strategic Target Objectives</label>
                <button
      type="button"
      onClick={addObjectiveRow}
      className="text-[10px] font-mono font-bold text-accent hover:underline flex items-center gap-0.5"
    >
                  + Add Row
                </button>
              </div>
              <div className="space-y-2">
                {objectives.map((obj, index) => <div key={index} className="flex gap-2 items-center">
                    <Target className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
      type="text"
      value={obj}
      onChange={(e) => handleObjectiveChange(index, e.target.value)}
      placeholder={`Target objective metric ${index + 1}`}
      className="flex-grow text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none"
    />
                  </div>)}
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-mono uppercase text-gray-405 block mb-1">Gallery Showcase Image URLs (comma-separated)</label>
              <input
      type="text"
      value={gallery.join(", ")}
      onChange={(e) => setGallery(e.target.value.split(",").map((val) => val.trim()))}
      placeholder="e.g. https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
    />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-150 pt-3">
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
              Save Initiative
            </button>
          </div>
        </form>
  ) : (
    /* CORE PROGRAMS TABLE LIST */
    <div className="space-y-4">
          <div className="relative max-w-sm">
            <input
      type="text"
      placeholder="Search initiatives..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 pl-9 bg-white focus:outline-none"
    />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead className="bg-gray-50 border-b border-gray-150 font-mono text-[10px] uppercase text-gray-500">
                <tr>
                  <th className="p-4 font-extrabold">Program details</th>
                  <th className="p-4 font-extrabold">Registered Start</th>
                  <th className="p-4 font-extrabold">Status Badge</th>
                  <th className="p-4 font-extrabold">Key Milestones Count</th>
                  <th className="p-4 text-right font-extrabold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrograms.map((prog) => <tr key={prog.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <div className="font-bold text-primary max-w-sm sm:max-w-md truncate">{prog.name}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">{prog.description}</div>
                    </td>
                    <td className="p-4 font-mono text-gray-550">{prog.startDate}</td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-2.5 py-0.5 rounded text-[9px] font-mono">
                        ● {prog.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-gray-400">{prog.objectives?.length || 0} Targets set</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
      onClick={() => handleEditClick(prog)}
      className="p-1.5 text-primary hover:bg-gray-100 rounded cursor-pointer"
      title="Edit"
    >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
      onClick={() => handleDelete(prog.id)}
      className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
      title="Delete"
    >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
                {filteredPrograms.length === 0 && <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 italic">No program templates registered yet.</td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
  )}

    </div>;
}
