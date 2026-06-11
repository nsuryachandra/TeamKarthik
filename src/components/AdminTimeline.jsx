import { useState } from "react";
import { Plus, Trash2, Edit2, X, Search, Milestone } from "lucide-react";
export default function AdminTimeline({
  timeline = [],
  onUpdateTimeline,
  triggerNotify
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Key Milestones");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([""]);
  const filteredTimeline = timeline.filter(
    (t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.summary.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const resetForm = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setTitle("");
    setDate("");
    setSummary("");
    setCategory("Key Milestones");
    setLocation("");
    setImages([""]);
  };
  const handleEditClick = (entry) => {
    setCurrentItem(entry);
    setTitle(entry.title);
    setDate(entry.date);
    setSummary(entry.summary);
    setCategory(entry.category);
    setLocation(entry.location || "");
    setImages(entry.images && entry.images.length > 0 ? entry.images : [""]);
    setIsEditing(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Verify: Do you want to process deletion of this journey milestone trace?")) return;
    try {
      const res = await fetch(`/api/timeline/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onUpdateTimeline(timeline.filter((t) => t.id !== id));
      triggerNotify("Milestone logged successfully deleted!");
    } catch (e) {
      alert("Error deleting timeline milestone.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !summary) {
      alert("Title, Date and Brief Summary are compulsory values.");
      return;
    }
    const payload = {
      title,
      date,
      summary,
      category,
      location,
      images: images.filter((i) => i.trim() !== "")
    };
    try {
      if (currentItem) {
        const res = await fetch(`/api/timeline/${currentItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        onUpdateTimeline(timeline.map((t) => t.id === updated.id ? updated : t));
        triggerNotify("Journey milestone saved successfully!");
      } else {
        const res = await fetch("/api/timeline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        onUpdateTimeline([created, ...timeline]);
        triggerNotify("New milestone trace appended to historic timeline!");
      }
      resetForm();
    } catch (e2) {
      alert("Failed to submit timeline form.");
    }
  };
  return <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
            <Milestone className="w-5 h-5 text-accent" />
            Milestone Chronology Planner
          </h3>
          <p className="text-xs text-gray-500">Record, map, and sequence important corporate breakthroughs on the chronological journey map.</p>
        </div>
        {!isEditing && <button
    onClick={() => setIsEditing(true)}
    className="bg-primary hover:bg-primary-light text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
  >
            <Plus className="w-4 h-4" />
            Append Journey Milestone
          </button>}
      </div>

      {isEditing ? (
    /* EDIT OR CREATE FORM */
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-150 p-5 sm:p-6 space-y-4 max-w-2xl">
          <div className="flex justify-between items-center border-b border-gray-150 pb-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary">
              {currentItem ? "Modify Timeline Trace" : "Insert Chronicle Node"}
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
              <label className="text-[10px] font-mono uppercase text-gray-455 block mb-1">Milestone/Breakthrough Name *</label>
              <input
      type="text"
      required
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="e.g. Completed Begumpet Public School Campaign Setup"
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
    />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-gray-455 block mb-1">Target Date *</label>
              <input
      type="date"
      required
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
    />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-gray-455 block mb-1">Classification Type</label>
              <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white font-mono"
    >
                <option value="Key Milestones">Key Milestones</option>
                <option value="Regional Expansions">Regional Expansions</option>
                <option value="Community Deliveries">Community Deliveries</option>
                <option value="Executive Appraisals">Executive Appraisals</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-mono uppercase text-gray-455 block mb-1">Focal Region/Location</label>
              <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="e.g. Begumpet, Hyderabad Chapter"
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none"
    />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-mono uppercase text-gray-405 block mb-1">Brief Description (Brief narrative logs) *</label>
              <textarea
      required
      rows={3}
      value={summary}
      onChange={(e) => setSummary(e.target.value)}
      placeholder="Document critical highlights, impact metrics, and participants reached in this chronological milestone..."
      className="w-full text-xs border border-gray-200 rounded-xl p-3 bg-white focus:outline-none"
    />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-mono uppercase text-gray-405 block mb-1">Visual Evidence Photo URLs (comma-separated)</label>
              <input
      type="text"
      value={images.join(", ")}
      onChange={(e) => setImages(e.target.value.split(",").map((val) => val.trim()))}
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
              Save Milestone
            </button>
          </div>
        </form>
  ) : (
    /* CORE TIMELINE CHRONICLES TABLE */
    <div className="space-y-4">
          <div className="relative max-w-sm">
            <input
      type="text"
      placeholder="Search chronological Milestones..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 pl-9 bg-white focus:outline-none"
    />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-gray-50 border-b border-gray-150 font-mono text-[10px] uppercase text-gray-500 font-extrabold">
                <tr>
                  <th className="p-4">Breakthrough Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Target Date</th>
                  <th className="p-4">Evidence Snaps</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTimeline.map((entry) => <tr key={entry.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <div className="font-bold text-primary max-w-sm sm:max-w-md truncate">{entry.title}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">{entry.summary}</div>
                    </td>
                    <td className="p-4 font-mono text-gray-550">{entry.category}</td>
                    <td className="p-4 font-mono text-gray-550">{entry.date}</td>
                    <td className="p-4 font-mono text-gray-405">{entry.images?.length || 0} Snaps checked</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
      onClick={() => handleEditClick(entry)}
      className="p-1.5 text-primary hover:bg-gray-100 rounded cursor-pointer"
      title="Edit"
    >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
      onClick={() => handleDelete(entry.id)}
      className="p-1.5 text-red-650 hover:bg-red-50 rounded cursor-pointer"
      title="Delete"
    >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
                {filteredTimeline.length === 0 && <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-405 italic">No entry milestones cataloged here.</td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
  )}

    </div>;
}
