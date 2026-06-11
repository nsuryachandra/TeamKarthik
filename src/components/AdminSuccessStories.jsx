import { useState } from "react";
import { Plus, X } from "lucide-react";
export default function AdminSuccessStories({
  successStories,
  onUpdateSuccessStories
}) {
  const [editingStory, setEditingStory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storySummary, setStorySummary] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [storyCover, setStoryCover] = useState("");
  const [storyCategory, setStoryCategory] = useState("Student Success Stories");
  const [storyDate, setStoryDate] = useState("");
  const [storyAuthor, setStoryAuthor] = useState("");
  const [metricLabel, setMetricLabel] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [storyMetrics, setStoryMetrics] = useState([]);
  const handleOpenCreate = () => {
    setEditingStory(null);
    setStoryTitle("");
    setStorySummary("");
    setStoryContent("");
    setStoryCover("");
    setStoryCategory("Student Success Stories");
    setStoryDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setStoryAuthor("Team Karthik Representative");
    setStoryMetrics([]);
    setModalOpen(true);
  };
  const handleOpenEdit = (story) => {
    setEditingStory(story);
    setStoryTitle(story.title);
    setStorySummary(story.summary);
    setStoryContent(story.content);
    setStoryCover(story.coverImage);
    setStoryCategory(story.category);
    setStoryDate(story.date);
    setStoryAuthor(story.author || "Team Karthik Coordinator");
    setStoryMetrics(story.metrics || []);
    setModalOpen(true);
  };
  const addMetric = () => {
    if (!metricLabel || !metricValue) return;
    setStoryMetrics([...storyMetrics, { label: metricLabel, value: metricValue }]);
    setMetricLabel("");
    setMetricValue("");
  };
  const removeMetric = (index) => {
    setStoryMetrics(storyMetrics.filter((_, i) => i !== index));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!storyTitle || !storySummary || !storyContent) {
      alert("Title, summary, and content are mandatory fields.");
      return;
    }
    const payload = {
      title: storyTitle,
      summary: storySummary,
      content: storyContent,
      coverImage: storyCover || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600",
      category: storyCategory,
      date: storyDate,
      author: storyAuthor,
      metrics: storyMetrics
    };
    try {
      if (editingStory) {
        const res = await fetch(`/api/success-stories/${editingStory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updated = await res.json();
          onUpdateSuccessStories(successStories.map((s) => s.id === updated.id ? updated : s));
        }
      } else {
        const res = await fetch("/api/success-stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const added = await res.json();
          onUpdateSuccessStories([added, ...successStories]);
        }
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to commit success story: ", err);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this success story case? This action is irreversible.")) return;
    try {
      const res = await fetch(`/api/success-stories/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        onUpdateSuccessStories(successStories.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete success story: ", err);
    }
  };
  return <div className="space-y-6">
      
      {
    /* HEADER CONTROLS */
  }
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Manage Success Stories</h2>
          <p className="text-xs text-gray-500 mt-1 leading-snug">
            Add or edit student and community success reviews posted in the digital editorial showcase.
          </p>
        </div>
        
        <button
    onClick={handleOpenCreate}
    className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 self-start cursor-pointer"
  >
          <Plus className="w-4 h-4" />
          Add Impact Case
        </button>
      </div>

      {
    /* TABLE LIST VIEW */
  }
      <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafbfc] border-b border-gray-150 font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
              <th className="p-4">Cover / Category</th>
              <th className="p-4">Title & Author</th>
              <th className="p-4">Date</th>
              <th className="p-4">Metrics Tracked</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {successStories.length === 0 ? <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">No stories logged on the server.</td>
              </tr> : successStories.map((story) => <tr key={story.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-150 shrink-0">
                        <img src={story.coverImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[9px] font-bold font-mono rounded uppercase">
                        {story.category.split(" ")[0]}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">
                    <div>
                      <div className="text-primary truncate max-w-sm">{story.title}</div>
                      <div className="text-[10px] text-gray-400 font-normal">By {story.author || "Team Karthik"}</div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-gray-500">{story.date}</td>
                  <td className="p-4 font-mono text-[10px] text-emerald-600 font-bold">
                    {story.metrics && story.metrics[0] ? <div className="truncate max-w-[150px]">
                        {story.metrics[0].label}: {story.metrics[0].value}
                      </div> : "Case verified"}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
    onClick={() => handleOpenEdit(story)}
    className="p-1 px-2.5 border border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 hover:text-primary"
  >
                        Edit
                      </button>
                      <button
    onClick={() => handleDelete(story.id)}
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
    /* CREATE / EDIT DIALOG FORM MODAL */
  }
      {modalOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-gray-200 w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fafbfc]">
              <div>
                <h3 className="font-display font-extrabold text-base text-primary">
                  {editingStory ? "Edit Case Study Story" : "Register New success Moment"}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Hydrate fields for dynamic publication.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-grow text-xs">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Story Topic Title</label>
                  <input
    type="text"
    required
    value={storyTitle}
    onChange={(e) => setStoryTitle(e.target.value)}
    placeholder="From Classrooms to KLM Merit Scholarship..."
    className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Article Category</label>
                  <select
    value={storyCategory}
    onChange={(e) => setStoryCategory(e.target.value)}
    className="w-full py-2 px-3 border border-gray-200 bg-white rounded-xl focus:outline-none"
  >
                    <option value="Student Success Stories">Student Success Stories</option>
                    <option value="Community Empowerment">Community Empowerment</option>
                    <option value="Civic Breakthroughs">Civic Breakthroughs</option>
                    <option value="General Milestone Outcomes">General Milestone Outcomes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-650 mb-1">Story Summary (Brief quote callout)</label>
                <textarea
    required
    rows={2}
    value={storySummary}
    onChange={(e) => setStorySummary(e.target.value)}
    placeholder="How a youth student from Tenali mapped safe transit systems..."
    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none"
  />
              </div>

              <div>
                <label className="block font-bold text-gray-650 mb-1">Full Article content (Markdown supported)</label>
                <textarea
    required
    rows={6}
    value={storyContent}
    onChange={(e) => setStoryContent(e.target.value)}
    placeholder="Sai attended seminars... built a safe night transit app..."
    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none font-sans"
  />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block font-bold text-gray-650 mb-1">Cover Picture URL</label>
                  <input
    type="url"
    value={storyCover}
    onChange={(e) => setStoryCover(e.target.value)}
    placeholder="https://images.unsplash.com/..."
    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Publishing Date</label>
                  <input
    type="date"
    required
    value={storyDate}
    onChange={(e) => setStoryDate(e.target.value)}
    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Primary Author Attribution</label>
                  <input
    type="text"
    required
    value={storyAuthor}
    onChange={(e) => setStoryAuthor(e.target.value)}
    placeholder="Aditya Prasad (Strategic Coordinator)"
    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-650 mb-[5px]">Add Metrics key-values</label>
                  <div className="flex gap-2">
                    <input
    type="text"
    placeholder="e.g. Scholarship value"
    value={metricLabel}
    onChange={(e) => setMetricLabel(e.target.value)}
    className="w-1/2 p-1.5 border border-gray-200 rounded-lg text-[11px]"
  />
                    <input
    type="text"
    placeholder="e.g. Full tuition"
    value={metricValue}
    onChange={(e) => setMetricValue(e.target.value)}
    className="w-1/2 p-1.5 border border-gray-200 rounded-lg text-[11px]"
  />
                    <button
    type="button"
    onClick={addMetric}
    className="px-3 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-lg text-[10px] font-bold"
  >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {storyMetrics.length > 0 && <div className="p-3 bg-gray-50 border border-gray-150 rounded-xl">
                  <span className="text-[10px] uppercase font-mono font-bold block text-gray-400 mb-2">Metrics Preview List:</span>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    {storyMetrics.map((sm, idx) => <span key={idx} className="bg-white px-2 py-1 rounded border border-gray-200 flex items-center gap-1.5 font-bold">
                        {sm.label}: {sm.value}
                        <button type="button" onClick={() => removeMetric(idx)} className="text-red-500 hover:text-red-700">×</button>
                      </span>)}
                  </div>
                </div>}

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2 bg-[#fafbfc] -mx-6 -mb-6 p-4">
                <button
    type="button"
    onClick={() => setModalOpen(false)}
    className="px-4 py-2 border border-gray-200 text-gray-650 hover:bg-gray-50 rounded-xl font-bold cursor-pointer"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold cursor-pointer"
  >
                  Save Story Article
                </button>
              </div>

            </form>
          </div>
        </div>}

    </div>;
}
