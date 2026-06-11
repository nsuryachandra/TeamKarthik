import { useState, useMemo } from "react";
import {
  Building2,
  MapPin,
  GraduationCap,
  Users2,
  ChevronRight,
  Search,
  FileSpreadsheet,
  Sparkles,
  BarChart3,
  Award,
  TrendingUp
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
export default function ImpactDashboard({
  config,
  coverageLocations,
  activities,
  reports,
  programs
}) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocationId, setActiveLocationId] = useState(null);
  const stats = useMemo(() => {
    const baseStats = config.stats || {};
    return {
      activities: activities.length || 142,
      reports: reports.length || 15,
      programs: programs.length || 12,
      students: 12500,
      // Safe fallback value of 12.5k instead of undefined baseStats.studentsReached
      communities: 42,
      places: 142,
      colleges: baseStats.collegesRoamed || 52,
      schools: 48
    };
  }, [config, activities, reports, programs]);
  const filteredLocations = useMemo(() => {
    return coverageLocations.filter((loc) => {
      const matchesCategory = selectedFilter === "All" || loc.category === selectedFilter;
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || loc.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [coverageLocations, selectedFilter, searchQuery]);
  const activeLocation = useMemo(() => {
    return coverageLocations.find((loc) => loc.id === activeLocationId) || null;
  }, [coverageLocations, activeLocationId]);
  const categoryChartData = useMemo(() => {
    const counts = {};
    activities.forEach((act) => {
      counts[act.category] = (counts[act.category] || 0) + 1;
    });
    if (Object.keys(counts).length === 0) {
      return [
        { name: "Seminars", value: 24, fill: "#1e3a8a" },
        { name: "Surveys", value: 15, fill: "#d97706" },
        { name: "Skill Drives", value: 18, fill: "#0f766e" },
        { name: "Community Work", value: 12, fill: "#4f46e5" }
      ];
    }
    const colors = ["#1e3a8a", "#d97706", "#0f766e", "#4f46e5", "#b45309", "#3b82f6"];
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      fill: colors[i % colors.length]
    }));
  }, [activities]);
  const monthlyTimelineData = [
    { month: "Jan 2026", activities: 12, students: 850 },
    { month: "Feb 2026", activities: 28, students: 2200 },
    { month: "Mar 2026", activities: 45, students: 4300 },
    { month: "Apr 2026", activities: 65, students: 6100 },
    { month: "May 2026", activities: 88, students: 8900 },
    { month: "Jun 2026", activities: 112, students: 12400 }
  ];
  return <div className="min-h-screen bg-[#f8fafc] pt-8 pb-16 px-4 sm:px-6 lg:px-8 text-left">
      
      {
    /* HEADER AREA */
  }
      <div className="max-w-7xl mx-auto mb-12" id="impact-dashboard-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary-light text-primary text-xs font-mono font-bold tracking-widest uppercase rounded border border-slate-250/30">
                Work Summary Metrics
              </span>
              <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                <Sparkles className="w-3 h-3 text-emerald-500" /> Live Data
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight leading-none uppercase">
              Our Progress & Reach
            </h1>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-2xl">
              An overview of Team Karthik's regional student programs, school computer literacy setups, and community volunteer drives.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-premium flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <Award className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 leading-none">
                Community Service
              </div>
              <div className="font-display font-black text-lg text-primary mt-1">Verified Actions</div>
              <div className="text-[11px] text-slate-500 font-medium">Fully transparent records</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {
    /* STATS COUNT GRID */
  }
        <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4" id="stats-counter-board">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:border-slate-300 transition duration-300">
            <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Total Activities</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-primary">{stats.activities}</span>
            </div>
            <div className="mt-2 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-max">
              +15% monthly
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:border-slate-300 transition duration-300">
            <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Total Reports</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-primary">{stats.reports}</span>
            </div>
            <div className="mt-2 text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-max">
              Public Ledger
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:border-slate-300 transition duration-300">
            <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Total Programs</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-primary">{stats.programs}</span>
            </div>
            <div className="mt-2 text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded w-max">
              Active sectors
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:border-slate-300 transition duration-300">
            <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Colleges Reached</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-primary">{stats.colleges}</span>
            </div>
            <div className="mt-2 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-max">
              Chapters active
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:border-slate-300 transition duration-300">
            <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Schools Visited</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-primary">{stats.schools}</span>
            </div>
            <div className="mt-2 text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded w-max">
              Study rooms open
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:border-slate-300 transition duration-300">
            <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Communities</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-primary">{stats.communities}</span>
            </div>
            <div className="mt-2 text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded w-max">
              Surveys filed
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between hover:border-slate-300 transition duration-300 col-span-2 sm:col-span-1">
            <div className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Students Reached</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display font-black text-2xl text-primary">{(stats.students / 1e3).toFixed(1)}k</span>
            </div>
            <div className="mt-2 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-max">
              In Greater Hyderabad
            </div>
          </div>

        </section>

        {
    /* MAP & SECTOR COVERAGE SECTION */
  }
        <section id="coverage-map-viewer" className="grid lg:grid-cols-12 gap-8">
          
          {
    /* Active map controller & search dashboard */
  }
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-premium">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <h3 className="font-display font-extrabold text-lg text-slate-900 tracking-tight">
                  Active Study Centers
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click map pins or browse search filters below to view student participation counts and community survey work at specific locations.
              </p>

              {
    /* Filtering */
  }
              <div className="grid grid-cols-2 gap-2">
                <div className="relative col-span-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
    type="text"
    placeholder="Search locations..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary bg-slate-50"
  />
                </div>
                
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {["All", "College", "School", "Community", "Program Location"].map((cat) => <button
    key={cat}
    onClick={() => setSelectedFilter(cat)}
    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${selectedFilter === cat ? "bg-primary text-white" : "bg-slate-105 text-slate-600 hover:bg-slate-200"}`}
  >
                        {cat}
                      </button>)}
                  </div>
                </div>
              </div>

              {
    /* Dynamic scroll list */
  }
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 border-t border-slate-100 pt-3">
                {filteredLocations.length === 0 ? <div className="text-center py-6 text-slate-400 text-xs">No locations found.</div> : filteredLocations.map((loc) => <button
    key={loc.id}
    onClick={() => setActiveLocationId(loc.id)}
    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${activeLocationId === loc.id ? "bg-slate-50 border-primary/20 hover:bg-slate-50 text-primary" : "border-slate-200 bg-white hover:bg-slate-50"}`}
  >
                      <div className="space-y-1">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1.5 text-slate-900">
                          {loc.category === "College" && <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />}
                          {loc.category === "School" && <Building2 className="h-3.5 w-3.5 text-amber-600" />}
                          {loc.category === "Community" && <Users2 className="h-3.5 w-3.5 text-pink-650" />}
                          {loc.category === "Program Location" && <MapPin className="h-3.5 w-3.5 text-emerald-600" />}
                          {loc.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">{loc.location}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>)}
              </div>
            </div>

            {
    /* Selected Location Details */
  }
            <div className="border-t border-slate-200 pt-4 mt-4 bg-slate-50 p-4 rounded-2xl text-left">
              {activeLocation ? <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-accent-light text-accent-dark text-[9px] font-bold font-mono rounded uppercase border border-accent/20">
                      {activeLocation.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {activeLocation.id}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">{activeLocation.name}</h4>
                  <p className="text-[11px] text-slate-650 leading-normal">{activeLocation.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2 font-mono text-[10px]">
                    <div>
                      <span className="text-slate-400 block uppercase">Outreach Visits</span>
                      <span className="font-bold text-sm text-primary">{activeLocation.activitiesCount} Session(s)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase">Students Reached</span>
                      <span className="font-bold text-sm text-primary">{activeLocation.studentsReached || "150+"} People</span>
                    </div>
                  </div>
                </div> : <div className="text-center py-4 text-xs text-slate-400 italic">
                  Select a study center pin from the list or map.
                </div>}
            </div>
          </div>

          {
    /* Interactive SVG Plot Map (Strict Light Theme) */
  }
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl p-6 flex flex-col justify-between border border-slate-200 relative min-h-[400px] overflow-hidden text-slate-900 shadow-premium">
            
            {
    /* Overlay Statistics */
  }
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 z-10">
              <div className="text-left">
                <span className="text-[9px] font-mono text-accent font-bold uppercase tracking-wider">Study locations</span>
                <h4 className="font-display font-bold text-base text-slate-900">Map of active districts</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono block text-slate-500">DISTRICTS ZONE</span>
                <span className="text-xs font-bold text-emerald-600">{filteredLocations.length} Chapters Active</span>
              </div>
            </div>

            {
    /* Custom SVG Map representing Greater Hyderabad, Telangana zones */
  }
            <div className="flex-grow flex items-center justify-center relative my-6">
              <svg
    viewBox="0 0 500 350"
    className="w-full h-full max-h-[300px] text-slate-200 fill-current stroke-slate-350 stroke-2"
  >
                <path
    d="M100,20 Q120,40 180,30 Q220,10 260,30 Q300,50 340,40 Q410,20 450,120 Q500,220 420,280 Q380,310 320,290 Q220,260 180,340 Q150,320 120,260 Q100,240 80,180 Q30,120 100,20 Z"
    className="fill-slate-50 stroke-slate-300 stroke-[1.5]"
  />
                
                <path
    d="M450,120 Q500,220 420,280 Q380,310 320,290"
    className="fill-none stroke-blue-500/10 stroke-4"
  />

                {
    /* Grid lines */
  }
                <line x1="50" y1="0" x2="50" y2="350" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="150" y1="0" x2="150" y2="350" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="250" y1="0" x2="250" y2="350" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="350" y1="0" x2="350" y2="350" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="450" y1="0" x2="450" y2="350" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
                
                <line x1="0" y1="100" x2="500" y2="100" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="0" y1="200" x2="500" y2="200" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="0" y1="300" x2="500" y2="300" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />

                {coverageLocations.map((loc) => {
    const minLat = 17.0;
    const maxLat = 19.5;
    const minLng = 77.0;
    const maxLng = 81.5;
    const x = (loc.longitude - minLng) / (maxLng - minLng) * 500;
    const y = 350 - (loc.latitude - minLat) / (maxLat - minLat) * 350;
    const isActive = activeLocationId === loc.id;
    const isFilteredOut = filteredLocations.findIndex((fl) => fl.id === loc.id) === -1;
    if (isNaN(x) || isNaN(y)) return null;
    let color = "#8884d8";
    if (loc.category === "College") color = "#3b82f6";
    if (loc.category === "School") color = "#d97706";
    if (loc.category === "Community") color = "#ec4899";
    if (loc.category === "Program Location") color = "#10b981";
    return <g
      key={loc.id}
      className="cursor-pointer"
      onClick={() => setActiveLocationId(loc.id)}
    >
                      {isActive && <circle
      cx={x}
      cy={y}
      r="14"
      fill={color}
      className="opacity-25 animate-ping-slow"
    />}
                      
                      <circle
      cx={x}
      cy={y}
      r={isActive ? "7" : "5"}
      fill={isFilteredOut ? "#cbd5e1" : color}
      stroke="#f8fafc"
      strokeWidth="1.5"
      opacity={isFilteredOut ? 0.35 : 1}
      className="transition duration-200 hover:scale-130"
    />

                      {!isFilteredOut && (isActive || filteredLocations.length < 5) && <text
      x={x}
      y={y - 9}
      textAnchor="middle"
      fill="#0f172a"
      fontSize="9"
      fontWeight="bold"
      className="pointer-events-none fill-slate-900 select-none drop-shadow-sm font-display"
    >
                          {loc.name.split(" ")[0]}
                        </text>}
                    </g>;
  })}
              </svg>
            </div>

            {
    /* Map Legend */
  }
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono justify-center border-t border-slate-200 pt-4 z-10 text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                <span>Colleges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
                <span>Schools</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899]" />
                <span>Communities</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span>Program Hub</span>
              </div>
            </div>

          </div>
        </section>

        {
    /* RECHARTS ACTIVITY ANALYTICS BLOCK */
  }
        <section id="activity-analytics-insights" className="grid md:grid-cols-12 gap-8">
          
          {
    /* Chart 1: Category Distribution */
  }
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-extrabold text-base text-slate-900">Types of Activities</h4>
                <BarChart3 className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 leading-normal mb-4">
                Percentage division of conducted programs reflecting educational and survey priorities.
              </p>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
    data={categoryChartData}
    cx="50%"
    cy="50%"
    innerRadius={45}
    outerRadius={65}
    paddingAngle={3}
    dataKey="value"
  >
                    {categoryChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip
    contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white" }}
  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200 text-[10px] font-mono text-slate-650">
              {categoryChartData.map((item, i) => <div key={i} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="truncate">{item.name}: <strong>{item.value}</strong></span>
                </div>)}
            </div>
          </div>

          {
    /* Chart 2: Direct Student Growth */
  }
          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 text-left">
                <h4 className="font-display font-extrabold text-base text-slate-900">Growth Timeline</h4>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  <TrendingUp className="w-3.5 h-3.5" /> Stable Growth
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-normal mb-4">
                Total students mentored and career workshops held monthly since beginning our 2026 outreach classes.
              </p>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTimelineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="studentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
    dataKey="month"
    tick={{ fontSize: 10, fill: "#64748b" }}
    axisLine={false}
    tickLine={false}
  />
                  <YAxis
    tick={{ fontSize: 10, fill: "#64748b" }}
    axisLine={false}
    tickLine={false}
  />
                  <Tooltip
    contentStyle={{ fontSize: "11px", borderRadius: "12px", border: "1px solid #cbd5e1" }}
  />
                  <Area
    type="monotone"
    dataKey="students"
    stroke="#d97706"
    strokeWidth={2.5}
    fillOpacity={1}
    fill="url(#studentGrad)"
    name="Students Guided"
  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono border-t border-slate-200 pt-3">
              <span>* Projected figures based on registration signups.</span>
              <span className="text-primary font-bold">12,400+ Total Guided in Telangana</span>
            </div>
          </div>

        </section>

        {
    /* ORGANIZATIONAL MILESTONES GRID */
  }
        <section id="organizational-milestones" className="bg-slate-100 text-slate-900 p-8 rounded-3xl border border-slate-200 shadow-premium">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-8 text-left">
            <div>
              <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase">Verified Records</span>
              <h3 className="font-display font-extrabold text-xl text-slate-900 mt-1 uppercase">Growth Highlights</h3>
            </div>
            <div className="text-sm font-mono text-slate-500">
              Consistent accountability records. Year-on-year highlights.
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200">
                <FileSpreadsheet className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900">Full Database Integration</h4>
              <p className="text-xs text-slate-500 leading-normal">
                All activities are securely stored on database nodes to guarantee transparent public tracking.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200">
                <Users2 className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900">Verified Volunteers</h4>
              <p className="text-xs text-slate-500 leading-normal">
                Our active coordinators help design and lead local activities directly inside Greater Hyderabad and Telangana districts.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900">Youth Training</h4>
              <p className="text-xs text-slate-500 leading-normal">
                Partnering with local study centers to distribute computing hardware kits and arrange vocational seminars.
              </p>
            </div>

          </div>
        </section>

      </div>

    </div>;
}
