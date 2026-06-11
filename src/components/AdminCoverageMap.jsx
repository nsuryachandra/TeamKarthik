import { useState } from "react";
import { Plus, X, MapPin } from "lucide-react";
export default function AdminCoverageMap({
  coverageLocations,
  onUpdateCoverageLocations
}) {
  const [editingLocation, setEditingLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [locName, setLocName] = useState("");
  const [locCategory, setLocCategory] = useState("College");
  const [locPlace, setLocPlace] = useState("");
  const [locLat, setLocLat] = useState(17.385);
  const [locLng, setLocLng] = useState(78.4867);
  const [locActsCount, setLocActsCount] = useState(1);
  const [locStudentsCount, setLocStudentsCount] = useState(150);
  const [locDesc, setLocDesc] = useState("");
  const handleOpenCreate = () => {
    setEditingLocation(null);
    setLocName("");
    setLocCategory("College");
    setLocPlace("");
    setLocLat(17.385);
    setLocLng(78.4867);
    setLocActsCount(1);
    setLocStudentsCount(200);
    setLocDesc("");
    setModalOpen(true);
  };
  const handleOpenEdit = (loc) => {
    setEditingLocation(loc);
    setLocName(loc.name);
    setLocCategory(loc.category);
    setLocPlace(loc.location);
    setLocLat(loc.latitude);
    setLocLng(loc.longitude);
    setLocActsCount(loc.activitiesCount);
    setLocStudentsCount(loc.studentsReached || 150);
    setLocDesc(loc.description);
    setModalOpen(true);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!locName || !locPlace || !locDesc) {
      alert("Name, general location, and description are mandatory.");
      return;
    }
    const payload = {
      name: locName,
      category: locCategory,
      location: locPlace,
      latitude: Number(locLat),
      longitude: Number(locLng),
      activitiesCount: Number(locActsCount),
      studentsReached: Number(locStudentsCount),
      description: locDesc
    };
    try {
      if (editingLocation) {
        const res = await fetch(`/api/coverage-locations/${editingLocation.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updated = await res.json();
          onUpdateCoverageLocations(coverageLocations.map((l) => l.id === updated.id ? updated : l));
        }
      } else {
        const res = await fetch("/api/coverage-locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const added = await res.json();
          onUpdateCoverageLocations([added, ...coverageLocations]);
        }
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to commit geospatial node: ", err);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this operational anchor? It will disappear from the SVG coordinates map.")) return;
    try {
      const res = await fetch(`/api/coverage-locations/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        onUpdateCoverageLocations(coverageLocations.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete geospatial node: ", err);
    }
  };
  return <div className="space-y-6">
      
      {
    /* HEADER CONTROLS */
  }
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Geospatial Action Nodes</h2>
          <p className="text-xs text-gray-500 mt-1 leading-snug">
            Add or edit target coordinate hubs in Greater Hyderabad and Telangana plotted live on the interactive coverage grid.
          </p>
        </div>
        
        <button
    onClick={handleOpenCreate}
    className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 self-start cursor-pointer"
  >
          <Plus className="w-4 h-4" />
          Pre-approve Location
        </button>
      </div>

      {
    /* TABLE VIEW */
  }
      <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafbfc] border-b border-gray-150 font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
              <th className="p-4">Facility Name & Type</th>
              <th className="p-4">Geographic zone</th>
              <th className="p-4">Latitude / Longitude</th>
              <th className="p-4">Reach</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {coverageLocations.length === 0 ? <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">No geographic points mapped yet.</td>
              </tr> : coverageLocations.map((loc) => <tr key={loc.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-100 rounded-lg shrink-0 text-slate-600">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-primary truncate max-w-xs">{loc.name}</div>
                        <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-gray-400 block mt-0.5">
                          {loc.category} node
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-[11px] font-bold">{loc.location}</td>
                  <td className="p-4 font-mono text-[11px] text-gray-400">
                    {loc.latitude.toFixed(4)}° N, {loc.longitude.toFixed(4)}° E
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-[10px]">
                      <span className="font-extrabold text-primary block">{loc.activitiesCount} Session(s)</span>
                      <span className="text-emerald-650 font-bold block">{loc.studentsReached || 150} Reached</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
    onClick={() => handleOpenEdit(loc)}
    className="p-1 px-2.5 border border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 hover:text-primary"
  >
                        Edit
                      </button>
                      <button
    onClick={() => handleDelete(loc.id)}
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
    /* CREATE / EDIT MODAL */
  }
      {modalOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 w-full max-w-md shadow-xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fafbfc]">
              <div>
                <h3 className="font-display font-extrabold text-base text-primary">
                  {editingLocation ? "Configure Coordinate Node" : "Register Spatial Activity Anchor"}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Anchored for Hyderabad/Telangana vector scale.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto text-xs">
              
              <div>
                <label className="block font-bold text-gray-650 mb-1">Institution / facility Name</label>
                <input
    type="text"
    required
    value={locName}
    onChange={(e) => setLocName(e.target.value)}
    placeholder="e.g. JNTUH Campus"
    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Marker Type category</label>
                  <select
    value={locCategory}
    onChange={(e) => setLocCategory(e.target.value)}
    className="w-full py-2 px-3 border border-gray-200 bg-white rounded-xl focus:outline-none"
  >
                    <option value="College">College</option>
                    <option value="School">School</option>
                    <option value="Community">Community</option>
                    <option value="Program Location">Program Location</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-650 mb-1">District Segment</label>
                  <input
    type="text"
    required
    value={locPlace}
    onChange={(e) => setLocPlace(e.target.value)}
    placeholder="e.g. Madhapur, Hyderabad"
    className="w-full px-3 py-2 border border-gray-200 rounded-xl"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-150">
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Latitude coordinate (Telangana: 17.0 - 19.5)</label>
                  <input
    type="number"
    step="0.0001"
    required
    value={locLat}
    onChange={(e) => setLocLat(Number(e.target.value))}
    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg font-mono text-[11px]"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Longitude coordinate (Telangana: 77.0 - 81.5)</label>
                  <input
    type="number"
    step="0.0001"
    required
    value={locLng}
    onChange={(e) => setLocLng(Number(e.target.value))}
    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg font-mono text-[11px]"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Conducted Activites (Count)</label>
                  <input
    type="number"
    required
    min={1}
    value={locActsCount}
    onChange={(e) => setLocActsCount(Number(e.target.value))}
    className="w-full px-3 py-2 border border-gray-200 rounded-xl"
  />
                </div>
                <div>
                  <label className="block font-bold text-gray-650 mb-1">Direct Outreach Reached (Est)</label>
                  <input
    type="number"
    required
    min={10}
    value={locStudentsCount}
    onChange={(e) => setLocStudentsCount(Number(e.target.value))}
    className="w-full px-3 py-2 border border-gray-200 rounded-xl"
  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-650 mb-1">Brief Description / Session Scope</label>
                <textarea
    required
    rows={3}
    value={locDesc}
    onChange={(e) => setLocDesc(e.target.value)}
    placeholder="Computer basic literacy distribution, hardware diagnostic assemblies..."
    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none"
  />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2 bg-[#fafbfc] -mx-6 -mb-6 p-4">
                <button
    type="button"
    onClick={() => setModalOpen(false)}
    className="px-4 py-2 border border-gray-200 text-gray-655 hover:bg-gray-50 rounded-xl font-bold"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold"
  >
                  Confirm Geographic Pin
                </button>
              </div>

            </form>
          </div>
        </div>}

    </div>;
}
